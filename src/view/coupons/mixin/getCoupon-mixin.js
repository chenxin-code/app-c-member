/*
 * @Description: 这是***页面
 * @Date: 2021-01-28 23:31:05
 * @LastEditTime: 2021-08-07 19:57:47
 */
import {mapGetters} from 'vuex';
import api from '@/api';
import router from '@zkty-team/x-engine-module-router';
import yjzdbill from '@zkty-team/x-engine-module-yjzdbill';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import appNav from '@zkty-team/x-engine-module-nav';

export default {
  data () {
    return {
      userInfo: {}
    };
  },
  computed: {

  },
  filters: {
    delPoint (num) {
      const regexp = /(?:\.0*|(\.\d+?)0+)$/;
      num = `${num}`;
      return num.replace(regexp, '$1');
    }
  },
  methods: {
    delPoint (num) {
      const regexp = /(?:\.0*|(\.\d+?)0+)$/;
      num = `${num}`;
      return num.replace(regexp, '$1');
    },
    useCoupon (data) {
      if (!data.effective) {
        this.$toast('该卡券未在使用期限内～');
        return false;
      }
      if (data.activity === '4014') {
        this.openDeital();
        // this.
      } else if (data.activity === '4005') {
        let url = `https://mall-${
          this.$isProdBuild ? 'prod' : 'uat'
          }-app-linli.timesgroup.cn/app-vue/app/index#/mall2/list/${this.getDataString()}?skuIds=${data.merchanDises}&searchFrom=coupon`;
        router.openTargetRouter({
          type: 'h5',
          uri: url,
          hideNavbar: true
        });
        // appNav.changeBottomToIndex({ selectIndex: 2 });
        // this.openMall(data);
        // console.log("打开商城");
      } else if (data.activity === '4015') {
        this.getUserMaterual(data);
        // appNav.changeBottomToIndex({selectIndex: 0});
        // this.openMall(data);
        // console.log("打开商城");
      }
    },
    // TODO:这里跳页报ngnix错误
    async openMall (data) {
      let uri;
      // 这里的$isProdBuild可能取不到  不过没关系  这方法废了
      if (!this.$isProdBuild) {
        uri = 'http://mall-uat-app-linli.timesgroup.cn';
      } else {
        uri = 'http://mall-prod-app-linli.timesgroup.cn';
      }
      const datestr = Number(new Date());
      let token;
      await localstorage.get({key: 'LLBToken', isPublic: true}).then(res => {
        token = res.result;
      });

      const tempParam = encodeURIComponent(
        `${uri}/app-vue/app/index.htm#/common`
      );
      const url = `${uri}/app/index?token=${token}&redirect=${tempParam}`;
      console.log('openMall url :>> ', url);

      router.openTargetRouter({
        type: 'h5',
        uri: url
      });
    },
    couponType (item) {
      if (item.couponType === 10) {
        return '无门槛立减';
      } else if (item.couponType === 20 || item.couponType === 40) {
        const num = this.delPoint(item.satisfyAmount);
        return `满${num}元可用`;
      }
    },
    // 打开账单中心
    async openDeital () {
      let token;
      await localstorage.get({
        key: 'LLBToken', isPublic: true
      }).then(res => {
        token = res.result;
      });
      const tempParam = encodeURIComponent(
        '/app-vue/app/index#/order/2'
      );
      const url = `http://mall-${this.$isProdBuild ? 'prod' : 'uat'}-app-linli.timesgroup.cn/app/index?token=${token}&redirect=${tempParam}`;

      router.openTargetRouter({
        type: 'h5',
        uri: url,
        hideNavbar: true
      });
      // const userId = this.userInfo.phone;
      // api.getCustomUser().then(res => {
      //   if (res.code == 200) {
      //     this.$toast.clear();
      //     if (res.data.length > 0) {
      //       var userRoomNo = '';
      //       for (var i = 0; i < res.data.length; i++) {
      //         userRoomNo = userRoomNo.concat(res.data[i].custRoomId).concat('|');
      //       }
      //       userRoomNo = userRoomNo.slice(0, userRoomNo.length - 1);
      //       console.log(userRoomNo);
      //       yjzdbill.YJBillList({
      //         businessCstNo: userId,
      //         userRoomNo: userRoomNo,
      //         roomNo: '',
      //         billStatus: 10,
      //         billType: 1,
      //         appScheme: 'x-engine',
      //         payType: false
      //       });
      //     } else {
      //       yjzdbill.YJBillList({
      //         businessCstNo: userId,
      //         userRoomNo: '',
      //         roomNo: '',
      //         billStatus: 10,
      //         billType: 1,
      //         appScheme: 'x-engine',
      //         payType: false
      //       });
      //     }
      //   }
      // });
    },
    getUserMaterual (data) {
      let this_ = this;
      // Dialog.alert({
      //     title: '实物券二维码',
      //     message: '弹窗内容',
      //     theme: 'round-button',
      //   }).then(() => {
      //     // on close
      //   });
      api.getUserMaterual({'couNo': data.couNo, 'couTypeCode': data.couTypeCode, 'memberId': this.memberId}).then(res => {
        this_.materualCode = res.data;
        this_.isFailShow = true;
      });
    },
    // 获取时间戳字符串
    getDataString () {
      return new Date().getTime() + '';
    }
  }
};
