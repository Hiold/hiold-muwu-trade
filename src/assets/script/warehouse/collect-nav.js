var collClass;
$(document).ready(function(){
	$(".Collect-ware>ul").click(function(){		//左侧分类按钮点击特效
		$(".Collect-ware>ul").css({		//让所有分类按钮样式还原默认
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
		$(".Collect-ware>ul").data("click","false");
		$(this).data("click","true");
	});
	$(".Collect-ware>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	
	$(".Collect-ware>ul").click(function(){		//左侧分类按钮 点击生成对应类型的收藏物品
		collClass = $(this).text();
		GenerateColl(collClass);
	});
	
});