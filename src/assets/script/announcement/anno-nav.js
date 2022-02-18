$(document).ready(function(){
	$(".Anno-nav>ul").click(function(){		//左侧分类按钮点击特效
		$(".Anno-nav>ul").css({		//让所有分类按钮样式还原默认
			"transform":"scaleX(1) scaleY(1)",
			"opacity":"0.8",
			"border-radius":"1rem",
			"margin":"0.5em auto"
		});
		$(this).css({		//给正在点击的按钮增加样式
			"transform":"scaleX(1.1) scaleY(1.1)",
			"opacity":"1",
			"border-radius":"0.1rem",
			"margin":"0.8em auto"
		});
		$(".Anno-nav>ul").data("click","false");
		$(this).data("click","true");
		$(".Anno-nav>li").slideUp(100);	//隐藏所有子分类
		$(".Anno-page>div").hide();		//隐藏所有功能页面
		$(".head-tool>.lottery-num").hide();
	});
	$(".Anno-nav>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	$(".Anno-nav").on("click","li",function(){		//子分类点击特效
		var xb = $(this).attr("class").split("")[1];	//获取序号
		$(".Anno-nav>li[class^='b"+xb+"']").css({"background":"none","box-shadow":"none"});	//清除同组子分类的样式
		$(this).css({	//设置当前子分类样式
			"background":"radial-gradient(rgb(247, 200, 157), rgba(255, 255, 255, 0.2))",
			"box-shadow":"0 0 0.1rem white"
		});
		$(".Anno-nav>li[class^='b"+xb+"']").data("click","false");
		$(this).data("click","true");
		var txt = $(this).text();
		$(".head-tool>h1").text(txt);
	});
	$(".Anno-nav").on("mouseenter","li",function(){	//子分类移入特效
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({
				"background":"radial-gradient(rgb(247, 200, 157), rgba(255, 255, 255, 0.2))",
				"box-shadow":"0 0 0.1rem white"
			});
		}
	});
	$(".Anno-nav").on("mouseout","li",function(){	//子分类移出特效
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({"background":"none","box-shadow":"none"});
		}
	});
	
	
	$(".Anno-nav>.btn-1").click(function(){		//使用说明
		$(".head-tool>h1").text("使用说明");
		$(".Anno-1").fadeIn(200);
		$(".Anno-nav>li[class^=b1]").slideDown(100);
		$(".b1-t0").click();
	});
	$(".Anno-nav>.btn-2").click(function(){		//版本说明
		$(".head-tool>h1").text("版本说明");
		$(".Anno-2").fadeIn(200);
		$(".Anno-nav>li[class^=b2]").slideDown(100);
		$(".b2-t0").click();
	});
	$(".Anno-nav>.btn-3").click(function(){		//公告3
		$(".head-tool>h1").text("公告3");
		$(".Anno-3").fadeIn(200);
	});
	$(".Anno-nav>.btn-4").click(function(){		//公告4
		$(".head-tool>h1").text("公告4");
		$(".Anno-4").fadeIn(200);
	});
});