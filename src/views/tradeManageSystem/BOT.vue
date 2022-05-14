<template>
  <div style="height: 100%">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button type="primary" @click="RestartBOT">重启BOT</el-button>&emsp;&emsp;
        <el-button type="primary" @click="()=>{this.isQrcodeReady=true;}">配置</el-button>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"/>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"/>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"/>
      </el-col>
    </el-row>
    <br/>
    <el-input id="logContent" v-model="logContent" type="textarea" readonly="readonly"
              style="height: 100%;width: 100%;"></el-input>
    <el-dialog v-model="isQrcodeReady" width="30%" :close-on-click-modal="false">
      <el-form ref="formData" :model="formData">


        <el-form-item label="&emsp;群号&emsp;" class="center">
          <el-input class="handle-space" placeholder="群号" v-model="formData.qunNumber"
                    @input=""></el-input>
        </el-form-item>


        <el-form-item label="是否开启抽奖公告" class="center">
          <el-select v-model="formData.lottery" placeholder="是否开启抽奖公告" class="handle-space">
            <el-option key="True" label="开启" value="True"></el-option>
            <el-option key="False" label="关闭" value="False"></el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
                    <el-button @click="isQrcodeReady = false">取 消</el-button>
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

export default {
  name: "BOT",
  data() {
    return {
      formData: {},
      qrcodeSrc: "",
      isQrcodeReady: false,
      logContent: ""
    }
  },
  methods: {
    submitForm(from) {
      let params = this.formData;
      axios.post("api/setBotConfig", params).then(res => {
        ElMessage.success("修改成功");
        this.isQrcodeReady = false;
      });
    },
    getLog() {
      let params = {};
      axios.get("api/getBotLog", {params}).then(res => {
        //console.log(res.data);
        this.logContent = res.data;
      });
    },
    RestartBOT() {
      let params = {};
      axios.get("api/restartBOT", {params}).then(res => {
      });
    },
    loadQrcode() {
      if (!this.isQrcodeReady) {
        let params = {};
        axios.get("api/isQrcodeReady", {params}).then(res => {
          if (res.data.respCode === "1") {
            this.qrcodeSrc = "/api/getQrcode";
            this.isQrcodeReady = true;
          }
        });
      }
    }
  },
  mounted() {
    setInterval(() => {
      $("#logContent")[0].scrollTop = $("#logContent")[0].scrollHeight;
      this.getLog();
      // this.loadQrcode();
    }, 500)
  }
}
</script>

<style>
.el-textarea__inner {
  height: 90%;
  width: 100%;
}
</style>
