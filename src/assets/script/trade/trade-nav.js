$(document).ready(function(){
	$(".Trade-ware>ul").click(function(){		//左侧分类按钮点击特效
		$(".Trade-ware>ul").css({		//让所有分类按钮样式还原默认
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
		$(".Trade-ware>ul").data("click","false");
		$(this).data("click","true");
		$(".player-order").hide();
	});
	$(".Trade-ware>ul").hover(function(){		//左侧分类按钮悬浮特效
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
	
	$(".Trade-ware>.btn-1").click(function(){	//我的店铺
		$(".my-shop").show();	//显示店铺详情页面
		$(".player-store,.player-com,.buying").hide();	//隐藏其它不相关页面
		$(".my-shop>header>.back").hide();	//隐藏返回按钮
		//隐藏头部工具栏及相关功能
		$(".head-tool,.head-tool>.serch,.head-tool>.sort,.head-tool>.refresh,.head-tool>.back").hide();
		GeneratePStore(playerIndex,"出售");	//生成我的商品
		$(".my-shop>section>nav>.sell").click();	//点击'收东西'按钮
		//$(".head-tool>h1").text("我的店铺");
		//$(".head-tool>.serch").hide();
		$(".my-shop>header>.right,.my-shop>header>.edit").css("float","right");
		nowPage = "我的店铺";
	});
	$(".Trade-ware>.btn-2").click(function(){	//玩家店铺
		$(".player-store").show();	//显示玩家店铺列表
		$(".my-shop,.player-com,.buying").hide();	//隐藏其它不相关页面
		$(".head-tool").show();	//显示头部工具栏
		$(".head-tool>h1").text("玩家店铺");	//头部标题命名为'玩家店铺'
		$(".head-tool>.serch").show();	//显示搜索框
		$(".head-tool>.serch>input").attr("placeholder","请输入玩家或店铺名称");
		$(".head-tool>.serch>input").val("");
		$(".head-tool>.sort").show();	//显示排序方式
		$(".head-tool>.sort").find(".s-page").text('默认排序');
		$(".head-tool>.sort").find(".t1").text('默认排序');
		$(".head-tool>.sort").find(".t2").text('等级高到低');
		$(".head-tool>.sort").find(".t3").text('积分高到低');
		$(".head-tool>.sort").find(".t4").show().text("获赞高到低");
		$(".head-tool>.sort").find(".t5").show().text("销售额高到低");
		$(".head-tool>.refresh").show();	//显示刷新按钮
		$(".head-tool>.back").hide();	//隐藏返回按钮
		GenerateStoreList();	//生成玩家店铺列表
		$(".my-shop>header>.right,.my-shop>header>.edit").css("float","left");
		nowPage = "玩家店铺";
	});
	$(".Trade-ware>.btn-3").click(function(){	//玩家售卖区
		$(".player-com").show();	//显示玩家售卖区页面
		$(".player-store,.my-shop,.buying").hide();	//隐藏其它不相关页面
		$(".head-tool").show();	//显示头部工具栏
		$(".head-tool>h1").text("玩家售卖区");	//头部标题命名为'玩家店铺'
		$(".head-tool>.serch").show();	//显示搜索框
		$(".head-tool>.serch>input").attr("placeholder","请输入物品名称或ID");
		$(".head-tool>.serch>input").val("");
		$(".head-tool>.sort").show();	//显示排序按钮
		$(".head-tool>.sort").find(".s-page").text('默认排序');
		$(".head-tool>.sort").find(".t1").text('默认排序');
		$(".head-tool>.sort").find(".t2").text('价格高到低');
		$(".head-tool>.sort").find(".t3").text('价格低到高');
		$(".head-tool>.sort").find(".t4").hide();
		$(".head-tool>.sort").find(".t5").hide();
		$(".head-tool>.refresh").hide();	//隐藏刷新按钮
		$(".head-tool>.back").hide();		//隐藏返回按钮
		$(".player-com>.empty").hide();	//隐藏没有搜索到物品的提示信息
		nowPage = "玩家售卖区";
		pst = "出售";
		GeneratePlayerCom("出售");
	});
	$(".Trade-ware>.btn-4").click(function(){	//玩家求购区
		$(".player-com").show();	//显示玩家售卖区页面
		$(".player-store,.my-shop,.buying").hide();	//隐藏其它不相关页面
		$(".head-tool").show();	//显示头部工具栏
		$(".head-tool>h1").text("玩家求购区");	//头部标题命名为'玩家店铺'
		$(".head-tool>.serch").show();	//显示搜索框
		$(".head-tool>.serch>input").attr("placeholder","请输入物品名称或ID");
		$(".head-tool>.serch>input").val("");
		$(".head-tool>.sort").show();	//显示排序按钮
		$(".head-tool>.sort").find(".s-page").text('默认排序');
		$(".head-tool>.sort").find(".t1").text('默认排序');
		$(".head-tool>.sort").find(".t2").text('价格高到低');
		$(".head-tool>.sort").find(".t3").text('价格低到高');
		$(".head-tool>.sort").find(".t4").hide();
		$(".head-tool>.sort").find(".t5").hide();
		$(".head-tool>.refresh").hide();	//隐藏刷新按钮
		$(".head-tool>.back").hide();		//隐藏返回按钮
		$(".player-com>.empty").hide();	//隐藏没有搜索到物品的提示信息
		nowPage = "玩家求购区";
		pst = "求购";
		GeneratePlayerCom("求购");
	});
	
	$(".Trade-ware>.btn-5").click(function(){	//物资求购
		$(".head-tool").show();	//显示头部工具栏
		$(".head-tool>h1").text("物资求购");	//更改头部标题
		$(".head-tool>.serch").show();	//显示搜索框
		$(".head-tool>.serch>input").attr("placeholder","请输入物品名称或ID");
		$(".head-tool>.serch>input").val("");
		$(".head-tool>.sort").show();	//显示排序（选择类型）按钮
		$(".head-tool>.sort").find(".s-page").text('所有物品');
		$(".head-tool>.sort").find(".t1").text('所有物品');
		$(".head-tool>.sort").find(".t2").text('物块模型');
		$(".head-tool>.sort").find(".t3").text('物品资源');
		$(".head-tool>.sort").find(".t4").hide();
		$(".head-tool>.sort").find(".t5").hide();
		//$(".head-tool>.sort").html('<div class="s-page">所有物品</div><li class="t1" data-click="true">所有物品</li><li class="t2">物块模型</li><li class="t3">物品资源</li>');
		$(".head-tool>.refresh").show();	//显示刷新按钮
		$(".my-shop,.player-store,.player-com").hide();	//隐藏其它不相关页面
		$(".buying").show();	//显示物资求购页面
		$(".buying .empty").hide();	//隐藏没有搜索到物品的提示信息
		nowPage = "物资求购";
		GenerateBuyingItems();	//生成可求购物品列表
		adaptive();
	});
});