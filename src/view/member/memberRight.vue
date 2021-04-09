<template>
  <div class="containter">
    <p class="title">会员礼券</p>
    <div class="empty" v-if="!loading && cardList.length === 0">
      <img class="empty-img" :src="require('@/assets/img/empty/empty-coupon.png')" alt="" />
      <p class="empty-description">敬请期待</p>
    </div>
    <div v-else>
      <div class="bangdou-exchange-card" :class="getPageClass(levelId)" v-for="(v, k) in cardList" :key="k">
        <div class="exchange-card-item exchange-card-left">
          <div class="exchange-card-left-top">
            <template v-if="v.couponType === 40">
              <div class="card-left-top-num">
                {{ +v.discountRatio * 10 }}
              </div>
              <span class="coupon-type">折</span>
            </template>
            <template v-else>
              <div class="card-left-top-type">￥</div>
              <div class="card-left-top-num">
                {{ v.faceAmount | delPoint }}
              </div>
            </template>
          </div>
          <template>
            <div class="exchange-card-left-btn">
              {{ couponType(v) }}
            </div>
          </template>
        </div>
        <div class="exchange-card-item exchange-card-right">
          <div class="exchange-card-right-left">
            <div class="card-right-left-top">{{v.couponTitle}}</div>
            <!--<div class="card-right-left-middle">
              {{ getTime(v.validityStartTime) }}-{{ getTime(v.validityEndTime) }}
            </div>-->
            <div class="card-right-left-middle" v-if="v.validityType === 1">
              <!--领取后{{v.takeEffectDayNums}}天内有效-->
              {{ getTime(v.validityStartTime) }}-{{ getTime(v.validityEndTime) }}
            </div>
            <div class="card-right-left-bottom-2" v-if="v.monthGetDay">
              <span>每月{{ v.monthGetDay }}日领取</span>
            </div>
            <div class="card-right-left-bottom-2" v-else-if="v.weekGetDay">
              <span>每周{{ parseWeek(v.weekGetDay) }}领取</span>
            </div>
            <div class="card-right-left-bottom" @click="collapse(`tabcouponDesc${k}`)">
              使用规则
              <van-icon name="arrow-down" size="12" class="icon-arrow-down" :ref="`tabcouponDesc${k}Icon`"></van-icon>
            </div>
          </div>
          <div class="exchange-card-right-right" :class="getPageClass(levelId)">
            <template>
              <div class="bd-box" v-if="v.condition !== 1">
                <span class="bd-box-left">{{ v.integrealCount }}</span>
                <span class="bd-box-right">邦豆</span>
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                @click="!showNewToast && getCoupon(v)"
                v-if="v.isPeriodic === 0 && v.condition === 1 && !v.goUse">
                立即领取
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                :class="{ ineffective: !v.effective }"
                @click="useCoupon(v)"
                v-else-if="v.isPeriodic === 0 && v.condition === 1 && v.goUse">
                去使用
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                @click="!showNewToast && exchangeBD(v)"
                v-else-if="v.isPeriodic === 0 && v.condition === 3 && !v.goUse">
                邦豆兑换
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                :class="{ ineffective: !v.effective }"
                @click="useCoupon(v)"
                v-else-if="v.isPeriodic === 0 && v.condition === 3 && v.goUse">
                去使用
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                @click="!showNewToast && getCoupon(v)"
                v-else-if="v.isPeriodic === 1 && checkTimeOK(v.monthGetDay, v.weekGetDay) && !v.goUse">
                立即领取
              </div>
              <div
                class="exchange-card-right-bottom-btn"
                :class="{ ineffective: !v.effective }"
                @click="useCoupon(v)"
                v-else-if="v.isPeriodic === 1 && checkTimeOK(v.monthGetDay, v.weekGetDay) && v.goUse">
                去使用
              </div>
              <div
                class="exchange-card-right-bottom-btn kongxin"
                v-else-if="v.isPeriodic === 1 && !checkTimeOK(v.monthGetDay, v.weekGetDay)">
                未生效
              </div>
            </template>
          </div>
        </div>
        <div class="coupon-desc-wrap" :ref="`tabcouponDesc${k}`">
          <div class="coupon-desc" :ref="`tabcouponDesc${k}Cont`">
            <div class="coupon-desc-li" style="white-space: pre-line;">
              {{ v.memo }}
              <!-- 使用说明：平台10元通用优惠券，单笔订单满88元可使用。 -->
            </div>
            <!-- <div class="coupon-desc-li">
              使用说明：平台10元通用优惠券;
            </div> -->
            <div class="coupon-desc-num">券编号：{{ v.couTypeCode }}</div>
          </div>
        </div>
      </div>
    </div>
    <newToast :toastStr="toastStr" :couponItem="couponItem" v-if="showNewToast"></newToast>
    <p class="title">各等级特权</p>
    <table>
      <tr>
        <td>
          <img src="./../../assets/img/member/icon-leve-l1.png" alt="" />
          普通会员
        </td>
        <td>
          每月领<span style="color: #E8374A">60元</span>会员礼券
        </td>
      </tr>
      <tr>
        <td>
          <img src="./../../assets/img/member/icon-leve-l2.png" alt="" />
          铜牌会员
        </td>
        <td>
          每月领<span style="color: #E8374A">330元</span>会员礼券
        </td>
      </tr>
      <tr>
        <td>
          <img src="./../../assets/img/member/icon-leve-l3.png" alt="" />
          银牌会员
        </td>
        <td>无</td>
      </tr>
      <tr>
        <td>
          <img src="./../../assets/img/member/icon-leve-l4.png" alt="" />
          金牌会员
        </td>
        <td>无</td>
      </tr>
      <tr>
        <td>
          <img src="./../../assets/img/member/icon-leve-l5.png" alt="" />
          钻石会员
        </td>
        <td>无</td>
      </tr>
    </table>
    <p class="title">特权说明</p>
    <div class="descr">
      1、普通会员、铜牌会员专项此特权，每月可领取一次（限每个月1号、10号、20号至当月末可分批领取）；领取的券包以活动页面信息为准，券包会不定期调整，领取后请在有效期内使用，过期未使用将不再补发改券包；
      <div style="height: 15px;"></div>
      2、如存在违规行为（包括但不限于恶意刷单、套取资金、机器作弊、虚假交易等违反诚实信用原则行为），主办方有权拒绝向您发送奖励、撤销相关违规交易、追回已发送的奖励，必要时追究法律责任。
      <div style="height: 15px;"></div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import * as moment from 'moment';
