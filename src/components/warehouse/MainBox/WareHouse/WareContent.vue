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
                           @showdetail="showdetail" @deleteItem="deleteItem" @deliver="deliver"
                           @sellOut="sellOut" @craft="craft" @deleteItemForDetail="deleteItemForDetail"></shop-item>

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

            <!--加载detail模板-->
            <WareItemDetails></WareItemDetails>
            <WareTereBox></WareTereBox>

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
    import '../../../../assets/style/warehouse/ware-nav.css'
    import '../../../../assets/style/headTool.css'
    import WareItem from "/src/components/warehouse/MainBox/WareHouse/WareItem.vue";
    import WareItemDetails from "/src/components/warehouse/MainBox/WareHouse/WareItemDetails.vue";
    import WareTereBox from "/src/components/warehouse/MainBox/WareHouse/WareTereBox.vue";
    import $ from "jquery";

    //引入juqery

    export default {
        name: "ShopContent",
        props: ["class1", "class2"],
        components: {"ShopItem": WareItem, "WareItemDetails": WareItemDetails, "WareTereBox": WareTereBox},
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
            deleteItemForDetail(item) {	//仓库物品详情页-丢弃物品
                var num = item.num * 1;	//获取物品数量
                var con;
                if (num == 1) {
                    self.Confirm("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿");
                    self.popupCss(25, 14);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        con = 1;
                    });
                } else {
                    this.Prompt("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿<br>请输入你要丢弃的数量：", num);
                    self.popupCss(25, 18);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        con = $("#alert>.alert>section>input").val() * 1;
                    });
                }
                $("#alert>.alert>footer>.confirm").click(function () {
                    $("#alert>.alert>section>p").html("");	//清空文本提示内容
                    $("#alert").hide();

                    $(".ware-list").fadeIn(200);	//显示仓库物品列表
                    $(".ware-details").hide();		//隐藏物品详情页
                });
                console.log("成功删除:" + con)
            },
            craft(item) {	//仓库物品详情页-配方制作
                //加载页面
                console.log(this.getTime().date + "\n正在加载页面 - 工作台 ......" + item.name);

            },
            sellOut(item) {	//仓库物品详情页-出售物品
                $("#alert,#alert>.window").show();	//显示出售物品的确认框
                var name = item.name;	//名称
                var img = item.image;	//图标
                var num = item.num;		//数量
                var qua = item.quality;	//品质
                if (qua == "" || qua == undefined || qua == 0) {
                    $("#alert>.window>section>header>.msg>.quality").hide();
                } else {
                    $("#alert>.window>section>header>.msg>.quality").show();
                }
                //alert(qua)
                //将物品数据渲染到页面
                $("#alert>.window>section>header>.head>img").attr("src", img);	//图标
                $("#alert>.window>section>header>.msg>.name").html(name);		//名称
                $("#alert>.window>section>header>.msg>.num").text("x" + num);		//数量
                $("#alert>.window>section>header>.msg>.quality").text("品质：" + qua);	//品质
                $("#alert>.window>section>div>.val>input").val("");		//清空输入框

            },
            deliver(item) {	//仓库物品详情页-提取/使用
                var txt = $(this).text();	//获取按钮文本内容，有“提取物品”和“使用物品”两种情况
                if (txt == "提取物品") {
                    var suc = this.pickUpItems(item);	//调用提取函数
                    if (suc) {	//如果函数返回true则表示提取成功
                        $(".ware-list").fadeIn(200);	//显示仓库物品列表
                        $(".ware-details").hide();		//隐藏物品详情页
                    }
                } else if (txt == "使用物品") {
                    this.useItems(item);	//调用使用物品函数
                }
            },
            deleteItem(item) {	//仓库卡片-丢弃
                var num = item.num * 1;	//获取物品数量
                var con;
                if (num == 1) {
                    self.Confirm("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿");
                    self.popupCss(25, 14);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        con = 1;
                    });
                    //if(con){con=1}
                } else {
                    this.Prompt("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿<br>请输入你要丢弃的数量：", num);
                    self.popupCss(25, 18);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        con = $("#alert>.alert>section>input").val() * 1;
                    });
                }
                $("#alert>.alert>footer>.confirm").click(function () {
                    $("#alert>.alert>section>p").html("");	//清空文本提示内容
                    $("#alert").hide();
                    console.log("确认丢弃" + con)
                });
            },
            showdetail(item, target) {
                //仓库卡片-详情

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

                $(".ware-list").hide();		//隐藏仓库物品列表
                $(".ware-details").fadeIn(100);	//显示仓库物品详情页面

                var name = item.name;	//获取物品名称
                var img = item.image;	//获取物品图片
                var c1 = item.class1;	//获取物品总分类
                var c2 = item.class2;	//获取物品子分类
                var c3 = item.mod;		//获取物品是否为mod
                var num = item.num;		//获取物品拥有数量
                var qua = item.quality;	//获取物品品质
                var desc = item.desc;	//获取物品介绍
                //将物品信息渲染到页面
                $(".ware-details>header>.name").text(name);	//名称
                $(".ware-details>section>.left>.img>img").attr("src", img);//图片
                $(".ware-details>section>.left>header>.c1").text(c1);	//总分类
                $(".ware-details>section>.left>header>.c2").text(c2);	//子分类
                if (c1 == "特殊商品") {
                    $(".ware-details>section>.left>header>.c3").show().text("网页专属");	//mod
                    $(".ware-details>section>.right>.btn-1").text("使用物品");
                } else {
                    $(".ware-details>section>.right>.btn-1").text("提取物品");
                }
                if (c3 == "true") {
                    $(".ware-details>section>.left>header>.c3").show().text("Mod物品");	//mod
                }
                if (c1 != "特殊商品" && c3 != "true") {
                    $(".ware-details>section>.left>header>.c3").hide();
                }

                $(".ware-details>section>.left>footer>.num>span").text(num);	//数量
                if (qua > 0) {	//品质
                    $(".ware-details>section>.left>footer>.quality").show().find("span").text(qua);
                } else {
                    $(".ware-details>section>.left>footer>.quality").hide();
                }
                $(".ware-details>footer>.desc").html(desc);	//介绍说明
            },
            pickUpItems(item) {	//提取仓库物品
                var num = item.num * 1;	//获取物品数量
                var con;
                if (num == 1) {	//如果只有一件物品
                    self.Confirm("是否确认要将此物品提取到背包？<br>请确保游戏在线且背包容量充足");
                    self.popupCss(25, 14);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        con = 1;
                        extract();
                    });
                } else {	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
                    this.Prompt("是否确认要将此物品提取到背包？<br>请确保游戏在线且背包容量充足<br>输入你要提取的数量：", num);
                    self.popupCss(25, 18);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        //alert(123)
                        con = $("#alert>.alert>section>input").val() * 1;
                        if (con == "" || con == null) {
                            return
                        }
                        if (isNaN(con) || con <= 0 || (con % con != 0)) {
                            self.Alert("提取数量必须是 ≥1 的整数！");
                            self.popupCss(25, 13);
                            return;
                        }
                        if (con > num) {	//如果输入的数量大于拥有的数量
                            self.Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 " + num + " 件物品<br>最多也只能提取 " + num + " 件物品");
                            self.popupCss(25, 16);
                            return;
                        }
                        // extract();
                    });
                }

                //$("#alert>.alert>footer>.confirm").click(function(){
                function extract() {
                    //alert(con)
                    $("#alert>.alert>section>p").html("");	//清空文本提示内容
                    $("#alert").hide();
                    console.log("点击了确认");
                    //这一步可能需要后端进行验证
                    //........
                    var suc = true;	//假设这是后端传回来的数据，表示验证成功
                    if (suc) {
                        self.Alert("提取成功！<br>物品已发送到您的背包");
                        self.popupCss(25, 14);
                        $(".ware-details>header>.back").click();	//返回仓库物品列表页面
                        // recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>提取物品</span><span><b>"+name+"</b></span><span>"+con+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
                        return true;
                    } else {
                        self.Alert("提取失败！");
                        self.popupCss(25, 13);
                        return false;
                    }
                }
            },
            useItems(item) {
                //使用仓库物品
                var id = item.id;		//获取物品ID
                var type = item.class2;	//获取物品所属子分类
                var num = item.num * 1;	//获取物品数量
                if (type == "货币兑换") {	//如果物品类型为货币兑换
                    var use;
                    if (num == 1) {	//如果只有一件物品
                        //Confirm("是否确认使用物品？");
                        //popupCss(25,14);
                        //$("#alert>.alert>footer>.confirm").click(function(){
                        use = 1;
                        num -= use;		//减去使用的数量
                        //alert(num)
                        if (id == "积分") {		//如果使用的物品是积分兑换券
                            var point = this.playerinfo.points * 1;	//获取玩家拥有的积分
                            point += use;	//给玩家增加对应数量的积分
                            this.playerinfo.points = point;	//将玩家积分保存到obj对象
                            self.Alert("恭喜你获得了 <font color='orange'>" + use + "</font> 积分！<br>积分已发送至您的账号");
                            self.popupCss(25, 14);
                        } else if (id == "钻石") {
                            var zs = this.playerinfo.diamonds * 1;	//获取玩家拥有的钻石
                            zs += use;	//给玩家增加对应数量的钻石
                            this.playerinfo.diamonds = zs;	//将玩家钻石保存到obj对象
                            self.Alert("恭喜你获得了 <span style='color:rgb(249,102,112);'>" + use + "</span> 钻石！<br>钻石已发送至您的账号");
                            self.popupCss(25, 14);
                            // GeneratePlayer();	//重新在页面渲染玩家数据
                        }

                    } else {	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
                        this.Prompt("您当前拥有 " + num + " 件物品<br>请输入你要使用的数量：", num);
                        self.popupCss(25, 18);
                        $("#alert>.alert>footer>.confirm").click(function () {
                            //alert(1)
                            $("#alert>.alert>section>p").html("");	//清空文本提示内容
                            $("#alert").hide();
                            var use = $("#alert>.alert>section>input").val() * 1;
                            //console.log("点击了确认");
                            if (use == "") {
                                return
                            }
                            if (isNaN(use) || use <= 0 || (use % use != 0)) {
                                self.Alert("使用数量必须是 ≥1 的整数！");
                                self.popupCss(25, 13);
                                return;
                            }
                            if (use > num) {	//如果输入的数量大于拥有的数量
                                self.Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 " + num + " 件物品<br>最多也只能使用 " + num + " 件物品");
                                self.popupCss(25, 16);
                                return;
                            }
                            num -= use;		//减去使用的数量
                            //alert(num)
                            if (id == "积分") {		//如果使用的物品是积分兑换券
                                var point = this.playerinfo.points * 1;	//获取玩家拥有的积分
                                point += use;	//给玩家增加对应数量的积分
                                this.playerinfo.points = point;	//将玩家积分保存到obj对象
                                self.Alert("恭喜你获得了 <font color='orange'>" + use + "</font> 积分！<br>积分已发送至您的账号");
                                self.popupCss(25, 14);
                            } else if (id == "钻石") {
                                var zs = this.playerinfo.diamonds * 1;	//获取玩家拥有的钻石
                                zs += use;	//给玩家增加对应数量的钻石
                                this.playerinfo.diamonds = zs;	//将玩家钻石保存到obj对象
                                self.Alert("恭喜你获得了 <span style='color:rgb(249,102,112);'>" + use + "</span> 钻石！<br>钻石已发送至您的账号");
                                self.popupCss(25, 14);
                            }


                        });

                    }
                    $("#alert>.alert>footer>.confirm").click(function () {
                        //alert(2)
                        console.log("确认操作")
                        $(".ware-details>header>.back").click();	//返回仓库物品列表页面
                    });


                } else if (type == "礼包抽奖") {
                    var use2;
                    if (num == 1) {	//如果只有一件物品，无需弹出输入框
                        use = 1;
                        uselb();
                    } else {	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
                        this.Prompt("您当前拥有 " + num + " 件物品<br>请输入你要使用的数量：", num);
                        self.popupCss(25, 18);
                        $("#alert>.alert>footer>.confirm").click(function () {
                            $("#alert>.alert>section>p").html("");	//清空文本提示内容
                            $("#alert,#alert>.alert").hide();
                            //console.log("点击了确认");
                            use2 = $("#alert>.alert>section>input").val() * 1;
                            if (use2 == "") {
                                return
                            }
                            if (isNaN(use2) || use2 <= 0 || (use2 % use2 != 0)) {
                                self.Alert("使用数量必须是 ≥1 的整数！");
                                self.popupCss(25, 13);
                                return;
                            }
                            if (use2 > num) {	//如果输入的数量大于拥有的数量
                                self.Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 " + num + " 件物品<br>最多也只能使用 " + num + " 件物品");
                                self.popupCss(25, 16);
                                return;
                            }
                            uselb();
                        });

                    }

                } else if (type == "专属服务") {
                    self.Alert("专属服务可能需要在游戏内与服务器管理员进行互动<br>请联系服务器管理员使用此物品<br>若是已经使用过，请丢弃此物品");
                    self.popupCss(32, 16, 1.1);
                    return;
                } else if (type == "抵用券") {
                    self.Confirm("抵用券需要在商城购买商品时使用<br>是否立即前往？");
                    self.popupCss(25, 14);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        $("#alert>.alert>section>p").html("");	//清空文本提示内容
                        $("#alert").hide();
                        $(".Main-menu>.menu-1").click();
                    });
                    return;
                } else {
                    if (id == "补签卡") {
                        self.Alert("此物品需要在签到页面中使用");
                        self.popupCss(25, 13);
                    } else {
                        self.Alert("该物品没有明确分类，可能为公告说明类提示信息<br>若有疑问请联系服务器管理员进行使用");
                        self.popupCss(32, 14, 1.1);
                    }
                    return;
                }

                function uselb(item) {
                    console.log("使用了物品：" + item.name);
                }
            }
        }
        ,
        mounted() {
            $(".loading").hide();
            var self = this;


            function cardToIcon() {	//将卡片转换为图标
                $(".ware-items>header,.ware-items>section>.right,.ware-items>section>.left>footer").hide();	//隐藏头部、脚部 和 侧面
                $(".ware-items>section>.left>.img>.quality").css("opacity", "0");		//隐藏品质（仅保留图片）
                $(".ware-items>section").css({				//调整图片父元素容器1的样式
                    "height": "100%",
                    "transform": "scale(0.8)"
                });
                $(".ware-items>section>.left").css({		//调整图片父元素容器2的样式
                    "width": "100%"
                });
                $(".ware-items>section>.left>.img").css({		//调整图片区域的样式
                    "height": "100%",
                    "transform": "scale(0.9)",
                    "padding-left": "0"
                });
                $(".ware-items").css({	//调整整个卡片的样式
                    "width": "18%",
                    "height": "5.5rem",
                    "margin": "1%"
                });
            }

            function iconToCard() {	//将图标转换为卡片
                $(".ware-items>header,.ware-items>section>.right,.ware-items>section>.left>footer").show();	//隐藏头部、脚部 和 侧面
                $(".ware-items>section>.left>.img>.quality").css("opacity", "1");		//隐藏品质（仅保留图片）
                $(".ware-items>section").css({				//调整图片父元素容器的样式
                    "height": "78%",
                    "transform": "scale(1)"
                });
                $(".ware-items>section>.left").css({		//调整图片父元素容器的样式
                    "width": "70%"
                });
                $(".ware-items>section>.left>.img").css({		//调整图片区域的样式
                    "height": "78%",
                    "transform": "scale(1)",
                    "padding-left": "1rem"
                });
                $(".ware-items").css({	//调整整个卡片的样式
                    "width": "48%",
                    "height": "9rem",
                    "margin": "1%"
                });
            }

            $(".head-tool>.display>.l2").click(function () {	//物品显示类型：图标
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
            $(".head-tool>.display>.l1").click(function () {	//物品显示类型：卡片
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
            $(".head-tool>.display>li").hover(function () {	//物品显示类型 悬浮特效
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

            $(".ware-list").on("click", ".ware-items .left", function () {	//仓库卡片-点击图片打开详情页
                $(this).parents(".ware-items").find(".btn-1").click();
            });

            // $(".ware-list").on("click",".ware-items .btn-1",function(){
            // });


            $(".ware-list").on("click", ".ware-items .btn-2", function () {	//仓库卡片-提取/使用
                var xb = $(this).parents(".ware-items").data("index");	//获取物品在数组中的下标
                var txt = $(this).text();	//获取按钮文本内容，有“提取”和“使用”两种情况
                if (txt == "提取") {
                    self.pickUpItems(xb);	//调用提取函数
                } else if (txt == "使用") {
                    //alert("功能正在制作中。。。");
                    //var xb = $(this).parents(".ware-items").data("index");	//获取物品在仓库数组中的下标
                    // useItems(xb);	//调用使用物品函数
                    console.log("使用物品")
                }
            });

            //丢弃
            // $(".ware-list").on("click", ".ware-items .btn-3", );
            //使用
            // $(".ware-details>section>.right>.btn-1").click();
            //出售
            // $(".ware-details>section>.right>.btn-2").click();
            //制作
            // $(".ware-details>section>.right>.btn-3").click();
            //丢弃 详情页
            // $(".ware-details>section>.right>.btn-4").click();
            $(".ware-details>header>.back").click(function () {			//仓库物品详情页-返回按钮
                $(".ware-list").fadeIn(200);
                $(".ware-details").hide();
            });

            $(".warehouse>.menu>.l1").click(function () {		//彩色按钮 - 提取到背包
                self.Confirm("是否将当前分类下所有物品提取到背包？<br>您选中提取的分类是 : <font color='orangered'>" + this.class2 + "</font><br>请确保背包容量充足");
                self.popupCss(28, 16);
                $("#alert>.alert>footer>.confirm").click(function () {
                    $("#alert>.alert>section>p").html("");	//清空文本提示内容
                    $("#alert").hide();
                    //console.log("点击了确认");
                    //这一步可能需要后端验证
                    //.....
                    var suc = true;	//假设这是后端传回来的数据，表示验证成功
                    if (suc) {
                        //暂时声明为true
                        var fn = true;
                        if (fn) {
                            self.Alert("提取成功！<br>物品已发送到您的背包");
                            self.popupCss(25, 14);
                        } else if (!fn) {
                            self.Alert("仓库没有任何可提取的东西！");
                            self.popupCss(25, 13);
                        }
                    } else {
                        self.Alert("提取失败！");
                        self.popupCss(25, 13);
                    }
                });
            });


            $(".warehouse>.menu>.l1-replace").click(function () {	//彩色按钮 - 储存到仓库
                var page = $(".terr-box").data("page");
                if (page == "box") {
                    self.Alert("请选择一个箱子");
                    self.popupCss(25, 13);
                    return;
                }
                //判断容器状态
                var containerStatus = false;
                if (containerStatus) {
                    self.Alert("箱子里是空的，没有可以储存的物品！");
                    self.popupCss(28, 13);
                    return;
                }

                var containerCount = 95;
                self.Confirm("你的箱子里有 " + containerCount + " 件物品<br>是否确认把箱子内所有物品储存到仓库？");
                self.popupCss(28, 15);
                $("#alert>.alert>footer>.confirm").click(function () {
                    $("#alert>.alert>section>p").html("");	//清空文本提示内容
                    $("#alert").hide();
                    //console.log("点击了确认");
                    //arrboxToObj();
                    self.Alert("储存成功！");
                    self.popupCss(25, 13);
                });
                // if(con){

                // }
            });

            $(".warehouse>.menu>.l2").click(function () {		//彩色按钮 - 领地箱子
                $(".ware-list,.ware-details,.order-record").hide();	//隐藏其它不相关页面

                $(".terr-box").fadeIn(200);			//显示领地箱子页面
                $(".warehouse>.menu>.l1").hide();	//隐藏 提取到背包 按钮
                $(".warehouse>.menu>.l1-replace").show();	//显示 储存到仓库 按钮
                $(".Category-ware>.shield").show();	//禁止点击左侧分类导航栏
                //$(".Category-ware").css("width","0px");
                //$("main>article>section").css("width","95%");
                // GenerateBox();	//渲染玩家领地箱子到页面
                // adaptive();	//自适应布局
            });

            $(".warehouse>.menu>.l3").click(function () {		//彩色按钮 - 收藏夹
                console.log(this.getTime().date + "\n加载页面 - 我的收藏 ......");
                // $("main>article").load("page/collect.html", function () {
                //     $(".head-tool,.collect-box,.Collect-ware").hide();
                //     console.log(getTime().date + "\n我的收藏 页面加载成功！");
                //     //GenerateColl();
                // });
                // setTimeout(function () {
                //     $(".collect-box").fadeIn(200);
                //     $(".head-tool").fadeIn(50);
                //     $(".Collect-ware").fadeIn(50);
                //     //GenerateColl("全部");	//渲染收藏列表到页面
                //     setTimeout(function () {
                //         $(".Collect-ware>.btn-1").click();
                //     }, 100);
                //     adaptive();	//调整样式
                // }, 100);
            });
            $(".warehouse>.menu>.l4").click(function () {		//彩色按钮 - 工作台
                console.log(this.getTime().date + "\n正在加载页面 - 工作台 ......");
                //$("body>.data-recipe").load("Config/recipes.xml",function(){	//先加载配方
                //console.log(getTime().date+"\n物品配方加载成功！");
                // $("main>article").load("page/work.html", function () {		//加载工作台页面
                //     $(".head-tool,.workbench>aside,.work-page").hide();
                //     console.log(getTime().date + "\n工作台 页面加载成功！");
                //     setTimeout(function () {
                //         $(".workbench>aside").fadeIn(200);
                //         $(".work-page").fadeIn(200);
                //         $(".head-tool").fadeIn(50);
                //         setTimeout(function () {
                //             adaptive();
                //         }, 20);
                //
                //     }, 10);
                // });
                //});

            });

            $(".warehouse>.menu>.l5").click(function () {		//彩色按钮 - 订单记录
                //alert(123)
                $(".ware-list,.ware-details,.terr-box").hide();	//隐藏其它不相关页面
                $(".order-record").fadeIn(200);			//显示领地箱子页面
                $(".warehouse>.menu>.l1,.warehouse>.menu>.l1-replace").hide();	//隐藏 提取到背包/储存到仓库 按钮
                $(".Category-ware>.shield").show();	//禁止点击左侧分类导航栏
                //console.log(recordConsole[playerIndex])
                // GenerateOrder();	//渲染订单详情列表
            });

            //关闭出售物品窗口
            $("#alert>.window>footer>.close").click(function () {
                $("#alert,#alert>.window").fadeOut(50);
            });
            $("#alert>.window>header>i").click(function () {
                $("#alert,#alert>.window").fadeOut(50);
            });
            //出售物品窗口 增加按钮
            $("#alert>.window>section>div>.val>.add").unbind("click");
            $("#alert>.window>section>div>.val>.add").click(function () {
                var num = $(this).prev().val() * 1;
                num++;
                $(this).prev().val(num);
            });
            //出售物品窗口 减少按钮
            $("#alert>.window>section>div>.val>.reduce").unbind("click");
            $("#alert>.window>section>div>.val>.reduce").click(function () {
                var num = $(this).next().val() * 1;
                num--;
                if (num <= 0) {		//填入的数字至少为1
                    num = 1;
                }
                $(this).next().val(num);
            });
            //确认出售物品
            $("#alert>.window>footer>.confirm").unbind("click");

            // $("#alert>.window>footer>.confirm").click(function () {
            //     var xb = $("#alert>.window").data("index");	//获取物品在仓库数组中的下标
            //     var have = item.num * 1;	//获取物品拥有数量
            //     //获取输入的内容
            //     var valNum = $("#alert>.window>section>.count>.val>input").val() * 1;
            //     var valPrice = $("#alert>.window>section>.price>.val>input").val() * 1;
            //     if (valNum == "") {
            //         alert("输入的数量不能为空！");
            //         //popupCss(25,13);
            //         return;
            //     } else if (valNum > have) {
            //         alert("出售的数量不能大于拥有的数量！\n您当前拥有 " + have + " 件");
            //         $("#alert>.window>section>.count>.val>input").val(have);
            //         return;
            //     }
            //     if (valPrice == "") {
            //         alert("输入的价格不能为空！");
            //         //popupCss(25,13);
            //         return;
            //     }
            //     if (isNaN(valNum) || isNaN(valPrice)) {
            //         alert("输入的内容有误！");
            //         //popupCss(25,13);
            //         return;
            //     }
            //     //以上操作验证无误后，进行出售操作
            //     var id = item.id;
            //     var name = item.name;
            //     var qua = item.quality;
            //     //给个人商店数组添加出售的物品
            //     playerStore[playerIndex][playerStore[playerIndex].length] = ["交易类型:出售", "名称:" + name, "ID:" + id, "数量:" + valNum, "价格:" + valPrice, "品质:" + qua];
            //     //arrPStoreToObj();
            //
            //     //alert(xb)
            //     var num = have - valNum;	//计算出售后仓库剩余的数量
            //     playerWare[playerIndex][xb][1][1] = "数量:" + num;
            //     if (num == 0) {		//如果使用后数量为0
            //         playerWare[playerIndex].splice(xb, 1);	//删除仓库数组中对应下标物品
            //     }
            //     arrwareToObj();		//将更新的数组重新转换obj格式
            //     GenerateWare(arrClass1, arrClass2);	//重新渲染仓库
            //     $("#alert,#alert>.window").hide();
            //     $(".warehouse>.ware-details").hide();
            //     $(".warehouse>.ware-list").show();
            //     var point = this.playerinfo.points;
            //     var diamond = this.playerinfo.diamonds;
            //     if (qua == 0) {
            //         recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date + "<br><span>出售物品 <b>" + name + "</b> <i>" + valNum + "件</i></span><br><span>出售价格 <font color='orange'><b>" + valPrice + "</b></font> 积分</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
            //     } else {
            //         recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date + "<br><span>出售物品 <b>" + name + "</b><font style='font-size:0.9em;'>(品质: " + qua + ")</font> <i>" + valNum + "件</i></span><br><span>出售价格 <font color='orange'><b>" + valPrice + "</b></font> 积分</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
            //     }
            //
            //     Alert("出售成功！<br>可前往交易中心页面<br>查询您出售的物品");
            //     popupCss(22, 15);
            // });


        }
    }
</script>

<style scoped>

</style>
