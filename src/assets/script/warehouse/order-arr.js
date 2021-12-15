//console.log("正在读取order-arr.js");
recordConsole = [
	["76561199000000001",
		// "2021/10/5 上午1:23:32<br><span>购买商品</span><span><b>南瓜灯</b></span><span>10件</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		// "2021/10/11 下午5:38:16<br><span>提取物品</span><span><b>圣诞帽</b></span><span>2件</span>",
	],
	["76561199000000002",
		"2021/10/2 下午6:16:57 --- 购买商品 公爵赌场币 1000件",
		"订单记录读取测试......",
	]
];
for(var i=0;i<playerBasic.length;i++){
	if(recordConsole[i]==undefined){
		recordConsole[i] = [steamID]
	}
}
function GenerateOrder(){	//将玩家订单(操作)列表渲染到页面
	$(".order-record>section>li").remove();	//移除仓库所有订单列表
	for(var i=1;i<recordConsole[playerIndex].length;i++){	//遍历订单数组
		$(".order-record>section").append("<li></li>");
		$(".order-record>section>li:last").html(recordConsole[playerIndex][i]);
	}
}
//console.log(playerIndex)
if(playerIndex!=undefined){
	//console.log("记录登录信息");
	var name = players.data[playerIndex].name;
	var point = players.data[playerIndex].points;
	var diamond = players.data[playerIndex].diamonds;
	//console.log(recordConsole[playerIndex])
	recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span style='font-size:1rem;'>玩家 <b style='font-size:1.1em;color:mediumpurple;'>"+name+"</b> 登录积分商城</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
}else{
	// playerIndex = 76561199000000003;
	// //recordConsole[playerIndex] = [0]
	// var name = "游客";
	// var point = 0;
	// var diamond = 0;
}


//console.log("order-arr.js读取成功");

