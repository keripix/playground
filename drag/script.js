var items = document.querySelectorAll(".item");

function elMulaiDrag( el ) {
  // jadikan transparan
  this.style.opacity = 0.5;
}

function elDrag( el ) {
  this.style.opacity = parseFloat(this.style.opacity) + 0.05;

  if (this.style.opacity >= 1) {
    this.style.opacity = 0;
  }
}

// Memasang event handler untuk proses dragging
[].forEach.call(items, function( el ) {
  // ketika element mulai di drag
  el.addEventListener("dragstart", elMulaiDrag, false);
  // ketika element di drag
  el.addEventListener("drag", elDrag, false);
});