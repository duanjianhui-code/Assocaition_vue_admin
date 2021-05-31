<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="子部门名称" prop="assName">
        <el-input v-model="ruleForm.assName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="报名费" prop="entryFee">
        <el-input v-model="ruleForm.entryFee" style="width: 200px" placeholder="请输入报名费"></el-input>
      </el-form-item>
      <el-form-item label="部门大头像" prop="">
        <el-upload
          class="upload-demo"
          drag
          action="https://duanjianhui1998.oss-cn-beijing.aliyuncs.com"
          multiple
          :data="dataObj"
          :before-upload="beforeAvatarUpload"
          :on-remove="removefile"
          :limit="1"
          :on-success="success">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="部门轮播图" prop="">
        <el-upload
          action="https://duanjianhui1998.oss-cn-beijing.aliyuncs.com"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload"
          :on-success="success1"
          :data="dataObj"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="部门简介" prop="introduction">
        <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getpolicy,addAssocaitionChil} from "@/api/assocaition";
import { getUUID } from '@/utils'

export default {
  name: "addAssocationChild",
  data() {
    var checkImager = (rule, value, callback) => {
      if (value==''||value==undefined) {
        return callback(new Error('请审核'));
      }
      callback()
    };
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      fileList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        assName: '',
        introduction: '',
        indexImageUrl: '',
        fileList: [],
        entryFee:''
      },
      rules: {
        assName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请填写部门简介', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.indexImageUrl!='' && this.ruleForm.fileList!=''){
            addAssocaitionChil(this.ruleForm).then(res=>{
              if (res.code==20000){
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                this.ruleForm={
                  assName: '',
                  introduction: '',
                  indexImageUrl: '',
                  fileList: []
                }
                this.$router.push("/assocaiyion_child")
              }else {
                this.$message({
                  message: '创建失败',
                  type: 'fail'
                })
                location.reload()
              }

            }).catch(e=>{

            })
          }else {
            this.$message({
              message: '请上传图片',
              type: 'fail'
            })
            return false
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeAvatarUpload(file) {
      return new Promise((resolve, reject) => {
        getpolicy()
          .then((response) => {
            this.dataObj.policy = response.data.policy
            this.dataObj.signature = response.data.signature
            this.dataObj.ossaccessKeyId = response.data.accessid
            this.dataObj.key = response.data.dir + getUUID() + '_${filename}'
            this.dataObj.dir = response.data.dir
            this.dataObj.host = response.data.host
            resolve(true)
          })
          .catch((err) => {
            reject(false)
          })
      })
    },
    handleRemove(file, fileList) {
      this.ruleForm.fileList = this.ruleForm.fileList.filter(i=>{return i.uid !== file.uid})
    },
    removefile(file){
      this.ruleForm.indexImageUrl=''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    success(response, file, fileList){
      this.ruleForm.indexImageUrl = this.dataObj.host + '/' + this.dataObj.key.replace('${filename}', file.name)
    },
    success1(response, file, fileList){
      this.ruleForm.fileList.push({
        name: this.dataObj.host + '/' + this.dataObj.key.replace('${filename}', file.name),
        uid: file.uid
      })
    },
  }

}
</script>

<style scoped>

</style>
