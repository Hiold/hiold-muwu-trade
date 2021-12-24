<template>
  <main>    <!-- 左侧主体 -->
    <my-header></my-header>
    <article style="display: none">
      <li class="loading">正在加载中<i></i></li>
    </article>
    <my-article :itemMenu="itemMenu" :class1="class1" :class2="class2" @setclass1="setclass1"
                @setclass2="setclass2"></my-article>
  </main>

</template>

<script>
//引入顶部header
import MyHeader from "/src/components/warehouse/MainBox/MyHeader.vue";
import MyArticle from "/src/components/warehouse/MainBox/MyArticle.vue";

//导入样式
import '../../assets/style/box.css'

export default {
  name: "LeftContainerBox",
  components: {
    "my-header": MyHeader,
    "my-article": MyArticle
  },
  props: ["itemMenu", "class1", "class2"],
  methods: {
    setclass1(val) {
      this.$emit("setclass1",val);
    },
    setclass2(val) {
      this.$emit("setclass2",val);
    }
  }
}
</script>

<style scoped>

</style>
