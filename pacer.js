module.exports.paceStringWithDurationString = (duration) => {
  var durationSec = durationStrToSeconds(duration);
  var pace = paceWithDuration(durationSec);
  return pace.m+`'`+pace.s+`"`;
};

function paceWithDuration(duration) {
  const distance = 42.195;
  var paceSec = duration / distance;
  var paceMin = 0;
  while (Math.round(paceSec) >= 60) {
    paceMin += 1;
    paceSec -= 60;
  }
  return {m: paceMin, s: Math.round(paceSec)};
}

function durationStrToSeconds(durationStr) {
  var durationTotal = 0;
  var regex = /PT((\d+)H)?((\d+)M)?((\d+)S)?/i;
  var found = durationStr.match(regex);
  for (var i in found) {
    if (!found[i]) { continue; }
    var h = found[i].match(/^(\d+)H$/i);
    var m = found[i].match(/^(\d+)M$/i);
    var s = found[i].match(/^(\d+)S$/i);
    if (h) {
      durationTotal += parseInt(h[1])*3600;
    }
    if (m) {
      durationTotal += parseInt(m[1])*60;
    }
    if (s) {
      durationTotal += parseInt(s[1]);
    }
  }
  return durationTotal;
}
