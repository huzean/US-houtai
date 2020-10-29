<template>
  <div>
    <outbuttow @loading="setLoading" @refresh="refresh"></outbuttow>
    <!-- 查询 -->
    <el-form label-width="50px" class="demo-ruleForm" :inline="true" :model="listdata" type="expand">

      <el-form-item>
        <el-input v-model="listdata.orderNo" placeholder="出库单号"></el-input>
      </el-form-item>
      <!-- <el-form-item><el-input v-model="listdata.status" placeholder="状态"></el-input></el-form-item>  -->

      <el-select v-model="listdata.status" placeholder="状态" clearable>
        <el-option label="已取消" :value="5"></el-option>
        <el-option label="待审核" :value="50"></el-option>
        <el-option label="已审核" :value="55"></el-option>
        <el-option label="已发货" :value="95"></el-option>
        <el-option label="已完成" :value="110"></el-option>
        <el-option label="异常发货" :value="113"></el-option>
      </el-select>

      <!-- 出库类型 -->
      <el-select v-model="orderTypes" style="width:360px;" multiple collapse-tags placeholder="出库单类型">
        <el-option label="调拨出库" :value="2"></el-option>
        <el-option label="采购退货出库" :value="3"></el-option>
        <el-option label="盘亏出库" :value="4"></el-option>
        <el-option label="生产出库" :value="5"></el-option>
        <el-option label="其他出库" :value="7"></el-option>
        <el-option label="多发出库" :value="8"></el-option>
        <el-option label="纠错出库" :value="9"></el-option>
        <el-option label="保修配件出库" :value="10"></el-option>
        <el-option label="初始化出库" :value="11"></el-option>
      </el-select>

      <!-- <el-select v-model="listdata.orderType" placeholder="出库单类型" clearable>
         <el-option label="调拨出库" :value="2"></el-option>
        <el-option label="采购退货出库" :value="3"></el-option>
        <el-option label="盘亏出库" :value="4"></el-option>
        <el-option label="生产出库" :value="5"></el-option>
        <el-option label="其他出库" :value="7"></el-option>
        <el-option label="多发出库" :value="8"></el-option>
        <el-option label="纠错出库" :value="9"></el-option>
        <el-option label="保修配件出库" :value="10"></el-option>
        <el-option label="初始化出库" :value="11"></el-option>
      </el-select> -->
      <!-- <el-form-item>
        <el-input v-model="listdata.orderType" placeholder="出库单类型"></el-input>
      </el-form-item> -->

      <el-form-item>
        <el-input v-model="listdata.srcOrderNo" placeholder="源单号"></el-input>
      </el-form-item>

      <!-- 时间 -->
      <span>出库时间：</span>
      <el-date-picker v-model="time" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :default-time="['00:00:00', '23:59:59']" range-separator="|" startPlaceholder="开始日期" endPlaceholder="结束日期">
      </el-date-picker>

      <el-form-item>
        <el-button type="primary" @click="checkList">查询</el-button>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="allList">全部</el-button>
      </el-form-item>
      <el-form-item>
        <com_editBtn :plain=true size="medium" val='导出库单' @handleClick="handleShowDownloadBatchOrder" />
        
      </el-form-item>
      

    </el-form>
     

    <!-- 批量下载订单 -->
    <!-- <el-col :span="24" class="toolbar"> -->
      <div class="toolbar">
        <!-- <com_editBtn :plain=true size="medium" val='批量下载订单' @handleClick="handleShowDownloadBatchOrder" /> -->
      </div>
    <!-- </el-col> -->
    <!-- 批量下载订单弹窗 -->
    <el-dialog title="详情" :visible.sync="batchOrderDialogVisible" :close-on-click-modal="false" width="80%" style="margin-left:120px;">
      <!-- 参数部分-->
      <div style="margin-bottom:20px;" class="detail-title">
        <span class="aside-left">
          筛选范围：
        </span>
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" v-model="batchOrderSubmitParams.time" :default-time="['00:00:00', '23:59:59']" range-separator="|" startPlaceholder="开始日期" endPlaceholder="结束日期">
        </el-date-picker>
      </div>
      <div style="margin:30px 0px;">
        <el-form>
          <el-form-item>
            <span class="aside-left">
              出库单号：
            </span>
            <el-input style="width:200px;" v-model="listdata.orderNo" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin:20px 0px 20px 10px;">
        <span class="aside-left"> 源单号： </span>
        <el-input style="width:200px;" v-model="listdata.srcOrderNo" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin:20px 0px 20px 23px;">
        <span class="aside-left"> 状态：</span>
        <el-select v-model="listdata.status" placeholder="请选择" clearable>
          <el-option label="已取消" :value="5"></el-option>
          <el-option label="待审核" :value="50"></el-option>
          <el-option label="已审核" :value="55"></el-option>
          <el-option label="已发货" :value="95"></el-option>
          <el-option label="已完成" :value="110"></el-option>
          <el-option label="异常发货" :value="113"></el-option>
        </el-select>
      </div>
      <div style="margin:30px 0px 100px -20px; margin-bottom:100px;">
        <span class="aside-left">出库单类型：</span>
        <el-select v-model="orderTypes" style="width:360px;" multiple collapse-tags placeholder="请选择">
          <el-option label="调拨出库" :value="2"></el-option>
          <el-option label="采购退货出库" :value="3"></el-option>
          <el-option label="盘亏出库" :value="4"></el-option>
          <el-option label="生产出库" :value="5"></el-option>
          <el-option label="其他出库" :value="7"></el-option>
          <el-option label="多发出库" :value="8"></el-option>
          <el-option label="纠错出库" :value="9"></el-option>
          <el-option label="保修配件出库" :value="10"></el-option>
          <el-option label="初始化出库" :value="11"></el-option>
        </el-select>
      </div>

      <!-- 操作按钮 -->
      <div class="dialog-footer">
        <el-button style="margiin-left:100px;" type="primary" @click.native="handleDownloadBatchOrder">下载</el-button>
        <el-button style="margiin-left:100px;" type="primary" @click.native="batchOrderDialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>

    <div>
      <el-table :data="isGaindata" :row-style="{ height: '40px' }" @row-click="handle" v-loading="isLoading">
        <el-table-column prop="id" label="序号" width="55">
        </el-table-column>
        <!-- <el-table-column prop="stockoutId" label="入库单主键ID" width="120"> </el-table-column> -->
        <el-table-column header-align="center" prop="orderNo" label="出库单号" width="160"> </el-table-column>
        <el-table-column align="center" prop="warehouseNo" label="仓库编号" width="180"> </el-table-column>
        <!-- <el-table-column prop="status" :formatter="formatifass" label="状态" width="50"></el-table-column> -->
        <el-table-column prop="status" :formatter="problemSourceFormat" label="状态" width="70"></el-table-column>

        <el-table-column header-align="left" align="center" prop="orderType" label="出库单类型" width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.orderType==2">调拨出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==3">采购退货出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==4">盘亏出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==5">生产出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==7">其他出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==8">多发出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==9">纠错出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==10">保修配件出库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==11">初始化出库</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="goodsCount" label="货品数量" width="100"> </el-table-column>
        <!-- <el-table-column align="center" prop="orderTypeName" label=" 出库单类型名称" width="120"> </el-table-column> -->
        <el-table-column align="center" prop="srcOrderNo" label="源单号" width="180"> </el-table-column>
        <el-table-column align="center" prop="consignTime" label="出库时间" width="180"> </el-table-column>
        <el-table-column align="center" prop="createTime" label="同步时间" width="180"> </el-table-column>
        <!-- <el-table-column align="center" prop="updateTime" label="修改时间" width="180"> </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination :page-sizes="[10, 20, 30, 40]" style="margin:20px 100px; float:right;" layout="total, prev, pager, next" @current-change="currentChange" @size-change="handleSizeChange" :current-page.sync="params.currentPage" :page-size="params.pageSize" :total="params.total"></el-pagination>
    <!-- 出库详情 -->
    <div v-if="stockoutId">
      <el-table :data="stockinList" :row-style="{ height: '40px' }">
        <el-table-column align="center" prop="id" label="ID" width="49"> </el-table-column>
        <el-table-column align="center" prop="specNo" label="商家编码" width="180"> </el-table-column>
        <el-table-column align="center" prop="goodsCount" label="货品数量" width="100"> </el-table-column>
        <el-table-column align="center" prop="brandNo" label=" 品牌编号" width="155"> </el-table-column>
        <el-table-column align="center" prop="brandName" label=" 品牌名称" width="140"> </el-table-column>
        <el-table-column align="center" prop="goodsName" label=" 货品名称" width="150"> </el-table-column>
        <el-table-column align="center" prop="goodsNo" label=" 货品编号" width="180"> </el-table-column>
        <el-table-column align="center" prop="specName" label=" 规格名称" width="150"> </el-table-column>
        <el-table-column align="center" prop="specCode" label=" 规格码" width="150"> </el-table-column>
        <el-table-column align="center" prop="goodsUnit" label=" 单位" width="100"> </el-table-column>
        <el-table-column align="center" prop="remark" label=" 备注" width="155"> </el-table-column>
      </el-table>
      <!-- 详情分页 -->
      <el-pagination class="fr" style="margin:20px 100px" @current-change="handleCurrentChange" @size-change="handleSizeChanges" :current-page.sync="parameter.currentPage" :page-size="parameter.pageSize" layout="total, prev, pager, next" :total="parameter.total"></el-pagination>
    </div>

  </div>
