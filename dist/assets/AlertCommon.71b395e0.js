import{p as s,a,E as l,o as c,c as i,f as n,F as d,i as e,t,l as v,w as o,g as p,B as u}from"./vendor.531192b1.js";const r={name:"AlertCommon",data:()=>({couProps:[]}),mounted(){l.post("api/getdisCountTicket","").then((s=>{if("1"===s.data.respCode){let a=s.data.data;this.couProps=a}}))}},f=o();s("data-v-31f19354");const y={id:"alert"},h=n("div",{class:"alert"},[n("div",{class:"fil"}),n("header",null,[n("span",null,"友情提示"),n("i",null,"✘")]),n("section",null,[n("div",{class:"tit"},[n("div",{class:"icon"})]),n("p",null,[p("  请输入正确的数量"),n("br")]),n("input",{type:"text",class:"alert-val"})]),n("footer",null,[n("div",{class:"close"},"取消"),n("div",{class:"confirm"},"确认")])],-1),m={class:"alert-buy"},g=n("div",{class:"fil"},null,-1),x=n("header",null,[n("span",null,"订单确认"),n("i",null,"✘")],-1),C=n("div",{class:"items"},[n("div",{class:"icon"},[n("img",{src:"assets/armorSantaHat.fdb2a713.png"})]),n("div",{class:"content",style:{"overflow-y":"hidden"}},[n("div",{class:"name"},"圣诞帽"),n("div",{class:"price"},[n("i"),n("span",null,"520")])]),n("div",{class:"count"}," x100 ")],-1),b=n("div",{class:"discount-vip"},[n("span",{class:"tit"},"会员折扣"),n("span",{class:"val"},"-10%"),n("span",{class:"dis"},"9.0折"),n("span",{class:"none"},"你不是商店会员，前往充值可获取更多优惠！")],-1),k={class:"coupon"},Q=n("span",{class:"tit"},"优惠券",-1),q={class:"card"},w=u('<div class="left" data-v-31f19354><span class="curr" data-v-31f19354>积分</span><br data-v-31f19354><span class="type" data-v-31f19354>满减券</span></div><div class="right" data-v-31f19354><div class="cond" data-v-31f19354> 满 <span class="s1" data-v-31f19354>1000</span><span class="s0" data-v-31f19354>减</span><span class="s2" data-v-31f19354>200</span></div><div class="period" data-v-31f19354> 2021.12.12 到期 </div><div class="none" data-v-31f19354>暂无可用</div></div>',2),I={class:"choose"},P=u('<li class="coupon-card" data-v-31f19354><div class="left" data-v-31f19354><span class="curr" data-v-31f19354>活动</span><br data-v-31f19354><span class="type" data-v-31f19354>优惠券</span></div><div class="right" data-v-31f19354><span class="none" data-v-31f19354>不使用优惠券</span></div><div class="select" data-v-31f19354><span data-v-31f19354>✔</span></div></li>',1),T={class:"left"},D={class:"curr"},_=n("br",null,null,-1),O={class:"right"},j={key:0,class:"cond"},A=p("满 "),B={class:"s1"},E=p(),F=n("span",{class:"s0"},"减",-1),H=p(),S={class:"s2"},z={key:1,class:"cond"},G=p("满 "),J={class:"s1"},K=p(),L=p(),M={class:"s2"},N=p(),R=n("span",{class:"s3"},"折",-1),U={class:"period"},V={class:"date"},W=p(),X={class:"num"},Y={class:"couid",style:{display:"none"}},Z=n("div",{class:"select"},[n("span",null,"✔")],-1),$=n("footer",null,[n("span",{class:"price"},[n("span",null,"合计"),n("i"),n("b",null,"48888"),n("del",null,"52000")]),n("div",{class:"close"},"取消"),n("div",{class:"confirm"},"确认付款")],-1),ss=n("div",{class:"window",style:{display:"none"}},[n("div",{class:"fil"}),n("header",null,[n("span",null,"出售物品"),n("i",null,"✘")]),n("section",null,[n("header",null,[n("div",{class:"head"},[n("img",{src:"assets/casinoCoin.0c3fefea.png"})]),n("div",{class:"msg"},[n("div",{class:"name"},"公爵赌场币"),n("div",{class:"num"},"x5000"),n("div",{class:"quality",style:{display:"none"}},"品质：0")])]),n("div",{class:"count"},[n("span",{class:"tit"},"数量："),n("div",{class:"val"},[n("div",{class:"reduce"},"-"),n("input",{type:"text",placeholder:"请输入出售的数量",onkeyup:"this.value=this.value.replace(/[^\\d]|^[0]/g,'')"}),n("div",{class:"add"},"+")])]),n("div",{class:"price"},[n("span",{class:"tit"},"价格："),n("div",{class:"val"},[n("div",{class:"icon"}),n("input",{type:"text",placeholder:"请输入出售的价格（单价）",onkeyup:"this.value=this.value.replace(/[^(0-9).]|^[0]/g,'')"})])]),n("p",null,[p(" 说明："),n("br"),p(" 1.商品将会放在交易中心进行出售，如果有玩家购买你的商品你将会获得对应积分奖励。"),n("br"),p(" 2.关于物品出售价格和相关规定请查看公告或咨询管理员，不符合规范的物品我们将会下架。 ")])]),n("footer",null,[n("div",{class:"close"},"取消"),n("div",{class:"confirm"},"确认出售")])],-1),as=n("div",{class:"alert-edit",style:{display:"none"}},[n("div",{class:"fil"}),n("header",null,[n("span",null,"编辑资料"),n("i",null,"✘")]),n("section",null,[n("div",{class:"left"},[n("div",{class:"head",id:"Img"}),n("div",{class:"choose"},[p(" 选择图片 "),n("input",{type:"file",id:"chooseImage"})])]),n("div",{class:"right"},[n("div",{class:"steamID uncg"},[n("span",{class:"tit"},"steamID："),n("span",{class:"val"},"76561199000000001")]),n("div",{class:"shop-name set"},[n("span",{class:"tit"},"店铺名称："),n("input",{type:"text",class:"shop-name-val"})]),n("div",{class:"qq set"},[n("span",{class:"tit"},"QQ号码："),n("input",{type:"text",class:"myself-qq-val"})]),n("p",null,[p(" 说明："),n("br"),p(" 1. 店铺名称最多只能设置10个字符。"),n("br"),p(" 2. 设置QQ号码可以让其它玩家快速与您进行QQ联系，不设置该功能留空即可。 ")])])]),n("footer",null,[n("div",{class:"close"},"取消"),n("div",{class:"confirm"},"保存设置")])],-1),ls=n("div",{class:"alert-award",style:{display:"none",height:"27rem"}},[n("div",{class:"fil"}),n("header",null,[n("span",null,"奖励信息"),n("i",null,"✘")]),n("section",null,[n("div",{class:"head"}),n("div",{class:"p-box",style:{height:"14rem"}}),n("div",{class:"foot"})]),n("footer",null,[n("div",{class:"confirm"})])],-1);a();const cs=f(((s,a,l,o,p,u)=>(c(),i("div",y,[h,n("div",m,[g,x,n("section",null,[C,b,n("div",k,[Q,n("div",q,[w,n("div",I,[P,(c(!0),i(d,null,e(p.couProps,((s,a)=>(c(),i("li",{class:"coupon-card","data-selfindex":a,key:s.id},[n("div",T,[n("span",D,t(s.couCurrType),1),_]),n("div",O,[s.couCurrType.indexOf("满减")>-1?(c(),i("div",j,[A,n("span",B,t(s.couCond),1),E,F,H,n("span",S,t(s.couPrice),1)])):v("",!0),s.couCurrType.indexOf("折扣")>-1?(c(),i("div",z,[G,n("span",J,t(s.couCond),1),K,n("span",{class:"s0",textContent:t("积分"===s.couCurr?"分":"钻石"===s.couCurr?"钻":"")},null,8,["textContent"]),L,n("span",M,t(s.couPrice),1),N,R])):v("",!0),n("div",U,[n("span",V,t(s.couDate)+" 到期",1),W,n("span",X,"仅剩"+t(s.storageCount)+"张",1)]),n("div",Y,t(s.id),1)]),Z],8,["data-selfindex"])))),128))])])])]),$]),ss,as,ls]))));r.render=cs,r.__scopeId="data-v-31f19354";export{r as _};
