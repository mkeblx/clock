'use strict';

const SHOW_SECONDS = 1;
const NON_24HR_TIME = 1;
const SHOW_AMPM = 0;

const clock = document.getElementById('clock');
const fsBtn = document.getElementById('fullscreen-btn');
const body = document.body;
var clockString  = '';

function init() {
  fitty('#clock', { observeMutations: {
    subtree: 1,
    childList: 0,
    characterData: 1
  }});

  fsBtn.addEventListener('click', fullscreen);
  body.addEventListener('dblclick', fullscreen);

  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes().toString().padStart(2, '0');
  var s = d.getSeconds().toString().padStart(2, '0');
  var ampm = 'am';
  if (NON_24HR_TIME) {
    if (h > 12) {
      h -= 12;
      ampm = 'pm';
    } else if (h === 0) {
      h = 12;
    }
  }
  clockString = `${h}:${m}`;
  if (SHOW_SECONDS)
    clockString += `:${s}`;
  if (NON_24HR_TIME && SHOW_AMPM)
    clockString += ampm;
  clock.textContent = clockString;
}

function fullscreen(){
  if('fullscreenEnabled' in document && document.fullscreenEnabled) {
    clock.requestFullscreen();
  }
}

init();
