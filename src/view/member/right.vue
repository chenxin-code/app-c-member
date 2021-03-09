<template>
  <div>
    <div class="top-header">
      <div class="btn-return" @click="$router.go(-1)"></div>
      会员特权
    </div>
    <div class="containter">
      <p class="title">会员礼券</p>
      <div class="bangdou-exchange-card" v-for="(v,k) in 3" :key="k">
        <div class="exchange-card-item exchange-card-left">
          <div class="exchange-card-left-top">
            <template >
              <div class="card-left-top-type">￥</div>
              <div class="card-left-top-num">50</div>
            </template>
          </div>
          <template>
            <div class="exchange-card-left-btn">满100元可用</div>
          </template>
        </div>
        <div class="exchange-card-item exchange-card-right">
          <div class="exchange-card-right-left">
            <div class="card-right-left-top">
              10元生鲜满减券
            </div>
            <div class="card-right-left-middle">
              领取后3天有效
            </div>
            <div class="card-right-left-bottom">
              每月10日领取
            </div>
          </div>
          <div class="exchange-card-right-right">
            <template >
              <div class="aaaaa">
                <span class="aaaaa-left">300</span>
                <span class="aaaaa-right">邦豆</span>
              </div>
              <div class="exchange-card-right-bottom-btn" v-if="k === 0">帮豆兑换</div>
              <div class="exchange-card-right-bottom-btn use" v-else>去使用</div>
            </template>
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
export default {
name: "right"
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
    height: 8px;
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
      background-image: url("../../assets/img/coupons/new_gray_left.png");
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
          color: #7F86AA;
          font-size: 11px;
          background-color: #f5f5f7;
          line-height: 10px;
          margin-top: 15px;
          padding: 5px 2px;
          border-radius: 3px;
          float: left;
        }

      }
      .exchange-card-right-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .aaaaa {
          align-self: flex-start;
          .aaaaa-left {
            padding-right: 4px;

            height: 20px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #989ebd;
            line-height: 20px;
          }
          .aaaaa-right {
            height: 14px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #989ebd;
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
          background: linear-gradient(180deg, #C8CCDF 0%, #989ebd 100%);
          border-radius: 15px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          &.ineffective {
            background: #f8f8f8;
          }
          &.use {
            background: #fff;
            color: #989ebd;
            border: 1px solid #989ebd;
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
