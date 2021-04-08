<template>
  <van-popup class="confirm-pop" v-model="showConfirm">
    <div class="content">
      <p class="title">{{ confrimValue }}</p>
      <p class="detail">面值: {{ confrimDetail }}</p>
      <p class="time">有效期: {{ confirmTime }}</p>
      <p class="btn">
        <span @click="cancelConfim">取消</span>
        <span @click="confirmBtn">确认兑换</span>
      </p>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'ConfirmPopDetail',
  props: ['showConfirm', 'confrimValue', 'confrimDetail', 'confirmTime'],
  components: {},
  data() {
    return {};
  },
  methods: {
    cancelConfim() {
      this.$parent.cancelConfim();
    },
    confirmBtn() {
      this.$parent.confirmBtn();
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup.van-popup--center {
  width: 283px;
  height: auto !important;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 16px 24px 16px;
  position: fixed;
  p {
    margin: 0;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
    margin-bottom: 8px;
  }
  .detail {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #121212;
    margin-bottom: 8px;
  }
  .time {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8d8d8d;
    margin-bottom: 40px;
  }
  .btn span {
    width: 120px;
    padding: 10px 0;
    display: inline-block;
    border-radius: 8px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    text-align: center;
  }
  .btn span:nth-child(1) {
    background: #f5f5f6;
    color: #8d8d8d;
    margin-right: 11px;
  }
  .btn span:nth-child(2) {
    background: #e8374a;
    color: #fff;
  }
}
</style>
