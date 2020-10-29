<template>
  <div id="Layout_TopBar" class="clearfix">
    <div class="fl breadcrumb_Box">
      <div class="center fl">
        <breadcrumb/>
      </div>
    </div>
    <a href="javascript:;" class="fl backMalls" @click="$router.push('/malls/list')" v-if="$route.fullPath!='/malls/list'">
      <span class="iconfont icon-fanhui"></span>
      返回商家列表（当前商家为：{{businessName}} , ID:{{businessID}}, 商家编码:{{manage_businessCode}}）
    </a>
    <a href="javascript:;" class="fr loginOut iconfont icon-guanbi" @click="closeThisPage"> 关闭</a>
    <div class="fr timer">
      {{time}}
    </div>
    <div class="fr userinfo">
      {{sysUserName}}
    </div>
    <a href="javascript:;" @click="gob.localUrl(enter)" class="fr home iconfont icon-yonghuzhongxin-shouye"></a>
  </div>
</template>

<script>
  import breadcrumb from './breadcrumb.vue'
export default {
  props: [],
  data: function () {
    return {
      sysUserName:'',
      time:null,
      enter:this.gob.getApi().enterHref,
      businessName:null,
      businessID:null,
      manage_businessCode:null,
    }
  },
  created: function () {
    this.initUser();
    this.initBusinessinfo();
    this.time=new Date().toLocaleDateString() +'  '+( new Date().getHours() +':'+ new Date().getMinutes());
  },
  mounted: function () {
    this.openTimer();
  },
  methods: {
    initBusinessinfo: function(){
      this.businessName=this.$route.query.Name;
      this.businessID=this.$route.query.businessId;
      this.manage_businessCode=this.$route.query.Code;
    },
    closeThisPage: function () {
      this.gob.closeTimer();//清除定时器
      window.close()
    },
    openTimer: function() {//关闭页面或回到总系统时关闭清除
      window.mallManagement_titmer=setInterval(() => {
        this.time=new Date().toLocaleDateString() +'  '+( new Date().getHours() +':'+ new Date().getMinutes());
      },1000)
    },
    initUser: function(){
      this.sysUserName=JSON.parse(localStorage.userInfo).userCnName;
    }
  },
  components: {
    breadcrumb
  }
}
</script>

<style lang="scss">
 @import "./TopBar.scss";
</style>
