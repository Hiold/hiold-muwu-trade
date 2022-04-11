import"./moment.08a7f518.js";import{A as a,E as e,G as t,L as l,b as i,p as d,a as s,r as o,o as r,c as n,f as c,g as m,t as u,F as p,i as h,l as w,w as f}from"./vendor.40f5b264.js";import{_ as b}from"./AawrdComponent.6b1ab221.js";const D={name:"ItemexchangeComponent",components:{AawrdComponent:b},data:()=>({fid:"5",cid:"",ctx:{},itemNameCache:[],instance:!1,editor:"",speitems:{},selectspeitem:"",awardInfo:[],awardAddVisible:!1,type:"",awardData:{id:"-1",itemname:"",avaliable:"",ban:"",maxprice:"",minprice:""},marks:{0:{style:{color:"#1989FA"},label:"无品质"},1:{style:{color:"rgb(157, 138, 106)"},label:"1品质"},2:{style:{color:"rgb(208, 129, 43)"},label:"2品质"},3:{style:{color:"rgb(163, 165, 28)"},label:"3品质"},4:{style:{color:"rgb(69, 195, 54)"},label:"4品质"},5:{style:{color:"rgb(51, 96, 207)"},label:"5品质"},6:{style:{color:"rgb(165, 44, 205)"},label:"6"}}}),mounted(){this.ctx=a(),this.initTableData(),this.initTempateSPE()},methods:{initTempateSPE(){e.post("api/getAwardInfo",{containerid:"0",funcid:"0"}).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.speitems=e}}))},initTableData(){e.post("api/QueryItemLimitConfig",{page:"1",limit:"114514"}).then((a=>{if("1"===a.data.respCode){let e=a.data.data.data;this.awardInfo=e}}))},resetForm(a){this.$refs[a].resetFields()},submitAddForm(a){this.$refs[a].validate((a=>{if(!a)return!1;{let a="";a="-1"==this.awardData.id?"api/postItemLimitConfig":"api/updateItemLimitConfig",e.post(a,this.awardData).then((a=>{"1"===a.data.respCode?t({message:"保存成功!",type:"success"}):t.error("保存出错");e.post("api/QueryItemLimitConfig",{page:"1",limit:"114514"}).then((a=>{if("1"===a.data.respCode){let e=a.data.data.data;this.awardInfo=e,this.awardAddVisible=!1}}))}))}}))},openAwardEdit(a){this.$store.state.awardEditVisible=!0,this.cid=a.row.data.id},handleSelect(a){console.log(this.itemNameCache[a.value]),"1"==this.type&&(this.awardData.itemname=this.itemNameCache[a.value].itemname)},handleSelectImage(a){this.awardData.itemicon=a},querySearchAsync(a,t){if(a&&a.length>=1){let l={itemname:a,skip:"0",take:"100"};e.get("api/getSystemItemByPage",{params:l}).then((a=>{if("1"===a.data.respCode){let l=JSON.parse(a.data.data),i=[];for(var e=0;e<l.length;e++)null!=l[e].translate&&""!=l[e].translate?(i[e]={value:l[e].translate[16]},this.itemNameCache[l[e].translate[16]]=l[e]):(i[e]={value:l[e].itemname},this.itemNameCache[l[e].itemname]=l[e]);t(i)}}))}},handleAddAward(){this.awardData.id="-1",this.awardAddVisible=!0},openAddUpdate(a){console.log(a.row),this.type="1",this.awardAddVisible=!0,this.awardData.id=a.row.id+"",this.awardData.avaliable=a.row.available+"",this.awardData.ban=a.row.configValue+"",this.awardData.itemname=a.row.name+"",this.awardData.maxprice=a.row.extinfo1+"",this.awardData.minprice=a.row.extinfo2+""},handleAddDelete(a){l.confirm("确定要删除这个商品吗？").then((l=>{if("confirm"===l){let l={id:a+""};e.post("api/deleteItemLimitConfig",l).then((a=>{"1"===a.data.respCode?t({message:"删除成功!",type:"success"}):t.error("删除失败"),this.initTableData()}))}})).catch((()=>{}))},selectspecialitem(a){console.log(a);const e=i((()=>this.speitems.filter((e=>e.id===a))));e.value&&e.value[0]&&(this.awardData.itemname=e.value[0].itemname,this.awardData.itemquality=e.value[0].itemquality,this.awardData.itemchinese=e.value[0].itemchinese,this.awardData.itemicon=e.value[0].itemicon,this.awardData.itemtint=e.value[0].itemtint,this.awardData.command=e.value[0].command,this.awardData.couDate=[e.value[0].couDateStart,e.value[0].couDateEnd],this.awardData.couCurrType=e.value[0].couCurrType,this.awardData.couPrice=e.value[0].couPrice,this.awardData.couCond=e.value[0].couCond,this.awardData.coudatelimit=e.value[0].coudatelimit,this.awardData.couDateStart=e.value[0].couDateStart,this.awardData.couDateEnd=e.value[0].couDateEnd)}}},y=f();d("data-v-28272efe");const v={class:"handle-box"},g=m("添加"),C=m("编辑转换 "),V=m("删除 "),_={class:"dialog-footer"},A=m("确 定"),k=m("取 消"),x=m("重 置");s();const I=y(((a,e,t,l,i,d)=>{const s=o("el-button"),f=o("el-table-column"),b=o("el-table"),D=o("el-option"),I=o("el-select"),S=o("el-form-item"),U=o("el-autocomplete"),E=o("el-input"),T=o("el-form"),F=o("el-dialog");return r(),n("div",null,[c("div",v,[c(s,{type:"success",icon:"el-icon-plus",onClick:d.handleAddAward},{default:y((()=>[g])),_:1},8,["onClick"])]),c(b,{border:"",class:"table",ref:"multipleTable","header-cell-class-name":"table-header",data:i.awardInfo},{default:y((()=>[c(f,{prop:"id",label:"ID",width:"55",align:"center"}),c(f,{label:"物品名称"},{default:y((a=>[m(u(a.row.name),1)])),_:1}),c(f,{label:"启用限制"},{default:y((a=>[m(u("1"==a.row.available?"启用":"禁用"),1)])),_:1}),c(f,{label:"交易限制"},{default:y((a=>[m(u("1"==a.row.configValue?"允许交易":"禁止交易"),1)])),_:1}),c(f,{label:"最高单价"},{default:y((a=>[m(u(""==a.row.extinfo1?"无限制":a.row.extinfo1),1)])),_:1}),c(f,{label:"最低单价"},{default:y((a=>[m(u(""==a.row.extinfo2?"无限制":a.row.extinfo2),1)])),_:1}),c(f,{label:"操作",width:"350",align:"center"},{default:y((a=>[c(s,{type:"primary",icon:"el-icon-edit",size:"small",onClick:e=>d.openAddUpdate(a)},{default:y((()=>[C])),_:2},1032,["onClick"]),c(s,{type:"delete",icon:"el-icon-delete",size:"small",class:"red",onClick:e=>d.handleAddDelete(a.row.id)},{default:y((()=>[V])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),c(F,{title:"新增转换",modelValue:i.awardAddVisible,"onUpdate:modelValue":e[11]||(e[11]=a=>i.awardAddVisible=a),width:"50%","append-to-body":!0,"close-on-click-modal":!1},{footer:y((()=>[c("span",_,[c(s,{type:"primary",onClick:e[8]||(e[8]=a=>d.submitAddForm("awardData"))},{default:y((()=>[A])),_:1}),c(s,{onClick:e[9]||(e[9]=a=>i.awardAddVisible=!1)},{default:y((()=>[k])),_:1}),c(s,{onClick:e[10]||(e[10]=a=>d.resetForm("awardData"))},{default:y((()=>[x])),_:1})])])),default:y((()=>[c(T,{ref:"awardData",model:i.awardData},{default:y((()=>[c(S,{label:"物品类型",class:"center"},{default:y((()=>[c(I,{modelValue:i.type,"onUpdate:modelValue":e[1]||(e[1]=a=>i.type=a),placeholder:"请选择物品类型",class:"handle-space"},{default:y((()=>[c(D,{key:"1",label:"游戏内物品",value:"1"}),c(D,{key:"2",label:"特殊物品",value:"2"})])),_:1},8,["modelValue"])])),_:1}),"2"==i.type?(r(),n(S,{key:0,label:"预设物品",class:"center"},{default:y((()=>[c(I,{placeholder:"请选预设特殊物品",class:"handle-space",modelValue:i.selectspeitem,"onUpdate:modelValue":e[2]||(e[2]=a=>i.selectspeitem=a),onChange:d.selectspecialitem},{default:y((()=>[(r(!0),n(p,null,h(i.speitems,(a=>(r(),n(D,{key:a.id,label:a.itemchinese,value:a.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1})):w("",!0),"1"==i.type?(r(),n(S,{key:1,label:"物品名称",class:"center"},{default:y((()=>[c(U,{style:{width:"70%"},minlength:2,modelValue:i.awardData.itemname,"onUpdate:modelValue":e[3]||(e[3]=a=>i.awardData.itemname=a),"fetch-suggestions":d.querySearchAsync,placeholder:"请输入内容",onSelect:d.handleSelect},null,8,["modelValue","fetch-suggestions","onSelect"])])),_:1})):w("",!0),""!=i.type?(r(),n(p,{key:2},[c(S,{label:"启用限制",class:"center"},{default:y((()=>[c(I,{modelValue:i.awardData.avaliable,"onUpdate:modelValue":e[4]||(e[4]=a=>i.awardData.avaliable=a),placeholder:"请选择是否启用此限制",class:"handle-space"},{default:y((()=>[c(D,{key:"1",label:"启用",value:"1"}),c(D,{key:"0",label:"禁用",value:"0"})])),_:1},8,["modelValue"])])),_:1}),c(S,{label:"交易限制",class:"center"},{default:y((()=>[c(I,{modelValue:i.awardData.ban,"onUpdate:modelValue":e[5]||(e[5]=a=>i.awardData.ban=a),placeholder:"请选择是否禁止交易",class:"handle-space"},{default:y((()=>[c(D,{key:"1",label:"允许交易",value:"1"}),c(D,{key:"0",label:"禁止交易",value:"0"})])),_:1},8,["modelValue"])])),_:1}),c(S,{label:"最低单价",class:"center"},{default:y((()=>[c(E,{class:"handle-space",placeholder:"请输入最低单价，默认不限",modelValue:i.awardData.minprice,"onUpdate:modelValue":e[6]||(e[6]=a=>i.awardData.minprice=a)},null,8,["modelValue"])])),_:1}),c(S,{label:"最高单价",class:"center"},{default:y((()=>[c(E,{class:"handle-space",placeholder:"请输入最高单价，默认不限",modelValue:i.awardData.maxprice,"onUpdate:modelValue":e[7]||(e[7]=a=>i.awardData.maxprice=a)},null,8,["modelValue"])])),_:1})],64)):w("",!0)])),_:1},8,["model"])])),_:1},8,["modelValue"])])}));D.render=I,D.__scopeId="data-v-28272efe";export default D;
