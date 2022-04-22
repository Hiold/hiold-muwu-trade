<template>
  <div class="maincontainer" @resize="resize()">
    <div class="bgcontainer"
         :style="'width:'+divwidth+'px;height:'+divheidht+'px;margin-left:'+(containerwidth/2-(divwidth/2))+'px'">
      <!--按钮bar-->
      <div class="btn1" @click="addpoint(1)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,1)" @mouseup="mouseUp($event.target,1)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮77-->
      <div class="btn2" @click="addpoint(2)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,2)" @mouseup="mouseUp($event.target,2)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮五角星-->
      <div class="btn3" @click="addpoint(3)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,3)" @mouseup="mouseUp($event.target,3)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮西瓜-->
      <div class="btn4" @click="addpoint(4)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,4)" @mouseup="mouseUp($event.target,4)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮铃铛-->
      <div class="btn5" @click="addpoint(5)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,5)" @mouseup="mouseUp($event.target,5)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮柠檬-->
      <div class="btn6" @click="addpoint(6)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,6)" @mouseup="mouseUp($event.target,6)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮橘子-->
      <div class="btn7" @click="addpoint(7)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,7)" @mouseup="mouseUp($event.target,7)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮苹果-->
      <div class="btn8" @click="addpoint(8)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target,8)" @mouseup="mouseUp($event.target,8)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮开始-->
      <div class="btn9" :style="'width:'+divwidth/8+'px;height:'+divheidht/8+'px;cursor:pointer'"
           @mousedown="mouseDownStart($event.target)" @mouseup="mouseUpStart($event.target)" @click="StartRolling">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--中间数字部分-->
      <div class="pointContainer" :style="'width:'+divwidth/4.25+'px;height:'+divheidht/19.8+'px;'">
        <div class="num7">
          <img v-if="$store.state.points>=1000000"
               :src="'images/sgj/'+Math.floor($store.state.points/1000000)%10+'.png'">
        </div>
        <div class="num6">
          <img v-if="$store.state.points>=100000" :src="'images/sgj/'+Math.floor($store.state.points/100000)%10+'.png'">
        </div>
        <div class="num5">
          <img v-if="$store.state.points>=10000" :src="'images/sgj/'+Math.floor($store.state.points/10000)%10+'.png'">
        </div>
        <div class="num4">
          <img v-if="$store.state.points>=1000" :src="'images/sgj/'+Math.floor($store.state.points/1000)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="$store.state.points>=100" :src="'images/sgj/'+Math.floor($store.state.points/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="$store.state.points>=10" :src="'images/sgj/'+Math.floor($store.state.points/10)%10+'.png'">
        </div>
        <div class="num1">
          <img v-if="$store.state.points>=0" :src="'images/sgj/'+$store.state.points%10+'.png'">
        </div>
        <div style="clear: both"></div>
      </div>
      <!--bar数量-->
      <div class="divcount-bar" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="barcount>=100" :src="'images/sgj/'+Math.floor(barcount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="barcount>=10" :src="'images/sgj/'+Math.floor(barcount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="barcount>=0" :src="'images/sgj/'+Math.floor(barcount)%10+'.png'">
        </div>
        <div style="clear: both"></div>
      </div>
      <!--77数量-->
      <div class="divcount-77" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="sevencount>=100" :src="'images/sgj/'+Math.floor(sevencount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="sevencount>=10" :src="'images/sgj/'+Math.floor(sevencount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="sevencount>=0" :src="'images/sgj/'+Math.floor(sevencount)%10+'.png'">
        </div>
      </div>
      <!--星星数量-->
      <div class="divcount-star" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="starcount>=100" :src="'images/sgj/'+Math.floor(starcount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="starcount>=10" :src="'images/sgj/'+Math.floor(starcount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="starcount>=0" :src="'images/sgj/'+Math.floor(starcount)%10+'.png'">
        </div>
      </div>
      <!--西瓜数量-->
      <div class="divcount-xigua" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="xiguacount>=100" :src="'images/sgj/'+Math.floor(xiguacount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="xiguacount>=10" :src="'images/sgj/'+Math.floor(xiguacount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="xiguacount>=0" :src="'images/sgj/'+Math.floor(xiguacount)%10+'.png'">
        </div>
      </div>
      <!--铃铛数量-->
      <div class="divcount-lingdang" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="lingdangcount>=100" :src="'images/sgj/'+Math.floor(lingdangcount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="lingdangcount>=10" :src="'images/sgj/'+Math.floor(lingdangcount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="lingdangcount>=0" :src="'images/sgj/'+Math.floor(lingdangcount)%10+'.png'">
        </div>
      </div>
      <!--柠檬数量-->
      <div class="divcount-lemon" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="lemoncount>=100" :src="'images/sgj/'+Math.floor(lemoncount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="lemoncount>=10" :src="'images/sgj/'+Math.floor(lemoncount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="lemoncount>=0" :src="'images/sgj/'+Math.floor(lemoncount)%10+'.png'">
        </div>
      </div>
      <!--橘子数量-->
      <div class="divcount-orange" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="orangecount>=100" :src="'images/sgj/'+Math.floor(orangecount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="orangecount>=10" :src="'images/sgj/'+Math.floor(orangecount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="orangecount>=0" :src="'images/sgj/'+Math.floor(orangecount)%10+'.png'">
        </div>
      </div>
      <!--苹果数量-->
      <div class="divcount-apple" :style="'width:'+divwidth/16.7+'px;height:'+divheidht/31+'px;'">
        <div class="num1">
          <img v-if="applecount>=100" :src="'images/sgj/'+Math.floor(applecount/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="applecount>=10" :src="'images/sgj/'+Math.floor(applecount/10)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="applecount>=0" :src="'images/sgj/'+Math.floor(applecount)%10+'.png'">
        </div>
      </div>

      <!--旋转框-->
      <div id="selectBox" class="selectBox0" :style="'width:'+divwidth/10+'px;height:'+divwidth/10+'px;'"></div>
      <audio preload="auto" id="bgm">
        <source :src="'images/sgj/bgm.wav'" type="audio/wav">
      </audio>

      <audio preload="auto" id="clickbtn">
        <source :src="'images/sgj/clickbtn.wav'" type="audio/wav">
      </audio>

      <audio loop preload="auto" id="rolling">
        <source :src="'images/sgj/rolling.wav'" type="audio/wav">
      </audio>

      <audio preload="auto" id="forresult">
        <source :src="'images/sgj/Forresult.wav'" type="audio/wav">
      </audio>

      <div class="rules">
        <h2>规则说明</h2>
        <h3>1、10000积分兑换100点数</h3>
        <h3>2、押注水果后按开始键。可同时押几种水果，也可重复压一种水果。</h3>
        <h3>3、灯停后，按照对应的赔率获得点数</h3>
      </div>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from "axios";
import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

export default {
  name: "SlotMachine",
  data() {
    return {
      ctx: {},
      divwidth: 0,
      divheidht: 0,
      barcount: 0,
      sevencount: 0,
      starcount: 0,
      xiguacount: 0,
      lingdangcount: 0,
      lemoncount: 0,
      orangecount: 0,
      applecount: 0,
      containerwidth: 0,
      timerout: 0,
      timerinter: 0,
      isrolling: false,
    }
  },
  methods: {
    addpoint(idx) {
      $("#clickbtn")[0].currentTime = 0;
      $("#clickbtn")[0].play();
      if (this.$store.state.points <= (this.barcount + this.sevencount + this.starcount + this.xiguacount + this.lingdangcount + this.lemoncount + this.orangecount + this.applecount)) {
        return;
      }
      switch (idx) {
        case 1 :
          if (this.barcount < 990)
            this.barcount += 10;
          // this.$store.state.points -= 10;
          break
        case 2 :
          if (this.sevencount < 990)
            this.sevencount += 10;
          // this.$store.state.points -= 10;
          break
        case 3 :
          if (this.starcount < 990)
            this.starcount += 10;
          // this.$store.state.points -= 10;
          break
        case 4 :
          if (this.xiguacount < 990)
            this.xiguacount += 10;
          // this.$store.state.points -= 10;
          break
        case 5 :
          if (this.lingdangcount < 990)
            this.lingdangcount += 10;
          // this.$store.state.points -= 10;
          break
        case 6 :
          if (this.lemoncount < 990)
            this.lemoncount += 10;
          // this.$store.state.points -= 10;
          break
        case 7 :
          if (this.orangecount < 990)
            this.orangecount += 10;
          // this.$store.state.points -= 10;
          break
        case 8 :
          if (this.applecount < 990)
            this.applecount += 10;
          // this.$store.state.points -= 10;
          break
      }
    },
    mouseDown(target, idx) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      $(target).css(
          "background-image", "url(images/sgj/sgj_xzan_2.png)"
      )

      $(target).find("div").css(
          "margin-top", "10%"
      )
      this.timerout = setTimeout(() => {
        this.timerinter = setInterval(() => {
          this.addpoint(idx);
        }, 100);
      }, 1000);
    },
    mouseUp(target, idx) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      $(target).css(
          "background-image", "url(images/sgj/sgj_xzan_1.png)"
      )
      $(target).find("div").css(
          "margin-top", "7%"
      )
      clearTimeout(this.timerout);
      clearInterval(this.timerinter);
    },
    mouseDownStart(target) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      $(target).css(
          "background-image", "url(images/sgj/sgj_ksan_2.png)"
      )
    },
    mouseUpStart(target) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      $(target).css(
          "background-image", "url(images/sgj/sgj_ksan_1.png)"
      )
    },
    //开始rolling
    StartRolling() {
      if (this.isrolling) {
        return;
      }
      this.isrolling = true;
      var self = this;
      var buyParam = {
        barcount: this.barcount + "",
        sevencount: this.sevencount + "",
        starcount: this.starcount + "",
        xiguacount: this.xiguacount + "",
        lingdangcount: this.lingdangcount + "",
        lemoncount: this.lemoncount + "",
        orangecount: this.orangecount + "",
        applecount: this.applecount + "",
      };
      var allCount = this.barcount + this.sevencount + this.starcount + this.xiguacount + this.lingdangcount + this.lemoncount + this.orangecount + this.applecount;
      if (allCount == 0) {
        ElMessage.error("请下注!");
        return;
      }
      if (allCount > this.$store.state.points) {
        ElMessage.error("点数不足!");
        return;
      }
      //清空点数
      // this.barcount = 0;
      // this.sevencount = 0;
      // this.starcount = 0;
      // this.xiguacount = 0;
      // this.lingdangcount = 0;
      // this.lemoncount = 0;
      // this.orangecount = 0;
      // this.applecount = 0;
      this.$store.state.points -= allCount;
      //请求数据
      axios.post("api/SGJRolling", buyParam).then(res => {
        if (res.data.respCode === "1") {
          var JsonData = JSON.parse(res.data.data);
          console.log(JsonData[0])
          console.log(JsonData[1])
          var randNumber = JsonData[0].Value * 1;
          var point = JsonData[1].Value * 1;
          console.log(randNumber);

          $("#rolling")[0].play();
          var index = 1;
          //开始旋转
          var maininterval = setInterval(() => {
            $("#selectBox").attr("class", "selectBox" + (index % 22));
            index++;
          }, 30);
          //2.5秒后停止
          setTimeout(() => {
            clearInterval(maininterval);
            //停止播放rolling
            $("#rolling")[0].pause();
            //播放结束
            $("#forresult")[0].play();
            //计算剩余步数需要旋转的次数
            var cnt = 0;
            if (index % 22 >= randNumber) {
              //计算剩余步骤
              var leftCount = 21 - (index % 22);
              cnt = leftCount + randNumber;
            } else {
              cnt = randNumber - (index % 22)
              if (cnt <= 3) {
                cnt += 22;
              }
            }

            var vset = setInterval(() => {
              $("#selectBox").attr("class", "selectBox" + (index % 22));
              if (index % 22 == randNumber) {
                clearInterval(vset);
                this.$store.state.points = point;
                this.isrolling = false;
              }
              index++;
            }, 1300 / cnt);


          }, 1000 + (Math.random() * 2000))
        }
      });
    },
    resize() {
      var containerwidth = $(".maincontainer").width();
      var containerheight = $(".maincontainer").height();
      this.containerwidth = containerwidth;

      var width = $(".maincontainer").width();
      var heigh = width / 1.14583;

      if (heigh > containerheight) {
        heigh = containerheight;
        width = heigh * 1.14583;
      }


      this.divwidth = width;
      this.divheidht = heigh;
      console.log(this.divwidth);
      console.log(this.divheidht);
    }
    ,
    loadPoint() {
      var buyParam = {};
      axios.post("api/GetSGJPoint", buyParam).then(res => {
        if (res.data.respCode === "1") {
          console.log(res.data.data)
          this.$store.state.points = res.data.data.configValue * 1;
        }
      });
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    var try1 = setInterval(() => {
      $("#bgm")[0].play().then(() => {
        clearInterval(try1);
      }).catch(() => {
        console.log("未交互不播放")
      })
    }, 100)
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    })

    //加载数据
    this.loadPoint();
  }
}
</script>

<style lang="scss" scoped>
.rules {
  width: 14%;
  height: 39%;
  position: absolute;
  border: #2d8cf0 solid 1px;
  top: 34.5%;
  left: 74.2%;
  padding-top: 2%;

  h2 {
    font-size: 1.2em;
    color: white;
  }

  h3 {
    margin: 0.5em;
    font-size: 0.5em;
    color: white;
  }
}

.selectBox0 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 34%;
  left: 11.5%;
}

.selectBox1 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 24.5%;
  left: 11.5%;
}

.selectBox2 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 15%;
  left: 11.5%;
}

