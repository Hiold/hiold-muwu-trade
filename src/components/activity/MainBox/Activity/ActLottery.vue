<template>
  <div class="Act-lottery" style="display: block;">  <!-- 幸运抽奖 -->
    <div class="box">

      <li class="l1" v-if="awardList!=null&&awardList.length>=1">
        <header v-if="awardList[0].type=='1'">{{ HandleItemName(awardList[0].itemchinese) }}</header>
        <header v-if="awardList[0].type=='2'">{{ HandleItemName(awardList[0].itemchinese) }}</header>
        <header v-if="awardList[0].type=='3'">指令</header>
        <header v-if="awardList[0].type=='4'">积分</header>
        <header v-if="awardList[0].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[0].type == '1'" :content="awardList[0].itemchinese" placement="top">
              <img v-if="awardList[0].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[0].itemicon,awardList[0].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[0].type == '2'" :content="awardList[0].itemchinese" placement="top">
              <img v-if="awardList[0].type == '2'" :src="'api/image/'+awardList[0].itemicon">
            </el-tooltip>
            <span v-if="awardList[0].type == '3'">一条神秘指令</span>
            <img v-if="awardList[0].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[0].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[0].count }} 件</div>
            <div class="pro">{{ ((awardList[0].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l1">
      </li>

      <li class="l2" v-if="awardList&&awardList.length>=2">
        <header v-if="awardList[1].type=='1'">{{ HandleItemName(awardList[1].itemchinese) }}</header>
        <header v-if="awardList[1].type=='2'">{{ HandleItemName(awardList[1].itemchinese) }}</header>
        <header v-if="awardList[1].type=='3'">指令</header>
        <header v-if="awardList[1].type=='4'">积分</header>
        <header v-if="awardList[1].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[1].type == '1'" :content="awardList[1].itemchinese" placement="top">
              <img v-if="awardList[1].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[1].itemicon,awardList[1].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[1].type == '2'" :content="awardList[1].itemchinese" placement="top">
              <img v-if="awardList[1].type == '2'" :src="'api/image/'+awardList[1].itemicon">
            </el-tooltip>
            <span v-if="awardList[1].type == '3'">一条神秘指令</span>
            <img v-if="awardList[1].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[1].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[1].count }} 件</div>
            <div class="pro">{{ ((awardList[1].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l2">

      </li>

      <li class="l3" v-if="awardList&&awardList.length>=3">
        <header v-if="awardList[2].type=='1'">{{ HandleItemName(awardList[2].itemchinese) }}</header>
        <header v-if="awardList[2].type=='2'">{{ HandleItemName(awardList[2].itemchinese) }}</header>
        <header v-if="awardList[2].type=='3'">指令</header>
        <header v-if="awardList[2].type=='4'">积分</header>
        <header v-if="awardList[2].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[2].type == '1'" :content="awardList[2].itemchinese" placement="top">
              <img v-if="awardList[2].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[2].itemicon,awardList[2].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[2].type == '2'" :content="awardList[2].itemchinese" placement="top">
              <img v-if="awardList[2].type == '2'" :src="'api/image/'+awardList[2].itemicon">
            </el-tooltip>
            <span v-if="awardList[2].type == '3'">一条神秘指令</span>
            <img v-if="awardList[2].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[2].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[2].count }} 件</div>
            <div class="pro">{{ ((awardList[2].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l3">

      </li>

      <li class="l4" v-if="awardList&&awardList.length>=4">
        <header v-if="awardList[3].type=='1'">{{ HandleItemName(awardList[3].itemchinese) }}</header>
        <header v-if="awardList[3].type=='2'">{{ HandleItemName(awardList[3].itemchinese) }}</header>
        <header v-if="awardList[3].type=='3'">指令</header>
        <header v-if="awardList[3].type=='4'">积分</header>
        <header v-if="awardList[3].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[3].type == '1'" :content="awardList[3].itemchinese" placement="top">
              <img v-if="awardList[3].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[3].itemicon,awardList[3].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[3].type == '2'" :content="awardList[3].itemchinese" placement="top">
              <img v-if="awardList[3].type == '2'" :src="'api/image/'+awardList[3].itemicon">
            </el-tooltip>
            <span v-if="awardList[3].type == '3'">一条神秘指令</span>
            <img v-if="awardList[3].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[3].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[3].count }} 件</div>
            <div class="pro">{{ ((awardList[3].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l4">

      </li>

      <div class="left">
        <li class="l12" v-if="awardList&&awardList.length>=5">
          <header v-if="awardList[4].type=='1'">{{ HandleItemName(awardList[4].itemchinese) }}</header>
          <header v-if="awardList[4].type=='2'">{{ HandleItemName(awardList[4].itemchinese) }}</header>
          <header v-if="awardList[4].type=='3'">指令</header>
          <header v-if="awardList[4].type=='4'">积分</header>
          <header v-if="awardList[4].type=='5'">点券</header>
          <section>
            <div class="image">
              <el-tooltip v-if="awardList[4].type == '1'" :content="awardList[4].itemchinese" placement="top">
                <img v-if="awardList[4].type == '1'" :src="'404'"
                     @error="$LoadTintImage($event.target,awardList[4].itemicon,awardList[4].itemtint)">
              </el-tooltip>
              <el-tooltip v-if="awardList[4].type == '2'" :content="awardList[4].itemchinese" placement="top">
                <img v-if="awardList[4].type == '2'" :src="'api/image/'+awardList[4].itemicon">
              </el-tooltip>
              <span v-if="awardList[4].type == '3'">一条神秘指令</span>
              <img v-if="awardList[4].type == '5'" :src="'images/items/red-zs.png'">
              <img v-if="awardList[4].type == '4'" :src="'images/items/jf2.png'">
            </div>
            <div class="right">
              <div class="num">{{ awardList[4].count }} 件</div>
              <div class="pro">{{ ((awardList[4].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
            </div>
          </section>
        </li>
        <li v-else class="l12">

        </li>

        <li class="l11" v-if="awardList&&awardList.length>=6">
          <header v-if="awardList[5].type=='1'">{{ HandleItemName(awardList[5].itemchinese) }}</header>
          <header v-if="awardList[5].type=='2'">{{ HandleItemName(awardList[5].itemchinese) }}</header>
          <header v-if="awardList[5].type=='3'">指令</header>
          <header v-if="awardList[5].type=='4'">积分</header>
          <header v-if="awardList[5].type=='5'">点券</header>
          <section>
            <div class="image">
              <el-tooltip v-if="awardList[5].type == '1'" :content="awardList[5].itemchinese" placement="top">
                <img v-if="awardList[5].type == '1'" :src="'404'"
                     @error="$LoadTintImage($event.target,awardList[5].itemicon,awardList[5].itemtint)">
              </el-tooltip>
              <el-tooltip v-if="awardList[5].type == '2'" :content="awardList[5].itemchinese" placement="top">
                <img v-if="awardList[5].type == '2'" :src="'api/image/'+awardList[5].itemicon">
              </el-tooltip>
              <span v-if="awardList[5].type == '3'">一条神秘指令</span>
              <img v-if="awardList[5].type == '5'" :src="'images/items/red-zs.png'">
              <img v-if="awardList[5].type == '4'" :src="'images/items/jf2.png'">
            </div>
            <div class="right">
              <div class="num">{{ awardList[5].count }} 件</div>
              <div class="pro">{{ ((awardList[5].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
            </div>
          </section>
        </li>
        <li v-else class="l11">

        </li>
      </div>

      <div class="center">
        <div class="image">
          <img :src="'images/lottery.jpg'">
        </div>
        <div class="btn">
          <el-tooltip
              v-if="(lotteryList!=null&&lotteryList.length>0)"
              :content="getLottery(selectedLotteryId).itemchinese" placement="top">
            <div class="b1" @click="doanimation(1)">
              <div class="align">
                <b>立即抽奖</b>
                <div class="price">
                  <i>
                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='1'"
                         :src="'images/icon/jf2.png'"
                         :alt="积分"
                         :title="积分"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">

                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='2'"
                         :src="'images/icon/red-zs.png'"
                         :alt="点券"
                         :title="点券"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">

                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='3'"
                         :src="'404'"
                         :alt="getLottery(selectedLotteryId).itemchinese"
                         :title="getLottery(selectedLotteryId).itemchinese"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">
                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='4'"
                         :src="'api/image/'+getLottery(selectedLotteryId).itemicon">
                  </i>
                  <span v-if="lotteryList!=null&&lotteryList.length>0">{{ getLottery(selectedLotteryId).one }}</span>
                </div>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip
              v-if="(lotteryList!=null&&lotteryList.length>0)"
              :content="getLottery(selectedLotteryId).itemchinese" placement="top">
            <div class="b2" @click="doanimation(10)">
              <div class="align">
                <b>十连抽</b>
                <div class="price">
                  <i>
                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='1'"
                         :src="'images/icon/jf2.png'"
                         :alt="积分"
                         :title="积分"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">

                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='2'"
                         :src="'images/icon/red-zs.png'"
                         :alt="点券"
                         :title="点券"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">

                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='3'"
                         :src="'404'"
                         :alt="getLottery(selectedLotteryId).itemchinese"
                         :title="getLottery(selectedLotteryId).itemchinese"
                         @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">
                    <img v-if="lotteryList!=null&&lotteryList.length>0&&getLottery(selectedLotteryId).type=='4'"
                         :src="'api/image/'+getLottery(selectedLotteryId).itemicon">
                  </i>
                  <span v-if="lotteryList!=null&&lotteryList.length>0">{{ getLottery(selectedLotteryId).ten }}</span>
                </div>
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>


      <div class="right">
        <li class="l5" v-if="awardList&&awardList.length>=7">
          <header v-if="awardList[6].type=='1'">{{ HandleItemName(awardList[6].itemchinese) }}</header>
          <header v-if="awardList[6].type=='2'">{{ HandleItemName(awardList[6].itemchinese) }}</header>
          <header v-if="awardList[6].type=='3'">指令</header>
          <header v-if="awardList[6].type=='4'">积分</header>
          <header v-if="awardList[6].type=='5'">点券</header>
          <section>
            <div class="image">
              <el-tooltip v-if="awardList[6].type == '1'" :content="awardList[6].itemchinese" placement="top">
                <img v-if="awardList[6].type == '1'" :src="'404'"
                     @error="$LoadTintImage($event.target,awardList[6].itemicon,awardList[6].itemtint)">
              </el-tooltip>
              <el-tooltip v-if="awardList[6].type == '2'" :content="awardList[6].itemchinese" placement="top">
                <img v-if="awardList[6].type == '2'" :src="'api/image/'+awardList[6].itemicon">
              </el-tooltip>
              <span v-if="awardList[6].type == '3'">一条神秘指令</span>
              <img v-if="awardList[6].type == '5'" :src="'images/items/red-zs.png'">
              <img v-if="awardList[6].type == '4'" :src="'images/items/jf2.png'">
            </div>
            <div class="right">
              <div class="num">{{ awardList[6].count }} 件</div>
              <div class="pro">{{ ((awardList[6].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
            </div>
          </section>
        </li>
        <li v-else class="l5">

        </li>

        <li class="l6" v-if="awardList&&awardList.length>=8">
          <header v-if="awardList[7].type=='1'">{{ HandleItemName(awardList[7].itemchinese) }}</header>
          <header v-if="awardList[7].type=='2'">{{ HandleItemName(awardList[7].itemchinese) }}</header>
          <header v-if="awardList[7].type=='3'">指令</header>
          <header v-if="awardList[7].type=='4'">积分</header>
          <header v-if="awardList[7].type=='5'">点券</header>
          <section>
            <div class="image">
              <el-tooltip v-if="awardList[7].type == '1'" :content="awardList[7].itemchinese" placement="top">
                <img v-if="awardList[7].type == '1'" :src="'404'"
                     @error="$LoadTintImage($event.target,awardList[7].itemicon,awardList[7].itemtint)">
              </el-tooltip>
              <el-tooltip v-if="awardList[7].type == '2'" :content="awardList[7].itemchinese" placement="top">
                <img v-if="awardList[7].type == '2'" :src="'api/image/'+awardList[7].itemicon">
              </el-tooltip>
              <span v-if="awardList[7].type == '3'">一条神秘指令</span>
              <img v-if="awardList[7].type == '5'" :src="'images/items/red-zs.png'">
              <img v-if="awardList[7].type == '4'" :src="'images/items/jf2.png'">
            </div>
            <div class="right">
              <div class="num">{{ awardList[7].count }} 件</div>
              <div class="pro">{{ ((awardList[7].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
            </div>
          </section>
        </li>
        <li v-else class="l6">

        </li>
      </div>

      <li class="l10" v-if="awardList&&awardList.length>=9">
        <header v-if="awardList[8].type=='1'">{{ HandleItemName(awardList[8].itemchinese) }}</header>
        <header v-if="awardList[8].type=='2'">{{ HandleItemName(awardList[8].itemchinese) }}</header>
        <header v-if="awardList[8].type=='3'">指令</header>
        <header v-if="awardList[8].type=='4'">积分</header>
        <header v-if="awardList[8].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[8].type == '1'" :content="awardList[8].itemchinese" placement="top">
              <img v-if="awardList[8].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[8].itemicon,awardList[8].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[8].type == '2'" :content="awardList[8].itemchinese" placement="top">
              <img v-if="awardList[8].type == '2'" :src="'api/image/'+awardList[8].itemicon">
            </el-tooltip>
            <span v-if="awardList[8].type == '3'">一条神秘指令</span>
            <img v-if="awardList[8].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[8].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[8].count }} 件</div>
            <div class="pro">{{ ((awardList[8].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l10">

      </li>

      <li class="l9" v-if="awardList&&awardList.length>=10">
        <header v-if="awardList[9].type=='1'">{{ HandleItemName(awardList[9].itemchinese) }}</header>
        <header v-if="awardList[9].type=='2'">{{ HandleItemName(awardList[9].itemchinese) }}</header>
        <header v-if="awardList[9].type=='3'">指令</header>
        <header v-if="awardList[9].type=='4'">积分</header>
        <header v-if="awardList[9].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[9].type == '1'" :content="awardList[9].itemchinese" placement="top">
              <img v-if="awardList[9].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[9].itemicon,awardList[9].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[9].type == '2'" :content="awardList[9].itemchinese" placement="top">
              <img v-if="awardList[9].type == '2'" :src="'api/image/'+awardList[9].itemicon">
            </el-tooltip>
            <span v-if="awardList[9].type == '3'">一条神秘指令</span>
            <img v-if="awardList[9].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[9].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[9].count }} 件</div>
            <div class="pro">{{ ((awardList[9].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l9">

      </li>

      <li class="l8" v-if="awardList&&awardList.length>=11">
        <header v-if="awardList[10].type=='1'">{{ HandleItemName(awardList[10].itemchinese) }}</header>
        <header v-if="awardList[10].type=='2'">{{ HandleItemName(awardList[10].itemchinese) }}</header>
        <header v-if="awardList[10].type=='3'">指令</header>
        <header v-if="awardList[10].type=='4'">积分</header>
        <header v-if="awardList[10].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[10].type == '1'" :content="awardList[10].itemchinese" placement="top">
              <img v-if="awardList[10].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[10].itemicon,awardList[10].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[10].type == '2'" :content="awardList[10].itemchinese" placement="top">
              <img v-if="awardList[10].type == '2'" :src="'api/image/'+awardList[10].itemicon">
            </el-tooltip>
            <span v-if="awardList[10].type == '3'">一条神秘指令</span>
            <img v-if="awardList[10].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[10].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[10].count }} 件</div>
            <div class="pro">{{ ((awardList[10].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l8">

      </li>

      <li class="l7" v-if="awardList&&awardList.length>=12">
        <header v-if="awardList[11].type=='1'">{{ HandleItemName(awardList[11].itemchinese) }}</header>
        <header v-if="awardList[11].type=='2'">{{ HandleItemName(awardList[11].itemchinese) }}</header>
        <header v-if="awardList[11].type=='3'">指令</header>
        <header v-if="awardList[11].type=='4'">积分</header>
        <header v-if="awardList[11].type=='5'">点券</header>
        <section>
          <div class="image">
            <el-tooltip v-if="awardList[11].type == '1'" :content="awardList[11].itemchinese" placement="top">
              <img v-if="awardList[11].type == '1'" :src="'404'"
                   @error="$LoadTintImage($event.target,awardList[11].itemicon,awardList[11].itemtint)">
            </el-tooltip>
            <el-tooltip v-if="awardList[11].type == '2'" :content="awardList[11].itemchinese" placement="top">
              <img v-if="awardList[11].type == '2'" :src="'api/image/'+awardList[11].itemicon">
            </el-tooltip>
            <span v-if="awardList[11].type == '3'">一条神秘指令</span>
            <img v-if="awardList[11].type == '5'" :src="'images/items/red-zs.png'">
            <img v-if="awardList[11].type == '4'" :src="'images/items/jf2.png'">
          </div>
          <div class="right">
            <div class="num">{{ awardList[11].count }} 件</div>
            <div class="pro">{{ ((awardList[11].chance / allChanceCount) * 100).toFixed(2) + "%" }}</div>
          </div>
        </section>
      </li>
      <li v-else class="l7">

      </li>
    </div>

    <div class="top">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="bottom">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="left">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <div class="right">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import {getCurrentInstance} from "vue";

export default {
  name: "ActLottery",
  data() {
    return {
      lotteryList: {},
      awardList: [],
      ctx: {},
      allChanceCount: 0,
      selectedLotteryId: {},
      isnoticed: false,
      isanimation: false,
    }
  },
  methods: {
    doanimation(times) {
      var self = this;
      if (!this.isanimation) {
        var ctx = this.ctx.appContext.config.globalProperties;
        var target = this.getLottery(this.selectedLotteryId);
        var cost = times === 1 ? target.one : target.ten;
        if (!this.isnoticed && target.type == "1") {
          ctx.Confirm(`本次抽奖将消耗${cost}积分，此提示只显示一次`);
        } else if (!this.isnoticed && target.type == "2") {
          ctx.Confirm(`本次抽奖将消耗${cost}点券，此提示只显示一次`);
        } else if (target.type == "3" || target.type == "4") {
          if (!this.isnoticed) {
            ctx.Confirm(`本次抽奖将消耗${cost}个${target.itemchinese}，此提示只显示一次`);
          }
        }

        if (this.isnoticed) {
          self.isanimation = true;
          //给边框追加一个动画
          $(".Act-lottery>.top").find("li").eq(0).addClass("topbor");
          $(".Act-lottery>.bottom").find("li").eq(0).addClass("bottombor");
          $(".Act-lottery>.left").find("li").eq(0).addClass("leftbor");
          $(".Act-lottery>.right").find("li").eq(0).addClass("rightbor");
          //changeBorColor();
          var kscj = setInterval(function () {	//边框动画特效颜色改变
            self.changeBorColor();
          }, 100);
          setTimeout(function () {	//边框动画特效结束后 显示抽中的奖品并发送到仓库
            self.isanimation = true;
            clearInterval(kscj);
            $(".Act-lottery>.top").find("li").eq(0).removeClass("topbor");
            $(".Act-lottery>.bottom").find("li").eq(0).removeClass("bottombor");
            $(".Act-lottery>.left").find("li").eq(0).removeClass("leftbor");
            $(".Act-lottery>.right").find("li").eq(0).removeClass("rightbor");
            //这一步需要根据概率进行抽奖
            self.postlotteryReq(target, times);
          }, 1300);
          $("#alert>.alert>footer>.confirm").unbind("click");
        }

        ctx.popupCss(25, 14);
        $("#alert>.alert>footer>.confirm").click(function () {
          $("#alert").hide();
          $("#alert>.alert>footer>.confirm").unbind("click");
          self.isanimation = true;
          //给边框追加一个动画
          $(".Act-lottery>.top").find("li").eq(0).addClass("topbor");
          $(".Act-lottery>.bottom").find("li").eq(0).addClass("bottombor");
          $(".Act-lottery>.left").find("li").eq(0).addClass("leftbor");
          $(".Act-lottery>.right").find("li").eq(0).addClass("rightbor");
          //changeBorColor();
          var kscj = setInterval(function () {	//边框动画特效颜色改变
            self.changeBorColor();
          }, 100);
          setTimeout(function () {	//边框动画特效结束后 显示抽中的奖品并发送到仓库
            self.isanimation = true;
            clearInterval(kscj);
            $(".Act-lottery>.top").find("li").eq(0).removeClass("topbor");
            $(".Act-lottery>.bottom").find("li").eq(0).removeClass("bottombor");
            $(".Act-lottery>.left").find("li").eq(0).removeClass("leftbor");
            $(".Act-lottery>.right").find("li").eq(0).removeClass("rightbor");
            //这一步需要根据概率进行抽奖
            self.postlotteryReq(target, times);
          }, 1300);
        });
        this.isnoticed = true;
      }
    },
    postlotteryReq(target, times) {
      console.log(target, times)
      var ctx = this.ctx.appContext.config.globalProperties;
      let params = {id: target.id + "", count: times + ""};
      axios.post("api/doLottery", params).then(res => {
        if (res.data.respCode === "1") {
          var data = res.data.data;
          var awardData = [[]];
          for (var i in data) {
            awardData[i] = [];
            if (data[i].type == 1 || data[i].type == 2) {
              awardData[i][0] = ctx.HandleItemName(data[i].itemchinese);
              awardData[i][1] = data[i].itemicon;
              awardData[i][2] = "数量:" + data[i].count;
              awardData[i][3] = "品质:" + data[i].itemquality;
              awardData[i][4] = data[i].itemtint;
            } else if (data[i].type == 3) {
              awardData[i][0] = "一条神秘指令";
              awardData[i][1] = data[i].itemicon;
              awardData[i][2] = "数量:1";
              awardData[i][3] = "品质:" + data[i].itemquality;
              awardData[i][4] = data[i].itemtint;
            } else if (data[i].type == 4) {
              awardData[i][0] = "积分";
              awardData[i][1] = 'images/items/jf2.png';
              awardData[i][2] = "数量:" + data[i].count;
              awardData[i][3] = "品质:" + data[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            } else if (data[i].type == 5) {
              awardData[i][0] = "点券";
              awardData[i][1] = 'images/items/red-zs.png';
              awardData[i][2] = "数量:" + data[i].count;
              awardData[i][3] = "品质:" + data[i].itemquality;
              awardData[i][4] = "1|1|1|1";
            }
          }

          ctx.Award(awardData, "获得如下奖励", "物品已发放到仓库", "关闭", null);
          this.isanimation = false;
          ctx.loadUserInfo();
        } else {
          ctx.Alert(res.data.respMsg);
          this.isanimation = false;
        }
      });
    },
    initLotteryList() {
      var ctx = this.ctx.appContext.config.globalProperties;
      const $bus = ctx.$bus
      let params = {itemname: ""};
      axios.post("api/getLottery", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.lotteryList = JsonData;
          var items = [];
          for (var i in this.lotteryList) {
            var st = {name: this.lotteryList[i].desc, data: this.lotteryList[i].id};
            items.push(st);
          }
          if (this.lotteryList != null && this.lotteryList.length > 0) {
            this.loadAward(this.lotteryList[0].id);
            this.selectedLotteryId = this.lotteryList[0].id;
          }
          $bus.emit('setlottert', items);
        }
      });
    },
    loadAward(id) {
      let params = {containerid: id + "", funcid: "3"};
      axios.post("api/getAwardInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.awardList = JsonData;
          var totalcount = 0;
          for (var i in this.awardList) {
            totalcount += this.awardList[i].chance * 1;
          }
          this.allChanceCount = totalcount;
          console.log(this.allChanceCount);
        }
      });
    },
    getLottery(id) {
      let res = this.lotteryList.filter((item) => {
        return item.id == id;
      });
      return res[0];
    },
    changeBorColor() {
      var t0 = $(".Act-lottery>.top").find("li").eq(0).css("background-color");
      var t1 = $(".Act-lottery>.top").find("li").eq(1).css("background-color");
      var t2 = $(".Act-lottery>.top").find("li").eq(2).css("background-color");
      var t3 = $(".Act-lottery>.top").find("li").eq(3).css("background-color");
      var t4 = $(".Act-lottery>.top").find("li").eq(4).css("background-color");
      var t5 = $(".Act-lottery>.top").find("li").eq(5).css("background-color");
      //console.log(t0+"---"+t1+"---"+t2+"---"+t3+"---"+t4);
      var b0 = $(".Act-lottery>.bottom").find("li").eq(0).css("background-color");
      var b1 = $(".Act-lottery>.bottom").find("li").eq(1).css("background-color");
      var b2 = $(".Act-lottery>.bottom").find("li").eq(2).css("background-color");
      var b3 = $(".Act-lottery>.bottom").find("li").eq(3).css("background-color");
      var b4 = $(".Act-lottery>.bottom").find("li").eq(4).css("background-color");
      var b5 = $(".Act-lottery>.bottom").find("li").eq(5).css("background-color");

      var l0 = $(".Act-lottery>.left").find("li").eq(0).css("background-color");
      var l1 = $(".Act-lottery>.left").find("li").eq(1).css("background-color");
      var l2 = $(".Act-lottery>.left").find("li").eq(2).css("background-color");
      var l3 = $(".Act-lottery>.left").find("li").eq(3).css("background-color");

      var r0 = $(".Act-lottery>.right").find("li").eq(0).css("background-color");
      var r1 = $(".Act-lottery>.right").find("li").eq(1).css("background-color");
      var r2 = $(".Act-lottery>.right").find("li").eq(2).css("background-color");
      var r3 = $(".Act-lottery>.right").find("li").eq(3).css("background-color");


      $(".Act-lottery>.top").find("li").eq(0).css("background-color", l1);
      $(".Act-lottery>.top").find("li").eq(1).css("background-color", t0);
      $(".Act-lottery>.top").find("li").eq(2).css("background-color", t1);
      $(".Act-lottery>.top").find("li").eq(3).css("background-color", t2);
      $(".Act-lottery>.top").find("li").eq(4).css("background-color", t3);
      $(".Act-lottery>.top").find("li").eq(5).css("background-color", t4);

      $(".Act-lottery>.right").find("li").eq(0).css("background-color", t4);
      $(".Act-lottery>.right").find("li").eq(1).css("background-color", r0);
      $(".Act-lottery>.right").find("li").eq(2).css("background-color", r1);
      $(".Act-lottery>.right").find("li").eq(3).css("background-color", r2);

      $(".Act-lottery>.bottom").find("li").eq(0).css("background-color", b1);
      $(".Act-lottery>.bottom").find("li").eq(1).css("background-color", b2);
      $(".Act-lottery>.bottom").find("li").eq(2).css("background-color", b3);
      $(".Act-lottery>.bottom").find("li").eq(3).css("background-color", b4);
      $(".Act-lottery>.bottom").find("li").eq(4).css("background-color", b5);
      $(".Act-lottery>.bottom").find("li").eq(5).css("background-color", r2);

      $(".Act-lottery>.left").find("li").eq(0).css("background-color", l1);
      $(".Act-lottery>.left").find("li").eq(1).css("background-color", l2);
      $(".Act-lottery>.left").find("li").eq(2).css("background-color", l3);
      $(".Act-lottery>.left").find("li").eq(3).css("background-color", b1);
    }
  },
  mounted() {
    this.ctx = getCurrentInstance();
    this.initLotteryList();
    //幸运抽奖 下的子分类
    var self = this;
    $(".Category").on("click", "li[class^=b3]", function () {
      var xb = $(this).attr("class").split("")[4];
      var name = $(this).text();	//获取子分类名称
      $(".head-tool>h1").text(name);	//在头部标题渲染名称
      // GenerateLottery(xb);	//渲染抽奖界面
      console.log($(this).attr("data"))
      self.selectedLotteryId = $(this).attr("data");
      self.loadAward(self.selectedLotteryId);
    });
  }
}
</script>

<style scoped>

</style>
