$(function(){
  var page_length = $('.page-length'),
      page_current = $('.page-current');

  $.fModal({

    type: 'fade',
    duration: 350,
    easing: 'swing',
    scroll_top: true,
    velocity_js: true,
    css_animation: true,
    before_open: function(e,n,l,d) {
      page_length.html(l);
    },
    after_open: function(e,n,l,d) {
    },
    before_close: function(e,n,l,d) {},
    after_close: function(e,n,l,d) {},

    // for lazy-load
    lazy_flag: true,
    // for lazy-load (When using multiple pages)
    before_change: function(e,n,l,d) {},
    during_change: function(e,n,l,d) {
      page_current.html(n + 1);
    },
    after_change: function(e,n,l,d) {},

  });
});