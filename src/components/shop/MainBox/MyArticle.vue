<template>
  <!-- 主要内容显示区域（默认显示商品） -->
  <article>
    <shop-menu :class1="class1" :class2="class2" :itemMenu="itemMenu"></shop-menu>
    <shop-content :class1="class1" :class2="class2"></shop-content>
  </article>
</template>

<script>
import ShopMenu from "./Shop/ShopMenu";
import ShopContent from "./Shop/ShopContent";

export default {
  data() {
    return {
      // class1: "活动折扣",
      // class2: "全部"
    }
  },
  name: "MyArticle",
  components: {
    "shop-menu": ShopMenu,
    "shop-content": ShopContent
  },
  props: ["itemMenu", "class1", "class2"]
}
</script>

<style scoped>

</style>
