const data = window.UNIVERSE_DATA;
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const pad = number => String(number).padStart(2, '0');
const images = data.media.filter(item => item.type === 'image');
const videos = data.media.filter(item => item.type === 'video');
const hero = data.media.find(item => item.hero) || images.find(item => item.featured) || images[0];
const garba = images.find(item => item.category === 'surat-garba-nights');
const universeLabel = data.nickname ? `A LITTLE UNIVERSE CALLED ${data.nickname.toUpperCase()}` : 'A LITTLE UNIVERSE';
const emptyGallery = '<div class="empty reveal"><p class="eyebrow">THE ARCHIVE IS OPEN</p><h3>Waiting for the first memory.</h3><p>Add photos to <code>uploads/</code>, then list them in <code>assets/site-data.js</code>.</p></div>';

function memoryCard(item, index) {
  return `<article class="memory reveal" data-category="${escapeHtml(item.category || '')}" data-date="${escapeHtml(item.date || '')}" data-src="${escapeHtml(item.src)}" data-caption="${escapeHtml(item.caption || item.title || '')}"><div class="memory-image"><img loading="lazy" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption || item.title || 'Memory')}"><span class="memory-open" aria-hidden="true">↗</span></div><div class="meta"><h3>${escapeHtml(item.title || 'A little memory')}</h3><small>${escapeHtml(item.caption || '')}</small></div></article>`;
}
function videoCard(item) {
  return `<article class="memory video-memory reveal" data-video-src="${escapeHtml(item.src)}" data-video-title="${escapeHtml(item.title || 'Replay')}" data-video-caption="${escapeHtml(item.caption || '')}"><video controls muted playsinline preload="metadata" src="${escapeHtml(item.src)}" aria-label="${escapeHtml(item.caption || item.title || 'Video memory')}"></video><div class="meta"><h3>${escapeHtml(item.title || 'Replay')}</h3><small>${escapeHtml(item.caption || '')}</small><button class="video-cinema" type="button">Watch in cinema <span aria-hidden="true">↗</span></button></div></article>`;
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

// A few interactive keepsakes are deliberately stored only on the visitor's device.
const mapPins = (data.memoryMap || []).map((place, index) => `<button class="map-pin pin-${escapeHtml(place.kind || 'star')}" style="--x:${Number(place.x) || 50}%;--y:${Number(place.y) || 50}%" data-title="${escapeHtml(place.title)}" data-note="${escapeHtml(place.note)}" aria-expanded="false"><span class="pin-icon" aria-hidden="true">${place.kind === 'café' ? '&#9749;' : place.kind === 'garba' ? '&#10022;' : place.kind === 'heart' ? '&#9829;' : '&#10023;'}</span><span class="pin-label">${pad(index + 1)} - ${escapeHtml(place.title)}</span></button>`).join('');
document.querySelector('#chapters')?.insertAdjacentHTML('afterend', `<section class="section memory-map-section" id="memory-map"><div class="section-heading reveal"><p class="eyebrow">PLACES WITH A STORY</p><h2>A map of our<br><em>little universe.</em></h2><p class="intro-copy">A few pins for the places that gave us something lovely to remember. Tap a pin to open its tiny story.</p></div><div class="memory-map reveal" aria-label="Map of memory places"><div class="map-orbit orbit-one"></div><div class="map-orbit orbit-two"></div>${mapPins}<div class="map-copy" aria-live="polite"><p class="eyebrow">CHOOSE A PIN</p><h3>Every place holds a feeling.</h3><p>Start anywhere on the map.</p></div></div></section>`);
document.querySelector('#garba')?.insertAdjacentHTML('afterend', `<section class="section soundtrack-section" id="playlist"><div class="section-heading reveal"><p class="eyebrow">THREE SONGS, THREE FEELINGS</p><h2>A small <em>soundtrack</em><br>for the memories.</h2></div><div class="playlist-card reveal">${(data.playlist || []).map((song, index) => `<div class="playlist-track"><span>${pad(index + 1)}</span><div><h3>${escapeHtml(song.title)}</h3><p>${escapeHtml(song.artist)}</p></div><em>${escapeHtml(song.mood)}</em></div>`).join('')}</div><p class="playlist-note reveal">A little playlist card to play alongside the photos - add these to your favorite music app whenever you revisit this page.</p></section>`);
document.querySelector('#letter')?.insertAdjacentHTML('beforebegin', `<section class="section keepsakes-section" id="guestbook"><div class="keepsakes-layout"><div class="section-heading reveal"><p class="eyebrow">A PRIVATE CORNER</p><h2>Leave a little<br><em>something back.</em></h2><p class="intro-copy">This guestbook and voice note live only in this browser. Nothing is sent anywhere.</p></div><div class="keepsake-cards reveal"><div class="guestbook-card"><p class="eyebrow">SHIVANI'S GUESTBOOK</p><label for="guestbook-message">A private reply</label><textarea id="guestbook-message" maxlength="600" placeholder="Write anything you want to keep here..." aria-describedby="guestbook-status"></textarea><div class="guestbook-actions"><span id="guestbook-status">Only this browser can see it.</span><button class="button" type="button" id="save-guestbook">Keep this note</button></div></div><div class="voice-card"><p class="eyebrow">A NOTE IN YOUR VOICE</p><h3>A handwritten audio message.</h3><p>Record a little 20-30 second voice note for this universe.</p><div class="voice-meter" aria-hidden="true"><span></span></div><p class="voice-status" id="voice-status">Ready when you are.</p><div class="voice-actions"><button class="button" type="button" id="record-voice">Record voice note</button><button class="ghost" type="button" id="play-voice" hidden>Play saved note</button><button class="ghost" type="button" id="delete-voice" hidden>Delete</button></div><audio id="voice-player" controls hidden></audio></div></div></div></section>`);
document.body.insertAdjacentHTML('beforeend', `<div class="quiz-surprise" id="quiz-surprise" role="dialog" aria-modal="true" aria-labelledby="surprise-title" hidden><div class="surprise-stars" aria-hidden="true"></div><div class="surprise-card"><button class="modal-close" id="close-surprise" aria-label="Close surprise">&times;</button><p class="eyebrow">A LITTLE SURPRISE FOR YOU</p><h2 id="surprise-title">${escapeHtml(data.quizSurprise?.title || 'You found every little piece of the story.')}</h2><p>${escapeHtml(data.quizSurprise?.message || '')}</p><button class="button" type="button" id="keep-surprise">Keep shining &#10022;</button></div></div>`);

document.querySelector('.nav-links')?.insertAdjacentHTML('afterbegin', '<a href="#memory-map">Map</a>');
document.querySelectorAll('.memory[data-category]').forEach((memory, index) => {
  memory.dataset.memoryId = index;
  memory.querySelector('.memory-image')?.insertAdjacentHTML('beforeend', '<button class="memory-reaction" type="button" aria-label="Add this memory to favorites" aria-pressed="false"><span aria-hidden="true">&#9825;</span></button>');
});
const replayHeading = document.querySelector('.replay-heading');
if (replayHeading && document.querySelectorAll('.video-grid video').length) {
  const soundtrackButton = document.createElement('button');
  soundtrackButton.className = 'ghost soundtrack-toggle';
  soundtrackButton.type = 'button';
  soundtrackButton.setAttribute('aria-pressed', 'false');
  soundtrackButton.innerHTML = '<span aria-hidden="true">♫</span> Play soft soundtrack';
  replayHeading.append(soundtrackButton);

  let audioContext;
  let soundtrackTimer;
  let soundtrackPlaying = false;
  const playNote = (context, destination, frequency, start, length, volume) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .08);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
    oscillator.connect(gain).connect(destination);
    oscillator.start(start);
    oscillator.stop(start + length + .04);
  };
  const playSoundtrackPhrase = () => {
    if (!soundtrackPlaying || !audioContext) return;
    const notes = [293.66, 369.99, 440, 587.33, 261.63, 329.63, 392, 523.25, 293.66, 369.99, 440, 659.25];
    const start = audioContext.currentTime + .05;
    notes.forEach((note, index) => playNote(audioContext, audioContext.destination, note, start + index * .62, 1.16, .045));
    soundtrackTimer = window.setTimeout(playSoundtrackPhrase, notes.length * 620);
  };
  soundtrackButton.addEventListener('click', async () => {
    document.querySelectorAll('.video-grid video').forEach(video => { video.muted = true; video.defaultMuted = true; });
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (soundtrackPlaying) {
      soundtrackPlaying = false;
      window.clearTimeout(soundtrackTimer);
      await audioContext.suspend();
      soundtrackButton.setAttribute('aria-pressed', 'false');
      soundtrackButton.innerHTML = '<span aria-hidden="true">♫</span> Play soft soundtrack';
      return;
    }
    await audioContext.resume();
    soundtrackPlaying = true;
    playSoundtrackPhrase();
    soundtrackButton.setAttribute('aria-pressed', 'true');
    soundtrackButton.innerHTML = '<span aria-hidden="true">♫</span> Pause soundtrack';
  });
}
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