</template>

<script>
import outbutton from "./outbutton.vue";
import outbuttow from "./outbuttow.vue";
export default {
  data() {
    return {
      batchOrderDialogVisible: false,//批量下载订单弹窗显示控制
      isLoading: false,
      isGaindata: [],

      params: {
        currentPage: 1, //当前页
        pageSize: 10,   //每页条数
        total: null,    //总条数
      },

      listdata: {
        orderNo: "",   //出库单号
        status: "",    //状态
        orderType: "", //出库类型
        srcOrderNo: "",// 源单号,
        stockType: 2,//库存类型
      },
      stockoutId: null,
      orderTypes: [],//多选
      // 详情分页
      stockinList: [],
      parameter: {
        currentPage: 1,  //当前页
        pageSize: 5,    //每页条数
        total: null,    //总条数
      },
      batchOrderSubmitParams: {
        time: null,      //时间
      },
      time: []
    }
  },
  created() {
    this.gaindata();
  },
  methods: {
    // 显示批量下载订单
    handleShowDownloadBatchOrder() {
      this.batchOrderSubmitParams = { time: '', };
      this.batchOrderDialogVisible = true;
    },
    // 批量下载订单
    handleDownloadBatchOrder() {
      const { compoundParams, time } = this.batchOrderSubmitParams;
      // const compoundParamsIsEmpty = compoundParams.some(item => (item.id === '' && item.type === ''));
      // const batchTableDataIsEmpty = this.batchTableData.length === 0;
      // const timeIsEmpty = !time;
      // const orderNo = !!this.listdata.orderNo//出库单号
      // const status = !!this.listdata.status//出库单号
      // const srcOrderNo = !!this.listdata.srcOrderNo//出库单号
      // const orderTypes =!!this.orderTypes//出单类型
      //  orderNo: "",   
      //   status: "",    //状态
      //   orderType: "", //出库类型
      //   srcOrderNo: "",// 源单号,
      // if (timeIsEmpty) {
      //   // if (!orderNo || timeIsEmpty || status || srcOrderNo || orderTypes ) {
      //   return this.$message({ type: 'warning', message: '请至少选择一项' });
      // }

      var _this = this;
      this.gob.postBlob(this, {
        url: 'usys-wdt-erp/management/stockOrder/downloadOrder',
        arg: {
          ..._this.listdata,
          endTime: time ? time[1] : '',//结束
          startTime: time ? time[0] : '',//开始
          orderTypes: this.orderTypes,//多选
        }
      }).then(res => {
        console.log("111", res)
        const aDom = document.createElement('a');
        aDom.download = '批量下载订单.xlsx';
        const blob = new Blob([res]);
        aDom.href = URL.createObjectURL(blob);
        aDom.click();
        this.batchOrderDialogVisible = false;

      })
    },

    setLoading(val) {
      this.isLoading = val
    },
    refresh() {
      this.getData();
      this.gaindata()
    },
    //出库 状态
    problemSourceFormat(date) {
      if (date.status == '5') {
        return '已取消'
      }
      if (date.status == '50') {
        return '待审核'
      }
      if (date.status == '55') {
        return '已审核'
      }
      if (date.status == '95') {
        return '已发货'
      }
      if (date.status == '110') {
        return '已完成'
      }
      if (date.status == '113') {
        return '异常发货'
      }
    },
    // 出库详情细列表
    getData() {
      if (!this.stockoutId) {
        return
      }
      this.gob.postJson(this, {
        url: 'usys-wdt-erp/management/stockOutDetails/selectList',
        arg: {
          // ..._this.listdata,
          page: {
            current: this.parameter.currentPage,
            size: this.parameter.pageSize,
          },
          stockoutId: this.stockoutId,

        }
      }).then(res => {
        this.stockinList = res.data.stockOutDetailEntities;
        this.parameter.total = res.data.total;
      })
    },
    //出库单明细列表
    handle(row, event, column) {
      this.stockoutId = row.stockoutId
      this.parameter.currentPage = 1
      // console.log('click', this.stockoutId)
      this.$nextTick(() => {
        this.getData();
      })
    },

    //详情分页
    handleSizeChanges(val) {
      this.parameter.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.parameter.currentPage = val;
      console.log('111', val)
      this.getData();
    },
    // 3    /management/stockOutOrder/selectList     出库单列表
    // 4    /management/stockOutDetails/selectList  出库单明细列表
    // 出库单列表
    gaindata: function () {
      var _this = this;
      // console.log('123',this.time)
      this.gob.postJson(this, {
        url: 'usys-wdt-erp/management/stockOutOrder/selectList ',
        arg: {
          ..._this.listdata,
          page: {
            current: this.params.currentPage,
            size: this.params.pageSize,
          },

          endTime: this.time ? this.time[1] : '',//结束
          startTime: this.time ? this.time[0] : '',//开始
          orderTypes: this.orderTypes,//多选
          // stockType:this.stockType
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.isGaindata = res.data.stockOutOrderEntities;
          _this.params.total = res.data.total;
        } else {
          // alert(res.msg)
        }
      })
    },
    // 列表分页
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.gaindata();
    },
    currentChange(val) {
      this.params.currentPage = val;
      // console.log("page", val);
      this.gaindata();
    },
    // 全部
    allList() {
      this.listdata.orderNo = "";
      this.listdata.status = "";
      this.listdata.orderType = "";
      this.listdata.srcOrderNo = "";
      this.listdata.stockType = "";


      // this.time.endPlaceholder = '';//结束时间
      // this.time.startPlaceholder = ''//开始时间
      this.currentPage = 1;
      this.gaindata();
    },
    //查询
    checkList() {
      this.currentPage = 1;
      this.gaindata();

    },

  },
  components: {
    outbutton,
    outbuttow



  },
}
</script>
<style scoped lang="less">
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
/* // 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
}
// .toolbar {
//     // float: left;
//     position: relative;
//     // margin-left: -500px;
//     top:-20;
  
  
// }
.dialog-footer {
  position: relative;
  top: -20px;
  
}
.aside-left {
  margin: 0 50px;
  // border:solid red 1px;
  // color:red;
}
</style>