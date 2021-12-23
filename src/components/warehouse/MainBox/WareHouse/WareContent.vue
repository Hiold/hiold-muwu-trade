<template>
  <section>
    <!-- 专题区域、详细内容 -->
    <!-- 头部工具栏 -->
    <header class="head-tool">
      <h1>个人仓库</h1>
      <div class="serch">
        <input type="text" class="name-id" placeholder="请输入物品名称或ID" oninput="searchItems()">
        <div class="btn"></div>
      </div>
      <div class="display">
        <li class="l1" data-click="true">卡片</li>
        <li class="l2">图标</li>
        <li class="l3">列表</li>
      </div>
    </header>
    <!-- 物品列表 -->

    <div class="warehouse">
      <div class="menu">  <!-- 左侧彩色菜单 -->
        <li class="l1">
          <div class="icon"></div>
          <div class="title">提取到背包</div>
        </li>
        <li class="l1-replace" style="display:none;">
          <div class="icon"></div>
          <div class="title">储存到仓库</div>
        </li>
        <li class="l2">
          <div class="icon"></div>
          <div class="title">领地箱子</div>
        </li>
        <li class="l3">
          <div class="icon"></div>
          <div class="title">收藏夹</div>
        </li>
        <li class="l4">
          <div class="icon"></div>
          <div class="title">工作台</div>
        </li>
        <li class="l5">
          <div class="icon"></div>
          <div class="title">操作记录</div>
        </li>
        <!-- <li class="l6">
          <div class="icon"></div>
          <div class="title">使用说明</div>
        </li> -->
      </div>
      <div class="ware-list">  <!-- 仓库物品列表 -->
        <shop-item v-for="(item,index) in shop" :key="item.id" :item="item" :index="index"
                   @showdetail="showdetail"></shop-item>

        <div class="loading">加载中<i></i></div>
        <div class="empty" v-if="!shop||shop.length<=0">
          <span>这里空空如也<br>快去商城逛逛吧</span>
        </div>
        <!-- <li class="ware-items">
          <header>南瓜灯</header>
          <section>
            <div class="left">
              <div class="img">
                <img src="images/items/decoPumpkinJackOLantern.png">
                <div class="quality">6</div>
              </div>
              <footer>数量 :<span>123</span>件</footer>
            </div>
            <div class="right">
              <div class="btn-1">详情</div>
              <div class="btn-2">提取</div>
              <div class="btn-3">丢弃</div>
            </div>
          </section>
        </li> -->
      </div>


      <div class="ware-details">  <!-- 仓库物品详情页 -->
        <header>
          <span class="name">南瓜灯</span>
          <i class="back" title="返回"></i>
        </header>
        <section>
          <div class="left">
            <header>
              <div class="c1">物块模型</div>
              <div class="c2">家具装饰</div>
              <div class="c3">Mod物品</div>
            </header>
            <div class="img">
              <img src="images/items/decoPumpkinJackOLantern.png">
            </div>
            <footer>
              <div class="num">数量 :<span>123</span>件</div>
              <div class="quality">品质 :<span>6</span></div>
            </footer>
          </div>
          <div class="right">
            <div class="btn-1">提取物品</div>
            <div class="btn-2">出售物品</div>
            <div class="btn-3">配方制作</div>
            <div class="btn-4">丢弃物品</div>
          </div>
        </section>
        <footer>
          <div class="desc">物品介绍</div>
        </footer>
      </div>
      <div class="terr-box" data-page="box">    <!-- 领地箱子 -->
        <header>
          <i></i>
          <span class="title">领地箱子</span>
          <div class="back" title="返回"></div>
        </header>
        <section>
          <div class="page-box">
            <!-- <li class="player-box">
              <header>安全储物箱</header>
              <section>
                <img src="images/itemIcons/cntChest01.png">
              </section>
              <footer>
                <div class="num">编号： <span>01</span></div>
                <div class="locked">
                  状态：
                  <span style="color:red;">已锁定</span>
                  <i style="background-image: url(images/icon/lock-1.png);"></i>
                </div>
                <div class="coor">坐标： <i>1000,100,2000</i></div>
                <div class="owner">归属： <span>热心の小白鼠</span></div>
              </footer>
            </li> -->
            <div class="empty2">
              <span>这里空空如也<br>没有找到你的箱子</span>
            </div>
          </div>
          <div class="page-items">
            <header>
              <div class="head-box">
                <div class="head">
                  <img src="images/ItemIcons/cntChest01.png">
                </div>
                <div class="msg">
                  <div class="name">
                    <span>安全储物箱</span>
                    <i>01</i>
                  </div>
                  <div class="coor">坐标 : <span>100,50,200</span></div>
                </div>
                <div class="refresh">刷新</div>
              </div>
              <div class="head-items" style="display: none;">
                <div class="head">
                  <img src="images/ItemIcons/cntChest01.png">
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
            <section>
              <li class="box-items">
                <div class="filter">
                  <img src="images/ItemIcons/armorSantaHat.png">
                </div>
                <div class="num">123</div>
              </li>
              <li class="box-items">
                <div class="filter">
                  <img src="images/ItemIcons/casinoCoin.png">
                </div>
                <div class="num">20000</div>
              </li>

            </section>
            <div class="empty2" style="display: none;">
              <span>这里空空如也<br>没有找到你的物品</span>
            </div>
          </div>
        </section>
      </div>
      <div class="order-record">
        <header>
          <i></i>
          <span class="title">操作记录</span>
          <div class="back" title="返回"></div>
        </header>
        <section>
          <li>
            2021/10/5 上午1:23:32<br>
            <span>购买商品</span>
            <span><b>南瓜灯</b></span>
            <span>10件</span>
          </li>
          <li>
            2021/10/5 上午1:23:32<br>
            <span>丢弃物品</span>
            <span><b>公爵赌场币</b></span>
            <span>20000件</span>
          </li>
          <li>啊啊啊啊啊</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </section>
      </div>
    </div>

  </section>
