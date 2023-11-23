<template>
  <div @click="rouerLink">
    <slot />
  </div>
</template>

<script>
import routerHelper from './routerHelper';

import _ from 'lodash';
export default {
  name: 'route-helper',
  props: {
    to: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  methods: {
    rouerLink() {
      // 无跳转
      if (_.isEmpty(this.to)) {
        console.warn('No parameters');
        return false;
      }
      // console.log("to", routerHelper);
      routerHelper.push(this.to);
    }
  }
};
</script>
<style lang="less"></style>
