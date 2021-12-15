<template>
    <main>    <!-- 左侧主体 -->
        <my-header></my-header>
        <article>    <!-- 主要内容显示区域 : 动态加载内容 -->
            <li class="loading">正在加载中<i></i></li>
        </article>
    </main>

</template>

<script>
    //引入顶部header
    import MyHeader from "./MainBox/MyHeader";

    import '../../assets/style/box.css'

    export default {
        name: "LeftContainerBox",
        components: {
            "my-header": MyHeader
        }
    }
</script>

<style scoped>

</style>
