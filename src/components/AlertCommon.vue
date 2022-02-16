<template>
    <div id="alert">
        <div class="alert">        <!-- 提示窗口（Alert/Confirm/Prompt） -->
            <div class="fil"></div>
            <header>
                <span>友情提示</span>
                <i>✘</i>
            </header>
            <section>
                <div class="tit">
                    <div class="icon"></div>
                </div>
                <p>
                    &nbsp;请输入正确的数量<br>
                </p>
                <input type="text" class="alert-val">
            </section>
            <footer>
                <div class="close">取消</div>
                <div class="confirm">确认</div>
            </footer>
        </div>
        <!--购买弹窗-->
        <div class="alert-buy">    <!-- 购买商品订单确认窗口 -->
            <div class="fil"></div>
            <header>
                <span>订单确认</span>
                <i>✘</i>
            </header>
            <section>
                <div class="items">
                    <div class="icon">
                        <img src="/public/images/ItemIcons/armorSantaHat.png">
                    </div>
                    <div class="content">
                        <div class="name">圣诞帽</div>
                        <div class="price">
                            <i></i>
                            <span>520</span>
                        </div>
                    </div>
                    <div class="count">
                        x100
                    </div>
                </div>
                <div class="discount-vip">
                    <span class="tit">会员折扣</span>
                    <span class="val">-10%</span>
                    <span class="dis">9.0折</span>
                    <span class="none">你不是商店会员，前往充值可获取更多优惠！</span>
                </div>
                <div class="coupon">
                    <span class="tit">优惠券</span>
                    <div class="card">
                        <div class="left">
                            <span class="curr">积分</span><br>
                            <span class="type">满减券</span>
                        </div>
                        <div class="right">
                            <div class="cond">
                                满 <span class="s1">1000</span>
                                <span class="s0">减</span>
                                <span class="s2">200</span>
                            </div>
                            <div class="period">
                                2021.12.12 到期
                            </div>
                            <div class="none">暂无可用</div>
                        </div>
                        <div class="choose">
                            <!--默认展示的优惠券-->
                            <li class="coupon-card">
                                <div class="left"><span class="curr">活动</span><br><span
                                        class="type">优惠券</span></div>
                                <div class="right">
                                    <span class="none">不使用优惠券</span>
                                </div>
                                <div class="select"><span>✔</span></div>
                            </li>

                            <!-- 优惠券选择列表 -->
                            <li class="coupon-card" :data-selfindex="index" v-for="(item,index) in couProps"
                                :key="item.id">

                                <div class="left"><span class="curr">{{ item.couCurrType }}</span><br>
                                    <!--                                  <span class="type">{{ item.couType }}券</span>-->
                                </div>
                                <div class="right">
                                    <div v-if="item.couCurrType.indexOf('满减')>-1" class="cond">满 <span
                                            class="s1">{{ item.couCond }}</span> <span
                                            class="s0">减</span> <span
                                            class="s2">{{ item.couPrice }}</span></div>

                                    <div v-if="item.couCurrType.indexOf('折扣')>-1" class="cond">满 <span
                                            class="s1">{{ item.couCond }}</span> <span
                                            class="s0"
                                            v-text="item.couCurr==='积分'?'分':item.couCurr==='钻石'?'钻':''"></span> <span
                                            class="s2">{{ item.couPrice }}</span> <span
                                            class="s3">折</span></div>


                                    <div class="period"><span class="date">{{ item.couDate }} 到期</span> <span
                                            class="num">仅剩{{ item.storageCount }}张</span>
                                    </div>
                                    <div class="couid" style="display: none">{{ item.id }}</div>
                                </div>
                                <div class="select"><span>✔</span></div>
                            </li>


                        </div>
                    </div>
                </div>
            </section>
            <footer>
					<span class="price">
						<span>合计</span>
						<i></i>
						<b>48888</b>
						<del>52000</del>
					</span>
                <div class="close">取消</div>
                <div class="confirm">确认付款</div>
            </footer>
        </div>

        <div class="window" style="">    <!-- 仓库出售物品时的确认窗口 -->
            <div class="fil"></div>
            <header>
                <span>出售物品</span>
                <i>✘</i>
            </header>
            <section>
                <header>
                    <div class="head">
                        <img src="/public/images/ItemIcons/casinoCoin.png">
                    </div>
                    <div class="msg">
                        <div class="name">公爵赌场币</div>
                        <div class="num">x5000</div>
                        <div class="quality" style="display: none;">品质：0</div>
                    </div>

                </header>
                <div class="count">
                    <span class="tit">数量：</span>
                    <div class="val">
                        <div class="reduce">-</div>
                        <input type="text" placeholder="请输入出售的数量"
                               onkeyup="this.value=this.value.replace(/[^\d]|^[0]/g,'')">
                        <div class="add">+</div>
                    </div>
                </div>
                <div class="price">
                    <span class="tit">价格：</span>
                    <div class="val">
                        <div class="icon"></div>
                        <input type="text" placeholder="请输入出售的价格（单价）"
                               onkeyup="this.value=this.value.replace(/[^(0-9).]|^[0]/g,'')">
                    </div>
                </div>
                <p>
                    说明：<br>
                    1.商品将会放在交易中心进行出售，如果有玩家购买你的商品你将会获得对应积分奖励。<br>
                    2.关于物品出售价格和相关规定请查看公告或咨询管理员，不符合规范的物品我们将会下架。
                </p>
            </section>
            <footer>
                <div class="close">取消</div>
                <div class="confirm">确认出售</div>
            </footer>
        </div>

        <div class="alert-edit" style="display:none;">    <!-- 交易中心编辑个人资料窗口 -->
            <div class="fil"></div>
            <header>
                <span>编辑资料</span>
                <i>✘</i>
            </header>
            <section>
                <div class="left">
                    <div class="head" id="Img"></div>
                    <div class="choose">
                        选择图片
                        <input type="file" id="chooseImage">
                    </div>

                </div>
                <div class="right">
                    <div class="steamID uncg">
                        <span class="tit">steamID：</span>
                        <span class="val">76561199000000001</span>
                    </div>
                    <!-- <div class="player-name uncg">
                        <span class="tit">游戏名称：</span>
                        <span class="val">彩色の小木屋</span>
                    </div> -->
                    <div class="shop-name set">
                        <span class="tit">店铺名称：</span>
                        <input type="text" class="shop-name-val">
                    </div>
                    <div class="qq set">
                        <span class="tit">QQ号码：</span>
                        <input type="text" class="myself-qq-val">
                    </div>
                    <p>
                        说明：<br>
                        1. 店铺名称最多只能设置10个字符。<br>
                        2. 设置QQ号码可以让其它玩家快速与您进行QQ联系，不设置该功能留空即可。
                    </p>
                </div>
            </section>
            <footer>
                <div class="close">取消</div>
                <div class="confirm">保存设置</div>
            </footer>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AlertCommon",
        data() {
            return {
                couProps: []
            }
        },
        mounted() {
            axios.post("api/getdisCountTicket", "").then(res => {
                if (res.data.respCode === "1") {
                    let JsonData = res.data.data;
                    this.couProps = JsonData;
                }
            });
        }
    }
</script>

<style scoped>

</style>
