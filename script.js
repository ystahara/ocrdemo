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
  //�J�����{�^�����N���b�N������ȉ��̊֐����{
  var context = snapshot.getContext('2d') //�񎟌��O���t�B�b�N�X�̃R���e�L�X�g���擾
  context.drawImage(
    video,
    100,
    300,
    600,
    200,
    0,
    0,
    snapshotCanvas.width, //���摜�̈ꕔ����؂蔲����canvas�ɕ`�悷��
    snapshotCanvas.height
  )
  const url = snapshot.toDataURL('image/png') //�L�����p�X���f�[�^URI�ɕϊ�����
  Tesseract.recognize(url, {
    //�摜�̂ǂ��ɁA�ǂ̂悤�ȕ��������邩����͂���
    //��͑Ώۂ�[ url�i�摜�j ] ����{��ŉ��
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
      //innerhtml�@�������̉摜URL���Z�b�g
      var parent = document.getElementById('results') //result �̗v�f�擾
      parent.insertBefore(elem, parent.firstChild) //result �� �����innerhtml �փZ�b�g
      var numdiv = document.getElementById(num) //num(elem.innerHTML) �̗v�f�擾
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
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess) //�X�}�z�̃J�����ɃA�N�Z�X�i�L���ȃ��f�B�A�擾�j
