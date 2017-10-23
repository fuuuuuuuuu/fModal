# fModal plug-in
## ページ内にモーダルウィンドウを生成するためのjQueryプラグインです。
※透過背景には対応していません。

## 使用方法 / How to use

モーダル部分と、それ以外の（モーダル非表示時に表示されている）部分を同階層で分割してマークアップしてください。
1. 【jQuery本体の読み込み】jQuery本体をjquery.fModal.jsよりも前に読み込んでおきます。
2. 【jquery.fModal.jsプラグインの読み込み】下記の引数をコピペして $.fModal({...}); 内を以下の2,3に従って書き換えてください。
3. 下記の引数class-name（○◯_classname）に則って、各要素にクラスを付与します。 **★必須** の部分は指定しないと上手く動作しません。
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
    after_close: function(e) {}, //モーダルウィンドウを非表示にした直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    // class-name
    open_classname: 'fModal-open', //モーダルウィンドウを表示するためにクリックする要素のクラス名を変更できます。 **★必須**
    close_classname: 'fModal-close', //モーダルウィンドウを非表示にするためにクリックする要素のクラス名を変更できます。 **★必須**
    page_classname: 'fModal-page', //通常のコンテンツを覆う要素のクラス名を変更できます。モーダル表示時には非表示となります。 **★必須**
    modal_classname: 'fModal-modal', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。 **★必須**
    modal_cont_classname: 'fModal-modal_cont', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
    opened_classname: 'fModal-body' //モーダルウィンドウが開いている時に`body`要素に付与されるクラス名を変更できます。モーダルを閉じる時に、body要素をopacity:0;にする必要があるので必ず付与してください。 **★必須**


    // for lazy-load
    lazy_flag: false, //jQueryプラグイン`jquery.lazyload.js`を導入している場合、モーダル内画像を遅延読み込みするかを設定できます。
    load_classname: 'fModal-load' //モーダル内画像を遅延読み込みする場合、ロード時に表示するローディング画像（もしくはそれを覆う要素）のクラス名を変更できます。
    lazy_classname: 'fModal-lazy' //遅延読み込み対象の画像に付与するクラス名を変更できます。

    // for lazy-load-multi
    fModal_currentItem: ページ番号変数です。※変数名変更不可
    fModal_itemLength: ページの総数を返す変数です。※変数名変更不可
    before_change: function(e) {}, // モーダル内でページ遷移する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_change: function(e) {}, // モーダル内でページ遷移した直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    prev_classname: 'fModal-prev'
    next_classname: 'fModal-next'

  });

```

## 使用例(画像遅延読み込みなし) / Example
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

```

## 使用例(画像遅延読み込みあり) / Example for lazy-load
```html

<body class="fModal-opened">
  <div class="fModal-page">
    <h1>Normal Contents</h1>
    <p><a class="fModal-open" href="#">MODAL OPEN-1</a></p>
    <p><a class="fModal-open" href="#">MODAL OPEN-2</a></p>
    <p><a class="fModal-open" href="#">MODAL OPEN-3</a></p>
    <p>This is normal contents.</p>
  </div>

  <div class="fModal-modal" style="text-align: center;">
    <div class="fModal-load" style="position: absolute; top: 50%; width: 100%;"><img class="loading" src="image/loading.gif" alt="" style="width: 40px; margin-top: -20px;"/></div>
    <div class="fModal-prev" style="position: absolute; top: 48%; left: 5%; font-size: 30px; z-index: 10; cursor: pointer;">&#60;</div>
    <div class="fModal-next" style="position: absolute; top: 48%; right: 5%; font-size: 30px; z-index: 10; cursor: pointer;">&#62;</div>

    <div class="fModal-modal_cont">
      <div class="fModal-modal_cont_item">
        <p><a class="fModal-close" href="#">MODAL CLOSE-1</a></p>
        <div><img class="fModal-lazy" data-original="image/img_1.jpg" alt="" /></div>
        <p>This is modal contents.</p>
      </div>
      <div class="fModal-modal_cont_item">
        <p><a class="fModal-close" href="#">MODAL CLOSE-2</a></p>
        <div><img class="fModal-lazy" data-original="image/img_2.jpg" alt="" /></div>
        <p>This is modal contents.</p>
      </div>
      <div class="fModal-modal_cont_item">
        <p><a class="fModal-close" href="#">MODAL CLOSE-3</a></p>
        <div><img class="fModal-lazy" data-original="image/img_3.jpg" alt="" /></div>
        <p>This is modal contents.</p>
      </div>
    </div>
  </div>

  <!-- jquery読み込み -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
  <!-- プラグインファイル読み込み -->
  <script src="../libs/jquery.lazyload.js" type="text/javascript"></script>
  <script src="../jquery.fModal_lazy.js" type="text/javascript"></script>
  <!-- jquery.fModal.jsプラグイン読み込み -->
  <script>
    $(function() {
      $.fModal({
        lazy_flag: true,
      });
    });
  </script>
</body>

```

## 遅延読み込みについて / about-Lazyload
使用するプラグイン --> https://github.com/tuupola/jquery_lazyload  
使用方法についてはこちらに詳しく書かれています --> http://cly7796.net/wp/javascript/plugin-jquery-lazyload/
### 連動の仕組み
modal_cont_classname単位で、その中にある遅延読み込み画像(class="fModal-lazy",src-->data-original)の数を取得し、その数だけ読み込みが完了したのち、modal_cont_classnameをフェードインさせています。  
ですので、ページタイプのコンテンツであれば表示ページごとにmodal_cont_classnameで覆って分ける必要があります。