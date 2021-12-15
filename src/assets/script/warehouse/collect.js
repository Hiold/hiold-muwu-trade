var collCard = '<li class="coll-items"><div class="left"><img src="images/ItemIcons/casinoCoin.png"></div><div class="right"><div class="Name"><span class="name">公爵赌场币</span> <span class="num">x20000</span></div><div class="coll-num">123人收藏</div><div class="price"><i></i><span>100</span></div><div class="icon"></div></div></li>';

//对玩家收藏数组更改储存格式，以方便在js中调用
function arrCollToObj(){
	playerCollects = {};
	
	if(playerCollect[playerIndex]==undefined){	//如果玩家下标对应的数组没有任何东西，创建一个新的数组
		playerCollect[playerIndex] = [[playerName,steamID]];
		//console.log("创建收藏数组")
	}
	//console.log(playerCollect[playerIndex])
	playerCollects.data = [playerCollect[playerIndex]];
	for(var i=1;i<playerCollect[playerIndex].length;i++){	//遍历当前登录玩家的收藏数组
		//下面3个数据能指定唯一的商品
		playerCollects.data[i] = {}
		playerCollects.data[i].id = playerCollect[playerIndex][i][0];		//物品ID
		playerCollects.data[i].quality = playerCollect[playerIndex][i][1].split(":")[1];//物品品质
		playerCollects.data[i].num = playerCollect[playerIndex][i][2].split(":")[1];	//物品售卖数量
		
		//下面是要根据ID从商品数据中获取其它内容 以便于在页面给玩家显示
		var id = playerCollects.data[i].id;		//收藏物品的ID
		var qua = playerCollects.data[i].quality*1;	//收藏物品的品质
		var num = playerCollects.data[i].num*1;		//收藏物品的售卖数量
		var find = false;	//默认为在商品列表中没有找到可匹配的商品
		for(var j=0;j<shop.data.length;j++){	//遍历所有商品
			if(shop.data[j].show=="true"||shop.data[j].show=="auto"){		//只匹配在页面显示的商品
				var sID = shop.data[j].id;		//获取商品ID
				var sQua = shop.data[j].quality*1;	//获取商品品质
				var sNum = shop.data[j].num*1;	//获取商品数量
				//如果3条数据同时匹配正确，说明收藏的就是这个商品
				if(sID==id&&sQua==qua&&sNum==num){
					playerCollects.data[i].xb = j;	//保存物品在商品列表中的下标，以方便以后调用
					playerCollects.data[i].name = shop.data[j].name;	//获取商品名称
					playerCollects.data[i].image = shop.data[j].image;	//获取商品图片
					playerCollects.data[i].class = shop.data[j].class1;	//获取物品分类
					playerCollects.data[i].currency = shop.data[j].currency;	//获取货币类型
					//下面要根据设置的折扣来显示实际的价格
					if(shop.data[j].discount<10&&shop.data[j].discount>0){		//如果折扣在0~10之间
						var price = Math.round(shop.data[j].price*shop.data[j].discount/10);	//计算出折扣后的价格（优惠价）
						playerCollects.data[i].price = price;	//显示的价格为折扣后的价格
						//console.log("折扣价");
					}else if(shop.data[j].discount=="auto"||shop.data[j].discount=="true"){	//如果折扣设置的是"auto"或"true"
						var price = shop.data[j].prefer;
						playerCollects.data[i].price = price;	//显示的价格为优惠价
						//console.log("优惠价");
					}else{	//其它情况直接用原本的价格
						playerCollects.data[i].price = shop.data[j].price;
						//console.log("原价");
					}
					playerCollects.data[i].collect = shop.data[j].collect;	//获取收藏数量
					find = true;
					break;
				}
			}
		}
		//如果遍历完数组后仍然没匹配到商品，说明收藏的这个物品在商品列表中不存在。（这个商品可能被修改过或者已删除）
		if(!find){
			//console.log(id+"---"+sNum+"---"+num);
			playerCollects.data[i].xb = undefined;
			playerCollects.data[i].name = queryItems(true,id).name;
			playerCollects.data[i].image = "images/alert.png";
			//playerCollects.data[i].num = 0;
			playerCollects.data[i].currency = "积分";
			playerCollects.data[i].price = "物品已失效";
			playerCollects.data[i].collect = 1;
		}
		
		
	}
	//console.log(playerBoxs)
}
arrCollToObj();
	
