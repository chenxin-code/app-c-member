<template>
  <div class="integralRecord" ref="integralRecord">
    <div class="page-head">
      <div class="option">
        <div class="btn-return" @click="pageBack"></div>
      </div>
      <div class="title-body">
        <div class="title">邦豆记录</div>
        <div class="number">
          {{ totalNumber }}
        </div>
      </div>
      <!-- <div class="totonumber" v-if="guoqi != 0">
        <div class="guoqitishi">
          {{ invalidTime }}即将过期的积分<span>{{ guoqi }}</span>
        </div>
      </div> -->
    </div>
    <div class="page-body" :style="{ height: pageHeight }" v-if="memberId != null">
      <div class="dataMessage" v-if="showNoData">
        <div class="icon"></div>
        <div class="message">暂无邦豆记录</div>
      </div>
      <div class="task-list-body">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :offset="10"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="!showNoData"
          >
            <template v-slot:default>
              <div class="task-node" v-for="(item, index) in dataSource" :key="index">
                <div class="task-left">
                  <div class="title">{{ item.clientName }}</div>
                  <div class="explain">{{ item.createTime | timeFormat }}</div>
                </div>
                <div class="task-right">
                  <div>
                    {{ item.changeType == 1 ? "+" : "-" }}{{ item.integralChange }}
                  </div>
                </div>
              </div>
            </template>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import nav from "@zkty-team/x-engine-module-nav";
import api from "@/api";
import * as moment from "moment";
import localstorage from "@zkty-team/x-engine-module-localstorage";
export default {
  data() {
    return {
      showNoData: false,
      pageHeight: 0,
      memberId: null,
      guoqi: 0,
      totalNumber: 0,
      invalidTime: "",
      pageIndex: 0,
      pageSize: 10,
      loading: false,
      finished: false,
      refreshing: false,
      dataSource: [],
    };
  },
  async created() {
    // // this.projectId = 2243550298201130566;
    // this.memberId = "2243550298201130566";
    await localstorage.get({ key: "LLBMemberId", isPublic: true }).then((res) => {
      // this.projectId = 2243550298201130566;
      this.memberId = res.result;
    });
    this.getMemberDetial();
    this.invalidTime = moment().add(7, "d").format("YYYY-MM-DD");
    this.overdueIntegral();
  },
  mounted() {
    nav.setNavBarHidden({
      isHidden: true,
      isAnimation: true,
    });
    this.pageHeight = this.$refs.integralRecord.clientHeight + "px";
  },
  filters: {
    timeFormat: function (value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    getMemberDetial: function () {
      const par = {
        memberId: this.memberId,
      };
      api.memberDetailByMemberID(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear();
          this.totalNumber = res.data.integral;
        }
      });
    },
    pageBack: function () {
      nav.navigatorBack();
    },
    overdueIntegral: function () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
      });
      const par = {
        invalidTime: this.invalidTime,
        memberId: this.memberId,
      };
      api.overdueIntegral(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear();
          if (res.data === undefined) {
            this.guoqi = 0;
          } else {
            this.guoqi = res.data;
          }
        }
      });
    },
    onLoad() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
      });
      this.pageIndex = this.pageIndex + 1;
      const par = {
        memberId: this.memberId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isInvalid: 0,
        status: 2,
      };

      if (this.total != null && this.dataSource.length >= this.total) {
        this.finished = true;
        this.loading = false;
        return false;
      }

      api.integralRecord(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear();
          this.total = res.data.total;
          alert(JSON.stringify(res));
          if (res.data.records.length > 0) {
            this.showNoData = false;
            this.showDataList = true;
          } else {
            this.showNoData = true;
            this.showDataList = false;
          }

          if (this.refreshing) {
            this.dataSource = [];
            this.refreshing = false;
          }
          for (let i = 0; i < res.data.records.length; i++) {
            this.dataSource.push(res.data.records[i]);
          }
          this.loading = false;
          if (this.dataSource.length >= res.data.total) {
            this.finished = true;
          }
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.dataSource = [];
      this.pageIndex = 0;
      (this.total = null), (this.finished = false);

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getMemberGrownLogListUsingGET: function () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
      });
      const par = {
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 10,
      };
      api.getMemberGrownLogListUsingGET(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear();
          this.dataSource = res.data.records;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.dataMessage {
  .icon {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/img/icon-nodata.png");
  }
  .message {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: red;
  }
}
.integralRecord {
  position: fixed;
  height: 100%;
  width: 100%;
}
.page-body {
  padding-top: 264px;
  overflow: auto;
}
.page-head {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 6666;
  width: 100%;
  height: 244px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 38px 16px 0px 16px;
  background-image: url("../assets/img/member/icon-bg-singin.png");
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn-return {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("../assets/img/member/icon-a-left.png");
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
    font-size: 48px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .totonumber {
    position: absolute;
    bottom: -10px;
  }
}

.task-list-body {
  padding: 0px 16px 16px 16px;
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
.task-list-body .task-right {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e8374a;
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
  margin-top: 10px;
}
.guoqitishi {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
  background-color: #fff;
  padding-bottom: 10px;
  span {
    margin-left: 10px;
    color: red;
  }
}
</style>
