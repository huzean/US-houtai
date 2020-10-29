import axios from "axios";
import qs from "qs";
import store from "./store/store.js";

let gob = {
  //域名配置
  api: {
    testApi: {
      bpsApi: "https://gate.youhuiduo.cn/usys/bps_shop_api",
      enterHref: "https://web.youhuiduo.cn/admin/#/mian/enter",
      managementApi: "https://gate.youhuiduo.cn/",
      MGoodApi: "https://gate.youhuiduo.cn/usys/bps_shop_api/management/", //实物商品
      VGoodApi: "https://gate.youhuiduo.cn/usys/bps_shop_api/product/", //虚拟商品
      authApi: "https://gate.youhuiduo.cn/usys/authCenter/management",
      goodApi: "https://cms.youhuiduo.cn/Goods",
      jinbimanageApi: "https://jinbimanage.youhuiduo.cn/api",
      urlApi: {
        source: "https://source.ujinbi.com/UJBMS/", //上传图片后，图片显示的地址
        locationURL: "https://web.youhuiduo.cn/admin/#/login" //测试登录
      }
    },
    proApi: {
      bpsApi: "https://gate.ujinbi.com/usys/bps_shop_api", //正式
      enterHref: "https://web.ujinbi.com/admin/#/mian/enter", //正式
      managementApi: "https://gate.ujinbi.com/", //正式
      MGoodApi: "https://gate.ujinbi.com/usys/bps_shop_api/management/", //实物商品
      VGoodApi: "https://gate.ujinbi.com/usys/bps_shop_api/product/", //虚拟商品
      authApi: "https://gate.ujinbi.com/usys/authCenter/management",
      goodApi: "https://gate.ujinbi.com/usys/jinbi_api_goods/Goods",
      urlApi: {
        source: "https://source.ujinbi.com/UJBMS/", //上传图片后，图片显示的地址
        locationURL: "https://web.ujinbi.com/admin/#/login" //正式登录
      },
      jinbimanageApi: "https://jinbimanage.youhuiduo.net/api"
    }
  },

  getApi: function() {
    if (location.host.indexOf("ujinbi") == -1) {
      return this.api.testApi;
      //return this.api.proApi;
    } else {
      return this.api.proApi;
    }
  },
  
  getCookie: function(name) {
    //本地测试
    // const userinfo = {
    //   token:"tkeyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OC1tYW5hZ2VtZW50IiwiaWF0IjoxNTk2NTE5NzQ0LCJleHAiOjE1OTkxMTE3NDR9.aLvygW-rTD4L8MR-7JIIYFjHhg0isJT47ymc3qfproA","jinbiToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlM2YzZWJhYzBjOGU0NDhkODg3NDY3ZTVjZTAwZDExMCIsInJvbGUiOiJNYWxsQWRtaW4iLCJpc3MiOiJ1c3lzIiwiZXhwIjoxNTk2NjA2MTQ0LCJpYXQiOjE1OTY1MTk3NDQsImFjY291bnQiOiJIb25nWmVBbiIsImZyZXNoZW4iOjE1OTY1NzczNDQsImp0aSI6ImExNzQ4NWQwZDQ0YTQ0YzA4NGIxZjcwNzI4OWU2ZTkzIn0.I4ll_Z7jfX0Vzq2-7ygh1-6Yym4tXygYe_xbZ7WDwyM","userName":"HongZeAn","loginWrongCounts":0,"systems":null,"userId":58,"superAdminFlag":1,"userCnName":"洪泽安","userIdentity":null,"deptId":4,"phone":""
    // };
    // localStorage.userInfo = JSON.stringify(userinfo);

    //localStorage---
    if (localStorage.userInfo) {
      // var strcookie = JSON.parse(localStorage.userInfo).token;
      // return strcookie
      //增加金币token处理
      var strcookie = {
        token: JSON.parse(localStorage.userInfo).token,
        jinbiToken: JSON.parse(localStorage.userInfo).jinbiToken
      };
      return strcookie[name];
    } else {
      var confirmRes = confirm("获取登录信息失败！请重新登录");
      if (confirmRes) {
        window.location = this.getApi().urlApi.locationURL;
      }
    }
  },

  uploadFile: function(vueObj, options, newUrl) {
    var gob = this;
    var ipName = newUrl || gob.getApi().managementApi;

    return new Promise(function(resolve, reject) {
      axios
        .post(ipName + options.url, options.arg, {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          }
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },

  downloadBlob: function(vueObj, options, newUrl) {
    var gob = this;
    var ipName = newUrl || gob.getApi().managementApi;
    options.arg = options.arg || {};
    options.arg.businessId = vueObj.$route.query.businessId
      ? vueObj.$route.query.businessId
      : "";
    return new Promise(function(resolve, reject) {
      axios
        .post(ipName + options.url, options.arg, {
          responseType: "blob",
          headers: {
            "Ujinbi-Token": gob.getCookie("token"),
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            return vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            return vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
          }

          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  post: function(vueObj, options, newUrl) {
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().managementApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.businessId = vueObj.$route.query.businessId
      ? vueObj.$route.query.businessId
      : "";
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      axios
        .post(ipName + options.url, qs.stringify(options.arg), {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          }
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  postJson: function(vueObj, options, newUrl) {
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().managementApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    // options.arg.businessId = vueObj.$route.query.businessId
    //   ? vueObj.$route.query.businessId
    //   : "";
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      axios
        .post(ipName + options.url, options.arg, {
          headers: {
            "Ujinbi-Token": gob.getCookie("token"),
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
          console.log("catch:");
          console.log(error);
        });
    });
  },
  postBlob: function(vueObj, options, newUrl) {
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().managementApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    return new Promise(function(resolve, reject) {
      axios
        .post(ipName + options.url, options.arg, {
          responseType: 'blob',//文档类型
          headers: {
            "Ujinbi-Token": gob.getCookie("token"),
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
          console.log("catch:");
          console.log(error);
        });
    });
  },
  get: function(vueObj, options, newUrl) {
    //get请求
    var gob = this;
    var ipName = "";

    !newUrl ? (ipName = gob.getApi().managementApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.businessId = vueObj.$route.query.businessId
      ? vueObj.$route.query.businessId
      : "";
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      // axios.get(ipName+options.url,{ params:options.arg})
      axios
        .get(ipName + options.url, {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          },
          params: options.arg
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            vueObj.$message.info(response.data.msg);
            return;
          }
          if (response.data.code == -1) {
            vueObj.$message.error(response.data.msg);
          }
          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  getM: function(vueObj, options, newUrl) {
    //请求实物商品
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().MGoodApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.businessId = vueObj.$route.query.businessId
      ? vueObj.$route.query.businessId
      : "";
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      // axios.get(ipName+options.url,{ params:options.arg})
      axios
        .get(ipName + options.url, {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          },
          params: options.arg
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            vueObj.$message.info(response.data.msg);
            return;
          }
          if (response.data.code == -1) {
            vueObj.$message.error(response.data.msg);
          }
          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  getV: function(vueObj, options, newUrl) {
    //请求虚拟商品
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().VGoodApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.businessId = vueObj.$route.query.businessId
      ? vueObj.$route.query.businessId
      : "";
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      // axios.get(ipName+options.url,{ params:options.arg})
      axios
        .get(ipName + options.url, {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          },
          params: options.arg
        })
        .then(function(response) {
          if (response.data.code == 40000) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 50007) {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            return;
          }

          if (
            response.data.code == -1 &&
            response.data.msg.indexOf("token") != -1
          ) {
            vueObj.$message.error(response.data.msg);
            //window.location.href = gob.getApi().enterHref;
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            vueObj.$store.dispatch("setState", {
              name: "auth",
              value: { currentAuth: false }
            }); //无权限
            vueObj.$message.info(response.data.msg);
            return;
          }
          if (response.data.code == -1) {
            vueObj.$message.error(response.data.msg);
          }
          vueObj.$store.dispatch("setState", {
            name: "auth",
            value: { currentAuth: true }
          }); //有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  jinbiPost: function(vueObj, options, newUrl) {
    //用于跟金币后台相关请求对接
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().mainApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.operatorId = JSON.parse(localStorage.userInfo).userId; //数据添加人 不可编辑
    options.arg.operator = JSON.parse(localStorage.userInfo).userName; //数据添加人 不可编辑

    return new Promise(function(resolve, reject) {
      axios
        .post(ipName + options.url, qs.stringify(options.arg), {
          headers: {
            "Ujinbi-Token": gob.getCookie("jinbiToken")
            // 'Content-Type':'application/json'
          }
        })
        .then(function(response) {
          if (response.data.code == 40002) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 40019) {
            //需要刷新token
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:false}});//无权限
            return;
          }

          // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:true}});//有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  jinbiPostJson: function(vueObj, options, newUrl) {
    //用于跟金币后台相关请求对接
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().mainApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    options.arg.operatorId = JSON.parse(localStorage.userInfo).userId; //数据添加人 不可编辑
    options.arg.operator = JSON.parse(localStorage.userInfo).userName; //数据添加人 不可编辑
    options.arg.bpsBusinessCode = vueObj.$route.query.Code
      ? vueObj.$route.query.Code
      : ""; //商家编码

    return new Promise(function(resolve, reject) {
      axios
        .post(ipName + options.url, options.arg, {
          headers: {
            "Ujinbi-Token": gob.getCookie("jinbiToken"),
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          if (response.data.code == 40002) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 40019) {
            //需要刷新token
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:false}});//无权限
            return;
          }

          // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:true}});//有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  jinbiGet: function(vueObj, options, newUrl) {
    //get请求 用于跟金币后台相关请求对接
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().mainApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    return new Promise(function(resolve, reject) {
      console.log("jinbiGet");
      axios
        .get(ipName + options.url, {
          headers: {
            "Ujinbi-Token": gob.getCookie("jinbiToken")
          },
          params: options.arg
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 40002) {
            var confirmRes = confirm("登录过期，请重新登录");
            localStorage.removeItem("userInfo");
            if (confirmRes) {
              window.location = gob.getApi().urlApi.locationURL;
            }
            return;
          } else if (response.data.code == 40019) {
            //要刷新token
          }

          if (response.data.code == -1 && response.data.msg == "无权操作") {
            // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:false}});//无权限
            return;
          }

          // vueObj.$store.dispatch('setState',{name:'auth',value:{currentAuth:true}});//有权限
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  //刷新金币token
  jinbiTokenRefresh() {
    let options = {
      url: gob.getApi().authApi + "/auth/jinbiFreshen",
      arg: {
        "Ujinbi-Token": this.getCookie("jinbiToken")
      }
    };
    return new Promise(function(resolve, reject) {
      axios
        .post(options.url, qs.stringify(options.arg), {
          headers: {
            "Ujinbi-Token": gob.getCookie("token")
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.data.code == 10000) {
            let jinbiToken = response.data.data;
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            userInfo.jinbiToken = jinbiToken;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            resolve(response.data);
          } else {
            Message.error(response.data.msg);
          }
        });
    });
  },
  //查看商品更新日志
  checkGoodsLog: function(itemData) {
    console.log("查看商品更新日志");
    store.dispatch("setState", {
      name: "goodsLog",
      value: {
        onOff: true,
        data: itemData
      }
    });
  },

  //查看商品库存日志
  checkGoodsStockLog: function(itemData) {
    store.dispatch("setState", {
      name: "goodsStockLog",
      value: {
        onOff: true,
        data: itemData
      }
    });
  },

  //退出登录
  logout: function(vueObj) {
    vueObj
      .$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
      .then(function() {
        sessionStorage.removeItem("user");
        this.post(
          vueObj,
          { url: "/auth/logout", arg: { token: this.getCookie(11) } },
          this.getApi().authApi
        ).then(function(res) {
          if (res.code == 10000) {
            localStorage.removeItem("userInfo");
            window.location = this.getApi().urlApi.locationURL;
          } else {
            alert("退出失败！");
          }
        });
      });
  },
  localUrl: function(url) {
    window.location.href = url;
  },
  //事件委托
  getTargetObj: function(classStr, callback) {
    $(document)
      .off("click")
      .on("click", function(ev) {
        var oEvent = ev || event;
        oEvent.cancelBubble = true;
        var targetObj = $(ev.target);
        if (
          targetObj.attr("class") &&
          targetObj.attr("class").indexOf(classStr) != -1
        ) {
          callback(targetObj);
        }
      });
  },
  resCallback: function(vueObj, options) {
    if (
      (options.res.Code == 10000 && options.res.Data.IsSuccess) ||
      options.res.code == 10000
    ) {
      vueObj.$message({
        message: options.res.msg,
        type: "success"
      });
      if (options.successFn) options.successFn();
    } else {
      var mes = options.res.msg ? options.res.msg : "操作失败！";
      vueObj.$message.error(mes);
      if (options.errFn) options.errFn();
    }
  },
  //判断是否为血之缘商家
  isbloodedge(vueObj) {
    var code = vueObj.$route.query.Code;
    var res =
      code == "bloodedge" || code == "bloodedge-sh" || code == "bloodedge-bj";
    return res;
  },
  //是否显示可编辑显示结算价格  结算积分必须大于0
  isEditCashPrice: function(vueObj) {
    var code = vueObj.$route.query.Code;
    var res =
      code == "bloodedge" ||
      code == "bloodedge-sh" ||
      code == "sy-jufengchao" ||
      code == "bloodedge-bj" ||
      code == "CGBC-CC-YH" ||
      code == "CGBC-CC-SJ";
    return res;
  },

  // 清除定时器
  closeTimer: function() {
    //alert("清除定时器")
    clearInterval(window.mallManagement_titmer);
  },
  //用于请求文档流
  getArraybuffer: function(options, newUrl) {
    //get请求
    var gob = this;
    var ipName = "";
    !newUrl ? (ipName = gob.getApi().managementApi) : (ipName = newUrl);
    options.arg = options.arg || {};
    return new Promise(function(resolve, reject) {
      // axios.defaults.headers['ujinbi-token'] = gob.getCookie("token");//正式
      axios({
        method: "get",
        url: ipName + options.url,
        responseType: "arraybuffer",
        headers: {
          "Ujinbi-Token": gob.getCookie("token")
        }
      }).then(function(response) {
        resolve(response.data);
      });
    });
  },
  //导出订单表格数据
  //businessId 商家id
  getExcel: function(businessId, name, unsignedDays) {
    this.getArraybuffer({
      url:
        "/exportOrderExcel?businessId=" +
        businessId +
        "&unsignedDays=" +
        unsignedDays
    }).then(function(res) {
      var elink = document.createElement("a");
      elink.download = name + ".xls";
      elink.style.display = "none";
      var blob = new Blob([res], { type: "application/vnd.ms-excel" });
      elink.href = window.URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    });
  }
};

export default gob;
