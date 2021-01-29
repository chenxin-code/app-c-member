/*
 * @Description: 这是***页面
 * @Date: 2021-01-28 23:31:05
 * @LastEditTime: 2021-01-29 00:28:01
 */
import api from "@/api";
import router from "@zkty-team/x-engine-module-router";
import yjzdbill from "@zkty-team/x-engine-module-yjzdbill";
import localstorage from "@zkty-team/x-engine-module-localstorage";

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    useCoupon (data) {
      if (data.activity === "4014") {
        this.openDeital();
        // this.
      } else if (data.activity === "4005") {
        this.openMall(data);
        // console.log("打开商城");
      }
    },
    async openMall (data) {
      let uri;
      if (this.devServer === "dev") {
        uri = "http://mall-uat-app-linli.timesgroup.cn";
      } else {
        uri = "http://mall-prod-app-linli.timesgroup.cn";
      }
      const datestr = Number(new Date());
      let token;
      await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
        token = res.result;
      });
      const url = `${uri}/app/index?token=${token}&redirect=${uri}/#/mall2/list/${datestr}?pageType=coupon&coupon=${data.couponType}&couThresholdAmount=${data.satisfyAmount}&couFaceValue=${data.faceAmount}&lastPath=%2Fcoupon_list&endTime=${data.validityEndTime}`;
      router.openTargetRouter({
        type: "h5",
        uri: url
      });
    },
    // 打开账单中心
    openDeital () {
      const userId = this.userInfo.phone;
      api.getCustomUser().then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          if (res.data.length > 0) {
            var userRoomNo = "";
            for (var i = 0; i < res.data.length; i++) {
              userRoomNo = userRoomNo
                .concat(res.data[i].custRoomId)
                .concat("|");
            }
            userRoomNo = userRoomNo.slice(0, userRoomNo.length - 1);
            console.log(userRoomNo);
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: userRoomNo,
              roomNo: "",
              billStatus: 10,
              billType: 1,
              appScheme: "x-engine",
              payType: false
            });
          } else {
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: "",
              roomNo: "",
              billStatus: 10,
              billType: 1,
              appScheme: "x-engine",
              payType: false
            });
          }
        }
      });
    }
  }
}