</template>

<script>
//导入样式
import '../../../../assets/style/warehouse/ware.css'
import '../../../../assets/style/shop-nav.css'
import '../../../../assets/style/headTool.css'
import ShopItem from "@/components/warehouse/MainBox/WareHouse/WareItem";
import $ from "jquery";

//引入juqery
ShopItem

export default {
  name: "ShopContent",
  props: ["class1", "class2"],
  components: {"ShopItem": ShopItem},
  data() {
    return {
      isdetailShow: false,
      item: {},
      formPage: "",
      shop: [{
        "id": "积分",
        "name": "积分兑换券",
        "image": "images/items/jf2.png",
        "quality": "3",
        "num": "1000",
        "currency": "积分",
        "price": "1000",
        "discount": "7.8",
        "prefer": "999",
        "desc": "<span style='color:mediumpurple;font-size:1.2rem;font-weight:bold;'>这个物品可以跟档</span><br><font color='orangered'><b>网页专属积分兑换券</b></font><br>在仓库中使用可获得对应数量积分",
        "class1": "特殊商品",
        "class2": "货币兑换",
        "classMod": true,
        "sales": "88888",
        "hot": "auto",
        "hotSet": "888",
        "show": "auto",
        "stock": "11",
        "collect": "55",
        "sell": true,
        "xgLevel": false,
        "xgDay": "10",
        "xgAll": "false",
        "follow": false,
        "year": 2021,
        "mon": 12,
        "day": 31,
        "hour": 18,
        "min": 0,
        "sec": 0,
        "collected": true
      }],
      comCard: "",
      playerCollects: [],//收藏
      playerBuys: [],//购买
      playerIndex: "",
      Display: "",
      playerName: "",
      steamID: "",
      localization: ""

    }
  },
  methods: {
    showdetail() {

    }
  }
  , mounted() {
    $(".loading").hide();
  }
}
</script>

<style scoped>

</style>
