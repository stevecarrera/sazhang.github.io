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

function dragElement(win) {
  let currentX = 0, currentY = 0, initX = 0, initY = 0;
  let titleBar = win.firstElementChild;
  titleBar.onmousedown = dragStart;

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
    let winOffsetTop = win.offsetTop - currentY;
    if (winOffsetTop < 24) {
      winOffsetTop = 24;
    }
    win.style.top = winOffsetTop + "px";
    let winOffsetLeft = win.offsetLeft - currentX;
    if (winOffsetLeft < 0) {
      winOffsetLeft = 0;
    }
    win.style.left = winOffsetLeft + "px";
  }

  function dragEnd() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}