var teleCard = '<li><div class="name"></div></li>';

function GeneratTele(){		//生成传送列表并渲染到页面
	$(".More-tele>li").remove();	//先移除传送列表所有卡片
	var len = $(".More-tele>.load tele").length;	//获取设置了多少个传送点
	for(var i=0;i<len;i++){	//遍历传送列表
		$(".More-tele").append(teleCard);
		//下标
		$(".More-tele>li:last").attr("data-index",i);
		//名称
		var name = $(".More-tele>.load tele").eq(i).attr("name");
		$(".More-tele>li:last").find(".name").text(name);
		//图片
		var img = $(".More-tele>.load tele").eq(i).find("[name='图片']").attr("value");
		$(".More-tele>li:last").css("background-image","url(images/tele/"+img+")");
	}
}

$(document).ready(function(){
	//更多功能
	$(".More-all>.l1").click(function(){		//CDK兑换
		Prompt("请输入您的CDK兑换码","");
		popupCss(25,14);
		$("#alert>.alert>footer>.confirm").unbind("click");
		$("#alert>.alert>footer>.confirm").click(function(){
			//........
			
			
			Alert("兑换失败！");
			popupCss(25,13);
		});
	});
	$(".More-all>.l2").click(function(){		//充值赞助
		if(clickMain){	//如果状态为可点击主菜单
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n加载页面 - 充值赞助 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				clearInterval(refreshItems);	//禁止定时刷新商品
			}
			$(".Main-menu>li").data("click",false);
			$(".Main-menu>li").css({
				"opacity":"0.8",
				"transform":"scale(1.0)"
			});
			$("main>article").load("page/recharge.html",function(){
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n充值赞助 页面加载完成");
					$(".Rech-nav>.btn-1").click();
				},clickMainInterval);
			});
			setTimeout(function(){	//延迟淡入显示页面是为了有更好的视觉效果
				//$(".player-store").fadeIn(200);
				//$(".More-seting").fadeIn(200);
				//$(".head-tool").fadeIn(50);
				$(".Rech-nav").fadeIn(100);
				adaptive();
			},100);
		}else{
			console.log(getTime().date+"\n充值赞助页面加载失效, 可能是你在短时间内重复点击");
		}
	});
	$(".More-all>.l3").click(function(){		//积分转账
		Prompt("请输入您要转账的 <font color='dodgerblue'>玩家</font>","");
		popupCss(25,14);
		$("#alert>.alert>footer>.confirm").unbind("click");
		$("#alert>.alert>footer>.confirm").click(function(){
			//........
			Prompt("请输入您要转账的 <font color='red'>金额</font>","");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").unbind("click");
			$("#alert>.alert>footer>.confirm").click(function(){
				//........
				
				
				Alert("转账失败！");
				popupCss(25,13);
			});
		});
	});
	$(".More-all>.l4").click(function(){		//相关网站
		$(".head-tool>h1").text("相关网站");
		$(".head-tool>.back").fadeIn(100);
		$(".More-page>div").hide();
		$(".More-web").fadeIn(100);
	});
	$(".More-all>.l5").click(function(){		//快捷传送
		$(".head-tool>h1").text("快捷传送");
		$(".head-tool>.back").fadeIn(100);
		$(".More-page>div").hide();
		$(".More-tele").fadeIn(100);
		$(".More-page>footer").fadeIn(100);
		$(".More-tele>.load").load("Config/tele.xml",function(){
			GeneratTele();	//渲染传送列表到页面
			$(".More-tele>li:first").click();
		});
	});
	$(".More-all>.l6").click(function(){		//玩家留言
		Alert("功能正在制作中，敬请期待！");
		popupCss(25,13);
	});
	
	$(".More-web>li").click(function(){		//相关网站 跳转网页
		var weburl = $(this).data("web");
		 window.open(weburl);
	});
	$(".More-tele").on("click","li",function(){	//快捷传送 传送卡片
		$(".More-tele>li").css("border","0.1rem solid white");
		$(this).css("border","0.15rem solid orangered");
	
		var xb = $(this).data("index");
		$(".More-page>footer").data("index",xb);
		var currency = $(".More-tele>.load tele").eq(xb).find("[name='消耗']").attr("item");		//消耗货币(ID)
		var currIcon = "images/icon/jf2.png";	//消耗货币的图标路径，这一步需要从后端获取这个图标，假设货币为积分。
		//下面是获取货币的汉化名称，先从汉化文件(后端)获取，如果汉化文件(后端)找不到这个物品，说明它可能是网页专属物品，再从商品列表获取即可。
		var currName = queryItems(true,currency).name;
		if(currName==currency){
			var xbs = queryShopItems(currency);
			if(xbs>=0){
				currName = shop.data[xbs].name;
			}
		}
		if(currName=="point"){currName="积分"}
		if(currName=="diamond"){currName="钻石"}
		
		var price = $(".More-tele>.load tele").eq(xb).find("[name='消耗']").attr("value");	//消耗数量
		var command = $(".More-tele>.load tele").eq(xb).find("[name='命令']").attr("value");	//传送命令
		if(price==0){price="免费传送"}
		
		$(".More-page>footer").find(".price").find("i").css("background-image","url("+currIcon+")");
		$(".More-page>footer").find(".price").html("<i></i> "+currName+"：<font color='MediumPurple'>"+price+"</font>");
		$(".More-page>footer>.command").find("span").text(command);
	});
	$(".More-page>footer>.put").click(function(){	//开始传送
		var xb = $(this).parents("footer").data("index");
		var name = $(".More-tele>.load tele").eq(xb).attr("name");
		var currency = $(".More-tele>.load tele").eq(xb).find("[name='消耗']").attr("item");		//消耗货币
		var price = $(".More-tele>.load tele").eq(xb).find("[name='消耗']").attr("value")*1;	//消耗数量
		var zb = $(".More-tele>.load tele").eq(xb).find("[name='坐标']").attr("value");	//传送坐标
		//下面是获取货币的汉化名称，先从汉化文件(后端)获取，如果汉化文件(后端)找不到这个物品，说明它可能是网页专属物品，再从商品列表获取即可。
		var currName = queryItems(true,currency).name;
		if(currName==currency){
			var xbs = queryShopItems(currency);
			if(xbs>=0){
				currName = shop.data[xbs].name;
			}
		}
		if(currName=="point"){currName="积分"}
		if(currName=="diamond"){currName="钻石"}
		
		Confirm("<span style='font-size:0.9em;color:rgb(123,123,123);'>您当前选中的位置是：</span><font color='green'>"+name+"</font><br><span style='font-size:0.9em;color:rgb(123,123,123);'>位置坐标为：</span><font color='dodgerblue'>"+zb+"</font><br><span style='font-size:0.9em;color:rgb(123,123,123);'>传送需要消耗：</span><font color='orange'>"+price+"</font> "+currName+"<br><font color='orangered'>是否确认传送？</font>");
		popupCss(25,17);
		$("#alert>.alert>footer>.confirm").click(function(){	//确认传送
			if(currency=="point"){	//消耗积分
				var playerPoint = players.data[playerIndex].points*1;	//获取当前登录玩家拥有的积分
				if(playerPoint<price){
					Alert("<font color='red'>您的积分不足，传送失败！</font>");
					popupCss(25,13);
					return;
				}else{
					playerPoint -= price;
					players.data[playerIndex].points = playerPoint;	//保存更新后的玩家积分
					$("main>header>.Point>span").text(playerPoint);
					$(".my-jf>span").text(playerPoint);
					//接下来要开始从后台对玩家进行传送
					//。。。
					Alert("<font color='green'>传送成功！</font>");
					popupCss(22,13);
				}
				
			}else if(currency=="diamond"){	//消耗钻石
				var playerDiamond = players.data[playerIndex].diamonds*1;	//获取当前登录玩家拥有的钻石
				if(playerDiamond<price){
					Alert("<font color='red'>您的钻石不足，传送失败！</font>");
					popupCss(25,13);
					return;
				}else{
					playerDiamond -= price;
					players.data[playerIndex].diamonds = playerDiamond;	//保存更新后的玩家钻石
					$("main>header>.Diamond>span").text(playerDiamond);
					$(".my-zs>span").text(playerDiamond);
					Alert("<font color='green'>传送成功！</font>");
					popupCss(22,13);
				}
			}else{	//消耗仓库内物品
				//这一步需要验证仓库是否有符合要求和足够数量的货币物品
				var xbw = queryWareItems(currency);
				if(xbw>=0){		//仓库里找到了这个物品
					var wNum = playerWares.data[xbw].num*1;	//获取仓库内这个物品的数量
					if(wNum<price){
						Alert("<font color='red'>消耗品数量不足，传送失败！</font>");
						popupCss(25,13);
						return;
					}else{	//如果符合要求，扣除仓库里这个消耗品对应的数量并开始传送玩家
						wNum -= price;
						playerWares.data[xbw].num = wNum;	//保存更新后的仓库消耗品数量
						if(wNum==0){	//如果物品刚好消耗完了，则删除这个物品
							playerWare[playerIndex].splice(xbw,1);
						}
						//接下来要开始从后台对玩家进行传送
						//。。。
						Alert("<font color='green'>传送成功！</font>");
						popupCss(22,13);
					}
				}else{	//仓库没有找到这个物品
					Alert("<font color='red'>传送失败！</font><br>原因：你的仓库里没有"+currName);
					popupCss(25,14);
					return;
				}
			}
		});
		
	});
	
	$(".head-tool>.back").click(function(){		//返回
		$(".More-page>div").hide();
		$(".head-tool>h1").text("更多功能");
		$(".head-tool>.back").hide();
		$(".More-page>footer").hide();
		$(".More-all").fadeIn(200);
	});
	
});