// Give the sky a slightly different arrangement every time the universe is opened.
const skySeed = Math.random();
document.documentElement.style.setProperty('--visit-star-x', `${Math.round(skySeed * 180)}px`);
document.documentElement.style.setProperty('--visit-star-y', `${Math.round(Math.random() * 180)}px`);
document.documentElement.style.setProperty('--visit-sky-hue', `${Math.round((skySeed - .5) * 22)}deg`);
document.documentElement.style.setProperty('--visit-star-opacity', `${(.35 + Math.random() * .25).toFixed(2)}`);

$$('.map-pin').forEach(pin => pin.addEventListener('click', () => {
  $$('.map-pin').forEach(item => { item.classList.toggle('active', item === pin); item.setAttribute('aria-expanded', String(item === pin)); });
  const copy = $('.map-copy');
  if (copy) copy.innerHTML = `<p class="eyebrow">MEMORY PINNED</p><h3>${escapeHtml(pin.dataset.title || 'A little place')}</h3><p>${escapeHtml(pin.dataset.note || '')}</p>`;
}));

const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
const safeSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
const reactionKey = 'little-universe-memory-reactions';
let reactions = new Set();
try { reactions = new Set(JSON.parse(safeGet(reactionKey) || '[]')); } catch { reactions = new Set(); }
function paintReaction(button, isFavorite) {
  button.classList.toggle('is-favorite', isFavorite);
  button.setAttribute('aria-pressed', String(isFavorite));
  button.setAttribute('aria-label', isFavorite ? 'Remove this memory from favorites' : 'Add this memory to favorites');
  button.innerHTML = `<span aria-hidden="true">${isFavorite ? '&#9829;' : '&#9825;'}</span>`;
}
$$('.memory-reaction').forEach(button => {
  const id = button.closest('.memory')?.dataset.memoryId;
  paintReaction(button, reactions.has(id));
  button.addEventListener('click', event => {
    event.stopPropagation();
    if (reactions.has(id)) reactions.delete(id); else reactions.add(id);
    safeSet(reactionKey, JSON.stringify([...reactions]));
    paintReaction(button, reactions.has(id));
    toast(reactions.has(id) ? 'Saved as one of your favorite memories.' : 'Removed from your favorites.');
  });
});

