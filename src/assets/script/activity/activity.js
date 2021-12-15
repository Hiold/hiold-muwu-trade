
function GenerateLottery(xb){	//渲染抽奖页面
	//渲染主界面
	//var name = $(".Act-lottery>.read lottery").eq(xb).attr("name");	//活动名称
	var curr = $(".Act-lottery>.read lottery").eq(xb).attr("currency");	//货币类型
	var price = $(".Act-lottery>.read lottery").eq(xb).attr("price");	//单次抽奖价格
	var price10 = $(".Act-lottery>.read lottery").eq(xb).attr("price10");	//十连抽奖价格
	var numDay = $(".Act-lottery>.read lottery").eq(xb).attr("numDay");	//每日剩余可抽奖次数
	if(curr=="积分"){
		$(".Act-lottery>.box>.center>.btn>div .price>i").css("background-image","url(images/icon/jf2.png)");
	}else if(curr=="钻石"){
		$(".Act-lottery>.box>.center>.btn>div .price>i").css("background-image","url(images/icon/red-zs.png)");
	}
	$(".Act-lottery>.box>.center>.btn>.b1 .price>span").text(price);	//单次抽奖价格
	$(".Act-lottery>.box>.center>.btn>.b2 .price>span").text(price10);	//十连抽奖价格
	$(".head-tool>.lottery-num>.val-1").text(numDay);	//今日当前登录玩家剩余可抽奖次数
	$(".head-tool>.lottery-num>.val-2").text(" / "+numDay);	//每日可抽奖次数

	//奖品相关内容
	var len = $(".Act-lottery>.read lottery").eq(xb).find("prize").length;
	var prize = $(".Act-lottery>.read lottery").eq(xb).find("prize");
	var proAll = 0;	//用于保存概率总比值
	//第一次循环先把概率总比值计算出来,以方便后面计算概率百分比并渲染到页面
	for(var i=0;i<len;i++){
		var pro = prize.eq(i).attr("概率")*1;
		if(isNaN(pro)){
			pro = 1;
		}
		proAll += pro;
	}
	//将奖品信息渲染到页面
	for(var i=0;i<len;i++){
		//先获取奖品信息
		var id = prize.eq(i).attr("id");
		var num = prize.eq(i).attr("数量");
		var pro = prize.eq(i).attr("概率")*1;
		var proPer = Math.round(pro/proAll*10000)/100;	//概率(%)
		var xbs = queryShopItems(id);	//查询商店列表中是否有这个物品
		if(xbs>=0){	//如果商店列表中有这个物品
			var name = shop.data[xbs].name;	//获取显示的名称
			var img = shop.data[xbs].image;	//获取物品图标路径
		}else{	//如果商店列表中没有找到这个物品
			var name = queryItems(true,id).name;	//从汉化文件中获取汉化名
			//这一步可能需要从后端获取图片路径，这里暂时用默认图标代替
			var img = "images/alert.png";
		}
		//开始渲染到页面
		$(".Act-lottery>.box .l"+(i+1)).find("header").text(name);	//名称
		$(".Act-lottery>.box .l"+(i+1)).find("section>.image>img").attr("src",img);	//图片
		$(".Act-lottery>.box .l"+(i+1)).find("section>.right>.num").text(num+" 件");	//数量
		$(".Act-lottery>.box .l"+(i+1)).find("section>.right>.pro").text(proPer+"%");	//概率
		if(i>=15){	//页面中最多只可以渲染16件物品，如果数量超出停止渲染
			return;
		}
	}
}

