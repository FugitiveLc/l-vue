<template>
  <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }"   >  {{home}} </el-breadcrumb-item>
      <span class="el-breadcrumb__item"   v-for="(text,index) in breadcrumb"   :key="index">
        <span role="link" class="el-breadcrumb__inner"  v-text="text"> </span>
        <span role="presentation" class="el-breadcrumb__separator">/</span>
      </span>
  </el-breadcrumb>
</template>

<script>
export default {
   name:'LBreadcrumd',
   data(){
     return {
       home:'肥宅基地',
       breadcrumb:[]
     }
   },
  watch:{
    $route() {
      this.breadcrumb = this.$route.matched.filter( item => item.meta.title).map(item => item.meta.title) 
    }
  }
}
</script>

<style>
.el-breadcrumb{
    line-height: 50px !important;
    flex:1;
  }
</style>