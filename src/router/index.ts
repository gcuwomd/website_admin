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
// router.beforeEach((to, from) => {

// });

export { router };
