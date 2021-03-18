<template>
  <div>
    <div class="top-header">
      <div class="btn-return" @click="$router.go(-1)"></div>
      会员特权
    </div>
    <div class="containter">
      <p class="title">会员礼券</p>
      <div class="empty" v-if="!loading && cardList.length === 0">
        <img class="empty-img" :src="require('@/assets/img/empty/empty-coupon.png')" alt="" />
        <p class="empty-description">敬请期待</p>
      </div>
      <div v-else>
        <div class="bangdou-exchange-card"
             :class="getPageClass(levelId)"
             v-for="(v,k) in cardList" :key="k">
          <div class="exchange-card-item exchange-card-left">
            <div class="exchange-card-left-top">
              <template >
                <div class="card-left-top-type">￥</div>
                <div class="card-left-top-num">{{parseInt(v.faceAmount)}}</div>
              </template>
            </div>
            <template>
              <div class="exchange-card-left-btn">满{{parseInt(v.satisfyAmount)}}元可用</div>
            </template>
          </div>
          <div class="exchange-card-item exchange-card-right">
            <div class="exchange-card-right-left">
              <div class="card-right-left-top">
                {{v.couponTitle}}
              </div>
              <div class="card-right-left-middle">
                领取后{{v.takeEffectDayNums}}天有效
              </div>
              <!--<div class="card-right-left-bottom">
                每月11日领取
              </div>-->
              <div class="card-right-left-bottom" v-if="v.monthGetDay">
                每月{{v.monthGetDay}}日领取
              </div>
              <div class="card-right-left-bottom" v-else-if="v.weekGetDay">
                每周{{v.weekGetDay}}领取
              </div>
            </div>
            <div class="exchange-card-right-right">
              <template>
                <div class="aaaaa">
                  <span class="aaaaa-left">{{v.integrealCount}}</span>
                  <span class="aaaaa-right">邦豆</span>
                </div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="getCoupon(v)" v-if="v.isPeriodic === 0 && v.condition === 1 && !v.goUse">立即领取</div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="useCoupon(v)" v-else-if="v.isPeriodic === 0 && v.condition === 1 && v.goUse">去使用</div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="exchangeBD(v)" v-else-if="v.isPeriodic === 0 && v.condition === 3 && !v.goUse">邦豆兑换</div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="useCoupon(v)" v-else-if="v.isPeriodic === 0 && v.condition === 3 && v.goUse">去使用</div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="getCoupon(v)" v-else-if="v.isPeriodic === 1 && checkTimeOK(v.monthGetDay,v.weekGetDay) && !v.goUse">立即领取</div>
                <div class="exchange-card-right-bottom-btn" :class="getPageClass(levelId)" @click="useCoupon(v)" v-else-if="v.isPeriodic === 1 && checkTimeOK(v.monthGetDay,v.weekGetDay) && v.goUse">去使用</div>
                <div class="exchange-card-right-bottom-btn kongxin" :class="getPageClass(levelId)" v-else-if="v.isPeriodic === 1 && !checkTimeOK(v.monthGetDay,v.weekGetDay)">未生效</div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <p class="title">各等级特权</p>
      <table>
        <tr>
          <td><img src="./../../assets/img/member/icon-leve-l1.png" alt="" />普通会员</td>
          <td>每月领<span style="color: deeppink">60元</span>会员礼券</td>
        </tr>
        <tr>
          <td><img src="./../../assets/img/member/icon-leve-l2.png" alt="" />铜牌会员</td>
          <td>每月领<span style="color: deeppink">330元</span>会员礼券</td>
        </tr>
        <tr>
          <td><img src="./../../assets/img/member/icon-leve-l3.png" alt="" />银牌会员</td>
          <td>无</td>
        </tr>
        <tr>
          <td><img src="./../../assets/img/member/icon-leve-l4.png" alt="" />金牌会员</td>
          <td>无</td>
        </tr>
        <tr>
          <td><img src="./../../assets/img/member/icon-leve-l5.png" alt="" />钻石会员</td>
          <td>无</td>
        </tr>
      </table>
      <p class="title">特权说明</p>
      <div class="descr">
        1、普通会员、铜牌会员专项此特权，每月可领取一次（限每个月1号、10号、20号至当月末可分批领取）；领取的券包以活动页面信息为准，券包会不定期调整，领取后请在有效期内使用，过期未使用将不再补发改券包；
        2、如存在违规行为（包括但不限于恶意刷单、套取资金、机器作弊、虚假交易等违反诚实信用原则行为），主办方有权拒绝向您发送奖励、撤销相关违规交易、追回已发送的奖励，必要时追究法律责任。
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import yjzdbill from '@zkty-team/x-engine-module-yjzdbill';
import router from '@zkty-team/x-engine-module-router';
import mixin from './../coupons/mixin/pageList';
import couponMixin from './../coupons/mixin/getCoupon-mixin';
export default {
  name: "right",
  mixins: [mixin, couponMixin],
  components: {},
  data() {
    return {
      memberId: null,
      levelId: null,
      cardList: [],
      loading: false,
    };
  },
  methods: {
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
      if (!data.effective) {
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
            this.$toast('领取成功');
            if (couponPersonDay || couponPerson || couponPerson || couponTotal) {
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
    //邦豆兑换
    exchangeBD(data) {
      //this.toast();
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
              //this.toast();
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
                    this.$toast('兑换成功');
                    if (couponPersonDay || couponPerson || couponPerson || couponTotal) {
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
              });
            });
        }
      });
    },
    checkTimeOK(monthGetDay,weekGetDay){
      if(monthGetDay){
        return new Date().getDate() === monthGetDay//获取当前日(1-31)
      }else if(weekGetDay){
        return new Date().getDay() === weekGetDay//获取当前星期X(0-6,0代表星期天)
      }
    },
    getMemberDetail() {
      api.memberDetailByMemberID({memberId: this.memberId}).then(res => {
        if (res.code === 200) {
          this.levelId = res.data.memberCardRelats[0].levelId;
          // this.levelId = 1;
          // this.levelId = 2;
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
    queryReceiveCouponList(){
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
        activityType: 2,//会员权益
        businessType: 0,
        condition: 0
      })
        .then(res => {
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
          //     },
          //     {
          //       "activity":"4014",
          //       "activityMemo":"",
          //       "cost":"",
          //       "couTypeCode":"10WY000260",
          //       "couponStatus":0,
          //       "couponSubhead":"",
          //       "couponTitle":"卡券44",
          //       "couponType":10,
          //       "discountMaxDeduction":"",
          //       "discountRatio":"0.9",
          //       "faceAmount":"0.03",
          //       "id":2372760729989154469,
          //       "image":"",
          //       "integrealCount":10,
          //       "memo":"",
          //       "operator":"",
          //       "receiveCondition":"",
          //       "receiveConditionRule":"",
          //       "releaseCount":100,
          //       "releaseForm":"",
          //       "releaseRule":"",
          //       "releaseType":"",
          //       "satisfyAmount":"",
          //       "takeEffectDayNums":0,
          //       "validityDayNums":0,
          //       "validityEndTime":"1619712000000",
          //       "validityStartTime":"1614700800000",
          //       "isPeriodic":1,
          //       "condition": 3,
          //     },
          //     {
          //       "activity":"4014",
          //       "activityMemo":"",
          //       "cost":"",
          //       "couTypeCode":"20WY000263",
          //       "couponStatus":0,
          //       "couponSubhead":"",
          //       "couponTitle":"会员活动LV1送5元物业券",
          //       "couponType":20,
          //       "discountMaxDeduction":"",
          //       "discountRatio":"0.9",
          //       "faceAmount":"5.0",
          //       "id":2372760729989154581,
          //       "image":"",
          //       "integrealCount":0,
          //       "memo":"",
          //       "operator":"",
          //       "receiveCondition":"",
          //       "receiveConditionRule":"",
          //       "releaseCount":3,
          //       "releaseForm":"",
          //       "releaseRule":"",
          //       "releaseType":"",
          //       "satisfyAmount":"100.0",
          //       "takeEffectDayNums":0,
          //       "validityDayNums":0,
          //       "validityEndTime":"1617465600000",
          //       "validityStartTime":"1614787200000",
          //       "isPeriodic":1,
          //       "condition": 2,
          //     },
          //     {
          //       "activity":"4014",
          //       "activityMemo":"",
          //       "cost":"",
          //       "couTypeCode":"20WY000287",
          //       "couponStatus":0,
          //       "couponSubhead":"限时优惠券，800邦豆可兑！",
          //       "couponTitle":"物业缴费10元券",
          //       "couponType":20,
          //       "discountMaxDeduction":"",
          //       "discountRatio":"0.9",
          //       "faceAmount":"10.0",
          //       "id":2372760729989154835,
          //       "image":"",
          //       "integrealCount":0,
          //       "memo":"",
          //       "operator":"",
          //       "receiveCondition":"",
          //       "receiveConditionRule":"",
          //       "releaseCount":500,
          //       "releaseForm":"",
          //       "releaseRule":"",
          //       "releaseType":"",
          //       "satisfyAmount":"200.0",
          //       "takeEffectDayNums":30,
          //       "validityDayNums":30,
          //       "isPeriodic":0,
          //       "condition": 3,
          //     }
          //   ],
          //   "message":"success"
          // };
          if (res.code === 200) {
            this.$toast.clear();
          }
          const data = res.data || [];
          const cardList = [];
          let nowTime = new Date();
          data.map(item => {
            const stareTime = new Date(+item.validityStartTime);
            const endTime = new Date(+item.validityEndTime);
            item.effective = nowTime >= stareTime && nowTime <= endTime;
            cardList.push(item);
            return item;
          });
          this.cardList = cardList;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    if (this.$store.getters.isDebugMode) {
      //生产需注释
      this.memberId = '2332445899206164529';
      this.queryReceiveCouponList();
      this.getMemberDetail();
    } else {
      //生产需打开
      localstorage.get({ key: 'LLBMemberId', isPublic: true }).then(res => {
        this.memberId = res.result;
        localStorage.setItem('memberId', this.memberId);
        this.queryReceiveCouponList();
        this.getMemberDetail();
      });
    }
  }
}
</script>

<style lang="less" scoped>
.top-header {
  padding: 6px 35px;
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  width: 100%;
  top: 0;
  height: 55px;
  line-height: 35px;
  background-color: #fff;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #f5f5f7;
  }
  .btn-return {
    content: ' ';
    height: 11px;
    width: 11px;
    border-width: 0 0 2px 2px;
    border-color: #000;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    margin-top: -10px;
    position: absolute;
    top: 50%;
    left: 15px;
  }
}
.containter {
  margin-top: 55px;
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
    height: 97px;
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

    .exchange-card-left {
      width: 101px;
      height: 97px;
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
          font-size: 28px;
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
      height: 97px;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      padding-right: 12px;

      .exchange-card-right-left {
        flex: 1;
        padding: 12px 7px 0 12px;
        display: flex;
        flex-direction: column;
        // flex-flow: row wrap;
        justify-content: flex-start;
        align-items: stretch;

        .card-right-left-top {
          margin-bottom: 3px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 700;
          color: #121212;
          line-height: 20px;
          max-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
        }

        .card-right-left-middle {
          color: #999999;
          font-size: 12px;
          font-weight: 500;
          line-height: 12px;
        }
        .card-right-left-bottom {
          font-size: 11px;
          line-height: 10px;
          margin-top: 15px;
          padding: 5px 2px;
          border-radius: 3px;
          float: left;
          width: 73px;
        }

      }
      .exchange-card-right-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .aaaaa {
          //align-self: flex-start;
          .aaaaa-left {
            padding-right: 4px;
            height: 20px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 20px;
          }
          .aaaaa-right {
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
        }
        .exchange-card-right-bottom-btn.lv1 {
          background: linear-gradient(to right, #C8CCDF 0%, #989ebd 100%);
          &.kongxin {
            background: #fff;
            color: #989ebd;
            border: 1px solid #989ebd;
          }
        }
        .exchange-card-right-bottom-btn.lv2 {
          background: linear-gradient(to right, #E2B490 0%, #FFD5B5 50%, #A56D4C 100%);
          &.kongxin {
            background: #fff;
            color: #B5561A;
            border: 1px solid #B5561A;
          }
        }
        .exchange-card-right-bottom-btn.lv3 {
          background: linear-gradient(to right, #C8C7C7 0%, #7E807D 100%);
          &.kongxin {
            background: #fff;
            color: #8D8D8D;
            border: 1px solid #8D8D8D;
          }
        }
        .exchange-card-right-bottom-btn.lv4 {
          background: linear-gradient(to right, #FFDAA5 0%, #E5A23A 100%);
          &.kongxin {
            background: #fff;
            color: #F7BF65;
            border: 1px solid #F7BF65;
          }
        }
        .exchange-card-right-bottom-btn.lv5 {
          background: linear-gradient(to right, #B8C2F3 0%, #262877 100%);
          &.kongxin {
            background: #fff;
            color: #7F88A7;
            border: 1px solid #7F88A7;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv1 {
    .exchange-card-left {
      background-image: url("../../assets/img/coupons/new_gray_left_lv1.png");
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom {
          color: #7F86AA;
          background-color: #f5f5f7;
        }
      }
      .exchange-card-right-right {
        .aaaaa {
          .aaaaa-left,
          .aaaaa-right {
            color: #989ebd;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv2 {
    .exchange-card-left {
      background-image: url("../../assets/img/coupons/new_gray_left_lv2.png");
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom {
          color: #B5561A;
          background-color: #f5f5f7;
        }
      }
      .exchange-card-right-right {
        .aaaaa {
          .aaaaa-left,
          .aaaaa-right {
            color: #B5561A;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv3 {
    .exchange-card-left {
      background-image: url("../../assets/img/coupons/new_gray_left_lv3.png");
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom {
          color: #8D8D8D;
          background-color: #f5f5f7;
        }
      }
      .exchange-card-right-right {
        .aaaaa {
          .aaaaa-left,
          .aaaaa-right {
            color: #8D8D8D;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv4 {
    .exchange-card-left {
      background-image: url("../../assets/img/coupons/new_gray_left_lv4.png");
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom {
          color: #F7BF65;
          background-color: #f5f5f7;
        }
      }
      .exchange-card-right-right {
        .aaaaa {
          .aaaaa-left,
          .aaaaa-right {
            color: #F7BF65;
          }
        }
      }
    }
  }
  .bangdou-exchange-card.lv5 {
    .exchange-card-left {
      background-image: url("../../assets/img/coupons/new_gray_left_lv5.png");
    }
    .exchange-card-right {
      .exchange-card-right-left {
        .card-right-left-bottom {
          color: #7F86AA;
          background-color: #f5f5f7;
        }
      }
      .exchange-card-right-right {
        .aaaaa {
          .aaaaa-left,
          .aaaaa-right {
            color: #7F88A7;
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
