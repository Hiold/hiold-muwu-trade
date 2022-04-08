<template>
  <li :data-gameentityid="item.gameentityid">
    <div class="num">{{ index + 1 }}</div>
    <div class="head" ref="head" :id="'avatar'+index"
         :style="{'background-image':`url(api/image/${item.avatar}),url('/images/player/head1.jfif')`}"></div>
    <div class="name">
      <div class="shop-name">{{ item.shopname }}</div>
      <div class="vip" v-show="item.vipdiscount*1>0"></div>
      <div class="owner">店主：{{ item.name }}</div>
      <div class="level">lv.{{ item.level }}</div>
    </div>
    <div class="sales"><i></i><span>{{ item.trade_money }}</span></div>
    <div class="praised">
      <i :style="'background-image: url(\'images/icon/zan2.png\');'" v-if="item.password*1>=1"></i>
      <span v-if="item.password*1>=1" style="'color: orangered;">{{ item.likecount }}</span>
      <i v-if="item.password*1==0"></i>
      <span v-if="item.password*1==0">{{ item.likecount }}</span></div>
  </li>
</template>

<script>

export default {
  name: "TransPStoreList",
  props: ["item", "index"],
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
