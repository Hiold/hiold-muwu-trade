<template>
  <section class="Activity-page">
    <!-- 专题区域、详细内容 -->
    <!-- 头部工具栏 -->
    <header class="head-tool">
      <h1>{{ $store.state.lotename }}</h1>
      <div class="lottery-num">
        <span class="tit">今日剩余可抽奖次数：</span>
        <span class="val-1">{{ $store.state.loted }}</span>
        <span class="val-2"> / {{ $store.state.lotLimit == "-1" ? "无限" : $store.state.lotLimit }}</span>
      </div>


      <div v-if="class1=='水果奇遇'" class="sort" @click="release"
           style="height: 50%; border-radius: 2rem; border: 1px solid rgb(180, 180, 180); box-shadow: none;">
        <div class="s-page" style="font-weight: normal;">点数提取</div>
      </div>

      <div v-if="class1=='水果奇遇'" class="sort" @click="charge"
           style="height: 50%; border-radius: 2rem; border: 1px solid rgb(180, 180, 180); box-shadow: none;">
        <div class="s-page" style="font-weight: normal;">点数充值</div>
      </div>

      <div class="back" v-if="istosign" title="返回" @click="goback()"></div>
    </header>

    <ActHb></ActHb>
    <ActTask :class1="class1" :class2="class2"></ActTask>
    <ActLottery></ActLottery>
    <ActSign></ActSign>

    <!--水果奇遇-->
    <div class="Act-number" style="padding-top: 4rem;border:none;">
      <SlotMachine></SlotMachine>
    </div>
  </section>
</template>

<script>
//导入样式
import '../../../../assets/style/activity/activity.css'
import '../../../../assets/style/activity/activity-nav.css'
import '../../../../assets/style/headTool.css'

import ShopMenuItem from '/src/components/Activity/MainBox/Activity/ActivityItem.vue'
import ShopItemDetails from "/src/components/Activity/MainBox/Activity/ActivityItemDetails.vue";
//引入juqery
import $ from 'jquery'
import axios from "axios";
import {ElMessage} from "element-plus";
import {getCurrentInstance} from "vue";
import ActHb from "./ActHb.vue";
import ActTask from "./ActTask.vue";
import ActLottery from "./ActLottery.vue";
import ActSign from "./ActSign.vue";
import SlotMachine from "../../../SlotMachine.vue";

