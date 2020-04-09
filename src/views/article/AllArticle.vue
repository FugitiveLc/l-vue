<template>
  <div class="l-wapper">
    <screen @filter="fliter" ref="screen" />
    <el-table
      class="l-table"
      :data="list"
      style="width: 100%">
      <el-table-column
        label="文章标题"
         >
        <template slot-scope="scope">
          <p style="margin-left: 10px" class="omits">{{ scope.row.articleTitle }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="文章描述"
        >
        <template slot-scope="scope">
          <p class="omits">{{ scope.row.articleDesc }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top"> 
              <p>更新时间：{{ scope.row.updateTime | formatDate('yyyy-MM-dd')}}</p>
              <div slot="reference" class="name-wrapper">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime | formatDate('yyyy-MM-dd')}}</span>
              </div>
          </el-popover>
          </template>
      </el-table-column>
      <el-table-column
        label="标签"  >
        <template slot-scope="scope">
          <span v-show="scope.row.tags"  style="margin:5px;"
             v-for="(text,index) in scope.row.tags.split(',')"  :key="index" >
            <el-tag size="medium" >{{ text }}</el-tag>
          </span>
          <span v-show="!scope.row.tags || scope.row.tags.trim().length==0" >无标签</span>
        </template>
      </el-table-column>
      <el-table-column
      label="文章状态"
      width="100"
      >
      <template slot-scope="scope">
        <el-link  :type="scope.row.publicStatus == 1 ? 'success' : 'warning'"  >
          {{scope.row.publicStatus == 1?'已发布':'未发布'}}
        </el-link>
      </template>
    </el-table-column>
      <el-table-column label="操作" width="180"   >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             <el-button :type="scope.row.publicStatus == 1 ?'danger':'success'" 
              plain  size="mini"
             @click="changePublicStatus(scope.$index,scope.row)">
                {{scope.row.publicStatus == 1?'撤回':'发布'}}</el-button>
        </template>
        
      </el-table-column>
    </el-table>
    <el-pagination
    background
    :hide-on-single-page="true"
    @current-change="changePage"
    layout="prev, pager, next"
    :page-size="size"
    :total="total"
    :current-page='current'
    class="l-paginatio"
    />
  
  </div>
</template>

<script>
import {getArticlePage,updateArticle} from '@api/article'
import Screen from './components/Screen'

export default {
  name:'AllArticle',
  data(){
    return{
      list:[],
      total:0,
      size:10,
      current:1
    }
  },
  components:{
    Screen
  },
  mounted(){
     this.getPage(1);
  },
    methods: {
      getPage(current,term = {}){  //获取一页数据
          const loading = this.$loading({
              lock: true,
              text: '数据加载中...',
              spinner: 'el-icon-loading',
              background:'rgba(0,0,0,0)'
            });
            term.current=current;
            term.size=this.size;
        getArticlePage(term).then(res=>{
           this.list=res.data.records;
           console.log(res)
           this.current=res.data.current;
           this.total=res.data.total;
        })
        loading.close();
      },
      handleEdit(index, row) {
         　this.$router.push({
  　         name: 'editArticle', // 这里通过name来引入router
          　 params:{article:row}
        　　});
      },
      changePublicStatus(index,row){
          //撤回或者发布 
           const loading = this.$loading({
              lock: true,
              text: '操作中，请稍后...',
              spinner: 'el-icon-loading',
              background:'rgba(0,0,0,0)'
            });
            let status=(row.publicStatus == '0' ? '1':'0');
            updateArticle({
              articleId: row.articleId,
              publicStatus:status
             }).then(res =>{
                 res.data.publicStatus=status;
                let index= this.list.findIndex(item=>{
                  return item.articleId == row.articleId
                })
                 this.$set(this.list,index,res.data)//正确写法
                  this.$notify({
                    title:  `文章已${res.data.publicStatus==0 ?'撤回':'发布' }!`,
                    position: 'top-left',
                    message:res.data.articleTitle,
                    type: 'success'
                  });
             }).catch(()=>{
                   loading.close();
              })
            loading.close();
      },
      changePage(current){
        this.getPage(current,this.$refs.screen.getTerm());
      },
      fliter(term){
        this.getPage(1,term);
      }
    }
}
</script>
<style lang="scss" >
 @import  "@styles/mixins.scss";
.l-table{
  min-height: calc(100% - 100px);
}
.l-paginatio{
  margin-top:15px;
}
.omits{
  @include omits(2);
}
</style>