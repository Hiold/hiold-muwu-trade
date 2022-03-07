<template>
  <div class="collect-box" style="display: block;">
    <div class="empty" style="display: none;">
      <span>收藏夹是空的<br>快去商城逛逛吧</span>
    </div>

    <li class="coll-items" data-index="1"
        style="box-shadow: rgb(186, 85, 211) 0px 0px 0.5rem inset, rgb(186, 85, 211) 0px 0px 0.3rem; width: 48%; height: 8.5rem; padding: 2%;">
      <div class="left" style="background-color: rgba(186, 85, 211, 0.2);"><img src="images/items/gift.png"></div>
      <div class="right">
        <div class="Name"><span class="name">每日福利礼包</span> <span class="num" style="display: none;">x1</span></div>
        <div class="coll-num">32人收藏</div>
        <div class="price"><i style="background-image: url(&quot;images/icon/jf2.png&quot;);"></i><span>1</span></div>
        <div class="icon"></div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "CollectItem",
  props: ["item"]
}
</script>

<style scoped>

</style>