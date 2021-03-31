<template>
  <div>
    <transition name="plus-icon1">
      <div class="page-content" v-if="memberObject == null">
        <div class="page-head Lv1" style="opacity: 0.4">
          <div class="option">
            <div class="btn-return" @click="pageBack"></div>
            <div class="updataDeital" @click="goPage">如何升级</div>
          </div>
        </div>
        <div class="page-body">
          <div class="Bangdou-body zhanwei"></div>
          <div class="Bangdou-body zhanwei"></div>
        </div>
      </div>
    </transition>
    <transition name="plus-icon">
      <div class="page-content" v-if="memberObject != null">
        <div
          class="page-head"
          :class="getPageClass(memberObject == null ? '' : memberObject.memberCardRelats[0].levelId)"
        >
          <div class="option">
            <div class="btn-return" @click="pageBack"></div>
            <div class="updataDeital" @click="goPage">如何升级</div>
          </div>
          <div class="memberDetial">
            <div class="memberDetial-body">
              <div class="leveName"></div>
              <div class="cz-number-body" @click="goProwthValue">
                当前成长值
                <div class="cz-number">
                  {{ memberObject == null ? '' : memberObject.memberCardRelats[0].grow }}
                </div>
              </div>
              <div class="progressBar">
                <div class="bg"></div>
                <div class="progres" :style="{ width: differencePercentage * 100 + '%' }"></div>
              </div>
              <div class="progressBarWord">
                <span>{{ beginTitle }}</span>
                <span class="pbn">还差{{ difference }}成长值</span>
                <span class="pbn">{{ endTitle }}</span>
              </div>
            </div>
            <div class="leveLogo-body">
              <div class="leveLogo"></div>
              <div
                class="member-right"
                :class="getPageClass(memberObject == null ? '' : memberObject.memberCardRelats[0].levelId)"
                @click="toMemberRight()"
                v-if="showMemberRight">
                会员权益
                <img
                  :src="require('./../../assets/img/member/to-member-right-lv1.png')"
                  alt=""
                  v-if="memberObject.memberCardRelats[0].levelId === 1"
                />
                <img
                  :src="require('./../../assets/img/member/to-member-right-lv2.png')"
                  alt=""
                  v-else-if="memberObject.memberCardRelats[0].levelId === 2"
                />
                <img
                  :src="require('./../../assets/img/member/to-member-right-lv3.png')"
                  alt=""
                  v-else-if="memberObject.memberCardRelats[0].levelId === 3"
                />
                <img
                  :src="require('./../../assets/img/member/to-member-right-lv4.png')"
                  alt=""
                  v-else-if="memberObject.memberCardRelats[0].levelId === 4"
                />
                <img
                  :src="require('./../../assets/img/member/to-member-right-lv5.png')"
                  alt=""
                  v-else-if="memberObject.memberCardRelats[0].levelId === 5"
                />
              </div>
              <div style="margin-top: 25px;height: 24px;" v-else></div>
            </div>
          </div>
        </div>
        <div class="page-body">
          <!-- 我的邦豆 -->
          <div>
            <div class="Bangdou-body">
              <div class="Bangdou" @click="IntegralRecord">
                我的邦豆
                <span class="num">{{ integral }}</span>
              </div>
              <div v-if="integralRecordData.length > 0" class="see-more" @click="receiveAll">
                全部领取
              </div>
            </div>
          </div>
          <div v-if="integralRecordData.length > 0">
            <div class="notReceived">
              <div
                @click="receive(item)"
                v-for="(item, index) in integralRecordData"
                :key="index"
                class="notReceivedNode"
              >
                <div>
                  <div class="integralChange">{{ item.integralChange }}</div>
                  <div class="sourceType">{{ item.behaviourName }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 邦豆兑换 -->
          <div class="bangdou-exchange">
            <!-- <div class="bangdou-exchange" v-if="propertyList.length || vouchersList.length"> -->
            <div class="bangdou-exchange-header">
              <div class="exchange-header-title">邦豆兑换</div>
              <div class="exchange-header-seemore" @click="seemoreExchange">
                查看更多
              </div>
            </div>
            <div class="bangdou-exchange-body">
              <div class="exchange-body-item" v-if="propertyList.length">
                <div class="exchange-swipper">
                  <div
                    v-for="(item, cIndex) in propertyList"
                    class="bangdou-exchange-card"
                    :key="item.id"
                    :class="[
                      {
                        'row-reverse': item.activity !== '4014'
                      },
                      {
                        shopping: item.activity !== '4014'
                      }
                    ]"
                  >
                    <div class="exchange-card-item exchange-card-left">
                      <div class="exchange-card-left-top">
                        <template v-if="item.couponType === 40">
                          <div class="card-left-top-num">
                            {{ +item.discountRatio * 10 }}
                          </div>
                          <span class="coupon-type">折</span>
                        </template>
                        <template v-else>
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">
                            {{ item.faceAmount | delPoint }}
                          </div>
                        </template>
                      </div>
                      <div class="exchange-card-left-bottom">
                        {{ couponType(item) }}
                      </div>
                      <template v-if="item.activity !== '4014'">
                        <div
                          v-if="item.goUse"
                          class="exchange-card-left-btn"
                          :class="{ ineffective: !item.effective }"
                          @click="useCoupon(item)"
                        >
                          去使用
                        </div>
                        <div v-else class="exchange-card-left-btn" @click="exchange(item, 1, cIndex)">
                          邦豆兑换
                        </div>
                      </template>
                    </div>
                    <div class="exchange-card-item exchange-card-right">
                      <div class="exchange-card-right-left">
                        <div class="card-right-left-top">
                          {{ item.couponTitle }}
                        </div>
                        <div class="card-right-left-bottom">
                          <span class="card-right-left-bottom-left">{{ item.integrealCount }}</span>
                          <span class="card-right-left-bottom-right">邦豆</span>
                        </div>
                      </div>
                      <div class="exchange-card-right-right">
                        <template v-if="item.activity === '4014'">
                          <div
                            v-if="item.goUse"
                            class="exchange-card-right-right-btn"
                            :class="{ ineffective: !item.effective }"
                            @click="useCoupon(item)"
                          >
                            去使用
                          </div>
                          <div v-else class="exchange-card-right-right-btn" @click="exchange(item, 0, cIndex)">
                            邦豆兑换
                          </div>
                        </template>
                        <img v-else class="goods-img" :src="item.image || defaultImg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="exchange-body-item" v-if="vouchersList.length">
                <div class="exchange-swipper">
                  <div
                    v-for="(item, cIndex) in vouchersList"
                    class="bangdou-exchange-card"
                    :key="item.id"
                    :class="[
                      {
                        'row-reverse': item.activity !== '4014'
                      }
                    ]"
                  >
                    <div class="exchange-card-item exchange-card-left">
                      <div class="exchange-card-left-top">
                        <template v-if="item.couponType === 40">
                          <div class="card-left-top-num">
                            {{ +item.discountRatio * 10 }}
                          </div>
                          <span class="coupon-type">折</span>
                        </template>
                        <template v-else>
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">
                            {{ item.faceAmount | delPoint }}
                          </div>
                        </template>
                      </div>
                      <div class="exchange-card-left-bottom">
                        {{ couponType(item) }}
                      </div>
                      <template v-if="item.activity !== '4014'">
                        <div
                          v-if="item.goUse"
                          class="exchange-card-left-btn"
                          :class="{ ineffective: !item.effective }"
                          @click="useCoupon(item)"
                        >
                          去使用
                        </div>
                        <div v-else class="exchange-card-left-btn" @click="exchange(item, 1, cIndex)">
                          邦豆兑换
                        </div>
                      </template>
                    </div>
                    <div class="exchange-card-item exchange-card-right">
                      <div class="exchange-card-right-left">
                        <div class="card-right-left-top">
                          {{ item.couponTitle }}
                        </div>
                        <div class="card-right-left-bottom">
                          <span class="card-right-left-bottom-left">{{ item.integrealCount }}</span>
                          <span class="card-right-left-bottom-right">邦豆</span>
                        </div>
                      </div>
                      <div class="exchange-card-right-right">
                        <template v-if="item.activity === '4014'">
                          <div
                            v-if="item.goUse"
                            class="exchange-card-right-right-btn"
                            :class="{ ineffective: !item.effective }"
                            @click="useCoupon(item)"
                          >
                            去使用
                          </div>
                          <div v-else class="exchange-card-right-right-btn" @click="exchange(item, 0, cIndex)">
                            邦豆兑换
                          </div>
                        </template>
                        <img v-else class="goods-img" :src="item.image || defaultImg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="exchange-body-item2" v-if="vouchersList.length">
                <div class="exchange-swipper">
                  <div
                    class="bangdou-exchange-card"
                    v-for="item in vouchersList"
                    :key="item.id"
                  >
                    <div class="exchange-card-item exchange-card-right">
                      <div class="exchange-card-right-right">
                        <img
                          class="goods-img"
                          :src="item.image || defaultImg"
                        />
                      </div>
                      <div class="exchange-card-right-left">
                        <div class="card-right-left-top">
                          {{ item.couponTitle }}
                        </div>
                        <div class="card-right-left-bottom">
                          <span class="card-right-left-bottom-left">{{
                            item.integrealCount
                          }}</span>
                          <span class="card-right-left-bottom-right">邦豆</span>
                        </div>
                      </div>
                    </div>
                    <div class="exchange-card-item exchange-card-left">
                      <div class="exchange-card-left-top">
                        <template v-if="item.couponType === 40">
                          <div class="card-left-top-num">
                            {{ +item.discountRatio * 10 }}
                          </div>
                          <span class="coupon-type">折</span>
                        </template>
                        <template v-else>
                          <div class="card-left-top-type">
                            ￥
                          </div>
                          <div class="card-left-top-num">
                            {{ item.faceAmount | delPoint }}
                          </div>
                        </template>
                      </div>
                      <div class="exchange-card-left-bottom">
                        {{ couponType(item) }}
                      </div>

                      <div
                        v-if="item.goUse"
                        class="exchange-card-left-btn"
                        :class="{ ineffective: !item.effective }"
                        @click="useCoupon(item)"
                      >
                        去使用
                      </div>
                      <div
                        v-else
                        class="exchange-card-left-btn"
                        @click="exchange(item, 1, cIndex)"
                      >
                        邦豆兑换
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <div class="dotask-body">
            <div class="dotask">
              <span style="margin-right: 5px">做任务</span>
              <span>赚邦豆</span>
            </div>
            <!-- <div class="btnMore">更多</div> -->
          </div>
          <div class="task-list-body">
            <div v-if="taskList.length <= 0" class="dataMessage">
              <div class="icon"></div>
              <div class="message">暂无任务</div>
            </div>
            <div v-if="taskList.length > 0">
              <div class="task-node" v-for="(item, index) in taskList" :key="index">
                <div class="task-left">
                  <div class="title">{{ item.taskName }}</div>
                  <div class="explain">{{ item.taskCondition }}</div>
                </div>
                <div class="task-right">
                  <div class="btn red">{{ getBtnWord(item) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
/* eslint-disable */
import nav from '@zkty-team/x-engine-module-nav';
import api from '@/api';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import couponMixin from '../coupons/mixin/getCoupon-mixin';
import * as moment from 'moment';
const defaultImg = require('@/assets/img/coupons/coupon-default.png');

export default {
  mixins: [couponMixin],
  data() {
    return {
      currentLeve: 1,
      defaultImg: defaultImg,
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
      propertyList: [],
      vouchersList: [],
      memberObject: null,
      showMemberRight: false//上线前临时开关
    };
  },

  activated() {
    console.log('$store.getters.isDebugMode :>> ', this.$store.getters.isDebugMode);
    if (this.$store.getters.isDebugMode) {
      // 生产需注释
      this.memberId = '2276541642808754230';
      localStorage.setItem('memberId', this.memberId);
      this.getMemberDetail();
      this.queryReceiveCouponList();
    } else {
      // 生产需打开
      if (this.$route.meta.isBack != true) {
        localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
          this.memberId = res.result;
          console.log('this.memberId :>> ', this.memberId);
          localStorage.setItem('memberId', this.memberId);
          this.getMemberDetail();
          this.queryReceiveCouponList();
        });
      }
    }
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    if (from.name == 'growthValueRecord' || from.name == 'IntegralRecord' || from.name == 'gradeDescription') {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == 'growthValueRecord' ||
      to.name == 'IntegralRecord' ||
      to.name == 'gradeDescription' ||
      to.name == 'bangdouExchange' ||
      to.name == 'memberRight'
    ) {
      next();
    } else {
      nav.navigatorBack({
        url: '0'
      });
      next();
    }
  },
  methods: {
    getBtnWord: function(state) {
      var reMsg = '未开始';
      switch (state.statues) {
        case 0:
          reMsg = '未完成';
          break;
        case 1:
          reMsg = '已完成';
          break;
        case 2:
          reMsg = '已过期';
          break;
        case 3:
          reMsg = '领取';
          break;
      }
      return reMsg;
    },
    pageBack: function() {
      nav.navigatorBack({
        url: '0'
      });
    },
    getList() {},
    //领取全部
    receiveAll: function() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        memberId: this.memberId
      };
      api.integralRecordReceiveAll(par).then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          this.getMemberDetail();
        }
      });
    },
    //领取一个
    receive: function(item) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        memberId: this.memberId,
        recordId: item.id
      };
      api.integralRecordReceive(par).then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          this.getMemberDetail();
        }
      });
    },

    seemoreExchange: function() {
      this.$routerHelper.push({
        path: '/bangdouExchange'
      });
    },
    goPage: function() {
      this.$routeHelper.router(this, '/gradeDescription', null, false);
    },
    IntegralRecord: function() {
      // console.log('this.$routeHelper :>> ', this.$routeHelper);
      this.$routeHelper.router(this, '/IntegralRecord', null, true);
    },
    goProwthValue: function() {
      this.$routeHelper.router(this, '/growthValueRecord', null, true);
    },
    getPageClass: function(currentLeve) {
      let classTypeName = '';
      switch (currentLeve) {
        case 1:
          classTypeName = 'Lv1';
          this.beginTitle = 'V1';
          this.endTitle = 'V2';
          break;
        case 2:
          classTypeName = 'Lv2';
          this.beginTitle = 'V2';
          this.endTitle = 'V3';
          break;
        case 3:
          classTypeName = 'Lv3';
          this.beginTitle = 'V3';
          this.endTitle = 'V4';
          break;
        case 4:
          classTypeName = 'Lv4';
          this.beginTitle = 'V4';
          this.endTitle = 'V5';
          break;
        case 5:
          classTypeName = 'Lv5';
          this.beginTitle = 'V5';
          this.endTitle = 'V5';
          break;
      }
      return classTypeName;
    },
    toMemberRight() {
      this.$routerHelper.push({ path: '/memberRight' });
    },
    pageInitial: function(sourceData) {
      this.classTypeName = '';
      this.beginTitle = 'V1';
      this.endTitle = 'V2';
      this.integral = sourceData.integral;
      this.memberId = sourceData.memberId;
      this.currentLeve = sourceData.memberCardRelats[0].levelId;
      this.difference = sourceData.memberCardRelats[0].rangeEnd - sourceData.memberCardRelats[0].grow;
      this.differencePercentage = sourceData.memberCardRelats[0].grow / sourceData.memberCardRelats[0].rangeEnd;
      this.integralRecord(this.memberId);
      this.getMyTaskListByMember(this.memberId);
      this.$forceUpdate();
    },
    exchange(data, type, index) {
      this.toast();
      api.memberDetailByMemberID({ memberId: this.memberId }).then(res => {
        if (res.code === 200) {
          if (+data.integrealCount > +res.data.integral) {
            return this.$toast('剩余邦豆不足');
          }
          const rest = +res.data.integral - +data.integrealCount;
          this.$toast.clear();

          this.$dialog
            .confirm({
              title: '确认兑换',
              message: `<div><span style="padding-right:4px;color:#121212;">本次消耗</span><span style="color:#121212;">${data.integrealCount}</span></div><div><span style="padding-right:4px;color:#121212;">当前剩余</span><span style="color:#121212;">${res.data.integral}</span></div><div><span style="padding-right:4px;color:#121212;">兑换后剩余</span><span style="color:#121212;">${rest}</span></div>`
            })
            .then(() => {
              const params = {
                couActivitiesId: data.id,
                memberId: this.memberId,
                integral: data.integrealCount
              };
              this.toast();
              api.getReceiveCoupon(params).then(res => {
                if (res.code === 200) {
                  const couponDay = res.data.canCouponDayTotal <= res.data.couponDayTotal;
                  const couponPersonDay = res.data.canCouponPersonDayTotal <= res.data.couponPersonDayTotal;
                  const couponPerson = res.data.canCouponPersonTotal <= res.data.couponPersonTotal;
                  const couponTotal = res.data.canCouponTotal <= res.data.couponTotal;
                  if (res.data.result) {
                    this.$toast('兑换成功');
                    setTimeout(() => {
                      this.getMemberDetail();
                    }, 500);

                    // 存在上限，变更按钮为 '去使用'
                    if (couponDay || couponPersonDay || couponPerson || couponTotal) {
                      this.$set(data, 'goUse', true);
                    }
                  } else {
                    if (!couponDay && !couponPersonDay && !couponPerson && !couponTotal) {
                      console.log('无存在上限，后台/数据库处理错误');
                      this.$toast('兑换失败');
                    } else {
                      if (couponTotal) {
                        // if (type === 0) {
                        //   this.propertyList.splice(index, 1);
                        // } else {
                        //   this.vouchersList.splice(index, 1);
                        // }
                        return this.$toast('该优惠券已兑换完');
                      }
                      if (couponDay) {
                        return this.$toast('该优惠券今日已兑换完');
                      }
                      if (couponPersonDay || couponPerson) {
                        this.$set(data, 'goUse', true);
                      }
                      if (couponPerson) {
                        return this.$toast('该优惠券您已兑换完');
                      }
                      if (couponPersonDay) {
                        return this.$toast('该优惠券您今日已兑换完');
                      }
                    }
                  }
                }
              });
            });
        }
      });
    },
    queryReceiveCouponList() {
      const params = {
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 4,
        activityType: '',
        businessType: 0,
        condition: 3
      };
      api.queryReceiveCouponList(params).then(res => {
        if (res.code === 200) {
          this.$toast.clear();
        }
        const list = res.data || [];
        const propertyList = [];
        const vouchersList = [];
        let nowTime = moment(Date.now()).format('YYYYMMDD');
        list.map((item, index) => {
          if (item.validityType === 1) {
            const stareTime = moment(Number(item.validityStartTime)).format('YYYYMMDD');
            const endTime = moment(Number(item.validityEndTime)).format('YYYYMMDD');
            if (nowTime >= stareTime && nowTime <= endTime) {
              item.effective = true;
            } else {
              item.effective = false;
            }

            if (index % 2 === 0) {
              propertyList.push(item);
            } else {
              vouchersList.push(item);
            }
            // 物业
            // if (item.activity == "4014") {
            //   propertyList.push(item);
            // } else if (item.activity == "4005") {
            //   // 购物券
            //   vouchersList.push(item);
            // }
            return item;
          } else if (item.validityType === 3) {
            if (item.takeEffectDayNums === 0) {
              item.effective = true;
            } else if (item.takeEffectDayNums > 0) {
              item.effective = false;
            }

            if (index % 2 === 0) {
              propertyList.push(item);
            } else {
              vouchersList.push(item);
            }
            // 物业
            // if (item.activity == "4014") {
            //   propertyList.push(item);
            // } else if (item.activity == "4005") {
            //   // 购物券
            //   vouchersList.push(item);
            // }
            return item;
          }
        });
        propertyList.length && (this.propertyList = propertyList);
        vouchersList.length && (this.vouchersList = vouchersList);
      });
    },
    getUserInfo: function() {
      this.getMemberDetail();
      // api.getUserInfo().then((res) => {
      //   if (res.code == 200) {
      //     this.$toast.clear()
      //     console.log(res);
      //   }
      // })
    },
    toast() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
    },
    integralRecord: function(memberID) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        memberId: memberID,
        pageIndex: 1,
        pageSize: 3,
        isInvalid: 0,
        status: 1
      };
      api.integralRecord(par).then(res => {
        console.log('integralRecord res :>> ', res); //测试
        if (res.code == 200) {
          this.$toast.clear();
          this.integralRecordData = res.data.records || [];
        }
      });
    },
    getMyTaskListByMember: function(memberID) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      });
      const par = {
        pageIndex: 1,
        pageSize: 3,
        memberId: memberID
      };
      api.getMyTaskListByMember(par).then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          this.taskList = res.data.records;
        }
      });
    },
    getMemberDetail: function() {
      const par = {
        memberId: this.memberId
      };
      api.memberDetailByMemberID(par).then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          this.userInfo = res.data;
          this.memberObject = res.data;
          //this.memberObject = {memberCardRelats: [{levelId: 1}]};
          //this.memberObject = {memberCardRelats: [{levelId: 2}]};
          //this.memberObject = {memberCardRelats: [{levelId: 3}]};
          //this.memberObject = {memberCardRelats: [{levelId: 4}]};
          //this.memberObject = {memberCardRelats: [{levelId: 5}]};
          this.pageInitial(res.data);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-dropdown-menu__bar {
  box-shadow: none;
  //固定定位
  position: fixed;
  width: 100%;
  // margin-top: 27px;
}

.van-dropdown-menu__item {
  flex: inherit;
}
.van-dropdown-menu__title {
  padding: 0 9px 0 16px;
}

.van-dropdown-menu__title::after {
  border-color: transparent transparent #333 #333;
}

.plus-icon1-enter-active {
  transition: opacity 0s;
}
.plus-icon1-enter {
  opacity: 0;
}
.plus-icon1-leave-active {
  transition: opacity 0.5s;
}
.plus-icon1-leave-to {
  opacity: 0;
}

.plus-icon-enter-active {
  transition: opacity 0.5s;
}
.plus-icon-enter {
  opacity: 0;
}
.plus-icon-leave-active {
  transition: opacity 0.5s;
}
.plus-icon-leave-to {
  opacity: 0;
}

.page-content {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

.page-body {
  padding-top: 282px;
  overflow: auto;
  height: 100%;
}
.page-head {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 6666;
  width: 100%;
  //height: 282px;
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
      background-image: url('../../assets/img/member/icon-a-left.png');
    }

    .updataDeital {
      padding-left: 16px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      background-image: url('../../assets/img/member/icon-wenhao.png');
      background-position: 0px center;
    }
  }

  .memberDetial {
    display: flex;
    margin-top: 35px;
    padding: 0px 0px 0px 32px;

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
      flex-direction: column;

      .leveLogo {
        width: 96px;
        height: 50px;
        background-size: 96px 50px;
        background-repeat: no-repeat;
        background-position: 0px center;
      }
      .member-right {
        margin-top: 25px;
        margin-left: 15px;
        padding: 5px 7px;
        width: 82px;
        font-size: 12px;
        font-weight: 600;
        //height: 24px;
        //line-height: 24px;
        border-radius: 25px;
        background-color: #fff;
        vertical-align: middle;
        position: relative;
        cursor: pointer;
        img {
          height: 14px;
          width: 14px;
          vertical-align: middle;
          position: absolute;
          right: 8px;
          top: 50%;
          margin-top: -7px;
        }
        &.Lv1 {
          color: #7f86aa;
          background-color: #fff;
        }
        &.Lv2 {
          color: #b5561a;
          background-color: #EEE3DC;
        }
        &.Lv3 {
          color: #434342;
          background-color: #E8E8E8;
        }
        &.Lv4 {
          color: #b68843;
          background-color: #fff;
        }
        &.Lv5 {
          color: #121212;
          background-color: #f1d8b0;
        }
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
      padding-top: 6px;
      clear: both;
      width: 170px;
      display: flex;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      height: 20px;
      line-height: 20px;
    }
  }
}

