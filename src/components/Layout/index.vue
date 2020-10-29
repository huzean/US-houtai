<template>
  <div id="comLayout">
    <div id="comLayout_L">
      <SliderNav />
    </div>
    <div id="comLayout_R">
      <Container />
    </div>

    <!-- 查询商品更新日志 -->
    <el-dialog title="商品更新日志" :visible.sync="$store.state.goodsLog.onOff" width="70%">
      <goodsLog v-if="$store.state.goodsLog.onOff"></goodsLog>
    </el-dialog>
    <!-- 查询商品库存日志 -->
    <el-dialog title="商品库存日志" :visible.sync="$store.state.goodsStockLog.onOff" width="70%">
      <goodsStockLog v-if="$store.state.goodsStockLog.onOff"></goodsStockLog>
    </el-dialog>

  </div>
</template>

<script>
import SliderNav from './SliderNav/index.vue'
import Container from './Container/index.vue'
import goodsLog from '../logs/goodsLog';
import goodsStockLog from '../logs/goodsStockLog';
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
    SliderNav,
    Container,
    goodsLog,
    goodsStockLog
  }
}
</script>

<style lang="scss">
@import "./Layout.scss";
</style>
