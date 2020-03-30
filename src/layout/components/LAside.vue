<template>
<el-aside :style="asideStatus">
    <el-scrollbar >
        <el-menu default-active="1-4-1" 
              :collapse="isCollapse"  
              :collapse-transition="false"  >
        <el-menu-item index="1">
            <i class="el-icon-location"></i>
          <span slot="title">肥宅基地</span>
        </el-menu-item>
          <el-menu-item index="3" >
            <i class="el-icon-menu"></i>
          <span slot="title">文章分类管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
                  <i class="el-icon-s-grid"></i>
              <span>所有文章</span>
            </el-menu-item>
            <el-menu-item index="1-2">
                <i class="el-icon-document-add"></i>
                <span>写文章</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-flag"></i>
          <span slot="title">书签管理</span>
        </el-menu-item>
        </el-menu>
        </el-scrollbar>
  </el-aside>
</template>

<script>

export default {
  name:'LAside',
  data(){
    return{
    isCollapse: false
    }
  },
   computed:{
     asideStatus(){
      this.isCollapse=this.$store.getters.asideStatus
      return {'width': this.isCollapse ?'64px':'200px'};
    }
  }
}
</script>
<style lang="scss" >
 .el-menu {
  height: 100%;
}

.el-menu{
  border-right:none !important;
}
.el-aside{   
  transition: .3s;
  border-right: solid 1px #e6e6e6;
 } 

</style>