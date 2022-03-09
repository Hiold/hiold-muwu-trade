
$(document).ready(function(){
	
	var loadAll = false;	//操作列表加载状态，true表示所有操作列表加载完成，false表示还有操作列表未加载
	
	$(".order-record>header>.back").click(function(){	//订单记录 - 返回
		//alert(123)
		$(".order-record").hide();
		$(".ware-list").fadeIn(200);
		$(".Category-ware>.shield").hide();	//左侧分类导航栏解除禁止
		if(arrClass1=="普通物品"){
			$(".warehouse>.menu>.l1").show();	//显示"提取到背包"按钮
		}
	});
	$(".order-record").click(function(){
		//GenerateOrder(false);
	});
	$(".order-record>section").scroll(function(){	//操作列表滚动事件
		var sTop = $(".order-record>section").scrollTop();	//获取当前滚动条距离顶部高度
		var boxHeight = $(".order-record>section").height();	//获取盒子高度
		var sHeight = $(".order-record>section")[0].scrollHeight;	//盒子内部高度
		var boxPaddingTop = parseInt($(".order-record>section").css("padding-top"));		//盒子内边距顶部
		var boxPaddingBottom = parseInt($(".order-record>section").css("padding-bottom"));	//盒子内边距底部
		var boxBorder = parseInt($(".order-record>section").css("border-width"))*2;			//盒子边框
		var allHeight = sTop+boxHeight+boxPaddingTop+boxPaddingBottom+boxBorder+30;	//当前所浏览位置总高度
		console.log(allHeight+"==="+sHeight)
		if(allHeight>=sHeight){
			//console.log("到达底部");
			if(!loadAll){
				loadAll = true;
				setTimeout(function(){		//这里模拟一下获取数据的延迟。
					loadAll = false;
					GenerateOrder(false);
				},500);
			}else{
				console.log("操作记录列表全部加载完毕！");
			}
		}
	});
});
