<template>
  <div>
    <!-- 弹出框奖励编辑框 -->
    <el-dialog title="奖品编辑" v-model="$store.state.awardEditVisible" width="80%" :append-to-body="true"
               :close-on-click-modal="false">
      <div class="handle-box">
        <el-input placeholder="名称" class="handle-input mr10"></el-input>


        <el-button type="primary" icon="el-icon-search" @click="">搜索</el-button>
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

        <el-table-column label="奖励信息">
          <template #default="scope">
            <img v-if="scope.row.type == '1'" style="height: 30px" :src="'404'"
                 @error="$LoadTintImage($event.target,scope.row.itemicon,scope.row.itemtint)">
            <img v-if="scope.row.type == '2'" style="height: 30px" :src="'api/image/'+scope.row.itemicon">
            <span v-if="scope.row.type == '3'">{{ scope.row.command }}</span>
            <img v-if="scope.row.type == '5'" style="height: 30px" :src="'images/items/red-zs.png'">
            <img v-if="scope.row.type == '4'" style="height: 30px" :src="'images/items/jf2.png'">

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

    </el-dialog>

    <!--弹出添加奖励物品层-->
    <el-dialog title="新增奖品" v-model="awardAddVisible" width="50%" :append-to-body="true"
               :close-on-click-modal="false">
      <el-form ref="awardData" :model="awardData">
        <el-form-item label="奖品类型" class="center">
          <el-select v-model="awardData.type" placeholder="请选择奖品类型" class="handle-space">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
            <el-option key="3" label="指令" value="3"></el-option>
            <el-option key="4" label="积分" value="4"></el-option>
            <el-option key="5" label="点券" value="5"></el-option>
          </el-select>
        </el-form-item>
        <!--点券-->
        <template v-if="awardData.type=='5'">
          <el-form-item label="点券数量" class="center">
            <el-input class="handle-space" placeholder="请输入点券数量" v-model="awardData.count"></el-input>
          </el-form-item>
        </template>
        <!--积分-->
        <template v-if="awardData.type=='4'">
          <el-form-item label="积分数量" class="center">
            <el-input class="handle-space" placeholder="请输入积分数量" v-model="awardData.count"></el-input>
          </el-form-item>
        </template>
        <!--指令-->
        <template v-if="awardData.type=='3'">
          <el-form-item label="指令" class="center">
            <el-input class="handle-space" placeholder="请输入指令，{name}可代表用户名，{id}可代表id"
                      v-model="awardData.command"></el-input>
          </el-form-item>
        </template>
        <!--特殊物品-->
        <template v-if="awardData.type=='2'">
          <el-form-item label="预设物品" class="center">
            <el-select placeholder="请选预设特殊物品" class="handle-space" v-model="selectspeitem" @change="selectspecialitem">
              <el-option v-for="item in speitems" :key="item.id" :label="item.itemchinese"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物品数量" class="center">
            <el-input class="handle-space" placeholder="请输入物品数量" v-model="awardData.count"></el-input>
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
          <br/>
          <el-form-item label="物品数量" class="center">
            <el-input class="handle-space" placeholder="请输入物品数量" v-model="awardData.count"></el-input>
          </el-form-item>
        </template>

        <el-form-item label="中奖权重" class="center" v-if="fid=='3'">
          <el-input class="handle-space" placeholder="请输入权重，值越大中奖概率越高" v-model="awardData.chance"></el-input>
        </el-form-item>

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
import moment from "moment";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import {computed, getCurrentInstance} from "vue";
import $ from "jquery";

export default {
  props: ["cid", "fid"],
  name: "AawrdComponent",
  data() {
    return {
      ctx: {},
      itemNameCache: [],
      speitems: {},
      selectspeitem: "",
      awardInfo: [],
      awardAddVisible: false,
      awardData: {
        funcid: this.fid,
        id: "-1",
        type: "",
        containerid: this.cid,
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
        chance: ""
      },
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
  mounted() {
    this.ctx = getCurrentInstance();
    this.initTempateSPE();
  },
  watch: {
    cid: {
      handler(newName, oldName) {
        if (newName != oldName) {
          if (newName != "") {
            this.awardData.id = "-1";
            this.initTableData();
            this.awardData.containerid = newName + "";
          }
        }
      },
      immediate: true
    },
  },
  methods: {
    initTempateSPE() {
      let params = {containerid: "0", funcid: "0"};
      axios.post("api/getAwardInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.speitems = JsonData;
        }
      });
    },
    initTableData() {
      let params = {containerid: this.cid + "", funcid: this.fid + ""};
      axios.post("api/getAwardInfo", params).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data;
          this.awardInfo = JsonData;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

            let args = {containerid: this.cid + "", funcid: this.fid};
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
    handleSelectImage(item) {
      this.awardData.itemicon = item;
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
    handleAddAward() {
      this.awardData.id = "-1";
      this.awardAddVisible = true;
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
      this.selectspeitem = this.awardData.itemname;
      this.awardData.chance = scope.row.chance + "";
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
                let args = {containerid: this.cid + "", funcid: this.fid};
                axios.post("api/getAwardInfo", args).then(res => {
                  if (res.data.respCode === "1") {
                    let JsonData = res.data.data;
                    this.awardInfo = JsonData;
                    this.awardAddVisible = false;
                  }
                });
              });
            }
          })
          .catch(() => {
            // catch error
          })
    },
    selectspecialitem(itemid) {
      console.log(itemid);
      const list = computed(() => {
        return this.speitems.filter((item) => {
          return item.id === itemid;
        });
      });
      if (list.value && list.value[0]) {
        this.awardData.itemname = list.value[0].itemname;
        this.awardData.itemquality = list.value[0].itemquality;
        this.awardData.itemchinese = list.value[0].itemchinese;
        this.awardData.itemicon = list.value[0].itemicon;
        this.awardData.itemtint = list.value[0].itemtint;
        this.awardData.command = list.value[0].command;
        this.awardData.couDate = [list.value[0].couDateStart, list.value[0].couDateEnd];
        this.awardData.couCurrType = list.value[0].couCurrType;
        this.awardData.couPrice = list.value[0].couPrice;
        this.awardData.couCond = list.value[0].couCond;
        this.awardData.coudatelimit = list.value[0].coudatelimit;
        this.awardData.couDateStart = list.value[0].couDateStart;
        this.awardData.couDateEnd = list.value[0].couDateEnd;
      }
    },
  }
}
</script>

<style scoped>

</style>
