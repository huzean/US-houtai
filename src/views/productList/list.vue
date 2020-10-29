<template>
  <div id='list'>
    <div v-if="!isShowAdd && !isShowUpdateLog&&!isShowStorageLog">
      <el-link class="el-icon-d-arrow-left" style="font-size:15px;margin-bottom:15px;" @click="back" :underline="false">返回活动列表</el-link>
      <el-form :model="listValue" ref="listForm" label-width="50px" class="demo-ruleForm" :inline="true">
        <el-form-item>
          <el-input v-model="listValue.outId" placeholder="销售ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listValue.commodityName" placeholder="礼品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listValue.isVisible" placeholder="是否显示" clearable>
            <el-option label="是" :value="1"> </el-option>
            <el-option label="否" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="listValue.recordStatus" placeholder="商品状态" clearable>
            <el-option label="上架" :value="1"> </el-option>
            <el-option label="下架" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allList">全部</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="success" @click="add">添加商品</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="listData" style="width: 100%;" :cell-style="{fontSize:'14px',textAlign:'center'}" :header-cell-style="{background:'#fff',textAlign:'center',color:'#333',fontSize:'13px',fontWeight:'800'}" v-loading="listLoading">
        <el-table-column prop="id" label="序号" min-width="3"></el-table-column>
        <el-table-column prop="outId" label="销售ID" min-width="4"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" min-width="11"> </el-table-column>
        <el-table-column prop="inventoryQuantity" label="上架库存" min-width="4"></el-table-column>
        <el-table-column prop="bargainingNum" label="砍价中" min-width="4"></el-table-column>
        <el-table-column prop="payedNum" label="已付款" min-width="4"></el-table-column>
        <el-table-column prop="isVisible" label="是否显示" min-width="4">
          <template slot-scope="scope">{{scope.row.isVisible == 1?'是':"否"}}</template>
        </el-table-column>
        <el-table-column prop="isQuota" label="是否限购" min-width="4">
          <template slot-scope="scope">{{scope.row.isQuota == 1?'是':"否"}}</template>
        </el-table-column>
        <el-table-column prop="originalPrice" label="原价" min-width="4"></el-table-column>
        <el-table-column prop="minimumPrice" label="帮砍最低价" min-width="6"></el-table-column>
        <!-- <el-table-column prop="bargainMaxPrice" label="好友帮砍随机区间" width="125px">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime != 1">{{scope.row.bargainMinPrice+'~'+scope.row.bargainMaxPrice}}</span>
            <el-input v-if="scope.row.createTime == 1" v-model="scope.row.bargainMinPrice" placeholder="请输入内容" style="width:45px"></el-input>
            <span v-if="scope.row.createTime == 1">~</span>
            <el-input v-if="scope.row.createTime == 1" v-model="scope.row.bargainMaxPrice" placeholder="请输入内容" style="width:45px"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="isLimit" label="每人每周限砍次数" min-width="6">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime != 1">{{scope.row.isLimit}}</span>
            <el-input v-if="scope.row.createTime == 1" v-model="scope.row.isLimit" placeholder="请输入内容" style="width:100%"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column prop="updateTime" label="更新时间" min-width="8"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <div class="btnBg">
              <el-button type="warning" @click="edit(scope.row)" size="mini" class="btn">编辑</el-button>
              <el-button type="success" @click="hide(scope.row)" size="mini" class="btn" v-if="scope.row.isVisible == 1">隐藏</el-button>
              <el-button type="primary" @click="hide(scope.row)" size="mini" class="btn" v-else>显示</el-button>
              <el-button type="primary" @click="storageLog(scope.row)" size="mini" class="btn">库存日志</el-button>
            </div>
            <div class="btnBg">
              <el-button type="primary" @click="updateLog(scope.row)" size="mini" class="btn">商品更新日志</el-button>
              <el-button type="warning" @click="editStorage(scope.row)" size="mini" class="btn">修改库存</el-button>
              <el-button type="danger" @click="deleted(scope.row)" v-if="scope.row.recordStatus==1" size="mini" class="btn">下架</el-button>
              <el-button type="primary" @click="deleted(scope.row)" v-if="scope.row.recordStatus==2" size="mini" class="btn">上架</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="bageBg" v-if="total!=0">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>

      <!-- 修改库存 -->
      <el-dialog title="提示" :visible.sync="editStorageDialog" width="600px" :close-on-click-modal="false">
        <el-input v-model="editStorageValue" placeholder="请输入内容" style="width:40%"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editStorageDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveEditStorage">保存修改</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加/编辑商品 -->
    <add-product v-if="isShowAdd" @handleCancel="handleCancel" :editValue="middleValue"></add-product>
    <!-- 商品更新日志 -->
    <update-log v-if="isShowUpdateLog" @handleCancel="handleCancel" :commodityId="middleValue"></update-log>
    <!-- 商品库存日志 -->
    <storage-log v-if="isShowStorageLog" @handleCancel="handleCancel" :commodityId="middleValue"></storage-log>
  </div>
</template>

