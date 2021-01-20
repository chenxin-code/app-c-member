<template>
  <div class="zk-empty">
    <img class="zk-empty-img" :src="getImg()" alt="" />
    <p class="zk-empty-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "empty",
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
        "search"
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
  color: #8d8d8d;
}
</style>
