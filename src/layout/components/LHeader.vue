<template>
<el-header >
      <div class="icon-wapper" @click="menuClose" >
          <span class="iconfont" :style="asideStatus" >&#xe60a;</span>
      </div>
      <l-breadcrumd /> 
      <user />
    </el-header>
</template>

<script>
import LBreadcrumd from '@/components/header/LBreadcrumd';
import User from '@/components/header/User';
export default {
  name:'LHeader',
  components:{
    LBreadcrumd,
    User
  },
  methods:{
     menuClose(){
        this.$store.commit('settings/CHANGE_ASIDE_STATUS')
      }
  },
  computed:{
     asideStatus(){
      return {'transform':this.$store.getters.asideStatus ?'rotateY(180deg)':'rotateY(0deg)'};
    }
  }
}
</script>
<style lang="scss">
.el-header{
  display: flex;
  background-color: rgba(41,41,41,.09);
  color: #333;
  line-height: 50px;
  height: 50px !important;
  .icon-wapper{
    padding:0 15px;
    margin-left:-20px;
    cursor: pointer;
    transition: .3s;
    &:hover{
      background: rgba(53, 51, 51, 0.05);
    }
    .iconfont{
      font-size:22px; 
      display: inline-block;
    }
  }
}

</style>