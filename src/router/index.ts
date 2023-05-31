/*
 * @Author: lzp
 * @Date: 2023-02-18 09:23:09
 * @LastEditors: lzp
 * @LastEditTime: 2023-02-25 13:09:41
 * @Description: 路由控制
 */
import { createRouter, createWebHashHistory } from "vue-router";

// 路由表
const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: ()=>import("../views/Login.vue"),
    name: "Login",
    meta: {
      position: "登录页",
    },
  },
  {
    path: "/index",
    component:()=> import("../views/Index.vue"),
    name: "Index",
    meta: {
      position: "首页",
    },
    children: [
      {
        path: "/member",
        component: ()=>import("../views/Member/Member.vue"),
        name: "Member",
        meta: {
          position: "成员管理",
        },
      },
      {
        path: "/checkLog",
        component: ()=>import("../views/log/log.vue"),
        name: "checkLog",
        meta: {
          position: "检查日志"
        }
      },
      {
        path: "/checkNoLog",
        component: ()=>import("../views/log/noLog.vue"),
        name: "checkNoLog",
        meta: {
          position: "无检查日志"
        }
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from,next) => {
  const token=localStorage.getItem("token")
  if (token) {
      //判断是否有token
      next();
  } else {
      //在没有token的前提下，to下面的path是否为/login，如果不是则页面跳转到登录页面
      if (to.path === "/login") {
      next();
      } else {
        next({ path: "/login" }); //跳转页面到login页
      }
  }

});

export { router };
