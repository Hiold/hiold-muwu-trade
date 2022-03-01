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
                    <header>安全储物箱</header>
                    <section>
                        <img v-if="item.icon==null" :src="'api/image/'+item.name+'.png'">
                        <img v-else :src="'api/image/'+item.icon.Value+'.png'">
                    </section>
                    <footer>
                        <div class="num">编号： <span>{{index+1}}</span></div>
                        <div class="locked">
                            状态：
                            <span v-show="item.locked==1&&item.pw==0" style="color:red;">已锁定</span>
                            <span v-show="item.locked==1&&item.pw==1" style="color:red;">密码锁定</span>
                            <span v-show="item.locked==0" style="color:green;">已解锁</span>
                            <i v-show="item.locked==1" style="background-image: url(images/icon/lock-1.png);"></i>
                            <i v-show="item.locked==0" style="background-image: url(images/icon/lock-2.png);"></i>
                        </div>
                        <div class="coor">坐标： <i>{{item.x}},{{item.y}},{{item.z}}</i></div>
                        <div class="owner" v-if="item.owner==null||item.owner==''">归属： <span>未知</span></div>
                        <div class="owner" v-else>归属： <span>{{item.owner[0].name}}</span></div>
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
                        <div class="refresh">刷新</div>
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
                            <img v-if="item.itemStack.CustomIcon==null"
                                 :src="'api/image/'+item.itemStack.itemName+'.png'">
                            <img v-else :src="'api/image/'+item.itemStack.CustomIcon+'.png'">
                        </div>
                        <div class="num">{{item.itemCount}}</div>
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
            }
        },
        methods: {
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
                        $(".page-items .head-box>.msg>.name>span").text(container.nametranslate);
                        $(".page-items .head-box>.msg>.name>i").text(index + 1);
                        $(".page-items .head-box>.msg>.coor>span").text(container.x + "," + container.y + "," + container.z);
                    } else {
                        ctx.Alert("加载失败！" + res.data.respMsg);
                        ctx.popupCss(25, 13);
                    }
                });
            },
            loadItems(container, index) {
                this.playerinfo = JSON.parse(localStorage.getItem("userinfo"))
                var self = this;
                $("#alert>.alert>section>input").val(self.password);
                var ctx = this.ctx.appContext.config.globalProperties;
                if (container.Owner != null) {
                    if (container.Owner.gameentityid == playerinfo.gameentityid) {
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
                                self.queryItems(container, index)
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
        },
        mounted() {
            var self = this;
            this.ctx = getCurrentInstance();
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
                $(".page-items").find(".head-items").find(".name").find("span").text(itemInfo.itemStack.translate);
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

        }
    }
</script>

<style scoped>

</style>
