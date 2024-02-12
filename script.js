/* ファイルアップロード */
// ドラッグ&ドロップエリアの取得
var fileArea = document.getElementById('dropArea');

// input[type=file]の取得
var fileInput = document.getElementById('uploadFile');

var reader = new FileReader();

// ドラッグオーバー時の処理
fileArea.addEventListener('dragover', function(e){
    e.preventDefault();
    fileArea.classList.add('dragover');
});

// ドラッグアウト時の処理
fileArea.addEventListener('dragleave', function(e){
    e.preventDefault();
    fileArea.classList.remove('dragover');
});

// ドロップ時の処理
fileArea.addEventListener('drop', function(e){
    e.preventDefault();
    fileArea.classList.remove('dragover');

    // ドロップしたファイルの取得
    const files = e.dataTransfer.files;

    // 取得したファイルをinput[type=file]へ
    fileInput.files = files;
    
    if(typeof files[0] !== 'undefined') {
        //ファイルが正常に受け取れた際の処理
        reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
    } else {
        //ファイルが受け取れなかった際の処理
    }
});

// input[type=file]に変更があれば実行
// もちろんドロップ以外でも発火します
fileInput.addEventListener('change', function(e){
    var file = e.target.files[0];
    
    if(typeof e.target.files[0] !== 'undefined') {
        // ファイルが正常に受け取れた際の処理
        reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
    } else {
        // ファイルが受け取れなかった際の処理
    }
}, false);

window.addEventListener('DOMContentLoaded', function(){

  // ファイルが選択されたら実行
  document.getElementById("uploadFile").addEventListener('change', function(e){

    let file_reader = new FileReader();

    file_reader.addEventListener('load', function(e) {
  
      // img要素を作成
      let img_element = document.createElement('img');
      img_element.src = e.target.result;
      img_element.alt = "Fox";
  
      // img要素をページに挿入
      let article_element = document.getElementById('preview');
      article_element.append(img_element);
    });
  
    // ファイル内容をBase64にエンコードし、「data:〜」で始まるURL形式で取得
    file_reader.readAsDataURL(e.target.files[0]);
  });
});

/* モーダル表示 */
//初回のみモーダルをすぐ出す判定。flagがモーダル表示のstart_open後に代入される
var access = $.cookie('access')
if(!access){
  flag = true;
  $.cookie('access', false);
}else{
  flag = false  
}

//モーダル表示
$(".modal-open").modaal({
start_open:flag, // ページロード時に表示するか
overlay_close:true,//モーダル背景クリック時に閉じるか
before_open:function(){// モーダルが開く前に行う動作
  $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
},
after_close:function(){// モーダルが閉じた後に行う動作
  $('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
}
});

// JSONへ変換
let jsonData = JSON.stringify(faceAnnotations);
//console.log(jsonData); */

  // JavaScriptオブジェクトへ変換
async function fetchFunc() {
    try {
        const res = await fetch("https://us-central1-hackathon-413901.cloudfunctions.net/FaceDetection");
        if (!res.ok) {
            throw new Error("fetchに失敗しました");
        }
        const objData = await res.json();
        console.log(data);

        //console.log(objData);

        // プロパティにアクセス
        //let getEmotion = objData.faceAnnotations[0];
        //console.log(getEmotion.joyLikelihood); // "田中太郎"

        // 配列にJSONの内容を取得
        let faceArray = [];
        // objData[0]の中身のプロパティをfor文で反復処理
        for (let key in objData.faceAnnotations[0]) {
            if (objData.faceAnnotations[0].hasOwnProperty(key)) {
                let emote = key
                let rank = objData.faceAnnotations[0][key]
                if(emote.includes("hood")){
                    switch(rank){
                        case "VERY_LIKELY":
                            faceArray.push("☆☆☆☆☆")
                            break;
                        case "LIKELY":
                            faceArray.push("☆☆☆☆")
                            break;
                        case "POSSIBLE":
                            faceArray.push("☆☆☆")
                            break;
                        case "UNLIKELY":
                            faceArray.push("☆☆")
                            break;
                        case "VERY_UNLIKELY":
                            faceArray.push("☆")
                            break;
                    }
                }
            //console.log(key + ": " + objData.faceAnnotations[0][key]);
            }
        }
        replaceComment(faceArray);
    } catch (error) {
    console.error("エラーです:", error);
  }
}
//console.log(faceArray)

function replaceComment(faceArray){
    let comment = "<p>喜び： "+faceArray[0]+"</p>"+
                "<p>悲しみ： "+faceArray[1]+"</p>"+
                "<p>怒り： "+faceArray[2]+"</p>"+
                "<p>驚き： "+faceArray[3]+"</p><br>"+
                "<p>※以下の指標で☆が多い場合は、うまく分析が出来ていない可能性があります。</p>"+
                "<p>画像の白さ： "+faceArray[4]+"</p>"+
                "<p>画像のぼやけ： "+faceArray[5]+"</p>"+
                "<p>帽子等の着用： "+faceArray[6]+"</p>";
    //console.log(comment)
    document.getElementById('comment').innerHTML = comment;
    document.getElementById('comment').style.padding = "0.5em 1em"
    document.getElementById('comment').style.margin = "2em 0"
    document.getElementById('comment').style.fontWeight = "bold"
    document.getElementById('comment').style.border = "solid 3px #000000"
}

function test(){
  let comment = "<p>喜び： ☆</p>"+
  "<p>悲しみ： ☆</p>"+
  "<p>怒り： ☆</p>"+
  "<p>驚き： ☆</p><br>"+
  "<p>※以下の指標で☆が多い場合は、うまく分析が出来ていない可能性があります。</p>"+
  "<p>画像の白さ： ☆</p>"+
  "<p>画像のぼやけ： ☆</p>"+
  "<p>帽子等の着用： ☆</p>";
    document.getElementById('comment').innerHTML = comment;
    document.getElementById('comment').style.padding = "0.5em 1em"
    document.getElementById('comment').style.margin = "2em 0"
    document.getElementById('comment').style.fontWeight = "bold"
    document.getElementById('comment').style.border = "solid 3px #000000"
}
