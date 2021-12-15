var crafCard = '<li class="craftable-items"><i></i><span class="name">物品名称</span><span class="num"></span></li>';
var pageCra = 1;	//当前浏览页面
var lastTxt = 1;	//制作列表上次浏览的页面
var searchType = "制作物";	//搜索类型
function GenerateCraftable(page){		//将制作列表渲染到页面
	if(!page){
		var len = recipes.length;	//制作物数量
		var len1 = (pageCra-1)*8;	//在对应页面开头渲染的制作物的下标
		var len2 = pageCra*8;		//在对应页面结尾渲染的制作物的下标
		if(len2>len){len2=len}
		if(len1>=len){return "false";}
	}else{
		var len1 = 0;
		var len2 = recipes.length;
	}
	$(".citems-list>ul>.craftable-items").remove();	//移除制作列表所有物品
	var count = 0;
	//for(var i=len1;i<len2;i++){	//遍历制作列表
	for(var i=len1;i<recipes.length;i++){	//遍历制作列表
		if(!page){
			if(count==8){return;}
		}
		var area = recipes[i].area;	//获取物品制作渠道
		//if(area=="web"){	//网页工作台
		if(area==undefined||area=="workbench"||area=="web"){
			count++;
			//console.log(count)
			$(".citems-list>ul").append(crafCard);
			//保存制作物品的下标到页面
			$(".citems-list>ul>li:last").attr("data-index",i);
			//名称
			$(".citems-list>ul>li:last").find(".name").text(recipes[i].name);
			//图标
			$(".citems-list>ul>li:last").find("i").css("background-image","url("+recipes[i].image+")");
			//数量
			$(".citems-list>ul>li:last").find(".num").show().text("x"+recipes[i].num);
			//列表颜色
			if(recipes[i].type=="物块模型"){
				var color = "166, 217, 173";	//绿
			}else if(recipes[i].type=="物品资源"){
				var color = "255,205,135";		//黄
			}else{
				var color = "255,180,180";		//粉
			}
			$(".citems-list>ul>li:last").find("i").css({
				"background-color":"rgba("+color+",0.2)",
				"border":"0.15rem solid rgba("+color+", 0.9)"
			});
		}else{
			// console.log("")
		}
		
		
	}
}
GenerateCraftable();
	
function searchItems(){		//搜索制作列表的物品
	pageCra = 1;
	$(".citems-search>.select-page>input").val(pageCra);
	var txt = $(".citems-search>.search").val().toLowerCase();	//获取输入框输入的内容
	if(txt==""||txt==undefined){	//如果输入的内容为空
		$(".citems-search>.select-page").show();	//显示页数
		$(".citems-search>.search-type").hide();	//隐藏搜索类型
		GenerateCraftable();
	}else{
		$(".citems-search>.select-page").hide();	//隐藏页数
		$(".citems-search>.search-type").css("display","flex");	//显示搜索类型
		$(".citems-list>ul>.craftable-items").remove();	//移除制作列表所有物品
		GenerateCraftable(true);	//生成所有可制作物品
	}
	
	
	//console.log(txt)
	var find = false;	//默认为没找到制作物品
	var findRec = false;	//默认为没找到配方物品
	//var findRec2 = true;	//默认为配方列表包含搜索的物品
	for(var i=0;i<recipes.length;i++){	//遍历列表所有制作物品
		var name = recipes[i].name.toLowerCase();	//获取物品名称
		var id = recipes[i].id.toLowerCase();		//获取物品ID
		if((name.indexOf(txt) != -1||id.indexOf(txt) != -1)&&searchType=="制作物"){	//如果物品名称或ID中包含了需要搜索的字符串
			//if(searchType=="制作物"){
				find = true;
				$(".citems-list>ul>.empty").hide();
			// }else if(searchType=="配方"){
			// 	find = false;
			// }
		}else{		//如果物品名称或ID中没有包含需要搜索的字符串
			if(searchType=="制作物"){
				var findRec = false;
				$(".citems-list>ul>.craftable-items").eq(i).hide();
			}else if(searchType=="配方"){
				//下面要检测所有物品配方名称是否包含搜索的字符串
				var rlen =  $(".data-recipe recipe").eq(i).find("ingredient").length;
				var findRec2 = false;	//默认为这个制作品的配方没有包含搜索的字符串
				for(var j=0;j<rlen;j++){
					//console.log(j)
					var rName = recipes[i][j].name.toLowerCase();
					var rId = recipes[i][j].id.toLowerCase();
					if(rName.indexOf(txt) != -1||rId.indexOf(txt) != -1){	//如果配方名称或ID中包含了需要搜索的字符串
						findRec = true;
						findRec2 = true;
						//findRec2 = false;
						$(".citems-list>ul>.empty").hide();
						//$(".citems-list>ul>.craftable-items").eq(i).show();		//显示这个物品
						//console.log(i+"-"+j+"---"+rName+"---"+txt)
						break;
					}else{	//制作物品和这个物品的配方都没有包含搜索的字符串
						//console.log(i+"---"+rName+"---"+txt)
						
					}
				}
				if(!findRec2){
					$(".citems-list>ul>.craftable-items").eq(i).hide();		//隐藏这个物品
				}
			}
		}
	}
	if(!find&&!findRec){	//如果遍历完数组后，仍然没找到要搜索的制作物品或配方物品
		//console.log("没找到搜索的物品");
		$(".citems-list>ul>.empty").show();
		$(".citems-list>ul>.empty").find("span").html("没有找到你想<br>搜索的物品");
	}
}

