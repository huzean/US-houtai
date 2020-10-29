import nameInput from './nameInput.vue'


var commonBlock = {
  install: function(Vue){
    Vue.component('com_nameInput',nameInput)
  }
}

// 导出组件
export default commonBlock
