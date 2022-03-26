<template>
  <div class="Act-qd" style="display: block;">        <!-- 每日签到 -->
    <div class="left">
      <li :data-index="index" v-for="(item,index) in date" :key="index">
        <div class="day" style="line-height: 42.625px;">{{ item }}</div>
        <div class="image">
          <div class="text-button"
               v-if="signinfos[index+1]==null||signinfos[index+1].awards==null||signinfos[index+1].awards.length===0">
            没有奖励
          </div>
          <div class="text-button-p"
               v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length>1"
               @click="showAward(index+1)">点击查看奖励
          </div>
          <img
              v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type=='1'"
              :src="'404'"
              @error="$LoadTintImage($event.target,signinfos[index+1].awards[0].itemicon,signinfos[index+1].awards[0].itemtint)">
          <img
              v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type=='2'"
              :src="'404'"
              @error="$LoadTintImage($event.target,signinfos[index+1].awards[0].itemicon,signinfos[index+1].awards[0].itemtint)">

          <div class="text-button"
               v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type=='3'">
            神秘指令
          </div>
          <img
              v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type=='4'"
              :src="'images/items/jf2.png'">
          <img
              v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type=='5'"
              :src="'images/items/red-zs.png'">


          <b v-if="signinfos[index+1]!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards!=null&&signinfos[index+1].awards.length===1&&signinfos[index+1].awards[0].type!='3'">{{
              signinfos[index + 1].awards[0].count
            }}</b>
        </div>
        <template
            v-if="signinfos[index+1]==null||signinfos[index+1].awards==null||signinfos[index+1].awards.length===0||signinfos[index+1].info==null">
          <div
              v-if="signinfos[index+1]==null||signinfos[index+1].awards==null||signinfos[index+1].awards.length===0||signinfos[index+1].info==null"
              class="name"
              style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            无法领取
          </div>
        </template>
        <template v-else>
          <div v-if="(index+1)-calcWeek()<0&&signinfos[index+1].signed*1<=0" class="name"
               @click="resign(signinfos[index+1].info.id)"
               style="line-height: 65px; font-size: 1.3rem; color: peru; cursor: pointer; background-color: rgba(255, 215, 0, 0.8);">
            补签
          </div>
          <div v-if="(index+1)-calcWeek()===0&&signinfos[index+1].signed*1<=0" class="name"
               @click="sign(signinfos[index+1].info.id)"
               style="line-height: 65px; font-size: 1.3rem; color: peru; cursor: pointer; background-color: rgba(255, 215, 0, 0.8);">
            签到
          </div>
          <div v-if="(index+1)-calcWeek()===1&&signinfos[index+1].signed*1<=0" class="name"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            明日可领
          </div>
          <div class="name" v-if="(index+1)-calcWeek()>0&&signinfos[index+1].signed*1<=0"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            还剩 {{ (index + 1) - calcWeek() }} 天
          </div>
          <div v-if="signinfos[index+1].signed*1>0"
               class="name"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            已签到
          </div>
        </template>


        <div class="received" style="display: none">
          <img src="images/received.png">
        </div>
      </li>

    </div>
    <div class="right">
      <li :data-index="7">
        <div class="day" style="line-height: 42.625px;">星期日</div>
        <div class="image">
          <div class="text-button"
               v-if="signinfos[0]==null||signinfos[0].awards==null||signinfos[0].awards.length===0">
            没有奖励
          </div>
          <div class="text-button-p"
               v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length>1"
               @click="showAward(1)">点击查看奖励
          </div>
          <img
              v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1&&signinfos[0].awards[0].type=='1'"
              :src="'404'"
              @error="$LoadTintImage($event.target,signinfos[0].awards[0].itemicon,signinfos[0].awards[0].itemtint)">
          <img
              v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1&&signinfos[0].awards[0].type=='2'"
              :src="'404'"
              @error="$LoadTintImage($event.target,signinfos[0].awards[0].itemicon,signinfos[0].awards[0].itemtint)">

          <div class="text-button"
               v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1&&signinfos[0].awards[0].type=='3'">
            神秘指令
          </div>
          <img
              v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1&&signinfos[0].awards[0].type=='4'"
              :src="'images/items/jf2.png'">
          <img
              v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1&&signinfos[0].awards[0].type=='5'"
              :src="'images/items/red-zs.png'">


          <b v-if="signinfos[0]!=null&&signinfos[0].awards!=null&&signinfos[0].awards!=null&&signinfos[0].awards.length===1">5</b>
        </div>
        <template
            v-if="signinfos[0]==null||signinfos[0].awards==null||signinfos[0].awards.length===0||signinfos[0].info==null">
          <div
              v-if="signinfos[0]==null||signinfos[0].awards==null||signinfos[0].awards.length===0||signinfos[0].info==null"
              class="name"
              style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            无法领取
          </div>
        </template>
        <template v-else>
          <div v-if="7-calcWeek()<0&&signinfos[0].signed*1<=0" class="name"
               style="line-height: 65px; font-size: 1.3rem; color: peru; cursor: pointer; background-color: rgba(255, 215, 0, 0.8);">
            补签
          </div>
          <div v-if="7-calcWeek()===0&&signinfos[0].signed*1<=0" class="name"
               style="line-height: 65px; font-size: 1.3rem; color: peru; cursor: pointer; background-color: rgba(255, 215, 0, 0.8);">
            签到
          </div>
          <div v-if="7-calcWeek()===1&&signinfos[0].signed*1<=0" class="name"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            明日可领
          </div>
          <div class="name" v-if="7-calcWeek()>0&&signinfos[0].signed*1<=0"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            还剩 {{ 7 - calcWeek() }} 天
          </div>
          <div v-if="signinfos[0].signed*1>0"
               class="name"
               style="line-height: 65px; font-size: 1.1rem; color: peru; cursor: default; background: linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7));">
            已签到
          </div>
        </template>


        <div class="received" style="display: none">
          <img src="images/received.png">
        </div>
      </li>
    </div>
    <div class="read" style="display:none;"><!-- value: 1表示开启每周签到的功能, 填写其它值表示关闭签到功能。 -->
      <qd value="1">
        <!-- 	day: 表示每周的第1天到第7天, 这里的值只作为展示。
            award: 当天玩家签到后获得的奖励(填写物品ID)。
            count: 当天玩家签到后获得奖励的数量。 -->
        <li day="1" award="decoPumpkinJackOLantern" count="10"></li>    <!-- 南瓜灯 -->
        <li day="2" award="armorSantaHat" count="1"></li>    <!-- 圣诞帽 -->
        <li day="3" award="meleeWpnClubT1CandyClub" count="1"></li>    <!-- 拐杖糖棍棒 -->
        <li day="4" award="casinoCoin" count="20000"></li>    <!-- 赌场公爵币 -->
        <li day="5" award="积分" count="8888"></li>
        <li day="6" award="钻石" count="10"></li>
        <li day="7" award="Cxx的尿不湿" count="5"></li>
      </qd>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  name: "ActSign",
  data() {
    return {
      date: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      signinfos: [],
      ctx: {},
    }
  },
  methods: {
    sign(id) {
      var ctx = this.ctx.appContext.config.globalProperties;
      console.log("执行获取红包", id);
      let args = {id: id + ""};
      axios.post("api/doSignInfo", args).then(res => {
        if (res.data.respCode === "1") {
          var awardData = [[]];
          this.awards = res.data.data;
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
              awardData[i][1] = 'images/items/jf2.png';
              awardData[i][2] = "数量:" + this.awards[i].count;
              awardData[i][3] = "品质:" + this.awards[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            } else if (this.awards[i].type == 5) {
              awardData[i][0] = "点券";
              awardData[i][1] = 'images/items/red-zs.png';
              awardData[i][2] = "数量:" + this.awards[i].count;
              awardData[i][3] = "品质:" + this.awards[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            }
          }
          this.hbClass = "btn b3";
          this.hbNotice = "已领取";
          this.hbAvaliable = false;
          ctx.Award(awardData, "获得如下奖励", "物品已存入个人仓库", "确认", null);
          this.isGeted = 1;
        } else {
          ctx.Alert(res.data.respMsg);
        }
      });
      //调用重新加载方法
      this.loadSignInfo();
    },
    resign(id) {
      var ctx = this.ctx.appContext.config.globalProperties;
      console.log("执行获取红包", id);
      let args = {id: id + ""};
      axios.post("api/doReSignInfo", args).then(res => {
        if (res.data.respCode === "1") {
          var awardData = [[]];
          this.awards = res.data.data;
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
              awardData[i][1] = 'images/items/jf2.png';
              awardData[i][2] = "数量:" + this.awards[i].count;
              awardData[i][3] = "品质:" + this.awards[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            } else if (this.awards[i].type == 5) {
              awardData[i][0] = "点券";
              awardData[i][1] = 'images/items/red-zs.png';
              awardData[i][2] = "数量:" + this.awards[i].count;
              awardData[i][3] = "品质:" + this.awards[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            }
          }
          this.hbClass = "btn b3";
          this.hbNotice = "已领取";
          this.hbAvaliable = false;
          ctx.Award(awardData, "获得如下奖励", "物品已存入个人仓库", "确认", null);
          this.isGeted = 1;
        } else {
          ctx.Alert(res.data.respMsg);
        }
      });
      //调用重新加载方法
      this.loadSignInfo();
    },
    showAward(idx) {
      var ctx = this.ctx.appContext.config.globalProperties;
      var data = this.signinfos[idx].awards;
      var awardData = [[]];
      for (var i in data) {
        awardData[i] = [];
        if (data[i].type == 1 || data[i].type == 2) {
          awardData[i][0] = data[i].itemchinese;
          awardData[i][1] = data[i].itemicon;
          awardData[i][2] = "数量:" + data[i].count;
          awardData[i][3] = "品质:" + data[i].itemquality;
          awardData[i][4] = data[i].itemtint;
        } else if (data[i].type == 3) {
          awardData[i][0] = "一条神秘指令";
          awardData[i][1] = data[i].itemicon;
          awardData[i][2] = "数量:1";
          awardData[i][3] = "品质:" + data[i].itemquality;
          awardData[i][4] = data[i].itemtint;
        } else if (data[i].type == 4) {
          awardData[i][0] = "积分";
          awardData[i][1] = 'images/items/jf2.png';
          awardData[i][2] = "数量:" + data[i].count;
          awardData[i][3] = "品质:" + data[i].itemquality;
          awardData[i][4] = "1|1|1|1";
        } else if (data[i].type == 5) {
          awardData[i][0] = "点券";
          awardData[i][1] = 'images/items/red-zs.png';
          awardData[i][2] = "数量:" + data[i].count;
          awardData[i][3] = "品质:" + data[i].itemquality;
          awardData[i][4] = "1|1|1|1";
        }
      }

      ctx.Award(awardData, "奖励列表如下", "", "关闭", null);
    },
    getSignLog(id) {
      let params = {id: id};
      axios.post("api/getSignLog", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.signinfos = JsonData;
          console.log(this.signinfos);
        }
      });
    },
    loadSignInfo() {
      var ctx = this.ctx.appContext.config.globalProperties;
      const $bus = ctx.$bus
      let params = {itemname: ""};
      axios.post("api/getAvailableSignInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.signinfos = JsonData;
        }
      });
    },
    calcWeek() {
      var now = new Date();
      var dayOfWeek;
      if (now.getDay() === 0) {
        dayOfWeek = 7
      } else {
        dayOfWeek = now.getDay();
      }
      return dayOfWeek;
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    this.loadSignInfo();
  }
}
</script>

<style scoped>
.text-button {
  line-height: 4.5rem;
  height: 4.5rem;
  font-family: "new", "微软雅黑";
  font-weight: normal;
  font-size: 0.8em;
  padding-left: 1.5rem;
  padding-right: 2rem;
  color: rgb(244, 164, 96);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgb(255, 239, 213));
  border: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.8rem;
  letter-spacing: 0.2rem;
  -webkit-text-stroke-color: white;
}

.text-button-p {
  line-height: 4.5rem;
  height: 4.5rem;
  font-family: "new", "微软雅黑";
  font-weight: normal;
  font-size: 0.8em;
  padding-left: 1.5rem;
  padding-right: 2rem;
  color: rgb(244, 164, 96);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgb(255, 239, 213));
  border: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.8rem;
  letter-spacing: 0.2rem;
  -webkit-text-stroke-color: white;
  cursor: pointer;
}
</style>
