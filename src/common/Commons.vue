<script>
// 定义一些公共的属性和方法
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  methods: {
    loadNewPlayerData() {
      axios.get("api/getCurrentUser").then(res => {
        if (res.data.respCode === "1") {
          console.log("用户状态正常，保存本地数据");
          localStorage.setItem("userinfo", JSON.stringify(res.data.data));
          this.$store.state.playerinfo = res.data.data;
        } else {
          window.location = "/#/login";
        }
      });
    }
  },
  data() {
    return {
      playerinfo: {}
    }
  },
  mounted() {
    this.loadNewPlayerData();
  }
}
</script>
