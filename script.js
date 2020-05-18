var
  video = document.getElementById('player'),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d')
requestAnimationFrame(draw)

function draw() {
  canvas.width = 300
  canvas.height = 100
  // ctx.drawImage(video, 100, 300, 600, 200, 0, 0, 300, 100)
  ctx.drawImage(video, 100, 300, 600, 200, 0, 0, 300, 100)
  imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  data = imgData.data
  for (let i = 0; i < data.length; i += 4) {
    ave = (data[i + 0] + data[i + 1] + data[i + 2]) / 3
    data[i + 0] = data[i + 1] = data[i + 2] = ave > 128 ? 255 : 0
    data[i + 3] = 255
  }
  ctx.putImageData(imgData, 0, 0)
  requestAnimationFrame(draw)
}
var snapshotCanvas = document.getElementById('snapshot')
var captureButton = document.getElementById('capture')
var captureButtoneng = document.getElementById('captureeng')
var snapshotButton = document.getElementById('snapshotbutton')
var handleSuccess = function (stream) {
  video.srcObject = stream
}
var num = 1

captureButton.addEventListener('click', function () {
  //カメラボタンをクリックしたら以下の関数実施
  var context = snapshot.getContext('2d') //二次元グラフィックスのコンテキストを取得
  context.drawImage(
    video,
    100,
    300,
    600,
    200,
    0,
    0,
    snapshotCanvas.width, //元画像の一部分を切り抜いてcanvasに描画する
    snapshotCanvas.height
  )
  const url = snapshot.toDataURL('image/png') //キャンパスをデータURIに変換する
  Tesseract.recognize(url, {
    //画像のどこに、どのような文字があるかを解析する
    //解析対象は[ url（画像） ] を日本語で解析
    // lang: 'jpn',
    lang: 'eng',
  })
    .progress(function (p) {
      $('#msg').text(p.status + ': ' + p.progress)
    })
    .then(function (result) {
      var elem = document.createElement('div')
      elem.innerHTML =
        '<div id=' +
        num +
        " style='width:300px; background-color:#EEEEEE'><img src=" +
        url +
        ' /></div><br>'
      //innerhtml　さっきの画像URLをセット
      var parent = document.getElementById('results') //result の要素取得
      parent.insertBefore(elem, parent.firstChild) //result に 先程のinnerhtml へセット
      var numdiv = document.getElementById(num) //num(elem.innerHTML) の要素取得
      var msg = document.createElement('div')
      msg.innerHTML = result.text
      numdiv.appendChild(msg)
      num += 1
    })
})
var front = false
var constraints = {
  audio: false,
  video: {
    width: 1920,
    height: 1080,
    facingMode: front ? 'user' : 'environment',
  },
}
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess) //スマホのカメラにアクセス（有効なメディア取得）
