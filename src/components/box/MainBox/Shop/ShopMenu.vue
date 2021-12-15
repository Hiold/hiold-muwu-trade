<template>

    <nav class="Category">
        <!-- 侧边导航栏、分类 -->
        <div class="title">༺ཌ 商品分类 ད༻</div>
        <ul class="btn-1">
            <div>活动折扣</div>
        </ul>
        <li class="b1-t0">全部</li>
        <li class="b1-t1">物块模型</li>
        <li class="b1-t2">物品资源</li>
        <li class="b1-t3">特殊商品</li>
        <ul class="btn-2">
            <div>物块模型</div>
        </ul>
        <li class="b2-t0">全部</li>
        <li class="b2-t1">建筑物块</li>
        <li class="b2-t2">家具装饰</li>
        <li class="b2-t3">户外植物</li>
        <li class="b2-t4">地形块</li>
        <li class="b2-t5">建造拆除</li>
        <li class="b2-t6">搜刮奖励</li>
        <li class="b2-t7">等级设计</li>
        <ul class="btn-3">
            <div>物品资源</div>
        </ul>
        <li class="b3-t0">全部</li>
        <li class="b3-t1">工具陷阱</li>
        <li class="b3-t2">基础资源</li>
        <li class="b3-t3">武器弹药</li>
        <li class="b3-t4">衣服套装</li>
        <li class="b3-t5">食物饮品</li>
        <li class="b3-t6">载具药物</li>
        <li class="b3-t7">书本学习</li>
        <li class="b3-t8">特殊物品</li>
        <ul class="btn-4">
            <div>本服专属</div>
        </ul>
        <li class="b4-t0">全部</li>
        <li class="b4-t1">物块模型</li>
        <li class="b4-t2">物品资源</li>
        <ul class="btn-5">
            <div>特殊商品</div>
        </ul>
        <li class="b5-t0">全部</li>
        <li class="b5-t1">货币兑换</li>
        <li class="b5-t2">礼包抽奖</li>
        <li class="b5-t3">专属服务</li>
        <li class="b5-t4">抵用券</li>
        <li class="b5-t5">其它</li>
        <ul class="btn-6">
            <div>钻石商城</div>
        </ul>
        <li class="b6-t0">全部</li>
        <li class="b6-t1">物块模型</li>
        <li class="b6-t2">物品资源</li>
        <li class="b6-t3">特殊商品</li>
    </nav>
</template>