export default {
  watch: {
    class1: {
      handler(newName, oldName) {
        if (newName != oldName) {
          console.log("监听到变化" + newName);
        }
      },
      immediate: true
    },
    class2: {
      handler(newName, oldName) {
        if (newName != oldName) {
          console.log("监听到变化" + newName);
        }
      }
    }
  },
  name: "ShopContent",
  props: ["class1", "class2"],
  components: {
    SlotMachine,
    ActSign,
    ActLottery,
    ActTask,
    ActHb,
    "shop-item": ShopMenuItem,
    "shop-item-details": ShopItemDetails
  },
  data() {
    return {
      ctx: {},
      istosign: false,
    }
  },
  methods: {
    charge() {
      var self = this;
      var ctx = this.ctx.appContext.config.globalProperties;
      $("#alert").fadeIn(100);	//显示弹窗主体页面
      $("#alert>.charge").show();	//显示提示窗口
      $("#alert>.charge>header>span").html("点数充值");
      $("#alert>.charge>footer>.close").click(function () {	//自定义弹窗 : 点击取消
        //console.log("关闭了弹窗");
        $("#alert,#charge>div").hide();
      });
      $("#alert>.charge>header>i").click(function () {	//自定义弹窗 : 右上角关闭
        $("#alert>.charge>footer>.close").click();
      });
      //确认充值
      $(".charge>footer>.confirm").unbind("click");
      $(".charge>footer>.confirm").click(function () {
        $("#alert,#charge>div").hide();
        console.log("充值倍率为:" + self.$store.state.slotmachinerete);
        var buyParam = {"count": "" + (parseInt($("#alert>.charge>section>.price>.val>input").val()) / self.$store.state.slotmachinerete) + ""};
        axios.post("api/ChargeSGJPoint", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ctx.Alert("充值成功！");
            self.$store.state.points += (parseInt($("#alert>.charge>section>.price>.val>input").val()) / self.$store.state.slotmachinerete) * 100;
            ctx.loadUserInfo();
            ctx.popupCss(25, 14);
          } else {
            ctx.Alert("充值失败！" + res.data.respMsg);
          }
        });
      });


      //出售物品窗口 增加按钮
      $("#alert>.charge>section>div>.val>.add").unbind("click");
      $("#alert>.charge>section>div>.val>.add").click(function () {
        var num = $(this).prev().val() * 1;
        num += 100;
        $(this).prev().val(num);
        $("#alert>.charge>section>.price>.val>input").val(num * (self.$store.state.slotmachinerete/100));
      });
      //出售物品窗口 减少按钮
      $("#alert>.charge>section>div>.val>.reduce").unbind("click");
      $("#alert>.charge>section>div>.val>.reduce").click(function () {
        var num = $(this).next().val() * 1;
        num -= 100;
        if (num <= 0) {		//填入的数字至少为1
          num = 100;
        }
        $(this).next().val(num);
        $("#alert>.charge>section>.price>.val>input").val(num * (self.$store.state.slotmachinerete/100));
      });

    },
    release() {
      var self = this;
      var ctx = this.ctx.appContext.config.globalProperties;
      $("#alert").fadeIn(100);	//显示弹窗主体页面
      $("#alert>.charge").show();	//显示提示窗口
      $("#alert>.charge>header>span").html("点数提取");
      $("#alert>.charge>footer>.close").click(function () {	//自定义弹窗 : 点击取消
        //console.log("关闭了弹窗");
        $("#alert,#charge>div").hide();
      });
      $("#alert>.charge>header>i").click(function () {	//自定义弹窗 : 右上角关闭
        $("#alert>.charge>footer>.close").click();
      });
      //确认充值
      $(".charge>footer>.confirm").unbind("click");
      $(".charge>footer>.confirm").click(function () {
        $("#alert,#charge>div").hide();
        var buyParam = {"count": "" + (parseInt($("#alert>.charge>section>.price>.val>input").val()) / self.$store.state.slotmachinerete) + ""};
        axios.post("api/ReleaseSGJPoint", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ctx.Alert("提取成功！");
            self.$store.state.points -= (parseInt($("#alert>.charge>section>.price>.val>input").val()) / self.$store.state.slotmachinerete) * 100;
            ctx.popupCss(25, 14);
            ctx.loadUserInfo();
          } else {
            ctx.Alert("充值失败！" + res.data.respMsg);
          }
        });
      });


      //出售物品窗口 增加按钮
      $("#alert>.charge>section>div>.val>.add").unbind("click");
      $("#alert>.charge>section>div>.val>.add").click(function () {
        console.log(self.$store.state.slotmachinerete/100);
        var num = $(this).prev().val() * 1;
        num += 100;
        $(this).prev().val(num);
        $("#alert>.charge>section>.price>.val>input").val(num * (self.$store.state.slotmachinerete/100));
      });
      //出售物品窗口 减少按钮
      $("#alert>.charge>section>div>.val>.reduce").unbind("click");
      $("#alert>.charge>section>div>.val>.reduce").click(function () {

        console.log(self.$store.state.slotmachinerete/100);

        var num = $(this).next().val() * 1;
        num -= 100;
        if (num <= 0) {		//填入的数字至少为1
          num = 100;
        }
        $(this).next().val(num);
        $("#alert>.charge>section>.price>.val>input").val(num * (self.$store.state.slotmachinerete/100));
      });
    },
    goback() {
      window.history.go(-1);
    },
    initLotteryList() {
      var ctx = this.ctx.appContext.config.globalProperties;
      const $bus = ctx.$bus
      let params = {itemname: ""};
      axios.post("api/getLottery", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.lotteryList = JsonData;
          var items = [];
          for (var i in this.lotteryList) {
            var st = {name: this.lotteryList[i].desc, data: this.lotteryList[i].id};
            items.push(st);
          }
          if (this.lotteryList != null && this.lotteryList.length > 0) {
            this.loadAward(this.lotteryList[0].id);
            this.selectedLotteryId = this.lotteryList[0].id;
          }
          $bus.emit('setlottert', items);
        }
      });
    }

  }
  , mounted() {
    this.ctx = getCurrentInstance();
    $(".head-tool>.lottery-num").show();
    const $bus = getCurrentInstance().appContext.config.globalProperties.$bus
    $(".Category>div>ul").click(function () {		//左侧分类按钮点击特效
      $(".Category>div>ul").css({		//让所有分类按钮样式还原默认
        "transform": "scale(1)",
        "opacity": "0.8",
        "border-radius": "1rem",
        "margin": "0.5em auto"
      });
      $(this).css({		//给正在点击的按钮增加样式
        "transform": "scale(1.1)",
        "opacity": "1",
        "border-radius": "0.1rem",
        "margin": "0.8em auto"
      });
      // $(".Category>div>ul").data("click", "false");
      // $(this).data("click", "true");
      // // $(".Category>div>li").slideUp(100);	//隐藏所有子分类
      // $(".head-tool>.lottery-num").hide();

      $(".Activity-page>div").hide();		//隐藏所有活动页面
      var dc = $(this).data("click");		//获取当前分类下的子分类展开状态
      var xb = $(this).attr("class").split("-")[1];	//从类名中获取序号
      console.log(dc, xb);
      if (dc == "false" || dc == undefined) {	//情况1:如果子分类为隐藏
        $(".Category>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".Category>div>li[class^='b" + xb + "']").slideDown(200);	//展开当前子分类
        $(".Category>div>ul").data("click", "false");
        $(this).data("click", "true");	//将展开状态设置为"展开"
        $bus.emit('setclass1', $(this).find("div").text());
        //alert("展开总分类："+class1)
        $(this).next().click();		//默认显示当前总分类下第一个子分类的内容
        //console.log("总分类："+xb);
      } else if (dc == "true" || dc == true) {		//情况2:如果子分类为展开
        $(".Category>div>li").slideUp(100);	//隐藏所有分组的子分类
        $(this).data("click", "false");	//将展开状态设置为"隐藏"
      }
      return;
      //$(".Category>div>li[class$='t0']").click();	//默认显示第一个子分类的内容

    });

    $(".Category>div>ul").hover(function () {		//左侧分类按钮悬浮特效
      var ck = $(this).data("click");
      if (ck != "true") {
        $(this).css({		//给正在点击的按钮增加样式
          "transform": "scale(1.05)",
          "opacity": "0.9"
        });
      }
    }, function () {
      var ck = $(this).data("click");
      if (ck != "true") {
        $(this).css({		//给正在点击的按钮增加样式
          "transform": "scale(1)",
          "opacity": "0.8"
        });
      }
    });
    var navColor = [	//子分类背景颜色
      ["rgb(232, 206, 185), rgba(254, 208, 171, 0.2)"],
      ["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
      ["rgb(254, 227, 171), rgba(255, 255, 255, 0.2)"],
      ["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"]
    ]
    $(".Category").on("click", "li", function () {		//子分类点击特效
      var xb = $(this).attr("class").split("")[1];	//获取序号
      $(".Category>li[class^='b" + xb + "']").css({"background": "none", "box-shadow": "none"});	//清除同组子分类的样式
      $(this).css({	//设置当前子分类样式
        "background": "radial-gradient(" + navColor[xb - 1] + ")",
        "box-shadow": "0 0 0.1rem white"
      });
      $(".Category>li[class^='b" + xb + "']").data("click", "false");
      $(this).data("click", "true");
    });
    $(".Category").on("mouseenter", "li", function () {	//子分类移入特效
      var xb = $(this).attr("class").split("")[1];
      var dc = $(this).data("click");
      if (dc == "false" || dc == undefined) {
        $(this).css({
          "background": "radial-gradient(" + navColor[xb - 1] + ")",
          "box-shadow": "0 0 0.1rem white"
        });
      }
    });
    $(".Category").on("mouseout", "li", function () {	//子分类移出特效
      var xb = $(this).attr("class").split("")[1];
      var dc = $(this).data("click");
      if (dc == "false" || dc == undefined) {
        $(this).css({"background": "none", "box-shadow": "none"});
      }
    });


    $(".Category>div>.btn-1").click(function () {	//定时抢红包 按钮
      console.log("定时抢红包");
      $(".head-tool>h1").text("定时抢红包");
      $(".head-tool>.lottery-num").hide();
      $(".Act-hb").fadeIn(200);
    });
    $(".Category>div>.btn-2").click(function () {	//活动任务 按钮
      $(".head-tool>.lottery-num").hide();
      console.log("每日任务");
      $(".head-tool>h1").text("每日任务");
      // $("li[class^=b2]").slideDown(100);
      $(".Act-task").fadeIn(200);
      $(".Category>div>.b2-t0").click();
    });
    $(".Category>div>.btn-3").click(function () {	//幸运抽奖 按钮
      console.warn("积分抽奖");
      $(".head-tool>h1").text("积分抽奖");
      $(".head-tool>.lottery-num").show();
      // $("li[class^=b3]").slideDown(100);
      $(".Act-lottery").fadeIn(200);
      $(".Category>div>.b3-t0").click();
    });
    $(".Category>div>.btn-4").click(function () {	//数字谜团 按钮
      $(".head-tool>.lottery-num").hide();
      console.log("数字谜团");
      $(".head-tool>h1").text("水果奇遇");
      $(".Act-number").fadeIn(200);
    });
    $(".Category>div>.btn-5").click(function () {	//每日签到 按钮
      $(".head-tool>.lottery-num").hide();
      console.log("七日签到领好礼");
      $(".head-tool>h1").text("七日签到领好礼");
      $(".Act-qd").fadeIn(200);
    });


    //活动任务 下的子分类
    $(".Category>div>.b2-t0").click(function () {	//每日任务
      $(".task-day").show();
      // $(".task-main").hide();
      $(".head-tool>h1").text("主线任务");
    });
    $(".Category>div>.b2-t1").click(function () {	//每日任务
      $(".task-day").show();
      // $(".task-main").hide();
      $(".head-tool>h1").text("主线任务");
    });
    $(".Category>div>.b2-t2").click(function () {	//主线任务
      $(".task-day").show();
      // $(".task-main").show();
      $(".head-tool>h1").text("每日任务");
    });
    $(".Category>div>.b2-t3").click(function () {	//主线任务
      $(".task-day").show();
      // $(".task-main").show();
      $(".head-tool>h1").text("每周任务");
    });
    //判断是否跳转到签到页面
    if (window.location.href.indexOf("tosign") > 0) {
      $(".Category>div>.btn-4").click();
      this.istosign = true;
    }
  }
}
</script>

<style scoped>

</style>
