<template lang='html'>
  <div id="login" v-bind:style="{ 'background-image': 'url(' + loginBg + ')'}">
    <div class='loginMain'>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">{{$store.state.systemInfo.name}}</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
      
    </div>

  </div>

</template>

<script>
import loginBg from '../../assets/images/login.jpg';
export default {
  data: function () {
    return {
      loginBg: loginBg,
      loginUser: this.$store.state.loginUser,
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      //                checked: true
    };
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {

    handleReset2: function () {
      this.$refs.ruleForm2.resetFields();
    },
    loginSubmit: function () {
      var _this = this;
      _this.logining = true;

      this.$refs.ruleForm2.validate(function (valid) {
        if (valid) {
          var loginParams = { id: 100, userName: _this.ruleForm2.account, password: _this.ruleForm2.checkPass };
          //登录成功后
          //                      loginParams.avatar=res.headerPhoto;
          loginParams.avatar = _this.$store.state.loginUser.avatar;
          _this.$store.dispatch('setState',
            {              name: 'loginUser',
              value: { name: loginParams.userName, avatar: loginParams.avatar, id: 100 }
            });
          localStorage.setItem('userInfo', JSON.stringify(loginParams));
          localStorage.jinbiMallsession = '12121212';

          _this.$router.push({ path: '/malls/list' })

        }
      });

    }
  }
}

</script>

<style lang="scss">
@import "style.scss";
</style>
