pstoreCard = '<li><div class="image"><img src=""><div class="quality"><span></span></div></div><div class="content"><div class="price"><i></i><span>0</span></div><div class="num">库存：0</div><div class="name"></div></div></li>';
pstoreList = '<li><div class="num">1</div><div class="head"></div><div class="name"><div class="shop-name"></div><div class="vip"></div><div class="owner"></div><div class="level"></div></div><div class="sales"><i></i><span>0</span>	</div><div class="praised"><i></i><span>0</span></div></li>';
pstoreItem = '<li><div class="image"><img src="images/ItemIcons/decoPumpkinJackOLantern.png"><div class="quality"><span>6</span></div></div><div class="content"><div class="price"><i></i><span>123456</span></div><div class="num"></div><div class="name"></div><div class="shop" title="进入商店"><i></i><span></span></div></div></li>';
var nowPage = "我的店铺";	//用于记录当前访问的页面
var pst = "出售";	//用于记录当前访问的玩家店铺是出售的列表还是求购的列表
	
	
//将玩家商店数组更改为obj储存格式, 以方便在js中调用
function arrPStoreToObj(){
	//console.log(4.1);
	playerStores = [];
	
	if(playerStore[playerIndex]==undefined){	//如果玩家下标对应的数组没有任何东西，创建一个新的数组
		playerStore[playerIndex] = [[playerName,steamID]];
	}
	//console.log(4.2);
	//console.log(playerCollect[playerIndex])
	playerStores = playerStore;
	//console.log(4.3);
	for(var i=0;i<playerStore.length;i++){	//遍历玩家商店数组
		playerStores[i].playerName = playerStores[i][0][0];		//玩家名称
		playerStores[i].playerID = playerStores[i][0][1];		//玩家steamID
		playerStores[i].image = players.data[i].image;			//玩家头像
		playerStores[i].shopName = playerStores[i][0][2].split(":")[1];	//店铺名称
		//playerStores[i].level = playerStores[i][0][4].split(":")[1];	//玩家等级
		playerStores[i].sales = playerStores[i][0][3].split(":")[1];	//销售额
		playerStores[i].praised = playerStores[i][0][4].split(":")[1];	//获赞
		playerStores[i].qq = playerStores[i][0][5].split(":")[1];	//玩家QQ
		//playerStores[i].openTime = playerStores[i][0][8].split("::")[1];	//开店时间
		//店铺名称不能为空，首次使用将自动命名为“玩家名称+的店铺”
		if(playerStores[i].shopName==""||playerStores[i].shopName==undefined){
			playerStores[i].shopName = playerStores[i].playerName+"的店铺";
		}
		//若是没有设置头像，则给定一个默认头像
		if(playerStores[i].image==""||playerStores[i].image==undefined){
			playerStores[i].image = "images/player/head1.jfif";
		}
		for(var j=1;j<playerStore[i].length;j++){	//遍历玩家商店内的商品
			// console.log(4.31);
			// console.log(playerStores);
			// console.log(playerStores[0]);
			playerStores[i][j].trade = playerStores[i][j][0].split(":")[1];	//交易类型
			//console.log(4.32);
			playerStores[i][j].name = playerStores[i][j][1].split(":")[1];	//物品名称
			playerStores[i][j].id = playerStores[i][j][2].split(":")[1];		//物品ID
			playerStores[i][j].num = playerStores[i][j][3].split(":")[1];		//物品数量（库存/需求）
			playerStores[i][j].price = playerStores[i][j][4].split(":")[1];		//物品价格
			playerStores[i][j].quality = playerStores[i][j][5].split(":")[1];	//物品品质
			//查询商品列表中是否有这个物品
			var sxb = queryShopItems(playerStores[i][j].id);
			if(sxb>=0){	//如果有
				playerStores[i][j].image = shop.data[sxb].image;
				if(playerStores[i][j].name==""||playerStores[i][j].name==undefined){
					playerStores[i][j].name = shop.data[sxb].name;	//获取商店里显示的名称
				}
			}else{	//如果没有
				if(playerStores[i][j].name==""||playerStores[i][j].name==undefined){
					playerStores[i][j].name = queryItems(true,playerStores[i][j].id).name;	//获取汉化名称
				}
				playerStores[i][j].image = "images/alert.png";
			}
		}
		
	}
	//console.log(playerStores);
}
arrPStoreToObj();

