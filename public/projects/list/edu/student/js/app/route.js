require.config({urlArgs:"v\x3d"+(new Date).getTime(),paths:{jquery:"../libs/jquery-1.9.1.min",common:"../libs/common",tree:"../libs/jquery.tree",perfectScrollbarJQuery:"../libs/perfect-scrollbar/perfect-scrollbar.jquery",perfectScrollbar:"../libs/perfect-scrollbar/perfect-scrollbar"},shim:{tree:["jquery"]}});require(["jquery","common","tree","perfectScrollbarJQuery"],function(a,d){var e=a(".return-top"),f=a(".course-list"),b=a(".inner-list .course"),c=b.width()+parseInt(b.css("margin-left")),b=b.length*c;a(".inner-list").width(b);b=null;b=0;b=d.getQueryStr("eid")?a(".inner-list .course[data-eid\x3d'"+d.getQueryStr("eid")+"']"):a(".inner-list .course.act");b.addClass("up");var b=b.index(),g=f.width()/2,c=b*c+c/2-g;a(".course-list").scrollLeft(c);f.perfectScrollbar({suppressScrollY:!0});a(".tabs .menu a").click(function(){a(this).addClass("act").siblings().removeClass("act");a(".tabs #"+a(this).data("show")).fadeIn().siblings().hide()});a(".course-box .drop").click(function(){var b=a(this);f.fadeToggle(function(){b.toggleClass("down")})});c=function(){1200>a(window).width()?e.css("right","0"):e.css("right",(a(window).width()-1200)/2-50+"px")};c();window.onresize=d.throttle(c,20,50);e.click(d.returnTop);a(".tree").tree();a(".tree .study-this\x3ediv").prepend('\x3ci class\x3d"icon study-this"\x3e\x3c/i\x3e')});