<template>
    <div class="terr-box" data-page="box">    <!-- 领地箱子 -->
        <header>
            <i></i>
            <span class="title">领地箱子</span>
            <div class="back" title="返回"></div>
        </header>
        <section>
            <div class="page-box">
                <li class="player-box" v-for="(item,index) in containerList" :key="index">
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
                        <div class="owner">归属： <span>热心の小白鼠</span></div>
                    </footer>
                </li>
                <div class="empty2" v-show="containerList==null||containerList.length<=0">
                    <span>这里空空如也<br>没有找到你的箱子</span>
                </div>
            </div>

            <div class="page-items">
                <header>
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
                <section>
                    <li class="box-items">
                        <div class="filter">
                            <img src="/public/images/ItemIcons/armorSantaHat.png">
                        </div>
                        <div class="num">123</div>
                    </li>
                    <li class="box-items">
                        <div class="filter">
                            <img src="/public/images/ItemIcons/casinoCoin.png">
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
</template>

<script>
    import "../../../../assets/style/warehouse/terr-box.css"

    export default {
        name: "WareTereBox",
        props: ["containerList"]
    }
</script>

<style scoped>

</style>
