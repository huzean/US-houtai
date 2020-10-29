<template>
  <div id='updateLog'>
    <el-link class="el-icon-d-arrow-left" style="font-size:15px" @click="back" :underline="false">返回</el-link>
    <el-table :data="listData" style="width: 100%;" :cell-style="{fontSize:'14px',textAlign:'center'}" :header-cell-style="{background:'#fff',textAlign:'center',color:'#333',fontSize:'13px',fontWeight:'800'}" v-loading="listLoading">
      <el-table-column prop="id" label="序号" min-width="5"></el-table-column>
      <el-table-column prop="commodityId" label="商品ID" min-width="6"></el-table-column>
      <el-table-column prop="commodityName" label="原商品名称" min-width="8"> </el-table-column>
      <el-table-column prop="editCommodityName" label="现原商品名称" min-width="8"></el-table-column>
      <el-table-column prop="commodityImage" label="原商品图片" min-width="8">
        <template slot-scope="scope">
          <img :src="scope.row.commodityImage" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="editCommodityImage" label="现商品图片" min-width="8">
        <template slot-scope="scope">
          <img :src="scope.row.editCommodityImage" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="originalPrice" label="原原价" min-width="8"> </el-table-column>
      <el-table-column prop="editOriginalPrice" label="现原价" min-width="8"> </el-table-column>
      <el-table-column prop="minimumPrice" label="原最低价" min-width="8"> </el-table-column>
      <el-table-column prop="editMinimumPrice" label="现最低价" min-width="8"> </el-table-column>
      <!-- <el-table-column prop="bargainMinPrice" label="原帮砍最低值" min-width="8"> </el-table-column>
      <el-table-column prop="editBargainMinPrice" label="现帮砍最低值" min-width="8"></el-table-column>
      <el-table-column prop="bargainMaxPrice" label="原帮砍最高值" min-width="8"></el-table-column>
      <el-table-column prop="editBargainMaxPrice" label="现帮砍最高值" min-width="8"></el-table-column>
      <el-table-column prop="bargainDateType" label="原帮砍时间单位" min-width="8"></el-table-column>
      <el-table-column prop="editBargainDateType" label="现帮砍时间单位" min-width="8"></el-table-column>
      <el-table-column prop="bargainNum" label="原允许帮砍次数" min-width="8"></el-table-column>
      <el-table-column prop="editBargainNum" label="现允许帮砍次数" min-width="8"></el-table-column> -->
      <el-table-column prop="inventoryQuantity" label="原库存值" min-width="8"></el-table-column>
      <el-table-column prop="editInventoryQuantity" label="现库存值" min-width="8"></el-table-column>
      <!-- <el-table-column prop="isLimit" label="原商品砍价限制" min-width="8"></el-table-column>
      <el-table-column prop="editIsLimit" label="现商品砍价限制" min-width="8"></el-table-column> -->
      <el-table-column prop="isVisible" label="原是否显示商品" min-width="8">
        <template slot-scope="scope">
          {{scope.row.isVisible == 1?'是':"否"}}
        </template>
      </el-table-column>
      <el-table-column prop="editIsVisible" label="现是否显示商品" min-width="8">
        <template slot-scope="scope">
          {{scope.row.editIsVisible == 1?'是':"否"}}
        </template>
      </el-table-column>
      <el-table-column prop="recordStatus" label="原状态" min-width="8">
        <template slot-scope="scope">
          {{scope.row.recordStatus == 1?'正常':"下架"}}
        </template>
      </el-table-column>
      <el-table-column prop="editRecordStatus" label="现状态" min-width="8">
        <template slot-scope="scope">
          {{scope.row.editRecordStatus == 1?'正常':"下架"}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="indexNum" label="原商品排序" min-width="8"></el-table-column>
      <el-table-column prop="editIndexNum" label="现商品排序" min-width="8"></el-table-column> -->
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
        url: "/commodityLog/getCommodityLog",
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
          _this.listData = res.data.commodityLogs;
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