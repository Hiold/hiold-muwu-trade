<template>
  <section>
    <!-- 专题区域、详细内容 -->
    <!-- 头部工具栏 -->
    <header class="head-tool" v-show="!isdetailShow">
      <div class="serch">
        <input type="text" class="name-id" v-model="itemname" placeholder="请输入商品名称或ID" @input="queryShopItem()">
        <div class="btn"></div>
      </div>
      <div class="display">
        <li class="l1" data-click="true">卡片</li>
        <li class="l2">图标</li>
        <li class="l3">列表</li>
      </div>
      <div class="sort">
        <div class="s-page">默认排序</div>
        <li class="t1" data-click="true">默认排序</li>
        <li class="t2">销量优先</li>
        <li class="t3">收藏最多</li>
        <li class="t4">价格低到高</li>
        <li class="t5">价格高到低</li>
      </div>
    </header>
    <!-- 商品页面 -->
    <ul class="items-box" v-show="!isdetailShow">
      <shop-item v-for="(item,index) in shop" :key="item.id" :item="item" :index="index"
                 @showdetail="showdetail"></shop-item>
      <li class="loading">正在加载中<i></i></li>
      <div class="none" v-if="!shop||shop.length<=0">
        <span>暂无出售的商品<br>快叫服主上架</span>
      </div>
    </ul>
    <!--详细信息部分-->
    <shop-item-details :item="item" v-show="isdetailShow" @hideDetail="hideDetail"></shop-item-details>
  </section>
</template>

<script>
//导入样式
import '../../../../assets/style/shop.css'
import '../../../../assets/style/shop-nav.css'
import '../../../../assets/style/headTool.css'

import ShopMenuItem from '/src/components/shop/MainBox/Shop/ShopItem.vue'
import ShopItemDetails from "/src/components/shop/MainBox/Shop/ShopItemDetails.vue";
//引入juqery
import $ from 'jquery'
import axios from "axios";
import {ElMessage} from "element-plus";
import {getCurrentInstance} from "vue";

