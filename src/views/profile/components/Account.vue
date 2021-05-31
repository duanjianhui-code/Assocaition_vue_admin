<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="修改密码">
      <el-input v-model.trim="user.urPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateUser} from "@/api/user";
import router from "@/router";

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          urId: ''
        }
      }
    }
  },
  data() {
    return {
      // data:{
      //   name: '',
      //   email: '',
      //   urId: '',
      //   urPassword: ''
      // }
      // urPassword:''
    }
  },
  // created() {
  //   this.data.email=this.user.email
  //   this.data.name=this.user.name
  //   this.data.urId=this.user.urId
  // },
  methods: {
    submit() {
      if (this.user.urPassword==''||this.user.urPassword==undefined){
        this.$message({
          message: '密码不能为空。',
          type: 'false',
          duration: 5 * 1000
        })
        return false
      }else {
        updateUser(this.user).then(res=>{

            if (res.code==20000){
              this.$message({
                message: 'User information has been updated successfully',
                type: 'success',
                duration: 5 * 1000
              })
              // this.$router.push('/editorprofile')
              location.reload()
            }else {
              console.log(res)
              this.$router.push("/404")
            }

          }

        ).catch(error => {
          reject(error)})
      }
      // console.log(this.user)
    }
  }
}
</script>
