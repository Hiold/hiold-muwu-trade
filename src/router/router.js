import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import warehouse from "/src/components/WareHouseMainContainer.vue";
import shop from "/src/components/ShopMainContainer.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: "/shop",
        component: shop
    },
    {
        path: "/warehouse",
        component: warehouse
    },
    {
        path: "/",
        redirect: "/shop"
    }
]

var router = new VueRouter({
    routes
})
export default router;
