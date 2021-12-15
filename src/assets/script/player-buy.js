//对数组更改储存格式，以方便在js中调用
	function arrbuyToObj(){
		playerBuys = {};
		if(playerBuy[playerIndex]==undefined){
			playerBuy[playerIndex] = [[playerName,steamID]];
		}
		playerBuys.data = playerBuy[playerIndex];
		//console.log(playerBuys.data)
		for(var i=1;i<playerBuy[playerIndex].length;i++){	//遍历当前登录玩家的商品购买数量数组
			playerBuys.data[i].id = playerBuy[playerIndex][i][0];		//物品ID
			playerBuys.data[i].numDay = playerBuy[playerIndex][i][1].split(":")[1];		//今日购买数量
			playerBuys.data[i].numAll = playerBuy[playerIndex][i][2].split(":")[1];		//总购买数量
			
			//console.log(playerBuys.data[i])
		}
		//console.log(playerBuy[playerIndex])
		
	}
$(document).ready(function(){
	playerBuy = [
/*			[["玩家名称","steamID"],
			 ["1物品ID:","今日购买数量:5","总购买数量:10"],
			 ["2物品ID:","今日购买数量:0","总购买数量:3"],
			 [......]
			],	*/
			[["彩色の小木屋","76561199000000001"],
			 ["Cxx的尿不湿","今日购买数量:1","总购买数量:10"],
			 ["Cxx的开裆裤","今日购买数量:0","总购买数量:3"],
			 ["casinoCoin","今日购买数量:6","总购买数量:13"],
			 ["decoPumpkinJackOLantern","今日购买数量:1","总购买数量:8"]
			],
		
		
	];
	
	
	arrbuyToObj();
	
	
	
	
});