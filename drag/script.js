var items = document.querySelectorAll(".item"),
    direction = 1;

function elMulaiDrag( el ) {
  // jadikan transparan
  this.style.opacity = 0.5;
}

function elDrag( e ) {
  var size = parseInt(getComputedStyle(e.target, null).width, 10) + direction;

  [].forEach.call(items, function( el ) {
    el.style.width =  size + "px";
    el.style.height = size + "px";
  });

  if (size >= 150 || size <= 50) {
    direction *= -1;
  }
}

function elSelesaiDrag( e ) {
  [].forEach.call(items, function( el ) {
    el.style.width =  "100px";
    el.style.height = "100px";
  });  
}

// Memasang event handler untuk proses dragging
[].forEach.call(items, function( el ) {
  // ketika element mulai di drag
  el.addEventListener("dragstart", elMulaiDrag, false);
  // ketika element di drag
  el.addEventListener("drag", elDrag, false);

  el.addEventListener("dragend", elSelesaiDrag, false);
});