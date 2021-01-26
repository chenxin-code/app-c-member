<template>
  <div class="member-coupon exchange-info">
    <div
      class="exchange-tab-wrap"
      v-infinite-scroll="loadMore"
      :infinite-scroll-immediate-check="true"
      infinite-scroll-disabled="busy"
      infinite-scroll-throttle-delay="500"
      infinite-scroll-distance="30"
    >
      <van-tabs v-model="active" :sticky="true" @click="tabChange">
        <van-tab
          v-for="(tab, index) in tabList"
          :key="tab.businessType"
          :title="tab.label"
        >
          <div class="bangdou-exchange-wrap">
            <div class="bangdou-exchange">
              <div class="bangdou-exchange-body">
                <zk-empty
                  v-show="!list[index].length && !loading"
                  image="coupon"
                  description="暂无卡券"
                ></zk-empty>
                <div class="exchange-body-item">
                  <div
                    v-for="item in list[index]"
                    :key="item.id"
                    class="bangdou-exchange-card"
                    :class="[
                      {
                        'row-reverse': item.activity !== '4014',
                        shopping: item.activity !== '4014'
                      }
                    ]"
                  >
                    <!-- <template v-if="item.activity === '4014'"> -->
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
                      <div
                        v-if="item.activity !== '4014'"
                        class="exchange-card-left-btn"
                      >
                        邦豆兑换
                      </div>
                    </div>
                    <div class="exchange-card-item exchange-card-right">
                      <div class="exchange-card-right-left">
                        <div class="card-right-left-top">
                          {{ item.couponTitle }}
                        </div>
                      </div>
                      <div class="exchange-card-right-right">
                        <div
                          class="exchange-card-right-right-btn"
                          @click="getCoupon(item.id)"
                          v-if="item.activity === '4014'"
                        >
                          立即领取
                        </div>
                        <img
                          v-else
                          class="goods-img"
                          src="../../../assets/img/coupons/food.png"
                        />
                      </div>
                    </div>
                    <!-- </template> -->
                    <!-- <template v-else>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">
                            {{ item.couponTitle }}
                          </div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">
                            {{ item.faceAmount }}
                          </div>
                        </div>
                        <div class="exchange-card-left-bottom">
                          满{{ item.satisfyAmount }}元可用
                        </div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </template> -->
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
import api from "@/api";
import nav from "@zkty-team/x-engine-module-nav";
import localstorage from "@zkty-team/x-engine-module-localstorage";
import * as moment from "moment";
import Null from "@/components/null";
import mixin from "../mixin/pageList";
import _ from "lodash";

export default {
  mixins: [mixin],
  data() {
    return {
      active: 0,
      loading: false,
      showNull: false,
      nullMsg: "",
      // ---分隔符---
      petsUpdateList: [],
      //
      memberId: "",
      busy: false,
      tabList: [
        {
          label: "全部",
          businessType: "0"
        },
        {
          label: "物业抵扣券",
          businessType: "4014"
        },
        {
          label: "购物券",
          businessType: "4005"
        }
      ]
    };
  },
  components: {
    Null
  },
  watch: {},
  created() {
    this.paramsList();

    // if (this.$route.meta.isBack != true) {
    localstorage.get({ key: "LLBMemberId", isPublic: true }).then(res => {
      this.memberId = res.result;
      localStorage.setItem("memberId", this.memberId);
      this.getList();
    });
    this.memberId = "2309350880803029654";
    this.getList();
  },
  mounted() {
    nav.setNavLeftBtn({
      title: "领券中心",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
  },
  methods: {
    getCoupon(id) {
      this.toast();
      api
        .getReceiveCoupon({
          couponId: id
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast("领取成功");
          }
        });
    },
    couponType(item) {
      if (item.couponType === 10) {
        return `无门槛立减`;
      } else if (item.couponType === 20) {
        return `满￥{item.satisfyAmount}元可用`;
      } else if (item.couponType === 40) {
        return `满￥{item.satisfyAmount}元可用`;
      }
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
        pageSize: 10,
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
            this.list[tabIndex] =
              params.pageIndex === 1
                ? list
                : _.concat(this.list[tabIndex], list);
            list.length < params.pageSize &&
              (this.canLoadMore[tabIndex] = false);
            this.total[tabIndex] = (res.data && res.data.total) || 0;
            this.pageIndex[tabIndex]++;
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

  /deep/ .van-tabs__wrap {
    box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
  }
  ::v-deep .van-tab--active {
    color: #121212 !important;
  }
  ::v-deep .van-tabs__line {
    background-color: #121212 !important;
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

              .exchange-card-left {
                width: 101px;
                height: 106px;
                background-image: url("../../../assets/img/coupons/red_card.png");
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
                    font-size: 28px;
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
                padding: 12px;
                // padding-left: 12px;

                .exchange-card-right-left {
                  flex: 1;
                  display: flex;
                  padding-top: 12px;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: stretch;

                  .card-right-left-top {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #121212;
                    line-height: 20px;
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
                    background: linear-gradient(
                      180deg,
                      #ff8381 0%,
                      #e8374a 100%
                    );
                    border-radius: 15px;
                    font-size: 12px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #ffffff;
                  }
                  .goods-img {
                    width: 72px;
                    height: 72px;
                    border-radius: 4px;
                  }
                }
              }
            }
            .bangdou-exchange-card.row-reverse {
              flex-flow: row-reverse;
              .exchange-card-right {
                flex-flow: row-reverse;
              }
            }
            .bangdou-exchange-card.shopping {
              .exchange-card-right-left {
                padding-left: 12px;
                padding-top: 0;
              }
              .exchange-card-left {
                background-image: url("../../../assets/img/coupons/yellow_card.png");
              }
              .exchange-card-right-right .exchange-card-right-right-btn {
                width: 72px;
                height: 72px;
                border-radius: 4px;
                background-image: url("../../../assets/img/coupons/food.png");
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
