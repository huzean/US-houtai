<template>
  <el-button class='com_otherBtn' :size="size" :plain="plain" @click="$emit('handleClick')">{{val}}</el-button>
</template>

<script>
  export default {
    name: 'com_otherBtn',
    props: {
      val: String,
      plain:{
        type: Boolean,
        default:false
      },//默认深色
      size:{
        type: String,
        default: 'mini'
      }
    },
    data: function () {
      return {}
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {},
    components: {},
    computed: {}
  }
</script>

<style lang="scss">
  /*.com_otherBtn{*/
    /*background-color:rgba(66, 184, 130, 0.1);*/
    /*border-color: #42B983;*/
    /*color: #42B983;*/
    /*margin-bottom: 10px;*/

  /*}*/
  /*.com_otherBtn:hover, .com_otherBtn:active, .com_otherBtn:focus{*/
    /*background-color: #42B983;*/
    /*color: #fff;*/
  /*}*/

  .com_otherBtn{
    background-color: #42B983;
    border-color: #42B983;
    color: #fff;
    margin-bottom: 10px;

  }
  .com_otherBtn:hover, .com_otherBtn:active, .com_otherBtn:focus{
    background-color:rgba(66, 184, 130, 0.8);
    border-color:rgba(66, 184, 130, 0.8);
    color: #fff;
  }
</style>
