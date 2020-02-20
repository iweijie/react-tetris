(function() {
  var w = parseInt(window.screen.width),
    s = w / 640,
    u = navigator.userAgent.toLowerCase(),
    m = '<meta name="viewport" content="width=640,';
  if (/android (\d+\.\d+)/.test(u)) {
    if (parseFloat(RegExp.$1) > 2.3)
      m += "minimum-scale=" + s + ",maximum-scale=" + s + ",";
  } else {
    m += "user-scalable=no,";
  }
  m += 'target-densitydpi=device-dpi">';
  document.write(m);
})();
