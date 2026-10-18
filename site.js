/* Ala Ulama Bookshop: small behaviours.
   GM-instellingen bovenaan. */
(function () {
  var GM = {
    // Zet hier je echte domein als je het e-mailadres vast wil zetten (bv. "jouwdomein.com").
    // Leeg = automatisch het domein waarop de site draait.
    domain: "",
    mailbox: "mohsen",
    // Hoe snel namen in het gastenboek vervagen (fractie per dag, maal het gewicht van de entry).
    fadePerDay: 0.035,
    // Startvervaging voor zware entries (gewicht >= 2), zodat Gent bij eerste bezoek al "beschadigd" is.
    baseFadeHeavy: 0.12
  };

  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  function fmt(d) {
    var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return d.getDate() + " " + m[d.getMonth()] + " " + d.getFullYear();
  }

  var now = new Date();
  var page = (location.pathname.split("/").pop() || "index.html");

  /* De homepage is "vandaag" bijgewerkt. De rest staat stil op 2018. */
  if (page === "" || page === "index.html") {
    var u = document.querySelector(".upd-date");
    if (u) u.textContent = fmt(now);
  }

  /* Datum van de laatste notitie op de verborgen pagina = vandaag. */
  var t = document.getElementById("today");
  if (t) t.textContent = fmt(now);

  /* E-mailadres op het eigen domein. */
  var mail = document.getElementById("mail");
  if (mail) {
    var host = GM.domain || location.hostname.replace(/^www\./, "");
    if (host && host.indexOf(".") > 0 && !/claude|localhost|127\./.test(host)) {
      mail.textContent = GM.mailbox + "@" + host;
    }
  }
  var copy = document.getElementById("copy");
  if (copy && mail) {
    copy.addEventListener("click", function () {
      var txt = mail.textContent;
      var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy"; }, 1500); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(mail);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      };
      try {
        navigator.clipboard.writeText(txt).then(done, fallback);
      } catch (e) { fallback(); }
    });
  }

  /* Gastenboek: namen vervagen vanaf het eerste bezoek van deze bezoeker.
     GM-test: voeg #dag10 toe aan de URL om 10 dagen later te simuleren. */
  var entries = document.querySelectorAll(".entry");
  if (entries.length) {
    var first = parseInt(store("ulama_first_visit"), 10);
    if (!first) { first = now.getTime(); store("ulama_first_visit", String(first)); }
    var days = (now.getTime() - first) / 86400000;
    var m = /^#dag(\d+)$/.exec(location.hash);
    if (m) days = parseInt(m[1], 10);

    entries.forEach(function (entry, idx) {
      var w = parseFloat(entry.getAttribute("data-w")) || 0;
      var el = entry.querySelector(".fade");
      if (!el) return;
      var name = el.textContent;
      var frac = Math.min(1, days * GM.fadePerDay * w + (w >= 2 ? GM.baseFadeHeavy : 0));
      if (frac <= 0) return;

      // Vaste, herhaalbare volgorde van verdwijnende letters per entry.
      var order = [];
      for (var i = 0; i < name.length; i++) if (/\S/.test(name[i])) order.push(i);
      var seed = (idx + 1) * 9301;
      for (var j = order.length - 1; j > 0; j--) {
        seed = (seed * 9301 + 49297) % 233280;
        var k = Math.floor(seed / 233280 * (j + 1));
        var tmp = order[j]; order[j] = order[k]; order[k] = tmp;
      }
      var gone = {};
      var n = Math.round(order.length * frac);
      for (var g = 0; g < n; g++) gone[order[g]] = true;

      el.textContent = "";
      for (var c = 0; c < name.length; c++) {
        if (gone[c]) {
          var s = document.createElement("span");
          s.className = "gone";
          s.textContent = name[c];
          el.appendChild(s);
        } else {
          el.appendChild(document.createTextNode(name[c]));
        }
      }
      if (frac >= 1) el.setAttribute("aria-label", "");
    });
  }
})();
