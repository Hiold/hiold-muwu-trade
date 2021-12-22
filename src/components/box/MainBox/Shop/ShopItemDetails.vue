<template>
    <div class="items-details" data-index="0">
        <div class="back" title="返回" @click="$emit('hideDetail')"></div>
        <div class="left">
            <div class="image">
                <div class="color">
                    <div class="hot"></div>
                    <div class="quality" title="品质">6</div>
                    <div class="soldout"></div>
                    <!-- <div class="quality"><span>6</span></div> -->
                    <img src="images/items/decoPumpkinJackOLantern.png">
                </div>
            </div>
            <div class="collect">
                <i></i>
                <span class="txt">收藏</span>
                <span class="num">10</span>
            </div>
        </div>
        <div class="right spxq">
            <span class="name">南瓜灯</span>
            <span class="shul"></span>
            <span class="sells">销量 : 888</span>
            <div class="type">
                <div class="cs4">会员专属</div>
                <div class="cs1">物块模型</div>
                <div class="cs2">家具装饰</div>
                <div class="cs3">Mod物品</div>
            </div>
            <div class="price">
                <span class="tit">价格</span>
                <span class="p1"><i></i>88888</span>
                <del>99999</del>
                <i>8.8折</i>
            </div>
            <div class="limit">
                <div class="xg1">
                    <span class="tit">等级限购</span>
                    <span class="txt">≥ lv.1000</span>
                </div>
                <div class="xg2">
                    <span class="tit">每日限购</span>
                    <span class="txt">888/999</span>
                </div>
                <div class="xg3">
                    <span class="tit">总限购</span>
                    <span class="txt">无上限</span>
                </div>
            </div>
            <div class="coupon">
                <!-- <span class="tit">优惠券</span>
                <div></div> -->
            </div>
            <div class="num">
                <div class="jian" @click="reduce"><span :class="buyCount>1?'point':'notallowed'">－</span></div>
                <input type="text" v-model.number="buyCount">
                <div class="add" @click="add"><span :class="buyCount<item.stock*1?'point':'notallowed'">＋</span></div>
            </div>
            <div class="stock">（库存 : 8888）</div>
            <div class="buy" @click="Buyitem">立即购买</div>
        </div>
        <div class="bottom">
            <span style="font-size:1.3em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>
        </div>
    </div>
</template>