<script>
    //导入样式
    import '../../../../assets/style/shop.css'
    import '../../../../assets/style/shop-nav.css'
    import '../../../../assets/style/headTool.css'
    //引入juqery
    import $ from 'jquery'

    export default {
        name: "ShopMeuu",
        props: ["class1", "class2"],
        data() {
            return {}
        },
        methods: {
            ready() {
                var self = this;
                $(".Category>li").hide();	//默认隐藏所有子分类
                //$(".Category>li[class^='b1']").show();	//默认显示第一组子分类（活动折扣）
                //$(".Category>li[class$='t0']").data("click","true");

                $(".Category>ul").click(function () {	//总分类点击特效+生成商品
                    var dc = $(this).data("click");		//获取当前分类下的子分类展开状态
                    var xb = $(this).attr("class").split("-")[1];	//从类名中获取序号
                    if (dc == "false" || dc == undefined) {	//情况1:如果子分类为隐藏
                        $(".Category>li").slideUp(100);	//先隐藏所有分组的子分类
                        $(".Category>li[class^='b" + xb + "']").slideDown(200);	//展开当前子分类
                        $(".Category>ul").data("click", "false");
                        $(this).data("click", "true");	//将展开状态设置为"展开"
                        self.class1 = $(this).find("div").text();	//获取当前点击总分类名称
                        //alert("展开总分类："+class1)
                        $(this).next().click();		//默认显示当前总分类下第一个子分类的内容
                        //console.log("总分类："+xb);
                        self.changeColor(xb);
                    } else if (dc == "true" || dc == true) {		//情况2:如果子分类为展开
                        $(".Category>li").slideUp(100);	//隐藏所有分组的子分类
                        $(this).data("click", "false");	//将展开状态设置为"隐藏"
                    }
                    return;
                    //$(".Category>li[class$='t0']").click();	//默认显示第一个子分类的内容
                });
                var navColor = [	//子分类背景颜色
                    ["rgb(254, 227, 171), rgba(254, 208, 171, 0.2)"],
                    ["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
                    ["rgb(232, 206, 185), rgba(255, 255, 255, 0.2)"],
                    ["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"],
                    ["rgb(200, 200, 255), rgba(255, 255, 255, 0.2)"],
                    ["rgb(255, 160, 160), rgba(255, 255, 255, 0.2)"]
                ]
                $(".Category>li").click(function () {		//子分类点击特效+生成商品
                    $(".head-tool .name-id").val("");
                    $(".items-details").hide();
                    $(".items-box,.head-tool").show();
                    var xb = $(this).attr("class").split("")[1];	//获取序号
                    //console.log("序号:"+xb)
                    $(".Category>li[class^='b" + xb + "']").css({"background": "none", "box-shadow": "none"});	//清除同组子分类的样式
                    $(this).css({	//设置当前子分类样式
                        "background": "radial-gradient(" + navColor[xb - 1] + ")",
                        "box-shadow": "0 0 0.1rem white"
                    });
                    //$(".Category>li[class^='b"+xb+"']").data("click","false");
                    $(".Category>li").data("click", "false");
                    $(this).data("click", "true");
                    self.class2 = $(this).text();	//获取当前点击的子分类名称

                    //console.log("子分类："+xb);
                    self.changeColor(xb);
                    //$(".items-details").fadeOut(200);
                    //$(".items-details").hide();
                    //$(".items-box,section>.head-tool").show();
                    //alert("点击子分类："+class2);
                    return;
                });
                $(".Category>li").hover(function () {		//子分类悬浮特效
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

                // $(".Category>ul").click(function(){		//总分类 生成商品
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
                    //$(".items-box>.items>section").css("background","linear-gradient(90deg, rgba(185, 216, 253, 0.5), rgba(209, 230, 254, 0.7))");
                    $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(237, 184, 254, 0.5), rgba(247, 209, 254, 0.7))");
                }
                if (color == 6) {
                    $(".items-box>.items").css("background-image", "url(images/card/red.jpg)");
                    $(".items-box>.items>section").css("background", "linear-gradient(90deg, rgba(253, 208, 211, 0.5), rgba(253, 213, 216, 0.7))");
                }
                //$(".items-box>.items").css("opacity","1");
            },
            lastView(type1, type2) {	//自动跳转到规定的分类并打印商品
                //$(".Category>.btn-2").click();
                for (var i = 0; i < $(".Category>ul").length; i++) {
                    //console.log(i)
                    //alert($(".Category>ul").length)
                    var name1 = $(".Category>ul").eq(i).find("div").text();	//获取总分类名称
                    var xb = $(".Category>ul").eq(i).attr("class").split("-")[1];	//获取总分类下标
                    if (name1 == type1) {	//找到对应总分类
                        $(".Category>ul").eq(i).click();
                        for (var j = 0; j < $(".Category>li[class^=b" + xb + "]").length; j++) {
                            var name2 = $(".Category>li[class^=b" + xb + "]").eq(j).text();
                            if (name2 == type2 && name2 != "全部") {	//找到对应子分类
                                $(".Category>li[class^=b" + xb + "]").eq(j).click();
                                //console.log("j="+j+" --- xb="+xb)
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
            this.ready();
            //加载默认菜单
            this.lastView(this.class1, this.class1);
        }
    }
</script>

<style scoped>

</style>
