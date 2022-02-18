var recCard = '<li class="items"><div class="icon"><i></i></div><div class="name"></div><div class="num"><span class="n1">仓库：<b></b></span><br><span class="n2">消耗：<b></b></span></div></li>';
var craCard = '<div class="icon"></div><div class="time"></div>'
var canCrafting;	//是否可以制作
var lastCount = 1;		//保存上次填写的制作数量
var craftingSolt = [];	//工作台物品制作的槽位（正在制作中的物品）


//下面是对配方xml文件更改储存格式，以方便在js中调用
function arrRecToObj(){
	recipes = [];
	for(var i=0;i<$(".data-recipe recipe").length;i++){
		recipes[i] = $(".data-recipe recipe").eq(i);	//获取制作列表中的物品
		recipes[i].id = recipes[i].attr("name");			//物品ID
		recipes[i].num = recipes[i].attr("count");			//制作后获得的数量
		recipes[i].area = recipes[i].attr("craft_area");	//物品制作渠道，网页里为web
		recipes[i].time = recipes[i].attr("craft_time");	//物品制作时间
		recipes[i].quality = recipes[i].attr("quality");	//物品制作品质
		recipes[i].area = recipes[i].attr("craft_area");	//物品制作渠道
		if(isNaN(recipes[i].time)||recipes[i].time<0){		//制作时间至少为0
			recipes[i].time = 0;
		}
		if(isNaN(recipes[i].num)||recipes[i].num<=0){		//制作数量至少为1
			recipes[i].num = 1;
		}
		var qua = recipes[i].quality;
		if(isNaN(qua)||qua<0){recipes[i].quality=0;}		//品质至少为0
		//console.log(recipes[0].time)
		var name,img,type;
		var xb = queryShopItems(recipes[i].id);	//查询商品列表中是否存在这个物品并获取下标
		if(xb>=0){
			name = shop.data[xb].name;
			img = shop.data[xb].image;
			type = shop.data[xb].class1;
			desc = shop.data[xb].desc;
		}else{
			name = queryItems(true,recipes[i].id).name;
			//img = 'images/ItemIcons/'+recipes[i].id+'.png';
			img = 'images/alert.png';
			type = "特殊物品";
			var descID = recipes[i].id+"Desc";
			desc = queryItems(true,descID).name;
			if(desc==descID){
				desc = "没有找到这个物品的描述"
			}
		}
		recipes[i].name = name;	//物品名称
		recipes[i].image = img;	//物品图片
		recipes[i].type = type;	//物品类型
		recipes[i].desc = desc;	//物品描述
		
		var rlen = recipes[i].find("ingredient").length;	//获取配方数量
		for(var j=0;j<rlen;j++){
			//recipes[i][j] = recipes[i].find("ingredient").eq(j);	//获取物品的配方
			recipes[i][j] = {}
			recipes[i][j].id = $(".data-recipe recipe").eq(i).find("ingredient").eq(j).attr("name");		//配方ID
			recipes[i][j].num = $(".data-recipe recipe").eq(i).find("ingredient").eq(j).attr("count");		//配方数量

			//下面是从商品列表中获取 “名称、图标、类型” 三个数据
			var rName,rImg,rType;
			var rxb = queryShopItems(recipes[i][j].id);	//查询商品列表中是否存在这个物品并获取下标
			if(rxb>=0){
				rName = shop.data[rxb].name;
				rImg = shop.data[rxb].image;
				rType = shop.data[rxb].class1;
			}else{
				rName = queryItems(true,recipes[i][j].id).name;
				//rImg = 'images/ItemIcons/'+recipes[i][j].id+'.png';
				rImg = 'images/alert.png';
				rType = "特殊物品";
			}
			recipes[i][j].name = rName;		//配方名称
			recipes[i][j].image = rImg;		//配方图标
			recipes[i][j].type = rType;		//配方类型
			
			
		}
		
	}
	
}
arrRecToObj();

