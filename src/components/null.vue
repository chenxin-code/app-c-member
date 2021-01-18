<template>
  <div class="default-content">
    <div class="container">
      <div :class="defaultBgIcon"></div>
      <div v-show="message" class="default-msg" :class="isadd ? 'default-msg-add' : ''">{{ message }}~</div>
      <div v-show="isadd" class="default-msg" :class="isadd ? 'default-msg-add' : ''">快点击上方按钮添加吧～</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    isadd: {
      type: Boolean,
      default: false
    },
    bgicon: {
      type: String,
      default: ''
    }
  },
  computed: {
    defaultBgIcon() {
      return `default-${this.bgicon}icon`;
    }
  }
};
</script>

<style lang="less" scoped>
.default-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px !important;
  text-align: center;

  /* 水平垂直居中 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .container {
    width: 100%;

    .default-icon {
      width: 100%;
      height: 200px;
      display: inline-block;
      background-image: url('../assets/img/default-icon.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 200px;
    }

    .default-carsicon {
      width: 100%;
      height: 200px;
      display: inline-block;
      background-image: url('../assets/img/default-icon.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 200px;
    }

    .default-msg {
      padding: 5px 0;
    }

    .default-msg-add {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8d8d8d;
    }
  }
}
</style>
