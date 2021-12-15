
	//下面是对xml文件更改储存格式，以方便在js中调用
	function arrcomToObj(){
		shop = {};
		shop.data = [];
		//var txt = $("body>.game-items").html();
		for(var i=0;i<$(".game-items item").length;i++){
			//var xml = 
			shop.data[i] = $(".game-items item").eq(i);
			shop.data[i].id = shop.data[i].attr("name");
			shop.data[i].name = shop.data[i].find("[name='名称']").attr("value");
			shop.data[i].image = shop.data[i].find("[name='图标']").attr("value");
			shop.data[i].quality = shop.data[i].find("[name='品质']").attr("value");
			shop.data[i].num = shop.data[i].find("[name='数量']").attr("value");
			shop.data[i].currency = shop.data[i].find("[name='货币']").attr("value");
			shop.data[i].price = shop.data[i].find("[name='价格']").attr("value");
			shop.data[i].discount = shop.data[i].find("[name='折扣']").attr("value");
			shop.data[i].prefer = shop.data[i].find("[name='优惠价']").attr("value");
			shop.data[i].desc = shop.data[i].find("[name='描述']").attr("value");
			shop.data[i].class1 = shop.data[i].find("[name='总分类']").attr("value");
			shop.data[i].class2 = shop.data[i].find("[name='子分类']").attr("value");
			shop.data[i].classMod = shop.data[i].find("[name='IsMod']").attr("value");
			shop.data[i].sales = shop.data[i].find("[name='销量']").attr("value");
			shop.data[i].hot = shop.data[i].find("[name='热卖']").attr("value");
			shop.data[i].hotSet = shop.data[i].find("[name='热卖']").attr("set");
			shop.data[i].show = shop.data[i].find("[name='显示']").attr("value");
			shop.data[i].stock = shop.data[i].find("[name='库存']").attr("value");
			shop.data[i].collect = shop.data[i].find("[name='收藏']").attr("value");
			shop.data[i].sell = shop.data[i].find("[name='可购买']").attr("value");
			shop.data[i].xgLevel = shop.data[i].find("[name='等级限购']").attr("value");
			shop.data[i].xgDay = shop.data[i].find("[name='每日限购']").attr("value");
			shop.data[i].xgAll = shop.data[i].find("[name='总限购']").attr("value");
			shop.data[i].follow = shop.data[i].find("[name='跟档']").attr("value");
			shop.data[i].prize = shop.data[i].find("[name='获得奖品']").attr("value");
			shop.data[i].prizeNum = shop.data[i].find("[name='获得奖品']").attr("set");
			if(shop.data[i].class2=="抵用券"){
				shop.data[i].couCurr = shop.data[i].find("[name='抵用券']").attr("currency");//货币类型（积分/钻石）
				shop.data[i].couType = shop.data[i].find("[name='抵用券']").attr("type");	//优惠类型（满减/折扣）
				shop.data[i].couPrice = shop.data[i].find("[name='抵用券']").attr("value");	//购买优惠（购买商品时抵消的价格或折扣）
				shop.data[i].couCond = shop.data[i].find("[name='抵用券']").attr("set");		//使用条件（超过这个价格才能使用）
				shop.data[i].couDate = shop.data[i].find("[name='抵用券']").attr("date");	//使用期限（超过设定的日期就不可以使用了）
				if(shop.data[i].couDate==undefined||shop.data[i].couDate==""){
					shop.data[i].couDate = "2099-12-31";
				}
			}
			
			if(shop.data[i].show=="auto"){
				var date = shop.data[i].find("[name='显示']").attr("date");
				var time = shop.data[i].find("[name='显示']").attr("time");
				var year = date.split("-")[0]*1;
				var mon = date.split("-")[1]*1;
				var day = date.split("-")[2]*1;
				var hour = time.split(":")[0]*1;
				var min = time.split(":")[1]*1;
				var sec = time.split(":")[2]*1;
				if(year==""||year==undefined||isNaN(year)){
					year = 2020;
					mon = 1;
					day = 1;
				}
				if(hour==""||hour==undefined||isNaN(hour)){
					hour = 0;
					min = 0;
					sec = 0;
				}
				shop.data[i].year = year;
				shop.data[i].mon = mon;
				shop.data[i].day = day;
				shop.data[i].hour = hour;
				shop.data[i].min = min;
				shop.data[i].sec = sec;
			}
			if(shop.data[i].prize=="true"){
				//console.log(shop.data[i].name)
				shop.data[i].prize = $(".game-items item").eq(i).find("prize");
				for(var j=0;j<shop.data[i].prize.length;j++){
					//var name = shop.data[i].prize.eq(j).attr("name");
					shop.data[i].prize[j].id = shop.data[i].prize.eq(j).attr("id");
					shop.data[i].prize[j].qua = shop.data[i].prize.eq(j).attr("品质");
					shop.data[i].prize[j].num = shop.data[i].prize.eq(j).attr("数量");
					shop.data[i].prize[j].pro = shop.data[i].prize.eq(j).attr("概率");
					if(isNaN(shop.data[i].prize[j].pro)){	//概率比值至少为1
						shop.data[i].prize[j].pro = 1;
					}
					if(isNaN(shop.data[i].prize[j].qua)){	//品质不存在默认为0
						shop.data[i].prize[j].qua = 0;
					}
				}
				//console.log(shop.data[i].prize.length)
			}
			if(shop.data[i].name==""||shop.data[i].name==undefined){
				//如果没设置显示的名称，需要从后端或汉化文件自动获取汉化名称
				var name = queryItems(true,shop.data[i].id).name;	//根据ID获取汉化文件的名称
				shop.data[i].name =  name;
			}else if(shop.data[i].name=="id"){
				shop.data[i].name = shop.data[i].id;	//如果名称设置为id，则使用该物品的ID作为名称
			}
			if(shop.data[i].image==undefined||shop.data[i].image==""){
				shop.data[i].image = shop.data[i].id;
				//这一步需要从后端自动获取商品的图标
				//....
			}
			if(isNaN(shop.data[i].collect)){shop.data[i].collect=0}
			if(isNaN(shop.data[i].num)||shop.data[i].num==0){shop.data[i].num=1}	//数量至少为一件
			if(isNaN(shop.data[i].quality)){shop.data[i].quality=0}	//不设置品质默认为0
			if(shop.data[i].desc=="auto"||shop.data[i].desc==undefined){	//如果设定的描述是自动获取
				//这一步需要从后端或汉化文件获取游戏内的描述
				var dcName = shop.data[i].id + "Desc"
				var desc = queryItems(true,dcName).name;
				var dcArr = desc.split("\\n");
				//console.log(dcArr)
				var text = "";
				if(dcArr[1]!=""||dcArr[1]!=undefined){
					for(var d in dcArr){
						text = text + (dcArr[d]+"<br>");
					}
					shop.data[i].desc = text;
				}else{
					shop.data[i].desc = '<span style="font-size:1.2em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>'
				}
				
			}else if(shop.data[i].desc==""){
				shop.data[i].desc = '<span style="font-size:1.2em;font-weight:bold;color:gray;">没有找到这个物品的描述</span>'
			}
			if(shop.data[i].currency!="积分"&&shop.data[i].currency!="钻石"){
				shop.data[i].currency = "积分";	//货币默认为积分
			}
			if(isNaN(shop.data[i].price)||shop.data[i].price==""){
				shop.data[i].price = 1;
			}
			
			if(shop.data[i].follow=="true"){	//如果商品设定为可跟档
				//给描述前面添加 跟档前缀提示
				shop.data[i].desc = "<span style='color:mediumpurple;font-size:1.2rem;font-weight:bold;'>这个物品可以跟档</span><br>" + shop.data[i].desc;
			}
			if(shop.data[i].sell=="vip"){
				//给描述前面添加 VIP前缀提示
				shop.data[i].desc = "<span style='color:orange;font-size:1.3rem;font-weight:bold;'>VIP专属物品</span><br>" + shop.data[i].desc;
			}
			if(shop.data[i].classMod=="auto"){	//自动识别是否是mod物品
				var tp = queryItems(true,shop.data[i].id).type;	//根据ID获取汉化文件的物品类型
				if(tp=="未找到"){	//汉化文件没有找到这个物品，说明它不是游戏原生物品
					shop.data[i].classMod = "true";
				}else{
					shop.data[i].classMod = "false";
				}
			}
			var img = shop.data[i].image;
			var m1 = img.split(".")[1];	//获取填写图片格式
			var m2 = img.split("/")[1];	//获取是否有相对路径
			var gs = ".png";
			if(m1==undefined){	//如果没有填写图片格式
				gs = ".png";	//默认读取png格式
			}else{		//如果填写了图片格式
				gs = "";	//读取填写的格式
			}
			if(m2==undefined){	//如果图片只有名称
				shop.data[i].image = "images/ItemIcons/"+img+gs;
			}else{		//如果图片填写的是相对路径
				shop.data[i].image = "images/items"+img+gs;
			}
		}
		//console.log(shop)
	}
	
$(document).ready(function(){
	//setTimeout(function(){
		console.log(getTime().date+"\n正在读取商品内容。。。");
		$("body>.game-items").load("Config/store-items.xml",function(){	//读取商品xml文件
			arrcomToObj();	//对商品数据更改储存格式
			arrwareToObj();	//对仓库数据更改储存格式
			console.log(getTime().date+"\n商品读取成功！");
		});
	//},1000);
	
	
	
	
});