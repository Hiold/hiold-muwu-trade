<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-row :gutter="24" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todayView }}</div>
                  <div>今日访问量</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todayActive }}</div>
                  <div>今日活跃用户</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todayTrade }}</div>
                  <div>今日玩家交易量</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todayTradeAmount }}</div>
                  <div>今日玩家交易额</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{todaySell}}</div>
                  <div>今日系统售卖量</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">{{todaySellAmount}}</div>
                  <div>今日系统售卖额</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="8">
        <el-card shadow="hover">
          <schart ref="user" class="schart" canvasId="user" :options="user"></schart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <schart ref="trade" class="schart" canvasId="trade" :options="trade"></schart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <schart ref="sell" class="schart" canvasId="sell" :options="sell"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import {reactive, ref} from "vue";
import axios from "axios";

export default {
  name: "dashboard",
  components: {Schart},
  data() {
    return {
      todayView: 0,
      todayActive: 0,
      todayTrade: 0,
      todayTradeAmount: 0,
      todaySell: 0,
      todaySellAmount: 0,
      user: {
        type: "line",
        title: {
          text: "最近7天用户数据",
        }
      },
      trade: {
        type: "line",
        title: {
          text: "最近7天交易数据",
        }
      },
      sell: {
        type: "line",
        title: {
          text: "最近7天系统售卖",
        }
      }
    }
  },
  methods: {
    handleDate(dateIn) {
      return dateIn.substring(5, dateIn.length);
    }
  },
  mounted() {
    let params = {id: ""};
    axios.post("api/getDailyUser", params).then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.todayView = JsonData[6].data[0];
        this.todayActive = JsonData[6].data[1];
        this.user = {
          type: "line",
          title: {
            text: "最近7天用户数据",
          },
          labels: [this.handleDate(JsonData[0].date), this.handleDate(JsonData[1].date), this.handleDate(JsonData[2].date), this.handleDate(JsonData[3].date), this.handleDate(JsonData[4].date), this.handleDate(JsonData[5].date), this.handleDate((JsonData[6].date))],
          datasets: [
            {
              label: "访问量",
              data: [JsonData[0].data[0], JsonData[1].data[0], JsonData[2].data[0], JsonData[3].data[0], JsonData[4].data[0], JsonData[5].data[0], JsonData[6].data[0]],
            },
            {
              label: "活跃数",
              data: [JsonData[0].data[1], JsonData[1].data[1], JsonData[2].data[1], JsonData[3].data[1], JsonData[4].data[1], JsonData[5].data[1], JsonData[6].data[1]],
            }
          ],
        };
      }
    });

    axios.post("api/getDailyTrade", params).then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.todayTrade = JsonData[6].data[0];
        this.todayTradeAmount = JsonData[6].data[1];
        this.trade = {
          type: "line",
          title: {
            text: "最近7天交易数据",
          },
          labels: [this.handleDate(JsonData[0].date), this.handleDate(JsonData[1].date), this.handleDate(JsonData[2].date), this.handleDate(JsonData[3].date), this.handleDate(JsonData[4].date), this.handleDate(JsonData[5].date), this.handleDate((JsonData[6].date))],
          datasets: [
            {
              label: "交易量",
              data: [JsonData[0].data[0], JsonData[1].data[0], JsonData[2].data[0], JsonData[3].data[0], JsonData[4].data[0], JsonData[5].data[0], JsonData[6].data[0]],
            },
            {
              label: "交易额",
              data: [JsonData[0].data[1], JsonData[1].data[1], JsonData[2].data[1], JsonData[3].data[1], JsonData[4].data[1], JsonData[5].data[1], JsonData[6].data[1]],
            }
          ],
        };
      }
    });

    axios.post("api/getDailySell", params).then(res => {
      if (res.data.respCode === "1") {
        let JsonData = res.data.data;
        this.todaySell = JsonData[6].data[0];
        this.todaySellAmount = JsonData[6].data[1];
        this.sell = {
          type: "line",
          title: {
            text: "最近7天系统售卖",
          },
          labels: [this.handleDate(JsonData[0].date), this.handleDate(JsonData[1].date), this.handleDate(JsonData[2].date), this.handleDate(JsonData[3].date), this.handleDate(JsonData[4].date), this.handleDate(JsonData[5].date), this.handleDate((JsonData[6].date))],
          datasets: [
            {
              label: "交易量",
              data: [JsonData[0].data[0], JsonData[1].data[0], JsonData[2].data[0], JsonData[3].data[0], JsonData[4].data[0], JsonData[5].data[0], JsonData[6].data[0]],
            },
            {
              label: "交易额",
              data: [JsonData[0].data[1], JsonData[1].data[1], JsonData[2].data[1], JsonData[3].data[1], JsonData[4].data[1], JsonData[5].data[1], JsonData[6].data[1]],
            }
          ],
        };
      }
    });
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  /*margin-bottom: 10px;*/
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
