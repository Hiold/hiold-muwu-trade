$(document).ready(function(){
	$(".Category>li").hide();	//默认隐藏所有子分类
	//$(".Category>li[class^='b1']").show();	//默认显示第一组子分类（活动折扣）
	//$(".Category>li[class$='t0']").data("click","true");
	
	$(".Category>ul").click(function(){	//总分类点击特效+生成商品
		var dc = $(this).data("click");		//获取当前分类下的子分类展开状态
		var xb = $(this).attr("class").split("-")[1];	//从类名中获取序号
		if(dc=="false"||dc==undefined){	//情况1:如果子分类为隐藏
			$(".Category>li").slideUp(100);	//先隐藏所有分组的子分类
			$(".Category>li[class^='b"+xb+"']").slideDown(200);	//展开当前子分类
			$(".Category>ul").data("click","false");
			$(this).data("click","true");	//将展开状态设置为"展开"
			class1 = $(this).find("div").text();	//获取当前点击总分类名称
			//alert("展开总分类："+class1)
			$(this).next().click();		//默认显示当前总分类下第一个子分类的内容
			//console.log("总分类："+xb);
			changeColor(xb);
		}else if(dc=="true"||dc==true){		//情况2:如果子分类为展开
			$(".Category>li").slideUp(100);	//隐藏所有分组的子分类
			$(this).data("click","false");	//将展开状态设置为"隐藏"
		}
		return;
		//$(".Category>li[class$='t0']").click();	//默认显示第一个子分类的内容
	});
	var navColor = [	//子分类背景颜色
		["rgb(254, 227, 171), rgba(254, 208, 171, 0.2)"],
		["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
		["rgb(232, 206, 185), rgba(255, 255, 255, 0.2)"],
		["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"],
		["rgb(200, 200, 255), rgba(255, 255, 255, 0.2)"],
		["rgb(255, 160, 160), rgba(255, 255, 255, 0.2)"]
	]
	$(".Category>li").click(function(){		//子分类点击特效+生成商品
		$(".head-tool .name-id").val("");
		$(".items-details").hide();
		$(".items-shop,.head-tool").show();
		var xb = $(this).attr("class").split("")[1];	//获取序号
		//console.log("序号:"+xb)
		$(".Category>li[class^='b"+xb+"']").css({"background":"none","box-shadow":"none"});	//清除同组子分类的样式
		$(this).css({	//设置当前子分类样式
			"background":"radial-gradient("+navColor[xb-1]+")",
			"box-shadow":"0 0 0.1rem white"
		});
		//$(".Category>li[class^='b"+xb+"']").data("click","false");
		$(".Category>li").data("click","false");
		$(this).data("click","true");
		class2 = $(this).text();	//获取当前点击的子分类名称
		GenerateCom(class1,class2);	//生成对应商品
		//console.log("子分类："+xb);
		changeColor(xb);
		//$(".items-details").fadeOut(200);
		//$(".items-details").hide();
		//$(".items-shop,section>.head-tool").show();
		//alert("点击子分类："+class2);
		return;
	});
	$(".Category>li").hover(function(){		//子分类悬浮特效
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({
				"background":"radial-gradient("+navColor[xb-1]+")",
				"box-shadow":"0 0 0.1rem white"
			});
		}
	},function(){
		var xb = $(this).attr("class").split("")[1];
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({"background":"none","box-shadow":"none"});
		}
	});
	
	// $(".Category>ul").click(function(){		//总分类 生成商品
	// 	var ck = $(this).data("click");
	// 	if(ck=="true"){
	// 		class1 = $(this).find("div").text();	//获取当前点击分类
	// 		class2 = "全部";		//默认子分类为全部
	// 		GenerateCom(class1,class2);
	// 	}
	// });
	
});