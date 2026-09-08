/* ===========================================================================
   Rushbrooke Partners — behaviour
   Nothing here needs editing for normal changes. Edit assets/js/config.js.
   Vanilla JS, no libraries, no build step.
   =========================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var euro = function (n) { return '€' + n.toLocaleString('en-IE'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* =========================================================================
     1. DRAFT BAR
     ====================================================================== */
  (function draftBar() {
    var bar = $('#draft-bar');
    if (!bar || !CONFIG.draftNotice) return;
    bar.textContent = CONFIG.draftNoticeText;
    bar.hidden = false;
  })();


  /* =========================================================================
     2. NAV — mobile drawer, smooth scroll, scroll-spy
     ====================================================================== */
  (function nav() {
    var toggle = $('#nav-toggle'), links = $('#nav-links');

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Highlight the section you're looking at.
    var navLinks = $$('#nav-links a');
    var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var seen = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[en.target.id] = en.intersectionRatio; });
      var best = null, bestRatio = 0;
      sections.forEach(function (s) {
        if ((seen[s.id] || 0) > bestRatio) { bestRatio = seen[s.id]; best = s.id; }
      });
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', best !== null && a.getAttribute('href') === '#' + best);
      });
    }, { threshold: [0, 0.15, 0.4, 0.75], rootMargin: '-70px 0px -45% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  })();


  /* =========================================================================
     3. THE NET BOARD PREVIEW
     ---------------------------------------------------------------------
     The photograph has had its lettering removed, so the board underneath is
     a blank green field. We draw the prospect's name onto it with SVG text
     laid out inside the board's safe area, exactly as the production spec
     describes: single colour, reversed out, centred, no logo.

     Text is laid out by hand rather than left to the browser because SVG has
     no line wrapping: we try every sensible number of lines, measure each,
     and keep the one that fills the safe area best.
     ====================================================================== */
  (function netBoard() {
    var stage = $('#stage'), input = $('#board-input'), svg = $('#board-svg');
    if (!stage || !input || !svg) return;

    var cfg = CONFIG.netBoard;
    var lines = $('#board-lines');
    var VB_W = 900, VB_H = 653;                    // matches the board's shape in the photo
    var SAFE_W = VB_W * (1 - cfg.safeArea.x * 2);
    var SAFE_H = VB_H * (1 - cfg.safeArea.y * 2);
    var MAX_LINES = 3;

    // Place the overlay exactly over the board in the photograph.
    var board = $('#board');
    board.style.setProperty('--b-left',   cfg.rect.left + '%');
    board.style.setProperty('--b-top',    cfg.rect.top + '%');
    board.style.setProperty('--b-width',  cfg.rect.width + '%');
    board.style.setProperty('--b-height', cfg.rect.height + '%');
    board.style.setProperty('--b-rotate', cfg.rect.rotate + 'deg');

    input.maxLength = cfg.maxChars;
    input.placeholder = 'Type your business name';

    // A hidden text node we can measure against, in the SVG's own units.
    var ruler = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ruler.setAttribute('visibility', 'hidden');
    ruler.setAttribute('x', '-9999');
    svg.appendChild(ruler);

    var widthCache = {};
    function widthAt(text, size) {
      var key = size + '|' + text;
      if (widthCache[key] != null) return widthCache[key];
      ruler.setAttribute('font-size', size);
      ruler.setAttribute('font-weight', '800');
      ruler.textContent = text;
      var w = ruler.getComputedTextLength();
      widthCache[key] = w;
      return w;
    }

    // Every way of splitting `words` into exactly `n` lines. Names are short,
    // so we can afford to look at all of them and pick the best-looking one.
    function partitions(words, n) {
      if (n === 1) return [[words.join(' ')]];
      if (words.length < n) return [];
      var out = [];
      for (var cut = 1; cut <= words.length - (n - 1); cut++) {
        var head = words.slice(0, cut).join(' ');
        partitions(words.slice(cut), n - 1).forEach(function (rest) {
          out.push([head].concat(rest));
        });
      }
      return out;
    }

    function render(raw) {
      var text = (raw || '').replace(/\s+/g, ' ').trim().toUpperCase();
      stage.classList.toggle('is-empty', !text);

      var display = text || cfg.placeholder.toUpperCase();
      var words = display.split(' ');

      // Try 1..MAX_LINES and every split within each; keep the largest type.
      var LH = 1.16, best = null;
      for (var n = 1; n <= Math.min(MAX_LINES, words.length); n++) {
        var byHeight = SAFE_H / (n * LH);          // tallest type n lines can be
        partitions(words, n).forEach(function (ls) {
          var widest = 0;
          for (var i = 0; i < ls.length; i++) widest = Math.max(widest, widthAt(ls[i], 100));
          var byWidth = widest ? (SAFE_W / widest) * 100 : byHeight;
          var size = Math.min(byHeight, byWidth, 190);
          if (!best || size > best.size + 0.01) best = { size: size, ls: ls };
        });
      }
      if (!best) best = { size: 40, ls: [display] };
      best.lh = LH;

      var n = best.ls.length;
      var blockH = n * best.size * best.lh;
      var top = (VB_H - blockH) / 2 + best.size * 0.80;   // optical centring for caps

      var frag = document.createDocumentFragment();
      for (var j = 0; j < n; j++) {
        var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', VB_W / 2);
        t.setAttribute('y', (top + j * best.size * best.lh).toFixed(1));
        t.setAttribute('font-size', best.size.toFixed(1));
        t.setAttribute('opacity', text ? 1 : 0.45);
        t.textContent = best.ls[j];
        frag.appendChild(t);
      }
      lines.textContent = '';
      lines.appendChild(frag);
    }

    input.addEventListener('input', function () { render(input.value); });

    /* Ink swatches — the three colours the board spec allows. */
    var swatchBox = $('#ink-swatches');
    cfg.inks.forEach(function (ink, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch';
      b.setAttribute('aria-pressed', String(i === 0));
      b.innerHTML = '<i style="background:' + ink.hex + '"></i>' + esc(ink.label);
      b.addEventListener('click', function () {
        $$('.swatch', swatchBox).forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        lines.style.setProperty('--ink-colour', ink.hex);
      });
      swatchBox.appendChild(b);
    });
    lines.style.setProperty('--ink-colour', cfg.inks[0].hex);

    /* Close-up ↔ wide view */
    var viewBtn = $('#view-toggle'), hint = $('#stage-hint');
    viewBtn.addEventListener('click', function () {
      var wide = stage.classList.toggle('is-wide');
      viewBtn.setAttribute('aria-pressed', String(wide));
      viewBtn.textContent = wide ? 'Close-up' : 'Wide view';
      hint.textContent = wide
        ? 'The board as a player sees it walking on — Courts 1–6 carry annual partners.'
        : 'Type above — the board updates as you go.';
    });

    // Fonts can land after first paint and change the measurements.
    render('');
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { widthCache = {}; render(input.value); });
    }
  })();


  /* =========================================================================
     4. ANNUAL TIER CARDS
     ====================================================================== */
  (function annualTiers() {
    var host = $('#annual-tiers');
    if (!host) return;

    CONFIG.annualTiers.forEach(function (t) {
      var left = Math.max(0, t.total - t.sold);
      var gone = left === 0;

      var card = document.createElement('article');
      card.className = 'tier' + (gone ? ' tier--soldout' : '');
      card.setAttribute('data-id', t.id);

      var dots = '';
      for (var i = 0; i < t.total; i++) dots += '<i class="' + (i < left ? '' : 'is-gone') + '"></i>';

      var availText = gone
        ? 'Fully committed for 2027'
        : (t.total === 1 ? 'One available' : left + ' of ' + t.total + ' remaining');

      card.innerHTML =
        '<div class="tier__head">' +
          '<h3 class="tier__name">' + esc(t.name) + '</h3>' +
          '<p class="tier__blurb">' + esc(t.blurb) + '</p>' +
          '<div class="tier__price">' +
            '<span class="tier__amount">' + euro(t.founding) + '</span>' +
            '<span class="tier__tag">Founding rate 2027</span>' +
            '<span class="tier__was">Standard <s>' + euro(t.standard) + '</s></span>' +
          '</div>' +
        '</div>' +
        '<div class="tier__avail">' +
          '<span class="dots" aria-hidden="true">' + dots + '</span>' +
          '<span class="tier__availtext' + (gone ? ' is-gone' : '') + '">' + availText + '</span>' +
        '</div>' +
        '<button class="tier__toggle" type="button" aria-expanded="false">' +
          '<span>What it includes</span><span class="chev" aria-hidden="true">▼</span>' +
        '</button>' +
        '<div class="tier__panel"><div class="tier__panelinner"><ul class="tier__benefits">' +
          t.benefits.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') +
        '</ul></div></div>' +
        '<div class="tier__foot">' +
          (t.footnote ? '<p class="tier__note">' + esc(t.footnote) + '</p>' : '') +
          '<a class="btn ' + (gone ? 'btn--ghost' : 'btn--green') + '" href="#enquire" data-interest="' + esc(t.name) + '">' +
            (gone ? 'Join the waiting list' : 'Enquire about this') +
          '</a>' +
        '</div>';

      var btn = $('.tier__toggle', card), panel = $('.tier__panel', card);
      btn.addEventListener('click', function () {
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });

      host.appendChild(card);
    });
  })();


  /* =========================================================================
     5. TOURNAMENT MINI-CARDS
     ====================================================================== */
  (function tournamentTiers() {
    var host = $('#tournament-tiers');
    if (!host) return;

    CONFIG.tournamentTiers.forEach(function (t) {
      var left = Math.max(0, t.total - t.sold);
      var el = document.createElement('article');
      el.className = 'mini';
      el.innerHTML =
        '<h3>' + esc(t.name) + '</h3>' +
        '<p class="mini__price">' + euro(t.price) +
          (t.unit ? ' <span class="mini__unit">' + esc(t.unit) + '</span>' : '') + '</p>' +
        '<p class="mini__avail">' + (left === 0 ? 'Fully committed' : left + ' available') + '</p>' +
        '<p>' + esc(t.blurb) + '</p>' +
        '<a class="btn btn--ghost btn--sm" href="#enquire" data-interest="' + esc(t.name) + '">Enquire</a>';
      host.appendChild(el);
    });
  })();


  /* =========================================================================
     6. WHERE THE MONEY GOES — bars animate when scrolled into view
     ====================================================================== */
  (function money() {
    var host = $('#money-chart');
    if (!host) return;

    CONFIG.moneySplit.forEach(function (m) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      bar.innerHTML =
        '<div class="bar__top"><span class="bar__label">' + esc(m.label) + '</span>' +
        '<span class="bar__pct">' + m.pct + '%</span></div>' +
        '<div class="bar__track"><div class="bar__fill" data-pct="' + m.pct + '"></div></div>';
      host.appendChild(bar);
    });

    var fills = $$('.bar__fill', host);
    var fill = function () { fills.forEach(function (f) { f.style.width = f.dataset.pct + '%'; }); };

    if (!('IntersectionObserver' in window)) { fill(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { fill(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(host);
  })();


  /* =========================================================================
     7. CONTACT CARD + FOOTER
     ====================================================================== */
  (function contact() {
    var c = CONFIG.contact;
    var card = $('#contact-card');
    if (card) {
      var items = '';
      if (c.phone) {
        items += '<li><b>Direct line</b><a href="tel:' + esc(c.phone.replace(/\s+/g, '')) + '">' + esc(c.phone) + '</a></li>';
      }
      if (c.email) {
        items += '<li><b>Email</b><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></li>';
      }
      items += '<li><b>The club</b>' + esc(c.address) + '</li>';

      card.innerHTML =
        '<img class="card__crest" src="assets/img/crest-256.png" width="256" height="256" alt="" aria-hidden="true">' +
        '<h3>' + esc(c.name) + '</h3>' +
        '<p class="role">' + esc(c.role) + '</p>' +
        '<ul>' + items + '</ul>';
    }

    var fl = $('#footer-links');
    if (fl) {
      fl.innerHTML = '<a href="' + esc(c.clubSite) + '">rushbrooketennis.com</a>' +
        (c.email ? ' · <a href="mailto:' + esc(c.email) + '">Partnership enquiries</a>' : '');
    }
    var fa = $('#footer-address');
    if (fa) fa.textContent = c.address;

    // The wall itself carries one plaque per annual partner across every tier
    // whose benefits mention it (Premier Club Partner, Club Partner, Friends of
    // Rushbrooke — see config.js) — 1 + 5 + 9 = 15, matching the mockup. Sum
    // from config rather than hardcode, so a tier count change here follows
    // automatically instead of drifting out of sync with the wall photo.
    var slots = $('#partner-slots');
    if (slots) {
      var WALL_TIER_IDS = ['premier', 'club', 'friends'];
      var n = CONFIG.annualTiers
        .filter(function (t) { return WALL_TIER_IDS.indexOf(t.id) !== -1; })
        .reduce(function (sum, t) { return sum + t.total; }, 0);
      for (var i = 0; i < n; i++) {
        var li = document.createElement('li');
        li.textContent = 'Your business here';
        slots.appendChild(li);
      }
    }
  })();


  /* =========================================================================
     8. ENQUIRY FORM
     ---------------------------------------------------------------------
     If CONFIG.formEndpoint is set, we POST there. Otherwise we open the
     prospect's own mail app with the whole enquiry already written out.
     ====================================================================== */
  (function form() {
    var f = $('#enquiry-form'), status = $('#form-status'), interest = $('#f-interest');
    if (!f) return;

    // Build the dropdown from the tiers, so it can never drift out of date.
    var opts = ['<option value="">I\'m not sure yet — tell me more</option>'];
    CONFIG.annualTiers.forEach(function (t) {
      opts.push('<option value="' + esc(t.name) + '">' + esc(t.name) + ' — ' + euro(t.founding) + '</option>');
    });
    CONFIG.tournamentTiers.forEach(function (t) {
      opts.push('<option value="' + esc(t.name) + '">' + esc(t.name) + ' (tournament) — ' + euro(t.price) + '</option>');
    });
    interest.innerHTML = opts.join('');

    // "Enquire about this" on any card pre-selects that tier.
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-interest]') : null;
      if (!a) return;
      var name = a.getAttribute('data-interest');
      var match = $$('option', interest).filter(function (o) { return o.value === name; })[0];
      if (match) {
        interest.value = name;
        interest.classList.add('is-set');
      }
    });

    function say(msg, kind) {
      status.textContent = msg;
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
    }

    f.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = ['#f-name', '#f-business', '#f-email'];
      var bad = null;
      required.forEach(function (sel) {
        var el = $(sel);
        var ok = el.value.trim() !== '' && (el.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !bad) bad = el;
      });
      if (bad) { say('Please check the highlighted fields.', 'err'); bad.focus(); return; }

      var data = {
        name: $('#f-name').value.trim(),
        business: $('#f-business').value.trim(),
        email: $('#f-email').value.trim(),
        phone: $('#f-phone').value.trim(),
        interest: interest.value || 'Not sure yet',
        message: $('#f-message').value.trim(),
        // Formspree reads these two specially: _subject becomes the email's
        // subject line (so the inbox is scannable at a glance), and having a
        // field literally named "email" makes Formspree set Reply-To to it —
        // reply in the inbox and it goes straight to the prospect.
        _subject: 'Partnership enquiry — ' + $('#f-business').value.trim()
      };

      if (CONFIG.formEndpoint) {
        say('Sending…');
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error('bad response');
          f.reset();
          say('Thank you — that\'s with ' + CONFIG.contact.name.split(' ')[0] + '. You\'ll hear back within a couple of days.', 'ok');
        }).catch(function () {
          say('That didn\'t send. Email ' + (CONFIG.contact.email || 'the club') + ' and we\'ll pick it up.', 'err');
        });
        return;
      }

      // No endpoint configured — hand it to the prospect's own email app.
      var body =
        'Name: ' + data.name + '\n' +
        'Business: ' + data.business + '\n' +
        'Email: ' + data.email + '\n' +
        'Phone: ' + (data.phone || '—') + '\n' +
        'Interested in: ' + data.interest + '\n\n' +
        (data.message || '') + '\n';
      var href = 'mailto:' + encodeURIComponent(CONFIG.contact.email || '') +
        '?subject=' + encodeURIComponent('Rushbrooke partnership enquiry — ' + data.business) +
        '&body=' + encodeURIComponent(body);
      window.location.href = href;
      say('Opening your email app with the enquiry filled in — press send and it\'s with us.', 'ok');
    });
  })();

})();
