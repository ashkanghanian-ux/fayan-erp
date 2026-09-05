/* =========================================================
   سامار — تعاملات صفحه
   ========================================================= */
(function () {
  "use strict";

  /* --- دموی زنده: آدرسِ نصب واقعی دمو را اینجا بگذارید ---
     * پیش‌فرضِ هوشمند: همان آی‌پی/هاستِ خودِ سایت + پورت 5400،
     * تا هم از روی این کامپیوتر (localhost) و هم از روی گوشی (آی‌پی شبکه) کار کند.
     * حالتِ آنلاین: آدرس دموی نصب‌شده را مستقیم بنویسید، مثلاً:
       var DEMO_URL = "https://demo.mydomain.ir/";
  */
  var DEMO_HOST = window.location.hostname || "localhost";
  var DEMO_URL = (DEMO_HOST.indexOf(".") >= 0 || DEMO_HOST === "localhost")
      ? "http://" + DEMO_HOST + ":5400/"
      : "http://localhost:5400/";

  var iframe = document.getElementById("demoIframe");
  var openBtn = document.getElementById("demoOpen");
  var urlTag = document.getElementById("demoUrl");
  var frameBox = document.querySelector(".demo-frame");
  var unavailable = document.getElementById("demoUnavailable");
  var demoNote = document.getElementById("demoNote");

  function isLocalHost() {
    var h = location.hostname || "";
    return location.protocol === "file:" ||
      h === "localhost" || h === "" ||
      /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h) ||
      h.endsWith(".local");
  }

  function applyDemo(force) {
    var base = DEMO_URL.replace(/\/+$/, "") + "/";
    if (!force && iframe && iframe.getAttribute("src")) return;
    if (openBtn) { openBtn.href = base; openBtn.target = "_blank"; }
    if (urlTag) urlTag.textContent = base;
    if (iframe) iframe.src = base;
  }

  if (isLocalHost()) {
    applyDemo();
  } else {
    if (frameBox) frameBox.hidden = true;
    if (unavailable) unavailable.hidden = false;
    if (demoNote) { demoNote.innerHTML = "<p>نسخه‌ی کامل سامانه (سامار ERP) پس از نصب روی سرور شما در همین بخش، زنده در دسترس قرار می‌گیرد.</p>"; }
  }

  /* --- منوی موبایل --- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("navBurger");
  if (burger) burger.addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  /* --- بستن منو پس از کلیک روی لینک --- */
  document.querySelectorAll("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });

  /* --- افکت ورود (reveal) --- */
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".dash-card, .mod, .why-card, .step").forEach(function (el) {
    el.classList.add("reveal");
    if (io) io.observe(el); else el.classList.add("in");
  });

  /* --- هایلایت لینک فعال ناو --- */
  var links = Array.prototype.slice.call(document.querySelectorAll("#navLinks a"));
  function spy() {
    var pos = window.scrollY + 120, current = "";
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec && sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) current = a.getAttribute("href");
    });
    links.forEach(function (a) {
      a.style.color = a.getAttribute("href") === current ? "var(--brand)" : "";
      if (a.getAttribute("href") === current && current !== "#pricing") {
        a.style.fontWeight = "800";
      }
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

})();