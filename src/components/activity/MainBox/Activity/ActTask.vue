<template>
  <div class="Act-task">        <!-- 活动任务 -->
    <div class="task-day">
      <!-- 每日任务 -->
      <ActTaskItem :item="item" v-for="(item,index) in progressionList" :loadTask="loadTask"
                   :key="item.id"></ActTaskItem>
    </div>
  </div>
</template>

<script>
import ActTaskItem from "./ActTaskItem.vue";
import axios from "axios";

export default {
  data() {
    return {
      progressionList: [],
      type: ""
    }
  },
  watch: {
    class1: {
      handler(newName, oldName) {
      },
      immediate: true
    },
    class2: {
      handler(newName, oldName) {
        if (newName != oldName) {
          this.loadTask(newName)
        }
      }
    },
  },
  mounted() {
    this.loadTask("");
  },
  name: "ActTask",
  props: ["class1", "class2"],
  components: {ActTaskItem},
  methods: {
    loadTask(type) {
      let params = {type: type + ""};
      axios.post("api/getProgression", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.progressionList = JsonData;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
