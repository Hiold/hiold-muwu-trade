import{$ as t,G as s,E as n,A as i,p as e,a as o,o as a,c as l,f as c,l as r,w as u}from"./vendor.e2554b35.js";const d={name:"SlotMachine",data:()=>({ctx:{},divwidth:0,divheidht:0,barcount:0,sevencount:0,starcount:0,xiguacount:0,lingdangcount:0,lemoncount:0,orangecount:0,applecount:0,containerwidth:0,timerout:0,timerinter:0,isrolling:!1}),methods:{addpoint(s){if(t("#clickbtn")[0].currentTime=0,t("#clickbtn")[0].play(),!(this.$store.state.points<=this.barcount+this.sevencount+this.starcount+this.xiguacount+this.lingdangcount+this.lemoncount+this.orangecount+this.applecount))switch(s){case 1:this.barcount<990&&(this.barcount+=10);break;case 2:this.sevencount<990&&(this.sevencount+=10);break;case 3:this.starcount<990&&(this.starcount+=10);break;case 4:this.xiguacount<990&&(this.xiguacount+=10);break;case 5:this.lingdangcount<990&&(this.lingdangcount+=10);break;case 6:this.lemoncount<990&&(this.lemoncount+=10);break;case 7:this.orangecount<990&&(this.orangecount+=10);break;case 8:this.applecount<990&&(this.applecount+=10)}},mouseDown(s,n){t(s)[0].className.indexOf("btn-ast")>0&&(s=t(s).parent()),t(s).css("background-image","url(images/sgj/sgj_xzan_2.png)"),t(s).find("div").css("margin-top","10%"),this.timerout=setTimeout((()=>{this.timerinter=setInterval((()=>{this.addpoint(n)}),100)}),1e3)},mouseUp(s,n){t(s)[0].className.indexOf("btn-ast")>0&&(s=t(s).parent()),t(s).css("background-image","url(images/sgj/sgj_xzan_1.png)"),t(s).find("div").css("margin-top","7%"),clearTimeout(this.timerout),clearInterval(this.timerinter)},mouseDownStart(s){t(s)[0].className.indexOf("btn-ast")>0&&(s=t(s).parent()),t(s).css("background-image","url(images/sgj/sgj_ksan_2.png)")},mouseUpStart(s){t(s)[0].className.indexOf("btn-ast")>0&&(s=t(s).parent()),t(s).css("background-image","url(images/sgj/sgj_ksan_1.png)")},StartRolling(){if(!this.isrolling){this.isrolling=!0;var i={barcount:this.barcount+"",sevencount:this.sevencount+"",starcount:this.starcount+"",xiguacount:this.xiguacount+"",lingdangcount:this.lingdangcount+"",lemoncount:this.lemoncount+"",orangecount:this.orangecount+"",applecount:this.applecount+""},e=this.barcount+this.sevencount+this.starcount+this.xiguacount+this.lingdangcount+this.lemoncount+this.orangecount+this.applecount;0!=e?e>this.$store.state.points?s.error("点数不足!"):(this.$store.state.points-=e,n.post("api/SGJRolling",i).then((s=>{if("1"===s.data.respCode){var n=JSON.parse(s.data.data);console.log(n[0]),console.log(n[1]);var i=1*n[0].Value,e=1*n[1].Value;console.log(i),t("#rolling")[0].play();var o=1,a=setInterval((()=>{t("#selectBox").attr("class","selectBox"+o%22),o++}),30);setTimeout((()=>{clearInterval(a),t("#rolling")[0].pause(),t("#forresult")[0].play();var s=0;o%22>=i?s=21-o%22+i:(s=i-o%22)<=3&&(s+=22);var n=setInterval((()=>{t("#selectBox").attr("class","selectBox"+o%22),o%22==i&&(clearInterval(n),this.$store.state.points=e,this.isrolling=!1),o++}),1300/s)}),1e3+2e3*Math.random())}}))):s.error("请下注!")}},resize(){var s=t(".maincontainer").width(),n=t(".maincontainer").height();this.containerwidth=s;var i=t(".maincontainer").width(),e=i/1.14583;e>n&&(i=1.14583*(e=n)),this.divwidth=i,this.divheidht=e,console.log(this.divwidth),console.log(this.divheidht)},loadPoint(){n.post("api/GetSGJPoint",{}).then((t=>{"1"===t.data.respCode&&(console.log(t.data.data),this.$store.state.points=1*t.data.data.configValue)}))}},mounted(){this.ctx=i(),this.resize(),window.addEventListener("resize",(()=>{this.resize()})),this.loadPoint()}},g=u();e("data-v-995d5f06");const h=c("div",{class:"btn-container btn-ast"},null,-1),p=c("div",{class:"btn-container btn-ast"},null,-1),m=c("div",{class:"btn-container btn-ast"},null,-1),v=c("div",{class:"btn-container btn-ast"},null,-1),w=c("div",{class:"btn-container btn-ast"},null,-1),x=c("div",{class:"btn-container btn-ast"},null,-1),b=c("div",{class:"btn-container btn-ast"},null,-1),y=c("div",{class:"btn-container btn-ast"},null,-1),k=c("div",{class:"btn-container btn-ast"},null,-1),M={class:"num7"},f={class:"num6"},j={class:"num5"},$={class:"num4"},C={class:"num3"},D={class:"num2"},S={class:"num1"},U=c("div",{style:{clear:"both"}},null,-1),_={class:"num1"},z={class:"num2"},I={class:"num3"},B=c("div",{style:{clear:"both"}},null,-1),N={class:"num1"},O={class:"num2"},R={class:"num3"},G={class:"num1"},T={class:"num2"},J={class:"num3"},P={class:"num1"},V={class:"num2"},E={class:"num3"},A={class:"num1"},F={class:"num2"},L={class:"num3"},q={class:"num1"},H={class:"num2"},K={class:"num3"},Q={class:"num1"},W={class:"num2"},X={class:"num3"},Y={class:"num1"},Z={class:"num2"},tt={class:"num3"},st={preload:"auto",id:"clickbtn"},nt={loop:"",preload:"auto",id:"rolling"},it={preload:"auto",id:"forresult"},et=c("div",{class:"rules"},[c("h2",null,"规则说明"),c("h3",null,"1、10000积分兑换100点数"),c("h3",null,"2、押注水果后按开始键。可同时押几种水果，也可重复压一种水果。"),c("h3",null,"3、灯停后，按照对应的赔率获得点数")],-1);o();const ot=g(((t,s,n,i,e,o)=>(a(),l("div",{class:"maincontainer",onResize:s[28]||(s[28]=t=>o.resize())},[c("div",{class:"bgcontainer",style:"width:"+e.divwidth+"px;height:"+e.divheidht+"px;margin-left:"+(e.containerwidth/2-e.divwidth/2)+"px"},[c("div",{class:"btn1",onClick:s[1]||(s[1]=t=>o.addpoint(1)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[2]||(s[2]=t=>o.mouseDown(t.target,1)),onMouseup:s[3]||(s[3]=t=>o.mouseUp(t.target,1))},[h],36),c("div",{class:"btn2",onClick:s[4]||(s[4]=t=>o.addpoint(2)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[5]||(s[5]=t=>o.mouseDown(t.target,2)),onMouseup:s[6]||(s[6]=t=>o.mouseUp(t.target,2))},[p],36),c("div",{class:"btn3",onClick:s[7]||(s[7]=t=>o.addpoint(3)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[8]||(s[8]=t=>o.mouseDown(t.target,3)),onMouseup:s[9]||(s[9]=t=>o.mouseUp(t.target,3))},[m],36),c("div",{class:"btn4",onClick:s[10]||(s[10]=t=>o.addpoint(4)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[11]||(s[11]=t=>o.mouseDown(t.target,4)),onMouseup:s[12]||(s[12]=t=>o.mouseUp(t.target,4))},[v],36),c("div",{class:"btn5",onClick:s[13]||(s[13]=t=>o.addpoint(5)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[14]||(s[14]=t=>o.mouseDown(t.target,5)),onMouseup:s[15]||(s[15]=t=>o.mouseUp(t.target,5))},[w],36),c("div",{class:"btn6",onClick:s[16]||(s[16]=t=>o.addpoint(6)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[17]||(s[17]=t=>o.mouseDown(t.target,6)),onMouseup:s[18]||(s[18]=t=>o.mouseUp(t.target,6))},[x],36),c("div",{class:"btn7",onClick:s[19]||(s[19]=t=>o.addpoint(7)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[20]||(s[20]=t=>o.mouseDown(t.target,7)),onMouseup:s[21]||(s[21]=t=>o.mouseUp(t.target,7))},[b],36),c("div",{class:"btn8",onClick:s[22]||(s[22]=t=>o.addpoint(8)),style:"width:"+e.divwidth/11+"px;height:"+e.divheidht/11+"px;cursor:pointer",onMousedown:s[23]||(s[23]=t=>o.mouseDown(t.target,8)),onMouseup:s[24]||(s[24]=t=>o.mouseUp(t.target,8))},[y],36),c("div",{class:"btn9",style:"width:"+e.divwidth/8+"px;height:"+e.divheidht/8+"px;cursor:pointer",onMousedown:s[25]||(s[25]=t=>o.mouseDownStart(t.target)),onMouseup:s[26]||(s[26]=t=>o.mouseUpStart(t.target)),onClick:s[27]||(s[27]=(...t)=>o.StartRolling&&o.StartRolling(...t))},[k],36),c("div",{class:"pointContainer",style:"width:"+e.divwidth/4.25+"px;height:"+e.divheidht/19.8+"px;"},[c("div",M,[t.$store.state.points>=1e6?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/1e6)%10+".png"},null,8,["src"])):r("",!0)]),c("div",f,[t.$store.state.points>=1e5?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/1e5)%10+".png"},null,8,["src"])):r("",!0)]),c("div",j,[t.$store.state.points>=1e4?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/1e4)%10+".png"},null,8,["src"])):r("",!0)]),c("div",$,[t.$store.state.points>=1e3?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/1e3)%10+".png"},null,8,["src"])):r("",!0)]),c("div",C,[t.$store.state.points>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",D,[t.$store.state.points>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(t.$store.state.points/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",S,[t.$store.state.points>=0?(a(),l("img",{key:0,src:"images/sgj/"+t.$store.state.points%10+".png"},null,8,["src"])):r("",!0)]),U],4),c("div",{class:"divcount-bar",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",_,[e.barcount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.barcount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",z,[e.barcount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.barcount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",I,[e.barcount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.barcount)%10+".png"},null,8,["src"])):r("",!0)]),B],4),c("div",{class:"divcount-77",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",N,[e.sevencount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.sevencount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",O,[e.sevencount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.sevencount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",R,[e.sevencount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.sevencount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-star",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",G,[e.starcount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.starcount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",T,[e.starcount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.starcount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",J,[e.starcount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.starcount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-xigua",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",P,[e.xiguacount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.xiguacount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",V,[e.xiguacount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.xiguacount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",E,[e.xiguacount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.xiguacount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-lingdang",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",A,[e.lingdangcount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lingdangcount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",F,[e.lingdangcount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lingdangcount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",L,[e.lingdangcount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lingdangcount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-lemon",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",q,[e.lemoncount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lemoncount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",H,[e.lemoncount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lemoncount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",K,[e.lemoncount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.lemoncount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-orange",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",Q,[e.orangecount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.orangecount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",W,[e.orangecount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.orangecount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",X,[e.orangecount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.orangecount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{class:"divcount-apple",style:"width:"+e.divwidth/16.7+"px;height:"+e.divheidht/31+"px;"},[c("div",Y,[e.applecount>=100?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.applecount/100)%10+".png"},null,8,["src"])):r("",!0)]),c("div",Z,[e.applecount>=10?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.applecount/10)%10+".png"},null,8,["src"])):r("",!0)]),c("div",tt,[e.applecount>=0?(a(),l("img",{key:0,src:"images/sgj/"+Math.floor(e.applecount)%10+".png"},null,8,["src"])):r("",!0)])],4),c("div",{id:"selectBox",class:"selectBox0",style:"width:"+e.divwidth/10+"px;height:"+e.divwidth/10+"px;"},null,4),c("audio",st,[c("source",{src:"images/sgj/clickbtn.wav",type:"audio/wav"},null,8,["src"])]),c("audio",nt,[c("source",{src:"images/sgj/rolling.wav",type:"audio/wav"},null,8,["src"])]),c("audio",it,[c("source",{src:"images/sgj/Forresult.wav",type:"audio/wav"},null,8,["src"])]),et],4)],32))));d.render=ot,d.__scopeId="data-v-995d5f06";export default d;