function GeneratePStore(xb,type){	//在页面生成玩家商店详情页(玩家下标,交易类型)
	$(".my-shop>header>.left>.head").css("background-image","url("+players.data[xb].image+")");	//玩家头像
	$(".my-shop>header>.center>.shop-name").text(playerStores[xb].shopName);	//店铺名称
	$(".my-shop>header>.center>.shopkeeper>.name").text(playerStores[xb].playerName);	//店主名称
	//$(".my-shop>header>.center>.opening-time>span").text(playerStores[xb].openTime);	//开店时间
	$(".my-shop>header>.right>.sales>.s2>span").text(playerStores[xb].sales);		//总销售额
	$(".my-shop>header>.right>.praised>.p2>span").text(playerStores[xb].praised);		//获赞数量
	$(".my-shop>header>.center>.assets>.point>span").text(players.data[xb].points);		//拥有积分
	$(".my-shop>header>.center>.assets>.diamond>span").text(players.data[xb].diamonds);//拥有钻石
	
	$(".my-shop").data("index",xb);
	if(xb==playerIndex){	//如果打开的商店是当前登录玩家的商店（自己的商店）
		$(".my-shop>header>.center>.shopkeeper>.open-qq").hide();	//QQ聊天按钮
		$(".my-shop>header>.edit").show();	//编辑资料按钮
		$(".sitems-list>.add").show();	//添加物品按钮
	}else{	//如果打开的是 其它玩家的商店
		$(".my-shop>header>.center>.shopkeeper>.open-qq").css("display","inline-block");	//QQ聊天按钮
		$(".my-shop>header>.edit").hide();	//编辑资料按钮
		$(".sitems-list>.add").hide();	//添加物品按钮
	}
	
	$(".sitems-list>li").remove();	//移除所有商品
	for(var i=1;i<playerStores[xb].length;i++){	//遍历玩家商店物品数组
		//$(".sitems-list").append(pstoreCard);
		$(".sitems-list>.add").before(pstoreCard);
		//下标
		$(".sitems-list>li:last").attr("data-index",i);
		//名称
		var name = deleteBBcode(playerStores[xb][i].name);
		$(".sitems-list>li:last").find(".name").text(name);
		//图片
		$(".sitems-list>li:last").find("img").attr("src",playerStores[xb][i].image);
		//价格
		$(".sitems-list>li:last").find(".price").find("span").text(playerStores[xb][i].price);
		//品质
		var qua = Math.round(playerStores[xb][i].quality*1);
		if(isNaN(qua)||qua<=0){
			$(".sitems-list>li:last").find(".quality").hide();
		}else if(qua>0){
			$(".sitems-list>li:last").find(".quality").show().find("span").text(qua);
			var color;
			if(qua==1){color="rgb(157, 138, 106)"}
			if(qua==2){color="rgb(208, 129, 43)"}
			if(qua==3){color="rgb(163, 165, 28)"}
			if(qua==4){color="rgb(69, 195, 54)"}
			if(qua==5){color="rgb(51, 96, 207)"}
			if(qua>=6){color="rgb(165, 44, 205)"}
			$(".sitems-list>li:last").find(".quality").css("background-color",color);
		}
		
		
		var trade = playerStores[xb][i].trade;
		if(type=="出售"){
			$(".sitems-list>li:last").find(".num").text("库存："+playerStores[xb][i].num); //数量
			$(".sitems-list>li:last").css("background-image","url(images/card/green.jpg)");
			if(trade=="求购"){
				$(".sitems-list>li:last").remove();
			}
		}else if(type=="求购"){
			$(".sitems-list>li:last").find(".num").text("需求："+playerStores[xb][i].num); //数量
			$(".sitems-list>li:last").css("background-image","url(images/card/pink.jpg)");
			if(trade=="出售"){
				$(".sitems-list>li:last").remove();
			}
		}
		
	}
	//检测商品数量
	var num = $(".sitems-list>li").length;
	if(num==0){
		//$(".sitems-list>.empty").show();
		if(type=="出售"){
			if(xb!=playerIndex){
				$(".sitems-list>.empty").show().find("span").html("该玩家暂时没有<br>需要出售的物品");
			}
		}else if(type=="求购"){
			if(xb!=playerIndex){
				$(".sitems-list>.empty").show().find("span").html("该玩家暂时没有<br>需要求购的物品");
			}
		}
		
	}else{
		$(".sitems-list>.empty").hide();
	}
	//$(".sitems-list").append('<div class="add"><b>+</b><br><span></span></div>');
	//会员
	var steamid = playerStores[xb].playerID;	//获取玩家steamID
	for(var j in playerBasic){	//遍历玩家数组
		var qid = players.data[j].id;	//获取保存在数组中的steamID
		if(qid==steamid){	//如果数组中找到了该玩家
			var status = players.data[j].status;	//获取玩家身份
			break;
		}
	}
	//如果是会员或管理员，显示会员图标
	if(status=="商店会员"||status=="管理员"){
		$(".my-shop>header>.center>.vip").show();
		//$(".my-shop>header>.center>.shop-name").css("color","rgb(234, 36, 36)");
		
	}else{
		$(".my-shop>header>.center>.vip").hide();
	}
}
GeneratePStore(playerIndex,"出售");

function GenerateStoreList(){		//在页面生成玩家商店列表
	$(".player-store>li").remove();	//移除所有玩家商店
	for(var i=0;i<playerStores.length;i++){	//遍历玩家商店列表
		if(playerStores[i].length>1){	//玩家商品列表必须包含出售或收取的物品，否则不在页面上显示该店铺
			//console.log(i)
			$(".player-store").append(pstoreList);
			//下标
			$(".player-store>li:last").attr("data-index",i);
			//店铺序号
			$(".player-store>li:last").find(".num").text(i+1);
			//玩家头像
			$(".player-store>li:last").find(".head").css("background-image","url("+players.data[i].image+")");
			//店铺名称
			$(".player-store>li:last").find(".shop-name").text(playerStores[i].shopName);
			//店主名称
			$(".player-store>li:last").find(".owner").text("店主："+playerStores[i].playerName);
			//玩家等级
			$(".player-store>li:last").find(".level").text("lv."+players.data[i].level);
			//销售额
			$(".player-store>li:last").find(".sales").find("span").text(playerStores[i].sales);
			//获赞
			$(".player-store>li:last").find(".praised").find("span").text(playerStores[i].praised);
			//会员
			var status = players.data[i].status;	//获取玩家身份
			//如果是会员或管理员，显示会员图标
			if(status=="商店会员"||status=="管理员"){
				$(".player-store>li:last").find(".vip").show();
				$(".player-store>li:last").find(".shop-name").css("color","rgb(234, 36, 36)");
			}else{
				$(".player-store>li:last").find(".vip").hide();
			}
		}
	}
	//检测店铺数量
	var num = $(".player-store>li").length;
	if(num==0){
		$(".player-store>.empty").show();
		$(".player-store>.empty").find("span").html("没有找到店铺<br>快去上架物品吧");
	}else{
		$(".player-store>.empty").hide();
	}
}
//GenerateStoreList();

