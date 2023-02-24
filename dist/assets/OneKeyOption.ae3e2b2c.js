import{C as e,G as t,r as d,o,c as a,f as l,k as n,g as m}from"./vendor.131327e9.js";const r={name:"OneKeyOption",data:()=>({formData:{},isQrcodeReady:!0}),methods:{exeCommand(t,d){let o={db:t,command:d};e.post("api/exeDBCommand",o).then((e=>{this.isQrcodeReady=!1}))},deleteAllData(){this.exeCommand("db","delete from awardinfo"),this.exeCommand("db","delete from dailyaward"),this.exeCommand("db","delete from itemexchange"),this.exeCommand("db","delete from lottery"),this.exeCommand("db","delete from progression"),this.exeCommand("db","delete from shopitem"),this.exeCommand("db","delete from signinfo"),this.exeCommand("db","delete from userconfig"),this.exeCommand("db","delete from userinfo"),this.exeCommand("db","delete from userrequire"),this.exeCommand("db","delete from userstorage"),this.exeCommand("db","delete from usertrade"),this.exeCommand("logdb","delete from actionlog"),this.exeCommand("gameeventdb","delete from gameeventlog"),this.exeCommand("db","VACUUM"),this.exeCommand("logdb","VACUUM"),this.exeCommand("gameeventdb","VACUUM"),t.success("操作成功")},deleteItemWithOutFollow(){this.exeCommand("db","update userstorage set storageCount=extinfo1,itemStatus='1' where itemGetChenal='1' and follow='2' and extinfo1!=null"),this.exeCommand("db","delete from userstorage where itemGetChenal!='1' or follow='1'")},deleteItemWithFollow(){this.exeCommand("db","delete from userstorage")}},mounted(){}},i={style:{height:"100%"}},u=m("删除所有数据"),s=l("br",null,null,-1),f=m("清空所有库存（保留跟档）"),c=m("清空所有库存（删除跟档）"),C=m("清空拍卖货架"),g=m("清空求购物品"),h=l("br",null,null,-1),b=m("删除所有玩家"),x=m("清空玩家积分"),_=m("清空玩家点券"),p=l("br",null,null,-1),y=m("重置签到"),k=m("重置补签"),w=m("清理所有日志"),U=m("清理所有玩家制作物品"),V=l("br",null,null,-1),v=m(" 请注意，你在这里做的所有操作，都没有后悔的可能，数据无价！请注意备份！谨慎操作！ "),A={class:"dialog-footer"},Q=m("我已知晓");r.render=function(e,t,m,r,R,D){const F=d("el-button"),I=d("el-tooltip"),O=d("el-col"),W=d("el-row"),z=d("el-dialog");return o(),a("div",i,[l(W,{gutter:20},{default:n((()=>[l(O,{span:24},{default:n((()=>[l(I,{content:"删除所有类型的数据，完全重置（积分如果使用了naiwazibot，不会重置）"},{default:n((()=>[l(F,{type:"danger",onClick:D.deleteAllData},{default:n((()=>[u])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1}),s,l(W,{gutter:20},{default:n((()=>[l(O,{span:24},{default:n((()=>[l(I,{content:"删除所有玩家库存数据，保留并重置跟档物品（可再次领取）"},{default:n((()=>[l(F,{type:"danger",onClick:D.deleteItemWithOutFollow},{default:n((()=>[f])),_:1},8,["onClick"])])),_:1}),l(I,{content:"删除所有玩家库存数据，不保留跟档物品"},{default:n((()=>[l(F,{type:"danger",onClick:D.deleteItemWithFollow},{default:n((()=>[c])),_:1},8,["onClick"])])),_:1}),l(I,{content:"删除所有玩家上架的拍卖物品"},{default:n((()=>[l(F,{type:"danger",onClick:t[1]||(t[1]=e=>D.exeCommand("db","delete from usertrade"))},{default:n((()=>[C])),_:1})])),_:1}),l(I,{content:"删除所有玩家发布的求购物品"},{default:n((()=>[l(F,{type:"danger",onClick:t[2]||(t[2]=e=>D.exeCommand("db","delete from userrequire"))},{default:n((()=>[g])),_:1})])),_:1})])),_:1})])),_:1}),h,l(W,{gutter:20},{default:n((()=>[l(O,{span:24},{default:n((()=>[l(I,{content:"删除所有玩家，连带清空积分（不包含naiwazi积分）、点券"},{default:n((()=>[l(F,{type:"danger",onClick:t[3]||(t[3]=e=>D.exeCommand("db","delete from userinfo"))},{default:n((()=>[b])),_:1})])),_:1}),l(I,{content:"清空玩家积分（不包含naiwazi积分）"},{default:n((()=>[l(F,{type:"danger",onClick:t[4]||(t[4]=e=>D.exeCommand("db","update userinfo set money = 0"))},{default:n((()=>[x])),_:1})])),_:1}),l(I,{content:"清空玩家点券"},{default:n((()=>[l(F,{type:"danger",onClick:t[5]||(t[5]=e=>D.exeCommand("db","update userinfo set credit = 0"))},{default:n((()=>[_])),_:1})])),_:1})])),_:1})])),_:1}),p,l(W,{gutter:20},{default:n((()=>[l(O,{span:24},{default:n((()=>[l(I,{content:"重置所有玩家签到天数"},{default:n((()=>[l(F,{type:"danger",onClick:t[6]||(t[6]=e=>D.exeCommand("logdb","delete from actionlog where actType='39'"))},{default:n((()=>[y])),_:1})])),_:1}),l(I,{content:"重置所有玩家补签天数"},{default:n((()=>[l(F,{type:"danger",onClick:t[7]||(t[7]=e=>D.exeCommand("logdb","delete from actionlog where actType='40'"))},{default:n((()=>[k])),_:1})])),_:1}),l(I,{content:"清理所有日志，谨慎操作！影响多种统计、任务、制作等判定！"},{default:n((()=>[l(F,{type:"danger",onClick:t[8]||(t[8]=e=>D.exeCommand("logdb","delete from actionlog"))},{default:n((()=>[w])),_:1})])),_:1}),l(I,{content:"清理所有正在制作、已制作完成物品"},{default:n((()=>[l(F,{type:"danger",onClick:t[9]||(t[9]=e=>D.exeCommand("logdb","delete from actionlog where actType='42'"))},{default:n((()=>[U])),_:1})])),_:1})])),_:1})])),_:1}),V,l(z,{modelValue:R.isQrcodeReady,"onUpdate:modelValue":t[11]||(t[11]=e=>R.isQrcodeReady=e),width:"30%","close-on-click-modal":!1},{footer:n((()=>[l("span",A,[l(F,{type:"danger",onClick:t[10]||(t[10]=e=>R.isQrcodeReady=!1)},{default:n((()=>[Q])),_:1})])])),default:n((()=>[v])),_:1},8,["modelValue"])])};export default r;
