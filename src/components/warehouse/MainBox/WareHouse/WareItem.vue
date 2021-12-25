<template>
  <!--$emit为调用父类中showDetail方法 用户展示详细信息-->
  <li class="ware-items" :data-index="index" @click="showdetailsss($event.target)">
    <header>{{ deleteBBcode(item.name) }}</header>
    <section>
      <div class="left">
        <div class="img"><img :src="item.image">
          <div class="quality" v-show="item.quality*1>0" :style="{'background':calcColor(item.quality)}">
            <span>{{ item.quality }}</span>
          </div>
        </div>
        <footer>数量 :<span>{{ item.num }}</span>件</footer>
      </div>
      <div class="right">
        <div class="btn-1">详情</div>
        <div class="btn-2">提取</div>
        <div class="btn-3">丢弃</div>
      </div>
    </section>
  </li>
</template>

<script>
export default {
  name: "ShopItem",
  props: ["item", "index", "vip"],
  methods: {
    deleteBBcode(itemName) {	//隐藏颜色代码, 如[FF0000]这样的内容将会自动隐藏
      return itemName.replace(/([\\[][0-9a-fA-F]{6}[\]])/g, "");
      //return itemName;
    },
    showdetailsss(target) {
      console.log(11111)
      this.$emit('showdetail', this.item, target)
    },
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
