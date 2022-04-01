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
      <span v-if="$store.state.playerinfo">{{ $store.state.playerinfo.credit }}</span>
    </div>
    <div class="Point">
      <i></i>
      <span v-if="$store.state.playerinfo">{{ $store.state.playerinfo.money }}</span>
    </div>
  </header>
  <!--  <common @infochange="infochange"></common>-->
</template>

<script>

import {getCurrentInstance} from "vue";

export default {
  name: "MyHeader",
  mounted() {
    console.log(getCurrentInstance().appContext.config);
    getCurrentInstance().appContext.config.globalProperties.loadUserInfo();
  }
}
</script>

<style scoped>

</style>
