
$(document).ready(function(){
	
	
	
	$(".order-record>header>.back").click(function(){	//订单记录 - 返回
		//alert(123)
		$(".order-record").hide();
		$(".ware-list").fadeIn(200);
		$(".Category-ware>.shield").hide();	//左侧分类导航栏解除禁止
		if(arrClass1=="普通物品"){
			$(".warehouse>.menu>.l1").show();	//显示"提取到背包"按钮
		}
	});
	
	
});