function changeBorColor(){
	var t0 = $(".Act-lottery>.top").find("li").eq(0).css("background-color");
	var t1 = $(".Act-lottery>.top").find("li").eq(1).css("background-color");
	var t2 = $(".Act-lottery>.top").find("li").eq(2).css("background-color");
	var t3 = $(".Act-lottery>.top").find("li").eq(3).css("background-color");
	var t4 = $(".Act-lottery>.top").find("li").eq(4).css("background-color");
	var t5 = $(".Act-lottery>.top").find("li").eq(5).css("background-color");
	//console.log(t0+"---"+t1+"---"+t2+"---"+t3+"---"+t4);
	var b0 = $(".Act-lottery>.bottom").find("li").eq(0).css("background-color");
	var b1 = $(".Act-lottery>.bottom").find("li").eq(1).css("background-color");
	var b2 = $(".Act-lottery>.bottom").find("li").eq(2).css("background-color");
	var b3 = $(".Act-lottery>.bottom").find("li").eq(3).css("background-color");
	var b4 = $(".Act-lottery>.bottom").find("li").eq(4).css("background-color");
	var b5 = $(".Act-lottery>.bottom").find("li").eq(5).css("background-color");
	
	var l0 = $(".Act-lottery>.left").find("li").eq(0).css("background-color");
	var l1 = $(".Act-lottery>.left").find("li").eq(1).css("background-color");
	var l2 = $(".Act-lottery>.left").find("li").eq(2).css("background-color");
	var l3 = $(".Act-lottery>.left").find("li").eq(3).css("background-color");
	
	var r0 = $(".Act-lottery>.right").find("li").eq(0).css("background-color");
	var r1 = $(".Act-lottery>.right").find("li").eq(1).css("background-color");
	var r2 = $(".Act-lottery>.right").find("li").eq(2).css("background-color");
	var r3 = $(".Act-lottery>.right").find("li").eq(3).css("background-color");
	
	
	$(".Act-lottery>.top").find("li").eq(0).css("background-color",l1);
	$(".Act-lottery>.top").find("li").eq(1).css("background-color",t0);
	$(".Act-lottery>.top").find("li").eq(2).css("background-color",t1);
	$(".Act-lottery>.top").find("li").eq(3).css("background-color",t2);
	$(".Act-lottery>.top").find("li").eq(4).css("background-color",t3);
	$(".Act-lottery>.top").find("li").eq(5).css("background-color",t4);
	
	$(".Act-lottery>.right").find("li").eq(0).css("background-color",t4);
	$(".Act-lottery>.right").find("li").eq(1).css("background-color",r0);
	$(".Act-lottery>.right").find("li").eq(2).css("background-color",r1);
	$(".Act-lottery>.right").find("li").eq(3).css("background-color",r2);
	
	$(".Act-lottery>.bottom").find("li").eq(0).css("background-color",b1);
	$(".Act-lottery>.bottom").find("li").eq(1).css("background-color",b2);
	$(".Act-lottery>.bottom").find("li").eq(2).css("background-color",b3);
	$(".Act-lottery>.bottom").find("li").eq(3).css("background-color",b4);
	$(".Act-lottery>.bottom").find("li").eq(4).css("background-color",b5);
	$(".Act-lottery>.bottom").find("li").eq(5).css("background-color",r2);
	
	$(".Act-lottery>.left").find("li").eq(0).css("background-color",l1);
	$(".Act-lottery>.left").find("li").eq(1).css("background-color",l2);
	$(".Act-lottery>.left").find("li").eq(2).css("background-color",l3);
	$(".Act-lottery>.left").find("li").eq(3).css("background-color",b1);
}



