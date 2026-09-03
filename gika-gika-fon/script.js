(function () {
  "use strict";
 
  var HEADS = ["head1.png", "head2.png"];
  var HULLS = ["#8c3b3b", "#1f4e49", "#a97c39"];
 
  // Destination name shown on each boat's banner — keep in sync with boat1.html … boat14.html
  var DESTINATIONS = [
    "കാക്ക കുളിച്ചാൽ കൊക്കാവില്ല",
    "എല്ലാത്തിനും അതിന്റേതായ സമയം ഉണ്ട് ദാസാ!",
    "കാക്കയ്ക്കും തൻകുഞ്ഞ് പൊൻകുഞ്ഞ്",
    "ഇതിനു പിന്നിൽ വലിയ ഒരു കഥയുണ്ട്!",
    "കുടം പൊട്ടിയാൽ വെള്ളം പോവും",
    "അധികം ആയാൽ അമൃതും വിഷം",
    "ഇത്തിരി നേരം ഇരുന്നാൽ എന്താ, മല ഇടിഞ്ഞു വീഴുമോ?",
    "മത്തൻ കുത്തിയാൽ കുമ്പളം മുളകില്ല",
    "Last Light Landing",
    "Whispering Shoal",
    "Moonlit Cove",
    "Anchor's Rest",
    "Salt & Driftwood",
    "Horizon's Edge"
  ];
 
  var BOATS = DESTINATIONS.length;
 
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
 
  function pick(arr, i) {
    return arr[i % arr.length];
  }
 
  // Greedily wraps a destination name onto short lines so it reads cleanly
  // on a small banner. Malayalam headings tend to run long, so we allow a
  // few more lines than the original two-line cap.
  function wrapLabel(label, maxLen) {
    var words = label.split(" ");
    var lines = [];
    var line = "";
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (test.length > maxLen && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
 
  function escapeXML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
 
  function boatSVG(hullColor, headHref, oarSpeed, label, uid) {
    var clipId = "headclip-" + uid;
    var lines = wrapLabel(label, 11);
 
    var lineHeight = 13;
    var bannerW = 92;
    var bannerH = Math.max(21, lines.length * lineHeight + 13);
    var mastTopY = -24;
    var bannerX = 105;
    var bannerY = mastTopY - bannerH / 2;
    var tailTipX = bannerX + bannerW + 15;
 
    var textSpans = "";
    var textCenterX = bannerX + bannerW / 2;
    if (lines.length === 1) {
      textSpans =
        '<text x="' + textCenterX + '" y="' + (bannerY + bannerH / 2 + 4) +
        '" text-anchor="middle" class="boat-banner-text">' + escapeXML(lines[0]) + '</text>';
    } else {
      textSpans = '<text x="' + textCenterX + '" text-anchor="middle" class="boat-banner-text">';
      var startY = bannerY + bannerH / 2 - ((lines.length - 1) * lineHeight) / 2 + 4;
      for (var i = 0; i < lines.length; i++) {
        var y = startY + i * lineHeight;
        textSpans += '<tspan x="' + textCenterX + '" y="' + y + '">' + escapeXML(lines[i]) + '</tspan>';
      }
      textSpans += '</text>';
    }
 
    return (
      '<svg class="boat-svg" viewBox="0 -' + (Math.max(46, bannerH + 30)) + ' 210 ' + (142 + Math.max(0, bannerH - 21)) + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<defs>' +
          '<clipPath id="' + clipId + '">' +
            '<circle cx="0" cy="0" r="13"/>' +
          '</clipPath>' +
        '</defs>' +
        // wake / ripple under the boat
        '<ellipse cx="105" cy="80" rx="86" ry="7" fill="#ffffff" opacity="0.16"/>' +
        // oars
        '<g class="oar-left" style="animation-duration:' + oarSpeed + 's" transform="translate(58,52)">' +
          '<rect x="-46" y="-2.4" width="46" height="4.8" rx="2.4" fill="#3b2a1f"/>' +
        '</g>' +
        '<g class="oar-right" style="animation-duration:' + oarSpeed + 's" transform="translate(150,52)">' +
          '<rect x="0" y="-2.4" width="46" height="4.8" rx="2.4" fill="#3b2a1f"/>' +
        '</g>' +
        // hull
        '<path d="M18 68 C18 84 40 90 105 90 C170 90 192 84 192 68 L178 68 C178 76 156 80 105 80 C54 80 32 76 32 68 Z" fill="' + hullColor + '" stroke="#141414" stroke-width="2.5"/>' +
        '<path d="M26 68 L184 68" stroke="#141414" stroke-width="2"/>' +
        '<rect x="30" y="60" width="150" height="9" rx="3" fill="' + hullColor + '" stroke="#141414" stroke-width="2"/>' +
        // seat + stickman body
        '<line x1="105" y1="66" x2="105" y2="40" stroke="#141414" stroke-width="3.4" stroke-linecap="round"/>' +
        '<line x1="105" y1="46" x2="86" y2="52" stroke="#141414" stroke-width="3.2" stroke-linecap="round"/>' +
        '<line x1="105" y1="46" x2="124" y2="52" stroke="#141414" stroke-width="3.2" stroke-linecap="round"/>' +
        '<line x1="105" y1="66" x2="93" y2="76" stroke="#141414" stroke-width="3.2" stroke-linecap="round"/>' +
        '<line x1="105" y1="66" x2="117" y2="76" stroke="#141414" stroke-width="3.2" stroke-linecap="round"/>' +
        // mast, tied to the stickman, rising above the head
        '<line x1="105" y1="12" x2="105" y2="' + mastTopY + '" stroke="#3b2a1f" stroke-width="2.6" stroke-linecap="round"/>' +
        '<circle cx="105" cy="' + mastTopY + '" r="3" fill="#c99a54" stroke="#141414" stroke-width="1.4"/>' +
        // banner / pennant naming the destination
        '<g class="boat-banner">' +
          '<path d="M' + bannerX + ' ' + bannerY +
            ' H' + (bannerX + bannerW) +
            ' L' + tailTipX + ' ' + (bannerY + bannerH / 2) +
            ' L' + (bannerX + bannerW) + ' ' + (bannerY + bannerH) +
            ' H' + bannerX + ' Z' +
            '" fill="#f6f0e4" stroke="#141414" stroke-width="2"/>' +
          textSpans +
        '</g>' +
        // head (photo)
        '<g transform="translate(105,27)">' +
          '<circle r="14.5" fill="#141414"/>' +
          '<image href="' + headHref + '" x="-13" y="-13" width="26" height="26" clip-path="url(#' + clipId + ')" preserveAspectRatio="xMidYMid slice"/>' +
        '</g>' +
      '</svg>'
    );
  }
 
  function buildBoat(index) {
    var num = index + 1;
    var destination = DESTINATIONS[index];
    var head = pick(HEADS, Math.floor(Math.random() * 2) + index); // pseudo-random but varied
    var hull = pick(HULLS, index);
    var goingRight = Math.random() < 0.5;
    var duration = rand(13, 27).toFixed(1);
    var delay = (-rand(0, duration)).toFixed(1); // negative delay so boats start mid-journey, staggered
    var bobDuration = rand(1.6, 2.6).toFixed(2);
    var oarSpeed = rand(0.7, 1.3).toFixed(2);
 
    var wrap = document.createElement("a");
    wrap.href = "boat" + num + ".html";
    wrap.className = "boat-wrap";
    wrap.setAttribute("aria-label", "Row to " + destination + " (boat " + num + ")");
    wrap.style.setProperty("--sail-anim", goingRight ? "sail-ltr" : "sail-rtl");
    wrap.style.setProperty("--sail-duration", duration + "s");
    wrap.style.setProperty("--sail-delay", delay + "s");
 
    var bob = document.createElement("div");
    bob.className = "boat-bob";
    bob.style.animationDuration = bobDuration + "s";
    bob.innerHTML = boatSVG(hull, head, oarSpeed, destination, "b" + num);
 
    wrap.appendChild(bob);
    return wrap;
  }
 
  function init() {
    var harbor = document.getElementById("harbor");
    if (!harbor) return;
 
    for (var i = 0; i < BOATS; i++) {
      var lane = document.createElement("div");
      lane.className = "lane";
      lane.appendChild(buildBoat(i));
      harbor.appendChild(lane);
    }
  }
 
  document.addEventListener("DOMContentLoaded", init);
})();