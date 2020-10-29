<template>
  <input class="YS_input" type="text" v-model.trim="endValue" @keydown="enterBtnHandle" :placeholder="placeHolder" :disabled="disabled">
</template>

<!--使用方式：  <com_nameInput placeHolder="商品名称" ref="com_nameInput" :proVal.sync="listOption.commodityName" @enterBtnHandle="getListData"></com_nameInput>-->

<script>
    export default {
      props: ["placeHolder",'disabled'],
      data: function () {
          return {
            endValue:'',
          }
      },
      watch:{
        'endValue':function(newVal,oldVal){
          this.$emit('update:proVal',newVal);
        }
      },
        created: function () {

        },
        mounted: function () {

        },
        methods: {
          clearEndValue:function(){//主要用于全部时的清除
            this.endValue="";
          },
          enterBtnHandle:function(ev){
            if(ev.keyCode==13){//回车键
                this.$emit("enterBtnHandle")
            }
          }
        },
        components: {},
        computed: {},
    }
</script>
