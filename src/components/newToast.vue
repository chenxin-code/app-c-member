<template>
  <div class="van-toast van-toast--middle" v-if="show">
    <i class="van-icon van-toast__icon">
      <img src="./../assets/img/icon_paycard_default.png" class="van-icon__image">
    </i>
    <div class="van-toast__text">{{toastStr}}</div>
    <span class="toast-btn" @click="useCoupon(couponItem)">前往使用</span>
  </div>
</template>

<script>
import couponMixin from './../view/coupons/mixin/getCoupon-mixin';
export default {
  name: "newToast",
  mixins: [couponMixin],
  data(){
    return {
      toastStr: null,
      couponItem: null,
      show: false
    };
  },
  methods: {
    showToast(toastStr,couponItem) {
      this.toastStr = toastStr;
      this.couponItem = couponItem;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  }
}
</script>

<style scoped>
.toast-btn {
  margin-top: 12px;
  padding: 1px 17px;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 15px
}
</style>
