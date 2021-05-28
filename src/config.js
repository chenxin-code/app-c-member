//项目配置文件
import Vue from "vue";


/*
* 打包类型
* 打生产包还是uat包  打包前记得检查
* 生产包 => true   uat包 => false
*/
Vue.prototype.$isProdBuild = false;


//开发模式 会员id
Vue.prototype.$memberId = '2246728470920953932';


/*
* 开发模式 token
* 获取token
* POST请求
* http://m-center-uat-linli.timesgroup.cn/times/auth/oauth/token?grant_type=sms_code&client_id=app_c&client_secret=times&username=&password=&scope=all
* username  会员id对应手机号
* password  短信验证码
*/
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTYyNjEyNzM4MiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1Mjk5NDYzOTIyNzI1NzU2MSwiZXhwIjoxNjIyMjEwNDc3LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiMmFiODQ3MGMtMWFlZC00YzIwLWIyYTgtMzlhOTY0ZTczNDU3IiwiY2xpZW50X2lkIjoiYXBwX2MifQ.W_pT274hkDZ7hkVhFBLqxG2SGTnlxynstEunYT8D4yF1kyKlmlgIYDNd2tmCQs6paIXiCb7wWQpbYVDsdB60ZQAw2AO4eiyMsoTdVrwKJV6NOYttYvLcrzsScgOoEEGi-9c43CJl2JBxDRQrzcQApNGkNqP-74r-GduJD-A3NyBxgSDM03wu5Su_gK3DGfVc5stsfuOPez2Lppbb3ScaCTUUpwHrcCMC2ZAH2Gak47Zdd2j1RT9cr4fPmfNZww6-H5CVmeq6qV_uKOs1JhHrGEyH9x_LO7RiCZCmGnMxCYg8SocLljZuR7p7xD49RY4DL1lha3lACSV2doB0vTK1NQ';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

