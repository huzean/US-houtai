<template>
  <el-breadcrumb separator="/" class="breadcrumb-inner">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: [],
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

</style>
