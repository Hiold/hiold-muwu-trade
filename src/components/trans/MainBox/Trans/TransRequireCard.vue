<template>
    <li>
        <div class="image"><img :src="'api/image/'+item.Itemicon+'.png'">
            <div class="quality" v-show="item.Itemquality*1>0" :style="{'background':calcColor(item.Itemquality)}">
                <span>{{ item.Itemquality }}</span>
            </div>
        </div>
        <div class="content">
            <div class="price"><i></i><span>{{ item.Price }}</span></div>
            <div class="num">需求：{{ item.Itemcount }}</div>
            <div class="name">
                {{ deleteBBcode((item.Itemchinese))
                }}
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "TransPstoreCard",
        props: ["item"],
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
        }
    }
</script>

<style scoped>

</style>
