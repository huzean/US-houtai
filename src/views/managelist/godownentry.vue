<template>
  <div>
    <outbutton @refresh="refresh" @loading="setLoading"></outbutton>
    <!-- 查询 -->
    <el-form label-width="50px" class="demo-ruleForm" :inline="true" :model="listValue" type="expand">
      <el-form-item>
        <el-input v-model="listValue.orderNo" placeholder="入库单号"></el-input>
      </el-form-item>
      <!-- 
        <el-form-item><el-input v-model="listValue.status" placeholder="状态"></el-input> </el-form-item> 
      	入库单状态: 10已取消 20编辑中 25待价格确认 30待审核 32待推送 33推送失败 35委外待入库 60待结算 80已完成
      -->
      <el-select v-model="listValue.status" placeholder="状态" clearable>
        <el-option label="已取消" :value="10"></el-option>
        <el-option label="编辑中" :value="20"></el-option>
        <el-option label="待价格确认" :value="25"></el-option>
        <el-option label="待审核" :value="30"></el-option>
        <el-option label="待推送" :value="32"></el-option>
        <el-option label="推送失败" :value="33"></el-option>
        <el-option label="委外待入库" :value="35"></el-option>
        <el-option label="待结算" :value="60"></el-option>
        <el-option label="已完成" :value="80"></el-option>
      </el-select>
      <!-- 入库单类型 -->
      <el-select v-model="orderTypes" style="width:350px;" multiple collapse-tags popper-class="select-rule" placeholder="入库单类型">
        <el-option label="采购入库" :value="1"></el-option>
        <el-option label="调拨入库" :value="2"></el-option>
        <el-option label="退货入库" :value="3"></el-option>
        <el-option label="盘盈入库" :value="4"></el-option>
        <el-option label="生产入库" :value="5"></el-option>
        <el-option label="保修入库" :value="6"></el-option>
        <el-option label="纠错入库" :value="7"></el-option>
        <el-option label="初始化入库" :value="8"></el-option>
        <el-option label="预入库" :value="9"></el-option>
        <el-option label="JIT退货入库" :value="10"></el-option>
        <el-option label="委外入库" :value="11"></el-option>
      </el-select>

      <!-- <el-select v-model="listValue.orderType" placeholder="入库单类型" clearable>
       <el-option label="采购入库" :value="1"></el-option>
         <el-option label="调拨入库" :value="2"></el-option>
        <el-option label="退货入库" :value="3"></el-option>
        <el-option label="盘盈入库" :value="4"></el-option>
        <el-option label="生产入库" :value="5"></el-option>
        <el-option label="保修入库" :value="6"></el-option>
        <el-option label="纠错入库" :value="7"></el-option>
        <el-option label="初始化入库" :value="8"></el-option>
        <el-option label="预入库" :value="9"></el-option>
        <el-option label="JIT退货入库" :value="10"></el-option>
        <el-option label="委外入库" :value="11"></el-option>
      </el-select> -->

      <el-form-item>
        <el-input v-model="listValue.srcOrderNo" placeholder="源单号"></el-input>
      </el-form-item>
      <!-- 时间 -->
      <span>入库时间：</span>
      <el-date-picker 
      value-format="yyyy-MM-dd HH:mm:ss" 
      v-model="time" type="datetimerange" 
      :default-time="['00:00:00', '23:59:59']"
       range-separator="|" startPlaceholder="开始日期"
        endPlaceholder="结束日期">
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
    <!--批量下载订单  -->
    <el-col :span="24" class="toolbar">
      <div>
        <!-- <com_editBtn :plain=true size="medium" val='批量下载订单' @handleClick="handleShowDownloadBatchOrder" /> -->
      </div>
    </el-col>
     <!-- 批量下载订单弹窗 -->
      <el-dialog title="详情" :visible.sync="batchOrderDialogVisible" :close-on-click-modal="false" width="80%">
      <!-- 参数部分-->
      <div style="margin-bottom:20px;" class="detail-title">
        <span class="aside-left"> 筛选范围 </span>
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" v-model="batchOrderSubmitParams.time" :default-time="['00:00:00', '23:59:59']" range-separator="|" startPlaceholder="开始日期" endPlaceholder="结束日期">
        </el-date-picker>
      </div>
      <div  style="margin:20px 0px 20px 13px;">
      <span class="aside-left"> 源单号 </span>
           <el-input style="width:200px;" v-model="listValue.srcOrderNo" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin:30px 0 ;">
    <span class="aside-left">入库单号</span>
         <el-input style="width:200px;" v-model="listValue.orderNo" placeholder="请输入内容"></el-input>
      </div>
  <div style="margin:20px 0px 20px 26px;">
