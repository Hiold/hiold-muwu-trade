<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="handle-box">
      <el-select v-model="queryParam.type" placeholder="物品类型" class="handle-select mr10" @change="initTableData">
        <el-option key="-1" label="全部" value=""></el-option>
        <el-option key="1" label="击杀僵尸" value="1"></el-option>
        <el-option key="2" label="击杀动物" value="2"></el-option>
        <el-option key="3" label="击杀玩家" value="3"></el-option>
      </el-select>
      <el-input v-model="queryParam.username" placeholder="用户名或者店铺名" class="handle-input mr10"></el-input>
      <el-input v-model="queryParam.steamid" placeholder="SteamID" class="handle-input mr10"></el-input>
      <el-input v-model="queryParam.eosid" placeholder="EOSID" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="initTableData">搜索</el-button>
    </div>

    <div class="container">
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="queryData">
        <el-table-column prop="action.id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="操作时间" align="center">
          <template #default="scope">
            {{
              scope.row.action.actTime.substring(0, 19).replace("T", " ")
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作描述" align="center">
          <template #default="scope">
            {{ scope.row.action.desc }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template #default="scope">
            {{ scope.row.userinfo != null && scope.row.userinfo.length > 0 ? scope.row.userinfo[0].name : "" }}
          </template>
        </el-table-column>
        <el-table-column label="SteamID" align="center">
          <template #default="scope">
            {{ scope.row.userinfo != null && scope.row.userinfo.length > 0 ? scope.row.userinfo[0].gameentityid : "" }}
          </template>
        </el-table-column>
        <el-table-column label="EOSID" align="center">
          <template #default="scope">
            {{ scope.row.userinfo != null && scope.row.userinfo.length > 0 ? scope.row.userinfo[0].platformid : "" }}
          </template>
        </el-table-column>


      </el-table>
      <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="queryParam.limit"
          :page-sizes="[10, 50, 200, 1000]"
          :disabled="false"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>


    <!--弹出添加奖励物品层-->
    <el-dialog title="详细信息" v-model="actionDetailVisible" width="40%" :append-to-body="true"
               :close-on-click-modal="false">


      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="()=>{this.actionDetailVisible=false;}">关闭</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import {ElMessage, ElMessageBox} from 'element-plus'
import {defineAsyncComponent, getCurrentInstance} from "vue"
import $ from "jquery";
import md5 from 'js-md5';

export default {
  name: "ShopManage",
  mounted() {
    this.ctx = getCurrentInstance();
    this.initTableData();
  },
  data() {
    return {
      currentViewAction: {},
      actionDetailVisible: false,
      currentPage: 1,
      total: 0,
      queryData: null,
      ctx: {},
      addVisible: false,
      itemNameCache: [],
      queryParam: {
        steamid: "",
        eosid: "",
        username: "",
        itemname: "",
        getchanel: "",
        status: "",
        group: "",
        type: "",
        page: "1",
        limit: "10"
      },
      chanels: {
        "1": "系统中获得",
        "2": "下架物品",
        "3": "玩家交易",
        "4": "供货",
        "5": "游戏内容器",
        "6": "签到",
        "7": "补签",
        "8": "抽奖",
        "9": "阶段任务",
        "10": "红包"
      },
      status: {
        "1": "正常在库",
        "2": "已发放到游戏内",
        "3": "自行删除",
        "4": "自行卖出",
        "5": "供货消耗",
        "6": "抽奖消耗",
        "7": "补签消耗",
        "8": "管理员删除",
      }
    }
  },
  methods: {
    handleEdtor() {
      if (!this.instance) {
        console.log($("#editor"))
        this.editor = new wangEditor("#editor")

        // 配置 onchange 回调函数
        let self = this;
        this.editor.config.onchange = function (newHtml) {
          self.currentViewAction.desc = newHtml;
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 100; // 修改为 500ms
        this.editor.create()
        this.instance = true;
      }
      this.editor.txt.html(this.currentViewAction.desc);
    },
    getchanel(chanel) {
      return this.chanels[chanel + ""];
    },
    getstatus(chanel) {
      return this.status[chanel + ""];
    },
    handleSizeChange(size) {
      this.queryParam.limit = size + "";
      this.queryParam.page = "1";
      this.initTableData();
    },
    handleCurrentChange(idx) {
      console.log(idx);
      this.queryParam.page = idx + "";
      this.initTableData();
    },
    initTableData() {
      axios.post("api/getGameActionByPage", this.queryParam).then(res => {
        if (res.data.respCode === "1") {
          this.queryData = res.data.data.data;
          this.total = res.data.data.count;
          $(".imgDesc").attr("src", "'404'");
        } else {
          this.queryData = null;
          ElMessage.error(res.data.respMsg);
        }
      });
    },
    openUpdate(item) {
      this.actionDetailVisible = true;
      this.currentViewAction = item.row;
      $(".imgDescDetail").attr("src", "'404'");
      this.$nextTick(() => {
        this.handleEdtor();
      })
    },
    handleAvatarSuccess() {
      ElMessage({
        message: '上传成功!',
        type: 'success',
      });
      this.initIconData();
    },
    handleAvatarFaild() {
      ElMessage.error('上传失败');
      this.initIconData();
    },
    handleSelectImage(item) {
      this.currentViewAction.avatar = item;
    }
  }
}
</script>

<style>
.el-form-item {
  display: -webkit-box;
}

.infinite-list {
  height: 135px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  float: left;
}

.infinite-list .infinite-list-item {
  align-items: center;
  justify-content: center;
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  position: relative;
  display: inline-block;
}

.el-upload--text {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.infinite-list .infinite-list-item + .list-item {
  margin-left: 10px;
}

.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  vertical-align: top;
}

.demonstration {
  font-size: 14px;
  /*color: var(--el-text-color-secondary);*/
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.center {
  text-align: center;
}

.handle-space {
  width: 70%;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.selected {
  color: greenyellow;
  border: 0.02rem solid;
  position: relative;
  transition: all 0.5s ease;
}

.selected::after {
  content: '√';
  display: block;
  height: 0px;
  width: 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  /**对号大小*/
  font-size: 10px;
  line-height: 8px;
  border: 10px solid;
  border-color: transparent #4884ff #4884ff transparent;
}
</style>
