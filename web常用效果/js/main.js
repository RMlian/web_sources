//﻿/*全局变量*/
var tagNum=0;
var tagSpeed=400;
var tagWidth=0;
var tagNowNum=0;//切换按钮下一步开始计算
var mask="<div class='markpop'></div>";//增加遮罩层

/*初始化*/
$(function(){
	var speed=100;//全局动画变量

	//偏好设置-tab切换wjl
	var $settag=$("#setbox .setact span");
	settagWidth=$settag.outerWidth() + 40;
	var setline="<ins class='typeact'></ins>";
	$("#setbox .setact").append(setline);
	$settag.each(function() {
		var self = $(this);
		self.bind("click",function(){
			self.addClass('active').siblings().removeClass('active');
			tagNowNum=self.index();
			tagNowNumw=(tagNowNum*settagWidth) + 45;
			$("#setbox ins.typeact").animate({left:tagNowNumw+"px"},tagSpeed,function(){
				return false ;
			});
			$("#setbox .setcon:eq("+tagNowNum+")").show().siblings('.setcon').hide();
		});
	});


	//项目管理-tab效果wjl
	var $infotag=$(".info_tab .conlist_tab span ");
	tagWidth=$infotag.innerWidth();
	tagNum=$infotag.length-1;//获取标签长度
	var line="<ins class='tabact'></ins>";
	$(".info_tab .conlist_tab").append(line);
	$(".info_tab ins.tabact").css("width",tagWidth+"px");
	$infotag.each(function() {
		$(this).bind("click",function(){
			tagNowNum=$(this).index();
			tag(tagNowNum);
		});
	});

	//偏好设置类名选中效果wjl
	var $typename = $('.setcon .set_type span,.trade_type span');
	$typename.each(function(){
		var self = $(this);
		self.bind("click",function(){
			self.addClass('active').siblings().removeClass('active');
		});
	});

	//nav菜单选中效果wjl
	var nowMenuTitle=$(".main").attr("data-m");
	var nowMenuList=$(".main").attr("data-l");
	menuLoc(nowMenuTitle,nowMenuList);
	//nav选中方法
	function menuLoc(a,b){
		var $nowLi=$(".nav li:eq("+a+")");
		if(b==""){
			$nowLi.addClass('active').siblings().removeClass('active');
		}else{
			$nowLi.addClass('active').siblings().removeClass('active');
		}
	}
	//列表title选择效果wjl
	var $ul=$(".typeul li");
	$(".tagtype span").each(function(index) {
        $(this).bind("click",function(){
			show(String(index));
			$(this).addClass("active").siblings().removeClass("active");
		});
    });
	$ul.each(function(index) {
         $(this).addClass("type"+index);
    });
	function show(index){
		$ul.hide();
		$ul.each(function() {
            if($(this).attr("type")==index){
				$(this).show();
			}
			if(index=="0"||index == "5"){
				$(this).show();
			}
        });
	}

	//head铺满全屏wjl
	$(window).resize(function(){
	  	$('header,footer').css('width',$(document).width());
	});

	//星星显示
	var $stars=$(".stars");
	$stars.each(function(index){
	    var _width=parseInt($(this).attr("stars-num"))*20+"%";
		$(this).children("a").css("width",_width);
	});

    //构造表格操作2017.5.16wjl使用
	var $tdInfo=$(".operating_line li");//当前操作列
	var $operationBox=$(".operationBox");//操作菜单
	var listId;//项目ID
	//构造当前列表内容的操作菜单
	$tdInfo.each(function(){
	    $(this).bind("mouseenter",function(){
	    	var lheight = $(this).innerHeight();
			var offset = $(this).position();
			listId=$(this).attr("data-id");
			$operationBox.show().css({top:offset.top+lheight+2+'px'});
		});
	});

	//隐藏操作菜单
	$operationBox.bind("mouseleave",function(){
		$(this).hide();
	});
	//给操作菜单绑定点击事件
	$operationBox.children("span").each(function() {
	    $(this).bind("click",function(){
			var toDo=$(this).attr("data-do");
			operationDoing(toDo,listId);
		});
	});
	//点击操作内容响应对应事件
	function operationDoing(a,b){
		alert(a+" : "+b);
	}
	//标签页切换方法
	function tag(a){
 		tagemove(a);
		$(".con_box .tabbox:eq("+a+")").show().siblings().hide();
	}
 	function tagemove(a){
		a=a*tagWidth;
		$(".info_tab ins.tabact").css("width","0px");
		$(".info_tab ins.tabact").animate({left:a+"px",width:tagWidth+"px"},tagSpeed,function(){
			return false ;
		});
	}

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

  	//帮助弹层调用wjl
  	$('.user_help').on('click',function(){
  		var self = $(this);
  		self.addClass('active').siblings().removeClass('active');
		$("body").append(mask);
		$(".popbg").show();
  	});
  	//点击关闭弹层
	$(".popclosed").on("click",function(){
		hideNewProcess();
	});
	//隐藏增加流程节点窗体
	function hideNewProcess(){
		$(".popbg").hide();
		$(".markpop").remove();
	}
  	//点击编辑按钮进行个人资料编辑wjl
  	$('#editInfo').bind('click',function(){
  		var $textedit = $('.edit_con abbr');
  		$('.conserve').show();
  		$textedit.each(function(i,v){
	  		var abbrtext = $(v).text();
	  		var edinput = '<input type="text" value="'+abbrtext+'" />';
	  		$(v).replaceWith(edinput);
	  	});
  	});

  	//账户概况wjl添加
  	var $charts=$(".charts dl dd");
	var _html="<ul>";
	var _sum=0;
	var len=6;
	var speed=800;
	$charts.each(function(index) {
        _html+="<li class='chart"+getRandom(4)+"'><abbr>"+$(this).attr("title")+"</abbr><span><a>"+$(this).attr("data-num")+"</a></span></li>";
		_sum+=parseInt($(this).attr("data-num"));
    });
	_html+="</ul>";
	$(".charts").append(_html);
	$(".charts li").each(function(index) {
		var _width=parseInt($(this).children("span").children("a").html())/_sum*100;
       $(this).children("span").animate({width:_width+"%",speed});
    });

})//初始化结束
	//随机数
	function getRandom(n){
	    return Math.floor(Math.random()*n+1);
	}

	//标签替换wjl
	function replacetarget(tag,ntag){
		return $(tag).replaceWith(ntag);
	}
	//取消编辑wjl
	function editcancle(){
		var $texted = $('.edit_con input');
		$texted.each(function(i,v){
			var abbrtext = $(v).val();
	  		var editext = '<abbr>'+abbrtext+'</abbr>';
	  		replacetarget(v,editext);
	  	});
	  	$('.conserve').hide();
	}

	// 注册登录点击下一步wjl
	function nextReg(it){
	    it.parents('.r_list').hide().siblings('.r_list').show();
	    $('#tabT li').eq(1).addClass('active').siblings().removeClass('active');
	}
	// 注册登录点击返回wjl
	function backReg(it){
	    it.parents('.r_list').hide().siblings('.r_list').show();
	    $('#tabT li').eq(0).addClass('active').siblings().removeClass('active');
	}
	//绑定手机下一步
	function regMobile(it){
		it.parents('.tablist').hide().siblings('.tablist').show();
	    $('#tabT li').eq(1).addClass('active').siblings().removeClass('active');
	}

	//单选按钮改变时获取值的方法wjl
	function changeRadio(obj,str){
		if($(obj).attr('id') == str+'_radio_T'){
			$("#"+str).val("T");
		}else{
			$("#"+str).val("F");
		}
	}
