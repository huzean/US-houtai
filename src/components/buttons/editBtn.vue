<template>
  <el-button type="primary" class="com_editBtn" :size="size" :plain="plain" @click="$emit('handleClick')">{{val}}</el-button>
</template>

<script>
  export default {
    name: 'com_editBtn',
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
  .com_editBtn{
    margin-bottom: 10px;
  }
</style>
