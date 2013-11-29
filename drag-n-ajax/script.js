var dropzone = document.querySelectorAll(".dropzone"),
    filelist = document.getElementById("filelist"),
    forEach = Array.prototype.forEach,
    files = [],
    formData = new FormData(),
    uploadButton = document.getElementById("uploadButton");

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

function onDragEnter( e ) {
  e.preventDefault();

  toggleOver(this);

  return false;
}

function onDragOver( e ) {
  e.preventDefault();
  return false;
}

function onDragLeave( e ) {
  e.preventDefault();

  toggleOver(this);

  return false;
}

function onDrop( e ) {
  e.preventDefault();

  toggleOver(this);

  files = e.dataTransfer.files;

  processFiles(files);

  return false;
}

function toggleOver( el ) {
  el.classList.toggle("over");
}

/* PEMROSESAN BERKAS YANG HENDAK DI UNGGAH */

function processFiles( files ) {
  for (var i = 0, length = files.length; i < length; i++) {
    showFileInfo(files[0]);
    appendToFormData(files[0]);
  }
}

function showFileInfo( file ) {
  var el = document.createElement("div");

  el.classList.add("item");
  el.innerHTML = "<img src='file.png'></img>" +
  "<p>Nama: " + file.name + "</p>" + 
  "<p>Jenis: " + file.type + "</p>" +
  "<p>Ukuran: " + file.size + "</p>";

  filelist.appendChild(el);
}

function appendToFormData( file ) {
  formData.append("file", file);
}

/* PROSES PENGUNGGAHAN */

// mulai upload
function uploadFiles( data ) {
  var xhr = new XMLHttpRequest();    

  xhr.open("POST", "upload.php", true);
  xhr.addEventListener("load", onLoad);

  xhr.send(data);
}

function onLoad() {
  if (this.status === 200) {
    alert("Berkas berhasil di upload");    
  } else {
    alert("Berkas gagal di upload");
  }
  
}

