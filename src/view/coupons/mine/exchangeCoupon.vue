<template>
  <div class="exchangeCoupon">
    <div class="option">
      <span class="btn-return" @click="pageBack"></span>
      <span class="nav-title">优惠券兑换</span>
    </div>
    <div class="container">
      <div class="content">
        <div class="content-top-left-bg"></div>
        <div class="content-top-right-bg"></div>
        <hr class="content-line" size="1" />
        <div class="content-bottom-left-bg"></div>
        <div class="content-bottom-right-bg"></div>
        <div class="content-detail-top">
          <p class="title">优惠券兑换</p>
          <van-field
            :class="isNotNull ? '' : 'border-red'"
            v-model="exchangeCode"
            type="text"
            placeholder="请输入兑换码"
          ></van-field>
          <div v-show="!isNotNull" class="tip">请输入兑换码</div>
          <div :class="isNotNull ? '' : 'submit-btn-tip'" class="submit-btn" @click="exchangeSubmit">立即兑换</div>
        </div>
        <div class="content-detail-bottom">
          <p class="title">什么是兑换码？</p>
          <p class="details">
            兑换码是由邻里邦会员中心发放的优惠券兑换凭证。用户兑换成功后可在邻里邦-我的-卡券中查看；
          </p>
          <p class="title">兑换码的使用规则？</p>
          <p class="details">
            请在有效期内完成兑换，过期自动失效。一个兑换码只能兑换一次，不可重复使用。兑换完成后，优惠券具体的使用规则以券面信息为准。优惠券兑换成功后自动发放至当前登录的用户卡券账户中。
          </p>
        </div>
      </div>
    </div>
    <ConfirmPop
      :showConfirm="showConfirm"
      :confrimValue="confrimValue"
      :confrimDetail="confrimDetail"
      :confirmTime="confirmTime"
    />
    <van-dialog
      class="dialog-success"
      v-model="isSuccessShow"
      title="兑换成功"
      :message="`有效期: ${confirmTime}`"
      confirmButtonText="返回卡包"
      @confirm="
        isSuccessShow = false;
        $routerHelper.back();
      "
    ></van-dialog>

    <van-dialog
      class="dialog-fail"
      v-model="isFailShow"
      title="兑换失败"
      message="<div style='font-size:13px;'>请确认信息是否填写正确, 若信息填写无误<div style='padding-top:5px;text-align:center'>可以拨打服务热线 <span style='color:#E8374A;'>400-806-123</span></div></div>"
      confirmButtonText="关闭"
      @confirm="isFailShow = false"
    ></van-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import nav from '@zkty-team/x-engine-module-nav';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import api from '@/api';
import router from '@zkty-team/x-engine-module-router';
import ConfirmPop from '@/components/confirmPopDetail.vue';

