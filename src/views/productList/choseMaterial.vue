<template>
  <div id='choseMaterial'>
    <el-link class="el-icon-d-arrow-left" style="font-size:15px" @click="$emit('handleCancel')" :underline="false">返回</el-link>
    <el-table :data="listData" style="width: 100%;" highlight-current-row @current-change="handleTableCurrentChange" :cell-style="{fontSize:'14px',textAlign:'center'}" :header-cell-style="{background:'#fff',textAlign:'center',color:'#333',fontSize:'13px',fontWeight:'800'}" v-loading="listLoading">
      <el-table-column prop="id" label="商品ID" min-width="5"></el-table-column>
      <el-table-column prop="outId" label="销售ID" min-width="5"></el-table-column>
      <el-table-column prop="commodityName" label="商品名称" min-width="8"></el-table-column>
      <el-table-column prop="businessId" label="商家ID" min-width="6"></el-table-column>
      <el-table-column prop="commodityName" label="商品图片" min-width="6">
        <template slot-scope="scope">
          <img :src="scope.row.commodityImage" alt="">
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="fr" style="margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total" v-if="total != 0"></el-pagination>
  </div>
</template>

<script>
export default {
  props: [],
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
    //分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    //获取表格数据
    getListData() {
      let _this = this;
      _this.listLoading = true;
      _this.gob.getM(_this, {
        url: "/realQryProductList",
        arg: {
          pagecount: _this.pageSize,
          pageindex: _this.currentPage
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.listData = [];
          _this.listData = res.data.productList;
          _this.total = res.data.totalLows;
          _this.listLoading = false;
        } else {
          _this.listLoading = false;
          alert(res.msg);
        }
      });
    },
    //选中数据变化
    handleTableCurrentChange(val) {
      let _this = this;
      this.$confirm('确定要选择该礼品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$emit("handleSelectedGift", val);
        _this.$emit('handleCancel');
      }).catch(() => {

      });
    }
  },
  components: {},
  computed: {}
}

</script>
<style lang='scss' scoped>
</style>