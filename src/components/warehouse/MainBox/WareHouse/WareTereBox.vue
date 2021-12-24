<template>
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
</template>

<script>
    import "../../../../assets/style/warehouse/terr-box.css"
    export default {
        name: "WareTereBox"
    }
</script>

<style scoped>

</style>
