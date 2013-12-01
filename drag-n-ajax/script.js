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

// `file` adalah sebuah File
function showFileInfo( file ) {
  // kita akan membuat element <div> yang akan berisikan
  // informasi mengenai file
  var el = document.createElement("div");

  // kita berikan sebuah class css terhadapnya
  el.classList.add("item");

  // kita tentukan isi dari <div> tadi
  createInfoElement(el, file);

  // kita tambahkan <div> ini di dalam element `filelist`.
  // lihat struktur html kita
  filelist.appendChild(el);
}

function createInfoElement( parentEl, file ) {
  parentEl.innerHTML = "<div class='left'><img src='file.png'></img></div>";
  parentEl.innerHTML += "<div class='info'><p>Nama: " + file.name + "</p>" +
                      "<p>Jenis: " + file.type + "</p>" +
                      "<p>Ukuran: " + file.size + " bytes</p></div>";

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

  xhr.open("POST", "upload.php", true);

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

function addProgressBar( parentEl ) {
  // mengambil anak pertama dari parentEl
  var firstChild = parentEl.firstChild;

  // bila anak pertama adalah sebuah element <progress>
  // maka kita tidak perlu membuat element <progress> lagi
  if (firstChild.tagName == "PROGRESS") {
    firstChild.value = 0;
    return firstChild;
  }

  // buat element <progress>
  var progressBar = document.createElement("progress");

  // memasang nilai pada <progress>
  progressBar.setAttribute("min", 0);
  progressBar.setAttribute("max", 100);
  progressBar.setAttribute("value", 0);

  // kita akan menambahkan element <progress> di atas pada
  // parentEl, dan menjadikannya anak pertama dari
  // parentEl.
  // Jadi, kita akan menambahkan progressBar pada parentEl,
  // pada posisi sebelum firstChild
  parentEl.insertBefore(progressBar, firstChild);

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

