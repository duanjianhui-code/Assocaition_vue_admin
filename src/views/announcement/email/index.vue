<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="接收人" prop="email">
        <el-select v-model="ruleForm.email" placeholder="请选择接收人">
          <el-option :value="value.email" v-for="(value, index) in emails">
            <span>{{value.name}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮件主题" prop="subject">
        <el-input v-model="ruleForm.subject"></el-input>
      </el-form-item>

      <el-form-item label="邮件内容" prop="sendHtml">
        <el-input type="textarea" v-model="ruleForm.sendHtml"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getEmails,sendEmail} from "@/api/announcement";

export default {
  name: "index",
  data() {
    return {
      fileList: [],
      emails:[{}],
      ruleForm: {
        email: '',
        subject:'',
        sendHtml:''
      },
      rules: {
        email: [
          { required: true, message: '请选择邮箱', trigger: 'change' }
        ],
        sendHtml: [
          { required: true, message: '请填写邮件内容', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请输入主题', trigger: 'change' }
        ]
      },


    }
  },components: {
  },
  created() {
    this.getEmailList()
  },methods: {
    getEmailList(){
      getEmails().then(response => {
        if (response.code==20000){
          this.emails=response.data

        }else {
          this.$notify({
            title: 'fail',
            message: 'Update fail',
            type: 'fail',
            duration: 2000})
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendEmail(this.ruleForm).then(res=>{
            this.$notify({
              title: 'Success',
              message: 'Send Successfully',
              type: 'success',
              duration: 2000
            })
            location.reload();
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },computed:{
  }
}
</script>

<style scoped>

</style>
