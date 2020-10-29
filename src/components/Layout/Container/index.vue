<template>
  <div id="comContainer" style="min-width: 1300px">
    <div id="comContainer_top" :class="{'sliderCollapseTopBar':$store.state.sliderCollapse}" style="min-width: 1300px">
      <TopBar/>
    </div>
    <div id="comContainer_Main">
      <Main v-show="$store.state.auth.currentAuth"/>
      <noAuth v-show="!$store.state.auth.currentAuth"/>
    </div>
  </div>
</template>

<script>
  import TopBar from './TopBar/index.vue'
  import Main from './Main.vue'
  import noAuth from './noAuth.vue'
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
  components: {
    TopBar,
    Main,
    noAuth
  },
  computed: {}
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
