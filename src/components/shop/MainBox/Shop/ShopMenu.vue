<template>

  <nav class="Category">
    <!-- 侧边导航栏、分类 -->
    <div class="title">༺ཌ 商品分类 ད༻</div>
    <shop-mune-item v-for="(item,index) in itemMenu" :menuitem="item.items" :menuindex="index"
                    :menucategory="item.category" :key="item.category"></shop-mune-item>
  </nav>
</template>

<script>
//导入样式
import '../../../../assets/style/shop.css'
import '../../../../assets/style/shop-nav.css'
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
      var self = this;
      $(".Category>div>li").hide();	//默认隐藏所有子分类
      //$(".Category>div>li[class^='b1']").show();	//默认显示第一组子分类（活动折扣）
      //$(".Category>div>li[class$='t0']").data("click","true");
      //子分类点击特效+生成商品
      $(".Category>div>li").click(function () {
        // console.log($(this).attr("data"));

        $(".head-tool .name-id").val("");
        $(".items-details").hide();
        $(".items-box,.head-tool").show();
        var xb = $(this).attr("class").split("")[1];	//获取序号
        //console.log("序号:"+xb)
        $(".Category>div>li[class^='b" + xb + "']").css({"background": "none", "box-shadow": "none"});	//清除同组子分类的样式

        console.log(navColor[xb - 1]);

        $(this).css({	//设置当前子分类样式
          "background": "radial-gradient(" + navColor[xb - 1] + ")",
          "box-shadow": "0 0 0.1rem white"
        });
        //$(".Category>div>li[class^='b"+xb+"']").data("click","false");
        $(".Category>div>li").data("click", "false");
        $(this).data("click", "true");
        // self.class2 = $(this).text();	//获取当前点击的子分类名称
        $bus.emit('setclass2', $(this).attr("data"));
        //console.log("子分类："+xb);
        self.changeColor(xb);
        //$(".items-details").fadeOut(200);
        //$(".items-details").hide();
        //$(".items-shop,section>.head-tool").show();
        //alert("点击子分类："+class2);
        return;
      });

      $(".Category>div>ul").click(function () {	//总分类点击特效+生成商品
        var dc = $(this).data("click");		//获取当前分类下的子分类展开状态
        var xb = $(this).attr("class").split("-")[1];	//从类名中获取序号
        // console.log(dc, xb);
        if (dc == "false" || dc == undefined) {	//情况1:如果子分类为隐藏
          $(".Category>div>li").slideUp(100);	//先隐藏所有分组的子分类
          $(".Category>div>li[class^='b" + xb + "']").slideDown(200);	//展开当前子分类
          $(".Category>div>ul").data("click", "false");
          $(this).data("click", "true");	//将展开状态设置为"展开"
          $bus.emit('setclass1', $(this).find("div").text());
          //alert("展开总分类："+class1)
          $(this).next().click();		//默认显示当前总分类下第一个子分类的内容
          //console.log("总分类："+xb);
          self.changeColor(xb);
        } else if (dc == "true" || dc == true) {		//情况2:如果子分类为展开
          $(".Category>div>li").slideUp(100);	//隐藏所有分组的子分类
          $(this).data("click", "false");	//将展开状态设置为"隐藏"
        }
        return;
        //$(".Category>div>li[class$='t0']").click();	//默认显示第一个子分类的内容
      });
      var navColor = [	//子分类背景颜色
        ["rgb(254, 227, 171), rgba(254, 208, 171, 0.2)"],
        ["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
        ["rgb(232, 206, 185), rgba(255, 255, 255, 0.2)"],
        ["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"],
        ["rgb(200, 200, 255), rgba(255, 255, 255, 0.2)"],
        ["rgb(255, 160, 160), rgba(255, 255, 255, 0.2)"]
      ]

      $(".Category>div>li").hover(function () {		//子分类悬浮特效
        var xb = $(this).attr("class").split("")[1];
        var dc = $(this).data("click");
        if (dc == "false" || dc == undefined) {
          $(this).css({
            "background": "radial-gradient(" + navColor[xb - 1] + ")",
            "box-shadow": "0 0 0.1rem white"
          });
        }
      }, function () {
        // var xb = $(this).attr("class").split("")[1];
        var dc = $(this).data("click");
        if (dc == "false" || dc == undefined) {
          $(this).css({"background": "none", "box-shadow": "none"});
        }
      });

      // $(".Category>div>ul").click(function(){		//总分类 生成商品
      // 	var ck = $(this).data("click");
      // 	if(ck=="true"){
      // 		class1 = $(this).find("div").text();	//获取当前点击分类
      // 		class2 = "全部";		//默认子分类为全部
      // 		GenerateCom(class1,class2);
      // 	}
      // });

    },
    changeColor(color) {
      if (color == 1) {
        this.$store.state.shop.cardbg = "url(images/card/yellow.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(255, 229, 168, 0.5), rgba(254, 234, 188, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/yellow.jpg)");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(255, 229, 168, 0.5), rgba(254, 234, 188, 0.7))");
      }
      if (color == 2) {
        this.$store.state.shop.cardbg = "url(images/card/green.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(144, 238, 144, 0.5), rgba(187, 244, 187, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/green.jpg)");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(144, 238, 144, 0.5), rgba(187, 244, 187, 0.7))");
      }
      if (color == 3) {
        this.$store.state.shop.cardbg = "url(images/card/beige.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/beige.jpg)");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))");
      }
      if (color == 4) {
        this.$store.state.shop.cardbg = "url(images/card/pink.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/pink.jpg)");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))");
      }
      if (color == 5) {
        this.$store.state.shop.cardbg = "url(images/card/purple.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(237, 184, 254, 0.5), rgba(247, 209, 254, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/purple.jpg)");
        ////$(".items-box>.items>section").css("background","linear-gradient(90deg, rgba(185, 216, 253, 0.5), rgba(209, 230, 254, 0.7))");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(237, 184, 254, 0.5), rgba(247, 209, 254, 0.7))");
      }
      if (color == 6) {
        this.$store.state.shop.cardbg = "url(images/card/red.jpg)";
        this.$store.state.shop.cardcolor = "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))";
        // $(".items-box>.items").css("background-image", "url(images/card/red.jpg)");
        // $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))");
      }
      //$(".items-box>.items").css("opacity","1");
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
    this.lastView(this.class1, this.class2);
  }
}
</script>

<style scoped>

</style>
