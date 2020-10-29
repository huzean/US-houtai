/**
 * Created by Administrator on 2018/4/12.
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import userIcon from "../assets/images/userHead.png";
import logo from "../assets/images/logo.jpg";
export default new Vuex.Store({
  state: {
    sliderCollapse: false, //slider是否折叠
    auth: {
      currentAuth: false, //无权限页面
      projectId: 178 
      //旺店通ERP后台管理 测试178 正式210
      //旺店通ERP后台管理 测试178 正式210
    },
    systemInfo: {
      name: "积分商城管理后台",
      logo: logo
      
    },
    loginUser: {
      userName: "",
      avatar: userIcon
    },
    //查询商品更新日志
    goodsLog: {
      onOff: false,
      data: {}
    },
    //查询商品库存日志
    goodsStockLog: {
      onOff: false,
      data: {}
    }
  },
  getters: {
    getState: state => param => {
      return state[param];
    }
  },
  actions: {
    setState: (context, obj) => {
      context.commit("setState", obj);
    }
  },
  mutations: {
    setState: (state, obj) => {
      state[obj.name] = obj.value;
    }
  }
});
