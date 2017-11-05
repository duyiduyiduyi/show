$(function(){
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
    //首屏
    (function(){

        var $object = $('#bg').find('.bg1 object'),
            $wrap = $('#wrap'),
            $swp = $wrap.find('.swp'),
            $videoBtn = $wrap.find('.videoBtn'),
            $video = $wrap.find('.video'),
            $videoClose = $wrap.find('.video .video-box .close');

        setTimeout(function(){
            $object.css('opacity',1);
        },1500);
        //首屏载入动画
        $swp.eq(0).animate({
            opacity : 1,
            left : 0
        }, 1500);
        $swp.eq(1).animate({
            opacity : 1,
            right : 0
        }, 1500);
        $swp.eq(2).animate({
            opacity : 1,
            top : '90px'
        }, 1500);
        $swp.eq(3).animate({
            opacity : 1,
            top : '610px'
        }, 1500);
        $videoBtn.animate({
            opacity : 1,
            right : '350px'
        },1500);
        //首屏视频弹窗
        // (function(){
        //     $videoBtn.click(function() {
        //         $video.show();
        //         $(document.body).addClass('noScroll');
        //     });
        //     $videoClose.click(function() {
        //         $video.hide();
        //         $(document.body).removeClass('noScroll');
        //     });
        // })();
    })();
    //最新情报弹窗
    (function(){
        var $newInfo = $('#newInfo'),
            $infoLi = $newInfo.find('.infoList li'),
            $pop = $newInfo.find('.popWindow'),
            $popLi =  $pop.find('.contain ul li'),
            $popClose = $pop.find('.close'),
        //自定义滚动条
            $txt = $('#newInfo').find('.popWindow .contain ul li .txt'),
            txtH = $txt.height(),
            $btn = $pop.find('.contain .btn'),
            index = 0,
            length = $popLi.length;

        $txt.each(function(){
            var $mainTxt = $(this).find('.mainTxt'),
                $scroll = $(this).find('.scroll'),
                $bar = $(this).find('.scroll .bar'),
                mainH = $mainTxt.height(),
                //把握比例关系
                barH = txtH*txtH/mainH,
                topMax = txtH - barH,
                topMin = 0;
            $bar.height(barH);
            $bar.mousedown(function(e) {
                var sY = e.clientY,
                    sTop = $(this).position().top;
                $(document).mousemove(function(e) {
                    var nY = e.clientY,
                        top = sTop + nY - sY;
                    top = Math.min(top,topMax);
                    top = Math.max(top,topMin);
                    $bar.css('top',top);
                    $mainTxt.css('top',-top*mainH/txtH);
                }).mouseup(function() {
                    $(this).off('mousemove').off('mouseup');
                });;
                //避免文字选中
                return false;
            });
            //鼠标滚轮事件
            $(this).mousewheel(function(e,d){
                var top = $bar.position().top;
                if (d<0) {
                    top += 10;
                }else{
                    top -=10;
                }
                top = Math.min(top,topMax);
                top = Math.max(top,topMin);
                $bar.css('top',top);
                $mainTxt.css('top',-top*mainH/txtH);
                //避免默认滚轮事件触发
                return false;
            });
            //点击滚轮事件
            $scroll.click(function(e) {
                if (e.target === this) {
                    var y = e.clientY - ($(this).offset().top - $(document).scrollTop()),
                        top = $bar.position().top;
                    top = y<top?top-100:top+100;
                    top = Math.min(top,topMax);
                    top = Math.max(top,topMin);
                    $bar.stop().animate({'top':top},500);
                    $mainTxt.stop().animate({'top':-top*mainH/txtH},500);
                }
            });
        });
        //因为初始dispay:none后height()方法获取不到高度，
        //所以先采用透明度为0，加载高度后，再none
        $pop.hide();
        $popLi.hide();
        //点击弹窗
        $infoLi.click(function(){
            index = $(this).index();
            $pop.show().stop().animate({opacity:1},500);
            $popLi.eq(index).show().stop().animate({opacity:1},500);
            $(document.body).addClass('noScroll');
        });
        //关闭弹窗
        $popClose.click(function(){
            $pop.stop().animate({opacity:0},500);
            $popLi.stop().animate({opacity:0},500);
            //因为hide()方法，会直接none掉，没有淡出效果。所以用一个定时器，淡出后再hide()
            setTimeout(function(){
                $pop.hide();
                $popLi.hide();
            },500);
            $(document.body).removeClass('noScroll');
        });
        //弹窗的左右按钮
        $btn.click(function(){
            if ($(this).index('contain .btn')) {
                index ++;
                index %= length;
            }else {
                index --;
                if(index<0) index = length-1;
            }
            $popLi.eq(index).show().stop().animate({opacity:1},500).siblings().css('opacity', 0).hide();
        });
    })();
    //滚轮动画
    (function(){
        var $newInfo = $('#newInfo'),
            $title = $newInfo.find('.main .title'),
            $infoLi = $newInfo.find('.infoList li'),
            objArr = [];
        //滚轮样式初始化
        init($title,$infoLi);
        function init(){
            for (var i = 0,length = arguments.length; i < length; i++) {
                arguments[i].each(function() {
                    this.sTop = $(this).offset().top;
                    objArr.push(this);
                });
            }
        }
        //滚轮的延迟加载
        $(window).scroll(function(){
            var height = $(document).scrollTop() + $(window).height();
            for (var i = objArr.length - 1; i >=0; i--) {
                var obj = objArr[i];
                if (height >= obj.sTop + 100) {
                    (function(){
                        var $This = $(obj);
                        setTimeout(function(){
                            $This.removeClass('hide');
                        },($This.index()%3)*200);
                        objArr.slice(i, 1);
                    })();
                }
            }
        });
    })();
    //游戏特色banner
    (function(){
        var $game = $('#game'),
            $picLi = $game.find('.main .banner .pic li'),
            index = 0,
            length = $picLi.length,
            $btn = $game.find('.main .banner .btn'),
            $btnL = $game.find('.main .banner .left'),
            $btnR = $game.find('.main .banner .right');
        $picLi.click(function() {
            if ($(this).index() !== index) {
                index = $(this).index();
                show(index);
            }
        });
        $btn.click(function(){
            if ($(this).index()===1) {
                index --;
                if (index<0) index = length-1;
            }else{
                index ++;
                index %= length;
            }
            show(index);
        });
        function show(index){
            var lIndex = index - 1,
                rIndex = index + 1;
            if (lIndex<0) lIndex = length -1;
            if (rIndex>=length) rIndex = 0;
            $picLi.removeClass('left mid right');
            $picLi.eq(lIndex).addClass('left');
            $picLi.eq(index).addClass('mid');
            $picLi.eq(rIndex).addClass('right');
        }
    })();

})
