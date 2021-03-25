<template>
  <div class="member-coupon exchange-info">
    <div class="exchange-tab-wrap" ref="scrollContent">
      <van-tabs v-model="active" :sticky="true" @click="tabChange">
        <van-tab v-for="(tab, index) in tabList" :key="tab.businessType" :title="tab.label">
          <div class="bangdou-exchange-wrap">
            <div class="bangdou-exchange">
              <div class="bangdou-exchange-body">
                <zk-empty v-show="!list[index].length && !loading" image="coupon" description="暂无卡券"></zk-empty>
                <div class="exchange-body-item">
                  <div
                    v-for="(item, cIndex) in list[index]"
                    :key="`tab${index}${item.id}`"
                    class="bangdou-exchange-card"
                    :class="[
                      {
                        'row-reverse': item.activity !== '4014'
                      },
                      {
                        shopping: item.activity !== '4014'
                      }
                    ]"
                  >
                    <!-- <template v-if="item.activity === '4014'"> -->
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
                      <template v-if="item.activity !== '4014'">
                        <div
                          v-if="item.goUse"
                          class="exchange-card-left-btn"
                          :class="{ ineffective: !item.effective }"
                          @click="useCoupon(item)"
                        >
                          去使用
                        </div>
                        <div v-else class="exchange-card-left-btn" @click="getCoupon(item, index, cIndex)">
                          立即领取
                        </div>
                      </template>
                    </div>
                    <div class="exchange-card-item exchange-card-right">
                      <div class="exchange-card-right-left">
                        <div class="card-right-left-top">
                          {{ item.couponTitle }}
                        </div>
                        <div class="card-right-left-middle" v-if="item.validityType === 1">
                          {{ getTime(item.validityStartTime) }}-{{ getTime(item.validityEndTime) }}
                        </div>
                        <div class="card-right-left-bottom" @click="collapse(`tab${index}couponDesc${cIndex}`)">
                          使用规则
                          <van-icon
                            name="arrow-down"
                            size="12"
                            class="icon-arrow-down"
                            :ref="`tab${index}couponDesc${cIndex}Icon`"
                          ></van-icon>
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
                          <div v-else class="exchange-card-right-right-btn" @click="getCoupon(item, index, cIndex)">
                            立即领取
                          </div>
                        </template>
                        <img v-else class="goods-img" :src="item.image || defaultImg" />
                      </div>
                    </div>
                    <div class="coupon-desc-wrap" :ref="`tab${index}couponDesc${cIndex}`">
                      <div class="coupon-desc" :ref="`tab${index}couponDesc${cIndex}Cont`">
                        <div class="coupon-desc-li" style="white-space: pre-line;">
                          {{ item.memo }}
                          <!-- 使用说明：平台10元通用优惠券，单笔订单满88元可使用。 -->
                        </div>
                        <!-- <div class="coupon-desc-li">
                          使用说明：平台10元通用优惠券;
                        </div> -->
                        <div class="coupon-desc-num">券编号：{{ item.couTypeCode }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-show="showNull" class="exchange-main-null">
      <null :message="nullMsg" bgicon="pets" :isadd="true" />
    </div>
  </div>
</template>

<script>
import api from '@/api';
import nav from '@zkty-team/x-engine-module-nav';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import * as moment from 'moment';
import Null from '@/components/null';
import mixin from '../mixin/pageList';
import _ from 'lodash';
import couponMixin from '../mixin/getCoupon-mixin';
const defaultImg = require('@/assets/img/coupons/coupon-default.png');

export default {
  mixins: [mixin, couponMixin],
  data() {
    return {
      active: 0,
      defaultImg: defaultImg,
      loading: false,
      showNull: false,
      nullMsg: '',
      // ---分隔符---
      petsUpdateList: [],
      //
      memberId: '',
      busy: false,
      tabList: [
        {
          label: '全部',
          businessType: '0'
        },
        {
          label: '物业抵扣券',
          businessType: '4014'
        },
        {
          label: '购物券',
          businessType: '4005'
        }
      ]
    };
  },
  components: {
    Null
  },
  watch: {},
  created() {
    this.paramsList(); //mixin引入公共method

    if (this.$store.getters.isDebugMode) {
      this.memberId = '2332445899206164529';
      // this.memberId = '2332445899206164494';
      localStorage.setItem('memberId', this.memberId);
      this.getList();
      this.getUserInfo();
    } else {
      localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
        // app首页进入，获取不到会员信息
        if (res.result) {
          this.memberId = res.result;
          localStorage.setItem('memberId', this.memberId);
          this.getList();
          this.getUserInfo();
        } else {
          this.toast();
          this.loading = true;
          this.getUserInfo(() => {
            const params = {
              phone: this.userInfo.phone,
              phoneArea: this.userInfo.phoneAreaCode
            };
            api.memberDetailByPhone(params).then(member => {
              if (member.code === 200) {
                this.memberId = member.data.memberId;
                this.getList();
              }
            });
          });
        }
      });

      // this.toast();
      // this.loading = true;
      // this.getUserInfo(() => {
      //   const params = {
      //     phone: this.userInfo.phone,
      //     phoneArea: this.userInfo.phoneAreaCode
      //   };
      //   api.memberDetailByPhone(params).then(member => {
      //     if (member.code === 200) {
      //       this.memberId = member.data.memberId;
      //       this.getList();
      //     }
      //   });
      // });
    }
  },
  mounted() {
    nav.setNavLeftBtn({
      title: '领券中心',
      titleColor: '#121212',
      titleSize: 24,
      titleFontName: 'PingFangSC-Medium'
    });
  },
  methods: {
    getTime(time) {
      const date = new Date(+time);
      return moment(date).format('YYYY.MM.DD');
    },
    getCoupon(data, index, cIndex) {
      this.toast();
      api
        .getReceiveCoupon({
          couActivitiesId: data.id,
          memberId: this.memberId
        })
        .then(res => {
          if (res.code === 200) {
            // 该券
            const couponDay = res.data.canCouponDayTotal <= res.data.couponDayTotal;
            const couponPersonDay = res.data.canCouponPersonDayTotal <= res.data.couponPersonDayTotal;
            const couponPerson = res.data.canCouponPersonTotal <= res.data.couponPersonTotal;
            const couponTotal = res.data.canCouponTotal <= res.data.couponTotal;
            // 变更按钮为 '去使用'

            // 删除不显示

            if (res.data.result) {
              this.$toast('领取成功');
              if (couponPersonDay || couponDay || couponPerson || couponTotal) {
                this.$set(data, 'goUse', true);
                // 解决多维数组修改属性无效
                this.list.push([]);
                this.list.splice(this.list.length - 1, 1);
              }
            } else {
              // 都未达到上限，后台/数据库处理错误
              if (!couponDay && !couponPersonDay && !couponPerson && !couponTotal) {
                console.log('无存在上限，后台/数据库处理错误');
                this.$toast('领取失败');
              } else {
                if (couponTotal) {
                  return this.$toast('该优惠券已领光');
                }
                if (couponDay) {
                  return this.$toast('该优惠券今日已领光');
                }
                if (couponPersonDay || couponPerson) {
                  this.$set(data, 'goUse', true);
                  // 解决多维数组修改属性无效
                  this.list.push([]);
                  this.list.splice(this.list.length - 1, 1);
                }
                if (couponPerson) {
                  return this.$toast('该优惠券您已达领取上限');
                }
                if (couponPersonDay) {
                  return this.$toast('该优惠券您今日已达领取上限');
                }
              }
            }
          }
        });
    },
    getUserInfo(callBack) {
      api.getUserInfo().then(res => {
        this.userInfo = res.data || {};
        callBack && callBack();
      });
    },
    loadMore() {
      const tabIndex = this.active;
      if (this.canLoadMore[tabIndex]) {
        this.getList();
      }
    },
    getList() {
      const tabIndex = this.active;
      const params = {
        memberId: this.memberId,
        pageIndex: this.pageIndex[tabIndex],
        pageSize: 9999, // 不分页
        activityType: '',
        businessType: this.tabList[tabIndex].businessType,
        condition: 1
      };
      this.loading = true;
      this.busy = true;
      this.toast();
      api
        .queryReceiveCouponList(params)
        .then(res => {
          if (res.code === 200) {
            this.$toast.clear();
            const list = res.data || [];
            let nowTime = moment(Date.now()).format('YYYYMMDD');
            // 是否在有效期
            list.map(item => {
              if (item.validityType === 1) {
                const stareTime = moment(Number(item.validityStartTime)).format('YYYYMMDD');
                const endTime = moment(Number(item.validityEndTime)).format('YYYYMMDD');
                if (nowTime >= stareTime && nowTime <= endTime) {
                  item.effective = true;
                } else {
                  item.effective = false;
                }
                return item;
              } else if (item.validityType === 3) {
                if (item.takeEffectDayNums === 0) {
                  item.effective = true;
                } else if (item.takeEffectDayNums > 0) {
                  item.effective = false;
                }
                return item;
              }
            });
            console.log('queryReceiveCouponList list :>> ', list);
            this.list[tabIndex] = params.pageIndex === 1 ? list : _.concat(this.list[tabIndex], list);
            list.length < params.pageSize && (this.canLoadMore[tabIndex] = false);
            this.total[tabIndex] = (res.data && res.data.total) || 0;
            list.length && this.pageIndex[tabIndex]++;
          }
        })
        .finally(() => {
          this.busy = false;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.exchange-info {
  font-size: 18px;
  ::v-deep .van-tabs__wrap {
    box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
    height: 56px;
  }
  ::v-deep .van-tab--active {
    color: #121212 !important;
    font-size: 16px;
    font-weight: 700;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  ::v-deep .van-tabs__line {
    background-color: #121212 !important;
    bottom: 26px;
    height: 2px;
  }

  .exchange-tab-wrap {
    .bangdou-exchange-wrap {
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
          .exchange-body-item {
            margin-bottom: 20px;
            .bangdou-exchange-card {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              // align-items: stretch;
              margin-bottom: 20px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 12px;
              flex-wrap: wrap;

              .exchange-card-left {
                width: 101px;
                height: 106px;
                background-image: url('../../../assets/img/coupons/red_card.png');
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100% 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .exchange-card-left-top {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  line-height: 1;
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
                  margin-top: 4px;
                }
              }

              .exchange-card-right {
                flex: 1;
                height: 97px;
                background-color: #fff;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: stretch;
                padding: 5px 12px;
                // padding-left: 12px;

                .exchange-card-right-left {
                  flex: 1;
                  display: flex;
                  padding: 5px 7px 0 5px;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: stretch;
                  flex-flow: row wrap;

                  .card-right-left-top {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 700;
                    color: #121212;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  .card-right-left-middle {
                    padding-top: 8px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #8d8d8d;
                    align-self: flex-end;
                    line-height: 1;
                    width: 100%;
                  }
                  .card-right-left-bottom {
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
                  // width: 88px;
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
                  .goods-img {
                    width: 72px;
                    height: 72px;
                    border-radius: 4px;
                  }
                }
              }
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
            }
            .bangdou-exchange-card.row-reverse {
              flex-flow: row-reverse;
              flex-wrap: wrap;
              .exchange-card-right {
                flex-flow: row-reverse;
              }
              .card-left-top-num {
                font-weight: 600;
              }
              .exchange-card-right-right {
                // padding-right: 12px;
                align-items: flex-end;
                flex-direction: column;
              }
              .exchange-card-left-btn {
                display: flex;
              }
              .exchange-card-right-left {
                padding-left: 12px;
              }
            }
            .bangdou-exchange-card.shopping {
              .exchange-card-right-left {
                padding-left: 12px;
                padding-top: 0;
              }
              .exchange-card-left {
                background-image: url('../../../assets/img/coupons/yellow_card.png');
              }
              .exchange-card-right-right .exchange-card-right-right-btn {
                width: 72px;
                height: 72px;
                border-radius: 4px;
                background-image: url('../../../assets/img/coupons/food.png');
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
