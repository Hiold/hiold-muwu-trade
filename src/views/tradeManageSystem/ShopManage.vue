<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </div>
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column label="账户余额">
          <template #default="scope">￥</template>
        </el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">

          </template>
        </el-table-column>

        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <!-- 编辑弹出框 -->
    <el-dialog title="新增" v-model="addVisible" width="40%" :append-to-body="true">
      <el-form>
        <!--物品种类-->
        <el-form-item class="center">
          <el-select v-model="itemType" placeholder="物品类型" class="handle-space" @change="handleEdtor">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center" v-show="itemType==='2'">
          <el-autocomplete style="width: 70%;" v-model="couCurrType" :fetch-suggestions="loadCouCurr"
                           placeholder="请选择系统预置特殊物品，或者输入自动以物品"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>

        <el-form-item class="center" v-show="itemType==='2'" v-if="couCurrType==='积分满减'||couCurrType==='钻石满减'">

          <el-row>
            <el-col :span="6">满</el-col>
            <el-col :span="6">
              <el-input class="handle-space" v-model="couCond"></el-input>
            </el-col>
            <el-col :span="6">减</el-col>
            <el-col :span="6">
              <el-input class="handle-space" v-model="couPrice"></el-input>
            </el-col>
          </el-row>

        </el-form-item>

        <el-form-item class="center" v-show="itemType==='2'" v-if="couCurrType==='积分折扣'||couCurrType==='钻石折扣'">

          <el-row>
            <el-col :span="12">
              <el-input class="handle-space" v-model="couPrice"></el-input>
            </el-col>
            <el-col :span="12">折</el-col>
          </el-row>

        </el-form-item>


        <el-form-item class="center" v-show="itemType==='1'">
          <el-autocomplete style="width: 70%;" :minlength="2" v-model="itemName" :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>

        <el-form-item class="center" v-if="itemType==='1'&&itemName!==''&&itemName!==null">
          <el-image v-if="itemType==='1'&&itemName!==''&&itemName!==null"
                    style="width: 100px; height: 100px"
                    :src="src"
                    fit="fit"
          ></el-image>
        </el-form-item>

        <el-form-item class="center" v-if="itemType==='1'">
          <el-tag>品质</el-tag>
          <el-slider v-if="itemType==='1'" v-model="quality" :show-tooltip="true"
                     :step="1" :max="6" show-stops show-input
                     :marks="marks"></el-slider>
        </el-form-item>
        <br/>
        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="数量" v-model="itemnum"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-select v-model="currency" placeholder="货币种类" class="handle-space">
            <el-option key="1" label="积分" value="1"></el-option>
            <el-option key="2" label="钻石" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="数量" v-model="itemnum"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="价格" v-model="price"></el-input>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-tag>折扣</el-tag>
          <el-slider v-model="discount" @change="discountchange" :show-tooltip="true"
                     :step="0.1" :max="10" show-input show-tooltip></el-slider>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-input class="handle-space" placeholder="折后价格" v-model="prefer" @change="preferchange"></el-input>
        </el-form-item>


        <el-form-item class="center" v-if="itemType!==''">
          <el-select v-model="sellType" placeholder="出售类型" class="handle-space">
            <el-option key="1" label="VIP专属" value="1"></el-option>
            <el-option key="2" label="无限制" value="2"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item class="center" v-if="itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="11" style="text-align: left;margin-right: 20px;">
              <el-radio v-model="hot" label="1" size="medium">热卖</el-radio>
              <el-radio v-model="hot" label="2" size="medium">非热卖</el-radio>
              <el-radio v-model="hot" label="3" size="medium">自动</el-radio>
            </el-col>
            <el-col :span="11">
              <div v-show="hot==='3'">
                达到
                <el-input v-model="hotset" style="width: 20%;"></el-input>
                后自动设为热卖
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="13" style="text-align: left;margin-right: 20px;">
              <el-radio v-model="level" label="1" size="medium">不限购</el-radio>
              <el-radio v-model="level" label="2" size="medium">达到等级可购买</el-radio>
              <el-radio v-model="level" label="3" size="medium">超过等级不可购买</el-radio>
            </el-col>
            <el-col :span="8">
              <div v-show="level!=='1'">
                <el-input v-model="levelset" style="width: 40%;" placeholder="请输入等级"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="13" style="text-align: left;margin-right: 20px;">
              <el-radio v-model="fallow" label="1" size="medium">不跟档</el-radio>
              <el-radio v-model="fallow" label="2" size="medium">跟档</el-radio>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="center" v-if="itemType!==''">
          <el-row>
            <el-col :span="8">
              <el-radio v-model="xgAll" label="1" size="medium">不限时</el-radio>
              <el-radio v-model="xgAll" label="2" size="medium">限时购买</el-radio>
            </el-col>
            <el-col :span="15" style="text-align: left;margin-right: 20px;">
              <div v-show="xgAll==='2'">
                <el-date-picker
                    v-model="xgDate"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开抢时间"
                    end-placeholder="结束时间"
                    @change="catchs"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item v-show="itemType!==''">
          <div class="container">
            <div class="plugins-tips">
              物品描述
            </div>
            <div class="mgb20" id='editor'></div>
          </div>
        </el-form-item>


      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'

