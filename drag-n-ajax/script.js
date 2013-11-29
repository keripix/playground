// shortcut untuk nantinya
var forEach = Array.prototype.forEach;

var dropzone = document.querySelectorAll(".dropzone"),
    filelist = document.getElementById("filelist"),
    uploadButton = document.getElementById("uploadButton"),

    files = [],

    formData = new FormData();

uploadButton.addEventListener("click", function() {
  uploadFiles(formData);
});

// pasang pengendali event untuk tiap element
// yang memiliki class dropzone
forEach.call(dropzone, function( el ) {

  el.addEventListener("dragenter", onDragEnter);
  el.addEventListener("dragover", onDragOver);
  el.addEventListener("dragleave", onDragLeave);
  el.addEventListener("drop", onDrop);

});

// ketika mouse memasuki wilayah penjatuhan
function onDragEnter( e ) {
  e.preventDefault();

  toggleOver(this);

  return false;
}

// ketika mouse bergerak di atas wilayah penjatuhan
function onDragOver( e ) {
  e.preventDefault();
  return false;
}

// ketika mouse bergerak keluar dari wilayah penjatuhan
function onDragLeave( e ) {
  e.preventDefault();

  toggleOver(this);

  return false;
}

// ketika terjadi proses penjatuhan benda yang diseret
function onDrop( e ) {
  e.preventDefault();

  toggleOver(this);

  files = e.dataTransfer.files;

  processFiles(files);

  return false;
}

// pasang/hapus class over
function toggleOver( el ) {
  // Bila element ini tidak memiliki class over,
  // maka kita tambahkan class over.
  // Namun, bila element memiliki class over,
  // maka kita hapus class over dari element ini.
  el.classList.toggle("over");
}

/* PEMROSESAN BERKAS YANG HENDAK DI UNGGAH */

function processFiles( files ) {
  for (var i = 0, length = files.length; i < length; i++) {
    showFileInfo(files[i]);
    appendToFormData(files[i]);
  }
}

// menampilkan informasi berkas
function showFileInfo( file ) {
  var el = document.createElement("div");

  el.classList.add("item");
  el = createInfoElement(el,file);

  filelist.appendChild(el);
}

function createInfoElement( parentEl, file ) {
  parentEl.innerHTML = "<img src='file.png'></img>";
  parentEl.innerHTML += "<p>Nama: " + file.name + "</p>";
  parentEl.innerHTML += "<p>Jenis: " + file.type + "</p>";
  parentEl.innerHTML += "<p>Ukuran: " + file.size + "</p>";

  return parentEl;
}

// tambahkan berkas ini ke instanta FormData
function appendToFormData( file ) {
  formData.append("file[]", file);
}

/* PROSES PENGUNGGAHAN */

// mulai mengunggah
function uploadFiles( data ) {
  var xhr = new XMLHttpRequest();    

  var progressBar = addProgressBar(filelist);

  xhr.open("POST", "http://playground.pethak.com/upload.php", true);

  xhr.addEventListener("load", function() {
    setProgressBarValue(progressBar, 100);
    onLoad(this);
  });

  xhr.upload.addEventListener("progress", function( e ) {
    if (e.lengthComputable) {
      setProgressBarValue( progressBar, (e.loaded / e.total * 100 | 0));
    }
  });

  xhr.send(data);
}

// memasang nilai progress bar
function setProgressBarValue( progressBar, value ) {
  progressBar.value = value;
}

// menambahkan progressbar pada parentEl
function addProgressBar( parentEl ) {
  var progressBar = document.createElement("progress");

  progressBar.setAttribute("min", 0);
  progressBar.setAttribute("max", 100);
  progressBar.setAttribute("value", 0);

  parentEl.appendChild(progressBar);

  return progressBar;
}

// ketika pengunggahan selesai
function onLoad( xhr ) {
  if (xhr.status === 200) {
    alert("Berkas berhasil di upload");    
  } else {
    alert("Berkas gagal di upload");
  }
}

