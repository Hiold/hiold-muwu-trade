<template>
    <!--    <li :data-itemid="item.id">-->
    <!--        <div class="image"><img :src="'api/image/'+item.itemicon">-->
    <!--            <div class="quality" v-show="item.quality*1>0" :style="{'background':calcColor(item.quality)}">-->
    <!--                <span>{{ item.quality }}</span>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--        <div class="content">-->
    <!--            <div class="price"><i></i><span>{{ item.price }}</span></div>-->
    <!--            <div class="num">库存：{{ item.stock }}</div>-->
    <!--            <div class="name">-->
    <!--                {{ deleteBBcode((item.translate === null || item.translate === "") ? item.couCurrType : item.translate)-->
    <!--                }}-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </li>-->


    <li :data-itemid="item.gameentityid" :data-itemid2="item.id">
        <div class="image" style="position: relative;"><img :src="'404'" @error="$LoadTintImage($event.target,item.itemicon,item.itemtint)">
            <div class="quality" v-show="item.quality*1>0" :style="{'background':calcColor(item.quality)}">
                <span>{{ item.quality }}</span>
            </div>
        </div>
        <div class="content">
            <div class="price"><i></i><span>{{ item.price }}</span></div>
            <div class="num">库存：{{ item.stock }}</div>
            <div class="name"> {{ HandleItemName((item.translate === null || item.translate === "") ? item.couCurrType :
                item.translate)
                }}
            </div>
            <div class="shop" title="进入商店"><i :style="{'background-image': `url(api/image/${currentViewPlayer.avatar}),url('/images/player/head1.jfif')`}"></i><span>{{currentViewPlayer.name}}</span></div>
        </div>
    </li>

</template>

<script>
    import axios from "axios";
    import $ from "jquery";

    export default {
        name: "TransPstoreCard",
        props: ["item"],
        data() {
            return {
                currentViewPlayer: {},
            }
        },
        methods: {
            deleteBBcode(itemName) {	//隐藏颜色代码, 如[FF0000]这样的内容将会自动隐藏
                return itemName.replace(/([\\[][0-9a-fA-F]{6}[\]])/g, "");
                //return itemName;
            },
            calcColor(quality) {
                var color = "";
                // console.log(quality)
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
        },
        mounted() {
            let params = {
                id: this.item.gameentityid + "",
            }
            axios.post('api/getUserInfo', params).then(res => {
                if (res.data.respCode === "1") {
                    this.currentViewPlayer = res.data.data;
                }
            });
        }
    }
</script>

<style scoped>

</style>
