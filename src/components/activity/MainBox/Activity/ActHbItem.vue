<template>
    <li>
        <div class="left">
            <div class="open-time">{{ item.timestart == "" ? "即刻起" : item.timestart }} 至
                {{ item.timeend == "" ? "全天有效" : item.timeend }}
            </div>
            <div class="prize-icon">
                <img :src="'images/ItemIcons/decoPumpkinJackOLantern.png'">
            </div>
            <!-- <div class="btn b1">未开始</div>-->
            <!-- <div class="btn b2">抢红包</div>-->
            <!-- <div class="btn b3">已领取</div>-->
            <div :class="hbClass" @click="()=>{if(hbAvaliable){pullGetHb(item)}}">{{hbNotice}}</div>
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
                hbClass: "",
                hbNotice: "",
                hbAvaliable: false,
            }
        },
        methods: {
            pullGetHb(item) {
                var ctx = this.ctx.appContext.config.globalProperties;
                console.log("执行获取红包", item);
                let args = {id: item.id + ""};
                axios.post("api/pullDailyAward", args).then(res => {
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
                        this.hbClass = "btn b3";
                        this.hbNotice = "已领取";
                        this.hbAvaliable = false;
                        ctx.Award(awardData, "获得如下奖励", "物品已存入个人仓库", "确认", null);
                    } else {
                        ctx.Alert(res.data.respMsg);
                    }
                });
                //调用重新加载方法
                this.$emit("initTableData");
            },
            handleStatus(item) {
                // <div class="btn b1">未开始</div>
                // <div class="btn b2">抢红包</div>
                // <div class="btn b3">已领取</div>
                // <div class="btn b4">已过期</div>
                //1970-01-01 08:00:00
                var _start = "";
                var _end = "";
                if (!item.startdate || item.startdate === "") {
                    _start += "1970-01-01";
                } else {
                    _start += item.startdate;
                }
                if (!item.enddate || item.enddate === "") {
                    _end += "9999-01-01";
                } else {
                    _end += item.enddate;
                }
                if (!item.timestart || item.timestart === "") {
                    _start += " 00:00:00";
                } else {
                    _start += " " + item.timestart;
                }
                if (!item.timeend || item.timeend === "") {
                    _end += " 23:59:59";
                } else {
                    _end += " " + item.timeend;
                }
                var sDate = new Date(_start);
                var eDate = new Date(_end);
                // console.log(_start, _end, sDate, eDate);
                var now = new Date();
                if (now.getTime() > sDate.getTime() && now.getTime() < eDate.getTime()) {
                    this.hbClass = "btn b2";
                    this.hbNotice = "抢红包";
                    this.hbAvaliable = true;
                } else if (now.getTime() < sDate.getTime()) {
                    this.hbClass = "btn b1";
                    this.hbNotice = "未开始";
                } else if (now.getTime() > eDate.getTime()) {
                    this.hbClass = "btn b4";
                    this.hbNotice = "已过期";
                }

            },
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
            this.handleStatus(this.item);
            this.ctx = getCurrentInstance();
            let args = {containerid: this.item.id + "",funcid: "1"};
            axios.post("api/getAwardInfo", args).then(res => {
                if (res.data.respCode === "1") {
                    let JsonData = res.data.data;
                    this.awards = JsonData;
                }
            });
            //领取日志
            let pa = {id: this.item.id + ""};
            axios.post("api/getDailyAwardLog", pa).then(res => {
                if (res.data.respCode === "1") {
                    if (this.item.type == "1") {
                        for (var i in res.data.data) {
                            var ct = res.data.data[i];
                            if (new Date(ct.actTime).getTime() > getToday().getTime()) {
                                this.hbClass = "btn b3";
                                this.hbNotice = "已领取";
                                this.hbAvaliable = false;
                            }
                        }
                    } else if (this.item.type == "2") {
                        if (res.data.data.length > 0) {
                            this.hbClass = "btn b3";
                            this.hbNotice = "已领取";
                            this.hbAvaliable = false;
                        }
                    }

                }
            });

            function getToday() {
                var today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                return today;
            }
        }
    }
</script>

<style scoped>

</style>
