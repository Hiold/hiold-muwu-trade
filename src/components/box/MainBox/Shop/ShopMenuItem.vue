<template>
  <div class="visible">
    <ul :class="['btn'+(menuindex+1%6)]">
      <div>{{ menucategory }}</div>
    </ul>
    <li :class="['b'+(menuindex+1)+'-t'+(idx%6)]" v-for="(item,idx) in menuitem" :key="item.name">{{ item.name }}</li>
  </div>
</template>

<script>
export default {
  name: "ShopMenuItem",
  props: ["menuitem", 'menucategory', 'menuindex']
}
</script>

<style scoped>
.visible {
  overflow: visible;
}
</style>
