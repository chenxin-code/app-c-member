<template>
  <div class="exchange-info">
    <div class="exchange-main-wrap">
      <zk-empty
        image="coupon"
        description="暂无卡券"
        v-if="!loading && !propertyList.length && !vouchersList.length"
      ></zk-empty>
      <!-- 物业 -->
      <div class="bangdou-exchange" v-if="propertyList.length">
        <div class="bangdou-exchange-header">
          <div class="exchange-header-title">
            物业抵扣券
          </div>
        </div>
        <div class="bangdou-exchange-body">
          <div class="exchange-body-item1">
            <div class="bangdou-exchange-card" v-for="(item, cIndex) in propertyList" :key="item.id">
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
              </div>
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">{{ item.couponTitle }}</div>
                  <div class="card-right-left-bottom">
                    <span class="card-right-left-bottom-left">{{ item.integrealCount }}</span>
                    <span class="card-right-left-bottom-right">邦豆</span>
                  </div>
                  <div class="card-right-left-middle" v-if="item.validityType === 1">
                    {{ getTime(item.validityStartTime) }}-{{ getTime(item.validityEndTime) }}
                  </div>
                  <div class="card-right-left-bottom-sygz" @click="collapse(`tabcouponDesc1${cIndex}`)">
                    使用规则
                    <van-icon name="arrow-down" size="12" class="icon-arrow-down" :ref="`tabcouponDesc1${cIndex}Icon`"></van-icon>
                  </div>
                </div>
                <div class="exchange-card-right-right">
                  <div
                    v-if="item.goUse"
                    class="exchange-card-right-right-btn"
                    :class="{ ineffective: !item.effective }"
                    @click="useCoupon(item)"
                  >
                    去使用
                  </div>
                  <div v-else class="exchange-card-right-right-btn" @click="!showNewToast && exchange(item, 0, cIndex)">
                    邦豆兑换
                  </div>
                </div>
              </div>
              <div class="coupon-desc-wrap" :ref="`tabcouponDesc1${cIndex}`">
                <div class="coupon-desc" :ref="`tabcouponDesc1${cIndex}Cont`">
                  <div class="coupon-desc-li" style="white-space: pre-line;" v-html="item.memo"></div>
                  <div class="coupon-desc-num">券编号：{{ item.couTypeCode }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 非物业券 -->
      <div class="bangdou-exchange" v-if="vouchersList.length">
        <div class="bangdou-exchange-header">
          <div class="exchange-header-title">
            购物券
          </div>
        </div>
        <div class="bangdou-exchange-body">
          <div class="exchange-body-item2">
            <div class="bangdou-exchange-card" v-for="(item, cIndex) in vouchersList" :key="item.id">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <img class="goods-img" :src="item.image || defaultImg" />
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    {{ item.couponTitle }}
                  </div>
                  <div class="card-right-left-bottom">
                    <span class="card-right-left-bottom-left">{{ item.integrealCount }}</span>
                    <span class="card-right-left-bottom-right">邦豆</span>
                  </div>
                  <div class="card-right-left-middle" v-if="item.validityType === 1">
                    {{ getTime(item.validityStartTime) }}-{{ getTime(item.validityEndTime) }}
                  </div>
                  <div class="card-right-left-bottom-sygz" @click="collapse(`tabcouponDesc2${cIndex}`)">
                    使用规则
                    <van-icon name="arrow-down" size="12" class="icon-arrow-down" :ref="`tabcouponDesc2${cIndex}Icon`"></van-icon>
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
                <div v-else class="exchange-card-left-btn" @click="!showNewToast && exchange(item, 1, cIndex)">
                  邦豆兑换
                </div>
              </div>
              <div class="coupon-desc-wrap" :ref="`tabcouponDesc2${cIndex}`">
                <div class="coupon-desc" :ref="`tabcouponDesc2${cIndex}Cont`">
                  <div class="coupon-desc-li" style="white-space: pre-line;" v-html="item.memo"></div>
                  <div class="coupon-desc-num">券编号：{{ item.couTypeCode }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showNull" class="exchange-main-null">
      <null :message="nullMsg" bgicon="pets" :isadd="true" />
    </div>
    <!-- 临时跳转:生产需注释 -->
    <div style="padding:0 16px 20px 16px;" v-if="$store.getters.isDebugMode">
      <button @click="$router.push('/couponsClaim')" style="margin-right:5px;">
        领券中心(金刚区)
      </button>
      <button @click="$router.push('/couponsMine')" style="margin-right:5px;">
        我的卡券(我的/卡券)
      </button>
    </div>
    <newToast :toastStr="toastStr" :couponItem="couponItem" v-if="showNewToast"></newToast>
  </div>
</template>

<script>
import api from '@/api';
import nav from '@zkty-team/x-engine-module-nav';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import mixin from './../coupons/mixin/pageList';
import * as moment from 'moment';
import Null from '@/components/null';
import _ from 'lodash';
import couponMixin from '../coupons/mixin/getCoupon-mixin';
import newToast from './../../components/newToast';
const defaultImg = require('@/assets/img/coupons/coupon-default.png');

export default {
  mixins: [mixin,couponMixin],
  data() {
    return {
      loading: false,
      defaultImg: defaultImg,
      showNull: false,
      nullMsg: '',
      memberId: '',
      pageRefresh: true,
      propertyList: [], //物业券
      vouchersList: [], // 购物券
      canLoadMore: true, //解决下拉刷新
      // ---分隔符---
      petsUpdateList: [],
      //newToast
      toastStr: '', couponItem: {}, showNewToast: false
    };
  },
  components: {
    Null,newToast
  },
  // beforeRouteLeave(to, form, next) {
  //   next();
  // },
  watch: {},
  created() {
    //本地测试用
    // this.toast();
    // Promise.all([
    //   this.queryReceiveCouponList(4014),
    //   this.queryReceiveCouponList(4005)
    // ]).then(() => {
    //   this.$toast.clear();
    // });

    if (this.$store.getters.isDebugMode) {
      //生产需注释
      this.memberId = '2454637924935794688';
      this.queryReceiveCouponList();
      this.getUserInfo();
    } else {
      //生产需打开
      localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
        this.memberId = res.result;
        localStorage.setItem('memberId', this.memberId);
        this.queryReceiveCouponList();
        this.getUserInfo();
      });
    }
  },
  mounted() {
    // this.madeData();
    nav.setNavLeftBtn({
      title: '邦豆兑换',
      titleColor: '#121212',
      titleSize: 24,
      titleFontName: 'PingFangSC-Medium'
    });
  },
  methods: {
    getUserInfo() {
      api.getUserInfo().then(res => {
        this.userInfo = res.data || {};
      });
    },
    toast() {
      this.$toast.loading({
        duration: 0,
        type: 'loading',
        message: '加载中...',
        forbidClick: true
      });
    },
    getTime(time) {
      const date = new Date(+time);
      return moment(date).format('YYYY.MM.DD');
    },
    queryReceiveCouponList() {
      const params = {
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 9999,
        activityType: '',
        businessType: 0,
        condition: 3
      };
      this.loading = true;
      this.toast();
      api
        .queryReceiveCouponList(params)
        .then(res => {
          if (res.code === 200) {
            this.$toast.clear();
          }
          const data = res.data || [];
          const propertyList = [];
          const vouchersList = [];
          let nowTime = moment(Date.now()).format('YYYYMMDD');
          data.map(item => {
            if (item.validityType === 1) {
              const stareTime = moment(Number(item.validityStartTime)).format('YYYYMMDD');
              const endTime = moment(Number(item.validityEndTime)).format('YYYYMMDD');
              if (nowTime >= stareTime && nowTime <= endTime) {
                item.effective = true;
              } else {
                item.effective = false;
              }
              // 物业
              if (item.activity == '4014') {
                propertyList.push(item);
              } else if (item.activity == '4005') {
                // 购物券
                vouchersList.push(item);
              }
              return item;
            } else if (item.validityType === 3) {
              if (item.takeEffectDayNums === 0) {
                item.effective = true;
              } else if (item.takeEffectDayNums > 0) {
                item.effective = false;
              }
              // 物业
              if (item.activity == '4014') {
                propertyList.push(item);
              } else if (item.activity == '4005') {
                // 购物券
                vouchersList.push(item);
              }
              return item;
            }
          });
          propertyList.length && (this.propertyList = propertyList);
          vouchersList.length && (this.vouchersList = vouchersList);
        })
        .finally(() => {
          this.loading = false;
        });
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
                  // 该券当前人
                  const couponDay = res.data.canCouponDayTotal <= res.data.couponDayTotal;
                  const couponPersonDay = res.data.canCouponPersonDayTotal <= res.data.couponPersonDayTotal;
                  const couponPerson = res.data.canCouponPersonTotal <= res.data.couponPersonTotal;
                  const couponTotal = res.data.canCouponTotal <= res.data.couponTotal;
                  // 变更按钮为 '去使用'
                  if (res.data.result) {
                    if(this.$qiangTX){
                      this.$toast.clear();
                      this.toastStr = '兑换成功';
                      this.couponItem = data;
                      this.showNewToast = true;
                      setTimeout(() => {
                        this.showNewToast = false;
                      }, 3000);
                    }else{
                      this.$toast('兑换成功');
                    }
                    if (couponPersonDay || couponDay || couponPerson || couponTotal) {
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
              }).finally(() => {});
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.exchange-info {
  font-size: 18px;

  .exchange-main-wrap {
    padding: 20px 16px;

    .bangdou-exchange {
      .bangdou-exchange-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16px;

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
        .exchange-body-item1 {
          margin-bottom: 20px;
          .bangdou-exchange-card {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
            margin-bottom: 20px;
            box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
            border-radius: 16px;
            flex-wrap: wrap;

            .exchange-card-left {
              width: 101px;
              height: 97px;
              background-image: url('../../assets/img/coupons/red_card.png');
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100% 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: stretch;

              .exchange-card-left-top {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: #fff;
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
              height: 97px;
              background-color: #fff;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              padding: 5px 12px;

              .exchange-card-right-left {
                flex: 1;
                padding: 5px 7px 0 5px;
                display: flex;
                flex-direction: column;
                //-webkit-box-orient: vertical;
                //-webkit-box-direction: normal;
                justify-content: flex-start;
                align-items: stretch;
                flex-flow: row wrap;

                .card-right-left-top {
                  width: 100%;
                  margin-bottom: 6px;
                  // height: 16px;
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 700;
                  color: #121212;
                  line-height: 20px;
                  align-self: flex-start;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }

                .card-right-left-middle {
                  padding-top: 5px;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #8d8d8d;
                  align-self: flex-start;
                  line-height: 1;
                  width: 100%;
                }

                .card-right-left-bottom {
                  line-height: 1;
                  align-self: center;

                  .card-right-left-bottom-left {
                    padding-right: 4px;

                    font-size: 20px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #e8374a;
                  }
                  .card-right-left-bottom-right {
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #e8374a;
                    line-height: 14px;
                  }
                }
                .card-right-left-bottom-sygz {
                  margin-top: 5px;
                  padding: 2px 0;
                  font-size: 10px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #bfbfbf;
                  line-height: 1;
                  align-self: flex-end;
                  width: 100%;
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
                  margin-left: 7px;
                  &.ineffective {
                    background: #f8f8f8;
                  }
                }
              }
            }
          }
          .coupon-desc-wrap {
            height: 0;
            display: none;
            width: 100%;
            overflow: hidden;
            -webkit-transition: height 0.3s ease-in-out;
            transition: height 0.3s ease-in-out;
            will-change: height;

            box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
            margin-top: 4px;
            .coupon-desc {
              font-size: 12px;
              color: #bfbfbf;
              padding: 10px 16px;
              line-height: 18px;
              &-num {
                margin-top: 8px;
              }
            }
          }
          .icon-arrow-down {
            vertical-align: bottom;
            transition: all 0.3s;
            bottom: -1px;
          }
        }
        .exchange-body-item2 {
          margin-bottom: 20px;

          .bangdou-exchange-card {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;
            margin-bottom: 20px;
            box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
            border-radius: 16px;
            flex-wrap: wrap;

            .exchange-card-left {
              width: 101px;
              height: 97px;
              background-image: url('../../assets/img/coupons/yellow_card.png');
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
                margin-bottom: 8px;
                .card-left-top-type {
                  height: 16px;
                  font-size: 16px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #ffffff;
                  line-height: 16px;
                }
                .card-left-top-num {
                  font-size: 18px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #ffffff;
                }
              }

              .exchange-card-left-bottom {
                height: 12px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
                line-height: 12px;

                margin-bottom: 10px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
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
              }
            }

            .exchange-card-right {
              flex: 1;
              height: 97px;
              background-color: #fff;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              padding: 5px 12px;

              .exchange-card-right-left {
                flex: 1;
                padding-left: 12px;
                display: flex;
                flex-direction: column;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                justify-content: flex-start;
                align-items: stretch;
                flex-flow: row wrap;

                .card-right-left-top {
                  // width: 101px;
                  width: 100%;
                  margin-bottom: 6px;
                  font-size: 14px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #121212;
                  line-height: 20px;

                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  align-self: flex-start;
                }
              }

              .card-right-left-middle {
                padding-top: 5px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #8d8d8d;
                align-self: flex-start;
                line-height: 1;
                width: 100%;
              }
              .exchange-card-right-right {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                justify-content: center;
                align-items: stretch;

                .exchange-card-right-right-btn {
                  width: 72px;
                  height: 72px;
                  border-radius: 4px;
                  background-image: url('../../assets/img/coupons/food.png');
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 100% 100%;
                }
              }
            }
            .card-right-left-bottom {
              align-self: flex-end;
              line-height: 1;
              .card-right-left-bottom-left {
                padding-right: 4px;

                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #e8374a;
                line-height: 20px;
              }
              .card-right-left-bottom-right {
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #e8374a;
                line-height: 14px;
              }
            }
            .card-right-left-bottom-sygz {
              margin-top: 5px;
              padding: 2px 0;
              font-size: 10px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #bfbfbf;
              line-height: 1;
              align-self: flex-end;
              width: 100%;
            }
            .goods-img {
              width: 72px;
              height: 72px;
              border-radius: 4px;
            }
          }
          .coupon-desc-wrap {
            height: 0;
            display: none;
            width: 100%;
            overflow: hidden;
            -webkit-transition: height 0.3s ease-in-out;
            transition: height 0.3s ease-in-out;
            will-change: height;

            box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
            margin-top: 4px;
            .coupon-desc {
              font-size: 12px;
              color: #bfbfbf;
              padding: 10px 16px;
              line-height: 18px;
              &-num {
                margin-top: 8px;
              }
            }
          }
          .icon-arrow-down {
            vertical-align: bottom;
            transition: all 0.3s;
            bottom: -1px;
          }
        }
      }
    }
  }

  .exchange-main-null {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
}
</style>
