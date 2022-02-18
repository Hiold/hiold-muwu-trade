var admin_card = '<li class="Customer"><div class="head"></div><div class="msg"><div class="name"></div><div class="intro"></div></div></li>'
var admin_arr = [];
admin_arr = [	//服务器管理员列表（客服列表）
	["Cxx","images/player/Cxx.jpg","狗逼","782893487"],
	["失意","images/player/shiyi.jpg","管理员","355516382"],
	["旧识","images/player/jiushi.jpg","管理员","461694675"],
	["彩色の小木屋","images/player/muwu.jfif","建筑师",""],
	["Yuki","images/player/Yuki.jpg","建筑师","1626903155"],
	["茄子喵","images/player/miao2.png","建筑师","1182381598"],
	
	//[名称,头像,信息,QQ]
];
$(document).ready(function(){
	function importAdmin(){		//将数组中的管理员渲染到页面
		$(".ul-1>.Customer").remove();
		$(".aside-profile>.page2>.tit[data-num=1]").html("<i></i> 服务器管理员（"+admin_arr.length+"）")
		for(var i=0;i<admin_arr.length;i++){
			$(".aside-profile .ul-1").append(admin_card);
			var name = admin_arr[i][0];
			var img = admin_arr[i][1];
			var txt = admin_arr[i][2];
			var qq = admin_arr[i][3];
			$(".ul-1>.Customer:last").find(".head").css("background-image","url("+img+")");
			$(".ul-1>.Customer:last").find(".name").text(name);
			$(".ul-1>.Customer:last").find(".intro").text(txt);
			$(".ul-1>.Customer:last").data("qq",qq);
			if(txt=="服主"){
				$(".ul-1>.Customer:last").find(".name").css("color","rgb(221, 36, 36)")
			}
		}
	}
	importAdmin();
	$(".aside-profile>.page2>.tit").click(function(){	//隐藏人员，显示人员
		var xb = $(this).data("num");
		var show = $(this).data("show");
		//console.log(show)
		if(show=='true'||show==true){
			//console.log("true-")
			$(this).find("i").css("transform","rotate(-90deg)");
			$(this).next().find(".Customer").slideUp(200);
			$(this).data("show","false");
		}else{
			//console.log("false-")
			$(this).find("i").css("transform","rotate(0deg)");
			$(this).next().find(".Customer").slideDown(200);
			$(this).data("show","true");
		}
	});
	$(".Customer").click(function(){	//点击发起QQ对话
		var qq = $(this).data("qq");
		if(qq==""||qq==undefined){
			Alert("对方暂未设置QQ联系方式，无法发起对话<br>请尝试用其它方式联系该成员");
			popupCss(28,14);
		}else{
			window.open("tencent://message/?uin="+qq);
		}
		
	});
	
	
	
});