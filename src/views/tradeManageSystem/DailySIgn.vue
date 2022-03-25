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
                <el-table-column label="签到日期">
                    <template #default="scope">
                        {{ handleSignDate(scope) }}
                    </template>
                </el-table-column>

                <el-table-column label="补签设置">
                    <template #default="scope">
                        <span v-if="scope.row.type=='-1'">
                            禁止补签
                        </span>
                        <span v-if="scope.row.type=='1'">
                            可使用{{scope.row.count}}积分补签
                        </span>
                        <span v-if="scope.row.type=='2'">
                            可使用{{scope.row.count}}点券补签
                        </span>
                        <span v-if="scope.row.type=='3'">
                            可以使用{{scope.row.count}}个{{scope.row.itemchinese}} （品质：{{scope.row.quality}}）补签
                        </span>
                        <span v-if="scope.row.type=='4'">
                            可以使用{{scope.row.count}}个{{scope.row.itemchinese}}补签
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="350" align="center">
                    <template #default="scope">
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="openUpdate(scope)">编辑任务
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
                <el-form-item label="签到星期" class="center">
                    <el-tooltip content="如果只选择周几，不选择日期，则每个所选的周几都可以领取，如果选择了日期，到指定日期才可以领取，日期优先" placement="top">
                        <el-select v-model="formData.day" placeholder="签到星期" class="handle-space"
                                   :disabled="isDayDisable">
                            <el-option key="1" label="星期一" value="1"></el-option>
                            <el-option key="2" label="星期二" value="2"></el-option>
                            <el-option key="3" label="星期三" value="3"></el-option>
                            <el-option key="4" label="星期四" value="4"></el-option>
                            <el-option key="5" label="星期五" value="5"></el-option>
                            <el-option key="6" label="星期六" value="6"></el-option>
                            <el-option key="0" label="星期日" value="0"></el-option>
                        </el-select>
                    </el-tooltip>
                </el-form-item>

                <el-form-item label="签到日期" class="center">
                    <el-date-picker
                            @change="changeDate"
                            v-model="formData.date"
                            align="right"
                            type="date"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            placeholder="默认即日起">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="补签消耗" class="center">
                    <el-select v-model="formData.type" placeholder="补签消耗" class="handle-space">
                        <el-option key="-1" label="禁止补签" value="-1"></el-option>
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
                                          :src="'api/image/'+i"
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


                <el-form-item label="&emsp;数量&emsp;" class="center">
                    <el-input class="handle-space" placeholder="请输入补签消耗指定物品数量" v-model="formData.count"
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


        <!-- 弹出框奖励编辑框 -->
        <el-dialog title="奖品编辑" v-model="awardEditVisible" width="80%" :append-to-body="true"
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
                        <img v-if="scope.row.type == '2'" style="height: 30px" :src="'404'"
                             @error="$LoadTintImage($event.target,scope.row.itemicon,scope.row.itemtint)">
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
                    <el-form-item label="物品名称" class="center">
                        <el-autocomplete style="width: 70%;" v-model="awardData.itemname"
                                         :fetch-suggestions="loadCouCurr"
                                         placeholder="请选择系统预置特殊物品，或者输入自定义物品"
                                         @select="handleSelect"
                                         @input="(msg)=>{awardData.itemchinese=msg;awardData.itemname=msg;}"
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
                                <el-image :class="{'selected':(i===awardData.itemicon)}"
                                          style="width: 100px;height:100px;cursor: pointer"
                                          :src="'api/image/'+i"
                                          @click="handleSelectImage(i)">
                                </el-image>
                            </li>
                        </ul>
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
                isDayDisable: false,
                isDisabled: false,
                awardEditVisible: false,
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
                    id: "-1",
                    date: "",
                    day: "",
                    type: "",
                    itemname: "",
                    itemicon: "",
                    itemtint: "",
                    itemchinese: "",
                    quality: "",
                    count: "",
                },
                awardData: {
                    id: "-1",
                    funcid: "4",
                    type: "",
                    containerid: "",
                    count: "",
                    itemname: "",
                    itemquality: "",
                    itemchinese: "",
                    itemicon: "",
                    itemtint: "",
                    command: "",
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
            handleSignDate(scope) {
                var day = "";
                if (scope.row.day == 0) {
                    day = "周日";
                }
                if (scope.row.day == 1) {
                    day = "周一";
                }
                if (scope.row.day == 2) {
                    day = "周二";
                }
                if (scope.row.day == 3) {
                    day = "周三";
                }
                if (scope.row.day == 4) {
                    day = "周四";
                }
                if (scope.row.day == 5) {
                    day = "周五";
                }
                if (scope.row.day == 6) {
                    day = "周六";
                }

                if (scope.row.date == null || scope.row.date.startsWith("0")) {
                    return "每" + day;
                } else {
                    var targetTime = new Date(scope.row.date);
                    return targetTime.getFullYear() + "-" + (targetTime.getMonth() + 1) + "-" + targetTime.getDate() + " " + day;
                }
            },
            handleSelectImageLottery(item) {
                this.formData.itemicon = item;
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
            changeDate() {
                if (this.formData.date === "" || this.formData.date === null) {
                    this.isDayDisable = false;
                } else {
                    this.isDayDisable = true;
                    var tdate = new Date(this.formData.date);
                    this.formData.day = tdate.getDay() + "";
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
                    this.awardData.itemchinese = item.value;
                    this.awardData.itemname = this.itemNameCache[item.value].itemname;
                    this.awardData.itemicon = (!this.itemNameCache[item.value].icon ? this.itemNameCache[item.value].itemname : this.itemNameCache[item.value].icon.Value) + ".png";
                    this.awardData.itemtint = this.itemNameCache[item.value].tint === null ? "1|1|1|1" : this.itemNameCache[item.value].tint;
                    // this.src = 'api/image/' + this.formData.itemIcon;
                    ctx.$LoadTintImage($("#imgDesc")[0], this.awardData.itemicon, this.awardData.itemtint);
                    $("#imgDesc").show();
                }
            },
            handleDelete(id) {
                ElMessageBox.confirm('确定要删除这个商品吗？')
                    .then((value) => {
                        if (value === "confirm") {
                            let params = {id: id + ""};
                            axios.post("api/deleteSignInfo", params).then(res => {
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
                                let args = {containerid: this.awardData.containerid + "", funcid: "4"};
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
            initTableData() {
                let params = {itemname: ""};
                axios.post("api/getSignInfo", params).then(res => {
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
                            url = "api/postSignInfo";
                        } else {
                            url = "api/updateSignInfo";
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
                        axios.post(url, this.awardData).then(res => {
                            if (res.data.respCode === "1") {
                                ElMessage({
                                    message: '保存成功!',
                                    type: 'success',
                                })
                            } else {
                                ElMessage.error('保存出错')
                            }

                            let args = {containerid: this.awardData.containerid + "", funcid: "4"};
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
                if (scope.row.date == null || scope.row.date.startsWith("0")) {
                    this.formData.date = "";
                } else {
                    this.formData.date = scope.row.date;
                }
                this.formData.day = scope.row.day;
                this.formData.type = scope.row.type;
                this.formData.count = scope.row.count + "";
                this.formData.itemname = scope.row.itemname + "";
                this.formData.quality = scope.row.quality + "";
                if (scope.row.quality != null || scope.row.quality != "0") {
                    this.formData.quality = parseInt(scope.row.quality);
                }
                this.formData.itemchinese = scope.row.itemchinese + "";
                this.formData.itemicon = scope.row.itemicon + "";
                this.formData.itemtint = scope.row.itemtint + "";
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

            },
            openAwardEdit(scope) {
                this.initIconData();
                this.awardEditVisible = true;
                let params = {containerid: scope.row.id + "", funcid: "4"};
                this.awardData.containerid = scope.row.id + "";
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
