<template>
  <div>
    <div class="location">
      <el-button style="margin-right:100px;" type="success" @click="Stockout" :disabled="isDisable"> 出库同步</el-button>
      <!-- <el-button type="primary" @click="enterwarehouse">入库同步</el-button> -->
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      loading: false,
      isDisable: false//防止连续点击
    }
  },
  watch: {
    loading(val) {
      // console.log('loading', val)
      this.$emit('loading', val)
    }
  },
  methods: {
    //  出库
    Stockout: function () {
      var _this = this;
      this.isDisable = true
      this.loading = true

      this.gob.postJson(this, {
        url: 'usys-wdt-erp/management/stockOrder/stockOutTask',
        arg: {
        }
      }).then(res => {
        if (res.code == 10000) {
          this.$message('成功');
          _this.loading = false
          this.$emit('refresh')
          setTimeout(() => {
            _this.isDisable = false
          }, 200);
        } else {
          this.$emit('refresh')
          this.$message(res.msg);
        }
      })
    },
    // 入库
    // enterwarehouse: function () {
    //   this.loading = true
    //   this.loading = true
    //   this.loading = true
    //   var _this = this;
    //   var _this = this;
    //   var _this = this;
    //   this.gob.postJson(this, {
    //   this.gob.postJson(this, {
    //   this.gob.postJson(this, {
    //     url: 'usys-wdt-erp/management/stockOrder/stockInTask',
    //     url: 'usys-wdt-erp/management/stockOrder/stockInTask',
    //     url: 'usys-wdt-erp/management/stockOrder/stockInTask',
    //     arg: {
    //       //  "page": {    pages: 1, size: 10  }
    //     }
    //   }).then(res => {
    //     if (res.code == 10000) {
    //       setTimeout(() => {
    //         this.$message('成功');
    //         _this.loading = false
    //       }, 1000);
    //       this.$emit('refresh')
    //     } else {
    //       this.$emit('refresh')
    //       this.$message(res.msg);
    //     }
    //   })
    // }
  }
}
</script>

<style scopes lang="less">
.location {
  // border:solid red 1px;
  position: absolute;
  top: 80px;
  right: 10px;
}
.el-button {
  margin: 0 40px;
  float: right;
  border: none;
}
</style>