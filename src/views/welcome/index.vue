<template>
  <div id="welcome_page">
    <div class="welcome_page_main centerposition">
      <img src="../../assets/images/welcome.png" alt="">
      <div>当前进入的是{{businessName}}商家</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data: function () {
    return {
      businessName:null,
    }
  },
  created: function () {
    this.businessName=this.$route.query.Name;
  },
  mounted: function () {
  },
  methods: {},
  components: {},
  computed: {}
}
</script>

<style lang="scss">
 #welcome_page{
   position: relative;
   width: 100%;
   height: 100%;
   text-align: center;
 .welcome_page_main{
   position: absolute;
    img{
      margin: 0 auto;
      display: block;
      width: 200px;
    }
    *{
      color:#E6A23C;
      padding: $commonP;
      font-size: 30px;
    }
  }

 }
</style>
