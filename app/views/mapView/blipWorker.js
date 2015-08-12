'use strict';

var i = 61;

function timedCount() {
  i -= 1;
  postMessage(i);
  setTimeout('timedCount()', 1000);
}

timedCount();