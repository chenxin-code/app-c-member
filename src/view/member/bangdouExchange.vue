<template>
  <div class="exchange-info">
    <div class="exchange-main-wrap">
      <zk-empty
        image="amount"
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
                  <div class="card-left-top-type">￥</div>
                  <div class="card-left-top-num">{{ item.faceAmount }}</div>
                </div>
                <div class="exchange-card-left-bottom">
                  满{{ item.satisfyAmount }}元可用
                </div>
              </div>
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">{{ item.couponTitle }}</div>
                  <div class="card-right-left-bottom">
                    <span class="card-right-left-bottom-left">{{
                      integrealCount
                    }}</span>
                    <span class="card-right-left-bottom-right">邦豆</span>
                  </div>
                </div>
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn" @click="exchange">
                    邦豆兑换
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 002 -->
      <div class="bangdou-exchange">
        <div class="bangdou-exchange-header">
          <div class="exchange-header-title">
            购物券
          </div>
        </div>
        <div class="bangdou-exchange-body">
          <div class="exchange-body-item2">
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
          </div>
        </div>
      </div>

      <!-- 003 -->
      <div class="bangdou-exchange">
        <div class="bangdou-exchange-header">
          <div class="exchange-header-title">
            实物券
          </div>
        </div>
        <div class="bangdou-exchange-body">
          <div class="exchange-body-item3">
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
            <div class="bangdou-exchange-card">
              <div class="exchange-card-item exchange-card-right">
                <div class="exchange-card-right-right">
                  <div class="exchange-card-right-right-btn"></div>
                </div>
                <div class="exchange-card-right-left">
                  <div class="card-right-left-top">
                    仅可购买邻里商城生鲜区、冷冻区
                  </div>
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
import * as moment from "moment";
import Null from "@/components/null";
import _ from "lodash";

export default {
  data() {
    return {
      loading: false,
      showNull: false,
      nullMsg: "",
      memberId: "",
      pageRefresh: true,
      propertyList: [], //物业券
      vouchersList: [], // 购物券
      canLoadMore: true, //解决下拉刷新
      // ---分隔符---
      //宠物信息
      petsUpdateList: []
    };
  },
  components: {
    Null
  },
  beforeRouteLeave(to, form, next) {
    next();
  },

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
  },
  mounted() {
    nav.setNavLeftBtn({
      title: "帮豆兑换",
      titleColor: "#121212",
      titleSize: 24,
      titleFontName: "PingFangSC-Medium"
    });
    this.queryReceiveCouponList();
  },
  methods: {
    toast() {
      this.$toast.loading({
        duration: 0,
        type: "loading",
        message: "加载中...",
        forbidClick: true
      });
    },
    queryReceiveCouponList(businessType) {
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
    exchange() {
      this.$dialog
        .confirm({
          title: "确认兑换",
          message: "本次消耗{$邦豆数}\n当前剩余{$邦豆数}\n兑换后剩余{$邦豆数}\n"
        })
        .then(() => {
          console.log("confirm");
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
                padding: 19px 7px 0 12px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;

                .card-right-left-top {
                  margin-bottom: 16px;
                  height: 16px;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #121212;
                  line-height: 16px;
                }

                .card-right-left-bottom {
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
                flex: 1;
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
              // width: 211px;
              height: 106px;
              background-color: #fff;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: stretch;

              .exchange-card-right-left {
                padding: 19px 7px 0 12px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;

                .card-right-left-top {
                  // width: 101px;
                  height: 60px;
                  font-size: 14px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #121212;
                  line-height: 20px;
                  white-space: normal;
                  word-wrap: break-word;
                  word-break: break-all;
                }
              }
              .exchange-card-right-right {
                display: flex;
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
          }
        }
        .exchange-body-item3 {
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
              height: 106px;
              background-image: url("../../assets/img/coupons/blue_card.png");
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
                padding: 19px 7px 0 12px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;

                .card-right-left-top {
                  // width: 101px;
                  height: 60px;
                  font-size: 14px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #121212;
                  line-height: 20px;
                  white-space: normal;
                  word-wrap: break-word;
                  word-break: break-all;
                }
              }
              .exchange-card-right-right {
                display: flex;
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
