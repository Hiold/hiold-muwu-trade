import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import mitt from 'mitt'
import $ from 'jquery'
import {useRouter} from "vue-router";

const app = createApp(App);

installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app');

//注册事件总线
const $bus = {}
const emitter = mitt()
$bus.on = emitter.on
$bus.emit = emitter.emit
$bus.off = emitter.off
app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$currentUser = null;


//全局挂载用户数据
//绑定Alert
app.config.globalProperties.Confirm = function (text) {
    $("#alert").hide();
    $("#alert>.alert>footer>.confirm").unbind("click");	//取消弹窗点击事件
    $("#alert").fadeIn(100);	//显示弹窗主体页面
    $("#alert>.alert").show();	//显示提示窗口
    $("#alert > .alert > footer > div").show();	//显示确认和取消按钮
    $("#alert>.alert>section>input").hide();	//隐藏输入框
    $("#alert>.alert>section>p").html(text);	//输出文本提示内容
}
//调整窗口大小
app.config.globalProperties.popupCss = function (width, height, fontsize) {	//弹窗样式 : 宽、高、字体大小(单位:rem)
    if (isNaN(fontsize) || fontsize <= 0) {	//如果没有设置字体大小，默认为1.2rem
        fontsize = 1.2;
    }
    $("#alert>.alert").css({
        "width": width + "rem",
        "height": height + "rem"
    });
    $("#alert>.alert>section>p").css("font-size", fontsize + "rem");
}

app.config.globalProperties.getTime = function () {	//获取当前时间
    var myDate = new Date();

    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var mon = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var day = myDate.getDate();        //获取当前日(1-31)
    var week = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)

    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var min = myDate.getMinutes();     //获取当前分钟数(0-59)
    var sec = myDate.getSeconds();     //获取当前秒数(0-59)

    // var date1 = myDate.toLocaleDateString();     //获取当前日期(year/mon/day)
    // var date2 = myDate.toLocaleTimeString();     //获取当前时间(hour:min:sec)
    var date3 = myDate.toLocaleString();        //获取日期与时间(year/mon/day hour:min:sec)

    return {
        "year": year,
        "mon": mon,
        "day": day,
        "week": week,
        "hour": hour,
        "min": min,
        "sec": sec,
        "date": date3
    }
}

app.config.globalProperties.Alert = function (text) {	//自定义提示弹窗, 模拟alert()弹窗
    $("#alert").hide();
    $("#alert>.alert>footer>.confirm").unbind("click");		//取消弹窗点击事件
    $("#alert>.alert>footer>.confirm").click(function () {	//点击确认关闭窗口
        $("#alert>.alert>footer>.close").click();
    });
    $("#alert").fadeIn(100);	//显示弹窗主体页面
    $("#alert>.alert").show();	//显示提示窗口
    $("#alert > .alert > footer > div").show();	//显示确认和取消按钮
    $("#alert>.alert>footer>.close").hide();	//隐藏取消按钮
    $("#alert>.alert>section>input").hide();	//隐藏输入框
    $("#alert>.alert>section>p").html(text);	//输出文本提示内容
}

app.config.globalProperties.Prompt = function (text, value) {	//自定义输入弹窗, 模拟prompt()弹窗
    $("#alert").hide();
    $("#alert>.alert>footer>.confirm").unbind("click");	//取消弹窗点击事件
    $("#alert").fadeIn(100);	//显示弹窗主体页面
    $("#alert>.alert").show();	//显示提示窗口
    $("#alert > .alert > footer > div").show();	//显示确认和取消按钮
    $("#alert>.alert>section>input").val(value).show().focus().select();//显示输入框
    $("#alert>.alert>section>p").html(text);	//输出文本提示内容
    //$("#alert>.alert>section>input").val(value);
}

app.config.globalProperties.$LoadTintImage = function (t, m, tint) {
    loadNew(t, m, tint);

    function loadNew(t, m, tint) {
        if (tint == null || tint == "") {
            tint = "1|1|1|1";
        }
        if (m.indexOf(".png") > -1) {
            m = m.replace(".png", "");
        }
        var src = 'api/image/' + m + '.png';

        console.log(m, tint);

        convertImgToBase64(t, src, tint);
    }


    function convertImgToBase64(t, url, tint) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            handleImg(t, ctx, tint, canvas);
            canvas = null;
        };
        img.src = url;
    }

    function handleImg(t, ctx, argb, canvas) {
        let modifyData
        if (argb.includes(",")) {
            modifyData = argb.split(",");
        } else if (argb.includes("|")) {
            modifyData = argb.split("|");
        }

        let ma = parseFloat(modifyData[0]);
        let mr = parseFloat(modifyData[1]);
        let mg = parseFloat(modifyData[2]);
        let mb = parseFloat(modifyData[3]);


        //获取像素信息
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ////console.log(imageData);
        //处理像素信息
        for (let p = 0; p < imageData.data.length; p += 4) {
            let r = imageData.data[p];
            let g = imageData.data[p + 1];
            let b = imageData.data[p + 2];
            let a = imageData.data[p + 3];
            imageData.data[p] = parseInt(r * (mr));
            imageData.data[p + 1] = parseInt(g * (mg));
            imageData.data[p + 2] = parseInt(b * (mb));
        }
        ctx.putImageData(imageData, 0, 0);

        let newImgUrl = canvas.toDataURL("image/png");
        t.src = newImgUrl;
    }
}
