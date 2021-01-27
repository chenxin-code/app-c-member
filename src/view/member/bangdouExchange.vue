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
            <div
              class="bangdou-exchange-card"
              v-for="item in propertyList"
              :key="item.id"
            >
              <div class="exchange-card-item exchange-card-left">
                <div class="exchange-card-left-top">
                  <template v-if="item.couponType === 40">
                    <div class="card-left-top-num">
                      {{ item.faceAmount }}
                    </div>
                    折
                  </template>
                  <template v-else>
                    <div class="card-left-top-type">
                      ￥
                    </div>
                    <div class="card-left-top-num">
                      {{ item.faceAmount }}
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
                    <span class="card-right-left-bottom-left">{{
                      item.integrealCount
                    }}</span>
                    <span class="card-right-left-bottom-right">邦豆</span>
                  </div>
                </div>
                <div class="exchange-card-right-right">
                  <div
                    class="exchange-card-right-right-btn"
                    @click="exchange(item)"
                  >
                    邦豆兑换
                  </div>
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
            <div
              class="bangdou-exchange-card"
              v-for="item in vouchersList"
              :key="item.id"
            >
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <img class="goods-img" :src="item.image || defaultImg" />
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
                      {{ item.faceAmount }}
                    </div>
                    折
                  </template>
                  <template v-else>
                    <div class="card-left-top-type">
                      ￥
                    </div>
                    <div class="card-left-top-num">
                      {{ item.faceAmount }}
                    </div>
                  </template>
                </div>
                <div class="exchange-card-left-bottom">
                  {{ couponType(item) }}
                </div>
                <div class="exchange-card-left-btn" @click="exchange(item)">
                  邦豆兑换
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
    <!-- 临时跳转 -->
    <!-- <div style="padding:0 16px 20px 16px;">
      <button @click="$router.push('/couponsClaim')" style="margin-right:5px;">
        领券中心
      </button>
      <button @click="$router.push('/couponsMine')" style="margin-right:5px;">
        我的卡券
      </button>
      <button @click="$router.push('/signIn')">签到</button>
    </div> -->
  </div>
</template>

<script>
import api from "@/api";
import nav from "@zkty-team/x-engine-module-nav";
import localstorage from "@zkty-team/x-engine-module-localstorage";

import * as moment from "moment";
import Null from "@/components/null";
import _ from "lodash";
const defaultImg = require("@/assets/img/coupons/coupon-default.png");