function GenerateColl(type){	//将收藏列表渲染到页面
	$(".collect-box>.coll-items").remove();	//移除收藏列表所有物品卡片
	for(var i=1;i<playerCollects.data.length;i++){	//遍历收藏数组
		$(".collect-box").append(collCard);
		//下标
		$(".collect-box>li:last").attr("data-index",i);
		//名称
		//var name = deleteBBcode(playerCollects.data[i].name);
		$(".collect-box>li:last").find(".name").text(playerCollects.data[i].name);
		//图片
		$(".collect-box>li:last").find(".left").find("img").attr("src",playerCollects.data[i].image);
		//图片背景颜色
		if(playerCollects.data[i].xb==undefined){	//已失效商品
			$(".collect-box>li:last").css({"box-shadow":"0 0 0.5rem rgb(255,50,50) inset, 0 0 0.3rem rgb(255,50,50)"});
			$(".collect-box>li:last>.left").css({"background-color":"rgba(255,100,100,0.2)"});
		}else{
			if(playerCollects.data[i].class=="物块模型"){
				$(".collect-box>li:last").css({"box-shadow":"0 0 0.5rem #2fb238 inset, 0 0 0.3rem #2fb238"});
				$(".collect-box>li:last>.left").css({"background-color":"rgba(0,255,0,0.2)"});
			}else if(playerCollects.data[i].class=="物品资源"){
				$(".collect-box>li:last").css({"box-shadow":"0 0 0.5rem #ffa500 inset, 0 0 0.3rem #ffa500"});
				$(".collect-box>li:last>.left").css({"background-color":"rgba(255,188,0,0.2)"});
			}else{
				$(".collect-box>li:last").css({"box-shadow":"0 0 0.5rem #BA55D3 inset, 0 0 0.3rem #BA55D3"});
				$(".collect-box>li:last>.left").css({"background-color":"rgba(186,85,211,0.2)"});
			}
		}
		//数量
		var num = playerCollects.data[i].num*1;
		$(".collect-box>li:last").find(".num").show().text("x"+num);
		if(num<=1){
			$(".collect-box>li:last").find(".num").hide();
		}
		//收藏量
		$(".collect-box>li:last").find(".coll-num").text(playerCollects.data[i].collect+"人收藏")
		//货币类型
		var cur = playerCollects.data[i].currency;
		if(cur=="积分"){
			$(".collect-box>li:last").find(".price").find("i").css("background-image","url(images/icon/jf2.png)");
		}else if(cur=="钻石"){
			$(".collect-box>li:last").find(".price").find("i").css("background-image","url(images/icon/red-zs.png)");
		}
		//价格
		$(".collect-box>li:last").find(".price").find("span").text(playerCollects.data[i].price);
		
		//分类验证: 如果不是想要显示的分类
		if(type=="特殊物品"){type="特殊商品"}
		if(type!="全部"&&playerCollects.data[i].class!=type){
			$(".collect-box>li:last").remove();
		}else{
			
		}
		
	}
	//显示方式
	if(Display=="card"){		//如果显示方式为卡片
		$(".head-tool>.display>.l1").click();
	}else if(Display=="icon"){	//如果显示方式为图标
		$(".head-tool>.display>.l2").click();
	}
	//检测物品数量
	var num = $(".collect-box>li").length;
	console.log(getTime().date+"\n当前分区收藏物品数量:"+num);
	if(num==0){
		$(".collect-box>.empty").show();
		$(".collect-box>.empty").find("span").html("收藏夹是空的<br>快去商城逛逛吧");
	}else{
		$(".collect-box>.empty").hide();
	}
}

