<template>
  <div class="terr-box" data-page="box">    <!-- 领地箱子 -->
    <header>
      <i></i>
      <span class="title">领地箱子</span>
      <div class="back" title="返回"></div>
    </header>
    <section>
      <div class="page-box">
        <li class="player-box" v-for="(item,index) in containerList" :key="index"
            @click="loadItems(item,index)">
          <header>{{ item.sign == null || item.sign == "" ? item.nametranslate : item.sign }}</header>
          <section>
            <img v-if="item.icon==null" :src="'api/image/'+item.name+'.png'">
            <img v-else :src="'api/image/'+item.icon.Value+'.png'">
          </section>
          <footer>
            <div class="num">编号： <span>{{ index + 1 }}</span></div>
            <div class="locked">
              状态：
              <span v-show="item.locked==1&&item.pw==0" style="color:red;">已锁定</span>
              <span v-show="item.locked==1&&item.pw==1" style="color:red;">密码锁定</span>
              <span v-show="item.locked==0" style="color:green;">未上锁</span>
              <i v-show="item.locked==1" style="background-image: url(images/icon/lock-1.png);"></i>
              <i v-show="item.locked==0" style="background-image: url(images/icon/lock-2.png);"></i>
            </div>
            <div class="coor">坐标： <i>{{ item.x }},{{ item.y }},{{ item.z }}</i></div>
            <div class="owner" v-if="item.owner==null||item.owner==''">归属： <span>未知</span></div>
            <div class="owner" v-else>归属： <span>{{ item.owner[0].name }}</span></div>
          </footer>
        </li>
        <div class="empty2" v-show="containerList==null||containerList.length<=0">
          <span>这里空空如也<br>没有找到你的箱子</span>
        </div>
      </div>

      <div class="page-items">
        <header v-show="itemList!=null&&itemList.length>0">
          <div class="head-box">
            <div class="head">
              <img src="/public/images/ItemIcons/cntChest01.png">
            </div>
            <div class="msg">
              <div class="name">
                <span>安全储物箱</span>
                <i>01</i>
              </div>
              <div class="coor">坐标 : <span>100,50,200</span></div>
            </div>
            <div class="refresh" @click="reloadItem">刷新</div>
          </div>
          <div class="head-items" style="display: none;">
            <div class="head">
              <img src="/public/images/ItemIcons/cntChest01.png">
            </div>
            <div class="msg">
              <div class="name">
                <span>Cxx的尿不湿</span>
              </div>
              <div class="num">数量 : <span>123</span></div>
              <div class="quality">品质 : <span>6</span></div>
            </div>
          </div>
        </header>
        <section v-show="itemList!=null&&itemList.length>0">

          <li class="box-items" :data-index="index" v-for="(item,index) in itemList" :key="index">
            <div class="filter">
              <!--              -->
              <img v-if="item.itemStack.CustomIcon==null||item.itemStack.CustomIcon==''"
                   :src="'404'" @error="$LoadTintImage($event.target,item.itemStack.itemName,item.CustomIconTint)">
              <img v-else :src="'404'"
                   @error="$LoadTintImage($event.target,item.itemStack.CustomIcon,item.itemStack.CustomIconTint)">
            </div>
            <div class="num">{{ item.itemStack.itemCount }}</div>
          </li>

        </section>
        <div class="empty2" v-show="itemList==null||itemList.length<=0">
          <span>这里空空如也<br>没有找到你的物品</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "../../../../assets/style/warehouse/terr-box.css"
import axios from "axios";
import $ from "jquery";
import {getCurrentInstance} from "vue";

