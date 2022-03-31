<template>
    <aside>    <!-- 右侧资料卡和主菜单 -->
        <header data-more="false">    <!-- 右上角资料卡 -->
            <!-- 头像、名称、等级、SteamID -->
            <div class="player-head"
                 :style="{'background-image': `url(api/image/${playerinfo.avatar}),url('/images/player/head1.jfif')`}"></div>
            <div class="player-key">
                <span class="name">{{playerinfo.name}}</span><br>
                <span class="level">lv. {{playerinfo.level}}</span>
            </div>
            <div class="player-steamId">steamID:<span>{{playerinfo.gameentityid}}</span></div>
            <div class="more">显示更多▼</div>
            <li class="btn-1">基础信息</li>
            <li class="btn-2">专属客服</li>
            <ul class="aside-profile">
                <div class="page1">    <!-- 基础信息 -->
                    <p class="my-jf">我的积分：<span>{{playerinfo.money}}</span></p>
                    <p class="my-zs">我的钻石：<span>{{playerinfo.credit}}</span></p>
                    <p class="my-ol">在线时长：<span>{{playerinfo.online_time/3600}}</span> 小时</p>
                    <p class="my-sf">
                        个人身份：<span>{{playerinfo.type=="1"?"管理员":playerinfo.vipdiscount*1>0?"VIP用户":"普通用户"}}</span></p>
                    <p class="my-yh">购物优惠：<span>{{playerinfo.vipdiscount}}</span> %</p>
                    <p class="all-cz">总充值：<span>{{playerinfo.creditcharge}}</span> ¥</p>
                    <p class="all-xf">总消费：<span>{{playerinfo.creditcost}}</span> 钻石</p>
                    <p class="all-qd">总签到：<span>0</span> 天</p>
                </div>
                <div class="page2">    <!-- 管理员、客服信息 -->
                    <div class="tit" data-num="1" data-show="true"><i></i> 服务器管理员</div>
                    <ul class="ul-1">
                        <li class="Customer">
                            <div class="head"></div>
                            <div class="msg">
                                <div class="name">暂无人员</div>
                                <div class="intro">请联系服主设置</div>
                            </div>
                        </li>
                    </ul>
                    <div class="tit" data-num="2" data-show="true"><i></i> 相关制作人员（3）</div>
                    <ul class="ul-2">
                        <li class="Customer" data-qq="260663027">
                            <div class="head" style="background-image: url(images/player/xzs.jpg);"></div>
                            <div class="msg">
                                <div class="name">奶娃子的小助手</div>
                                <div class="intro">NaiwaziBot作者</div>
                            </div>
                        </li>
                        <li class="Customer" data-qq="960269073">
                            <div class="head" style="background-image: url(images/player/haiou.jpg);"></div>
                            <div class="msg">
                                <div class="name">海鸥令主</div>
                                <div class="intro">后端支持</div>
                            </div>
                        </li>
                        <li class="Customer" data-qq="">
                            <div class="head" style="background-image: url(images/player/muwu.jpg);"></div>
                            <div class="msg">
                                <div class="name">彩色の小木屋</div>
                                <div class="intro">网页设计</div>
                            </div>
                        </li>
                    </ul>

                </div>
            </ul>
            <div class="rech">
                专属会员卡
            </div>
        </header>
        <ul class="Main-menu">    <!-- 主菜单 -->
            <!-- 重要分类（大图标）：积分商城、个人仓库、交易中心、活动礼包 -->
            <!-- 重要分类（大图标）：积分商城、个人仓库、交易中心、活动礼包 -->
            <router-link custom to="/userq/shop" v-slot="{navigate,isActive}">
                <li class="menu-1" @click="navigate" :class="{active:isActive}">
                    <span class="cn">积分商城</span><br>
                    <span class="en">Points Store</span>
                </li>
            </router-link>
            <router-link custom to="/userq/warehouse" v-slot="{navigate,isActive}">
                <li class="menu-2" @click="navigate" :class="{active:isActive}">
                    <span class="cn">个人仓库</span><br>
                    <span class="en">Warehouse</span>
                </li>
            </router-link>
            <router-link custom to="/userq/trans" v-slot="{navigate,isActive}">
                <li class="menu-3" @click="navigate" :class="{active:isActive}">
                    <span class="cn">交易中心</span><br>
                    <span class="en">Transaction</span>
                </li>
            </router-link>
            <router-link custom to="/userq/activity" v-slot="{navigate,isActive}">
                <li class="menu-4" @click="navigate" :class="{active:isActive}">
                    <span class="cn">活动礼包</span><br>
                    <span class="en">Activity</span>
                </li>
            </router-link>
            <!-- 其它分类（小图标）：签到、兑换、公告、排行 -->
            <div class="min">
              <router-link custom to="/userq/activity?tosign" v-slot="{navigate,isActive}">
                <div class="m1" @click="navigate"><span>签到</span></div>
              </router-link>
                <div class="m2"><span>兑换</span></div>
                <div class="m3"><span>公告</span></div>
                <div class="m4"><span>排行</span></div>
            </div>
        </ul>
    </aside>
</template>

<script>

    import '../../assets/style/aside.css'

    export default {
        name: "RightMenuBox",
        data() {
            return {
                playerinfo: {}
            }
        },
        mounted() {
            this.playerinfo = JSON.parse(localStorage.getItem("userinfo"))
        }
    }
</script>

<style scoped>
    .active {
        opacity: 1;
        transform: scale(1.1);
    }
</style>
