//console.log(0);
$(document).ready(function(){
	//console.log(1);
	playerStore = [
/*		[["玩家名称","steamID"],
		 ["1物品ID:","品质:5","数量:10"],
		  ["2物品D:","品质:1","数量:1"],
		 [......]
		],	*/
		[["彩色の小木屋","76561199000000001","店铺名称:彩虹糖果屋","销售额:12345","获赞:123","QQ:429690798"],
		 ["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:888","价格:345","品质:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:666","价格:456","品质:"],
		 ["交易类型:出售","名称:碾压王","ID:drinkCanMegaCrush","数量:56","价格:300","品质:"],
		 ["交易类型:出售","名称:拐杖糖棍棒","ID:meleeWpnClubT1CandyClub","数量:2","价格:2345","品质:5"],
		 ["交易类型:求购","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:12","价格:8888","品质:"],
		 ["交易类型:求购","名称:祖父的私酒","ID:drinkJarGrandpasMoonshine","数量:200","价格:300","品质:"]
		],
		
		[["茄子喵","76561199000000002","店铺名称:奇幻百宝斋","销售额:5200","获赞:88","QQ:1182381598"],
		 ["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:888","价格:123","品质:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:666","价格:456","品质:"],
		 ["交易类型:出售","名称:拐杖糖棍棒","ID:meleeWpnClubT1CandyClub","数量:123","价格:1314","品质:6"],
		 ["交易类型:求购","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:12","价格:88888","品质:"],
		 ["交易类型:求购","名称:Cxx的开裆裤","ID:Cxx的开裆裤","数量:5","价格:9999","品质:"]
		],
		
		[["Yuki","76561199000000003","店铺名称:一心堂药房","销售额:1314","获赞:66","QQ:1626903155"],
		 ["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:888","价格:345","品质:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:666","价格:456","品质:"],
		 ["交易类型:求购","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:12","价格:8888","品质:"]
		],
		
		[["玩家01","76561199000000004","店铺名称:玩家01的店铺","销售额:88","获赞:1","QQ:"],
		 ["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:12","价格:99","品质:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:6","价格:15","品质:"]
		],
		
		[["玩家02","76561199000000005","店铺名称:玩家02的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:求购","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:12","价格:99","品质:"]
		],
		
		[["玩家03","76561199000000006","店铺名称:玩家03的店铺","销售额:0","获赞:0","QQ:"],
		 //["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:12","价格:99","品质:"]
		],
		
		[["玩家04","76561199000000007","店铺名称:玩家04的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:12","价格:99999","品质:"],
		 ["交易类型:出售","名称:Cxx的开裆裤","ID:Cxx的开裆裤","数量:6","价格:88888","品质:"]
		],
		
		[["玩家05","76561199000000008","店铺名称:玩家05的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:10","价格:99999","品质:"]
		],
		
		[["玩家06","76561199000000009","店铺名称:玩家06的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:10","价格:99999","品质:"]
		],
		
		[["玩家07","76561199000000010","店铺名称:玩家07的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:10","价格:99999","品质:"]
		],
		
		[["玩家08","76561199000000011","店铺名称:玩家08的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:10","价格:99991","品质:"]
		],
		
		[["玩家09","76561199000000012","店铺名称:玩家09的店铺","销售额:0","获赞:0","QQ:"],
		 //["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:10","价格:99999","品质:"]
		],
		
		[["玩家10","76561199000000013","店铺名称:玩家10的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:求购","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:20","价格:99992","品质:"]
		],
		
		[["玩家11","76561199000000014","店铺名称:玩家11的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:30","价格:99993","品质:"]
		],
		
		[["玩家12","76561199000000015","店铺名称:玩家12的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:求购","名称:Cxx的尿不湿","ID:Cxx的尿不湿","数量:40","价格:99994","品质:"]
		],
		
		[["玩家13","76561199000000016","店铺名称:玩家13的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:40","价格:200","品质:"]
		],
		
		[["玩家14","76561199000000017","店铺名称:玩家14的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:求购","名称:圣诞帽","ID:armorSantaHat","数量:40","价格:320","品质:"]
		],
		
		[["玩家15","76561199000000018","店铺名称:玩家15的店铺","销售额:0","获赞:0","QQ:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:20","价格:320","品质:"]
		],
		
		[["玩家16","76561199000000019","店铺名称:玩家16的店铺","销售额:10","获赞:0","QQ:"],
		 ["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:30","价格:520","品质:"]
		],
		
		[["玩家17","76561199000000020","店铺名称:玩家17的店铺","销售额:20","获赞:0","QQ:"],
		 ["交易类型:求购","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:20","价格:520","品质:"]
		],
		
		[["玩家18","76561199000000021","店铺名称:玩家18的店铺","销售额:10","获赞:0","QQ:"],
		 //["交易类型:出售","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:30","价格:520","品质:"]
		],
		
		[["玩家19","76561199000000022","店铺名称:玩家19的店铺","销售额:20","获赞:0","QQ:"],
		 ["交易类型:求购","名称:南瓜灯","ID:decoPumpkinJackOLantern","数量:20","价格:520","品质:"]
		],
		
		[["玩家20","76561199000000023","店铺名称:玩家20的店铺","销售额:10","获赞:0","QQ:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:30","价格:520","品质:"]
		],
		
		[["玩家21","76561199000000024","店铺名称:玩家21的店铺","销售额:20","获赞:0","QQ:"],
		 ["交易类型:求购","名称:圣诞帽","ID:armorSantaHat","数量:20","价格:520","品质:"]
		],
		
		[["玩家22","76561199000000025","店铺名称:玩家22的店铺","销售额:20","获赞:0","QQ:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:20","价格:520","品质:"]
		],
		
		[["玩家23","76561199000000026","店铺名称:玩家23的店铺","销售额:30","获赞:0","QQ:"],
		 ["交易类型:求购","名称:圣诞帽","ID:armorSantaHat","数量:20","价格:520","品质:"]
		],
		
		[["玩家24","76561199000000027","店铺名称:玩家24的店铺","销售额:30","获赞:0","QQ:"],
		 ["交易类型:出售","名称:圣诞帽","ID:armorSantaHat","数量:20","价格:520","品质:"]
		],
	];
	//console.log(playerCollect[0])
	//GenerateColl();
	//console.log(2);
});