webpackJsonp([3],{"9YYq":function(t,e){},An6x:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("4YfN"),n=a.n(l),r={data:function(){return{listData:[],params:{currentPage:1,pageSize:10,total:null},listValue:{taskType:"",stockType:""}}},created:function(){this.information()},methods:{information:function(){var t=this;this.gob.postJson(this,{url:"usys-wdt-erp/management/stockSynchronizeExceptionMsgLog/selectList",arg:n()({},t.listValue,{page:{current:this.params.currentPage,size:this.params.pageSize}})}).then(function(e){t.listData=e.data.stockSynchronizeExceptionMsgLogEntities,t.params.total=e.data.total,console.log("res",e)})},handleSizeChange:function(t){this.params.pageSize=t,this.information()},currentChange:function(t){this.params.currentPage=t,this.information(),console.log("page",t)},allList:function(){this.listValue.taskType="",this.listValue.stockType="",this.currentPage=1,this.information()},checkList:function(){this.currentPage=1,this.information()}},components:{}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"50px",inline:!0,model:t.listValue,type:"expand"}},[a("el-select",{attrs:{placeholder:"执行类型",clearable:""},model:{value:t.listValue.taskType,callback:function(e){t.$set(t.listValue,"taskType",e)},expression:"listValue.taskType"}},[a("el-option",{attrs:{label:"手动同步",value:1}}),t._v(" "),a("el-option",{attrs:{label:"自动同步",value:2}})],1),t._v(" "),a("el-select",{attrs:{placeholder:"库存类型",clearable:""},model:{value:t.listValue.stockType,callback:function(e){t.$set(t.listValue,"stockType",e)},expression:"listValue.stockType"}},[a("el-option",{attrs:{label:"入库",value:1}}),t._v(" "),a("el-option",{attrs:{label:"出库",value:2}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.checkList}},[t._v("查询")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.allList}},[t._v("全部")])],1)],1),t._v(" "),a("el-table",{attrs:{data:t.listData,"row-style":{height:"40px"},"highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"id",label:"ID号",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"taskType",label:"执行类型",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(1===e.row.taskType?"手动同步":"自动同步"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"stockType",align:"center",label:"库存任务类型",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(1===e.row.stockType?"入库":"出库"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",prop:"exceptionMsg",label:"异常信息",width:"500"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"同步时间",width:"250",align:"center"}})],1),t._v(" "),a("el-pagination",{staticStyle:{margin:"20px 100px",float:"right"},attrs:{"page-sizes":[10,20,30,40],layout:"total, prev, pager, next","current-page":t.params.currentPage,"page-size":t.params.pageSize,total:t.params.total},on:{"current-change":t.currentChange,"size-change":t.handleSizeChange,"update:currentPage":function(e){return t.$set(t.params,"currentPage",e)},"update:current-page":function(e){return t.$set(t.params,"currentPage",e)}}})],1)},staticRenderFns:[]};var i=a("C7Lr")(r,s,!1,function(t){a("9YYq")},"data-v-367c0d30",null);e.default=i.exports}});