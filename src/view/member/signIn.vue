<template>
  <div>
    <div class="page-head Lv1">
      <div class="option">
        <div class="btn-return" @click="pageBack"></div>
      </div>
      <div class="title-body">
        <div class="title">我已连续签到</div>
        <div class="number">
          <div class="bg">{{ count == 0 && isClick == true ? 7 : count }}</div>
          <div class="days">天</div>
        </div>
      </div>
    </div>
    <template v-if="taskVoList != null">
      <div class="page-body" v-if="taskVoList == null">
        <div class="form-body">
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn"></div>
        </div>
        <div class="form-body">
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn"></div>
          <div class="form-body-node signlnBtn" style="visibility: hidden"></div>
        </div>
      </div>
      <div class="page-body" v-if="taskVoList != null">
        <div class="form-body">
          <div class="form-body-node signlnBtn" :class="{ active: taskVoList[0].complete }">
            <div class="awardIntegral">
              {{ taskVoList[0].awardIntegral }}
              <span>邦豆</span>
            </div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(1, taskVoList[0])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn" :class="{ active: taskVoList[1].complete }">
            <div class="awardIntegral">
              {{ taskVoList[1].awardIntegral }}
              <span>邦豆</span>
            </div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(2, taskVoList[1])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn day3" :class="{ active: taskVoList[2].complete }">
            <div class="awardIntegral">神秘宝箱</div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(3, taskVoList[2])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn" :class="{ active: taskVoList[3].complete }">
            <div class="awardIntegral">
              {{ taskVoList[3].awardIntegral }}
              <span>邦豆</span>
            </div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(4, taskVoList[3])"></div>
            </div>
          </div>
        </div>

        <div class="form-body">
          <div class="form-body-node signlnBtn" :class="{ active: taskVoList[4].complete }">
            <div class="awardIntegral">
              {{ taskVoList[4].awardIntegral }}
              <span>邦豆</span>
            </div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(5, taskVoList[4])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn" :class="{ active: taskVoList[5].complete }">
            <div class="awardIntegral">
              {{ taskVoList[5].awardIntegral }}
              <span>邦豆</span>
            </div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(6, taskVoList[5])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn day7" :class="{ active: taskVoList[6].complete }">
            <div class="awardIntegral">神秘豪礼</div>
            <div class="node-logo"></div>
            <div class="today">
              <div v-html="getIsToady(7, taskVoList[6])"></div>
            </div>
          </div>
          <div class="form-body-node signlnBtn" style="visibility: hidden"></div>
        </div>
      </div>
      <div class="btn-body" v-if="isClick == false">
        <div class="btn" @click="signln">签到</div>
      </div>
      <div class="btn-body" v-if="isClick == true">
        <div class="btn goPath" @click="goPath">已签到，查看更多会员信息</div>
      </div>
      <van-overlay class="van-overlay" :show="showPopup" @click="showPopup = false">
        <div class="messageBox">
          <div class="popImages" :class="{ pop3: currentDay.day == 3, pop7: currentDay.day == 7 }"></div>
          <div class="bangdong">恭喜你获得{{ currentDay.awardIntegral }}邦豆</div>
          <div class="bangdong2">可到邦豆商城兑换免费商品</div>
          <div class="btn-know">知道了</div>
        </div>
      </van-overlay>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import nav from '@zkty-team/x-engine-module-nav';