<script>

    //导入jquery
    import $ from 'jquery'

    export default {
        name: "ShopItemDetails",
        data() {
            return {
                buyCount: 1
            }
        },
        props: ["item"],
        methods: {
            add() {		//购买数量 : 添加
                var stock = this.item.stock * 1;		//获取当前库存
                // var xgDay = this.item.xgDay * 1;		//每日限购
                // var xgAll = this.item.xgAll * 1;		//总限购
                //
                // var buyDay = 0;		//今日已购买数量
                // var buyAll = 0;		//历史购买总数量
                // var findHis = false;	//商品历史购买数据（默认为没找到数据）
                // for (var i = 1; i < playerBuy[playerIndex].length; i++) {	//遍历商品购买数据数组
                //     var id2 = playerBuys.data[i].id;	//获取数组中的物品id
                //     if (this.id == id2) {	//如果数组中找到了这个商品
                //         buyDay = playerBuys.data[i].numDay * 1;
                //         buyAll = playerBuys.data[i].numAll * 1;
                //         findHis = true;
                //         break;
                //     }
                // }
                // if (!findHis) {
                //     //如果遍历玩数组后仍然没找到这个物品
                //     //创建一个新的数组用于储存玩家购买数据并保存
                //     playerBuy[playerIndex][playerBuy[playerIndex]] = [id, "今日已购买数量:0", "总购买数量:0"];
                // }
                if (isNaN(stock)) {
                    stock = 999999999
                }
                // if (isNaN(xgDay)) {
                //     xgDay = 999999999
                // }
                // if (isNaN(xgAll)) {
                //     xgAll = 999999999
                // }
                // if (isNaN(buyDay)) {
                //     buyDay = 0
                // }
                // if (isNaN(buyAll)) {
                //     buyAll = 0
                // }
                var num = this.buyCount;
                if (num >= stock) {
                    return;
                }	//数量最大不能超过 库存库存
                // if (num > xgDay - buyDay) {
                //     num = xgDay - buyDay;
                // }	//数量最大不能超过 每日限购 - 今日已购买
                // if (num > xgAll - buyAll) {
                //     num = xgAll - buyAll;
                // }	//数量最大不能超过 总限购 - 总购买数量
                this.buyCount++;	//填充经过校验后的数字
            },
            reduce() {		//购买数量 : 减少
                var num = this.buyCount;
                if (num <= 1) {
                    return;
                }
                this.buyCount--	//填充经过校验后的数字
            },
            Buyitem() {	//购买商品
                if (this.playerinfo.entityId || this.playerinfo.entityId === "") {
                    this.Confirm("您当前未登录，请登录后再来购买！<br>是否前往登录页面？");
                    this.popupCss(25, 14);
                    $("#alert>.alert>footer>.confirm").click(function () {
                        $("#alert>.alert>section>p").html("");	//清空文本提示内容
                        $("#alert").hide();
                        //console.log("点击了确认");
                        window.location = "login.html"
                    });
                    return;
                }

                var itemID = this.item.id;		//获取商品ID
                var itemName = this.item.name;	//获取商品名称（后面发送到仓库需要用到）------
                var itemQua = this.item.quality * 1;//获取商品品质（后面发送到仓库需要用到）
                var sell = this.item.sell;		//获取是否可以购买or是否为VIP物品
                //检测商品是否已过期
                var expired = false;	//默认为没有过期
                if (this.item.show == "auto") {
                    var year = this.getTime().year;	//获取当前日期: 年
                    var mon = this.getTime().mon;	//获取当前日期: 月
                    var day = this.getTime().day;	//获取当前日期: 日
                    var hour = this.getTime().hour;	//获取当前时间: 时
                    var min = this.getTime().min;	//获取当前时间: 分
                    var sec = this.getTime().sec;	//获取当前时间: 秒
                    if (year > this.item.year) {	//如果当前年份在设定的年份之后（已过期）
                        expired = true;
                    } else if (year == this.item.year) {	//如果年份相同
                        if (mon > this.item.mon) {	//如果当前月份在设定的月份之后（已过期）
                            expired = true;
                        } else if (mon == this.item.mon) {	//如果月份相同
                            if (day > this.item.day) {	//如果当前日在设定的日之后（已过期）
                                expired = true;
                            } else if (day == this.item.day) {	//如果日相同
                                if (hour > this.item.hour) {	//如果当前小时在设定的小时之后（已过期）
                                    expired = true;
                                } else if (hour == this.item.hour) {	//如果小时相同
                                    if (min > this.item.min) {	//如果当前分在设定的分之后（已过期）
                                        expired = true;
                                    } else if (min == this.item.min) {	//如果分相同
                                        if (sec > this.item.sec) {	//如果当前秒在设定的秒之后（已过期）
                                            expired = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (expired == true) {
                    this.Alert("这个商品已经过期，无法购买！");
                    this.popupCss(25, 13);
                    // for (var i = 0; i < $(".Category>li").length; i++) {	//遍历子分类按钮
                    //     var ck = $(".Category>li").eq(i).data("click");	//获取子分类按钮的浏览状态
                    //     if (ck == "true") {	//如果这个子分类就是玩家正在浏览的子分类
                    //         $(".Category>li").eq(i).click();	//点击它
                    //     }
                    // }
                    return;
                }
                if (sell == "false") {
                    this.Alert("当前商品暂不可购买<br>有疑问请联系服主");
                    this.popupCss(25, 14);
                    return;
                } else if (sell == "vip") {
                    var status = this.playerinfo.status;	//检测玩家身份
                    if (status != "商店会员" && status != "管理员") {
                        this.Alert("只有 <font color='orangered'>商店会员</font> 才可以购买此物品！<br>你还不是会员，可以从右上角个人资料详情页前往充值。");
                        this.popupCss(34, 15, 1.1);
                        return;
                    }
                }
                var stock = this.item.stock;	//获取库存
                if (stock == 0) {
                    this.Alert("当前商品库存不足，请联系服主补货！");
                    this.popupCss(25, 13);
                    return;
                }
                var playerLv = this.playerinfo.level * 1;	//获取玩家等级
                var lvxg = this.item.xgLevel;	//获取等级限购
                if (lvxg > 0 && playerLv < lvxg) {
                    this.Alert("您的等级不符合购买要求！<br>只有 " + lvxg + " 级以上的玩家才可以购买");
                    this.popupCss(25, 14);
                    // alert("你的等级"+playerLv+"---限购等级："+lvxg)
                    // if(playerLv>lvxg){alert("你的等级大于限购等级")}
                    // if(playerLv<lvxg){alert("限购等级大于你的等级")}
                    return;
                }
                if (lvxg < 0 && playerLv > lvxg * -1) {
                    this.Alert("您的等级不符合购买要求！<br>只有 " + lvxg * -1 + " 级以内的玩家才可以购买");
                    this.popupCss(25, 14);
                    return;
                }
                var buyDay = 1;
                var buyAll = 1;
                var xgDay = this.item.xgDay * 1;
                var xgAll = this.item.xgAll * 1;
                var xx;
                if (xgDay - buyDay <= 0) {
                    this.Alert("今日限购已到达上限，请明天再购买！");
                    this.popupCss(25, 13);
                    //console.log("每日限购:"+xgDay+"---今日已购买:"+buyDay);
                    return;
                }
                if (xgAll - buyAll <= 0) {
                    this.Alert("总限购已到达上限，不可再购买！");
                    this.popupCss(25, 13);
                    return;
                }

                if (isNaN(this.buyCount)) {	//如果输入的内容不是数字
                    this.Alert("请输入正确的数量！");
                    return;
                } else {
                    var curr = this.item.currency;	//获取货币类型
                    var unit = $(".spxq").find(".price").find(".p1").text();	//获取单价
                    var price = this.buyCount * unit;	//物品价格 = 数量 x 单价
                    var numBind = this.item.num;	//购买一件实际获得的数量
                    var numAll = numBind * this.buyCount;	//购买后实际发送到背包的数量
                    if (curr == "积分") {
                        //var con = Confirm("您当前选择购买的数量为 <span style='color:dodgerblue;'>"+num+"</span> 件<br>需要支付的价格为 <span style='color:orange;'>"+price+"</span> "+curr+"<br>是否确认要购买商品？");
                    } else if (curr == "钻石") {
                        //var con = Confirm("您当前选择购买的数量为 <span style='color:dodgerblue;'>"+num+"</span> 件<br>需要支付的价格为 <span style='color:rgb(249,102,112);'>"+price+"</span> "+curr+"<br>是否确认要购买商品？");
                    }
                    this.popupCss(25, 16);

                    $("#alert,.alert-buy").show();	//显示订单确认弹窗
                    var icon = this.item.image;

                    //将物品信息渲染到订单确认页面
                    $(".alert-buy>section>.items>.icon>img").attr("src", icon);		//图片
                    $(".alert-buy>section>.items>.content>.name").text(itemName);	//名称
                    //货币图标
                    if (curr == "积分") {
                        $(".alert-buy>section>.items>.content>.price>i").css("background-image", "url(images/icon/jf2.png)");
                        $(".alert-buy>footer>.price>i").css("background-image", "url(images/icon/jf2.png)");
                    } else if (curr == "钻石") {
                        $(".alert-buy>section>.items>.content>.price>i").css("background-image", "url(images/icon/red-zs.png)");
                        $(".alert-buy>footer>.price>i").css("background-image", "url(images/icon/red-zs.png)");
                    }
                    $(".alert-buy>section>.items>.content>.price>span").text(unit);	//单价
                    $(".alert-buy>section>.items>.count").text("x" + numAll);	//实际发送到背包的数量
                    var offers = this.playerinfo.offers;	//获取玩家购物优惠(%)
                    var disoff = 10;
                    if (isNaN(offers) || offers == 0) {
                        offers = 0;
                        $(".alert-buy>section>.discount-vip>.val").text("-0%");
                        $(".alert-buy>section>.discount-vip>.dis").hide();
                        $(".alert-buy>section>.discount-vip>.none").show();
                        $(".alert-buy>footer>.price>del").hide();
                    } else {
                        disoff = (100 - offers) / 10;
                        $(".alert-buy>section>.discount-vip>.val").show().text("-" + offers + "%");	//会员优惠(%)
                        $(".alert-buy>section>.discount-vip>.dis").show().text(disoff + "折");	//会员折扣
                        $(".alert-buy>section>.discount-vip>.none").hide();
                        $(".alert-buy>footer>.price>del").show();
                    }
                    var payPrice = Math.round(price * disoff / 10);	//玩家实际支付价格
                    if (payPrice <= 0) {
                        payPrice = 1
                    }		//价格至少为1，不能是负数或0
                    $(".alert-buy>footer>.price>b").text(payPrice);
                    $(".alert-buy>footer>.price>del").text(price);
                    //查询仓库是否有可用的优惠券并渲染到页面
                    $(".alert-buy .choose>li:not(:first)").remove();	//先移除所有优惠券卡片
                    var maxPre = 0;	//用于储存抵用券最大优惠价格
                    var cc = 0;		//保存最大优惠的抵用券在列表中的下标
                    //获取抵扣券数据
                    /**
                     * 关键参数必须实现
                     */
                    var hascType = {};	//获取仓库物品类型
                    /**
                     *
                     */
                    if (hascType) {		//如果找到了优惠券
                        var couNum = hascType.num;	//获取抵用券数量
                        var couCurr = hascType.couCurr;	//货币类型（积分/钻石）
                        var couType = hascType.couType;	//优惠类型（满减/折扣）
                        var couPrice = hascType.couPrice;	//购买优惠（购买商品时抵消的价格或折扣）
                        var couCond = hascType.couCond;	//限定价格（超过这个价格才能使用）
                        var couDate = hascType.couDate;	//使用期限（超过设定的日期就不可以使用了）
                        //var couName = couCurr +""+ couType + "券";
                        // console.log(couCond)
                        // console.log(price)
                        //console.log(couCurr)
                        //console.log(curr)
                        if (couCurr == curr && price >= couCond) {	//如果货币类型相同并且商品实际价格(不包含会员折扣)大于限定价格（符合使用条件）
                            //检测优惠券是否已过期，如果是过期的就不再渲染到页面
                            var setYear = couDate.split("-")[0];	//过期 年
                            var setMon = couDate.split("-")[1];		//过期 月
                            var setDay = couDate.split("-")[2];		//过期 日
                            var year2 = this.getTime().year;	//当前时间 年
                            var mon2 = this.getTime().mon;	//当前时间 月
                            var day2 = this.getTime().day;	//当前时间 日
                            var expired2 = false;	//默认状态为没过期
                            if (year2 > setYear) {	//年份过期
                                expired = true;
                            } else if (year2 == setYear) {	//如果是同一年，检测月份是否过期
                                if (mon > setMon) {	//月过期
                                    expired = true;
                                } else if (mon2 == setMon) {	//如果是同一月，检测日是否过期
                                    if (day2 > setDay) {	//日过期
                                        expired2 = true;
                                    }
                                }
                            }
                            if (!expired2) {
                                //如果没有过期
                                //渲染抵用券选择列表
                                $(".alert-buy .choose").append(couCard);
                                //仓库下标
                                $(".alert-buy .choose>li:last").data("ware", c);
                                //名称
                                $(".alert-buy .choose>li:last").find(".curr").text(couCurr);
                                $(".alert-buy .choose>li:last").find(".type").text(couType + "券");
                                //使用条件
                                $(".alert-buy .choose>li:last").find(".s1").text(couCond);
                                //购买优惠
                                $(".alert-buy .choose>li:last").find(".s2").text(couPrice);
                                //条件和优惠
                                if (couType == "满减") {
                                    $(".alert-buy .choose>li:last").find(".s0").text("减");
                                    $(".alert-buy .choose>li:last").find(".s3").hide();
                                } else if (couType == "折扣") {
                                    if (couCurr == "积分") {
                                        $(".alert-buy .choose>li:last").find(".s0").text("分");
                                    } else if (couCurr == "钻石") {
                                        $(".alert-buy .choose>li:last").find(".s0").text("钻");
                                    }
                                    $(".alert-buy .choose>li:last").find(".s3").show();
                                }
                                //使用期限
                                $(".alert-buy .choose>li:last").find(".period>.date").text(couDate + " 到期");
                                if (setYear == year && setMon == mon && setDay == day) {
                                    $(".alert-buy .choose>li:last").find(".period>.date").text("今日到期").css("color", "red");
                                }
                                //剩余数量
                                $(".alert-buy .choose>li:last").find(".period>.num").text("现有" + couNum + "张");

                                //计算抵用券优惠价格
                                if (couType == "满减") {
                                    var prePrice = couPrice;
                                } else if (couType == "折扣") {
                                    var prePrice = payPrice * (1 - couPrice / 10);
                                }
                                //储存最大优惠价格和列表下标
                                if (prePrice > maxPre) {
                                    maxPre = prePrice;
                                    cc = $(".alert-buy .choose>li").length - 1;
                                }
                            }
                        }
                    }
                    var payPrice2 = payPrice;	//使用抵用券后玩家实际支付的价格
                    $(".choose>.coupon-card").unbind("click");
                    $(".choose").on("click", ".coupon-card", function () {			//点击列表中某个优惠券
                        //样式特效
                        $(".choose>.coupon-card").css({
                            "border": "0.2rem solid white",
                        });
                        $(".choose>.coupon-card").find(".select").hide();
                        //.choose>.coupon-card>.select
                        $(this).css({
                            "border": "0.25rem solid red",
                        });
                        $(this).find(".select").show();

                        //将选中的卡片渲染到上面
                        var wxb = $(this).data("ware");	//获取抵用券在仓库数组中的下标
                        $(".alert-buy .coupon>.card").data("ware", wxb);
                        var sxb = $(this).index();	//获取抵用券在优惠券列表中的下标
                        var left = $(this).find(".left").html();
                        $(".alert-buy .coupon>.card>.left").html(left);
                        if (sxb == 0) {	//不使用优惠券
                            //alert(11)
                            $(".alert-buy .coupon>.card").data("ware", "undefined");
                            $(".alert-buy .coupon>.card>.right>div").hide();
                            $(".alert-buy .coupon>.card>.right>.none").show().text("不使用优惠券");
                        } else if (sxb > 0) {
                            var cond = $(this).find(".cond").html();
                            var period = $(this).find(".period").html();
                            $(".alert-buy .coupon>.card>.right>div").show();
                            $(".alert-buy .coupon>.card>.right>.none").hide();
                            $(".alert-buy .coupon>.card>.right>.cond").html(cond);
                            $(".alert-buy .coupon>.card>.right>.period").html(period);
                        }

                        //获取优惠类型和优惠值
                        var couType = $(this).find(".type").text();		//优惠类型
                        var couPrice = $(this).find(".s2").text() * 1;	//优惠价格或折扣
                        //console.log(couType);
                        //计算抵用券优惠价格
                        if (couType == "满减券") {
                            var prePrice = couPrice * 1;
                        } else if (couType == "折扣券") {
                            var prePrice = Math.round(payPrice * (1 - couPrice / 10));
                        } else if (couType == "优惠券") {
                            var prePrice = 0;
                        }
                        //console.log(prePrice);
                        payPrice2 = payPrice;
                        payPrice2 -= prePrice;	//使用抵用券后玩家需要支付的价格
                        if (payPrice2 <= 0) {
                            payPrice2 = 1
                        }	//价格至少为1，不能是负数或0
                        //console.log(payPrice);
                        $(".alert-buy>footer>.price>b").text(payPrice2);	//渲染到页面

                        //var wxb = queryWareItems();

                    });
                    $(".alert-buy .choose>li").eq(cc).click();	//点击最大优惠的抵用券
                    if (cc == 0) {	//如果没有可以用的抵用券
                        $(".alert-buy .coupon>.card>.right>.none").text("暂无可用");
                        $(".choose>.coupon-card>.right>.none").text("暂无可用");
                    } else {
                        $(".choose>.coupon-card>.right>.none").text("不使用优惠券");
                    }


                    $(".alert-buy>footer>.confirm").unbind("click");
                    $(".alert-buy>footer>.confirm").click(function () {	//如果玩家点击确认付款
                        $("#alert,.alert-buy").hide();	//隐藏弹窗
                        //console.log("点击了确认");
                        //alert(payPrice);
                        var i = playerIndex;	//玩家在数组中的下标
                        if (curr == "积分") {	//如果货币为积分
                            var point = players.data[i].points;	//获取玩家的积分
                            point -= payPrice2;
                            if (point < 0) {	//如果购买后积分为负数
                                point += payPrice2;	//还原积分;
                                Alert("您的<span style='color:orange;'>积分</span>不足,购买失败！");
                                popupCss(25, 13);
                                return;
                            } else {	//购买成功
                                players.data[i].points = playerBasic[i][2][0].split(":")[1] = point;	//储存玩家积分
                                $("main>header>.Point>span").text(point);
                                $(".my-jf>span").text(point);				//将更新后的积分渲染到页面
                            }
                        } else if (curr == "钻石") {	//如果货币为钻石
                            var zs = players.data[i].diamonds;	//获取玩家的钻石
                            zs -= payPrice2;
                            if (zs < 0) {	//如果购买后钻石为负数
                                zs += payPrice2;	//还原钻石;
                                Alert("您的<span style='color:rgb(249,102,112);'>钻石</span>不足,购买失败！");
                                popupCss(25, 13);
                                return;
                            } else {	//购买成功
                                players.data[i].diamonds = playerBasic[i][2][1].split(":")[1] = zs;		//储存玩家钻石
                                $("main>header>.Diamond>span").text(zs);
                                $(".my-zs>span").text(zs);				//将更新后的钻石渲染到页面
                            }
                        } else {	//如果货币类型既不是积分也不是钻石（一般这种情况不可能出现，除非服主在商品数组中设置错误）
                            alert("商品货币类型出错！请联系服主");
                            return;
                        }
                        //如果前面的检测没有出现问题，说明符合购买条件------------------------------------------------
                        var sales = this.item.sales * 1; //获取物品的销量
                        stock -= num;		//库存 减 购买的数量
                        sales += num;		//销量 加 购买的数量
                        if (isNaN(stock)) {
                            stock = "无上限"
                        }
                        this.item.sales = sales;	//更新数组中的销量
                        $(".game-items item").eq(xb).find("[name='销量']").attr("value", sales);
                        //commodity[xb][3][0] = "销量:"+sales;
                        this.item.stock = stock;	//更新数组中的库存
                        $(".game-items item").eq(xb).find("[name='库存']").attr("value", stock);
                        //commodity[xb][3][3] = "库存:"+stock;
                        $(".spxq>.sells").text("销量 : " + sales);		//更新页面中的销量
                        $(".spxq>.stock").text("（库存 : " + stock + "）");		//更新页面中的库存
                        if (stock == 0) {	//如库存为0，显示售罄图标
                            $(".items-details>.left>.image").find(".soldout").show();
                            //$(".items-box>.items").eq(xb).css("opacity","0.7").find(".soldout").show();
                            $(".items-box>.items[data-index='" + xb + "']").css("opacity", "0.7").find(".soldout").show();
                        }
                        //更新购买数量
                        buyDay += num;
                        buyAll += num;
                        playerBuy[playerIndex][xx][1] = "今日购买数量:" + buyDay;
                        playerBuy[playerIndex][xx][2] = "总购买数量:" + buyAll;
                        arrbuyToObj();
                        if (!isNaN(xgDay)) {
                            $(".spxq>.limit>.xg2>.txt").text(buyDay + "/" + xgDay);	//更新页面每日限购
                        }
                        if (!isNaN(xgAll)) {
                            $(".spxq>.limit>.xg3>.txt").text(buyAll + "/" + xgAll);	//更新页面总限购
                        }
                        if (xgDay <= buyDay || xgAll <= buyAll) {	//如每日限购或总限购达到上限，显示售罄图标
                            $(".items-details>.left>.image").find(".soldout").show();
                            $(".items-box>.items[data-index='" + xb + "']").css("opacity", "0.7").find(".soldout").show();
                        }
                        $(".spxq>.num>input").val(1);	//重置输入框中要购买的数量
                        //给玩家仓库更新购买的物品
                        //下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
                        //相同的条件是: 名称、ID、品质 3个属性同时相同
                        var findItem = false;	//默认为没找到相同物品
                        for (var j in playerWare[i]) {
                            var nameW = playerWares.data[j].name;	//获取数组中物品名称
                            var idW = playerWares.data[j].id;		//获取数组中物品ID
                            var quaW = playerWares.data[j].quality * 1;	//获取数组中物品品质
                            var numW = playerWares.data[j].num * 1;		//获取数组中物品数量
                            if (nameW == itemName && idW == itemID && quaW == itemQua) {	//如果是相同的物品
                                findItem = true;
                                numW += numAll;	//直接给相同的物品增加购买的数量，无需再新创建数组
                                playerWares.data[j].num = numW;	//保存更新的数量
                                playerWare[i][j][1][1] = "数量:" + numW;
                            }
                            //console.log("品质1:"+quaW+"---品质2:"+itemQua);
                            //console.log("名称1:"+nameW+"---名称2:"+itemName);
                        }
                        if (findItem == false) {	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
                            playerWare[i][playerWare[i].length] = [["auto", "ID:" + itemID, "图片:auto"], ["品质:auto", "数量:" + numAll], ["总分类:auto", "子分类:auto", "mod:auto"], ["auto"]];
                        }
                        //检测购买商品时是否使用过抵用券
                        var couxb = $(".alert-buy .coupon>.card").data("ware");	//获取抵用券在仓库数组中的下标
                        if (couxb >= 0) {	//如果用了抵用券
                            //console.log("用了优惠券，优惠券下标为："+couxb);
                            var counum = playerWare[i][couxb][1][1].split(":")[1];	//获取抵用券数量
                            counum--;
                            playerWare[i][couxb][1][1] = "数量:" + counum;
                            if (counum == 0) {	//如果抵用券没有了
                                playerWare[i].splice(couxb, 1);		//删除它
                            }

                        }

                        arrwareToObj();	//给仓库数组转换储存格式
                        //console.log(playerWare[i]);
                        var point = players.data[i].points;
                        var diamond = players.data[i].diamonds;
                        if (itemQua == 0) {
                            recordConsole[playerIndex][recordConsole[playerIndex].length] = this.getTime().date + "<br><span>购买商品</span><span><b>" + itemName + "</b></span><span>" + numAll + " 件</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
                        } else {
                            recordConsole[playerIndex][recordConsole[playerIndex].length] = this.getTime().date + "<br><span>购买商品</span><span><b>" + itemName + "</b><font style='font-size:0.9em;'>(品质: " + itemQua + ")</font></span><span>" + numAll + " 件</span><div class='money'><div class='point'>" + point + "</div><div class='diamond'>" + diamond + "</div></div>";
                        }
                        Alert("购买成功,物品已发送到您的仓库");
                        popupCss(25, 13);
                    });
                }
            }
        },
        computed: {
            isAddAllow() {
                var stock = this.item.stock * 1;		//获取当前库存
                // var xgDay = this.item.xgDay * 1;		//每日限购
                // var xgAll = this.item.xgAll * 1;		//总限购

                // var buyDay = 0;		//今日已购买数量
                // var buyAll = 0;		//历史购买总数量

                // if (isNaN(stock)) {
                //     stock = 999999999
                // }
                // if (isNaN(xgDay)) {
                //     xgDay = 999999999
                // }
                // if (isNaN(xgAll)) {
                //     xgAll = 999999999
                // }
                // if (isNaN(buyDay)) {
                //     buyDay = 0
                // }
                // if (isNaN(buyAll)) {
                //     buyAll = 0
                // }
                var num = $(".spxq>.num>input").val() * 1;
                if (num > stock) {
                    num = stock;
                }	//数量最大不能超过 库存库存
                // if (num > xgDay - buyDay) {
                //     num = xgDay - buyDay;
                // }	//数量最大不能超过 每日限购 - 今日已购买
                // if (num > xgAll - buyAll) {
                //     num = xgAll - buyAll;
                // }	//数量最大不能超过 总限购 - 总购买数量
                // num += 1;
                // return num <= stock && num <= xgDay - buyDay && num <= xgAll - buyAll;
                console.log(num, stock)
                console.log(num <= stock)
                return num <= stock;
            },
            isReduceAllow() {
                var num = $(".spxq>.num>input").val() * 1;
                return num > 1;
            }
        }

    }
</script>

<style scoped>
    .point {
        color: black;
        cursor: pointer;
    }

    .notallowed {
        color: rgb(180, 180, 180);
        cursor: not-allowed
    }
</style>