.selectBox3 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 11.5%;
}

.selectBox4 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 20%;
}

.selectBox5 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 28.7%;
}

.selectBox6 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 37.2%;
}

.selectBox7 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 45.7%;
}

.selectBox8 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 54.3%;
}

.selectBox9 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 5%;
  left: 62.8%;
}

.selectBox10 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 15%;
  left: 62.8%;
}

.selectBox11 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 24.5%;
  left: 62.8%;
}

.selectBox12 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 34%;
  left: 62.8%;
}

.selectBox13 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 44%;
  left: 62.8%;
}

.selectBox14 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 62.8%;
}

.selectBox15 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 54.3%;
}

.selectBox16 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 45.7%;
}

.selectBox17 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 37.2%;
}

.selectBox18 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 28.7%;
}

.selectBox19 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 20%;
}

.selectBox20 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 54%;
  left: 11.5%;
}

.selectBox21 {
  position: absolute;
  background-image: url("../assets/images/sgj/sgj_bdg.png");
  background-size: 100% 100%;
  top: 44%;
  left: 11.5%;
}

.divcount-bar {
  position: absolute;
  top: 73%;
  left: 12.3%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-77 {
  position: absolute;
  top: 73%;
  left: 20%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-star {
  position: absolute;
  top: 73%;
  left: 27.7%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-xigua {
  position: absolute;
  top: 73%;
  left: 35.5%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-lingdang {
  position: absolute;
  top: 73%;
  left: 43.1%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-lemon {
  position: absolute;
  top: 73%;
  left: 50.8%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-orange {
  position: absolute;
  top: 73%;
  left: 58.5%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.divcount-apple {
  position: absolute;
  top: 73%;
  left: 66.3%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.pointContainer {
  position: absolute;
  top: 38.8%;
  left: 30.5%;

  .num7 {
    float: left;
    width: 11%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num6 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num5 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num4 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num3 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num2 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .num1 {
    float: left;
    width: 11%;
    height: 100%;
    margin-left: 3.8%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.maincontainer {
  width: 100%;
  height: 100%;
  text-align: center;
}

.bgcontainer {
  position: relative;
  background-image: url('../assets/images/sgj/sgj_bg.png');
  background-size: auto 100%;
}

.btn-container {
  width: 55%;
  height: 55%;
  margin-left: 23%;
  margin-top: 7%;
  background-size: 100% 100%;
}

.btn1 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 8%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_01.png');
  }
}

.btn2 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 17%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_02.png');
  }
}

.btn3 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 26%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_03.png');
  }
}

.btn4 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 35%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_04.png');
  }
}

.btn5 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 44%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_05.png');
  }
}

.btn6 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 53%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_06.png');
  }
}

.btn7 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 62%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_07.png');
  }
}

.btn8 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  top: 81%;
  left: 71%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_08.png');
  }
}

.btn9 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_ksan_1.png');
  background-size: 100% 100%;
  top: 79.5%;
  left: 80%;
}
</style>
