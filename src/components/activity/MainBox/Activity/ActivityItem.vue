<template>
  <!--$emit为调用父类中showDetail方法 用户展示详细信息-->
  <li class="items" :data-index="index" @click="showdetailsss($event.target,item.id)">
    <!--渲染名字时使用过滤器去掉bbcode-->
    <header>
      <span
          class="name">{{
          deleteBBcode((item.translate === null || item.translate === "") ? item.couCurrType : item.translate)
        }}</span>
      <!--同时满足折扣1~10之间并不是跟档道具才展示折扣-->
      <span class="num" v-show="item.num>0">x{{ item.num }}</span><i
        v-show="item.discount<10&&item.discount>0&&item.follow==='1'"
        v-text="calcDiscount(item.discount)"></i>
      <div class="follow" v-show="item.follow==='2'">跟档</div>
    </header>
    <section>
      <img :src="'404'" @error="$LoadTintImage($event.target,item.itemicon,item.itemtint)">
      <div class="quality" v-show="item.quality*1>0" :style="{'background':calcColor(item.quality)}">
        <span>{{ item.quality }}</span>
      </div>
      <div style="z-index: 99999" class="collect collected" v-if="item.collected=='1'"></div>
      <div style="z-index: 99999" class="collect notcollected" v-if="item.collected=='0'"></div>
      <div class="hot" v-show="calcHot(item)"></div>
      <div class="ex" v-show="item.itemType=='2'">网页专属</div>
      <!--      <div class="ex" v-if="item.class1==='网页专属'">网页专属</div>-->
      <div class="soldout" v-show="item.stock*1===0"></div>
      <div class="vip" v-show="vip===true"></div>
    </section>
    <footer>
      <i style="background-image:url(images/icon/jf2.png)" v-if="item.currency==='1'"></i>
      <i style="background-image:url(images/icon/red-zs.png)" v-if="item.currency==='2'"></i>

      <span class="price" style="color:rgb(221, 36, 36)" v-if="item.currency=='1'">
            {{ item.price * item.discount / 10 }}
      </span>
      <span class="price" style="color:deeppink" v-if="item.currency=='2'">
            {{ item.price * item.discount / 10 }}
      </span>


      <del v-show="item.discount*1 < 10 && item.discount*1 > 0">{{ item.price }}</del>
      <span class="active" v-show="item.xgall=='2' || item.xgday=='2' || item.xgdatelimit!='1'">限购</span>
    </footer>
  </li>
</template>

<script>
import axios from "axios";
import {getCurrentInstance} from "vue";

export default {
  name: "ShopItem",
  props: ["item", "index", "vip"],
  data() {
    return {
      ctx: null
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    console.log(this.item);
  },
  methods: {
    deleteBBcode(itemName) {	//隐藏颜色代码, 如[FF0000]这样的内容将会自动隐藏
      return itemName.replace(/([\\[][0-9a-fA-F]{6}[\]])/g, "");
      //return itemName;
    },
    showdetailsss(target, id) {
      if (target.className.indexOf("ollect") > 0) {
        return;
      }
      var ctx = this.ctx.appContext.config.globalProperties;
      var buyParam = {"id": "" + id + ""};
      axios.post("api/getItemBuyLimit", buyParam).then(res => {
        if (res.data.respCode === "1") {
          this.$emit('showdetail', this.item, target, res.data.data)
        } else {
          ctx.Alert(res.data.respMsg);
        }
      });
    },
    calcDiscount(discount) {
      if (discount < 10 && discount > 0) {
        var zk = Math.floor(discount * 10) / 10;		//只保留小数点后一位
        return zk + "折";	//显示折扣
      } else {
        return "";
      }
    },
    calcColor(quality) {
      var color = "";
      // console.log(quality)
      if (quality * 1 >= 1) {
        if (quality * 1 === 1) {
          color = "rgb(157, 138, 106)"
        }
        if (quality * 1 === 2) {
          color = "rgb(208, 129, 43)"
        }
        if (quality * 1 === 3) {
          color = "rgb(163, 165, 28)"
        }
        if (quality * 1 === 4) {
          color = "rgb(69, 195, 54)"
        }
        if (quality * 1 === 5) {
          color = "rgb(51, 96, 207)"
        }
        if (quality * 1 === 6) {
          color = "rgb(165, 44, 205)"
        }
      }
      return color;
    },
    calcHot(item) {
      if (item.hot === "1") {	//如果设置的热销为true
        return true;
      } else if (item.hot === "3") {	//如果设置的热销是自动
        if (item.sell >= item.hotSet) {	//如果实际销量大于设置的销量上限
          return true
        }
      }
      return false;
    }
  }
}
</script>

<style scoped>
</style>
