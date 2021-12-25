<template>
  <div id="box">
    <!--alert弹窗common-->
    <alert-common :couProps="couProps"></alert-common>

    <left-container-box :itemMenu="itemMenu" :class1="class1" :class2="class2"></left-container-box>
    <right-container-box></right-container-box>
  </div>
</template>

<script>
import LeftContainerBox from "/src/components/shop/LeftContainerBox.vue";
import RightMenuBox from "/src/components/shop/RightMenuBox.vue";
import AlertCommon from "/src/components/AlertCommon.vue";
//引入juqery
import $ from 'jquery'

export default {
  name: "IndexMainContainer",
  data() {
    return {
      class1: "活动折扣",
      class2: "全部",
      couProps: [{
        couCurr: "积分",
        couType: "折扣",
        couPrice: "8",
        couCond: "100",
        couDate: "2021-12-31",
        id: "1",
        count: "10"
      }, {
        couCurr: "积分",
        couType: "满减",
        couPrice: "8",
        couCond: "100",
        couDate: "2021-12-31",
        id: "2",
        count: "10"
      }],
      itemMenu: [
        {
          category: "活动折扣", items: [
            {name: "全部", data: "全部"},
            {name: "物块模型", data: "物块模型"},
            {name: "物品资源", data: "物品资源"},
            {name: "特殊商品", data: "特殊商品"}
          ]
        },
        {
          category: "物块模型", items: [
            {name: "全部", data: "全部"},
            {name: "建筑物块", data: "建筑物块"},
            {name: "家具装饰", data: "家具装饰"},
            {name: "户外植物", data: "户外植物"},
            {name: "地形块 ", data: "地形块 "},
            {name: "建造拆除", data: "建造拆除"},
            {name: "搜刮奖励", data: "搜刮奖励"},
            {name: "等级设计", data: "等级设计"}
          ]
        },
        {
          category: "本服专属", items: [
            {name: "全部", data: "全部"},
            {name: "物块模型", data: "物块模型"},
            {name: "物品资源", data: "物品资源"}
          ]
        },
        {
          category: "特殊商品", items: [
            {name: "全部", data: "全部"},
            {name: "货币兑换", data: "货币兑换"},
            {name: "礼包抽奖", data: "礼包抽奖"},
            {name: "专属服务", data: "专属服务"},
            {name: "抵用券 ", data: "抵用券 "},
            {name: "其它", data: "其它"}
          ]
        },
        {
          category: "钻石商城", items: [
            {name: "全部", data: "全部"},
            {name: "物块模型", data: "物块模型"},
            {name: "物品资源", data: "物品资源"},
            {name: "特殊商品", data: "特殊商品"}
          ]
        }
      ]
    }
  },
  components: {
    'left-container-box': LeftContainerBox,
    'right-container-box': RightMenuBox,
    'alert-common': AlertCommon
  },
  methods: {
    adaptive() {
      var Width, Height;	//浏览器窗口宽度和高度//自适应布局（任何设备上保持等比例显示）
      Width = $(window).width();
      Height = $(window).height();
      $("html").css("font-size", Width / 80 + "px");	//让文本大小跟随设备的宽度进行等比例自动调整
      //下面是强制让手机横屏显示
      if (window.orientation === 180 || window.orientation === 0) {
        $("html").css("font-size", Height / 80 + "px");
        console.log('竖屏状态！---Width=' + Width + "---Height=" + Height + "----Box-Height=" + $("#shop").height() + "----Box-Width=" + $("#shop").width());
        $("#shop").css({
          "width": Height + "px", "height": Width + "px",
          "transform": "translateY(" + Height + "px) rotate(-90deg)"
        });
      }
      if (window.orientation === 90 || window.orientation === -90) {
        console.log('横屏状态！---Width=' + Width + "---Height=" + Height);
        $("#shop").css({
          "width": Width + "px", "height": Height + "px",
          "transform": "translateY(0px) rotate(0deg)"
        });
      }

      //下面是自动调整文本行高和部分块元素的宽度
      var h1 = $(".test").height();
      var h2 = $(".game-head").height();
      var h3 = $("main>header").height();
      var h4 = $("main>header>.Diamond").height();
      var h5 = $(".head-tool>.display>li").height();
      var h7 = $(".items-shop>.items>header").height();
      var h8 = $(".items-shop>.items>header>i").height();
      var h9 = $(".items-shop>.items>footer").height();
      var h10_1 = $(".items-details").height();
      var h10_2 = $(".spxq").height();
      var h10_3 = h10_1 - h10_2 - 20;
      var h11_1 = $(".ware-details").height();
      var h11_2 = $(".ware-details>header").height();
      var h11_3 = $(".ware-details>section").height();
      var h11_4 = h11_1 - h11_2 - h11_3 - 12;
      var h12_1 = $(".terr-shop").height();
      var h12_2 = $(".terr-shop>header").height();
      var h12_3 = h12_1 - h12_2 - 2;
      var h12_4 = $(".order-record").height();
      var h12_5 = $(".order-record>header").height();
      var h12_6 = h12_4 - h12_5 - 2;
      var h13_1 = $(".page-items").height();
      var h13_2 = $(".page-items>header").height();
      var h13_3 = h13_1 - h13_2 - 2;
      var h14_1 = $(".work-recipe").height();
      var h14_2 = $(".work-recipe>header").height();
      var h14_3 = h14_1 - h14_2 - 1;
      var h15_1 = $(".work-page").height();
      var h15_2 = h15_1 - h14_1 - 8;
      var h16 = $(".craftable-items").height();
      var h17 = $(".my-shop").height();
      var h17_1 = $(".my-shop>header").height();
      var h17_2 = $(".header-tool").height();
      var h17_3 = h17 - h17_1 - h17_2 - 0;
      var h17_4 = $(".my-shop>section>nav").height();
      var h17_5 = h17_3 - h17_4 - 20;
      var h18_1 = $(".buying>.content").height();
      var h18_2 = $(".buying>.content>.image").height();
      var h18_3 = $(".buying>.content>.name").height();
      var h18_4 = h18_1 - h18_2 - h18_3 - 10;
      var h18_5 = $(".buying>.content>.foot>.price").height();
      var h18_6 = h18_4 - h18_5 - 50;
      var h19_1 = $(".Act-qd>.left>li>.day").height();
      var h19_2 = $(".Act-qd>.left>li>.name").height();
      var h20_1 = $(".Act-qd>.right>li>.day").height();
      var h20_2 = $(".Act-qd>.right>li>.name").height();

      var w1 = $(".Main-menu>.min>div").width();


      $(".test").css("line-height", h1 + "px");
      $("main>header>.game-head,main>header>.seting>.set,main>header>.seting>.skin,main>header>.seting>.mail").css("width", h2 + "px");
      $("main>header>.Diamond>i,main>header>.Point>i").css("width", h2 + "px");
      $("main>header").css("line-height", h3 + "px");
      $("main>header>.Diamond,main>header>.Point").css("line-height", h4 + "px");
      $(".head-tool>.display>li").css({"line-height": h5 + "px"});
      //$(".head-tool>.sort").css({"line-height":h6+"px"});
      $(".items-shop>.items>header").css({"line-height": h7 + "px"});
      $(".items-shop>.items>header>i,.items-shop>.items>header>.follow,.items-shop>.items>footer>.active").css({"line-height": h8 + "px"});
      $(".items-shop>.items>footer").css({"line-height": h9 + "px"});
      $(".items-details>.bottom").css({"height": h10_3 + "px"});
      $(".ware-details>footer").css({"height": h11_4 + "px"});
      $(".terr-shop>section").css({"height": h12_3 + "px"});
      $(".order-record>section").css({"height": h12_6 + "px"});
      $(".page-items>section").css({"height": h13_3 + "px"});
      $(".work-recipe>.left,.work-recipe>.right").css({"height": h14_3 + "px"});
      $(".work-desc,.work-page>.slots").css({"height": h15_2 + "px"});
      $(".craftable-items").css({"line-height": h16 + "px"});
      $(".craftable-items>i").css({"width": h16 + "px"});
      $(".my-shop>section").css({"height": h17_3 + "px"});
      $(".my-shop .sitems-list").css({"height": h17_5 + "px"});
      $(".buying>.content>.foot").css({"height": h18_4 + "px"});
      $(".buying>.content>.foot>.desc").css({"height": h18_6 + "px"});
      $(".Act-qd>.left>li>.day").css({"line-height": h19_1 + "px"});
      $(".Act-qd>.left>li>.name").css({"line-height": h19_2 + "px"});
      $(".Act-qd>.right>li>.day").css({"line-height": h20_1 + "px"});
      $(".Act-qd>.right>li>.name").css({"line-height": h20_2 + "px"});

      $(".Main-menu>.min>div").css("height", w1 * 1 + "px");
    }, ready() {
      var self = this;
      setTimeout(function () {	//页面加载完成后50毫秒默认调用自适应布局函数
        self.adaptive();
        //lastView(class1,class2);
      }, 50);
      $(window).resize(function () {	//当页面大小发生改变时调用自适应布局函数
        self.adaptive();
      });
      $(window).on("orientationchange", function () {	//当手机重力发生改变，调用自适应布局函数
        self.adaptive();
      });
      $("html").mousemove(function () {		//鼠标在页面任意移动时调用自适应布局函数
        self.adaptive();
      });
      //下面是自定义弹窗通用按钮事件
      $("#alert>.alert>footer>.close").click(function () {	//自定义弹窗 : 点击取消
        //console.log("关闭了弹窗");
        $("#alert>.alert>section>p").html("");	//清空文本提示内容
        $("#alert,#alert>div").hide();
      });
      $("#alert>.alert>header>i").click(function () {	//自定义弹窗 : 右上角关闭
        $("#alert>.alert>footer>.close").click();
      });
      $(".alert-buy>footer>.close").click(function () {	//自定义弹窗(订单详情) : 点击取消
        $("#alert,#alert>div").hide();
      });
      $(".alert-buy>header>i").click(function () {	//自定义弹窗(订单详情) : 右上角关闭
        $(".alert-buy>footer>.close").click();
      });
      //奖品弹窗关闭按钮
      $("#alert>.alert-award>footer>div").click(function () {	//抽奖后确认领取按钮（点击后关闭提示窗口）
        $("#alert,#alert>div").hide();
      });
      $("#alert>.alert-award>header>i").click(function () {		//右上角小叉叉（功能同上）
        $("#alert,#alert>div").hide();
      });
      //弹窗测试（点击左上角游戏log时触发）
      //$("main>header>.game-head").click(function(){
      //Prompt("提示框测试",520);
      //$("#alert,#alert>.alert-award").show();
      //Alert("请输入正确的数量！");
      //$("#alert>.alert>footer>.confirm").unbind("click");
      //$("#alert>.alert>footer>.confirm").click(function(){
      //$("#alert>.alert>section>p").html("");	//清空文本提示内容
      //$("#alert").hide();
      //console.log("点击了确认");
      //});
      //$("#alert,.alert-buy").show();
      //});

    }
  },
  mounted() {
    this.ready();
  }
}
</script>

