var proses = document.getElementById("proses"),
    gambar = document.getElementById("gambar"),
    muat = document.getElementById("muat"),
    xhr;

function perbaharuiProses( e ) {
    if (e.lengthComputable) {
        proses.value = parseInt(e.loaded / e.total * 100, 10);
    } else {
        console.log("data tidak dapat diukur");
    }
}

function tampilkanGambar( e ) {
    if (xhr.status == 200) {
        proses.value = proses.innerHTML = 100;
        var blob = new Blob([xhr.response], {type: 'image/png'});

        gambar.onload = function(e) {
            window.URL.revokeObjectURL(gambar.src); // Clean up after yourself.
        };

        gambar.src = window.URL.createObjectURL(blob);
    }
}

function tampilkanProses( el ) {
    proses.value = proses.innerHTML = 0;
}

function sembunyikanProses() {
    proses.value = proses.innerHTML = 0;
}

function bacaGambar() {
    xhr = new XMLHttpRequest();

    // mendengarkan event yang menarik
    xhr.addEventListener("progress", perbaharuiProses, false);
    xhr.addEventListener("load", tampilkanGambar, false);
    xhr.addEventListener("loadend", sembunyikanProses, false);

    xhr.open("GET", "contoh.png",true);
    xhr.responseType = 'blob';
    xhr.send(null);
}

muat.addEventListener("click", function() {
    tampilkanProses(proses);
    bacaGambar();
});