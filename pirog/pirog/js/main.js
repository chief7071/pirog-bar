var current_ver;
var device = false;
$(document).ready(function(){
    device = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    $('.nav a').on('click', function(){
        if($('html').hasClass('mobile')){
            var anchor = $(this).data('scroll');
            var anchor_link = $(anchor).offset().top;

            $('html, body').animate({
                scrollTop : anchor_link - 45
            }, 1500);
        }else{
            $.fn.multiscroll.moveTo($(this).data('section'));
        }

    });

    $('.slide-bottom').on('click', function(){
        $.fn.multiscroll.moveSectionDown();
    });

    $('.image-slider').each(function(){
        $(this).slick({
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4500,
            pauseOnFocus: false,
            pauseOnHover: false
        });
    });

    if($(window).width() > 768 && !device){
        initPage();
        current_ver = 'normal';
        $('body, html').removeClass('mobile');
    }else{
        buildMobile();
        current_ver = 'mobile';
        $('body, html').addClass('mobile');
    }
});

$(window).resize(function(){
    if($(window).width() > 768 && !device){
        if(current_ver == 'mobile'){
            initPage();
        }
        $('body, html').removeClass('mobile');
        current_ver = 'normal';
    }else{
        $.fn.multiscroll.destroy();

        $('#multiscroll-nav').remove();
        $('.ms-section').removeClass('ms-table').removeAttr('style');
        $('.ms-left, .ms-right').removeAttr('style');

        $('body, html').removeAttr('style').removeClass('ms-viewing-0');

        $('.ms-tableCell').each(function(){
            $(this).replaceWith(this.childNodes);
        });

        if(current_ver == 'normal'){
            buildMobile();
        }
        current_ver = 'mobile';
        $('body, html').attr('class', 'mobile');
    }
});

$(window).load(function(){
    initMap();
});

function initPage(){
    if(current_ver == 'mobile'){
        var sections = [];
        $('.ms-section').each(function(){
            sections.push($(this));
            $(this).remove();
        });

        $.each(sections, function(key, val){
            if(val.data('pos') == 'left'){
                $('.ms-left').append(val);
            }else{
                $('.ms-right').append(val);
            }

        });

    }

    $('.wrapper').multiscroll({
        navigation: true,
        navigationPosition: 'right',
        css3: true,
        onLeave: function(index, nextIndex, direction){
            if(nextIndex != 1){
                $('.global-logo').addClass('active');
            }else{
                $('.global-logo').removeClass('active');
            }

            if(nextIndex == 7){
                $('.slide-bottom').addClass('hide-style');
            }else{
                $('.slide-bottom').removeClass('hide-style');
            }
        }
    });

}

function buildMobile(){
    var sections = [];
    $('.ms-section').each(function(){
        sections[$(this).data('section')] = $(this);
        $(this).remove();
    });

    var i;
    for (i = 0; i < 14; i++) {
        $('.wrapper-mobile').append(sections[(i+1)]);
    }
}

