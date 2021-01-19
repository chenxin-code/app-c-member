<template>
  <div class="exchange-container">
    <div class="exchange-info" :style="pbStyle">
      <div class="exchange-tab-wrap">
        <van-tabs v-model="activeName">
          <van-tab title="全部" :name="1">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item1">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                      </div>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            邦豆兑换
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item2">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item3">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
          <van-tab title="物业抵扣券" :name="2">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item1">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                      </div>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            邦豆兑换
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item1">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                      </div>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            邦豆兑换
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item1">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                      </div>
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            邦豆兑换
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
          <van-tab title="购物券" :name="3">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item2">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item2">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item2">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
          <van-tab title="实物券" :name="4">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item3">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item3">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
                  <div class="exchange-body-item3">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn"></div>
                        </div>
                        <div class="exchange-card-right-left">
                          <div class="card-right-left-top">物业抵扣券</div>
                          <div class="card-right-left-middle">
                            2021.01.01-2021.01.0
                          </div>
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">满100元可用</div>
                        <div class="exchange-card-left-btn">邦豆兑换</div>
                      </div>
                    </div>
                    <div class="bangdou-exchange-rules">
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
    <div v-show="isActive" class="exchange-footer">
      <div class="exchange-footer-left" @click="goUseLog">使用记录</div>
      <div class="exchange-footer-center"></div>
      <div class="exchange-footer-right" @click="goExchangeCoupon">兑换优惠券</div>
    </div>
  </div>

</template>

<script>
import api from "@/api";
import nav from "@zkty-team/x-engine-module-nav";
import * as moment from "moment";
import Null from "@/components/null";

export default {
  data() {
    return {
      isActive: true,
      activeName: 1,
      pbStyle: {
        paddingBottom: "164px"
      },
      loading: false,
      showNull: false,
      nullMsg: "",
      // ---分隔符---
      //宠物信息
      petsUpdateList: []
    };
  },
  components: {
    Null
  },
  methods: {
    goUseLog: function() {
      this.$routeHelper.router(this, "/useLog", null, false);
    },
    goExchangeCoupon: function() {
      this.$routeHelper.router(this, "/exchangeCoupon", null, true);
    }
  },
  watch: {
    // petsUpdateList: {
    //   handler(newVal) {},
    //   immediate: true, //刷新加载 立马触发一次handler
    //   deep: true // 可以深度检测到对象的属性值的变化
    // }
  },
  created() {
    // this.petsQueryInit();
  },
  mounted() {
    nav.setNavRightBtn({
      title: "其他卡券",
      titleColor: "#000000",
      titleSize: 16,
      iconSize: ["20", "20"],
      __event__: () => {
        this.$router.go(-1);
      }
    });

    nav.setNavLeftBtn({
      title: "我的卡券",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
  }
};
</script>

<style lang="less" scoped>
.exchange-container {
  .exchange-info {
    font-size: 18px;

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
            .exchange-body-item1 {
              margin-bottom: 16px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 16px;

              .bangdou-exchange-card {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: stretch;
                // margin-bottom: 16px;

                .exchange-card-left {
                  width: 101px;
                  height: 97px;
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
                    .card-left-top-type {
                      font-size: 16px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 500;
                      color: #ffffff;
                    }
                    .card-left-top-num {
                      font-size: 32px;
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
                    font-size: 14px;
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
                  align-items: stretch;

                  .exchange-card-right-left {
                    flex: 1;
                    padding: 19px 7px 0 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;

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
                      padding-top: 10px;
                      height: 26px;
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #8d8d8d;
                      line-height: 16px;
                    }
                    .card-right-left-bottom {
                      padding-top: 10px;
                      height: 12px;
                      font-size: 10px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #bfbfbf;
                      line-height: 12px;
                    }
                  }
                  .exchange-card-right-right {
                    width: 88px;
                    padding-right: 19px;
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
                  }
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
            .exchange-body-item2 {
              margin-bottom: 16px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 16px;

              .bangdou-exchange-card {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: stretch;
                // margin-bottom: 16px;

                .exchange-card-left {
                  width: 101px;
                  height: 106px;
                  background-image: url("../../../assets/img/coupons/yellow_card.png");
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
                  // width: 211px;
                  height: 106px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;

                  .exchange-card-right-left {
                    padding: 19px 7px 0 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;

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
                      padding-top: 10px;
                      height: 26px;
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #8d8d8d;
                      line-height: 16px;
                    }
                    .card-right-left-bottom {
                      padding-top: 15px;
                      height: 12px;
                      font-size: 10px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #bfbfbf;
                      line-height: 12px;
                    }
                  }
                  .exchange-card-right-right {
                    width: 101px;
                    padding-right: 12px;
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
                  }
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
            .exchange-body-item3 {
              margin-bottom: 16px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 16px;

              .bangdou-exchange-card {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: stretch;
                // margin-bottom: 16px;

                .exchange-card-left {
                  width: 101px;
                  height: 106px;
                  background-image: url("../../../assets/img/coupons/blue_card.png");
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
                    color: #1b7bff;
                  }
                }

                .exchange-card-right {
                  flex: 1;
                  // width: 211px;
                  height: 106px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;

                  .exchange-card-right-left {
                    padding: 19px 7px 0 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;

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
                      padding-top: 10px;
                      height: 26px;
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #8d8d8d;
                      line-height: 16px;
                    }
                    .card-right-left-bottom {
                      padding-top: 15px;
                      height: 12px;
                      font-size: 10px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #bfbfbf;
                      line-height: 12px;
                    }
                  }
                  .exchange-card-right-right {
                    width: 101px;
                    padding-right: 12px;
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
                  }
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
              }
              .bangdou-exchange-rules-item:last-child {
                padding-top: 10px;
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

    .exchange-footer-left {
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