<style>
main > header {
  width: 100%;
  height: 8%;
  box-sizing: border-box;

}

main > header > .game-head {
  float: left;
  height: 70%;
  background: url('../assets/images/7dtdhead.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 0.5em;
  margin: 0.8%;
  margin-left: 2%;
}

main > header > .title {
  font-size: 1.2em;
  color: gray;
  padding-left: 0.2em;
  font-weight: bold;
}

main > header > .seting {
  float: right;
  width: 10em;
  height: 70%;
  margin: 0.8%;
  box-sizing: border-box;

}

main > header > .seting > div {
  float: right;
  height: 100%;
  margin: 0.8%;
  margin-left: 3%;
  box-sizing: border-box;
  background-size: cover;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.2s;
}

main > header > .seting > div:hover {
  opacity: 1;
}

main > header > .seting > .set {
  background-image: url(../assets/images/icon/set.png);
  transform: scale(0.7);
}

main > header > .seting > .set:hover {
  transform: translateY(-0.2em) scale(0.78) rotate(90deg);
}

main > header > .seting > .skin {
  background-image: url(../assets/images/icon/skin.png);
  transform: scale(0.85);
}

main > header > .seting > .skin:hover {
  transform: translateY(-0.2em) scale(0.9);
}

main > header > .seting > .mail {
  background-image: url(../assets/images/icon/mail.png);
  background-position-y: 0.1em;
  transform: scale(0.9);
}

main > header > .seting > .mail:hover {
  transform: translateY(-0.2em) scale(0.95);
}

main > header > .Diamond, main > header > .Point {
  box-sizing: border-box;
  float: right;
  width: 12em;
  height: 70%;
  margin: 0.8%;
  cursor: pointer;
}

main > header > .Diamond > i {
  display: inline-block;
  height: 100%;
  background-image: url(../assets/images/icon/red-zs.png);
  background-size: cover;
  transform: scale(0.75);
}

main > header > .Diamond > span {
  display: inline-block;
  color: rgb(249, 102, 112);
  font-weight: bold;
  font-size: 1.3em;
}

main > header > .Point > i {
  display: inline-block;
  height: 100%;
  background-image: url(../assets/images/icon/jf2.png);
  background-size: cover;
  transform: scale(0.75);
}

main > header > .Point > span {
  display: inline-block;
  color: orange;
  font-weight: bold;
  font-size: 1.3em;
}

</style>
