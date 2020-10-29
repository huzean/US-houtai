<template>
    <div style="padding-bottom:10px">
        <el-table :fit=true class='listTab' :data="listData"  highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="stocksChange" width="" label="库存变动量"></el-table-column>
            <el-table-column width="" label="可用库存(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.stocksAvailableBefore}}</span>/<span class="afterClass">{{scope.row.stocksAvailableAfter}}</span>
                </template>
            </el-table-column>
            <el-table-column width="" label="冻结库存(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.stocksLockBefore}}</span>/<span class="afterClass">{{scope.row.stocksLockAfter}}</span>
                </template>
            </el-table-column>
            <el-table-column width="" label="总库存(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.stocksTotalBefore}}</span>/<span class="afterClass">{{scope.row.stocksTotalAfter}}</span>
                </template>
            </el-table-column>
            
            <el-table-column prop="updateTime" width="" label="更新时间"></el-table-column>
            <el-table-column prop="userId" width="" label="操作人id"></el-table-column>
            <el-table-column prop="updateUser" width="" label="操作人"></el-table-column>
        </el-table>

        <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination background :current-page.sync="listOption.pageIndex" layout="prev, pager, next" @current-change="getListData" :page-size="listOption.pageSize" :total="listOption.allCount" style="float:right;">
        </el-pagination>
      </el-col>
    </div>
</template>
<script>
export default {
    data () {
        return {
            listData:[],
            listLoading: false,
            listOption:{
                pageIndex: 1,
                pageSize: 10,
                allCount: 10
            }
        }
    },
    created(){
        this.listOption.commodityId=this.$store.state.goodsStockLog.data.id;
        // console.log(this.listOption.commodityId)
        this.getListData();
    },
    methods:{
        getListData(){
            this.listLoading = true;
            var options={
                url:'/getCommodityStockLog',
                arg:this.listOption
            };
            this.gob.get(this,options).then(res=>{
                this.listLoading = false;
                if(res.code == 10000){
                    this.listData = res.data.logs;
                    this.listOption.allCount=res.data.totalRows;
                }else{
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error'
                    });
                }
                console.log(this.listData)
            })
        }
    }
}
</script>
<style lang="scss">
    .afterClass{
        color: #f00;
    }
</style>