function GeneratePlayerCom(type){		//生成玩家商品列表（售卖区/求购区 物品）
	$(".player-com>li").remove();	//移除所有商品
	for(var xb=0;xb<playerStores.length;xb++){	//遍历所有玩家
		for(var i=1;i<playerStores[xb].length;i++){	//遍历玩家商店物品数组
			//$(".sitems-list").append(pstoreCard);
			$(".player-com").append(pstoreItem);
			//下标
			$(".player-com>li:last").attr("data-index1",xb);
			$(".player-com>li:last").attr("data-index2",i);
			//名称
			var name = deleteBBcode(playerStores[xb][i].name);
			$(".player-com>li:last").find(".name").text(name);
			//图片
			$(".player-com>li:last").find("img").attr("src",playerStores[xb][i].image);
			//价格
			$(".player-com>li:last").find(".price").find("span").text(playerStores[xb][i].price);
			//品质
			var qua = Math.round(playerStores[xb][i].quality*1);
			if(isNaN(qua)||qua<=0){
				$(".player-com>li:last").find(".quality").hide();
			}else if(qua>0){
				$(".player-com>li:last").find(".quality").show().find("span").text(qua);
				var color;
				if(qua==1){color="rgb(157, 138, 106)"}
				if(qua==2){color="rgb(208, 129, 43)"}
				if(qua==3){color="rgb(163, 165, 28)"}
				if(qua==4){color="rgb(69, 195, 54)"}
				if(qua==5){color="rgb(51, 96, 207)"}
				if(qua>=6){color="rgb(165, 44, 205)"}
				$(".player-com>li:last").find(".quality").css("background-color",color);
			}
			//头像
			$(".player-com>li:last").find(".shop").find("i").css("background-image","url("+playerStores[xb].image+")")
			//店铺名称
			$(".player-com>li:last").find(".shop").find("span").text(playerStores[xb].shopName);
			var status = players.data[xb].status;
			if(status=="商店会员"||status=="管理员"){
				$(".player-com>li:last").find(".shop").find("span").css({
					"color":"red",
					"font-weight":"normal"
				});
			}else{
				$(".player-com>li:last").find(".shop").find("span").css({
					"color":"chocolate",
					"font-weight":"normal"
				});
			}
			//显示类型
			var trade = playerStores[xb][i].trade;
			if(type=="出售"){
				$(".player-com>li:last").find(".num").text("库存："+playerStores[xb][i].num); //数量
				$(".player-com>li:last").css("background-image","url(images/card/green.jpg)");
				if(trade=="求购"){
					$(".player-com>li:last").remove();
				}
			}else if(type=="求购"){
				$(".player-com>li:last").find(".num").text("需求："+playerStores[xb][i].num); //数量
				$(".player-com>li:last").css("background-image","url(images/card/pink.jpg)");
				if(trade=="出售"){
					$(".player-com>li:last").remove();
				}
			}
			
		}
	}
	//检测店铺数量
	var num = $(".player-com>li").length;
	if(num==0){
		$(".player-com>.empty").show();
		$(".player-com>.empty").find("span").html("这里空空如也<br>快去上架物品吧");
	}else{
		$(".player-com>.empty").hide();
	}
}

function searchItems(){		//搜索店铺或物品
	if(nowPage=="玩家店铺"){
		$(".player-store>li").show();	//先默认让所有隐藏店铺显示
		var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
		var find = false;	//默认为没找到商品
		for(var i=0;i<$(".player-store>li").length;i++){	//遍历当前页面显示的店铺
			var xb = $(".player-store>li").eq(i).data("index");	//获取每个店铺在数组中的下标
			var name = playerStores[i].shopName.toLowerCase();	//获取店铺名称
			var id = playerStores[i].playerName.toLowerCase();	//获取玩家名称
			if(name.indexOf(txt) != -1||id.indexOf(txt) != -1){	//如果店铺名称或玩家名称中包含了你需要搜索的字符串
				find = true;
				$(".player-store>.empty").hide();
			}else{
				$(".player-store>li").eq(i).hide();
			}
		}
		if(!find){	//如果遍历完数组后，仍然没找到要搜索的商品
			console.log("没找到搜索的店铺");
			$(".player-store>.empty").show();
			$(".player-store>.empty").find("span").html("没有找到你想<br>搜索的店铺");
		}
	}else if(nowPage=="玩家售卖区"||nowPage=="玩家求购区"){
		$(".player-com>li").show();	//先默认让所有隐藏物品显示
		var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
		var find = false;	//默认为没找到商品
		for(var i=0;i<$(".player-com>li").length;i++){	//遍历当前页面显示的物品
			var xb1 = $(".player-com>li").eq(i).data("index1");	//获取每个物品在数组中的下标
			var xb2 = $(".player-com>li").eq(i).data("index2");	//获取每个物品在数组中的下标
			var name = playerStores[xb1][xb2].name.toLowerCase();	//获取物品名称
			var id = playerStores[xb1][xb2].id.toLowerCase();	//获取物品ID
			if(name.indexOf(txt) != -1||id.indexOf(txt) != -1){	//如果物品名称或ID中包含了你需要搜索的字符串
				find = true;
				$(".player-com>.empty").hide();
			}else{
				$(".player-com>li").eq(i).hide();
			}
		}
		if(!find){	//如果遍历完数组后，仍然没找到要搜索的商品
			console.log("没找到搜索的物品");
			$(".player-com>.empty").show();
			$(".player-com>.empty").find("span").html("没有找到你想<br>搜索的物品");
		}
	}else if(nowPage=="物资求购"){
		$(".buying>.shop>li").show();	//先默认让所有隐藏物品显示
		var txt = $(".head-tool .name-id").val().toLowerCase();	//获取输入框输入的内容
		var find = false;	//默认为没找到商品
		for(var i=0;i<$(".buying>.shop>li").length;i++){	//遍历当前页面显示的物品
			var xb = $(".buying>.shop>li").eq(i).data("index");	//获取每个物品在数组中的下标
			var name = gameItems[xb].name.toLowerCase();	//获取物品名称
			var id = gameItems[xb].id.toLowerCase();	//获取物品ID
			if(name.indexOf(txt) != -1||id.indexOf(txt) != -1){	//如果物品名称或ID中包含了你需要搜索的字符串
				find = true;
				$(".buying>.shop>.empty").hide();
			}else{
				$(".buying>.shop>li").eq(i).hide();
			}
		}
		if(!find){	//如果遍历完数组后，仍然没找到要搜索的商品
			console.log("没找到搜索的物品");
			$(".buying>.shop>.empty").show();
			$(".buying>.shop>.empty").find("span").html("没有找到你想<br>搜索的物品");
		}
	}
}

