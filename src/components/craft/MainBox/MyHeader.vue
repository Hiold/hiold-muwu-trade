<template>
  <header>    <!-- 头部基础信息：logo、标题、积分、钻石（点券）、邮件#、皮肤#、设置# -->
    <div className="game-head"></div>
    <span className="title">七日杀 - 积分交易商城 2022</span>
    <div className="seting">
      <div className="set" title="设置"></div>
      <div className="skin" title="皮肤"></div>
      <div className="mail" title="邮件"></div>
    </div>
    <div className="Diamond">
      <i></i>
      <span v-if="$store.state.playerinfo">{{ $store.state.playerinfo.credit }}</span>
    </div>
    <div className="Point">
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
