<template>
    <section class="showcase">
        <div class="video-container">
            <video src="https://pan.bilnn.com/api/v3/file/sourcejump/YGWeZxCv/O6TL9t36OCb5Q4fcrwmINNVRQjMLWuI4SdLsl-m0wlA*" autoplay muted loop></video>
        </div>
        <div class="title">
            <span><b>7</b> Days To <die>Die</die></span>
            <span>A20</span>
        </div>
        <div class="contentnew">
            <div class="login-tit">
                <h1>༺ཌ 七日杀 · 积分交易商城 ད༻</h1>
                <span>V2.0.1</span>
            </div>
            <div class="user">
                <i></i>
                <input v-model="param.username" type="text" class="user-val" placeholder="游戏名 / steamID">
            </div>
            <div class="pwd">
                <i></i>
                <input v-model="param.password" type="password" class="pwd-val" placeholder="密码">
            </div>
            <div class="signup">
                <div class="b1" @click="submitForm">登 录</div>
                <div class="b2">注 册</div>
            </div>
            <footer>
                © 2022
                <a href="https://doc.hiold.net/" target="_blank">doc.hiold.net</a>
                版权所有&nbsp; 如需帮助请访问
                <a href="https://doc.hiold.net/" target="_blank">木屋海鸥交易系统</a>
                官方网站
            </footer>
        </div>
    </section>
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
            const Videosrc = ref(`/images/login/video.mov`);
            const submitForm = () => {
                var formData = {username: param.username, password: param.password};
                axios.post("api/login", formData).then(res => {
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
            };

            const store = useStore();
            store.commit("clearTags");

            return {
                param,
                rules,
                login,
                submitForm,
                Videosrc
            };
        },
        mounted() {
            console.log(window.location.href);
            if (window.location.href != null && window.location.href != "" && window.location.href.indexOf("ncode=") > -1) {
                var ncode = window.location.href.substring(window.location.href.indexOf("ncode=") + 6);
                console.log("快捷登录模式", ncode);
                var formData = {ncode: ncode};
                axios.post("api/ncodeLogin", formData).then(res => {
                    if (res.data.respCode === "1") {
                        console.log(res.data.data);
                        ElMessage.success("登录成功");
                        localStorage.setItem("ms_username", res.data.name);
                        if (res.data.data.type === "1") {
                            window.location = "/#/manage/dashboard";
                        } else {
                            window.location = "/#/userq/shop/"
                        }
                        //赋值当前用户信息
                        ctx.$currentUser = res.data.data;
                        localStorage.setItem("userinfo", JSON.stringify(res.data.data));
                    } else {
                        ElMessage.error(res.data.respMsg)
                    }
                });
            } else {
                console.log("正常登录模式")
            }
        }
    };
</script>

<style scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        user-select: none;
    }

    @font-face {
        font-family: "new";
        src: url("@/assets/font/newfont.ttf");
    }

    body {
        font-family: '微软雅黑';
        line-height: 1.5;
    }

    .showcase {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
        padding: 0 20px;
    }

    .video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--primary-color) url('/@/assets/images/login/cover.jpg') no-repeat center center/cover;
    }

    .video-container video {
        min-width: 100%;
        min-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
    }

    .video-container:after {
        content: '';
        z-index: 1;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
    }

    .title {
        font-family: 'new', '微软雅黑';
        display: block;
        letter-spacing: 0.3rem;
        position: absolute;
        top: 1rem;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 2;
    }

    .title > span:nth-of-type(1) {
        font-size: 4rem;
        font-weight: bold;
        color: transparent;

        paint-order: fill stroke markers;
        -webkit-text-stroke-width: 1.5px;
        -webkit-text-stroke-color: #fed128;
        text-shadow: 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 0.4vw #fed128;
    }

    .title > span:nth-of-type(2) {
        font-size: 2rem;
        color: #28d7fe;
        font-size: 40px;
        text-shadow: 0 0 3vw #1041ff, 0 0 3vw #1041ff, 0 0 10vw #1041ff, 0 0 10vw #1041ff, 0 0 0.4vw #8bfdfe;
        font-weight: normal;
        margin-left: 1rem;
    }

    .title b {
        display: inline-block;
        transform: scale(1.5);
    }

    .title die {
        -webkit-text-stroke-color: #444444;
        text-shadow: 0 0 1vw #222222, 0 0 1vw #222222, 0 0 1vw #222222, 0 0 0.2vw #444444;
        -webkit-animation-name: blink;
        animation-name: blink;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-iteration-count: 9999;
        animation-iteration-count: 9999;
    }

    @-webkit-keyframes blink {
        from,
        38%,
        43.25%,
        49.5%,
        51.125%,
        to {
            -webkit-text-stroke-color: #444444;
            text-shadow: 0 0 1vw #222222, 0 0 1vw #222222, 0 0 1vw #222222, 0 0 0.2vw #444444;
        }

        38.5%,
        13%,
        50%,
        51% {
            -webkit-text-stroke-color: #fed128;
            text-shadow: 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 0.4vw #fed128;
        }
    }

    @keyframes blink {
        from,
        38%,
        43.25%,
        49.5%,
        51.125%,
        to {
            -webkit-text-stroke-color: #444444;
            text-shadow: 0 0 1vw #222222, 0 0 1vw #222222, 0 0 1vw #222222, 0 0 0.2vw #444444;
        }

        38.5%,
        13%,
        50%,
        51% {
            -webkit-text-stroke-color: #fed128;
            text-shadow: 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 3vw #fa1c16, 0 0 0.4vw #fed128;
        }
    }

    .contentnew {
        width: 30rem;
        height: 22rem;
        z-index: 2;
    }

    .login-tit {
        margin-bottom: 2rem;
    }

    .login-tit > h1 {
        font-weight: bold;
        font-size: 1.5rem;
        line-height: 3rem;
    }

    .login-tit > span {
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
    }

    .contentnew > .user,
    .contentnew > .pwd {
        width: 22rem;
        height: 3rem;
        overflow: hidden;
        border-radius: 1rem;
        margin: 1.2rem auto;
    }

    .contentnew > .user {
        box-shadow: 0 0 0 0.15rem skyblue;
    }

    .contentnew > .pwd {
        box-shadow: 0 0 0 0.15rem pink;
    }

    .contentnew > .user > i {
        width: 3rem;
        height: 3rem;
        float: left;
        background-image: url('@/assets/images/icon/user.png');
        background-size: contain;
        transform: scale(0.5);
    }

    .contentnew > .pwd > i {
        width: 3rem;
        height: 3rem;
        float: left;
        background-image: url('@/assets/images/icon/pwd.png');
        background-size: contain;
        transform: scale(0.6);
    }

    .contentnew input {
        width: 19rem;
        height: 3rem;
        float: left;
        border: none;
        outline: none;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1.1rem;
        text-indent: 1rem;
    }

    .contentnew input::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.1rem;
    }

    .signup {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    .signup > div {
        width: 8rem;
        height: 3rem;
        float: left;
        font-size: 1.1rem;
        border-radius: 0.5rem;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .signup > .b1 {
        border: 0.15rem solid lightgreen;
        color: lightgreen;
    }

    .signup > .b2 {
        border: 0.15rem solid navajowhite;
        color: navajowhite;
    }

    .signup > .b1:hover {
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0.3rem lightgreen;
    }

    .signup > .b2:hover {
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0.3rem navajowhite;
    }

    .contentnew footer {
        width: 100%;
        height: 2.5rem;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.6);
        line-height: 2rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .contentnew footer > a {
        color: inherit;
    }

</style>
