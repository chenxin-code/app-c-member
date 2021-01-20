/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:31:06
 * @LastEditTime: 2021-01-20 18:25:58
 */
import nav from "@zkty-team/x-engine-module-nav";

export default {
  //是否为移动端 false不是，true 是
  isPhone: process.env.NODE_ENV === "development" ? false : true,
  formatData: function (data) {
    var returnData = data;
    var paramsStr = "";
    if (this.isPhone == true) {
      //拼接参数
      for (var k in returnData) {
        paramsStr = paramsStr + k + "=" + returnData[k] + "&";
      }
      paramsStr = paramsStr.substr(0, paramsStr.length - 1);
      returnData = encodeURI(paramsStr);
    }
    return returnData;
  },
  router: function (self, path, data, hideNavbar) {
    var par = {};
    par[this.isPhone == true ? "url" : "path"] = path;
    if (data != undefined && data != null) {
      par[this.isPhone == true ? "params" : "query"] = this.formatData(data);
    }
    if (this.isPhone == true) {
      if (hideNavbar != undefined) {
        par.hideNavbar = hideNavbar;
      } else {
        par.hideNavbar = false;
      }
    }
    if (this.isPhone) {
      nav.navigatorPush(par);
    } else {
      self.$router.push(par);
    }
  }
};
