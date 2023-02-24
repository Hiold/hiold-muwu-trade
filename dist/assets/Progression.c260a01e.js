import{A as a,C as e,G as t,$ as i,L as s,r,o,c as l,f as d,k as n,g as m,t as c}from"./vendor.131327e9.js";import{h}from"./moment.08a7f518.js";import{_ as u}from"./AawrdComponent.f3332179.js";const D={name:"ShopManage",components:{AawrdComponent:u},mounted(){this.ctx=a(),this.initTableData()},data:()=>({fid:"2",cid:"",isDisabled:!1,awardEditVisible:!1,awardAddVisible:!1,customData:0,md1:"md1",imglist:null,allIcon:[],queryData:null,awardInfo:null,rules:{itemType:[{required:!0,trigger:"blur",message:"请选择物品类型"}]},formData:{id:"",type:"",ProgressionTType:"",key:"",value:"",desc:""},awardData:{funcid:"1",id:"-1",type:"",containerid:"",count:"",itemname:"",itemquality:"",itemchinese:"",itemicon:"",itemtint:"",command:"",couDate:[h().format("YYYY-MM-DD HH:mm:ss"),h().add("7","days").format("YYYY-MM-DD HH:mm:ss")],couCurrType:"",couPrice:"",couCond:"",coudatelimit:"",couDateStart:"",couDateEnd:""},instance:!1,editor:"",ctx:{},addVisible:!1,itemNameCache:[],marks:{0:{style:{color:"#1989FA"},label:"无品质"},1:{style:{color:"rgb(157, 138, 106)"},label:"1品质"},2:{style:{color:"rgb(208, 129, 43)"},label:"2品质"},3:{style:{color:"rgb(163, 165, 28)"},label:"3品质"},4:{style:{color:"rgb(69, 195, 54)"},label:"4品质"},5:{style:{color:"rgb(51, 96, 207)"},label:"5品质"},6:{style:{color:"rgb(165, 44, 205)"},label:"6"}}}),methods:{HandleDesc(){var a={1:"累计击杀僵尸",2:"累计击杀动物",3:"给其他用户店铺点赞",4:"累计在线时长",5:"累计交易次数",6:"累计交易金额",7:"累计求购次数",8:"累计求购金额",9:"累计供货次数",10:"累计供货金额",11:"累计签到次数",12:"等级",13:"累计制作物品数量"};"4"==this.formData.ProgressionTType||"12"==this.formData.ProgressionTType||"13"==this.formData.ProgressionTType?(this.isDisabled=!0,this.formData.type="1"):this.isDisabled=!1;var e="";"1"==this.formData.ProgressionTType||"2"==this.formData.ProgressionTType?e="只":"3"==this.formData.ProgressionTType||"5"==this.formData.ProgressionTType||"7"==this.formData.ProgressionTType||"9"==this.formData.ProgressionTType||"11"==this.formData.ProgressionTType?e="次":"4"==this.formData.ProgressionTType&&(e="小时"),""!==this.formData.type&&""!==this.formData.ProgressionTType&&""!==this.formData.value&&("1"===this.formData.type?this.formData.desc="开服至今"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e:"2"===this.formData.type?this.formData.desc="今天"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e:"3"===this.formData.type&&(this.formData.desc="本周"+a[1*this.formData.ProgressionTType]+"达到"+this.formData.value+e))},querySearchAsync(a,t){if(a&&a.length>=1){let i={itemname:a,skip:"0",take:"100"};e.get("api/getSystemItemByPage",{params:i}).then((a=>{if("1"===a.data.respCode){let i=JSON.parse(a.data.data),s=[];for(var e=0;e<i.length;e++)null!=i[e].translate&&""!=i[e].translate?(s[e]={value:i[e].translate[16]},this.itemNameCache[i[e].translate[16]]=i[e]):(s[e]={value:i[e].itemname},this.itemNameCache[i[e].itemname]=i[e]);t(s)}}))}},handleSelectImage(a){this.awardData.itemicon=a},handleAvatarSuccess(){t({message:"上传成功!",type:"success"}),this.initIconData()},handleAvatarFaild(){t.error("上传失败"),this.initIconData()},initIconData(){e.post("api/getIconFile",{itemname:""}).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.allIcon=e}}))},handleSelect(a){this.ctx.appContext.config.globalProperties,console.log(this.itemNameCache[a.value]),"1"==this.awardData.type?(this.awardData.couCurrType="",this.awardData.itemchinese=a.value,this.awardData.itemname=this.itemNameCache[a.value].itemname,this.awardData.itemicon=(this.itemNameCache[a.value].icon?this.itemNameCache[a.value].icon.Value:this.itemNameCache[a.value].itemname)+".png",this.awardData.itemtint=null===this.itemNameCache[a.value].tint?"1|1|1|1":this.itemNameCache[a.value].tint,i("#imgDesc").attr("src","/api/getimagetint/"+this.awardData.itemname),i("#imgDesc").show()):this.awardData.couCurrType=a.value},handleDelete(a){s.confirm("确定要删除这个商品吗？").then((i=>{if("confirm"===i){let i={id:a+""};e.post("api/deleteProgression",i).then((a=>{"1"===a.data.respCode?t({message:"删除成功!",type:"success"}):t.error("删除失败"),this.initTableData()}))}})).catch((()=>{}))},handleAddDelete(a){s.confirm("确定要删除这个商品吗？").then((i=>{if("confirm"===i){let i={id:a+""};e.post("api/deleteAwardInfo",i).then((a=>{"1"===a.data.respCode?t({message:"删除成功!",type:"success"}):t.error("删除失败");let i={containerid:this.awardData.containerid+"",funcid:"2"};e.post("api/getAwardInfo",i).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.awardInfo=e,this.awardAddVisible=!1}}))}))}})).catch((()=>{}))},initTableData(){e.post("api/getProgression",{itemname:""}).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.queryData=e}}))},submitForm(a){this.$refs[a].validate((a=>{if(!a)return!1;{let a="";a="-1"==this.formData.id?"api/postProgression":"api/updateProgression",e.post(a,this.formData).then((a=>{"1"===a.data.respCode?t({message:"保存成功!",type:"success"}):t.error("保存出错"),this.addVisible=!1,this.initTableData()}))}}))},submitAddForm(a){this.$refs[a].validate((a=>{if(!a)return!1;{let a="";a="-1"==this.awardData.id?"api/postAwardInfo":"api/updateAwardInfo",this.awardData.itemquality=this.awardData.itemquality+"",this.awardData.couDate&&2===this.awardData.couDate.length&&(this.awardData.couDateStart=this.awardData.couDate[0],this.awardData.couDateEnd=this.awardData.couDate[1],this.awardData.couDate=""),e.post(a,this.awardData).then((a=>{"1"===a.data.respCode?t({message:"保存成功!",type:"success"}):t.error("保存出错");let i={containerid:this.awardData.containerid+"",funcid:"1"};e.post("api/getAwardInfo",i).then((a=>{if("1"===a.data.respCode){let e=a.data.data;this.awardInfo=e,this.awardAddVisible=!1}}))}))}}))},openUpdate(a){this.addVisible=!0,this.formData.id=a.row.id+"",this.formData.desc=a.row.desc,this.formData.type=a.row.type+"",this.formData.value=a.row.value+"",this.formData.ProgressionTType=a.row.progressionType+"","4"==this.formData.ProgressionTType||"12"==this.formData.ProgressionTType||"13"==this.formData.ProgressionTType?(this.isDisabled=!0,this.formData.type="1"):this.isDisabled=!1},openAddUpdate(a){this.awardAddVisible=!0,this.awardData.id=a.row.id+"",this.awardData.type=a.row.type+"",this.awardData.containerid=a.row.containerid+"",this.awardData.count=a.row.count+"",this.awardData.itemname=a.row.itemname+"",this.awardData.itemquality=a.row.itemquality+"",this.awardData.itemchinese=a.row.itemchinese+"",this.awardData.itemicon=a.row.itemicon+"",this.awardData.itemtint=a.row.itemtint+"",this.awardData.command=a.row.command+"",this.awardData.couCurrType=a.row.couCurrType+"",this.awardData.couPrice=a.row.couPrice+"",this.awardData.couCond=a.row.couCond+"",this.awardData.coudatelimit=a.row.coudatelimit+"",this.awardData.couDateStart=a.row.couDateStart+"",this.awardData.couDateEnd=a.row.couDateEnd+"",this.awardData.couDate=[this.awardData.couDateStart,this.awardData.couDateEnd]},openAwardEdit(a){this.$store.state.awardEditVisible=!0,this.cid=a.row.id},resetForm(a){this.$refs[a].resetFields()},discountchange(){this.formData.prefer=(parseInt(this.formData.price)*(this.formData.discount/10)).toFixed(2)+""},preferchange(){parseInt(this.formData.prefer)>parseInt(this.formData.price)&&(this.formData.price=this.formData.prefer,this.formData.discount=10),this.formData.discount=(parseInt(this.formData.prefer)/parseInt(this.formData.price)*10).toFixed(2)},catchs(a){},handleAdd(){this.formData.id="-1",this.addVisible=!0},handleAddAward(){this.awardData.id="-1",this.awardAddVisible=!0},loadCouCurr(a,e){e([{value:"积分折扣"},{value:"积分满减"},{value:"钻石折扣"},{value:"钻石满减"}])}}},p={class:"crumbs"},f=d("i",{class:"el-icon-lx-cascades"},null,-1),y=m(" 基础表格 "),w={class:"container"},b={class:"handle-box"},g=m("添加"),T=m("编辑任务 "),v=m("编辑奖品 "),C=m("删除 "),k={class:"dialog-footer"},P=m("确 定"),V=m("取 消"),A=m("重 置");D.render=function(a,e,t,i,s,h){const u=r("el-breadcrumb-item"),D=r("el-breadcrumb"),I=r("el-button"),_=r("el-table-column"),S=r("el-table"),F=r("el-option"),N=r("el-select"),q=r("el-form-item"),x=r("el-input"),E=r("el-form"),H=r("el-dialog"),U=r("AawrdComponent");return o(),l("div",null,[d("div",p,[d(D,{separator:"/"},{default:n((()=>[d(u,null,{default:n((()=>[f,y])),_:1})])),_:1})]),d("div",w,[d("div",b,[d(I,{type:"success",icon:"el-icon-plus",onClick:h.handleAdd},{default:n((()=>[g])),_:1},8,["onClick"])]),d(S,{border:"",class:"table",ref:"multipleTable","header-cell-class-name":"table-header",data:s.queryData},{default:n((()=>[d(_,{prop:"id",label:"ID",width:"55",align:"center"}),d(_,{label:"红包名称"},{default:n((a=>[m(c(a.row.desc),1)])),_:1}),d(_,{label:"操作",width:"350",align:"center"},{default:n((a=>[d(I,{type:"primary",icon:"el-icon-edit",size:"small",onClick:e=>h.openUpdate(a)},{default:n((()=>[T])),_:2},1032,["onClick"]),d(I,{type:"success",icon:"el-icon-edit",size:"small",onClick:e=>h.openAwardEdit(a)},{default:n((()=>[v])),_:2},1032,["onClick"]),d(I,{type:"delete",icon:"el-icon-delete",size:"small",class:"red",onClick:e=>h.handleDelete(a.row.id)},{default:n((()=>[C])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),d(H,{title:"新增",modelValue:s.addVisible,"onUpdate:modelValue":e[11]||(e[11]=a=>s.addVisible=a),width:"40%","append-to-body":!0},{footer:n((()=>[d("span",k,[d(I,{type:"primary",onClick:e[8]||(e[8]=a=>h.submitForm("formData"))},{default:n((()=>[P])),_:1}),d(I,{onClick:e[9]||(e[9]=a=>s.addVisible=!1)},{default:n((()=>[V])),_:1}),d(I,{onClick:e[10]||(e[10]=a=>h.resetForm("formData"))},{default:n((()=>[A])),_:1})])])),default:n((()=>[d(E,{rules:s.rules,ref:"formData",model:s.formData},{default:n((()=>[d(q,{label:"活动任务",class:"center"},{default:n((()=>[d(N,{modelValue:s.formData.ProgressionTType,"onUpdate:modelValue":e[1]||(e[1]=a=>s.formData.ProgressionTType=a),placeholder:"活动任务",class:"handle-space",onChange:e[2]||(e[2]=a=>h.HandleDesc())},{default:n((()=>[d(F,{key:"1",label:"累计击杀僵尸",value:"1"}),d(F,{key:"2",label:"累计击杀动物",value:"2"}),d(F,{key:"3",label:"给其他用户店铺点赞",value:"3"}),d(F,{key:"4",label:"累计在线时长",value:"4"}),d(F,{key:"5",label:"累计交易次数",value:"5"}),d(F,{key:"6",label:"累计交易金额",value:"6"}),d(F,{key:"7",label:"累计求购次数",value:"7"}),d(F,{key:"8",label:"累计求购金额",value:"8"}),d(F,{key:"9",label:"累计供货次数",value:"9"}),d(F,{key:"10",label:"累计供货金额",value:"10"}),d(F,{key:"11",label:"累计签到次数",value:"11"}),d(F,{key:"12",label:"等级",value:"12"}),d(F,{key:"13",label:"累计制作物品数量",value:"13"})])),_:1},8,["modelValue"])])),_:1}),d(q,{label:"任务类型",class:"center"},{default:n((()=>[d(N,{modelValue:s.formData.type,"onUpdate:modelValue":e[3]||(e[3]=a=>s.formData.type=a),placeholder:"任务类型",class:"handle-space",onChange:e[4]||(e[4]=a=>h.HandleDesc()),disabled:s.isDisabled},{default:n((()=>[d(F,{key:"1",label:"主线任务",value:"1"}),d(F,{key:"2",label:"每日任务",value:"2"}),d(F,{key:"3",label:"每周任务",value:"3"})])),_:1},8,["modelValue","disabled"])])),_:1}),d(q,{label:"任务阈值",class:"center"},{default:n((()=>[d(x,{class:"handle-space",placeholder:"请输入完成任务的数值",modelValue:s.formData.value,"onUpdate:modelValue":e[5]||(e[5]=a=>s.formData.value=a),onInput:e[6]||(e[6]=a=>h.HandleDesc())},null,8,["modelValue"])])),_:1}),d(q,{label:"任务描述",class:"center"},{default:n((()=>[d(x,{class:"handle-space",placeholder:"请输入任务描述",modelValue:s.formData.desc,"onUpdate:modelValue":e[7]||(e[7]=a=>s.formData.desc=a)},null,8,["modelValue"])])),_:1})])),_:1},8,["rules","model"])])),_:1},8,["modelValue"]),d(U,{fid:s.fid,cid:s.cid},null,8,["fid","cid"])])};export default D;
