<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="创建日期"
      sortable
      width="180"
      column-key="date"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="分类名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="分类描述"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="是否显示"
      width="100"
      :filters="[{ text: '显示', value: '1' }, { text: '不显示', value: '0' }]"
      :filter-method="filterTag"
      :filter-multiple='false'
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag !== '显示' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
 
</template>

<script>
export default {
  name:'Classify',
  components:{
  },
  data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '咸鱼笔记',
          address: '啦啦啦',
          tag: '显示'
        }, {
          date: '2016-05-04',
          name: '垃圾文章',
          address: '啊啊',
          tag: '不显示'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        console.log(value)
        return row.tag === '显示';
      } 
    }
}
</script>
<style lang="scss"  >
 .el-scrollbar{
   min-height: 65px;
 }
</style>