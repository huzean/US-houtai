<template>
  <div id='storageLog'>
    <el-link class="el-icon-d-arrow-left" style="font-size:15px" @click="back" :underline="false">返回</el-link>
    <el-table :data="listData" style="width: 100%;" :cell-style="{fontSize:'14px',textAlign:'center'}" :header-cell-style="{background:'#fff',textAlign:'center',color:'#333',fontSize:'13px',fontWeight:'800'}" v-loading="listLoading">
      <el-table-column prop="id" label="序号" min-width="5"></el-table-column>
      <el-table-column prop="commodityId" label="商品ID" min-width="6"></el-table-column>
      <!-- <el-table-column prop="commodityName" label="商品名称" min-width="8"> </el-table-column> -->
      <el-table-column prop="inventoryQuantity" label="原库存值" min-width="8"></el-table-column>
      <el-table-column prop="editInventoryQuantity" label="现库存值" min-width="8"></el-table-column>
      <el-table-column prop="editorName" label="操作人名称" min-width="8"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="13"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-if="total!= 0" class="fr" style="margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["commodityId"],
  data() {
    return {
      listData: [],
      currentPage: 1,//当前页
      pageSize: 10,//每页条数
      total: 0,//总条数
      listLoading: false,
    };
  },
  created: function () {
    this.getListData();
  },
  mounted: function () {

  },
  methods: {
    getListData() {
      let _this = this;
      _this.listLoading = true;
      _this.gob.postJson(_this, {
        url: "/stockLog/getInventoryQuantityLog",
        arg: {
          page: {
            pageSize: _this.pageSize,
            pageNum: _this.currentPage
          },
          commodityId: _this.commodityId,
          businessCode: _this.$route.query.Code,
          token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.listData = [];
          _this.listData = res.data.stockLogs;
          _this.total = res.data.totalCount;
          _this.listLoading = false;
        } else {
          _this.listLoading = false;
          alert(res.msg);
        }
      });
    },
    //返回
    back() {
      this.$emit("handleCancel");
    },

    //分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
  },
  components: {},
  computed: {}
}

</script>
<style lang='scss' scoped>
</style>