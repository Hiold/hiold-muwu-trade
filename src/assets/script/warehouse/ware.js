wareCard = '<li class="ware-items"><header></header><section><div class="left"><div class="img"><img src=""><div class="quality"></div></div><footer>数量 :<span>1</span>件</footer></div><div class="right"><div class="btn-1">详情</div><div class="btn-2">提取</div><div class="btn-3">丢弃</div></div></section></li>';
var arrClass2;
//将仓库物品渲染到仓库页面
function GenerateWare(type1,type2){
	console.log(getTime().date+"\n正在渲染仓库物品。。。\n（类型："+type1+" - "+type2+"）");
	$(".ware-list>li").remove();	//移除仓库所有物品卡片
	//for(var i in playerWares.data){	//遍历仓库数组
	for(var i=1;i<playerWares.data.length;i++){	//遍历仓库数组
		//console.log(playerWares.data[i]);
		$(".ware-list").append(wareCard);
		//下标
		$(".ware-list>li:last").attr("data-index",i);
		//名称
		var name = deleteBBcode(playerWares.data[i].name);
		$(".ware-list>li:last").find("header").text(name);
		//图片
		$(".ware-list>li:last").find(".left").find("img").attr("src",playerWares.data[i].image);
		//数量
		$(".ware-list>li:last").find("footer").find("span").text(playerWares.data[i].num);
		//品质
		if(playerWares.data[i].quality>=1){
			var color;
			if(playerWares.data[i].quality==1){color="rgba(157, 138, 106, 0.5)"}
			if(playerWares.data[i].quality==2){color="rgba(208, 129, 43, 0.5)"}
			if(playerWares.data[i].quality==3){color="rgba(163, 165, 28, 0.5)"}
			if(playerWares.data[i].quality==4){color="rgba(69, 195, 54, 0.5)"}
			if(playerWares.data[i].quality==5){color="rgba(51, 96, 207, 0.5)"}
			if(playerWares.data[i].quality==6){color="rgba(165, 44, 205, 0.5)"}
			$(".ware-list>li:last").find(".quality").css({
				"display":"block",
				"background-color":color
			}).text(playerWares.data[i].quality);
		}
		//分类查询
		if(playerWares.data[i].class1=="物块模型"||playerWares.data[i].class1=="物品资源"){	//如果物品类型是可发送到背包的物品
			if(type1=="特殊物品"){	//如果当前分区类型不属于物品类型
				$(".ware-list>li:last").remove();	//移除当前商品
			}else{
				if(type2!="全部"){		//如果要生成的商品子分类不是显示全部
					if(playerWares.data[i].class1!=type2){	//如果商品的总分类不等于需要生成的子分类
					 	$(".ware-list>li:last").remove();	//移除当前商品
					}
				}
			}
		}
		if(playerWares.data[i].class1=="特殊商品"){	//如果物品类型是特殊物品（不可以发送到背包）
			$(".ware-list>li:last").find(".right").find(".btn-2").text("使用");
			if(type1=="普通物品"){	//如果当前分区类型不属于物品类型
				$(".ware-list>li:last").remove();	//移除当前商品
			}else{
				if(type2!="全部"){		//如果要生成的商品子分类不是显示全部
					if(playerWares.data[i].class2!=type2){	//如果商品的子分类不等于需要生成的子分类
					 	$(".ware-list>li:last").remove();	//移除当前商品
					}
				}
			}
		}
	}
	//显示方式
	if(Display=="card"){		//如果显示方式为卡片
		$(".head-tool>.display>.l1").click();
	}else if(Display=="icon"){	//如果显示方式为图标
		$(".head-tool>.display>.l2").click();
	}
	//检测物品数量
	var num = $(".ware-list>li").length;
	//console.log(getTime().date+"\n当前分区仓库物品数量:"+num);
	if(num==0){
		$(".warehouse>.ware-list>.empty").show();
		$(".warehouse>.ware-list>.empty").find("span").html("这里空空如也<br>快去商城逛逛吧");
	}else{
		$(".warehouse>.ware-list>.empty").hide();
	}
		console.log(getTime().date+"\n仓库物品渲染成功！（"+num+" 件物品）");
}

function changeWareColor(color){	//改变仓库卡片的颜色
	if(color==1){
		$(".ware-details").css("background-image","url(images/card/beige.jpg)");
		$(".ware-list>.ware-items").css("background-image","url(images/card/beige.jpg)");
		$(".ware-list>.ware-items>section").css("background","linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))");
	}
	if(color==2){
		$(".ware-details").css("background-image","url(images/card/yellow.jpg)");
		$(".ware-list>.ware-items").css("background-image","url(images/card/yellow.jpg)");
		$(".ware-list>.ware-items>section").css("background","linear-gradient(90deg, rgba(255, 229, 168, 0.5), rgba(254, 234, 188, 0.7))");
	}
}

function arrwareToObj(){	//对玩家仓库数组更改储存格式，以方便在js中调用
	playerWares = {};
	var findPlayer = false;		//默认为在数组中没找到当前登录的玩家
	for(var i in playerWare){		//遍历数组
		if(playerWare[i][0][1]==steamID){	//找到当前登录玩家的数组
			findPlayer = true;	//标记为找到玩家
			//console.log(playerWare[i][0][1])
			playerWares.data = playerWare[i];	//将数组储存到对象
			//var len = playerWare[i].length;
			//for(var t=0;t<6;t++){}
			for(var j=1;j<playerWare[i].length;j++){	//遍历仓库商品
			//for(var x in playerWare[i]){
				//var j = x+1;
				playerWares.data[j].name = playerWare[i][j][0][0];					//物品名称
				playerWares.data[j].id = playerWare[i][j][0][1].split(":")[1];		//物品ID
				playerWares.data[j].image = playerWare[i][j][0][2].split(":")[1];	//物品图片
				playerWares.data[j].quality = playerWare[i][j][1][0].split(":")[1];	//品质
				playerWares.data[j].num = playerWare[i][j][1][1].split(":")[1];		//数量
				playerWares.data[j].class1 = playerWare[i][j][2][0].split(":")[1];	//总分类
				playerWares.data[j].class2 = playerWare[i][j][2][1].split(":")[1];	//子分类
				playerWares.data[j].mod = playerWare[i][j][2][2].split(":")[1];		//是否是mod
				playerWares.data[j].desc = playerWare[i][j][3][0];					//物品说明
				//console.log(playerWares.data[j]);
				var xb = queryShopItems(playerWares.data[j].id);	//查询商品列表中是否存在这个物品并获取下标
				if(xb>=0){	//如果找到了相同ID
					//名称校验
					if(playerWares.data[j].name=="auto"){
						playerWares.data[j].name = shop.data[xb].name;
						//var name = queryItems(true,playerWares.data[j].id).name;
						//playerWares.data[j].name = name;
					}else if(playerWares.data[j].name==""){
						playerWares.data[j].name = playerWares.data[j].id;
					}
					
					//图片校验
					if(playerWares.data[j].image=="auto"){
						playerWares.data[j].image = shop.data[xb].image;
					}else if(playerWares.data[j].image==""){
						playerWares.data[j].image = "images/alert.png";
					}
					//品质校验
					if(playerWares.data[j].quality=="auto"){
						playerWares.data[j].quality = shop.data[xb].quality;
					}
					if(isNaN(playerWares.data[j].quality)){
						playerWares.data[j].quality = 0;
					}
					//数量校验
					if(playerWares.data[j].num<=0||isNaN(playerWares.data[j].num)){
						playerWares.data[j].num = 1;	//物品数量最少只能是1
					}
					//总分类校验
					if(playerWares.data[j].class1=="auto"){
						playerWares.data[j].class1 = shop.data[xb].class1;
					}
					//子分类校验
					if(playerWares.data[j].class2=="auto"){
						playerWares.data[j].class2 = shop.data[xb].class2;
					}
					//是否是mod
					if(playerWares.data[j].mod=="auto"){
						playerWares.data[j].mod = shop.data[xb].classMod;
					}
					//物品说明
					if(playerWares.data[j].desc=="auto"){
						playerWares.data[j].desc = shop.data[xb].desc;
					}
				}else{	//如果商品列表中没有找到这个ID
					if(playerWares.data[j].name=="auto"){	//如果设置为自动获取名称
						var name = queryItems(true,playerWares.data[j].id).name;	//从汉化文本中获取汉化名称
						playerWares.data[j].name = name;
						//......
					}
				}
			}
		}
	}
	if(findPlayer==false){	//如果遍历完数组后仍然没有找到登录玩家的数据（说明玩家为首次登录网页商城）
		//自动给玩家创建一个仓库数组（注意：所有玩家相关数组玩家排序必须相同,否则在购买商品时会发生错误,如玩家"小明"在基本数据数组中排在第5位,那么在给小明创建仓库数组的时候小明也必须在第5位）
		//playerWare[playerWare.length] = [[playerName,steamID]];
		playerWare[playerIndex] = [[playerName,steamID]];
		arrwareToObj();
	}
}

