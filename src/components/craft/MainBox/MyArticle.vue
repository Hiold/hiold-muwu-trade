<template>
  <!-- 主要内容显示区域（默认显示商品） -->
  <article>
    <section class="workbench">
      <!-- 头部工具栏 -->
      <header class="head-tool" style="display: block;">
        <h1>在线工作台</h1>
        <li>网页工作台</li>
        <li><i></i>基础工作台</li>
        <li><i></i>化学工作台</li>
        <li><i></i>水泥搅拌机</li>

        <div class="back"></div>
      </header>
      <aside class="citems-list" style="display: block;">    <!-- 物品列表（显示可以制作的物品） -->
        <div class="citems-search">  <!-- 列表头部 -->
          <input type="text" class="search" v-model="itemname" placeholder="搜索物品" @input="searchItems()">
          <div class="select-page">  <!-- 选择第几页 -->
            <div class="prev"></div>
            <input type="text" class="num" v-model="page" @input="initCraftList()">
            <div class="next"></div>
          </div>
          <div class="search-type">  <!-- 搜索类型: 制作物、配方 -->
            <div class="t1">制作物</div>
            <div class="t2">配方</div>
          </div>
        </div>
        <ul>
          <!-- <li class="craftable-items">
            <i></i>
            <span class="name">物品名称</span>
            <span class="num">x2</span>
          </li> -->
          <div class="empty" v-show="craftList==null||craftList.length==0">
            <span>没有找到你想<br>搜索的物品</span>
          </div>
          <li v-for="(item,index) in craftList" :key="item.data.id" class="craftable-items" data-index="0"
              style="line-height: 47px; background: rgba(255, 255, 255, 0.7);" @click="GenerateRecipe(item)">
            <i style=" background-color: rgba(255, 205, 135, 0.2); border: 0.15rem solid rgba(255, 205, 135, 0.9); width: 47px;">
              <img v-if="item.data.type == '1'||item.data.type == '2'" :src="'404'" style="width: 100%;height: 100%;"
                   @error="$LoadTintImage($event.target,item.data.itemicon,item.data.itemtint)">
              <img v-if="item.data.type == '3'||item.data.type == '4'" style="width: 100%;height: 100%;"
                   :src="'api/image/'+item.data.itemicon">
            </i><span
              class="name" style="font-weight: normal;">{{ HandleItemName(item.data.itemchinese) }}</span><span
              class="num">x{{ item.data.count }}</span></li>
        </ul>
      </aside>
      <section class="work-page" style="display: block;">  <!-- 右侧主体页面 -->
        <div class="work-recipe">
          <header>
            <i></i>
            <span class="name"></span>
            <span class="num"></span>
          </header>
          <div class="left" style="background-color: rgba(255, 255, 144, 0.1); height: 349px;">
            <div class="icon">
              <img>
              <div class="quality"><span></span></div>
            </div>
            <div class="time">
              <i></i>
              <span>00:00</span>
            </div>
            <div class="number">
              <div class="jian"></div>
              <input type="text" class="num" value="1" :oninput="changeCraftingCount">
              <div class="add"></div>
            </div>
            <li class="l1" style="display: none;"><i></i>配方<span>&lt;A&gt;</span></li>
            <li class="l2" @click="craftItem"><i></i>制作<span>&lt;S&gt;</span></li>
            <!--            <li class="l3"><i></i>购买<span>&lt;D&gt;</span></li>-->
          </div>
          <div class="right" style="height: 349px;">
            <ul class="recipe-list">
              <div class="empty" style="">
                <img :src="'images/empty5.png'">
                <span>
							这个物品暂时不能制作<br>
                  <!-- 去查询它的配方吧 -->
							快去叫服主写配方
						</span>
              </div>

            </ul>

          </div>
        </div>
        <div class="work-desc" style="height: 129.5px;"></div>
        <div class="slots" style="height: 129.5px;">  <!-- 制作槽 -->
          <li v-for="(item,index) in craftingList" @click="getAward(item.id)">
            <div class="icon">
              <img v-if="JSON.parse(item.extinfo1).type == '1'||JSON.parse(item.extinfo1).type == '2'" :src="'404'"
                   style="width: 100%;height: 100%;"
                   @error="$LoadTintImage($event.target,JSON.parse(item.extinfo1).itemicon,JSON.parse(item.extinfo1).itemtint)">
              <img v-if="JSON.parse(item.extinfo1).type == '3'||JSON.parse(item.extinfo1).type == '4'"
                   style="width: 100%;height: 100%;"
                   :src="'api/image/'+JSON.parse(item.extinfo1).itemicon">
            </div>
            <div class="time" :id="'award'+index">{{ timer('award' + index, item) }}</div>
          </li>
        </div>
      </section>
    </section>
  </article>
