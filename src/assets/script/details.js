var couCard = '<li class="coupon-card"><div class="left"><span class="curr"></span><br><span class="type"></span>	</div><div class="right"><div class="cond">满 <span class="s1"></span> <span class="s0"></span> <span class="s2"></span> <span class="s3">折</span></div><div class="period"><span class="date">2099-12-31 到期</span> <span class="num">仅剩1张</span></div></div><div class="select"><span>✔</span></div></li>';
var inputNum;		//定时函数:自动校验输入的内容是否符合规范
var lastNum = 1;	//上次输入的数量
function detectNum(){		//检测输入的数量
	var xb = $(".items-details").data("index");
	//stock = $(".spxq>.stock").text().split(": ")[1].split("）")[0]*1;	//获取当前库存
	var id = shop.data[xb].id;
	var stock = shop.data[xb].stock*1;		//获取当前库存
	var xgDay = shop.data[xb].xgDay*1;		//每日限购
	var xgAll = shop.data[xb].xgAll*1;		//总限购
	//var buyDay = $(".spxq>.limit>.xg2>.txt").text().split("/")[0];
	//var buyAll = $(".spxq>.limit>.xg3>.txt").text().split("/")[0];
	var buyDay = 0;		//今日已购买数量
	var buyAll = 0;		//历史购买总数量
	var findHis = false;	//商品历史购买数据（默认为没找到数据）
	for(var i=1;i<playerBuy[playerIndex].length;i++){	//遍历商品购买数据数组
		var id2 = playerBuys.data[i].id;	//获取数组中的物品id
		if(id==id2){	//如果数组中找到了这个商品
			buyDay = playerBuys.data[i].numDay*1;
			buyAll = playerBuys.data[i].numAll*1;
			findHis = true;
			break;
		}
	}
	if(!findHis){	//如果遍历玩数组后仍然没找到这个物品
		//创建一个新的数组用于储存玩家购买数据并保存
		playerBuy[playerIndex][playerBuy[playerIndex]] = [id,"今日已购买数量:0","总购买数量:0"];
		arrbuyToObj();
	}
	
	if(isNaN(stock)){stock=999999999}
	if(isNaN(xgDay)){xgDay=999999999}
	if(isNaN(xgAll)){xgAll=999999999}
	if(isNaN(buyDay)){buyDay=0}
	if(isNaN(buyAll)){buyAll=0}
	inputNum = setInterval(function(){			//在输入期间循环执行下面的判断
		var num = $(".spxq>.num>input").val();	//获取输入的内容
		//console.log(num)
		if(isNaN(num)||num<0){	//如果输入的不是数字或者小于0
			num = lastNum;		//获取上次输入的数字
		}
		if(num<=1){	//当数量小于等于1时，更改减号的样式用于提醒玩家不可再减少数量
			$(".spxq>.num>.jian>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});
		}else{
			$(".spxq>.num>.jian>span").css({"color":"black","cursor":"pointer"});
		}
		if(num>=stock){num = stock;}	//数量最大不能超过 库存库存
		if(num>=xgDay-buyDay){num = xgDay - buyDay;}	//数量最大不能超过 每日限购 - 今日已购买
		if(num>=xgAll-buyAll){num = xgAll - buyAll;}	//数量最大不能超过 总限购 - 总购买数量
		//console.log(stock+"---"+xgDay+"---"+xgAll);
		if(num<stock&&num<xgDay-buyDay&&num<xgAll-buyAll){	//如果数量在所有规则限制范围内
			$(".spxq>.num>.add>span").css({"color":"black","cursor":"pointer"});	//添加样式:可以添加
		}else{		//如果数量不符合任意一条限制规则
			$(".spxq>.num>.add>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});	//添加样式:禁止添加
		}
		$(".spxq>.num>input").val(num);	//填充经过校验后的数字
		lastNum = num;	//保存一份记录
	},100);
}
$(document).ready(function(){
	$(".items-details>.back").click(function(){		//商品详情页 : 返回
		if(formPage=="collect"){	//如果是从收藏页面打开的
			// $(".Main-menu>.menu-2").click();	//加载仓库页面
			// setTimeout(function(){
			// 	$(".warehouse>.menu>.l3").click();	//点击收藏夹
			// },100);
			
			//主菜单样式
			$(".Main-menu>li").data("click",false);
			$(".Main-menu>.menu-1").data("click",true);
			$(".Main-menu>li").css({"opacity":"0.8","transform":"scale(1)"});
			$(".Main-menu>.menu-1").css({"opacity":"1","transform":"scale(1.1)"});
			//加载页面
			$("main>article").load("page/ware.html",function(){		//加载仓库页面
				$(".warehouse>.menu>.l3").click();	//点击收藏夹
			});
			
		}else if(formPage=="workbench"){	//如果是从工作台页面打开的
			// $(".Main-menu>.menu-2").click();	//加载仓库页面
			// setTimeout(function(){
			// 	$(".warehouse>.menu>.l4").click();	//点击工作台
			// 	setTimeout(function(){
			// 		//$(".citems-search>input").val(formPageItem);
			// 		//alert(formPageItem)
			// 		GenerateRecipe(formPageItem);
			// 	},200);
				
			// 	//$(".citems-search>.search-type>.t1").click();	//搜索类型为配方
			// },200);
			//--------------------------------------
			//主菜单样式
			$(".Main-menu>li").data("click",false);
			$(".Main-menu>.menu-2").data("click",true);
			$(".Main-menu>li").css({"opacity":"0.8","transform":"scale(1)"});
			$(".Main-menu>.menu-2").css({"opacity":"1","transform":"scale(1.1)"});
			//加载页面
			console.log(getTime().date+"\n正在加载页面 - 工作台 ......");
			$("body>.data-recipe").load("Config/recipes.xml",function(){	//先加载配方
				console.log(getTime().date+"\n物品配方加载成功！");
				$("main>article").load("page/work.html",function(){		//再加载工作台页面
					$(".head-tool,.workbench>aside,.work-page").hide();
					//GenerateRecipe(formPageItem);
					console.log(getTime().date+"\n工作台 页面加载成功！");
					setTimeout(function(){
						$(".workbench>aside").fadeIn(200);
						$(".work-page").fadeIn(200);
						$(".head-tool").fadeIn(50);
						setTimeout(function(){adaptive();},20);
						GenerateRecipe(formPageItem);
					},10);
				});
			});
			
			
			
			
		}else{		//如果是从商品列表页打开的
			 var xb = $(".items-details").data("index");		//获取商品下标
			 var col = $(".items-details").data("collect");	//获取商品收藏状态
			 //alert(col)
			 if(col=="true"){
				$(".items-box>li[data-index="+xb+"]").find(".collect").data("collect","true");
				$(".items-box>li[data-index="+xb+"]").find(".collect").css("background-image","url(images/icon/collect-3.png)");
			 }else{
				$(".items-box>li[data-index="+xb+"]").find(".collect").data("collect","false");
				$(".items-box>li[data-index="+xb+"]").find(".collect").css("background-image","url(images/icon/collect-1.png)");
			 }
			$(".items-details").fadeOut(200);
			$(".items-box,.head-tool").fadeIn(200);
		adaptive();
		}
	});
	$(".spxq>.num>input").focus(function(){		//购买数量 : 获取焦点
		detectNum();
	});
	$(".spxq>.num>input").blur(function(){		//购买数量 : 失去焦点
		clearInterval(inputNum);
		var num = $(".spxq>.num>input").val();
		if(num==0||num==1){
			$(".spxq>.num>input").val(1);
			$(".spxq>.num>.jian>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});
		}
	});
	$(".spxq>.num>.add").click(function(){		//购买数量 : 添加
		$(".spxq>.num>.jian>span").css({"color":"black","cursor":"pointer"});
		var xb = $(".items-details").data("index");
		var id = shop.data[xb].id;
		var stock = shop.data[xb].stock*1;		//获取当前库存
		var xgDay = shop.data[xb].xgDay*1;		//每日限购
		var xgAll = shop.data[xb].xgAll*1;		//总限购
		
		var buyDay = 0;		//今日已购买数量
		var buyAll = 0;		//历史购买总数量
		var findHis = false;	//商品历史购买数据（默认为没找到数据）
		for(var i=1;i<playerBuy[playerIndex].length;i++){	//遍历商品购买数据数组
			var id2 = playerBuys.data[i].id;	//获取数组中的物品id
			if(id==id2){	//如果数组中找到了这个商品
				buyDay = playerBuys.data[i].numDay*1;
				buyAll = playerBuys.data[i].numAll*1;
				findHis = true;
				break;
			}
		}
		if(!findHis){	//如果遍历玩数组后仍然没找到这个物品
			//创建一个新的数组用于储存玩家购买数据并保存
			playerBuy[playerIndex][playerBuy[playerIndex]] = [id,"今日已购买数量:0","总购买数量:0"];
			arrbuyToObj();
		}
		if(isNaN(stock)){stock=999999999}
		if(isNaN(xgDay)){xgDay=999999999}
		if(isNaN(xgAll)){xgAll=999999999}
		if(isNaN(buyDay)){buyDay=0}
		if(isNaN(buyAll)){buyAll=0}
		var num = $(".spxq>.num>input").val()*1;
		num += 1;
		if(num>=stock){num = stock;}	//数量最大不能超过 库存库存
		if(num>=xgDay-buyDay){num = xgDay - buyDay;}	//数量最大不能超过 每日限购 - 今日已购买
		if(num>=xgAll-buyAll){num = xgAll - buyAll;}	//数量最大不能超过 总限购 - 总购买数量
		if(num<stock&&num<xgDay-buyDay&&num<xgAll-buyAll){	//如果数量在所有规则限制范围内
			$(".spxq>.num>.add>span").css({"color":"black","cursor":"pointer"});	//添加样式:可以添加
		}else{		//如果数量不符合任意一条限制规则
			$(".spxq>.num>.add>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});	//添加样式:禁止添加
		}
		//if(num==1){$(".spxq>.num>.jian>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});}
		$(".spxq>.num>input").val(num);	//填充经过校验后的数字
		lastNum = num;	//保存一份记录
	});
	$(".spxq>.num>.jian").click(function(){		//购买数量 : 减少
		$(".spxq>.num>.add>span").css({"color":"black","cursor":"pointer"});
		var num = $(".spxq>.num>input").val()*1;
		if(num>1){
			num -= 1;
		}
		if(num<=1){
			$(".spxq>.num>.jian>span").css({"color":"rgb(180,180,180)","cursor":"not-allowed"});
		}
		$(".spxq>.num>input").val(num);	//填充经过校验后的数字
		lastNum = num;	//保存一份记录
	});
	
	$(".items-details>.left>.collect").click(function(){	//点击收藏
		var cotxt = $(this).find(".txt").text();
		var cnum = $(this).find(".num").text()*1;
		var xb = $(".items-details").data("index");
		var id = shop.data[xb].id;
		var qua = shop.data[xb].quality;
		var num = shop.data[xb].num;
		if(cotxt=="收藏"){
			cnum += 1;
			$(this).find(".txt").text("已收藏").css("color","rgb(239,90,74)");
			$(this).find("i").css("background-image","url(images/icon/collect-3.png)");
			$(this).find(".num").text(cnum);
			$(".items-details").data("collect","true");
			//增加一个数组用于储存玩家收藏的物品
			playerCollect[playerIndex][playerCollect[playerIndex].length] = [id,"品质:"+qua,"数量:"+num];
			arrCollToObj();
		}else if(cotxt=="已收藏"){
			cnum -= 1;
			$(this).find(".txt").text("收藏").css("color","gray");
			$(this).find("i").css("background-image","url(images/icon/collect-2.png)");
			$(this).find(".num").text(cnum);
			$(".items-details").data("collect","false");
			
			for(var i=0;i<playerCollects.data.length;i++){
				var cxb = playerCollects.data[i].xb;
				if(cxb==xb){
					playerCollect[playerIndex].splice(i,1);
					arrCollToObj();
					break;
				}
			}
		}
		//commodity[xb][3][4] = "玩家收藏量:"+num;
		$(".game-items item").eq(xb).find("[name='收藏']").attr("value",cnum);
		shop.data[xb].collect = cnum;
	});
	$(".items-details>.left>.collect").hover(function(){	//收藏商品:悬浮特效
		var cotxt = $(this).find(".txt").text();
		if(cotxt=="收藏"){
			$(this) .find("i").css("background-image","url(images/icon/collect-2.png)");
		}
	},function(){
		var cotxt = $(this).find(".txt").text();
		if(cotxt=="收藏"){
			$(this) .find("i").css("background-image","url(images/icon/collect-1.png)");
		}
	});
	
	// $(".spxq>.buy").click(function(){	//购买商品
	// 	$("#alert,.alert-buy").show();	//显示订单确认弹窗
		
	// });
	
	$(".spxq>.buy").click(function(){	//购买商品
		if(steamID==""){
			Confirm("您当前未登录，请登录后再来购买！<br>是否前往登录页面？");
			popupCss(25,14);
			$("#alert>.alert>footer>.confirm").click(function(){
				$("#alert>.alert>section>p").html("");	//清空文本提示内容
				$("#alert").hide();
				//console.log("点击了确认");
				window.location = "login.html"
			});
			return;
		}
		var xb = $(".items-details").data("index");	//获取保存的下标，以便于在数组中查找商品
		var num = $(".spxq>.num>input").val()*1;	//获取输入的购买数量
		var itemID = shop.data[xb].id;		//获取商品ID
		var itemName = shop.data[xb].name;	//获取商品名称（后面发送到仓库需要用到）------
		var itemQua = shop.data[xb].quality*1;//获取商品品质（后面发送到仓库需要用到）
		var sell = shop.data[xb].sell;		//获取是否可以购买or是否为VIP物品
		//检测商品是否已过期
		var expired = false;	//默认为没有过期
		if(shop.data[xb].show=="auto"){
			var year = getTime().year;	//获取当前日期: 年
			var mon = getTime().mon;	//获取当前日期: 月
			var day = getTime().day;	//获取当前日期: 日
			var hour = getTime().hour;	//获取当前时间: 时
			var min = getTime().min;	//获取当前时间: 分
			var sec = getTime().sec;	//获取当前时间: 秒
			if(year>shop.data[xb].year){	//如果当前年份在设定的年份之后（已过期）
				expired = true;
			}else if(year==shop.data[xb].year){	//如果年份相同
				if(mon>shop.data[xb].mon){	//如果当前月份在设定的月份之后（已过期）
					expired = true;
				}else if(mon==shop.data[xb].mon){	//如果月份相同
					if(day>shop.data[xb].day){	//如果当前日在设定的日之后（已过期）
						expired = true;
					}else if(day==shop.data[xb].day){	//如果日相同
						if(hour>shop.data[xb].hour){	//如果当前小时在设定的小时之后（已过期）
							expired = true;
						}else if(hour==shop.data[xb].hour){	//如果小时相同
							if(min>shop.data[xb].min){	//如果当前分在设定的分之后（已过期）
								expired = true;
							}else if(min==shop.data[xb].min){	//如果分相同
								if(sec>shop.data[xb].sec){	//如果当前秒在设定的秒之后（已过期）
									expired = true;
								}
							}
						}
					}
				}
			}
		}
		if(expired==true){
			Alert("这个商品已经过期，无法购买！");
			popupCss(25,13);
			for(var i=0;i<$(".Category>li").length;i++){	//遍历子分类按钮
				var ck = $(".Category>li").eq(i).data("click");	//获取子分类按钮的浏览状态
				if(ck=="true"){	//如果这个子分类就是玩家正在浏览的子分类
					$(".Category>li").eq(i).click();	//点击它
				}
			}
			return;
		}
		if(sell=="false"){
			Alert("当前商品暂不可购买<br>有疑问请联系服主");
			popupCss(25,14);
			return;
		}else if(sell=="vip"){
			var status = players.data[playerIndex].status;	//检测玩家身份
			if(status=="商店会员"||status=="管理员"){
				
			}else{
				Alert("只有 <font color='orangered'>商店会员</font> 才可以购买此物品！<br>你还不是会员，可以联系服主充值会员。");
				popupCss(34,15,1.1);
				return;
			}
		}
		var stock = shop.data[xb].stock;	//获取库存
		if(stock==0){
			Alert("当前商品库存不足，请联系服主补货！");
			popupCss(25,13);
			return;
		}
		var playerLv = players.data[playerIndex].level*1;	//获取玩家等级
		var lvxg = shop.data[xb].xgLevel;	//获取等级限购
		if(lvxg>0&&playerLv<lvxg){
			Alert("您的等级不符合购买要求！<br>只有 "+lvxg+" 级以上的玩家才可以购买");
			popupCss(25,14);
			// alert("你的等级"+playerLv+"---限购等级："+lvxg)
			// if(playerLv>lvxg){alert("你的等级大于限购等级")}
			// if(playerLv<lvxg){alert("限购等级大于你的等级")}
			return;
		}
		if(lvxg<0&&playerLv>lvxg*-1){
			Alert("您的等级不符合购买要求！<br>只有 "+lvxg*-1+" 级以内的玩家才可以购买");
			popupCss(25,14);
			return;
		}
		var buyDay = 1;
		var buyAll = 1;
		var xgDay = shop.data[xb].xgDay*1;
		var xgAll = shop.data[xb].xgAll*1;
		var findHis = false;	//商品历史购买数据（默认为没找到数据）
		var xx;
		for(var x=1;x<playerBuy[playerIndex].length;x++){	//遍历商品购买数据数组
			var id2 = playerBuys.data[x].id;	//获取数组中的物品id
			if(itemID==id2){	//如果数组中找到了这个商品
				buyDay = playerBuys.data[x].numDay*1;	//获取今日已购买数量
				buyAll = playerBuys.data[x].numAll*1;	//获取总购买数量
				findHis = true;
				xx = x;		//保存当前匹配到的下标，以方便在购买成功后记录购买数据时使用
			}
		}
		if(!findHis){	//如果遍历玩数组后仍然没找到这个物品
			xx = playerBuy[playerIndex].length;
			//创建一个新的数组用于储存玩家购买数据并保存
			playerBuy[playerIndex][playerBuy[playerIndex].length] = [itemID,"今日已购买数量:0","总购买数量:0"];
			arrbuyToObj();
			buyDay = 0;
			buyAll = 0;
			//console.log("创建玩家购买数据---物品名称:"+itemName+"---每日限购:"+xgDay+"---今日已购买:"+buyDay);
		}
		if(xgDay-buyDay<=0){
			Alert("今日限购已到达上限，请明天再购买！");
			popupCss(25,13);
			//console.log("每日限购:"+xgDay+"---今日已购买:"+buyDay);
			return;
		}
		if(xgAll-buyAll<=0){
			Alert("总限购已到达上限，不可再购买！");
			popupCss(25,13);
			return;
		}
		
		if(isNaN(num)){	//如果输入的内容不是数字
			Alert("请输入正确的数量！");
			return;
		}else{
			var curr = shop.data[xb].currency;	//获取货币类型
			var unit = $(".spxq").find(".price").find(".p1").text();	//获取单价
			var price = num*unit;	//物品价格 = 数量 x 单价
			var numBind = shop.data[xb].num;	//购买一件实际获得的数量
			var numAll = numBind*num;	//购买后实际发送到背包的数量
			if(curr=="积分"){
				//var con = Confirm("您当前选择购买的数量为 <span style='color:dodgerblue;'>"+num+"</span> 件<br>需要支付的价格为 <span style='color:orange;'>"+price+"</span> "+curr+"<br>是否确认要购买商品？");
			}else if(curr=="钻石"){
				//var con = Confirm("您当前选择购买的数量为 <span style='color:dodgerblue;'>"+num+"</span> 件<br>需要支付的价格为 <span style='color:rgb(249,102,112);'>"+price+"</span> "+curr+"<br>是否确认要购买商品？");
			}
			popupCss(25,16);
			
			$("#alert,.alert-buy").show();	//显示订单确认弹窗
			var icon = shop.data[xb].image;
			
			//将物品信息渲染到订单确认页面
			$(".alert-buy>section>.items>.icon>img").attr("src",icon);		//图片
			$(".alert-buy>section>.items>.content>.name").text(itemName);	//名称
			//货币图标
			if(curr=="积分"){
				$(".alert-buy>section>.items>.content>.price>i").css("background-image","url(images/icon/jf2.png)");
				$(".alert-buy>footer>.price>i").css("background-image","url(images/icon/jf2.png)");
			}else if(curr=="钻石"){
				$(".alert-buy>section>.items>.content>.price>i").css("background-image","url(images/icon/red-zs.png)");
				$(".alert-buy>footer>.price>i").css("background-image","url(images/icon/red-zs.png)");
			}
			$(".alert-buy>section>.items>.content>.price>span").text(unit);	//单价
			$(".alert-buy>section>.items>.count").text("x"+numAll);	//实际发送到背包的数量
			var offers = players.data[playerIndex].offers;	//获取玩家购物优惠(%)
			if(isNaN(offers)||offers==0){
				offers = 0;
				var disoff = 10;
				$(".alert-buy>section>.discount-vip>.val").text("-0%");
				$(".alert-buy>section>.discount-vip>.dis").hide();
				$(".alert-buy>section>.discount-vip>.none").show();
				$(".alert-buy>footer>.price>del").hide();
			}else{
				var disoff = (100-offers)/10;
				$(".alert-buy>section>.discount-vip>.val").show().text("-"+offers+"%");	//会员优惠(%)
				$(".alert-buy>section>.discount-vip>.dis").show().text(disoff+"折");	//会员折扣
				$(".alert-buy>section>.discount-vip>.none").hide();
				$(".alert-buy>footer>.price>del").show();
			}
			var payPrice = Math.round(price*disoff/10);	//玩家实际支付价格
			if(payPrice<=0){payPrice=1}		//价格至少为1，不能是负数或0
			$(".alert-buy>footer>.price>b").text(payPrice);
			$(".alert-buy>footer>.price>del").text(price);
			//查询仓库是否有可用的优惠券并渲染到页面
			$(".alert-buy .choose>li:not(:first)").remove();	//先移除所有优惠券卡片
			var maxPre = 0;	//用于储存抵用券最大优惠价格
			var cc = 0;		//保存最大优惠的抵用券在列表中的下标
			for(var c=1;c<playerWares.data.length;c++){
				//console.log(playerWares.data[c])
				var cType = playerWares.data[c].class2;	//获取仓库物品类型
				//console.log(playerWares.data[c].id)
				//console.log(cType)
				if(cType=="抵用券"){		//如果找到了优惠券
					var couId = playerWares.data[c].id;	//获取抵用券ID
					var couNum = playerWares.data[c].num;	//获取抵用券数量
					var cxb = queryShopItems(couId);	//查询商品列表中是否有这个抵用券
					if(cxb>=0){		//如果商品列表中找到了这个抵用券
						var couCurr = shop.data[cxb].couCurr;	//货币类型（积分/钻石）
						var couType = shop.data[cxb].couType;	//优惠类型（满减/折扣）
						var couPrice = shop.data[cxb].couPrice;	//购买优惠（购买商品时抵消的价格或折扣）
						var couCond = shop.data[cxb].couCond;	//限定价格（超过这个价格才能使用）
						var couDate = shop.data[cxb].couDate;	//使用期限（超过设定的日期就不可以使用了）
						//var couName = couCurr +""+ couType + "券";
						// console.log(couCond)
						// console.log(price)
						//console.log(couCurr)
						//console.log(curr)
						if(couCurr==curr&&price>=couCond){	//如果货币类型相同并且商品实际价格(不包含会员折扣)大于限定价格（符合使用条件）
							//检测优惠券是否已过期，如果是过期的就不再渲染到页面
							var setYear = couDate.split("-")[0];	//过期 年
							var setMon = couDate.split("-")[1];		//过期 月
							var setDay = couDate.split("-")[2];		//过期 日
							var year = getTime().year;	//当前时间 年
							var mon = getTime().mon;	//当前时间 月
							var day = getTime().day;	//当前时间 日
							var expired = false;	//默认状态为没过期
							if(year>setYear){	//年份过期
								expired = true;
							}else if(year==setYear){	//如果是同一年，检测月份是否过期
								if(mon>setMon){	//月过期
									expired = true;
								}else if(mon==setMon){	//如果是同一月，检测日是否过期
									if(day>setDay){	//日过期
										expired = true;
									}
								}
							}
							if(!expired){	//如果没有过期
								//渲染抵用券选择列表
								$(".alert-buy .choose").append(couCard);
								//仓库下标
								$(".alert-buy .choose>li:last").data("ware",c);
								//名称
								$(".alert-buy .choose>li:last").find(".curr").text(couCurr);
								$(".alert-buy .choose>li:last").find(".type").text(couType+"券");
								//使用条件
								$(".alert-buy .choose>li:last").find(".s1").text(couCond);
								//购买优惠
								$(".alert-buy .choose>li:last").find(".s2").text(couPrice);
								//条件和优惠
								if(couType=="满减"){
									$(".alert-buy .choose>li:last").find(".s0").text("减");
									$(".alert-buy .choose>li:last").find(".s3").hide();
								}else if(couType=="折扣"){
									if(couCurr=="积分"){
										$(".alert-buy .choose>li:last").find(".s0").text("分");
									}else if(couCurr=="钻石"){
										$(".alert-buy .choose>li:last").find(".s0").text("钻");
									}
									$(".alert-buy .choose>li:last").find(".s3").show();
								}
								//使用期限
								$(".alert-buy .choose>li:last").find(".period>.date").text(couDate+" 到期");
								if(setYear==year&&setMon==mon&&setDay==day){
									$(".alert-buy .choose>li:last").find(".period>.date").text("今日到期").css("color","red");
								}
								//剩余数量
								$(".alert-buy .choose>li:last").find(".period>.num").text("现有"+couNum+"张");
								
								//计算抵用券优惠价格
								if(couType=="满减"){
									var prePrice = couPrice;
								}else if(couType=="折扣"){
									var prePrice = payPrice*(1-couPrice/10);
								}
								//储存最大优惠价格和列表下标
								if(prePrice>maxPre){
									maxPre = prePrice;
									cc = $(".alert-buy .choose>li").length-1;
								}
							}
						}
					}else{	//如果商品列表中没有找到这个抵用券
						//没有找到抵用券可能是管理员在商品列表中手动删除了这个物品，这样的话就无法获取到抵用券的优惠信息，玩家不可使用
					}
				}
			}
			var payPrice2 = payPrice;	//使用抵用券后玩家实际支付的价格
			$(".choose>.coupon-card").unbind("click");
			$(".choose").on("click",".coupon-card",function(){			//点击列表中某个优惠券
				//样式特效
				$(".choose>.coupon-card").css({
					"border":"0.2rem solid white",
				});
				$(".choose>.coupon-card").find(".select").hide();
				//.choose>.coupon-card>.select
				$(this).css({
					"border":"0.25rem solid red",
				});
				$(this).find(".select").show();
				
				//将选中的卡片渲染到上面
				var wxb = $(this).data("ware");	//获取抵用券在仓库数组中的下标
				$(".alert-buy .coupon>.card").data("ware",wxb);
				var sxb = $(this).index();	//获取抵用券在优惠券列表中的下标
				var left = $(this).find(".left").html();
				$(".alert-buy .coupon>.card>.left").html(left);
				if(sxb==0){	//不使用优惠券
					//alert(11)
					$(".alert-buy .coupon>.card").data("ware","undefined");
					$(".alert-buy .coupon>.card>.right>div").hide();
					$(".alert-buy .coupon>.card>.right>.none").show().text("不使用优惠券");
				}else if(sxb>0){
					var cond = $(this).find(".cond").html();
					var period = $(this).find(".period").html();
					$(".alert-buy .coupon>.card>.right>div").show();
					$(".alert-buy .coupon>.card>.right>.none").hide();
					$(".alert-buy .coupon>.card>.right>.cond").html(cond);
					$(".alert-buy .coupon>.card>.right>.period").html(period);
				}
				
				//获取优惠类型和优惠值
				var couType = $(this).find(".type").text();		//优惠类型
				var couPrice = $(this).find(".s2").text()*1;	//优惠价格或折扣
				//console.log(couType);
				//计算抵用券优惠价格
				if(couType=="满减券"){
					var prePrice = couPrice*1;
				}else if(couType=="折扣券"){
					var prePrice = Math.round(payPrice*(1-couPrice/10));
				}else if(couType=="优惠券"){
					var prePrice = 0;
				}
				//console.log(prePrice);
				payPrice2 = payPrice;
				payPrice2 -= prePrice;	//使用抵用券后玩家需要支付的价格
				if(payPrice2<=0){payPrice2=1}	//价格至少为1，不能是负数或0
				//console.log(payPrice);
				$(".alert-buy>footer>.price>b").text(payPrice2);	//渲染到页面
				
				//var wxb = queryWareItems();
				
			});
			$(".alert-buy .choose>li").eq(cc).click();	//点击最大优惠的抵用券
			if(cc==0){	//如果没有可以用的抵用券
				$(".alert-buy .coupon>.card>.right>.none").text("暂无可用");
				$(".choose>.coupon-card>.right>.none").text("暂无可用");
			}else{
				$(".choose>.coupon-card>.right>.none").text("不使用优惠券");
			}


			$(".alert-buy>footer>.confirm").unbind("click");
			$(".alert-buy>footer>.confirm").click(function(){	//如果玩家点击确认付款
				$("#alert,.alert-buy").hide();	//隐藏弹窗
				//console.log("点击了确认");
				//alert(payPrice);
				var i = playerIndex;	//玩家在数组中的下标
				if(curr=="积分"){	//如果货币为积分
					var point = players.data[i].points;	//获取玩家的积分
					point -= payPrice2;
					if(point<0){	//如果购买后积分为负数
						point += payPrice2;	//还原积分;
						Alert("您的<span style='color:orange;'>积分</span>不足,购买失败！");
						popupCss(25,13);
						return;
					}else{	//购买成功
						players.data[i].points = playerBasic[i][2][0].split(":")[1] = point;	//储存玩家积分
						$("main>header>.Point>span").text(point);
						$(".my-jf>span").text(point);				//将更新后的积分渲染到页面
					}
				}else if(curr=="钻石"){	//如果货币为钻石
					var zs = players.data[i].diamonds;	//获取玩家的钻石
					zs -= payPrice2;
					if(zs<0){	//如果购买后钻石为负数
						zs += payPrice2;	//还原钻石;
						Alert("您的<span style='color:rgb(249,102,112);'>钻石</span>不足,购买失败！");
						popupCss(25,13);
						return;
					}else{	//购买成功
						players.data[i].diamonds = playerBasic[i][2][1].split(":")[1] = zs;		//储存玩家钻石
						$("main>header>.Diamond>span").text(zs);
						$(".my-zs>span").text(zs);				//将更新后的钻石渲染到页面
					}
				}else{	//如果货币类型既不是积分也不是钻石（一般这种情况不可能出现，除非服主在商品数组中设置错误）
					alert("商品货币类型出错！请联系服主");
					return;
				}
			//如果前面的检测没有出现问题，说明符合购买条件------------------------------------------------
				var sales = shop.data[xb].sales*1; //获取物品的销量
				stock -= num;		//库存 减 购买的数量
				sales += num;		//销量 加 购买的数量
				if(isNaN(stock)){stock="无上限"}
				shop.data[xb].sales = sales;	//更新数组中的销量
				$(".game-items item").eq(xb).find("[name='销量']").attr("value",sales);
				//commodity[xb][3][0] = "销量:"+sales;
				shop.data[xb].stock = stock;	//更新数组中的库存
				$(".game-items item").eq(xb).find("[name='库存']").attr("value",stock);
				//commodity[xb][3][3] = "库存:"+stock;
				$(".spxq>.sells").text("销量 : "+sales);		//更新页面中的销量
				$(".spxq>.stock").text("（库存 : "+stock+"）");		//更新页面中的库存
				if(stock==0){	//如库存为0，显示售罄图标
					$(".items-details>.left>.image").find(".soldout").show();
					//$(".items-box>.items").eq(xb).css("opacity","0.7").find(".soldout").show();
					$(".items-box>.items[data-index='"+xb+"']").css("opacity","0.7").find(".soldout").show();
				}
				//更新购买数量
				buyDay += num;
				buyAll += num;
				playerBuy[playerIndex][xx][1] = "今日购买数量:"+buyDay;
				playerBuy[playerIndex][xx][2] = "总购买数量:"+buyAll;
				arrbuyToObj();
				if(!isNaN(xgDay)){
					$(".spxq>.limit>.xg2>.txt").text(buyDay+"/"+xgDay);	//更新页面每日限购
				}
				if(!isNaN(xgAll)){
					$(".spxq>.limit>.xg3>.txt").text(buyAll+"/"+xgAll);	//更新页面总限购
				}
				if(xgDay<=buyDay||xgAll<=buyAll){	//如每日限购或总限购达到上限，显示售罄图标
					$(".items-details>.left>.image").find(".soldout").show();
					$(".items-box>.items[data-index='"+xb+"']").css("opacity","0.7").find(".soldout").show();
				}
				$(".spxq>.num>input").val(1);	//重置输入框中要购买的数量
				//给玩家仓库更新购买的物品
				//下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
				//相同的条件是: 名称、ID、品质 3个属性同时相同
				var findItem = false;	//默认为没找到相同物品
				for(var j in playerWare[i]){
					var nameW = playerWares.data[j].name;	//获取数组中物品名称
					var idW = playerWares.data[j].id;		//获取数组中物品ID
					var quaW = playerWares.data[j].quality*1;	//获取数组中物品品质
					var numW = playerWares.data[j].num*1;		//获取数组中物品数量
					if(nameW==itemName&&idW==itemID&&quaW==itemQua){	//如果是相同的物品
						findItem = true;
						numW += numAll;	//直接给相同的物品增加购买的数量，无需再新创建数组
						playerWares.data[j].num = numW;	//保存更新的数量
						playerWare[i][j][1][1] = "数量:"+numW;
					}
					//console.log("品质1:"+quaW+"---品质2:"+itemQua);
					//console.log("名称1:"+nameW+"---名称2:"+itemName);
				}
				if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
					playerWare[i][playerWare[i].length] = [["auto","ID:"+itemID,"图片:auto"],["品质:auto","数量:"+numAll],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
				}
				//检测购买商品时是否使用过抵用券
				var couxb = $(".alert-buy .coupon>.card").data("ware");	//获取抵用券在仓库数组中的下标
				if(couxb>=0){	//如果用了抵用券
					//console.log("用了优惠券，优惠券下标为："+couxb);
					var counum = playerWare[i][couxb][1][1].split(":")[1];	//获取抵用券数量
					counum --;
					playerWare[i][couxb][1][1] = "数量:"+counum;
					if(counum==0){	//如果抵用券没有了
						playerWare[i].splice(couxb,1);		//删除它
					}
					
				}
				
				arrwareToObj();	//给仓库数组转换储存格式
				//console.log(playerWare[i]);
				var point = players.data[i].points;
				var diamond = players.data[i].diamonds;
				if(itemQua==0){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买商品</span><span><b>"+itemName+"</b></span><span>"+numAll+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else{
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>购买商品</span><span><b>"+itemName+"</b><font style='font-size:0.9em;'>(品质: "+itemQua+")</font></span><span>"+numAll+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
				Alert("购买成功,物品已发送到您的仓库");
				popupCss(25,13);
			});
		}
	});
	
	$(".alert-buy .coupon>.card>.left,.alert-buy .coupon>.card>.right").unbind("click");
	$(".alert-buy .coupon>.card>.left,.alert-buy .coupon>.card>.right").click(function(){	//点击展开优惠券列表
		//样式特效
		var showList = $(".alert-buy .coupon>.card>.choose").css("display");
		$("#alert").unbind("click");
		if(showList=="block"){
			//setTimeout(function(){
				$(".alert-buy .coupon>.card>.choose").slideUp(100);
			//},100);
		}else if(showList=="none"){
			$(".alert-buy .coupon>.card>.choose").slideDown(100);
			setTimeout(function(){
				$("#alert").click(function(){
					$(".alert-buy .coupon>.card>.choose").hide();
				});
			},100);
		}
		
	});
	
});