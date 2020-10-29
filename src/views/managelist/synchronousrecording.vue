<template>
  <div>
    <!-- <outbutton></outbutton> -->
    <!-- 查询 -->
    <el-form label-width="50px" class="demo-ruleForm" :inline="true" :model="listValue" type="expand">
      <!-- <el-form-item><el-input v-model="listValue.taskType" placeholder="执行类型"></el-input></el-form-item> -->
      <!-- 执行类型 -->
      <el-select v-model="listValue.taskType" placeholder="执行类型" clearable>
        <el-option label="手动同步" :value="1"></el-option>
        <el-option label="自动同步" :value="2"></el-option>
      </el-select>
      <!--库存类型  -->
      <!-- <el-form-item><el-input v-model="listValue.stockType" placeholder="库存类型"></el-input>  </el-form-item> -->
<el-select v-model="listValue.stockType" placeholder="库存类型" clearable>
        <el-option label="入库" :value="1"></el-option>
        <el-option label="出库" :value="2"></el-option>
      </el-select>

      <el-form-item>
        <el-button type="primary" @click="checkList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="allList">全部</el-button>
      </el-form-item>
    </el-form>
    <div>

      <el-table :data="newList" :row-style="{ height: '40px' }">
        <el-table-column prop="id" label="ID号" width="100"> </el-table-column>

        <el-table-column prop="taskType" header-align="center" align="center" label="执行类型" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.taskType === 1 ? "手动同步" : "自动同步"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="stockType" align="center" label="库存类型" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.stockType === 1 ? "入库" : "出库"
            }}</span>
          </template>

        </el-table-column>

        <el-table-column prop="startTime" label="开始时间" width="250">

        </el-table-column>

     <el-table-column prop="endTime" label="结束时间" width="250"> </el-table-column>

        <el-table-column prop="createTime" label="同步时间" width="250"></el-table-column>

        <!-- <el-table-column prop="updateTime" label="修改时间" width="250"></el-table-column> -->

      </el-table>
      <!-- 分页 -->
      <el-pagination :page-sizes="[10, 20, 30, 40]" style="margin:20px 100px; float:right;" layout="total, prev, pager, next" @current-change="currentChange" @size-change="handleSizeChange" :current-page.sync="params.currentPage" :page-size="params.pageSize" :total="params.total"></el-pagination>
    </div>
    <!--  -->
  </div>
</template>

<script>
// import outbutton from "./outbutton.vue";
export default {
  data() {
    return {
      newList: [],
      params: {
        currentPage: 1, //当前页
        pageSize: 15, //每页条数
        total: null, //总条数
      },
      // 查询
      listValue: {
        taskType: "",//执行类型
        stockType: "",//库存类型
        // type:null,
      },
    };
  },
  created() {
    this.handclick();
  },
  methods: {
    handclick: function () {
      var _this = this;
      this.gob
        .postJson(this, {
          url: "usys-wdt-erp/management/stockSynchronizeLog/selectList",
          arg: {
            ..._this.listValue,
            page: {
              // "current"
              current: this.params.currentPage,
              size: this.params.pageSize
            }
          }
        })
        .then(res => {
          if (res.code == 10000) {
            _this.newList = res.data.stockSynchronizeLogEntities;
            _this.params.total = res.data.total;
            // _this.islength = res.data.stockSynchronizeLogEntities.length;
            // _this.listValu.rws.data.stockSynchronizeLogEntities
          }
          // console .log( res.data.stockSynchronizeLogEntities.length)
          //   console.log("sz", res.data.stockSynchronizeLogEntities);
          // console.log(res)
          // let newdata = res.data.stockSynchronizeLogEntities[0].stockType;
          // console.log(newdata)
        });
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.handclick();
    },
    currentChange(val) {
      this.params.currentPage = val;
      console.log("page", val);
      this.handclick();
    },

    //全部
    allList() {
      this.listValue.taskType = "";
      this.listValue.stockType = "";
      this.currentPage = 1;
      this.handclick();
      // console.log('1-1',listValue.taskType)
    },
    //查询
    checkList() {
      this.currentPage = 1;
      this.handclick();
    },
  },
  components: {
    //  outbutton
  },
};
</script>

<style scoped lang="less">
.el-button {
  //
  margin: 0 40px;
  float: right;
  border: none;
}
</style>
