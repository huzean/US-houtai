<template>
    <div style="padding-bottom:10px">
        <el-table :fit=true class='listTab' :data="listData"  highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column width="" label="现金部分价格(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.cashPrice}}</span>/<span  class="afterClass">{{scope.row.changeAfter.cashPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column width="" label="结算积分(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.costPoints}}</span>/<span  class="afterClass">{{scope.row.changeAfter.costPoints}}</span>
                </template>
            </el-table-column>
            <el-table-column width="" label="奖励积分(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.rewardPoints}}</span>/<span  class="afterClass">{{scope.row.changeAfter.rewardPoints}}</span>
                </template>
            </el-table-column>
            <el-table-column width="" label="兑换所需积分(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.pointsPrice}}</span>/<span  class="afterClass">{{scope.row.changeAfter.pointsPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" label="用途限制(前/后)">
                <template slot-scope="scope">
                    <span v-if="scope.row.changeBefore.isLimit==1">无限制</span><span v-if="scope.row.changeBefore.isLimit==2">数量限制</span>
                    /
                    <span class="afterClass" v-if="scope.row.changeAfter.isLimit==1">无限制</span><span class="afterClass" v-if="scope.row.changeAfter.isLimit==2">数量限制</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="限制数量(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.limitAmount}}</span>/<span  class="afterClass">{{scope.row.changeAfter.limitAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180" label="一级分类名称(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.topClass}}</span>/<span  class="afterClass">{{scope.row.changeAfter.topClass}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180" label="二级分类名称(前/后)">
                <template slot-scope="scope">
                    <span>{{scope.row.changeBefore.subClass}}</span>/<span  class="afterClass">{{scope.row.changeAfter.subClass}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updateUser" width="" label="操作人"></el-table-column>
            <el-table-column prop="updateTime" width="150" label="更新时间"></el-table-column>
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
        this.listOption.commodityId=this.$store.state.goodsLog.data.id;
        this.getListData();
    },
    methods:{
        getListData(){
            this.listLoading = true;
            var options={
                url:'/getCommodityUpdateLog',
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
            })
        }
    }
}
</script>
<style lang="scss">
    .afterClass{
        color: #ff0000;
    }
</style>
