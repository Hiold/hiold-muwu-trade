import{A as a,E as e,G as t,$ as i,L as l,r as o,o as s,c as r,f as n,k as d,g as m,t as c,l as h,F as u,i as f}from"./vendor.e2554b35.js";import{h as p}from"./moment.08a7f518.js";import{_ as D}from"./AawrdComponent.7d3777ad.js";const w={name:"ShopManage",components:{AawrdComponent:D},mounted(){this.ctx=a(),this.initTableData(),this.initIconData()},data:()=>({fid:"3",cid:"",isDisabled:!1,awardEditVisible:!1,awardAddVisible:!1,customData:0,md1:"md1",imglist:null,allIcon:[],queryData:null,awardInfo:null,allChanceCount:0,rules:{itemType:[{required:!0,trigger:"blur",message:"请选择物品类型"}]},formData:{id:"",type:"",desc:"",limit:"",one:"",ten:"",itemname:"",itemicon:"",itemtint:"",itemchinese:"",quality:""},awardData:{funcid:"1",id:"-1",type:"",containerid:"",count:"",itemname:"",itemquality:"",itemchinese:"",itemicon:"",itemtint:"",command:"",couDate:[p().format("YYYY-MM-DD HH:mm:ss"),p().add("7","days").format("YYYY-MM-DD HH:mm:ss")],couCurrType:"",couPrice:"",couCond:"",coudatelimit:"",couDateStart:"",couDateEnd:""},instance:!1,editor:"",ctx:{},addVisible:!1,itemNameCache:[],marks:{0:{style:{color:"#1989FA"},label:"无品质"},1:{style:{color:"rgb(157, 138, 106)"},label:"1品质"},2:{style:{color:"rgb(208, 129, 43)"},label:"2品质"},3:{style:{color:"rgb(163, 165, 28)"},label:"3品质"},4:{style:{color:"rgb(69, 195, 54)"},label:"4品质"},5:{style:{color:"rgb(51, 96, 207)"},label:"5品质"},6:{style:{color:"rgb(165, 44, 205)"},label:"6"}}}),methods:{HandleDesc(){var a={1:"累计击杀僵尸",2:"累计击杀动物",3:"给其他用户店铺点赞",4:"累计在线时长",5:"累计交易次数",6:"累计交易金额",7:"累计求购次数",8:"累计求购金额",9:"累计供货次数",10:"累计供货金额",11:"累计签到次数",12:"等级",13:"累计制作物品数量"};"4"==this.formData.ProgressionTType||"12"==this.formData.ProgressionTType||"13"==this.formData.ProgressionTType?(this.isDisabled=!0,this.formData.type="1"):this.isDisabled=!1;var e="";"1"==this.formData.ProgressionTType||"2"==this.formData.ProgressionTType?e="只":"3"==this.formData.ProgressionTType||"5"==this.formData.ProgressionTType||"7"==this.formData.ProgressionTType||"9"==this.formData.ProgressionTType||"11"==this.formData.ProgressionTType?e="次":"4"==this.formData.ProgressionTType&&(e="小时"),""!==this.formData.type&&""!==this.formData.ProgressionTType&&""!==this.formData.value&&("1"===this.formData.type?this.formData.desc="开服至今"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e:"2"===this.formData.type?this.formData.desc="今天"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e:"3"===this.formData.type&&(this.formData.desc="本周"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e))},querySearchAsync(a,t){if(a&&a.length>=1){let i={itemname:a,skip:"0",take:"100"};e.get("api/getSystemItemByPage",{params:i}).then((a=>{if("1"===a.data.respCode){let i=JSON.parse(a.data.data),l=[];for(var e=0;e<i.length;e++)null!=i[e].translate&&""!=i[e].translate?(l[e]={value:i[e].translate[16]},this.itemNameCache[i[e].translate[16]]=i[e]):(l[e]={value:i[e].itemname},this.itemNameCache[i[e].itemname]=i[e]);t(l)}}))}},handleSelectImage(a){this.awardData.itemicon=a},handleSelectImageLottery(a){this.formData.itemicon=a},handleAvatarSuccess(){t({message:"上传成功!",type:"success"}),this.initIconData()},handleAvatarFaild(){t.error("上传失败"),this.initIconData()},initIconData(){e.post("api/getIconFile",{itemname:""}).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.allIcon=e}}))},handleSelect(a){var e=this.ctx.appContext.config.globalProperties;console.log(this.itemNameCache[a.value]),"1"==this.awardData.type?(this.awardData.couCurrType="",this.awardData.itemchinese=a.value,this.awardData.itemname=this.itemNameCache[a.value].itemname,this.awardData.itemicon=(this.itemNameCache[a.value].icon?this.itemNameCache[a.value].icon.Value:this.itemNameCache[a.value].itemname)+".png",this.awardData.itemtint=null===this.itemNameCache[a.value].tint?"1|1|1|1":this.itemNameCache[a.value].tint,e.$LoadTintImage(i("#imgDesc")[0],this.awardData.itemicon,this.awardData.itemtint),i("#imgDesc").show()):this.awardData.couCurrType=a.value},handleSelectLottery(a){var e=this.ctx.appContext.config.globalProperties;console.log(this.itemNameCache[a.value]),"3"==this.formData.type&&(this.formData.itemchinese=a.value,this.formData.itemname=this.itemNameCache[a.value].itemname,this.formData.itemicon=(this.itemNameCache[a.value].icon?this.itemNameCache[a.value].icon.Value:this.itemNameCache[a.value].itemname)+".png",this.formData.itemtint=null===this.itemNameCache[a.value].tint?"1|1|1|1":this.itemNameCache[a.value].tint,e.$LoadTintImage(i(".imgDesc")[0],this.formData.itemicon,this.formData.itemtint),i(".imgDesc").show())},handleDelete(a){l.confirm("确定要删除这个抽奖吗？").then((i=>{if("confirm"===i){let i={id:a+""};e.post("api/deleteLottery",i).then((a=>{"1"===a.data.respCode?t({message:"删除成功!",type:"success"}):t.error("删除失败"),this.initTableData()}))}})).catch((()=>{}))},handleAddDelete(a){l.confirm("确定要删除这个商品吗？").then((i=>{if("confirm"===i){let i={id:a+""};e.post("api/deleteAwardInfo",i).then((a=>{"1"===a.data.respCode?t({message:"删除成功!",type:"success"}):t.error("删除失败");let i={containerid:this.awardData.containerid+"",funcid:"3"};e.post("api/getAwardInfo",i).then((a=>{if("1"===a.data.respCode){let t=a.data.data;for(var e in this.awardInfo=t,this.awardAddVisible=!1,this.awardInfo)this.allChanceCount+=1*this.awardInfo[e].chance;console.log(this.allChanceCount)}}))}))}})).catch((()=>{}))},initTableData(){e.post("api/getLottery",{itemname:""}).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.queryData=e}}))},submitForm(a){this.$refs[a].validate((a=>{if(!a)return!1;{let a="";a="-1"==this.formData.id?"api/postLottery":"api/updateLottery",this.formData.quality=this.formData.quality+"",e.post(a,this.formData).then((a=>{"1"===a.data.respCode?t({message:"保存成功!",type:"success"}):t.error("保存出错"),this.addVisible=!1,this.initTableData()}))}}))},submitAddForm(a){this.$refs[a].validate((a=>{if(!a)return!1;{let a="";a="-1"==this.awardData.id?"api/postAwardInfo":"api/updateAwardInfo",this.awardData.itemquality=this.awardData.itemquality+"",this.awardData.couDate&&2===this.awardData.couDate.length&&(this.awardData.couDateStart=this.awardData.couDate[0],this.awardData.couDateEnd=this.awardData.couDate[1],this.awardData.couDate=""),e.post(a,this.awardData).then((a=>{"1"===a.data.respCode?t({message:"保存成功!",type:"success"}):t.error("保存出错");let i={containerid:this.awardData.containerid+"",funcid:"3"};e.post("api/getAwardInfo",i).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.awardInfo=e,this.awardAddVisible=!1}}))}))}}))},openUpdate(a){this.addVisible=!0,this.formData.id=a.row.id+"",this.formData.desc=a.row.desc,this.formData.type=a.row.type+"",this.formData.itemname=a.row.itemname+"",this.formData.itemchinese=a.row.itemchinese+"",this.formData.itemicon=a.row.itemicon+"",this.formData.itemtint=a.row.itemtint+"",this.formData.quality=parseInt(a.row.quality),this.formData.one=a.row.one,this.formData.ten=a.row.ten,this.formData.limit=a.row.limit},openAddUpdate(a){this.awardAddVisible=!0,this.awardData.id=a.row.id+"",this.awardData.type=a.row.type+"",this.awardData.containerid=a.row.containerid+"",this.awardData.count=a.row.count+"",this.awardData.itemname=a.row.itemname+"",this.awardData.itemquality=a.row.itemquality+"",this.awardData.itemchinese=a.row.itemchinese+"",this.awardData.itemicon=a.row.itemicon+"",this.awardData.itemtint=a.row.itemtint+"",this.awardData.command=a.row.command+"",this.awardData.couCurrType=a.row.couCurrType+"",this.awardData.couPrice=a.row.couPrice+"",this.awardData.couCond=a.row.couCond+"",this.awardData.coudatelimit=a.row.coudatelimit+"",this.awardData.couDateStart=a.row.couDateStart+"",this.awardData.couDateEnd=a.row.couDateEnd+"",this.awardData.couDate=[this.awardData.couDateStart,this.awardData.couDateEnd]},openAwardEdit(a){this.$store.state.awardEditVisible=!0,this.cid=a.row.id},resetForm(a){this.$refs[a].resetFields()},discountchange(){this.formData.prefer=(parseInt(this.formData.price)*(this.formData.discount/10)).toFixed(2)+""},preferchange(){parseInt(this.formData.prefer)>parseInt(this.formData.price)&&(this.formData.price=this.formData.prefer,this.formData.discount=10),this.formData.discount=(parseInt(this.formData.prefer)/parseInt(this.formData.price)*10).toFixed(2)},catchs(a){},handleAdd(){this.formData.id="-1",this.addVisible=!0},handleAddAward(){null!=this.awardInfo&&this.awardInfo.length>=12?t.error("最多只能添加12个奖品"):(this.awardData.id="-1",this.awardAddVisible=!0)},loadCouCurr(a,e){e([{value:"积分折扣"},{value:"积分满减"},{value:"钻石折扣"},{value:"钻石满减"}])}}},y={class:"crumbs"},g=n("i",{class:"el-icon-lx-cascades"},null,-1),b=m(" 基础表格 "),C={class:"container"},v={class:"handle-box"},V=m("添加"),T={key:0},I={key:1},_=m("编辑抽奖 "),k=m("编辑奖品 "),A=m("删除 "),S={class:"infinite-list",style:{"overflow-x":"scroll"}},x=m("添加新图片"),P=n("img",{class:"imgDesc",style:{display:"none"}},null,-1),q=n("br",null,null,-1),N={class:"dialog-footer"},E=m("确 定"),F=m("取 消"),L=m("重 置");w.render=function(a,e,t,i,l,p){const D=o("el-breadcrumb-item"),w=o("el-breadcrumb"),U=o("el-button"),Y=o("el-table-column"),$=o("el-table"),H=o("el-input"),M=o("el-form-item"),j=o("el-option"),z=o("el-select"),B=o("el-autocomplete"),G=o("el-tag"),J=o("el-upload"),O=o("el-image"),K=o("el-slider"),Q=o("el-form"),R=o("el-dialog"),W=o("AawrdComponent");return s(),r("div",null,[n("div",y,[n(w,{separator:"/"},{default:d((()=>[n(D,null,{default:d((()=>[g,b])),_:1})])),_:1})]),n("div",C,[n("div",v,[n(U,{type:"success",icon:"el-icon-plus",onClick:p.handleAdd},{default:d((()=>[V])),_:1},8,["onClick"])]),n($,{border:"",class:"table",ref:"multipleTable","header-cell-class-name":"table-header",data:l.queryData},{default:d((()=>[n(Y,{prop:"id",label:"ID",width:"55",align:"center"}),n(Y,{label:"红包名称"},{default:d((a=>[m(c(a.row.desc),1)])),_:1}),n(Y,{label:"每日限制"},{default:d((a=>[m(c("-1"==a.row.limit?"无限":a.row.limit),1)])),_:1}),n(Y,{label:"抽奖消耗"},{default:d((e=>["1"==e.row.type?(s(),r("span",T,"积分")):h("",!0),"2"==e.row.type?(s(),r("span",I,"点券")):h("",!0),"3"==e.row.type?(s(),r("img",{key:2,src:"404",style:{width:"30px",height:"30px"},alt:e.row.itemchinese,title:e.row.itemchinese,onError:t=>a.$LoadTintImage(t.target,e.row.itemicon,e.row.itemtint)},null,40,["alt","title","onError"])):h("",!0),"4"==e.row.type?(s(),r("img",{key:3,src:"404",style:{width:"30px",height:"30px"},alt:e.row.itemchinese,title:e.row.itemchinese,onError:t=>a.$LoadTintImage(t.target,e.row.itemicon,e.row.itemtint)},null,40,["alt","title","onError"])):h("",!0)])),_:1}),n(Y,{label:"单次抽奖消耗"},{default:d((a=>[m(c(a.row.one),1)])),_:1}),n(Y,{label:"十连抽奖消耗"},{default:d((a=>[m(c(a.row.ten),1)])),_:1}),n(Y,{label:"操作",width:"350",align:"center"},{default:d((a=>[n(U,{type:"primary",icon:"el-icon-edit",size:"small",onClick:e=>p.openUpdate(a)},{default:d((()=>[_])),_:2},1032,["onClick"]),n(U,{type:"success",icon:"el-icon-edit",size:"small",onClick:e=>p.openAwardEdit(a)},{default:d((()=>[k])),_:2},1032,["onClick"]),n(U,{type:"delete",icon:"el-icon-delete",size:"small",class:"red",onClick:e=>p.handleDelete(a.row.id)},{default:d((()=>[A])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),n(R,{title:"新增",modelValue:l.addVisible,"onUpdate:modelValue":e[17]||(e[17]=a=>l.addVisible=a),width:"40%","append-to-body":!0},{footer:d((()=>[n("span",N,[n(U,{type:"primary",onClick:e[14]||(e[14]=a=>p.submitForm("formData"))},{default:d((()=>[E])),_:1}),n(U,{onClick:e[15]||(e[15]=a=>l.addVisible=!1)},{default:d((()=>[F])),_:1}),n(U,{onClick:e[16]||(e[16]=a=>p.resetForm("formData"))},{default:d((()=>[L])),_:1})])])),default:d((()=>[n(Q,{rules:l.rules,ref:"formData",model:l.formData},{default:d((()=>[n(M,{label:"奖池名称",class:"center"},{default:d((()=>[n(H,{class:"handle-space",placeholder:"请输入任务描述",modelValue:l.formData.desc,"onUpdate:modelValue":e[1]||(e[1]=a=>l.formData.desc=a)},null,8,["modelValue"])])),_:1}),n(M,{label:"抽奖消耗",class:"center"},{default:d((()=>[n(z,{modelValue:l.formData.type,"onUpdate:modelValue":e[2]||(e[2]=a=>l.formData.type=a),placeholder:"请选择抽奖消耗",class:"handle-space"},{default:d((()=>[n(j,{key:"1",label:"积分",value:"1"}),n(j,{key:"2",label:"点券",value:"2"}),n(j,{key:"3",label:"游戏内物品",value:"3"}),n(j,{key:"4",label:"特殊物品",value:"4"})])),_:1},8,["modelValue"])])),_:1}),"4"==l.formData.type?(s(),r(u,{key:0},[n(M,{label:"物品名称",class:"center"},{default:d((()=>[n(B,{style:{width:"70%"},modelValue:l.formData.itemname,"onUpdate:modelValue":e[3]||(e[3]=a=>l.formData.itemname=a),"fetch-suggestions":p.loadCouCurr,placeholder:"请选择系统预置特殊物品，或者输入自定义物品",onSelect:p.handleSelectLottery,onInput:e[4]||(e[4]=a=>{l.formData.itemchinese=a,l.formData.itemname=a})},null,8,["modelValue","fetch-suggestions","onSelect"])])),_:1}),n(M,{class:"center"},{default:d((()=>[n("ul",S,[n(J,{action:"api/uploadFile",multiple:"","on-success":p.handleAvatarSuccess,"on-error":p.handleAvatarFaild,style:{float:"left",width:"100px",height:"100px"}},{default:d((()=>[n(G,{style:{"margin-top":"35px"}},{default:d((()=>[x])),_:1})])),_:1},8,["on-success","on-error"]),(s(!0),r(u,null,f(l.allIcon,(a=>(s(),r("li",{key:a,class:"infinite-list-item",ref:l.imglist},[n(O,{class:{selected:a===l.formData.itemicon},style:{width:"100px",height:"100px",cursor:"pointer"},src:"api/image/"+a,onClick:e=>p.handleSelectImageLottery(a)},null,8,["class","src","onClick"])],512)))),128))])])),_:1})],64)):h("",!0),"3"==l.formData.type?(s(),r(u,{key:1},[n(M,{label:"物品名称",class:"center"},{default:d((()=>[n(B,{style:{width:"70%"},minlength:2,modelValue:l.formData.itemchinese,"onUpdate:modelValue":e[5]||(e[5]=a=>l.formData.itemchinese=a),"fetch-suggestions":p.querySearchAsync,placeholder:"请输入内容",onSelect:p.handleSelectLottery},null,8,["modelValue","fetch-suggestions","onSelect"])])),_:1}),n(M,{label:"系统名称",class:"center"},{default:d((()=>[n(H,{style:{width:"70%"},minlength:2,modelValue:l.formData.itemname,"onUpdate:modelValue":e[6]||(e[6]=a=>l.formData.itemname=a),placeholder:"请输入内容"},null,8,["modelValue"])])),_:1}),n(M,{class:"center"},{default:d((()=>[P])),_:1}),n(M,{label:"品质",class:"center"},{default:d((()=>[n(K,{modelValue:l.formData.quality,"onUpdate:modelValue":e[7]||(e[7]=a=>l.formData.quality=a),"show-tooltip":!0,step:1,max:6,"show-stops":"","show-input":"",marks:l.marks},null,8,["modelValue","marks"])])),_:1}),q],64)):h("",!0),n(M,{label:"每日限制",class:"center"},{default:d((()=>[n(H,{class:"handle-space",placeholder:"请输入限制数量-1为无限",modelValue:l.formData.limit,"onUpdate:modelValue":e[8]||(e[8]=a=>l.formData.limit=a),onInput:e[9]||(e[9]=()=>{})},null,8,["modelValue"])])),_:1}),n(M,{label:"单抽消耗",class:"center"},{default:d((()=>[n(H,{class:"handle-space",placeholder:"请输入单抽消耗",modelValue:l.formData.one,"onUpdate:modelValue":e[10]||(e[10]=a=>l.formData.one=a),onInput:e[11]||(e[11]=()=>{})},null,8,["modelValue"])])),_:1}),n(M,{label:"十连消耗",class:"center"},{default:d((()=>[n(H,{class:"handle-space",placeholder:"请输入十连消耗",modelValue:l.formData.ten,"onUpdate:modelValue":e[12]||(e[12]=a=>l.formData.ten=a),onInput:e[13]||(e[13]=()=>{})},null,8,["modelValue"])])),_:1})])),_:1},8,["rules","model"])])),_:1},8,["modelValue"]),n(W,{fid:l.fid,cid:l.cid},null,8,["fid","cid"])])};export default w;
