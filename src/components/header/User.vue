<template>
  <div class="userInfo">
        <el-dropdown >
          <i class="el-icon-setting" ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录 </el-dropdown-item>
          </el-dropdown-menu>
         </el-dropdown>
         <span v-text="name" ></span>
     </div>
</template>

<script>
export default {
   name:'User',
   data(){
       return {
           name:this.$store.getters.nickName
       }
   },
   methods:{
       logout(){
             this.$store.dispatch('user/logout')
            this.$router.push({ path: '/login' })
       }
   }
}
</script>

<style  lang="scss">
.userInfo{
    min-width:90px;
     .el-dropdown-selfdefine{
      margin-right:15px !important;
    }
  }
 
</style>