function buyNum(){		//输入购买数量
	var xb1 = $(".my-shop").data("index");	//获取店主在数组中的下标
	var xb2 = $(".player-order").data("index");		//获取物品在数组中的下标
	var price = playerStores[xb1][xb2].price;	//获取物品单价
	var num = playerStores[xb1][xb2].num;	//获取物品数量
	var numVal = $(".player-order>.window>section>.count>.val>input").val()*1;
	if(numVal>num){		//购买数量最多不能超过出售的数量
		numVal = num;
		$(".player-order>.window>section>.count>.val>input").val(numVal);
	}else if(numVal<=0){		//购买数量至少为1
		numVal = 1;
		$(".player-order>.window>section>.count>.val>input").val(1);
	}
	if(numVal>0){
		var priceAll = price*numVal;	//计算玩家实际需支付的价格
		$(".player-order>.window>section>.price>.val>span").text(priceAll);
	}
}
		
function playerCom(xb1,xb2){	//玩家商品卡片相关内容
	if(xb1==playerIndex){	//如果店主是当前登录的玩家（浏览自己的店铺）
		if(pst=="出售"){
			//alert("店主！出售的物品");
			Confirm("是否要下架此物品？<br>下架后物品将返还至仓库");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").unbind("click");
			$("#alert>.alert>footer>.confirm").click(function(){	//确认下架物品
				//玩家确认下架后，删除这个物品并返还到仓库
				var id = playerStores[xb1][xb2].id;	//获取物品ID
				var name = playerStores[xb1][xb2].name;	//获取物品名称
				var quality = playerStores[xb1][xb2].quality;	//获取物品品质
				var num = playerStores[xb1][xb2].num*1;	//获取物品数量
				//下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
				//相同的条件是: 名称、ID、品质 3个属性同时相同
				var findItem = false;	//默认为没找到相同物品
				for(var j in playerWare[xb1]){
					var nameW = playerWares.data[j].name;	//获取数组中物品名称
					var idW = playerWares.data[j].id;		//获取数组中物品ID
					var quaW = playerWares.data[j].quality*1;	//获取数组中物品品质
					var numW = playerWares.data[j].num*1;		//获取数组中物品数量
					if(nameW==name&&idW==id&&quaW==quality){	//如果是相同的物品
						findItem = true;
						numW += num;	//直接给相同的物品增加购买的数量，无需再新创建数组
						playerWares.data[j].num = numW;	//保存更新的数量
						playerWare[xb1][j][1][1] = "数量:"+numW;
					}
					//console.log("品质1:"+quaW+"---品质2:"+itemQua);
					//console.log("名称1:"+nameW+"---名称2:"+itemName);
				}
				if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
					playerWare[xb1][playerWare[xb1].length] = [["auto","ID:"+id,"图片:auto"],["品质:"+quality,"数量:"+num],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
					console.log(playerWare[xb1]);
				}
				arrwareToObj();	//给仓库数组转换储存格式
				
				playerStores[xb1].splice(xb2,1);	//个人商店数组中删除这个物品
				//arrPStoreToObj();
				//console.log(playerStores[xb1]);
				GeneratePStore(xb1,"出售");	//重新渲染页面商品
				GeneratePlayerCom("出售");
				
				var point = players.data[playerIndex].points;
				var diamond = players.data[playerIndex].diamonds;
				// var owner = "一二三四五一二三四五";
				// var name = "一二三四五一二三"
				//recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b>"+owner+"</b> 的商品</span><br><span><b>"+name+"</b></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				if(quality==0){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>下架了出售的物品 <b>"+name+"</b></span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else{
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>下架了出售的物品 <b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+quality+")</font></span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
				$("#alert,#alert>.alert").hide();
			});
		}else if(pst=="求购"){
			//alert("店主！求购的物品");
			Confirm("是否要撤销求购？<br>撤销后积分将返还至账户");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").unbind("click");
			$("#alert>.alert>footer>.confirm").click(function(){	//确认撤销求购
				//玩家确认撤销后，删除这个物品并返还积分
				var point = players.data[xb1].points*1;	//获取当前玩家拥有积分
				var price = playerStores[xb1][xb2].price*1;	//获取物品价格
				var name = playerStores[xb1][xb2].name;	//获取物品名称
				var quality = playerStores[xb1][xb2].quality;	//获取物品品质
				point += price;		//返还积分
				players.data[xb1].points = point;	//保存玩家积分
				playerBasic[xb1][2][0] = "积分:"+point;	//保存玩家积分到数组
				$("main>header>.Point>span").text(point);	//将更新的积分渲染到页面
				$(".my-jf>span").text(point);	//同上
				$(".my-shop>header>.center>.assets>.point>span").text(point);	//同上
				
				playerStores[xb1].splice(xb2,1);	//商店数组中删除这个物品
				//arrPStoreToObj();
				//console.log(playerStores[xb1]);
				GeneratePStore(xb1,"求购");	//重新渲染页面商品
				GeneratePlayerCom("求购");
				var point = players.data[playerIndex].points;
				var diamond = players.data[playerIndex].diamonds;
				// var owner = "一二三四五一二三四五";
				// var name = "一二三四五一二三"
				//recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b>"+owner+"</b> 的商品</span><br><span><b>"+name+"</b></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				if(quality==0){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>撤销了求购的物品 <b>"+name+"</b></span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else{
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>撤销了求购的物品 <b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+quality+")</font></span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
				$("#alert,#alert>.alert").hide();	//隐藏提示框
			});
		}
	}else{	//如果店主是其它玩家（浏览别人的店铺）
		if(pst=="出售"){
			$(".player-order").fadeIn(100);	//显示订单确认窗口
			$(".my-shop").data("index",xb1);
			$(".player-order").data("index",xb2);
			var img = playerStores[xb1][xb2].image;	//获取物品图标
			var name = playerStores[xb1][xb2].name;	//获取物品名称
			var price = playerStores[xb1][xb2].price;	//获取物品单价
			var num = playerStores[xb1][xb2].num;	//获取物品数量
			//将物品数据渲染到页面
			$(".player-order>.window>section>header>.head>img").attr("src",img);	//图标
			$(".player-order>.window>section>header>.msg>.name").text(name);	//名称
			$(".player-order>.window>section>header>.msg>.price>span").text(price);	//单价
			$(".player-order>.window>section>header>.num").text("x"+num);	//数量
			$(".player-order>.window>section>.count>.val>input").val("");	//清空输入框
			$(".player-order>.window>section>.price>.val>span").text(0);	//清空支付价格
			
			//增加数量
			$(".player-order>.window>section>div>.val>.add").unbind("click");
			$(".player-order>.window>section>div>.val>.add").click(function(){
				var numVal = $(".player-order>.window>section>.count>.val>input").val()*1;
				numVal ++;
				if(numVal>num){		//购买数量最多不能超过出售的数量
					numVal = num;
				}
				$(".player-order>.window>section>.count>.val>input").val(numVal);
				var priceAll = price*numVal;	//计算玩家实际需支付的价格
				$(".player-order>.window>section>.price>.val>span").text(priceAll);
			});
			//减少数量
			$(".player-order>.window>section>div>.val>.reduce").unbind("click");
			$(".player-order>.window>section>div>.val>.reduce").click(function(){
				var numVal = $(".player-order>.window>section>.count>.val>input").val()*1;
				numVal --;
				if(numVal<=0){		//购买数量至少为1
					numVal = 1;
				}
				$(".player-order>.window>section>.count>.val>input").val(numVal);
				var priceAll = price*numVal;	//计算玩家实际需支付的价格
				$(".player-order>.window>section>.price>.val>span").text(priceAll);
			});
			
			//确认付款
			$(".player-order>.window>footer>.confirm").unbind("click");
			$(".player-order>.window>footer>.confirm").click(function(){
				var numVal = $(".player-order>.window>section>.count>.val>input").val()*1;
				if(isNaN(numVal)){
					Alert("请输入正确的数字！");
					popupCss(25,13);
					return;
				}else if(numVal==""||numVal==0){
					Alert("请填写购买数量！");
					popupCss(25,13);
					return;
				}
				var pay = $(".player-order>.window>section>.price>.val>span").text()*1;	//玩家需支付价格
				var point = players.data[playerIndex].points*1;	//获取玩家拥有积分
				if(pay>point){
					Alert("您的<font color='orange'>积分</font>不足，购买失败！");
					popupCss(25,13);
					return;
				}else if(pay<=point){
					point -= pay;
					players.data[playerIndex].points = point;
					playerBasic[playerIndex][2][0] = "积分:"+point;
					//页面渲染更新的玩家积分
					$("main>header>.Point>span").text(point);
					$(".my-jf>span").text(point);
					$(".my-jf>span").text(point);
					//将购买的物品发送到仓库
					var id = playerStores[xb1][xb2].id;	//获取物品ID
					var quality = playerStores[xb1][xb2].quality;	//获取物品品质
					//下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
					//相同的条件是: 名称、ID、品质 3个属性同时相同
					var findItem = false;	//默认为没找到相同物品
					for(var j in playerWare[playerIndex]){
						var nameW = playerWares.data[j].name;	//获取数组中物品名称
						var idW = playerWares.data[j].id;		//获取数组中物品ID
						var quaW = playerWares.data[j].quality*1;	//获取数组中物品品质
						var numW = playerWares.data[j].num*1;		//获取数组中物品数量
						if(nameW==name&&idW==id&&quaW==quality){	//如果是相同的物品
							findItem = true;
							numW += numVal;	//直接给相同的物品增加购买的数量，无需再新创建数组
							playerWares.data[j].num = numW;	//保存更新的数量
							playerWare[playerIndex][j][1][1] = "数量:"+numW;
						}
						//console.log("品质1:"+quaW+"---品质2:"+itemQua);
						//console.log("名称1:"+nameW+"---名称2:"+itemName);
					}
					if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
						playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+id,"图片:auto"],["品质:"+quality,"数量:"+numVal],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
						//console.log(playerWare[xb1]);
					}
					arrwareToObj();	//给仓库数组转换储存格式
					//购买成功后减少玩家店铺这个物品的剩余库存
					num -= numVal;
					playerStores[xb1][xb2].num = num;
					if(num==0){	//如果全部买完了
						playerStores[xb1].splice(xb2,1);	//玩家商店数组中删除这个物品
					}
					//arrPStoreToObj();
					//console.log(playerStores[xb1]);
					GeneratePStore(xb1,"出售");	//重新渲染页面商品
					GeneratePlayerCom("出售");
					//这里需要给对方的账户增加积分 或者以邮件的形式发送给对方
					//......
					
					
					//保存一份操作记录
					var owner = playerStores[xb1].playerName;	//获取店主名称
					var diamond = players.data[playerIndex].diamonds;
					// var owner = "一二三四五一二三四五";
					// var name = "一二三四五一二三"
					//recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b>"+owner+"</b> 的商品</span><br><span><b>"+name+"</b></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
					if(quality==0){
						recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b><font color='mediumpurple'>"+owner+"</font></b> 的物品</span><br><span><b>"+name+"</b></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
					}else{
						recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b><font color='mediumpurple'>"+owner+"</font></b> 的物品</span><br><span><b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+quality+")</font></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
					}
					Alert("购买成功！<br>物品已发送至您的仓库");
					popupCss(25,14);
					$(".player-order").hide();
				}
			});
		}else if(pst=="求购"){
			//alert("其它玩家！求购的物品");
			var player = playerStores[xb1].playerName;	//获取店主名称
			var name = playerStores[xb1][xb2].name;	//获取物品名称
			var id = playerStores[xb1][xb2].id;	//获取物品ID
			var num = playerStores[xb1][xb2].num*1;	//获取物品数量
			var price = playerStores[xb1][xb2].price*1;	//获取物品价格
			var quality = playerStores[xb1][xb2].quality;	//获取物品品质
			if(quality==""||quality==undefined){quality=0}
			
			Confirm("是否确认向 <font color='mediumpurple'>"+player+"</font> 提供<br>"+num+" 个 "+name+" ?<br>你可以获得 <font color='orange'>"+price+"</font> 积分奖励");
			popupCss(27,16);
			$("#alert>.alert>footer>.confirm").unbind("click");
			$("#alert>.alert>footer>.confirm").click(function(){	//确认向玩家供货
				//下面开始检测自己的仓库是否存在这个物品
				var xb = queryWareItems(id,quality);
				if(xb>=0){	//仓库中存在这个物品
					var numW = playerWares.data[xb].num*1;	//获取仓库里这个物品的数量
					if(numW<num){
						Alert("<font color='red'>交易失败！</font><br>你的仓库里没有足够的库存！<br>你需要提供 <font color='dodgerblue'>"+num+"</font> 件 <font color='mediumpurple'>"+name+"</font><br>你的仓库里只有 <font color='green'>"+numW+"</font> 件，还差 <font color='red'>"+(num-numW)+"</font> 件");
						popupCss(28,17);
						return;
					}else if(numW>=num){
						numW -= num;
						playerWares.data[xb].num = numW;
						playerWare[playerIndex][xb][1][1] = "数量:"+numW;
						if(numW==0){
							playerWare[playerIndex].splice(xb,1);	//删除仓库数组中对应下标物品
						}
						arrwareToObj();		//将更新的数组重新转换obj格式
						var point = players.data[playerIndex].points*1;	//获取当前拥有积分
						point += price;		//给自己增加对应积分
						players.data[playerIndex].points = point;	//保存积分
						playerBasic[playerIndex][2][0] = "积分:"+point;
						$("main>header>.Point>span").text(point);	//将更新的积分渲染到页面
						$(".my-jf>span").text(point);	//同上
						playerStores[xb1].splice(xb2,1);	//商店数组中删除这个物品
						//arrPStoreToObj();
						//console.log(playerStores[xb1]);
						GeneratePStore(xb1,"求购");	//重新渲染页面商品
						GeneratePlayerCom("求购");
						//这里需要把物品发送至对方的仓库 或者以邮件的形式发送给对方
						//......
						
						
						//保存一份操作记录
						var owner = playerStores[xb1].playerName;	//获取店主名称
						var diamond = players.data[playerIndex].diamonds;
						// var owner = "一二三四五一二三四五";
						// var name = "一二三四五一二三"
						//recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买 <b>"+owner+"</b> 的商品</span><br><span><b>"+name+"</b></span><span>"+numVal+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
						if(quality==0){
							recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>向 <b><font color='mediumpurple'>"+owner+"</font></b> 提供了物品</span><br><span><b>"+name+"</b></span><span>"+num+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
						}else{
							recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>向 <b><font color='mediumpurple'>"+owner+"</font></b> 提供了物品</span><br><span><b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+quality+")</font></span><span>"+num+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
						}
						Alert("交易成功！<br>积分已发送至您的账户");
						popupCss(25,14);
						return;
					}
				}else{		//仓库中不存在这个物品
					Alert("<font color='red'>交易失败！</font><br>你的仓库里没有这个物品！");
					popupCss(25,14);
					return;
				}
				
			});
		}
	}
}
				
