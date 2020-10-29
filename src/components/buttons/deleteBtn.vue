<template>
  <el-button :size="size" :plain="plain" type="danger" class="com_deleteBtn" @click="$emit('handleClick')">删除</el-button>
</template>

<script>
  export default {
    props: {
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
.com_deleteBtn{
  margin-bottom: 10px;
}
</style>
