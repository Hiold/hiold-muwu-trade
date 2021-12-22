//此js保存定义了本项目所有路由规则
import Vuerouter from 'vue-router';
import ShopMainContainer from "../components/ShopMainContainer";

export default new Vuerouter([{
    name: "shop",
    route: "/shop",
    components: ShopMainContainer
}, {route: "/", redirect: '/shop'}

]);