import api from '@/api';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import * as moment from 'moment';
import nativeRouter from '@zkty-team/x-engine-module-router';
export default {
  data() {
    return {
      memberId: 1,
      count: 0,
      isClick: false,
      btnSign: false,
      currentDay: null,
      taskVoList: null,
      showPopup: false
    };
  },
  created() {
    console.log('$store.getters.isDebugMode :>> ', this.$store.getters.isDebugMode);
    if (this.$store.getters.isDebugMode) {
      //生产需注释
      this.memberId = this.$memberId;
      localStorage.setItem('memberId', this.memberId);
      this.getSignTasklistUsingget();
    } else {
      //生产需打开
      localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
        // this.projectId = 2248639301870946124;
        this.memberId = res.result;
        this.getSignTasklistUsingget();
      });
    }
  },
  mounted() {},
  beforeDestroy() {
    nav.navigatorBack({
      url: '0'
    });
  },
  methods: {
    goPath: function() {
      nativeRouter.openTargetRouter({
        type: 'microapp',
        uri: 'com.times.microapp.AppcMember',
        hideNavbar: true,
        path: encodeURI('/')
      });
    },
    pageBack: function() {
      nav.navigatorBack({
        url: '0'
      });
    },
    getIsToady: function(index, node) {
      if (this.isClick == false) {
        if (this.count == index - 1) {
          this.currentDay = node;
          return '今天';
        } else {
          return node.day + '<span>天</span>';
        }
      } else {
        if (this.count == index) {
          this.currentDay = node;
          return '今天';
        } else {
          return node.day + '<span>天</span>';
        }
      }
      return node.day + '<span>天</span>';
    },
    signln: function() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        behaviourId: 10,
        clientCode: 'sys_linlibang',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        mapPamater: {
          sign: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        memberId: this.memberId
      };

      console.log(JSON.stringify(par));
      api
        .collectUsingPOST(par)
        .finally(() => {
          this.$toast.clear();
        })
        .then(res => {
          if (res.code == 200) {
            this.showPopup = true;
            this.getSignTasklistUsingget();
          }
        });
    },
    getSignTasklistUsingget: function() {
      var self = this;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        memberId: this.memberId
      };
      api
        .getSignTasklistUsingget(par)
        .finally(() => {
          self.$toast.clear();
        })
        .then(res => {
          //let res = JSON.parse('{"code":200,"data":{"count":14,"sign":false,"taskVoList":[{"afterTask":12,"awardGrow":"0","awardIntegral":"10","beforeTask":null,"complete":true,"day":1,"endTime":null,"executeNum":null,"id":9,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":13,"awardGrow":"0","awardIntegral":"20","beforeTask":9,"complete":true,"day":2,"endTime":null,"executeNum":null,"id":12,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":14,"awardGrow":"0","awardIntegral":"60","beforeTask":12,"complete":true,"day":3,"endTime":null,"executeNum":null,"id":13,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":15,"awardGrow":"0","awardIntegral":"40","beforeTask":13,"complete":true,"day":4,"endTime":null,"executeNum":null,"id":14,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":16,"awardGrow":"0","awardIntegral":"50","beforeTask":14,"complete":true,"day":5,"endTime":null,"executeNum":null,"id":15,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":17,"awardGrow":"0","awardIntegral":"60","beforeTask":15,"complete":true,"day":6,"endTime":null,"executeNum":null,"id":16,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1},{"afterTask":null,"awardGrow":"0","awardIntegral":"100","beforeTask":16,"complete":true,"day":7,"endTime":null,"executeNum":null,"id":17,"isPeriodic":1,"isShow":0,"maxLevel":null,"memo":"","minLevel":null,"periodic":"","source":"sys_linlibang","sourceName":"","startTime":null,"taskCondition":"邻里邦用户通过邻里邦ProApp完成每日签到","taskImage":"","taskName":"每日签到","validity":1}]},"message":"success"}');
          if (res.code == 200) {
            console.log(res);
            self.taskVoList = res.data.taskVoList;
            self.isClick = res.data.sign;
            var number = parseInt(res.data.count / 7);
            if(res.data.sign){
              if(res.data.count % 7 === 0){
                self.count = 7;
              }else{
                self.count = res.data.count - number * 7;
              }
            }else{
              if(res.data.count % 7 === 0){
                self.count = 0;
              }else{
                self.count = res.data.count - number * 7;
              }
            }
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.btn-body {
  padding: 0px 16px;
  .btn {
    height: 42px;
    line-height: 42px;
    background: linear-gradient(180deg, #FF6094 0%, #E5165A 100%);
    border-radius: 26px;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .btn.goPath {
    background: #FFECF2;
    border-radius: 26px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #E5165A;
  }
}

.page-head {
  width: 100%;
  height: 244px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 38px 16px 0px 16px;
  background-image: url('../../assets/img/member/icon-bg-singin-2-pink.png');
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-return {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/img/member/icon-a-left.png');
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
    color: #E5165A;
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
  padding: 0px 16px 53px 16px;
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
.signlnBtn.active {
  .awardIntegral {
    color: #E5165A;
  }
  .awardIntegral span {
    color: #E5165A;
  }
}
.signlnBtn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/img/member/icon-bj-sing-1.png');
  .awardIntegral {
    width: 100%;
    position: absolute;
    top: 6px;
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
  }
  .awardIntegral span {
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #121212;
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
    margin-top: 6px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/img/member/icon-signln-1.png');
  }
}

.day3 {
  .awardIntegral {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
    top: 13px;
  }
  .node-logo {
    width: 68px;
    height: 40px;
    margin-left: calc(50% - 34px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/img/member/icon-signln-2.png');
  }
}

.day7 {
  .awardIntegral {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #121212;
    top: 13px;
  }
  .node-logo {
    width: 56px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/img/member/icon-signln-3.png');
  }
}
.active {
  background-image: url('../../assets/img/member/icon-bj-sing-2.png');
}
.currentDay {
  background-image: url('../../assets/img/member/icon-bj-sing-3.png');
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

.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.messageBox {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 283px;
  height: 321px;
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
}
.popImages {
  width: 192px;
  height: 136px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/img/member/icon-pop-1.png');
}
.pop3 {
  background-image: url('../../assets/img/member/icon-pop-3.png');
}
.pop7 {
  background-image: url('../../assets/img/member/icon-pop-7.png');
}
.bangdong {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #121212;
  margin: 24px 0px 10px 0px;
}
.bangdong2 {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8d8d8d;
}
.btn-know {
  width: 100%;
  text-align: center;
  height: 38px;
  line-height: 38px;
  background: #f5f5f6;
  border-radius: 8px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #8d8d8d;
  margin-top: 40px;
}
</style>
