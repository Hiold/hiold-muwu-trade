<template>
  <div class="maincontainer" @resize="resize()">
    <div class="bgcontainer" :style="'width:'+divwidth+'px;height:'+divheidht+'px;'">
      <!--按钮bar-->
      <div class="btn1" @click="addpoint(1)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮77-->
      <div class="btn2" @click="addpoint(2)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮五角星-->
      <div class="btn3" @click="addpoint(3)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮西瓜-->
      <div class="btn4" @click="addpoint(4)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮铃铛-->
      <div class="btn5" @click="addpoint(5)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮柠檬-->
      <div class="btn6" @click="addpoint(6)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮橘子-->
      <div class="btn7" @click="addpoint(7)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮苹果-->
      <div class="btn8" @click="addpoint(8)" :style="'width:'+divwidth/11+'px;height:'+divheidht/11+'px;cursor:pointer'"
           @mousedown="mouseDown($event.target)" @mouseup="mouseUp($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--按钮开始-->
      <div class="btn9" :style="'width:'+divwidth/8+'px;height:'+divheidht/8+'px;cursor:pointer'"
           @mousedown="mouseDownStart($event.target)" @mouseup="mouseUpStart($event.target)">
        <div class="btn-container btn-ast"></div>
      </div>
      <!--中间数字部分-->
      <div class="pointContainer" :style="'width:'+divwidth/4.25+'px;height:'+divheidht/19.8+'px;'">
        <div class="num7">
          <img v-if="points>=1000000" :src="'images/sgj/'+Math.floor(points/1000000)%10+'.png'">
        </div>
        <div class="num6">
          <img v-if="points>=100000" :src="'images/sgj/'+Math.floor(points/100000)%10+'.png'">
        </div>
        <div class="num5">
          <img v-if="points>=10000" :src="'images/sgj/'+Math.floor(points/10000)%10+'.png'">
        </div>
        <div class="num4">
          <img v-if="points>=1000" :src="'images/sgj/'+Math.floor(points/1000)%10+'.png'">
        </div>
        <div class="num3">
          <img v-if="points>=100" :src="'images/sgj/'+Math.floor(points/100)%10+'.png'">
        </div>
        <div class="num2">
          <img v-if="points>=10" :src="'images/sgj/'+Math.floor(points/10)%10+'.png'">
        </div>
        <div class="num1">
          <img v-if="points>=0" :src="'images/sgj/'+points%10+'.png'">
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

    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "SlotMachine",
  data() {
    return {
      divwidth: 0,
      divheidht: 0,
      points: 9129770,
      barcount: 0,
      sevencount: 0,
      starcount: 0,
      xiguacount: 0,
      lingdangcount: 0,
      lemoncount: 0,
      orangecount: 0,
      applecount: 0
    }
  },
  methods: {
    addpoint(idx) {
      switch (idx) {
        case 1 :
          this.barcount += 10;
          this.points -= 10;
          break
        case 2 :
          this.sevencount += 10;
          this.points -= 10;
          break
        case 3 :
          this.starcount += 10;
          this.points -= 10;
          break
        case 4 :
          this.xiguacount += 10;
          this.points -= 10;
          break
        case 5 :
          this.lingdangcount += 10;
          this.points -= 10;
          break
        case 6 :
          this.lemoncount += 10;
          this.points -= 10;
          break
        case 7 :
          this.orangecount += 10;
          this.points -= 10;
          break
        case 8 :
          this.applecount += 10;
          this.points -= 10;
          break
      }
    },
    mouseDown(target) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      console.log(target);
      $(target).css(
          "background-image", "url(images/sgj/sgj_xzan_2.png)"
      )

      $(target).find("div").css(
          "margin-top", "10%"
      )
    },
    mouseUp(target) {
      if ($(target)[0].className.indexOf("btn-ast") > 0) {
        target = $(target).parent();
      }
      console.log(target);
      $(target).css(
          "background-image", "url(images/sgj/sgj_xzan_1.png)"
      )
      $(target).find("div").css(
          "margin-top", "7%"
      )
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

    resize() {
      var containerwidth = $(".maincontainer").width();
      var containerheight = $(".maincontainer").height();

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
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    })
  }
}
</script>

<style lang="scss" scoped>
.divcount-bar {
  position: absolute;
  bottom: 23.7%;
  left: 12.3%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-77 {
  position: absolute;
  bottom: 23.7%;
  left: 20%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-star {
  position: absolute;
  bottom: 23.7%;
  left: 27.7%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-xigua {
  position: absolute;
  bottom: 23.7%;
  left: 35.5%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-lingdang {
  position: absolute;
  bottom: 23.7%;
  left: 43.1%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-lemon {
  position: absolute;
  bottom: 23.7%;
  left: 50.8%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-orange {
  position: absolute;
  bottom: 23.7%;
  left: 58.5%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
    }
  }
}

.divcount-apple {
  position: absolute;
  bottom: 23.7%;
  left: 66.3%;

  .num1 {
    float: left;
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
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
  bottom: 10%;
  left: 8%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_01.png');
  }
}

.btn2 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 17%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_02.png');
  }
}

.btn3 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 26%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_03.png');
  }
}

.btn4 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 35%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_04.png');
  }
}

.btn5 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 44%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_05.png');
  }
}

.btn6 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 53%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_06.png');
  }
}

.btn7 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 62%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_07.png');
  }
}

.btn8 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_xzan_1.png');
  background-size: 100% 100%;
  bottom: 10%;
  left: 71%;

  .btn-ast {
    background-image: url('../assets/images/sgj/sgj_anta_08.png');
  }
}

.btn9 {
  position: absolute;
  background-image: url('../assets/images/sgj/sgj_ksan_1.png');
  background-size: 100% 100%;
  bottom: 8.5%;
  left: 80%;
}

</style>
