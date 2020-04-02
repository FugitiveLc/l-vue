<template>
  <div class="div-container"> 
    <c-table :list='list'
     @editClassify="setEditVal" 
     @changeShowStatus='changeShowStatus'
      />
    <edit-classify v-show="showEdit" 
      :editTitle='editTitle' 
      :classify="classify" 
      @closeEdit="closeEdit" 
     /> 
      <el-tooltip class="item" effect="dark" content="点我添加文章分类" placement="top" :open-delay='200' >
        <el-button v-show="!showEdit" type="primary" icon="el-icon-plus" @click.native="addClassify" class="addClassify" circle></el-button>
      </el-tooltip>
    
  </div>
</template>

<script>
import CTable from './components/CTable'
import EditClassify from './components/EditClassify'
import {getAllClassify,updateClassifyById,changeClassifyDisplay,addClassifyById} from '@api/classify'
 
const defaultClassify = ()=>{
  return {
     categoryName:'',
     categoryDesc:''
  }
}
export default {
  name:'Classify',
  components:{
    CTable,
    EditClassify
  },
  data() {
      return {
         list:[],
         showEdit:false,
         editTitle:'添加分类',
         classify:{
            categoryName:'',
            categoryDesc:''
         }
      }
    },
    mounted(){
     this.getClassifyList();//获取用户文章分类列表
    },
    methods: {
       getClassifyList(){
          getAllClassify().then(res=>{
           this.list=res.data;
          })
       },
       setEditVal(classify){
          this.editTitle='编辑分类'
          this.showEdit=true; //显示分类编辑框
          Object.assign( this.classify,classify)
       },
       addClassify(){
           this.editTitle='添加分类'
          this.showEdit=true; //显示分类编辑框
          Object.assign(this.classify,defaultClassify())
       },
       closeEdit(classify){
          this.showEdit=false;
          if(!classify) return;
          //发起请求 
          if(this.editTitle==='添加分类'){
              addClassifyById({    //添加
              categoryName:classify.categoryName,
              categoryDesc:classify.categoryDesc
              }).then(res =>{
                this.list.unshift(res.data)
              })
          }else{
              updateClassifyById(classify.categoryId,{   //修改
              categoryName:classify.categoryName,
              categoryDesc:classify.categoryDesc
              }).then(res =>{
                 this.updateClassify(res.data);
              })
          }
       },
       changeShowStatus(classify){
           const loading = this.$loading({
              lock: true,
              text: '数据提交中...',
              spinner: 'el-icon-loading',
              background:'rgba(0,0,0,0)'
            });
            changeClassifyDisplay(classify.categoryId,
                classify.displayStatus==0 ? 1 : 0,
               ).then(res =>{
                  this.updateClassify(res.data);
               })
            loading.close();
       },
       updateClassify(classify){  //发起分类更新请求
           let index= this.list.findIndex(item=>{
              return item.categoryId == classify.categoryId
            })
            //this.list[index] = classify; //错误写法
            //this.list.splice(index,1,classify); //正确写法
            this.$set(this.list,index,classify)//正确写法
       }
    }
}
</script>
<style lang="scss"  >
 .div-container{
   height:100%;
   position: relative;
 }
 .addClassify{
   margin:15px 20px;
 }
</style>