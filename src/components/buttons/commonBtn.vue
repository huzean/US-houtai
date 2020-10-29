<template>
  <el-button type="primary" class="com_commonBtn" @click="$emit('handleClick')">{{val}}</el-button>
</template>

<script>
export default {
  props: ["val"],
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
  .com_commonBtn{
    margin-bottom: 10px;
  }
</style>
