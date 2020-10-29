<template>
  <div id="comSliderNav" :class="{'collapseNav':isCollapse}">
    <a href="javascript:;" class="controlIcon">
      <span class="iconfont icon-youduiqicopy fl" @click="changeisCollapse"></span>
    </a>
    <div class="sliderTop clearfix">
      <div class="sliderTop_main">
        <img class="logo" src="../../../assets/images/usys.png" alt="">
        <span class="" v-if="!isCollapse">旺店通ERP管理系统</span>
      </div>
    </div>
    <el-menu :default-active="$route.path" :collapse="isCollapse">
      <template v-for="(item,index) in leftNavList" v-if="item.authOff&&item.authOff==200">
        <el-submenu :index="index+''">
          <template slot="title">
            <span class="iconfont" :class="[item.icon]"></span>
            <span slot="title" v-if="!isCollapse">{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="goPage(child.path)" v-if="!child.hidden">{{child.meta.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: [],
  data: function () {
    return {
      isCollapse: false,
      leftNavList: [],
      leftNavList_auth: {}
    }
  },
  created: function () {
    this.getLeftNavList();
  },
  mounted: function () {
  },
  methods: {
    goPage: function (path) {
      if (path.indexOf('?') == -1) {
        var url = path + '?Name=' + this.$route.query.Name + '&Code=' + this.$route.query.Code + '&businessId=' + this.$route.query.businessId;
        this.$router.push(url)
      } else {
        var url = path + '&Name=' + this.$route.query.Name + '&Code=' + this.$route.query.Code + '&businessId=' + this.$route.query.businessId;
        this.$router.push(url)
      }
    },
    changeisCollapse: function () {
      this.isCollapse = !this.isCollapse;
      this.$store.dispatch('setState', {
        name: 'sliderCollapse',
        value: this.isCollapse
      })
    },
    getLeftNavList: function () {
      var _this = this;
      //        请求模块权限  根据权限模块的名字，子列表通过请求返回
      this.gob.get(this, {
        url: '/permission/upList', arg: {
          type: 3,
          projectId: this.$store.state.auth.projectId,
          parentId: null,
        }
      }, this.gob.getApi().authApi).then(function (res) {
        var resData = res.data;
        if (!resData || resData.length == 0) return;
        for (var i = 0; i < resData.length; i++) {
          _this.leftNavList_auth[resData[i].permissionName] = true;
        }
        _this.leftNavList = _this.$router.options.routes.map(function (val) {
          var val = val;
          if (_this.leftNavList_auth[val.meta.title]) {
            val.authOff = 200;
          }
          return val;
        })
      })
    },
  },
  components: {},
  computed: {}
}
</script>

<style lang="scss">
@import "./SliderNav.scss";
</style>
