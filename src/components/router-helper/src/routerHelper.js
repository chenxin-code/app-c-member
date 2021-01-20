/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 16:50:28
 * @LastEditTime: 2021-01-20 17:10:38
 */
import nav from "@zkty-team/x-engine-module-nav";
import router from "../../../router";
import _ from 'lodash'

let isPhone = true;
process.env.NODE_ENV === "development" && (isPhone = false);

export default {
  //是否为移动端 false不是，true 是
  isPhone: isPhone,
  formatData: function (data) {
    var returnData = data;
    var paramsStr = "";
    if (this.isPhone === true) {
      //拼接参数
      for (var k in returnData) {
        paramsStr = paramsStr + k + "=" + returnData[k] + "&";
      }
      paramsStr = paramsStr.substr(0, paramsStr.length - 1);
      returnData = encodeURI(paramsStr);
    }
    return returnData;
  },
  back: function () {
    if (this.isPhone) {
      nav.navigatorBack();
    } else {
      router.go(-1);
    }
  },
  push: function (route = {}) {
    const path = route.path;
    const data = route.query || route.params || {};
    var par = {};
    par[this.isPhone === true ? "url" : "path"] = path;
    if (!_.isEmpty(data)) {
      par[this.isPhone == true ? "params" : "query"] = this.formatData(data);
    }
    if (this.isPhone && Object.prototype.hasOwnProperty.call(route, 'hideNavbar')) {
      console.log('has hideNavbar');
      par.hideNavbar = route.hideNavbar
    }
    if (this.isPhone) {
      nav.navigatorPush(par);
    } else {
      router.push(par);
    }
  }
};
