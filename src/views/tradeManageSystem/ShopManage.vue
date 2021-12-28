<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </div>
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template #default="scope">￥</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">

          </template>
        </el-table-column>

        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <!-- 编辑弹出框 -->
    <el-dialog title="新增" v-model="addVisible" width="40%">
      <el-form>
        <!--物品种类-->
        <el-form-item class="center">
          <el-select v-model="itemType" placeholder="物品类型" class="handle-space">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center" v-show="itemType==='1'">
          <el-autocomplete style="width: 70%;" :minlength="2" v-model="itemName" :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>

        <el-form-item class="center" v-if="itemType==='1'&&itemName!==''&&itemName!==null">
          <el-image v-if="itemType==='1'&&itemName!==''&&itemName!==null"
                    style="width: 100px; height: 100px"
                    :src="src"
                    fit="fit"
          ></el-image>
        </el-form-item>

        <el-form-item class="center" v-if="itemType==='1'">
          <el-tag>品质</el-tag>
          <el-slider v-if="itemType==='1'" v-model="quality" :show-tooltip="true"
                     step="1" max="6" show-stops show-input
                     :marks="marks"></el-slider>
        </el-form-item>
        <br/>
        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="数量" v-model="itemnum"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-select v-model="currency" placeholder="货币种类" class="handle-space">
            <el-option key="1" label="积分" value="1"></el-option>
            <el-option key="2" label="钻石" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="数量" v-model="itemnum"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="价格" v-model="price"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-tag>折扣</el-tag>
          <el-slider v-model="discount" :show-tooltip="true"
                     step="0.1" max="10" show-input show-tooltip></el-slider>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="折后价格" v-model="prefer"></el-input>
        </el-form-item>

        <el-form-item>
          <div>
            <div class="container">
              <div class="plugins-tips">
                wangEditor：轻量级 web 富文本编辑器，配置方便，使用简单。
                访问地址：
                <a href="https://www.wangeditor.com/doc/" target="_blank">wangEditor</a>
              </div>
              <div class="mgb20" ref='toolbar'></div>
              <div class="mgb20" ref='editorHtml'></div>
              <el-button type="primary" @click="syncHTML">提交</el-button>
            </div>
          </div>
        </el-form-item>


      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {fetchData} from "../../api";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import WangEditor from "wangEditor";

export default {
  mounted() {
    this.instance = new WangEditor(`#toolbar`,`#editorHtml`);
    this.instance.config.zIndex = 1;
    this.instance.create();
  },

  name: "ShopManage",
  data() {
    return {
      instance: null,
      editor: null,
      html: "",
      text: "",
      src: '',
      prefer: "",
      discount: "",
      itemType: "",
      currency: "",
      price: "",
      itemName: "",
      itemnum: "",
      addVisible: false,
      itemNameCache: [],
      quality: 0,
      marks: {
        0: {
          style: {
            color: '#1989FA',
          },
          label: '无品质',
        },
        1: {
          style: {
            color: 'rgb(157, 138, 106)',
          },
          label: '1品质',
        }, 2: {
          style: {
            color: 'rgb(208, 129, 43)',
          },
          label: '2品质',
        }, 3: {
          style: {
            color: 'rgb(163, 165, 28)',
          },
          label: '3品质',
        }, 4: {
          style: {
            color: 'rgb(69, 195, 54)',
          },
          label: '4品质',
        }, 5: {
          style: {
            color: 'rgb(51, 96, 207)',
          },
          label: '5品质',
        }, 6: {
          style: {
            color: 'rgb(165, 44, 205)',
          },
          label: '6',
        }
      }
    }
  },
  methods: {
    handleAdd() {
      this.addVisible = true;
    },
    querySearchAsync(queryString, cb) {
      if (queryString && queryString.length >= 1) {
        let params = {itemname: queryString};
        axios.get("proxy/api/getSystemItem", {params}).then(res => {
          if (res.data.respCode === "1") {
            let JsonData = JSON.parse(res.data.data);
            //处理返回结果
            //声明一个数组存储待选项
            let sugestion = [];
            for (var i = 0; i < JsonData.length; i++) {
              console.log()
              sugestion[i] = {value: JsonData[i].translate[16]};
              this.itemNameCache[JsonData[i].translate[16]] = JsonData[i].itemname;
            }
            cb(sugestion);
          }
        });
      }
    },
    //执行查询
    handleSelect(item) {
      // console.log(item)
      this.itemName = item.value;
      // console.log(itemNameCache[itemName.value], itemName, item);
      this.src = 'proxy/api/image/' + this.itemNameCache[this.itemName] + '.png';
    }

  }
}
</script>

<style scoped>
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
</style>
