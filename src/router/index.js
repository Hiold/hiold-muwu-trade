import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
// import shop from "../components/ShopMainContainer.vue";
// import warehouse from "../components/WareHouseMainContainer.vue";
//覆盖更新master
const routes = [{
    path: '/', redirect: '/login'
}, {
    path: "/userq", name: "Userq",
    component: () => import ( /* webpackChunkName: "dashboard" */ "../components/UserContainer.vue"),
    children: [
        {
            path: "shop",
            name: "shop",
            meta: {
                title: '系统商店'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../components/ShopMainContainer.vue")
        },
        {
            path: "warehouse",
            name: "warehouse",
            meta: {
                title: '个人仓库'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../components/WareHouseMainContainer.vue")
        },
        {
            path: "trans",
            name: "trans",
            meta: {
                title: '交易中心'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../components/TransMainContainer.vue")
        },
        {
            path: "activity",
            name: "activity",
            meta: {
                title: '活动中心'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../components/ActivityMainContainer.vue")
        }
        ,
        {path: "/", redirect: "/shop"}]
}, {
    path: "/manage", name: "Userqs", component: Home, children: [{
        path: "dashboard", name: "dashboard", meta: {
            title: '系统首页'
        }, component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
    },
        {
            path: "specialitem",
            name: "specialitem",
            meta: {
                title: '特殊物品'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/SpecialItem.vue")
        },
        {
            path: "shopmanage",
            name: "shopmanage",
            meta: {
                title: '商店管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/ShopManage.vue")
        },
        {
            path: "dailyawardmanage",
            name: "dailyawardmanage",
            meta: {
                title: '红包管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/DailyAwardManage.vue")
        },
        {
            path: "progression",
            name: "progression",
            meta: {
                title: '活动任务'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Progression.vue")
        },
        {
            path: "lottery",
            name: "lottery",
            meta: {
                title: '抽奖管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Lottery.vue")
        },
        {
            path: "dailysign",
            name: "dailysign",
            meta: {
                title: '签到奖励'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/DailySIgn.vue")
        },
        {
            path: "player",
            name: "player",
            meta: {
                title: '账户管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Player.vue")
        },
        {
            path: "storage",
            name: "storage",
            meta: {
                title: '库存管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Storage.vue")
        },
        {
            path: "trade",
            name: "trade",
            meta: {
                title: '交易管理'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Trade.vue")
        }
        ,
        {
            path: "action",
            name: "action",
            meta: {
                title: '操作记录'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/Action.vue")
        },
        {
            path: "gameevent",
            name: "gameevent",
            meta: {
                title: '游戏事件'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/GameAction.vue")
        },
        {
            path: "itemexchange",
            name: "itemexchange",
            meta: {
                title: '游戏事件'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "../views/tradeManageSystem/ItemExchange.vue")
        }]
}, {
    path: "/login", name: "Login", meta: {
        title: '登录'
    }, component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
}

];

const router = createRouter({
    history: createWebHashHistory(), routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 木屋海鸥交易系统`;
    next();
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     next();
    // }
});

export default router;