export default {
  name: "WareTereBox",
  props: ["containerList"],
  data() {
    return {
      itemList: {},
      password: "",
      ctx: {},
      currentContainer: "",
      currentIndex: "",
    }
  },
  methods: {
    reloadItem() {
      this.queryItems(this.currentContainer, this.currentIndex);
    },
    queryItems(container, index) {
      var self = this;
      var ctx = this.ctx.appContext.config.globalProperties;
      var buyParam = {
        x: container.x + "",
        y: container.y + "",
        z: container.z + "",
        clridx: container.clr + "",
        password: this.password
      };
      axios.post("api/getContainerItems", buyParam).then(res => {
        if (res.data.respCode === "1") {
          self.itemList = res.data.data;
          $(".terr-box .page-box").hide();	//隐藏箱子列表页面
          $(".terr-box .page-items").show();	//显示物品列表页面
          $(".terr-box .page-items").data("index", index);	//将箱子下标保存到物品页面data
          $(".terr-box").data("page", "items");//保存当前所属页面到data，以便于点击返回的时候分辨出当前页面

          //alert(name)
          //渲染箱子信息
          if (container.icon == null) {
            $(".page-items .head-box>.head>img").attr("src", 'api/image/' + container.name + '.png');
          } else {
            $(".page-items .head-box>.head>img").attr("src", 'api/image/' + container.icon.Value + '.png');
          }
          $(".page-items .head-box>.msg>.name>span").text(container.sign == null || container.sign == "" ? container.nametranslate : container.sign);
          $(".page-items .head-box>.msg>.name>i").text(index + 1);
          $(".page-items .head-box>.msg>.coor>span").text(container.x + "," + container.y + "," + container.z);
        } else {
          ctx.Alert("加载失败！" + res.data.respMsg);
          ctx.popupCss(25, 13);
        }
      });
    },
    loadItems(container, index) {
      //赋值当前浏览的容器
      this.currentContainer = container;
      this.currentIndex = index;
      var playerinfo = JSON.parse(localStorage.getItem("userinfo"))
      // console.log(container);
      // console.log(playerinfo);
      var self = this;
      $("#alert>.alert>section>input").val(self.password);
      var ctx = this.ctx.appContext.config.globalProperties;
      if (container.owner != null && container.owner != "") {
        if (container.owner[0].gameentityid == playerinfo.gameentityid) {
          self.queryItems(container, index)
        } else {
          if (container.locked == "1") {
            if (container.pw == "1") {
              ctx.Prompt("这个箱子不是你的并且已设置了密码<br>请输入密码打开：", "");
              ctx.popupCss(25, 16);
              $("#alert>.alert>footer>.confirm").click(function () {
                $("#alert>.alert>section>p").html("");	//清空文本提示内容
                $("#alert").hide();
                //console.log("点击了确认");
                var password = $("#alert>.alert>section>input").val();
                self.password = password;
                //if(!pro){return;}	//玩家点了取消
                self.queryItems(container, index)
              });
            } else {
              ctx.Alert("这个容器不属于你并且已上锁，无法访问");
              ctx.popupCss(25, 13);
            }
          } else {
            self.queryItems(container, index)
          }
        }
        //不可上锁容器
      } else {
        self.queryItems(container, index)
      }

    },
    StoreAllToWare(itemInfos) {
      var ctx = this.ctx.appContext.config.globalProperties;
      var self = this;
      $("#alert>.alert>section>p").html("");	//清空文本提示内容
      $("#alert").hide();
      var cnt = 0;
      var success = 0;
      var faild = 0;
      ctx.Alert("正在处理，请稍候");
      for (var index in itemInfos) {
        var itemInfo = itemInfos[index];
        var buyParam = {
          x: self.currentContainer.x + "",
          y: self.currentContainer.y + "",
          z: self.currentContainer.z + "",
          clridx: self.currentContainer.clr + "",
          itemidx: itemInfo.idx + "",
          itemdata: itemInfo.itemStack.itemData + "",
          itemcount: itemInfo.itemStack.itemCount + "",
          price: itemInfo.itemStack.price + "",
          password: self.password
        };
        axios.post("api/TakeItem", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ctx.popupCss(25, 13);
            self.reloadItem();
            success++;

          } else {
            ctx.popupCss(25, 13);
            faild++;
          }
          cnt++;
          if (cnt >= itemInfos.length) {
            ctx.Alert(`提取完毕，共提取成功${success}个，提取失败${faild}个`);
            //调用重新加载库存
            self.$emit("queryShopItem");
          }
        });
      }
      $(".page-items").find(".head-box").show();		//显示箱子信息
      $(".page-items").find(".head-items").hide();	//隐藏物品信息
    }
  },
  mounted() {
    var self = this;
    this.ctx = getCurrentInstance();
    var ctx = this.ctx.appContext.config.globalProperties;
    //领地箱子 - 返回
    $(".terr-box>header>.back").click(function () {
      var page = $(".terr-box").data("page");	//获取保存到data的所属页面信息
      if (page == "box") {	//如果是箱子页面（直接返回到仓库列表页面）
        $(".terr-box").hide();
        $(".ware-list").fadeIn(200);
        $(".warehouse>.menu>.l1").show();	//显示 提取到背包 按钮
        $(".warehouse>.menu>.l1-replace").hide();	//隐藏 储存到仓库 按钮
        $(".Category-ware>.shield").hide();	//左侧分类导航栏解除禁止
      } else if (page == "items") {	//如果是箱子内物品页面（则返回到箱子页面）
        $(".terr-box").find(".page-box").show();	//显示箱子列表
        $(".terr-box").find(".page-items").hide();	//隐藏物品列表
        $(".terr-box").data("page", "box");
      }
    });

    //鼠标移入箱子内的物品
    $(".page-items>section").on("mouseover", ".box-items", function () {
      $(".page-items").find(".head-box").hide();	//隐藏箱子信息
      $(".page-items").find(".head-items").show();	//显示物品信息
      var xbBox = $(".terr-box .page-items").data("index");	//获取箱子下标
      var xb = $(this).data("index");		//获取当前物品下标

      var itemInfo = self.itemList[xb];
      //将物品数据渲染到页面
      if (itemInfo.itemStack.CustomIcon == null) {
        $(".page-items").find(".head-items").find("img").attr("src", 'api/image/' + itemInfo.itemStack.itemName + '.png');
      } else {
        $(".page-items").find(".head-items").find("img").attr("src", 'api/image/' + itemInfo.itemStack.CustomIcon + '.png');
      }
      $(".page-items").find(".head-items").find(".name").find("span").text(ctx.HandleItemName(itemInfo.itemStack.translate));
      $(".page-items").find(".head-items").find(".num").find("span").text(itemInfo.itemStack.itemCount);
      $(".page-items").find(".head-items").find(".quality").find("span").text(itemInfo.itemStack.itemQuality);
      if (itemInfo.itemStack.itemQuality == "" || itemInfo.itemStack.itemQuality == undefined || itemInfo.itemStack.itemQuality == "0") {
        //如果物品没有品质，就让品质信息隐藏，反之则显示
        $(".page-items").find(".head-items").find(".quality").hide();
      } else {
        $(".page-items").find(".head-items").find(".quality").show();
      }
    });

    //鼠标移出箱子内的物品
    $(".page-items>section").on("mouseout", ".box-items", function () {
      $(".page-items").find(".head-box").show();		//显示箱子信息
      $(".page-items").find(".head-items").hide();	//隐藏物品信息
      //清空页面物品渲染信息
      $(".page-items").find(".head-items").find("img").attr("src", "");
      $(".page-items").find(".head-items").find(".name").find("span").text("加载中.....");
      $(".page-items").find(".head-items").find(".num").find("span").text("");
      $(".page-items").find(".head-items").find(".quality").find("span").text("");
    });


    //点击箱子内的物品
    $(".page-items>section").on("click", ".box-items", function () {
      var xbBox = $(".terr-box .page-items").data("index");	//获取箱子下标
      var xb = $(this).data("index");		//获取当前物品下标
      var itemInfo = self.itemList[xb];
      // var id = playerBoxs.data[xbBox][xb].itemId;	//获取物品ID
      var name = ctx.HandleItemName(itemInfo.itemStack.translate);	//获取物品名称
      var img = "";
      if (itemInfo.itemStack.CustomIcon == null) {
        img = 'api/image/' + itemInfo.itemStack.itemName + '.png';
      } else {
        img = 'api/image/' + itemInfo.itemStack.CustomIcon + '.png';
      }


      var num = itemInfo.itemStack.itemCount * 1;//获取物品数量
      var qua = itemInfo.itemStack.itemQuality;//获取物品品质

      var pro;
      if (num == 1) {		//如果数量只有1件
        ctx.Confirm("您选择的物品是 " + name + "<br>是否确认将此物品储存到仓库？");
        ctx.popupCss(25, 14);
        $("#alert>.alert>footer>.confirm").click(function () {
          pro = 1;	//储存数量为1
          StoreToWare(itemInfo, pro);
        });
      } else if (num > 1) {
        ctx.Prompt("您选择的物品是 " + name + "<br>是否确认将此物品储存到仓库？<br>您当前拥有数量为 " + num + "<br>请输入你要储存的数量：", num);
        ctx.popupCss(25, 19);
        $("#alert>.alert>footer>.confirm").click(function () {
          pro = $("#alert>.alert>section>input").val() * 1;
          if (isNaN(pro)) {
            ctx.Alert("请输入正确的数字！");
            ctx.popupCss(25, 13);
            return;
          }
          if (pro <= 0) {
            ctx.Alert("储存的数量必须是大于0的整数！");
            ctx.popupCss(25, 13);
            return;
          }
          if (pro > num) {
            ctx.Alert("储存的数量不能大于拥有的数量！<br>您当前拥有的数量为 <font color='dodgerblue'>" + num + "</font> 件");
            ctx.popupCss(25, 14);
            return;
          }
          pro *= 1;
          StoreToWare(itemInfo, pro);
        });

      }

      function StoreToWare(itemInfo, count) {
        $("#alert>.alert>section>p").html("");	//清空文本提示内容
        $("#alert").hide();

        var buyParam = {
          x: self.currentContainer.x + "",
          y: self.currentContainer.y + "",
          z: self.currentContainer.z + "",
          clridx: self.currentContainer.clr + "",
          itemidx: itemInfo.idx + "",
          itemdata: itemInfo.itemStack.itemData + "",
          itemcount: count + "",
          price: itemInfo.itemStack.price + "",
          password: self.password
        };
        axios.post("api/TakeItem", buyParam).then(res => {
          if (res.data.respCode === "1") {
            ctx.Alert("存储成功，可以前往仓库查看");
            ctx.popupCss(25, 13);
            self.reloadItem();
            //调用重新加载库存
            self.$emit("queryShopItem");
          } else {
            ctx.Alert("储存失败！" + res.data.respMsg);
            ctx.popupCss(25, 13);
          }
        });
        $(".page-items").find(".head-box").show();		//显示箱子信息
        $(".page-items").find(".head-items").hide();	//隐藏物品信息
      }


    });


    $(".warehouse>.menu>.l1-replace").click(function () {	//彩色按钮 - 储存到仓库
      self.formPage = "storageTosystem";
      var ctx = self.ctx.appContext.config.globalProperties;
      var page = $(".terr-box").data("page");
      if (page == "box") {
        ctx.Alert("请选择一个箱子");
        ctx.popupCss(25, 13);
        return;
      }
      //判断容器状态
      var containerCount = self.itemList.length;
      if (containerCount <= 0) {
        ctx.Alert("箱子里是空的，没有可以储存的物品！");
        ctx.popupCss(28, 13);
        return;
      }


      self.Confirm("你的箱子里有 " + containerCount + " 件物品<br>是否确认把箱子内所有物品储存到仓库？");
      ctx.popupCss(28, 15);
      $("#alert>.alert>footer>.confirm").click(function () {
        $("#alert>.alert>section>p").html("");	//清空文本提示内容
        $("#alert").hide();
        self.StoreAllToWare(self.itemList);
        ctx.popupCss(25, 13);
      });
      // if(con){

      // }
    });

  }
}
</script>

<style scoped>

</style>
