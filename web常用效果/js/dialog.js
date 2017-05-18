/***
    3秒后消失
    new markPop({
        content: '啊啊啊啊啊啊啊',
        time: 3
    });
    2个按钮
    new markPop({
        content: '通过style设置你想要的样式',
        btn: ['确定','取消'],
         add:true,
    });
    1个按钮
    new markPop({
        content: '通过style设置你想要的样式',
        btn: ['确定']
        add:true,
    });
    new markPop({
        title:[]
        content: '通过',
        btn: ['确定','取消'],
         add:true,
        sure:function(){
            alert(11111)
        },
        cancel:function(){
            alert(11111)
        }
    });
    new markPop({
        title:[
            '我是标题',
            'background-color:#8DCE16; color:#fff;'
        ],
        content: '啊啊啊啊啊啊啊'
    });
    new markPop({
        title:[
            '我是标题',
            'background-color:#8DCE16; color:#fff;'
        ],
        content: '<input type="text' id="demo" value="addd" />',
        btn:['确定','取消'],
        add:false,
        sure:function(){
            alert($('#demo').val());
        },
        cancel:function(){

        }

    });
 ***/
var markPop = function(opts){
    var mp = this.it;
    mp ={
        width:'',
        title: '',
        content:'设置内容'
    };
    this.config = $.extend(mp,opts || {});
    this.view();
};
markPop.prototype.view = function(){
    var self =this,config = this.config;
    var title = (function(){
        var titype = typeof config.title === 'object';
        return config.title? '<h3 class="popTit" style="'+ (titype ? config.title[1] : '') +'">'+ (titype ? config.title[0] : config.title)  +'</h3><div class="popClosed"></div>': '';
    }());
    var subBtn = (function(){
        var btns = (config.btn || []).length, btnDom;
        if(btns === 0 || !config.btn){
            return '';
        }
        btnDom = '<a type="1"  class="btn_b"  href="javascript:;">'+ config.btn[0] +'</a>'
        if(btns === 2){
            btnDom = '<a type="0" class="btn_b"  href="javascript:;">'+ config.btn[1] +'</a>' + btnDom;
        }
        return '<div class="popBtn">'+ btnDom + '</div>';
    }());
    var strHtml ='<div class="popBg'+ (config.className ? config.className : '')+'"><div class="popCon">'
        +title
        +'<div class="popIns"'+( config.style ? 'style="'+config.style+'"' : '' )+'>'+ config.content +'</div>'
        + subBtn
        +'</div>'
        +'</div>';
    $('body').append('<div id="markPop" class="markPop">'+strHtml+'</div>');

    var w=this.config.width,
        h=$(window).height();
    $('.popBg').width(w-80);
    $('.popBg').css({
        'left':(w-$('.popBg').width())/2,
        'top':(h-$('.popBg').height())/2 
    });
    $('.markPop').click(function(e){
        self.closed();
        e.stopPropagation();
    });
    $('.popBg').click(function(e){
        e.stopPropagation();
    });
    self.control();
};
markPop.prototype.closed =function(){
    $('.markPop').remove();
    clearTimeout(this.config.time);
};
markPop.prototype.control =function(){
    var self = this,config = this.config,dw = $(window).width();
    if(config.width){
        $('.popBg').width(config.width);
        $('.popBg').css({
            'left':(dw-$('.popBg').width())/2
        });
    }
    if(config.time){
        config.time = setTimeout(function(){
          $('.markPop').remove();
        }, config.time*1000);
    }
    if(config.title){
        $('.popClosed').bind('click',function(e){
            e.stopPropagation();
            self.closed()
        });
    }
    if(config.btn && config.add ==true){
        $('.popBtn a').each(function(){
            var it = $(this);
            it.click(function(e){
                e.stopPropagation();
                if(it.attr('type') == 1){
                    config.cancle && config.cancle();
                    self.closed();
                }else{
                    self.closed();
                    config.sure ? config.sure():self.closed();
                }
            })
        });
    }
    if(config.btn && config.add == false){
        $('.popBtn a').each(function(){
            var it = $(this);
            it.click(function(e){
                if(it.attr('type') == 1){
                    config.cancle && config.cancle();
                    self.closed();
                }else{
                    config.sure ? config.sure():self.closed();
                }
            });
        });
    }

};


