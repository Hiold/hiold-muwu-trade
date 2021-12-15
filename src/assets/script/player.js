console.log("正在读取player.js");
function playerToObj(){
		players = {};
		players.data = playerBasic;
		for(var i in playerBasic){
			players.data[i].name = playerBasic[i][0][0].split(":")[1];		//玩家名称
			players.data[i].id = playerBasic[i][0][1].split(":")[1];		//steamID
			players.data[i].image = playerBasic[i][0][2].split(":")[1];		//玩家头像
			players.data[i].level = playerBasic[i][1][0].split(":")[1];		//游戏等级
			players.data[i].status = playerBasic[i][1][1].split(":")[1];	//玩家身份
			players.data[i].online = playerBasic[i][1][2].split(":")[1];	//在线时长(h)
			players.data[i].points = playerBasic[i][2][0].split(":")[1];	//拥有积分
			players.data[i].diamonds = playerBasic[i][2][1].split(":")[1];	//拥有钻石
			players.data[i].offers = playerBasic[i][2][2].split(":")[1];	//购物优惠(%)
			players.data[i].qdWeek = playerBasic[i][3][0].split(":")[1];	//本周签到次数
			players.data[i].qdAll = playerBasic[i][3][1].split(":")[1];		//总签到次数
			players.data[i].recharge = playerBasic[i][3][2].split(":")[1];	//总充值金额
			players.data[i].consume = playerBasic[i][3][3].split(":")[1];	//总消费钻石
		}
		//console.log(players.data);
	}
