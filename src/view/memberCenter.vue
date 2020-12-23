<template>
  <div>
    <div v-if="memberObject==null"></div>
    <div v-if="memberObject!=null">
      <div class="page-head" :class="getPageClass(memberObject==null?'':memberObject.memberCardRelats[0].levelId)">
        <div class="option">
          <div class="btn-return"></div>
          <div class="updataDeital">如何升级</div>
        </div>
        <div class="memberDetial">
          <div class="memberDetial-body">
            <div class="leveName"></div>
            <div class="cz-number-body" @click="goProwthValue">
              当前成长值
              <div class="cz-number">{{memberObject==null?'':memberObject.memberCardRelats[0].grow}}</div>
            </div>
            <div class="progressBar">
              <div class="bg"></div>
              <div class="progres" :style="{width:differencePercentage*100+'%'}"></div>
            </div>
            <div class="progressBarWord">
              <span>{{beginTitle}}</span>
              <span class="pbn">还差{{difference}}成长值</span>
              <span class="pbn">
                {{endTitle}}
              </span>
            </div>
          </div>
          <div class="leveLogo-body">
            <div class="leveLogo"></div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div>
          <div class="Bangdou-body">
            <div class="Bangdou" @click="IntegralRecord">我的邦豆<span class="num">{{integral}}</span></div>
            <div v-if="integralRecordData.length>0" @click="receiveAll">全部领取</div>
          </div>
        </div>
        <div v-if="integralRecordData.length>0">
          <div class="notReceived">
            <div @click="receive(item)" v-for="(item,index) in integralRecordData" :key="index" class="notReceivedNode">
              <div class="integralChange"> {{item.integralChange}}</div>
              <div class="sourceType">
                {{item.behaviourName}}
              </div>
            </div>
          </div>
        </div>
        <div class="dotask-body">
          <div class="dotask">
            做任务赚邦豆
          </div>
          <div class="btnMore">
            更多
          </div>
        </div>
        <div class="task-list-body">
          <div v-if="taskList.length<=0" class="dataMessage">
            <div class="icon"></div>
            <div class="message">暂无任务</div>
          </div>
          <div v-if="taskList.length>0">
            <div class="task-node" v-for="(item,index) in taskList" :key="index">
              <div class="task-left">
                <div class="title">{{item.taskName}}</div>
                <div class="explain">{{item.taskCondition}}</div>
              </div>
              <!-- <div class="task-right">
              <div class="btn red">领取</div>
            </div> -->
            </div>
            <!-- <div class="task-node">
            <div class="task-left">
              <div class="title">每日阅读精彩内容</div>
              <div class="explain">单日最高可得300积分</div>
            </div>
            <div class="task-right">
              <div class="btn red">去完成</div>
            </div>
          </div>
          <div class="task-node">
            <div class="task-left">
              <div class="title">每日阅读精彩内容</div>
              <div class="explain">单日最高可得300积分</div>
            </div>
            <div class="task-right">
              <div class="btn red disable">已完成</div>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import nav from '@zkty-team/x-engine-module-nav'
