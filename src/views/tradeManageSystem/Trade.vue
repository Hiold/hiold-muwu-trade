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
        <el-option key="0" label="全部" value=""></el-option>
        <el-option key="普通物品" label="普通物品" value="普通物品"></el-option>
        <el-option key="特殊物品" label="特殊物品" value="特殊物品"></el-option>
      </el-select>
      <el-select v-model="queryParam.status" placeholder="物品状态" class="handle-select mr10" @change="initTableData">
        <el-option key="0" label="全部" value=""></el-option>
        <el-option key="1" label="正常在售" value="1"></el-option>
        <el-option key="2" label="已售出" value="2"></el-option>
        <el-option key="3" label="已下架取回" value="3"></el-option>
        <el-option key="4" label="管理员删除" value="4"></el-option>
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
        <el-table-column label="物品类型" align="center">
          <template #default="scope">
            {{
              scope.row.itemtype == '1' ? "游戏内物品" : "特殊物品"
            }}
          </template>
        </el-table-column>
        <el-table-column label="物品图标" :width="80">
          <template #default="scope">
            <img class="imgDesc" style="width: 50px;height: 50px;" :src="'404'"
                 @error="$LoadTintImage($event.target,scope.row.itemicon,scope.row.itemtint)"/>
          </template>
        </el-table-column>
        <el-table-column label="物品名" align="center">
          <template #default="scope">
            {{
              (scope.row.translate === null || scope.row.translate === "") ? scope.row.couCurrType : scope.row.translate
            }}
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template #default="scope">
            {{
              scope.row.stock
            }}
          </template>
        </el-table-column>
        <el-table-column label="获得时间" align="center">
          <template #default="scope">
            {{
              scope.row.forSellTime.substring(0, 19).replace("T", " ")
            }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            {{
              getstatus(scope.row.itemStatus)
            }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="openUpdate(scope)">编辑
            </el-button>
            <el-button icon="el-icon-delete" size="small" class="red"
                       @click="handleDelete(scope.row)">删除
            </el-button>
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
    <el-dialog title="详细信息" v-model="storageDetailVisible" width="40%" :append-to-body="true"
               :close-on-click-modal="false">
      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center"></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content center">
            <img class="imgDescDetail" style="height: 100px;" :src="'404'"
                 @error="$LoadTintImage($event.target,currentViewStorage.itemicon,currentViewStorage.itemtint)"/>
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">归属</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <div class="grid-content" v-text="currentViewStorage.username"></div>
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>


      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">SteamID</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.gameentityid">
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
          <div class="grid-content" v-text="currentViewStorage.platformid">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">物品状态</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-select v-model="currentViewStorage.itemStatus" placeholder="物品状态" class="handle-select mr10">
              <el-option key="1" label="正常在售" :value=1></el-option>
              <el-option key="2" label="已售出" :value=2></el-option>
              <el-option key="3" label="已下架取回" :value=3></el-option>
              <el-option key="4" label="管理员删除" value="4"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateStorage('itemStatus',currentViewStorage.itemStatus)">修改</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">物品名称</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content"
               v-text="(currentViewStorage.translate === null || currentViewStorage.translate === '') ? currentViewStorage.couCurrType : currentViewStorage.translate">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">物品品质</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.quality">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row style="line-height: 40px;margin-top: 10px" :gutter="20" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">库存数量</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content">
            <el-input v-model="currentViewStorage.stock"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <el-button type="primary" @click="updateStorage('stock',currentViewStorage.stock)">修改
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">上架时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.forSellTime.substring(0, 19).replace('T', ' ')">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row v-if="currentViewStorage.itemStatus==2" :gutter="20" style="line-height: 40px;margin-top: 10px"
              type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">售出时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.selledTime.substring(0, 19).replace('T', ' ')">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">物品标签</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.class1">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>

      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="4">
          <div class="grid-content center">游戏内Data</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content" v-text="currentViewStorage.itemdata">
          </div>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
      <el-row :gutter="20" style="line-height: 40px;margin-top: 10px" type="flex" justify="center" align="middle">
        <el-col :span="20">
          <div class="container">
            <div class="plugins-tips">
              物品描述
            </div>
            <div class="mgb20" id='editor'></div>
            <el-button type="primary" @click="updateStorage('desc',currentViewStorage.desc)">修改描述
            </el-button>
          </div>
        </el-col>
      </el-row>
      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="()=>{this.storageDetailVisible=false;}">关闭</el-button>
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
      instance: false,
      editor: "",
      allIcon: null,
      currentViewStorage: {},
      storageDetailVisible: false,
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
        status: "",
        group: "",
        itemtype: "",
        page: "1",
        limit: "10"
      },
      status: {
        "1": "正常在售",
        "2": "已售出",
        "3": "已下架取回",
        "4": "管理员删除",
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
          self.currentViewStorage.desc = newHtml;
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 100; // 修改为 500ms
        this.editor.create()
        this.instance = true;
      }
      this.editor.txt.html(this.currentViewStorage.desc);
    },
    getchanel(chanel) {
      return this.chanels[chanel + ""];
    },
    getstatus(chanel) {
      return this.status[chanel + ""];
    },
    getmd5(str) {
      return md5(str);
    },
    updateStorage(type, data) {
      var param = {
        type: type + "",
        id: this.currentViewStorage.id + "",
        data: data + "",
      };
      axios.post("api/updateTradeeParam", param).then(res => {
        if (res.data.respCode === "1") {
          ElMessage.success("修改成功")
        } else {
          this.queryData = null;
          ElMessage.error(res.data.respMsg);
        }
        this.initTableData();
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
      axios.post("api/getTradeByPage", this.queryParam).then(res => {
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
    handleDelete(item) {
      ElMessageBox.confirm('确定要删除这个库存物品吗？')
          .then((value) => {
            if (value === "confirm") {
              var param = {
                type: "itemStatus",
                id: item.id + "",
                data: "4",
              };
              axios.post("api/updateTradeeParam", param).then(res => {
                if (res.data.respCode === "1") {
                  ElMessage.success("修改成功")
                } else {
                  this.queryData = null;
                  ElMessage.error(res.data.respMsg);
                }
                this.initTableData();
              });
            }
          })
          .catch(() => {
            // catch error
          })
    },
    openUpdate(item) {
      this.storageDetailVisible = true;
      this.currentViewStorage = item.row;
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
      this.currentViewStorage.avatar = item;
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
