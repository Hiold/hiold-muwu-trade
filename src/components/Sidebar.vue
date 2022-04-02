<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/manage/dashboard",
        title: "系统信息",
      },
      {
        icon: "el-icon-pie-chart",
        index: "/manage/specialitem",
        title: "特殊物品",
      },
      {
        icon: "el-icon-lx-people",
        index: "3",
        title: "用户管理",
        subs: [
          {
            index: "/manage/player",
            title: "账户管理",
          },
          {
            index: "/manage/storage",
            title: "库存管理",
          }, {
            index: "/manage/trade",
            title: "交易管理",
          },

        ],
      },
      {
        icon: "el-icon-lx-shop",
        index: "/manage/shopmanage",
        title: "系统商店",
      },
      {
        icon: "el-icon-lx-present",
        index: "/manage/dailyawardmanage",
        title: "红包管理",
      },
      {
        icon: "el-icon-wind-power",
        index: "/manage/progression",
        title: "活动任务",
      },
      {
        icon: "el-icon-goods",
        index: "/manage/lottery",
        title: "抽奖管理",
      },
      {
        icon: "el-icon-s-claim",
        index: "/manage/dailysign",
        title: "签到奖励",
      }
      , {
        icon: "el-icon-lx-calendar",
        index: "/manage/action",
        title: "操作记录",
      }, {
        icon: "el-icon-lx-rank",
        index: "/manage/gameevent",
        title: "游戏事件",
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
