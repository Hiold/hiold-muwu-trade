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

        <el-table-column label="红包类型">
          <template #default="scope">
            {{ scope.row.type == "1" ? "普通每日红包" : scope.row.type == "2" ? "单次领取红包" : "未知错误配置" }}
          </template>
        </el-table-column>

        <el-table-column label="红包名称有效期">
          <template #default="scope">
            {{ scope.row.startdate == "" ? "即日起" : scope.row.startdate.substring(0, 10) }} 至
            {{ scope.row.enddate == "" ? "长期有效" : scope.row.enddate.substring(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column label="红包可领取时间段">
          <template #default="scope">
            {{ scope.row.timestart == "" ? "即刻起" : scope.row.timestart }} 至
            {{ scope.row.timeend == "" ? "全天有效" : scope.row.timeend }}
          </template>
        </el-table-column>


        <el-table-column label="操作" width="350" align="center">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="openUpdate(scope)">编辑红包
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


        <el-form-item label="红包类型" class="center">
          <el-select v-model="formData.type" placeholder="货币种类" class="handle-space">
            <el-option key="1" label="普通每日红包" value="1"></el-option>
            <el-option key="2" label="单次领取红包" value="2"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="红包名称" class="center">
          <el-input class="handle-space" placeholder="请输入红包名称" v-model="formData.desc"></el-input>
        </el-form-item>


        <el-form-item label="红包有效期" class="center">
          <el-date-picker
              v-model="formData.startdate"
              align="right"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="默认即日起">
          </el-date-picker>
          至
          <el-date-picker
              v-model="formData.enddate"
              align="right"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="结束日期">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="可领取时段" class="center">

          <el-time-picker
              v-model="formData.timestart"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              placeholder="任意时间点">

          </el-time-picker>
          至
          <el-time-picker
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              v-model="formData.timeend"
              placeholder="任意时间点">
          </el-time-picker>
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
import {computed, defineAsyncComponent, getCurrentInstance} from "vue"
import $ from "jquery";
import AawrdComponent from "./AawrdComponent.vue";

export default {
  name: "ShopManage",
  components: {AawrdComponent},
  mounted() {
    this.ctx = getCurrentInstance();
    this.initTableData();
  },
  data() {
    return {
      fid: "1",
      cid: "",
      awardAddVisible: false,
      customData: 0,
      md1: "md1",
      imglist: null,
      allIcon: [],
      queryData: null,
      awardInfo: null,
      rules: {
        itemType: [{required: true, trigger: 'blur', message: "请选择物品类型"}]
      },
      formData: {
        id: "",
        timestart: "",
        timeend: "",
        startdate: "",
        enddate: "",
        desc: "",
        type: "1",
      },
      instance: false,
      editor: "",
      ctx: {},
      addVisible: false,
      itemNameCache: [],
    }
  },
  methods: {
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
    handleDelete(id) {
      ElMessageBox.confirm('确定要删除这个商品吗？')
          .then((value) => {
            if (value === "confirm") {
              let params = {id: id + ""};
              axios.post("api/deleteDailyAward", params).then(res => {
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
      axios.post("api/getDailyAward", params).then(res => {
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
            url = "api/postDailyAward";
          } else {
            url = "api/updateDailyAward";
          }

          if (!this.formData.startdate) {
            this.formData.startdate = "";
          }
          if (!this.formData.enddate) {
            this.formData.enddate = "";
          }
          if (!this.formData.timestart) {
            this.formData.timestart = "";
          }
          if (!this.formData.timeend) {
            this.formData.timeend = "";
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
          return false
        }
      })
    },
    openUpdate(scope) {
      //显示窗口
      this.addVisible = true;
      this.formData.id = scope.row.id + "";
      this.formData.startdate = scope.row.startdate;
      this.formData.enddate = scope.row.enddate;
      this.formData.timestart = scope.row.timestart;
      this.formData.timeend = scope.row.timeend;
      this.formData.desc = scope.row.desc;
      this.formData.type = scope.row.type;
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
