<template>
  <div
      class="di main-wrap"
      v-loading="audio.waiting"
      element-loading-text="音视频加载中"
      element-loading-spinner="el-icon-loading"
  >
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio
        ref="audio"
        class="dn"
        :src="url"
        :preload="audio.preload"
        @play="onPlay"
        @error="onError"
        @waiting="onWaiting"
        @pause="onPause"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div>
      <!-- 播放 -->
      <i
          class="el-icon-microphone"
          v-if="audio.playing == true"
          style="color: rgb(10 243 61); font-size: 18px"
      ></i>
      <i class="el-icon-microphone" v-else style="font-size: 18px"></i>
      <el-button style="margin: 0 10px" type="text" @click="startPlayOrPause">{{
          audio.playing | transPlayPause
        }}</el-button>

      <!-- 播放最大时间 -->
      <span type="info">{{ audio.maxTime | formatSecond }}</span>

      <!-- 快进按钮 -->
      <!-- <el-button
        v-show="!controlList.noSpeed"
        type="text"
        @click="changeSpeed"
        >{{ audio.speed | transSpeed }}</el-button
      > -->

      <!-- 播放时间 -->
      <!-- <el-tag type="info">{{ audio.currentTime | formatSecond }}</el-tag> -->

      <!-- 播放进度条 -->
      <el-slider
          v-show="!controlList.noProcess"
          v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          class="slider"
      ></el-slider>

      <!-- 静音按钮 -->
      <!-- <el-button
        v-show="!controlList.noMuted"
        type="text"
        @click="startMutedOrNot"
        >{{ audio.muted | transMutedOrNot }}</el-button
      > -->

      <!-- 音量大小 -->
      <!-- <el-slider
        v-show="!controlList.noVolume"
        v-model="volume"
        :format-tooltip="formatVolumeToolTip"
        @change="changeVolume"
        class="slider"
      ></el-slider> -->

      <!-- <a
        :href="url"
        v-show="!controlList.noDownload"
        target="_blank"
        class="download"
        download
        >下载</a
      > -->
    </div>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return (
        hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}
export default {
  // 父传子
  props: {
    theUrl: {
      type: String,
      required: true,
    },
    theSpeeds: {
      type: Array,
      default() {
        return [1, 1.5, 2];
      },
    },
    theControlList: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: this.theUrl,
      audio: {
        currentTime: 0,
        maxTime: 0, // 音频时长
        playing: false, // 是否在播放
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto",
      },
      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds,
      controlList: {
        // 不显示下载
        noDownload: false,
        // 不显示静音
        noMuted: false,
        // 不显示音量条
        noVolume: false,
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false,
        // 不要快进按钮
        noSpeed: false,
      },
    };
  },
  methods: {
    changeSpeed() {
      let index = this.speeds.indexOf(this.audio.speed) + 1;
      this.audio.speed = this.speeds[index % this.speeds.length];
      this.$refs.audio.playbackRate = this.audio.speed;
    },
    startMutedOrNot() {
      this.$refs.audio.muted = !this.$refs.audio.muted;
      this.audio.muted = this.$refs.audio.muted;
    },
    // 音量条toolTip
    formatVolumeToolTip(index) {
      return "音量条: " + index;
    },
    // 进度条toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
    },
    // 播放跳转
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
          (index / 100) * this.audio.maxTime
      );
    },
    //显示播放或者暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pausePlay() : this.startPlay();
    },
    // 开始播放
    startPlay() {
      // console.log("播放");
      this.$refs.audio.play();
    },
    // 暂停播放
    pausePlay() {
      // console.log("暂停");
      this.$refs.audio.pause();
    },

    // 音频暂停时触发
    onPause() {
      this.audio.playing = false;
    },
    // 音频错误时触发
    onError() {
      this.audio.waiting = true;
    },
    // 音频准备时触发
    onWaiting(res) {
      console.log("等待", res);
    },
    // 音频播放时触发
    onPlay(res) {
      // console.log("播放", res);
      this.audio.playing = true;
      this.audio.loading = false;
      if (!this.controlList.onlyOnePlaying) {
        return;
      }
      let target = res.target;
      let audios = document.getElementsByTagName("audio"); //获取所有视频标签
      [...audios].forEach((item) => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 播放数量限制（同时只能播放一个）
    setControlList() {
      // 注意父组件传的值是否满足要求
      let controlList = this.theControlList.split(" ");
      controlList.forEach((item) => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },

    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
          (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },

    // 当加载语音流元数据完成后，会触发该事件的回调函数
    onLoadedmetadata(res) {
      // console.log("加载", res);
      this.audio.waiting = false; // 取消等待状态
      this.audio.maxTime = parseInt(res.target.duration);
    },
  },
  // 过滤属性
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    transMutedOrNot(value) {
      return value ? "放音" : "静音";
    },
    transSpeed(value) {
      return "快进: x" + value;
    },
  },
  created() {
    this.setControlList();
  },
};
</script>

<style scoped>
.slider {
  display: inline-block;
  width: 100px;
  position: relative;
  top: 14px;
  margin-left: 15px;
}
.di {
  display: inline-block;
}
.download {
  color: #409eff;
  margin-left: 15px;
}
.dn {
  display: none;
}
</style>
