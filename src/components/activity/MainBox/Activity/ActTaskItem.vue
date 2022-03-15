<template>
  <li class="task-list">
    <header>
      <div class="title">{{ item.desc }}</div>
      <div class="schedule">{{ progressionComplateData }}/{{ item.value }}</div>
    </header>
    <section>
      <div class="reward" v-for="(proitem,index) in awards">
        <div>
          <img v-if="proitem.type == '1'" :src="'404'" :alt="proitem.itemchinese" :title="proitem.itemchinese"
               @error="$LoadTintImage($event.target,proitem.itemicon,proitem.itemtint)">
          <img v-if="proitem.type == '2'" :src="'404'" :alt="proitem.itemchinese" :title="proitem.itemchinese"
               @error="$LoadTintImage($event.target,proitem.itemicon,proitem.itemtint)">
          <span v-if="proitem.type == '3'">{{ proitem.command }}</span>
          <img v-if="proitem.type == '5'" :src="'images/items/red-zs.png'">
          <img v-if="proitem.type == '4'" :src="'images/items/jf2.png'">
          <span>{{ proitem.count }}</span>
        </div>
      </div>
      <div class="btn b1" v-show="progressionComplateData>=item.value&&isGeted<=0" @click="pullGetProgreesion(item)">领取
      </div>
      <div class="btn b2" v-show="isGeted>0">已领取</div>
      <div class="btn b3" v-show="progressionComplateData<item.value">未完成</div>
    </section>
  </li>
</template>

<script>
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  name: "ActTaskItem",
  props: ["item"],
  methods: {
    pullGetProgreesion(item) {
      var ctx = this.ctx.appContext.config.globalProperties;
      console.log("执行获取红包", item);
      let args = {id: item.id + ""};
      axios.post("api/getPregressionAward", args).then(res => {
        if (res.data.respCode === "1") {
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
      this.$emit("loadTask");
    },
  },
  data() {
    return {
      ctx: {},
      awardList: [],
      awards: {},
      progressionComplateData: {},
      isGeted: 0
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    let args = {containerid: this.item.id + "", funcid: "2"};
    axios.post("api/getAwardInfo", args).then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.awards = JsonData;
      }
    });

    let gs = {ttype: this.item.progressionType + "", ptype: this.item.type + ""};
    axios.post("api/getProgressionProgress", gs).then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.progressionComplateData = JsonData;
        if (this.item.progressionType == 4) {
          this.progressionComplateData = (this.progressionComplateData / 3600).toFixed(2);
        }
        console.log(this.progressionComplateData);
      }
    });
    //getPregressionPull
    let aese = {id: this.item.id + ""};
    axios.post("api/getPregressionPull", aese).then(res => {
      if (res.data.respCode === "1") {
        this.isGeted = res.data.data
      }
    });
  }
}
</script>

<style scoped>

</style>
