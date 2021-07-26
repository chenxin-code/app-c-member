//项目配置文件
import Vue from "vue";


/*
* 打包类型
* 打生产包还是uat包  打包前记得检查
* 生产包 => true   uat包 => false
*/
Vue.prototype.$isProdBuild = process.env.VUE_APP_CURENV === 'production';


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
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTYyNjEyNzM4MiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1Mjk5NDYzOTIyNzI1NzU2MSwiZXhwIjoxNjMxMTg4Nzk4LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiOWIxM2E5NzctYzEzOC00YTQyLWE1YzUtYjY0M2ZiN2Q3Yjc0IiwiY2xpZW50X2lkIjoiYXBwX2MifQ.FWRsbAzEDyww2xUQy3NX4NB1hC5AqUrYoSorlgn4ka3PDCmIVGarR3W06dkTiqsTJqERVfKyNzhvtaSZrH8tL78eC-UZQlb_ZDQi0y1eNWUq-vuug9_om8HN-yWR99Gv-rAxQxsqDdoeYmvs2Nx7ShKZQ4Qik4pE6IlgSpQKQ9ZHNc_nACTDaM1wKLJzygQ2fbb1XOQSlnVMPiRxKoxgQy-SVwEkAbuuv4uMHyOGmWt7_kLCe9ts9WEHEcWJYVQMHvkzhbguFDIzFzQ7m3Mi8w7HWpIBTF4d0MjBB9KcGx9KnbwKxJbMOkXjQC9hkMinwAsQkL_ewGzrWjq2_OYTRw';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

