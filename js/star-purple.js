(function () {
  var COLORS = [
    'rgba(168,139,250,',
    'rgba(196,181,253,',
    'rgba(240,171,252,',
    'rgba(249,168,212,',
    'rgba(255,255,255,',
  ];

  function createCanvas(panel) {
    if (panel.querySelector('#star-canvas')) return;
    var canvas = document.createElement('canvas');
    canvas.id = 'star-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.7';
    panel.style.position = 'relative';
    panel.style.overflow = 'hidden';
    panel.insertBefore(canvas, panel.firstChild);

    var content = panel.querySelector('.aboutme-wrap');
    if (content) { content.style.position = 'relative'; content.style.zIndex = '1'; }

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, stars = [];

    function resize() {
      W = canvas.width = panel.offsetWidth || 300;
      H = canvas.height = panel.offsetHeight || 400;
    }

    function makeStars(n) {
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.6 + 0.3,
          a: Math.random(),
          da: (Math.random() * 0.01 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
          vy: -(Math.random() * 0.3 + 0.05),
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
    }

    function draw() {
      if (!document.body.contains(canvas)) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.a += s.da;
        if (s.a <= 0 || s.a>= 1) { s.da = -s.da; s.a = Math.max(0, Math.min(1, s.a)); }
        s.y += s.vy;
        if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; s.a = Math.random() * 0.5; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + s.a + ')';
        ctx.shadowColor = s.color + '0.9)';
        ctx.shadowBlur = s.r * 5;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    makeStars(150);
    draw();
  }

  function tryInit() {
    var panel = document.querySelector('.tools-col.show .tools-section-me');
    if (panel && panel.offsetHeight > 0) { createCanvas(panel); return true; }
    return false;
  }

  // 监听整个 body 的 class 变化（subtree）
  new MutationObserver(function () { tryInit(); })
    .observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // 200ms 轮询双重保险，10秒后停
  var poll = setInterval(function () { if (tryInit()) clearInterval(poll); }, 200);
  setTimeout(function () { clearInterval(poll); }, 10000);

  if (document.readyState === 'complete') tryInit();
  else window.addEventListener('load', tryInit);
})();
</=>