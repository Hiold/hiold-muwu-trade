<template>
  <div class="Act-lottery" style="display: block;">	<!-- 幸运抽奖 -->
    <div class="box">
      <li class="l1">
        <header>积分兑换券</header>
        <section>
          <div class="image">
            <img src="images/items/jf2.png">
          </div>
          <div class="right">
            <div class="num">500 件</div>
            <div class="pro">5.13%</div>
          </div>
        </section>
      </li>
      <li class="l2">
        <header>南瓜灯</header>
        <section>
          <div class="image">
            <img src="images/ItemIcons/decoPumpkinJackOLantern.png">
          </div>
          <div class="right">
            <div class="num">50 件</div>
            <div class="pro">12.82%</div>
          </div>
        </section>
      </li>
      <li class="l3">
        <header>圣诞帽</header>
        <section>
          <div class="image">
            <img src="images/ItemIcons/armorSantaHat.png">
          </div>
          <div class="right">
            <div class="num">3 件</div>
            <div class="pro">12.82%</div>
          </div>
        </section>
      </li>
      <li class="l4">
        <header>钻石兑换券</header>
        <section>
          <div class="image">
            <img src="images/items/red-zs.png">
          </div>
          <div class="right">
            <div class="num">2 件</div>
            <div class="pro">2.56%</div>
          </div>
        </section>
      </li>
      <div class="left">
        <li class="l12">
          <header>【券】满100减50</header>
          <section>
            <div class="image">
              <img src="images/items/quan.png">
            </div>
            <div class="right">
              <div class="num">20 件</div>
              <div class="pro">5.13%</div>
            </div>
          </section>
        </li>
        <li class="l11">
          <header>开水</header>
          <section>
            <div class="image">
              <img src="images/ItemIcons/drinkJarBoiledWater.png">
            </div>
            <div class="right">
              <div class="num">200 件</div>
              <div class="pro">12.82%</div>
            </div>
          </section>
        </li>
      </div>
      <div class="center">
        <div class="image">
          <img src="images/lottery.jpg">
        </div>
        <div class="btn">
          <div class="b1">
            <div class="align">
              <b>立即抽奖</b>
              <div class="price">
                <i style="background-image: url(&quot;images/icon/jf2.png&quot;);"></i>
                <span>1000</span>
              </div>
            </div>
          </div>
          <div class="b2">
            <div class="align">
              <b>十连抽</b>
              <div class="price">
                <i style="background-image: url(&quot;images/icon/jf2.png&quot;);"></i>
                <span>9000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <li class="l5">
          <header>拐杖糖棍棒</header>
          <section>
            <div class="image">
              <img src="images/ItemIcons/meleeWpnClubT1CandyClub.png">
            </div>
            <div class="right">
              <div class="num">5 件</div>
              <div class="pro">2.56%</div>
            </div>
          </section>
        </li>
        <li class="l6">
          <header>公爵赌场币</header>
          <section>
            <div class="image">
              <img src="images/ItemIcons/casinoCoin.png">
            </div>
            <div class="right">
              <div class="num">50000 件</div>
              <div class="pro">12.82%</div>
            </div>
          </section>
        </li>
      </div>
      <li class="l10">
        <header>钻石兑换券</header>
        <section class="l10">
          <div class="image">
            <img src="images/items/red-zs.png">
          </div>
          <div class="right">
            <div class="num">5 件</div>
            <div class="pro">2.56%</div>
          </div>
        </section>
      </li>
      <li class="l9">
        <header>祖父的私酒</header>
        <section>
          <div class="image">
            <img src="images/ItemIcons/drinkJarGrandpasMoonshine.png">
          </div>
          <div class="right">
            <div class="num">50 件</div>
            <div class="pro">12.82%</div>
          </div>
        </section>
      </li>
      <li class="l8">
        <header>碾压王</header>
        <section>
          <div class="image">
            <img src="images/ItemIcons/drinkCanMegaCrush.png">
          </div>
          <div class="right">
            <div class="num">50 件</div>
            <div class="pro">12.82%</div>
          </div>
        </section>
      </li>
      <li class="l7">
        <header>积分兑换券</header>
        <section>
          <div class="image">
            <img src="images/items/jf2.png">
          </div>
          <div class="right">
            <div class="num">2000 件</div>
            <div class="pro">5.13%</div>
          </div>
        </section>
      </li>
    </div>
    <div class="top">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="bottom">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="left">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="right">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="read" style="display:none;"><lotterys>
      <!-- name: 活动名称, 将会在页面子分类菜单中显示这个名称。
         currency: 抽奖消耗的货币类型, (积分/钻石)。
         price: 单次抽奖需要花费的价格。
         price10: 十连抽奖需要花费的价格。
         numDay: 每日可抽奖的次数。 -->
      <lottery name="积分抽奖" currency="积分" price="1000" price10="9000" numday="99">
        <prize id="积分" 数量="500" 概率="2"></prize>			<!-- 奖品1: 积分兑换券 -->
        <prize id="decoPumpkinJackOLantern" 数量="50" 概率="5"></prize>		<!-- 奖品2: 南瓜灯 -->
        <prize id="armorSantaHat" 数量="3" 概率="5"></prize>				<!-- 奖品3: 圣诞帽 -->
        <prize id="钻石" 数量="2" 概率="1"></prize>				<!-- 奖品4: 钻石兑换券 -->
        <prize id="meleeWpnClubT1CandyClub" 数量="5" 概率="1"></prize>		<!-- 奖品5: 拐杖糖棍棒 -->
        <prize id="casinoCoin" 数量="50000" 概率="5"></prize>				<!-- 奖品6: 公爵赌场币 -->
        <prize id="积分" 数量="2000" 概率="2"></prize>			<!-- 奖品7: 积分兑换券 -->
        <prize id="drinkCanMegaCrush" 数量="50" 概率="5"></prize>			<!-- 奖品8: 碾压王 -->
        <prize id="drinkJarGrandpasMoonshine" 数量="50" 概率="5"></prize>	<!-- 奖品9: 祖父的私酒 -->
        <prize id="钻石" 数量="5" 概率="1"></prize>				<!-- 奖品10: 钻石兑换券 -->
        <prize id="drinkJarBoiledWater" 数量="200" 概率="5"></prize>		<!-- 奖品11: 白开水 -->
        <prize id="积分满减券100-50" 数量="20" 概率="2"></prize>				<!-- 奖品12: 积分满减券100-50 -->
      </lottery>
      <lottery name="钻石抽奖" currency="钻石" price="10" price10="90" numday="20">
        <prize id="钻石" 数量="2" 概率="1"></prize>				<!-- 奖品1: 钻石兑换券 -->
        <prize id="armorSantaHat" 数量="3" 概率="5"></prize>				<!-- 奖品2: 圣诞帽 -->
        <prize id="decoPumpkinJackOLantern" 数量="50" 概率="5"></prize>		<!-- 奖品3: 南瓜灯 -->
        <prize id="积分" 数量="500" 概率="2"></prize>			<!-- 奖品4: 积分兑换券 -->
        <prize id="casinoCoin" 数量="50000" 概率="5"></prize>				<!-- 奖品5: 公爵赌场币 -->
        <prize id="meleeWpnClubT1CandyClub" 数量="5" 概率="1"></prize>		<!-- 奖品6: 拐杖糖棍棒 -->
        <prize id="钻石" 数量="5" 概率="1"></prize>				<!-- 奖品7: 钻石兑换券 -->
        <prize id="drinkJarGrandpasMoonshine" 数量="50" 概率="5"></prize>	<!-- 奖品8: 祖父的私酒 -->
        <prize id="drinkCanMegaCrush" 数量="50" 概率="5"></prize>			<!-- 奖品9: 碾压王 -->
        <prize id="积分" 数量="2000" 概率="2"></prize>			<!-- 奖品10: 积分兑换券 -->
        <prize id="积分满减券100-50" 数量="20" 概率="2"></prize>				<!-- 奖品11: 积分满减券100-50 -->
        <prize id="drinkJarBoiledWater" 数量="200" 概率="5"></prize>		<!-- 奖品12: 白开水 -->
      </lottery>
    </lotterys></div>
  </div>
</template>

<script>
export default {
  name: "ActLottery"
}
</script>

<style scoped>

</style>
