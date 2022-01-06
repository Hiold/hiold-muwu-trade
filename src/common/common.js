export default {
//绑定Alert
    Confirm(text) {
        $("#alert").hide();
        $("#alert>.alert>footer>.confirm").unbind("click");	//取消弹窗点击事件
        $("#alert").fadeIn(100);	//显示弹窗主体页面
        $("#alert>.alert").show();	//显示提示窗口
        $("#alert > .alert > footer > div").show();	//显示确认和取消按钮
        $("#alert>.alert>section>input").hide();	//隐藏输入框
        $("#alert>.alert>section>p").html(text);	//输出文本提示内容
    },
//调整窗口大小
    popupCss(width, height, fontsize) {	//弹窗样式 : 宽、高、字体大小(单位:rem)
        if (isNaN(fontsize) || fontsize <= 0) {	//如果没有设置字体大小，默认为1.2rem
            fontsize = 1.2;
        }
        $("#alert>.alert").css({
            "width": width + "rem",
            "height": height + "rem"
        });
        $("#alert>.alert>section>p").css("font-size", fontsize + "rem");
    },
    getTime() {	//获取当前时间
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
    },
    Alert(text) {	//自定义提示弹窗, 模拟alert()弹窗
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
    },
    Prompt(text, value) {	//自定义输入弹窗, 模拟prompt()弹窗
        $("#alert").hide();
        $("#alert>.alert>footer>.confirm").unbind("click");	//取消弹窗点击事件
        $("#alert").fadeIn(100);	//显示弹窗主体页面
        $("#alert>.alert").show();	//显示提示窗口
        $("#alert > .alert > footer > div").show();	//显示确认和取消按钮
        $("#alert>.alert>section>input").val(value).show().focus().select();//显示输入框
        $("#alert>.alert>section>p").html(text);	//输出文本提示内容
        //$("#alert>.alert>section>input").val(value);
    }
};
