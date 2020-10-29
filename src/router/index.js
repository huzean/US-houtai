import Vue from "vue";
import Router from "vue-router";
import Layout from "../components/Layout/index.vue";
// import mallsLayout from "../components/mallsLayout/index.vue";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new Router({
  //mode:'history',
  routes: [
    {
      name: "商家管理",
      path: "/",
      redirect: "/managelist/godownentry",
      // name: '商家管理', path: '/', redirect: '/managelist',
      meta: {
        title: "商家列表"
      }
    }, //一定要有引号
    // {
    //   path: "/",
    //   component: mallsLayout,
    //   name: "mallsLayout",
    //   meta: {
    //     title: "商家列表"
    //   },
    //   children: [
    //     {
    //       path: "/malls/list",
    //       component: resolve => require(["../views/malls/list.vue"], resolve),
    //       name: "商家列表",
    //       meta: {
    //         title: "商家列表"
    //       }
    //     }
    //   ]
    // },
    {
      path: "/",
      component: Layout,
      name: "commonLayout",
      meta: {
        title: "welcome"
      },
      children: [
        {
          path: "/welcome",
          component: resolve =>
            require(["../views/welcome/index.vue"], resolve),
          name: "welcome",
          meta: {
            title: "welcome"
          }
        }
      ]
    },

    {
      path: "/",
      component: Layout,
      name: "commonLayout",
      meta: {
        title: "旺店通ERP管理"
        // parentId: 33,
      },
      icon: "icon-shangpin-",
      children: [
        {
          path: "/managelist/godownentry",
          component: resolve =>
            require(["@/views/managelist/godownentry.vue"], resolve),
          name: "",
          meta: {
            title: "入库单管理"
          }
        },

        {
          path: "/managelist/deliverylist",
          component: resolve =>
            require(["@/views/managelist/deliverylist.vue"], resolve),
          name: "",
          meta: {
            title: "出库单管理"
          }
        },

        {
          path: "/managelist/synchronousrecording",
          component: resolve =>
            require(["@/views/managelist/synchronousrecording.vue"], resolve),
          name: "同步记录",
          // hidden: true,
          meta: {
            title: "同步记录"
          }
        },

        {
          path: "/managelist/list",
          component: resolve =>
            require(["@/views/managelist/list.vue"], resolve),
          name: "同步异常信息",
          // hidden: true,
          meta: {
            title: "同步异常信息"
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(routes => {
  routes.matched.forEach(path => {
    document.title = routes.meta.title;
  });
});
//

export { router };
