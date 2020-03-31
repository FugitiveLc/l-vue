<template>
  <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }"   >  {{home}} </el-breadcrumb-item>
      <el-breadcrumb-item   v-for="(text,index) in breadcrumb"   :key="index" > 
          <template>{{text}} </template> 
      </el-breadcrumb-item>
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