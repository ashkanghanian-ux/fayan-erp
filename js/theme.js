/* تم روشن/تیره — مشترک بین همهٔ صفحات */
(function(){
  var btn = document.getElementById("themeBtn");
  if(!btn) return;
  function apply(t){
    document.body.classList.toggle("dark", t === "dark");
    btn.textContent = (t === "dark") ? "☀️" : "🌙";
    btn.setAttribute("aria-label", (t === "dark") ? "حالت روشن" : "حالت تیره");
  }
  var saved = "light";
  try { saved = localStorage.getItem("fayanTheme") || "light"; } catch(e){}
  apply(saved);
  btn.addEventListener("click", function(){
    var next = document.body.classList.contains("dark") ? "light" : "dark";
    try { localStorage.setItem("fayanTheme", next); } catch(e){}
    apply(next);
  });
})();