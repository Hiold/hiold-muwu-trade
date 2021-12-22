<template>
    <div id="alert">
        <div class="alert-buy">    <!-- 购买商品订单确认窗口 -->
            <div class="fil"></div>
            <header>
                <span>订单确认</span>
                <i>✘</i>
            </header>
            <section>
                <div class="items">
                    <div class="icon">
                        <img src="images/ItemIcons/armorSantaHat.png">
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
                        <div class="choose">    <!-- 优惠券选择列表 -->
                            <li class="coupon-card">
                                <div class="left">
                                    <span class="curr">活动</span><br>
                                    <span class="type">优惠券</span>
                                </div>
                                <div class="right">
                                    <span class="none">不使用优惠券</span>
                                </div>
                                <div class="select"><span>✔</span></div>
                            </li>
                            <li class="coupon-card">
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
                                </div>
                                <div class="select"><span>✔</span></div>
                            </li>
                            <li class="coupon-card">
                                <div class="left">
                                    <span class="curr">积分</span><br>
                                    <span class="type">折扣券</span>
                                </div>
                                <div class="right">
                                    <div class="cond">
                                        满 <span class="s1">500</span>
                                        <span class="s0">分</span>
                                        <span class="s2">9.5</span>
                                        <span class="s3">折</span>
                                    </div>
                                    <div class="period">
                                        <span class="date">2021.12.12 到期</span>
                                        <span class="num">现有3张</span>
                                    </div>
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
    </div>
</template>

<script>
    export default {
        name: "ShopItemBuy",
        methods: {
        }
    }
</script>

<style scoped>

</style>
