<template>
  <el-button :size="size" :plain="plain" type="success" class="com_successBtn" @click="$emit('handleClick')">{{val}}</el-button>
</template>

<script>
  export default {
    name: 'com_successBtn',
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
.com_successBtn{
  margin-bottom: 10px;
}
</style>