$(document).ready(function(){
	function cardToIcon(){	//将卡片转换为图标
		$(".coll-items>.right").hide();		//隐藏右侧物品信息
		//$(".ware-items>section>.left>.img>.quality").css("opacity","0");		//隐藏品质（仅保留图片）

		$(".coll-items>.left>.img").css({	//调整图片区域的样式
			"transform":"scale(0.9)"
		});
		$(".coll-items").css({	//调整整个卡片的样式
			"width":"14.6%",
			"height":"7rem",
			"padding":"1%"
		});
	}
	function iconToCard(){	//将图标转换为卡片
		$(".coll-items>.right").show();		//显示右侧物品信息
		//$(".ware-items>section>.left>.img>.quality").css("opacity","1");
				//隐藏品质（仅保留图片）
		$(".coll-items>.left>.img").css({	//调整图片区域的样式
			"transform":"scale(0.8)"
		});
		$(".coll-items").css({	//调整整个卡片的样式
			"width":"48%",
			"height":"8.5rem",
			"padding":"2%"
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
	
	var openCard = true;
	$(".collect-box").on("click",".coll-items",function(){	//我的收藏物品: 点击跳转到商品详情界面
		if(openCard){
			var xb = $(this).data("index");		//获取这个物品在收藏数组中的下标
			var xb2 = playerCollects.data[xb].xb;	//获取这个物品在商品列表中的下标
			if(xb2==undefined){	//已失效物品
				var con = confirm("这个物品已经失效了！\n可能是管理员下架或者修改了此物品\n是否取消收藏？");
				if(con){
					//删除玩家收藏数组里的这个商品并重新渲染页面
					playerCollect[playerIndex].splice(xb,1);
					console.log(playerCollect)
					arrCollToObj();
					GenerateColl(collClass);
				}
			}else{	//商店正常出售的商品
				var type = playerCollects.data[xb].class;	//获取这个商品的分类
				setTimeout(function(){
					//$(".Main-menu>.menu-1").click();
					$(".Main-menu>li").data("click",false);
					$(".Main-menu>li").css({
						"opacity":"0.8",
						"transform":"scale(1.0)"
					});
					$(".Main-menu>.menu-1").data("click",true);
					$(".Main-menu>.menu-1").css({
						"opacity":"1",
						"transform":"scale(1.1)"
					});
					$("main>article").load("page/shop.html",function(){
						setTimeout(function(){
						if(type=="物块模型"){
							$(".Category>.btn-2").click();
						}else if(type=="物品资源"){
							$(".Category>.btn-3").click();
						}else if(type=="特殊商品"){
							$(".Category>.btn-5").click();
						}else{
							alert("物品类型错误！");
							return;
						}
						//$(".items-box>.items").eq(xb2)
						//遍历当前显示的商品
						for(var i=0;i<$(".items-box>.items").length;i++){
							var index = $(".items-box>.items").eq(i).data("index");
							if(index==xb2){		//找到对应商品
								$(".items-box>.items").eq(i).click();
								formPage = "collect";
							}
						}
						},50);
					});
				},10);
			}
		}
	});
	$(".collect-box").on("click",".icon",function(){	//取消收藏
		openCard = false;
		var con = confirm("是否取消收藏？");
		if(con){
			//删除玩家收藏数组里的这个商品并重新渲染页面
			var xb = $(this).parents(".coll-items").data("index");	//物品在收藏数组中的下标
			var xb2 = playerCollects.data[xb].xb;	//物品在商品列表中的下标
			if(xb2!=undefined){	//如果商品列表中存在这个商品（表示玩家收藏后这个商品还没有失效，如果是失效商品就不进行下面的操作）
				var collNum = shop.data[xb2].collect*1;	//获取商品的收藏量
				collNum --;		//收藏量-1
				shop.data[xb2].collect = collNum;	//将更新的收藏量保存到OBJ
				$(".game-items item").eq(xb2).find("[name='收藏']").attr("value",collNum);	//将更新的收藏量保存到xml列表
			}
			playerCollect[playerIndex].splice(xb,1);	//在玩家收藏数组中删除这个物品
			//console.log(playerCollect)
			arrCollToObj();		//重新将收藏数组转化为obj格式
			GenerateColl(collClass);	//生成更新的收藏列表
		}
		
		
		setTimeout(function(){openCard=true;},100);
	});
	
	
	
	
	
	
	
	$(".head-tool>.back").click(function(){
		$(".Main-menu>.menu-2").click();
	});
});