import{A as e,$ as a,E as l,G as t,r as n,o as r,c as i,f as s,k as u,g as o,t as c}from"./vendor.e2554b35.js";import"./moment.08a7f518.js";import"./md5.66ee5649.js";const d={name:"ShopManage",mounted(){this.ctx=e(),this.initTableData()},data:()=>({currentViewAction:{},actionDetailVisible:!1,currentPage:1,total:0,queryData:null,ctx:{},addVisible:!1,itemNameCache:[],queryParam:{steamid:"",eosid:"",username:"",itemname:"",getchanel:"",status:"",group:"",type:"",page:"1",limit:"10"},chanels:{1:"系统中获得",2:"下架物品",3:"玩家交易",4:"供货",5:"游戏内容器",6:"签到",7:"补签",8:"抽奖",9:"阶段任务",10:"红包"},status:{1:"正常在库",2:"已发放到游戏内",3:"自行删除",4:"自行卖出",5:"供货消耗",6:"抽奖消耗",7:"补签消耗",8:"管理员删除"}}),methods:{formatDate(e,a="yyyy-MM-dd HH:mm:ss"){var l=e.getFullYear(),t=e.getMonth()+1,n=e.getDate(),r=e.getHours(),i=e.getMinutes(),s=e.getSeconds(),u=e.getDay(),o=e.getMilliseconds(),c="";1==u?c="星期一":2==u?c="星期二":3==u?c="星期三":4==u?c="星期四":5==u?c="星期五":6==u?c="星期六":7==u&&(c="星期日");var d="0"+t,g="0"+n,h="0"+r,m="0"+i,b="0"+s;return a.replace(/yyyy/g,l).replace(/YYYY/g,l).replace(/yy/g,(l+"").substring(2,4)).replace(/YY/g,(l+"").substring(2,4)).replace(/MM/g,d.substring(d.length-2)).replace(/dd/g,g.substring(g.length-2)).replace(/HH/g,h.substring(h.length-2)).replace(/hh/g,h.substring(h.length-2)).replace(/mm/g,m.substring(m.length-2)).replace(/sss/g,o).replace(/SSS/g,o).replace(/ss/g,b.substring(b.length-2)).replace(/SS/g,b.substring(b.length-2)).replace(/E/g,c)},handleEdtor(){if(!this.instance){console.log(a("#editor")),this.editor=new wangEditor("#editor");let e=this;this.editor.config.onchange=function(a){e.currentViewAction.desc=a},this.editor.config.onchangeTimeout=100,this.editor.create(),this.instance=!0}this.editor.txt.html(this.currentViewAction.desc)},getchanel(e){return this.chanels[e+""]},getstatus(e){return this.status[e+""]},handleSizeChange(e){this.queryParam.limit=e+"",this.queryParam.page="1",this.initTableData()},handleCurrentChange(e){console.log(e),this.queryParam.page=e+"",this.initTableData()},initTableData(){l.post("api/getActionByPage",this.queryParam).then((e=>{"1"===e.data.respCode?(this.queryData=e.data.data.data,this.total=e.data.data.count,a(".imgDesc").attr("src","'404'")):(this.queryData=null,t.error(e.data.respMsg))}))},openUpdate(e){this.actionDetailVisible=!0,this.currentViewAction=e.row,a(".imgDescDetail").attr("src","'404'"),this.$nextTick((()=>{this.handleEdtor()}))},handleAvatarSuccess(){t({message:"上传成功!",type:"success"}),this.initIconData()},handleAvatarFaild(){t.error("上传失败"),this.initIconData()},handleSelectImage(e){this.currentViewAction.avatar=e}}},g={class:"crumbs"},h=s("i",{class:"el-icon-lx-cascades"},null,-1),m=o(" 用户信息 "),b={class:"handle-box"},y=o("搜索"),p={class:"container"},v={class:"dialog-footer"},k=o("关闭");d.render=function(e,a,l,t,d,f){const D=n("el-breadcrumb-item"),V=n("el-breadcrumb"),w=n("el-option"),P=n("el-select"),q=n("el-input"),C=n("el-button"),S=n("el-table-column"),_=n("el-table"),T=n("el-pagination"),z=n("el-dialog");return r(),i("div",null,[s("div",g,[s(V,{separator:"/"},{default:u((()=>[s(D,null,{default:u((()=>[h,m])),_:1})])),_:1})]),s("div",b,[s(P,{modelValue:d.queryParam.type,"onUpdate:modelValue":a[1]||(a[1]=e=>d.queryParam.type=e),placeholder:"物品类型",class:"handle-select mr10",onChange:f.initTableData},{default:u((()=>[s(w,{key:"-1",label:"全部",value:""}),s(w,{key:"0",label:"登录",value:"0"}),s(w,{key:"1",label:"购买物品",value:"1"}),s(w,{key:"2",label:"出售物品",value:"2"}),s(w,{key:"3",label:"取回",value:"3"}),s(w,{key:"4",label:"上架求购",value:"4"}),s(w,{key:"5",label:"购买玩家交易物品",value:"5"}),s(w,{key:"6",label:"供货",value:"6"}),s(w,{key:"7",label:"图片上传",value:"7"}),s(w,{key:"8",label:"从游戏内容器提取物品到交易系统",value:"8"}),s(w,{key:"9",label:"添加系统售卖物品",value:"9"}),s(w,{key:"10",label:"更新了系统售卖物品信息",value:"10"}),s(w,{key:"11",label:"删除系统售卖物品",value:"11"}),s(w,{key:"12",label:"库存提取到游戏中",value:"12"}),s(w,{key:"13",label:"家自主删除物品 无补偿",value:"13"}),s(w,{key:"14",label:"添加收藏物品",value:"14"}),s(w,{key:"15",label:"取消收藏物品",value:"15"}),s(w,{key:"16",label:"更新玩家基础信息",value:"16"}),s(w,{key:"17",label:"取消求购",value:"17"}),s(w,{key:"18",label:"物品被购买",value:"18"}),s(w,{key:"19",label:"被供货",value:"19"}),s(w,{key:"20",label:"添加红包",value:"20"}),s(w,{key:"21",label:"修改红包",value:"21"}),s(w,{key:"22",label:"删除红包",value:"22"}),s(w,{key:"23",label:"添加奖品",value:"23"}),s(w,{key:"24",label:"修改奖品",value:"24"}),s(w,{key:"25",label:"删除奖品",value:"25"}),s(w,{key:"26",label:"领取红包",value:"26"}),s(w,{key:"27",label:"添加阶段任务",value:"27"}),s(w,{key:"28",label:"修改阶段任务",value:"28"}),s(w,{key:"29",label:"删除阶段任务",value:"29"}),s(w,{key:"31",label:"领取阶段任务奖励",value:"31"}),s(w,{key:"32",label:"添加抽奖",value:"32"}),s(w,{key:"33",label:"修改抽奖",value:"33"}),s(w,{key:"34",label:"删除抽奖",value:"34"}),s(w,{key:"35",label:"抽奖",value:"35"}),s(w,{key:"36",label:"添加签到",value:"36"}),s(w,{key:"37",label:"修改签到",value:"37"}),s(w,{key:"38",label:"删除签到",value:"38"}),s(w,{key:"39",label:"签到",value:"39"}),s(w,{key:"40",label:"补签",value:"40"})])),_:1},8,["modelValue","onChange"]),s(q,{modelValue:d.queryParam.username,"onUpdate:modelValue":a[2]||(a[2]=e=>d.queryParam.username=e),placeholder:"用户名或者店铺名",class:"handle-input mr10"},null,8,["modelValue"]),s(q,{modelValue:d.queryParam.steamid,"onUpdate:modelValue":a[3]||(a[3]=e=>d.queryParam.steamid=e),placeholder:"SteamID",class:"handle-input mr10"},null,8,["modelValue"]),s(q,{modelValue:d.queryParam.eosid,"onUpdate:modelValue":a[4]||(a[4]=e=>d.queryParam.eosid=e),placeholder:"EOSID",class:"handle-input mr10"},null,8,["modelValue"]),s(C,{type:"primary",icon:"el-icon-search",onClick:f.initTableData},{default:u((()=>[y])),_:1},8,["onClick"])]),s("div",p,[s(_,{border:"",class:"table",ref:"multipleTable","header-cell-class-name":"table-header",data:d.queryData},{default:u((()=>[s(S,{prop:"action.id",label:"ID",width:"55",align:"center"}),s(S,{label:"操作时间",align:"center"},{default:u((e=>[o(c(f.formatDate(new Date(e.row.action.actTime))),1)])),_:1}),s(S,{label:"操作描述",align:"center"},{default:u((e=>[o(c(e.row.action.desc),1)])),_:1}),s(S,{label:"用户名",align:"center"},{default:u((e=>[o(c(null!=e.row.userinfo&&e.row.userinfo.length>0?e.row.userinfo[0].name:""),1)])),_:1}),s(S,{label:"SteamID",align:"center"},{default:u((e=>[o(c(null!=e.row.userinfo&&e.row.userinfo.length>0?e.row.userinfo[0].gameentityid:""),1)])),_:1}),s(S,{label:"EOSID",align:"center"},{default:u((e=>[o(c(null!=e.row.userinfo&&e.row.userinfo.length>0?e.row.userinfo[0].platformid:""),1)])),_:1})])),_:1},8,["data"]),s(T,{currentPage:d.currentPage,"onUpdate:currentPage":a[5]||(a[5]=e=>d.currentPage=e),"page-size":d.queryParam.limit,"onUpdate:page-size":a[6]||(a[6]=e=>d.queryParam.limit=e),"page-sizes":[10,50,200,1e3],disabled:!1,background:!0,layout:"total, sizes, prev, pager, next",total:d.total,onSizeChange:f.handleSizeChange,onCurrentChange:f.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"])]),s(z,{title:"详细信息",modelValue:d.actionDetailVisible,"onUpdate:modelValue":a[8]||(a[8]=e=>d.actionDetailVisible=e),width:"40%","append-to-body":!0,"close-on-click-modal":!1},{footer:u((()=>[s("span",v,[s(C,{type:"primary",onClick:a[7]||(a[7]=()=>{this.actionDetailVisible=!1})},{default:u((()=>[k])),_:1})])])),_:1},8,["modelValue"])])};export default d;
