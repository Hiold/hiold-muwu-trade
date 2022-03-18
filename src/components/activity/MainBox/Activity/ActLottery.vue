<template>
  <div class="Act-lottery" style="display: block;">  <!-- 幸运抽奖 -->
    <div class="box">

      <li class="l1" v-if="awardList!=null&&awardList.length>=1">
        <header v-if="awardList[0].type=='1'">{{ awardList[0].itemchinese }}</header>
        <header v-if="awardList[0].type=='2'">{{ awardList[0].itemchinese }}</header>
        <header v-if="awardList[0].type=='3'">指令</header>
        <header v-if="awardList[0].type=='4'">积分</header>
        <header v-if="awardList[0].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[0].type == '1'" :src="'404'" :alt="awardList[0].itemchinese"
                 :title="awardList[0].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[0].itemicon,awardList[0].itemtint)">
            <img v-if="awardList[0].type == '2'" :src="'404'" :alt="awardList[0].itemchinese"
                 :title="awardList[0].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[0].itemicon,awardList[0].itemtint)">
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
        <header v-if="awardList[1].type=='1'">{{ awardList[1].itemchinese }}</header>
        <header v-if="awardList[1].type=='2'">{{ awardList[1].itemchinese }}</header>
        <header v-if="awardList[1].type=='3'">指令</header>
        <header v-if="awardList[1].type=='4'">积分</header>
        <header v-if="awardList[1].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[1].type == '1'" :src="'404'" :alt="awardList[1].itemchinese"
                 :title="awardList[1].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[1].itemicon,awardList[1].itemtint)">
            <img v-if="awardList[1].type == '2'" :src="'404'" :alt="awardList[1].itemchinese"
                 :title="awardList[1].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[1].itemicon,awardList[1].itemtint)">
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
        <header v-if="awardList[2].type=='1'">{{ awardList[2].itemchinese }}</header>
        <header v-if="awardList[2].type=='2'">{{ awardList[2].itemchinese }}</header>
        <header v-if="awardList[2].type=='3'">指令</header>
        <header v-if="awardList[2].type=='4'">积分</header>
        <header v-if="awardList[2].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[2].type == '1'" :src="'404'" :alt="awardList[2].itemchinese"
                 :title="awardList[2].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[2].itemicon,awardList[2].itemtint)">
            <img v-if="awardList[2].type == '2'" :src="'404'" :alt="awardList[2].itemchinese"
                 :title="awardList[2].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[2].itemicon,awardList[2].itemtint)">
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
        <header v-if="awardList[3].type=='1'">{{ awardList[3].itemchinese }}</header>
        <header v-if="awardList[3].type=='2'">{{ awardList[3].itemchinese }}</header>
        <header v-if="awardList[3].type=='3'">指令</header>
        <header v-if="awardList[3].type=='4'">积分</header>
        <header v-if="awardList[3].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[3].type == '1'" :src="'404'" :alt="awardList[3].itemchinese"
                 :title="awardList[3].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[3].itemicon,awardList[3].itemtint)">
            <img v-if="awardList[3].type == '2'" :src="'404'" :alt="awardList[3].itemchinese"
                 :title="awardList[3].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[3].itemicon,awardList[3].itemtint)">
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
          <header v-if="awardList[4].type=='1'">{{ awardList[4].itemchinese }}</header>
          <header v-if="awardList[4].type=='2'">{{ awardList[4].itemchinese }}</header>
          <header v-if="awardList[4].type=='3'">指令</header>
          <header v-if="awardList[4].type=='4'">积分</header>
          <header v-if="awardList[4].type=='5'">点券</header>
          <section>
            <div class="image">
              <img v-if="awardList[4].type == '1'" :src="'404'" :alt="awardList[4].itemchinese"
                   :title="awardList[4].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[4].itemicon,awardList[4].itemtint)">
              <img v-if="awardList[4].type == '2'" :src="'404'" :alt="awardList[4].itemchinese"
                   :title="awardList[4].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[4].itemicon,awardList[4].itemtint)">
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
          <header v-if="awardList[5].type=='1'">{{ awardList[5].itemchinese }}</header>
          <header v-if="awardList[5].type=='2'">{{ awardList[5].itemchinese }}</header>
          <header v-if="awardList[5].type=='3'">指令</header>
          <header v-if="awardList[5].type=='4'">积分</header>
          <header v-if="awardList[5].type=='5'">点券</header>
          <section>
            <div class="image">
              <img v-if="awardList[5].type == '1'" :src="'404'" :alt="awardList[5].itemchinese"
                   :title="awardList[5].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[5].itemicon,awardList[5].itemtint)">
              <img v-if="awardList[5].type == '2'" :src="'404'" :alt="awardList[5].itemchinese"
                   :title="awardList[5].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[5].itemicon,awardList[5].itemtint)">
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
          <img src="images/lottery.jpg">
        </div>
        <div class="btn">
          <div class="b1">
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
                       :src="'404'"
                       :alt="getLottery(selectedLotteryId).itemchinese"
                       :title="getLottery(selectedLotteryId).itemchinese"
                       @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">
                </i>
                <span v-if="lotteryList!=null&&lotteryList.length>0">{{ getLottery(selectedLotteryId).one }}</span>
              </div>
            </div>
          </div>
          <div class="b2">
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
                       :src="'404'"
                       :alt="getLottery(selectedLotteryId).itemchinese"
                       :title="getLottery(selectedLotteryId).itemchinese"
                       @error="$LoadTintImage($event.target,getLottery(selectedLotteryId).itemicon,getLottery(selectedLotteryId).itemtint)">
                </i>
                <span v-if="lotteryList!=null&&lotteryList.length>0">{{ getLottery(selectedLotteryId).ten }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="right">
        <li class="l5" v-if="awardList&&awardList.length>=7">
          <header v-if="awardList[6].type=='1'">{{ awardList[6].itemchinese }}</header>
          <header v-if="awardList[6].type=='2'">{{ awardList[6].itemchinese }}</header>
          <header v-if="awardList[6].type=='3'">指令</header>
          <header v-if="awardList[6].type=='4'">积分</header>
          <header v-if="awardList[6].type=='5'">点券</header>
          <section>
            <div class="image">
              <img v-if="awardList[6].type == '1'" :src="'404'" :alt="awardList[6].itemchinese"
                   :title="awardList[6].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[6].itemicon,awardList[6].itemtint)">
              <img v-if="awardList[6].type == '2'" :src="'404'" :alt="awardList[6].itemchinese"
                   :title="awardList[6].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[6].itemicon,awardList[6].itemtint)">
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
          <header v-if="awardList[7].type=='1'">{{ awardList[7].itemchinese }}</header>
          <header v-if="awardList[7].type=='2'">{{ awardList[7].itemchinese }}</header>
          <header v-if="awardList[7].type=='3'">指令</header>
          <header v-if="awardList[7].type=='4'">积分</header>
          <header v-if="awardList[7].type=='5'">点券</header>
          <section>
            <div class="image">
              <img v-if="awardList[7].type == '1'" :src="'404'" :alt="awardList[7].itemchinese"
                   :title="awardList[7].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[7].itemicon,awardList[7].itemtint)">
              <img v-if="awardList[7].type == '2'" :src="'404'" :alt="awardList[7].itemchinese"
                   :title="awardList[7].itemchinese"
                   @error="$LoadTintImage($event.target,awardList[7].itemicon,awardList[7].itemtint)">
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
        <header v-if="awardList[8].type=='1'">{{ awardList[8].itemchinese }}</header>
        <header v-if="awardList[8].type=='2'">{{ awardList[8].itemchinese }}</header>
        <header v-if="awardList[8].type=='3'">指令</header>
        <header v-if="awardList[8].type=='4'">积分</header>
        <header v-if="awardList[8].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[8].type == '1'" :src="'404'" :alt="awardList[8].itemchinese"
                 :title="awardList[8].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[8].itemicon,awardList[8].itemtint)">
            <img v-if="awardList[8].type == '2'" :src="'404'" :alt="awardList[8].itemchinese"
                 :title="awardList[8].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[8].itemicon,awardList[8].itemtint)">
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
        <header v-if="awardList[9].type=='1'">{{ awardList[9].itemchinese }}</header>
        <header v-if="awardList[9].type=='2'">{{ awardList[9].itemchinese }}</header>
        <header v-if="awardList[9].type=='3'">指令</header>
        <header v-if="awardList[9].type=='4'">积分</header>
        <header v-if="awardList[9].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[9].type == '1'" :src="'404'" :alt="awardList[9].itemchinese"
                 :title="awardList[9].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[9].itemicon,awardList[9].itemtint)">
            <img v-if="awardList[9].type == '2'" :src="'404'" :alt="awardList[9].itemchinese"
                 :title="awardList[9].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[9].itemicon,awardList[9].itemtint)">
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
        <header v-if="awardList[10].type=='1'">{{ awardList[10].itemchinese }}</header>
        <header v-if="awardList[10].type=='2'">{{ awardList[10].itemchinese }}</header>
        <header v-if="awardList[10].type=='3'">指令</header>
        <header v-if="awardList[10].type=='4'">积分</header>
        <header v-if="awardList[10].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[10].type == '1'" :src="'404'" :alt="awardList[10].itemchinese"
                 :title="awardList[10].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[10].itemicon,awardList[10].itemtint)">
            <img v-if="awardList[10].type == '2'" :src="'404'" :alt="awardList[10].itemchinese"
                 :title="awardList[10].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[10].itemicon,awardList[10].itemtint)">
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
        <header v-if="awardList[11].type=='1'">{{ awardList[11].itemchinese }}</header>
        <header v-if="awardList[11].type=='2'">{{ awardList[11].itemchinese }}</header>
        <header v-if="awardList[11].type=='3'">指令</header>
        <header v-if="awardList[11].type=='4'">积分</header>
        <header v-if="awardList[11].type=='5'">点券</header>
        <section>
          <div class="image">
            <img v-if="awardList[11].type == '1'" :src="'404'" :alt="awardList[11].itemchinese"
                 :title="awardList[11].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[11].itemicon,awardList[11].itemtint)">
            <img v-if="awardList[11].type == '2'" :src="'404'" :alt="awardList[11].itemchinese"
                 :title="awardList[11].itemchinese"
                 @error="$LoadTintImage($event.target,awardList[11].itemicon,awardList[11].itemtint)">
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
      selectedLotteryId: {}
    }
  },
  methods: {
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
      console.log(res);
      return res[0];
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
