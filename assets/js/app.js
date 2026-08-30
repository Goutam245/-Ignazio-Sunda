/* Ignazio Sunda — selezione delle linee.
   Tutto in memoria: nessun cookie, nessun archivio locale, nessuna richiesta di rete. */
(function () {
  'use strict';

  var NUM = '390000000000';
  var bar = document.querySelector('[data-selbar]');
  if (!bar) return;

  var count = bar.querySelector('[data-count]');
  var send = bar.querySelector('[data-send]');
  var clear = bar.querySelector('[data-clear]');
  var favs = Array.prototype.slice.call(document.querySelectorAll('[data-fav]'));
  var picked = [];

  function label(n) {
    return n === 1 ? '1 linea selezionata' : n + ' linee selezionate';
  }

  function list(items) {
    if (items.length === 1) return items[0];
    return items.slice(0, -1).join(', ') + ' e ' + items[items.length - 1];
  }

  function message(items) {
    var one = items.length === 1;
    return 'Buongiorno, ho un punto vendita in Sardegna. ' +
      (one ? 'Mi interessa la linea ' : 'Mi interessano queste linee: ') +
      list(items) + '. Potrei avere prezzi e minimi?';
  }

  function render() {
    var n = picked.length;
    count.textContent = label(n);
    bar.setAttribute('data-open', n > 0 ? 'true' : 'false');
    bar.setAttribute('aria-hidden', n > 0 ? 'false' : 'true');
    document.body.classList.toggle('has-sel', n > 0);
    send.href = n ? 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(message(picked))
                  : 'https://wa.me/' + NUM;
    send.tabIndex = n ? 0 : -1;
    clear.tabIndex = n ? 0 : -1;
  }

  favs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-fav');
      var at = picked.indexOf(name);
      if (at > -1) picked.splice(at, 1); else picked.push(name);
      btn.setAttribute('aria-pressed', at > -1 ? 'false' : 'true');
      render();
    });
  });

  clear.addEventListener('click', function () {
    picked = [];
    favs.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    render();
  });

  render();
})();
