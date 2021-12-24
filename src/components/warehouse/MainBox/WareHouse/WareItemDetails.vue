<template>
    <div class="ware-details">  <!-- 仓库物品详情页 -->
        <header>
            <span class="name">南瓜灯</span>
            <i class="back" title="返回"></i>
        </header>
        <section>
            <div class="left">
                <header>
                    <div class="c1">物块模型</div>
                    <div class="c2">家具装饰</div>
                    <div class="c3">Mod物品</div>
                </header>
                <div class="img">
                    <img src="images/items/decoPumpkinJackOLantern.png">
                </div>
                <footer>
                    <div class="num">数量 :<span>123</span>件</div>
                    <div class="quality">品质 :<span>6</span></div>
                </footer>
            </div>
            <div class="right">
                <div class="btn-1">提取物品</div>
                <div class="btn-2">出售物品</div>
                <div class="btn-3">配方制作</div>
                <div class="btn-4">丢弃物品</div>
            </div>
        </section>
        <footer>
            <div class="desc">物品介绍</div>
        </footer>
    </div>
</template>

<script>

    //导入jquery
    // import $ from 'jquery'
    import "../../../../assets/style/warehouse/ware-details.css"

    export default {
        name: "ShopItemDetails",
        data() {
            return {
                buyCount: 1
            }
        },
        props: ["item"],
        methods: {},
        computed: {}, mounted() {
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
