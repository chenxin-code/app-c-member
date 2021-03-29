## 项目图谱

├── README.md // README 使用说明
├── babel.config.js // 1.babel预设环境 2.按需引入vant组件库(应该要做但是没有做)
├── package.json // 1.生产依赖和开发依赖 2.npm运行命令
├── public
│   ├── favicon.ico // 网站图标
│   └── index.html //模版文件
├── src
│   ├── App.vue // 根组件
│   ├── api // 项目api集合
│   │   ├── index.js // api出口
│   │   ├── member.js // 各个模块对应的方法
│   │   ├── pub.js // 各个模块对应的方法
│   │   └── urlConfig.js // axios请求url集合
│   ├── assets
│   │   ├── css // 全局和通用样式
│   │   │   ├── common.less
│   │   │   └── var.less
│   │   ├── img // 图片
│   │   └── logo.png // 没用的vue logo可以删除
│   ├── components // 项目组件
│   │   ├── confirmPopDetail.vue // 优惠券兑换组件(业务组件不应该在此处)
│   │   ├── index.js //无数据zk-empty组件出口
│   │   ├── null.vue //无数据null组件
│   │   ├── router-helper // router-helper组件(黄景龙版本)
│   │   │   ├── index.js
│   │   │   └── src
│   │   │       ├── router-helper.vue
│   │   │       └── routerHelper.js
│   │   └── zk-empty //无数据zk-empty组件
│   │       └── index.vue
│   ├── main.js // 项目入口文件
│   ├── router // 路由文件
│   │   └── index.js // 路由表
│   ├── store //vuex状态管理
│   │   ├── getters.js //vuex全局getters
│   │   ├── index.js //vuex出口
│   │   └── module //vuex模块
│   │       └── user.js //user模块, user.state.devServer 上生产改为"prod" || uat+dev是"dev"
│   ├── utils // 函数工具类
│   │   ├── ajax.js //axios二次封装
│   │   ├── common.js // 通用工具函数
│   │   ├── rem.js // rem
│   │   └── tools.js // routeHelper 熊辉版本
│   └── view // 各个模块页面
│       ├── coupons
│       │   ├── claim //领券中心
│       │   │   └── index.vue
│       │   ├── mine //我的
│       │   │   ├── exchangeCoupon.vue //优惠券兑换
│       │   │   └── index.vue //我的
│       │   ├── mixin // 提取出来的公共逻辑混入
│       │   │   ├── getCoupon-mixin.js
│       │   │   └── pageList.js
│       │   └── useLog //使用记录
│       │       └── index.vue
│       └── member
│           ├── IntegralRecord.vue //积分记录
│           ├── bangdouExchange.vue //帮豆兑换
│           ├── gradeDescription.vue //会员卡概述
│           ├── growthValueRecord.vue //成长值记录
│           ├── memberCenter.vue //会员中心(首页)
│           ├── memberRight.vue //会员权益
│           └── signIn.vue 每日签到
├── vue.config.js // webpack自定义配置
