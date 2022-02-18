$(document).ready(function(){
	$(".More-nav>ul").click(function(){		//左侧分类按钮点击特效
		$(".More-nav>ul").css({		//让所有分类按钮样式还原默认
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
		$(".More-nav>ul").data("click","false");
		$(this).data("click","true");
		$(".More-nav>li").slideUp(100);	//隐藏所有子分类
		$(".More-page>div").hide();		//隐藏所有功能页面
		$(".head-tool>.back").hide();	//隐藏头部工具栏的返回按钮
		$(".More-page>footer").hide();	//隐藏传送的悬浮信息
	});
	$(".More-nav>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	
	$(".More-nav>.btn-1").click(function(){		//我的邮件
		$(".head-tool>h1").text("我的邮件");
		$(".More-mail").fadeIn(200);
	});
	$(".More-nav>.btn-2").click(function(){		//更换皮肤
		$(".head-tool>h1").text("更换皮肤");
		$(".More-skin").fadeIn(200);
	});
	$(".More-nav>.btn-3").click(function(){		//商城设置
		$(".head-tool>h1").text("商城设置");
		$(".More-seting").fadeIn(200);
	});
	$(".More-nav>.btn-4").click(function(){		//更多功能
		$(".head-tool>h1").text("更多功能");
		$(".More-all").fadeIn(200);
	});
	
	
});