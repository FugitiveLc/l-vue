<template>
  <div class="l-wapper">
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
          <span v-if="scope.row.tags" :v-for="(text,index) in scope.row.tags.split(',')"  :key="index" >
            <el-tag size="medium" >{{ text }}</el-tag>
          </span>
          <span v-if="!scope.row.tags || scope.row.tags.trim().length==0" >无标签</span>
        </template>
      </el-table-column>
      <el-table-column
      :filter-multiple='false'
      label="文章状态"
      width="100"
      :filters="[{ text: '已发布', value: 1}, { text: '未发布', value: 0 }]"
      :filter-method="filterStatus"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-link  :type="scope.row.publicStatus == 1 ? 'success' : 'warning'"  >
          {{scope.row.publicStatus == 1?'已发布':'未发布'}}
        </el-link>
      </template>
    </el-table-column>
      <el-table-column label="操作" width="180" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             <el-button :type="scope.row.publicStatus == 1 ?'danger':'success'" 
              plain  size="mini"
             @click="handleEdit(scope.$index, scope.row)">
                {{scope.row.publicStatus == 1?'撤回':'发布'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    :hide-on-single-page="true"
    :current-change="changePage"
    layout="prev, pager, next"
    :total="total"
    class="l-paginatio"
    />
  
  </div>
</template>

<script>
import {getArticlePage} from '@api/article'

const size=10;  //页面尺寸

export default {
  name:'AllArticle',
  data(){
    return{
      list:[],
      total:0 
    }
  },
  mounted(){
     this.getPage(1);
  },
    methods: {
      getPage(current){  //获取一页数据
        getArticlePage({current,size,publicStatus:0}).then(res=>{
           this.list=res.data.records;
           this.total=res.data.total;
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      filterStatus(value,row){
        return row.publicStatus == value;
      },
      changePage(current){
        this.getPage(current);
      }
    }
}
</script>
<style lang="scss" >
 @import  "@styles/mixins.scss";
.l-table{
  min-height: calc(100% - 50px);
}
.l-paginatio{
  margin-top:15px;
}
.omits{
  @include omits(2);
}
</style>