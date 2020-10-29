/**
 * Created by linxue on 2019/11/26.
 */
import editBtn from './editBtn.vue'
import deleteBtn from './deleteBtn.vue'
import warningBtn from './warningBtn.vue'
import otherBtn from './otherBtn.vue'
import successBtn from './successBtn.vue'
var commonBlock = {
  install: function (Vue) {
    Vue.component('com_editBtn', editBtn),
    Vue.component('com_deleteBtn', deleteBtn),
    Vue.component('com_warningBtn', warningBtn)
    Vue.component('com_otherBtn', otherBtn)
    Vue.component('com_successBtn', successBtn)
  }
}

// 导出组件
export default commonBlock
