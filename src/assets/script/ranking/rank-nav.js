$(document).ready(function(){
	$(".Rank-nav>ul").click(function(){		//左侧分类按钮点击特效
		$(".Rank-nav>ul").css({		//让所有分类按钮样式还原默认
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
		$(".Rank-nav>ul").data("click","false");
		$(this).data("click","true");
		$(".Rank-nav>li").slideUp(100);	//隐藏所有子分类
		$(".Rank-page>div").hide();		//隐藏所有功能页面
		$(".head-tool>.lottery-num").hide();
		var tit = $(this).find("div").text();
		$(".head-tool>h1").text(tit);
		var num = $(this).attr("class").split("-")[1];	//获取序号
		$(".Rank-"+num).fadeIn(200);
	});
	$(".Rank-nav>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	
	// $(".Rank-nav>.btn-1").click(function(){		//
	// 	$(".Rank-mail").fadeIn(200);
	// });
	// $(".Rank-nav>.btn-2").click(function(){		//
	// 	$(".Rank-skin").fadeIn(200);
	// });
	// $(".Rank-nav>.btn-3").click(function(){		//
	// 	$(".Rank-seting").fadeIn(200);
	// });
	// $(".Rank-nav>.btn-4").click(function(){		//
	// 	$(".Rank-all").fadeIn(200);
	// });
});