<template>
   <div class="classify-edit  ">
      <el-form ref="form" :model="classify" class="form" label-width="80px">
         <h2 class="l-form-title" v-text="editTitle">添加个人分类</h2>
         <el-form-item label="分类名称">
            <el-input v-model="classify.categoryName" maxlength="10"></el-input>
         </el-form-item>
         <el-form-item label="分类描述">
            <el-input type="textarea" v-model="classify.categoryDesc" maxlength="50"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="onSubmit">{{editTitle ==='添加分类'?'立即添加':'保存修改'}}</el-button>
            <el-button @click="closeEdit">取消</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>

export default {
   name:"EditClassify",
   props:{
      editTitle:String,
      classify:Object
   }, 
    methods: {
      onSubmit() {
        this.$emit('closeEdit',this.classify)
      },
      closeEdit(){
         this.$emit('closeEdit')
      } 
    }
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
.classify-edit{
  background: rgba(241, 238, 238, 0.4);
  width:100%;
  height:100%;
  z-index: 10;
  position: absolute;
  top:0;
  left: 0;
  @include sonCenter;
  .form{
     background:#fff;
     border-radius:5px;
     padding:20px 35px 0 20px;
     box-shadow: #666 0px 0px 10px;
     .l-form-title{
        text-align: center;
        font-weight:600;
        font-size:18px;
        padding-bottom:25px;
     }
  }
}

</style>