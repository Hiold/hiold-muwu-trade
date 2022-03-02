boxCard = '<li class="player-box"><header>安全储物箱</header><section><img src="images/items/cntChest01.png"></section><footer><div class="num">编号： <span>00</span></div><div class="locked">状态： <span style="color:green;">未锁定</span> <i style="background-image: url(images/icon/lock-2.png);"></i></div><div class="coor">坐标： <i>0,0,0</i></div><div class="owner">归属： <span>未知玩家</span></div></footer></li>';
boxItemsCard = '<li class="box-items"><div class="filter"><img src=""></div><div class="num"></div></li>';
//将仓库领地箱子渲染到页面
function GenerateBox(){
	$(".page-box>li").remove();	//移除仓库所有箱子卡片
	for(var i=1;i<playerBoxs.data.length;i++){	//遍历箱子数组
		$(".terr-box>section>.page-box").append(boxCard);
		//下标
		$(".page-box>li:last").data("index",i);
		//名称
		$(".page-box>li:last").find("header").text(playerBoxs.data[i].boxName);
		//图片
		$(".page-box>li:last").find("img").attr("src",playerBoxs.data[i].boxImage);
		//编号
		var num = i;
		if(i<10){num="0"+i}
		$(".page-box>li:last").find(".num").find("span").text(num);
		//锁定状态
		if(playerBoxs.data[i].boxLock=="true"){	//已锁定
			if(playerBoxs.data[i].password==""||playerBoxs.data[i].password==undefined){	//没设置密码
				$(".page-box>li:last").find(".locked").find("span").text("已锁定").css("color","orangered");
			}else{	//已设置密码
				$(".page-box>li:last").find(".locked").find("span").text("密码锁定").css("color","orangered");
			}
			$(".page-box>li:last").find(".locked").find("i").css("background-image","url(images/icon/lock-1.png)");
		}else{	//未锁定
			$(".page-box>li:last").find(".locked").find("span").text("已解锁").css("color","green");
			$(".page-box>li:last").find(".locked").find("i").css("background-image","url(images/icon/lock-2.png)");
		}
		//箱子坐标
		$(".page-box>li:last").find(".coor").find("i").text(playerBoxs.data[i].xyz);
		//箱子归属玩家
		$(".page-box>li:last").find(".owner").find("span").text(playerBoxs.data[i].owner);
	}
	//检测物品数量
	var len = $(".page-box>li").length;
	console.log(getTime().date+"\n领地范围内箱子数量:"+len);
	if(len==0){
		$(".terr-box .page-box>.empty2").show();
	}else{
		$(".terr-box .page-box>.empty2").hide();
	}
}
//将领地箱子内物品渲染到页面
function GenerateBoxItems(xb){
	$(".page-items .box-items").remove();	//移除仓库所有物品
	for(var i=1;i<playerBoxs.data[xb].length;i++){	//遍历箱子物品数组
		//console.log("下标："+i+"---物品："+playerBoxs.data[xb][i].itemName)
		$(".page-items>section").append(boxItemsCard);
		//下标
		$(".page-items .box-items:last").data("index",i);
		//图片
		$(".page-items .box-items:last").find("img").attr("src",playerBoxs.data[xb][i].itemImage);
		//数量
		$(".page-items .box-items:last").find(".num").text(playerBoxs.data[xb][i].itemNum);
		if(playerBoxs.data[xb][i].itemNum==1){
			$(".page-items .box-items:last").find(".num").hide();
		}
	}
	var len = $(".page-items>section>.box-items").length;
	console.log(getTime().date+"\n当前箱子里的物品数量："+len);
	if(len==0){
		$(".terr-box>section>.page-items>.empty2").show();
		$(".terr-box .page-items>header,.terr-box .page-items>section").hide();
	}else{
		$(".terr-box>section>.page-items>.empty2").hide();
		$(".terr-box .page-items>header,.terr-box .page-items>section").show();
	}
}
//对领地箱子数组更改储存格式，以方便在js中调用
function arrboxToObj(){
	playerBoxs = {};
	if(playerBox[playerIndex]==undefined){	//如果玩家下标对应的数组没有任何东西，创建一个新的数组
		playerBox[playerIndex] = [[playerName,steamID]];
	}
	playerBoxs.data = playerBox[playerIndex];

	for(var i=1;i<playerBox[playerIndex].length;i++){	//遍历当前登录玩家的领地箱子数组
		playerBoxs.data[i].boxName = playerBox[playerIndex][i][0][0];		//箱子名称
		playerBoxs.data[i].boxImage = playerBox[playerIndex][i][0][1];		//箱子图片
		playerBoxs.data[i].boxLock = playerBox[playerIndex][i][0][2].split(":")[1];	//箱子锁定状态
		playerBoxs.data[i].password = playerBox[playerIndex][i][0][3].split(":")[1];//箱子密码
		playerBoxs.data[i].xyz = playerBox[playerIndex][i][0][4].split(":")[1];		//箱子坐标
		playerBoxs.data[i].owner = playerBox[playerIndex][i][0][5].split(":")[1];	//箱子归属者名称
		playerBoxs.data[i].ownerID = playerBox[playerIndex][i][0][6].split(":")[1];	//箱子归属者ID
		for(var j=1;j<playerBoxs.data[i].length;j++){
			playerBoxs.data[i][j].itemName = playerBoxs.data[i][j][0].split(":")[1];	//物品名称
			playerBoxs.data[i][j].itemId = playerBoxs.data[i][j][1].split(":")[1];		//物品ID
			playerBoxs.data[i][j].itemImage = playerBoxs.data[i][j][2].split(":")[1];		//物品ID
			playerBoxs.data[i][j].itemNum = playerBoxs.data[i][j][3].split(":")[1];		//物品数量
			playerBoxs.data[i][j].itemQuality = playerBoxs.data[i][j][4].split(":")[1];	//物品品质
			if(isNaN(playerBoxs.data[i][j].itemNum)){playerBoxs.data[i][j].itemNum=1}
			//console.log(playerBoxs.data[i][j])
		}
	}
	//console.log(playerBoxs)
}

