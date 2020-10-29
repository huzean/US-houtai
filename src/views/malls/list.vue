<template>
  <div id="mall_listTable">
    <!--列表-->
    <el-table max-height="740" :data="listData" :fit=true highlight-current-row>
      <el-table-column type=index width="70" label="序列"></el-table-column>
      <el-table-column prop="permissionName" label="商家名称" width="100"></el-table-column>
      <el-table-column prop="permissionDesc" label="编码" width="120"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <com_editBtn @handleClick="enterInto(scope.row)" val="进入"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data:function() {
      return {
        listData:[],

      }
    },
    created:function(){
      this.getMalls();
    },
    methods: {
      enterInto:function(item){
        this.gob.get(this,{url:'/user/getBusinessId?businessCode='+ item.permissionDesc},
        this.gob.getApi().bpsApi).then((res)=>{
          this.$router.push('/welcome?Name='+item.permissionName+'&Code='+item.permissionDesc+'&businessId='+res.data);
       })

      },
      getMalls:function(){
        var _this=this;
        this.gob.get(this,{url:'/permission/upList',arg:{
          type:2,
          projectId:24,
          parentId:null,
        }},this.gob.getApi().authApi).then(function(res){
          _this.listData=res.data;
        })
      },
    },
    mounted:function() {
    }
  }

</script>

<style lang="scss">

#mall_listTable{
  width: 100% !important;
.el-table th.gutter{
  display: table-cell!important;
}
.el-table__body, .el-table__footer, .el-table__header{
  width: 100% !important;
}
.el-table__body-wrapper{
  width: 100%;
  max-height: 900px;
  overflow: auto;
}
}
</style>