const guestbook = $('#guestbook-message');
const savedGuestbook = safeGet('little-universe-guestbook');
if (guestbook && savedGuestbook) { guestbook.value = savedGuestbook; $('#guestbook-status').textContent = 'Your private reply is safely kept on this browser.'; }
$('#save-guestbook')?.addEventListener('click', () => {
  const saved = safeSet('little-universe-guestbook', guestbook?.value.trim() || '');
  $('#guestbook-status').textContent = saved ? (guestbook?.value.trim() ? 'Private reply saved on this browser.' : 'Your private reply was cleared.') : 'This browser could not save the note.';
  toast(saved ? 'Your private reply has been kept here.' : 'Unable to save the reply in this browser.');
});

let voiceUrl = '';
const voiceDb = new Promise((resolve, reject) => {
  if (!window.indexedDB) return reject(new Error('Browser storage is unavailable.'));
  const request = indexedDB.open('little-universe-keepsakes', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('notes');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
async function readVoice() { const db = await voiceDb; return new Promise((resolve, reject) => { const request = db.transaction('notes', 'readonly').objectStore('notes').get('voice-note'); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
async function writeVoice(value) { const db = await voiceDb; return new Promise((resolve, reject) => { const request = db.transaction('notes', 'readwrite').objectStore('notes').put(value, 'voice-note'); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); }
async function clearVoice() { const db = await voiceDb; return new Promise((resolve, reject) => { const request = db.transaction('notes', 'readwrite').objectStore('notes').delete('voice-note'); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); }
function setVoice(blob) {
  if (voiceUrl) URL.revokeObjectURL(voiceUrl);
  voiceUrl = blob ? URL.createObjectURL(blob) : '';
  const player = $('#voice-player');
  if (player) { player.src = voiceUrl; player.hidden = !blob; }
  $('#play-voice').hidden = !blob;
  $('#delete-voice').hidden = !blob;
}
readVoice().then(blob => { if (blob) { setVoice(blob); $('#voice-status').textContent = 'Your saved voice note is waiting here.'; } }).catch(() => {});

let recorder, recordingStream, recordingStarted, recordingClock, recordingStopper, recordedChunks = [];
function stopRecording() { if (recorder?.state === 'recording') recorder.stop(); }
$('#record-voice')?.addEventListener('click', async () => {
  const recordButton = $('#record-voice');
  if (recorder?.state === 'recording') { stopRecording(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { $('#voice-status').textContent = 'Voice recording is not supported in this browser.'; return; }
  try {
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    recorder = new MediaRecorder(recordingStream);
    recordingStarted = Date.now();
    recorder.ondataavailable = event => { if (event.data.size) recordedChunks.push(event.data); };
    recorder.onstop = async () => {
      window.clearInterval(recordingClock); window.clearTimeout(recordingStopper);
      recordingStream?.getTracks().forEach(track => track.stop());
      const seconds = Math.max(1, Math.round((Date.now() - recordingStarted) / 1000));
      const blob = new Blob(recordedChunks, { type: recorder.mimeType || 'audio/webm' });
      try { await writeVoice(blob); setVoice(blob); $('#voice-status').textContent = seconds < 20 ? `Saved ${seconds}s - a little short, but still a lovely note.` : `Saved ${seconds}s voice note, only on this browser.`; } catch { $('#voice-status').textContent = 'The recording finished, but this browser could not save it.'; }
      recordButton.textContent = 'Record voice note'; recordButton.classList.remove('is-recording'); $('.voice-meter span').style.width = '0%';
    };
    recorder.start();
    recordButton.textContent = 'Stop and save'; recordButton.classList.add('is-recording');
    $('#voice-status').textContent = 'Recording... up to 30 seconds.';
    recordingClock = window.setInterval(() => { const seconds = Math.min(30, (Date.now() - recordingStarted) / 1000); $('.voice-meter span').style.width = `${(seconds / 30) * 100}%`; $('#voice-status').textContent = `Recording... ${Math.ceil(seconds)} / 30 seconds`; }, 200);
    recordingStopper = window.setTimeout(stopRecording, 30000);
  } catch { $('#voice-status').textContent = 'Microphone permission was not granted. You can try again anytime.'; }
});
$('#play-voice')?.addEventListener('click', () => $('#voice-player')?.play());
$('#delete-voice')?.addEventListener('click', async () => { try { await clearVoice(); setVoice(null); $('#voice-status').textContent = 'The saved voice note was deleted from this browser.'; } catch { $('#voice-status').textContent = 'This browser could not delete the voice note.'; } });
const gallery = $('#gallery');
if (gallery && images.length) {
  const visitMemory = images[Math.floor(Math.random() * images.length)];
  const spotlight = document.createElement('aside');
  spotlight.className = 'memory-spotlight';
  spotlight.innerHTML = `<p class="eyebrow">MEMORY OF THIS VISIT</p><div><img src="${escapeHtml(visitMemory.src)}" alt="${escapeHtml(visitMemory.caption || visitMemory.title || 'Featured memory')}"><div class="spotlight-copy"><span>Open this little moment</span><h3>${escapeHtml(visitMemory.title || 'A little memory')}</h3><p>${escapeHtml(visitMemory.caption || 'A moment worth keeping close.')}</p></div></div>`;
  gallery.before(spotlight);

  const polaroidDesk = document.createElement('div');
  polaroidDesk.className = 'polaroid-desk';
  polaroidDesk.innerHTML = `<div class="polaroid-desk-copy"><p class="eyebrow">A FEW MORE TO KEEP</p><h3>Tap a photo to turn it over.</h3></div><div class="polaroid-stack">${[...images].sort(() => Math.random() - .5).slice(0, 3).map((memory, index) => `<button class="polaroid" type="button" aria-pressed="false" style="--tilt:${[-4, 3, -2][index]}deg"><span class="polaroid-front"><img loading="lazy" src="${escapeHtml(memory.src)}" alt="${escapeHtml(memory.title || 'Memory')}"></span><span class="polaroid-back"><small>little memory</small><strong>${escapeHtml(memory.title || 'A little memory')}</strong><em>${escapeHtml(memory.caption || 'A moment worth keeping close.')}</em></span></button>`).join('')}</div>`;
  gallery.after(polaroidDesk);
  $$('.polaroid').forEach(card => card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(card.classList.contains('is-flipped')));
  }));
}
const milestone = document.createElement('div');
milestone.className = 'milestone-counter';
const milestoneDate = data.specialDate ? new Date(`${data.specialDate}T00:00:00`) : null;
const elapsedDays = milestoneDate && !Number.isNaN(milestoneDate.getTime()) ? Math.max(0, Math.floor((Date.now() - milestoneDate.getTime()) / 86400000)) : null;
milestone.innerHTML = `<strong>${elapsedDays === null ? '∞' : elapsedDays}</strong><span>${elapsedDays === null ? 'little reasons to celebrate' : 'days since this little universe began'}</span>`;
$('.hero-detail')?.after(milestone);
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
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  const id = link?.getAttribute('href');
  const target = id && id.length > 1 ? document.querySelector(id) : null;
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id);
});
if (window.location.hash) {
  window.setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    target?.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'));
    target?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, 120);
}
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
// A direct link to a section can be restored before the observer receives a scroll event.
window.setTimeout(() => revealItems.forEach(item => {
  const bounds = item.getBoundingClientRect();
  if (bounds.top < window.innerHeight - 16 && bounds.bottom > 16) item.classList.add('is-visible');
}), 80);
let activeFilter = 'all';
const memories = $$('.memory[data-category]');
function makeImageOpenable(image, index) {
  if (!image || index < 0) return;
  image.classList.add('openable-image');
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Open ${images[index].title || 'this memory'}`);
  image.addEventListener('click', () => openMemory(index));
  image.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMemory(index); } });
}
makeImageOpenable($('.hero-photo img'), images.findIndex(item => item.src === hero?.src));
makeImageOpenable($('.garba-photo img'), images.findIndex(item => item.src === garba?.src));
makeImageOpenable($('.memory-spotlight img'), images.findIndex(item => item.src === $('.memory-spotlight img')?.getAttribute('src')));
function filterGallery() { const query = ($('#gallery-search')?.value || '').trim().toLowerCase(); memories.forEach(memory => { memory.hidden = !((activeFilter === 'all' || memory.dataset.category === activeFilter) && memory.textContent.toLowerCase().includes(query)); }); }
$$('.filter').forEach(button => button.addEventListener('click', () => { $$('.filter').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeFilter = button.dataset.filter; filterGallery(); }));
$('#gallery-search')?.addEventListener('input', filterGallery);
$('#gallery-sort')?.addEventListener('change', event => { const gallery = $('#gallery'); if (!gallery) return; const direction = event.target.value === 'old' ? 1 : -1; [...gallery.children].sort((a, b) => direction * a.dataset.date.localeCompare(b.dataset.date)).forEach(card => gallery.append(card)); });
const modal = $('#modal'), modalImage = $('#modal-img'); let currentMemory = -1;
const visibleMemories = () => memories.filter(memory => !memory.hidden);
function openMemory(index) { const memory = memories[index]; if (!memory || !modal || !modalImage) return; currentMemory = visibleMemories().indexOf(memory); modalImage.src = memory.dataset.src; modalImage.alt = memory.dataset.caption || 'Memory'; $('#modal-caption').textContent = memory.dataset.caption || ''; modal.classList.add('show'); document.body.style.overflow = 'hidden'; $('#modal-close')?.focus(); }
function closeMemory() { modal?.classList.remove('show'); $('#modal-video')?.remove(); if (modalImage) { modalImage.src = ''; modalImage.hidden = false; } document.body.style.overflow = ''; }
function openVideoMemory(button) { const card = button.closest('.video-memory'); if (!card || !modal || !modalImage) return; const player = document.createElement('video'); player.id = 'modal-video'; player.controls = true; player.autoplay = true; player.muted = true; player.defaultMuted = true; player.playsInline = true; player.src = card.dataset.videoSrc; player.setAttribute('aria-label', card.dataset.videoTitle || 'Video memory'); modalImage.hidden = true; modalImage.after(player); $('#modal-caption').textContent = card.dataset.videoCaption || card.dataset.videoTitle || ''; modal.classList.add('show'); document.body.style.overflow = 'hidden'; $('#modal-close')?.focus(); }
function moveMemory(step) { const visible = visibleMemories(); if (!visible.length) return; currentMemory = (currentMemory + step + visible.length) % visible.length; openMemory(memories.indexOf(visible[currentMemory])); }
memories.forEach((memory, index) => {
  memory.tabIndex = 0;
  memory.setAttribute('role', 'button');
  memory.setAttribute('aria-label', `Open ${memory.querySelector('h3')?.textContent || 'memory'}`);
  memory.addEventListener('click', event => { if (!event.target.closest('button, a, input, select, textarea')) openMemory(index); });
  memory.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('button, a, input, select, textarea')) { event.preventDefault(); openMemory(index); } });
});
$('#modal-close')?.addEventListener('click', closeMemory); modal?.addEventListener('click', event => { if (event.target === modal) closeMemory(); });
$$('.video-cinema').forEach(button => button.addEventListener('click', () => openVideoMemory(button)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMemory(); if (modal?.classList.contains('show') && event.key === 'ArrowRight') moveMemory(1); if (modal?.classList.contains('show') && event.key === 'ArrowLeft') moveMemory(-1); });
function toast(message) { const box = $('#toast'); if (!box) return; box.textContent = message; box.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = window.setTimeout(() => box.classList.remove('show'), 5600); }
$$('.envelope').forEach(envelope => envelope.addEventListener('click', () => toast(`${envelope.dataset.title} — ${envelope.dataset.message}`)));
$$('.star-card').forEach(card => card.addEventListener('click', () => { card.classList.toggle('open'); card.setAttribute('aria-expanded', String(card.classList.contains('open'))); }));
const secretStars = new Set();
const secretMessage = document.createElement('aside');
secretMessage.className = 'secret-message';
secretMessage.innerHTML = '<p class="eyebrow">CONSTELLATION FOUND</p><p>Some people do not simply become memories. They become the reason certain days feel brighter.</p>';
$('.constellation-section')?.append(secretMessage);
$$('.star-card').forEach((card, index) => card.addEventListener('click', () => { secretStars.add(index); if (secretStars.size >= 3) { secretMessage.classList.add('found'); toast('A hidden constellation has appeared.'); } }));
$('#open-letter')?.addEventListener('click', () => { $('#letter-body')?.classList.add('open'); $('#open-letter').setAttribute('aria-expanded', 'true'); $('#open-letter').style.display = 'none'; });
$('#restart')?.addEventListener('click', () => { sessionStorage.removeItem('universe-intro'); window.location.reload(); });
function showQuizSurprise() {
  const surprise = $('#quiz-surprise');
  if (!surprise) return;
  const stars = surprise.querySelector('.surprise-stars');
  stars.innerHTML = Array.from({ length: 58 }, (_, index) => `<i style="--left:${Math.random() * 100}%;--delay:${(Math.random() * .8).toFixed(2)}s;--color:${index % 3}"></i>`).join('');
  surprise.hidden = false;
  requestAnimationFrame(() => surprise.classList.add('show'));
  $('#close-surprise')?.focus();
}
function closeQuizSurprise() { const surprise = $('#quiz-surprise'); if (!surprise) return; surprise.classList.remove('show'); window.setTimeout(() => { surprise.hidden = true; }, 350); }
$('#close-surprise')?.addEventListener('click', closeQuizSurprise);
$('#keep-surprise')?.addEventListener('click', closeQuizSurprise);
$('#quiz-surprise')?.addEventListener('click', event => { if (event.target === $('#quiz-surprise')) closeQuizSurprise(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#quiz-surprise')?.hidden) closeQuizSurprise(); });
let questionIndex = 0, score = 0;
function renderQuestion() { const progress = $('#quiz-progress'), prompt = $('#quiz-prompt'), options = $('#quiz-options'), start = $('#quiz-start'); if (!progress || !prompt || !options || !start) return; if (questionIndex >= data.questions.length) { progress.textContent = 'Challenge complete'; prompt.textContent = data.questions.length ? `You got ${score} out of ${data.questions.length}. The best part is the memories still waiting to be made.` : 'Add some friendly questions to site-data.js.'; options.innerHTML = ''; start.textContent = 'Restart challenge'; start.style.display = 'inline-flex'; return; } const question = data.questions[questionIndex]; progress.textContent = `Question ${questionIndex + 1} of ${data.questions.length}`; prompt.textContent = question.prompt; options.innerHTML = ''; question.options.forEach((option, index) => { const button = document.createElement('button'); button.className = 'ghost'; button.textContent = option; button.addEventListener('click', () => { toast(index === question.correct ? 'That’s right ✦' : 'A sweet try—on to the next one.'); if (index === question.correct) score += 1; questionIndex += 1; renderQuestion(); }); options.append(button); }); start.style.display = 'none'; }
$('#quiz-start')?.addEventListener('click', () => { questionIndex = 0; score = 0; renderQuestion(); });
$('#quiz-options')?.addEventListener('click', () => window.setTimeout(() => { if (questionIndex >= data.questions.length) showQuizSurprise(); }, 280));
