<template>
  <nav class="Trade-ware">
    <!-- 侧边导航栏、分类 -->
    <div class="title">༺ཌ 交易中心 ད༻</div>
    <shop-mune-item v-for="(item,index) in itemMenu" :menuitem="item.items" :menuindex="index"
                    :menucategory="item.category" :key="item.category"></shop-mune-item>
  </nav>
</template>

<script>
//导入样式
import '../../../../assets/style/trade/trade.css'
import '../../../../assets/style/trade/trade-nav.css'
import '../../../../assets/style/headTool.css'
//引入juqery
import $ from 'jquery'
import ShopMenuItem from '/src/components/shop/MainBox/Shop/ShopMenuItem.vue'
import {getCurrentInstance} from 'vue'

export default {
  components: {"shop-mune-item": ShopMenuItem},
  name: "ShopMeuu",
  props: ["class1", "class2", "itemMenu"],
  data() {
    return {}
  },
  methods: {
    ready() {
      const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

      $(".Trade-ware>div>ul").click(function () {		//左侧分类按钮点击特效
        $(".Trade-ware>div>ul").css({		//让所有分类按钮样式还原默认
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
        $(".Trade-ware>div>ul").data("click", "false");
        $(this).data("click", "true");
        $(".player-order").hide();
      });
      $(".Trade-ware>div>ul").hover(function () {		//左侧分类按钮悬浮特效
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
        ["rgb(254, 227, 171), rgba(254, 208, 171, 0.2)"],
        ["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
        ["rgb(232, 206, 185), rgba(255, 255, 255, 0.2)"],
        ["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"],
        ["rgb(200, 200, 255), rgba(255, 255, 255, 0.2)"],
        ["rgb(255, 160, 160), rgba(255, 255, 255, 0.2)"]
      ]

      //子分类点击特效+生成商品
      $(".Trade-ware>div>li").click(function () {
        // console.log($(this).attr("data"));
        $(".head-tool .name-id").val("");
        $(".items-details").hide();
        $(".items-box,.head-tool").show();
        var xb = $(this).attr("class").split("")[1];	//获取序号
        // console.log("序号:"+xb)
        $(".Trade-ware>div>li[class^='b" + xb + "']").css({"background": "none", "box-shadow": "none"});	//清除同组子分类的样式
        $(this).css({	//设置当前子分类样式
          "background": "radial-gradient(" + navColor[xb - 1] + ")",
          "box-shadow": "0 0 0.1rem white"
        });
        //$(".Category>div>li[class^='b"+xb+"']").data("click","false");
        $(".Trade-ware>div>li").data("click", "false");
        $(this).data("click", "true");
        // self.class2 = $(this).text();	//获取当前点击的子分类名称
        $bus.emit('setclass2', $(this).attr("data"));
        console.log("值为:" + $(this).attr("data"))
        //console.log("子分类："+xb);
        // self.changeColor(xb);
        //$(".items-details").fadeOut(200);
        //$(".items-details").hide();
        //$(".items-shop,section>.head-tool").show();
        //alert("点击子分类："+class2);
      });


      $(".Trade-ware>div>.btn-1").click(function () {	//我的店铺
        $(".Trade-ware>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".my-shop").show();	//显示店铺详情页面
        $(".player-store,.player-com,.buying").hide();	//隐藏其它不相关页面
        $(".my-shop>header>.back").hide();	//隐藏返回按钮
        //隐藏头部工具栏及相关功能
        $(".head-tool,.head-tool>.serch,.head-tool>.sort,.head-tool>.refresh,.head-tool>.back").hide();
        // GeneratePStore(playerIndex, "出售");	//生成我的商品
        $(".my-shop>section>nav>.sell").click();	//点击'收东西'按钮
        //$(".head-tool>h1").text("我的店铺");
        //$(".head-tool>.serch").hide();
        $(".my-shop>header>.right,.my-shop>header>.edit").css("float", "right");
        $bus.emit('setclass1', "我的店铺");
      });


      $(".Trade-ware>div>.btn-2").click(function () {	//玩家店铺
        $(".Trade-ware>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".player-store").show();	//显示玩家店铺列表
        $(".my-shop,.player-com,.buying").hide();	//隐藏其它不相关页面
        $(".head-tool").show();	//显示头部工具栏
        $(".head-tool>h1").text("玩家店铺");	//头部标题命名为'玩家店铺'
        $(".head-tool>.serch").show();	//显示搜索框
        $(".head-tool>.serch>input").attr("placeholder", "请输入玩家或店铺名称");
        $(".head-tool>.serch>input").val("");
        $(".head-tool>.sort").show();	//显示排序方式
        $(".head-tool>.sort").find(".s-page").text('默认排序');
        $(".head-tool>.sort").find(".t1").text('默认排序');
        $(".head-tool>.sort").find(".t2").text('等级高到低');
        $(".head-tool>.sort").find(".t3").text('积分高到低');
        $(".head-tool>.sort").find(".t4").show().text("获赞高到低");
        $(".head-tool>.sort").find(".t5").show().text("销售额高到低");
        $(".head-tool>.refresh").show();	//显示刷新按钮
        $(".head-tool>.back").hide();	//隐藏返回按钮
        GenerateStoreList();	//生成玩家店铺列表
        $(".my-shop>header>.right,.my-shop>header>.edit").css("float", "left");
        // nowPage = "玩家店铺";
        $bus.emit('setclass1', "玩家店铺");
      });

      $(".Trade-ware>div>.btn-3").click(function () {	//玩家售卖区
        $(".Trade-ware>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".player-com").show();	//显示玩家售卖区页面
        $(".player-store,.my-shop,.buying").hide();	//隐藏其它不相关页面
        $(".head-tool").show();	//显示头部工具栏
        $(".head-tool>h1").text("玩家售卖区");	//头部标题命名为'玩家店铺'
        $(".head-tool>.serch").show();	//显示搜索框
        $(".head-tool>.serch>input").attr("placeholder", "请输入物品名称或ID");
        $(".head-tool>.serch>input").val("");
        $(".head-tool>.sort").show();	//显示排序按钮
        $(".head-tool>.sort").find(".s-page").text('默认排序');
        $(".head-tool>.sort").find(".t1").text('默认排序');
        $(".head-tool>.sort").find(".t2").text('价格高到低');
        $(".head-tool>.sort").find(".t3").text('价格低到高');
        $(".head-tool>.sort").find(".t4").hide();
        $(".head-tool>.sort").find(".t5").hide();
        $(".head-tool>.refresh").hide();	//隐藏刷新按钮
        $(".head-tool>.back").hide();		//隐藏返回按钮
        $(".player-com>.empty").hide();	//隐藏没有搜索到物品的提示信息
        // nowPage = "玩家售卖区";
        $bus.emit('setclass1', "玩家售卖区");
        // pst = "出售";
        $bus.emit('setclass2', "出售");
        $(".Trade-ware>div>li[class^='b" + 3 + "']").slideDown(200);	//展开当前子分类
        GeneratePlayerCom("出售");
      });

      $(".Trade-ware>div>.btn-4").click(function () {	//玩家求购区
        $(".Trade-ware>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".player-com").show();	//显示玩家售卖区页面
        $(".player-store,.my-shop,.buying").hide();	//隐藏其它不相关页面
        $(".head-tool").show();	//显示头部工具栏
        $(".head-tool>h1").text("玩家求购区");	//头部标题命名为'玩家店铺'
        $(".head-tool>.serch").show();	//显示搜索框
        $(".head-tool>.serch>input").attr("placeholder", "请输入物品名称或ID");
        $(".head-tool>.serch>input").val("");
        $(".head-tool>.sort").show();	//显示排序按钮
        $(".head-tool>.sort").find(".s-page").text('默认排序');
        $(".head-tool>.sort").find(".t1").text('默认排序');
        $(".head-tool>.sort").find(".t2").text('价格高到低');
        $(".head-tool>.sort").find(".t3").text('价格低到高');
        $(".head-tool>.sort").find(".t4").hide();
        $(".head-tool>.sort").find(".t5").hide();
        $(".head-tool>.refresh").hide();	//隐藏刷新按钮
        $(".head-tool>.back").hide();		//隐藏返回按钮
        $(".player-com>.empty").hide();	//隐藏没有搜索到物品的提示信息
        // nowPage = "玩家求购区";
        // pst = "求购";
        $bus.emit('setclass1', "玩家求购区");
        $bus.emit('setclass2', "求购");
        $(".Trade-ware>div>li[class^='b" + 4 + "']").slideDown(200);	//展开当前子分类
        GeneratePlayerCom("求购");
      });

      $(".Trade-ware>div>.btn-5").click(function () {	//物资求购
        $(".Trade-ware>div>li").slideUp(100);	//先隐藏所有分组的子分类
        $(".head-tool").show();	//显示头部工具栏
        $(".head-tool>h1").text("物资求购");	//更改头部标题
        $(".head-tool>.serch").show();	//显示搜索框
        $(".head-tool>.serch>input").attr("placeholder", "请输入物品名称或ID");
        $(".head-tool>.serch>input").val("");
        $(".head-tool>.sort").show();	//显示排序（选择类型）按钮
        $(".head-tool>.sort").find(".s-page").text('所有物品');
        $(".head-tool>.sort").find(".t1").text('所有物品');
        $(".head-tool>.sort").find(".t2").text('物块模型');
        $(".head-tool>.sort").find(".t3").text('物品资源');
        $(".head-tool>.sort").find(".t4").hide();
        $(".head-tool>.sort").find(".t5").hide();
        //$(".head-tool>.sort").html('<div class="s-page">所有物品</div><li class="t1" data-click="true">所有物品</li><li class="t2">物块模型</li><li class="t3">物品资源</li>');
        $(".head-tool>.refresh").show();	//显示刷新按钮
        $(".my-shop,.player-store,.player-com").hide();	//隐藏其它不相关页面
        $(".buying").show();	//显示物资求购页面
        $(".buying .empty").hide();	//隐藏没有搜索到物品的提示信息
        // nowPage = "物资求购";
        $bus.emit('setclass1', "物资求购");
        GenerateBuyingItems();	//生成可求购物品列表
      });
    },
    changeColor(color) {
      if (color == 1) {
        $(".items-box>.items").css("background-image", "url(images/card/yellow.jpg)");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(255, 229, 168, 0.5), rgba(254, 234, 188, 0.7))");
      }
      if (color == 2) {
        $(".items-box>.items").css("background-image", "url(images/card/green.jpg)");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(144, 238, 144, 0.5), rgba(187, 244, 187, 0.7))");
      }
      if (color == 3) {
        $(".items-box>.items").css("background-image", "url(images/card/beige.jpg)");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))");
      }
      if (color == 4) {
        $(".items-box>.items").css("background-image", "url(images/card/pink.jpg)");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))");
      }
      if (color == 5) {
        $(".items-box>.items").css("background-image", "url(images/card/purple.jpg)");
        //$(".items-shop>.items>section").css("background","linear-gradient(90deg, rgba(185, 216, 253, 0.5), rgba(209, 230, 254, 0.7))");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(237, 184, 254, 0.5), rgba(247, 209, 254, 0.7))");
      }
      if (color == 6) {
        $(".items-box>.items").css("background-image", "url(images/card/red.jpg)");
        $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))");
      }
      //$(".items-shop>.items").css("opacity","1");
    },
    lastView(type1, type2) {	//自动跳转到规定的分类并打印商品
      //$(".Category>div>.btn-2").click();
      for (var i = 0; i < $(".Category>div>ul").length; i++) {
        //alert($(".Category>div>ul").length)
        var name1 = $(".Category>div>ul").eq(i).find("div").text();	//获取总分类名称
        var xb = $(".Category>div>ul").eq(i).attr("class").split("-")[1];	//获取总分类下标

        if (name1 == type1) {	//找到对应总分类
          // console.log($(".Category>div>ul").eq(i).click());
          for (var j = 0; j < $(".Category>div>li[class^=b" + xb + "]").length; j++) {
            var name2 = $(".Category>div>li[class^=b" + xb + "]").eq(j).text();
            if (name2 == type2 && name2 != "全部") {	//找到对应子分类
              $(".Category>div>li[class^=b" + xb + "]").eq(j).click();
              //console.log("生成商品："+name1+" -- "+name2);
              //GenerateCom(type1,type2);
            }
          }
        }
        //changeColor(xb)
      }
    }
  },
  mounted() {
    //加载默认菜单
    this.ready();
    //在执行隐藏
    // this.lastView(this.class1, this.class2);

    //全部初始化完毕
    //点击首个按钮
    $(".Trade-ware .btn-1 div").click();
    console.log($(".Trade-ware>.btn-1>div"));
  }
}
</script>

<style scoped>

</style>
