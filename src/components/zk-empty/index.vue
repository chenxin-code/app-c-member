<!--
 * @Description: 这是***页面
 * @Date: 2021-01-20 17:16:34
 * @LastEditTime: 2021-01-28 22:07:24
-->
<template>
  <div class="zk-empty">
    <img class="zk-empty-img" :src="getImg()" alt="" />
    <p class="zk-empty-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "zk-empty",
  props: {
    image: {
      type: String,
      default: "default"
    },
    description: {
      type: String,
      default: "暂无数据"
    }
  },
  data() {
    return {};
  },
  methods: {
    getImg() {
      const images = [
        "activity",
        "amount",
        "car",
        "default",
        "news",
        "order",
        "search",
        "coupon"
      ];
      if (images.includes(this.image)) {
        return require("@/assets/img/empty/empty-" + this.image + ".png");
      } else {
        return this.image;
      }
    }
  }
};
</script>
<style>
.zk-empty {
  padding-top: 136px;
  text-align: center;
}
.zk-empty .zk-empty-img {
  width: 100%;
  /* height: 100%; */
}
.zk-empty .zk-empty-description {
  font-size: 14px;
  color: #8d8d8d;
}
</style>
