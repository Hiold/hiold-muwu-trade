
$(document).ready(function(){
	$(".Category-ware>li").hide();	//默认隐藏所有子分类
	//下面会检测打开仓库默认加载的分类
	/*加载思路：	情况⑴. 如果"普通物品"分类和"特殊物品"分类都有物品，那么默认加载上次浏览的分类；如果是首次打开页面，则默认加载首页变量中设置的分类。
	 *			情况⑵. 如果两种分类只有其中一种存在物品，即:要么"普通物品"分类有物品，要么"特殊物品"分类有物品，则默认加载存在物品的分类。
	 *			情况⑶. 如果两种分类都没有物品，默认加载"普通物品"分类。
	 */
	setTimeout(function(){	//延迟100毫秒执行是为了让所有函数加载完毕
		if(arrClass1!="特殊物品"){	//如果默认加载的分类为 普通物品
			$(".Category-ware>.btn-1").click();	//点击普通物品分类按钮
			var num = $(".ware-list>li").length;	//检测普通物品数量
			if(num==0){		//如果普通分类下没有任何物品
				GenerateWare("特殊物品","全部");	//生成 特殊物品
				var num2 = $(".ware-list>li").length;	//检测特殊物品数量
				if(num2==0){	//如果特殊物品也没有任何物品（即当前玩家仓库所有分类都没有任何物品）
					//啥也不用管反正也是空的
				}else{	//如果特殊物品分类有物品
					$(".Category-ware>.btn-2").click();	//点击特殊物品分类按钮
				}
				//changeWareColor(xb);	//根据点击的分类改变卡片颜色
			}
		}else{	//如果默认加载的分类为 特殊物品
			$(".Category-ware>.btn-2").click();	//点击特殊物品分类按钮
			var num = $(".ware-list>li").length;	//检测特殊物品数量
			if(num==0){		//如果特殊分类下没有任何物品
				$(".Category-ware>.btn-1").click();	//点击普通物品分类按钮
			}
		}
	},100);
	//$(".Category-ware>li[class^='b1']").show();
	
	$(".Category-ware>ul").click(function(){	//总分类点击特效+生成商品
		var dc = $(this).data("click");		//获取当前分类下的子分类展开状态
		var xb = $(this).attr("class").split("-")[1];	//从类名中获取序号
		if(dc=="false"||dc==undefined){	//情况1:如果子分类为隐藏
			$(".Category-ware>li").slideUp(100);	//先隐藏所有分组的子分类
			$(".Category-ware>li[class^='b"+xb+"']").slideDown(100);	//展开当前子分类
			$(".Category-ware>ul").data("click","false");
			$(this).data("click","true");	//将展开状态设置为"展开"
			arrClass1 = $(this).find("div").text();	//获取当前点击总分类名称
			$(this).next().click();		//默认显示当前总分类下第一个子分类的内容
			changeWareColor(xb);	//改变卡片颜色
		}else if(dc=="true"||dc==true){		//情况2:如果子分类为展开
			$(".Category-ware>li").slideUp(100);	//隐藏所有分组的子分类
			$(this).data("click","false");	//将展开状态设置为"隐藏"
			//$(".warehouse>.menu>.l1-replace").hide();	//隐藏 储存到仓库 按钮
		}
		//$(".warehouse>.menu>.l1-replace").hide();	//隐藏 储存到仓库 按钮
		//$(".warehouse>.ware-list").show();			//显示 仓库物品界面
		return;
	});
	$(".Category-ware>.btn-2").click(function(){
		$(".warehouse>.menu>.l1,.warehouse>.menu>.l2").hide();
	});
	$(".Category-ware>.btn-1").click(function(){
		$(".warehouse>.menu>.l1,.warehouse>.menu>.l2").show();
	});
	var navColor = [	//子分类背景颜色
		["rgb(232, 206, 185), rgba(254, 208, 171, 0.2)"],
		["rgb(254, 227, 171), rgba(255, 255, 255, 0.2)"],
		["rgb(186, 231, 206), rgba(255, 255, 255, 0.2)"],
		["rgb(255, 200, 200), rgba(255, 255, 255, 0.2)"]
	]
	$(".Category-ware>li").click(function(){		//子分类点击特效+生成商品
		$(".head-tool .name-id").val("");
		$(".ware-list").fadeIn(200);	//显示仓库物品列表
		$(".ware-details").hide();		//隐藏物品详情页面
		//$(".terr-box").hide();			//隐藏其它不相关页面
		// $(".warehouse>.menu>.l1").show();	//显示 提取到背包 按钮
		// $(".warehouse>.menu>.l1-replace").hide();	//隐藏 储存到仓库 按钮
		var xb = $(this).attr("class").split("")[1];	//获取序号
		$(".Category-ware>li[class^='b"+xb+"']").css({"background":"none","box-shadow":"none"});	//清除同组子分类的样式
		$(this).css({	//设置当前子分类样式
			"background":"radial-gradient("+navColor[xb-1]+")",
			"box-shadow":"0 0 0.1rem white"
		});
		$(".Category-ware>li[class^='b"+xb+"']").data("click","false");
		$(this).data("click","true");
		arrClass2 = $(this).text();
		GenerateWare(arrClass1,arrClass2);	//生成对应商品-----
		changeWareColor(xb);	//改变卡片颜色
		return;
	});
	$(".Category-ware>li").hover(function(){		//子分类悬浮特效
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
});