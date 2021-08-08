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
Vue.prototype.$isProdBuild = false;


//开发模式 会员id
Vue.prototype.$memberId = '2436937832133034029';


/*
* 开发模式 token
* 获取token
* POST请求
* http://m-center-uat-linli.timesgroup.cn/times/auth/oauth/token?grant_type=sms_code&client_id=app_c&client_secret=times&username=&password=&scope=all
* username  会员id对应手机号
* password  短信验证码
*/
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzAyNTM0NzAyNSIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjUzNzQ0MzQzNDExMzc5NDg2NywiZXhwIjoxNjI4NDg4NzgyLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6Ijg3NDM1NjMzLTRmNTUtNGRiZS1iNmNkLThjNDlmNTkzMTkyMiIsImNsaWVudF9pZCI6ImFwcF9jIn0.AUr-DbZMENq50vAbOohiBCa8SMCbPQ7xOn32q1Rtj9F8WcK9ch-fOygW56tfJku9IhrZMknB9eFBJ6_kx0Mr3JJhwrZkABlZGlqt41sx949_dCvHPacfvr9VBpDs5yxzWG0Kf2r4xSLBD64JuOjm4GcVE97LJZRWzfPwEpn2F91Lr_k_MNQ44klOrqWosGuEzWNdcFefU6opeAK9hQ2ABPX-CkcrbV5QMmfaMjbatCMLZgwJb6vjh36FGBmrb2Yt8ERG6JYrnkjJtxrZ-k2eOpJ60OcNDfpYZDclYHNS5YQ3hs9-IIX2dpctO6rzavUNOQM6Tr9cPXY_bTXu5kZkSA';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