function GenerateRecipe(itemID){	//将物品数据和配方列表渲染到详情页面
	//先将默认页面数据清空
	$(".work-recipe>.left>.number>input").val(1);
	//......
	
	var cxb = queryCrafting(itemID);	//查询是否可以制作
	if(cxb>=0){	//可以制作
		$(".work-recipe>.left>.l2").show();	//显示制作按钮
		$(".recipe-list > .empty").hide();	//隐藏不可制作提示信息
		$(".work-recipe").data("index",cxb);	//将物品在制作数组中的下标保存到页面
		//获取物品数据
		var name = recipes[cxb].name;	//名称
		var num = recipes[cxb].num;		//数量
		var img = recipes[cxb].image;	//图片
		var qua = recipes[cxb].quality;	//品质
		var sec = recipes[cxb].time;	//制作时间（秒）
		var type = recipes[cxb].type;	//物品类型
		var desc = recipes[cxb].desc;	//物品描述
		if(isNaN(sec)){sec=0}
		var min = Math.floor(sec/60);	//计算分
		sec = sec%60;
		if(min<10){min="0"+min}
		if(sec<10){sec="0"+sec}
		//将物品基础数据渲染到页面
		$(".work-recipe>header>.name").html(name);
		$(".work-recipe>header>.num").html("x"+num);
		$(".work-recipe>.left>.icon>img").attr("src",img);
		$(".work-recipe>.left>.icon>.quality>span").text(qua);
		if(qua==0){
			$(".work-recipe>.left>.icon>.quality").hide();
		}else{
			$(".work-recipe>.left>.icon>.quality").show();
			if(qua==1){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(157, 138, 106)");
			}else if(qua==2){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(208, 129, 43)");
			}else if(qua==3){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(163, 165, 28)");
			}else if(qua==4){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(69, 195, 54)");
			}else if(qua==5){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(51, 96, 207)");
			}else{
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(165, 44, 205)");
			}
		}
		$(".work-recipe>.left>.time>span").text(min+":"+sec)
		if(type=="物块模型"){
			$(".work-recipe>.left").css("background-color","rgba(144,255,144,0.1)");
		}else if(type=="物品资源"){
			$(".work-recipe>.left").css("background-color","rgba(255,255,144,0.1)");
		}else{
			$(".work-recipe>.left").css("background-color","rgba(255,144,144,0.1)");
		}
		$(".work-page>.work-desc").html(desc);
		
		//下面是读取配方数据
		canCrafting = true;
		$(".recipe-list>li").remove();	//先移除所有配方
		var rlen =  $(".data-recipe recipe").eq(cxb).find("ingredient").length;	//获取配方数量
		//console.log(recipes[cxb])
		for(var j=0;j<rlen;j++){		//遍历物品配方
			$(".recipe-list").append(recCard);	//有多少个配方就追加多少个列表
			//var rId = recipes[cxb][j].id;		//配方ID
			var rName = recipes[cxb][j].name;	//配方名称
			var rImg = recipes[cxb][j].image;	//配方图标
			var rNum = recipes[cxb][j].num*1;	//配方数量
			var rType = recipes[cxb][j].type;	//配方类型
			
			$(".recipe-list>li:last").data("index",j);	//将物品在配方列表中的下标保存到页面
			//下面是从仓库数组中获取物品数量
			var wNum = 0;
			var wxb = queryWareItems(recipes[cxb][j].id);	//查询仓库数组中是否存在这个物品并获取下标
			if(wxb>=0){		//如果在仓库里找到了这个物品
				wNum = playerWares.data[wxb].num*1;
				$(".recipe-list>li:last").data("ware",wxb);	//将物品在仓库列表中的下标保存到页面
				console.log("仓库找到了")
			}else{		//如果在仓库里没找到
				console.log("仓库没找到")
				wNum = 0;
			}
			
			//渲染到页面
			$(".recipe-list>li:last").find(".icon").find("i").css("background-image","url("+rImg+")");	//渲染配方图标
			$(".recipe-list>li:last").find(".name").text(rName);		//渲染配方名称
			$(".recipe-list>li:last").find(".num>.n2>b").text(rNum);	//渲染配方数量
			$(".recipe-list>li:last").find(".num>.n1>b").text(wNum);	//渲染仓库数量
			if(wNum>=rNum){		//如果仓库有足够的配方材料
				$(".recipe-list>li:last").find(".num>.n1>b").css("color","rgb(0,188,0)");
			}else{		//如果仓库配方材料不足
				canCrafting = false;
				$(".recipe-list>li:last").find(".num>.n1>b").css("color","red");
			}
			if(wNum==0&&rNum==0){	//如果仓库没有对应的配方材料并且配方配方需求量也为0
				canCrafting = false;
				$(".recipe-list>li:last").find(".num>.n1>b").css("color","red");
			}
			//下面是根据物品类型渲染列表颜色
			if(rType=="物块模型"){
				$(".recipe-list>li:last>.icon").css({
					"border":"0.25rem solid rgba(166,217,173,0.9)",
					"background-image":"url(images/card/green.jpg)"
				});
				$(".recipe-list>li:last>.name").css({
					"box-shadow":"0 0 0.3rem #2fb238 inset, 0 0 0.2rem #2fb238"
				});
				$(".recipe-list>li:last>.num").css({
					"background":"linear-gradient(120deg,rgb(217,238,220),rgba(200,232,205,0.7))"
				});
				
			}else if(rType=="物品资源"){
				$(".recipe-list>li:last>.icon").css({
					"border":"0.25rem solid rgba(255,205,135,0.9)",
					"background-image":"url(images/card/yellow.jpg)"
				});
				$(".recipe-list>li:last>.name").css({
					"box-shadow":"0 0 0.3rem #ffa500 inset, 0 0 0.2rem #ffa500"
				});
				$(".recipe-list>li:last>.num").css({
					"background":"linear-gradient(120deg,rgb(253,242,198),rgba(252,233,154,0.7))"
				});
			}else{
				$(".recipe-list>li:last>.icon").css({
					"border":"0.25rem solid rgba(255,180,180,0.9)",
					"background-image":"url(images/card/red.jpg)"
				});
				$(".recipe-list>li:last>.name").css({
					"box-shadow":"0 0 0.3rem rgb(253 134 110) inset, 0 0 0.2rem rgb(253 134 110)"
				});
				$(".recipe-list>li:last>.num").css({
					"background":"linear-gradient(120deg,rgb(255,233,233),rgba(255,188,188,0.7))"
				});
			}
		}
		
	}else if(cxb=="false"){	//不可以制作
		$(".work-recipe>.left>.l2").hide();	//隐藏制作按钮
		$(".recipe-list>li").hide();	//隐藏所有配方
		$(".recipe-list > .empty").css("display","flex");	//显示不可制作的提示信息
		//从商品列表中获取物品数据
		var num = 1;		//数量
		var sxb = queryShopItems(itemID);
		if(sxb>=0){
			var name = shop.data[sxb].name;
			var img = shop.data[sxb].image;
			var qua = shop.data[sxb].quality;
			var type = shop.data[sxb].class1;
			var desc = shop.data[sxb].desc;
			//alert(name)
		}else{
			var name = queryItems(true,itemID).name;
			var img = "images/alert.png";
			var qua = 0;
			var type = "特殊物品";
			var desc = queryItems(true,itemID+"Desc").name;
			//alert(itemID)
		}
		
		
		//将物品基础数据渲染到页面
		$(".work-recipe>header>.name").html(name);
		$(".work-recipe>header>.num").html("x"+num);
		$(".work-recipe>.left>.icon>img").attr("src",img);
		$(".work-recipe>.left>.icon>.quality>span").text(qua);
		if(qua==0){
			$(".work-recipe>.left>.icon>.quality").hide();
		}else{
			$(".work-recipe>.left>.icon>.quality").show();
			if(qua==1){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(157, 138, 106)");
			}else if(qua==2){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(208, 129, 43)");
			}else if(qua==3){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(163, 165, 28)");
			}else if(qua==4){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(69, 195, 54)");
			}else if(qua==5){
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(51, 96, 207)");
			}else{
				$(".work-recipe>.left>.icon>.quality").css("background-color","rgb(165, 44, 205)");
			}
		}
		$(".work-recipe>.left>.time>span").text("00:00");
		if(type=="物块模型"){
			$(".work-recipe>.left").css("background-color","rgba(144,255,144,0.1)");
		}else if(type=="物品资源"){
			$(".work-recipe>.left").css("background-color","rgba(255,255,144,0.1)");
		}else{
			$(".work-recipe>.left").css("background-color","rgba(255,144,144,0.1)");
		}
		$(".work-page>.work-desc").html(desc);
	}
	var rec = queryRecipes(itemID);		//查询是否可以配方
	if(rec){	//可以配方
		$(".work-recipe>.left>.l1").show();
		//console.log("可以配方！")
	}else{		//不可以配方
		$(".work-recipe>.left>.l1").hide();
		//console.log("不可以配方！"+itemID)
	}
	var sxb = queryShopItems(itemID);	//查询商店里是否有售卖这个物品
	if(sxb>=0){	//有售卖
		//如果商品在页面显示，即玩家可以正常购买
		if(shop.data[sxb].show=="true"||shop.data[sxb].show=="auto"){
			$(".work-recipe>.left>.l3").show();	//显示购买按钮
			$(".work-recipe").data("shop",sxb);	//将物品在商品列表中的下标保存到页面
		}else{
			$(".work-recipe>.left>.l3").hide();	//隐藏购买按钮
		}
	}else{		//没有售卖
		$(".work-recipe>.left>.l3").hide();	//隐藏购买按钮
	}
}
if(recipes[0].id!=undefined){
	GenerateRecipe(recipes[0].id);		//默认渲染第一个物品
}