function pickUpItems(xb){	//提取仓库物品
	var num = playerWares.data[xb].num*1;	//获取物品数量
	var con;
	if(num==1){	//如果只有一件物品
		Confirm("是否确认要将此物品提取到背包？<br>请确保游戏在线且背包容量充足");
		popupCss(25,14);
		$("#alert>.alert>footer>.confirm").click(function(){
			con = 1;
			extract();
		});
	}else{	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
		Prompt("是否确认要将此物品提取到背包？<br>请确保游戏在线且背包容量充足<br>输入你要提取的数量：",num);
		popupCss(25,18);
		$("#alert>.alert>footer>.confirm").click(function(){
			//alert(123)
			con = $("#alert>.alert>section>input").val()*1;
			if(con==""||con==null){return}
			if(isNaN(con)||con<=0||(con%con!=0)){
				Alert("提取数量必须是 ≥1 的整数！");
				popupCss(25,13);
				return;
			}
			if(con>num){	//如果输入的数量大于拥有的数量
				Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 "+num+" 件物品<br>最多也只能提取 "+num+" 件物品");
				popupCss(25,16);
				return;
			}
			extract();
		});
	}
	//$("#alert>.alert>footer>.confirm").click(function(){
	function extract(){
		//alert(con)
		$("#alert>.alert>section>p").html("");	//清空文本提示内容
		$("#alert").hide();
		console.log("点击了确认");
		//这一步可能需要后端进行验证
		//........
		var suc = true;	//假设这是后端传回来的数据，表示验证成功
		if(suc){
			var name = playerWares.data[xb].name;
			discardItems(xb,con);	//在仓库数组中删除该物品
			Alert("提取成功！<br>物品已发送到您的背包");
			popupCss(25,14);
			$(".ware-details>header>.back").click();	//返回仓库物品列表页面
			var point = players.data[playerIndex].points;
			var diamond = players.data[playerIndex].diamonds;
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>提取物品</span><span><b>"+name+"</b></span><span>"+con+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			return true;
		}else{
			Alert("提取失败！");
			popupCss(25,13);
			return false;
		}
	}
	//});
	// if(con){
	// 	//这一步可能需要后端进行验证
	// 	//........
	// 	var suc = true;	//假设这是后端传回来的数据，表示验证成功
	// 	if(suc){
	// 		var name = playerWares.data[xb].name;
	// 		discardItems(xb,con);	//在仓库数组中删除该物品
	// 		Alert("提取成功！<br>物品已发送到您的背包");
	// 		popupCss(25,14);
	// 		var point = players.data[playerIndex].points;
	// 		var diamond = players.data[playerIndex].diamonds;
	// 		recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>提取物品</span><span><b>"+name+"</b></span><span>"+con+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
	// 		return true;
	// 	}else{
	// 		Alert("提取失败！");
	// 		popupCss(25,13);
	// 		return false;
	// 	}
	// }
	
}

