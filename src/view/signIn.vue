<template>
  <div>
    <div class="page-head Lv1">
      <div class="option">
        <div class="btn-return"></div>
      </div>
      <div class="title-body">
        <div class="title">
          我已连续签到
        </div>
        <div class="number">
          <div class="bg">2</div>
          <div class="days">天</div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="form-body">
        <div class="form-body-node">
          <div class="">
            10<span>邦豆</span>
          </div>
          <div class="node-logo">

          </div>
          <div class="">
            1<span>天</span>
          </div>
        </div>
        <div class="form-body-node">

        </div>
        <div class="form-body-node">

        </div>
        <div class="form-body-node">

        </div>
      </div>
      <div class="form-body">
        <div class="form-body-node">

        </div>
        <div class="form-body-node">

        </div>
        <div class="form-body-node">

        </div>
        <div class="form-body-node"
             style="  visibility: hidden;">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nav from '@zkty-team/x-engine-module-nav'
import api from '@/api'
export default {
  data() {
    return {}
  },
  created() {
    this.getSignTasklistUsingget(1)
  },
  mounted() {
    nav.setNavBarHidden({
      isHidden: true,
      isAnimation: true,
    })
  },
  methods: {
    getSignTasklistUsingget: function (memberId) {
      const par = {
        memberId: memberId,
      }
      api.getSignTasklistUsingget(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          console.log(res)
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.page-head {
  width: 100%;
  height: 244px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 38px 16px 0px 16px;
  background-image: url('../assets/img/member/icon-bg-singin.png');
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-return {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../assets/img/member/icon-a-left.png');
    }
  }
  .title-body {
  }
  .title-body .title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .title-body .number {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .title-body .number .bg {
    width: 38px;
    height: 52px;
    text-align: center;
    line-height: 52px;
    background: #ffffff;
    border-radius: 4px;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e8374a;
  }
  .title-body .number .days {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-left: 10px;
  }
}

.page-body {
  padding: 0px 16px 16px 16px;
}

.form-body {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  .form-body-node {
    flex: 1;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/img/member/icon-bj-sing-1.png');
    margin-right: 12px;
  }
  .form-body-node:last-child {
    margin-right: 0px;
  }
}
</style>

