 <template>
   <el-container>
    <l-aside  /> 
  <el-container class="is-vertical" >
    <l-header /> 
    <l-main />
  </el-container>
</el-container>

</template>

<script>

import LHeader from '@/layout/components/LHeader'
import LAside from '@/layout/components/LAside'
import LMain from '@/layout/components/LMain'
export default {
  name: 'Layout',
  components: {
    LAside
    ,LHeader
    ,LMain
  },
   
}
</script>

 