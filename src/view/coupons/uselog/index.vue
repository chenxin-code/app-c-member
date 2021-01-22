<template>
  <div class="exchange-container">
    <div class="exchange-info">
      <div
        class="exchange-tab-wrap"
        v-infinite-scroll="queryMemberUseCouponList"
        :infinite-scroll-immediate-check="true"
        infinite-scroll-disabled="busy"
        infinite-scroll-throttle-delay="500"
        infinite-scroll-distance="30"
      >
        <van-tabs
          v-model="active"
          :sticky="true"
          type="card"
          @click="tabChange"
        >
          <van-tab
            :title="tab.label"
            v-for="tab in tabList"
            :key="`tab${tab.status}`"
          >
            <!-- <zk-empty
              image="coupon"
              v-if="!loading && !list[tabindex].length"
              description="暂无优惠券使用"
            ></zk-empty> -->
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item">
                    <div
                      class="bangdou-exchange-card"
                      :class="{ 'row-reverse': item === 2 }"
                      v-for="(item, index) in 3"
                      :key="item"
                    >
                      <div class="exchange-card-item exchange-card-right">
                        <template v-if="item !== 2">
                          <div class="exchange-card-right-right">
                            <div class="exchange-card-right-right-btn"></div>
                          </div>

                          <div class="exchange-card-right-left">
                            <div class="card-right-left-top">
                              仅可购买邻里商城生鲜区、冷冻区
                            </div>
                            <div class="card-right-left-middle">
                              2021.01.01-2021.01.0
                            </div>
                            <div
                              class="card-right-left-bottom"
                              @click="collapse(`coouponDesc${index}`)"
                            >
                              使用规则
                              <van-icon
                                name="arrow-down"
                                size="12"
                                class="icon-arrow-down"
                                :ref="`coouponDesc${index}Icon`"
                              ></van-icon>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div class="exchange-card-right-left">
                            <div class="card-right-left-top">
                              物业抵扣券
                            </div>
                          </div>
                          <div class="exchange-card-right-right">
                            <div class="disabled-btn">
                              已领取
                            </div>
                          </div>
                        </template>
                        <div class="card-used-right"></div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">无门槛立减</div>
                      </div>
                      <div
                        v-if="item !== 2"
                        class="coupon-desc-wrap"
                        :ref="`coouponDesc${index}`"
                      >
                        <div
                          class="coupon-desc"
                          :ref="`coouponDesc${index}Cont`"
                        >
                          <div class="coupon-desc-info">
                            使用说明：平台10元通用优惠券，单笔订单满88元可使用。使用说明：平台10元通用优惠券；
                          </div>
                          <div class="coupon-desc-num">
                            券编号：XCT200708001
                          </div>
                        </div>
                      </div>
                      <!-- 已使用图片 -->
                    </div>
                    <div class="bangdou-exchange-rules" v-show="!isActive">
                      <div class="bangdou-exchange-rules-item">
                        使用说明：平台10元通用优惠券，单笔订单满88元可使用。
                      </div>
                      <div class="bangdou-exchange-rules-item">
                        使用说明：平台10元通用优惠券；
                      </div>
                      <div class="bangdou-exchange-rules-item">
                        券编号：XCT200708001
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
  </div>
</template>

<script>
import api from "@/api";
import nav from "@zkty-team/x-engine-module-nav";
import * as moment from "moment";
import _ from "lodash";
import Null from "@/components/null";

