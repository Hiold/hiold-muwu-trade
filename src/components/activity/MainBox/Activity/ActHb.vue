<template>
    <div class="Act-hb">        <!-- 定时抢红包 -->
        <ActHbItem :item="item" v-for="(item,index) in hblist" :key="index"></ActHbItem>
    </div>
</template>

<script>
    import ActHbItem from "./ActHbItem.vue";
    import axios from "axios";

    export default {
        name: "ActHb",
        components: {ActHbItem},
        data() {
            return {
                hblist: {}
            }
        },
        methods: {
            initTableData() {
                let params = {itemname: ""};
                axios.post("api/getDailyAward", params).then(res => {
                    if (res.data.respCode === "1") {
                        let JsonData = res.data.data;
                        this.hblist = JsonData;
                    }
                });
            },
        },
        mounted() {
            this.initTableData();
        }
    }
</script>

<style scoped>

</style>
