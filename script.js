// for stacking windows
let winZIndex = 1;

// open window upon icon click
const icons = document.querySelectorAll("[id$='icon']");
for (let i = 0; i < icons.length; i++) {
  let icon = icons[i];
  const id = icon.id;
  const idx = icon.id.indexOf('-');
  let window = document.querySelector(`#${id.substr(0, idx)}-window`);
  icon.addEventListener('click', event => {
    window.classList.add('active');
    window.style.zIndex = winZIndex++;
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
  let titleBar = win.firstElementChild;
  // register touch listeners
  titleBar.addEventListener("touchstart", dragStart, false);
  document.addEventListener("touchend", dragEnd, false);
  document.addEventListener("touchmove", drag, false);
  // register mouse listeners
  titleBar.addEventListener("mousedown", dragStart, false);
  document.addEventListener("mouseup", dragEnd, false);
  document.addEventListener("mousemove", drag, false);

  let isDraggable = false;
  let currentX; let currentY; let initX; let initY;
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.type === "touchstart") {
      initX = e.touches[0].clientX - xOffset;
      initY = e.touches[0].clientY - yOffset;
      isDraggable = true;
      win.style.zIndex = winZIndex++;
    } else {
      initX = e.clientX - xOffset;
      initY = e.clientY - yOffset;
      isDraggable = true;
      win.style.zIndex = winZIndex++;
    }
  }
  
  function dragEnd(e) {
    isDraggable = false;
  }
  
  function drag(e) {
    if (isDraggable) {
      e = e || window.event;
      e.preventDefault();
  
      if (e.type === "touchmove") {
        currentX = initX - e.touches[0].clientX;
        currentY = initY - e.touches[0].clientY;
        initX = e.touches[0].clientX;
        initY = e.touches[0].clientY;
      } else {
        currentX = initX - e.clientX;
        currentY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;
      }
      calcNewPosn();
    }
  }
  
  function calcNewPosn() {
    let winOffsetTop = win.offsetTop - currentY;
    if (winOffsetTop < 0) {
      winOffsetTop = 0;
    } else if (winOffsetTop + win.offsetHeight > parent.outerHeight) {
      winOffsetTop = parent.outerHeight - win.offsetHeight;
    }
    win.style.top = winOffsetTop + "px";
    let winOffsetLeft = win.offsetLeft - currentX;
    if (winOffsetLeft < 0) {
      winOffsetLeft = 0;
    } else if (winOffsetLeft + win.offsetWidth > parent.outerWidth) {
      winOffsetLeft = parent.outerWidth - win.offsetWidth;
    }
    win.style.left = winOffsetLeft + "px";
  }
}