$(document).ready(function(){
	//读取抽奖奖励
	$(".Act-lottery>.read").load("Config/lottery.xml",function(){
		//渲染抽奖按钮子分类标题
		var len = $(".Act-lottery>.read lottery").length;
		for(var i=0;i<len;i++){
			var name = $(".Act-lottery>.read lottery").eq(i).attr("name");	//活动名称
			$(".btn-4").before('<li class="b3-t'+i+'"></li>');
			$(".Activity-nav>.b3-t"+i).text(name);
			//$(".head-tool>h1").text(name);
		}
		
		//GenerateLottery(0);	//渲染抽奖页面
	});
	
	//抽奖活动"立即抽奖"按钮，为了节省时间，这里只写了动画特效没写逻辑（太累了T_T）
	var cc = true;	//这个是为了防止在抽奖动画进行中重复点击抽奖
	$(".Act-lottery>.box>.center>.btn>.b1").click(function(){		//抽奖一次
		if(cc){
			cc = false;
			//给边框追加一个动画
			$(".Act-lottery>.top").find("li").eq(0).addClass("topbor");
			$(".Act-lottery>.bottom").find("li").eq(0).addClass("bottombor");
			$(".Act-lottery>.left").find("li").eq(0).addClass("leftbor");
			$(".Act-lottery>.right").find("li").eq(0).addClass("rightbor");
			//changeBorColor();
			kscj = setInterval(function(){	//边框动画特效颜色改变
				changeBorColor();
			},100);
			setTimeout(function(){	//边框动画特效结束后 显示抽中的奖品并发送到仓库
				cc = true;
				clearInterval(kscj);
				$(".Act-lottery>.top").find("li").eq(0).removeClass("topbor");
				$(".Act-lottery>.bottom").find("li").eq(0).removeClass("bottombor");
				$(".Act-lottery>.left").find("li").eq(0).removeClass("leftbor");
				$(".Act-lottery>.right").find("li").eq(0).removeClass("rightbor");
				//这一步需要根据概率进行抽奖
				//。。。。。。
				//
				//假设抽中的是南瓜灯50件
				prizeArr = [
					["南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","数量:50","品质:"]
				];
				Award();	//显示抽中的奖品
				//这里需要把抽中的物品发送至仓库
				//......
			},1300);
		}
	});
	$(".Act-lottery>.box>.center>.btn>.b2").click(function(){		//十连抽
		if(cc){
			cc = false;
			//给边框追加一个动画
			$(".Act-lottery>.top").find("li").eq(0).addClass("topbor");
			$(".Act-lottery>.bottom").find("li").eq(0).addClass("bottombor");
			$(".Act-lottery>.left").find("li").eq(0).addClass("leftbor");
			$(".Act-lottery>.right").find("li").eq(0).addClass("rightbor");
			//changeBorColor();
			kscj = setInterval(function(){	//边框动画特效颜色改变
				changeBorColor();
			},100);
			setTimeout(function(){	//边框动画特效结束后 显示抽中的奖品并发送到仓库
				cc = true;
				clearInterval(kscj);
				$(".Act-lottery>.top").find("li").eq(0).removeClass("topbor");
				$(".Act-lottery>.bottom").find("li").eq(0).removeClass("bottombor");
				$(".Act-lottery>.left").find("li").eq(0).removeClass("leftbor");
				$(".Act-lottery>.right").find("li").eq(0).removeClass("rightbor");
				//这一步需要根据概率进行抽奖
				//。。。。。。
				//
				//假设抽中的是以下10件物品
				prizeArr = [
					["南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","数量:50","品质:"],
					["圣诞帽","images/ItemIcons/armorSantaHat.png","数量:2","品质:5"],
					["拐杖糖棍棒","images/ItemIcons/meleeWpnClubT1CandyClub.png","数量:1","品质:6"],
					["南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","数量:50","品质:"],
					["圣诞帽","images/ItemIcons/armorSantaHat.png","数量:2","品质:5"],
					["拐杖糖棍棒","images/ItemIcons/meleeWpnClubT1CandyClub.png","数量:1","品质:6"],
					["南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","数量:50","品质:"],
					["圣诞帽","images/ItemIcons/armorSantaHat.png","数量:2","品质:5"],
					["拐杖糖棍棒","images/ItemIcons/meleeWpnClubT1CandyClub.png","数量:1","品质:6"],
					["南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","数量:50","品质:"],
				];
				Award();	//显示抽中的奖品
				//这里需要把抽中的物品发送至仓库
				//......
			},1300);	
		}
	});
	
	
	
});