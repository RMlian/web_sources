﻿/*全局变量*/
var tagNum=0;
var tagSpeed=400;
var tagWidth=0;
var tagNowNum=0;//切换按钮下一步开始计算

/*初始化*/
$(function(){			
	var speed=100;//全局动画变量

	$(document).attr("title",$(".main_title h1 abbr").html()+" - "+$(document).attr("title"));

	//菜单调用函数
	var $nav=$("#nav span");
	$nav.each(function() {
		$(this).bind("click",function(){
			$("#nav span em").remove();
			$("#nav li.show").removeClass("show");				
		 	$(this).parent("li").addClass("show").children("div").slideDown();
		}); 
	});
	
	//注释
	var nowMenuTitle=$(".main_title h1 abbr").attr("data-m");
	var nowMenuList=$(".main_title h1 abbr").attr("data-l");  
	menuLoc(nowMenuTitle,nowMenuList);	 

	//标的管理-详情tab效果
	var $infotag=$("#infoTag .tag .nav_tab");
	tagWidth=$infotag.innerWidth();
	tagNum=$infotag.length-1;//获取标签长度
	var line="<abbr></abbr>";	
	$("#infoTag .tag").append(line);
	$("#infoTag abbr").css("width",tagWidth+"px");
		$infotag.each(function() {
			$(this).bind("click",function(){
				tagNowNum=$(this).index();
				tag(tagNowNum);
			}); 
		});
	//标签页切换方法
	function tag(a){
 		tagemove(a);
		$("#infoTag ul li:eq("+a+")").addClass("now").siblings().removeClass();
	}
 	function tagemove(a){
		a=a*tagWidth;
		$("#infoTag abbr").css("width","0px");
		$("#infoTag abbr").animate({left:a+"px",width:tagWidth+"px"},tagSpeed,function(){
			return false ;
		});
	}

	//标签页下一步
	$(".nextTag").each(function() {
		$(this).bind("click",function(){
			tagNowNum++;
			if(tagNowNum>tagNum){
				tagNowNum=tagNum;
			}
			tag(tagNowNum);
		}); 
	});

	//标签页上一步
	$(".prevTag").each(function() {
		$(this).bind("click",function(){
			tagNowNum--;
			if(tagNowNum<0){
				tagNowNum=0;
			}
			tag(tagNowNum);
		}); 
	});

	/*新建按钮菜单lgh*/
	$('.addHover').mousemove(function(){
			    $(this).css('background-color','#333');
				$(this).parent().children('.n_droplist').slideDown();
				   })
		$('.n_droplist').mouseleave(function(){
				$('.addHover').css('background-color','#3D464B');
				$(this).slideUp("fast");
	});

	/*表单--提示语--失去焦点事件*/
	var $input=$("input.form_input");
	$input.each(function() {
		var tsMsg=$(this).val();
		$(this).attr("inSet",0);
		$(this).bind("focus",function(){
			if($(this).attr("inSet")==0){
				$(this).val("");
				$(this).css("color","#999");
			}
		});
	 $(this).bind("blur",function(){
				if($(this).val()==""){
					$(this).val(tsMsg);
					$(this).css("color","#999");
					$(this).attr("inSet",0);
				}else{
					$(this).css("color","#333");
					$(this).attr("inSet",1);	
				}
			});
	 });

 	/*表单--文本域提示语--失去焦点事件*/
	var $textarea=$(".area_foucs");
	$textarea.each(function() {
		var tsMsg=$(this).val();
		$(this).attr("inSet",0);
		$(this).bind("focus",function(){
			if($(this).attr("inSet")==0){
				$(this).val("");
				$(this).css("color","#999");
			}
		});
	 	$(this).bind("blur",function(){
				if($(this).val()==""){
					$(this).val(tsMsg);
					$(this).css("color","#999");
					$(this).attr("inSet",0);
				}else{
					$(this).css("color","#333");
					$(this).attr("inSet",1);	
				}
			});
  	});

	//划过效果guihua_liu	调用
	skateOver(".u_icon",".u_droplist");
	skateOver(".templates",".m_droplist");			
			
	//表格头部自定义标签guihua_liu
	$('.t_icon').toggle(function(){
			$('.t_droplist').show();
		},function(){
			$('.t_droplist').hide();
	})
	
	//导航交割业务链接---lgh
	$('.delivery_link').click(function(){
		window.location.href='/delivery/list.shtml';
	})
	
	//导航交易业务链接---ms
	$('.link_trade').click(function(){
		window.location.href='/transaction/list.shtml';
	})
	
	
	//导航流程管理链接---ms
	$('.process_manage').click(function(){
		window.location.href='/process/list.shtml';
	})
	
	
})//初始化结束



/*高级搜索--应用*/
function showToolsBox(a){
	var boxName=a.attr("data-fun");
	$(".tools_box ul li").hide();
	$(".tools_box ul li."+boxName).slideDown();
}

/*下拉搜索隐藏guihua_liu*/
function showBoxHide(a){
	var a=$(".tools_box ul li");
	a.hide();
}

/*选择被保方-缴保方-显示guihua_liu*/
function showBox(a){
	var a=$(".tool_box");
	a.show();
}

//划过效果guihua_liu	
function skateOver(self,ele){
				$(self).mousemove(function(){
					$(this).parent().children(ele).slideDown();
				});
				$(ele).mouseleave(function() {
					$(this).slideUp("fast");														
				});
}

/*左侧三角方法*/	
function menuLoc(a,b){ 
	var $nowLi=$("#nav li:eq("+a+")");
	var height=$nowLi.css("line-height");
	if(b==""){
		$nowLi.children("span").append("<abbr></abbr>")
		$nowLi.children("span").children("abbr").css("height",height);
		$nowLi.addClass("show");
	}else{
		$nowLi.children("div").children("a:eq("+b+")").append("<abbr></abbr>");
		$nowLi.children("div").children("a").children("abbr").css("height",height);
		$nowLi.addClass("show");
	}
} 

//弹出窗【2017-04-24 drld】
var mask="<div class='mask'></div>";
function alertBox(a){
	a="#"+a;
	$("body").append(mask);//添加遮罩层
	$(a).addClass("alert").show();
	var height="-"+$(a).height()/2+"px";//计算当前弹窗高度
	$(a).css("margin-top",height);
	$('#appProjectList').hide();
	$('#appBidderList').hide();
}
// 意向投资人弹出框【2017-05-11】
function alertDiv(b){
	b="#"+b;
	$("body").append(mask);//添加遮罩层
	$(b).addClass("alertdiv").show(); 
}

//构造弹出窗--lgh-2017-4-27
function alertPopup(title,msg){
	var box="<div class='masks'></div><div class='alerts'><h1><a class='title'>"+title+"</a></h1><p>"+msg+"<a class='box_close close'></a><p><button type='button' class='btn qd btn-primary'>确 定</button></div>";
	$(".warp").append(box);
	//增加弹出窗关闭,确定按钮事件
	$(".close").live("click",function(){
		$(".masks").remove();
		$(".alerts").remove();
	});
	$(".qd").live("click",function(){
		$(".masks").remove();
		$(".alerts").remove();
	});
}