$(document).ready(function(){
	//下面是玩家店铺列表相关内容
	$(".player-store").on("click","li",function(){	//点击玩家店铺列表查看店铺详情
	//$(".player-store>li").click(function(){
		var xb = $(this).data("index");		//获取玩家商店在数组中的下标
		$(".player-store").hide();
		$(".head-tool").hide();
		//隐藏头部工具栏及相关功能
		$(".head-tool,.head-tool>.serch,.head-tool>.sort,.head-tool>.refresh,.head-tool>.back").hide();
		$(".my-shop").show();
		$(".my-shop>header>.back").show();
		//$(".my-shop").css("padding-top","5rem");
		GeneratePStore(xb,"出售");
		$(".my-shop>section>nav>.sell").click();
		var len = $(".sitems-list>li").length;	//获取出售的商品数量
		if(len==0){		//如果没有出售的商品
			$(".my-shop>section>nav>div").click();	//自动跳转到求购列表
		}
		
	});
	//$(".player-store>li>.praised").off("click");
	//$(".player-store>li>.praised").unbind("click");
	$(".player-store").on("click","li>.praised",function(e){	//给玩家店铺点赞
		e.stopPropagation();	//防止事件冒泡(不触发父元素的点击事件)
		var ck = $(this).data("click");	//获取是否已点赞
		
		if(ck=="false"||ck==undefined){	//如果还没点过赞
			//alert(ck)
			var xb = $(this).parent().data("index");
			var num = playerStores[xb].praised*1;	//获取当前店铺获赞数量
			num += 1;	//获赞+1
			playerStores[xb][0][6] = "获赞:"+num;
			playerStores[xb].praised = num;
			$(this).find("span").text(num);
			$(this).find("i").css("background-image","url(images/icon/zan2.png)");
			$(this).find("span").css("color","orangered");
			$(this).data("click","true");
		}else if(ck=="true"){ //如果已经点过赞
			
		}
		
	});
	
	
	//下面是店铺详情页相关内容
	$(".my-shop>section>nav>.need").mouseenter(function(){	//收东西 鼠标移入特效
		var ck = $(this).data("click");
		if(ck!="true"){
			$(this).css("color","rgb(221, 36, 36)");
		}
	});
	$(".my-shop>section>nav>.sell").mouseenter(function(){	//出东西 鼠标移入特效
		var ck = $(this).data("click");
		if(ck!="true"){
			$(this).css("color","green");
			
		}
	});
	$(".my-shop>section>nav>div").mouseleave(function(){	//收/出东西 鼠标移出特效
		var ck = $(this).data("click");
		if(ck!=undefined){
			ck = ck.toString();
		}
		if(ck!="true"){
			$(this).css("color","gray");
		}
	});
	
	$(".my-shop>section>nav>.need").click(function(){		//点击 收东西
		$(".my-shop>section>nav>.sell").data("click","false");
		$(".my-shop>section>nav>.sell").css({
			"color":"gray",
			"font-weight":"normal",
			"border-bottom":"none"
		});
		$(this).data("click","true");
		$(this).css({
			"color":"rgb(221, 36, 36)",
			"font-weight":"bold",
			"border-bottom":"0.2rem solid rgb(221, 36, 36)"
		});
		pst = "求购";
		var xb = $(".my-shop").data("index");
		GeneratePStore(xb,"求购");
	});
	$(".my-shop>section>nav>.sell").click(function(){		//点击 出东西
		$(".my-shop>section>nav>.need").data("click","false");
		$(".my-shop>section>nav>.need").css({
			"color":"gray",
			"font-weight":"normal",
			"border-bottom":"none"
		});
		$(this).data("click","true");
		$(this).css({
			"color":"green",
			"font-weight":"bold",
			"border-bottom":"0.2rem solid green"
		});
		pst = "出售";
		var xb = $(".my-shop").data("index");
		GeneratePStore(xb,"出售");
	});
	
	$(".sitems-list>.add").mouseenter(function(){	//添加物品 鼠标移入特效
		$(this).css({
			"opacity":"1",
			"background-color":"rgba(250,240,240,0.7)",
			"transform":"scale(1.04)"
		});
		$(this).find(".add-logo").css({
			"font-size":"6.5rem"
		});
		$(this).find("span").css({
			"opacity":"1"
		});
	});
	$(".sitems-list>.add").mouseleave(function(){	//添加物品 鼠标移出特效
		$(this).css({
			"opacity":"0.9",
			"background-color":"rgba(200, 200, 200, 0.2)",
			"transform":"scale(1)"
		});
		$(this).find(".add-logo").css({
			"font-size":"8rem"
		});
		$(this).find("span").css({
			"opacity":"0"
		});
	});
	$(".sitems-list>.add").click(function(){		//添加物品 点击事件
		if(pst=="出售"){
			Confirm("请从仓库里选择你要出售的商品<br>是否立即前往？");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").click(function(){
				$(".Main-menu>.menu-2").click();
				$("#alert,#alert>.alert").hide();
			});
		}else if(pst=="求购"){
			$(".Trade-ware>.btn-5").click();
		}
	});
	
	$(".my-shop>header>.center>.shopkeeper>.open-qq").click(function(){	//发起QQ对话
		var xb = $(this).parents(".my-shop").data("index");	//获取玩家店铺在数组中的下标
		var qq = playerStores[xb].qq;
		if(qq==""||qq==undefined){
			Alert("对方暂未设置QQ联系方式，无法发起对话<br>请尝试用其它方式联系该成员");
			popupCss(28,14);
		}else{
			window.open("tencent://message/?uin="+qq);
		}
	});
	
	$(".my-shop>header>.edit").click(function(){	//编辑个人商店资料
		$("#alert,#alert>.alert-edit").fadeIn(100);
		var shopName = playerStores[playerIndex].shopName;
		var qq = playerStores[playerIndex].qq;
		var img = players.data[playerIndex].image;
		$(".shop-name-val").val(shopName);
		$(".myself-qq-val").val(qq);
		$("#alert>.alert-edit>section>.left>.head").css("background-image","url("+img+")");
		headSrc = img;
	});
	$("#alert>.alert-edit>header>i").click(function(){	//关闭编辑资料页面
		$("#alert,#alert>.alert-edit").fadeOut(50);
	});
	$("#alert>.alert-edit>footer>.close").click(function(){	//关闭编辑资料页面
		$("#alert,#alert>.alert-edit").fadeOut(50);
	});
	$("#alert>.alert-edit>footer>.confirm").click(function(){	//保存个人资料设置
		var shopName = $(".shop-name-val").val();	//获取设置的店铺名称
		var qq = $(".myself-qq-val").val();		//获取设置的QQ
		var test = shopName.split("").length;	//获取店铺名称字符长度
		//下面对输入内容进行简单的验证
		if(test>10){
			alert("店铺名称最多只能设置10个字符！");
			return;
		}
		if(isNaN(qq)||qq<0){
			alert("请输入有效的QQ号码！");
			return;
		}
		//验证成功后，开始保存设置的信息
		playerStores[playerIndex].shopName = shopName;	//保存店铺名称
		playerStores[playerIndex].qq = qq;		//保存QQ
		$(".my-shop>header>.center>.shop-name").text(shopName);	//在个人店铺主页渲染设置的新店铺名称
		//alert(headSrc)
		if(headSrc==undefined||headSrc==""){	//如果没有更换头像
			headSrc = playerStores[playerIndex].image;	//头像路径默认为原来的路径
		}
		players.data[playerIndex].image = headSrc;	//将新的头像保存到玩家基础数据数组（player.js）
		playerStores[playerIndex].image = headSrc;	//将新的头像保存到玩家商店数组（player-store.js）
		$(".my-shop>header>.left>.head").css("background-image","url("+headSrc+")");	//在个人店铺主页渲染新的头像
		$("aside>header>.player-head").css("background-image","url("+headSrc+")");	//在右上角个人资料卡片渲染新的头像
		// $(".player-store>li>.head").css("background-image","url("+headSrc+")");	
		
		$("#alert,#alert>.alert-edit").fadeOut(50);		//设置完成后隐藏窗口
	});
	$(".shop-name-val, .myself-qq-val").focus(function(){	//正在编辑内容时
		$(this).css("border-bottom","0.2rem solid limegreen");
	});
	$(".shop-name-val, .myself-qq-val").blur(function(){	//编辑完成后
		$(this).css("border-bottom","0.2rem solid rgb(88,88,88)");
	});
	$('#chooseImage').on('change',function(){	//上传头像
		var filePath = $(this).val(),         //获取到input的value，里面是文件的路径
		fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
		Src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
		if( !fileFormat.match(/.png|.jpg|.jpeg|.jfif/) ) {
			alert('上传错误,图片格式必须为：png/jpg/jpeg/jfif');
			return;  
		}
		$('#Img').html("");
		$('#Img').css("background-image","url("+Src+")");
		headSrc = Src;
	});
	$(".my-shop>header>.back").click(function(){	//店铺详情页点击返回（返回到店铺列表）
		if(nowPage=="玩家店铺"){
			$(".player-store").show();	//显示玩家店铺列表
			$(".my-shop").hide();	//隐藏店铺详情页面
			$(".head-tool").show();	//显示头部工具栏
			$(".head-tool>.serch").show();	//显示搜索框
			$(".head-tool>.sort").show();	//显示排序方式
			$(".head-tool>.refresh").show();	//显示刷新按钮
			$(".head-tool>h1").text("玩家店铺");	//头部标题命名为'玩家店铺'
			$(".head-tool>.serch").show();	//显示搜索栏
			nowPage = "玩家店铺";
		}else if(nowPage=="玩家售卖区"||nowPage=="玩家求购区"){
			$(".head-tool").show();	//显示头部工具栏
			$(".my-shop").hide();	//隐藏店铺详情页面
			$(".player-com").show();	//显示 玩家售卖/求购区 页面
			if(nowPage=="玩家售卖区"){
				pst = "出售";
			}else if(nowPage=="玩家求购区"){
				pst = "求购";
			}
		}
		
	});
	
	$(".sitems-list").on("click","li",function(){	//玩家店铺内物品 点击事件
		var xb1 = $(".my-shop").data("index");	//获取店主在数组中的下标
		var xb2 = $(this).data("index");		//获取物品在数组中的下标
		playerCom(xb1,xb2);
	});
	//购买其它玩家商品 订单确认页面 关闭窗口
	$(".player-order>.window>footer>.close").click(function(){
		$(".player-order").hide();
	});
	$(".player-order>.window>header>i").click(function(){
		$(".player-order").hide();
	});
	
	//下面是玩家 售卖/求购区 相关内容
	$(".player-com").on("click","li",function(){
	//$(".player-com>li").click(function(){
		var xb1 = $(this).data("index1");		//获取店铺在数组中的下标
		var xb2 = $(this).data("index2");		//获取物品在数组中的下标
		playerCom(xb1,xb2);
	});
	//.player-com>li>.content>.shop
	$(".player-com").on("click","li>.content>.shop",function(e){	//售卖/求购区 点击店铺名称打开对应店铺
		e.stopPropagation();	//防止事件冒泡(不触发父元素的点击事件)
		//$(".Trade-ware>.btn-2>div").click();
		$(".head-tool").hide();
		$(".player-com").hide();
		$(".my-shop").show();
		$(".my-shop>header>.back").show();
		$(".my-shop>header>.right,.my-shop>header>.edit").css("float","left");
		var xb = $(this).parents(".player-com>li").data("index1");	//获取店主在数组中的下标
		GeneratePStore(xb,pst);
		if(pst=="出售"){
			$(".my-shop>section>nav>.sell").click();
		}else if(pst=="求购"){
			$(".my-shop>section>nav>.need").click();
		}
	});
	//售卖/求购区 商品卡片 商店名称 悬浮特效
	$(".player-com").on("mouseenter","li>.content>.shop",function(e){
		e.stopPropagation();	//防止事件冒泡(不触发父元素的点击事件)
		$(this).find("span").css({
			"text-decoration":"underline",
			"font-weight":"bold"
		});
	});
	$(".player-com").on("mouseleave","li>.content>.shop",function(e){
		e.stopPropagation();	//防止事件冒泡(不触发父元素的点击事件)
		$(this).find("span").css({
			"text-decoration":"none",
			"font-weight":"normal"
		});
	});
	//头部工具栏
	$(".head-tool>.sort>.s-page").click(function(){		//商品排序方式:展开列表选择排序方式
		if(nowPage=="玩家店铺"){
			$(".head-tool>.sort").css({
				"height":"300%",
				"border-radius":"1rem",
				"border":"1px solid white",
				"box-shadow":"0 0 0.4rem rgb(200,200,200)"
			}).find(".s-page").css("font-weight","bold");
		}else if(nowPage=="物资求购"||nowPage=="玩家售卖区"||nowPage=="玩家求购区"){
			$(".head-tool>.sort").css({
				"height":"200%",
				"border-radius":"1rem",
				"border":"1px solid white",
				"box-shadow":"0 0 0.4rem rgb(200,200,200)"
			}).find(".s-page").css("font-weight","bold");
		}
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
	
	$(".head-tool>.back").click(function(){		//头部工具栏返回按钮
		if(nowPage=="物资求购"){		//如果当前访问的是物资求购界面
			//隐藏头部工具栏及相关功能
			$(".head-tool,.head-tool>.serch,.head-tool>.sort,.head-tool>.refresh,.head-tool>.back").hide();
			$(".buying").hide();	//隐藏物资求购页面
			$(".my-shop").show();	//显示个人商店页面
		}
	});
});