export default {
  data() {
    return {
      loading: false,
      defaultImg: defaultImg,
      showNull: false,
      nullMsg: "",
      memberId: "",
      pageRefresh: true,
      propertyList: [], //物业券
      vouchersList: [], // 购物券
      canLoadMore: true, //解决下拉刷新
      // ---分隔符---
      userInfo: {},
      petsUpdateList: []
    };
  },
  components: {
    Null
  },
  // beforeRouteLeave(to, form, next) {
  //   next();
  // },
  watch: {},
  created() {
    this.memberId = "2331048196588962531";
    // this.toast();
    // Promise.all([
    //   this.queryReceiveCouponList(4014),
    //   this.queryReceiveCouponList(4005)
    // ]).then(() => {
    //   this.$toast.clear();
    // });
    localstorage.get({ key: "LLBMemberId", isPublic: true }).then(res => {
      this.memberId = res.result;
      this.queryReceiveCouponList();
      this.getUserInfo();
    });
    this.queryReceiveCouponList();
    this.getUserInfo();
  },
  mounted() {
    this.madeData();
    nav.setNavLeftBtn({
      title: "帮豆兑换",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
  },
  methods: {
    madeData() {
      let list = [];
      for (let index = 0; index < 3; index++) {
        let data = {
          activity: index === 1 ? "4014" : "4005",
          activityMemo: "",
          cost: "",
          couTypeCode: "1",
          couponStatus: 0,
          couponSubhead: "1",
          couponTitle: "1",
          couponType: 10,
          discountMaxDeduction: "1",
          discountRatio: "1",
          faceAmount: "1",
          id: `index${index}`,
          image: "",
          memo: "2",
          operator: "",
          receiveCondition: "",
          receiveConditionRule: "",
          releaseCount: 100,
          releaseForm: "",
          releaseRule: "",
          releaseType: "",
          satisfyAmount: "1",
          takeEffectDayNums: 0,
          validityDayNums: 0,
          validityEndTime: "2021-01-30",
          validityStartTime: "2021-01-20"
        };
        list.push(data);
      }
      let propertyList = [];
      let vouchersList = [];
      list.forEach(item => {
        // 物业
        if (item.activity == "4014") {
          propertyList.push(item);
        } else if (item.activity == "4005") {
          // 购物券
          vouchersList.push(item);
        }
      });

      propertyList.length && (this.propertyList = propertyList);
      vouchersList.length && (this.vouchersList = vouchersList);
    },
    getUserInfo() {
      api.getUserInfo().then(res => {
        this.userInfo = res.data || {};
      });
    },
    toast() {
      this.$toast.loading({
        duration: 0,
        type: "loading",
        message: "加载中...",
        forbidClick: true
      });
    },
    couponType(item) {
      if (item.couponType === 10) {
        return `无门槛立减`;
      } else if (item.couponType === 20) {
        return `满${item.satisfyAmount}元可用`;
      } else if (item.couponType === 40) {
        return `满${item.satisfyAmount}元可用`;
      }
    },
    queryReceiveCouponList() {
      const params = {
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 9999,
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
          data.forEach(item => {
            // 物业
            if (item.activity == "4014") {
              propertyList.push(item);
            } else if (item.activity == "4005") {
              // 购物券
              vouchersList.push(item);
            }
          });
          propertyList.length && (this.propertyList = propertyList);
          vouchersList.length && (this.vouchersList = vouchersList);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    exchange(data) {
      this.$dialog
        .confirm({
          title: "确认兑换",
          message: "本次消耗{$邦豆数}\n当前剩余{$邦豆数}\n兑换后剩余{$邦豆数}\n"
        })
        .then(() => {
          const params = {
            couActivitiesId: data.id,
            memberId: this.memberId,
            integral: data.integrealCount,
            phone: this.userInfo.phone
          };
          this.toast();
          api.integralConversion(params).then(res => {
            if (res === 200) {
              this.$toast("兑换成功");
            }
          });
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

            .exchange-card-left {
              width: 101px;
              height: 97px;
              background-image: url("../../assets/img/coupons/red_card.png");
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
                .card-left-top-type {
                  font-size: 16px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #ffffff;
                }
                .card-left-top-num {
                  font-size: 26px;
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
              padding: 12px;

              .exchange-card-right-left {
                flex: 1;
                // padding-left: 12px;
                // padding: 19px 7px 0 0px;
                display: flex;
                flex-direction: column;
                flex-flow: row wrap;

                .card-right-left-top {
                  width: 100%;
                  margin-bottom: 6px;
                  // height: 16px;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #121212;
                  line-height: 16px;
                  align-self: flex-start;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                }

                .card-right-left-bottom {
                  line-height: 1;
                  align-self: flex-start;

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
                }
              }
            }
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

            .exchange-card-left {
              width: 101px;
              height: 106px;
              background-image: url("../../assets/img/coupons/yellow_card.png");
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
                  height: 28px;
                  font-size: 28px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #ffffff;
                  line-height: 28px;
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
              height: 106px;
              background-color: #fff;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              padding: 12px;

              .exchange-card-right-left {
                flex: 1;
                padding-left: 12px;
                display: flex;
                flex-direction: column;
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
                  background-image: url("../../assets/img/coupons/food.png");
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
            .goods-img {
              width: 72px;
              height: 72px;
              border-radius: 4px;
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
