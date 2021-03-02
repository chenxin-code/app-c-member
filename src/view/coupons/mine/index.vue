<template>
  <div class="exchange-container">
    <!-- 临时跳转:生产需注释 -->
    <!-- <div style="position:fixed;top:70px;right:20px;z-index:9999;">
      <button @click="$router.push('/exchangeCoupon')">兑换优惠券</button>
    </div> -->
    <div class="exchange-info" style="padding-bottom: 78px;">
      <div
        class="exchange-tab-wrap"
        ref="scrollContent"
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
                    v-show="!loading && !list[index].length"
                    image="coupon"
                    description="暂无卡券"
                  ></zk-empty>
                  <div class="exchange-body-item">
                    <div
                      v-for="(item, cindex) in list[index]"
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
                          <!-- <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">
                            {{ item.faceAmount }}
                          </div> -->
                        </div>
                        <div class="exchange-card-left-bottom">
                          {{ couponType(item) }}
                        </div>
                        <!-- <div class="exchange-card-left-bottom">满100元可用</div> -->
                        <div
                          v-if="item.effective"
                          class="exchange-card-left-btn"
                          :class="{ ineffective: !item.effective }"
                          @click="useCoupon(item)"
                        >
                          去使用
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">
                            {{ item.couponTitle }}
                          </div>
                          <div class="card-right-left-middle">
                            {{ getTime(item.validityStartTime) }}-{{
                              getTime(item.validityEndTime)
                            }}
                          </div>
                          <div
                            class="card-right-left-bottom"
                            @click="collapse(`tab${index}couponDesc${cindex}`)"
                          >
                            使用规则
                            <van-icon
                              name="arrow-down"
                              size="12"
                              class="icon-arrow-down"
                              :ref="`tab${index}couponDesc${cindex}Icon`"
                            ></van-icon>
                          </div>
                        </div>
                        <div class="exchange-card-right-right">
                          <img
                            class="goodsimg"
                            v-if="item.activity !== '4014'"
                            :src="item.image || defaultImg"
                          />
                          <div
                            v-else-if="item.effective"
                            class="exchange-card-right-right-btn"
                            :class="{ ineffective: !item.effective }"
                            @click="useCoupon(item)"
                          >
                            去使用
                          </div>
                        </div>
                      </div>
                      <div
                        class="coupon-desc-wrap"
                        :ref="`tab${index}couponDesc${cindex}`"
                      >
                        <div
                          class="coupon-desc"
                          :ref="`tab${index}couponDesc${cindex}Cont`"
                        >
                          <div class="coupon-desc-li">
                            {{ item.memo }}
                            <!-- 使用说明：平台10元通用优惠券，单笔订单满88元可使用。 -->
                          </div>
                          <!-- <div class="coupon-desc-li">
                            使用说明：平台10元通用优惠券;
                          </div> -->
                          <div class="coupon-desc-num">
                            券编号：{{ item.couTypeCode }}
                          </div>
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
    <div class="exchange-footer">
      <!-- <div class="exchange-footer-left" @click="goUseLog">使用记录</div>
      <div class="exchange-footer-center"></div>
      <div class="exchange-footer-right" @click="goExchangeCoupon">
        兑换优惠券
      </div> -->
      <div class="exchange-footer-item" @click="goUseLog">使用记录</div>
      <div class="exchange-footer-item" @click="linkPropertyCoupon">
        旧介新物业券
      </div>
      <div class="exchange-footer-item" @click="linkCoupon">其他卡券</div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import nav from "@zkty-team/x-engine-module-nav";
import localstorage from "@zkty-team/x-engine-module-localstorage";
import router from "@zkty-team/x-engine-module-router";
import yjzdbill from "@zkty-team/x-engine-module-yjzdbill";
import * as moment from "moment";
import Null from "@/components/null";
import mixin from "../mixin/pageList";
import _ from "lodash";
const defaultImg = require("@/assets/img/coupons/coupon-default.png");

