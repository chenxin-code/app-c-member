<template>
  <div class="exchangeCoupon">
    <div class="option">
      <span class="btn-return" @click="pageBack"></span>
      <span class="nav-title">我的优惠券</span>
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
          <van-field v-model="code" type="digit" placeholder="请输入兑换码" @input="fieldChange"></van-field>
          <div class="submit-btn" @click="submit">立即兑换</div>
        </div>
        <div class="content-detail-bottom">
          <p class="title">什么是兑换码？</p>
          <p class="details">兑换码是由邻里邦会员中心发放的优惠券兑换凭证。用户兑换成功后可在邻里邦-我的-卡券中查看；</p>
          <p class="title">兑换码的使用规则？</p>
          <p class="details">请在有效期内完成兑换，怄气自动失效。一个兑换码只能兑换一次，不可重复使用。兑换完成后，优惠券具体的使用规则以券面信息为准。优惠券兑换成功后自动发放至当前登录的用户卡券账户中。</p>
        </div>
      </div>
    </div>
    <ConfirmPop :showConfirm="showConfirm" :confrimValue="confrimValue" :confrimDetail="confrimDetail" :confirmTime="confirmTime"  />
  </div>
</template>

<script>
import nav from "@zkty-team/x-engine-module-nav";
import api from "@/api";
import router from "@zkty-team/x-engine-module-router";
import ConfirmPop from "@/components/confirmPopDetail.vue";


export default {
  name:"exchangeCoupon",
  components: {
    ConfirmPop
  },
  data () {
    return {
      data: "",
      code: "",
      showConfirm: false,
      confrimValue: "物业抵扣卷",
      confrimDetail: "面值：10元代金券",
      confirmTime: "有效期：2021/11/12"
    }
  },
  mounted() {
  },
  created() {
    // this.toast();
    // this.getCoupon();

  },
  methods: {
    toast() {
      this.$toast.loading({
        duration: 0,
        type: 'loading',
        message: '加载中...',
        forbidClick: true,
      });
    },
    getCoupon() {
      const that = this;
      const para = {
        type: 3
      };
      api.getCoupon(para).then(res => {
        if (res.code === 200) {
          that.$toast.clear();
          that.data = JSON.parse(res.data.content);
        }
      }).finally(() => {

      });
    },
    pageBack: function() {
      nav.navigatorBack({
        url: "0"
      });
    },
    fieldChange() {

    },
    submit() {
      this.showConfirm = true;
    },
    cancelConfim() {
      this.showConfirm = false;
    },
    confirmBtn() {
      this.showConfirm = false;
    },
  }
}
</script>


<style lang="less" scope>
.exchangeCoupon{
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 20px 13px;
  overflow: scroll;
  background: linear-gradient(148deg, #FECF6F 0%, #FB853B 51%, #FFAD49 100%);
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
      background-image: url("../../../assets/img/member/icon-a-left.png");
    }

    .nav-title{
      float: left;
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
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
      background-image: url("../../../assets/img/member/icon-wenhao.png");
      background-position: 0px center;
    }
  }
  .container{
    width: 100%;
    height: calc(100% - 40px);
    padding: 0 0.06rem 0 0.06rem;
    overflow: scroll;
    top: 40px;
    padding-top: 30px;
    position: relative;
    .content{
      width: 100%;
      height: 627px;
      position: relative;
      // box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
      .content-detail-top{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        text-align: center;
        padding: 38px 30px 0 30px;
        .title{
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #121212;
          margin: 0 0 48px;
        }
        .van-field{
          width: 100%;
          height: 48px;
          border-radius: 8px;
          border: 1px solid #F0F0F0;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #D8D8D8;
        }
        .submit-btn{
          width: 100%;
          padding: 8px 0;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          background: #FA755A;
          border-radius: 8px;
          margin-top: 32px;
        }
      }
      .content-detail-bottom{
        position: absolute;
        width: 100%;
        top: 273px;
        left: 0;
        z-index: 10;
        padding: 28px 30px 0 30px;
        .title{
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #121212;
          margin: 0 0 8px;
        }
        .details{
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #8D8D8D;
          margin: 0 0 20px;
          line-height: 21px;
        }
      }
      .content-top-left-bg{
        width: 51%;
        height: 273px;
        background:radial-gradient(30px at left bottom,transparent 50%,#fff 50%);
        border-radius: 15px 0 0 0;
        // float: left;
        position: absolute;
        top: 0;
        left: 0;
      }
      .content-top-right-bg{
        width: 51%;
        height: 273px;
        background:radial-gradient(30px at right bottom,transparent 50%,#fff 50%);
        border-radius: 0 15px 0 0;
        // float: left;
        position: absolute;
        top: 0;
        right: 0;
      }
      .content-line{
        width: calc(100% - 48px);
        height: 1px;
        position: absolute;
        left: 24px;
        top: 273px;
        color: #F0F0F0;
        margin: 0;
        display: inline-block;
        z-index: 10;
        border-style:dashed;
      }
      .content-bottom-left-bg{
        width: 51%;
        height: 354px;
        background:radial-gradient(30px at left top,transparent 50%,#fff 50%);
        border-radius: 0px 0 0 15px;
        // float: left;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .content-bottom-right-bg{
        width: 51%;
        height: 354px;
        background:radial-gradient(30px at right top,transparent 50%,#fff 50%);
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