export default {
  data() {
    return {
      isActive: true,
      active: 0,
      loading: false,
      showNull: false,
      nullMsg: "",
      memberId: "",
      // ---分隔符---
      //宠物信息
      petsUpdateList: [],
      busy: false,
      tabList: [
        {
          label: "已使用",
          status: "1"
        },
        {
          label: "已过期",
          status: "2"
        }
      ],
      list: [],
      pageIndex: [],
      total: []
    };
  },
  components: {
    Null
  },
  created() {
    this.paramsList();
    // this.petsQueryInit();
  },
  mounted() {
    nav.setNavLeftBtn({
      title: "优惠券使用记录",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
    this.memberId = "2309350880803029654";
    this.queryMemberUseCouponList();
  },
  methods: {
    paramsList() {
      const list = [];
      const pageIndex = [];
      const total = [];
      this.tabList.forEach(item => {
        list.push([]);
        pageIndex.push(1);
        total.push(0);
      });
      this.list = list;
      this.pageIndex = pageIndex;
      this.total = total;
    },
    tabChange(index) {
      if (this.list[index].length === 0) {
        this.pageIndex[index] = 1;
        this.queryMemberUseCouponList();
      } else {
        this.$refs.scrollContent.scrollTop = 0;
      }
    },

    toast() {
      this.$toast.loading({
        duration: 0,
        type: "loading",
        message: "加载中...",
        forbidClick: true
      });
    },
    collapse(ref) {
      const element = this.$refs[ref][0];
      const height = element.offsetHeight;
      if (height === 0) {
        element.style.display = "block";
        this.$nextTick(() => {
          const elemetCont = this.$refs[`${ref}Cont`][0];
          const Contheight = elemetCont.offsetHeight;

          element.style.height = Contheight + "px";
          this.$refs[`${ref}Icon`][0].style.transform = "rotate(-180deg)";
        });
      } else {
        element.style.height = 0;

        const elemetCont = this.$refs[`${ref}Cont`][0];
        const Contheight = elemetCont.offsetHeight;
        this.$refs[`${ref}Icon`][0].style.transform = "rotate(0deg)";
        setTimeout(() => {
          element.style.display = "none";
        }, 300);
      }
    },
    queryMemberUseCouponList() {
      const tabIndex = this.active;
      const params = {
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 10,
        status: 2
      };
      this.loading = true;
      this.busy = true;
      this.toast();
      // api.queryMemberUseCouponList(params).then(res => {});
      api
        .queryMemberUseCouponList(params)
        .then(res => {
          if (res.code === 200) {
            this.$toast.clear();
            const list = res.data || [];
            this.list[tabIndex] =
              params.pageIndex === 1
                ? list
                : _.concat(this.list[tabIndex], list);
            this.total[tabIndex] = (res.data && res.data.total) || 0;
            this.pageIndex[tabIndex]++;
          }
        })
        .finally(() => {
          this.busy = false;
          this.loading = false;
        });
    }
  },
  watch: {
    // petsUpdateList: {
    //   handler(newVal) {},
    //   immediate: true, //刷新加载 立马触发一次handler
    //   deep: true // 可以深度检测到对象的属性值的变化
    // }
  }
};
</script>

<style lang="less" scoped>
.exchange-container {
  /deep/ .van-sticky {
    padding-top: 20px;
    background-color: #fff;
  }
  .exchange-info {
    font-size: 18px;

    ::v-deep .van-tabs__wrap {
      height: 42px;
    }

    ::v-deep .van-tabs__nav--card {
      height: 42px;
      border: none;
      background: #f5f5f7;
      border-radius: 8px;
      overflow: hidden;
    }

    ::v-deep .van-tab {
      height: 42px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #121212;
    }

    ::v-deep .van-tabs__nav--card .van-tab.van-tab--active {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #e8374a;
      background-color: #fcecee;
    }

    ::v-deep .van-tabs__nav--card .van-tab {
      border-right: none;
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
              margin-bottom: 16px;
              border-radius: 16px;

              .bangdou-exchange-card {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: stretch;
                box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
                border-radius: 16px;
                overflow: hidden;

                // margin-bottom: 16px;
                & + .bangdou-exchange-card {
                  margin-top: 16px;
                }
                .exchange-card-left {
                  width: 101px;
                  height: 106px;
                  background-image: url("../../../assets/img/coupons/gray_right.png");
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
                  position: relative;
                  flex: 1;
                  // width: 211px;
                  height: 106px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;
                  padding-left: 12px;

                  .exchange-card-right-left {
                    padding: 14px 7px 0 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                    flex: 1;
                    padding-left: 12px;

                    .card-right-left-top {
                      font-size: 14px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 500;
                      color: #121212;
                      white-space: normal;
                      word-wrap: break-word;
                      word-break: break-all;
                    }
                    .card-right-left-middle {
                      padding-top: 6px;
                      height: 22px;
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #8d8d8d;
                      line-height: 16px;
                    }
                    .card-right-left-bottom {
                      padding-top: 10px;
                      height: 22px;
                      font-size: 10px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #bfbfbf;
                      line-height: 12px;
                    }
                  }
                  .exchange-card-right-right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-end;

                    .exchange-card-right-right-btn {
                      width: 72px;
                      height: 72px;
                      border-radius: 4px;
                      background-image: url("../../../assets/img/coupons/food.png");
                      background-repeat: no-repeat;
                      background-position: center center;
                      background-size: 100% 100%;
                    }
                    .disabled-btn {
                      width: 68px;
                      height: 24px;
                      background: #f5f5f5;
                      border-radius: 15px;
                      color: #d8d8d8;
                      font-size: 12px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 20px;
                    }
                  }
                }
                .icon-arrow-down {
                  vertical-align: bottom;
                  transition: all 0.3s;
                }
                .coupon-desc-wrap {
                  height: 0;
                  display: none;
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
              }
              .row-reverse {
                flex-flow: row-reverse;
                .exchange-card-left {
                  background-image: url("../../../assets/img/coupons/gray_left.png");
                }
              }
              .bangdou-exchange-rules {
                padding: 16px 12px 16px 16px;
                .bangdou-exchange-rules-item {
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #bfbfbf;
                }
                .bangdou-exchange-rules-item:last-child {
                  padding-top: 10px;
                }
              }
            }
          }
        }
      }
    }

    .card-used-right {
      width: 49px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 99;
      background-image: url("../../../assets/img/coupons/has_used.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 49px 52px;
    }
    .card-used-left {
      width: 49px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 99;
      background-image: url("../../../assets/img/coupons/has_used.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 49px 52px;
    }

    .card-expired-right {
      width: 49px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: 101px;
      z-index: 99;
      background-image: url("../../../assets/img/coupons/has_expired.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 49px 52px;
    }
    .card-expired-left {
      width: 49px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 99;
      background-image: url("../../../assets/img/coupons/has_expired.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 49px 52px;
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
}
</style>
