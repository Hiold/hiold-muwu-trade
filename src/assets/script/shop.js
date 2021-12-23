	var arrClass1;
	var arrClass2;

	//refresh = refreshShop;	//获取首页设定的 是否开启刷新
	comCard = '<li class="items"><header><span class="name"></span><span class="num"></span><i></i><div class="follow">跟档</div></header><section><img src=""><div class="quality"><span></span></div><div class="collect"></div><div class="hot"></div><div class="ex"></div><div class="soldout"></div><div class="vip"></div></section><footer><i></i><span class="price"></span><del></del><span class="active"></span></footer></li>';
	// if(onRefreshItems){	//如果设置了定时刷新商品的功能
	// 	$(".items-shop>.items").css("transition-duration","unset");
	// }


	// function refreshItems(){	//刷新当前加载的商品（点击当前正在浏览的子分类）
	// 	for(var i=0;i<$(".Category>li").length;i++){
	// 		var ck = $(".Category>li").eq(i).data("click");
	// 		if(ck=="true"){
	// 			$(".Category>li").eq(i).click();
	// 			//console.log("定时刷新商品");
	// 		}
	// 	}
	// }

		setTimeout(function(){	//当页面加载完成后延迟50毫秒生成商品-------------
			lastView(class1,class2);
			if(onRefreshItems){
				refreshItems = setInterval(function(){
					var ss = $(".items-details").css("display");	//获取商品详情页的显示状态
					if(ss=="block"){

					}else{	//如果没有打开商品详情页（说明玩家正在浏览商品列表）
						for(var i=0;i<$(".Category>li").length;i++){	//遍历子分类按钮
							var ck = $(".Category>li").eq(i).data("click");	//获取子分类按钮的浏览状态
							if(ck=="true"){	//如果这个子分类就是玩家正在浏览的子分类
								$(".Category>li").eq(i).click();	//点击它
							}
						}
					}


				},refreshItemsTime);	//定时刷新的间隔
			}

		},50);
	//}
	//$(".items-shop span,.items-shop div,.items-shop del").show();
	function lastView(type1,type2){	//自动跳转到规定的分类并打印商品
		//$(".Category>.btn-2").click();
		for(var i=0;i<$(".Category>ul").length;i++){
			//console.log(i)
			//alert($(".Category>ul").length)
			var name1 = $(".Category>ul").eq(i).find("div").text();	//获取总分类名称
			var xb = $(".Category>ul").eq(i).attr("class").split("-")[1];	//获取总分类下标
			if(name1==type1){	//找到对应总分类
				$(".Category>ul").eq(i).click();
				for(var j=0;j<$(".Category>li[class^=b"+xb+"]").length;j++){
					var name2 = $(".Category>li[class^=b"+xb+"]").eq(j).text();
					if(name2==type2&&name2!="全部"){	//找到对应子分类
						$(".Category>li[class^=b"+xb+"]").eq(j).click();
						//console.log("j="+j+" --- xb="+xb)
						//console.log("生成商品："+name1+" -- "+name2);
						//GenerateCom(type1,type2);
					}
				}
			}
			//changeColor(xb)
		}

	}



	function searchItems(){	//当输入框获内容改变时，只显示搜索的商品（无视英文字母大小写）
		$(".items-shop>.items").show();	//先默认让所有隐藏元素显示
		var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
		var find = false;	//默认为没找到商品
		for(var i=0;i<$(".items-shop>.items").length;i++){	//遍历当前页面显示的商品
			var xb = $(".items-shop>.items").eq(i).data("index");	//获取每个商品在数组中的下标
			//var name = $(".items-shop>.items").eq(i).find("header").find(".name").text();
			var name = shop.data[xb].name.toLowerCase();	//获取商品名称
			var id = shop.data[xb].id.toLowerCase();		//获取商品ID
			if(name.indexOf(txt) != -1||id.indexOf(txt) != -1){	//如果商品名称或ID中包含了你需要搜索的字符串
				find = true;
				$(".items-shop>.none").hide();
			}else{
				$(".items-shop>.items").eq(i).hide();
			}
		}
		if(!find){	//如果遍历完数组后，仍然没找到要搜索的商品
			console.log("没找到搜索的商品");
			$(".items-shop>.none").show();
			$(".items-shop>.none").find("span").html("没有找到你想<br>搜索的商品");
		}
	}

