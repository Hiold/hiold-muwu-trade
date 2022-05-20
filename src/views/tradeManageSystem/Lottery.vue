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
        <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </div>
      <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="queryData">
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column label="红包名称">
          <template #default="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>

        <el-table-column label="每日限制">
          <template #default="scope">
            {{ scope.row.limit == "-1" ? "无限" : scope.row.limit }}
          </template>
        </el-table-column>

        <el-table-column label="抽奖消耗">
          <template #default="scope">
            <span v-if="scope.row.type=='1'">积分</span>
            <span v-if="scope.row.type=='2'">点券</span>
            <img v-if="scope.row.type=='3'" :src="'/api/getimagetint/' + scope.row.itemname" style="width: 30px;height: 30px" :alt="scope.row.itemchinese"
                 :title="scope.row.itemchinese">
            <img v-if="scope.row.type=='4'" :src="'/api/getimagetint/' + scope.row.itemname" style="width: 30px;height: 30px" :alt="scope.row.itemchinese"
                 :title="scope.row.itemchinese">
          </template>
        </el-table-column>

        <el-table-column label="单次抽奖消耗">
          <template #default="scope">
            {{ scope.row.one }}
          </template>
        </el-table-column>

        <el-table-column label="十连抽奖消耗">
          <template #default="scope">
            {{ scope.row.ten }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="350" align="center">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="openUpdate(scope)">编辑抽奖
            </el-button>
            <el-button type="success" icon="el-icon-edit" size="small" @click="openAwardEdit(scope)">编辑奖品
            </el-button>
            <el-button type="delete" icon="el-icon-delete" size="small" class="red"
                       @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>


    <!-- 编辑弹出框 -->
    <el-dialog title="新增" v-model="addVisible" width="40%" :append-to-body="true">
      <el-form :rules="rules" ref="formData" :model="formData">
        <!--物品种类-->

        <el-form-item label="奖池名称" class="center">
          <el-input class="handle-space" placeholder="请输入任务描述" v-model="formData.desc"></el-input>
        </el-form-item>

        <el-form-item label="抽奖消耗" class="center">
          <el-select v-model="formData.type" placeholder="请选择抽奖消耗" class="handle-space">
            <el-option key="1" label="积分" value="1"></el-option>
            <el-option key="2" label="点券" value="2"></el-option>
            <el-option key="3" label="游戏内物品" value="3"></el-option>
            <el-option key="4" label="特殊物品" value="4"></el-option>
          </el-select>
        </el-form-item>


        <!--特殊物品-->
        <template v-if="formData.type=='4'">
          <el-form-item label="物品名称" class="center">
            <el-autocomplete style="width: 70%;" v-model="formData.itemname"
                             :fetch-suggestions="loadCouCurr"
                             placeholder="请选择系统预置特殊物品，或者输入自定义物品"
                             @select="handleSelectLottery"
                             @input="(msg)=>{formData.itemchinese=msg;formData.itemname=msg;}"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item class="center">
            <ul class="infinite-list" style="overflow-x: scroll">
              <el-upload action="api/uploadFile" multiple :on-success="handleAvatarSuccess"
                         :on-error="handleAvatarFaild"
                         style="float: left;width: 100px;height: 100px;">
                <el-tag style="margin-top: 35px;">添加新图片</el-tag>
              </el-upload>
              <li v-for="i in allIcon" :key="i" class="infinite-list-item" :ref="imglist">
                <el-image :class="{'selected':(i===formData.itemicon)}"
                          style="width: 100px;height:100px;cursor: pointer"
                          :src="'api/getimagetint/'+i"
                          @click="handleSelectImageLottery(i)">
                </el-image>
              </li>
            </ul>
          </el-form-item>

        </template>
        <!--游戏内物品-->
        <template v-if="formData.type=='3'">
          <el-form-item label="物品名称" class="center">
            <el-autocomplete style="width: 70%;" :minlength="2" v-model="formData.itemchinese"
                             :fetch-suggestions="querySearchAsync"
                             placeholder="请输入内容"
                             @select="handleSelectLottery"></el-autocomplete>
          </el-form-item>
          <el-form-item label="系统名称" class="center">
            <el-input style="width: 70%;" :minlength="2" v-model="formData.itemname"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="center">
            <img class="imgDesc" style="display: none;">
          </el-form-item>

          <el-form-item label="品质" class="center">
            <el-slider v-model="formData.quality" :show-tooltip="true"
                       :step="1" :max="6" show-stops show-input
                       :marks="marks"></el-slider>
          </el-form-item>
          <br/>
        </template>


        <el-form-item label="每日限制" class="center">
          <el-input class="handle-space" placeholder="请输入限制数量-1为无限" v-model="formData.limit"
                    @input=""></el-input>
        </el-form-item>

        <el-form-item label="单抽消耗" class="center">
          <el-input class="handle-space" placeholder="请输入单抽消耗" v-model="formData.one"
                    @input=""></el-input>
        </el-form-item>

        <el-form-item label="十连消耗" class="center">
          <el-input class="handle-space" placeholder="请输入十连消耗" v-model="formData.ten"
                    @input=""></el-input>
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
    <AawrdComponent :fid="fid" :cid="cid"></AawrdComponent>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import {ElMessage, ElMessageBox} from 'element-plus'
import {defineAsyncComponent, getCurrentInstance} from "vue"
import $ from "jquery";
import AawrdComponent from "./AawrdComponent.vue";
export default {
  name: "ShopManage",
  components: {AawrdComponent},
  mounted() {
    this.ctx = getCurrentInstance();
    this.initTableData();
    this.initIconData();
  },
  data() {
    return {
      fid: "3",
      cid: "",
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
      formData: {
        id: "",
        type: "",
        desc: "",
        limit: "",
        one: "",
        ten: "",
        itemname: "",
        itemicon: "",
        itemtint: "",
        itemchinese: "",
        quality: "",
      },
      awardData: {
        funcid: "1",
        id: "-1",
        type: "",
        containerid: "",
        count: "",
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
    HandleDesc() {
      var tps = {
        "1": "累计击杀僵尸",
        "2": "累计击杀动物",
        "3": "给其他用户店铺点赞",
        "4": "累计在线时长",
        "5": "累计交易次数",
        "6": "累计交易金额",
        "7": "累计求购次数",
        "8": "累计求购金额",
        "9": "累计供货次数",
        "10": "累计供货金额",
        "11": "累计签到次数",
        "12": "等级",
        "13": "累计制作物品数量",
      };
      if (this.formData.ProgressionTType == "4" || this.formData.ProgressionTType == "12" || this.formData.ProgressionTType == "13") {
        this.isDisabled = true;
        this.formData.type = "1";
      } else {
        this.isDisabled = false;
      }

      var unit = "";
      if (this.formData.ProgressionTType == "1" || this.formData.ProgressionTType == "2") {
        unit = "只";
      } else if (this.formData.ProgressionTType == "3" || this.formData.ProgressionTType == "5" || this.formData.ProgressionTType == "7" || this.formData.ProgressionTType == "9" || this.formData.ProgressionTType == "11") {
        unit = "次";
      } else if (this.formData.ProgressionTType == "4") {
        unit = "小时"
      }

      if (this.formData.type !== "" && this.formData.ProgressionTType !== "" && this.formData.value !== "") {
        if (this.formData.type === "1") {
          this.formData.desc = "开服至今" + tps[this.formData.ProgressionTType * 1] + "达到" + this.formData.value + unit;
        } else if (this.formData.type === "2") {
          this.formData.desc = "今天" + tps[this.formData.ProgressionTType * 1] + "达到" + this.formData.value + unit;
        } else if (this.formData.type === "3") {
          this.formData.desc = "本周" + tps[this.formData.ProgressionTType * 1] + "达到" + this.formData.value + unit;
        }
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
        $("#imgDesc").attr("src",'/api/getimagetint/' + this.awardData.itemname);
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
        $("#imgDesc").attr("src",'/api/getimagetint/' + this.formData.itemname);
        $(".imgDesc").show();
      }
    },
    handleDelete(id) {
      ElMessageBox.confirm('确定要删除这个抽奖吗？')
          .then((value) => {
            if (value === "confirm") {
              let params = {id: id + ""};
              axios.post("api/deleteLottery", params).then(res => {
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
                let args = {containerid: this.awardData.containerid + "", funcid: "3"};
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
      let params = {itemname: ""};
      axios.post("api/getLottery", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.queryData = JsonData;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "";
          if (this.formData.id == "-1") {
            url = "api/postLottery";
          } else {
            url = "api/updateLottery";
          }

          this.formData.quality = this.formData.quality + "";

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
          return false
        }
      })
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

            let args = {containerid: this.awardData.containerid + "", funcid: "3"};
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
    openUpdate(scope) {
      //显示窗口
      this.addVisible = true;
      this.formData.id = scope.row.id + "";
      this.formData.desc = scope.row.desc;
      this.formData.type = scope.row.type + "";
      this.formData.itemname = scope.row.itemname + "";
      this.formData.itemchinese = scope.row.itemchinese + "";
      this.formData.itemicon = scope.row.itemicon + "";
      this.formData.itemtint = scope.row.itemtint + "";
      this.formData.quality = parseInt(scope.row.quality);
      this.formData.one = scope.row.one;
      this.formData.ten = scope.row.ten;
      this.formData.limit = scope.row.limit;

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
    },
    openAwardEdit(scope) {
      this.$store.state.awardEditVisible = true;
      this.cid = scope.row.id;
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
    handleAdd() {
      this.formData.id = "-1";
      this.addVisible = true;
    },
    handleAddAward() {
      if (this.awardInfo != null && this.awardInfo.length >= 12) {
        ElMessage.error("最多只能添加12个奖品");
        return;
      }
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
