<template>
  <el-card class="box-card" style="width: 60%;margin: 0 auto;">
    <div>1.下载配置工具
      <el-button type="primary" @click="downloadEvt('https://pan.bilnn.com/s/4qGoup')">点击下载</el-button>
    </div>
    <br>
    <div>2.解压文件到任意位置，文件如下图<br>
      <el-image
          src="https://pan.bilnn.com/api/v3/file/sourcejump/vk6oxpcq/W7nMG7VDTEtrSdiI_0MDRbyMqkIzF23fRyy2IjgFXWs*"></el-image>
    </div>
    <br>
    <div>3.运行drea.exe，稍作等待会出现一个二维码如图，使用手机扫码登录<br>
      <el-image
          src="https://pan.bilnn.com/api/v3/file/sourcejump/J8E9yKtz/TzNg8WjMtpnz3upQlAhh_8DNTnRaqJOTfjueDQva9g4*"></el-image>
    </div>

    <br>
    <div>4.登录成功后界面如下，出现这个界面表示登录成功，点击退出程序<br>
      <el-image
          src="https://pan.bilnn.cn/api/v3/file/sourcejump/xqGv4ASe/s7tSsj-bmOi_KttVW2ibcZ3pV-TRJGrnX9pCYtdLUJA*"></el-image>
    </div>
    <br>
    <div>5.将device.json和session.token两个文件拖拽到下面的方框中上传，文件如图<br>
      <el-image
          src="https://pan.bilnn.com/api/v3/file/sourcejump/9yEXgWuo/kfP3OAPAu73_6WVkRFggFr_Y_t95FgwBMTEwMUNZTz4*"></el-image>
      <br>
      <el-upload
          class="upload-demo"
          drag
          action="/api/uploadConfigFile"
          multiple
      >
        <div class="el-upload__text" style="margin-top: 10%">
          将文件拖拽到这里上传 <em>或者点击选择文件</em>
        </div>
      </el-upload>
    </div>

    <div>6.文件上传成功后请前往群机器人日志开启机器人<br>

    </div>
  </el-card>
</template>

<script>
// /api/getQrcode
import $ from "jquery";
import axios from "axios";

export default {
  name: "BOT",
  data() {
    return {
      qrcodeSrc: "",
      isQrcodeReady: false,
      logContent: ""
    }
  },
  methods: {
    downloadEvt(url) {
      window.open(url, '_blank');
    },
    getLog() {
      let params = {};
      axios.get("api/getBotLog", {params}).then(res => {
        //console.log(res.data);
        this.logContent = res.data;
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
  }
}
</script>

<style>
.el-textarea__inner {
  height: 90%;
  width: 100%;
}
</style>
