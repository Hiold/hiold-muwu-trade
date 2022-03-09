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
            <header>{{item.desc}}</header>
            <div class="prize-name">
                <span class="tit">红包物品：</span>
                <span class="val" v-if="awards!=null&&awards.length===1">{{awards[0].itemchinese}}</span>
                <span class="val" v-if="awards!=null&&awards.length>1" @click="showAwards">点击查看奖励</span>
                <span class="val" v-if="awards==null||awards.length===0">无</span>
            </div>
            <div class="prize-num" v-if="awards!=null&&awards.length===1">
                <span class="tit">获得数量：</span>
                <span class="val">{{awards[0].count}}</span>
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
                console.log(ctx)
                ctx.Award(prizeArr);
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
