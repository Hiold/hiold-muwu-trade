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
    <el-dialog title="新增" v-model="addVisible" width="30%">
      <el-form>
        <!--物品种类-->
        <el-form-item class="center">
          <el-select v-model="itemType" placeholder="物品类型" class="handle-space">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center">
          <el-autocomplete :minlength="2" v-model="itemName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
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

export default {
  name: "ShopManage",
  setup() {
    axios.get('proxy/api/getSystemItem')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    //当前选择的物品类型
    var itemType = ref("");
    var itemName = ref("");
    /**
     * 建立保存新增的窗口
     */
    const addVisible = ref(false);

    const handleAdd = () => {
      addVisible.value = true;
    };

    //执行查询
    const querySearchAsync = (queryString, cb) => {
      if (queryString && queryString.length >= 1) {
        let params = {itemname: queryString};
        axios.get("proxy/api/getSystemItem", {params}).then(res => {
          if (res.data.respCode === "1") {
            let JsonData = JSON.parse(res.data.data);
            //处理返回结果
            //声明一个数组存储待选项
            let sugestion = [];
            for (var i = 0; i < JsonData.length; i++) {
              sugestion[i] = {value: JsonData[i].itemname};
            }
            cb(sugestion);
          }
        });
      }
    }
    const handleSelect = (item) => {
      console.log(itemName, item);
    }


    return {
      addVisible,
      handleAdd,
      itemType,
      itemName,
      querySearchAsync,
      handleSelect,
    };
  }
}
</script>

<style scoped>
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