import nav from '@zkty-team/x-engine-module-nav';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import yjzdbill from '@zkty-team/x-engine-module-yjzdbill';
import router from '@zkty-team/x-engine-module-router';
import mixin from './../coupons/mixin/pageList';
import couponMixin from './../coupons/mixin/getCoupon-mixin';
import newToast from './../../components/newToast';
export default {
  name: 'memberRight',
  mixins: [mixin, couponMixin],
  components: {newToast},
  data() {
    return {
      userInfo: {},
      memberId: null,
      levelId: null,
      cardList: [],
      loading: false,
      //newToast
      toastStr: '', couponItem: {}, showNewToast: false
    };
  },
  methods: {
    getTime(time) {
      const date = new Date(+time);
      return moment(date).format('YYYY.MM.DD');
    },
    // 打开账单中心
    openDeital() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      });
      api.getCustomUser().then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          if (res.data.length > 0) {
            var userRoomNo = '';
            for (var i = 0; i < res.data.length; i++) {
              userRoomNo = userRoomNo.concat(res.data[i].custRoomId).concat('|');
            }
            userRoomNo = userRoomNo.slice(0, userRoomNo.length - 1);
            console.log(userRoomNo);
            yjzdbill.YJBillList({
              businessCstNo: this.userInfo.phone,
              userRoomNo: userRoomNo,
              roomNo: '',
              billStatus: 10,
              billType: 1,
              appScheme: 'x-engine',
              payType: false
            });
          } else {
            yjzdbill.YJBillList({
              businessCstNo: this.userInfo.phone,
              userRoomNo: '',
              roomNo: '',
              billStatus: 10,
              billType: 1,
              appScheme: 'x-engine',
              payType: false
            });
          }
        }
      });
    },
    getUserInfo() {
      api.getUserInfo().then(res => {
        console.log('getUserInfo------------->',res);
        this.userInfo = res.data || {};
      });
    },
    //TODO:这里跳页报ngnix错误
    async openMall(data) {
      let uri;
      if (this.devServer !== 'prod') {
        uri = 'http://mall-uat-app-linli.timesgroup.cn';
      } else {
        uri = 'http://mall-prod-app-linli.timesgroup.cn';
      }

      const datestr = Number(new Date());
      let token;
      await localstorage.get({ key: 'LLBToken', isPublic: true }).then(res => {
        token = res.result;
      });

      const tempParam = encodeURIComponent(
        `${uri}/app-vue/app/index.htm#/mall2/list/${datestr}?pageType=coupon&coupon=${data.couponType}&couThresholdAmount=${data.satisfyAmount}&couFaceValue=${data.faceAmount}&lastPath=%2Fcoupon_list&endTime=${data.validityEndTime}&backApp=true`
      );
      const url = `${uri}/app/index?token=${token}&redirect=${tempParam}`;
      console.log('openMall url :>> ', url);

      router.openTargetRouter({
        type: 'h5',
        uri: url
      });
    },
    //去使用
    useCoupon(data) {
      console.log('去使用--------->', data);
      if (!data.effective) {
        this.$toast('该卡券未在使用期限内～');
        return false;
      }
      // 4005/购物券 -- 4014/物业券
      if (data.activity === '4014') {
        this.openDeital();
        // this.
      } else if (data.activity === '4005') {
        this.openMall(data);
        // console.log("打开商城");
      }
    },
    //立即领取
    getCoupon(data) {
      this.toast();
      api.getReceiveCoupon({
        couActivitiesId: data.id,
        memberId: this.memberId
      }).then(res => {
        if (res.code === 200) {
          // 该券
          const couponDay = res.data.canCouponDayTotal <= res.data.couponDayTotal;
          const couponPersonDay = res.data.canCouponPersonDayTotal <= res.data.couponPersonDayTotal;
          const couponPerson = res.data.canCouponPersonTotal <= res.data.couponPersonTotal;
          const couponTotal = res.data.canCouponTotal <= res.data.couponTotal;
          // 变更按钮为 '去使用'
          // 删除不显示
          if (res.data.result) {
            if(this.$qiangTX){
              this.$toast.clear();
              this.toastStr = '领取成功';
              this.couponItem = data;
              this.showNewToast = true;
              setTimeout(() => {
                this.showNewToast = false;
              }, 3000);
            }else{
              this.$toast('领取成功');
            }
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
      }).finally(() => {});
    },
    //邦豆兑换
    exchangeBD(data) {
      this.toast();
      api.memberDetailByMemberID({ memberId: this.memberId }).then(res => {
        if (res.code === 200) {
          if (+data.integrealCount > +res.data.integral) {
            return this.$toast('剩余邦豆不足');
          }
          const rest = +res.data.integral - +data.integrealCount;
          this.$toast.clear();
          this.$dialog.confirm({
            title: '确认兑换',
            message: `<div><span style="padding-right:4px;color:#121212;">本次消耗</span><span style="color:#121212;">${data.integrealCount}</span></div><div><span style="padding-right:4px;color:#121212;">当前剩余</span><span style="color:#121212;">${res.data.integral}</span></div><div><span style="padding-right:4px;color:#121212;">兑换后剩余</span><span style="color:#121212;">${rest}</span></div>`
          }).then(() => {
            this.toast();
            api.getReceiveCoupon({
              couActivitiesId: data.id,
              memberId: this.memberId,
              integral: data.integrealCount
            }).then(res => {
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
      }).finally(() => {});
    },
    checkTimeOK(monthGetDay, weekGetDay) {
      if (monthGetDay && !weekGetDay) {
        return new Date().getDate() == monthGetDay; //获取当前日(1-31)
      } else if (!monthGetDay && weekGetDay) {
        let getDay = new Date().getDay(); //获取当前星期X(0-6,0代表星期天)
        if ([1, 2, 3, 4, 5, 6].includes(weekGetDay)) {
          //周一二三四五六
          return getDay == weekGetDay;
        } else if (weekGetDay == 7) {
          //周日
          return getDay == 0;
        } else {
          return false;
        }
      }else if(!monthGetDay && !weekGetDay){
        return true
      }else{
        return false
      }
    },
    getMemberDetail() {
      api.memberDetailByMemberID({ memberId: this.memberId }).then(res => {
        if (res.code === 200) {
          this.levelId = res.data.memberCardRelats[0].levelId;
          // this.levelId = 1;
          //this.levelId = 2;
          // this.levelId = 3;
          // this.levelId = 4;
          // this.levelId = 5;
        }
      });
    },
    getPageClass(currentLeve) {
      let classTypeName = '';
      switch (currentLeve) {
        case 1:
          classTypeName = 'lv1';
          break;
        case 2:
          classTypeName = 'lv2';
          break;
        case 3:
          classTypeName = 'lv3';
          break;
        case 4:
          classTypeName = 'lv4';
          break;
        case 5:
          classTypeName = 'lv5';
          break;
      }
      return classTypeName;
    },
    queryReceiveCouponList() {
      this.loading = true;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      });
      api.queryReceiveCouponList({
        memberId: this.memberId,
        pageIndex: 1,
        pageSize: 9999,
        activityType: 2, //会员权益
        businessType: 0,
        condition: 0
      }).then(res => {
        //模拟数据
        // let res = {
        //   "code":200,
        //   "data":[
        //     {
        //       "activity":"4014",
        //       "activityMemo":"",
        //       "cost":"",
        //       "couTypeCode":"20WY000236",
        //       "couponStatus":0,
        //       "couponSubhead":"相对满减1元001",
        //       "couponTitle":"相对满减1元001",
        //       "couponType":20,
        //       "discountMaxDeduction":"",
        //       "discountRatio":"0.9",
        //       "faceAmount":"0.9",
        //       "id":2372760729989154407,
        //       "image":"",
        //       "integrealCount":0,
        //       "memo":"",
        //       "operator":"",
        //       "receiveCondition":"",
        //       "receiveConditionRule":"",
        //       "releaseCount":44,
        //       "releaseForm":"",
        //       "releaseRule":"",
        //       "releaseType":"",
        //       "satisfyAmount":"1.0",
        //       "takeEffectDayNums":1,
        //       "validityDayNums":1,
        //       "isPeriodic":0,
        //       "condition": 1,
        //       "monthGetDay": 10,
        //       "weekGetDay": 1
        //     },
        //   ],
        //   "message":"success"
        // };
        if (res.code === 200) {
          this.$toast.clear();
        }
        const data = res.data || [];
        const cardList = [];
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
            cardList.push(item);
            return item;
          } else if (item.validityType === 3) {
            if (item.takeEffectDayNums === 0) {
              item.effective = true;
            } else if (item.takeEffectDayNums > 0) {
              item.effective = false;
            }
            cardList.push(item);
            return item;
          }
        });
        this.cardList = cardList;
      })
        .finally(() => {
          this.loading = false;
        });
    },
    parseWeek(weekGetDay) {
      if (weekGetDay == 1) {
        return '一';
      } else if (weekGetDay == 2) {
        return '二';
      } else if (weekGetDay == 3) {
        return '三';
      } else if (weekGetDay == 4) {
        return '四';
      } else if (weekGetDay == 5) {
        return '五';
      } else if (weekGetDay == 6) {
        return '六';
      } else if (weekGetDay == 7) {
        return '日';
      }
    }
  },
  created() {
    if (this.$store.getters.isDebugMode) {
      //生产需注释
      this.memberId = '2276541642808754230';
      this.queryReceiveCouponList();
      this.getMemberDetail();
      this.getUserInfo();
    } else {
      //生产需打开
      localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
        this.memberId = res.result;
        localStorage.setItem('memberId', this.memberId);
        this.queryReceiveCouponList();
        this.getMemberDetail();
        this.getUserInfo();
      });
    }
  },
  mounted() {
    nav.setNavLeftBtn({
      title: '会员特权',
      titleColor: '#121212',
      titleSize: 24,
      titleFontName: 'PingFangSC-Medium'
    });
  }
};
</script>

