<template>
  <div>
    <!-- 弹出框奖励编辑框 -->

    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="handleAddAward">添加</el-button>
    </div>

    <el-table border class="table" ref="multipleTable" header-cell-class-name="table-header" :data="awardInfo">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column label="物品名称">
        <template #default="scope">
          {{
            scope.row.name
          }}
        </template>
      </el-table-column>
      <el-table-column label="启用限制">
        <template #default="scope">
          {{
            scope.row.available == "1" ? "启用" : "禁用"
          }}
        </template>
      </el-table-column>
      <el-table-column label="交易限制">
        <template #default="scope">
          {{
            scope.row.configValue == "1" ? "允许交易" : "禁止交易"
          }}
        </template>
      </el-table-column>

      <el-table-column label="最高单价">
        <template #default="scope">
          {{
            scope.row.extinfo1 == "" ? "无限制" : scope.row.extinfo1
          }}
        </template>
      </el-table-column>

      <el-table-column label="最低单价">
        <template #default="scope">
          {{
            scope.row.extinfo2 == "" ? "无限制" : scope.row.extinfo2
          }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="350" align="center">
        <template #default="scope">
          <el-button type="primary" icon="el-icon-edit"
                     size="small" @click="openAddUpdate(scope)">编辑转换
          </el-button>
          <el-button type="delete" icon="el-icon-delete" size="small" class="red"
                     @click="handleAddDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--弹出添加奖励物品层-->
    <el-dialog title="新增转换" v-model="awardAddVisible" width="50%" :append-to-body="true"
               :close-on-click-modal="false">
      <el-form ref="awardData" :model="awardData">
        <el-form-item label="物品类型" class="center">
          <el-select v-model="type" placeholder="请选择物品类型" class="handle-space">
            <el-option key="1" label="游戏内物品" value="1"></el-option>
            <el-option key="2" label="特殊物品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--特殊物品-->
        <template v-if="type=='2'">
          <el-form-item label="预设物品" class="center">
            <el-select placeholder="请选预设特殊物品" class="handle-space" v-model="selectspeitem" @change="selectspecialitem">
              <el-option v-for="item in speitems" :key="item.id" :label="item.itemchinese"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <!--游戏内物品-->
        <template v-if="type=='1'">
          <el-form-item label="物品名称" class="center">
            <el-autocomplete style="width: 70%;" :minlength="2" v-model="awardData.itemname"
                             :fetch-suggestions="querySearchAsync"
                             placeholder="请输入内容"
                             @select="handleSelect"></el-autocomplete>
          </el-form-item>
        </template>

        <template v-if="type!=''">
          <el-form-item label="启用限制" class="center">
            <el-select v-model="awardData.avaliable" placeholder="请选择是否启用此限制" class="handle-space">
              <el-option key="1" label="启用" value="1"></el-option>
              <el-option key="0" label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="交易限制" class="center">
            <el-select v-model="awardData.ban" placeholder="请选择是否禁止交易" class="handle-space">
              <el-option key="1" label="允许交易" value="1"></el-option>
              <el-option key="0" label="禁止交易" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最低单价" class="center">
            <el-input class="handle-space" placeholder="请输入最低单价，默认不限" v-model="awardData.minprice"></el-input>
          </el-form-item>

          <el-form-item label="最高单价" class="center">
            <el-input class="handle-space" placeholder="请输入最高单价，默认不限" v-model="awardData.maxprice"></el-input>
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
import moment from "moment";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import {computed, getCurrentInstance} from "vue";
import $ from "jquery";
import AawrdComponent from "./AawrdComponent.vue";

export default {
  name: "ItemexchangeComponent",
  components: {AawrdComponent},
  data() {
    return {
      fid: "5",
      cid: "",
      ctx: {},
      itemNameCache: [],
      instance: false,
      editor: "",
      speitems: {},
      selectspeitem: "",
      awardInfo: [],
      awardAddVisible: false,
      type: "",
      awardData: {
        id: "-1",
        itemname: "",
        avaliable: "",
        ban: "",
        maxprice: "",
        minprice: "",
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
    this.initTableData();
    this.initTempateSPE();
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
      let args = {page: "1", limit: "114514"};
      axios.post("api/QueryItemLimitConfig", args).then(res => {
        if (res.data.respCode === "1") {
          let JsonData = res.data.data.data;
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
            url = "api/postItemLimitConfig";
          } else {
            url = "api/updateItemLimitConfig";
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

            let args = {page: "1", limit: "114514"};
            axios.post("api/QueryItemLimitConfig", args).then(res => {
              if (res.data.respCode === "1") {
                let JsonData = res.data.data.data;
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
    openAwardEdit(scope) {
      this.$store.state.awardEditVisible = true;
      this.cid = scope.row.data.id;
    },
    handleSelect(item) {
      console.log(this.itemNameCache[item.value]);
      if (this.type == "1") {
        this.awardData.itemname = this.itemNameCache[item.value].itemname;
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
      console.log(scope.row);
      this.type = "1";
      this.awardAddVisible = true;
      this.awardData.id = scope.row.id + "";
      this.awardData.avaliable = scope.row.available + ""
      this.awardData.ban = scope.row.configValue + ""
      this.awardData.itemname = scope.row.name + "";
      this.awardData.maxprice = scope.row.extinfo1 + "";
      this.awardData.minprice = scope.row.extinfo2 + "";
    },
    handleAddDelete(id) {
      ElMessageBox.confirm('确定要删除这个商品吗？')
          .then((value) => {
            if (value === "confirm") {
              let params = {id: id + ""};
              axios.post("api/deleteItemLimitConfig", params).then(res => {
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
.handle-space {
  width: 70%;
}
</style>
