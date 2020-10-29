<template>
  <div id='list'>
    <div v-if="!isShowAddActivity">
      <el-form :model="listValue" ref="listForm" label-width="50px" class="demo-ruleForm" :inline="true">
        <el-form-item>
          <el-input v-model="listValue.activityCode" placeholder="活动编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listValue.activityName" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allList">全部</el-button>
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="success" @click="add">添加活动</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="listData" style="width: 100%;" :cell-style="{fontSize:'14px',textAlign:'center'}" :header-cell-style="{background:'#fff',textAlign:'center',color:'#333',fontSize:'13px',fontWeight:'800'}" v-loading="listLoading">
        <el-table-column prop="id" label="序号" min-width="3"></el-table-column>
        <el-table-column prop="activityCode" label="活动编码" min-width="4"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" min-width="8"></el-table-column>
        <el-table-column prop="createTime" label="活动时间" min-width="10">
          <template slot-scope="scope">
            {{scope.row.starTime+"至"+scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column prop="userBargainNum" label="每人限砍次数" min-width="4">
          <template slot-scope="scope">
            <span v-if="scope.row.userBargainDateType == 1">{{scope.row.userBargainNum}}次/小时</span>
            <span v-if="scope.row.userBargainDateType == 2">{{scope.row.userBargainNum}}次/天</span>
            <span v-if="scope.row.userBargainDateType == 3">{{scope.row.userBargainNum}}次/周</span>
            <span v-if="scope.row.userBargainDateType == 4">{{scope.row.userBargainNum}}次/月</span>
          </template>
        </el-table-column>
        <el-table-column prop="bargainTimeNum" label="砍价商品倒计时" min-width="6">
          <template slot-scope="scope">
            <span v-if="scope.row.bargainDateType == 1">{{scope.row.bargainTimeNum}}小时</span>
            <span v-if="scope.row.bargainDateType == 2">{{scope.row.bargainTimeNum}}天</span>
            <span v-if="scope.row.bargainDateType == 3">{{scope.row.bargainTimeNum}}周</span>
            <span v-if="scope.row.bargainDateType == 4">{{scope.row.bargainTimeNum}}月</span>
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="是否允许用户中途下单" min-width="5">
          <template slot-scope="scope">
            {{scope.row.payType==1?"允许":"不允许"}}
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="参与用户类型" min-width="7">
          <template slot-scope="scope">
            <el-popover placement="top" title="砍价区间为：" width="200" trigger="click" :content="item.bargainMinPrice+'%~'+item.bargainMaxPrice+'%'" v-for="(item,index) in scope.row.strategys" :key="index">
              <el-link type="primary" slot="reference" v-if="item.strategyType==1">新客、</el-link>
              <el-link type="primary" slot="reference" v-if="item.strategyType==2">老客、</el-link>
              <el-link type="primary" slot="reference" v-if="item.strategyType==3">发起者自身、</el-link>
              <el-link type="primary" slot="reference" v-if="item.strategyType==4">其他用户</el-link>
            </el-popover>
            <el-row style="font-size:10px;padding-top:2px">点击查看砍价区间</el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="7">
          <template slot-scope="scope">
            <el-button type="warning" @click="edit(scope.row)" size="mini" class="btn">编辑</el-button>
            <el-button type="primary" @click="giftList(scope.row)" size="mini" class="btn">礼品列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="fr" style="margin-top:20px" 
      v-if="total != 0"
       @size-change="handleSizeChange" 
       @current-change="handleCurrentChange" 
       :current-page.sync="currentPage" 
       :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>

    <!-- 添加/编辑活动 -->
    <add-activity v-if="isShowAddActivity" @handleCancle="handleCancle" :activityId="middleId"></add-activity>
  </div>
</template>

<script>
import addActivity from './addActivity.vue'
export default {
  props: [],
  data() {
    return {
      listValue: {
        activityCode: "",//活动编码
        activityName: "",//活动名称
        type: null,
      },
      listData: [],
      currentPage: 1,//当前页
      pageSize: 13,//每页条数
      total: 0,//总条数
      listLoading: false,
      isShowAddActivity: false,//显示添加活动
      middleId: "",
    };
  },
  created: function () {
    this.getListData();
  },
  mounted: function () {
  },
  methods: {
    //全部
    allList() {
      this.listValue.activityName = "";
      this.listValue.activityCode = '';
      this.currentPage = 1;
      this.getListData();
    },
    //查询
    checkList() {
      this.currentPage = 1;
      this.getListData();
    },
    //添加活动
    add() {
      this.middleId = "";
      this.isShowAddActivity = true;
    },
    //编辑
    edit(row) {
      this.middleId = row;
      this.isShowAddActivity = true;
    },
    //礼品列表
    giftList(row) {
      let Name = this.$route.query.Name;
      let Code = this.$route.query.Code;
      let businessId = this.$route.query.businessId;
      let activityCode = row.activityCode;
      let activityName = row.activityName;
      this.$router.push({ path: '/productList/list', query: { Name, Code, businessId, activityCode, activityName } });
    },
    //获取表格数据
    getListData() {
      let _this = this;
      _this.listLoading = true;
      _this.gob.postJson(_this, {
        url: "/management/bargainActivityInfo/selectActivitys",
        arg: {
          ..._this.listValue,
          page: {
            pageSize: _this.pageSize,
            pageNum: _this.currentPage
          },
          businessCode: _this.$route.query.Code,
          token: JSON.parse(localStorage.getItem('userInfo')).jinbiToken
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.listData = [];
          _this.listData = res.data.bargainActivityInfoVos;
          _this.total = res.data.count;
          _this.listLoading = false;
        } else {
          _this.listLoading = false;
          alert(res.msg);
        }
      });
    },
    handleCancle() {
      this.isShowAddActivity = false;
      this.middleId = '';
    },
    //分页
    handleSizeChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    }
  },
  components: { addActivity },
  computed: {}
}

</script>
<style lang='scss' scoped>
</style>