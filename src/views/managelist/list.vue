<template>
  <div>
    <!-- 分页 -->
    <!-- <outbutton></outbutton> -->
    <!-- 查询 -->
    <!-- :expand-row-key="[1]" -->
    <el-form label-width="50px" class="demo-ruleForm" :inline="true" :model="listValue" type="expand">
      <!-- 执行类型 -->
      <!-- <el-form-item><el-input v-model="listValue.taskType" placeholder="执行类型"></el-input>  </el-form-item> -->
  <el-select v-model="listValue.taskType" placeholder="执行类型" clearable>
        <el-option label="手动同步" :value="1"></el-option>
        <el-option label="自动同步" :value="2"></el-option>
      </el-select>
      <!--库存类型  -->
      <!-- <el-form-item><el-input v-model="listValue.stockType" placeholder="库存类型"></el-input></el-form-item> -->
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
    <el-table :data="listData" :row-style="{height:'40px'}" highlight-current-row>
      <el-table-column prop="id" label="ID号" width="80"> </el-table-column>
      <!-- 执行类型 -->

      <el-table-column header-align="center" align="center" prop="taskType" label="执行类型" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.taskType === 1 ? "手动同步" : "自动同步"}}</span>
        </template>
      </el-table-column>

      <!--库存任务类型  -->
      <el-table-column prop="stockType" align="center" label="库存任务类型" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.stockType === 1 ? "入库" : "出库"}}</span>
        </template>
      </el-table-column>

      <el-table-column header-align="center" prop="exceptionMsg" label="异常信息" width="500"></el-table-column>

      <el-table-column prop="createTime" label="同步时间" width="250" align="center"></el-table-column>

      <!-- <el-table-column prop="updateTime" label="修改时间" width="250"></el-table-column> -->

    </el-table>
    <!-- 分页 -->
    <el-pagination :page-sizes="[10, 20, 30, 40]" style="margin:20px 100px; float:right;" layout="total, prev, pager, next" @current-change="currentChange" @size-change="handleSizeChange" :current-page.sync="params.currentPage" :page-size="params.pageSize" :total="params.total"></el-pagination>

  </div>
</template>

<script>
// import outbutton from "./outbutton.vue";
export default {
  data() {
    return {
      listData: [],
      params: {
        currentPage: 1,//当前页数
        pageSize: 10,//每页条数
        total: null,//总条数
      },
      // 查询
      listValue: {
        taskType: "",//执行类型
        stockType: "",//库存类型
        // type:null,
      },

    }
  },
  created() {
    this.information();
  },
  methods: {
    information: function () {
      var _this = this;
      this.gob.postJson(this, {

        url: 'usys-wdt-erp/management/stockSynchronizeExceptionMsgLog/selectList',
        //                 management/stockSynchronizeExceptionMsgLog/selectList
        arg: {
          ..._this.listValue,
          page: {
            current: this.params.currentPage,
            size: this.params.pageSize
          }
        }
      }).then(function (res) {
        _this.listData = res.data.stockSynchronizeExceptionMsgLogEntities;
        _this.params.total = res.data.total
        console.log("res",res)
      })
    },
    // 1    /management/stockInOrder/selectList       入库单列表
    // 2    /management/stockInDetails/selectList   入库单明细列表
    // 3    /management/stockOutOrder/selectList     出库单列表
    // 4    /management/stockOutDetails/selectList  出库单明细列表
    // isclick: function () {
    //   var _this = this;
    //   this.gob.postJson(this, {
    //     // url:'usys-wdt-erp/management/stockOrder/stockInTask',
    //     url: 'usys-wdt-erp/management/stockInDetails/selectList',
    //     arg: {
    //       "page": {
    //         "pages": 1,
    //         "size": 10
    //       }
    //     }
    //   }).then(function (res) {
    //     console.log('aa', res)
    //   })
    // },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.information();
    },
    currentChange(val) {
      this.params.currentPage = val;
      this.information();
      console.log("page", val);
    },
    // 查询 taskType,//执行类型 stockType,//库存类型
    //全部
    allList() {
      this.listValue.taskType = "";
      this.listValue.stockType = "";
      this.currentPage = 1;
      this.information();
      // console.log('1-1',listValue.taskType)
    },
    //查询
    checkList() {
      this.currentPage = 1;
      this.information();
    },
    // 下拉   listData
  },
  components: {
    //  outbutton
  },

}
</script>

<style scoped lang="less">
.el-table th.gutter {
  display: table-cell !important;
}

//
</style>