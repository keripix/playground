var items = document.querySelectorAll(".item");

function dragging( el ) {
  this.style.opacity = 0.5;
}

// Memasang event handler untuk proses dragging
[].forEach.call(items, function( el ) {
  el.addEventListener("dragstart", dragging, false);
});