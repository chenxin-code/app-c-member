<template>
  <div class="pageBody">
    <div class="ndoe">
      <div class="title">会员卡概述</div>
      <div>
        <div>时代邻里会员卡包含5个等级：V1-V5</div>
        <div>等级由成长值决定，达到等级的成长值上限，即可升级。</div>
      </div>
    </div>
    <div class="ndoe">
      <div class="title">等级与成长值的关系</div>
      <div>
        <table>
          <thead>
            <tr>
              <td>会员卡</td>
              <td>等级</td>
              <td>成长值</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="5">时代邻里会员卡</td>
              <td>V1</td>
              <td>0~5000</td>
            </tr>
            <tr>
              <td>V2</td>
              <td>0~20000</td>
            </tr>
            <tr>
              <td>V3</td>
              <td>0~40000</td>
            </tr>
            <tr>
              <td>V4</td>
              <td>0~80000</td>
            </tr>
            <tr>
              <td>V5</td>
              <td>0~160000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="ndoe">
      <div class="title">等级升级规则</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td style="width: 100px">升级规则</td>
              <td style="text-align: left">
                <div class="jiaozhong">
                  <span>当：</span>成长值等于或大于当前层级最大值时
                </div>
                <div class="jiaozhong">
                  <span>则：</span>进入至下一层级。成长值增长超出当前层级最大值的部分计入下一层级
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="ndoe">
      <div class="title">邦豆概述</div>
      <div>
        <div>邦豆是用户通过一系列用户行为获得的奖励，可用于邦豆商城的优惠券兑换，并在购物消费中抵用，是名副其实的省钱神器啊！</div>
      </div>
    </div>
    <div class="ndoe">
      <div class="title">如何获得成长值及邦豆</div>
      <div>
        <table>
          <thead>
            <tr>
              <td>用户行为</td>
              <td>成长值</td>
              <td>邦豆</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>会员注册</td>
              <td>100</td>
              <td>100</td>
            </tr>
            <tr>
              <td>邻里邦Pro-业主认证</td>
              <td>200</td>
              <td>200</td>
            </tr>
            <tr>
              <td>购买旅游、家政、拎包商品</td>
              <td>购买金额/10（向下取整）</td>
              <td>购买金额（向下取整）</td>
            </tr>
            <tr>
              <td>每日签到</td>
              <td></td>
              <td style="text-align: left;">
                <div>第1天：10邦豆</div>
                <div>第2天：20邦豆</div>
                <div>第3天：神秘宝箱</div>
                <div>第4天：40邦豆</div>
                <div>第5天：50邦豆</div>
                <div>第6天：60邦豆</div>
                <div>第7天：神秘豪礼</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import nav from '@zkty-team/x-engine-module-nav';
export default {
  created() { },
  mounted() {
    nav.setNavLeftBtn({
      title: '会员卡攻略',
      titleColor: '#121212',
      titleSize: 24
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>

.pageBody {
  padding: 24px 16px 16px 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8d8d8d;
}
.title {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
  margin: 0px 0px 16px 0px;
}
.ndoe {
  margin-bottom: 32px;
}
.pageBody table {
  width: 100%;
  border-collapse: collapse;
}
.pageBody table td {
  border: 1px solid #e1e1e1;
  padding: 5px 3px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8d8d8d;
}
.pageBody table thead td {
  background: #f5f5f5;
  color: #121212;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #121212;
}
.jiaozhong span {
  font-weight: 700;
}
</style>
