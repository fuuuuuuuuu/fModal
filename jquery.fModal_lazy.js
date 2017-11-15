/*!
 * jQuery fModal_lazy v1.0
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

        lazy_flag: false,

        before_open: function(e) {},
        after_open: function(e) {},
        before_close: function(e) {},
        after_close: function(e) {},
        before_change: function(e) {},
        during_change: function(e) {},
        after_change: function(e) {},

        open_classname: 'fModal-open',
        close_classname: 'fModal-close',
        page_classname: 'fModal-page',
        modal_classname: 'fModal-modal',
        modal_cont_classname: 'fModal-modal_cont',
        modal_cont_item_classname: 'fModal-modal_cont_item',
        opened_classname: 'fModal-opened',
        load_classname: 'fModal-load',
        lazy_classname: 'fModal-lazy',
        prev_classname: 'fModal-prev',
        next_classname: 'fModal-next',
        nav_classname: 'fModal-nav',
        swipe_classname: 'fModal-swipe',
        scroll_classname: 'fModal-innerScroll',
      },

      params = $.extend({}, default_options, options),

      $opened = $('.' + params.opened_classname),
      $open = $('.' + params.open_classname),
      $modal = $('.' + params.modal_classname),
      $modal_cont = $('.' + params.modal_cont_classname),
      $modal_cont_item = $('.' + params.modal_cont_item_classname),
      $page = $('.' + params.page_classname),
      $close = $('.' + params.close_classname),
      $load = $('.' + params.load_classname),
      $lazy = $('.' + params.lazy_classname),
      $prev = $('.' + params.prev_classname),
      $next = $('.' + params.next_classname),
      $nav = $('.' + params.nav_classname),
      $swipe = $('.' + params.swipe_classname),
      $scroll = $('.' + params.scroll_classname),
      $scroll_class = ('.' + params.scroll_classname),

      topPosition,
      memoryPosition = [],

      open_timeout,
      animation_method = 'jquery_animate',

      lazy_count = 0,
      lazy_len = 0,
      item_now,
      item_length,
      page_flag = false,
      move_direction = 'top';

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

    function open(e,n,l,d) {

      topPosition = $(window).scrollTop();

      // スクロール用ポジション格納配列
      if($scroll.length){
        $scroll.each(function() {
          href = $(this).attr("href");
          target = $(href == "#" || href == "" ? 'html' : href);
          position = target.offset().top;
          memoryPosition.push(position);
        });
      }

      if (typeof params.before_open === 'function') {
        params.before_open(e,n,l,d);
      }

      if (params.lazy_flag) {
        page_flag = true;
        $modal_cont.css({
          'opacity': 0
        });
        setTimeout(function(){
          change(e);
        },300);
      } else{
        change(e);
      }

      $page.css({
        'opacity': 0,
      });

      // open関数実行部分
      setTimeout(function() {
        $page.css('display','none');

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

          open_timeout = setTimeout(function() {
            if (typeof params.after_open === 'function') {
              params.after_open(e,n,l,d);
            }
          }, params.duration + 16);
        }, 16);
      }, params.duration + 16);
    }

    function close(e,n,l,d) {
      if (typeof params.before_close === 'function') {
        params.before_close(e,n,l,d);
      }

      clearTimeout(open_timeout);

      setTimeout( function(){

        $opened.css({
          opacity: 0,
        });

        setTimeout( function(){

          $page.css({
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

              // スクロール用ポジション格納配列初期化
              memoryPosition.length = 0;

              $modal.css({
                display: 'none'
              });
              $opened.css({
                opacity: 1
              });

              if (typeof params.after_close === 'function') {
                params.after_close(e,n,l,d);
              }
            }, 16);
          }, 16);
        },params.duration + 16);
      }, 16);
    }

    function change(e,n,l,d) {
      var itemCurrent = $modal_cont_item.eq(item_now);

      d = move_direction;
      n = item_now;
      item_length = $modal_cont_item.length;
      l = item_length;

      if (typeof params.during_change === 'function') {
        params.during_change(e,n,l,d);
      }

      if(params.lazy_flag) {
        lazyLoad(e);
      }

      setTimeout(function(){
        $load.css({
          'opacity': 1,
          'display':'block'
        });

        setTimeout(function(){
          $(window).scrollTop(0);

          $modal_cont_item.not(itemCurrent).css({
              opacity: 0,
              zIndex: 0,
              'position': 'absolute'
            });

          itemCurrent
            .css({
              'z-index':'1',
              'opacity':'1',
              'position':'relative',
              'display': 'block'
            });

          // lazy = false の場合は自動的に表示する
          if(params.lazy_flag !== true) {
            $modal_cont.css('opacity',1);
          }

            setTimeout(function(){
              $modal_cont_item.not(itemCurrent).hide();

              if (typeof params.after_change === 'function') {
                params.after_change(e,n,l,d);
              }

              setTimeout(function(){
                page_flag = false;
              },(params.duration + 16)*2);

            },16);
        },params.duration + 16);
      },16);
    }

    function next(e,n,l,d) {
      if(page_flag) return;
      page_flag = true;

      move_direction = 'next';
      d = move_direction;
      n = item_now;
      item_length = $modal_cont_item.length;
      l = item_length;

      if (typeof params.before_change === 'function') {
        params.before_change(e,n,l,d);
      }

      setTimeout(function(){
        $modal_cont.css({
          opacity:0
        });
        setTimeout(function(){
          if( item_now >= $modal_cont_item.length -1){
            item_now = -1;
          }
          item_now++;
          change(e,n,l,d);
        },params.duration + 16);
      },16);
    }

    function prev(e,n,l,d) {
      if(page_flag) return;
      page_flag = true;

      move_direction = 'prev';
      d = move_direction;
      n = item_now;
      item_length = $modal_cont_item.length;
      l = item_length;


      if (typeof params.before_change === 'function') {
        params.before_change(e,n,l,d);
      }

      setTimeout(function(){
        $modal_cont.css({
          opacity:0
        });
        setTimeout(function(){
          if( item_now === 0){
            item_now = $modal_cont_item.length;
          }
          item_now--;
          change(e,n,l,d);
        },params.duration + 16);
      },16);
    }

    function nav(e,n,l,d) {

      if(page_flag) return;
      page_flag = true;

      if(item_reserve_now < item_now){
        move_direction = 'prev';
        fModal_move = move_direction;
      } else if(item_reserve_now > item_now){
        move_direction = 'next';
        fModal_move = move_direction;
      } else if(item_reserve_now === item_now){
        page_flag = false;
        return;
      }
      item_now = item_reserve_now;
      fModal_itemCurrent = item_now;

      if (typeof params.before_change === 'function') {
        params.before_change(e);
      }

      setTimeout(function(){
        $modal_cont.css({
          opacity:0
        });
        setTimeout(function(){
          change(e,n,l,d);
        },params.duration + 16);
      },16);
    }

    function lazyLoad(e) {

      var lazy_delayTime = 0;

      setTimeout(function(){
        lazy_count = 0;
        lazy_len = $modal_cont_item.eq(item_now).find($lazy).length;

        // 画像遅延トリガー
        var itemCurrent = $modal_cont_item.eq(item_now);
        itemCurrent.find('img').trigger('imagesLoad');
      },lazy_delayTime);

      // lazyload
      $modal_cont_item.eq(item_now).find($lazy).lazyload({
        event: 'imagesLoad',
        load: function(e){
          lazy_count++;

          if(lazy_count >= lazy_len){
            setTimeout(function(){
              $load.css({
                'opacity': 0
              });
              setTimeout(function(){
                $modal_cont.css({
                  'opacity': 1
                });
              }, 16);
            },(params.duration + 300));
          }
        }
      });
    }

    var init = (function() {
      // Open and Close Event
      $open.on('click.fModal', function(e,n,l,d) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        // グローバル変数 fModal_itemCurrent and fModal_itemLength and fModal_move
        item_now = $open.index(this);
        n = item_now;
        item_length = $modal_cont_item.length;
        l = item_length;
        move_direction = 'open';
        d = move_direction;

        open(e,n,l,d);

      });
      $close.on('click.fModal', function(e,n,l,d) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        item_now = $close.index(this);
        n = item_now;
        item_length = $modal_cont_item.length;
        l = item_length;
        // グローバル変数 fModal_move
        move_direction = 'close';
        d = move_direction;

        close(e,n,l,d);
      });

      // Prev and Next Event
      $prev.on('click.fModal', function(e,n,l,d) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        prev(e,n,l,d);
      });
      $next.on('click.fModal', function(e,n,l,d) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        next(e,n,l,d);
      });

      // Nav Event
      $nav.on('click.fModal', function(e,n,l,d) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        item_reserve_now = $nav.index(this);
        nav(e,n,l,d);
      });

      var start = [],
          delta = [];

      $swipe
        .on('touchstart.fModal', function(e) {
          var x = (e.changedTouches ? e.changedTouches[0].pageX : e.originalEvent.changedTouches[0].pageX),
              y = (e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY);

          start = [x, y];
        })
        .on('touchmove.fModal', function(e) {
          var x = (e.changedTouches ? e.changedTouches[0].pageX : e.originalEvent.changedTouches[0].pageX),
              y = (e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY);

          delta = [x - start[0], y - start[1]];

          if(Math.abs(delta[0]) > 50 && Math.abs(delta[1]) < 50) {
            e.preventDefault();
          }
        })
        .on('touchend.fModal', function(e) {
          if(delta[0] > 50) {
            prev(e);
          } else if(delta[0] < -50) {
            next(e);
          }
          delta[0] = 0;
          delta[1] = 0;
        });


      $page
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      $opened
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      $modal_cont
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      $load
        .css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out',
          opacity: 0,
          display: 'none'
        });

      // Set CSS
      $modal.css({
        opacity: 0,
        display: 'none',
        zIndex: '9000',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
      });

      if(animation_method === 'css_transition') {
        $modal.css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      }

      $modal.find($scroll_class).on('click.fModal', function(e) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        scroll_num = $modal_cont.find($scroll_class).index(this);
        topPosition = memoryPosition[scroll_num];
        close(e);
      });

    }());
  };
}(jQuery));