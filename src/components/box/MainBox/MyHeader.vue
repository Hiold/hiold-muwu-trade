<template>
    <header>    <!-- 头部基础信息：logo、标题、积分、钻石（点券）、邮件#、皮肤#、设置# -->
        <div class="game-head"></div>
        <span class="title">七日杀 - 积分交易商城 2022</span>
        <div class="seting">
            <div class="set" title="设置"></div>
            <div class="skin" title="皮肤"></div>
            <div class="mail" title="邮件"></div>
        </div>
        <div class="Diamond">
            <i></i>
            <span>0</span>
        </div>
        <div class="Point">
            <i></i>
            <span>0</span>
        </div>
    </header>
</template>

<script>
    export default {
        name: "MyHeader"
    }
</script>

<style scoped>

</style>