<style lang="less" scoped>
.containter {
  //margin-top: 0;
  padding: 6px 12px;
  .empty {
    text-align: center;
    .empty-img {
      width: 100%;
    }
    .empty-description {
      font-size: 14px;
      color: #8d8d8d;
    }
  }
  .bangdou-exchange-card {
    //height: 97px;
    // flex-basis: 324px;
    //width: 343px;
    white-space: nowrap;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    box-shadow: 0 0.12rem 0.6rem 0 rgba(71, 77, 96, 0.06);
    border-radius: 12px;
    overflow: hidden;
    flex-wrap: wrap;
    .exchange-card-left {
      width: 101px;
      height: 110px;
      // background-color: red;
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
          font-weight: 600;
          color: #ffffff;
        }
        .card-left-top-num {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .exchange-card-left-btn {
        width: 68px;
        height: 12px;
        //background: #ffffff;
        //border-radius: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #fff;
        margin-top: 8px;
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
      height: 110px;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      padding: 5px;
      .exchange-card-right-left {
        flex: 1;
        padding: 5px 7px 0 5px;
        display: flex;
        flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        justify-content: flex-start;
        align-items: stretch;
        flex-flow: row wrap;
        .card-right-left-top {
          //flex: 50%;
          //margin-bottom: 3px;
          font-size: 14px;
          //line-height: 20px;
          //height: 60px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 700;
          color: #121212;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          align-self: flex-start;
        }
        .card-right-left-middle {
          //padding-top: 4px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #8d8d8d;
          align-self: flex-start;
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
        .card-right-left-middle {
          color: #999999;
          font-size: 12px;
          font-weight: 500;
          line-height: 12px;
          //margin-top: 5px;
        }
        .card-right-left-bottom-2 {
          font-size: 11px;
          line-height: 1;
          //height: 13px;
          margin-top: 5px;
          padding: 3px 2px;
          display: inline;
          border-radius: 3px;
          align-self: center;
          width: 100%;
          > span {
            padding: 3px 4px;
            border-radius: 3px;
          }
        }
      }
      .exchange-card-right-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bd-box {
          //align-self: flex-start;
          .bd-box-left {
            padding-right: 4px;
            height: 20px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 20px;
          }
          .bd-box-right {
            height: 14px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 14px;
          }
        }
        .exchange-card-right-bottom-btn {
          margin-top: 8px;
          width: 68px;
          height: 24px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          &.ineffective {
            background: #f8f8f8 !important;
            color: #d4d4d4 !important;
          }
        }
      }
      .exchange-card-right-right.lv1 .exchange-card-right-bottom-btn {
        background: linear-gradient(to right, #c8ccdf 0%, #989ebd 100%);
        &.kongxin {
          background: #fff;
          color: #989ebd;
          border: 1px solid #989ebd;
        }
      }
      .exchange-card-right-right.lv2 .exchange-card-right-bottom-btn {
        background: linear-gradient(to right, #e2b490 0%, #ffd5b5 50%, #a56d4c 100%);
        &.kongxin {
          background: #fff;
          color: #b5561a;
          border: 1px solid #b5561a;
        }
      }
      .exchange-card-right-right.lv3 .exchange-card-right-bottom-btn {
        background: linear-gradient(to right, #c8c7c7 0%, #7e807d 100%);
        &.kongxin {
          background: #fff;
          color: #8d8d8d;
          border: 1px solid #8d8d8d;
        }
      }
      .exchange-card-right-right.lv4 .exchange-card-right-bottom-btn {
        background: linear-gradient(to right, #ffdaa5 0%, #e5a23a 100%);
        &.kongxin {
          background: #fff;
          color: #f7bf65;
          border: 1px solid #f7bf65;
        }
      }
      .exchange-card-right-right.lv5 .exchange-card-right-bottom-btn {
        background: linear-gradient(to right, #666666 0%, #121212 100%);
        &.kongxin {
          background: #fff;
          color: #7f88a7;
          border: 1px solid #7f88a7;
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
  .bangdou-exchange-card.lv1 {
    .exchange-card-left {
      background-image: url('../../assets/img/coupons/new_gray_left_lv1.png');
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom-2 {
          > span {
            color: #7f86aa;
            background-color: #F1F2F6;
          }
        }
      }
      .exchange-card-right-right {
        .bd-box {
          .bd-box-left,
          .bd-box-right {
            color: #989ebd;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv2 {
    .exchange-card-left {
      background-image: url('../../assets/img/coupons/new_gray_left_lv2.png');
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom-2 {
          > span {
            color: #b5561a;
            background-color: #F3E3D9;
          }
        }
      }
      .exchange-card-right-right {
        .bd-box {
          .bd-box-left,
          .bd-box-right {
            color: #b5561a;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv3 {
    .exchange-card-left {
      background-image: url('../../assets/img/coupons/new_gray_left_lv3.png');
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom-2 {
          > span {
            color: #8d8d8d;
            background-color: #EEEEEE;
          }
        }
      }
      .exchange-card-right-right {
        .bd-box {
          .bd-box-left,
          .bd-box-right {
            color: #8d8d8d;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv4 {
    .exchange-card-left {
      background-image: url('../../assets/img/coupons/new_gray_left_lv4.png');
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom-2 {
          > span {
            color: #f7bf65;
            background-color: #FEF4E6;
          }
        }
      }
      .exchange-card-right-right {
        .bd-box {
          .bd-box-left,
          .bd-box-right {
            color: #f7bf65;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv5 {
    .exchange-card-left {
      background-image: url('../../assets/img/coupons/new_gray_left_lv5.png');
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom-2 {
          > span {
            color: #8D8D8D;
            background-color: #F1F2F6;
          }
        }
      }
      .exchange-card-right-right {
        .bd-box {
          .bd-box-left,
          .bd-box-right {
            color: #121212;
          }
        }
      }
    }
  }
  .goods-img {
    width: 72px;
    height: 72px;
    border-radius: 4px;
  }
  table {
    width: 100%;
    border: 0.5px solid #f0f0f0;
    border-collapse: collapse;
    border-radius: 12px;
    tr {
      td {
        padding: 11px 0;
        border: 0.5px solid #f0f0f0;
        border-radius: 12px;
        text-align: center;
        font-size: 14px;
        color: #121212;
        font-weight: bold;
        vertical-align: middle;
        img {
          width: 49.83px;
          height: 25.95px;
          vertical-align: middle;
          margin-right: 12px;
        }
      }
    }
  }
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .descr {
    margin-top: 15px;
    color: #666666;
    font-size: 14px;
    line-height: 27px;
  }
}
</style>
