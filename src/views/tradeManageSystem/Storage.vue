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
      <el-select v-model="queryParam.itemtype" placeholder="物品类型" class="handle-select mr10" @change="initTableData">
        <el-option key="普通物品" label="普通物品" value="普通物品"></el-option>
        <el-option key="特殊物品" label="特殊物品" value="特殊物品"></el-option>
      </el-select>
      <el-select v-model="queryParam.getchanel" placeholder="获取的途径" class="handle-select mr10" @change="initTableData">
        <el-option key="1" label="系统中获得" value="1"></el-option>
        <el-option key="2" label="下架物品" value="2"></el-option>
        <el-option key="3" label="玩家交易" value="3"></el-option>
        <el-option key="4" label="供货" value="4"></el-option>
        <el-option key="5" label="游戏内容器" value="5"></el-option>
        <el-option key="6" label="签到" value="6"></el-option>
        <el-option key="7" label="补签" value="7"></el-option>
        <el-option key="8" label="抽奖" value="8"></el-option>
        <el-option key="9" label="阶段任务" value="9"></el-option>
        <el-option key="10" label="红包" value="10"></el-option>
      </el-select>
      <el-input v-model="queryParam.username" placeholder="用户名或者店铺名" class="handle-input mr10"></el-input>
      <el-input v-model="queryParam.steamid" placeholder="SteamID" class="handle-input mr10"></el-input>
      <el-input v-model="queryParam.eosid" placeholder="EOSID" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="initTableData">搜索</el-button>
    </div>

    <div class="container">
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="queryData">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="归属" align="center">
          <template #default="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="物品名" align="center">
          <template #default="scope">
            {{
              (scope.row.translate === null || scope.row.translate === "") ? scope.row.couCurrType : scope.row.translate
            }}
          </template>
        </el-table-column>
        <el-table-column label="获得时间" align="center">
          <template #default="scope">
            {{
              scope.row.collectTime.substring(0, 19).replace("T", " ")
            }}
          </template>
        </el-table-column>
        <el-table-column label="获得途径" align="center">
          <template #default="scope">
            {{
              getchanel(scope.row.itemGetChenal)
            }}
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="queryParam.limit"
          :page-sizes="[10, 50, 200, 1000]"
          :disabled="false"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>


    <!--弹出添加奖励物品层-->
    <el-dialog title="详细信息" v-model="userDetailVisible" width="40%" :append-to-body="true"
               :close-on-click-modal="false">
      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">用户名</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.name"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('name',currentViewPlayer.name)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">账户状态</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-select style="width: 100%;" v-model="currentViewPlayer.status" placeholder="货币种类">
              <el-option key="1" label="正常" :value='1'></el-option>
              <el-option key="0" label="封禁交易系统" :value='0'></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('status',currentViewPlayer.status)">修改</el-button>
          </div>
        </el-col>
      </el-row>


      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">会员折扣</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-tooltip content="设置为0系统将判断用为普通用户，设置为1-100之间为vip用户，自动享受优惠" placement="top">
              <el-input v-model="currentViewPlayer.vipdiscount"/>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('vipdiscount',currentViewPlayer.vipdiscount)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">店铺名</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.shopname"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('shopname',currentViewPlayer.shopname)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">SteamID</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.gameentityid">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">EOSID</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.platformid">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">注册时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.created_at.substring(0,19).replace('T',' ')">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">积分</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.money"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('money',currentViewPlayer.money)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">点券</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.credit"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('credit',currentViewPlayer.credit)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">密码</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input placeholder="请输入新密码" v-model="currentViewPlayer.newpassword"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('newpassword',getmd5(currentViewPlayer.newpassword))">修改
            </el-button>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">QQ</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.qq"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('qq',currentViewPlayer.qq)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">E-Mail</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.email"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('email',currentViewPlayer.email)">修改</el-button>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">头像</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <ul class="infinite-list" style="overflow-x: scroll">
              <el-upload action="api/uploadFile" multiple :on-success="handleAvatarSuccess"
                         :on-error="handleAvatarFaild"
                         style="float: left;width: 100px;height: 100px;">
                <el-tag style="margin-top: 35px;">添加新图片</el-tag>
              </el-upload>
              <li v-for="i in allIcon" :key="i" class="infinite-list-item">
                <el-image :class="{'selected':(i===currentViewPlayer.avatar)}"
                          style="width: 100px;height:100px;cursor: pointer"
                          :src="'api/image/'+i"
                          @click="handleSelectImage(i)">
                </el-image>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('avatar',currentViewPlayer.avatar)">修改</el-button>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">个性签名</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewPlayer.sign"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateUser('sign',currentViewPlayer.sign)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">购买物品</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.buy_count">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">购买金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.moneycost">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">交易次数</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.trade_count">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">交易金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.trade_money">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">求购次数</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.require_count">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">求购金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.require_money">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">玩家等级</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.level">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">在线时长</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="(currentViewPlayer.online_time/3600).toFixed(2)+'小时'">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">击杀僵尸</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.zombie_kills">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">击杀玩家</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.player_kills">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">制作物品</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewPlayer.total_crafted">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="()=>{this.userDetailVisible=false;}">关闭</el-button>
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
    this.initIconData();
  },
  data() {
    return {
      allIcon: null,
      currentViewPlayer: {},
      userDetailVisible: false,
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
        itemtype: "",
        page: "1",
        limit: "10"
      },
      getchanels: {
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
      }
    }
  },
  methods: {
    getchanel(chanel) {
      return this.getchanels[chanel + ""];
    },
    getmd5(str) {
      return md5(str);
    },
    updateUser(type, data) {
      var param = {
        type: type + "",
        id: this.currentViewPlayer.id + "",
        data: data + "",
      };
      axios.post("api/updateUserInfoParam", param).then(res => {
        if (res.data.respCode === "1") {
          ElMessage.success("修改成功")
        } else {
          this.queryData = null;
          ElMessage.error(res.data.respMsg);
        }
      });
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
      axios.post("api/getStorageByPage", this.queryParam).then(res => {
        if (res.data.respCode === "1") {
          this.queryData = res.data.data.data;
          this.total = res.data.data.count;
        } else {
          this.queryData = null;
          ElMessage.error(res.data.respMsg);
        }
      });
    },
    handleDelete(item) {

    },
    openUpdate(item) {
      this.userDetailVisible = true;
      this.currentViewPlayer = item.row;
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
    initIconData() {
      let params = {itemname: ""};
      axios.post("api/getIconFile", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.allIcon = JsonData;
        }
      });
    },
    handleSelectImage(item) {
      this.currentViewPlayer.avatar = item;
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
  width: 120px;
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
