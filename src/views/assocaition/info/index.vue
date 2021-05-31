<template>
  <div class="components-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="社团名称" prop="assName">
        <el-input v-model="ruleForm.assName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="associationEmail">
        <el-input v-model="ruleForm.associationEmail" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="ruleForm.telephone" style="width: 500px"></el-input>
      </el-form-item>


      <el-form-item label="社团展示图" prop="introduction">
        <el-image
          style="width: 200px; height: 150px"
          :src="ruleForm.indexImageUrl"
          :preview-src-list="srcList">
        </el-image>

        <el-upload
          class="upload-demo"
          action="https://duanjianhui1998.oss-cn-beijing.aliyuncs.com"
          :on-preview="handlePreview"
          :on-remove="handleRemove1"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :data="dataObj"
          :on-success="success"
          list-type="picture">
          <el-button size="small" type="primary">修改</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="社团轮播图" prop="">
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



      <el-form-item label="社团简介" prop="introduction">
        <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
import {getMyAssocation, getpolicy,upAssocation} from "@/api/assocaition";
import {getUUID} from "@/utils";

export default {
  name: 'index',
  components: {},
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      },
      ruleForm: {
        assName: '',
        introduction: '',
        associationEmail: '',
        telephone: '',
        indexImageUrl: '',
        fileList:[]
      },
      rules: {
        assName: [
          { required: true, message: '请输入社团名称', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请填写社团简介', trigger: 'change' }
        ],
        telephone: [
          { required: true, message: '请填写手机号', trigger: 'change' },
        ],
        associationEmail: [
          { required: true, message: '请填写邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ]
      },
      srcList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
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
    getMyAss(){
      getMyAssocation().then(res=>{
        Object.assign(this.ruleForm, res.data)
        if (res.data.fileList==null){
          this.ruleForm.fileList=[]
        }
        this.srcList.push(res.data.indexImageUrl)

      }).catch(e=>{

      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          upAssocation(this.ruleForm).then(res=>{
            if (res.code==20000){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
             location.reload()
            }else {
              this.$message({
                message: '修改失败',
                type: 'fail'
              })
              location.reload()
            }
          }).catch(e=>{
            this.$message({
              message: '修改失败',
              type: 'fail'
            })
            location.reload()
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove1(file, fileList) {
      this.ruleForm.fileList = this.ruleForm.fileList.filter(i=>{return i.uid !== file.uid})
    },
    handleRemove(file, fileList) {
      this.ruleForm.fileList = this.ruleForm.fileList.filter(i=>{return i.uid !== file.uid})
    },
    handlePreview(file) {

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
    }




  },created() {
    this.getMyAss()
  },

}
</script>

<style scoped>

</style>

