<template>
  <div>
    <div class="page-head">
      <div class="option">
        <div class="btn-return"></div>
      </div>
      <div class="title-body">
        <div class="title">
          成长值
        </div>
        <div class="number">
          2394
        </div>
      </div>
    </div>
    <div>
      <div class="task-list-body">
        <div class="task-node" v-for="(item,index) in dataSource" :key="index">
          <div class="task-left">
            <div class="title">behaviourName</div>
            <div class="explain">{{item.createTime}}</div>
          </div>
          <div class="task-right">
            <div>+{{item.growthChange}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nav from '@zkty-team/x-engine-module-nav'
import api from '@/api'
// import * as moment from 'moment'

export default {
  data() {
    return {}
  },
  created() {
    this.getMemberGrownLogListUsingGET(1)
  },
  mounted() {
    nav.setNavBarHidden({
      isHidden: true,
      isAnimation: true,
    })
  },
  filters: {
    timeFormat: function () {
      return 1212
    },
  },
  methods: {
    getMemberGrownLogListUsingGET: function (memberId) {
      const par = {
        memberId: memberId,
        pageIndex: 1,
        pageSize: 10,
      }
      api.getMemberGrownLogListUsingGET(par).then((res) => {
        if (res.code == 200) {
          this.$toast.clear()
          this.dataSource = res.data.records
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
</style>