.page-head.Lv1 {
  background-image: url('../../assets/img/member/icon-member-Lv11.png');

  .leveName {
    background-image: url('../../assets/img/member/icon-leve-name-l1.png');
  }

  .cz-number-body {
    color: #7f86aa;
  }
  .cz-number {
    color: #7f86aa;
    background-image: url('../../assets/img/member/icon-chno-l1.png');
  }

  .leveLogo {
    background-image: url('../../assets/img/member/icon-leve-l1.png');
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
  background-image: url('../../assets/img/member/icon-member-Lv22.png');

  .leveName {
    background-image: url('../../assets/img/member/icon-leve-name-l2.png');
  }

  .cz-number-body {
    color: #b5561a;
  }
  .cz-number {
    color: #b5561a;
    background-image: url('../../assets/img/member/icon-chno-l2.png');
  }

  .leveLogo {
    background-image: url('../../assets/img/member/icon-leve-l2.png');
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
  background-image: url('../../assets/img/member/icon-member-Lv33.png');

  .leveName {
    background-image: url('../../assets/img/member/icon-leve-name-l3.png');
  }

  .cz-number-body {
    color: #434342;
  }
  .cz-number {
    background-image: url('../../assets/img/member/icon-chno-l3.png');
  }

  .leveLogo {
    background-image: url('../../assets/img/member/icon-leve-l3.png');
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
  background-image: url('../../assets/img/member/icon-member-Lv44.png');

  .leveName {
    background-image: url('../../assets/img/member/icon-leve-name-l4.png');
  }

  .cz-number-body {
    color: #986b1b;
  }
  .cz-number {
    background-image: url('../../assets/img/member/icon-chno-l4.png');
  }

  .leveLogo {
    background-image: url('../../assets/img/member/icon-leve-l4.png');
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
  background-image: url('../../assets/img/member/icon-member-Lv55.png');

  .leveName {
    background-image: url('../../assets/img/member/icon-leve-name-l5.png');
  }

  .cz-number-body {
    color: #F1D8B0;
  }
  .cz-number {
    background-image: url('../../assets/img/member/icon-chno-l5.png');
  }

  .leveLogo {
    background-image: url('../../assets/img/member/icon-leve-l5.png');
  }

  .progressBar {
    .bg {
      background-color: #F1D8B0;
    }
    .progres {
      background-color: #F1D8B0;
    }
  }

  .progressBarWord {
    color: #F1D8B0;

    .pbn {
      display: none;
    }
  }
}

.page-body {
  padding: 240px 16px 16px 16px;
}
.page-body .Bangdou-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
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
  background-image: url('../../assets/img/member/icon-jt-right.png');
  .num {
    color: #e8374a;
  }
}

.page-body .Bangdou-body .see-more {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
}

.page-body {
  .bangdou-exchange {
    .bangdou-exchange-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding-bottom: 16px;

      .exchange-header-title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #290000;
      }

      .exchange-header-seemore {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #121212;
      }
    }

    .bangdou-exchange-body {
      .coupon-type {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-left: 4px;
        align-self: flex-end;
      }
      .ineffective {
        color: #d4d4d4 !important;
      }
      .exchange-swipper {
        width: auto;
        display: flex;
        padding-bottom: 16px;
      }
      .exchange-body-item:first-child .exchange-swipper {
        padding-top: 16px;
      }
      .exchange-body-item {
        // height: 129px;
        width: calc(100% + 32px);
        overflow-x: auto;
        display: flex;
        align-items: center;
        margin-left: -16px;
        padding-left: 16px;
        // flex-direction: row;
        // justify-content: flex-start;
        // align-items: stretch;
        // margin-bottom: 16px;
        .bangdou-exchange-card {
          height: 106px;
          // flex-basis: 324px;
          width: 324px;
          white-space: nowrap;
          margin-right: 12px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: stretch;
          box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
          border-radius: 12px;
          overflow: hidden;

          .exchange-card-left {
            width: 101px;
            height: 106px;
            // background-color: red;
            background-image: url('../../assets/img/coupons/red_card.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .exchange-card-left-top {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              .card-left-top-type {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
              }
              .card-left-top-num {
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
              }
            }
            .exchange-card-left-bottom {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;
            }
          }

          .exchange-card-right {
            flex: 1;
            height: 106px;
            background-color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: stretch;
            padding-right: 12px;

            .exchange-card-right-left {
              flex: 1;
              padding: 12px 7px 0 12px;
              display: flex;
              flex-direction: column;
              // flex-flow: row wrap;
              justify-content: flex-start;
              align-items: stretch;

              .card-right-left-top {
                margin-bottom: 8px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 700;
                color: #121212;
                line-height: 20px;
                max-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                white-space: normal;
              }

              .card-right-left-bottom {
                align-self: flex-start;
                .card-right-left-bottom-left {
                  padding-right: 4px;

                  height: 20px;
                  font-size: 20px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #e8374a;
                  line-height: 20px;
                }
                .card-right-left-bottom-right {
                  height: 14px;
                  font-size: 14px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #e8374a;
                  line-height: 14px;
                }
              }
            }
            .exchange-card-right-right {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;

              .exchange-card-right-right-btn {
                width: 68px;
                height: 24px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background: linear-gradient(180deg, #ff8381 0%, #e8374a 100%);
                border-radius: 15px;
                font-size: 12px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                &.ineffective {
                  background: #f8f8f8;
                }
              }
            }
          }
        }

        .bangdou-exchange-card.row-reverse {
          flex-flow: row-reverse;
          .exchange-card-right-left {
            // padding-top: 12px;
          }
          .exchange-card-left-top .card-left-top-num {
            font-weight: 600;
          }
          .exchange-card-right {
            flex-flow: row-reverse;
            padding-left: 12px;
          }
          .card-left-top-num {
            font-weight: 600;
          }
          .exchange-card-left {
            background-image: url('../../assets/img/coupons/yellow_card.png');
          }
          .exchange-card-right-right .exchange-card-right-right-btn {
            width: 72px;
            height: 72px;
            border-radius: 4px;
            background-image: url('../../assets/img/coupons/food.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
          }
          .exchange-card-left-btn {
            width: 68px;
            height: 22px;
            background: #ffffff;
            border-radius: 15px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ff7709;
            margin-top: 8px;
          }
        }
        .goods-img {
          width: 72px;
          height: 72px;
          border-radius: 4px;
        }
      }
    }
  }
}

.page-body .notReceived {
  display: flex;
  margin-bottom: 16px;
}
.page-body .notReceivedNode {
  display: flex;
  align-items: center;
  // display: inline-block;
  margin-right: 10px;
  width: 33%;
  height: 58px;
  padding-left: 44px;
  // padding-top: 12px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/img/member/icon-getBangDou-bg.png');
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
  // margin: 20px 0px 16px 0px;f
  margin-bottom: 16px;
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
  background-image: url('../../assets/img/member/icon-jt-right.png');
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

.task-list-body .task-node .task-left {
  flex: 1;
}
.task-list-body .task-node .task-right {
  flex: 0 0 80px;
  display: flex;
  justify-content: center;
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
  background-image: url('../../assets/img/member/icon-biaoshi.png');
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}

.btn.red {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e8374a;
  background: #fcecee;
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
    background-image: url('../../assets/img/icon-nodata.png');
  }
  .message {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8d8d8d;
  }
}
.zhanwei {
  width: 100%;
  height: 40px;
  background-color: #d4d6e2;
  border-radius: 10px;
  opacity: 0.2;
  margin: 10px 0px;
}
</style>
