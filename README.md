# fModal plug-in
## ページ内にモーダルウィンドウを生成するためのjQueryプラグインです。
※透過背景には対応していません。

## 概要 / How it works

モーダルウィンドウ以外の通常コンテンツを非表示(display:none)にすると同時に、モーダルウィンドウを表示(display:block)させています。  
通常コンテンツとモーダルウィンドウの表示/非表示をスイッチしていると考えるとわかり易いかもしれません。  
ですので、よく目にするような”モーダルウィンドウの透過背景の下に通常コンテンツが見えている状態”というのは再現できません。  
一般的な方法として"position:fixed" や "z-index" を駆使すれば、上記で述べた透過背景にも対応することはできますが、如何せん不具合が多く実装の難易度が高くなりがちです。  
特にタッチデバイスにおいてのスクロール操作の不具合は、ユーザビリティを妨げる要因にもなり得ます。  
そこで、本プラグインですが、透過背景を諦める代わりに、操作性は通常コンテンツと全く同じそれを実現しています。

## 使用方法 / How to use

モーダル部分と、それ以外の通常コンテンツ（モーダル非表示時に表示されている）を同階層に配置し、それぞれ”modal_classname”と”page_classname”を付与してクラス分けをしてください。
1. 【jQuery本体の読み込み】jQuery本体をjquery.fModal.jsよりも前に記述してください。※jqueryに依存しているため、読み込み順を間違えると動きません。
2. 【jquery.fModal.jsプラグインの読み込み】下記の引数を使い、必要に応じて以下の3,4に従って書き換えてください。
3. 下記の引数class-name（○◯_classname）に則って、各要素にクラスを付与します。 **★必須** の部分は指定しないと正常に動作しません。
4. 下記の引数optionを利用状況によってお好みで変更を加えてください。  

### jquery.lazyload.jsと連動して画像の遅延読み込みする場合
本プラグインでは、画像の遅延読み込み機能をオプションで備えています。  
基本的にはクラスを付与するのみで動作しますが、ページの遷移時、開閉時に取得できるパラメータを利用することでより複雑な設定が可能です。

## 引数 / Parameters
★必須・・・設定しないと動かないので、必ず設定してください。  
★lazy・・・画像遅延読み込みとの連動オプションを使う場合、設定が必要となります。  
★lazy_multi・・・モーダル内でページ遷移をする場合、設定が必要となります。

```js

  $.fModal({

    // 機能のON/OFF、アニメーションの設定をすることができます。デフォルトは以下のようになっています。
    type: 'fade', //モーダルウィンドウ表示時のアニメーションタイプ。現バージョンでは`fade`のみです。
    position: 'fixed', //モーダルウィンドウのcssスタイル、'position'を設定できます。'fixed','absolute'の場合は、デフォルトで'top:0; left:0;'が設定されます。
    duration: 350, //モーダルウィンドウ表示時のアニメーションスピード。
    easing: 'swing', //モーダルウィンドウ表示時のアニメーションイージング。CSSアニメーションの場合は反映されず、`ease-in-out`が適応されます。
    innerScroll_duration: 450, //メニュー等でページ内移動する際、フェードアウトしながらスクロールを発生させることができ、そのアニメーションスピードを設定できます。
    innerScroll_offset: 0, //メニュー等でページ内移動する際、フェードアウトしながらスクロールを発生させることができ、その移動距離を設定できます。
    scroll_top: true, //モーダルウィンドウを毎回ページトップから表示するかどうか。
    velocity_js: true, //jQueryプラグイン版の`velocity.js`を導入している場合、`velocity.js`アニメーションの使用の可否を設定できます。
    css_animation: true, //CSS3の`transition`アニメーションが使用可能な場合、`transition`アニメーションの使用の可否を設定できます。
    lazy_load: false, //jQueryプラグイン`jquery.lazyload.js`を導入している場合、モーダル内画像を遅延読み込みするかを設定できます。★lazy

    // アクションの前後に実行したい関数を設定することができます。何もしない場合は記述不要です。
    // 関数にはパラメータが4つあり、`e`にはクリックイベント、`n`には現在のページ番号、`l`にはページの総数、`d`には各イベント発火毎に代入される値(openボタン => "open", closeボタン => "close", prevボタン => "prev", nextボタン => "next")が渡されています。
    before_open: function(e,n,l,d) {}, //モーダルウィンドウを表示する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_open: function(e,n,l,d) {}, //モーダルウィンドウを表示する直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    before_close: function(e,n,l,d) {}, //モーダルウィンドウを非表示にする直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    after_close: function(e,n,l,d) {}, //モーダルウィンドウを非表示にした直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。
    before_change: function(e,n,l,d) {}, //モーダル内でページ遷移する直前に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。★lazy_multi
    during_change: function(e,n,l,d) {}, //モーダル内でページ遷移した直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。★lazy_multi
    after_change: function(e,n,l,d) {}, //モーダル内でページ遷移し、コンテンツの表示が開始された直後に実行される関数です。パラメータ`e`にはクリックイベントが渡されています。★lazy_multi
    lazy_comp_before: function(e) {}, //画像の遅延読み込みが完了し、コンテンツが表示される直前に実行される関数です。 ★lazy_multi
    lazy_comp_after: function(e) {}, //画像の遅延読み込みが完了し、コンテンツが表示されるタイミングで実行される関数です。 ★lazy_multi

    // プラグイン内で設定されているクラス名を変更することができます。デフォルトで以下の各クラスが設定されていますので、それぞれ対象の要素に付与してください。
    open_classname: 'fModal-open', //モーダルウィンドウを表示するためにクリックする要素のクラス名を変更できます。 ★必須
    close_classname: 'fModal-close', //モーダルウィンドウを非表示にするためにクリックする要素のクラス名を変更できます。 ★必須
    page_classname: 'fModal-page', //通常のコンテンツを覆う要素のクラス名を変更できます。モーダル表示時には非表示となります。 ★必須
    modal_classname: 'fModal-modal', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。 ★必須
    modal_cont_classname: 'fModal-modal_cont', //モーダルウィンドウで表示するコンテンツを覆う要素のクラス名を変更できます。
    scroll_classname: 'fModal-innerScroll', //ページ内を縦移動するためのクラス名を変更することができます。href属性を指定することで、クリックでモーダルウィンドウが閉じ、href属性で指定した位置まで移動します。
    modal_cont_item_classname: 'fModal-modal_cont_item', // lazy-load対象をページごとにグループ分けするためのクラス名を変更することができます。この中のクラス名"fModal-lazy"を検索して全て表示し終えたのちmodal_cont_classnameが表示されます。lazy-loadを使用する場合は、必ずmodal_cont_classnameの中にこのmodal_cont_item_classnameを作ってその中にコンテンツを記述してください。★lazy
    lazy_classname: 'fModal-lazy', //遅延読み込み対象の画像に付与するクラス名を変更できます。※画像を覆う要素ではなくimgタグ自体にクラスを付与しないと動きません ★lazy
    load_classname: 'fModal-load', //モーダル内画像を遅延読み込みする場合、ロード時に表示するローディング画像（もしくはそれを覆う要素）のクラス名を変更できます。★lazy
    prev_classname: 'fModal-prev', //モーダル内でクリックすると前ページへ遷移する要素のクラス名を変更できます。★lazy_multi
    next_classname: 'fModal-next', //モーダル内でクリックすると次ページへ遷移する要素のクラス名を変更できます。★lazy_multi
    nav_classname: 'fModal-nav', //モーダル内でクリックするとボタンの順番と連動してページを遷移することができる要素のクラス名を変更できます。★lazy_multi
    swipe_classname: 'fModal-swipe', //タッチデバイスでスワイプするとページ遷移することができる要素のクラス名を変更できます。★lazy_multi

  });

```

