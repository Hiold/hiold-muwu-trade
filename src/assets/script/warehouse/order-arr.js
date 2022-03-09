//console.log("正在读取order-arr.js");
recordConsole = [
	["76561199000000001",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试1</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试2</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试3</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试4</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试5</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试6</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试7</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试8</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试9</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试10</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试11</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试12</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试13</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试14</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试15</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试16</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试17</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试18</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试19</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试20</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试21</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试22</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试23</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试24</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试25</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试26</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试27</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试28</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试29</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 "2021/10/5 1:23:32<br><span>操作记录列表测试30</span><div class='money'><div class='point'>429690</div><div class='diamond'>123</div></div>",
		 
	],
	["76561199000000002",
		"2021/10/2 下午6:16:57 --- 购买商品 公爵赌场币 1000件",
	]
];
for(var i=0;i<playerBasic.length;i++){
	if(recordConsole[i]==undefined){
		recordConsole[i] = [steamID]
	}
}

if(playerIndex!=undefined){
	//console.log("记录登录信息");
	var name = players.data[playerIndex].name;
	var point = players.data[playerIndex].points;
	var diamond = players.data[playerIndex].diamonds;
	//console.log(recordConsole[playerIndex])
	recordConsole[playerIndex][recordConsole[playerIndex].length] = getTime().date+"<br><span style='font-size:1rem;'>玩家 <b style='font-size:1.1em;color:mediumpurple;'>"+name+"</b> 登录积分商城</span><div class='money'><div class='point'>"+point+"</div><div class='diamond'>"+diamond+"</div></div>";
}

var recordLen = recordConsole[playerIndex].length-1;	//获取操作列表数组长度
var startli = recordLen;	//遍历数组开始的下标（默认为数组最后一个）
var maxli = 10;		//页面最大显示的列表数量（默认为10）
function GenerateOrder(x){	//将玩家操作列表渲染到页面
	recordLen = recordConsole[playerIndex].length-1;	//获取操作列表数组长度
	if(x){
		$(".order-record>section>li").remove();	//移除仓库所有操作列表
		startli = recordLen;
	}
	$(".order-record>section>.loading").remove();
	var endli = startli-maxli;	//遍历末端的数组下标
	if(endli<0){endli=0}
	for(var i=startli;i>endli;i--){	//遍历操作数组
		$(".order-record>section").append("<li></li>");
		$(".order-record>section>li:last").html(recordConsole[playerIndex][i]);
	}
	$(".order-record>section").append("<div class='loading' style='font-size:1.1rem;'>正在加载中<i style='width:1.8rem;height:1.8rem;'></i></div>");
	if(startli-maxli<endli){	//如果是列表最后一组，隐藏加载中的logo
		$(".order-record .loading").hide();
		console.log("内容已全部加载完成");
	}
	startli = endli;
	//检测列表数量
	var num = $(".order-record>section>li").length;
	//alert(num+"==="+maxli)
	if(num<maxli){	//如果当前列表数量小于设定的显示数量(10)，就隐藏加载中的logo
		$(".order-record .loading").hide();
	}
	
}

