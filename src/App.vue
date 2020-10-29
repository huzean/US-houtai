<template>
  <div id="app">
    <transition :name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
useType:1,//用途类型  1默认血之缘 101 广发信用卡商家;102 广发信用卡用户
<script>
export default {
  name: 'App',
  created(){
  },
  mounted:function(){
  },
  methods:{
  },
  data:function () {
    return{
      fade:'vux-pop-nor',
      color:''
    }
  },
  components:{
  },
  beforeDestory: function(){
//    this.gob.closeTimer();//清除定时器
  }

  }
</script>

<style lang="scss">
  #app{
    height: 100%;
  }
  @import "./assets/css/style.scss";
  /* // 滚动条的滑块 */
  ::-webkit-scrollbar {
width: 1px;
height: 1px;
}
  /* // 滚动条的滑块 */
::-webkit-scrollbar-thumb {
background-color: #a1a3a9;
border-radius: 0px;
}
</style>