<script>
import addProduct from './add.vue'
import updateLog from './updateLog.vue'
import storageLog from './storageLog.vue'
export default {
  props: [],
  data() {
    return {
      listValue: {
        commodityName: "",//商品名称
        outId: "",//销售ID
        isVisible: "",//是否显示
        recordStatus: "",//商品状态
        type: null,
      },
      listData: [],
      currentPage: 1,//当前页
      pageSize: 10,//每页条数
      total: 0,//总条数
      listLoading: false,
      middleValue: null,
      editStorageDialog: false,//修改库存
      editStorageValue: null,//库存修改值
      isShowAdd: false,//显示添加
      isShowUpdateLog: false,//显示商品更新日志
      isShowStorageLog: false,//显示商品更新日志
    };
  },
  created: function () {
    this.getListData();
  },
  mounted: function () {
  },
  methods: {
    //查询
    checkList() {
      this.listValue.type = 1;
      this.currentPage = 1;
      this.getListData();
    },
    //全部
    allList() {
      this.listValue.type = null;
      this.listValue.commodityName = '';
      this.listValue.outId = '';
      this.listValue.isVisible = '';
      this.listValue.recordStatus = '';
      this.currentPage = 1;
      this.getListData();
    },
    //获取表格数据
    getListData() {
      let _this = this;
      _this.listLoading = true;
      _this.gob.postJson(_this, {
        url: "/bargainCommodity/selectBackBargainCommodity",
        arg: {
          ..._this.listValue,
          page: {
            pageSize: _this.pageSize,
            pageNum: _this.currentPage
          },
          activityCode: _this.$route.query.activityCode,
          businessCode: _this.$route.query.Code,
          token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.listData = [];
          _this.listData = res.data.bargainCommodities;
          _this.total = res.data.totalCount;
          _this.listLoading = false;
        } else {
          _this.listLoading = false;
          alert(res.msg);
        }
      });
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
    //编辑
    edit(row) {
      this.middleValue = row;
      this.isShowAdd = true;
    },
    //隐藏/显示
    hide(row) {
      let _this = this;
      let isVisible = row.isVisible == 1 ? 0 : 1;
      this.$confirm('确定要修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.gob.postJson(_this, {
          url: "/bargainCommodity/hideBargainCommodity",
          arg: {
            commodityId: row.id,
            businessCode: _this.$route.query.Code,
            editor: JSON.parse(localStorage.getItem('userInfo')).userCnName,
            isVisible: isVisible,
            token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
          }
        }).then(res => {
          if (res.code == 10000) {
            _this.getListData();
            _this.$message({ message: "修改成功", type: "success" });
          } else {
            _this.$message.error(res.msg);
          }
        });
      }).catch(() => {

      });
    },
    //添加
    add() {
      this.middleValue = '';
      this.isShowAdd = true;
    },
    //取消添加
    handleCancel() {
      this.isShowAdd = false;
      this.isShowUpdateLog = false;
      this.isShowStorageLog = false;
    },
    //删除
    deleted(row) {
      let _this = this;
      let recordStatus = row.recordStatus == 1 ? 2 : 1;
      this.$confirm('确定要修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.gob.postJson(_this, {
          url: "/bargainCommodity/deleteBargainCommodity",
          arg: {
            commodityId: row.id,
            recordStatus: recordStatus,
            businessCode: _this.$route.query.Code,
            editor: JSON.parse(localStorage.getItem('userInfo')).userCnName,
            token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
          }
        }).then(res => {
          if (res.code == 10000) {
            _this.getListData();
            _this.$message({ message: "修改成功", type: "success" });
          } else {
            _this.$message.error(res.msg);
          }
        });
      }).catch(() => {

      });
    },
    //商品更新日志
    updateLog(row) {
      this.middleValue = row.id;
      this.isShowUpdateLog = true;
    },
    //修改库存
    editStorage(row) {
      this.editStorageValue = row.inventoryQuantity;
      this.middleValue = row.id;
      this.editStorageDialog = true;
    },
    //保存库存修改值
    saveEditStorage() {
      let _this = this;
      _this.gob.postJson(_this, {
        url: "/bargainCommodity/editInventoryQuantity",
        arg: {
          commodityId: _this.middleValue,
          businessCode: _this.$route.query.Code,
          inventoryQuantity: _this.editStorageValue,
          editor: JSON.parse(localStorage.getItem('userInfo')).userCnName,
          token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.editStorageDialog = false;
          _this.getListData();
          _this.$message({ message: "修改成功", type: "success" });
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    //库存日志
    storageLog(row) {
      this.middleValue = row.id;
      this.isShowStorageLog = true;
    },
    //返回活动列表
    back() {
      let Name = this.$route.query.Name;
      let Code = this.$route.query.Code;
      let businessId = this.$route.query.businessId;
      this.$router.push({ path: '/activity', query: { Name, Code, businessId } });
    }
  },
  components: { addProduct, updateLog, storageLog },
  computed: {}
}

</script>
<style lang='scss' scoped>
#list {
  padding-bottom: 70px;
  position: relative;
  .bageBg {
    text-align: right;
    padding: 20px 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .page {
    display: inline-block;
    font-size: 20px;
  }
}
.btn {
  margin-top: 8px;
}
.btnBg {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>