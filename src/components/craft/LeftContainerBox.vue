<template>
  <main>    <!-- 左侧主体 -->
    <my-header></my-header>
    <article style="display: none">
      <li class="loading">正在加载中<i></i></li>
    </article>
    <my-article :class1="class1" :class2="class2"></my-article>
  </main>

</template>

<script>
//引入顶部header
import MyHeader from "/src/components/craft/MainBox/MyHeader.vue";
import MyArticle from "/src/components/craft/MainBox/MyArticle.vue";

//导入样式
import '../../assets/style/box.css'

export default {
  name: "LeftContainerBox",
  components: {
    "my-header": MyHeader,
    "my-article": MyArticle
  },
  props: ["itemMenu", "class1", "class2"]
}
</script>

<style scoped>

</style>
