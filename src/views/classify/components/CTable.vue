<template>
  <el-table
    ref="filterTable"
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="createTime"
      label="创建日期"
      sortable
      width="180"
      column-key="date"
    >
    <template slot-scope="scope">{{ scope.row.createTime | formatDate('yyyy-MM-dd') }}</template>
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="分类名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="categoryDesc"
      label="分类描述"
       >
    </el-table-column>
    <el-table-column
      prop="displayStatus"
      label="是否显示"
      width="100"
      :filters="[{ text: '显示', value: '1' }, { text: '不显示', value: '0' }]"
      :filter-method="filterTag"
      :filter-multiple='false'
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          @click.native="changeShowStatus(scope.row)"
          :type="scope.row.displayStatus !== 1 ? 'primary' : 'success'"
          disable-transitions>{{scope.row.displayStatus == 1 ?'显示':'不显示'}}</el-tag>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name:'',
  props:{
    list:Array
  },
  data(){
    return{
        
    }
  },
  methods:{
      filterTag(value, row) {
        return row.displayStatus == value;
      },
      handleEdit(row){
          this.$emit('editClassify',row);
      },
      changeShowStatus(row){
         this.$emit('changeShowStatus',row)
      }
  }
}
</script>
<style lang="scss">
 .el-tag{
   cursor: pointer;
 }
</style>