import api from '@/api'
export default {
  data() {
    return {
      currentLeve: 1,
      beginTitle: '',
      endTitle: '',
      taskList: [],
      difference: 0,
      classTypeName: '',
      integral: 0,
      memberId: '',
      userPhone: '13800008888',
      phoneArea: '81',
      differencePercentage: 0,
      integralRecordData: [],
      memberObject: null,
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    nav.setNavBarHidden({
      isHidden: true,
      isAnimation: true,
    })
  },
  methods: {
    //领取全部
    receiveAll: function () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      })
      const par = {
        memberId: this.memberId,
      }
      api.integralRecordReceiveAll(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.getMemberDetial()
        }
      })
    },
    //领取一个
    receive: function (item) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      })
      const par = {
        memberId: this.memberId,
        recordId: item.id,
      }
      api.integralRecordReceive(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.getMemberDetial()
        }
      })
    },
    IntegralRecord: function () {
      this.$routeHelper.router(this, '/IntegralRecord', {
        totalNumber: this.integral,
      })
    },
    goProwthValue: function () {
      this.$routeHelper.router(this, '/growthValueRecord', {
        totalNumber: this.memberObject.memberCardRelats[0].grow,
      })
    },
    getPageClass: function (currentLeve) {
      let classTypeName = ''
      switch (currentLeve) {
        case 1:
          classTypeName = 'Lv1'
          this.beginTitle = 'V1'
          this.endTitle = 'V2'
          break
        case 2:
          classTypeName = 'Lv2'
          this.beginTitle = 'V'
          this.endTitle = 'V3'
          break
        case 3:
          classTypeName = 'Lv3'
          this.beginTitle = 'V3'
          this.endTitle = 'V4'
          break
        case 4:
          classTypeName = 'Lv4'
          this.beginTitle = 'V4'
          this.endTitle = 'V5'
          break
        case 5:
          classTypeName = 'Lv5'
          break
      }
      return classTypeName
    },
    pageInitial: function (sourceData) {
      this.classTypeName = ''
      this.beginTitle = 'V1'
      this.endTitle = 'V2'
      this.integral = sourceData.integral
      this.memberId = sourceData.memberId
      this.currentLeve = sourceData.memberCardRelats[0].levelId
      this.difference =
        sourceData.memberCardRelats[0].rangeEnd -
        sourceData.memberCardRelats[0].grow
      this.differencePercentage =
        sourceData.memberCardRelats[0].grow /
        sourceData.memberCardRelats[0].rangeEnd
      this.integralRecord(this.memberId)
      this.getMyTaskListByMember(this.memberId)
      this.$forceUpdate()
    },
    getUserInfo: function () {
      this.getMemberDetial()
      // api.getUserInfo().then((res) => {
      //   if (res.code == 200) {
      //     this.$toast.clear()
      //     console.log(res);
      //   }
      // })
    },
    integralRecord: function (memberID) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      })
      const par = {
        memberId: memberID,
        pageIndex: 1,
        pageSize: 3,
        isInvalid: 0,
        status: 1,
      }
      api.integralRecord(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.integralRecordData = res.data.records
        }
      })
    },
    getMyTaskListByMember: function (memberID) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      })
      const par = {
        pageIndex: 1,
        pageSize: 3,
        memberId: memberID,
      }
      api.getMyTaskListByMember(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.taskList = res.data.records
        }
      })
    },
    getMemberDetial: function () {
      const par = {
        phoneArea: this.phoneArea,
        phone: this.userPhone,
      }
      api.memberDetailByPhone(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.memberObject = res.data
          this.pageInitial(res.data)
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.page-body {
  padding-top: 282px;
}
.page-head {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 6666;
  width: 100%;
  height: 282px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 38px 16px 16px 16px;

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

    .updataDeital {
      padding-left: 16px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      background-image: url('../assets/img/member/icon-a-left.png');
      background-position: 0px center;
    }
  }

  .memberDetial {
    display: flex;
    margin-top: 35px;
    padding: 0px 0px 0px 16px;

    .memberDetial-body {
      flex: 1;

      .leveName {
        width: 93px;
        height: 25px;
        background-size: 93px 25px;
        background-repeat: no-repeat;
        background-position: 0px center;
      }

      .cz-number-body {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin: 15px 0px 28px;

        .cz-number {
          margin-left: 17px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          padding-left: 20px;
          background-size: 14px 14px;
          background-repeat: no-repeat;
          background-position: 0px center;
        }
      }
    }

    .leveLogo-body {
      display: flex;
      flex: 0 auto;
      width: 132px;
      justify-content: center;

      .leveLogo {
        width: 96px;
        height: 50px;
        background-size: 96px 50px;
        background-repeat: no-repeat;
        background-position: 0px center;
      }
    }

    .progressBar {
      width: 170px;
      position: relative;
      .bg {
        position: absolute;
        width: 100%;
        height: 4px;
      }
      .progres {
        position: absolute;
        height: 4px;
      }
    }
    .progressBarWord {
      clear: both;
      padding-top: 6px;
      width: 170px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
}

.page-head.Lv1 {
  background-image: url('../assets/img/member/icon-member-Lv1.png');

  .leveName {
    background-image: url('../assets/img/member/icon-leve-name-l1.png');
  }

  .cz-number-body {
    color: #7f86aa;
  }
  .cz-number {
    color: #7f86aa;
    background-image: url('../assets/img/member/icon-chno-l1.png');
  }

  .leveLogo {
    background-image: url('../assets/img/member/icon-leve-l1.png');
  }

  .progressBar {
    .bg {
      background-color: #d4d6e2;
    }
    .progres {
      background-color: #7f86aa;
    }
  }

  .progressBarWord {
    color: #7f86aa;
  }
}

.page-head.Lv2 {
  background-image: url('../assets/img/member/icon-member-Lv2.png');

  .leveName {
    background-image: url('../assets/img/member/icon-leve-name-l2.png');
  }

  .cz-number-body {
    color: #b5561a;
  }
  .cz-number {
    color: #b5561a;
    background-image: url('../assets/img/member/icon-chno-l2.png');
  }

  .leveLogo {
    background-image: url('../assets/img/member/icon-leve-l2.png');
  }

  .progressBar {
    .bg {
      background-color: #fdf3eb;
    }
    .progres {
      background-color: #b5561a;
    }
  }

  .progressBarWord {
    color: #b85d23;
  }
}

.page-head.Lv3 {
  background-image: url('../assets/img/member/icon-member-Lv3.png');

  .leveName {
    background-image: url('../assets/img/member/icon-leve-name-l3.png');
  }

  .cz-number-body {
    color: #434342;
  }
  .cz-number {
    background-image: url('../assets/img/member/icon-chno-l3.png');
  }

  .leveLogo {
    background-image: url('../assets/img/member/icon-leve-l3.png');
  }

  .progressBar {
    .bg {
      background-color: #9c9c9c;
    }
    .progres {
      background-color: #6f6f6e;
    }
  }

  .progressBarWord {
    color: #434342;
  }
}

.page-head.Lv4 {
  background-image: url('../assets/img/member/icon-member-Lv4.png');

  .leveName {
    background-image: url('../assets/img/member/icon-leve-name-l4.png');
  }

  .cz-number-body {
    color: #986b1b;
  }
  .cz-number {
    background-image: url('../assets/img/member/icon-chno-l4.png');
  }

  .leveLogo {
    background-image: url('../assets/img/member/icon-leve-l4.png');
  }

  .progressBar {
    .bg {
      background-color: #caab74;
    }
    .progres {
      background-color: #986b1b;
    }
  }

  .progressBarWord {
    color: #986b1b;
  }
}

.page-head.Lv5 {
  background-image: url('../assets/img/member/icon-member-Lv5.png');

  .leveName {
    background-image: url('../assets/img/member/icon-leve-name-l5.png');
  }

  .cz-number-body {
    color: #fff;
  }
  .cz-number {
    background-image: url('../assets/img/member/icon-chno-l5.png');
  }

  .leveLogo {
    background-image: url('../assets/img/member/icon-leve-l5.png');
  }

  .progressBar {
    .bg {
      background-color: #fff;
    }
    .progres {
      background-color: #fff;
    }
  }

  .progressBarWord {
    color: #fff;

    .pbn {
      display: none;
    }
  }
}

.page-body {
  padding: 282px 16px 16px 16px;
}
.page-body .Bangdou-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-body .Bangdou-body .Bangdou {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #121212;
  padding-right: 16px;
  background-position: right center;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  background-image: url('../assets/img/member/icon-jt-right.png');
  .num {
    color: #e8374a;
  }
}
.page-body .notReceived {
  display: flex;
  margin-top: 27px;
}
.page-body .notReceivedNode {
  display: flex;
  justify-items: left;
  margin-right: 10px;
  flex-flow: column;
  width: 96px;
  height: 58px;
  padding-left: 44px;
  padding-top: 12px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/img/member/icon-getBangDou-bg.png');
}
.page-body .notReceivedNode .integralChange {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.page-body .notReceivedNode .sourceType {
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}

.dotask-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 16px 0px;
}
.dotask-body .dotask {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #121212;
}
.dotask-body .btnMore {
  padding-right: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
  background-position: right center;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-image: url('../assets/img/member/icon-jt-right.png');
}

.task-list-body {
}

.task-list-body .task-node {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 16px;
  box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
  border-radius: 12px;
}
.task-list-body .task-node .title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
}
.task-list-body .task-node .explain {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8d8d8d;
  padding-left: 20px;
  margin-top: 10px;
  background-position: left center;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-image: url('../assets/img/member/icon-biaoshi.png');
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.btn.red {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  background: linear-gradient(360deg, #e8374a 0%, #f7676d 100%);
  border-radius: 15px;
}

.btn.red.disable {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #f5f5f5;
  border-radius: 15px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #d8d8d8;
}
.dataMessage {
  .icon {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/img/icon-nodata.png');
  }
  .message {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8d8d8d;
  }
}
</style>

