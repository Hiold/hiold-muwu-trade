
var playerQd = [
	//steamID, 周一到周日是否已签到（1表示已签到，0表示未签到）
	[76561199000000001,1,0,0,0,0,0,0],
	[76561199000000002,0,0,0,0,0,0,0],
];

function GenerateQd(){	//渲染签到页面
	var week = getTime().week;	//获取当前是星期几
	if(week==0){week=7}	//周日
	//var week = 7;
	var notqd = 0;	//记录当前是未签到的第几天
	//console.log(week)
	for(var i=1;i<8;i++){
		var id = $(".Act-qd>.read>qd>li").eq(i-1).attr("award");	//获取每天签到的奖品ID
		var num = $(".Act-qd>.read>qd>li").eq(i-1).attr("count")*1;	//获取奖品的数量
		if(isNaN(num)||num==""||num<=0){num=1}	//奖品数量至少为一件
		var xb = queryShopItems(id);	//在商品列表中查找这个奖品并返回下标
		if(xb>=0){
			var name = shop.data[xb].name;	//奖品名称
			var img = shop.data[xb].image;	//奖品图片
		}else{
			var name = "暂无奖品";
			var img = "images/items/qd.png";
			var num = 0;
		}
		//奖物品信息渲染到页面.Act-qd li>.image>b
		$(".Act-qd li").eq(i-1).find(".image>img").attr("src",img);	//图片
		if(num==1){		//如果奖品只有一件
			$(".Act-qd li").eq(i-1).find(".image>b").text("");		//数量
		}else if(num>1){	//如果奖品大于一件
			$(".Act-qd li").eq(i-1).find(".image>b").text(num);		//数量
		}
		var fn = playerQd[playerIndex][i];	//获取当前周每天的签到情况
		if(fn==1){	//已签到
			$(".Act-qd li").eq(i-1).find(".name").css({
				"font-size":"1.1rem",
				"color":"gray",
				"cursor":"default",
				"background":"linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))"
			});
			$(".Act-qd li").eq(i-1).find(".name").text(name);
			$(".Act-qd li").eq(i-1).find(".received").show();
		}else{	//未签到
			$(".Act-qd li").eq(i-1).find(".received").hide();
			notqd++;
			if(notqd==1){	//如果是未签到的第一天
				if(i>week){
					$(".Act-qd li").eq(i-1).find(".name").text("明日可领");
					i--;
				}else{
					$(".Act-qd li").eq(i-1).find(".name").css({
						"font-size":"1.3rem",
						"color":"Peru",
						"cursor":"pointer",
						"background-color":"rgba(255,215,0,0.8)"
					});
					if(week>i){
						$(".Act-qd li").eq(i-1).find(".name").text("补签");
					}else if(week<=i){
						$(".Act-qd li").eq(i-1).find(".name").text("立即签到");
					}
				}
			}else if(notqd>1){	//如果是未签到的第notqd天
				$(".Act-qd li").eq(i-1).find(".name").css({
					"font-size":"1.1rem",
					"color":"Peru",
					"cursor":"default",
					"background":"linear-gradient(90deg, rgba(250, 250, 210, 0.5), rgba(245, 245, 220, 0.7))"
				});
				if(notqd==2){
					$(".Act-qd li").eq(i-1).find(".name").text("明日可领");
				}else{
					$(".Act-qd li").eq(i-1).find(".name").text("还剩 "+(notqd-1)+" 天");
				}
			}
		}
	}
	$(".Act-qd li").eq(6).find(".name").css("font-size","1.5rem");
}
$(document).ready(function(){
	
	//读取签到奖励
	$(".Act-qd>.read").load("Config/qd.xml",function(){
		GenerateQd();	//渲染签到页面
	});
	
	$(".Act-qd li>.name").click(function(){		//立即签到 按钮
		var txt = $(this).text();
		if(txt=="立即签到"){
			var xb = $(this).parent().data("index");
			playerQd[playerIndex][xb+1] = 1;
			GenerateQd();	//重新渲染签到页面
			//获得奖励并发送至仓库
			var id = $(".Act-qd>.read>qd>li").eq(xb).attr("award");	//获取物品ID
			var xb2 = queryShopItems(id);	//在商品列表中查找这个奖品并返回下标
			if(xb2>=0){
				var name = shop.data[xb2].name;	//奖品名称
				var img = shop.data[xb2].image;	//奖品图片
			}else{
				var name = id;
				var img = "images/ItemIcons/"+id+".png";
			}
			var num = $(".Act-qd>.read>qd>li").eq(xb).attr("count")*1;	//获取物品数量
			
			if(isNaN(num)||num==""||num<=0){num=1}	//奖品数量至少为一件
			//下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
			var findItem = false;	//默认为没找到相同物品
			for(var j in playerWare[playerIndex]){
				var idW = playerWares.data[j].id;		//获取数组中物品ID
				var numW = playerWares.data[j].num*1;		//获取数组中物品数量
				if(idW==id){	//如果是相同的物品
					findItem = true;
					numW += num;	//直接给相同的物品增加购买的数量，无需再新创建数组
					playerWares.data[j].num = numW;	//保存更新的数量
					playerWare[playerIndex][j][1][1] = "数量:"+numW;
				}
			}
			if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
				playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+id,"图片:auto"],["品质:","数量:"+num],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
			}
			arrwareToObj();	//给仓库数组转换储存格式
			prizeArr = [
				[name,img,"数量:"+num,"品质:"]
			];
			//Alert("<font color='green'>签到成功</font><br>恭喜你获得了<br><font color='orangered'>"+name+"</font> <font color='dodgerblue'>"+num+"</font>件<br>奖品已发送至您的仓库");
			//popupCss(25,17);
			Award();
		}else if(txt=="补签"){
			var xb = $(this).parent().data("index");
			Confirm("是否消耗一张 <font color='orangered'>补签卡</font> 进行补签？");
			popupCss(25,13);
			//确认补签
			$("#alert>.alert>footer>.confirm").unbind("click");
			$("#alert>.alert>footer>.confirm").click(function(){
				//检测仓库是否有补签卡
				var xbw = queryWareItems("补签卡",0);
				if(xbw>=0){		//如果有补签卡
					//如果有补签卡，消耗一张补签卡并执行下面的操作
					var qdnum = playerWares.data[xbw].num*1;	//获取补签卡数量
					qdnum --;
					playerWares.data[xbw].num = qdnum;
					playerWare[playerIndex][xbw][1][1] = "数量:"+qdnum;
					if(qdnum==0){	//如果补签卡数量为0（用完了）
						playerWare[playerIndex].splice(xbw,1);	//删除仓库数组中的补签卡
					}
					arrwareToObj();		//将更新的仓库数组重新转换obj格式
					$("#alert,#alert>.alert").hide();
					playerQd[playerIndex][xb+1] = 1;
					GenerateQd();	//渲染签到页面
					//获得奖励并发送至仓库
					var id = $(".Act-qd>.read>qd>li").eq(xb).attr("award");	//获取物品ID
					var xb2 = queryShopItems(id);	//在商品列表中查找这个奖品并返回下标
					if(xb2>=0){
						var name = shop.data[xb2].name;	//奖品名称
						var img = shop.data[xb2].image;	//奖品图片
					}else{
						var name = id;
						var img = "images/ItemIcons/"+id+".png";
					}
					var num = $(".Act-qd>.read>qd>li").eq(xb).attr("count")*1;	//获取物品数量
					if(isNaN(num)||num==""||num<=0){num=1}	//奖品数量至少为一件
					//下面的for循环遍历原有仓库数组,如果数组中有相同的物品,那么就合并数量,没有的话就在结尾追加
					var findItem = false;	//默认为没找到相同物品
					for(var j in playerWare[playerIndex]){
						var idW = playerWares.data[j].id;		//获取数组中物品ID
						var numW = playerWares.data[j].num*1;		//获取数组中物品数量
						if(idW==id){	//如果是相同的物品
							findItem = true;
							numW += num;	//直接给相同的物品增加购买的数量，无需再新创建数组
							playerWares.data[j].num = numW;	//保存更新的数量
							playerWare[playerIndex][j][1][1] = "数量:"+numW;
						}
					}
					if(findItem==false){	//如果遍历完数组后仍然没找到物品，给数组结尾追加数组
						playerWare[playerIndex][playerWare[playerIndex].length] = [["auto","ID:"+id,"图片:auto"],["品质:","数量:"+num],["总分类:auto","子分类:auto","mod:auto"],["auto"]];
					}
					arrwareToObj();	//给仓库数组转换储存格式
					prizeArr = [
						[name,img,"数量:"+num,"品质:"]
					];
					//Alert("<font color='green'>签到成功</font><br>恭喜你获得了<br><font color='orangered'>"+name+"</font> <font color='dodgerblue'>"+num+"</font>件<br>奖品已发送至您的仓库");
					//popupCss(25,17);
					Award();
				}else{		//如果没有补签卡
					Alert("<font color='red'>签到失败！</font><br>你的仓库没有找到补签卡");
					popupCss(25,14);
				}
				
			});
		}
	});
	
});