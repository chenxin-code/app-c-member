import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //会员中心:首页
  {
    path: "/",
    name: "memberCenter",
    component: resolve => require(["@/view/member/memberCenter"], resolve),
    meta: {
      keepAlive: true,
      isBack: false // 判断是否为返回操作
    }
  },
  //每日签到
  {
    path: "/signIn",
    name: "signIn",
    component: resolve => require(["@/view/member/signIn"], resolve)
  },
  //成长值记录
  {
    path: "/growthValueRecord",
    name: "growthValueRecord",
    component: resolve => require(["@/view/member/growthValueRecord"], resolve)
  },
  //积分记录
  {
    path: "/IntegralRecord",
    name: "IntegralRecord",
    component: resolve => require(["@/view/member/IntegralRecord"], resolve)
  },
  //会员卡概述
  {
    path: "/gradeDescription",
    name: "gradeDescription",
    component: resolve => require(["@/view/member/gradeDescription"], resolve)
  },
  //帮豆兑换
  {
    path: "/bangdouExchange",
    name: "bangdouExchange",
    component: resolve => require(["@/view/member/bangdouExchange"], resolve)
  },
  //领券中心
  {
    path: "/couponsClaim",
    name: "couponsClaim",
    component: resolve => require(["@/view/coupons/claim"], resolve)
  },
  //我的卡券
  {
    path: "/couponsMine",
    name: "couponsMine",
    component: resolve => require(["@/view/coupons/mine"], resolve)
  },
  //使用记录
  {
    path: "/useLog",
    name: "useLog",
    component: resolve => require(["@/view/coupons/useLog"], resolve)
  },
  //兑换优惠券
  {
    path: "/exchangeCoupon",
    name: "exchangeCoupon",
    component: resolve =>
      require(["@/view/coupons/mine/exchangeCoupon"], resolve)
  }
];

const router = new VueRouter({
  // mode: 'history',
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
