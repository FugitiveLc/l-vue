<template>
  <div class="div-container"> 
    <c-table :list='list' />
    <edit-classify></edit-classify>
  </div>
</template>

<script>
import CTable from './components/CTable'
import EditClassify from './components/EditClassify'
import {getAllClassify} from '@api/classify'
export default {
  name:'Classify',
  components:{
    CTable,
    EditClassify
  },
  data() {
      return {
         list:[]
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
        
    }
}
</script>
<style lang="scss"  >
 .div-container{
   height:100%;
   position: relative;
 }
</style>