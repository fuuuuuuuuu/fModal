# fModal plug-in
## ページ内にモーダルウィンドウを生成するためのjQueryプラグインです。
※透過背景には対応しておりません。

## 使用方法 / How to use

モーダル部分と、それ以外の（モーダル非表示時に表示されている）部分を同階層で分割してマークアップしてください。
1. 【jQuery本体の読み込み】まずjQuery本体をjquery.fModal.jsよりも前で読み込んでおきます。
2. 【jquery.fModal.jsプラグインの読み込み】下記の引数をコピペして $.fModal({...}); 内を以下の2,3に従って書き換えてください。
3. 下記の引数class-name（○◯_classname）に則って、各要素にクラスを付与します。 ★必須 の部分は指定しないと上手く動作しません。
4. 下記の引数optionを表示スピード等お好みで変更を加えます。

## 引数 / Parameters
```js

  $.fModal({

    // option

    type: 'fade', //モーダルウィンドウ表示時のアニメーションタイプ。現バージョンでは`fade`のみです。
    duration: 350, //モーダルウィンドウ表示時のアニメーションスピード。
    easing: 'swing', //モーダルウィンドウ表示時のアニメーションイージング。CSSアニメーションの場合は反映されず、`ease-in-out`が適応されます。
    scroll_top: true, //モーダルウィンドウを毎回ページトップから表示するかどうか。

    velocity_js: true, //jQueryプラグイン版の`velocity.js`を導入している場合、`velocity.js`アニメーションの使用の可否を設定できます。
    css_animation: true, //CSS3の`transition`アニメーションが使用可能な場合、`transition`アニメーションの使用の可否を設定できます。

    // function

    before_open: function(e) {}, //モーダルウィンドウを表示する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_open: function(e) {}, //モーダルウィンドウを表示する直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    before_close: function(e) {}, //モーダルウィンドウを非表示にする直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_close: function(e) {}, //モーダルウィンドウを非表示にする直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。

    // class-name

    open_classname: 'fModal-open', //モーダルウィンドウを表示するためにクリックする要素のクラス名を変更できます。 ★必須
    close_classname: 'fModal-close', //モーダルウィンドウを非表示にするためにクリックする要素のクラス名を変更できます。 ★必須
    page_classname: 'fModal-page', //通常のコンテンツを覆う要素のクラス名を変更できます。 ★必須
    modal_classname: 'fModal-modal', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。 ★必須
    modal_cont_classname: 'fModal-modal_cont', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
    opened_classname: 'fModal-body' //モーダルウィンドウが開いている時に`body`要素に付与されるクラス名を変更できます。 ★必須
  });

```

## 使用例 / Example
```html
<body class="fModal-opened">
  <div class="fModal-page">
    <h1>Normal Contents</h1>
    <p><a class="fModal-open" href="#">MODAL OPEN</a></p>
    <p>This is normal contents.</p>
  </div>

  <div class="fModal-modal">
    <div class="fModal-modal_cont">
      <h2>Modal Contents</h2>
      <p><a class="fModal-close" href="#">MODAL CLOSE</a></p>
      <p>This is modal contents.</p>
    </div>
  </div>

  <!-- jquery読み込み -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
  <!-- プラグインファイル読み込み -->
  <script src="jquery.fModal.js" type="text/javascript"></script>
  <!-- jquery.fModal.jsプラグイン読み込み -->
  <script>
  $(function() {
    $.fModal();
  });
  </script>
</body>