export default {
  mixins: [mixin],
  data() {
    return {
      activeName: 1,
      userInfo: {},
      defaultImg: defaultImg,
      pbStyle: {
        paddingBottom: "164px"
      },
      showNull: false,
      nullMsg: "",
      // ---分隔符---
      //宠物信息
      petsUpdateList: [],
      // ___________________________________________
      active: 0,
      memberId: "",
      busy: false,
      outUrlRefresh: true, //控制跳外部链接刷新
      tabList: [
        {
          label: "全部",
          businessType: "0"
        },
        {
          label: "物业抵扣券",
          businessType: "200005"
        },
        {
          label: "购物券",
          businessType: "200001"
        }
      ],
      scroll: 0,
      pageRefresh: true
    };
  },
  components: {
    Null
  },
  created() {
    this.paramsList();
  },
  mounted() {
    nav.setNavLeftBtn({
      title: "我的卡券",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
    nav.setNavRightBtn({
      title: "兑换优惠券",
      titleColor: "#000000",
      titleSize: 16,
      iconSize: ["20", "20"],
      __event__: () => {
        this.$routeHelper.router(this, "/exchangeCoupon", null, true);
      }
    });
  },
  activated() {
    if (this.pageRefresh) {
      this.paramsList();

      //生产需注释
      // this.memberId = "2212946938230210585";
      // this.getList();
      // this.getUserInfo();

      //生产需打开
      localstorage.get({ key: "LLBMemberId", isPublic: true }).then(res => {
        this.memberId = res.result;
        localStorage.setItem("memberId", this.memberId);
        this.getList();
        this.getUserInfo();
      });
    } else {
      this.$refs.scrollContent.scrollTo(0, this.scroll);
      !this.outUrlRefresh && (this.outUrlRefresh = true);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "useLog") {
      this.pageRefresh = false;
    } else {
      // 跳转物业券，其他卡券 不刷新
      if (!this.outUrlRefresh) {
        this.pageRefresh = false;
      } else {
        this.pageRefresh = true;
      }
    }
    next();
  },
  methods: {
    loadMore() {
      const tabIndex = this.active;
      if (this.list[tabIndex].length < this.total[tabIndex]) {
        this.getList();
      }
    },
    getTime(time) {
      const date = new Date(+time);
      return moment(date).format("YYYY.MM.DD");
    },
    useCoupon(data) {
      if (!data.effective) {
        return false;
      }
      if (data.activity === "4014") {
        this.openDeital();
        // this.
      } else if (data.activity === "4005") {
        this.openMall(data);
        // console.log("打开商城");
      }
    },
    async openMall(data) {
      let uri;
      if (this.devServer !== "prod") {
        uri = "http://mall-uat-app-linli.timesgroup.cn";
      } else {
        uri = "http://mall-prod-app-linli.timesgroup.cn";
      }
      const datestr = Number(new Date());
      let token;
      await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
        token = res.result;
      });
      const url = `${uri}/app/index?token=${token}&redirect=${uri}/#/mall2/list/${datestr}?pageType=coupon&coupon=${data.couponType}&couThresholdAmount=${data.satisfyAmount}&couFaceValue=${data.faceAmount}&lastPath=%2Fcoupon_list&endTime=${data.validityEndTime}`;
      router.openTargetRouter({
        type: "h5",
        uri: url
      });
    },
    // 打开账单中心
    openDeital() {
      const userId = this.userInfo.phone;
      api.getCustomUser().then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          if (res.data.length > 0) {
            var userRoomNo = "";
            for (var i = 0; i < res.data.length; i++) {
              userRoomNo = userRoomNo
                .concat(res.data[i].custRoomId)
                .concat("|");
            }
            userRoomNo = userRoomNo.slice(0, userRoomNo.length - 1);
            console.log(userRoomNo);
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: userRoomNo,
              roomNo: "",
              billStatus: 10,
              billType: 1,
              appScheme: "x-engine",
              payType: false
            });
          } else {
            yjzdbill.YJBillList({
              businessCstNo: userId,
              userRoomNo: "",
              roomNo: "",
              billStatus: 10,
              billType: 1,
              appScheme: "x-engine",
              payType: false
            });
          }
        }
      });
    },
    getUserInfo() {
      api.getUserInfo().then(res => {
        this.userInfo = res.data || {};
      });
    },
    getList() {
      const tabIndex = this.active;
      const params = {
        memberId: this.memberId,
        pageIndex: this.pageIndex[tabIndex],
        pageSize: 10,
        businessType: this.tabList[tabIndex].businessType,
        state: 20
      };
      this.loading = true;
      this.busy = true;
      this.toast();
      api
        .queryMemberCouponList(params)
        .then(res => {
          if (res.code === 200) {
            this.$toast.clear();
            let list = [];
            res.data && (list = res.data.records || []);
            let nowTime = new Date();
            // 是否在有效期
            list.map(item => {
              const stareTime = new Date(+item.validityStartTime);
              const endTime = new Date(+item.validityEndTime);
              if (nowTime >= stareTime && nowTime <= endTime) {
                item.effective = true;
              } else {
                item.effective = false;
              }
              return item;
            });
            this.list[tabIndex] =
              params.pageIndex === 1
                ? list
                : _.concat(this.list[tabIndex], list);
            list.length < params.pageSize &&
              (this.canLoadMore[tabIndex] = false);
            this.total[tabIndex] = (res.data && res.data.total) || 0;
            list.length && this.pageIndex[tabIndex]++;
          }
        })
        .finally(() => {
          this.busy = false;
          this.loading = false;
        });
    },
    goUseLog: function() {
      this.scroll = this.$refs.scrollContent.scrollTop;
      this.$routeHelper.router(this, "/useLog", null, false);
    },
    linkPropertyCoupon() {
      if (!this.userInfo.phone) {
        return this.$toast("手机号无效");
      }
      let uri;
      if (this.devServer !== "prod") {
        uri = "http://apiv3.linli580.com.cn";
      } else {
        uri = "http://apiv3.linli580.com";
      }
      const url = `${uri}/coupon/?phone=${this.userInfo.phone}`;
      this.outUrlRefresh = false;
      this.scroll = this.$refs.scrollContent.scrollTop;
      router.openTargetRouter({
        type: "h5",
        uri: url
      });
    },
    async linkCoupon() {
      let token;
      await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
        token = res.result;
      });
      // test: https://dev-mall-linli.timesgroup.cn/H5/#/anitransferMy?token=
      // prod: https://mall-linli.timesgroup.cn/H5/#/anitransferMy?token=
      let uri;
      if (this.devServer !== "prod") {
        uri = "https://dev-mall-linli.timesgroup.cn";
      } else {
        uri = "https://mall-linli.timesgroup.cn";
      }
      const url = `${uri}/H5/#/anitransferMy?token=${token}`;
      this.outUrlRefresh = false;
      this.scroll = this.$refs.scrollContent.scrollTop;
      router.openTargetRouter({
        type: "h5",
        uri: url
      });
    },
    goExchangeCoupon: function() {
      this.$routeHelper.router(this, "/exchangeCoupon", null, true);
    }
  }
};
</script>

