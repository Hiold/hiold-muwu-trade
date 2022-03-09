<template>
  <li>
    <div class="left">
      <div class="open-time">{{ item.timestart == "" ? "即刻起" : item.timestart }} 至
        {{ item.timeend == "" ? "全天有效" : item.timeend }}
      </div>
      <div class="prize-icon">
        <img src="images/ItemIcons/decoPumpkinJackOLantern.png">
      </div>
      <!-- <div class="btn b1">未开始</div>
      <div class="btn b2">抢红包</div>
      <div class="btn b3">已领取</div> -->
      <div class="btn b4">已过期</div>
    </div>
    <div class="right">
      <header>{{ item.desc }}</header>
      <div class="prize-name">
        <span class="tit">红包物品：</span>
        <span class="val" v-if="awards!=null&&awards.length===1">{{ awards[0].itemchinese }}</span>
        <span class="val" v-if="awards!=null&&awards.length>1" @click="showAwards">点击查看奖励</span>
        <span class="val" v-if="awards==null||awards.length===0">无</span>
      </div>
      <div class="prize-num" v-if="awards!=null&&awards.length===1">
        <span class="tit">获得数量：</span>
        <span class="val">{{ awards[0].count }}</span>
      </div>
      <div class="open-date">
        <span class="tit">活动日期：</span>
        <span class="val">{{ item.startdate == "" ? "即日起" : item.startdate.substring(0, 10) }} 至
                        {{ item.enddate == "" ? "长期有效" : item.enddate.substring(0, 10) }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  name: "ActHbItem",
  props: ["item"],
  data() {
    return {
      awards: [],
      itemLocal: {},
      ctx: {},
    }
  },
  methods: {
    showAwards() {
      var ctx = this.ctx.appContext.config.globalProperties;
      var prizeArr = [
        ["南瓜灯", "images/ItemIcons/decoPumpkinJackOLantern.png", "数量:50", "品质:"],
        ["圣诞帽", "images/ItemIcons/armorSantaHat.png", "数量:2", "品质:5"],
        ["拐杖糖棍棒", "images/ItemIcons/meleeWpnClubT1CandyClub.png", "数量:1", "品质:6"],
        ["南瓜灯", "images/ItemIcons/decoPumpkinJackOLantern.png", "数量:50", "品质:"],
        ["圣诞帽", "images/ItemIcons/armorSantaHat.png", "数量:2", "品质:5"],
        ["拐杖糖棍棒", "images/ItemIcons/meleeWpnClubT1CandyClub.png", "数量:1", "品质:6"],
        ["南瓜灯", "images/ItemIcons/decoPumpkinJackOLantern.png", "数量:50", "品质:"],
        ["圣诞帽", "images/ItemIcons/armorSantaHat.png", "数量:2", "品质:5"],
        ["拐杖糖棍棒", "images/ItemIcons/meleeWpnClubT1CandyClub.png", "数量:1", "品质:6"],
        ["南瓜灯", "images/ItemIcons/decoPumpkinJackOLantern.png", "数量:50", "品质:"],
      ];
      var awardData = [[]];
      for (var i in this.awards) {
        awardData[i] = [];
        if (this.awards[i].type == 1 || this.awards[i].type == 2) {
          awardData[i][0] = this.awards[i].itemchinese;
          awardData[i][1] = this.awards[i].itemicon;
          awardData[i][2] = "数量:" + this.awards[i].count;
          awardData[i][3] = "品质:" + this.awards[i].itemquality;
          awardData[i][4] = this.awards[i].itemtint;
        } else if (this.awards[i].type == 3) {
          awardData[i][0] = "一条神秘指令";
          awardData[i][1] = this.awards[i].itemicon;
          awardData[i][2] = "数量:1";
          awardData[i][3] = "品质:" + this.awards[i].itemquality;
          awardData[i][4] = this.awards[i].itemtint;
        } else if (this.awards[i].type == 4) {
          awardData[i][0] = "积分";
          awardData[i][1] = this.awards[i].itemicon;
          awardData[i][2] = "数量:" + this.awards[i].count;
          awardData[i][3] = "品质:" + this.awards[i].itemquality;
          awardData[i][4] = this.awards[i].itemtint;
        } else if (this.awards[i].type == 5) {
          awardData[i][0] = "点券";
          awardData[i][1] = this.awards[i].itemicon;
          awardData[i][2] = "数量:" + this.awards[i].count;
          awardData[i][3] = "品质:" + this.awards[i].itemquality;
          awardData[i][4] = this.awards[i].itemtint;
        }
      }

      ctx.Award(awardData, "奖励信息如下", "", "关闭", null);
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    let args = {containerid: this.item.id + ""};
    axios.post("api/getAwardInfo", args).then(res => {
      console.log(res.data);
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.awards = JsonData;
      }
    });
  }
}
</script>

<style scoped>

</style>