$(document).ready(function(){
	playerBox = [
		[["彩色の小木屋","76561199000000001"],

			[["安全储物箱","images/ItemIcons/cntChest01.png","锁定:true","密码:","坐标:200,50,200","归属者:彩色の小木屋","归属者ID:76561199000000001"],
			["物品名称:Cxx的尿不湿","物品ID:Cxx的尿不湿","图片:images/items/nbs.png","数量:123","品质:"],
			["物品名称:Cxx的开裆裤","物品ID:Cxx的开裆裤","图片:images/items/kdk.png","数量:45","品质:"],
			["物品名称:圣诞帽","物品ID:armorSantaHat","图片:images/ItemIcons/armorSantaHat.png","数量:1","品质:"],
			["物品名称:南瓜灯","物品ID:decoPumpkinJackOLantern","图片:images/ItemIcons/decoPumpkinJackOLantern.png","数量:88","品质:"],
			["物品名称:公爵赌场币","物品ID:casinoCoin","图片:images/ItemIcons/casinoCoin.png","数量:20000","品质:"],
			["物品名称:公爵赌场币","物品ID:casinoCoin","图片:images/ItemIcons/casinoCoin.png","数量:20000","品质:"],
			["物品名称:公爵赌场币","物品ID:casinoCoin","图片:images/ItemIcons/casinoCoin.png","数量:20000","品质:"],
			["物品名称:公爵赌场币","物品ID:casinoCoin","图片:images/ItemIcons/casinoCoin.png","数量:12345","品质:"]],

			[["密码123","images/ItemIcons/cntStorageHealth.png","锁定:true","密码:123","坐标:529,20,1314","归属:小白兔","归属者ID:76561199000000002"],
			["物品名称:Cxx的尿不湿","物品ID:Cxx的尿不湿","图片:images/items/nbs.png","数量:10","品质:"],
			["物品名称:Cxx的开裆裤","物品ID:Cxx的开裆裤","图片:images/items/kdk.png","数量:5","品质:"]],

			[["木储物箱","images/ItemIcons/cntStorageHealth.png","锁定:true","密码:","坐标:123,55,123","归属:大灰狼","归属者ID:76561199000000003"],
			["物品名称:Cxx的尿不湿","物品ID:Cxx的尿不湿","图片:images/items/nbs.png","数量:10","品质:"],
			["物品名称:Cxx的开裆裤","物品ID:Cxx的开裆裤","图片:images/items/kdk.png","数量:5","品质:"]],

			[["可写字的储物箱","images/ItemIcons/cntShippingCrateHero.png","锁定:false","密码:","坐标:100,50,100","归属:NAIWAZI_皎哥","归属者ID:76561199000000004"],
			],
		],
		[["匿名玩家","76561199000000002"],

			[["木储物箱 / 家具","images/ItemIcons/cntStorageHealth.png","锁定:true","密码:123","坐标:529,20,1314","归属:匿名玩家","归属者ID:76561199000000002"],
			],

		],


	];
	arrboxToObj();

	$(".terr-box>header>.back").click(function(){	//领地箱子 - 返回
		var page = $(".terr-box").data("page");	//获取保存到data的所属页面信息
		if(page=="box"){	//如果是箱子页面（直接返回到仓库列表页面）
			$(".terr-box").hide();
			$(".ware-list").fadeIn(200);
			$(".warehouse>.menu>.l1").show();	//显示 提取到背包 按钮
			$(".warehouse>.menu>.l1-replace").hide();	//隐藏 储存到仓库 按钮
			$(".Category-ware>.shield").hide();	//左侧分类导航栏解除禁止
		}else if(page=="items"){	//如果是箱子内物品页面（则返回到箱子页面）
			$(".terr-box").find(".page-box").show();	//显示箱子列表
			$(".terr-box").find(".page-items").hide();	//隐藏物品列表
			$(".terr-box").data("page","box");
		}
	});

	$(".page-box").on("click",".player-box",function(){		//打开箱子
		var num = $(this).find("footer").find(".num").find("span").text();	//获取箱子编号
		var name = $(this).find("header").text();	//获取箱子名称
		var img = $(this).find("section").find("img").attr("src");	//获取箱子图片
		var xyz = $(this).find("footer").find(".coor").find("i").text();	//获取箱子坐标
		var xb = $(this).data("index");		//获取箱子在数组中的下标
		var ownid = playerBoxs.data[xb].ownerID;	//获取归属者ID
		if(playerBoxs.data[xb].boxLock=="true"){	//如果箱子是锁定的
			if(ownid!=steamID){	//如果箱子归属者不属于当前登录的玩家
				//如果箱子不是自己的并且设置了密码
				if(playerBoxs.data[xb].password!=""&&playerBoxs.data[xb].password!=undefined){
					if(playerBoxs.data[xb].password=="[skip]"){
						//如果之前验证过正确的密码，那么以后都不用再输密码了
						openbox();
					}else{
						//第一次验证密码
						Prompt("这个箱子不是你的并且已设置了密码<br>请输入密码打开：","");
						popupCss(25,16);
						$("#alert>.alert>footer>.confirm").click(function(){
							$("#alert>.alert>section>p").html("");	//清空文本提示内容
							$("#alert").hide();
							//console.log("点击了确认");
							var pro = $("#alert>.alert>section>input").val()*1;
							//if(!pro){return;}	//玩家点了取消
							if(pro!=playerBoxs.data[xb].password){	//如果密码错误
								Alert("对不起！密码输入错误");
								popupCss(25,13);
								return;
							}else{
								playerBoxs.data[xb].password = "[skip]";	//验证成功，将密码设置为“跳过验证”。
							}
							openbox();
						});
					}

				}else{	//如果箱子不是自己的并且没设置密码
					Alert("打开失败！<br>这个箱子不是你的并且已经锁定了");
					popupCss(25,14);
					return;
				}

				//alert(playerBoxs.data[xb].password)
			}else{	//箱子是锁定的但归属者是当前登录玩家
				openbox();
			}
		}else{	//箱子没锁定
			openbox();
		}
		//经过上面的验证如果没有出现问题return，说明箱子打开成功
		function openbox(){
			$(".terr-box .page-box").hide();	//隐藏箱子列表页面
			$(".terr-box .page-items").show();	//显示物品列表页面
			$(".terr-box .page-items").data("index",xb);	//将箱子下标保存到物品页面data
			$(".terr-box").data("page","items");//保存当前所属页面到data，以便于点击返回的时候分辨出当前页面

			//alert(name)
			//渲染箱子信息
			$(".page-items .head-box>.head>img").attr("src",img);
			$(".page-items .head-box>.msg>.name>span").text(name);
			$(".page-items .head-box>.msg>.name>i").text(num);
			$(".page-items .head-box>.msg>.coor>span").text(xyz);
			GenerateBoxItems(xb);	//生成对应箱子物品
			adaptive();
		}
	});


	$(".page-items>section").on("mouseover",".box-items",function(){		//鼠标移入箱子内的物品
		$(".page-items").find(".head-box").hide();	//隐藏箱子信息
		$(".page-items").find(".head-items").show();	//显示物品信息
		var xbBox = $(".terr-box .page-items").data("index");	//获取箱子下标
		var xb = $(this).data("index");		//获取当前物品下标
		var name = playerBoxs.data[xbBox][xb].itemName;	//获取物品名称
		var img = playerBoxs.data[xbBox][xb].itemImage;	//获取物品图标
		var num = playerBoxs.data[xbBox][xb].itemNum;//获取物品数量
		var qua = playerBoxs.data[xbBox][xb].itemQuality;//获取物品品质
		//将物品数据渲染到页面
		$(".page-items").find(".head-items").find("img").attr("src",img);
		$(".page-items").find(".head-items").find(".name").find("span").text(name);
		$(".page-items").find(".head-items").find(".num").find("span").text(num);
		$(".page-items").find(".head-items").find(".quality").find("span").text(qua);
		if(qua==""||qua==undefined){
			//如果物品没有品质，就让品质信息隐藏，反之则显示
			$(".page-items").find(".head-items").find(".quality").hide();
		}else{
			$(".page-items").find(".head-items").find(".quality").show();
		}
	});
	$(".page-items>section").on("mouseout",".box-items",function(){		//鼠标移出箱子内的物品
		$(".page-items").find(".head-box").show();		//显示箱子信息
		$(".page-items").find(".head-items").hide();	//隐藏物品信息
		//清空页面物品渲染信息
		$(".page-items").find(".head-items").find("img").attr("src","");
		$(".page-items").find(".head-items").find(".name").find("span").text("加载中.....");
		$(".page-items").find(".head-items").find(".num").find("span").text("");
		$(".page-items").find(".head-items").find(".quality").find("span").text("");
	});




	$(".page-items>section").on("click",".box-items",function(){		//点击箱子内的物品
		var xbBox = $(".terr-box .page-items").data("index");	//获取箱子下标
		var xb = $(this).data("index");		//获取当前物品下标
		var id = playerBoxs.data[xbBox][xb].itemId;	//获取物品ID
		var name = playerBoxs.data[xbBox][xb].itemName;	//获取物品名称
		var img = playerBoxs.data[xbBox][xb].itemImage;	//获取物品图标
		var num = playerBoxs.data[xbBox][xb].itemNum*1;//获取物品数量
		var qua = playerBoxs.data[xbBox][xb].itemQuality;//获取物品品质
		var pro;
		if(num==1){		//如果数量只有1件
			Confirm("您选择的物品是 "+name+"<br>是否确认将此物品储存到仓库？");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").click(function(){
				pro = 1;	//储存数量为1
				playerBox[playerIndex][xbBox].splice(xb,1);		//删除箱子里对应物品
				StoreToWare();
			});
			// $("#alert>.alert>footer>.close").click(function(){
			// 	return;
			// });
			// if(con){

			// }else{	//用户取消储存
			// 	return;
			// }
		}else if(num>1){	//如果数量有1件以上
			Prompt("您选择的物品是 "+name+"<br>是否确认将此物品储存到仓库？<br>您当前拥有数量为 "+num+"<br>请输入你要储存的数量：",num);
			popupCss(25,19);
			//alert(pro)
			$("#alert>.alert>footer>.confirm").click(function(){
				pro = $("#alert>.alert>section>input").val()*1;
				// if(pro==null){	//用户取消储存
				// 	return;
				// }
				if(isNaN(pro)){
					Alert("请输入正确的数字！");
					popupCss(25,13);
					return;
				}
				if(pro<=0){
					Alert("储存的数量必须是大于0的整数！");
					popupCss(25,13);
					return;
				}
				if(pro>num){
					Alert("储存的数量不能大于拥有的数量！<br>您当前拥有的数量为 <font color='dodgerblue'>"+num+"</font> 件");
					popupCss(25,14);
					return;
				}
				pro *= 1;
				//如果经过以上的验证没有出现问题，说明符合储存条件
				if(pro==num){	//如果输入的数量刚好等于拥有的数量
					playerBox[playerIndex][xbBox].splice(xb,1);		//删除箱子里对应物品

				}else if(pro<num){	//如果输入的数量小于拥有的数量
					playerBox[playerIndex][xbBox][xb][3] = "数量:"+(num-pro);		//修改箱子里对应物品的数量
				}
				StoreToWare();
			});

		}



		//下面的函数是给仓库增加储存的物品
		//$("#alert>.alert>footer>.confirm").click(function(){
		function StoreToWare(){
			//alert(pro)
			$("#alert>.alert>section>p").html("");	//清空文本提示内容
			$("#alert").hide();
			//console.log("点击了确认");
			var findItem = false;	//默认为没找到相同物品
			for(var j in playerWare[playerIndex]){	//遍历玩家仓库
				var nameW = playerWares.data[j].name;	//获取数组中物品名称
				var idW = playerWares.data[j].id;		//获取数组中物品ID
				var quaW = playerWares.data[j].quality*1;	//获取数组中物品品质
				var numW = playerWares.data[j].num*1;		//获取数组中物品数量
				if(nameW==name&&idW==id&&quaW==qua){	//如果是相同的物品
					findItem = true;
					//console.log("数组数量："+numW+"---储存数量："+pro);
					numW += pro;	//直接给相同的物品增加储存的数量，无需再新创建数组
					//console.log("增加后的数组数量："+numW);
					playerWares.data[j].num = numW;	//保存更新的数量
					playerWare[playerIndex][j][1][1] = "品质:"+numW;
				}
			}
			if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
				playerWare[playerIndex][playerWare[playerIndex].length] = [[name,"ID:"+id,"图片:"+img],["品质:"+qua,"数量:"+pro],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
			}
			arrboxToObj();		//给箱子数组转换储存格式
			GenerateBoxItems(xbBox);	//重新渲染箱子物品到页面
			arrwareToObj();		//给仓库数组转换储存格式
			GenerateWare(arrClass1,arrClass2);	//重新渲染仓库物品到页面
			recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>储存物品</span><span><b>"+name+"</b></span><span>"+pro+" 件</span>";
			Alert("储存成功！<br>物品已发送至您的仓库");
			popupCss(25,14);
			$(".page-items").find(".head-box").show();		//显示箱子信息
			$(".page-items").find(".head-items").hide();	//隐藏物品信息
		//});
		}
	});
});
