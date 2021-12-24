<template>
  <!-- 主要内容显示区域（默认显示商品） -->
  <article>
    <shop-menu :class1="class1" :class2="class2" :itemMenu="itemMenu" @setclass1="setclass1" @setclass2="setclass2"></shop-menu>
    <shop-content :class1="class1" :class2="class2"></shop-content>
  </article>
</template>

<script>
import ShopMenu from "/src/components/shop/MainBox/Shop/ShopMenu.vue";
import ShopContent from "/src/components/shop/MainBox/Shop/ShopContent.vue";

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
  methods: {
    setclass1(val) {
      this.$emit("setclass1", val);
    },
    setclass2(val) {
      this.$emit("setclass2", val);
    }
  },
  props: ["itemMenu", "class1", "class2"]
}
</script>

<style scoped>

</style>
