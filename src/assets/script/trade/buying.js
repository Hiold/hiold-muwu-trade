//物资求购页面相关js
var itemIcon = '<li class="game-items"><div class="image"><img src="images/alert.png"></div></li>';

function arrGameItemsToObj(){
	for(var i=0;i<gameItems.length;i++){	//遍历玩家商店数组
		//gameItems[i] = {};
		gameItems[i].id = gameItems[i][0];		//物品ID
		gameItems[i].name = gameItems[i][1];		//物品名称
		gameItems[i].image = gameItems[i][2];	//物品图片
		gameItems[i].min = gameItems[i][3].split(":")[1];		//最低价
		gameItems[i].max = gameItems[i][4].split(":")[1];		//最高价
		gameItems[i].desc = gameItems[i][5];		//物品描述
		gameItems[i].unit = "个";	//最低价 单位
		gameItems[i].unit2 = "个";	//最高价 单位
		var img = gameItems[i].image;
		var id = gameItems[i].id;
		var min = gameItems[i].min;
		var max = gameItems[i].max;
		var desc = gameItems[i].desc;
		var unit=unit2 = "个";	//数量单位
		//图标
		//console.log(img)
		if(img==""||img==undefined){	//如果没有设置图片, 用默认图片
			//console.log(img)
			gameItems[i].image = "images/alert.png";
		}else if(img=="auto"){		//如果设置为auto，用ID作为图片名称
			//console.log(img)
			gameItems[i].image = "images/ItemIcons/"+id+".png";
		}
		//最低价
		if(min==""||min==undefined){	//如果没有设置最低价
			min = 1;
		}else{
			unit = min.split("/")[1];
			if(unit==""||unit==undefined){	//如果没有设置单位
				unit = "个";	//默认单位为“个”
			}else{
				min = min.split("/")[0];
			}
		}
		gameItems[i].min = min;
		gameItems[i].unit = unit;
		//最高价
		if(max==""||max==undefined){	//如果没有设置最高价
			max = '无上限';
			unit2 = "+∞";
		}else{
			unit2 = max.split("/")[1];
			if(unit2==""||unit2==undefined){	//如果没有设置单位
				unit2 = "个";	//默认单位为“个”
			}else{
				max = max.split("/")[0];
			}
		}
		gameItems[i].max = max;
		gameItems[i].unit2 = unit2;
		//物品描述（以下方法仅供本地测试使用，实际需从后端获取物品描述内容）
		if(desc=="auto"){	//自动获取描述
			desc = queryItems(true,id+"Desc").name;
			if(desc==id+"Desc"){
				gameItems[i].desc = '<span style="font-size:1em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>'
				//alert(123)
				continue;
			}
			var dcArr = desc.split("\\n");
			//console.log(dcArr)
			var text = "";
			if(dcArr[1]!=""||dcArr[1]!=undefined){
				for(var d in dcArr){
					text = text + (dcArr[d]+"<br>");
				}
				gameItems[i].desc = text;
			}else{
				gameItems[i].desc = '<span style="font-size:1em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>';
			}
		}else if(gameItems[i].desc==""){	//没有填写描述
			gameItems[i].desc = '<span style="font-size:1em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>';
		}
		
	}
}


function GenerateBuyingItems(){	//在物资求购页面生成玩家商店详情页
	$(".buying>.shop>li").remove();	//移除所有物品元素
	for(var i=0;i<gameItems.length;i++){	//遍历玩家商店列表
		$(".buying>.shop").append(itemIcon);
		//下标
		$(".buying>.shop>li:last").attr("data-index",i);
		//图标
		$(".buying>.shop>li:last").find("img").attr("src",gameItems[i].image);
	}
}

