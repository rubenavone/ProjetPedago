(function($) {
    $(document).ready(function() {
        $('li.disabled a').click(function() { return false; });

        $('.kl-active-langue').click(function(){
            $('ul.kl-dropDown-langue').toggleClass('show');
            $('.kl-submenu').css('display','none');
            return false;
        });
        $('.kl-profil-icon').click(function(e){
          $('.kl-submenu').slideToggle(50);
          $('.kl-dropDown-langue').removeClass('show');
          e.preventDefault();
        });
        $('body').click(function(e){
          if(!$(e.target).is('.kl-profil-icon')){
            $('.kl-cnx-insc-box ul.kl-submenu').hide();
          }
        });
        $('body').click(function(e){
          if(!$(e.target).is('.kl-active-langue')){
            $('.kl-dropDown-langue').removeClass('show');
          }
        });
        $('#id-play-pause').click(function(){
            $('.kl-bg-video').remove();
            $('#bgvid').get(0).play();
            $('.kl-play-box h3').remove();
            $('#id-play-pause').hide();
            $('#id-pause-pause').show();
            $('#bgvid').addClass('kl-vids-fullScreen');
            $('body').css('overflow', 'hidden');
            $('.kl-close-fullScreen').removeClass('hide');
        });
        $('#id-pause-pause').click(function(){
            $('#bgvid').get(0).pause();
            $('#id-play-pause').show();
            $('#id-pause-pause').hide();
        });

          $('.kl-close-fullScreen').click(function(){
            var theVideoBloc = $( $(this).attr('href') );
            $('html, body').animate({
              scrollTop: theVideoBloc.offset().top - 86
            }, 500);
            $(this).addClass('hide');
            $('#bgvid').removeClass('kl-vids-fullScreen');
            $('body').css('overflow', 'auto');
            $('#bgvid').get(0).pause();
            $('#id-play-pause').show();
            $('#id-pause-pause').hide();
            return false;
          });

        $(".kl-text-slide").owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            items:1,
            itemsDesktop : [704,1],
            itemsTablet : [600,1],
            itemsMobile : [479,1],
            navigation : true,
            navigationText : ["<",">"],
            mouseDrag : false,
            touchDrag : false
        });
        $(".kl-photo-slide").owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            items:1,
            itemsDesktop : [160,1],
            itemsTablet : [160,1],
            itemsMobile : [160,1],
            transitionStyle : "fade",
            mouseDrag : false,
            touchDrag : false
        });
        var v2 = $(".kl-photo-slide").data('owlCarousel');
        $('.kl-text-slide .owl-next').click(function(){
            v2.next();
        });
        $('.kl-text-slide .owl-prev').click(function(){
            v2.prev();
        });
        $('.kl-partener-list').owlCarousel({
            items : 4,
            autoPlay : 7000,
            itemsDesktop : [1000,3],
            itemsDesktopSmall : [900,3],
            itemsTablet : [600,2],
            itemsMobile : [479,1]
        });
        $('.kl-slide-profil').owlCarousel({
            items : 12,
            autoPlay : 7000,
            itemsDesktop : [1000,10],
            itemsDesktopSmall : [900,3],
            itemsTablet : [600,2],
            itemsMobile : [479,1]
        });
        $('.kl-prev-slide-profil').click(function(){
            $('.kl-slide-profil').trigger('owl.prev');
        });
        $('.kl-next-slide-profil').click(function(){
            $('.kl-slide-profil').trigger('owl.next');
        });

       /* $('.kl-content-sidebar ul li a').click(function(){
            $(this).toggleClass('kl-bg-orange');
            return false;
        });*/
        /*Add new item list settings page*/
        $('.kl-add-plus a').click(function(){
            var appendThis = '<li><span>lorem</span><a href="#" class="kl-remove-this"></a></li>';
            var toAppend = $(this).closest('ul').find('.kl-add-plus');
            $(appendThis).insertBefore(toAppend);
            ;
            return false;
        });
        $('body').delegate('.kl-remove-this', 'click', function(){
            $(this).closest('li').remove();
            return false;
        });
        var nbreTxt = $('.kl-poste-pro-info').text().length;
        if($(nbreTxt) > 31){

        }
        /*validation icon Delete*/
        $('body').delegate('.kl-delete-default-validation', 'click', function(){
            $('.kl-deleteThis').addClass('kl-delete-default-validation').removeClass('kl-deleted-validation');
            $('.kl-checkThis').addClass('kl-checked-validation').removeClass('kl-check-default-validation');
            $(this).addClass('kl-deleted-validation').removeClass('kl-delete-default-validation');
            $(this).closest('.kl-action-validation').find('.kl-checkThis').addClass('kl-check-default-validation').removeClass('kl-checked-validation');
        });
        $('body').delegate('.kl-check-default-validation', 'click', function(){
            $('.kl-checkThis').addClass('kl-check-default-validation').removeClass('kl-checked-validation');
            $('.kl-deleteThis').addClass('kl-deleted-validation');
            $(this).addClass('kl-checked-validation').removeClass('kl-check-default-validation');
            $(this).closest('.kl-action-validation').find('.kl-deleteThis').addClass('kl-delete-default-validation').removeClass('kl-deleted-validation');
        });
        $('.kl-create-annonce').click(function(){
          $('.kl-classical-box-inscription').addClass('hide');
          $('.kl-social-inscription').removeClass('hide');
        });
        $('.kl-classique-inscription').click(function(){
            $('.kl-classical-box-inscription').removeClass('hide');
            $('.kl-social-inscription').addClass('hide');
        });
        $(window).scroll(function () {
          if($(window).scrollTop() >= 500){
              $('.kl-toTop').show();
          }else{
            $('.kl-toTop').hide();
          }
        });
        $('.kl-toTop').click(function(){
            $('html,body').animate({scrollTop : 0}, 'slow');
            return false;
        });
    });
    var date = new Date();
    date.setDate(date.getDate()-1);
    /*$('.datepicker-search').datetimepicker({
        language : 'fr',
        format : 'dd/mm/yyyy',
        startDate: date,
        minView: 2,
        maxView: 4,
        autoclose: true
    });*/
  $('.datepicker-search').datetimepicker({
    locale:'fr',
    format: 'DD/MM/YYYY',
    sideBySide: true
  });
    $('.kl-file-pro').change(function(){
        var fileVal = $('.kl-file-pro').val();
        $('.kl-file-design span').text(fileVal);
        $('.kl-file-design').css('background-image', 'none');
    });
    if($('.kl-suggestion-box ul li').is(':empty')){
        $(this).remove();
    }

    $("[data-toggle = 'tooltip']").tooltip();
    /*animation matches*/
    $( ".kl-img-match-one" ).animate({
        "left": "95"
    }, 1500 );
    $( ".kl-img-match-two" ).animate({
        "right": "95"
    }, 1500 );
   
}) (jQuery);