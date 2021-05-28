import Vue from "vue";

//项目配置文件记得检查！！！！


//打包前检查！！！！
//打包前检查！！！！
//打包前检查！！！！
Vue.prototype.$isProdBuild = false;//生产包 => true   uat包 => false
//打包前检查！！！！
//打包前检查！！！！
//打包前检查！！！！


//开发模式 会员id
Vue.prototype.$memberId = '2246728470920953932';


/*
* 开发模式 token  1天内有效
* 获取token
* POST请求
* http://m-center-uat-linli.timesgroup.cn/times/auth/oauth/token?grant_type=sms_code&client_id=app_c&client_secret=times&username=15626127382&password=210527&scope=all
* username  15626127382  会员id对应手机号
* password  210527  当天日期
* */
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTYyNjEyNzM4MiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1Mjk5NDYzOTIyNzI1NzU2MSwiZXhwIjoxNjIyMTUyNjkyLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiNWJiMWQwYmMtMjc0ZS00MWUzLTg4OWEtNmYyMmRkNDRlZjEzIiwiY2xpZW50X2lkIjoiYXBwX2MifQ.f5O_Bfe0-8SFgNPEzsCXX3sGz5aoD15hCAss8KK1ELBquMhqrHSsS5V5Awko2DMUE0T2l4e6klzqeyrrtHZI3nBvOIoFUqCGloB6JLjc-1yLVNe6U2RRoW5oaPi00CNkqibFoKOfqi-L1WC9nssfo-ZevMVee2HjChfo5iZQ9YroRAPy1_Vj_1i8sAtx9cuZdTcdb8tEKVHtQfl2_L7DfAVrzX6Q0w-LvVYMAw2f6nP_hXYbtfBtpHTEYSyacPDHuCgOn-T8AELGPKSUFhB9-LmQ1JYmpIHF9-d6LsX-owYqAAcgpt0Z7Y8PgzlYr8j5oCQxTIdDwF4HqxV6VtlqVA';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

