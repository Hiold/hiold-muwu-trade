import{M as a,N as e,u as s,C as o,G as t,p as n,a as l,r,o as d,c as i,f as c,D as u,H as p,A as m,w as g,g as w}from"./vendor.131327e9.js";const h={setup(){const{ctx:n}=m(),l=a({username:"",password:""}),r=e(null),d=e("/images/login/video.mov");return s().commit("clearTags"),{param:l,rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},login:r,submitForm:()=>{var a={username:l.username,password:l.password};o.post("api/login",a).then((a=>{"1"===a.data.respCode?(console.log(a.data.data),t.success("登录成功"),localStorage.setItem("ms_username",l.username),"1"===a.data.data.type?window.location="/#/manage/dashboard":window.location="/#/userq/shop/",n.$currentUser=a.data.data,localStorage.setItem("userinfo",JSON.stringify(a.data.data))):t.error(a.data.respMsg)}))},Videosrc:d}},mounted(){if(null!=window.location.href&&""!=window.location.href&&window.location.href.indexOf("ncode=")>-1){var a=window.location.href.substring(window.location.href.indexOf("ncode=")+6);console.log("快捷登录模式",a);var e={ncode:a};o.post("api/ncodeLogin",e).then((a=>{"1"===a.data.respCode?(console.log(a.data.data),t.success("登录成功"),localStorage.setItem("ms_username",a.data.name),"1"===a.data.data.type?window.location="/#/manage/dashboard":window.location="/#/userq/shop/",ctx.$currentUser=a.data.data,localStorage.setItem("userinfo",JSON.stringify(a.data.data))):t.error(a.data.respMsg)}))}else console.log("正常登录模式")}},v=g();n("data-v-5d359e00");const f={class:"showcase"},b={class:"video-container"},y={class:"title"},_=c("b",null,"7",-1),x=w(" Days To "),I=w("Die"),S=c("span",null,"A20",-1),V={class:"contentnew"},q=c("div",{class:"login-tit"},[c("h1",null,"༺ཌ 七日杀 · 积分交易商城 ད༻"),c("span",null,"V2.0.1")],-1),C={class:"user"},D=c("i",null,null,-1),O={class:"pwd"},U=c("i",null,null,-1),k={class:"signup"},F=c("div",{class:"b2"},"注 册",-1),M=c("footer",null,[w(" © 2022 "),c("a",{href:"https://doc.hiold.net/",target:"_blank"},"doc.hiold.net"),w(" 版权所有  如需帮助请访问 "),c("a",{href:"https://doc.hiold.net/",target:"_blank"},"木屋海鸥交易系统"),w(" 官方网站 ")],-1);l();const N=v(((a,e,s,o,t,n)=>{const l=r("die");return d(),i("section",f,[c("div",b,[c("video",{src:o.Videosrc,autoplay:"",muted:"",loop:""},null,8,["src"])]),c("div",y,[c("span",null,[_,x,c(l,null,{default:v((()=>[I])),_:1})]),S]),c("div",V,[q,c("div",C,[D,u(c("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>o.param.username=a),type:"text",class:"user-val",placeholder:"游戏名 / steamID"},null,512),[[p,o.param.username]])]),c("div",O,[U,u(c("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>o.param.password=a),type:"password",class:"pwd-val",placeholder:"密码"},null,512),[[p,o.param.password]])]),c("div",k,[c("div",{class:"b1",onClick:e[3]||(e[3]=(...a)=>o.submitForm&&o.submitForm(...a))},"登 录"),F]),M])])}));h.render=N,h.__scopeId="data-v-5d359e00";export default h;