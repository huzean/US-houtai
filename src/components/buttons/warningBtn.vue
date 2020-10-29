<template>
  <el-button :size="size" :plain="plain" type="warning" class="com_warningBtn" @click="$emit('handleClick')">{{val}}</el-button>
</template>

<script>
  export default {
    name: 'com_warningBtn',
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
  .com_warningBtn{
    margin-bottom: 10px;
  }
</style>
