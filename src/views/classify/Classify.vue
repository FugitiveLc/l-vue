<template>
    <c-table :list='list' />
</template>

<script>
import CTable from './components/CTable'
import {getAllClassify} from '@api/classify'
export default {
  name:'Classify',
  components:{
    CTable
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
       } 
    }
}
</script>
<style lang="scss"  >
 
</style>