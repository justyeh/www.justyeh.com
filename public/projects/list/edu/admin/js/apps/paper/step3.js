var util={difficultyList:[{val:1,text:"\u7b80\u5355",coefficient:.3},{val:2,text:"\u4e2d\u7b49",coefficient:.6},{val:3,text:"\u8f83\u96be",coefficient:.8},{val:4,text:"\u56f0\u96be",coefficient:1}]};Vue.component("rangeBlock",{template:'\n        \x3cdiv class\x3d"range"\x3e\n\t\t\t\x3cdiv class\x3d"title"\x3e\n\t\t\t\t\x3cp\x3e\x3cb\x3e\u8303\u56f4{{index+1}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\t\x3cp\x3e\u79d1\u76ee-\u7ae0-\u8282\x3cb\x3e{{range.scs.subject}}-{{range.scs.chapter}}-{{range.scs.section || \'\u672a\u6307\u5b9a\'}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\t\x3cp\x3e\u96be\u5ea6\x3cb\x3e{{range.difficulty | difficultyFilter}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\t\x3cp\x3e\u5355\u9898\u5206\u503c\x3cb\x3e{{range.score}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\t\x3cp\x3e\u6570\u91cf\x3cb\x3e{{range.num}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\t\x3cp class\x3d"fr"\x3e\x3cb\x3e\u5907\u9009\u9898\u6570\u91cf\x3c/b\x3e\x3cb\x3e{{range.alternative}}\x3c/b\x3e\x3c/p\x3e\n\t\t\t\x3c/div\x3e\n\t\t\t\x3clist-table :option-list\x3d"range.optionList" @remove\x3d"handleRangeRemoved" @reselect\x3d"reselectRangeOption"\x3e\x3c/list-table\x3e\n\t\t\x3c/div\x3e',props:["range","index"],filters:{difficultyFilter:function(a){return util.difficultyList[a-1].text}},methods:{handleRangeRemoved:function(){0<this.range.alternative&&this.range.alternative--;this.range.optionList.length<this.range.num&&(this.range.num=this.range.optionList.length)},reselectRangeOption:function(a){var b=this,d={num:this.range.num,difficulty:this.range.difficulty,alternative:this.range.alternative,type_id:this.range.type_id,scs:{subject_id:this.range.scs.subject_id,chapter_id:this.range.scs.chapter_id,section_id:this.range.scs.section_id},reselect_id:this.range.optionList[a].id,optionList:this.range.optionList.map(function(a){return a.id})};$.get("?c\x3dpaper\x26m\x3drequestion",{range:d},function(c){200!=parseInt(c.error)?layer.msg(c.msg):(b.range.optionList.splice(a,1,c.data),layer.closeAll(),layer.msg("\u5df2\u91cd\u9009"))},"json")}}});Vue.component("listTable",{template:'\n        \x3ctable class\x3d"layui-table"\x3e\n\t\t\t\x3cthead\x3e\n\t\t\t\t\x3ctr\x3e\n\t\t\t\t\t\x3cth\x3e\x3c/th\x3e\n\t\t\t\t\t\x3cth\x3e\u64cd\u4f5c\x3c/th\x3e\n\t\t\t\t\t\x3cth width\x3d"30%"\x3e\u9898\u76ee\x3c/th\x3e\n\t\t\t\t\t\x3cth width\x3d"22%"\x3e\u79d1\u76ee-\u7ae0-\u8282\x3c/th\x3e\n\t\t\t\t\t\x3cth\x3e\u96be\u5ea6\x3c/th\x3e\n\t\t\t\t\t\x3cth\x3e\u8d44\u6e90ID\x3c/th\x3e\n\t\t\t\t\x3c/tr\x3e\n\t\t\t\x3c/thead\x3e\n\t\t\t\x3ctbody\x3e\n\t\t\t\t\x3ctr v-for\x3d"(item,index) in optionList"\x3e\n\t\t\t\t\t\x3ctd\x3e{{index+1}}\x3c/td\x3e\n\t\t\t\t\t\x3ctd\x3e\x3ca class\x3d"c-link" href\x3d"javascript:;" @click\x3d"showDetail(index)"\x3e\u67e5\u770b\x3c/a\x3e\x3c/td\x3e\n\t\t\t\t\t\x3ctd\x3e\n\t\t\t\t\t\t\x3cdiv class\x3d"txt-ellipsis"\x3e\n\t\t\t\t\t\t\t\x3cdiv class\x3d"content"\x3e{{item.question}}\x3c/div\x3e\n\t\t\t\t\t\t\x3c/div\x3e\n\t\t\t\t\t\x3c/td\x3e\n\t\t\t\t\t\x3ctd\x3e\n\t\t\t\t\t\t\x3cdiv class\x3d"txt-ellipsis"\x3e\n\t\t\t\t\t\t\t\x3cdiv class\x3d"content"\x3e{{item.scs.subject}}-{{item.scs.chapter}}-{{item.scs.section}}\x3c/div\x3e\n\t\t\t\t\t\t\x3c/div\x3e\n\t\t\t\t\t\x3c/td\x3e\n\t\t\t\t\t\x3ctd\x3e{{item.difficulty | difficultyFilter}}\x3c/td\x3e\n\t\t\t\t\t\x3ctd\x3e{{item.showId}}\x3c/td\x3e\n\t\t\t\t\x3c/tr\x3e\n\t\t\t\t\x3ctr v-if\x3d"optionList.length \x3d\x3d 0"\x3e\n\t\t\t\t\t\x3ctd colspan\x3d"6"\x3e\u8be5\u8303\u56f4\u4e0b\u65e0\u6570\u636e...\x3c/td\x3e\n\t\t\t\t\x3c/tr\x3e\n\t\t\t\x3c/tbody\x3e\n\t\t\x3c/table\x3e',props:["optionList"],filters:{difficultyFilter:function(a){return util.difficultyList[a-1].text}},methods:{showDetail:function(a){var b=this;layer.open({type:2,title:"\u8bd5\u9898\u8be6\u60c5\u5c55\u793a",area:["100%","100%"],maxmin:!1,btn:["\u91cd\u9009\u672c\u9898","\u79fb\u9664"],content:"?c\x3dpaper\x26m\x3dqdetail\x26id\x3d"+b.optionList[a].id,yes:function(){layer.confirm('\u672c\u64cd\u4f5c\u5c06\u91cd\u9009\u4e00\u9898\u66ff\u6362\u5f53\u524d\u8bd5\u9898\uff0c\u5e76\u5c06\u5176\u79fb\u5165\u672c\u8bd5\u5377\u7684\u2018\u6392\u9664\u533a\u2019\uff0c\u4e0d\u53ef\u6062\u590d\u3002\u786e\u8ba4\x3cspan class\x3d"lay-confirm-danger"\x3e\u91cd\u9009\x3c/span\x3e\u4e48\uff1f',{btn:["\u786e\u5b9a","\u53d6\u6d88"]},function(){b.reselectRange(a)})},btn2:function(){layer.confirm('\u672c\u64cd\u4f5c\u5c06\u79fb\u9664\u5f53\u524d\u8bd5\u9898\uff0c\u5e76\u5c06\u5176\u79fb\u5165\u672c\u8bd5\u5377\u7684\u2018\u6392\u9664\u533a\u2019\uff0c\u4e0d\u53ef\u6062\u590d\u3002\u786e\u8ba4\x3cspan class\x3d"lay-confirm-danger"\x3e\u79fb\u9664\x3c/span\x3e\u4e48\uff1f',{btn:["\u786e\u5b9a","\u53d6\u6d88"]},function(){b.removeRange(a)})}})},reselectRange:function(a){this.$emit("reselect",a)},removeRange:function(a){this.optionList.splice(a,1);this.$emit("remove",a);layer.closeAll();layer.msg("\u5df2\u79fb\u9664")}}});layui.use("layer",function(){new Vue({el:"#app",data:{questionTypeList:paperData.questionTypeList,showTypeIndex:0},mounted:function(){$("div.txt-ellipsis").append('\x3cdiv class\x3d"ellipsis-mark"\x3e...\x3c/div\x3e');bindEllipsisHtml()},filters:{execdifficulty:function(a){return.5>a?"\u7b80\u5355":.5<=a&&.7>a?"\u4e2d\u7b49":.7<=a&&.9>a?"\u8f83\u96be":"\u9ad8\u96be"}},computed:{prevClass:function(){return{"layui-btn":!0,"layui-btn-normal":!0,"layui-btn-disabled":0==this.showTypeIndex}},nextClass:function(){return{"layui-btn":!0,"layui-btn-normal":!0,"layui-btn-disabled":this.showTypeIndex>=this.questionTypeList.length-1}},statistic:function(){var a={rangeList:[],totalNum:0,totalScore:0,totalDifficulty:0,difficultyCoefficient:0};this.questionTypeList.forEach(function(b,d){var c=0,e=0,f=0;b.rangeList.forEach(function(b){c+=b.num;e+=b.score*b.num;f+=b.alternative;a.totalNum+=b.num+b.alternative;a.totalScore+=b.score*b.num;a.totalDifficulty+=10*util.difficultyList[b.difficulty-1].coefficient*b.score*b.num});a.rangeList.push({name:b.type,num:c,score:e,alternative:f})});a.difficultyCoefficient=a.totalDifficulty/(10*a.totalScore);return a}},methods:{showStatistic:function(){var a=this;layer.open({type:1,title:"\u7ec4\u5377\u4fe1\u606f\u7edf\u8ba1",area:["640px","422px"],maxmin:!1,btn:["\u786e\u8ba4\u63d0\u4ea4\u5ba1\u6838","\u53d6\u6d88"],content:$("#statisticTpl").html(),yes:function(b,d){var c=$(d).find("input").val();/^\+?[1-9][0-9]*$/.test(c)?(layer.closeAll(),a.subPaper(c)):layer.msg("\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65f6\u95f4",{icon:5,anim:6})}})},subPaper:function(a){a={questionTypeList:this.questionTypeList,paperTime:a};var b=document.getElementById("tempForm");b.paper.value=JSON.stringify(a);b.data.value=JSON.stringify(paperData.step1Data);b.statistic.value=JSON.stringify(this.statistic);b.submit()}}})});$("body").on("mouseover","div.txt-ellipsis",function(){var a=$(this).find(".content"),b={tips:[3,"#3595CC"],time:0,area:["400px"]};"none"==a.css("display")&&""!=a.text()?layer.tips(a.html(),$(this),b):40<a.height()&&layer.tips(a.html(),$(this),b)});$("body").on("mouseout","div.txt-ellipsis",function(){layer.closeAll("tips")});