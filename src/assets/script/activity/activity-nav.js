$(document).ready(function(){
	
	$(".Activity-nav>ul").click(function(){		//左侧分类按钮点击特效
		$(".Activity-nav>ul").css({		//让所有分类按钮样式还原默认
			"transform":"scale(1)",
			"opacity":"0.8",
			"border-radius":"1rem",
			"margin":"0.5em auto"
		});
		$(this).css({		//给正在点击的按钮增加样式
			"transform":"scale(1.1)",
			"opacity":"1",
			"border-radius":"0.1rem",
			"margin":"0.8em auto"
		});
		$(".Activity-nav>ul").data("click","false");
		$(this).data("click","true");
		$(".Activity-nav>li").slideUp(100);	//隐藏所有子分类
		$(".Activity-page>div").hide();		//隐藏所有活动页面
		$(".head-tool>.lottery-num").hide();
	});
	$(".Activity-nav>ul").hover(function(){		//左侧分类按钮悬浮特效
		var ck = $(this).data("click");
		if(ck!="true"){
			$(this).css({		//给正在点击的按钮增加样式
				"transform":"scale(1.05)",
				"opacity":"0.9"
			});
		}
	},function(){
		var ck = $(this).data("click");
		if(ck!="true"){
			$(this).css({		//给正在点击的按钮增加样式
				"transform":"scale(1)",
				"opacity":"0.8"
			});
		}
	});
	var navColor = [	//子分类背景颜色
		["rgb(232, 206, 185), rgba(254, 208, 171, 0.2)"],
		["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
		["rgb(254, 227, 171), rgba(255, 255, 255, 0.2)"],
		["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"]
	]
	$(".Activity-nav").on("click","li",function(){		//子分类点击特效
		var xb = $(this).attr("class").split("")[1];	//获取序号
		$(".Activity-nav>li[class^='b"+xb+"']").css({"background":"none","box-shadow":"none"});	//清除同组子分类的样式
		$(this).css({	//设置当前子分类样式
			"background":"radial-gradient("+navColor[xb-1]+")",
			"box-shadow":"0 0 0.1rem white"
		});
		$(".Activity-nav>li[class^='b"+xb+"']").data("click","false");
		$(this).data("click","true");
	});
	$(".Activity-nav").on("mouseenter","li",function(){	//子分类移入特效
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({
				"background":"radial-gradient("+navColor[xb-1]+")",
				"box-shadow":"0 0 0.1rem white"
			});
		}
	});
	$(".Activity-nav").on("mouseout","li",function(){	//子分类移出特效
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({"background":"none","box-shadow":"none"});
		}
	});
	
	
	$(".Activity-nav>.btn-1").click(function(){	//定时抢红包 按钮
		$(".head-tool>h1").text("定时抢红包");
		$(".Act-hb").fadeIn(200);
	});
	$(".Activity-nav>.btn-2").click(function(){	//活动任务 按钮
		$(".head-tool>h1").text("每日任务");
		$("li[class^=b2]").slideDown(100);
		$(".Act-task").fadeIn(200);
		$(".Activity-nav>.b2-t0").click();
	});
	$(".Activity-nav>.btn-3").click(function(){	//幸运抽奖 按钮
		$(".head-tool>h1").text("积分抽奖");
		$(".head-tool>.lottery-num").show();
		$("li[class^=b3]").slideDown(100);
		$(".Act-lottery").fadeIn(200);
		$(".Activity-nav>.b3-t0").click();
	});
	$(".Activity-nav>.btn-4").click(function(){	//数字谜团 按钮
		$(".head-tool>h1").text("数字谜团");
		$(".Act-number").fadeIn(200);
	});
	$(".Activity-nav>.btn-5").click(function(){	//每日签到 按钮
		$(".head-tool>h1").text("七日签到领好礼");
		$(".Act-qd").fadeIn(200);
	});
	
	//幸运抽奖 下的子分类
	$(".Activity-nav").on("click","li[class^=b3]",function(){
		var xb = $(this).attr("class").split("")[4];
		var name = $(this).text();	//获取子分类名称
		$(".head-tool>h1").text(name);	//在头部标题渲染名称
		GenerateLottery(xb);	//渲染抽奖界面
	});
	
	//活动任务 下的子分类
	$(".Activity-nav>.b2-t0").click(function(){	//每日任务
		$(".task-day").show();
		$(".task-main").hide();
		$(".head-tool>h1").text("每日任务");
	});
	$(".Activity-nav>.b2-t1").click(function(){	//主线任务
		$(".task-day").hide();
		$(".task-main").show();
		$(".head-tool>h1").text("主线任务");
	});
	
});