<style lang="less" scoped>
.exchange-container {
  .exchange-info {
    font-size: 18px;
    // /deep/ .van-tabs__wrap {
    //   box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
    // }
    ::v-deep .van-tabs__wrap {
      box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
    }
    ::v-deep .van-tab--active {
      color: #121212 !important;
      font-size: 16px;
      font-weight: 700;
      font-family: PingFangSC-Medium, PingFang SC;
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
              margin-bottom: 16px;
              border-radius: 16px;

              .bangdou-exchange-card {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: stretch;
                box-shadow: 0px 0.12rem 0.6rem 0px rgba(71, 77, 96, 0.06);
                border-radius: 12px;
                overflow: hidden;
                & + .bangdou-exchange-card {
                  margin-top: 16px;
                }

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
                  .exchange-card-left-btn {
                    display: none;
                    width: 68px;
                    height: 22px;
                    background: #ffffff;
                    border-radius: 15px;
                    // display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    margin: 8px auto 0;

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
                  align-items: stretch;
                  padding: 0 12px;

                  .exchange-card-right-left {
                    flex: 1;
                    // padding: 19px 7px 0 0px;
                    padding-top: 14px;
                    display: flex;
                    flex-direction: column;
                    flex-flow: row wrap;

                    .card-right-left-top {
                      font-size: 14px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 700;
                      color: #121212;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      line-clamp: 2;
                      -webkit-box-orient: vertical;
                      width: 100%;
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
                      padding-top: 10px;
                      padding-bottom: 10px;
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
                      margin-left: 7px;
                      &.ineffective {
                        background: #f8f8f8;
                      }
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
              .goodsimg {
                width: 72px;
                height: 72px;
                border-radius: 4px;
                overflow: hidden;
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
              .ineffective {
                color: #d4d4d4 !important;
              }
              .bangdou-exchange-card.shopping .exchange-card-left {
                background-image: url("../../../assets/img/coupons/yellow_card.png");
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
  .exchange-footer {
    width: 100%;
    height: 78px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fafafa;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .exchange-footer-item {
      flex: 1;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #121212;
      line-height: 14px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      & + .exchange-footer-item::before {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        height: 14px;
        background: #d8d8d8;
      }
    }
    .exchange-footer-center {
      width: 1px;
      height: 14px;
      background: #d8d8d8;
    }
    .exchange-footer-right {
      flex: 1;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #121212;
      line-height: 14px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