export default {
  name: 'exchangeCoupon',
  components: {
    ConfirmPop
  },
  data() {
    return {
      isSuccessShow: false,
      isFailShow: false,
      isNotNull: true,
      showConfirm: false,
      exchangeCode: '', // 卡密Id
      couponActivityId: '', // 卡券活动派发id
      couponId: '', // 卡券id
      memberId: '', // 会员id
      confrimValue: '', // 卡券标题
      confrimDetail: '', // 卡券面值
      confirmTime: '' // 卡券有效期
    };
  },

  created() {
    if (this.$store.getters.isDebugMode) {
      // 生产需注释
      this.memberId = this.$memberId;
      localStorage.setItem('memberId', this.memberId);
    } else {
      // 生产需打开
      localstorage.get({key: 'LLBMemberId', isPublic: true}).then(res => {
        this.memberId = res.result;
        localStorage.setItem('memberId', this.memberId);
      });
    }
  },
  mounted() {},
  computed: {
    momentStr() {
      return param => {
        if (!param) {
          return '';
        } else {
          return moment(param).format('YYYY/MM/DD');
        }
      };
    }
  },
  methods: {
    moment,
    toast() {
      this.$toast.loading({
        duration: 0,
        type: 'loading',
        message: '加载中...',
        forbidClick: true
      });
    },
    getCamiloExchangeDetail() {
      // console.log('getCamiloExchangeDetail this.memberId :>> ', this.memberId);

      const para = {
        camiloId: this.exchangeCode
      };
      console.log('getCamiloExchangeDetail para :>> ', para);

      // getUserInfo
      // getCamiloExchangeDetail   被替换api
      this.toast();
      api
        .getCamiloExchangeDetail(para)
        .finally(() => {
          this.$toast.clear();
        })
        .then(res => {
          console.log('getCamiloExchangeDetail res :>> ', res);

          if (res.code === 200) {
            this.showConfirm = true;
            this.couponActivityId = res.data.id; // 活动卡券活动派发id
            this.couponId = res.data.couponId; // 卡券id
            this.confrimValue = res.data.couponName; // 卡券标题

            if (res.data.couponType === 10) {
              this.confrimDetail = res.data.faceAmount + '元代金券'; // 卡券面值
            }
            if (res.data.couponType === 20) {
              this.confrimDetail = res.data.faceAmount + '元满减券'; // 卡券面值
            }
            if (res.data.couponType === 40) {
              this.confrimDetail = res.data.discountRatio * 10 + '折' + '折扣券'; // 卡券面值
            }

            if (res.data.expirationType === 1) {
              this.confirmTime = this.momentStr(res.data.startTime) + ' ~ ' + this.momentStr(res.data.expirationTime); // 卡券有效期
            }
            if (res.data.expirationType === 3) {
              this.confirmTime = '相对有效期, ' + res.data.valiDays + '天, 领取后' + res.data.offsetDays + '天生效'; // 卡券有效期
            }
          } else if (res.code === 500) {
            this.$toast(res.message);
          }
        });
    },

    confirmExchange() {
      // console.log('confirmExchange this.memberId :>> ', this.memberId);

      const para = {
        camiloId: this.exchangeCode, // 卡密Id
        couponActivityId: this.couponActivityId, // 卡券活动派发id
        couponId: this.couponId, // 卡券id
        memberId: this.memberId // 会员id
      };
      console.log('confirmExchange para :>> ', para);
      // return;

      // getUserInfo
      // confirmCamiloExchange   被替换api
      this.toast();
      api
        .confirmCamiloExchange(para)
        .finally(() => {
          this.$toast.clear();
        })
        .then(res => {
          console.log('confirmExchange res :>> ', res);
          if (res.code === 200) {
            this.showConfirm = false;
            this.isSuccessShow = true;
          } else if (res.code === 500) {
            this.showConfirm = false;
            this.isFailShow = true;
          }
        });
    },
    pageBack: function() {
      this.$routerHelper.back();
    },
    // pageBack: function() {
    //   if (this.$routeHelper.isPhone) {
    //     nav.navigatorBack({
    //       url: '0'
    //     });
    //   } else {
    //     this.$router.go(-1);
    //   }
    // },
    exchangeSubmit() {
      if (!this.exchangeCode) {
        return;
      }
      this.getCamiloExchangeDetail();
    },
    cancelConfim() {
      this.showConfirm = false;
    },
    confirmBtn() {
      // 这里是异步
      this.confirmExchange();
    }
  },
  watch: {
    exchangeCode(newVal) {
      this.isNotNull = newVal;
    }
  }
};
</script>

