<template>
  <div class="login">
     <el-form ref="loginForm" class="from" :rules="loginRules" :model="form" auto-complete="on" >
       <h3 class="title">肥宅基地个人中心</h3>
        <el-form-item prop="email"   >
          <el-input ref="email" placeholder="请输入用户名" v-model="form.email" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password"   >
          <el-input ref="password" placeholder="请输入密码" v-model="form.password"  @keyup.enter.native="handleLogin"  maxlength="16" show-password></el-input>
        </el-form-item>
         <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登  录</el-button>
      </el-form>
  </div>
</template>

<script>
import {getToken,setToken} from '@/utils/token'
export default {
  name:'Login',
  data(){
     const validateEmail = (rule, value, callback) => {
       const regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if ( !regemail.test(value)) {
        callback(new Error('请输入正确的邮箱号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
    }
    return {
      form:{
        email:'',
        password:''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods:{
    handleLogin(){
    	 this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/loginAction', this.form).then(() => {
            if(getToken()) this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(( ) => {
           
            this.loading = false
          })
        } else {
          return false
        }
      })  
    }
  }
}
</script>
<style lang="scss"  >
  
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  input {
    background: transparent !important;
    border: 0px !important;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray !important;
    height: 47px;
    caret-color: $cursor;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }

</style>
<style lang="scss" scoped>
 @import  "@styles/mixins.scss";
.login{
    background:#2d3a4b;
    height: 100%;
    @include sonCenter;
    .from{
      width:350px;
      h3{
          font-size: 26px;
          color: #eee;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
      }
    }
 }
</style>