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
Vue.prototype.$token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzAyNTM0NzAyNSIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjUzNzQ0MzQzNDExMzc5NDg2NywiZXhwIjoxNjI5MTg1NTg2LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6ImU0MTg2ZDk4LWM2NTMtNGJlYS04NTg1LWM1YmY5MmU1MDAzZiIsImNsaWVudF9pZCI6ImFwcF9jIn0.QcQ_fMEtvZwxkZ0abOjSn0zADx1DHl3oiXY_xfxiIfxQy0wCDlGg18cJbaIwvAj0lOVffFrOQxYwF7WX-noddgcCr-E1dKfi_ZYabVZgkD2FAs1avCI8ghMfOSiWmcK-mgrnlK-MqMqk3ESqxOd557--3Fpk2wiHp8ahYSHvuG1je4TtGPC1U7OzHtwyTBMh0MYt-KnfcPBGM9MHyIisYcAcp-6RXtQMInz_ca1wZbW6TUmiwIJtpT07KIaIf6UBgywz7mULzMYWgukwBdZ7Ai1Wc8IiU_7TgKI2qn5yoRt_WiDib_cVjocgU7E7NuTkhUjsKoFXlI2TerZiv8u3ow';


//领取/兑换成功强提醒开关
Vue.prototype.$qiangTX = true;

