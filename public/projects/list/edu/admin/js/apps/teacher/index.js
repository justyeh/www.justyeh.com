layui.use("form",function(){var a=layui.form();a.verify({head:function(a,c){if(!$(c).parent().hasClass("fine"))return"\u8bf7\u4e0a\u4f20\u5934\u50cf"},name:[/^[\u4e00-\u9fa5]{2,7}$/,"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u59d3\u540d"],age:function(a){if(!/^[1-9][0-9]{0,2}$/.test(a)||100<a)return"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u5e74\u9f84"},id_card:function(a){var c;if(15==a.length)c=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;else if(18==a.length)c=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;else return"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u8eab\u4efd\u8bc1\u53f7";if(!c.test(a))return"\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u8eab\u4efd\u8bc1\u53f7"}});var b=!1;a.on("submit(personForm)",function(a){layer.confirm("\u786e\u8ba4\u63d0\u4ea4\u5417\uff1f",{btn:["\u786e\u5b9a","\u53d6\u6d88"]},function(){b=!0;a.form.submit()});return b})});function confirmCancle(){layer.confirm("\u786e\u5b9a\u53d6\u6d88\u5417\uff1f",{btn:["\u786e\u5b9a","\u53d6\u6d88"]},function(){window.location.href="?c\x3dauthor\x26m\x3dlist"})}function fileInputChange(a){var b=a.files[0];if(!/image\/\w+/.test(b.type))return layer.msg("\u4ec5\u652f\u6301jpg,png,bmp,jpeg,png\u683c\u5f0f\u7684\u56fe\u7247\u6587\u4ef6",{icon:5,anim:6}),!1;var d=$(a).parent();if(5242880<b.size)return layer.msg("\u56fe\u7247\u7684\u5927\u5c0f\u9650\u5236\u4e3a5M",{icon:5,anim:6}),a.outerHTML?a.outerHTML=a.outerHTML:a.value="",d.removeClass("fine"),!1;a=new FileReader;a.readAsDataURL(b);a.onload=function(a){d.css("background-image","url("+a.target.result+")").addClass("fine")}};