function GeneratePlayer(){	//在页面生成玩家数据
	var found = false;	//默认为数组中没找到玩家
	for(var i in playerBasic){
		if(players.data[i].id==steamID){	//如果在数组中找到玩家
			//alert(players.data[i].id+"---"+steamID)
			//header
			playerIndex = i;	//储存玩家的下标
			$("main>header>.Point>span").text(players.data[i].points);		//积分
			$("main>header>.Diamond>span").text(players.data[i].diamonds);	//钻石
			//右侧信息卡
			$("aside>header>.player-key>.name").text(players.data[i].name);	//名称
			$("aside>header>.player-key>.level").text("lv. "+players.data[i].level);	//等级
			$("aside>header>.player-steamId>span").text(players.data[i].id);//steamID
			$("aside>header>.player-head").css("background-image","url("+players.data[i].image+")");//头像
			//右侧信息卡 - 展开列表
			$(".my-jf>span").text(players.data[i].points);		//积分
			$(".my-zs>span").text(players.data[i].diamonds);	//钻石
			$(".my-ol>span").text(players.data[i].online);		//在线时长
			$(".my-sf>span").text(players.data[i].status);		//个人身份
			$(".my-yh>span").text(players.data[i].offers);		//购物优惠(%)
			$(".all-cz>span").text(players.data[i].recharge);	//总充值(￥)
			$(".all-xf>span").text(players.data[i].consume);	//总消费(钻石)
			$(".all-qd>span").text(players.data[i].qdAll);		//总签到
			if(players.data[i].status=="管理员"||players.data[i].status=="商店会员"){
				$("aside>header>.player-key>.name").css("color","rgb(221, 36, 36)");
			}else{
				$("aside>header>.player-key>.name").css("color","rgb(80,80,80)");
			}
			found = true;
			break;
		}
	}
	if(found==false){	//如果遍历完数组仍然没有找到玩家（说明玩家未登录 或者 首次使用网页商城）
		if(steamID==""||steamID==undefined){	//用户状态为未登录
			console.log("当前没有登录的玩家");
			//header
			$("main>header>.Point>span").text(0);	//积分
			$("main>header>.Diamond>span").text(0);	//钻石
			//右侧信息卡
			$("aside>header>.player-key>.name").text("未登录");	//名称
			$("aside>header>.player-key>.level").text("lv. "+1);	//等级
			$("aside>header>.player-steamId>span").text("76561199000000000");	//steamID
			$("aside>header>.player-head").css("background-image","url(images/player/head1.jfif)");	//头像
			//右侧信息卡 - 展开列表
			$(".my-jf>span").text(0);	//积分
			$(".my-zs>span").text(0);	//钻石
			$(".my-ol>span").text(0);	//在线时长
			$(".my-sf>span").text("普通玩家");//个人身份
			$(".my-yh>span").text(0);		//购物优惠(%)
			$(".all-cz>span").text(0);	//总充值(￥)
			$(".all-xf>span").text(0);	//总消费(钻石)
			$(".all-qd>span").text(0);	//总签到
		}else{	//用户状态已登录，首次使用网页
			console.log("我在player.js的77行，这一步需要从后端获取玩家等级和积分");
			//这一步需要从后端获取玩家等级和原有的积分
			//...........
			var playerLevel = 5;	//假设这个是从后端获取的玩家等级-----
			var playerPoint = 888;	//假设这个是从后端获取的玩家积分-----
			//给玩家创建一个新的数组
			playerBasic[playerBasic.length] = [["名称:"+playerName,"steamID:"+steamID,"头像:images/player/head1.jfif"],["等级:"+playerLevel,"身份:普通玩家","在线时长(h):0"],["拥有积分:"+888,"拥有钻石:0","购物优惠(%):0"],["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]];
			console.log(6)
			playerToObj();		//将更新的数组重新转换对象格式
			console.log(7)
			GeneratePlayer();	//重新遍历数组并且在页面生成玩家数据
			console.log(playerBasic)
		}
	}
}
$(document).ready(function(){
	playerBasic = [	//玩家基本数据
		[["名称:彩色の小木屋","steamID:76561199000000001","头像:images/player/muwu.jfif"],
		["等级:520","身份:管理员","在线时长(h):123"],["拥有积分:5201314","拥有钻石:520","购物优惠(%):12"],
		["本周签到次数:5","总签到次数:18","总充值金额:520","总消费钻石:10"]],
		
		[["名称:茄子喵","steamID:76561199000000002","头像:images/player/miao2.png"],
		["等级:200","身份:商店会员","在线时长(h):36"],["拥有积分:520000","拥有钻石:200","购物优惠(%):5"],
		["本周签到次数:1","总签到次数:8","总充值金额:10","总消费钻石:0"]],
		
		[["名称:Yuki","steamID:76561199000000003","头像:images/player/yuki.jpg"],
		["等级:100","身份:普通玩家","在线时长(h):1"],["拥有积分:1314","拥有钻石:10","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家01","steamID:76561199000000004","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家02","steamID:76561199000000005","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家03","steamID:76561199000000006","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家04","steamID:76561199000000007","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家05","steamID:76561199000000008","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家06","steamID:76561199000000009","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家07","steamID:76561199000000010","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
		
		[["名称:玩家08","steamID:76561199000000011","头像:images/player/head1.jfif"],
		["等级:1","身份:普通玩家","在线时长(h):1"],["拥有积分:1000","拥有钻石:0","购物优惠(%):0"],
		["本周签到次数:0","总签到次数:0","总充值金额:0","总消费钻石:0"]],
	];
	//下面是对上面的数组更改储存格式，以方便在js中调用
	function playerToObj(){
		players = {};
		players.data = playerBasic;
		for(var i in playerBasic){
			players.data[i].name = playerBasic[i][0][0].split(":")[1];		//玩家名称
			players.data[i].id = playerBasic[i][0][1].split(":")[1];		//steamID
			players.data[i].image = playerBasic[i][0][2].split(":")[1];		//玩家头像
			players.data[i].level = playerBasic[i][1][0].split(":")[1];		//游戏等级
			players.data[i].status = playerBasic[i][1][1].split(":")[1];	//玩家身份
			players.data[i].online = playerBasic[i][1][2].split(":")[1];	//在线时长(h)
			players.data[i].points = playerBasic[i][2][0].split(":")[1];	//拥有积分
			players.data[i].diamonds = playerBasic[i][2][1].split(":")[1];	//拥有钻石
			players.data[i].offers = playerBasic[i][2][2].split(":")[1];	//购物优惠(%)
			players.data[i].qdWeek = playerBasic[i][3][0].split(":")[1];	//本周签到次数
			players.data[i].qdAll = playerBasic[i][3][1].split(":")[1];		//总签到次数
			players.data[i].recharge = playerBasic[i][3][2].split(":")[1];	//总充值金额
			players.data[i].consume = playerBasic[i][3][3].split(":")[1];	//总消费钻石
		}
		//console.log(players.data);
	}
	playerToObj();
	//console.log(2)
	//alert(steamID)
	GeneratePlayer();
	//console.log(123)
	
	
	
	
	
});
console.log("player.js读取成功");