function jumpPage(){	//跳转到指定页面
	//$(".citems-search>input").val("");	//将搜索物品清空
	var txt = $(".citems-search>.select-page>input").val();	//获取输入的内容
	var maxPage = Math.floor((recipes.length-1)/8+1);	//获取最大页数
	if(txt<=0||txt==""){
		pageCra = 1;	//页数最少为1
		$(".citems-search>.select-page>input").val(pageCra);
	}
	if(txt>maxPage){	//如果输入的页数大于列表页数
		pageCra = maxPage;	//页数等于列表最大页数
		$(".citems-search>.select-page>input").val(pageCra);
	}
	if(isNaN(txt)){		//如果输入的内容有误
		pageCra = lastTxt;	//页数等于上次浏览的页数
		$(".citems-search>.select-page>input").val(pageCra);
	}
	pageCra = $(".citems-search>.select-page>input").val()*1;		//获取输入的页面
	var pg = GenerateCraftable();	//渲染物品列表
	if(pg=="false"){	//如果页数不存在
		pageCra = lastTxt;	//页数等于上次浏览的页数
		$(".citems-search>.select-page>input").val(pageCra);
	}
	lastTxt = pageCra;
}

$(document).ready(function(){
	// setTimeout(function(){},1000);
	$(".citems-list").on("mouseenter",".craftable-items",function(){		//制作物列表悬浮特效
		$(this).css("background","linear-gradient(0deg,rgba(200,200,200,0.1),rgba(255,255,255,0.7),rgba(255,255,255,0.7),rgba(200,200,200,0.1))");
		$(this).find(".name").css({
			// "transition":"0.4s",
			// "padding-left":"0.3rem",
			"font-weight":"bold"
		});
	});
	$(".citems-list").on("mouseleave",".craftable-items",function(){
		$(this).css("background","rgba(255,255,255,0.7)");
		$(this).find(".name").css({
			// "transition":"0.2s",
			// "padding-left":"0",
			"font-weight":"normal"
		});
	});

	$(".citems-list").on("click",".craftable-items",function(){
		var xb = $(this).data("index");
		var id = recipes[xb].id
		GenerateRecipe(id);
	});
	
	$(".citems-search>.select-page>.next").click(function(){	//制作物列表: 下一页
		pageCra += 1;
		var pg = GenerateCraftable();	//渲染物品列表
		if(pg=="false"){	//如果是最后一页
			pageCra -= 1;
		}
		$(".citems-search>.select-page>input").val(pageCra);	//渲染当前页数
		//$(".citems-search>input").val("");	//将搜索物品清空
		lastTxt = pageCra;
	});
	$(".citems-search>.select-page>.prev").click(function(){	//制作物列表: 上一页
		pageCra -= 1;
		if(pageCra<=0){		//至少只能是第一页
			pageCra = 1
		}else{
			$(".citems-search>.select-page>input").val(pageCra);	//渲染当前页数
			GenerateCraftable();	//渲染物品列表
		}
		lastTxt = pageCra;
	});
	
	$(".citems-search>.search-type>.t1").click(function(){	//搜索类型: 制作物
		searchType = "制作物";
		searchItems();
		$(".citems-search>.search-type>div").css({
			"color":"rgb(111,111,111)",
			"border-bottom":"none",
			"font-weight":"normal"
		});
		$(this).css({
			"color":"rgb(88,166,200)",
			"border-bottom":"0.2rem solid rgb(88,166,200)",
			"font-weight":"bold"
		});
	});
	$(".citems-search>.search-type>.t2").click(function(){	//搜索类型: 配方
		searchType = "配方";
		searchItems();
		$(".citems-search>.search-type>div").css({
			"color":"rgb(111,111,111)",
			"border-bottom":"none",
			"font-weight":"normal"
		});
		$(this).css({
			"color":"rgb(0,150,0)",
			"border-bottom":"0.2rem solid rgb(0,150,0)",
			"font-weight":"bold"
		});
	});
});