export default {
  watch: {
    class1: {
      handler(newName, oldName) {
        if (newName != oldName) {
          console.log("监听到变化" + newName);
          this.queryShopItem();
        }
      },
      immediate: true
    },
    class2: {
      handler(newName, oldName) {
        if (newName != oldName) {
          console.log("监听到变化" + newName);
          this.queryShopItem();
        }
      }
    }
  },
  name: "ShopContent",
  props: ["class1", "class2"],
  components: {"shop-item": ShopMenuItem, "shop-item-details": ShopItemDetails},
  data() {
    return {
      isdetailShow: false,
      item: {},
      formPage: "",
      shop: [
        //     {
        //   "id": "积分",
        //   "name": "积分兑换券",
        //   "image": "images/items/jf2.png",
        //   "quality": "3",
        //   "num": "1000",
        //   "currency": "积分",
        //   "price": "1000",
        //   "discount": "7.8",
        //   "prefer": "999",
        //   "desc": "<span style='color:mediumpurple;font-size:1.2rem;font-weight:bold;'>这个物品可以跟档</span><br><font color='orangered'><b>网页专属积分兑换券</b></font><br>在仓库中使用可获得对应数量积分",
        //   "class1": "特殊商品",
        //   "class2": "货币兑换",
        //   "classMod": true,
        //   "sales": "88888",
        //   "hot": "auto",
        //   "hotSet": "888",
        //   "show": "auto",
        //   "stock": "11",
        //   "collect": "55",
        //   "sell": true,
        //   "xgLevel": false,
        //   "xgDay": "10",
        //   "xgAll": "false",
        //   "follow": false,
        //   "year": 2021,
        //   "mon": 12,
        //   "day": 31,
        //   "hour": 18,
        //   "min": 0,
        //   "sec": 0,
        //   "collected": true
        // }
      ],
      comCard: "",
      playerCollects: [],//收藏
      playerBuys: [],//购买
      playerIndex: "",
      Display: "",
      playerName: "",
      steamID: "",
      localization: "",
      itemname: "",
      sorttype: "默认排序",
      idDetail: "",
      ctx: {},
      cancel: null
    }
  },
  methods: {
    queryShopItem() {
      if (this.cancel != null) {
        this.cancel();
        this.cancel = null;
      }
      let params = {
        id: this.idDetail,
        itemname: this.itemname,
        class1: this.class1,
        class2: this.class2,
        sorttype: this.sorttype
        , "pageIndex": "1", "pageSize": "9999"
      };
      axios.post("api/queryShopItem", params, {
        cancelToken: new axios.CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          this.cancel = c;
        })
      }).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.shop = JsonData.data;
        }
      });

    },
    getTime() {	//获取当前时间
      var myDate = new Date();

      var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      var mon = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
      var day = myDate.getDate();        //获取当前日(1-31)
      var week = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)

      var hour = myDate.getHours();       //获取当前小时数(0-23)
      var min = myDate.getMinutes();     //获取当前分钟数(0-59)
      var sec = myDate.getSeconds();     //获取当前秒数(0-59)

      // var date1 = myDate.toLocaleDateString();     //获取当前日期(year/mon/day)
      // var date2 = myDate.toLocaleTimeString();     //获取当前时间(hour:min:sec)
      var date3 = myDate.toLocaleString();        //获取日期与时间(year/mon/day hour:min:sec)

      return {
        "year": year,
        "mon": mon,
        "day": day,
        "week": week,
        "hour": hour,
        "min": min,
        "sec": sec,
        "date": date3
      }
    }
    ,
    hideDetail() {
      if (window.location.href != null && window.location.href != "" && window.location.href.indexOf("id=") > -1) {
        //fromBack
        window.location = "/#/userq/warehouse?fromBack=1";
      } else {
        this.isdetailShow = false;
      }
    }
    ,
    deleteBBcode(itemName) {	//隐藏颜色代码, 如[FF0000]这样的内容将会自动隐藏
      return itemName.replace(/([\\[][0-9a-fA-F]{6}[\]])/g, "");
      //return itemName;
    }
    ,
    searchItems() {	//当输入框获内容改变时，只显示搜索的商品（无视英文字母大小写）
      var self = this;
      $(".items-box>.items").show();	//先默认让所有隐藏元素显示
      var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
      var find = false;	//默认为没找到商品
      for (var i = 0; i < $(".items-box>.items").length; i++) {	//遍历当前页面显示的商品
        var xb = $(".items-box>.items").eq(i).data("index");	//获取每个商品在数组中的下标
        //var name = $(".items-box>.items").eq(i).find("header").find(".name").text();
        var name = self.shop.data[xb].name.toLowerCase();	//获取商品名称
        var id = self.shop.data[xb].id.toLowerCase();		//获取商品ID
        if (name.indexOf(txt) != -1 || id.indexOf(txt) != -1) {	//如果商品名称或ID中包含了你需要搜索的字符串
          find = true;
          $(".items-box>.none").hide();
        } else {
          $(".items-box>.items").eq(i).hide();
        }
      }
      if (!find) {	//如果遍历完数组后，仍然没找到要搜索的商品
        // console.log("没找到搜索的商品");
        $(".items-box>.none").show();
        $(".items-box>.none").find("span").html("没有找到你想<br>搜索的商品");
      }
    }
    ,
    showdetail(item, target, limitData) {
      //购买处理归零
      this.$store.state.buyCount = 1;
      var ctx = this.ctx.appContext.config.globalProperties;
      this.item = item;
      console.log(item)
      //查找父级元素
      for (var l = 0; l < 10; l++) {
        var targetName = target.tagName.toLowerCase()
        if (targetName == 'li') {
          break;
        } else {
          target = target.parentElement
          continue;
        }
      }
      //点击卡片打开商品详情
      $(".items-details").fadeIn(100);
      $(".items-box,.head-tool").fadeOut(100);
      //arrcomToObj();	//将商品数据转换为obj格式
      //下面是获取商品的基本信息
      var name = ctx.HandleItemName((item.translate === null || item.translate === "") ? item.couCurrType : item.translate);//名称
      var num = item.num;				//数量
      var sales = item.selloutcount * 1;			//销量
      var class1 = item.class1;			//总分类
      var class2 = item.class2;			//子分类
      var class3 = $(target).find(".ex").text();	//其它类型
      var curr = item.currency;			//货币类型
      var price = $(target).find(".price").text();	//价格
      var del = $(target).find("del").text();		//删除价
      var dis = $(target).find("header").find("i").text();	//折扣
      var xgLevel = item.xglevel;		//等级限购
      var xgLevelset = item.xglevelset;		//等级限购
      var xgDay = item.xgday;			//每日限购
      var xgDayset = item.xgdayset;			//每日限购
      var xgAll = item.xgall;			//总数限购
      var xgAllset = item.xgallset;			//总数限购
      var stock = item.stock;			//剩余库存
      var img = 'api/getimagetint/' + item.itemicon;				//商品图片
      var backImg = $(target).css("background-image");//商品展示框背景图片
      var hot = $(target).find("section").find(".hot").css("display");//热销图标
      var quality = item.quality;			//品质
      var collectNum = item.collect;		//玩家收藏量
      var sell = item.sell;				//是否可售卖（会员）
      var desc = item.desc;		//商品说明


      var buyDay = limitData.tdCount;		//今日已购买数量
      var buyAll = limitData.allCount;		//历史购买总数量

      //保存下标
      //下面是在商品详情页面打印商品信息
      $(".spxq").find(".name").text(name);			//名称
      if (num > 1) {
        $(".spxq").find(".shul").show().text("x" + num);			//数量
      } else {
        $(".spxq").find(".shul").hide().text("");
      }
      $(".spxq").find(".sells").text("销量 : " + sales);	//销量
      // console.log(item.itemtype)
      if (item.itemtype === '2') {
        $(".spxq").find(".cs1").hide();
        $(".spxq").find(".cs2").hide();
        $(".spxq").find(".cs1").text(class1);			//总分类
        $(".spxq").find(".cs2").text(class2);			//子分类
      } else {
        $(".spxq").find(".cs1").show();
        $(".spxq").find(".cs2").show();
        $(".spxq").find(".cs1").text(class1);			//总分类
        $(".spxq").find(".cs2").text(class2);			//子分类
      }
      var groupinfos = ctx.getItemType(item.class1);
      if (item.itemtype == "1") {
        $(".ware-details>section>.left>.img>img").attr("src", '/api/getimagetint/' + item.itemname);
        $(".spxq").find(".cs1").hide();
        $(".spxq").find(".cs2").hide();
        $(".spxq").find(".cs3").hide();
        //显示物品分组信息
        if (groupinfos != null && groupinfos.length >= 1) {
          $(".spxq").find(".cs1").show();
          $(".spxq").find(".cs1").text(groupinfos[0]);	//总分类
        }
        if (groupinfos != null && groupinfos.length >= 2) {
          $(".spxq").find(".cs2").show();
          $(".spxq").find(".cs2").text(groupinfos[1]);	//子分类
        }
        if (groupinfos != null && groupinfos.length >= 3) {
          $(".spxq").find(".cs3").show();
          $(".spxq").find(".cs3").text(groupinfos[2]);	//子分类
        }
      } else {
        $(".ware-details>section>.left>.img>img").attr("src", img);
        $(".spxq").find(".cs1").hide();
        $(".spxq").find(".cs2").hide();
        $(".spxq").find(".cs3").show();
        $(".spxq").find(".cs3").text("特殊物品");
      }

      if (sell == "vip") {
        $(".spxq").find(".cs4").show().text("会员专属");		//VIP专属
      } else {
        $(".spxq").find(".cs4").hide();
      }
      if (sales == undefined || isNaN(sales)) {
        $(".spxq").find(".sells").hide();
      } else {
        $(".spxq").find(".sells").show();
      }
      //（Mod物品/网页专属）
      if (item.itemtype == "1") {
        $(".spxq").find(".cs3").hide();
      } else {
        $(".spxq").find(".cs3").show().text(class3);
      }
      $(".spxq").find(".price").find(".p1").html("<i></i>" + price);	//价格
      $(".spxq").find(".price").find("del").text(del);				//删除价
      if (dis == "" || dis == undefined) {	//折扣
        $(".spxq").find(".price").children("i").hide();
      } else {
        $(".spxq").find(".price").children("i").show().text(dis);
      }
      //货币类型
      if (curr == "1") {
        $(".spxq").find(".price").find(".p1").find("i").css("background-image", "url(images/icon/jf2.png)");
      } else if (curr == "2") {
        $(".spxq").find(".price").find(".p1").find("i").css("background-image", "url(images/icon/red-zs.png)");
      }
      //等级限购
      if (xgLevel === '2') {
        $(".spxq").find(".xg1").find(".txt").text("≥ lv." + xgLevelset);
      } else if (xgLevel === '3') {
        $(".spxq").find(".xg1").find(".txt").text("≤ lv." + xgLevelset * -1);
      } else {
        $(".spxq").find(".xg1").find(".txt").text("无限制");
      }
      ``
      //每日限购
      if (xgDay === '2') {
        $(".spxq").find(".xg2").find(".txt").text(buyDay + "/" + xgDayset);
      } else {
        $(".spxq").find(".xg2").find(".txt").text("无限制");
      }
      //总限购
      if (xgAll === '2') {
        $(".spxq").find(".xg3").find(".txt").text(buyAll + "/" + xgAllset);
      } else {
        $(".spxq").find(".xg3").find(".txt").text("无限制");
      }
      //输入框默认数量为1
      $(".spxq>.num>input").val(1);
      //库存
      if ((stock * 1) >= 0) {
        $(".spxq").find(".stock").text("（库存 : " + stock + "）");
        if (stock * 1 === 0) {	//如果库存为0，显示售罄图标
          $(".items-details>.left>.image .soldout").show();
        } else {
          $(".items-details>.left>.image .soldout").hide();
        }
      } else {
        $(".items-details>.left>.image .soldout").hide();
        $(".spxq").find(".stock").text("（库存 : 无上限）");
      }
      //售罄图标
      // var showS = $(target).find(".soldout").css("display");
      // if (showS == "block") {
      //   $(".items-details>.left>.image .soldout").show();
      // } else {
      //   $(".items-details>.left>.image .soldout").hide();
      // }
      //热销图标
      if (hot == "block") {
        $(".items-details>.left").find(".hot").show();
      } else {
        $(".items-details>.left").find(".hot").hide();
      }
      //品质
      var color;
      if (quality == 1) {
        color = "rgba(157, 138, 106, 0.5)"
      }
      if (quality == 2) {
        color = "rgba(208, 129, 43, 0.5)"
      }
      if (quality == 3) {
        color = "rgba(163, 165, 28, 0.5)"
      }
      if (quality == 4) {
        color = "rgba(69, 195, 54, 0.5)"
      }
      if (quality == 5) {
        color = "rgba(51, 96, 207, 0.5)"
      }
      if (quality == 6) {
        color = "rgba(165, 44, 205, 0.5)"
      }
      if (quality >= 1) {
        $(".items-details>.left").find(".quality").show().text(quality).css("background-color", color);
      } else {
        $(".items-details>.left").find(".quality").hide();
      }
      //物品图片
      // $(".items-details>.left").find("img").attr("src", img);
      if (item.itemtype == '1') {
        $(".items-details>.left").find("img").attr("src", '/api/getimagetint/' + item.name);
      } else {
        $(".items-details>.left").find("img").attr("src", "api/getimagetint/" + item.itemicon);
      }
      //收藏图标
      if (item.collected == "1") {
        $(".items-details").data("collect", "true");
        $(".items-details>.left").find(".collect").find("i").css("background-image", "url(images/icon/collect-3.png)");
        $(".items-details>.left").find(".collect").find(".txt").text("已收藏").css("color", "rgb(239,90,74)");
        //数组收藏+1
      } else {
        $(".items-details").data("collect", "false");
        $(".items-details>.left").find(".collect").find("i").css("background-image", "url(images/icon/collect-1.png)");
        $(".items-details>.left").find(".collect").find(".txt").text("收藏").css("color", "gray");
      }
      $(".items-details>.left").find(".collect").find(".num").text(collectNum);	//玩家收藏数量
      $(".items-details>.left").find(".image").css("background-image", backImg);	//商品展示框背景图片
      $(".items-details>.bottom").html(desc);		//商品介绍
      //detectNum();
      this.isdetailShow = true;
    }

  }
  , mounted() {

    axios.post("api/getdisCountTicket", "").then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.$store.state.couProps = JsonData;
      }
    });

    this.ctx = getCurrentInstance();
    // let params = {itemname: ""};
    // axios.post("api/queryShopItem", params).then(res => {
    //   if (res.data.respCode === "1") {
    //     let JsonData = res.data.data;
    //     this.shop = JsonData.data;
    //   }
    // });

    // console.log("\n当前分区售卖商品数量:" + this.shop.length + "\n\n");
    //处理当前页面等待元素
    $(".loading").hide();
    if (this.shop.length == 0) {
      $(".items-box>.none").show();
      $(".items-box>.none").find("span").html("暂无出售的商品<br>快叫服主上架");
    } else {
      $(".items-box>.none").hide();
    }
    // this.GenerateCom(this.class1, this.class2);

    var self = this;

    //var serchItems;	//搜索商品是调用的定时函数

    $(".head-tool>.serch>.btn").click(function () {
      self.searchItems();
    });

    $(".items-box").on("click", ".collect", function () {	//收藏商品
      // var coll = $(this).data("collect");
      var xb = $(this).parents(".items").attr("data-index");
      console.log(self.shop[xb])
      var id = self.shop[xb].id;
      var qua = self.shop[xb].quality;
      var num = self.shop[xb].num;
      var collnum = self.shop[xb].collected * 1;
      if (collnum == 1) {
        //取消收藏
        var buyParam = {"id": "" + id + "", "value": "0"};
        axios.post("api/updateCollect", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ElMessage.success('取消收藏成功')
            self.shop[xb].collected = '0';
            // $(this).css("background-image", "url(images/icon/collect-1.png)");
          } else {
            ElMessage.error(res.data.respMsg);
          }
        });
      } else {
        //收藏
        var buyParam = {"id": "" + id + "", "value": "1"};
        axios.post("api/updateCollect", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ElMessage.success('收藏成功')
            self.shop[xb].collected = '1';
            // $(this).css("background-image", "url(images/icon/collect-3.png)");
          } else {
            ElMessage.error(res.data.respMsg);
          }
        });
      }

    });

    function cardToIcon() {	//将卡片转换为图标
      $(".items-box>.items>header,.items-box>.items>footer").hide();	//隐藏头部和脚部
      $(".items-box>.items>section>div").css("opacity", "0");		//隐藏多余元素（仅保留图片）
      $(".items-box>.items>section>.collect").hide();
      $(".items-box>.items>section").css({		//调整图片区域的样式
        "height": "100%",
        "transform": "scale(0.8)"
      });
      $(".items-box>.items").css({	//调整整个卡片的样式
        "width": "13.27%",
        "height": "6.2rem",
        "margin": "0.5%"
      });
    }

    function iconToCard() {	//将图标转换为卡片
      $(".items-box>.items>header,.items-box>.items>footer").show();	//显示头部和脚部
      $(".items-box>.items>section>div").css("opacity", "1");		//显示多余元素
      $(".items-box>.items>section>.collect").show();
      $(".items-box>.items>section").css({		//调整图片区域的样式
        "height": "60%",
        "transform": "scale(1)"
      });
      $(".items-box>.items").css({	//调整整个卡片的样式
        "width": "31.3%",
        "height": "10rem",
        "margin": "1%"
      });
    }

    $(".head-tool>.display>li").hover(function () {	//商品显示类型 悬浮特效
      var dc = $(this).data("click");
      if (dc == "false" || dc == undefined) {
        $(this).css({"opacity": "1"});
      }
    }, function () {
      var dc = $(this).data("click");
      if (dc == "false" || dc == undefined) {
        $(this).css({"opacity": "0.7"});
      }
    });
    $(".head-tool>.display>.l2").click(function () {	//商品显示类型：图标
      //点击特效
      $(".head-tool>.display>li").css({
        "opacity": "0.7",
        "border-bottom-color": "rgba(255,255,255,0)"
      }).data("click", "false");
      $(this).css({
        "opacity": "1",
        "border-bottom-color": "#ff6969"
      }).data("click", "true");
      self.Display = "icon";
      cardToIcon();
    });
    $(".head-tool>.display>.l1").click(function () {	//商品显示类型：卡片
      //点击特效
      $(".head-tool>.display>li").css({
        "opacity": "0.7",
        "border-bottom-color": "rgba(255,255,255,0)"
      }).data("click", "false");
      $(this).css({
        "opacity": "1",
        "border-bottom-color": "#ff6969"
      }).data("click", "true");
      self.Display = "card";
      iconToCard();
    });
    $(".head-tool>.sort>.s-page").click(function () {		//商品排序方式:展开列表选择排序方式
      $(".head-tool>.sort").css({
        "height": "300%",
        "border-radius": "1rem",
        "border": "1px solid white",
        "box-shadow": "0 0 0.4rem rgb(200,200,200)"
      }).find(".s-page").css("font-weight", "bold");
    });
    var ycTime;
    $(".head-tool>.sort").mouseleave(function () {	//隐藏排序选择列表
      ycTime = setTimeout(function () {
        $(".head-tool>.sort").css({
          "height": "50%",
          "border-radius": "2rem",
          "border": "1px solid rgb(180,180,180)",
          "box-shadow": "none"
        }).find(".s-page").css("font-weight", "normal");
      }, 500);
    });
    $(".head-tool>.sort").mouseenter(function () {
      clearTimeout(ycTime);
    });

    $(".head-tool>.sort>li").click(function () {	//排序选择列表 点击特效
      $(".head-tool>.sort>li").css("background-color", "inherit");
      $(this).css("background-color", "rgb(230,230,230)");
      $(".head-tool>.sort>li").data("click", "false");
      $(this).data("click", "true");
      var txt = $(this).text();
      $(".head-tool>.sort>.s-page").text(txt);
      $(".head-tool>.sort").css({
        "height": "50%",
        "border-radius": "2rem",
        "border": "1px solid rgb(180,180,180)",
        "box-shadow": "none"
      }).find(".s-page").css("font-weight", "normal");

      // console.log($(this).text());
      self.sorttype = $(this).text();
      self.queryShopItem();
    });
    $(".head-tool>.sort>li").hover(function () {	//排序选择列表 悬浮事件
      var ck = $(this).data("click");
      if (ck == "false" || ck == undefined) {
        $(this).css("background-color", "rgb(240,240,240)");
      }
    }, function () {
      var ck = $(this).data("click");
      if (ck == "false" || ck == undefined) {
        $(this).css("background-color", "inherit");
      }
    });

    //判断请求来源
    if (window.location.href != null && window.location.href != "" && window.location.href.indexOf("id=") > -1) {
      var id = window.location.href.substring(window.location.href.indexOf("id=") + 3);
      console.log("精确查询模式:", id);
      let params = {
        id: id + "",
        itemname: self.itemname,
        class1: self.class1,
        class2: self.class2,
        sorttype: self.sorttype
        , "pageIndex": "1", "pageSize": "9999"
      };
      axios.post("api/queryShopItem", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          self.shop = JsonData.data;
          self.$nextTick(function () {
            $(".items-box>li").click();
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
