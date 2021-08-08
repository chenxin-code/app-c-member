/*
 * @Description: 这是***页面
 * @Date: 2021-08-06 16:41:52
 * @Author: shuimei
 * @LastEditTime: 2021-08-06 17:00:13
 */
//项目配置文件
import Vue from "vue";


/*
* 打包类型
* 打生产包还是uat包  打包前记得检查
* 生产包 => true   uat包 => false
*/
Vue.prototype.$isProdBuild = process.env.VUE_APP_CURENV === 'production';


//开发模式 会员id
Vue.prototype.$memberId = '2331048196588962398';


/*
* 开发模式 token
* 获取token
* POST请求
* http://m-center-uat-linli.timesgroup.cn/times/auth/oauth/token?grant_type=sms_code&client_id=app_c&client_secret=times&username=&password=&scope=all
* username  会员id对应手机号
* password  短信验证码
*/
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzkyNTE4MjUyNSIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjYyOTg1MDg5MjQzNzgxNjYyMywiZXhwIjoxNjI4MzI2NzMxLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6IjQwNTMzMDU4LTI5MDgtNDQ5Ny1iNzkwLTZlNmFkMzEyYTNlNCIsImNsaWVudF9pZCI6ImFwcF9jIn0.HU-efoARInLTYGPaPLcWebn5kYCjWmIGrdUO_VKtKNCyy6CWpN2wUDTwYAho4Jg0QhpaqbvOoasBp8UZwIN6kf0bkrWibcehGi6hBh28VZhUq8E12lhcwgvdZ71O7_Sp8Ag9oiLp7xm5Y3Wu67YVynEHI4ZIMimGMWwSZeQXd96nhBfKwEvWVWlR_AWjrl9H0dq1-HhNguGkngeVmtfKBlvuIN50R-nJNkGvER0g5a8RyrsqDNYVCNOx1oZBShnrFgkyYThmn_9FvukUiTmcz5Gn4GjSe2Mn3hCUeHCir9lZSLC8ep9rkQFVqlY4nG9FW_TQYWsCxGetw9HHWmTLbg';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

