# fModal plug-in
## ページ内にモーダルウィンドウを生成するためのjQueryプラグインです。
## ※透過背景には対応しておりません。

$.fModal({
  type: 'fade', //モーダルウィンドウ表示時のアニメーションタイプ。現バージョンでは`fade`のみです。
  duration: 350, //モーダルウィンドウ表示時のアニメーションスピード。
  easing: 'swing', //モーダルウィンドウ表示時のアニメーションイージング。CSSアニメーションの場合は反映されず、`ease-in-out`が適応されます。
  scroll_top: true, //モーダルウィンドウを毎回ページトップから表示するかどうか。

  velocity_js: true, //jQueryプラグイン版の`velocity.js`を導入している場合、`velocity.js`アニメーションの使用の可否を設定できます。
  css_animation: true, //CSS3の`transition`アニメーションが使用可能な場合、`transition`アニメーションの使用の可否を設定できます。

  before_open: function(e) {}, //モーダルウィンドウを表示する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
  after_open: function(e) {}, //モーダルウィンドウを表示する直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
  before_close: function(e) {}, //モーダルウィンドウを非表示にする直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
  after_close: function(e) {}, //モーダルウィンドウを非表示にする直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。

  open_classname: 'fModal-open', //モーダルウィンドウを表示するためにクリックする要素のクラス名を変更できます。
  close_classname: 'fModal-close', //モーダルウィンドウを非表示にするためにクリックする要素のクラス名を変更できます。
  page_classname: 'fModal-page', //通常のコンテンツを覆う要素のクラス名を変更できます。
  modal_classname: 'fModal-modal', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
  modal_cont_classname: 'fModal-modal_cont', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
  opened_classname: 'fModal-opened' //モーダルウィンドウが開いている時に`body`要素に付与されるクラス名を変更できます。
});