<span class="aside-left">状态 </span>
 <el-select v-model="listValue.status" placeholder="请选择" clearable>
        <el-option label="已取消" :value="10"></el-option>
        <el-option label="编辑中" :value="20"></el-option>
        <el-option label="待价格确认" :value="25"></el-option>
        <el-option label="待审核" :value="30"></el-option>
        <el-option label="待推送" :value="32"></el-option>
        <el-option label="推送失败" :value="33"></el-option>
        <el-option label="委外待入库" :value="35"></el-option>
        <el-option label="待结算" :value="60"></el-option>
        <el-option label="已完成" :value="80"></el-option>
      </el-select>
  </div>
  <div style="margin:30px 0px 100px -20px; margin-bottom:100px;">
    <span class="aside-left">入库单类型</span>
      <el-select v-model="orderTypes" style="width:350px;" multiple collapse-tags popper-class="select-rule" placeholder="请选择">
        <el-option label="采购入库" :value="1"></el-option>
        <el-option label="调拨入库" :value="2"></el-option>
        <el-option label="退货入库" :value="3"></el-option>
        <el-option label="盘盈入库" :value="4"></el-option>
        <el-option label="生产入库" :value="5"></el-option>
        <el-option label="保修入库" :value="6"></el-option>
        <el-option label="纠错入库" :value="7"></el-option>
        <el-option label="初始化入库" :value="8"></el-option>
        <el-option label="预入库" :value="9"></el-option>
        <el-option label="JIT退货入库" :value="10"></el-option>
        <el-option label="委外入库" :value="11"></el-option>
      </el-select>
  </div>

   <div  style="margin:30px 0px;">
    <span></span>
  </div>
      <!-- 操作按钮 -->
      <div class="dialog-footer">
        <el-button type="primary" @click.native="handleDownloadBatchOrder">下载</el-button>
        <el-button type="primary" @click.native="batchOrderDialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <div>
      <el-table :data="isdataList" :row-style="{ height: '40px' }" @row-click="handle" v-loading="isLoading">
        <el-table-column prop="id" label="序号" width="55">
        </el-table-column>
        <!-- <el-table-column prop="stockinId" label="入库单主键ID" width="120"></el-table-column> -->
        <el-table-column prop="orderNo" label="入库单号" width="180"> </el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" width="130"> </el-table-column>
        <el-table-column prop="warehouseNo" label="仓库编号" width="130"> </el-table-column>
        <!--     <el-table-column prop="status" label="状态" width="100"> </el-table-column>   -->
        <el-table-column prop="status" :formatter="problemSourceFormat" label="状态" width="70"></el-table-column>

        <el-table-column prop="orderType" align="center" label="入库单类型" width="100">
          <!-- <el-table-column prop="orderTypeName" label="入库单类型" width="100"> -->
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.orderType==1">采购入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==2">调拨入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==3">退货入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==4">盘盈入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==5">生产入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==6">保修入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==7">纠错入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==8">初始化入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==9">预入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==10">JIT退货入库</span>
            <span style="margin-left: 10px" v-if="scope.row.orderType==11">委外入库</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockinTime" label="入库时间" width="180"> </el-table-column>
        <!-- <el-table-column prop="createdTime" label="入库单创建时间" width="180"> </el-table-column> -->
        <el-table-column prop="srcOrderNo" label="源单号" width="180"> </el-table-column>
        <!-- <el-table-column prop="orderTypeName" label="订单类别名称" width="120"> </el-table-column> -->
        <el-table-column prop="goodsCount" label="货品数量" width="100"> </el-table-column>
        <el-table-column prop="createTime" label="同步时间" width="165"> </el-table-column>
        <!-- <el-table-column prop="updateTime" label="修改时间" width="165"> </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination :page-sizes="[10, 20, 30, 40]" style="margin-top:20px; float:right; margin-right:100px;" layout="total, prev, pager, next" @current-change="currentChange" @size-change="handleSizeChange" :current-page.sync="params.currentPage" :page-size="params.pageSize" :total="params.total"></el-pagination>
    <!-- 入库详情 -->
    <div v-if="stockinId">
      <el-table :data="stockinIdList" :row-style="{ height: '45px' }">
        <el-table-column align="center" prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column align="center" prop="specNo" label="商家编码" width="155"> </el-table-column>
        <el-table-column align="center" prop="goodsCount" label="货品数量" width="100"> </el-table-column>
        <el-table-column align="center" prop="brandNo" label="品牌编号" width="150"> </el-table-column>
        <el-table-column align="center" prop="brandName" label="品牌名称" width="150"> </el-table-column>
        <el-table-column align="center" prop="goodsName" label="货品名称" width="150"> </el-table-column>
        <el-table-column align="center" prop="goodsNo" label="货品编号" width="150"> </el-table-column>
        <el-table-column align="center" prop="specName" label="规格名称" width="170"> </el-table-column>
        <el-table-column align="center" prop="specCode" label=" 规格码" width="150"> </el-table-column>
        <el-table-column align="center" prop="goodsUnit" label=" 单位" width="150"> </el-table-column>
        <el-table-column align="center" prop="positionNo" label=" 货位编号" width="140"> </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="130"> </el-table-column>
      </el-table>
      <!-- 详情分页 -->
      <el-pagination class="fr" style="margin-top:20px float:right; margin-right:100px;" @current-change="handleCurrentChange" @size-change="handleSizeChanges" :current-page.sync="parameter.currentPage" :page-size="parameter.pageSize" layout="total, prev, pager, next" :total="parameter.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import outbutton from "./outbutton.vue";

