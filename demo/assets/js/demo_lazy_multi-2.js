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
    before_open: function(e) {
      page_length.html(fModal_itemLength);
    },
    after_open: function(e) {},
    before_close: function(e) {},
    after_close: function(e) {},

    // for lazy-load
    lazy_flag: true,
    // for lazy-load (When using multiple pages)
    before_change: function(e) {},
    during_change: function(e) {
      page_current.html(fModal_itemCurrent + 1);
    },
    after_change: function(e) {},

  });
})