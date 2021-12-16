<template>
    <li class="items" :data-index="index">
        <!--渲染名字时使用过滤器去掉bbcode-->
        <header>
            <span class="name">{{ item.name |deleteBBcode }}</span>
            <!--同时满足折扣1~10之间并不是跟档道具才展示折扣-->
            <span class="num" v-show="item.num>0">x{{ item.num }}</span><i
                v-show="item.discount<10&&item.discount>0&&!item.follow"
                v-text="calcDiscount(item.discount)"></i>
            <div class="follow" v-show="item.follow">跟档</div>
        </header>
        <section>
            <img :src="item.image">
            <div class="quality" v-show="item.quality*1>0" :style="{'background':calcColor(item.quality)}">
                <span>{{ item.quality }}</span>
            </div>
            <div class="collect collected" v-if="item.collected"></div>
            <div class="collect notcollected" v-if="!item.collected"></div>
            <div class="hot" v-show="calcHot(item)"></div>
            <div class="ex" v-show="item.classMod">Mod物品</div>
            <div class="ex" v-show="item.class1=='网页专属'">Mod物品</div>
            <div class="soldout" v-show="item.stock*1<=0"></div>
            <div class="vip" v-show="vip===true"></div>
        </section>
        <footer><i></i><span class="price"></span>
            <del></del>
            <span class="active"></span></footer>
    </li>
</template>

<script>

    export default {
        name: "ShopItem",
        props: ["item", "index", "vip"],
        filters: {
            deleteBBcode(itemName) {	//隐藏颜色代码, 如[FF0000]这样的内容将会自动隐藏
                return itemName.replace(/([\\[][0-9a-fA-F]{6}[\]])/g, "");
                //return itemName;
            }
        },
        methods: {
            calcDiscount(discount) {
                if (discount < 10 && discount > 0) {
                    var zk = Math.floor(discount * 10) / 10;		//只保留小数点后一位
                    return zk + "折";	//显示折扣
                } else {
                    return "";
                }
            },
            calcColor(quality) {
                var color = "";
                console.log(quality)
                if (quality * 1 >= 1) {
                    if (quality * 1 === 1) {
                        color = "rgb(157, 138, 106)"
                    }
                    if (quality * 1 === 2) {
                        color = "rgb(208, 129, 43)"
                    }
                    if (quality * 1 === 3) {
                        color = "rgb(163, 165, 28)"
                    }
                    if (quality * 1 === 4) {
                        color = "rgb(69, 195, 54)"
                    }
                    if (quality * 1 === 5) {
                        color = "rgb(51, 96, 207)"
                    }
                    if (quality * 1 === 6) {
                        color = "rgb(165, 44, 205)"
                    }
                }
                return color;
            },
            calcHot(item) {
                if (item.hot === "true") {	//如果设置的热销为true
                    return true;
                } else if (item.hot === "auto") {	//如果设置的热销是自动
                    if (item.sales >= item.hotSet) {	//如果实际销量大于设置的销量上限
                        return true
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped>
</style>