export default {
  name: "ShopManage",
  computed: {
    discountHander: {
      get() {
        return this.discount;
      },
      set(val) {
        this.discount = val;
        this.prefer = (parseInt(this.price) * (val / 10)).toFixed(2) + "";
      }
    },
    preferHander: {
      get() {
        return this.prefer;
      },
      set(val) {
        this.prefer = val;
        if (parseInt(this.prefer) > parseInt(this.price)) {
          this.price = this.prefer;
          this.discount = 10;
        }
        this.discount = (parseInt(this.prefer) / parseInt(this.price).toFixed(1)) / 10;
      }
    }

  }
  ,
  mounted() {
    //
  },
  data() {
    return {
      couCurrType: "积分折扣",
      couPrice: "8",
      couCond: "100",
      couDate: "2021-12-31",
      xgAll: "1",
      xgDate: [moment().format("YYYY-MM-DD HH:mm:ss"), moment().add("7", "days").format("YYYY-MM-DD HH:mm:ss")],
      fallow: "1",
      level: "1",
      levelset: "",
      hotset: "",
      hot: "1",
      sellType: "",
      instance: false,
      editor: "",
      html: "",
      text: "",
      src: '',
      prefer: "100",
      discount: 10,
      itemType: "",
      currency: "",
      price: "100",
      itemName: "",
      itemnum: "",
      addVisible: false,
      itemNameCache: [],
      quality: 0,
      marks: {
        0: {
          style: {
            color: '#1989FA',
          },
          label: '无品质',
        },
        1: {
          style: {
            color: 'rgb(157, 138, 106)',
          },
          label: '1品质',
        }, 2: {
          style: {
            color: 'rgb(208, 129, 43)',
          },
          label: '2品质',
        }, 3: {
          style: {
            color: 'rgb(163, 165, 28)',
          },
          label: '3品质',
        }, 4: {
          style: {
            color: 'rgb(69, 195, 54)',
          },
          label: '4品质',
        }, 5: {
          style: {
            color: 'rgb(51, 96, 207)',
          },
          label: '5品质',
        }, 6: {
          style: {
            color: 'rgb(165, 44, 205)',
          },
          label: '6',
        }
      },
    }
  },
  methods: {
    discountchange() {
      this.prefer = (parseInt(this.price) * (this.discount / 10)).toFixed(2) + "";
    },
    preferchange() {
      if (parseInt(this.prefer) > parseInt(this.price)) {
        this.price = this.prefer;
        this.discount = 10;
      }
      this.discount = (((parseInt(this.prefer) / parseInt(this.price))) * 10).toFixed(2);
    },
    catchs(v) {
      console.log(v)
    },
    handleEdtor() {
      if (!this.instance) {
        console.log("已创建");
        this.editor = new wangEditor("#editor")
        this.editor.create()
        this.instance = true;
      }
    },
    handleAdd() {
      this.addVisible = true;
    },
    loadCouCurr(queryString, cb) {
      cb([
        {value: '积分折扣'},
        {value: '积分满减'},
        {value: '钻石折扣'},
        {value: '钻石满减'},
      ]);
    },
    querySearchAsync(queryString, cb) {
      if (queryString && queryString.length >= 1) {
        let params = {itemname: queryString};
        axios.get("proxy/api/getSystemItem", {params}).then(res => {
          if (res.data.respCode === "1") {
            let JsonData = JSON.parse(res.data.data);
            //处理返回结果
            //声明一个数组存储待选项
            let sugestion = [];
            for (var i = 0; i < JsonData.length; i++) {
              console.log()
              sugestion[i] = {value: JsonData[i].translate[16]};
              this.itemNameCache[JsonData[i].translate[16]] = JsonData[i].itemname;
            }
            cb(sugestion);
          }
        });
      }
    },
    //执行查询
    handleSelect(item) {
      // console.log(item)
      this.itemName = item.value;
      // console.log(itemNameCache[itemName.value], itemName, item);
      this.src = 'proxy/api/image/' + this.itemNameCache[this.itemName] + '.png';
    }

  }
}
</script>

<style scoped>
.demonstration {
  font-size: 14px;
  /*color: var(--el-text-color-secondary);*/
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.center {
  text-align: center;
}

.handle-space {
  width: 70%;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
