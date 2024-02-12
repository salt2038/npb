  // JavaScriptオブジェクトへ変換
  document.addEventListener('DOMContentLoaded',()=> {
  let url = new URL(window.location.href);
  let params = url.searchParams;

  let faceArray = [];
  params.forEach(function(value,key){
    if(key.includes("hood")){
      switch(value){
        case "5":
            faceArray.push("☆☆☆☆☆")
            break;
        case "4":
            faceArray.push("☆☆☆☆")
            break;
        case "3":
            faceArray.push("☆☆☆")
            break;
        case "2":
            faceArray.push("☆☆")
            break;
        case "1":
            faceArray.push("☆")
            break;
      }
    }
  });
  replaceComment(faceArray);
});

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
