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
        <el-button type="success" icon="el-icon-plus" @click="handleAddAward">添加</el-button>
      </div>
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="awardInfo">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>

        <el-table-column label="物品类型">
          <template #default="scope">
            {{
              scope.row.type == "1" ? "游戏内物品" : scope.row.type == "2" ? "特殊物品" : scope.row.type == "3" ?
                  "指令" : scope.row.type == "4" ? "积分" : scope.row.type == "5" ? "点券" : "未知"
            }}
          </template>
        </el-table-column>

        <el-table-column label="物品名称">
          <template #default="scope">
            <span
                v-if="scope.row.type == '1'">{{
                scope.row.itemchinese
              }} 品质：{{ !scope.row.itemquality || scope.row.itemquality == "" ? "无" : scope.row.itemquality }}</span>
            <span v-if="scope.row.type == '2'">{{ scope.row.itemchinese }}</span>
            <span v-if="scope.row.type == '3'">指令</span>
            <span v-if="scope.row.type == '4'">积分</span>
            <span v-if="scope.row.type == '5'">点券</span>
          </template>
        </el-table-column>

        <el-table-column label="数量">
          <template #default="scope">
            <span v-if="scope.row.type == '1'">{{ scope.row.count }}</span>
            <span v-if="scope.row.type == '2'">{{ scope.row.count }}</span>
            <span v-if="scope.row.type == '3'">无</span>
            <span v-if="scope.row.type == '4'">{{ scope.row.count }}</span>
            <span v-if="scope.row.type == '5'">{{ scope.row.count }}</span>
          </template>
        </el-table-column>

        <el-table-column label="奖励图片">
          <template #default="scope">
            <img v-if="scope.row.itemicon!=''" style="height: 30px" :src="'api/image/'+scope.row.itemicon">
            <span v-if="scope.row.itemicon==''">未选择</span>

          </template>
        </el-table-column>


        <el-table-column label="操作" width="350" align="center">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="openAddUpdate(scope)">编辑
            </el-button>
            <el-button type="delete" icon="el-icon-delete" size="small" class="red"
                       @click="handleAddDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--弹出添加奖励物品层-->
    <el-dialog title="新增奖品" v-model="awardAddVisible" width="50%" :append-to-body="true"
               :close-on-click-modal="false">
      <el-form ref="awardData" :model="awardData">
        <el-form-item label="奖品类型" class="center">
          <el-select v-model="awardData.specialtype" placeholder="请选择特殊物品类型" class="handle-space" @change="speChange">
            <el-option key="1" label="积分折扣" value="1"></el-option>
            <el-option key="2" label="积分满减" value="2"></el-option>
            <el-option key="3" label="钻石折扣" value="3"></el-option>
            <el-option key="4" label="钻石满减" value="4"></el-option>
            <el-option key="5" label="自定义特殊物品" value="5"></el-option>
          </el-select>
        </el-form-item>


        <!--特殊物品-->
        <template v-if="awardData.type=='2'">
          <el-form-item label="物品名称" class="center">
            <el-input class="handle-space" placeholder="请输入物品名称" v-model="awardData.itemname"
                      @input="(msg)=>{awardData.itemchinese=msg;awardData.itemname=msg;}"></el-input>
          </el-form-item>
          <el-form-item class="center">
            <ul class="infinite-list" style="overflow-x: scroll">
              <el-upload action="api/uploadFile" multiple :on-success="handleAvatarSuccess"
                         :on-error="handleAvatarFaild"
                         style="float: left;width: 100px;height: 100px;">
                <el-tag style="margin-top: 35px;">添加新图片</el-tag>
              </el-upload>
              <li v-for="i in allIcon" :key="i" class="infinite-list-item" :ref="imglist">
                <el-image :class="{'selected':(i===awardData.itemicon)}"
                          style="width: 100px;height:100px;cursor: pointer"
                          :src="'api/image/'+i"
                          @click="handleSelectImage(i)">
                </el-image>
              </li>
            </ul>
          </el-form-item>
        </template>
        <!--游戏内物品-->
        <template v-if="awardData.type=='1'">
          <el-form-item label="物品名称" class="center">
            <el-autocomplete style="width: 70%;" :minlength="2" v-model="awardData.itemchinese"
                             :fetch-suggestions="querySearchAsync"
                             placeholder="请输入内容"
                             @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="系统名称" class="center">
            <el-input style="width: 70%;" :minlength="2" v-model="awardData.itemname"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="center">
            <img id="imgDesc" style="display: none;">
          </el-form-item>

          <el-form-item label="品质" class="center">
            <el-slider v-model="awardData.itemquality" :show-tooltip="true"
                       :step="1" :max="6" show-stops show-input
                       :marks="marks"></el-slider>
          </el-form-item>
        </template>

        <template
            v-if="awardData.couCurrType.indexOf('积分折扣')>=0||awardData.couCurrType.indexOf('钻石折扣')>=0||awardData.couCurrType.indexOf('积分满减')>=0||awardData.couCurrType.indexOf('钻石满减')>=0">
          <el-form-item label="优惠券类型" class="center" v-show="awardData.type==='2'">
            <el-input class="handle-space" v-model="awardData.couCurrType" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="优惠类型" class="center" v-show="awardData.type==='2'"
                        v-if="awardData.couCurrType.indexOf('积分满减')>=0||awardData.couCurrType.indexOf('钻石满减')>=0">
            <el-row>
              <el-col :span="6">满</el-col>
              <el-col :span="6">
                <el-input class="handle-space" placeholder="请输入使用条件，0表示无限制" v-model="awardData.couCond"></el-input>
              </el-col>
              <el-col :span="6">减</el-col>
              <el-col :span="6">
                <el-input class="handle-space" v-model="awardData.couPrice"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="优惠类型" class="center" v-show="awardData.type==='2'"
                        v-if="awardData.couCurrType.indexOf('积分折扣')>=0||awardData.couCurrType.indexOf('钻石折扣')>=0">
            <el-row>
              <el-col :span="6">满</el-col>
              <el-col :span="6">
                <el-input class="handle-space" placeholder="请输入使用条件，0表示无限制" v-model="awardData.couCond"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input class="handle-space" v-model="awardData.couPrice"></el-input>
              </el-col>
              <el-col :span="6">折</el-col>
            </el-row>

          </el-form-item>

          <el-form-item label="使用限制日期" class="center" v-if="awardData.type==='2'">
            <el-row>
              <el-col :span="8">
                <el-select v-model="awardData.coudatelimit" placeholder="限时使用" class="handle-space">
                  <el-option key="1" label="不限时" value="1"></el-option>
                  <el-option key="2" label="限时使用" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :span="15" style="text-align: left;margin-right: 20px;">
                <div v-show="awardData.coudatelimit==='2'">
                  <el-date-picker
                      v-model="awardData.couDate"
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
        </template>

      </el-form>

      <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitAddForm('awardData')">确 定</el-button>
                    <el-button @click="awardAddVisible = false">取 消</el-button>
                  <el-button @click="resetForm('awardData')">重 置</el-button>
                </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import {ElMessage, ElMessageBox} from 'element-plus'
