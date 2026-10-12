(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const html = document.documentElement;
  const WORK = window.WORK || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';

  /* ───────── Project data ───────── */
  const PROJECTS = [
    { slug: 'forex-expo-dubai', title: 'Forex Expo Dubai', client: 'HQMENA · Trasol', year: '2026', place: 'Dubai, UAE', bg: '#4a1840', cover: [9, 23, 33],
      desc: 'The full campaign for the 22–23 September edition at Dubai World Trade Centre. It covers speaker line-ups, media-partner kits, booth sales, IB-network ads, emailers and countdowns, all in a red-violet system built around the rising-arrow motif.' },
    { slug: 'crypto-expo-dubai', title: 'Crypto Expo Dubai', client: 'HQMENA · Trasol', year: '2026', place: 'Dubai, UAE', bg: '#17113d', cover: [25, 18, 23],
      desc: 'A neon-on-navy identity for the 8th edition: ticket tiers, VIP passes, speaker cards, agenda launches, app promos and a full countdown series.' },
    { slug: 'money-expo-india', title: 'Money Expo India', client: 'HQMENA · Trasol', year: '2026', place: 'Mumbai, India', bg: '#1838c4', cover: [3, 6, 9],
      desc: 'A playful isometric chess world on a cobalt checkerboard for India\'s leading financial expo at Jio World Convention Centre. It spans sponsor welcomes, speakers, "filling fast" sales pushes and countdowns.' },
    { slug: 'money-expo-abu-dhabi', title: 'Money Expo Abu Dhabi', client: 'HQMENA · Trasol', year: '2026', place: 'Abu Dhabi, UAE', bg: '#0d4434', cover: [2, 6, 3],
      desc: 'An emerald campaign with Islamic geometric patterns and skyline illustrations for ADNEC Centre: diamond sponsors, speaker podiums, agenda launches and IB-focused emailers.' },
    { slug: 'money-expo-argentina', title: 'Money Expo Argentina', client: 'HQMENA · Trasol', year: '2026', place: 'Buenos Aires', bg: '#222b66', cover: [2, 16, 17],
      desc: 'A Spanish-language launch campaign for the first Buenos Aires edition at the Hilton, with speaker reveals, titanium sponsors, media-partner walls and registration drives in a blue and gold sunburst system.' },
    { slug: 'money-expo-mexico', title: 'Money Expo Mexico', client: 'HQMENA · Trasol', year: '2026 — 27', place: 'Mexico City', bg: '#9c1f63', cover: [3, 7, 4],
      desc: 'A sponsorship and ticketing campaign for Centro Citibanamex in hot magenta, from "Ready to own LATAM" sales decks to the third-edition ticket push.' },
    { slug: 'money-expo-colombia', title: 'Money Expo Colombia', client: 'HQMENA · Trasol', year: '2025 — 26', place: 'Bogotá', bg: '#0f356f', cover: [2, 4],
      desc: 'Bilingual campaign visuals for Agora Bogotá: speaker features, final calls for sponsors and calendar drives, with Colombian geometric patterns.' },
    { slug: 'online-trading-expo', title: 'Online Trading Expo', client: 'HQMENA · Trasol', year: '2026', place: 'Hong Kong', bg: '#a3121a', cover: [1, 3, 2],
      desc: 'A bold red system for AsiaWorld-Expo built around a Chinese papercut horse for the Year of the Horse, covering exhibitor counts, seasonal greetings and conference highlights.' },
    { slug: 'webl-caravans', title: 'Caravan Marketing', client: 'Web Logix Australia', year: '2020 — 25', place: 'Australia', bg: '#2a2a2a',
      desc: 'Hundreds of dealer and manufacturer creatives for Australian caravans and RVs: launch posts, model spotlights, off-road features and deal promotions.' },
    { slug: 'webl-property', title: 'Property & Investment', client: 'Web Logix Australia', year: '2020 — 25', place: 'Australia', bg: '#352e24',
      desc: 'Lot launches, custom-home campaigns, resort investment offers and income-fund creatives for Australian developers and investment brands.' },
    { slug: 'webl-products', title: 'Products & Brand', client: 'Web Logix Australia', year: '2020 — 25', place: 'Australia', bg: '#232a31',
      desc: 'Product posters, tool and equipment ads, food and retail visuals, and IT-services branding.' },
  ].filter(p => WORK[p.slug] && WORK[p.slug].length);

  const thumb = (img) => img.f + '-t.webp';
  const full = (img) => img.f + '.webp';

  function coverImages(p) {
    const list = WORK[p.slug];
    if (p.cover) return p.cover.map(i => list[i - 1]).filter(Boolean);
    return list.filter(i => i.fmt === 'square' || i.fmt === 'portrait').slice(0, 3);
  }

  /* ───────── Render: work cards ───────── */
  const track = $('[data-track]');
  PROJECTS.forEach((p, i) => {
    const n = String(i + 1).padStart(2, '0');
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__top"><b>${n}</b><span>${p.year}</span><span>${p.client}</span><span>${p.place}</span></div>
      <div class="card__cover" style="--cbg:${p.bg}" data-view data-open="${p.slug}" role="button" tabindex="0" aria-label="Open ${p.title} gallery">
        ${coverImages(p).map(img => `<img src="${thumb(img)}" alt="" loading="lazy" width="${img.w}" height="${img.h}">`).join('')}
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <button class="card__btn" data-open="${p.slug}">View project <span>→</span> <sup>${WORK[p.slug].length}</sup></button>
      </div>`;
    track.appendChild(card);
  });

  /* ───────── Render: strip ───────── */
  (function buildStrip() {
    const pool = [];
    PROJECTS.slice(0, 8).forEach(p => WORK[p.slug].filter(i => i.fmt === 'square' || i.fmt === 'portrait').slice(0, 4).forEach(i => pool.push(i)));
    const rows = $$('[data-strip]');
    const half = Math.ceil(pool.length / 2);
    [pool.slice(0, half), pool.slice(half)].forEach((set, r) => {
      if (!rows[r]) return;
      rows[r].innerHTML = set.map(img => `<img src="${thumb(img)}" alt="" loading="lazy" width="${img.w}" height="${img.h}">`).join('');
    });
  })();

  /* ───────── Render: services ───────── */
  const SERVICES = [
    ['Event campaigns', 'End-to-end visual systems for expos and conferences, from the first save-the-date to the final-day push, consistent across every touchpoint and market.', ['Speaker cards', 'Sponsor reveals', 'Countdowns', 'Agenda launches', 'Booth sales']],
    ['Social & digital ads', 'Scroll-stopping creatives sized for every placement and built to convert, with clear hierarchy, strong hooks and on-brand variations at speed.', ['Meta & LinkedIn', 'Stories & reels covers', 'Carousels', 'Display banners']],
    ['Email & web creatives', 'Emailers and web headers designed to be sliced and built: readable on mobile, with CTAs placed where people actually click.', ['Emailers', 'Landing banners', 'Web headers', 'HTML-ready slices']],
    ['Brand & print', 'Identity systems, booth graphics and print-ready artwork that hold up from a phone screen to a 6-metre backdrop.', ['Identity systems', 'Booth & stage', 'Badges & lanyards', 'Brochures']],
    ['AI-assisted design', 'Using AI where it helps: faster ideation, background generation, upscaling and clean-up, always finished by hand.', ['Midjourney', 'Firefly', 'NanoBanana', 'ChatGPT', 'Upscayl']],
  ];
  const acc = $('[data-acc]');
  SERVICES.forEach(([name, text, tags], i) => {
    const li = document.createElement('li');
    li.className = 'acc__item';
    const id = 'acc-' + i;
    li.innerHTML = `
      <button class="acc__head" aria-expanded="false" aria-controls="${id}">
        <span class="acc__num">${String(i + 1).padStart(2, '0')}</span>
        <span class="acc__name">${name}</span>
        <span class="acc__hint"></span>
      </button>
      <div class="acc__panel" id="${id}"><div class="acc__inner"><div class="acc__content">
        <span></span><p>${text}</p><div class="acc__tags">${tags.map(t => `<span>${t}</span>`).join('')}</div>
      </div></div></div>`;
    acc.appendChild(li);
  });
  acc.addEventListener('click', (e) => {
    const head = e.target.closest('.acc__head');
    if (!head) return;
    const item = head.parentElement;
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', open);
    if (hasGsap) setTimeout(() => ScrollTrigger.refresh(), 650);
  });

  /* ───────── Smooth scroll ───────── */
  let lenis = null;
  if (hasGsap && window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const lockScroll = (on) => {
    html.classList.toggle('is-locked', on);
    if (lenis) on ? lenis.stop() : lenis.start();
  };

  /* ───────── Section transitions ───────── */
  const curtain = $('.curtain');
  const curtainCols = $$('.curtain__cols span');
  const curtainText = $$('.curtain__word, .curtain__num');
  let navBusy = false;
  if (hasGsap) gsap.set(curtainText, { yPercent: 110 });

  function jumpTo(target) {
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target.scrollIntoView();
    if (window.ScrollTrigger) ScrollTrigger.update();
  }

  // curtain wipe: cover → jump → reveal
  function curtainTo(target, label, num) {
    if (navBusy) return;
    if (!hasGsap || reduced) { closeMenu(); target.scrollIntoView(); return; }
    navBusy = true;
    $('[data-curtain-title]').textContent = label;
    $('[data-curtain-num]').textContent = num ? `(${num})` : '';
    curtain.classList.add('is-active');
    gsap.timeline({ onComplete: () => { curtain.classList.remove('is-active'); navBusy = false; } })
      .set(curtainCols, { transformOrigin: '50% 100%' })
      .set(curtainText, { yPercent: 110, autoAlpha: 1 })
      .to(curtainCols, { scaleY: 1, duration: 0.6, ease: 'expo.inOut', stagger: 0.04 })
      .to(curtainText, { yPercent: 0, duration: 0.6, ease: 'expo.out', stagger: 0.05 }, '-=0.25')
      .add(() => { closeMenu(); jumpTo(target); })
      .to(curtainText, { yPercent: -110, duration: 0.4, ease: 'expo.in', stagger: 0.03 }, '+=0.15')
      .set(curtainText, { autoAlpha: 0 })
      .set(curtainCols, { transformOrigin: '50% 0%' })
      .to(curtainCols, { scaleY: 0, duration: 0.6, ease: 'expo.inOut', stagger: 0.04 }, '-=0.05');
  }

  // anchor links: nav, menu and "back to top" get the curtain; inline links scroll smoothly
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    if (a.closest('.nav, .mmenu, .foot')) {
      const num = a.querySelector('i') ? a.querySelector('i').textContent : '';
      const label = id === '#top' ? 'Home' : a.textContent.replace(num, '').trim();
      curtainTo(target, label, num);
      return;
    }
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ───────── Mobile menu ───────── */
  const menuBtn = $('.nav__menu');
  const mmenu = $('#mobile-menu');
  function closeMenu() {
    if (mmenu.hidden) return;
    mmenu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu';
    lockScroll(false);
  }
  menuBtn.addEventListener('click', () => {
    if (!mmenu.hidden) return closeMenu();
    mmenu.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.textContent = 'Close';
    lockScroll(true);
  });

  /* ───────── Gallery + lightbox ───────── */
  const gal = $('[data-gallery]');
  const grid = $('[data-g-grid]');
  const filtersEl = $('[data-g-filters]');
  const lb = $('[data-lb]');
  const lbImg = $('[data-lb-img]');
  let current = { list: [], index: 0 };
  let lastFocus = null;
  // design-type groups, in display order
  const GROUPS = [
    ['key', 'Key visuals'], ['speakers', 'Speakers'], ['partners', 'Sponsors & partners'], ['media', 'Media partner kit'],
    ['booth', 'Booth & sponsorship sales'], ['passes', 'Passes & tickets'], ['agenda', 'Agenda launches'],
    ['countdown', 'Countdowns'], ['webinar', 'Webinars'], ['emailer', 'Emailers'],
    ['offroad', 'Off-road models'], ['hybrid', 'Hybrid & pop-top'], ['touring', 'Touring & family'], ['dealer', 'Dealer promotions'],
  ];
  const groupsFor = (list) => GROUPS.filter(([k]) => list.some(i => i.t === k));
  let currentSlug = null;
  gal.setAttribute('data-lenis-prevent', '');
  lb.setAttribute('data-lenis-prevent', '');

  const tile = (img, i) =>
    `<button data-i="${i}" data-view aria-label="Open image ${i + 1}"><img src="${thumb(img)}" alt="" loading="lazy" width="${img.w}" height="${img.h}"></button>`;

  function renderGrid(all, only) {
    const groups = groupsFor(all).filter(([k]) => !only || k === only);
    if (!groups.length) {
      current.list = all;
      grid.innerHTML = `<div class="gallery__cols">${all.map(tile).join('')}</div>`;
    } else {
      current.list = [];
      grid.innerHTML = groups.map(([k, label]) => {
        const items = all.filter(i => i.t === k);
        const start = current.list.length;
        current.list.push(...items);
        return `<section class="gallery__group">
          <h3 class="gallery__gh"><span>${label}</span><sup>${String(items.length).padStart(2, '0')}</sup></h3>
          <div class="gallery__cols">${items.map((img, j) => tile(img, start + j)).join('')}</div>
        </section>`;
      }).join('');
    }
    $$('img', grid).forEach(im => {
      if (im.complete) im.classList.add('is-loaded');
      else im.addEventListener('load', () => im.classList.add('is-loaded'), { once: true });
    });
  }

  function openGallery(slug) {
    const p = PROJECTS.find(x => x.slug === slug);
    if (!p) return;
    const all = WORK[slug];
    lastFocus = document.activeElement;
    $('[data-g-title]').textContent = p.title;
    $('[data-g-meta]').textContent = `${p.client} — ${p.year} — ${p.place}`;
    $('[data-g-desc]').textContent = p.desc;
    currentSlug = slug;
    const present = groupsFor(all);
    filtersEl.innerHTML = present.length > 1
      ? [['all', 'All'], ...present].map(([k, l]) =>
        `<button data-f="${k}" aria-pressed="${k === 'all'}">${l}<sup>${k === 'all' ? all.length : all.filter(i => i.t === k).length}</sup></button>`).join('')
      : '';
    renderGrid(all);
    gal.hidden = false; gal.scrollTop = 0;
    lockScroll(true);
    if (hasGsap && !reduced) gsap.fromTo(gal, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'expo.out' });
    $('[data-g-close]').focus();
  }
  function closeGallery() {
    const done = () => { gal.hidden = true; lockScroll(false); lastFocus && lastFocus.focus(); };
    if (hasGsap && !reduced) gsap.to(gal, { yPercent: 100, duration: 0.6, ease: 'expo.in', onComplete: done });
    else done();
  }
  filtersEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]');
    if (!b) return;
    $$('[data-f]', filtersEl).forEach(x => x.setAttribute('aria-pressed', x === b));
    renderGrid(WORK[currentSlug], b.dataset.f === 'all' ? null : b.dataset.f);
  });
  const groupLabel = (t) => (GROUPS.find(([k]) => k === t) || [])[1] || '';
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const title = $('[data-g-title]').textContent;
    openLb(current.list.map(img => ({ img, cap: [title, groupLabel(img.t)].filter(Boolean).join(' · ') })), +b.dataset.i, b);
  });
  $('[data-g-close]').addEventListener('click', closeGallery);

  // lightbox works on any list of { img, cap }
  const lbState = { items: [], index: 0, back: null };
  function showLb() {
    const { img, cap } = lbState.items[lbState.index];
    lbImg.src = thumb(img);
    const hi = new Image();
    hi.onload = () => { if (lbState.items[lbState.index].img === img) lbImg.src = hi.src; };
    hi.src = full(img);
    $('[data-lb-cap]').textContent = cap || '';
    $('[data-lb-count]').textContent = `${lbState.index + 1} / ${lbState.items.length}`;
  }
  function openLb(items, i, back) {
    Object.assign(lbState, { items, index: i, back });
    lb.hidden = false; showLb(); $('[data-lb-close]').focus();
    if (gal.hidden) lockScroll(true);
    if (hasGsap && !reduced) gsap.fromTo(lb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
  }
  function closeLb() {
    lb.hidden = true; lbImg.removeAttribute('src');
    if (gal.hidden) lockScroll(false);
    lbState.back && lbState.back.focus();
  }
  const step = (d) => { lbState.index = (lbState.index + d + lbState.items.length) % lbState.items.length; showLb(); };
  $('[data-lb-close]').addEventListener('click', closeLb);
  $('[data-lb-prev]').addEventListener('click', () => step(-1));
  $('[data-lb-next]').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); tx = null; });

  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      return;
    }
    if (!gal.hidden && e.key === 'Escape') closeGallery();
    if (!mmenu.hidden && e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) openGallery(o.dataset.open);
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.card__cover')) { e.preventDefault(); openGallery(e.target.dataset.open); }
  });

  const pad2 = (n) => String(n).padStart(2, '0');
  let refreshTimer = null;
  const refreshST = () => {
    if (!hasGsap || !window.ScrollTrigger) return;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  };

  /* ───────── Project index ───────── */
  const idxEl = $('[data-index]');
  idxEl.innerHTML = PROJECTS.map((p, i) => {
    const c = coverImages(p)[0] || WORK[p.slug][0];
    const type = p.client.includes('Trasol') ? 'Event campaign' : 'Marketing creatives';
    return `<li><button class="idx__row" data-open="${p.slug}" data-view data-prev="${thumb(c)}" aria-label="Open ${p.title}, ${WORK[p.slug].length} designs">
      <span class="idx__n">${pad2(i + 1)}</span>
      <span class="idx__t"><img src="${thumb(c)}" alt="" loading="lazy">${p.title}</span>
      <span class="idx__c">${type}</span>
      <span class="idx__y">${p.year}</span>
      <span class="idx__k">${pad2(WORK[p.slug].length)}</span>
    </button></li>`;
  }).join('');

  const prev = $('.preview');
  const prevInner = $('[data-preview]');
  let hidePreview = () => {};
  if (hasGsap && matchMedia('(hover: hover) and (min-width: 901px)').matches) {
    gsap.set(prev, { scale: 0.6 });
    const px = gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' });
    const py = gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' });
    let lastSrc = null;
    hidePreview = () => { lastSrc = null; gsap.to(prev, { opacity: 0, scale: 0.6, duration: 0.35, ease: 'power3.out', overwrite: 'auto' }); };
    idxEl.addEventListener('mouseenter', (e) => gsap.set(prev, { x: e.clientX, y: e.clientY }));
    idxEl.addEventListener('mousemove', (e) => { px(e.clientX); py(e.clientY); });
    idxEl.addEventListener('mouseover', (e) => {
      const r = e.target.closest('.idx__row');
      if (!r || r.dataset.prev === lastSrc) return;
      lastSrc = r.dataset.prev;
      const im = document.createElement('img');
      im.src = lastSrc; im.alt = '';
      prevInner.appendChild(im);
      gsap.fromTo(im, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.25 }, {
        clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.7, ease: 'expo.out',
        onComplete: () => { while (prevInner.children.length > 1) prevInner.firstChild.remove(); },
      });
      gsap.to(prev, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
    });
    idxEl.addEventListener('mouseleave', () => hidePreview());
    idxEl.addEventListener('click', () => hidePreview());
    // scrolling moves the list out from under a still cursor without firing mouseleave
    let mx = -1, my = -1;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const checkHover = () => {
      if (lastSrc === null) return;
      const el = document.elementFromPoint(mx, my);
      if (!el || !idxEl.contains(el)) hidePreview();
    };
    window.addEventListener('scroll', checkHover, { passive: true });
    if (lenis) lenis.on('scroll', checkHover);
  }

  /* ───────── Archive: browse by design ───────── */
  const ARC_CATS = [...GROUPS.slice(0, 10), ['caravans', 'Caravans'], ['property', 'Property & investment'], ['products', 'Products & brand']];
  const arcLabel = (k) => (ARC_CATS.find(([c]) => c === k) || [])[1] || '';
  const catOf = (slug, img) => ({ 'webl-caravans': 'caravans', 'webl-property': 'property', 'webl-products': 'products' })[slug] || img.t;

  // interleave projects so "All" mixes brands instead of listing one campaign after another
  const ARCH = [];
  const queues = PROJECTS.map(p => WORK[p.slug].map(img => ({ img, slug: p.slug, brand: p.title, cat: catOf(p.slug, img) })));
  while (queues.some(q => q.length)) queues.forEach(q => { if (q.length) ARCH.push(q.shift()); });

  const arc = { cat: 'all', brand: 'all', shown: 0, list: [] };
  const ARC_PAGE = 24;
  const catsEl = $('[data-cats]');
  const brandsEl = $('[data-brands]');
  const arcGrid = $('[data-arc-grid]');
  const arcMore = $('[data-arc-more]');
  const arcCount = $('[data-arc-count]');

  const catItems = (k) => k === 'all' ? ARCH : ARCH.filter(a => a.cat === k);
  const presentCats = [['all', 'All work'], ...ARC_CATS.filter(([k]) => catItems(k).length)];
  catsEl.innerHTML = presentCats.map(([k, label]) => {
    const items = catItems(k);
    const preferred = items.filter(a => a.img.fmt === 'square' || a.img.fmt === 'portrait');
    const picks = [...new Set([...preferred, ...items])].slice(0, 3);
    const visual = k === 'all'
      ? `<span class="cat__all" aria-hidden="true">${items.length}</span>`
      : `<span class="cat__fan" aria-hidden="true">${picks.map(a => `<img src="${thumb(a.img)}" alt="" loading="lazy">`).join('')}</span>`;
    return `<button class="cat" data-cat="${k}" aria-pressed="${k === 'all'}">
      ${visual}
      <span class="cat__row"><span class="cat__name">${label}</span><span class="cat__num">${pad2(items.length)}</span></span>
    </button>`;
  }).join('');

  function renderBrands() {
    const inCat = catItems(arc.cat);
    const brands = [['all', 'All brands', inCat.length], ...PROJECTS.map(p => [p.slug, p.title, inCat.filter(a => a.slug === p.slug).length])];
    if (arc.brand !== 'all' && !inCat.some(a => a.slug === arc.brand)) arc.brand = 'all';
    brandsEl.innerHTML = brands.map(([k, label, n]) =>
      `<button data-brand="${k}" aria-pressed="${arc.brand === k}" ${n ? '' : 'disabled'}>${label}<sup>${n}</sup></button>`).join('');
  }

  const arcTile = (a, i) => `<button class="arc__item" data-ai="${i}" data-view aria-label="${a.brand}, ${a.img.t && groupLabel(a.img.t) || arcLabel(a.cat)}">
      <img src="${thumb(a.img)}" alt="" loading="lazy" width="${a.img.w}" height="${a.img.h}">
      <span class="arc__cap"><b>${a.brand}</b><i>${groupLabel(a.img.t) || arcLabel(a.cat)}</i></span>
    </button>`;

  function renderArc(reset) {
    if (reset) {
      arc.list = catItems(arc.cat).filter(a => arc.brand === 'all' || a.slug === arc.brand);
      arc.shown = 0;
      arcGrid.innerHTML = '';
    }
    const from = arc.shown;
    arc.shown = Math.min(arc.list.length, arc.shown + ARC_PAGE);
    arcGrid.insertAdjacentHTML('beforeend', arc.list.slice(from, arc.shown).map((a, j) => arcTile(a, from + j)).join(''));
    arcCount.textContent = `Showing ${arc.shown} of ${arc.list.length} designs`;
    arcMore.parentElement.hidden = arc.shown >= arc.list.length;
    if (hasGsap && !reduced) {
      gsap.fromTo($$('.arc__item', arcGrid).slice(from), { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.03, clearProps: 'transform' });
    }
    refreshST();
  }

  function setArc(change) {
    Object.assign(arc, change);
    $$('.cat', catsEl).forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === arc.cat));
    renderBrands();
    const swap = () => renderArc(true);
    if (hasGsap && !reduced && arcGrid.children.length) {
      gsap.to(arcGrid, { autoAlpha: 0, duration: 0.25, onComplete: () => { swap(); gsap.set(arcGrid, { autoAlpha: 1 }); } });
    } else swap();
    // bring the results into view when the filter row is far above them
    const bar = $('.arc__bar');
    if (change.cat && bar.getBoundingClientRect().top > window.innerHeight * 0.55) {
      if (lenis) lenis.scrollTo(bar, { duration: 1.1 }); else bar.scrollIntoView({ behavior: 'smooth' });
    }
  }

  catsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (b) setArc({ cat: b.dataset.cat }); });
  brandsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-brand]'); if (b && !b.disabled) setArc({ brand: b.dataset.brand }); });
  arcMore.addEventListener('click', () => renderArc(false));
  arcGrid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ai]');
    if (!b) return;
    openLb(arc.list.map(a => ({ img: a.img, cap: `${a.brand} · ${groupLabel(a.img.t) || arcLabel(a.cat)}` })), +b.dataset.ai, b);
  });
  renderBrands();
  renderArc(true);

  /* ───────── Cursor ───────── */
  const cursor = $('.cursor');
  if (hasGsap && matchMedia('(hover: hover) and (min-width: 901px)').matches) {
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); cursor.style.opacity = 1; });
    document.addEventListener('mouseleave', () => { cursor.style.opacity = 0; });
    document.addEventListener('mouseover', (e) => {
      const v = e.target.closest('[data-view]');
      const l = !v && e.target.closest('a, button');
      cursor.classList.toggle('is-view', !!v);
      cursor.classList.toggle('is-link', !!l);
    });
  }

  /* ───────── No-animation fallback ───────── */
  if (!hasGsap || reduced) {
    $('[data-loader]').remove();
    html.classList.remove('is-loading');
    if (lenis) lenis.start();
    rolesLoop();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ───────── Word split for reveal ───────── */
  $$('[data-reveal-words]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="w">${w} </span>`).join('');
  });

  /* ───────── Initial states ───────── */
  gsap.set('[data-intro="line"]', { yPercent: 110 });
  gsap.set('[data-intro="nav"], [data-intro="meta"]', { autoAlpha: 0, y: 12 });
  gsap.set('[data-intro="portrait"]', { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap.set('[data-intro="portrait"] img', { scale: 1.35 });

  /* ───────── Loader ───────── */
  const countEl = $('[data-count]');
  const counter = { v: 0 };
  const portrait = $('.hero__portrait img');
  const ready = Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    portrait.complete ? Promise.resolve() : new Promise(r => { portrait.onload = r; portrait.onerror = r; }),
    new Promise(r => setTimeout(r, 1200)),
  ]);
  const countTween = gsap.to(counter, { v: 86, duration: 1.4, ease: 'power2.out', onUpdate: () => { countEl.textContent = Math.round(counter.v); } });
  const failSafe = new Promise(r => setTimeout(r, 3500));
  Promise.race([ready, failSafe]).then(() => {
    countTween.kill();
    gsap.timeline()
      .to(counter, { v: 100, duration: 0.5, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = Math.round(counter.v); } })
      .to('[data-loader]', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '+=0.15')
      .add(() => { html.classList.remove('is-loading'); $('[data-loader]').remove(); if (lenis) lenis.start(); ScrollTrigger.refresh(); }, '-=0.3')
      .add(intro(), '-=0.55');
  });

  function intro() {
    return gsap.timeline()
      .to('[data-intro="line"]', { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12 })
      .to('[data-intro="portrait"]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }, 0.1)
      .to('[data-intro="portrait"] img', { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.3)
      .to('[data-intro="nav"]', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 }, 0.5)
      .to('[data-intro="meta"]', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06 }, 0.6)
      .add(rolesLoop, 1.2);
  }

  /* ───────── Rotating roles ───────── */
  function rolesLoop() {
    const el = $('[data-roles]');
    const roles = ['expo campaigns', 'speaker cards', 'sponsor reveals', 'emailers', 'social ads', 'brand systems'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % roles.length;
      if (!hasGsap || reduced) { el.textContent = roles[i]; return; }
      gsap.timeline()
        .to(el, { yPercent: -110, duration: 0.45, ease: 'power3.in' })
        .add(() => { el.textContent = roles[i]; })
        .fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' });
    }, 2400);
  }

  /* ───────── Scroll effects ───────── */
  // hero parallax
  gsap.to('.hero__portrait img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // word reveals
  $$('[data-reveal-words]').forEach(el => {
    gsap.fromTo($$('.w', el), { opacity: 0.12 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true },
    });
  });

  // count ups
  $$('[data-countup]').forEach(el => {
    const end = +el.dataset.countup; const o = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });

  // generic fade-ups
  gsap.utils.toArray('.about__grid p, .stats li, .exp__row, .acc__item, .contact__grid > div').forEach(el => {
    gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  gsap.utils.toArray('.big').forEach(el => {
    gsap.from(el, { yPercent: 30, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.from('[data-up]', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.contact__title', start: 'top 80%' } });

  // strip rows drift with scroll
  $$('[data-strip]').forEach((row, i) => {
    gsap.fromTo(row, { xPercent: i ? -30 : 0 }, { xPercent: i ? 0 : -30, ease: 'none',
      scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // horizontal work
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.work', start: 'top top', end: () => '+=' + dist() * 0.45, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    return () => tween.kill();
  });
  mm.add('(max-width: 900px)', () => {
    gsap.utils.toArray('.card').forEach(c => gsap.from(c, { y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%' } }));
  });

  // index rows + category tiles
  gsap.set('.idx__list li, .cat', { autoAlpha: 0 });
  ScrollTrigger.batch('.idx__list li, .cat', {
    start: 'top 92%', once: true,
    onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }),
  });
  gsap.from('.idx__title', { yPercent: 40, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.idx', start: 'top 85%' } });

  // highlight the nav link for the section in view
  $$('.nav__links a').forEach(a => {
    const t = $(a.getAttribute('href'));
    if (t) ScrollTrigger.create({ trigger: t, start: 'top 50%', end: 'bottom 50%', toggleClass: { targets: a, className: 'is-active' } });
  });

  // progress
  const prog = $('[data-progress]');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => { prog.textContent = Math.round(s.progress * 100); } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
