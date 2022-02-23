<template>
    <router-view>
    </router-view>
</template>

<script>
    import axios from "axios";
    import {ElMessage} from "element-plus";

    export default {
        name: "UserContainer",
        mounted() {
            axios.get("api/getCurrentUser").then(res => {
                if (res.data.respCode === "1") {
                    console.log("用户状态正常，保存本地数据");
                    localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                } else {
                    window.location = "/#/login";
                }
            });
        }
    }
</script>

<style scoped>

</style>
