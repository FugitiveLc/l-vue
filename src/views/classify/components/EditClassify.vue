<template>
   <div class="classify-edit  ">

   </div>
</template>

<script>
export default {
   name:"EditClassify"
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
.classify-edit{
  // background: red;
  width:100%;
  height:100%;
  z-index: 10;
  position: absolute;
  top:0;
  left: 0;
  @include sonCenter;
}
</style>