import {defineAsyncComponent, getCurrentInstance} from "vue"
import $ from "jquery";

export default {
  name: "ShopManage",
  mounted() {
    this.ctx = getCurrentInstance();
    this.initTableData();
    this.initIconData();
  },
  data() {
    return {
      isDisabled: false,
      awardEditVisible: false,
      awardAddVisible: false,
      customData: 0,
      md1: "md1",
      imglist: null,
      allIcon: [],
      queryData: null,
      awardInfo: null,
      allChanceCount: 0,
      rules: {
        itemType: [{required: true, trigger: 'blur', message: "请选择物品类型"}]
      },
      awardData: {
        specialtype: "",
        funcid: "0",
        id: "-1",
        type: "2",
        containerid: "0",
        count: "0",
        itemname: "",
        itemquality: "",
        itemchinese: "",
        itemicon: "",
        itemtint: "",
        command: "",
        couDate: [moment().format("YYYY-MM-DD HH:mm:ss"), moment().add("7", "days").format("YYYY-MM-DD HH:mm:ss")],
        couCurrType: "",
        couPrice: "",
        couCond: "",
        coudatelimit: "",
        couDateStart: "",
        couDateEnd: "",
        chance: "",
      },
      instance: false,
      editor: "",
      ctx: {},
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
    speChange() {
      console.log(this.awardData.specialtype)
      var itemname = "";
      if (this.awardData.specialtype == "1") {
        itemname += "积分折扣";
        itemname += Math.round(Math.random() * 8999) + 1000;
        this.awardData.itemname = itemname;
        this.awardData.itemchinese = itemname;
        this.awardData.couCurrType = itemname;
      }
      if (this.awardData.specialtype == "2") {
        itemname += "积分满减";
        itemname += Math.round(Math.random() * 8999) + 1000;
        this.awardData.itemname = itemname;
        this.awardData.itemchinese = itemname;
        this.awardData.couCurrType = itemname;
      }
      if (this.awardData.specialtype == "3") {
        itemname += "钻石折扣";
        itemname += Math.round(Math.random() * 8999) + 1000;
        this.awardData.itemname = itemname;
        this.awardData.itemchinese = itemname;
        this.awardData.couCurrType = itemname;
      }
      if (this.awardData.specialtype == "4") {
        itemname += "钻石满减";
        itemname += Math.round(Math.random() * 8999) + 1000;
        this.awardData.itemname = itemname;
        this.awardData.itemchinese = itemname;
        this.awardData.couCurrType = itemname;
      }
      if (this.awardData.specialtype == "5") {
        this.awardData.itemname = "";
        this.awardData.itemchinese = "";
        this.awardData.couCurrType = "";
      }
    },
    querySearchAsync(queryString, cb) {
      if (queryString && queryString.length >= 1) {
        let params = {itemname: queryString, skip: "0", take: "100"};
        axios.get("api/getSystemItemByPage", {params}).then(res => {
          if (res.data.respCode === "1") {
            let JsonData = JSON.parse(res.data.data);
            //处理返回结果
            //声明一个数组存储待选项
            let sugestion = [];
            for (var i = 0; i < JsonData.length; i++) {
              if (JsonData[i].translate != null && JsonData[i].translate != "") {
                sugestion[i] = {value: JsonData[i].translate[16]};
                this.itemNameCache[JsonData[i].translate[16]] = JsonData[i];
              } else {
                sugestion[i] = {value: JsonData[i].itemname};
                this.itemNameCache[JsonData[i].itemname] = JsonData[i];
              }
            }
            cb(sugestion);
          }
        });
      }
    },
    handleSelectImage(item) {
      this.awardData.itemicon = item;
    },
    handleSelectImageLottery(item) {
      this.formData.itemicon = item;
    },
    handleAvatarSuccess() {
      ElMessage({
        message: '上传成功!',
        type: 'success',
      });
      this.initIconData();
    },
    handleAvatarFaild() {
      ElMessage.error('上传失败');
      this.initIconData();
    },
    initIconData() {
      let params = {itemname: ""};
      axios.post("api/getIconFile", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.allIcon = JsonData;
        }
      });
    },
    handleSelect(item) {
      var ctx = this.ctx.appContext.config.globalProperties;
      console.log(this.itemNameCache[item.value]);
      if (this.awardData.type == "1") {
        this.awardData.couCurrType = "";
        this.awardData.itemchinese = item.value;
        this.awardData.itemname = this.itemNameCache[item.value].itemname;
        this.awardData.itemicon = (!this.itemNameCache[item.value].icon ? this.itemNameCache[item.value].itemname : this.itemNameCache[item.value].icon.Value) + ".png";
        this.awardData.itemtint = this.itemNameCache[item.value].tint === null ? "1|1|1|1" : this.itemNameCache[item.value].tint;
        // this.src = 'api/image/' + this.formData.itemIcon;
        ctx.$LoadTintImage($("#imgDesc")[0], this.awardData.itemicon, this.awardData.itemtint);
        $("#imgDesc").show();
      } else {
        this.awardData.couCurrType = item.value;
      }
    },
    handleSelectLottery(item) {
      var ctx = this.ctx.appContext.config.globalProperties;
      console.log(this.itemNameCache[item.value]);
      if (this.formData.type == "3") {
        this.formData.itemchinese = item.value;
        this.formData.itemname = this.itemNameCache[item.value].itemname;
        this.formData.itemicon = (!this.itemNameCache[item.value].icon ? this.itemNameCache[item.value].itemname : this.itemNameCache[item.value].icon.Value) + ".png";
        this.formData.itemtint = this.itemNameCache[item.value].tint === null ? "1|1|1|1" : this.itemNameCache[item.value].tint;
        // this.src = 'api/image/' + this.formData.itemIcon;
        ctx.$LoadTintImage($(".imgDesc")[0], this.formData.itemicon, this.formData.itemtint);
        $(".imgDesc").show();
      }
    },
    handleAddDelete(id) {
      ElMessageBox.confirm('确定要删除这个商品吗？')
          .then((value) => {
            if (value === "confirm") {
              let params = {id: id + ""};
              axios.post("api/deleteAwardInfo", params).then(res => {
                if (res.data.respCode === "1") {
                  ElMessage({
                    message: '删除成功!',
                    type: 'success',
                  })
                } else {
                  ElMessage.error('删除失败')
                }
                let args = {containerid: "0", funcid: "0"};
                axios.post("api/getAwardInfo", args).then(res => {
                  if (res.data.respCode === "1") {
                    let JsonData = res.data.data;
                    this.awardInfo = JsonData;
                    this.awardAddVisible = false;
                    for (var i in this.awardInfo) {
                      this.allChanceCount += this.awardInfo[i].chance * 1;
                    }
                    console.log(this.allChanceCount);
                  }
                });
              });
            }
          })
          .catch(() => {
            // catch error
          })
    },
    initTableData() {
      let params = {containerid: "0", funcid: "0"};
      axios.post("api/getAwardInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.awardInfo = JsonData;
          for (var i in this.awardInfo) {
            this.allChanceCount += this.awardInfo[i].chance * 1;
          }
          console.log(this.allChanceCount);
        }
      });
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "";
          if (this.awardData.id == "-1") {
            url = "api/postAwardInfo";
          } else {
            url = "api/updateAwardInfo";
          }

          this.awardData.itemquality = this.awardData.itemquality + "";
          //处理时间
          if (this.awardData.couDate && this.awardData.couDate.length === 2) {
            this.awardData.couDateStart = this.awardData.couDate[0];
            this.awardData.couDateEnd = this.awardData.couDate[1];
            this.awardData.couDate = "";
          }


          axios.post(url, this.awardData).then(res => {
            if (res.data.respCode === "1") {
              ElMessage({
                message: '保存成功!',
                type: 'success',
              })
            } else {
              ElMessage.error('保存出错')
            }

            let args = {containerid: "0", funcid: "0"};
            axios.post("api/getAwardInfo", args).then(res => {
              if (res.data.respCode === "1") {
                let JsonData = res.data.data;
                this.awardInfo = JsonData;
                this.awardAddVisible = false;
              }
            });
          });

        } else {
          return false
        }
      })
    },
    openAddUpdate(scope) {
      //显示窗口
      this.awardAddVisible = true;
      this.awardData.id = scope.row.id + "";
      this.awardData.type = scope.row.type + "";
      this.awardData.containerid = scope.row.containerid + "";
      this.awardData.count = scope.row.count + "";
      this.awardData.itemname = scope.row.itemname + "";
      this.awardData.itemquality = scope.row.itemquality + "";
      this.awardData.itemchinese = scope.row.itemchinese + "";
      this.awardData.itemicon = scope.row.itemicon + "";
      this.awardData.itemtint = scope.row.itemtint + "";
      this.awardData.command = scope.row.command + "";
      this.awardData.couCurrType = scope.row.couCurrType + "";
      this.awardData.couPrice = scope.row.couPrice + "";
      this.awardData.couCond = scope.row.couCond + "";
      this.awardData.coudatelimit = scope.row.coudatelimit + "";
      this.awardData.couDateStart = scope.row.couDateStart + "";
      this.awardData.couDateEnd = scope.row.couDateEnd + "";
      this.awardData.couDate = [this.awardData.couDateStart, this.awardData.couDateEnd];

      if (this.awardData.itemname.indexOf("积分折扣") >= 0) {
        this.awardData.specialtype = "1";
      } else if (this.awardData.itemname.indexOf("积分满减") >= 0) {
        this.awardData.specialtype = "2";
      } else if (this.awardData.itemname.indexOf("钻石折扣") >= 0) {
        this.awardData.specialtype = "3";
      } else if (this.awardData.itemname.indexOf("钻石满减") >= 0) {
        this.awardData.specialtype = "4";
      } else {
        this.awardData.specialtype = "5";
      }

    },
    openAwardEdit(scope) {
      this.initIconData();
      this.awardEditVisible = true;
      let params = {containerid: "0", funcid: "0"};
      this.awardData.containerid = scope.row.id + "";
      axios.post("api/getAwardInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.awardInfo = JsonData;
          for (var i in this.awardInfo) {
            this.allChanceCount += this.awardInfo[i].chance * 1;
          }
          console.log(this.allChanceCount);
        }
      });
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
    },
    handleAddAward() {
      this.awardData.id = "-1";
      this.awardAddVisible = true;
    },
    loadCouCurr(queryString, cb) {
      cb([
        {value: '积分折扣'},
        {value: '积分满减'},
        {value: '钻石折扣'},
        {value: '钻石满减'},
      ]);
    },
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

.selected {
  color: greenyellow;
  border: 0.02rem solid;
  position: relative;
  transition: all 0.5s ease;
}

.selected::after {
  content: '√';
  display: block;
  height: 0px;
  width: 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  /**对号大小*/
  font-size: 10px;
  line-height: 8px;
  border: 10px solid;
  border-color: transparent #4884ff #4884ff transparent;
}
</style>