export default {
  data() {
    return {
       batchOrderDialogVisible: false,//批量下载订单弹窗显示控制
      isLoading: false,
      isdataList: [],
      stockinId: null,

      params: {
        currentPage: 1,  //当前页
        pageSize: 10,     //每页条数
        total: null,     //总条数
      },
      listValue: {
        orderNo: "",    //入库单号
        status: "",     //状态
        srcOrderNo: "",  //源单号
         stockType: 1,//库存类型
      },
      // 详情分页
      stockinIdList: [],
      parameter: {
        currentPage: 1,//当前页
        pageSize: 5,//每页条数
        total: null,//总条数
      },
      
        batchOrderSubmitParams: {
        time: null,      //时间
      },
      time: [], //时间
      orderTypes: [],//多选

    }
  },
  created() {
    this.isclick();
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
        responseType: 'arraybuffer',

        arg: {
        ..._this.listValue,
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
      this.isclick();
      this.getData();
    },
    // 状态
    problemSourceFormat(date) {
      if (date.status == '10') {
        return '已取消'
      }
      if (date.status == '20') {
        return '编辑中'
      }
      if (date.status == '25') {
        return '待价格确认'
      }
      if (date.status == '30') {
        return '待审核'
      }
      if (date.status == '32') {
        return '待推送'
      }
      if (date.status == '33') {
        return '推送失败'
      }
      if (date.status == '35') {
        return '委外待入库'
      }
      if (date.status == '60') {
        return '待结算'
      }
      if (date.status == '80') {
        return '已完成'
      }

    },
    // ==========
    getData() {
      if (!this.stockinId) {
        return
      }
      this.gob.postJson(this, {
        url: 'usys-wdt-erp/management/stockInDetails/selectList',
        arg: {
          // ..._this.listdata,
          page: {
            current: this.parameter.currentPage,
            size: this.parameter.pageSize,
          },
          stockinId: this.stockinId,
        }
      }).then(res => {
        this.stockinIdList = res.data.stockInDetailEntities;
        this.parameter.total = res.data.total;
      })
    },
    // 入库详情
    handle(row, event, column) {
      //   var _this = this;
      //   console.log('row', row)
      //   _this.gob.postJson(_this, {
      //  url: 'usys-wdt-erp/management/stockInDetails/selectList',   //入库单明细列表
      //     arg: {
      //       // ..._this.listdata,
      //       page: {
      //         current: _this.currentPage,
      //         size: _this.pageSize
      //       },
      //       stockinId: row.stockinId
      //     }
      //   }).then(res => {
      //     _this.stockinId = res.data.stockInDetailEntities
      //   })
      this.stockinId = row.stockinId
      this.parameter.currentPage = 1
      // console.log('click111', this.stockinId)
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

    //  入库单列表
    isclick: function () {
      var _this = this;
      this.gob.postJson(this, {
        url: 'usys-wdt-erp/management/stockInOrder/selectList',
        arg: {
          ..._this.listValue,
          page: {
            current: this.params.currentPage,
            size: this.params.pageSize
          },
          // 时间
          endTime: this.time ? this.time[1] : '',//结束
          startTime: this.time ? this.time[0] : '',//开始
          orderTypes: this.orderTypes,//多选
        }
      }).then(res => {
        if (res.code == 10000) {
          _this.isdataList = res.data.stockInOrderEntities;
          _this.params.total = res.data.total;

        }
        // let isdata={
        //   dictionaryId:this.stockInOrderEntities.dictionaryId
        // };
        // this.gob.postJson(this,{
        //   url:'usys-wdt-erp/management/stockInOrder/selectList',
        // }).then(res=>{
        //   let isdataList =res.data;
        //   if(data.code==10000){
        //     this.gob
        // }
      })
      // console.log('total', res.data.stockInOrderEntities[0].id)
      // console.log('ru', res.data.stockInOrderEntities)
      // })
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.isclick();
    },
    currentChange(val) {
      this.params.currentPage = val;
      // console.log("page", val);
      this.isclick();
    },
    // 全部
    // orderNo,//入库单号
    // status,//状态
    // srcOrderNo//源单号
    allList() {
      this.listValue.orderNo = "";
      this.listValue.status = "";
      this.listValue.srcOrderNo = "";
      //  this.time.endPlaceholder="";//结束时间
      // this.time.startPlaceholder="" ;//开始时间
      this.currentPage = 1;
      this.isclick();
    },
    checkList() {

      this.currentPage = 1;
      this.isclick();

    }


  },
  components: {
    outbutton
  }
}
</script>

<style scopen lang="less">
// .toolbar {
//   div {
//     float: left;
//     margin-left: -40px;
//   }
// }
.aside-left {
  margin: 0 50px;
  // border:solid red 1px;
  // color:red;
}
.dialog-footer {
  position: relative;
  top: -20px;
}

</style>