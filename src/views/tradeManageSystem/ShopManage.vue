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
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="queryData">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="上架时间">
          <template #default="scope">
            {{ scope.row.postTime.substring(0, 19).replace("T", " ") }}
          </template>
        </el-table-column>
        <el-table-column label="物品名称">
          <template #default="scope">
            {{ scope.row.translate === null ? scope.row.couCurrType : scope.row.translate }}
          </template>
        </el-table-column>
        <el-table-column label="售价">
          <template #default="scope">
            售价：{{ scope.row.price }} 折扣：{{ scope.row.discount === 10 ? "无" : (scope.row.discount + "折") }}
            最终价格：{{ scope.row.prefer }}
          </template>
        </el-table-column>
        <el-table-column label="物品状态">
          <template #default="scope">
            <el-tag v-if="scope.row.follow==='2'">跟档</el-tag>
            <el-tag v-if="scope.row.hot==='1'">热卖</el-tag>
            <el-tag v-if="scope.row.xgAll==='2'">限时购买</el-tag>
            <el-tag v-if="scope.row.xgLevel==='2'">等级限购</el-tag>
            <el-tag v-if="scope.row.xgCount==='2'">限量购买</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="openUpdate(scope)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <!-- 编辑弹出框 -->
    <el-dialog title="新增" v-model="addVisible" width="40%" :append-to-body="true" @opened="handleEdtor">
      <el-form :rules="rules" ref="formData" :model="formData">
        <!--物品种类-->
        <el-form-item label="物品类型" class="center" prop="itemType">
          <el-select v-model="formData.itemType" placeholder="物品类型" class="handle-space"
                     @change="handleEdtor">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="物品名称" class="center" v-show="formData.itemType==='2'">
          <el-autocomplete style="width: 70%;" v-model="formData.couCurrType" :fetch-suggestions="loadCouCurr"
                           placeholder="请选择系统预置特殊物品，或者输入自动以物品"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>

        <el-form-item label="优惠类型" class="center" v-show="formData.itemType==='2'"
                      v-if="formData.couCurrType==='积分满减'||formData.couCurrType==='钻石满减'">
          <el-row>
            <el-col :span="6">满</el-col>
            <el-col :span="6">
              <el-input class="handle-space" v-model="formData.couCond"></el-input>
            </el-col>
            <el-col :span="6">减</el-col>
            <el-col :span="6">
              <el-input class="handle-space" v-model="formData.couPrice"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="优惠类型" class="center" v-show="formData.itemType==='2'"
                      v-if="formData.couCurrType==='积分折扣'||formData.couCurrType==='钻石折扣'">
          <el-row>
            <el-col :span="12">
              <el-input class="handle-space" v-model="formData.couPrice"></el-input>
            </el-col>
            <el-col :span="12">折</el-col>
          </el-row>

        </el-form-item>

        <el-form-item label="使用限制日期" class="center" v-show="formData.itemType==='2'">
          <el-date-picker
              v-model="formData.couDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="catchs">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="物品名称" class="center" v-show="formData.itemType==='1'">
          <el-autocomplete style="width: 70%;" :minlength="2" v-model="formData.itemName"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="显示名称" class="center" v-show="formData.itemType==='1'">
          <el-autocomplete style="width: 70%;" :minlength="2" v-model="formData.translate"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>

        <el-form-item class="center" v-if="formData.itemType==='2'">
          <ul class="infinite-list" style="overflow-x: scroll">
            <el-upload action="proxy/api/uploadFile" multiple :on-success="handleAvatarSuccess"
                       :on-error="handleAvatarFaild"
                       style="float: left;width: 100px;height: 100px;">
              <el-tag style="margin-top: 35px;">添加新图片</el-tag>
            </el-upload>
            <li v-for="i in allIcon" :key="i" class="infinite-list-item">
              <el-image style="width: 100px;height:100px;" :src="'proxy/api/iconImage/'+i">

              </el-image>
            </li>
          </ul>

        </el-form-item>

        <el-form-item class="center"
                      v-if="formData.itemType==='1'&&formData.itemName!==''&&formData.itemName!==null">
          <el-image v-if="formData.itemType==='1'&&formData.itemName!==''&&formData.itemName!==null"
                    style="width: 100px; height: 100px"
                    :src="src"
                    fit="fit"
          ></el-image>
        </el-form-item>

        <el-form-item label="品质" class="center" v-if="formData.itemType==='1'">
          <el-slider v-if="formData.itemType==='1'" v-model="formData.quality" :show-tooltip="true"
                     :step="1" :max="6" show-stops show-input
                     :marks="marks"></el-slider>
        </el-form-item>


        <el-form-item label="数量" class="center" v-if="formData.itemType!==''">
          <el-input class="handle-space" placeholder="数量" v-model="formData.itemnum"></el-input>
        </el-form-item>

        <el-form-item label="货币类型" class="center" v-if="formData.itemType!==''">
          <el-select v-model="formData.currency" placeholder="货币种类" class="handle-space">
            <el-option key="1" label="积分" value="1"></el-option>
            <el-option key="2" label="钻石" value="2"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="价格" class="center" v-if="formData.itemType!==''">
          <el-input class="handle-space" placeholder="价格" v-model="formData.price"></el-input>
        </el-form-item>

        <el-form-item label="折扣" class="center" v-if="formData.itemType!==''">
          <el-slider v-model="formData.discount" @change="discountchange" :show-tooltip="true"
                     :step="0.1" :max="10" show-input show-tooltip></el-slider>
        </el-form-item>

        <el-form-item label="折后价格" class="center" v-if="formData.itemType!==''">
          <el-input class="handle-space" placeholder="折后价格" v-model="formData.prefer"
                    @change="preferchange"></el-input>
        </el-form-item>


        <el-form-item label="出售类型" class="center" v-if="formData.itemType!==''">
          <el-select v-model="formData.sellType" placeholder="出售类型" class="handle-space">
            <el-option key="1" label="无限制" value="1"></el-option>
            <el-option key="2" label="VIP专属" value="2"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="热卖设置" class="center" v-if="formData.itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="8" style="text-align: left;margin-right: 20px;">

              <el-select v-model="formData.hot" placeholder="货币种类" class="handle-space">
                <el-option key="1" label="热卖" value="1"></el-option>
                <el-option key="2" label="非热卖" value="2"></el-option>
                <el-option key="3" label="自动" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="11">
              <div v-show="formData.hot==='3'">
                达到
                <el-input v-model="formData.hotset" style="width: 20%;"></el-input>
                后自动设为热卖
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="购买限制" class="center" v-if="formData.itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="8" style="text-align: left;margin-right: 20px;">
              <el-select v-model="formData.level" placeholder="货币种类" class="handle-space">
                <el-option key="1" label="不限购" value="1"></el-option>
                <el-option key="2" label="达到等级可购买" value="2"></el-option>
                <el-option key="3" label="超过等级不可购买" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <div v-show="formData.level!=='1'">
                <el-input v-model="formData.levelset" style="width: 40%;"
                          placeholder="请输入等级"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="跟档设置" class="center" v-if="formData.itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="8" style="text-align: left;margin-right: 20px;">
              <el-select v-model="formData.fallow" placeholder="货币种类" class="handle-space">
                <el-option key="1" label="不跟档" value="1"></el-option>
                <el-option key="2" label="跟档" value="2"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="限时购买" class="center" v-if="formData.itemType!==''">
          <el-row>
            <el-col :span="8">
              <el-select v-model="formData.xgAll" placeholder="货币种类" class="handle-space">
                <el-option key="1" label="不限时" value="1"></el-option>
                <el-option key="2" label="限时购买" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="15" style="text-align: left;margin-right: 20px;">
              <div v-show="formData.xgAll==='2'">
                <el-date-picker
                    v-model="formData.xgDate"
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

        <el-form-item label="出售限量" class="center" v-if="formData.itemType!==''">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="8" style="text-align: left;margin-right: 20px;">
              <el-select v-model="formData.xgCount" placeholder="限量出售" class="handle-space">
                <el-option key="1" label="不限量" value="1"></el-option>
                <el-option key="2" label="限量" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <div v-show="formData.xgCount==='2'">
                <el-input v-model="formData.stock" style="width: 50%;" placeholder="请输入数量"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-form-item>


        <el-form-item v-show="formData.itemType!==''">
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
                    <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
                    <el-button @click="addVisible = false">取 消</el-button>
                  <el-button @click="resetForm('formData')">重 置</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "ShopManage",
  computed: {
    discountHander: {
      get() {
        return this.formData.discount;
      },
      set(val) {
        this.formData.discount = val;
        this.formData.prefer = (parseInt(this.formData.price) * (val / 10)).toFixed(2) + "";
      }
    },
    preferHander: {
      get() {
        return this.formData.prefer;
      },
      set(val) {
        this.formData.prefer = val;
        if (parseInt(this.formData.prefer) > parseInt(this.formData.price)) {
          this.formData.price = this.formData.prefer;
          this.formData.discount = 10;
        }
        this.formData.discount = (parseInt(this.formData.prefer) / parseInt(this.formData.price).toFixed(1)) / 10;
      }
    }

  }
  ,
  mounted() {
    this.initTableData();
    this.initIconData();
  },
  data() {
    return {
      allIcon: [],
      queryData: null,
      rules: {
        itemType: [{required: true, trigger: 'blur', message: "请选择物品类型"}]
      },
      formData: {
        id: -1,
        xgCount: "1",
        stock: "1",
        xgDate: [moment().format("YYYY-MM-DD HH:mm:ss"), moment().add("7", "days").format("YYYY-MM-DD HH:mm:ss")],
        couDate: [moment().format("YYYY-MM-DD HH:mm:ss"), moment().add("7", "days").format("YYYY-MM-DD HH:mm:ss")],
        couCurrType: "积分折扣",
        couPrice: "8",
        couCond: "100",
        xgAll: "1",
        fallow: "1",
        level: "1",
        levelset: "0",
        hotset: "0",
        hot: "1",
        sellType: "1",
        desc: "",
        prefer: "100",
        discount: 10,
        itemType: "",
        currency: "1",
        price: "100",
        itemName: "",
        translate: "",
        itemnum: "1",
        quality: 0,
        itemGroup: "",
        itemIcon: "",
        itemTint: ""
      },
      instance: false,
      editor: "",
      src: '',
      addVisible: false,
      itemNameCache: [],
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
    handleAvatarSuccess() {
      ElMessage({
        message: '上传成功!',
        type: 'success',
      })
    },
    handleAvatarFaild() {
      ElMessage.error('上传失败')
    },
    handleDelete(id) {
      ElMessageBox.confirm('确定要删除这个商品吗？')
          .then((value) => {
            if (value === "confirm") {
              let params = {id: id};
              axios.post("proxy/api/deleteShopItem", params).then(res => {
                if (res.data.respCode === "1") {
                  ElMessage({
                    message: '删除成功!',
                    type: 'success',
                  })
                } else {
                  ElMessage.error('删除失败')
                }
                this.initTableData();
              });
            }
          })
          .catch(() => {
            // catch error
          })
    },
    initTableData() {
      let params = {itemname: ""};
      axios.post("proxy/api/queryShopItem", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          console.log(JsonData);
          this.queryData = JsonData.data;
        }
      });
    },
    initIconData() {
      let params = {itemname: ""};
      axios.post("proxy/api/getIconFile", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          console.log(JsonData);
          this.allIcon = JsonData;
        }
      });
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "";
          if (this.formData.id === -1) {
            url = "proxy/api/addShopItem";
          } else {
            url = "proxy/api/updateShopItem";
          }
          axios.post(url, this.formData).then(res => {
            if (res.data.respCode === "1") {
              ElMessage({
                message: '保存成功!',
                type: 'success',
              })
            } else {
              ElMessage.error('保存出错')
            }
            this.addVisible = false;
            this.initTableData();
          });

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openUpdate(scope) {
      console.log(scope.row)
      //显示窗口
      this.addVisible = true;
      this.formData.id = scope.row.id;
      this.formData.xgCount = scope.row.xgCount;
      this.formData.stock = scope.row.stock + "";
      this.formData.xgDate = [scope.row.dateStart.substring(0, 19).replace("T", " "), scope.row.dateEnd.substring(0, 19).replace("T", " ")];
      this.formData.couDate = [scope.row.couDateStart.substring(0, 19).replace("T", " "), scope.row.couDateEnd.substring(0, 19).replace("T", " ")];
      this.formData.couCurrType = scope.row.couCurrType;
      this.formData.couPrice = scope.row.couPrice;
      this.formData.couCond = scope.row.couCond;
      this.formData.xgAll = scope.row.xgAll;
      this.formData.fallow = scope.row.follow;
      this.formData.xgLevel = scope.row.level;
      this.formData.xgLevelset = scope.row.levelset;
      this.formData.hotset = scope.row.hotSet + "";
      this.formData.hot = scope.row.hot;
      this.formData.sellType = scope.row.sellType + "";
      this.formData.desc = scope.row.desc;
      this.formData.prefer = scope.row.prefer + "";
      this.formData.discount = scope.row.discount;
      this.formData.itemType = scope.row.itemtype;
      this.formData.currency = scope.row.currency;
      this.formData.price = scope.row.price + "";
      this.formData.itemName = scope.row.name;
      this.formData.translate = scope.row.translate;
      this.formData.itemnum = scope.row.num + "";
      this.formData.quality = scope.row.quality;
      this.formData.itemGroup = scope.row.itemGroup;
      this.formData.itemIcon = scope.row.itemIcon;
      this.formData.itemTint = scope.row.itemTint;
      this.formData.itemGroup = scope.row.class1;
      this.src = 'proxy/api/image/' + this.formData.itemIcon + '.png';

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    discountchange() {
      this.formData.prefer = (parseInt(this.formData.price) * (this.formData.discount / 10)).toFixed(2) + "";
    },
    preferchange() {
      if (parseInt(this.formData.prefer) > parseInt(this.formData.price)) {
        this.formData.price = this.formData.prefer;
        this.formData.discount = 10;
      }
      this.formData.discount = (((parseInt(this.formData.prefer) / parseInt(this.formData.price))) * 10).toFixed(2);
    },
    catchs(v) {
      console.log(v)
    },
    handleEdtor() {
      if (!this.instance) {
        console.log("已创建");
        this.editor = new wangEditor("#editor")

        // 配置 onchange 回调函数
        let self = this;
        this.editor.config.onchange = function (newHtml) {
          // console.log("change 之后最新的 html", newHtml);
          self.formData.desc = newHtml;
        };
        // 配置触发 onchange 的时间频率，默认为 200ms
        this.editor.config.onchangeTimeout = 100; // 修改为 500ms
        this.editor.create()
        this.instance = true;
      }
      this.editor.txt.html(this.formData.desc);
    },
    handleAdd() {
      this.formData.id = -1;
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
              this.itemNameCache[JsonData[i].translate[16]] = JsonData[i];
            }
            cb(sugestion);
          }
        });
      }
    },
    //执行查询
    handleSelect(item) {
      console.log(this.itemNameCache[item.value])
      this.formData.translate = item.value;
      this.formData.itemName = this.itemNameCache[item.value].itemname;
      this.formData.itemGroup = this.itemNameCache[item.value].group;
      this.formData.itemIcon = this.itemNameCache[item.value].icon === null ? this.itemNameCache[item.value].itemname : this.itemNameCache[item.value].icon;
      this.formData.itemTint = this.itemNameCache[item.value].tint === null ? "1|1|1|1" : this.itemNameCache[item.value].tint;
      // console.log(itemNameCache[itemName.value], itemName, item);
      this.src = 'proxy/api/image/' + this.formData.itemIcon + '.png';
    }

  }
}
</script>

<style>
.el-form-item {
  display: -webkit-box;
}

.infinite-list {
  height: 135px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  float: left;
}

.infinite-list .infinite-list-item {
  align-items: center;
  justify-content: center;
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  position: relative;
  display: inline-block;
}

.el-upload--text {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.infinite-list .infinite-list-item + .list-item {
  margin-left: 10px;
}

.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  vertical-align: top;
}

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
