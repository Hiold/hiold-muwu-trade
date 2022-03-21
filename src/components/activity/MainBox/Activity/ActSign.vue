<template>
  <div class="Act-qd" style="display: block;">		<!-- 每日签到 -->
    <div class="left">
      <li data-index="0">
        <div class="day" style="line-height: 42.625px;">星期一</div>
        <div class="image">
          <img src="images/ItemIcons/decoPumpkinJackOLantern.png">
          <b>10</b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.1rem; color: gray; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">南瓜灯</div>
        <div class="received">
          <img src="images/received.png">
        </div>
      </li>
      <li data-index="1">
        <div class="day" style="line-height: 42.625px;">星期二</div>
        <div class="image">
          <img src="images/ItemIcons/armorSantaHat.png">
          <b></b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.3rem; color: peru; cursor: pointer; background-color: rgba(255, 215, 0, 0.8);">补签</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
      <li data-index="2">
        <div class="day" style="line-height: 42.625px;">星期三</div>
        <div class="image">
          <img src="images/ItemIcons/meleeWpnClubT1CandyClub.png">
          <b></b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">明日可领</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
      <li data-index="3">
        <div class="day" style="line-height: 42.625px;">星期四</div>
        <div class="image">
          <img src="images/ItemIcons/casinoCoin.png">
          <b>20000</b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">还剩 2 天</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
      <li data-index="4">
        <div class="day" style="line-height: 42.625px;">星期五</div>
        <div class="image">
          <img src="images/items/jf2.png">
          <b>8888</b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">还剩 3 天</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
      <li data-index="5">
        <div class="day" style="line-height: 42.625px;">星期六</div>
        <div class="image">
          <img src="images/items/red-zs.png">
          <b>10</b>
        </div>
        <div class="name" style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">还剩 4 天</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
    </div>
    <div class="right">
      <li data-index="6">
        <div class="day" style="line-height: 71.625px;">星期日</div>
        <div class="image">
          <img src="images/items/nbs.png">
          <b>5</b>
        </div>
        <div class="name" style="line-height: 78px; font-size: 1.5rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">还剩 5 天</div>
        <div class="received" style="display: none;">
          <img src="images/received.png">
        </div>
      </li>
    </div>
    <div class="read" style="display:none;"><!-- value: 1表示开启每周签到的功能, 填写其它值表示关闭签到功能。 -->
      <qd value="1">
        <!-- 	day: 表示每周的第1天到第7天, 这里的值只作为展示。
            award: 当天玩家签到后获得的奖励(填写物品ID)。
            count: 当天玩家签到后获得奖励的数量。 -->
        <li day="1" award="decoPumpkinJackOLantern" count="10"></li>	<!-- 南瓜灯 -->
        <li day="2" award="armorSantaHat" count="1"></li>	<!-- 圣诞帽 -->
        <li day="3" award="meleeWpnClubT1CandyClub" count="1"></li>	<!-- 拐杖糖棍棒 -->
        <li day="4" award="casinoCoin" count="20000"></li>	<!-- 赌场公爵币 -->
        <li day="5" award="积分" count="8888"></li>
        <li day="6" award="钻石" count="10"></li>
        <li day="7" award="Cxx的尿不湿" count="5"></li>
      </qd>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActSign"
}
</script>

<style scoped>

</style>
