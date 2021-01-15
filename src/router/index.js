import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //会员中心
  {
    path: "/",
    name: "memberCenter",
    component: resolve => require(["@/view/memberCenter"], resolve),
    meta: {
      keepAlive: true,
      isBack: false // 判断是否为返回操作
    }
  },
   //每日签到
  {
    path: "/signIn",
    name: "signIn",
    component: resolve => require(["@/view/signIn"], resolve)
  },
  //成长值记录
  {
    path: "/growthValueRecord",
    name: "growthValueRecord",
    component: resolve => require(["@/view/growthValueRecord"], resolve)
  },
  //积分记录
  {
    path: "/IntegralRecord",
    name: "IntegralRecord",
    component: resolve => require(["@/view/IntegralRecord"], resolve)
  },
  //会员卡概述
  {
    path: "/gradeDescription",
    name: "gradeDescription",
    component: resolve => require(["@/view/gradeDescription"], resolve)
  }
];

const router = new VueRouter({
  // mode: 'history',
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