function useItems(xb){		//使用仓库物品
	var xb2;	//物品在商品xml中的下标（礼包抽奖分类会用到）
	var id = playerWares.data[xb].id;		//获取物品ID
	var name = playerWares.data[xb].name;	//获取物品名称
	var type = playerWares.data[xb].class2;	//获取物品所属子分类
	var num = playerWares.data[xb].num*1;	//获取物品数量
	if(type=="货币兑换"){	//如果物品类型为货币兑换
		var use;
		if(num==1){	//如果只有一件物品
			//Confirm("是否确认使用物品？");
			//popupCss(25,14);
			//$("#alert>.alert>footer>.confirm").click(function(){
				use = 1;
				num -= use;		//减去使用的数量
				//alert(num)
				if(id=="积分"){		//如果使用的物品是积分兑换券
					var point = players.data[playerIndex].points*1;	//获取玩家拥有的积分
					point += use;	//给玩家增加对应数量的积分
					playerBasic[playerIndex][2][0] = "积分:"+point;	//将玩家积分保存到数组
					players.data[playerIndex].points = point;	//将玩家积分保存到obj对象
					Alert("恭喜你获得了 <font color='orange'>"+use+"</font> 积分！<br>积分已发送至您的账号");
					popupCss(25,14);
					GeneratePlayer();	//重新在页面渲染玩家数据
				}else if(id=="钻石"){
					var zs = players.data[playerIndex].diamonds*1;	//获取玩家拥有的钻石
					zs += use;	//给玩家增加对应数量的钻石
					playerBasic[playerIndex][2][1] = "钻石:"+zs;	//将玩家钻石保存到数组
					players.data[playerIndex].diamonds = zs;	//将玩家钻石保存到obj对象
					Alert("恭喜你获得了 <span style='color:rgb(249,102,112);'>"+use+"</span> 钻石！<br>钻石已发送至您的账号");
					popupCss(25,14);
					GeneratePlayer();	//重新在页面渲染玩家数据
				}
				var point = players.data[playerIndex].points;
				var diamond = players.data[playerIndex].diamonds;
				
				if(id=="积分"){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:orange;'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else if(id=="钻石"){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:rgb(249,102,112);'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
			//});
		}else{	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
			Prompt("您当前拥有 "+num+" 件物品<br>请输入你要使用的数量：",num);
			popupCss(25,18);
			$("#alert>.alert>footer>.confirm").click(function(){
				//alert(1)
				$("#alert>.alert>section>p").html("");	//清空文本提示内容
				$("#alert").hide();
				var use = $("#alert>.alert>section>input").val()*1;
				//console.log("点击了确认");
				if(use==""){return}
				if(isNaN(use)||use<=0||(use%use!=0)){
					Alert("使用数量必须是 ≥1 的整数！");
					popupCss(25,13);
					return;
				}
				if(use>num){	//如果输入的数量大于拥有的数量
					Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 "+num+" 件物品<br>最多也只能使用 "+num+" 件物品");
					popupCss(25,16);
					return;
				}
				num -= use;		//减去使用的数量
				//alert(num)
				if(id=="积分"){		//如果使用的物品是积分兑换券
					var point = players.data[playerIndex].points*1;	//获取玩家拥有的积分
					point += use;	//给玩家增加对应数量的积分
					playerBasic[playerIndex][2][0] = "积分:"+point;	//将玩家积分保存到数组
					players.data[playerIndex].points = point;	//将玩家积分保存到obj对象
					Alert("恭喜你获得了 <font color='orange'>"+use+"</font> 积分！<br>积分已发送至您的账号");
					popupCss(25,14);
					GeneratePlayer();	//重新在页面渲染玩家数据
				}else if(id=="钻石"){
					var zs = players.data[playerIndex].diamonds*1;	//获取玩家拥有的钻石
					zs += use;	//给玩家增加对应数量的钻石
					playerBasic[playerIndex][2][1] = "钻石:"+zs;	//将玩家钻石保存到数组
					players.data[playerIndex].diamonds = zs;	//将玩家钻石保存到obj对象
					Alert("恭喜你获得了 <span style='color:rgb(249,102,112);'>"+use+"</span> 钻石！<br>钻石已发送至您的账号");
					popupCss(25,14);
					GeneratePlayer();	//重新在页面渲染玩家数据
				}
				
				var point = players.data[playerIndex].points;
				var diamond = players.data[playerIndex].diamonds;
				
				if(id=="积分"){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:orange;'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else if(id=="钻石"){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:rgb(249,102,112);'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
			});
			
		}
		$("#alert>.alert>footer>.confirm").click(function(){
			//alert(2)
			//-------------------------------------------------------------------------------------------------------------------
			playerWare[playerIndex][xb][1][1] = "数量:"+num;
			if(num==0){		//如果使用后数量为0
				playerWare[playerIndex].splice(xb,1);	//给玩家仓库数组删除这个物品
			}
			arrwareToObj();		//给仓库数组更改obj储存格式
			GenerateWare(arrClass1,arrClass2);	//重新渲染仓库页面
			
			$(".ware-details>header>.back").click();	//返回仓库物品列表页面
			if(arrClass1=="特殊物品"){	//如果物品分类为特殊物品，则渲染金黄色的物品卡片
				changeWareColor(2);
			}
			return;
		});
		
		
	}else if(type=="礼包抽奖"){
		var use;
		if(num==1){	//如果只有一件物品，无需弹出输入框
			use = 1;
			uselb();
		}else{	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
			Prompt("您当前拥有 "+num+" 件物品<br>请输入你要使用的数量：",num);
			popupCss(25,18);
			$("#alert>.alert>footer>.confirm").click(function(){
				$("#alert>.alert>section>p").html("");	//清空文本提示内容
				$("#alert,#alert>.alert").hide();
				//console.log("点击了确认");
				use = $("#alert>.alert>section>input").val()*1;
				if(use==""){return}
				if(isNaN(use)||use<=0||(use%use!=0)){
					Alert("使用数量必须是 ≥1 的整数！");
					popupCss(25,13);
					return;
				}
				if(use>num){	//如果输入的数量大于拥有的数量
					Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 "+num+" 件物品<br>最多也只能使用 "+num+" 件物品");
					popupCss(25,16);
					return;
				}
				uselb();
			});
			
		}
		function uselb(){
			num -= use;		//减去使用的数量
			for(var i=0;i<shop.data.length;i++){
				//console.log(i)
				var shopID = shop.data[i].id;
				if(shopID==id){
					xb2 = i
				}
			}
			//var xh = 0;		//获得物品的序号
			//var txt = "恭喜你获得了以下奖品：\n--------------------------------\n";	//用于给玩家提示获得了哪些物品
			prizeArr = [];
			var prizeRandom = shop.data[xb2].prizeNum*1;	//奖品随机抽取次数, 如果为0, 则获取所有奖品
			var probabilityArr = [];	//用来储存所有奖品概率比值的数组
			var probabilityAll = 0;		//概率比值的总和
			for(var j=0;j<shop.data[xb2].prize.length;j++){	//遍历所有奖品
				var priID = shop.data[xb2].prize[j].id;	//奖品ID
				//下一步要找到这个物品的汉化名称，先从汉化文件中寻找，如果汉化文件中没找到，再从商品列表里找，如果都没找到，就只能用这个奖品的ID作为名称发送到仓库
				var priName = queryItems(true,priID).name;	//从汉化文件中获取奖品名称
				var priImg = "images/ItemIcons/"+priID+".png";
				if(priID==priName){	//如果名称和ID一样，说明汉化文件中可能没找到这个物品，物品类型可能为网页特殊物品（不是游戏内的物品）
					//下一步是从商品列表获取这个物品的名称
					for(var z=0;z<shop.data.length;z++){	//遍历商品列表
						var shopID = shop.data[z].id;	//获取商品ID
						var shopName = shop.data[z].name;	//获取商品名称
						if(shopID==priID){		//如果在商品列表中找到了与奖品相同的ID
							findID = true;
							priName = shopName;	//成功获取物品名称
							priImg =  shop.data[z].image;	//获取商品图片
							break;	//结束循环
						}
					}
				}
				var priQua = shop.data[xb2].prize[j].qua*1;	//奖品品质
				var priNum = shop.data[xb2].prize[j].num*1;	//奖品获得数量
				var priPro = shop.data[xb2].prize[j].pro*1;	//奖品抽中概率（随机模式生效）
				probabilityArr[j] = priPro;		//将概率储存到数组
				probabilityAll += priPro;		//记录概率比值总和
				if(isNaN(priQua)){priQua=0}
				if(prizeRandom==0){		//不随机, 获取所有奖品
					for(var k=0;k<use;k++){	//使用了多少个礼包，就获取多少次
						var findItem = false;	//默认为没找到相同物品
						for(var n in playerWare[playerIndex]){	//遍历玩家仓库
							var nameW = playerWares.data[n].name;	//获取数组中物品名称
							var idW = playerWares.data[n].id;		//获取数组中物品ID
							var quaW = playerWares.data[n].quality*1;	//获取数组中物品品质
							var numW = playerWares.data[n].num*1;		//获取数组中物品数量
							if(idW==priID&&nameW==priName&&quaW==priQua){	//如果是相同的物品
								//xh++;	//序号+1
								//txt += (xh+". "+priName+" ----- "+priNum+" 件\n");
								prizeArr[prizeArr.length] = [priName,priImg,"数量:"+priNum,"品质:"+priQua];
								findItem = true;
								numW += priNum;	//直接给相同的物品增加购买的数量，无需再新创建数组
								playerWares.data[n].num = numW;	//保存更新的数量
								playerWare[playerIndex][n][1][1] = "数量:"+numW;
								break;
							}
						}
						if(findItem==false){	//如果遍历完仓库数组后仍然没找到物品，给数组结尾追加数组
							//console.log("品质1:"+quaW+"---品质2:"+priQua);
							//xh++;	//序号+1
							//txt += (xh+". "+priName+" ----- "+priNum+" 件\n");
							prizeArr[prizeArr.length] = [priName,priImg,"数量:"+priNum,"品质:"+priQua];
							playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+priID,"图片:auto"],["品质:"+priQua,"数量:"+priNum],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
							arrwareToObj();		//给仓库数组更改obj储存格式
						}
					}
				}
			}//遍历所有奖品 循环结束
			//console.log(probabilityArr);	//概率比值数组
			//物品抽中的概率 = 概率比值 / 概率比值总和
			if(prizeRandom>0){	//随机抽取指定次数
				var prizeLen = shop.data[xb2].prize.length;	//获取奖品的数量
				//alert(prizeLen)
				//return;
				for(var k=0;k<use;k++){	//玩家选择使用多少个礼包，就抽取多少次
					for(var b=0;b<prizeRandom;b++){	//管理员设置的是多少，那么就抽取多少次
						var ranNum = Math.floor(Math.random()*probabilityAll+1);	//随机抽取（概率比值总和范围内随机抽取一个整数）
						//var ranNum = 10;
						for(var m=0;m<prizeLen;m++){	//遍历奖品
							if(ranNum>probabilityArr[m]){	//如果随机数大于这个奖品的概率比值
								ranNum -= probabilityArr[m];	//说明抽取的不是这个奖品，减掉这个比值，和下一组比值进行比对
								//console.log(ranNum);
							}else{	//如果随机数小于概率比值，说明随机抽取的结果就是这个奖品
								//下面要给玩家追加对应的奖品
								var priID = shop.data[xb2].prize[m].id;	//奖品ID
								//下一步要找到这个物品的汉化名称，先从汉化文件中寻找，如果汉化文件中没找到，再从商品列表里找，如果都没找到，就只能用这个奖品的ID作为名称发送到仓库
								var priName = queryItems(true,priID).name;	//从汉化文件中获取奖品名称
								var priImg = "images/ItemIcons/"+priID+".png";
								if(priID==priName){	//如果名称和ID一样，说明汉化文件中可能没找到这个物品，物品类型可能为网页特殊物品（不是游戏内的物品）
									//下一步是从商品列表获取这个物品的名称
									for(var z=0;z<shop.data.length;z++){	//遍历商品列表
										var shopID = shop.data[z].id;	//获取商品ID
										var shopName = shop.data[z].name;	//获取商品名称
										if(shopID==priID){		//如果在商品列表中找到了与奖品相同的ID
											findID = true;
											priName = shopName;	//成功获取物品名称
											priImg =  shop.data[z].image;	//获取商品图片
											break;	//结束循环
										}
									}
								}
								var priQua = shop.data[xb2].prize[m].qua*1;	//奖品品质
								var priNum = shop.data[xb2].prize[m].num*1;	//奖品获得数量
								
								var findItem = false;	//默认为没找到相同物品
								for(var a in playerWare[playerIndex]){	//遍历玩家仓库
									var nameW = playerWares.data[a].name;	//获取数组中物品名称
									var idW = playerWares.data[a].id;		//获取数组中物品ID
									var quaW = playerWares.data[a].quality*1;	//获取数组中物品品质
									var numW = playerWares.data[a].num*1;		//获取数组中物品数量
									if(idW==priID&&nameW==priName&&quaW==priQua){	//如果是相同的物品
										//xh++;	//序号+1
										//txt += (xh+". "+priName+" ----- "+priNum+" 件\n");
										prizeArr[prizeArr.length] = [priName,priImg,"数量:"+priNum,"品质:"+priQua];
										findItem = true;
										numW += priNum;	//直接给相同的物品增加购买的数量，无需再新创建数组
										playerWares.data[a].num = numW;	//保存更新的数量
										playerWare[playerIndex][a][1][1] = "品质:"+numW;
										break;
									}
								}
								if(findItem==false){	//如果遍历完仓库数组后仍然没找到物品，给数组结尾追加数组
									//console.log("品质1:"+quaW+"---品质2:"+priQua);
									//xh++;	//序号+1
									//txt += (xh+". "+priName+" ----- "+priNum+" 件\n");
									prizeArr[prizeArr.length] = [priName,priImg,"数量:"+priNum,"品质:"+priQua];
									playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+priID,"图片:auto"],["品质:"+priQua,"数量:"+priNum],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
									arrwareToObj();		//给仓库数组更改obj储存格式
								}
								break;
							}
						}
					}
				}
			}
			//txt += "--------------------------------\n奖品已发送至您的仓库"
			setTimeout(function(){
				//alert(txt);
				Award();
			},200);
			
			//popupCss(30,20,1.1);
			
			
			//------------------------------------------------------------------------------------------
			playerWare[playerIndex][xb][1][1] = "数量:"+num;
			if(num==0){		//如果使用后数量为0
				playerWare[playerIndex].splice(xb,1);	//给玩家仓库数组删除这个物品
			}
			arrwareToObj();		//给仓库数组更改obj储存格式
			GenerateWare(arrClass1,arrClass2);	//重新渲染仓库页面
			
			var point = players.data[playerIndex].points;
			var diamond = players.data[playerIndex].diamonds;
			
			if(id=="积分"){
				recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:orange;'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			}else if(id=="钻石"){
				recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:rgb(249,102,112);'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				//$(".order-record>section>li:last>span:nth-of-type(2)").css("color","rgb(249,102,112)");
			}else{
				recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>使用物品</span><span><b style='color:gray;'>"+name+"</b></span><span>"+use+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			}
			
			$(".ware-details>header>.back").click();	//返回仓库物品列表页面
			if(arrClass1=="特殊物品"){	//如果物品分类为特殊物品，则渲染金黄色的物品卡片
				changeWareColor(2);
			}
		}
		
	}else if(type=="专属服务"){
		Alert("专属服务可能需要在游戏内与服务器管理员进行互动<br>请联系服务器管理员使用此物品<br>若是已经使用过，请丢弃此物品");
		popupCss(32,16,1.1);
		return;
	}else if(type=="抵用券"){
		Confirm("抵用券需要在商城购买商品时使用<br>是否立即前往？");
		popupCss(25,14);
		$("#alert>.alert>footer>.confirm").click(function(){
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			$(".Main-menu>.menu-1").click();
		});
		return;
	}else{
		if(id=="补签卡"){
			Alert("此物品需要在签到页面中使用");
			popupCss(25,13);
		}else{
			Alert("该物品没有明确分类，可能为公告说明类提示信息<br>若有疑问请联系服务器管理员进行使用");
			popupCss(32,14,1.1);
		}
		return;
	}
	//playerWares.data[xb].num = num;		
	//alert(num)
	
}

function discardItems(xb,c){	//删除丢弃仓库物品
	if(xb=="all"){	//删除所有（不包含特殊商品）
		var remove = false;	//默认状态为没有删除物品
		for(var i=1;i<playerWare[playerIndex].length;i++){
			var class1 = playerWares.data[i].class1;
			if(c=="全部"){
				if(class1!="特殊商品"){
					playerWare[playerIndex].splice(i,1);
					i--;
					remove = true;
				}
			}else{
				if(class1==c){
					playerWare[playerIndex].splice(i,1);
					i--;
					remove = true;
				}
			}
			
		 }
		 if(!remove){	//如果遍历完数组仍然没有删除任何物品（表示普通物品分类是空的，没有任何可删除的东西）
			 return false;
		 }else{		//删除成功
			 arrwareToObj();		//将更新的数组重新转换obj格式
			 GenerateWare(arrClass1,arrClass2);	//重新渲染仓库
			 var point = players.data[playerIndex].points;
			 var diamond = players.data[playerIndex].diamonds;
			 recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>提取物品</span><span><b>仓库所有</b></span><span>"+c+" 分类</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			 return true;
		 }
		
	}else if(xb>0){	//删除指定下标
		var name = playerWares.data[xb].name;	//获取物品名称
		var num = playerWares.data[xb].num*1;	//获取物品数量
		//console.log(name)
		//console.log(num)
		if(num==1){	//如果只有一件物品，无需弹出输入框
			c = 1;
		}else{	//如果物品数量拥有一件以上，弹出输入框让玩家选择使用多少件
			//c = prompt("您当前拥有 "+num+" 件物品\n请输入你要丢弃的数量：",num)*1;
			if(c==""){return}
			if(isNaN(c)||c<=0||(c%c!=0)){
				Alert("丢弃数量必须是 ≥1 的整数！");
				popupCss(25,13);
				return;
			}
			if(c>num){	//如果输入的数量大于拥有的数量
				Alert("输入的数量不能大于拥有的数量！<br>您当前拥有 "+num+" 件物品<br>最多也只能丢弃 "+num+" 件物品");
				popupCss(25,16);
				return;
			}
		}
		num -= c;		//减去使用的数量
		playerWare[playerIndex][xb][1][1] = "数量:"+num;
		if(num==0){		//如果使用后数量为0
			playerWare[playerIndex].splice(xb,1);	//删除仓库数组中对应下标物品
		}
		arrwareToObj();		//将更新的数组重新转换obj格式
		GenerateWare(arrClass1,arrClass2);	//重新渲染仓库
		//console.log(playerWares.data[16].name)
		
		return {"name":name,"num":c}
		//recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>丢弃物品</span><span><b>"+name+"</b></span><span>"+c+" 件</span>";
	}
	
}

function searchItems(){	//搜索仓库物品: 当输入框获内容改变时，只显示搜索的物品（无视英文字母大小写）
		$(".ware-items").show();	//先默认让所有隐藏元素显示
		var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
		var find = false;	//默认为没找到物品
		for(var i=0;i<$(".ware-items").length;i++){	//遍历当前页面显示的物品
			var xb = $(".ware-items").eq(i).data("index");	//获取每个物品在数组中的下标
			//var name = $(".items-shop>.items").eq(i).find("header").find(".name").text();
			var name = playerWares.data[xb].name.toLowerCase();	//获取物品名称
			var id = playerWares.data[xb].id.toLowerCase();		//获取物品ID
			if(name.indexOf(txt) != -1||id.indexOf(txt) != -1){	//如果物品名称或ID中包含了你需要搜索的字符串
				find = true;
				$(".warehouse>.ware-list>.empty").hide();
			}else{
				$(".ware-items").eq(i).hide();
			}
		}
		if(!find){	//如果遍历完数组后，仍然没找到要搜索的物品
			//console.log("没找到搜索的物品");
			$(".warehouse>.ware-list>.empty").show();
			$(".warehouse>.ware-list>.empty").find("span").html("没有找到你想<br>搜索的物品");
		}
	}

$(document).ready(function(){
	function cardToIcon(){	//将卡片转换为图标
		$(".ware-items>header,.ware-items>section>.right,.ware-items>section>.left>footer").hide();	//隐藏头部、脚部 和 侧面
		$(".ware-items>section>.left>.img>.quality").css("opacity","0");		//隐藏品质（仅保留图片）
		$(".ware-items>section").css({				//调整图片父元素容器1的样式
			"height":"100%",
			"transform":"scale(0.8)"
		});
		$(".ware-items>section>.left").css({		//调整图片父元素容器2的样式
			"width":"100%"
		});
		$(".ware-items>section>.left>.img").css({		//调整图片区域的样式
			"height":"100%",
			"transform":"scale(0.9)",
			"padding-left":"0"
		});
		$(".ware-items").css({	//调整整个卡片的样式
			"width":"18%",
			"height":"5.5rem",
			"margin":"1%"
		});
	}
	function iconToCard(){	//将图标转换为卡片
		$(".ware-items>header,.ware-items>section>.right,.ware-items>section>.left>footer").show();	//隐藏头部、脚部 和 侧面
		$(".ware-items>section>.left>.img>.quality").css("opacity","1");		//隐藏品质（仅保留图片）
		$(".ware-items>section").css({				//调整图片父元素容器的样式
			"height":"78%",
			"transform":"scale(1)"
		});
		$(".ware-items>section>.left").css({		//调整图片父元素容器的样式
			"width":"70%"
		});
		$(".ware-items>section>.left>.img").css({		//调整图片区域的样式
			"height":"78%",
			"transform":"scale(1)",
			"padding-left":"1rem"
		});
		$(".ware-items").css({	//调整整个卡片的样式
			"width":"48%",
			"height":"9rem",
			"margin":"1%"
		});
	}
	$(".head-tool>.display>.l2").click(function(){	//物品显示类型：图标
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
	$(".head-tool>.display>.l1").click(function(){	//物品显示类型：卡片
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
		adaptive();
	});
	$(".head-tool>.display>li").hover(function(){	//物品显示类型 悬浮特效
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
	
	$(".ware-list").on("click",".ware-items .left",function(){	//仓库卡片-点击图片打开详情页
		$(this).parents(".ware-items").find(".btn-1").click();
	});
	$(".ware-list").on("click",".ware-items .btn-1",function(){	//仓库卡片-详情
		var xb = $(this).parents(".ware-items").data("index");	//获取物品在数组中的下标
		$(".ware-list").hide();		//隐藏仓库物品列表
		$(".ware-details").fadeIn(100);	//显示仓库物品详情页面
		adaptive();	//自适应布局
		$(".ware-details").data("index",xb);	//将物品下标保存到详情页面
		var name = playerWares.data[xb].name;	//获取物品名称
		var img = playerWares.data[xb].image;	//获取物品图片
		var c1 = playerWares.data[xb].class1;	//获取物品总分类
		var c2 = playerWares.data[xb].class2;	//获取物品子分类
		var c3 = playerWares.data[xb].mod;		//获取物品是否为mod
		var num = playerWares.data[xb].num;		//获取物品拥有数量
		var qua = playerWares.data[xb].quality;	//获取物品品质
		var desc = playerWares.data[xb].desc;	//获取物品介绍
		//将物品信息渲染到页面
		$(".ware-details>header>.name").text(name);	//名称
		$(".ware-details>section>.left>.img>img").attr("src",img);//图片
		$(".ware-details>section>.left>header>.c1").text(c1);	//总分类
		$(".ware-details>section>.left>header>.c2").text(c2);	//子分类
		if(c1=="特殊商品"){
			$(".ware-details>section>.left>header>.c3").show().text("网页专属");	//mod
			$(".ware-details>section>.right>.btn-1").text("使用物品");
		}else{
			$(".ware-details>section>.right>.btn-1").text("提取物品");
		}
		if(c3=="true"){
			$(".ware-details>section>.left>header>.c3").show().text("Mod物品");	//mod
		}
		if(c1!="特殊商品"&&c3!="true"){
			$(".ware-details>section>.left>header>.c3").hide();
		}
		
		$(".ware-details>section>.left>footer>.num>span").text(num);	//数量
		if(qua>0){	//品质
			$(".ware-details>section>.left>footer>.quality").show().find("span").text(qua);
		}else{
			$(".ware-details>section>.left>footer>.quality").hide();
		}
		$(".ware-details>footer>.desc").html(desc);	//介绍说明
	});
	$(".ware-list").on("click",".ware-items .btn-2",function(){	//仓库卡片-提取/使用
		var xb = $(this).parents(".ware-items").data("index");	//获取物品在数组中的下标
		var txt = $(this).text();	//获取按钮文本内容，有“提取”和“使用”两种情况
		if(txt=="提取"){
			pickUpItems(xb);	//调用提取函数
		}else if(txt=="使用"){
			//alert("功能正在制作中。。。");
			//var xb = $(this).parents(".ware-items").data("index");	//获取物品在仓库数组中的下标
			useItems(xb);	//调用使用物品函数
		}
	});
	$(".ware-list").on("click",".ware-items .btn-3",function(){	//仓库卡片-丢弃
		var xb = $(this).parents(".ware-items").data("index");
		var num = playerWares.data[xb].num*1;	//获取物品数量
		var con;
		if(num==1){
			Confirm("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").click(function(){
				con=1;
			});
			//if(con){con=1}
		}else{
			Prompt("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿<br>请输入你要丢弃的数量：",num);
			popupCss(25,18);
			$("#alert>.alert>footer>.confirm").click(function(){
				con = $("#alert>.alert>section>input").val()*1;
			});
		}
		$("#alert>.alert>footer>.confirm").click(function(){
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			
			var dis = discardItems(xb,con);
			var dName = dis.name;
			var dNum = dis.num;
			var point = players.data[playerIndex].points;
			var diamond = players.data[playerIndex].diamonds;
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>丢弃物品</span><span><b>"+dName+"</b></span><span>"+dNum+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			if(arrClass1=="特殊物品"){
				changeWareColor(2);
			}
			
		});
		if(con){
			var dis = discardItems(xb,con);
			var dName = dis.name;
			var dNum = dis.num;
			var point = players.data[playerIndex].points;
			var diamond = players.data[playerIndex].diamonds;
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>丢弃物品</span><span><b>"+dName+"</b></span><span>"+dNum+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
			if(arrClass1=="特殊物品"){
				changeWareColor(2);
			}
			//$("body>.other").load("script/player-ware.js",function(){
				// var arrW = playerWare;
				// var txt1 = $(".other").text().split("//head")[0];
				// var txt2 = $(".other").text().split("//head")[1].split("//foot")[0];
				// var txt3 = $(".other").text().split("//head")[1].split("//foot")[1];
				// var txtn = txt1 + playerWare + txt3;
				// console.log(txtn)
				// var file = new File([txtn], "player-ware.js", {type: "text/plain;charset=utf-8"});
				// saveAs(file);
			//});
		}
	});
	
	$(".ware-details>section>.right>.btn-1").click(function(){	//仓库物品详情页-提取/使用
		var xb = $(this).parents(".ware-details").data("index");	//获取物品在数组中的下标
		var txt = $(this).text();	//获取按钮文本内容，有“提取物品”和“使用物品”两种情况
		if(txt=="提取物品"){
			var suc = pickUpItems(xb);	//调用提取函数
			if(suc){	//如果函数返回true则表示提取成功
				$(".ware-list").fadeIn(200);	//显示仓库物品列表
				$(".ware-details").hide();		//隐藏物品详情页
			}
			
		}else if(txt=="使用物品"){
			//var xb = $(this).parents(".ware-details").data("index");	//获取物品在仓库数组中的下标
			useItems(xb);	//调用使用物品函数
			//$(".ware-details>header>.back").click();	//返回仓库物品列表页面
		}
	});
	$(".ware-details>section>.right>.btn-2").click(function(){	//仓库物品详情页-出售物品
		var xb = $(this).parents(".ware-details").data("index");	//获取物品在数组中的下标
		// Confirm("商品将会放在交易中心进行出售<br>如果有玩家购买你的商品你将会获得奖励<br>是否确认出售？");
		// popupCss(28,16);
		// $("#alert>.alert>footer>.confirm").click(function(){
		// 	$("#alert>.alert>section>p").html("");	//清空文本提示内容
		// 	$("#alert").hide();
		// });
		$("#alert,#alert>.window").show();	//显示出售物品的确认框
		$("#alert>.window").data("index",xb);
		var name = playerWares.data[xb].name;	//名称
		var img = playerWares.data[xb].image;	//图标
		var num = playerWares.data[xb].num;		//数量
		var qua = playerWares.data[xb].quality;	//品质
		if(qua==""||qua==undefined||qua==0){
			$("#alert>.window>section>header>.msg>.quality").hide();
		}else{
			$("#alert>.window>section>header>.msg>.quality").show();
		}
		//alert(qua)
		//将物品数据渲染到页面
		$("#alert>.window>section>header>.head>img").attr("src",img);	//图标
		$("#alert>.window>section>header>.msg>.name").html(name);		//名称
		$("#alert>.window>section>header>.msg>.num").text("x"+num);		//数量
		$("#alert>.window>section>header>.msg>.quality").text("品质："+qua);	//品质
		$("#alert>.window>section>div>.val>input").val("");		//清空输入框
		
	});
	$(".ware-details>section>.right>.btn-3").click(function(){	//仓库物品详情页-配方制作
		var xb = $(this).parents(".ware-details").data("index");	//获取物品在数组中的下标
		var id = playerWares.data[xb].id;	//获取物品ID
		var name = playerWares.data[xb].name;	//获取物品名称
		//加载页面
		console.log(getTime().date+"\n正在加载页面 - 工作台 ......");
		$("body>.data-recipe").load("Config/recipes.xml",function(){	//先加载配方
			console.log(getTime().date+"\n物品配方加载成功！");
			$("main>article").load("page/work.html",function(){		//再加载工作台页面
				$(".head-tool,.workbench>aside,.work-page").hide();
				//GenerateRecipe(id);
				console.log(getTime().date+"\n工作台 页面加载成功！");
				setTimeout(function(){
					$(".workbench>aside").fadeIn(200);
					$(".work-page").fadeIn(200);
					$(".head-tool").fadeIn(50);
					setTimeout(function(){adaptive();},20);
					GenerateRecipe(id);		//生成物品基本信息
					$(".citems-search>input").val(name);	//输入物品名称
					searchItems();	//搜索这个物品
					$(".citems-search>.search-type>.t2").click();	//搜索类型为配方
				},10);
			});
		});
		
		
		
	});
	$(".ware-details>section>.right>.btn-4").click(function(){	//仓库物品详情页-丢弃物品
		var xb = $(this).parents(".ware-details").data("index");	//获取物品在数组中的下标
		var num = playerWares.data[xb].num*1;	//获取物品数量
		var con;
		if(num==1){
			Confirm("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").click(function(){
				con = 1;
			});
		}else{
			Prompt("是否要丢弃此物品？<br>物品丢弃后不会有任何补偿<br>请输入你要丢弃的数量：",num);
			popupCss(25,18);
			$("#alert>.alert>footer>.confirm").click(function(){
				con = $("#alert>.alert>section>input").val()*1;
			});
		}
		$("#alert>.alert>footer>.confirm").click(function(){
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			
			discardItems(xb,con);	//调用删除物品函数
			if(arrClass1=="特殊物品"){
				changeWareColor(2);
			}
			$(".ware-list").fadeIn(200);	//显示仓库物品列表
			$(".ware-details").hide();		//隐藏物品详情页
		});
		// if(con){
		// 	discardItems(xb,con);	//调用删除物品函数
		// 	if(arrClass1=="特殊物品"){
		// 		changeWareColor(2);
		// 	}
		// 	$(".ware-list").fadeIn(200);	//显示仓库物品列表
		// 	$(".ware-details").hide();		//隐藏物品详情页
		// }
	});
	$(".ware-details>header>.back").click(function(){			//仓库物品详情页-返回按钮
		$(".ware-list").fadeIn(200);
		$(".ware-details").hide();
	});
	
	$(".warehouse>.menu>.l1").click(function(){		//彩色按钮 - 提取到背包
		Confirm("是否将当前分类下所有物品提取到背包？<br>您选中提取的分类是 : <font color='orangered'>"+arrClass2+"</font><br>请确保背包容量充足");
		popupCss(28,16);
		$("#alert>.alert>footer>.confirm").click(function(){
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			//console.log("点击了确认");
			//这一步可能需要后端验证
			//.....
			var suc = true;	//假设这是后端传回来的数据，表示验证成功
			if(suc){
				var fn = discardItems("all",arrClass2);	//删除指定分类的所有物品
				if(fn){
					Alert("提取成功！<br>物品已发送到您的背包");
					popupCss(25,14);
				}else if(!fn){
					Alert("仓库没有任何可提取的东西！");
					popupCss(25,13);
				}
			}else{
				Alert("提取失败！");
				popupCss(25,13);
			}
		});
	});
	$(".warehouse>.menu>.l1-replace").click(function(){	//彩色按钮 - 储存到仓库
		var page = $(".terr-shop").data("page");
		var xb = $(".page-items").data("index");	//获取箱子下标
		if(page=="box"){
			Alert("请选择一个箱子");
			popupCss(25,13);
			return;
		}
		if(playerBox[playerIndex][xb].length==1){
			Alert("箱子里是空的，没有可以储存的物品！");
			popupCss(28,13);
			return;
		}
		Confirm("你的箱子里有 "+(playerBox[playerIndex][xb].length-1)+" 件物品<br>是否确认把箱子内所有物品储存到仓库？");
		popupCss(28,15);
		$("#alert>.alert>footer>.confirm").click(function(){
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			//console.log("点击了确认");
			for(var i=1;i<playerBox[playerIndex][xb].length;i++){	//遍历箱子内所有物品
				//获取箱子内物品的数据
				var name = playerBoxs.data[xb][i].itemName;		//名称
				var id = playerBoxs.data[xb][i].itemId;			//ID
				var img = playerBoxs.data[xb][i].itemImage;		//图片
				var num = playerBoxs.data[xb][i].itemNum*1;		//数量
				var qua = playerBoxs.data[xb][i].itemQuality;	//品质
				//下面的代码是给仓库增加储存的物品
				var findItem = false;	//默认为没找到相同物品
				//var len = playerWare[playerIndex].length;
				//for(var j=0;j<len;j++){	//遍历玩家仓库
				for(var j in playerWare[playerIndex]){	//遍历玩家仓库
					var nameW = playerWares.data[j].name;	//获取数组中物品名称
					var idW = playerWares.data[j].id;		//获取数组中物品ID
					var quaW = playerWares.data[j].quality*1;	//获取数组中物品品质
					var numW = playerWares.data[j].num*1;		//获取数组中物品数量
					if(nameW==name&&idW==id&&quaW==qua){	//如果是相同的物品
						findItem = true;
						numW += num;	//直接给相同的物品增加储存的数量，无需再新创建数组
						playerWares.data[j].num = numW;	//保存更新的数量
						playerWare[playerIndex][j][1][1] = "品质:"+numW;
					}
					// if(name=="公爵赌场币"){
					// 	console.log("---仓库名称:"+nameW+"---箱子名称:"+name+"---仓库ID:"+idW+"---箱子ID:"+id+"---仓库品质:"+quaW+"---箱子品质:"+qua);
					// }
				}
				if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
					playerWare[playerIndex][playerWare[playerIndex].length] = [[name,"ID:"+id,"图片:"+img],["品质:"+qua,"数量:"+num],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
					arrwareToObj();
				}
				playerBox[playerIndex][xb].splice(playerBox[playerIndex][xb][i],1);		//清空箱子数组
				i--;
			}
			//arrboxToObj();
			GenerateBoxItems(xb);	//重新渲染箱子内物品
			arrwareToObj();		//给仓库数组转换储存格式
			GenerateWare(arrClass1,arrClass2);	//重新渲染仓库物品到页面
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>储存物品</span><span><b>"+xb+"号箱子</b></span><span>所有物品</span>";
			Alert("储存成功！");
			popupCss(25,13);
		});
		// if(con){
			
		// }
	});
	$(".warehouse>.menu>.l2").click(function(){		//彩色按钮 - 领地箱子
		$(".ware-list,.ware-details,.order-record").hide();	//隐藏其它不相关页面
		
		$(".terr-shop").fadeIn(200);			//显示领地箱子页面
		$(".warehouse>.menu>.l1").hide();	//隐藏 提取到背包 按钮
		$(".warehouse>.menu>.l1-replace").show();	//显示 储存到仓库 按钮
		$(".Category-ware>.shield").show();	//禁止点击左侧分类导航栏
		//$(".Category-ware").css("width","0px");
		//$("main>article>section").css("width","95%");
		GenerateBox();	//渲染玩家领地箱子到页面
		adaptive();	//自适应布局
	});
	$(".warehouse>.menu>.l3").click(function(){		//彩色按钮 - 收藏夹
		console.log(getTime().date+"\n加载页面 - 我的收藏 ......");
		$("main>article").load("page/collect.html",function(){
			$(".head-tool,.collect-shop,.Collect-ware").hide();
			console.log(getTime().date+"\n我的收藏 页面加载成功！");
			//GenerateColl();
		});
		setTimeout(function(){
			$(".collect-shop").fadeIn(200);
			$(".head-tool").fadeIn(50);
			$(".Collect-ware").fadeIn(50);
			//GenerateColl("全部");	//渲染收藏列表到页面
			setTimeout(function(){$(".Collect-ware>.btn-1").click();},100);
			adaptive();	//调整样式
		},100);
	});
	$(".warehouse>.menu>.l4").click(function(){		//彩色按钮 - 工作台
		console.log(getTime().date+"\n正在加载页面 - 工作台 ......");
		//$("body>.data-recipe").load("Config/recipes.xml",function(){	//先加载配方
			//console.log(getTime().date+"\n物品配方加载成功！");
			$("main>article").load("page/work.html",function(){		//加载工作台页面
				$(".head-tool,.workbench>aside,.work-page").hide();
				console.log(getTime().date+"\n工作台 页面加载成功！");
				setTimeout(function(){
					$(".workbench>aside").fadeIn(200);
					$(".work-page").fadeIn(200);
					$(".head-tool").fadeIn(50);
					setTimeout(function(){adaptive();},20);
					
				},10);
			});
		//});
		
	});
	$(".warehouse>.menu>.l5").click(function(){		//彩色按钮 - 订单记录
		//alert(123)
		$(".ware-list,.ware-details,.terr-shop").hide();	//隐藏其它不相关页面
		$(".order-record").fadeIn(200);			//显示领地箱子页面
		$(".warehouse>.menu>.l1,.warehouse>.menu>.l1-replace").hide();	//隐藏 提取到背包/储存到仓库 按钮
		$(".Category-ware>.shield").show();	//禁止点击左侧分类导航栏
		//console.log(recordConsole[playerIndex])
		GenerateOrder();	//渲染订单详情列表
	});
	
	//关闭出售物品窗口
	$("#alert>.window>footer>.close").click(function(){
		$("#alert,#alert>.window").fadeOut(50);
	});
	$("#alert>.window>header>i").click(function(){
		$("#alert,#alert>.window").fadeOut(50);
	});
	//出售物品窗口 增加按钮
	$("#alert>.window>section>div>.val>.add").unbind("click");
	$("#alert>.window>section>div>.val>.add").click(function(){
		var num = $(this).prev().val()*1;
		num ++;
		$(this).prev().val(num);
	});
	//出售物品窗口 减少按钮
	$("#alert>.window>section>div>.val>.reduce").unbind("click");
	$("#alert>.window>section>div>.val>.reduce").click(function(){
		var num = $(this).next().val()*1;
		num --;
		if(num<=0){		//填入的数字至少为1
			num = 1;
		}
		$(this).next().val(num);
	});
	//确认出售物品
	$("#alert>.window>footer>.confirm").unbind("click");
	$("#alert>.window>footer>.confirm").click(function(){
		var xb = $("#alert>.window").data("index");	//获取物品在仓库数组中的下标
		var have = playerWares.data[xb].num*1;	//获取物品拥有数量
		//获取输入的内容
		var valNum = $("#alert>.window>section>.count>.val>input").val()*1;
		var valPrice = $("#alert>.window>section>.price>.val>input").val()*1;
		if(valNum==""){
			alert("输入的数量不能为空！");
			//popupCss(25,13);
			return;
		}else if(valNum>have){
			alert("出售的数量不能大于拥有的数量！\n您当前拥有 "+have+" 件");
			$("#alert>.window>section>.count>.val>input").val(have);
			return;
		}
		if(valPrice==""){
			alert("输入的价格不能为空！");
			//popupCss(25,13);
			return;
		}
		if(isNaN(valNum)||isNaN(valPrice)){
			alert("输入的内容有误！");
			//popupCss(25,13);
			return;
		}
		//以上操作验证无误后，进行出售操作
		var id = playerWares.data[xb].id;
		var name = playerWares.data[xb].name;
		var qua = playerWares.data[xb].quality;
		//给个人商店数组添加出售的物品
		playerStore[playerIndex][playerStore[playerIndex].length] = ["交易类型:出售","名称:"+name,"ID:"+id,"数量:"+valNum,"价格:"+valPrice,"品质:"+qua];
		//arrPStoreToObj();
		
		//alert(xb)
		var num = have - valNum;	//计算出售后仓库剩余的数量
		playerWare[playerIndex][xb][1][1] = "数量:"+num;
		if(num==0){		//如果使用后数量为0
			playerWare[playerIndex].splice(xb,1);	//删除仓库数组中对应下标物品
		}
		arrwareToObj();		//将更新的数组重新转换obj格式
		GenerateWare(arrClass1,arrClass2);	//重新渲染仓库
		$("#alert,#alert>.window").hide();
		$(".warehouse>.ware-details").hide();
		$(".warehouse>.ware-list").show();
		var point = players.data[playerIndex].points;
		var diamond = players.data[playerIndex].diamonds;
		if(qua==0){
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>出售物品 <b>"+name+"</b> <i>"+valNum+"件</i></span><br><span>出售价格 <font color='orange'><b>"+valPrice+"</b></font> 积分</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
		}else{
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>出售物品 <b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+qua+")</font> <i>"+valNum+"件</i></span><br><span>出售价格 <font color='orange'><b>"+valPrice+"</b></font> 积分</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
		}
		
		Alert("出售成功！<br>可前往交易中心页面<br>查询您出售的物品");
		popupCss(22,15);
	});
	
	
});