$(document).ready(function(){
	gameItems = [
		//["","",".png","最低价:","最高价:",""],
		["decoPumpkinJackOLantern","南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","最低价:30","最高价:500","万圣节装饰物品<br>这是一个普通而可爱（可怕）的南瓜灯，敲碎可以回收。<br>散发着微微的黄色光芒，烘托了一丝温暖的气息。<br>听说周围的僵尸都害怕它，让它作为僵尸在万圣节最好的礼物吧~"],
		["armorSantaHat","圣诞帽","images/ItemIcons/armorSantaHat.png","最低价:100","最高价:2000","圣诞节专属装饰<br>它是一顶红色帽子，据说晚上戴上睡觉除了睡得安稳和有点暖外，第二天你还会发现帽子里多了点心爱的人送的礼物。"],
		["meleeWpnClubT1CandyClub","拐杖糖棍棒","images/ItemIcons/meleeWpnClubT1CandyClub.png","最低价:500","最高价:5555","圣诞专属武器<br>这跟棍棒看起来好像很好吃，就是咬起来有点费牙齿....."],
		["casinoCoin","公爵赌场币","auto","最低价:30/组","最高价:500/组","auto"],
		["drinkJarBoiledWater","开水","auto","最低价:","最高价:100","auto"],
		["drinkJarGrandpasMoonshine","祖父的私酒","auto","最低价:50","最高价:3000","auto"],
		["drinkCanMegaCrush","碾压王","auto","最低价:50","最高价:3000","auto"],
		["foodHoboStew","蔬菜炖肉","auto","最低价:50","最高价:888","auto"],
		["resourceForgedIron","锻铁","auto","最低价:3333/组","最高价:55555/组","auto"],
		["resourceForgedSteel","锻钢","auto","最低价:3333/组","最高价:55555/组","auto"],
		["resourceRockSmall","小石子","auto","最低价:","最高价:","auto"],
		["resourceClayLump","黏土","auto","最低价:","最高价:","auto"],
		["resourceYuccaFibers","植物纤维","auto","最低价:","最高价:","auto"],
		["plantedChrysanthemum1","菊花（种子）","auto","最低价:","最高价:","auto"],
		["resourcePaper","纸","auto","最低价:","最高价:","auto"],
		["resourceGlue","胶水","auto","最低价:","最高价:","auto"],
		["resourceCloth","碎布","auto","最低价:","最高价:","auto"],
		["resourceWood","木头","auto","最低价:","最高价:","auto"],
		["resourcePaint","油漆","auto","最低价:","最高价:","auto"],
		["foodRottingFlesh","腐肉","auto","最低价:","最高价:","auto"],
		["resourceAnimalFat","脂肪","auto","最低价:","最高价:","auto"],
		["ammo762mmBulletBall","7.62毫米弹药","auto","最低价:","最高价:","auto"],
		["ammo9mmBulletBall","9毫米弹药","auto","最低价:","最高价:","auto"],
		["resourceNail","钉子","auto","最低价:","最高价:","auto"],
		["resourceElectricParts","电子零件","auto","最低价:","最高价:","auto"],
		["resourceMechanicalParts","机械零件","auto","最低价:","最高价:","auto"],
		["resourceSpring","弹簧","auto","最低价:","最高价:","auto"],
		["resourceMetalPipe","短铁管","auto","最低价:","最高价:","auto"],
		// ["birdBathPlanter","高脚杯花盆","auto","最低价:","最高价:","auto"],
		["decoPumpkinJackOLantern","南瓜灯","images/ItemIcons/decoPumpkinJackOLantern.png","最低价:30","最高价:500","万圣节装饰物品<br>这是一个普通而可爱（可怕）的南瓜灯，敲碎可以回收。<br>散发着微微的黄色光芒，烘托了一丝温暖的气息。<br>听说周围的僵尸都害怕它，让它作为僵尸在万圣节最好的礼物吧~"],
		["armorSantaHat","圣诞帽","images/ItemIcons/armorSantaHat.png","最低价:100","最高价:2000","圣诞节专属装饰<br>它是一顶红色帽子，据说晚上戴上睡觉除了睡得安稳和有点暖外，第二天你还会发现帽子里多了点心爱的人送的礼物。"],
		["meleeWpnClubT1CandyClub","拐杖糖棍棒","images/ItemIcons/meleeWpnClubT1CandyClub.png","最低价:500","最高价:5555","圣诞专属武器<br>这跟棍棒看起来好像很好吃，就是咬起来有点费牙齿....."],
		["casinoCoin","公爵赌场币","auto","最低价:30/组","最高价:500/组","auto"],
		["drinkJarBoiledWater","开水","auto","最低价:","最高价:100","auto"],
		["drinkJarGrandpasMoonshine","祖父的私酒","auto","最低价:50","最高价:3000","auto"],
		["drinkCanMegaCrush","碾压王","auto","最低价:50","最高价:3000","auto"],
		["foodHoboStew","蔬菜炖肉","auto","最低价:50","最高价:888","auto"],
		["resourceForgedIron","锻铁","auto","最低价:3333/组","最高价:55555/组","auto"],
		["resourceForgedSteel","锻钢","auto","最低价:3333/组","最高价:55555/组","auto"],
		["resourceRockSmall","小石子","auto","最低价:","最高价:","auto"],
		["resourceClayLump","黏土","auto","最低价:","最高价:","auto"],
		["resourceYuccaFibers","植物纤维","auto","最低价:","最高价:","auto"],
		["plantedChrysanthemum1","菊花（种子）","auto","最低价:","最高价:","auto"],
		["resourcePaper","纸","auto","最低价:","最高价:","auto"],
		["resourceGlue","胶水","auto","最低价:","最高价:","auto"],
		["resourceCloth","碎布","auto","最低价:","最高价:","auto"],
		["resourceWood","木头","auto","最低价:","最高价:","auto"],
		["resourcePaint","油漆","auto","最低价:","最高价:","auto"],
		["foodRottingFlesh","腐肉","auto","最低价:","最高价:","auto"],
		["resourceAnimalFat","脂肪","auto","最低价:","最高价:","auto"],
		["ammo762mmBulletBall","7.62毫米弹药","auto","最低价:","最高价:","auto"],
		["ammo9mmBulletBall","9毫米弹药","auto","最低价:","最高价:","auto"],
		["resourceNail","钉子","auto","最低价:","最高价:","auto"],
		["resourceElectricParts","电子零件","auto","最低价:","最高价:","auto"],
		["resourceMechanicalParts","机械零件","auto","最低价:","最高价:","auto"],
		["resourceSpring","弹簧","auto","最低价:","最高价:","auto"],
		["resourceMetalPipe","短铁管","auto","最低价:","最高价:","auto"],
	];
	arrGameItemsToObj();
	
	$(".buying>.shop").on("mouseenter","li",function(){	//鼠标移入显示物品详情
		var xb = $(this).data("index");
		var name = gameItems[xb].name;
		var img = gameItems[xb].image;
		var min = gameItems[xb].min;
		var max = gameItems[xb].max;
		var desc = gameItems[xb].desc;
		var unit = gameItems[xb].unit;
		var unit2 = gameItems[xb].unit2;
		
		$(".buying>.content>.image>img").attr("src",img);
		$(".buying>.content>.name").text(name);
		$(".buying>.content>.foot>.price>.min>.val").html(min+"<span style='color:gray;font-size:0.8em;font-weight:normal;'> / "+unit+"</span>");
		$(".buying>.content>.foot>.price>.max>.val").html(max+"<span style='color:gray;font-size:0.8em;font-weight:normal;'> / "+unit2+"</span>");
		$(".buying>.content>.foot>.desc").html(desc);
	});
	$(".buying>.shop").on("click","li",function(){	//点击选中的物品
		$(".buying>.shop>.blank").fadeIn(100);	//显示求购发布窗口
		$(".buying>.shop").css("overflow-y","hidden");	//隐藏物品列表滚动条
		var top = $(".buying>.shop").scrollTop();
		$(".buying>.shop>.blank").css("top",top+"px");
		
		var xb = $(this).data("index");
		$(".buying>.shop>.blank").data("index",xb);
		var name = gameItems[xb].name;
		var img = gameItems[xb].image;
		//将物品图标和名称渲染到页面
		$(".buying .window>section>header>.head>img").attr("src",img);
		$(".buying .window>section>header>.name").html(name);
		//清空输入框内的内容
		$(".buying .window>section>div>.val>input").val("");
	});
	
	//关闭求购发布窗口
	$(".buying>.shop>.blank>.window>footer>.close").click(function(){
		$(".buying>.shop").css("overflow-y","auto");
		$(".buying>.shop>.blank").fadeOut(50);
	});
	$(".buying>.shop>.blank>.window>header>i").click(function(){
		$(".buying>.shop").css("overflow-y","auto");
		$(".buying>.shop>.blank").fadeOut(50);
	});
	//求购发布确认窗口 增加按钮
	$(".buying .window>section>div>.val>.add").click(function(){
		var num = $(this).prev().val()*1;
		num ++;
		$(this).prev().val(num);
	});
	//求购发布确认窗口 减少按钮
	$(".buying .window>section>div>.val>.reduce").click(function(){
		var num = $(this).next().val()*1;
		num --;
		if(num<=0){		//填入的数字至少为1
			num = 1;
		}
		$(this).next().val(num);
	});
	
	//确认发布求购物品
	$(".buying>.shop>.blank>.window>footer>.confirm").click(function(){
		//获取输入的内容
		var valQua = $(".buying .window>section>.quality>.val>input").val()*1;
		var valNum = $(".buying .window>section>.count>.val>input").val()*1;
		var valPrice = $(".buying .window>section>.price>.val>input").val()*1;
		if(valNum==""){
			Alert("输入的数量不能为空！");
			popupCss(25,13);
			return;
		}
		if(valPrice==""){
			Alert("输入的价格不能为空！");
			popupCss(25,13);
			return;
		}
		if(isNaN(valQua)||isNaN(valNum)||isNaN(valPrice)){
			Alert("输入的内容有误！");
			popupCss(25,13);
			return;
		}
		var point = players.data[playerIndex].points*1;	//获取当前玩家拥有积分
		if(valPrice>point){
			Alert("输入的价格不能大于你拥有的积分！<br>您当前拥有 <font color='orange'>"+point+"</font> 积分");
			popupCss(25,14);
			$(".buying .window>section>.price>.val>input").val(point);
			return;
		}
		
		//以上操作验证无误后，将发布的物品存到个人数组
		var xb = $(".buying>.shop>.blank").data("index");
		var id = gameItems[xb].id;		//物品ID
		var name = gameItems[xb].name;	//物品名称
		var img = gameItems[xb].image;	//物品图片
		//var desc = gameItems[xb].desc;	//物品描述
		playerStore[playerIndex][playerStore[playerIndex].length] = ["交易类型:求购","名称:"+name,"ID:"+id,"数量:"+valNum,"价格:"+valPrice,"品质:"+valQua];
		arrPStoreToObj();
		
		point -= valPrice;	//扣除相应积分
		players.data[playerIndex].points = point;	//保存玩家积分
		playerBasic[playerIndex][2][0] = "积分:"+point;		//保存玩家积分到数组
		$("main>header>.Point>span").text(point);	//将更新的积分渲染到页面
		$(".my-jf>span").text(point);	//同上

		$(".buying>.shop>.blank").fadeOut(50);	//发布成功后 关闭求购窗口
		$(".buying>.shop").css("overflow-y","auto");
		var point = players.data[playerIndex].points;
		var diamond = players.data[playerIndex].diamonds;
		if(valQua==0){
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>求购物品 <b>"+name+"</b> <i>"+valNum+"件</i></span><br><span>求购价格 <font color='orange'><b>"+valPrice+"</b></font> 积分</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
		}else{
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>求购物品 <b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+valQua+")</font> <i>"+valNum+"件</i></span><br><span>求购价格 <font color='orange'><b>"+valPrice+"</b></font> 积分</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
		}
		Alert("发布成功！");
		popupCss(25,13);
		
	});
	
	
	
});