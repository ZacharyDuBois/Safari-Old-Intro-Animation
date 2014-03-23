var WelcomScreen = {canPlay: function () {
  var a = navigator.userAgent.toLowerCase();
  var b = false;
  var c = a.match(/version\/([\d\.]*) safari/);
  if (c) {
    var b = (parseInt(c[1]) > 3)
  }
  if (!b) {
    document.body.innerHTML = '<p class="download">Download <a href="/safari/">Safari</a> to view this page.</p>';
    return false
  }
  return true
}, localizeWelcomeMessage: function () {
  var a = {"da-dk": "Velkommen til Safari", "de-de": "Willkommen bei Safari", "es-es": "Bienvenido a Safari", "fi-fi": "Tervetuloa Safari", "fr-fr": "Bienvenue dans Safari", "it-it": "Benvenuti in Safari", "ja-jp": "Safari へようこそ", "ko-kr": "Safari 사용을 환영합니다", "nb-no": "Velkommen til Safari", "nl-nl": "Welkom bij Safari", "pl-pl": "Witamy w Safari", "pt-br": "Bem-vindo ao Safari", "pt-pt": "Bem-vindo ao Safari", "ru-ru": "Добро пожаловать в Safari", "sv-se": "Välkommen till Safari", "zh-cn": "欢迎使用 Safari", "zh-tw": "歡迎使用 Safari"};
  var b = a[navigator.language];
  if (!b) {
    return
  }
  document.getElementsByTagName("title")[0].innerText = (b + " - Apple Inc.");
  this.localizedHeaderImage = "" + navigator.language + "header.png";
  document.getElementsByTagName("h1")[0].style.backgroundImage = "url(" + this.localizedHeaderImage + ")"
}, initialize: function () {
  if (this.canPlay()) {
    this.localizeWelcomeMessage();
    this.music = document.getElementById("music");
    this.video = document.getElementById("compass");
    var c = this;

    function b(f) {
      if (f.animationName === "safari-video") {
        c.video.play()
      }
    }

    function a(f) {
      if (f.animationName === "safari-video") {
        c.redirect()
      }
    }

    function d(f) {
      c.redirect()
    }

    if ("play" in this.music) {
      this.music.addEventListener("ended", d, false)
    } else {
      window.addEventListener("webkitAnimationEnd", a, false)
    }
    window.addEventListener("webkitAnimationStart", b, false);
    this.preloadMedia()
  }
}, preloadMedia: function () {
  var n = 0;
  var h = 0;
  var o = this;

  function m() {
    ++h;
    if (h >= n) {
      o.start()
    }
  }

  var k = document.getElementsByTagName("audio");
  for (var g = 0; g < k.length; ++g) {
    var f = k[g];
    if (!("load" in f) || !f.src) {
      continue
    }
    ++n;
    f.addEventListener("load", m, false);
    f.load()
  }
  var c = document.getElementsByTagName("video");
  for (var g = 0; g < c.length; ++g) {
    var a = c[g];
    if (!("load" in a) || !a.src) {
      continue
    }
    ++n;
    a.addEventListener("load", m, false);
    a.load()
  }
  var l = ["apple_icon.png", "apple_spots.png", "apple_flare.jpg", "apple_flare_icon.png", this.localizedHeaderImage || "header.png"];
  for (var d = 0; d < l.length; ++d) {
    var b = new Image();
    b.addEventListener("load", m, false);
    b.src = l[d]
  }
}, start: function () {
  if ("play" in this.music) {
    this.music.play()
  }
  document.body.className = "go"
}, redirect: function () {
  document.location = "topsites://"
}};
try {
  window.addEventListener("load", function () {
    WelcomScreen.initialize()
  }, false);
  window.addEventListener("unload", function () {
    document.body.className = ""
  }, false)
} catch (e) {
  window.onload = WelcomScreen.canPlay
}
;