## 使用例(画像遅延読み込みなし) / Example
```html

<body>
  <div class="fModal-page" style="background-color: #fff;">
    <h1>Normal Contents</h1>
    <p><a class="fModal-open" href="">MODAL OPEN</a></p>
    <p>This is normal contents.</p>
  </div>

  <div class="fModal-modal" style="background-color: #ff0;">
    <div class="fModal-modal_cont">
      <h2>Modal Contents</h2>
      <p><a class="fModal-close" href="#">MODAL CLOSE</a></p>
      <p>This is modal contents.</p>
    </div>
  </div>

  <!-- jquery読み込み -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
  <!-- プラグインファイル読み込み -->
  <script src="../jquery.fModal.js" type="text/javascript"></script>
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

<head>
    <link href="./assets/css/common.css" rel="stylesheet" type="text/css" />
    <link href="./assets/css/demo_lazy.css" rel="stylesheet" type="text/css" />
</head>

<body class="fModal-opened">
    <div class="fModal-page">
        <h1 class="page-ttl">Normal Contents</h1>
        <ul class="list-wrapper clear_fix">
            <li class="fModal-open">MODAL OPEN-1</li>
            <li class="fModal-open">MODAL OPEN-2</li>
            <li class="fModal-open">MODAL OPEN-3</li>
        </ul>
    </div>
    <div class="fModal-modal">
        <div class="fModal-load"><img class="loading" src="./assets/image/loading.gif" alt="" /></div>
        <div class="fModal-close">&times;</div>
        <div class="fModal-prev">&#60;</div>
        <div class="fModal-next">&#62;</div>
        <div class="fModal-modal_cont">
            <div class="fModal-modal_cont_item">
                <div class="fModal-swipe"><img class="fModal-lazy" data-original="./assets/image/img_1.jpg" alt="" />
                    <p class="lead">This is modal contents.</p>
                    <div class="paging"><span class="page-current"></span>/ <span class="page-length"></span></div>
                </div>
            </div>
            <div class="fModal-modal_cont_item">
                <div class="fModal-swipe"><img class="fModal-lazy" data-original="./assets/image/img_2.jpg" alt="" />
                    <p class="lead">This is modal contents.</p>
                    <div class="paging"><span class="page-current"></span>/ <span class="page-length"></span></div>
                </div>
            </div>
            <div class="fModal-modal_cont_item">
                <div class="fModal-swipe"><img class="fModal-lazy" data-original="./assets/image/img_3.jpg" alt="" />
                    <p class="lead">This is modal contents.</p>
                    <div class="paging"><span class="page-current"></span>/ <span class="page-length"></span></div>
                </div>
            </div>
        </div>
    </div>

    <!-- jquery読み込み -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
    <!-- velocity.js読み込み -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min.js"></script>
    <!-- プラグインファイル読み込み -->
    <script src="../libs/jquery.lazyload.js" type="text/javascript"></script>
    <script src="../jquery.fModal.js" type="text/javascript"></script>

    <!-- fModal用script記述 -->
    <script>
      $(function(){
        var page_length = $('.page-length'),
            page_current = $('.page-current');

        $.fModal({

          duration: 350,
          lazy_load: true,
          before_open: function(e,n,l,d) {
            page_length.html(l);
          },
          during_change: function(e,n,l,d) {
            page_current.html(n + 1);
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