function queryCrafting(itemID){		//查询物品是否可以制作，返回下标值
	//var find = false;
	for(var i in recipes){
		var id = recipes[i].id;
		if(id==itemID){
			return i;
		}
	}
	return "false";
}

function queryRecipes(itemID){		//查询物品是否为配方，返回布尔值
	for(var i in recipes){
		var rlen =  $(".data-recipe recipe").eq(i).find("ingredient").length;
		for(var j=0;j<rlen;j++){
			//console.log(recipes[i][j].id)
			var id = recipes[i][j].id;
			//console.log(id+"---"+itemID)
			if(id==itemID){
				return true;
			}
		}
	}
	return false;
}

function changeCraftingCount(){		//修改物品制作数量
		var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
		var count = $(".work-recipe>.left>.number>input").val()*1;	//获取填写的数量
		if(isNaN(count)){	//如果输入的内容不是数字, 重置为上次输入的数量
			count = lastCount;
			$(".work-recipe>.left>.number>input").val(lastCount);
		}
		if(count<=0){	//制作数量至少为1
			count = 1;
			$(".work-recipe>.left>.number>input").val(1);
		}
		var time = recipes[xb].time*count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
		var min = Math.floor(time/60);
		var sec = time%60;
		if(min<10){min="0"+min}
		if(sec<10){sec="0"+sec}
		if(min>99){min=99;sec=99;}
		$(".work-recipe>.left>.time>span").text(min+":"+sec);
		//下面是检测配方数量
		canCrafting = true;
		var rlen =  $(".data-recipe recipe").eq(xb).find("ingredient").length;
		for(var i=0;i<rlen;i++){	//遍历配方列表
			//console.log(i)
			var rNum = recipes[xb][i].num;	//获取单件配方需求数量
			var aNum = count*rNum;		//计算配方总需求数量
			var wNum = $(".recipe-list>li").eq(i).find(".num>.n1>b").text()*1;	//获取仓库剩余数量
			//console.log("配方 "+i+" 合计数量："+aNum);
			//console.log("配方 "+i+" 仓库剩余数量："+wNum);
			$(".recipe-list>li").eq(i).find(".num>.n2>b").html(aNum);	//实时渲染配方需求量
			if(wNum>=aNum){
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","rgb(0,188,0)");
			}else{
				canCrafting = false;
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","red");
			}
		}
		lastCount = count;
	}

