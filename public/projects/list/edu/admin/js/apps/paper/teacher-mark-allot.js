var resultData=[{id:1,name:"\u90ce\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",allot:11,num:1},{id:2,name:"\u5f20\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",allot:10,num:10},{id:3,name:"\u738b\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",allot:10,num:20},{id:3,name:"\u8d75\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",allot:10,num:50}],teacherList=[{id:1,name:"\u90ce\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:1},{id:2,name:"\u5f20\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:10},{id:3,name:"\u738b\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:20},{id:3,name:"\u8d75\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:50},{id:3,name:"\u674e\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:60},{id:3,name:"\u674e\u8001\u5e08",job:"\u4e3b\u8bb2",course:"Java",num:60}];$(".dialog").removeClass("hide");var app=new Vue({el:"#app",data:{teacherDialog:!1,inputName:"",filterName:"",selected:null,countDialog:!1,paper:{num:50,resultData:resultData},teacherList:[]},computed:{filterTeacher:function(){var b=this,a=this.teacherList;this.filterName&&(a=a.filter(function(a){return-1<a.name.indexOf(b.filterName)}));return a},reseAllot:function(){var b=0;this.paper.resultData.forEach(function(a){b+=a.allot});return this.paper.num-b}},methods:{showTeacherDialog:function(){this.teacherList=teacherList;this.teacherDialog=!0},search:function(){this.filterName=this.inputName},handleAllot:function(){var b=this.filterTeacher[this.selected];this.paper.resultData.push({id:b.id,name:b.name,job:b.job,course:b.course,allot:0,num:b.num});this.teacherDialog=!1},removeMarkTeacher:function(b){this.paper.resultData.splice(b,1)},updateNum:function(b,a){a=parseInt(a);var c=this.paper.resultData[b];c.allot=0<a?a>this.reseAllot?c.allot+this.reseAllot:c.allot+a:0<=c.allot+a?c.allot+a:0},subAllot:function(){alert("\u63d0\u4ea4\u8003\u5377")}}});