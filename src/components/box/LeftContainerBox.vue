<template>
    <main>    <!-- 左侧主体 -->
        <my-header></my-header>
        <article style="display: none">
            <li class="loading">正在加载中<i></i></li>
        </article>
        <my-article></my-article>
    </main>

</template>

<script>
    //引入顶部header
    import MyHeader from "./MainBox/MyHeader";
    import MyArticle from "./MainBox/MyArticle";

    //导入样式
    import '../../assets/style/box.css'

    export default {
        name: "LeftContainerBox",
        components: {
            "my-header": MyHeader,
            "my-article": MyArticle
        }
    }
</script>

<style scoped>

</style>
