<template>
  <div class="van-toast van-toast--middle">
    <i class="van-icon van-toast__icon">
      <img src="./../assets/img/icon_paycard_default.png" class="van-icon__image">
    </i>
    <div class="van-toast__text">{{toastStr}}</div>
    <span class="toast-btn" @click="$emit('qwsy',couponItem)">前往使用</span>
  </div>
</template>

<script>
export default {
  name: 'newToast',
  props: ['toastStr', 'couponItem']
};
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
