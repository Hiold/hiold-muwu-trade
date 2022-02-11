<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password"
                              @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名为您的游戏id，密码为首次进入游戏发送您的6位数字，如果忘记密码可以使用/pmreg [密码] 自行重置密码</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {ref, reactive, getCurrentInstance} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {ElMessage} from "element-plus";
    import axios from "axios";

    export default {
        setup() {
            const {ctx} = getCurrentInstance();
            const param = reactive({
                username: "",
                password: "",
            });

            const rules = {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                ],
            };
            const login = ref(null);
            const submitForm = () => {
                login.value.validate((valid) => {
                    if (valid) {
                        var formData = {username: param.username, password: param.password};
                        axios.post("proxy/api/login", formData).then(res => {
                            if (res.data.respCode === "1") {
                                console.log(res.data.data);
                                ElMessage.success("登录成功");
                                localStorage.setItem("ms_username", param.username);
                                if (res.data.data.type === "1") {
                                    window.location = "/#/manage/dashboard";
                                } else {
                                    window.location = "/#/userq/shop/"
                                }
                                //赋值当前用户信息
                                ctx.$currentUser = res.data.data;
                                localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                            } else {
                                ElMessage.error('登录失败，账号或密码错误')
                            }
                        });
                    } else {
                        ElMessage.error("请输入正确的用户名密码");
                        return false;
                    }
                });
            };

            const store = useStore();
            store.commit("clearTags");

            return {
                param,
                rules,
                login,
                submitForm,
            };
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
