// open window upon icon click
const icons = document.querySelectorAll("[id$='icon']");
for (let i = 0; i < icons.length; i++) {
  let icon = icons[i];
  const id = icon.id;
  const idx = icon.id.indexOf('-');
  let window = document.querySelector(`#${id.substr(0, idx)}-window`);
  icon.addEventListener('click', event => {
    window.classList.add('active');
  });
}

// close window upon button click
const windowBtns = document.querySelectorAll('button.title-bar__icon');
for (let i = 0; i < windowBtns.length; i++) {
  let btn = windowBtns[i];
  btn.addEventListener('click', event => {
    let window = btn.closest('.window');
    window.classList.remove('active');
  });
}

// make windows draggable
let desktop = document.querySelector('.desktop');
const windows = document.querySelectorAll("[id$='window']");

for (let i = 0; i < windows.length; i++) {
  dragElement(windows[i]);
}

function dragElement(el) {
  let currentX = 0, currentY = 0, initX = 0, initY = 0;
  el.onmousedown = dragStart;

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    initX = e.clientX;
    initY = e.clientY;
    document.onmouseup = dragEnd;
    document.onmousemove = drag;
  }

  function drag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initX - e.clientX;
    currentY = initY - e.clientY;
    initX = e.clientX;
    initY = e.clientY;
    if (el.offsetTop - currentY < 24) {
      el.style.top = 24 + "px";
    } else {
      el.style.top = (el.offsetTop - currentY) + "px";
    }
    
    if (el.offsetLeft - currentX < 0) {
      el.style.left = 0 + "px";
    }
    el.style.left = (el.offsetLeft - currentX) + "px";
  }

  function dragEnd() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}