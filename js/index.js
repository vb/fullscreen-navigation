(function($) {
  
  var ptr = false;
  var lastTouchY = 0;
  
  if ( $(window).height() < $('html').height() ) {
    $('html').addClass('scrollbar');
  }

  $('.navigation-btn').on('click touch', function(e) {
    e.preventDefault();

    var nav = $('.navigation'),
        doc = $('html'),
        content = $('.content'),
        btn = $('.navigation-btn'),
        y = $(window).scrollTop();
    
    $('meta[name=theme-color], meta[name=viewport]').remove();


    if ( nav.hasClass('navigation--open') ) {
      // Close navigation  
      
      nav.removeClass('navigation--open');
      btn.removeClass('menu-button--active');
      doc.removeClass('has-navigation-open');
      
      $('head').append('<meta name="viewport" content="initial-scale=1, maximum-scale=1"><meta name="theme-color" content="#000000">');
      
      $('.navigation').attr('aria-hidden', 'true');
      $('.navigation--open a').attr('tabindex', '-1');

      content.removeAttr('style');
      $(window).scrollTop( content.attr('data-y') );

    }else{
      // Open navigation
      
      nav.addClass('navigation--open');
      btn.addClass('menu-button--active');
      doc.addClass('has-navigation-open');
      
      $('head').append('<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no"><meta name="theme-color" content="#91AA9D">');
      
      $('.navigation').attr('aria-hidden', 'false');
      $('.navigation--open a').removeAttr('tabindex').first().focus();
      
      content
        .css({
          '-webkit-transform': 'translateY(-' + y + 'px)',
          '-ms-transform': 'translateY(-' + y + 'px)',
          'transform': 'translateY(-' + y + 'px)'
        })
        .attr('data-y', y);

    }

  });

  $(document).on('touchstart', function(e) {

    if (e.originalEvent.touches.length !== 1 || !$('.navigation').hasClass('navigation--open') ){
      return;
    }

    lastTouchY = e.originalEvent.touches[0].clientY;
    ptr = window.pageYOffset === 0;

  });

  $(document).on('touchmove', function(e) {

    if( !$('.navigation').hasClass('navigation--open') ) return;

    var touchY = e.originalEvent.touches[0].clientY;
    var touchYDelta = touchY - lastTouchY;
    lastTouchY = touchY;

    if (ptr) {

      ptr = false;

      if (touchYDelta > 0) {
        e.preventDefault();
        return;
      }

    }

    if (window.pageYOffset === 0 && touchYDelta > 0) {
      e.preventDefault();
      return;
    }

  });
  
  $(document).keyup(function(e) {

    if (e.keyCode === 27 && $('.navigation').hasClass('navigation--open')) {
      $('.navigation').removeClass('navigation--open');
      $('html').removeClass('has-navigation-open');
    }

  });

})(jQuery);