'use strict';

var i = 120;

function timedCount() {
  i -= 1;
  postMessage(i);
  setTimeout('timedCount()', 1000);
}

timedCount();