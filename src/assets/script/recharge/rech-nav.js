$(document).ready(function(){
	$(".Rech-nav>ul").click(function(){		//左侧分类按钮点击特效
		$(".Rech-nav>ul").css({		//让所有分类按钮样式还原默认
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
		$(".Rech-nav>ul").data("click","false");
		$(this).data("click","true");
		$(".Rech-nav>li").slideUp(100);	//隐藏所有子分类
		$(".Rech-page>div").hide();		//隐藏所有功能页面
		$(".head-tool>.lottery-num").hide();
	});
	$(".Rech-nav>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	
	$(".Rech-nav>.btn-1").click(function(){		//积分充值
		$(".head-tool>h1").text("积分充值");
		$(".Rech-jf").fadeIn(200);
	});
	$(".Rech-nav>.btn-2").click(function(){		//钻石充值
		$(".head-tool>h1").text("钻石充值");
		$(".Rech-zs").fadeIn(200);
	});
	$(".Rech-nav>.btn-3").click(function(){		//自由赞助
		$(".head-tool>h1").text("自由赞助");
		$(".Rech-free").fadeIn(200);
	});
	
	
});