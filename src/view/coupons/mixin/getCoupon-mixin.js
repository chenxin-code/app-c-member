/*
 * @Description: 这是***页面
 * @Date: 2021-01-28 23:31:05
 * @LastEditTime: 2021-02-01 14:05:03
 */
import { mapGetters } from 'vuex';
import api from '@/api';
import router from '@zkty-team/x-engine-module-router';
import yjzdbill from '@zkty-team/x-engine-module-yjzdbill';
import localstorage from '@zkty-team/x-engine-module-localstorage';

export default {
  data() {
    return {
      userInfo: {}
      // devServer: 'dev'
    };
  },
  computed: {
    ...mapGetters(['devServer'])
  },
  filters: {
    delPoint(num) {
      const regexp = /(?:\.0*|(\.\d+?)0+)$/;
      num = `${num}`;
      return num.replace(regexp, '$1');
    }
  },
  methods: {
    delPoint(num) {
      const regexp = /(?:\.0*|(\.\d+?)0+)$/;
      num = `${num}`;
      return num.replace(regexp, '$1');
    },
    useCoupon(data) {
      if (!data.effective) {
        return false;
      }
      if (data.activity === '4014') {
        this.openDeital();
        // this.
      } else if (data.activity === '4005') {
        this.openMall(data);
        // console.log("打开商城");
      }
    },
    async openMall(data) {
      let uri;
      if (this.devServer !== 'prod') {
        uri = 'http://mall-uat-app-linli.timesgroup.cn';
      } else {
        uri = 'http://mall-prod-app-linli.timesgroup.cn';
      }
      const datestr = Number(new Date());
      let token;
      await localstorage.get({ key: 'LLBToken', isPublic: true }).then(res => {
        token = res.result;
      });

      const tempParam = encodeURI(
        `${uri}/app-vue/app/index.htm#/mall2/list/${datestr}?pageType=coupon&coupon=${data.couponType}&couThresholdAmount=${data.satisfyAmount}&couFaceValue=${data.faceAmount}&lastPath=%2Fcoupon_list&endTime=${data.validityEndTime}`
      );
      const url = `${uri}/app/index?token=${token}&redirect=${tempParam}`;
      console.log('openMall url :>> ', url);

      router.openTargetRouter({
        type: 'h5',
        uri: url
      });
    },
    couponType(item) {
      if (item.couponType === 10) {
        return `无门槛立减`;
      } else if (item.couponType === 20 || item.couponType === 40) {
        const num = this.delPoint(item.satisfyAmount);
        return `满${num}元可用`;
      }
    },
    // 打开账单中心
    openDeital() {
      const userId = this.userInfo.phone;
      api.getCustomUser().then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          if (res.data.length > 0) {
            var userRoomNo = '';
            for (var i = 0; i < res.data.length; i++) {
              userRoomNo = userRoomNo.concat(res.data[i].custRoomId).concat('|');
            }
            userRoomNo = userRoomNo.slice(0, userRoomNo.length - 1);
            console.log(userRoomNo);
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: userRoomNo,
              roomNo: '',
              billStatus: 10,
              billType: 1,
              appScheme: 'x-engine',
              payType: false
            });
          } else {
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: '',
              roomNo: '',
              billStatus: 10,
              billType: 1,
              appScheme: 'x-engine',
              payType: false
            });
          }
        }
      });
    }
  }
};
