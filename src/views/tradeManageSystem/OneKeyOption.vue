<template>
  <div style="height: 100%">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tooltip content="删除所有类型的数据，完全重置（积分如果使用了naiwazibot，不会重置）">
          <el-button type="danger" @click="deleteAllData">删除所有数据</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tooltip content="删除所有玩家库存数据，保留并重置跟档物品（可再次领取）">
          <el-button type="danger" @click="deleteItemWithOutFollow">清空所有库存（保留跟档）</el-button>
        </el-tooltip>
        <el-tooltip content="删除所有玩家库存数据，不保留跟档物品">
          <el-button type="danger" @click="deleteItemWithFollow">清空所有库存（删除跟档）</el-button>
        </el-tooltip>
        <el-tooltip content="删除所有玩家上架的拍卖物品">
          <el-button type="danger" @click="exeCommand('db', 'delete from usertrade')">清空拍卖货架</el-button>
        </el-tooltip>
        <el-tooltip content="删除所有玩家发布的求购物品">
          <el-button type="danger" @click="exeCommand('db', 'delete from userrequire')">清空求购物品</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <br/>


    <el-row :gutter="20">
      <el-col :span="24">
        <el-tooltip content="删除所有玩家，连带清空积分（不包含naiwazi积分）、点券">
          <el-button type="danger" @click="exeCommand('db', 'delete from userinfo')">删除所有玩家</el-button>
        </el-tooltip>
        <el-tooltip content="清空玩家积分（不包含naiwazi积分）">
          <el-button type="danger" @click="exeCommand('db', 'update userinfo set money = 0')">清空玩家积分</el-button>
        </el-tooltip>
        <el-tooltip content="清空玩家点券">
          <el-button type="danger" @click="exeCommand('db', 'update userinfo set credit = 0')">清空玩家点券</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <br/>


    <el-row :gutter="20">
      <el-col :span="24">
        <el-tooltip content="重置所有玩家签到天数">
          <el-button type="danger" @click="exeCommand('logdb', 'delete from actionlog where actType=\'39\'')">重置签到</el-button>
        </el-tooltip>
        <el-tooltip content="重置所有玩家补签天数">
          <el-button type="danger" @click="exeCommand('logdb', 'delete from actionlog where actType=\'40\'')">重置补签</el-button>
        </el-tooltip>
        <el-tooltip content="清理所有日志，谨慎操作！影响多种统计、任务、制作等判定！">
          <el-button type="danger" @click="exeCommand('logdb', 'delete from actionlog')">清理所有日志</el-button>
        </el-tooltip>
        <el-tooltip content="清理所有正在制作、已制作完成物品">
          <el-button type="danger" @click="exeCommand('logdb', 'delete from actionlog where actType=\'42\'')">清理所有玩家制作物品</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <br/>

    <el-dialog v-model="isQrcodeReady" width="30%" :close-on-click-modal="false">
      请注意，你在这里做的所有操作，都没有后悔的可能，数据无价！请注意备份！谨慎操作！
      <template #footer>
                <span class="dialog-footer">
                    <el-button type="danger" @click="isQrcodeReady = false">我已知晓</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// /api/getQrcode
import $ from "jquery";
import axios from "axios";
import {ElMessage} from "element-plus";
//

export default {
  name: "OneKeyOption",
  data() {
    return {
      formData: {},
      isQrcodeReady: true,
    }
  },
  methods: {
    exeCommand(db, sql) {
      let params = {db: db, command: sql};
      axios.post("api/exeDBCommand", params).then(res => {
        this.isQrcodeReady = false;
      });
    },
    deleteAllData()
    {
      //删除数据db
      this.exeCommand("db", "delete from awardinfo");
      this.exeCommand("db", "delete from dailyaward");
      this.exeCommand("db", "delete from itemexchange");
      this.exeCommand("db", "delete from lottery");
      this.exeCommand("db", "delete from progression");
      this.exeCommand("db", "delete from shopitem");
      this.exeCommand("db", "delete from signinfo");
      this.exeCommand("db", "delete from userconfig");
      this.exeCommand("db", "delete from userinfo");
      this.exeCommand("db", "delete from userrequire");
      this.exeCommand("db", "delete from userstorage");
      this.exeCommand("db", "delete from usertrade");
      //删除数据logdb
      this.exeCommand("logdb", "delete from actionlog");
      //删除数据gameeventdb
      this.exeCommand("gameeventdb", "delete from gameeventlog");
      //释放空间
      this.exeCommand("db", "VACUUM");
      this.exeCommand("logdb", "VACUUM");
      this.exeCommand("gameeventdb", "VACUUM");
      ElMessage.success("操作成功");
    },
    deleteItemWithOutFollow(){
      this.exeCommand("db", "update userstorage set storageCount=extinfo1,itemStatus='1' where itemGetChenal='1' and follow='2' and extinfo1!=null");
      this.exeCommand("db", "delete from userstorage where itemGetChenal!='1' or follow='1'");
    },
    deleteItemWithFollow(){
      this.exeCommand("db", "delete from userstorage");
    }

  },
  mounted() {
  }
}
</script>

<style>
.el-textarea__inner {
  height: 90%;
  width: 100%;
}
</style>
