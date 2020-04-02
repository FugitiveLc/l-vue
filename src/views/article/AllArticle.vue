<template>
  <div class="l-wapper">
    <el-table
      class="l-table"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="文章标题"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章描述"
        width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.articleDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top"> 
              <p>更新时间：{{ scope.row.updateTime }}</p>
              <div slot="reference" class="name-wrapper">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </div>
          </el-popover>
          </template>
      </el-table-column>
      <el-table-column
        label="标签"
        width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.tags }}</el-tag>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="103"
    class="l-paginatio"
    />
  
  </div>
</template>

<script>

export default {
  name:'AllArticle',
  data(){
    return{
      tableData: [{
          articleTitle: '垃圾文章',
          createTime: '2016-05-02',
          updateTime:'2009-1-1',
          tags: 'java、php、c#',
          publicStatus:0,
          articleDesc: '垃圾文章，还要描述？？？？'
        },{
          articleTitle: '垃圾文章1',
          createTime: '2016-05-03',
          updateTime:'2009-1-2',
          tags: 'java',
           publicStatus:1,
          articleDesc: '垃圾文章，还要描述!!!'
        }  ]
    }
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      filterStatus(value,row){
          return true;
      }
    }
}
</script>
<style lang="scss" >
.l-table{
  min-height: calc(100% - 50px);
}
.l-paginatio{
  margin-top:15px;
}
</style>