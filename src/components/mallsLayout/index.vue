<template>
  <el-row class="container" id="mallsLayout">
    <div class="mallsLayout_top">
      <div class="malls_top">
        <img class="logo" src="../../assets/images/usys.png" alt="">
        <span>积分商城管理系统</span>
      </div>
    </div>
    <div style="padding: 50px">
      <router-view></router-view>
    </div>
  </el-row>
</template>

<script>
  export default {
    data:function() {
      return {
        enter:this.gob.getApi().enterHref,
        sysName:this.$store.state.systemInfo.name,
        collapsed:false,
        sysUserName:'',
        sysUserAvatar:'',
      }
    },
    created:function(){
      this.initUser()
    },
    methods: {
      initUser:function(){
        this.sysUserName=JSON.parse(localStorage.userInfo).userName;
      },

      //退出登录
      logout: function () {
        this.gob.logout(this);
      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
      },
      showMenu(i,status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      }
    },
    mounted:function() {
      var user = localStorage.getItem('jinbiMallUser');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    },
    components: {
    }
  }

</script>

<style lang="scss">
@import "./style.scss";
</style>
