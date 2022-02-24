<template>
    <router-view>
    </router-view>
</template>

<script>
    import axios from "axios";
    import {ElMessage} from "element-plus";
    import $ from "jquery"

    export default {
        name: "UserContainer",
        mounted() {
            axios.get("api/getCurrentUser").then(res => {
                if (res.data.respCode === "1") {
                    console.log("用户状态正常，保存本地数据");
                    localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                } else {
                    window.location = "/#/login";
                }
            });

            //资料卡
            $("aside>header>.more").click(function () {	//资料卡 - 显示更多
                var more = $("aside>header").data("more");
                if (!more) {
                    $("aside>header").css("height", "84%");
                    $("aside>header").data("more", true);
                    $("aside>header>li,aside>header>ul").slideDown(100);
                    $("aside>header>.rech").show(200);
                    $(this).text("隐藏列表▲");

                } else {
                    $("aside>header").css("height", "7.2em");
                    $("aside>header").data("more", false);
                    $("aside>header>li,aside>header>ul").slideUp(200);
                    $("aside>header>.rech").hide();
                    $(this).text("显示更多▼");
                }
            });


            $("aside>header>.btn-1").click(function () {	//基础信息
                $("aside>header>.btn-2").css({
                    "background": "rgba(255,255,255,0.5)",
                    "border-bottom": "1px solid rgb(230,230,230)"
                });
                $(this).css({
                    "background": "rgba(255,255,255,0.8)",
                    "border-bottom": "2px solid rgb(160,160,200)"
                });
                $(".aside-profile>.page2").hide();
                $(".aside-profile>.page1").show();
            });
            $("aside>header>.btn-2").click(function () {	//专属客服
                $("aside>header>.btn-1").css({
                    "background": "rgba(255,255,255,0.5)",
                    "border-bottom": "1px solid rgb(230,230,230)"
                });
                $(this).css({
                    "background": "rgba(255,255,255,0.8)",
                    "border-bottom": "2px solid rgb(160,160,200)"
                });
                $(".aside-profile>.page1").hide();
                $(".aside-profile>.page2").show();
            });
            $("aside>header>.rech").click(function () {	//会员卡
                Alert("请联系服主充值会员或咨询相关内容");
                popupCss(26, 13);
            });

            //隐藏人员，显示人员
            $(".aside-profile>.page2>.tit").click(function () {
                var xb = $(this).data("num");
                var show = $(this).data("show");
                //console.log(show)
                if (show == 'true' || show == true) {
                    //console.log("true-")
                    $(this).find("i").css("transform", "rotate(-90deg)");
                    $(this).next().find(".Customer").slideUp(200);
                    $(this).data("show", "false");
                } else {
                    //console.log("false-")
                    $(this).find("i").css("transform", "rotate(0deg)");
                    $(this).next().find(".Customer").slideDown(200);
                    $(this).data("show", "true");
                }
            });
            //点击发起QQ对话
            $(".Customer").click(function () {
                var qq = $(this).data("qq");
                if (qq == "" || qq == undefined) {
                    Alert("对方暂未设置QQ联系方式，无法发起对话<br>请尝试用其它方式联系该成员");
                    popupCss(28, 14);
                } else {
                    window.open("tencent://message/?uin=" + qq);
                }

            });

        }
    }
</script>

<style scoped>

</style>
