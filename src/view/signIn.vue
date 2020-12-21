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
          <div class="bg">{{count}}</div>
          <div class="days">天</div>
        </div>
      </div>
    </div>
    <div class="page-body" v-if="taskVoList!=null">
      <div class="form-body">
        <div class="form-body-node signlnBtn" :class="{'active':taskVoList[0].complete}">
          <div class="awardIntegral">
            {{taskVoList[0].awardIntegral}}<span>邦豆</span>
          </div>
          <div class="node-logo"></div>
          <div class="today">
            <div v-html="getIsToady(1,taskVoList[0])"></div>
          </div>
        </div>
        <div class="form-body-node signlnBtn" :class="{'active':taskVoList[1].complete}">
          <div class="awardIntegral">
            {{taskVoList[1].awardIntegral}}<span>邦豆</span>
          </div>
          <div class="node-logo"></div>
          <div class="today">
            <div v-html="getIsToady(2,taskVoList[1])"></div>
          </div>
        </div>
        <div class="form-body-node signlnBtn day3" :class="{'active':taskVoList[2].complete}">
          <div class="awardIntegral">
            神秘宝箱
          </div>
          <div class="node-logo"></div>
          <div class="today">
            <div v-html="getIsToady(3,taskVoList[2])"></div>
          </div>
        </div>
        <div class="form-body-node signlnBtn" :class="{'active':taskVoList[3].complete}">
          <div class="awardIntegral">
            {{taskVoList[3].awardIntegral}}<span>邦豆</span>
          </div>
          <div class="node-logo"></div>
          <div class="today">
            <div v-html="getIsToady(4,taskVoList[3])"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-body">
      <div class="form-body-node signlnBtn" :class="{'active':taskVoList[4].complete}">
        <div class="awardIntegral">
          {{taskVoList[4].awardIntegral}}<span>邦豆</span>
        </div>
        <div class="node-logo"></div>
        <div class="today">
          <div v-html="getIsToady(5,taskVoList[4])"></div>
        </div>
      </div>
      <div class="form-body-node signlnBtn" :class="{'active':taskVoList[5].complete}">
        <div class="awardIntegral">
          {{taskVoList[5].awardIntegral}}<span>邦豆</span>
        </div>
        <div class="node-logo"></div>
        <div class="today">
          <div v-html="getIsToady(6,taskVoList[5])"></div>
        </div>
      </div>
      <div class="form-body-node signlnBtn day7" :class="{'active':taskVoList[6].complete}">
        <div class="awardIntegral">
          神秘豪礼
        </div>
        <div class="node-logo"></div>
        <div class="today">
          <div v-html="getIsToady(7,taskVoList[6])"></div>
        </div>
      </div>
      <div class="form-body-node signlnBtn" style="visibility: hidden;"></div>
    </div>
    <div class="btn-body" v-if="sign==false">
      <div class="btn" @click="signln">签到</div>
    </div>
    <div class="btn-body" v-if="sign==true">
      <div class="btn goPath">已签到,查看更多会员信息</div>
    </div>
    <!-- <van-overlay :show="showPopup" @click="showPopup = false">
      <div>

      </div>
    </van-overlay> -->
  </div>
</template>
<script>
import nav from '@zkty-team/x-engine-module-nav'
import api from '@/api'
import * as moment from 'moment'
export default {
  data() {
    return {
      memberId: 1,
      count: 0,
      sign: false,
      taskVoList: null,
      showPopup: true,
    }
  },
  created() {
    this.getSignTasklistUsingget(this.memberId)
  },
  mounted() {
    nav.setNavBarHidden({
      isHidden: true,
      isAnimation: true,
    })
  },
  methods: {
    getIsToady: function (index, node) {
      if (this.sign == false) {
        if (this.count == index - 1) {
          return '今天'
        } else {
          return node.day + '<span>天</span>'
        }
      } else {
        if (this.count == index) {
          return '今天'
        } else {
          return node.day + '<span>天</span>'
        }
      }
    },
    signln: function () {
      const par = {
        behaviourId: 10,
        clientCode: 'sys_linlibang',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        mapPamater: {
          sign: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        memberId: this.memberId,
      }

      console.log(JSON.stringify(par))
      api.collectUsingPOST(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.getSignTasklistUsingget(this.memberId)
        }
      })
    },
    getSignTasklistUsingget: function (memberId) {
      const par = {
        memberId: memberId,
      }
      api.getSignTasklistUsingget(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          console.log(res)
          this.taskVoList = res.data.taskVoList
          this.count = res.data.count
          // this.count = 0
          this.sign = res.data.sign
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.btn-body {
  padding: 0px 16px;
  .btn {
    height: 42px;
    line-height: 42px;
    background: linear-gradient(180deg, #ff8381 0%, #e8374a 100%);
    border-radius: 26px;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .btn.goPath {
    background: #fcecee;
    border-radius: 26px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e8374a;
  }
}

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
    margin-right: 12px;
  }
  .form-body-node:last-child {
    margin-right: 0px;
  }
}

.signlnBtn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/img/member/icon-bj-sing-1.png');
  .awardIntegral {
    width: 100%;
    position: absolute;
    top: 8px;
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e8374a;
  }
  .awardIntegral span {
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #e8374a;
  }
  .today {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
    text-align: center;
    vertical-align: baseline;
  }
  .node-logo {
    width: 30px;
    height: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/img/member/icon-signln-1.png');
  }
}

.day3 {
  .awardIntegral {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
  }
  .node-logo {
    width: 67px;
    height: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/img/member/icon-signln-2.png');
  }
}

.day7 {
  .awardIntegral {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
  }
  .node-logo {
    width: 67px;
    height: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/img/member/icon-signln-3.png');
  }
}
.active {
  background-image: url('../assets/img/member/icon-bj-sing-2.png');
}
.currentDay {
  background-image: url('../assets/img/member/icon-bj-sing-3.png');
  // .awardIntegral {
  //   font-size: 12px;
  //   font-family: PingFangSC-Medium, PingFang SC;
  //   font-weight: 500;
  //   color: #121212;
  // }
  .today {
    color: #ffffff;
  }
}
</style>

