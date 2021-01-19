<template>
  <div class="exchange-container">
    <div class="exchange-info">
      <div class="exchange-tab-wrap">
        <van-tabs v-model="activeName" type="card">
          <van-tab title="已使用" :name="1">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item4">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
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
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">无门槛立减</div>
                      </div>
                      <!-- 已使用图片 -->
                      <div class="card-used-right"></div>
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
                  <div class="exchange-body-item5">
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
                          <div class="card-right-left-top">
                            物业抵扣券
                          </div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            已领取
                          </div>
                        </div>
                      </div>
                      <!-- 已使用图片 -->
                      <div class="card-used-left"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="已过期" :name="2">
            <div class="bangdou-exchange-wrap">
              <div class="bangdou-exchange">
                <div class="bangdou-exchange-body">
                  <div class="exchange-body-item4">
                    <div class="bangdou-exchange-card">
                      <div class="exchange-card-item exchange-card-right">
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
                          <div class="card-right-left-bottom">使用规则</div>
                        </div>
                      </div>
                      <div class="exchange-card-item exchange-card-left">
                        <div class="exchange-card-left-top">
                          <div class="card-left-top-type">￥</div>
                          <div class="card-left-top-num">5</div>
                        </div>
                        <div class="exchange-card-left-bottom">无门槛立减</div>
                      </div>
                      <!-- 已过期图片 -->
                      <div class="card-expired-right"></div>
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
                  <div class="exchange-body-item5">
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
                          <div class="card-right-left-top">
                            物业抵扣券
                          </div>
                        </div>
                        <div class="exchange-card-right-right">
                          <div class="exchange-card-right-right-btn">
                            已领取
                          </div>
                        </div>
                      </div>
                      <!-- 已过期图片 -->
                      <div class="card-expired-left"></div>
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
import Null from "@/components/null";

export default {
  data() {
    return {
      isActive: true,
      activeName: 1,
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
  methods: {},
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
    nav.setNavLeftBtn({
      title: "优惠券使用记录",
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
    padding-top: 20px;
    font-size: 18px;

    ::v-deep .van-tabs__wrap {
      height: 42px;
    }

    ::v-deep .van-tabs__nav--card {
      height: 42px;
      border: none;
      background: #f5f5f7;
      border-radius: 8px;
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
            .exchange-body-item4 {
              margin-bottom: 16px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 16px;

              .bangdou-exchange-card {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: stretch;
                // margin-bottom: 16px;

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
                  flex: 1;
                  // width: 211px;
                  height: 106px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;

                  .exchange-card-right-left {
                    padding: 14px 7px 0 0;
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
            .exchange-body-item5 {
              margin-bottom: 16px;
              box-shadow: 0px 6px 30px 0px rgba(71, 77, 96, 0.06);
              border-radius: 16px;

              .bangdou-exchange-card {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: stretch;
                // margin-bottom: 16px;

                .exchange-card-left {
                  width: 101px;
                  height: 97px;
                  background-image: url("../../../assets/img/coupons/gray_left.png");
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
                  align-items: stretch;

                  .exchange-card-right-left {
                    flex: 1;
                    padding: 30px 7px 0 12px;
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
                      background: #f5f5f5;
                      border-radius: 15px;
                      font-size: 12px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 500;
                      color: #d8d8d8;
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
          }
        }
      }
    }

    .card-used-right {
      width: 49px;
      height: 52px;
      position: absolute;
      bottom: 0;
      right: 101px;
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