$(document).ready(function(){
	//var serchItems;	//搜索商品是调用的定时函数

	$(".head-tool>.serch>.btn").click(function(){
		searchItems();
	});
	var openCard = true;
	$(".items-shop").on("click",".items",function(){		//点击卡片打开商品详情
		if(openCard){	//这一步是为了避免和点击收藏图标发生冲突
			formPage = "shop";
			$(".items-details").fadeIn(100);
			$(".items-shop,.head-tool").fadeOut(100);
			adaptive();
			//arrcomToObj();	//将商品数据转换为obj格式
			//下面是获取商品的基本信息
			var xb = $(this).attr("data-index");		//获取商品下标（数组中的排序，以便于查找）
			var id = shop.data[xb].id;					//ID
			var name = deleteBBcode(shop.data[xb].name);//名称
			var num = shop.data[xb].num;				//数量
			var sales = shop.data[xb].sales;			//销量
			var class1 = shop.data[xb].class1;			//总分类
			var class2 = shop.data[xb].class2;			//子分类
			var class3 = $(this).find(".ex").text();	//其它类型
			var curr = shop.data[xb].currency;			//货币类型
			var price = $(this).find(".price").text();	//价格
			var del = $(this).find("del").text();		//删除价
			var dis = $(this).find("header").find("i").text();	//折扣
			var xgLevel = shop.data[xb].xgLevel;		//等级限购
			var xgDay = shop.data[xb].xgDay;			//每日限购
			var xgAll = shop.data[xb].xgAll;			//总数限购
			var stock = shop.data[xb].stock;			//剩余库存
			var img = shop.data[xb].image;				//商品图片
			var backImg = $(this).css("background-image");//商品展示框背景图片
			var hot = $(this).find("section").find(".hot").css("display");//热销图标
			var quality = shop.data[xb].quality;			//品质
			var collectNum = shop.data[xb].collect;		//玩家收藏量
			var sell = shop.data[xb].sell;				//是否可售卖（会员）
			var desc = shop.data[xb].desc;		//商品说明
			// var exp = shop.data[xb].Expired;	//是否已过期
			// if(exp==false){
			// 	alert("查询失败，这个商品已过期！");
			// 	for(var i=0;i<$(".Category>li").length;i++){	//遍历子分类按钮
			// 		var ck = $(".Category>li").eq(i).data("click");	//获取子分类按钮的浏览状态
			// 		if(ck=="true"){	//如果这个子分类就是玩家正在浏览的子分类
			// 			$(".Category>li").eq(i).click();	//点击它（重新加载了当前分类商品页面）
			// 		}
			// 	}
			// 	return;
			// }
			var buyDay = 0;		//今日已购买数量
			var buyAll = 0;		//历史购买总数量
			var findHis = false;	//商品历史购买数据（默认为没找到数据）
			for(var i=1;i<playerBuy[playerIndex].length;i++){	//遍历商品购买数据数组
				var id2 = playerBuys.data[i].id;	//获取数组中的物品id
				if(id==id2){	//如果数组中找到了这个商品
					buyDay = playerBuys.data[i].numDay;
					buyAll = playerBuys.data[i].numAll;
					findHis = true;
					break;
				}
			}
			if(!findHis){	//如果遍历玩数组后仍然没找到这个物品
				//alert("没找到，id1="+id+"----id2="+id2)
			}

			//保存下标
			$(".items-details").data("index",xb);
			//下面是在商品详情页面打印商品信息
			$(".spxq").find(".name").text(name);			//名称
			if(num>1){
				$(".spxq").find(".shul").show().text("x"+num);			//数量
			}else{
				$(".spxq").find(".shul").hide().text("");
			}
			$(".spxq").find(".sells").text("销量 : "+sales);	//销量
			$(".spxq").find(".cs1").text(class1);			//总分类
			$(".spxq").find(".cs2").text(class2);			//子分类
			if(sell=="vip"){
				$(".spxq").find(".cs4").show().text("会员专属");		//VIP专属
			}else{
				$(".spxq").find(".cs4").hide();
			}
			if(sales==undefined||isNaN(sales)){
				$(".spxq").find(".sells").hide();
			}else{
				$(".spxq").find(".sells").show();
			}
			//（Mod物品/网页专属）
			if(class3==""||class3==undefined){
				$(".spxq").find(".cs3").hide();
			}else{
				$(".spxq").find(".cs3").show().text(class3);
			}
			$(".spxq").find(".price").find(".p1").html("<i></i>"+price);	//价格
			$(".spxq").find(".price").find("del").text(del);				//删除价
			if(dis==""||dis==undefined){	//折扣
				$(".spxq").find(".price").children("i").hide();
			}else{
				$(".spxq").find(".price").children("i").show().text(dis);
			}
			//货币类型
			if(curr=="积分"){
				$(".spxq").find(".price").find(".p1").find("i").css("background-image","url(images/icon/jf2.png)");
			}else if(curr=="钻石"){
				$(".spxq").find(".price").find(".p1").find("i").css("background-image","url(images/icon/red-zs.png)");
			}
			//等级限购
			if(xgLevel>0){
				$(".spxq").find(".xg1").find(".txt").text("≥ lv."+xgLevel);
			}else if(xgLevel<0){
				$(".spxq").find(".xg1").find(".txt").text("≤ lv."+xgLevel*-1);
			}else{
				$(".spxq").find(".xg1").find(".txt").text("无限制");
			}
			//每日限购
			if(xgDay>=0){
				$(".spxq").find(".xg2").find(".txt").text(buyDay+"/"+xgDay);
			}else{
				$(".spxq").find(".xg2").find(".txt").text("无限制");
			}
			//总限购
			if(xgAll>=0){
				$(".spxq").find(".xg3").find(".txt").text(buyAll+"/"+xgAll);
			}else{
				$(".spxq").find(".xg3").find(".txt").text("无限制");
			}
			//输入框默认数量为1
			$(".spxq>.num>input").val(1);
			$(".spxq>.num>.jian>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});
			$(".spxq>.num>.add>span").css({"color":"black","cursor":"pointer"});
			//库存
			if(stock>=0){
				$(".spxq").find(".stock").text("（库存 : "+stock+"）");
				if(stock==0){	//如果库存为0，显示售罄图标
					$(".items-details>.left>.image .soldout").show();
				}else{
					$(".items-details>.left>.image .soldout").hide();
				}
			}else{
				$(".spxq").find(".stock").text("（库存 : 无上限）");
			}
			//售罄图标
			var showS = $(this).find(".soldout").css("display");
			if(showS=="block"){
				$(".items-details>.left>.image .soldout").show();
			}else{
				$(".items-details>.left>.image .soldout").hide();
			}
			//热销图标
			if(hot=="block"){
				$(".items-details>.left").find(".hot").show();
			}else{
				$(".items-details>.left").find(".hot").hide();
			}
			//品质
			var color;
			if(quality==1){color="rgba(157, 138, 106, 0.5)"}
			if(quality==2){color="rgba(208, 129, 43, 0.5)"}
			if(quality==3){color="rgba(163, 165, 28, 0.5)"}
			if(quality==4){color="rgba(69, 195, 54, 0.5)"}
			if(quality==5){color="rgba(51, 96, 207, 0.5)"}
			if(quality==6){color="rgba(165, 44, 205, 0.5)"}
			if(quality>=1){
				$(".items-details>.left").find(".quality").show().text(quality).css("background-color",color);
			}else{
				$(".items-details>.left").find(".quality").hide();
			}
			//物品图片
			$(".items-details>.left").find("img").attr("src",img);

			//收藏图标
			var co = $(this).find(".collect").data("collect");
			if(co=="true"){
				$(".items-details").data("collect","true");
				$(".items-details>.left").find(".collect").find("i").css("background-image","url(images/icon/collect-3.png)");
				$(".items-details>.left").find(".collect").find(".txt").text("已收藏").css("color","rgb(239,90,74)");
				//数组收藏+1
			}else{
				$(".items-details").data("collect","false");
				$(".items-details>.left").find(".collect").find("i").css("background-image","url(images/icon/collect-1.png)");
				$(".items-details>.left").find(".collect").find(".txt").text("收藏").css("color","gray");
			}
			$(".items-details>.left").find(".collect").find(".num").text(collectNum);	//玩家收藏数量
			$(".items-details>.left").find(".image").css("background-image",backImg);	//商品展示框背景图片
			$(".items-details>.bottom").html(desc);		//商品介绍
			//detectNum();
		}
	});
	$(".items-shop").on("mouseenter",".collect",function(){	//收藏商品图标 鼠标移入 特效
		var coll = $(this).data("collect");
		if(coll!="true"){
			$(this).css("background-image","url(images/icon/collect-2.png)");
		}
	});
	$(".items-shop").on("mouseout",".collect",function(){	//收藏商品图标 鼠标移出 特效
		var coll = $(this).data("collect");
		if(coll!="true"){
			$(this).css("background-image","url(images/icon/collect-1.png)");
		}
	});
	$(".items-shop").on("click",".collect",function(){	//收藏商品
		//alert(123)
		openCard = false;	//避免打开商品详情
		var coll = $(this).data("collect");
		var xb = $(this).parents(".items").data("index");
		var id = shop.data[xb].id;
		var qua = shop.data[xb].quality;
		var num = shop.data[xb].num;
		var collnum = shop.data[xb].collect*1;
		if(coll=="true"){	//取消收藏
			$(this).css("background-image","url(images/icon/collect-2.png)");
			$(this).data("collect","false");
			collnum -= 1;
			for(var i=0;i<playerCollects.data.length;i++){
				var cxb = playerCollects.data[i].xb;
				if(cxb==xb){
					playerCollect[playerIndex].splice(i,1);
					arrCollToObj();
					break;
				}
			}
		}else{				//收藏
			$(this).css("background-image","url(images/icon/collect-3.png)");
			$(this).data("collect","true");
			collnum += 1;
			//增加一个数组用于储存玩家收藏的物品
			playerCollect[playerIndex][playerCollect[playerIndex].length] = [id,"品质:"+qua,"数量:"+num];
			arrCollToObj();
		}
		//commodity[xb][3][4] = "玩家收藏量:"+collnum;
		$(".game-items item").eq(xb).find("[name='收藏']").attr("value",collnum);
		shop.data[xb].collect = collnum;
		setTimeout(function(){openCard=true;},100);
	});
	function cardToIcon(){	//将卡片转换为图标
		$(".items-shop>.items>header,.items-shop>.items>footer").hide();	//隐藏头部和脚部
		$(".items-shop>.items>section>div").css("opacity","0");		//隐藏多余元素（仅保留图片）
		$(".items-shop>.items>section>.collect").hide();
		$(".items-shop>.items>section").css({		//调整图片区域的样式
			"height":"100%",
			"transform":"scale(0.8)"
		});
		$(".items-shop>.items").css({	//调整整个卡片的样式
			"width":"13.27%",
			"height":"6.2rem",
			"margin":"0.5%"
		});
	}
	function iconToCard(){	//将图标转换为卡片
		$(".items-shop>.items>header,.items-shop>.items>footer").show();	//显示头部和脚部
		$(".items-shop>.items>section>div").css("opacity","1");		//显示多余元素
		$(".items-shop>.items>section>.collect").show();
		$(".items-shop>.items>section").css({		//调整图片区域的样式
			"height":"60%",
			"transform":"scale(1)"
		});
		$(".items-shop>.items").css({	//调整整个卡片的样式
			"width":"31.3%",
			"height":"10rem",
			"margin":"1%"
		});
	}
	$(".head-tool>.display>li").hover(function(){	//商品显示类型 悬浮特效
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({"opacity":"1"});
		}
	},function(){
		var dc = $(this).data("click");
		if(dc=="false"||dc==undefined){
			$(this).css({"opacity":"0.7"});
		}
	});
	$(".head-tool>.display>.l2").click(function(){	//商品显示类型：图标
		//点击特效
		$(".head-tool>.display>li").css({
			"opacity":"0.7",
			"border-bottom-color":"rgba(255,255,255,0)"
		}).data("click","false");
		$(this).css({
			"opacity":"1",
			"border-bottom-color":"#ff6969"
		}).data("click","true");
		Display = "icon";
		cardToIcon();
	});
	$(".head-tool>.display>.l1").click(function(){	//商品显示类型：卡片
		//点击特效
		$(".head-tool>.display>li").css({
			"opacity":"0.7",
			"border-bottom-color":"rgba(255,255,255,0)"
		}).data("click","false");
		$(this).css({
			"opacity":"1",
			"border-bottom-color":"#ff6969"
		}).data("click","true");
		Display = "card";
		iconToCard();
		setTimeout(function(){
			adaptive();
		},100);

	});
	$(".head-tool>.sort>.s-page").click(function(){		//商品排序方式:展开列表选择排序方式
		$(".head-tool>.sort").css({
			"height":"300%",
			"border-radius":"1rem",
			"border":"1px solid white",
			"box-shadow":"0 0 0.4rem rgb(200,200,200)"
		}).find(".s-page").css("font-weight","bold");
	});
	var ycTime;
	$(".head-tool>.sort").mouseleave(function(){	//隐藏排序选择列表
		ycTime = setTimeout(function(){
			$(".head-tool>.sort").css({
				"height":"50%",
				"border-radius":"2rem",
				"border":"1px solid rgb(180,180,180)",
				"box-shadow":"none"
			}).find(".s-page").css("font-weight","normal");
		},500);
	});
	$(".head-tool>.sort").mouseenter(function(){
		clearTimeout(ycTime);
	});

	$(".head-tool>.sort>li").click(function(){	//排序选择列表 点击特效
		$(".head-tool>.sort>li").css("background-color","inherit");
		$(this).css("background-color","rgb(230,230,230)");
		$(".head-tool>.sort>li").data("click","false");
		$(this).data("click","true");
		var txt = $(this).text();
		$(".head-tool>.sort>.s-page").text(txt);
		$(".head-tool>.sort").css({
			"height":"50%",
			"border-radius":"2rem",
			"border":"1px solid rgb(180,180,180)",
			"box-shadow":"none"
		}).find(".s-page").css("font-weight","normal");
	});
	$(".head-tool>.sort>li").hover(function(){	//排序选择列表 悬浮事件
		var ck = $(this).data("click");
		if(ck=="false"||ck==undefined){
			$(this).css("background-color","rgb(240,240,240)");
		}
	},function(){
		var ck = $(this).data("click");
		if(ck=="false"||ck==undefined){
			$(this).css("background-color","inherit");
		}
	});




});
