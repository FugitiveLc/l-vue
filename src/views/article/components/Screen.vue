<template>
<el-form :inline="true" size="mini"  class="demo-form-inline">
       <el-form-item style="margin-top:2px;">
      <el-date-picker
        v-model="date"
        size="mini"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDate"
         >
      </el-date-picker>
       </el-form-item>
       <el-form-item>
         <el-select v-model="status" clearable placeholder="文章状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
        <el-form-item>
        <el-input
            v-model="keyword"
            size="mini"
            placeholder="输入关键字搜索"/>
        </el-form-item>
      <el-form-item>
        <el-button type="primary"   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
</template>

<script>

export default {
  name:'Screen',
  data(){
    return{
      keyword:null,
      date: '',
      startDate:null,
      endDate:null,
      status:null,
      options: [{
          value: 0,
          label: '未发布'
        }, {
          value: 1,
          label: '已发布'
        } ] 
    }
  },
  methods:{
     changeDate(){
       if(!!this.date){
         this.startDate=this.date[0];
         this.endDate=this.date[1];
       }else{
         this.startDate=null;
         this.endDate=null;
       }
     },
     getTerm(){
       return {keyword:this.keyword,startDate:this.startDate,endDate:this.endDate,status:this.status};
     },
     onSubmit(){
       this.$emit("filter",this.getTerm());
     } 
  }
}
</script>
<style lang="scss">

.el-select-dropdown__list{
  padding-bottom:20px;
}
</style>