</template>

<script>
import ShopMenu from "/src/components/warehouse/MainBox/WareHouse/WareMenu.vue";
import ShopContent from "/src/components/warehouse/MainBox/WareHouse/WareContent.vue";

import '../../../assets/style/workbench/work.css'
import '../../../assets/style/workbench/work-left.css'
import $ from "jquery";
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  data() {
    return {
      selectItem: {},
      ctx: {},
      craftList: [],
      craftingList: [],
      page: 1,
      limit: 10,
      itemname: "",
      cancel: null,
      searchType: "制作物",
      awardType: "",
      // class1: "活动折扣",
      // class2: "全部"
    }
  },
  name: "MyArticle",
  components: {
    "shop-menu": ShopMenu,
    "shop-content": ShopContent
  },
  mounted() {
    //itemname
    if (window.location.href.indexOf("itemname=") > -1) {
      var itemname = window.location.href.split("itemname=")[1]
      this.itemname = decodeURIComponent(itemname);
    }

    this.ctx = getCurrentInstance();
    this.leftready();
    this.rightready();
    this.searchItems();
    this.getcrafting();
  },
  props: ["itemMenu", "class1", "class2"]
  , methods: {
    timer(target, item) {
      var craftdate = new Date(item.actTime);
      var now = new Date();
      var second = now.getTime() - craftdate.getTime();
      var time = item.extinfo4 * item.extinfo5;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
      var less = time - Math.floor((second / 1000));
      console.log(less);
      if (less <= 0) {
        $("#" + target).text('已完成');
        return '已完成';
      } else {
        var ti = setInterval(() => {
          var craftdate = new Date(item.actTime);
          var now = new Date();
          var second = now.getTime() - craftdate.getTime();
          var time = item.extinfo4 * item.extinfo5;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
          var less = time - Math.floor((second / 1000));
          if (less <= 0) {
            $("#" + target).text('已完成');
            clearInterval(ti);
          } else {
            var min = Math.floor(less / 60);
            var sec = less % 60;
            if (min < 10) {
              min = "0" + min
            }
            if (sec < 10) {
              sec = "0" + sec
            }
            if (min > 99) {
              min = 99;
              sec = 99;
            }
            $("#" + target).text(min + ":" + sec);
          }


        }, 1000);
      }

      var min = Math.floor(time / 60);
      var sec = time % 60;
      if (min < 10) {
        min = "0" + min
      }
      if (sec < 10) {
        sec = "0" + sec
      }
      if (min > 99) {
        min = 99;
        sec = 99;
      }
      $("#" + target).text(min + ":" + sec);
      return min + ":" + sec;
    },
    getcrafting() {
      var ctx = this.ctx.appContext.config.globalProperties;
      let args = {id: ""};
      axios.post("api/getCrafting", args).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.craftingList = JsonData;
        }
      });
    },
    getAward(id) {
      var ctx = this.ctx.appContext.config.globalProperties;
      let args = {id: id + ""};
      axios.post("api/getCraftAward", args).then(res => {
        if (res.data.respCode === "1") {
          ctx.Alert("领取成功！");
          this.getcrafting();
        } else {
          ctx.Alert(ctx.HandleItemName(res.data.respMsg));
        }
      });
    },
    craftItem() {
      var ctx = this.ctx.appContext.config.globalProperties;
      var count = $(".work-recipe>.left>.number>input").val() + "";
      let args = {id: this.selectItem.data.id + "", count: count};
      axios.post("api/craftItem", args).then(res => {
        if (res.data.respCode === "1") {
          ctx.Alert("开始制作！");
          this.getcrafting();
        } else {
          ctx.Alert(ctx.HandleItemName(res.data.respMsg));
        }
      });
    },
    initCraftList() {
      if (this.cancel != null) {
        this.cancel();
        this.cancel = null;
      }
      let args = {
        type: "'1','3'",
        name: this.itemname + "",
        page: this.page + "",
        limit: this.limit + "",
        searchType: this.searchType + "",
        awardType: this.awardType + "",
      };
      axios.post("api/getExchange", args, {
        cancelToken: new axios.CancelToken((c) => {
          // An executor function receives a cancel function as a parameter
          this.cancel = c;
        })
      }).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.craftList = JsonData;
        }
        if (this.craftList != null && this.craftList.length > 0) {
          this.GenerateRecipe(this.craftList[0]);
        }
      });
    },
    searchItems() {
      if (this.itemname == null || this.itemname == "") {	//如果输入的内容为空
        $(".citems-search>.select-page").show();	//显示页数
        $(".citems-search>.search-type").hide();	//隐藏搜索类型
      } else {
        $(".citems-search>.select-page").hide();	//隐藏页数
        $(".citems-search>.search-type").css("display", "flex");	//显示搜索类型
      }

      this.page = 1;
      if (this.itemname == "积分") {
        this.awardType = "4";
      } else if (this.itemname == "点券") {
        this.awardType = "5";
      } else {
        this.awardType = "1";
      }
      this.initCraftList();
    },
    leftready() {
      // setTimeout(function(){},1000);
      $(".citems-list").on("mouseenter", ".craftable-items", function () {		//制作物列表悬浮特效
        $(this).css("background", "linear-gradient(0deg,rgba(200,200,200,0.1),rgba(255,255,255,0.7),rgba(255,255,255,0.7),rgba(200,200,200,0.1))");
        $(this).find(".name").css({
          // "transition":"0.4s",
          // "padding-left":"0.3rem",
          "font-weight": "bold"
        });
      });
      $(".citems-list").on("mouseleave", ".craftable-items", function () {
        $(this).css("background", "rgba(255,255,255,0.7)");
        $(this).find(".name").css({
          // "transition":"0.2s",
          // "padding-left":"0",
          "font-weight": "normal"
        });
      });

      // $(".citems-list").on("click", ".craftable-items", function () {
      //   var xb = $(this).data("index");
      //   var id = recipes[xb].id
      //   GenerateRecipe(id);
      // });
      var self = this;
      var ctx = this.ctx.appContext.config.globalProperties;
      $(".citems-search>.select-page>.next").click(function () {	//制作物列表: 下一页
        self.page++;
        let args = {type: "'1','3'", name: self.itemname + "", page: self.page + "", limit: self.limit + ""};
        axios.post("api/getExchange", args).then(res => {
          let JsonData = res.data.data;
          if (res.data.respCode === "1") {
            if (JsonData.length <= 0) {
              ctx.Alert("没有更多数据了");
              self.page--;
            } else {
              self.craftList = JsonData;
            }
          } else {
            ctx.Alert("没有更多数据了");
            self.page--;
          }
        });
      });
      $(".citems-search>.select-page>.prev").click(function () {	//制作物列表: 上一页
        if (self.page == '1') {
          ctx.Alert("已经到第一页了");
          return;
        } else {
          self.page--;
        }
        let args = {type: "'1','3'", name: self.itemname + "", page: self.page + "", limit: self.limit + ""};
        axios.post("api/getExchange", args).then(res => {
          if (res.data.respCode === "1") {
            let JsonData = res.data.data;
            self.craftList = JsonData;
          } else {
            ctx.Alert("没有更多数据了");
          }
        });
      });

      $(".citems-search>.search-type>.t1").click(function () {	//搜索类型: 制作物
        self.searchType = "制作物";
        self.searchItems();
        $(".citems-search>.search-type>div").css({
          "color": "rgb(111,111,111)",
          "border-bottom": "none",
          "font-weight": "normal"
        });
        $(this).css({
          "color": "rgb(88,166,200)",
          "border-bottom": "0.2rem solid rgb(88,166,200)",
          "font-weight": "bold"
        });
      });
      $(".citems-search>.search-type>.t2").click(function () {	//搜索类型: 配方
        self.searchType = "配方";
        self.searchItems();
        $(".citems-search>.search-type>div").css({
          "color": "rgb(111,111,111)",
          "border-bottom": "none",
          "font-weight": "normal"
        });
        $(this).css({
          "color": "rgb(0,150,0)",
          "border-bottom": "0.2rem solid rgb(0,150,0)",
          "font-weight": "bold"
        });
      });
    },
    rightready() {
      var self = this;
      var ctx = this.ctx.appContext.config.globalProperties;
      $(".head-tool>li:not(:first)").click(function () {	//选择工作台
        alert("请使用钥匙解锁该功能！");
      });

      $(".recipe-list").on("mouseenter", "li", function () {	//配方列表移入特效
        //$(".recipe-list>li").mouseenter(function(){
        $(this).find(".icon").addClass("rotate360").css("transition", "2s");
        $(this).find(".name").css({
          "letter-spacing": "0.1rem",
          "transition": "0.4s",
          "font-size": "1.2rem",
          "color": "rgb(88,88,88)"
        });
      });
      $(".recipe-list").on("mouseleave", "li", function () {	//配方列表移出特效
        //$(".recipe-list>li").mouseleave(,function(){
        $(this).find(".icon").removeClass("rotate360").css("transition", "0.6s");
        $(this).find(".name").css({
          "letter-spacing": "0.05rem",
          "transition": "0.2s",
          "font-size": "1.1rem",
          "color": "rgb(111,111,111)"
        });
      });

      $(".work-recipe>.left>.number>.add").click(function () {		//增加制作数量
        var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
        //alert(xb)
        var count = $(".work-recipe>.left>.number>input").val() * 1;	//获取填写的数量
        count += 1;
        var time = self.selectItem.data.crafttime * count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
        console.log(time)
        var min = Math.floor(time / 60);
        var sec = time % 60;
        if (min < 10) {
          min = "0" + min
        }
        if (sec < 10) {
          sec = "0" + sec
        }
        if (min > 99) {
          min = 99;
          sec = 99;
        }
        $(".work-recipe>.left>.time>span").text(min + ":" + sec);
        $(".work-recipe>.left>.number>input").val(count);
      });
      $(".work-recipe>.left>.number>.jian").click(function () {		//减少制作数量
        var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
        var count = $(".work-recipe>.left>.number>input").val() * 1;	//获取填写的数量
        count -= 1;
        if (count <= 0) {
          count = 1;
        }
        var time = self.selectItem.data.crafttime * count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
        var min = Math.floor(time / 60);
        var sec = time % 60;
        if (min < 10) {
          min = "0" + min
        }
        if (sec < 10) {
          sec = "0" + sec
        }
        if (min > 99) {
          min = 99;
          sec = 99;
        }
        $(".work-recipe>.left>.time>span").text(min + ":" + sec);
        $(".work-recipe>.left>.number>input").val(count);
      });

      $(".work-recipe>.left>.l1").click(function () {	//配方
        // var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
        // alert(xb)
        var item = $(".work-recipe>header>.name").text();	//获取这个物品的名称
        $(".citems-search>input").val(item);
        //searchItems();	//在左侧列表搜索这个物品
        $(".citems-search>.search-type>.t2").click();	//搜索类型为配方
        //这时候左侧列表就会显示这个物品可以用配方制作的其它物品了
      });
      $(".work-recipe>.left>.l2").click(function () {	//制作

        // this.craftItem();
        return;
        if (canCrafting) {	//如果所有配方材料都足够
          var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
          var numT = $(".work-recipe>.left>.number>input").val() * 1;	//获取玩家制作的数量(件)
          $(".work-page>.slots").append("<li>" + craCard + "</li>");
          //craftingSolt += 1;
          var img = recipes[xb].image;		//获取这个物品的图标
          var time = recipes[xb].time * numT;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
          var len = craftingSolt.length
          craftingSolt[len] = {};
          craftingSolt[len].icon = img;
          craftingSolt[len].time = time;
          var min = Math.floor(time / 60);
          var sec = time % 60;
          if (min < 10) {
            min = "0" + min
          }
          if (sec < 10) {
            sec = "0" + sec
          }
          //$(".work-page>.slots>li>.time").eq(craftingSolt).text(min+" : "+sec);
          //$(".work-page>.slots>li").eq(len).append(craCard);
          $(".work-page>.slots>li").eq(len).find(".time").text(min + " : " + sec);
          $(".work-page>.slots>li").eq(len).find(".icon").css("background-image", "url(" + img + ")");
          $(".work-page>.slots>li").eq(len).find(".icon").text(numT);
          //craftingSolt[craftingSolt.length] = [xb,time];
          //eval("var test"+craftingSolt+" = setInterval(function(){")		//制作倒计时
          //var test = "abc";
          //var test;


          //eval('t'+craftingSolt+' = test');
          var ttt = setInterval(function () {
            //var time = craftingSolt[len].time;
            time--;
            //console.log(len)
            if (time <= 0) {
              $(".work-page>.slots>li").eq(len).find(".icon").html("已完成");
              $(".work-page>.slots>li").eq(len).find(".time").text("00 : 00");
              //craftingSolt.splice(len-1,1);
              //clearInterval(eval("test[1]"));
              clearInterval(ttt);
              return;
            }

            var min = Math.floor(time / 60);
            var sec = time % 60;
            if (min < 10) {
              min = "0" + min
            }
            if (sec < 10) {
              sec = "0" + sec
            }
            //console.log(craftingSolt);
            $(".work-page>.slots>li").eq(len).find(".time").text(min + " : " + sec);
            $(".work-page>.slots>li").eq(len).find(".icon").css("background-image", "url(" + img + ")");
            $(".work-page>.slots>li").eq(len).find(".icon").text(numT);
            //console.log(sec)
          }, 1000);


          //下面需要从仓库中扣除对应数量的配方材料
          var rLen = $(".recipe-list>li").length;
          for (var i = 0; i < rLen; i++) {	//遍历配方列表
            var xbw = $(".recipe-list>li").eq(i).data("ware");	//获取配方物品在仓库中的下标
            //var id = playerWares.data[xbw].id;	//获取物品ID
            console.log(xbw)
            var wNum = playerWares.data[xbw].num * 1;	//获取仓库物品数量
            var rNum = $(".recipe-list>li").eq(i).find(".num>.n2>b").text() * 1;	//获取配方需求数量
            wNum -= rNum;	//仓库数量 减 需求数量
            playerWare[playerIndex][xbw][1][1] = "数量:" + wNum;
            playerWares.data[xbw].num = wNum;	//保存仓库数量
            if (wNum == 0) {	//如果仓库物品用完了
              playerWare[playerIndex].splice(xbw, 1); //仓库里移除这个物品
              arrwareToObj();		//将更新的仓库数组重新转换obj格式
            }
          }
          var id = recipes[xb].id;	//获取制作物的ID
          GenerateRecipe(id);	//重新在页面渲染制作的物品
          setTimeout(function () {		//达到规定的制作时间后制作物品

            //下面要给玩家仓库增添制作的物品
            var id = recipes[xb].id;	//获取制作物的ID
            var name = recipes[xb].name;	//获取制作物的名称
            var numC = recipes[xb].num * 1;	//获取制作物的获得数量

            var numA = numC * numT;	//计算玩家制作后实际获得的数量
            var qua = recipes[xb].quality;	//获取制作物的品质
            //------------------------------------------------------
            var findItem = false;	//默认为没找到相同物品
            for (var n in playerWare[playerIndex]) {	//遍历玩家仓库
              var nameW = playerWares.data[n].name;	//获取数组中物品名称
              var idW = playerWares.data[n].id;		//获取数组中物品ID
              var quaW = playerWares.data[n].quality * 1;	//获取数组中物品品质
              var numW = playerWares.data[n].num * 1;		//获取数组中物品数量
              if (idW == id && nameW == name && quaW == qua) {	//如果是相同的物品
                findItem = true;
                numW += numA;	//直接给相同的物品增加购买的数量，无需再新创建数组
                playerWares.data[n].num = numW;	//保存更新的数量
                playerWare[playerIndex][n][1][1] = "数量:" + numW;
                break;
              }
            }
            if (findItem == false) {	//如果遍历完仓库数组后仍然没找到物品，给数组结尾追加数组
              //console.log("品质1:"+quaW+"---品质2:"+priQua);
              playerWare[playerIndex][playerWare[playerIndex].length] = [["auto", "ID:" + id, "图片:auto"], ["品质:" + qua, "数量:" + numA], ["总分类:auto", "子分类:auto", "mod:auto"], ["auto"]];
              arrwareToObj();		//给仓库数组更改obj储存格式
            }
            //------------------------------------------------------
            var point = players.data[playerIndex].points;
            var diamond = players.data[playerIndex].diamonds;
            if (qua == 0) {
              // recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date + "<br><span>制作物品</span><span><b>" + name + "</b></span><span>" + numA + " 件</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
            } else {
              // recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date + "<br><span>制作物品</span><span><b>" + name + "</b><font style='font-size:0.9em;'>(品质: " + qua + ")</font></span><span>" + numA + " 件</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
            }
            //alert("物品制作成功！\n你获得了 "+name+" --- "+numA+" 件\n请前往仓库查看");
            //GenerateRecipe(id);	//重新在页面渲染制作的物品
            GenerateWare(arrClass1, arrClass2);	//重新渲染仓库页面
          }, time * 1000);
          //  var id = recipes[xb].id;	//获取制作物的ID
          //  GenerateRecipe(id);
          // setTimeout(function(){		//达到规定的制作时间后调用制作函数
          // 	CraftingItems(xb);
          // },time*1000);


        } else {
          alert("配方材料不足，无法制作！\n请前往仓库补充材料")
        }
      });
      $(".work-recipe>.left>.l3").click(function () {	//购买
        //var item = $(".work-recipe>header>.name").text();	//获取这个物品的名称
        // var index = $(".work-recipe").data("index");	//获取这个物品在制作列表中的下标
        // if(index==undefined){
        // 	var item = data[index].id;	//获取这个物品的ID
        // }else{
        // 	var item = recipes[index].id;	//获取这个物品的ID
        // }

        //alert(index)
        var xb = $(".work-recipe").data("shop");	//获取这个物品在商品列表中的下标
        var type = shop.data[xb].class1;	//获取这个商品的分类
        var item = shop.data[xb].id;		//获取这个商品的ID
        setTimeout(function () {
          //$(".Main-menu>.menu-1").click();
          $(".Main-menu>li").data("click", false);
          $(".Main-menu>li").css({
            "opacity": "0.8",
            "transform": "scale(1.0)"
          });
          $(".Main-menu>.menu-1").data("click", true);
          $(".Main-menu>.menu-1").css({
            "opacity": "1",
            "transform": "scale(1.1)"
          });
          $("main>article").load("page/shop.html", function () {
            setTimeout(function () {
              if (type == "物块模型") {
                $(".Category>.btn-2").click();
              } else if (type == "物品资源") {
                $(".Category>.btn-3").click();
              } else if (type == "特殊商品") {
                $(".Category>.btn-5").click();
              } else {
                alert("物品类型错误！");
                return;
              }
              //遍历当前显示的商品
              for (var i = 0; i < $(".items-box>.items").length; i++) {
                var index = $(".items-box>.items").eq(i).data("index");
                if (index == xb) {		//找到对应商品
                  $(".items-box>.items").eq(i).click();
                }
              }
            }, 50);
          });
        }, 10);
      });

      $(".work-page>.slots>li").mouseenter(function () {	//鼠标移入正在制作的物品显示取消图标
        $(this).find(".cancel").show();
      });
      $(".work-page>.slots>li").mouseleave(function () {	//鼠标移出正在制作的物品隐藏取消图标
        $(this).find(".cancel").hide();
      });
      $(".work-page>.slots>li").click(function () {
        //alert(123)
      });

      $(".recipe-list").on("click", "li", function () {
        //点击配方列表的物品
        var itemname = $(this).data("itemname");			//获取配方在配方列表中的下标
        var itemtype = $(this).data("itemtype");
        self.awardType = itemtype;
        self.itemname = itemname;
        self.searchType = "配方";
        $(".citems-search>.search-type>.t2").click();
      });

      $(".head-tool>.back").click(function () {	//返回仓库
        $(".Main-menu>.menu-2").click();
      });

    }
    ,
    GenerateRecipe(item) {
      this.selectItem = item;
      var ctx = this.ctx.appContext.config.globalProperties;
      //将物品数据和配方列表渲染到详情页面
      //先将默认页面数据清空
      $(".work-recipe>.left>.number>input").val(1);

      $(".work-recipe>.left>.l2").show();	//显示制作按钮
      $(".recipe-list > .empty").hide();	//隐藏不可制作提示信息
      //获取物品数据
      var name = ctx.HandleItemName(item.data.itemchinese);	//名称
      var num = item.data.count;		//数量
      var qua = item.data.itemquality;	//品质
      var sec = item.data.crafttime;	//制作时间（秒）
      var type = item.data.type;	//物品类型
      var desc = item.data.desc;	//物品描述
      if (isNaN(sec)) {
        sec = 0
      }
      var min = Math.floor(sec / 60);	//计算分
      sec = sec % 60;
      if (min < 10) {
        min = "0" + min
      }
      if (sec < 10) {
        sec = "0" + sec
      }
      //将物品基础数据渲染到页面
      $(".work-recipe>header>.name").html(name);
      $(".work-recipe>header>.num").html("x" + num);
      if (item.data.type == '1') {
        ctx.$LoadTintImage($(".work-recipe>.left>.icon>img")[0], item.data.itemicon, item.data.itemtint);
      } else if (item.data.type == '3') {
        $(".work-recipe>.left>.icon>img").attr("src", "/api/image/" + item.data.itemicon);
      }
      $(".work-recipe>.left>.icon>.quality>span").text(qua);
      if (qua == 0) {
        $(".work-recipe>.left>.icon>.quality").hide();
      } else {
        $(".work-recipe>.left>.icon>.quality").show();
        if (qua == 1) {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(157, 138, 106)");
        } else if (qua == 2) {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(208, 129, 43)");
        } else if (qua == 3) {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(163, 165, 28)");
        } else if (qua == 4) {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(69, 195, 54)");
        } else if (qua == 5) {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(51, 96, 207)");
        } else {
          $(".work-recipe>.left>.icon>.quality").css("background-color", "rgb(165, 44, 205)");
        }
      }
      $(".work-recipe>.left>.time>span").text(min + ":" + sec)
      if (type == "1" || type == "3") {
        $(".work-recipe>.left").css("background-color", "rgba(144,255,144,0.1)");
      } else if (type == "2" || type == "4") {
        $(".work-recipe>.left").css("background-color", "rgba(255,255,144,0.1)");
      } else {
        $(".work-recipe>.left").css("background-color", "rgba(255,144,144,0.1)");
      }
      $(".work-page>.work-desc").html(desc);

      /*
      下面是读取配方数据
       */
      $(".recipe-list>li").remove();
      if (item.award == null || item.award.length <= 0) {
        $(".recipe-list").append("<div className=\"empty\" style=\"\"><img :src=\"'images/empty5.png'\"><span>这个物品暂时不能制作<br><!-- 去查询它的配方吧 -->快去叫服主写配方</span></div>");
      }
      //console.log(recipes[cxb])
      console.log(item.award)
      for (var j = 0; j < item.award.length; j++) {
        //遍历物品配方
        //有多少个配方就追加多少个列表
        //var rId = recipes[cxb][j].id;		//配方ID
        var rName = ctx.HandleItemName(item.award[j].itemchinese);	//配方名称
        if (item.award[j].type == '4') {
          rName = "积分";
        } else if (item.award[j].type == '5') {
          rName = "钻石";
        }
        $(".recipe-list").append('<li class="items" data-index="' + item.award[j].id + '" data-itemname="' + rName + '" data-itemtype="' + item.award[j].type + '"><div class="icon"><i><img style="width: 100%;height:100%;"/></i></div><div class="name"></div><div class="num"><span class="n1">仓库：<b></b></span><br><span class="n2">消耗：<b></b></span></div></li>');
        var rNum = item.award[j].count * 1;	//配方数量
        var rType = item.award[j].type;	//配方类型

        $(".recipe-list>li:last").data("index", j);	//将物品在配方列表中的下标保存到页面
        //下面是从仓库数组中获取物品数量
        var wNum = 0;

        console.log(item.data.type)
        //渲染到页面
        if (item.award[j].type == '1') {
          ctx.$LoadTintImage($(".recipe-list>li:last").find(".icon").find("i").find("img")[0], item.award[j].itemicon, item.award[j].itemtint);
        } else if (item.award[j].type == '2') {
          $(".recipe-list>li:last").find(".icon").find("i").find("img").attr("src", "/api/image/" + item.award[j].itemicon);
        } else if (item.award[j].type == '4') {
          $(".recipe-list>li:last").find(".icon").find("i").find("img").attr("src", "images/items/jf2.png");
          rName = "积分";
        } else if (item.award[j].type == '5') {
          $(".recipe-list>li:last").find(".icon").find("i").find("img").attr("src", "images/items/red-zs.png");
          rName = "钻石";
        }

        $(".recipe-list>li:last").find(".name").text(rName);		//渲染配方名称
        $(".recipe-list>li:last").find(".num>.n2>b").text(rNum);	//渲染配方数量
        $(".recipe-list>li:last").find(".num>.n1>b").text(wNum);	//渲染仓库数量
        if (wNum >= rNum) {		//如果仓库有足够的配方材料
          $(".recipe-list>li:last").find(".num>.n1>b").css("color", "rgb(0,188,0)");
        } else {		//如果仓库配方材料不足
          $(".recipe-list>li:last").find(".num>.n1>b").css("color", "red");
        }
        if (wNum == 0 && rNum == 0) {	//如果仓库没有对应的配方材料并且配方配方需求量也为0
          $(".recipe-list>li:last").find(".num>.n1>b").css("color", "red");
        }
        //下面是根据物品类型渲染列表颜色
        if (rType == "1" || rType == "3") {
          $(".recipe-list>li:last>.icon").css({
            "border": "0.25rem solid rgba(166,217,173,0.9)",
            "background-image": "url(images/card/green.jpg)"
          });
          $(".recipe-list>li:last>.name").css({
            "box-shadow": "0 0 0.3rem #2fb238 inset, 0 0 0.2rem #2fb238"
          });
          $(".recipe-list>li:last>.num").css({
            "background": "linear-gradient(120deg,rgb(217,238,220),rgba(200,232,205,0.7))"
          });

        } else if (rType == "2" || rType == "4") {
          $(".recipe-list>li:last>.icon").css({
            "border": "0.25rem solid rgba(255,205,135,0.9)",
            "background-image": "url(images/card/yellow.jpg)"
          });
          $(".recipe-list>li:last>.name").css({
            "box-shadow": "0 0 0.3rem #ffa500 inset, 0 0 0.2rem #ffa500"
          });
          $(".recipe-list>li:last>.num").css({
            "background": "linear-gradient(120deg,rgb(253,242,198),rgba(252,233,154,0.7))"
          });
        } else {
          $(".recipe-list>li:last>.icon").css({
            "border": "0.25rem solid rgba(255,180,180,0.9)",
            "background-image": "url(images/card/red.jpg)"
          });
          $(".recipe-list>li:last>.name").css({
            "box-shadow": "0 0 0.3rem rgb(253 134 110) inset, 0 0 0.2rem rgb(253 134 110)"
          });
          $(".recipe-list>li:last>.num").css({
            "background": "linear-gradient(120deg,rgb(255,233,233),rgba(255,188,188,0.7))"
          });
        }
      }


    }
    ,
    changeCraftingCount() {		//修改物品制作数量
      var self = this;
      var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
      var count = $(".work-recipe>.left>.number>input").val() * 1;	//获取填写的数量
      if (isNaN(count)) {	//如果输入的内容不是数字, 重置为上次输入的数量
        count = 1;
      }
      if (count <= 0) {	//制作数量至少为1
        count = 1;
        $(".work-recipe>.left>.number>input").val(1);
      }
      var time = self.selectItem.data.crafttime * count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
      var min = Math.floor(time / 60);
      var sec = time % 60;
      if (min < 10) {
        min = "0" + min
      }
      if (sec < 10) {
        sec = "0" + sec
      }
      if (min > 99) {
        min = 99;
        sec = 99;
      }
      $(".work-recipe>.left>.time>span").text(min + ":" + sec);
    }
  }
}
</script>

<style scoped>

</style>
