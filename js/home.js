//顶层导航隐藏区块
(function(){
    var $logo = $('#logo'),
        $logo2 = $logo.find('.top_bar .img .logo2'),
        $scale = $logo.find('.top_bar .img .scale'),
        $close = $scale.find('.close'),
        $wrap = $logo.find('.top_bar .nav .banner .wrap'),
        $wrapLi = $wrap.find('a')
        height = $wrapLi.height(),
        index = 0,
        timer = null;

    $logo2.mouseenter(function() {
        $scale.stop().slideDown();
    });
    $scale.mouseleave(function() {
        $(this).stop().slideUp();
    });
    $close.click(function() {
        $scale.stop().slideUp();
    });
    timer = setInterval(function(){
        index++;
        index %= 2;
        $wrap.animate({
            marginTop : -index * height
        }, 300);
    },5000);
})();
//导航隐藏层区块
(function(){
    var $LOGO = $('#logo'),
        $header = $('#header'),
        $nav = $('#nav'),
        $leftNav = $nav.find('.leftNav'),
        $liA = $nav.find('.mainList li a'),
        $liLine = $nav.find('.mainList li .line'),
        $showLi = $nav.find('.mainList li.show'),
        $showA = $showLi.find('a'),
        $hide = $showLi.find('.hide'),
        $logo = $header.find('.logo');
    //导航下拉隐藏
    $showLi.hover(function(){
        $nav.addClass('hover');
        $hide.stop().slideDown();
        $showA.addClass('hover');
    },function(){
        $nav.removeClass('hover');
        $hide.stop().slideUp();
        $showA.removeClass('hover');
    });
    //阴阳师文字动画
    $logo.delay(500).queue(function(){
        $(this).css({
            left : 52,
            opacity : 1
        });
    });
    //页面滚动，导航吸顶
    $(window).scroll(function() {
        if ($(document).scrollTop() > $LOGO.height()) {
            $nav.addClass('scroll');
            $liA.css('color', '#000');
            $liLine.css('color', '#000');
            $leftNav.stop().fadeIn();
            $logo.addClass('scale');
        }else {
            $nav.removeClass('scroll');
            $liA.css('color', '#fff');
            $liLine.css('color', '#fff');
            $leftNav.stop().fadeOut();
            $logo.removeClass('scale');
        }
    });
})();
//人物角色的动画 + 服务器列表弹窗区块
(function(){
    var $role = $('#role'),
        $rol1 = $role.find('.rol1 .img'),
        $rol2 = $role.find('.rol2 .img'),
        $btn = $role.find('.btn'),
        //用来表示切换图片的序列号
        bool = false,
        $server = $("#server"),
        $serverList = $("#serverList"),
        $serverClose = $serverList.find(".close");
    //初始角色图片显示
    $rol1.delay(500).queue(function(){
        $(this).removeClass('hide');
    });
    //初始切换按钮显示
    $btn.animate({opacity : 1},500);
    //btn按钮点击
    $btn.click(function() {
        bool ? change($rol2,$rol1) : change($rol1,$rol2);
        bool = !bool;
    });
    //封装的切换函数
    function change($obj1,$obj2){
        $obj1.stop();
        $obj2.stop();
        $obj1.addClass('hide').delay(500).queue(function(){
            $obj2.removeClass('hide');
        });
    }
    $server.click(function () {
        $serverList.fadeIn();
        $serverList.find(".main").addClass("show");
    });
    $serverClose.click(function () {
        $serverList.fadeOut();
        $serverList.find(".main").removeClass("show");
    });
})();
//游戏日历区块
(function(){
    var $slide = $('#slide'),
        $download = $slide.find('.download'),
        $shrink = $download.find('.shrink'),
        $main = $download.find('.main'),
        $close = $main.find('.close'),
        $contain = $slide.find(".contain"),
        $li = $contain.find("ul li");
    //初始化
    $download.addClass('on');
    $shrink.hide();
    $main.show();
    $close.click(function() {
        $download.removeClass('on');
        $download.stop().delay(600).queue(function(){
            $main.hide();
            $shrink.show();
        });
    });
    $shrink.click(function() {
        $download.addClass('on');
        $shrink.hide();
        $main.show();
    });
    $li.hover(function () {
        $(this).stop().addClass("pos");
    },function () {
        $(this).stop().delay(750).queue(function () {
            $(this).removeClass("pos");
        });
    });
})();
//面向对象方法写轮播及自动轮播
(function(){
    //第一个参数 轮播用来移动的对象
    //第二个参数 轮播存储信息的小区块
    //第三个参数 轮播中的按钮
    function Banner($ul, $li, $btn){
        this.$ul = $ul;
        this.$btn = $btn;
        this.index = 0;
        this.length = $li.length;
        this.width = $li.width();
        this.timerOut = null;
    }
    Banner.prototype = {
        exe : function(){
            this.addEvent();
        },
        addEvent : function(){
            var This = this;
            this.$btn.mouseenter(function(){
                clearTimeout(This.timerOut);
                //因为下面需要用到JQ方法，例如index()、addClass()等，所以用$this对象
                var $this = $(this);
                This.timerOut = setTimeout(function(){
                    This.index = This.$btn.index($this);
                    $this.addClass("on").siblings().removeClass("on");
                    This.$ul.stop().animate({
                        left : -This.width*This.index
                    }, 300);
                },300);
            });
        }
    }
    //继承
    function NewBanner($ul, $li, $btn, $wrap){
        Banner.call(this, $ul, $li, $btn);
        this.$wrap = $wrap;
        this.timerVal = null;
    }
    //类继承
    function Fn(){};
    Fn.prototype = Banner.prototype;
    NewBanner.prototype = new Fn();
    NewBanner.prototype.temp = NewBanner.prototype.exe;
    NewBanner.prototype.exe = function(){
        this.temp();
        this.auto();
        this.clearTimerVal();
    }
    NewBanner.prototype.clearTimerVal = function(){
        var This = this;
        this.$wrap.hover(function(){
            clearInterval(This.timerVal);
        },function(){
            This.auto();
        });
    }
    NewBanner.prototype.auto = function(){
        var This = this;
        this.timerVal = setInterval(function(){
            This.index++;
            This.index %= This.length;
            This.$btn.eq(This.index).addClass('on').siblings().removeClass('on');
            This.$ul.stop().animate({
                left : -This.width*This.index
            }, 300);
        },3000);
    }
    //因为是()(); 所以外面的函数并不能访问到此面向对象,所以将其赋值到window下
    window.Banner = Banner;
    window.NewBanner = NewBanner;
})();
//中心新闻banner区块
(function(){
    var $banner = $('#news').find('.banner'),
        $ul = $banner.find('.pic ul'),
        $li = $ul.find('li'),
        $btn = $banner.find('.btn ul li');
    var banner = new NewBanner($ul,$li,$btn,$banner);
    banner.exe();
})();
//中心新闻info区块
(function(){
    var $info = $('#news').find('.info'),
        $btn = $info.find('.btn ul li'),
        $list = $info.find('.newsList .list'),
        $listUl = $list.find('ul'),
        //获取所有的用来存储新闻信息的底层li，用来动态添加内容
        $listLi = $list.find('li');

    $btn.mouseenter(function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
    $listLi.each(function(i) {
        $(this).append("<a href='javascript:void(0);'>"+data[i].type+data[i].title+"</a><span>"+data[i].time+"</span>");
    });
    $listLi.eq(0).addClass('recommend');
    var banner = new Banner($list,$listUl,$btn);
    banner.exe();
})();
//式神区块
(function(){
    // 动态生成式神图标
    var $shishen = $('#shishen'),
        $ulList = $shishen.find('.list ul');
    // 每种式神的计数器 [0,null] 第一个数据用来计数，第二数据用来判断给上下的哪个div添加内容
    var count = [[0,null],[0,null],[0,null],[0,null],[0,null]];
    for (var i = 0,length = shishenData.length; i < length; i++) {
        var index;
        switch (shishenData[i].level) {
            case 'SSR':
                index = 1;
                break;
            case 'SR':
                index = 2;
                break;
            case 'R':
                index = 3;
                break;
            case 'N':
                index = 4;
                break;
        }
        count[0][0]++;
        count[index][0]++;
        //因为每条li要摆放两个div,即奇数个div时需要创建一个新的li来存储div
        if (count[0][0]%2) {
            count[0][1] = $('<li></li>');
            $ulList.eq(0).append(count[0][1]);
        }
        if (count[index][0]%2) {
            count[index][1] = $('<li></li>');
            $ulList.eq(index).append(count[index][1]);
        }
        //根据shishenData数据中的isNew属性，判断是否为最新图片
        var str = shishenData[i].isNew?"<i class='new'></i>":"";
        $div = $("<div>"+
                    "<img src='img/index/content/shishen/"+shishenData[i].id+".png'>"+
                    "<p><span>"+shishenData[i].name+"</span></p>"+str+
                "</div>");
        var $clone = $div.clone();
        count[0][1].append($div);
        count[index][1].append($clone);
    }
})();
// 式神区块的按钮
(function(){
    var $shishen = $('#shishen'),
        $area = $shishen.find('.show .area'),
        $tab = $shishen.find('.tab'),
        $btn = $shishen.find(".show .btn li"),
        $list = $shishen.find('.show .pic .list'),
        width = $list.width();

    // 式神区块和主角区块的切换按钮
    $tab.click(function(){
        $(this).addClass('on').siblings('.tab').removeClass('on');
        $area.eq($(this).index('#shishen .title p')).addClass('on').siblings().removeClass('on');
    });
    // 式神区块内部切换按钮
    $btn.click(function () {
        var i = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $list.eq($(this).index()).show().siblings().hide().each(function() {
            var $aBtn = $(this).find('a');
            this.index = 0;
            this.index == length - 1?$aBtn.eq(1).hide():$aBtn.eq(1).show();
            this.index == 0?$aBtn.eq(0).hide():$aBtn.eq(0).show();
            $(this).find('ul').css('left', 0);
        });;
    });
    $list.each(function(i) {
        var $ul = $(this).find('ul'),
            $li = $ul.find('li'),
            $aBtn = $(this).find('a'),
            length = Math.ceil($li.length / 6);

        //因为此处index为闭包变量，外面访问不到。而每次$btn点击是，需要将index清零，所以index用自定义属性
        this.index = 0;
        this.index == length - 1?$aBtn.eq(1).hide():$aBtn.eq(1).show();
        this.index == 0?$aBtn.eq(0).hide():$aBtn.eq(0).show();
        var _this = this;
        $aBtn.click(function(){
            if ($(this).index()==2) {
                _this.index++;
                if (_this.index >= length) _this.index = length - 1;
            }else {
                _this.index--;
                if (_this.index<0) _this.index = 0;
            }
            _this.index == length - 1?$aBtn.eq(1).hide():$aBtn.eq(1).show();
            _this.index == 0?$aBtn.eq(0).hide():$aBtn.eq(0).show();
            $ul.stop().animate({
                left : _this.index * -width
            }, 300);
        });
    });
})();
// 主角区块
(function(){
    var $shishen = $('#shishen'),
        $area2 = $shishen.find('.show .area2'),
        $chooseBtn = $area2.find('.choose ul li'),
        $character = $area2.find('character'),
        $picLi = $area2.find('.character ul li');

    $chooseBtn.click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        $picLi.eq($(this).index()).stop().fadeIn().siblings().stop().fadeOut();
    });
})();
//战略左边区块
(function(){
    var $strategy = $('#strategy'),
        $left = $strategy.find('.left'),
        $banner = $left.find('.banner'),
        $ul = $banner.find('.wrap'),
        $li = $ul.find('a'),
        $btn = $left.find('.btn span');
        // width = $li.width(),
        // length = $li.length,
        // index = 0,
        // timer = null;
    // $btn.hover(function() {
    //     index = $(this).index();
    //     $(this).addClass('on').siblings().removeClass('on');
    //     $wrap.stop().animate({
    //         marginLeft : -width * index
    //     }, 300)
    // });
    // auto();
    // $wrap.hover(function(){
    //     clearInterval(timer);
    // },function(){
    //     auto();
    // });
    // function auto(){
    //     timer = setInterval(function(){
    //         index++;
    //         index %= length;
    //         $btn.eq(index).addClass('on').siblings().removeClass('on');
    //         $wrap.stop().animate({
    //             left : -width * index
    //         }, 300)
    //     },3000);
    // };
    var banner = new NewBanner($ul, $li, $btn, $banner);
    banner.exe();
})();
//战略右边区块
(function(){
    var $strategy = $('#strategy'),
        $right = $strategy.find('.right'),
        $tab = $right.find('.title .tab'),
        $wrap = $right.find('.banner .wrap'),
        $ul = $right.find('.banner .wrap ul'),
        index = 0,
        width = $ul.width(),
        timerOut = null,
        arr = ['新手','式神','斗技','玩法','御魂'];

    $tab.mouseenter(function() {
        clearTimeout
        $(this).addClass('on').siblings().removeClass('on');
    });
    $ul.each(function(i) {
        var num = 0;
        for (var j = 0,length = strategyData.length; j < length; j++) {
            var data = strategyData[j].type;
            if (!i || new RegExp(i-1).test(data)) {
                $(this).append("<li>" +
                    "<a href='javascript: void(0);'>" +
                        "<i></i>" +
                        "<p class='dec'>【"+arr[data]+"】&nbsp;"+strategyData[j].title+"</p>" +
                        "<p class='author'>作者："+strategyData[j].author+"</p>" +
                   "</a>" +
                "</li>");
                num ++;
                if (num == 10) break;
            }
        }
    });
    // mmp,不好用面向对象，$tab在父类的index()不是0123，布局的问题，只能老老实实写方法了
    // $(this).index($(this)) 可以传递一组jq对象，返回这个对象中的元素在这个元素中的索引,完美，不mmp了
    var banner = new Banner($wrap,$ul,$tab);
    banner.exe();
})();
//同人区块
(function(){
    var $tongren = $('#tongren'),
        $title = $tongren.find('.title'),
        $tab = $title.find('ul .tab'),
        $wrap = $tongren.find('.banner .wrap'),
        $ul = $wrap.find('ul');

    $tab.hover(function() {
        $(this).addClass('on').siblings('.tab').removeClass('on');
    });
    $ul.each(function(i) {
        for (var j = 0,length = fanData.length; j < length; j++) {
            if (fanData[j].type == i) {
                $(this).append("<li>" +
                    "<a href=''>" +
                        "<img src="+fanData[j].url+" alt=''>" +
                        "<p class='cover'><i></i></p>" +
                    "</a>" +
                    "<p class='author'>"+fanData[j].title+"</p>" +
                "</li>");
            }
        }
    });
    var banner = new Banner($wrap,$ul,$tab);
    banner.exe();
})();
//联系方式区块的返回顶部
(function(){
    var $bg2 = $('#contact').find('.contain .bg2');
    $bg2.click(function() {
        $("body,html").animate({
            scrollTop : 0
        },1500);
    });
})();
//图片延迟加载
// (function(){
//     var aImg = document.getElementById('box').getElementsByTagName('img'),
//         length = aImg.length;
//     //类数组变真正的数组
//     aImg = [].slice.apply(aImg);
//     for (var i = 0; i < length; i++) {
//         aImg[i].src = 'img/index/loading.jpg';
//     }
//     window.addEventListener("scroll", scroll ,false);
//     scroll();
//     function scroll(){
//         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
//             top = scrollTop + document.documentElement.clientHeight;

//         for (var i = aImg.length - 1; i >= 0; i--) {
//             if (osTop(aImg[i]) <= top + 200) {
//                 aImg[i].src = aImg[i].getAttribute('src');
//                 aImg.splice(i,1);
//             }
//         }
//     }
//     function osTop(obj){
//         var top = 0;
//         // 当定位父元素display：none时(译注:IE和Opera除外),offsetParent属性，返回null
//         while (obj !== document.body) {
//             top += obj.offsetTop;
//             obj = obj.offsetParent;
//             if (!obj) break;
//         }
//         return top;
//     }
// })();


