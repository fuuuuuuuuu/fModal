# fModal plug-in　β版
## ページ内にモーダルウィンドウを生成するためのjQueryプラグインです。
※透過背景には対応していません。

## 概要 / How it works

モーダルウィンドウ以外の通常コンテンツを非表示(display:none)にすると同時に、モーダルウィンドウを表示(display:block)させています。  
通常コンテンツとモーダルコンテンツの表示/非表示をスイッチしていると考えるとわかり易いかもしれません。  
ですので、よく目にする”モーダルウィンドウの透過背景の下に通常コンテンツが見えている状態”というのは再現できません。  
一般的な方法として"position:fixed" や "z-index" を駆使すれば、上記で述べた透過背景にも対応することはできますが、如何せん不具合が多く実装の難易度が高くなりがちです。  
特にタッチデバイスにおいてのスクロール操作の不具合は、ユーザビリティを妨げる要因にもなり得ます。  
そこで、本プラグインですが、透過背景を諦める代わりに、操作性は通常コンテンツと全く同じそれを実現しています。  
どうしても透過背景が必要な場合を除いて、ユーザーの操作性を重視するなら本プラグインを試してみることをおすすめします。

## 使用方法 / How to use

モーダル部分と、それ以外の通常コンテンツ（モーダル非表示時に表示されている）をそれぞれ同階層で”modal_classname”と”page_classname”を付与してクラス分けをしてください。
1. 【jQuery本体の読み込み】jQuery本体をjquery.fModal.jsよりも前に読み込んでおきます。
2. 【jquery.fModal.jsプラグインの読み込み】下記の引数を使い、必要に応じて以下の3,4に従って書き換えてください。
3. 下記の引数class-name（○◯_classname）に則って、各要素にクラスを付与します。 **★必須** の部分は指定しないと正常に動作しません。
4. 下記の引数optionを利用状況によってお好みで変更を加えてください。  

### jquery.lazyload.jsと連動して画像の遅延読み込みする場合
本プラグインでは、画像の遅延読み込み機能をオプションで備えています。  
この機能を利用するには、"jquery.fModal.js"のlazy-load対応版"jquery.fModal_lazy.js"を読み込んでください。  
機能を利用しない場合は、よりシンプルで軽量な"jquery.fModal.js"をお使いください。  
基本的にはクラスを付与するのみで動作しますが、ページの遷移時、開閉時に取得できる変数を利用することでより複雑な設定が可能です。
demoフォルダ内の”demo_lazy_multi.html”は変数を利用して状況別に動きをつけています。


## 引数 / Parameters
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
    after_close: function(e) {}, //モーダルウィンドウを非表示にした直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。

    // for lazy-load (When using multiple pages)
    before_change: function(e) {}, //モーダル内でページ遷移する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    during_change: function(e) {}, //モーダル内でページ遷移した直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_change: function(e) {}, //モーダル内でページ遷移し、コンテンツの表示が開始された直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。


    lazy_flag: false, //jQueryプラグイン`jquery.lazyload.js`を導入している場合、モーダル内画像を遅延読み込みするかを設定できます。

    open_classname: 'fModal-open', //モーダルウィンドウを表示するためにクリックする要素のクラス名を変更できます。 ★必須
    close_classname: 'fModal-close', //モーダルウィンドウを非表示にするためにクリックする要素のクラス名を変更できます。 ★必須
    page_classname: 'fModal-page', //通常のコンテンツを覆う要素のクラス名を変更できます。モーダル表示時には非表示となります。 ★必須
    modal_classname: 'fModal-modal', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。 ★必須
    modal_cont_classname: 'fModal-modal_cont', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
    opened_classname: 'fModal-body', //モーダルウィンドウが開いている時に`body`要素に付与されるクラス名を変更できます。
                      //モーダルを閉じる時に、body要素を一時的にopacity:0;にする必要があるので必ず付与してください。 ★必須

    modal_cont_item_classname: 'fModal-modal_cont_item', // lazy-load対象をページごとにグループ分けするためのクラスです。この中のクラス名"fModal-lazy"を検索して全て表示し終えたのちmodal_cont_classnameが表示されます。lazy-loadを使用する場合は、必ずmodal_cont_classnameの中にこのmodal_cont_item_classnameを作ってその中にコンテンツを記述してください。
    lazy_classname: 'fModal-lazy', //遅延読み込み対象の画像に付与するクラス名を変更できます。
    load_classname: 'fModal-load', //モーダル内画像を遅延読み込みする場合、ロード時に表示するローディング画像（もしくはそれを覆う要素）のクラス名を変更できます。
    prev_classname: 'fModal-prev', //モーダル内でクリックすると前ページへ遷移する要素のクラス名を変更できます。
    next_classname: 'fModal-next', //モーダル内でクリックすると次ページへ遷移する要素のクラス名を変更できます。

  });

  // ページ番号、ページ数を受け取る
  // fModal_itemCurrent  = 表示中のページ番号を取得できる変数です。※変数名変更不可
  // fModal_itemLength = ページの総数を取得できる変数です。※変数名変更不可
  // fModal_move = ページ遷移ボタンもしくは開閉ボタンをクリックする度にそれぞれ次の値が入ります。
                 //openボタン => "open", closeボタン => "close", prevボタン => "prev", nextボタン => "next" ※変数名変更不可


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
  <!-- jquery.fModal_lazy.jsプラグイン読み込み -->
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
    <div class="fModal-load" style="position: fixed; top: 50%; width: 100%;"><img class="loading" src="image/loading.gif" alt="" style="width: 40px; margin-top: -20px;"/></div>
    <div class="fModal-prev" style="position: fixed; top: 48%; left: 5%; font-size: 30px; z-index: 10; cursor: pointer;">&#60;</div>
    <div class="fModal-next" style="position: fixed; top: 48%; right: 5%; font-size: 30px; z-index: 10; cursor: pointer;">&#62;</div>

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

      <div class="paging"><span class="page-current"></span> / <span class="page-length"></span></div>
    </div>
  </div>

  <!-- jquery読み込み -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
  <!-- velocity.js読み込み -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min.js"></script>
  <!-- プラグインファイル読み込み -->
  <script src="../libs/jquery.lazyload.js" type="text/javascript"></script>
  <script src="../jquery.fModal_lazy.js" type="text/javascript"></script>
  <!-- jquery.fModal.jsプラグイン読み込み -->
  <script>
    $(function() {
      var page_current = $('.page-current'),
          page_length = $('.page-length');
      $.fModal({
        easing: 'easeInOutSine',
        lazy_flag: true,
        before_open: function(e){
          page_length.html(fModal_itemLength);
        },
        before_change: function(e) {
          page_current.html(fModal_itemCurrent + 1);
        },
      });
    });
  </script>
</body>

```

## 遅延読み込みについて / about-Lazyload

使用するプラグイン --> https://github.com/tuupola/jquery_lazyload/blob/1.x/jquery.lazyload.js  
使用方法についてはこちらに詳しく書かれていますが、本プラグインでは特別な理由がない限り別途書き足す必要はないかと思います。 --> http://cly7796.net/wp/javascript/plugin-jquery-lazyload/
### 連動の仕組み
各modal_cont_item_classnameを１グループとし、その中にある遅延読み込み画像(class="fModal-lazy",src-->data-original)の数を取得し、その数だけ読み込みが完了したのち、modal_cont_item_classnameをフェードインさせています。  
ですので、表示ページごとにmodal_cont_item_classnameで覆ってグループ分けする必要があります。