/*!
 * jQuery fModal v1.0
 * Copyright 2017 maam.inc
 * Contributing Author: Yusuke Fukunaga
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fModal = function(options) {
    var default_options = {
        type: 'fade',
        scroll_top: true,
        duration: 260,
        easing: 'swing',

        velocity_js: true,
        css_animation: true,

        before_open: function(e) {},
        after_open: function(e) {},
        before_close: function(e) {},
        after_close: function(e) {},

        open_classname: 'fModal-open',
        close_classname: 'fModal-close',
        page_classname: 'fModal-page',
        modal_classname: 'fModal-modal',
        modal_cont_classname: 'fModal-modal_cont',
        opened_classname: 'fModal-opened',
        body_classname: 'fModal-body',
      },

      params = $.extend({}, default_options, options),

      $opened = $('.' + params.opened_classname),
      $open = $('.' + params.open_classname),
      $modal = $('.' + params.modal_classname),
      $modal_cont = $('.' + params.modal_cont_classname),
      $page = $('.' + params.page_classname),
      $close = $('.' + params.close_classname),
      $body = $('.' + params.body_classname),

      topPosition,

      open_timeout,
      animation_method = 'jquery_animate';

    //animation_methodの決定
    if(params.velocity_js === true && typeof $.fn.velocity !== 'undefined') {
      animation_method = 'velocity';

    } else if(params.css_animation === true) {
      (function() {
        var div = document.createElement('div'),
          prop = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition'],
          i;

        for (i = 0; i < prop.length; i++) {
          if (prop[i] in div.style) {
            animation_method = 'css_transition';
            break;
          }
        }
      }());
    }

    function open(e) {

      topPosition = $(window).scrollTop();

      // もし「before_open関数」に記述があれば実行
      if (typeof params.before_open === 'function') {
        params.before_open(e);
      }

      $opened.css({
        'opacity': 0,
      });

      // open関数実行部分
      setTimeout(function() {
        $opened.css('display','none');

        $modal.css({
          display: 'block',
        });

        if (params.scroll_top) {
          $(window).scrollTop(0);
        }

        setTimeout(function() {
          switch(animation_method) {
            case 'velocity':
              $modal.velocity({
                opacity: 1
              },{
                duration: params.duration,
                easing: params.easing
              });

            break;
            case 'css_transition':
              $modal.css({
                opacity: 1
              });
              break;
            case 'jquery_animate':
              $modal.animate({
                opacity: 1
              },{
                duration: params.duration,
                easing: params.easing
              });
            break;
          }

          // もし「after_open関数」に記述があれば実行
          open_timeout = setTimeout(function() {
            if (typeof params.after_open === 'function') {
              params.after_open(e);
            }
          }, params.duration + 16);
        }, 16);
      }, params.duration + 16);
    }

    function close(e) {
      if (typeof params.before_close === 'function') {
        params.before_close(e);
      }

      clearTimeout(open_timeout);

      setTimeout( function(){

        $body.css({
          opacity: 0,
        });

        setTimeout( function(){

          $opened.css({
            display: 'block',
            opacity: 1
          });

          setTimeout(function() {
            $(window).scrollTop(topPosition);

            switch(animation_method) {
              case 'velocity':
                $modal.velocity({
                  opacity: 0
                },{
                  duration: params.duration,
                  easing: params.easing
                });

              break;
              case 'css_transition':
                $modal.css({
                  opacity: 0
                });
                break;
              case 'jquery_animate':
                $modal.animate({
                  opacity: 0
                },{
                  duration: params.duration,
                  easing: params.easing
                });
              break;
            }

            setTimeout(function() {
              $modal.css({
                display: 'none'
              });
              $body.css({
                opacity: 1
              });

              if (typeof params.after_close === 'function') {
                params.after_close(e);
              }
            }, 16);
          }, 16);
        },params.duration + 16);
      }, 16);
    }

    var init = (function() {
      // Open and Close Event
      $open.on('click.fModal', function(e) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        open(e);
      });
      $close.on('click.fModal', function(e) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        close(e);
      });

      $opened
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      $body
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });

      // Set CSS
      $modal.css({
        opacity: 0,
        display: 'none',
        zIndex: '9000',
        position: 'absolute', // 要らんかも?
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      });

      if(animation_method === 'css_transition') {
        $modal.css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      }

    }());
  };
}(jQuery));
