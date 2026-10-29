const data = window.UNIVERSE_DATA;
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const pad = number => String(number).padStart(2, '0');
const images = data.media.filter(item => item.type === 'image');
const videos = data.media.filter(item => item.type === 'video');
const hero = data.media.find(item => item.hero) || images.find(item => item.featured) || images[0];
const garba = images.find(item => item.category === 'surat-garba-nights');
const universeLabel = data.nickname ? `A LITTLE UNIVERSE CALLED ${data.nickname.toUpperCase()}` : 'A LITTLE UNIVERSE';
const emptyGallery = '<div class="empty reveal"><p class="eyebrow">THE ARCHIVE IS OPEN</p><h3>Waiting for the first memory.</h3><p>Add photos to <code>uploads/</code>, then list them in <code>assets/site-data.js</code>.</p></div>';

function memoryCard(item) {
  return `<article class="memory reveal" data-category="${escapeHtml(item.category || '')}" data-date="${escapeHtml(item.date || '')}" data-src="${escapeHtml(item.src)}" data-caption="${escapeHtml(item.caption || item.title || '')}"><div class="memory-image"><img loading="lazy" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption || item.title || 'Memory')}"><span class="memory-open" aria-hidden="true">↗</span></div><div class="meta"><h3>${escapeHtml(item.title || 'A little memory')}</h3><small>${escapeHtml(item.caption || '')}</small></div></article>`;
}
function videoCard(item) {
  return `<article class="memory reveal"><video controls preload="metadata" src="${escapeHtml(item.src)}" aria-label="${escapeHtml(item.caption || item.title || 'Video memory')}"></video><div class="meta"><h3>${escapeHtml(item.title || 'Replay')}</h3><small>${escapeHtml(item.caption || '')}</small></div></article>`;
}
function renderSite() {
  document.title = `Happy Birthday ${data.herName} | A Little Universe by ${data.myName}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', data.tagline);
  document.body.innerHTML = `
<div class="intro" id="intro" aria-label="Welcome"><div class="stars"></div><button class="skip" id="skip">Skip intro</button><div class="intro-inner"><p class="eyebrow">${escapeHtml(universeLabel)}</p>${data.intro.map((line, i) => `<div class="line ${i === 0 ? 'active' : ''}">${escapeHtml(line)}</div>`).join('')}<div class="intro-actions"><button class="button" id="enter">Enter your little universe <span aria-hidden="true">✦</span></button></div></div></div>
<div class="scroll-meter" aria-hidden="true"><span></span></div>
<nav><a class="brand" href="#top">A little universe<span>.</span></a><div class="nav-links"><a href="#chapters">Chapters</a><a href="#memories">Memories</a><a href="#gamezone">Replay</a><a href="#letter">Letter</a></div><a class="nav-mark" href="#memories" aria-label="Jump to the memory gallery">01</a></nav>
<header class="hero" id="top"><div class="stars"></div><div class="hero-aurora"></div><div class="hero-grain"></div><div class="hero-content reveal"><p class="eyebrow">${escapeHtml(universeLabel)}</p><h1>${escapeHtml(data.heroHeading)}</h1><p class="lead">${escapeHtml(data.heroText)}</p><p class="hero-detail">${escapeHtml(data.heroDetail)}</p><div class="hero-actions"><a class="button" href="#chapters">Discover the story <span aria-hidden="true">↓</span></a><a class="text-link" href="#memories">Open the gallery <span aria-hidden="true">↗</span></a></div><p class="scroll-prompt"><span></span>Scroll to begin</p></div><div class="hero-photo ${hero ? '' : 'empty'}"><div class="hero-photo-frame">${hero ? `<img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.caption || hero.title || 'Featured memory')}">` : ''}</div><p class="hero-photo-caption">${escapeHtml(hero?.caption || hero?.title || 'A favorite memory, waiting to be added')}</p></div><div class="hero-index" aria-hidden="true"><span>01</span><i></i><span>∞</span></div></header>
<main>
<section class="section chapters-section" id="chapters"><div class="section-heading reveal"><p class="eyebrow">OUR JOURNEY SO FAR</p><h2>A few chapters<br>of <em>us.</em></h2><p class="intro-copy">A friendship told through the little moments, growing closeness, and memories still waiting to be made.</p></div><div class="timeline" aria-label="Story chapters">${data.chapters.map((chapter, i) => `<article class="chapter reveal"><span class="num">${pad(i + 1)}</span><div><p class="eyebrow">${escapeHtml(chapter[1])}</p><h3>${escapeHtml(chapter[0])}</h3><p>${escapeHtml(chapter[2])}</p></div></article>`).join('')}</div></section>
<section class="section memories-section" id="memories"><div class="section-heading split-heading reveal"><div><p class="eyebrow">THE MEMORY VAULT</p><h2>Proof that the<br>little things <em>matter.</em></h2></div><p class="intro-copy">Every picture holds a piece of the story we keep returning to.</p></div><div class="gallery-tools reveal"><div class="filter-scroll"><button class="filter active" data-filter="all">All memories</button>${data.categories.map(category => `<button class="filter" data-filter="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</button>`).join('')}</div><div class="gallery-inputs"><input id="gallery-search" type="search" placeholder="Find a memory" aria-label="Search memory captions"><select id="gallery-sort" aria-label="Sort memories"><option value="new">Newest first</option><option value="old">Oldest first</option><option value="date">Memory date</option></select></div></div>${images.length ? `<div class="media-grid" id="gallery">${images.map(memoryCard).join('')}</div>` : emptyGallery}</section>
<section class="section gamezone" id="gamezone"><div class="section-heading reveal"><p class="eyebrow">PERSONAL ARCADE</p><h2>Press play on<br>the <em>good bits.</em></h2><p class="intro-copy">A little space for the games, the laughs, and the moments worth replaying.</p></div><div class="scoreboard reveal"><div class="score"><b>${data.media.length}</b><span>saved memories</span></div><div class="score"><b>${videos.length}</b><span>game videos</span></div><div class="score"><b>${images.filter(item => item.favorite).length}</b><span>favorites</span></div><div class="score"><b>${data.chapters.length}</b><span>chapters</span></div></div><div class="replay-heading reveal"><p class="eyebrow">NOW PLAYING</p><h3>The replay room</h3></div>${videos.length ? `<div class="media-grid video-grid">${videos.map(videoCard).join('')}</div>` : `<div class="empty reveal">Game-zone videos will appear here after ${escapeHtml(data.myName || 'a friend')} adds them.</div>`}</section>
<section class="section garba" id="garba"><div class="garba-showcase"><div class="garba-photo reveal">${garba ? `<img loading="lazy" src="${escapeHtml(garba.src)}" alt="${escapeHtml(garba.caption || 'An evening in Surat')}">` : '<div class="empty">Garba photographs will glow here.</div>'}</div><div class="garba-copy reveal"><p class="eyebrow">SURAT, NAVRATRI</p><h2>That night<br>in <em>Surat.</em></h2><p>A little color, a little music, and another memory to keep close. The kind of night that deserves its own page.</p><a href="#memories" class="text-link">Visit the complete gallery <span aria-hidden="true">↗</span></a></div></div></section>
<section class="section notes-section" id="notes"><div class="section-heading reveal"><p class="eyebrow">HIDDEN ENVELOPES</p><h2>A few little things<br>I want you to <em>know.</em></h2></div><div class="envelopes">${data.notes.map((note, i) => `<button class="envelope reveal" data-title="${escapeHtml(note[0])}" data-message="${escapeHtml(note[1])}"><span>Note ${pad(i + 1)}</span><strong>${escapeHtml(note[0])}</strong><i aria-hidden="true">↗</i></button>`).join('')}</div></section>
<section class="section quiz-section" id="quiz"><div class="quiz-layout"><div class="section-heading reveal"><p class="eyebrow">A TINY GAME</p><h2>How well do you remember the <em>good bits?</em></h2></div><div class="quizbox reveal"><p class="eyebrow" id="quiz-progress">Ready when you are</p><h3 id="quiz-prompt">A little memory challenge, just for fun.</h3><div id="quiz-options"></div><button id="quiz-start">Start challenge <span aria-hidden="true">→</span></button></div></div></section>
<section class="section constellation-section"><div class="section-heading reveal"><p class="eyebrow">THE FUTURE CONSTELLATION</p><h2>Memories we haven't<br>made <em>yet.</em></h2><p class="intro-copy">Not promises—just lovely possibilities, floating somewhere ahead.</p></div><div class="constellation">${data.ideas.map((idea, i) => `<button class="star-card reveal" aria-expanded="false"><span class="star-number">${pad(i + 1)}</span><strong>${escapeHtml(idea[0])}</strong><p>${escapeHtml(idea[1])}</p><i aria-hidden="true">+</i></button>`).join('')}</div></section>
<section class="section letter-section" id="letter"><div class="letter-wrap reveal"><p class="eyebrow">FROM ${escapeHtml((data.myName || 'A friend').toUpperCase())}, WITH LOVE AND CARE</p><h2>A letter for ${escapeHtml(data.herName || 'you')}</h2><p class="letter-intro">Open when you have a quiet moment.</p><button class="seal" id="open-letter" aria-expanded="false"><span>Open</span></button><div class="letter" id="letter-body">${escapeHtml(data.letter)}</div></div></section>
<section class="section final"><div class="stars"></div><div class="final-inner reveal"><p class="eyebrow">ONE LAST LITTLE THING</p><h2>Until the next memory.</h2><p class="letterlike">${escapeHtml(data.finalMessage)}</p><p class="final-actions"><a href="#memories" class="button">Revisit our memories <span aria-hidden="true">↑</span></a><button class="ghost" id="restart">Start again</button></p></div></section>
</main><div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="Memory viewer"><div class="modal-inner"><button class="modal-close" id="modal-close" aria-label="Close memory viewer">×</button><img id="modal-img" alt=""><p class="modal-caption" id="modal-caption"></p></div></div><div class="toast" id="toast" role="status"></div>`;
}

renderSite();
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const intro = $('#intro'), lines = $$('.intro .line');
let introLine = 0;
function showIntroLine() {
  lines.forEach((line, index) => line.classList.toggle('active', index === introLine));
  if (introLine < lines.length - 1) {
    window.setTimeout(() => { introLine += 1; showIntroLine(); }, 1900);
  } else {
    window.setTimeout(exitIntro, 2600);
  }
}
function exitIntro() { intro?.classList.add('out'); sessionStorage.setItem('universe-intro', 'seen'); }
if (sessionStorage.getItem('universe-intro') === 'seen' || new URLSearchParams(window.location.search).has('skip-intro')) exitIntro();
else window.setTimeout(showIntroLine, 1350);
$('#enter')?.addEventListener('click', exitIntro); $('#skip')?.addEventListener('click', exitIntro);
const meter = $('.scroll-meter span'), nav = $('nav');
function updateScrollDetails() { const max = document.documentElement.scrollHeight - window.innerHeight; if (meter) meter.style.height = `${max ? (window.scrollY / max) * 100 : 0}%`; nav?.classList.toggle('scrolled', window.scrollY > 28); }
window.addEventListener('scroll', updateScrollDetails, { passive: true }); updateScrollDetails();
const heroElement = $('.hero');
if (heroElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const moveConstellation = event => {
    const point = event.touches ? event.touches[0] : event;
    const bounds = heroElement.getBoundingClientRect();
    if (!point || !bounds.width || !bounds.height) return;
    const x = (point.clientX - bounds.left) / bounds.width - .5;
    const y = (point.clientY - bounds.top) / bounds.height - .5;
    heroElement.style.setProperty('--constellation-x', `${x * 18}px`);
    heroElement.style.setProperty('--constellation-y', `${y * 14}px`);
    heroElement.classList.add('constellation-awake');
  };
  heroElement.addEventListener('pointermove', moveConstellation, { passive: true });
  heroElement.addEventListener('touchmove', moveConstellation, { passive: true });
  heroElement.addEventListener('pointerleave', () => heroElement.classList.remove('constellation-awake'));
}
const revealItems = $$('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) revealItems.forEach(item => item.classList.add('is-visible'));
else { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: '0px 0px -30px' }); revealItems.forEach(item => observer.observe(item)); }
let activeFilter = 'all';
const memories = $$('.memory[data-category]');
function filterGallery() { const query = ($('#gallery-search')?.value || '').trim().toLowerCase(); memories.forEach(memory => { memory.hidden = !((activeFilter === 'all' || memory.dataset.category === activeFilter) && memory.textContent.toLowerCase().includes(query)); }); }
$$('.filter').forEach(button => button.addEventListener('click', () => { $$('.filter').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeFilter = button.dataset.filter; filterGallery(); }));
$('#gallery-search')?.addEventListener('input', filterGallery);
$('#gallery-sort')?.addEventListener('change', event => { const gallery = $('#gallery'); if (!gallery) return; const direction = event.target.value === 'old' ? 1 : -1; [...gallery.children].sort((a, b) => direction * a.dataset.date.localeCompare(b.dataset.date)).forEach(card => gallery.append(card)); });
const modal = $('#modal'), modalImage = $('#modal-img'); let currentMemory = -1;
const visibleMemories = () => memories.filter(memory => !memory.hidden);
function openMemory(index) { const memory = memories[index]; if (!memory || !modal || !modalImage) return; currentMemory = visibleMemories().indexOf(memory); modalImage.src = memory.dataset.src; modalImage.alt = memory.dataset.caption || 'Memory'; $('#modal-caption').textContent = memory.dataset.caption || ''; modal.classList.add('show'); document.body.style.overflow = 'hidden'; $('#modal-close')?.focus(); }
function closeMemory() { modal?.classList.remove('show'); if (modalImage) modalImage.src = ''; document.body.style.overflow = ''; }
function moveMemory(step) { const visible = visibleMemories(); if (!visible.length) return; currentMemory = (currentMemory + step + visible.length) % visible.length; openMemory(memories.indexOf(visible[currentMemory])); }
memories.forEach((memory, index) => memory.addEventListener('click', () => openMemory(index)));
$('#modal-close')?.addEventListener('click', closeMemory); modal?.addEventListener('click', event => { if (event.target === modal) closeMemory(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMemory(); if (modal?.classList.contains('show') && event.key === 'ArrowRight') moveMemory(1); if (modal?.classList.contains('show') && event.key === 'ArrowLeft') moveMemory(-1); });
function toast(message) { const box = $('#toast'); if (!box) return; box.textContent = message; box.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = window.setTimeout(() => box.classList.remove('show'), 5600); }
$$('.envelope').forEach(envelope => envelope.addEventListener('click', () => toast(`${envelope.dataset.title} — ${envelope.dataset.message}`)));
$$('.star-card').forEach(card => card.addEventListener('click', () => { card.classList.toggle('open'); card.setAttribute('aria-expanded', String(card.classList.contains('open'))); }));
$('#open-letter')?.addEventListener('click', () => { $('#letter-body')?.classList.add('open'); $('#open-letter').setAttribute('aria-expanded', 'true'); $('#open-letter').style.display = 'none'; });
$('#restart')?.addEventListener('click', () => { sessionStorage.removeItem('universe-intro'); window.location.reload(); });
let questionIndex = 0, score = 0;
function renderQuestion() { const progress = $('#quiz-progress'), prompt = $('#quiz-prompt'), options = $('#quiz-options'), start = $('#quiz-start'); if (!progress || !prompt || !options || !start) return; if (questionIndex >= data.questions.length) { progress.textContent = 'Challenge complete'; prompt.textContent = data.questions.length ? `You got ${score} out of ${data.questions.length}. The best part is the memories still waiting to be made.` : 'Add some friendly questions to site-data.js.'; options.innerHTML = ''; start.textContent = 'Restart challenge'; start.style.display = 'inline-flex'; return; } const question = data.questions[questionIndex]; progress.textContent = `Question ${questionIndex + 1} of ${data.questions.length}`; prompt.textContent = question.prompt; options.innerHTML = ''; question.options.forEach((option, index) => { const button = document.createElement('button'); button.className = 'ghost'; button.textContent = option; button.addEventListener('click', () => { toast(index === question.correct ? 'That’s right ✦' : 'A sweet try—on to the next one.'); if (index === question.correct) score += 1; questionIndex += 1; renderQuestion(); }); options.append(button); }); start.style.display = 'none'; }
$('#quiz-start')?.addEventListener('click', () => { questionIndex = 0; score = 0; renderQuestion(); });
