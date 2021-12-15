$(document).ready(function(){
	//var clickMain = false;	//默认状态为 可点击主菜单
	var clickMainInterval = 300;	//点击主菜单的时间间隔（毫秒）
	//资料卡
	$("aside>header>.more").click(function(){	//资料卡 - 显示更多
		var more = $("aside>header").data("more");
		if(!more){
			$("aside>header").css("height","84%");
			$("aside>header").data("more",true);
			$("aside>header>li,aside>header>ul").slideDown(100);
			$("aside>header>.rech").show(200);
			$(this).text("隐藏列表▲");
			
		}else{
			$("aside>header").css("height","7.2em");
			$("aside>header").data("more",false);
			$("aside>header>li,aside>header>ul").slideUp(200);
			$("aside>header>.rech").hide();
			$(this).text("显示更多▼");
		}
	});
	$("aside>header>.btn-1").click(function(){	//基础信息
		$("aside>header>.btn-2").css({
			"background":"rgba(255,255,255,0.5)",
			"border-bottom":"1px solid rgb(230,230,230)"
		});
		$(this).css({
			"background":"rgba(255,255,255,0.8)",
			"border-bottom":"2px solid rgb(160,160,200)"
		});
		$(".aside-profile>.page2").hide();
		$(".aside-profile>.page1").show();
	});
	$("aside>header>.btn-2").click(function(){	//专属客服
		$("aside>header>.btn-1").css({
			"background":"rgba(255,255,255,0.5)",
			"border-bottom":"1px solid rgb(230,230,230)"
		});
		$(this).css({
			"background":"rgba(255,255,255,0.8)",
			"border-bottom":"2px solid rgb(160,160,200)"
		});
		$(".aside-profile>.page1").hide();
		$(".aside-profile>.page2").show();
	});
	$("aside>header>.rech").click(function(){	//会员卡
		Alert("请联系服主充值会员或咨询相关内容");
		popupCss(26,13);
	});
	
	//主菜单按钮
	$(".Main-menu>li").hover(function(){		//主菜单按钮悬停特效
			var ck = $(this).data("click");
			if(!ck){
				$(this).css("opacity","1");
			}
		},function(){
			var ck = $(this).data("click");
			//alert(ck)
			if(!ck){
				$(this).css("opacity","0.8");
			}
	});
	$(".Main-menu>li").click(function(){		//主菜单按钮点击特效
		if(clickMain){
			$(".Main-menu>li").data("click",false);
			$(".Main-menu>li").css({
				"opacity":"0.8",
				"transform":"scale(1.0)"
			});
			$(this).data("click",true);
			$(this).css({
				"opacity":"1",
				"transform":"scale(1.1)"
			});
		}
	});

	$(".Main-menu>.menu-1").click(function(){	//按钮⑴-积分商城
		if(clickMain){	//如果状态为可点击主菜单
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n正在加载页面 - 积分商城 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				//先禁止定时刷新商品, 避免在商品页加载完成后两个刷新商品的定时函数起冲突叠加
				clearInterval(refreshItems);
			}
			$("main>article").load("page/shop.html",function(){
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n积分商城 页面加载完成")
				},clickMainInterval);
				
			});
		}else{
			console.log(getTime().date+"\n积分商城页面加载失效, 可能是你在短时间内重复点击 或者 制作人员设置了不可点击主菜单");
		}
	});
	$(".Main-menu>.menu-2").click(function(){	//按钮⑵-个人仓库
		if(clickMain){	//如果状态为可点击主菜单
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n正在加载页面 - 个人仓库 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				clearInterval(refreshItems);	//禁止定时刷新商品
			}
			$("main>article").load("page/ware.html",function(){
				$(".head-tool,.warehouse,.Category-ware").hide();
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n个人仓库 页面加载完成")
				},clickMainInterval);
			});
			setTimeout(function(){	//延迟淡入显示页面是为了有更好的视觉效果
				$(".warehouse").fadeIn(200);
				$(".head-tool").fadeIn(50);
				$(".Category-ware").fadeIn(50);
				adaptive();
			},100);
			//("warehouse>.loading").show();
		}else{
			console.log(getTime().date+"\n个人仓库页面加载失效, 可能是你在短时间内重复点击 或者 制作人员设置了不可点击主菜单");
		}
	});
	$(".Main-menu>.menu-3").click(function(){	//按钮⑶-交易中心
		//alert(getTime().date+"\n页面正在制作中，敬请期待！");
		//return;
		if(clickMain){	//如果状态为可点击主菜单
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n加载页面 - 交易中心 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				clearInterval(refreshItems);	//禁止定时刷新商品
			}
			$("main>article").load("page/trade.html",function(){
				$(".my-shop,.Trade-ware").hide();
				setTimeout(function(){$(".Trade-ware>.btn-1>div").click();},50);
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n交易中心 页面加载完成")
				},clickMainInterval);
			});
			setTimeout(function(){	//延迟淡入显示页面是为了有更好的视觉效果
				//$(".player-store").fadeIn(200);
				$(".my-shop").fadeIn(200);
				//$(".head-tool").fadeIn(50);
				$(".Trade-ware").fadeIn(50);
				adaptive();
			},100);
		}else{
			console.log(getTime().date+"\n交易中心页面加载失效, 可能是你在短时间内重复点击 或者 制作人员设置了不可点击主菜单");
		}
	});
	$(".Main-menu>.menu-4").click(function(){	//按钮⑷-活动礼包
		if(clickMain){	//如果状态为可点击主菜单
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n加载页面 - 活动礼包 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				clearInterval(refreshItems);	//禁止定时刷新商品
			}
			$("main>article").load("page/activity.html",function(){
				
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n活动礼包 页面加载完成");
					$(".Activity-nav>.btn-3").click();
				},clickMainInterval);
			});
			setTimeout(function(){	//延迟淡入显示页面是为了有更好的视觉效果
				// $(".warehouse").fadeIn(200);
				// $(".head-tool").fadeIn(50);
				// $(".Category-ware").fadeIn(50);
				adaptive();
			},100);
		}else{
			console.log(getTime().date+"\n活动礼包页面加载失效, 可能是你在短时间内重复点击 或者 制作人员设置了不可点击主菜单");
		}
	});
	
	//右下角 小按钮
	$(".Main-menu>.min>.m1").click(function(){	//签到
		if(clickMain){
			$(".Main-menu>li").data("click",false);
			$(".Main-menu>li").css({
				"opacity":"0.8",
				"transform":"scale(1.0)"
			});
			$(".Main-menu>.menu-4").data("click",true);
			$(".Main-menu>.menu-4").css({
				"opacity":"1",
				"transform":"scale(1.1)"
			});
			clickMain = false;	//将状态设置为不可点击
			console.log(getTime().date+"\n加载页面 - 活动礼包 ......");
			if(onRefreshItems){	//如果开启了定时刷新商品模式
				clearInterval(refreshItems);	//禁止定时刷新商品
			}
			$("main>article").load("page/activity.html",function(){
				
				//等页面加载完成后 规定时间间隔外 再将主菜单状态设置为可点击
				setTimeout(function(){
					clickMain = true;	
					console.log(getTime().date+"\n活动礼包 页面加载完成");
					$(".Activity-nav>.btn-5").click();
					
				},clickMainInterval);
			});
			setTimeout(function(){	//延迟淡入显示页面是为了有更好的视觉效果
				// $(".warehouse").fadeIn(200);
				// $(".head-tool").fadeIn(50);
				// $(".Category-ware").fadeIn(50);
				adaptive();
			},100);
		}
	});
	$(".Main-menu>.min>.m2").click(function(){	//兑换
		Prompt("请输入您的CDK兑换码","");
		popupCss(25,14);
		$("#alert>.alert>footer>.confirm").unbind("click");
		$("#alert>.alert>footer>.confirm").click(function(){
			//........
			
			
			Alert("兑换失败！");
			popupCss(25,13);
		});
	});
	
});