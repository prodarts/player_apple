/* 生成されたJavaScriptコード */
document.addEventListener('DOMContentLoaded', () => {

  // 画像ギャラリーの横スクロール機能
  const track = document.getElementById('gallery-track');
  const leftArrow = document.getElementById('gallery-left');
  const rightArrow = document.getElementById('gallery-right');

  // 要素が存在するか確認してからイベントリスナーを設定
  if (track && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      // 画像1枚分の幅(200px) + margin(15px) = 215px に調整しても良い
      // あるいは、track.clientWidth で現在のトラックの表示幅を取得し、その約90%をスクロール量とする
      track.scrollBy({ left: -215, behavior: 'smooth' }); // 左にスクロール
    });

    rightArrow.addEventListener('click', () => {
      // 画像1枚分の幅(200px) + margin(15px) = 215px に調整しても良い
      // あるいは、track.clientWidth で現在のトラックの表示幅を取得し、その約90%をスクロール量とする
      track.scrollBy({ left: 215, behavior: 'smooth' }); // 右にスクロール
    });
  }

  // ***** ここから新しいアニメーション機能の追加 *****
  // アニメーションさせたいすべての要素を取得
  const fadeInElements = document.querySelectorAll('.fade-in-item');

  // Intersection Observer の設定
  const options = {
    root: null, // ビューポートをルート(基準)とする
    rootMargin: '0px', // ルートのマージン(今回はなし)
    threshold: 0.1 // 要素が10%でも見えたらコールバック関数を実行
  };

  // Intersection Observer のインスタンスを作成
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // 要素がビューポートに入った場合
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); // 'is-visible' クラスを追加してアニメーションを開始
        observer.unobserve(entry.target); // 一度アニメーションしたら監視を解除(繰り返しアニメーションさせないため)
      }
    });
  }, options);

  // 各要素を監視対象に追加
  fadeInElements.forEach(element => {
    observer.observe(element);
  });
  // ***** 新しいアニメーション機能の追加はここまで *****
});

// お問い合わせテンプレートをコピーする機能
function copyContactTemplate() {
  const contactTemplate = document.getElementById('contact-template');
  const copyAlert = document.getElementById('copy-alert');

  // テキストエリアのテキストを選択し、クリップボードにコピー
  contactTemplate.select();
  contactTemplate.setSelectionRange(0, 99999); // モバイルデバイス用

  // navigator.clipboard API を優先(より新しいブラウザで推奨)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(contactTemplate.value).then(() => {
      copyAlert.style.display = 'block';
      setTimeout(() => {
        copyAlert.style.display = 'none';
      }, 1700); // 1.7秒後に非表示
    }).catch(err => {
      // フォールバック (execCommand)
      console.error('クリップボードへの書き込みに失敗しました:', err);
      try {
        document.execCommand('copy');
        copyAlert.style.display = 'block';
        setTimeout(() => {
          copyAlert.style.display = 'none';
        }, 1700);
      } catch (errExec) {
        console.error('execCommandでのコピーにも失敗しました:', errExec);
        alert('コピーに失敗しました。お手数ですが手動でコピーしてください。');
      }
    });
  } else {
    // navigator.clipboard がサポートされていない場合のフォールバック
    try {
      document.execCommand('copy');
      copyAlert.style.display = 'block';
      setTimeout(() => {
        copyAlert.style.display = 'none';
      }, 1700);
    } catch (errExec) {
      console.error('execCommandでのコピーにも失敗しました:', errExec);
      alert('コピーに失敗しました。お手数ですが手動でコピーしてください。');
    }
  }
}