$(document).ready(function(){
	$(".head-tool>li:not(:first)").click(function(){	//选择工作台
		alert("请使用钥匙解锁该功能！");
	});
	
	$(".recipe-list").on("mouseenter","li",function(){	//配方列表移入特效
	//$(".recipe-list>li").mouseenter(function(){
		$(this).find(".icon").addClass("rotate360").css("transition","2s");
		$(this).find(".name").css({
			"letter-spacing":"0.1rem",
			"transition":"0.4s",
			"font-size":"1.2rem",
			"color":"rgb(88,88,88)"
		});
	});
	$(".recipe-list").on("mouseleave","li",function(){	//配方列表移出特效
	//$(".recipe-list>li").mouseleave(,function(){
		$(this).find(".icon").removeClass("rotate360").css("transition","0.6s");
		$(this).find(".name").css({
			"letter-spacing":"0.05rem",
			"transition":"0.2s",
			"font-size":"1.1rem",
			"color":"rgb(111,111,111)"
		});
	});
	
	$(".work-recipe>.left>.number>.add").click(function(){		//增加制作数量
		var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
		//alert(xb)
		var count = $(".work-recipe>.left>.number>input").val()*1;	//获取填写的数量
		count += 1;
		var time = recipes[xb].time*count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
		var min = Math.floor(time/60);
		var sec = time%60;
		if(min<10){min="0"+min}
		if(sec<10){sec="0"+sec}
		if(min>99){min=99;sec=99;}
		$(".work-recipe>.left>.time>span").text(min+":"+sec);
		//下面是检测配方数量
		canCrafting = true;
		var rlen =  $(".data-recipe recipe").eq(xb).find("ingredient").length;
		for(var i=0;i<rlen;i++){	//遍历配方列表
			//console.log(i)
			var rNum = recipes[xb][i].num;	//获取单件配方需求数量
			var aNum = count*rNum;		//计算配方总需求数量
			var wNum = $(".recipe-list>li").eq(i).find(".num>.n1>b").text()*1;	//获取仓库剩余数量
			//console.log("配方 "+i+" 合计数量："+aNum);
			//console.log("配方 "+i+" 仓库剩余数量："+wNum);
			$(".recipe-list>li").eq(i).find(".num>.n2>b").html(aNum);	//实时渲染配方需求量
			if(wNum>=aNum){
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","rgb(0,188,0)");
			}else{
				canCrafting = false;
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","red");
			}
		}
		$(".work-recipe>.left>.number>input").val(count);
		lastCount = count;
	});
	$(".work-recipe>.left>.number>.jian").click(function(){		//减少制作数量
		var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
		var count = $(".work-recipe>.left>.number>input").val()*1;	//获取填写的数量
		count -= 1;
		if(count<=0){
			count = 1;
		}
		var time = recipes[xb].time*count;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
		var min = Math.floor(time/60);
		var sec = time%60;
		if(min<10){min="0"+min}
		if(sec<10){sec="0"+sec}
		if(min>99){min=99;sec=99;}
		$(".work-recipe>.left>.time>span").text(min+":"+sec);
		//下面是检测配方数量
		canCrafting = true;
		var rlen =  $(".data-recipe recipe").eq(xb).find("ingredient").length;
		for(var i=0;i<rlen;i++){	//遍历配方列表
			//console.log(i)
			var rNum = recipes[xb][i].num;	//获取单件配方需求数量
			var aNum = count*rNum;		//计算配方总需求数量
			var wNum = $(".recipe-list>li").eq(i).find(".num>.n1>b").text()*1;	//获取仓库剩余数量
			//console.log("配方 "+i+" 合计数量："+aNum);
			//console.log("配方 "+i+" 仓库剩余数量："+wNum);
			$(".recipe-list>li").eq(i).find(".num>.n2>b").html(aNum);	//实时渲染配方需求量
			if(wNum>=aNum){
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","rgb(0,188,0)");
			}else{
				canCrafting = false;
				$(".recipe-list>li").eq(i).find(".num>.n1>b").css("color","red");
			}
		}
		$(".work-recipe>.left>.number>input").val(count);
		lastCount = count;
	});
	
	$(".work-recipe>.left>.l1").click(function(){	//配方
		// var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
		// alert(xb)
		var item = $(".work-recipe>header>.name").text();	//获取这个物品的名称
		$(".citems-search>input").val(item);
		//searchItems();	//在左侧列表搜索这个物品
		$(".citems-search>.search-type>.t2").click();	//搜索类型为配方
		//这时候左侧列表就会显示这个物品可以用配方制作的其它物品了
	});
	$(".work-recipe>.left>.l2").click(function(){	//制作
		if(canCrafting){	//如果所有配方材料都足够
			var xb = $(".work-recipe").data("index");	//获取这个物品在制作数组中的下标
			var numT = $(".work-recipe>.left>.number>input").val()*1;	//获取玩家制作的数量(件)
			$(".work-page>.slots").append("<li>"+craCard+"</li>");
			//craftingSolt += 1;
			var img = recipes[xb].image;		//获取这个物品的图标
			var time = recipes[xb].time*numT;	//获取这个物品的制作时间（秒）= 单件制作时间 x 制作数量
			var len = craftingSolt.length
			craftingSolt[len] = {};
			craftingSolt[len].icon = img;
			craftingSolt[len].time = time;
			var min = Math.floor(time/60);
			var sec = time%60;
			if(min<10){min="0"+min}
			if(sec<10){sec="0"+sec}
			//$(".work-page>.slots>li>.time").eq(craftingSolt).text(min+" : "+sec);
			//$(".work-page>.slots>li").eq(len).append(craCard);
			$(".work-page>.slots>li").eq(len).find(".time").text(min+" : "+sec);
			$(".work-page>.slots>li").eq(len).find(".icon").css("background-image","url("+img+")");
			$(".work-page>.slots>li").eq(len).find(".icon").text(numT);
			//craftingSolt[craftingSolt.length] = [xb,time];
			//eval("var test"+craftingSolt+" = setInterval(function(){")		//制作倒计时
			//var test = "abc";
			//var test;
			
			
			//eval('t'+craftingSolt+' = test');
			var ttt = setInterval(function(){
				//var time = craftingSolt[len].time;
				time--;
				//console.log(len)
				if(time<=0){
					$(".work-page>.slots>li").eq(len).find(".icon").html("已完成");
					$(".work-page>.slots>li").eq(len).find(".time").text("00 : 00");
					//craftingSolt.splice(len-1,1);
					//clearInterval(eval("test[1]"));
					clearInterval(ttt);
					return;
				}
				
				var min = Math.floor(time/60);
				var sec = time%60;
				if(min<10){min="0"+min}
				if(sec<10){sec="0"+sec}
				//console.log(craftingSolt);
				$(".work-page>.slots>li").eq(len).find(".time").text(min+" : "+sec);
				$(".work-page>.slots>li").eq(len).find(".icon").css("background-image","url("+img+")");
				$(".work-page>.slots>li").eq(len).find(".icon").text(numT);
				//console.log(sec)
			},1000);
			
			
			//下面需要从仓库中扣除对应数量的配方材料
			var rLen = $(".recipe-list>li").length;
			for(var i=0;i<rLen;i++){	//遍历配方列表
				var xbw = $(".recipe-list>li").eq(i).data("ware");	//获取配方物品在仓库中的下标
				//var id = playerWares.data[xbw].id;	//获取物品ID
				console.log(xbw)
				var wNum = playerWares.data[xbw].num*1;	//获取仓库物品数量
				var rNum = $(".recipe-list>li").eq(i).find(".num>.n2>b").text()*1;	//获取配方需求数量
				wNum -= rNum;	//仓库数量 减 需求数量
				playerWare[playerIndex][xbw][1][1] = "数量:"+wNum;
				playerWares.data[xbw].num = wNum;	//保存仓库数量
				if(wNum==0){	//如果仓库物品用完了
					playerWare[playerIndex].splice(xbw,1); //仓库里移除这个物品
					arrwareToObj();		//将更新的仓库数组重新转换obj格式
				}
			}
			var id = recipes[xb].id;	//获取制作物的ID
			GenerateRecipe(id);	//重新在页面渲染制作的物品
			setTimeout(function(){		//达到规定的制作时间后制作物品
				
				//下面要给玩家仓库增添制作的物品
				var id = recipes[xb].id;	//获取制作物的ID
				var name = recipes[xb].name;	//获取制作物的名称
				var numC = recipes[xb].num*1;	//获取制作物的获得数量
				
				var numA = numC*numT;	//计算玩家制作后实际获得的数量
				var qua = recipes[xb].quality;	//获取制作物的品质
				//------------------------------------------------------
				var findItem = false;	//默认为没找到相同物品
				for(var n in playerWare[playerIndex]){	//遍历玩家仓库
					var nameW = playerWares.data[n].name;	//获取数组中物品名称
					var idW = playerWares.data[n].id;		//获取数组中物品ID
					var quaW = playerWares.data[n].quality*1;	//获取数组中物品品质
					var numW = playerWares.data[n].num*1;		//获取数组中物品数量
					if(idW==id&&nameW==name&&quaW==qua){	//如果是相同的物品
						findItem = true;
						numW += numA;	//直接给相同的物品增加购买的数量，无需再新创建数组
						playerWares.data[n].num = numW;	//保存更新的数量
						playerWare[playerIndex][n][1][1] = "数量:"+numW;
						break;
					}
				}
				if(findItem==false){	//如果遍历完仓库数组后仍然没找到物品，给数组结尾追加数组
					//console.log("品质1:"+quaW+"---品质2:"+priQua);
					playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+id,"图片:auto"],["品质:"+qua,"数量:"+numA],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
					arrwareToObj();		//给仓库数组更改obj储存格式
				}
				//------------------------------------------------------
				var point = players.data[playerIndex].points;
				var diamond = players.data[playerIndex].diamonds;
				if(qua==0){
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>制作物品</span><span><b>"+name+"</b></span><span>"+numA+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}else{
					recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span>制作物品</span><span><b>"+name+"</b><font style='font-size:0.9em;'>(品质: "+qua+")</font></span><span>"+numA+" 件</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
				}
				//alert("物品制作成功！\n你获得了 "+name+" --- "+numA+" 件\n请前往仓库查看");
				//GenerateRecipe(id);	//重新在页面渲染制作的物品
				GenerateWare(arrClass1,arrClass2);	//重新渲染仓库页面
			},time*1000);
			//  var id = recipes[xb].id;	//获取制作物的ID
			//  GenerateRecipe(id);
			// setTimeout(function(){		//达到规定的制作时间后调用制作函数
			// 	CraftingItems(xb);
			// },time*1000);
			
			
			
		}else{
			alert("配方材料不足，无法制作！\n请前往仓库补充材料")
		}
	});
	$(".work-recipe>.left>.l3").click(function(){	//购买
		//var item = $(".work-recipe>header>.name").text();	//获取这个物品的名称
		// var index = $(".work-recipe").data("index");	//获取这个物品在制作列表中的下标
		// if(index==undefined){
		// 	var item = data[index].id;	//获取这个物品的ID
		// }else{
		// 	var item = recipes[index].id;	//获取这个物品的ID
		// }
		
		//alert(index)
		var xb = $(".work-recipe").data("shop");	//获取这个物品在商品列表中的下标
		var type = shop.data[xb].class1;	//获取这个商品的分类
		var item = shop.data[xb].id;		//获取这个商品的ID
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
				//遍历当前显示的商品
				for(var i=0;i<$(".items-box>.items").length;i++){
					var index = $(".items-box>.items").eq(i).data("index");
					if(index==xb){		//找到对应商品
						$(".items-box>.items").eq(i).click();
						formPage = "workbench";
						formPageItem = item;
					}
				}
				},50);
			});
		},10);
	});
	
	$(".work-page>.slots>li").mouseenter(function(){	//鼠标移入正在制作的物品显示取消图标
		$(this).find(".cancel").show();
	});
	$(".work-page>.slots>li").mouseleave(function(){	//鼠标移出正在制作的物品隐藏取消图标
		$(this).find(".cancel").hide();
	});
	$(".work-page>.slots>li").click(function(){
		//alert(123)
	});
	
	$(".recipe-list").on("click","li",function(){	//点击配方列表的物品
		var xb1 = $(".work-recipe").data("index");	//获取制作物在制作列表中的下标
		var xb2 = $(this).data("index");			//获取配方在配方列表中的下标
		var id = recipes[xb1][xb2].id;		//获取配方的ID
		var name = recipes[xb1][xb2].name;		//获取配方的名称
		GenerateRecipe(id);			//渲染这个物品的详情信息
		$(".citems-search>input").val(name);	//搜索这个物品
		$(".citems-search>.search-type>.t2").click();	//搜索类型为配方
		
	});
	
	$(".head-tool>.back").click(function(){	//返回仓库
		$(".Main-menu>.menu-2").click();
	});
});