<style lang="less" scoped>
/* dialog弹窗 */
.van-dialog {
  padding: 16px 16px 24px !important;
  width: calc(100% - 92px) !important;
  background: #ffffff !important;
  border-radius: 16px !important;

  .van-dialog__header {
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 18px;
    color: @title-color;
    font-weight: 700;
    text-align: left;
    padding-top: 16px;
  }

  .van-dialog__footer {
    .van-dialog__cancel {
      margin-right: 11px;
      height: 38px;
      background: #f5f5f6;
      border-radius: 8px;

      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8d8d8d;
    }

    .van-dialog__confirm {
      height: 38px;
      background: #f5f5f5 !important;
      border: none !important;
      border-radius: 8px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8d8d8d !important;
    }

    .van-hairline--left::after {
      border-left-width: 0;
    }
  }

  .van-dialog__content {
    min-height: auto;

    .van-dialog__message {
      padding: 16px 0 40px 0;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8d8d8d;
      text-align: left;
      line-height: 16px;
    }
  }

  &.dialog-success,
  &.dialog-fail {
    width: calc(100% - 92px) !important;
    overflow: visible;
    padding-top: 22px !important;

    .van-dialog__header {
      text-align: center;
      font-size: 16px;
      position: relative;
      padding-top: 66px;

      &::before {
        position: absolute;
        content: '';
        width: 50px;
        height: 50px;
        top: 0;
        background-image: url(../../../assets/img/dialog/dialog-success-icon.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .van-dialog__content .van-dialog__message {
      font-size: 14px;
      white-space: inherit;
    }

    .van-dialog__footer {
      overflow: visible;

      &::after {
        display: none;
      }

      .van-dialog__confirm.van-hairline--left {
        background: linear-gradient(180deg, #41cc8b 0%, #41cc8b 100%);
      }

      .van-dialog__cancel {
        background: rgba(70, 205, 142, 0.2);
        color: #41cc8b;
      }
    }
  }

  &.dialog-fail {
    &::before {
      box-shadow: inset 0px -1px 2px 1px #eab3b8;
    }

    &::after {
      background-image: url(../../../assets/img/dialog/dialog-cancel-overlay.png);
    }

    .van-dialog__header {
      &::before {
        background-image: url(../../../assets/img/dialog/dialog-cancel-icon.png);
      }
    }

    .van-dialog__footer {
      &::before {
        background-image: url(../../../assets/img/dialog/dialog-cancel-border.png);
      }

      .van-dialog__confirm {
        background: linear-gradient(180deg, #ff535b 0%, #E5165A 100%);
      }
    }
  }
}
/* dialog弹窗 */

.van-dialog .van-button {
  width: calc(100% - 0.12rem);
}

.van-cell::after {
  border: none;
}

.exchangeCoupon {
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 40px 13px 20px;
  // overflow: scroll;
  overflow: auto;
  background: linear-gradient(148deg, #fecf6f 0%, #fb853b 51%, #ffad49 100%);

  .option {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 40px;
    z-index: 99;
    .btn-return {
      width: 20px;
      height: 20px;
      float: left;
      margin-top: 6px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../../assets/img/member/icon-a-left.png');
    }

    .nav-title {
      float: left;
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-left: 8px;
    }

    .updataDeital {
      padding-left: 16px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      background-image: url('../../../assets/img/member/icon-wenhao.png');
      background-position: 0px center;
    }
  }
  .container {
    width: 100%;
    height: calc(100% - 40px);
    padding: 0 0.06rem 0 0.06rem;
    overflow: auto;
    padding-top: 20px;
    position: relative;
    top: 30px;
    .content {
      width: 100%;
      // height: 100%;
      height: 627px;
      position: relative;
      // box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
      .content-detail-top {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        text-align: center;
        padding: 38px 30px 0 30px;
        .title {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #121212;
          margin: 0 0 48px;
        }
        .van-field {
          width: 100%;
          height: 48px;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #d8d8d8;
        }

        .border-red {
          border: 1px solid #f5222d;
        }

        .tip {
          color: #f5222d;
          text-align: left;
          padding-top: 5px;
        }
        .submit-btn {
          width: 100%;
          padding: 8px 0;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          background: #fa755a;
          border-radius: 8px;
          margin-top: 32px;
        }

        .submit-btn-tip {
          margin-top: 10px;
        }
      }
      .content-detail-bottom {
        position: absolute;
        width: 100%;
        top: 273px;
        // top: 44%;
        left: 0;
        z-index: 10;
        padding: 28px 30px 0 30px;
        .title {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #121212;
          margin: 0 0 8px;
        }
        .details {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #8d8d8d;
          margin: 0 0 20px;
          line-height: 21px;
        }
      }
      .content-top-left-bg {
        width: 51%;
        // height: 44%;
        height: 273px;
        background: radial-gradient(30px at left bottom, transparent 50%, #fff 50%);
        border-radius: 15px 0 0 0;
        // float: left;
        position: absolute;
        top: 0;
        left: 0;
      }
      .content-top-right-bg {
        width: 51%;
        // height: 44%;
        height: 273px;
        background: radial-gradient(30px at right bottom, transparent 50%, #fff 50%);
        border-radius: 0 15px 0 0;
        // float: left;
        position: absolute;
        top: 0;
        right: 0;
      }
      .content-line {
        width: calc(100% - 48px);
        height: 1px;
        position: absolute;
        left: 24px;
        // top: 44%;
        top: 273px;
        color: #f0f0f0;
        margin: 0;
        display: inline-block;
        z-index: 10;
        border-style: dashed;
      }
      .content-bottom-left-bg {
        width: 51%;
        // height: 56%;
        height: 354px;
        background: radial-gradient(30px at left top, transparent 50%, #fff 50%);
        border-radius: 0px 0 0 15px;
        // float: left;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .content-bottom-right-bg {
        width: 51%;
        // height: 56%;
        height: 354px;
        background: radial-gradient(30px at right top, transparent 50%, #fff 50%);
        border-radius: 0px 0 15px 0;
        // float: left;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
