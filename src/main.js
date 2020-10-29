// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//路由
import {router} from './router'

//vuex状态管理
import Vuex from 'vuex'
import store from './store/store'

//zepto
import $ from 'zepto'
Vue.config.productionTip = false
//自动转换REM
import 'lib-flexible/flexible.js'
/* eslint-disable no-new */

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//iconfont
import '../public/font/iconfont.css';

//自定义组件
import commonBlock from './components/commonBlock/index';
Vue.use(commonBlock);

//全局方法
import gob from './gob' 
Vue.prototype.gob = gob

//自定义组件
import buttons from './components/buttons'
Vue.use(buttons);


//基本样式引入
import './assets/css/base.css'

new Vue({
  el: '#app',
  router,
  store,
 

  components: { App },
  template: '<App/>'
})

