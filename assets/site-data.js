/*
 * Edit this file to personalise the static site before deploying to Vercel.
 * Put each image/video in /uploads and use its path below, for example:
 * { type: 'image', src: 'uploads/cafe-day.jpg', category: 'cafe-diaries', ... }
 */
window.UNIVERSE_DATA = {
  herName: 'Shivani',
  nickname: '',
  myName: 'Akash',
  tagline: 'Made of little moments, countless memories, and one very special person.',
  heroHeading: 'Happy Birthday, Shivani 💗',
  heroText: "Out of all the people life could have introduced me to, I’m genuinely glad it introduced me to you.",
  heroDetail: 'This little world is filled with memories, laughter, adventures, and a few things I wanted to tell you.',
  specialDate: '2026-10-29',
  intro: [
    'Some people become a beautiful part of your story without even realizing it.',
    'And sometimes, someone deserves a little universe of their own.',
    'Shivani… this little universe is for you. 💗'
  ],
  categories: [
    { slug: 'cafe-diaries', name: 'Café Diaries' },
    { slug: 'game-zone-madness', name: 'Game Zone Madness' },
    { slug: 'surat-garba-nights', name: 'Surat Garba Nights' },
    { slug: 'random-little-moments', name: 'Random Little Moments' },
    { slug: 'favorite-memories', name: 'Favorite Memories' }
  ],
  // Media imported from /uploads. Keep filenames unchanged when adding more files.
  media: [
    { type: 'image', src: 'uploads/Vibrant Garba Night Festival.png', category: 'surat-garba-nights', title: 'Under the Garba lights', caption: 'A night full of colour, music, and sparkle.', date: '2026-10-18', favorite: true },
    { type: 'image', src: 'uploads/Screenshot_2026-10-29-14-43-05-37_1c337646f29875672b5a61192b9010f9.jpg', category: 'cafe-diaries', title: 'A little mural moment', caption: 'Bright colours and an even brighter smile.', date: '2026-10-29', featured: true, hero: true, favorite: true },
    { type: 'image', src: 'uploads/ChatGPT Image Sep 23, 2026, 10_46_18 AM.png', category: 'favorite-memories', title: 'A beautiful traditional look', caption: 'A favourite portrait, full of warmth.', date: '2026-09-23', favorite: true },
    { type: 'image', src: 'uploads/IMG-20261018-WA0012.jpg', category: 'surat-garba-nights', title: 'A night in colour', caption: 'One frame from an unforgettable evening.', date: '2026-10-18' },
    { type: 'image', src: 'uploads/IMG_0156.JPG', category: 'game-zone-madness', title: 'Game-zone selfie', caption: 'A playful little moment together.', date: '2026-10-22', favorite: true },
    { type: 'image', src: 'uploads/IMG_0158.JPG', category: 'game-zone-madness', title: 'Smiles and a flower filter', caption: 'One of our fun snapshots.', date: '2026-10-22' },
    { type: 'image', src: 'uploads/Screenshot_2026-10-29-14-43-22-39_1c337646f29875672b5a61192b9010f9.jpg', category: 'cafe-diaries', title: 'Colourful corner', caption: 'A small scene with a lot of personality.', date: '2026-10-29' },
    { type: 'image', src: 'uploads/IMG_0159.JPG', category: 'game-zone-madness', title: 'A heart-filled selfie', caption: 'The kind of moment that makes the gallery sweeter.', date: '2026-10-22' },
    { type: 'image', src: 'uploads/Snapchat-1302208828.jpg', category: 'cafe-diaries', title: 'Outside the café', caption: 'A quick selfie before the day began.', date: '2026-10-18' },
    { type: 'image', src: 'uploads/Snapchat-1660267060.jpg', category: 'random-little-moments', title: 'A little Snapchat moment', caption: 'One more reason to smile.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-1695156885.jpg', category: 'random-little-moments', title: 'Small, sweet memory', caption: 'The best moments are often unplanned.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-1782171476.jpg', category: 'random-little-moments', title: 'A candid smile', caption: 'A little piece of an ordinary day.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-1998904063.jpg', category: 'random-little-moments', title: 'Just us', caption: 'A happy moment worth saving.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-70255202.jpg', category: 'random-little-moments', title: 'A day out together', caption: 'One more page in our story.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-768014981.jpg', category: 'random-little-moments', title: 'A sunny snapshot', caption: 'A small memory with a big smile.', date: '2026-10-23' },
    { type: 'image', src: 'uploads/Snapchat-994881240.jpg', category: 'random-little-moments', title: 'A little candid', caption: 'The kind of photo that brings the day back.', date: '2026-10-23' },
    { type: 'video', src: 'uploads/VID-20261022-WA0003.mp4', category: 'game-zone-madness', title: 'Replay 01', caption: 'A moment made for replaying.', date: '2026-10-22' },
    { type: 'video', src: 'uploads/VID-20261022-WA0004.mp4', category: 'game-zone-madness', title: 'Replay 02', caption: 'A little more fun, saved on video.', date: '2026-10-22' },
    { type: 'video', src: 'uploads/VID-20261022-WA0005.mp4', category: 'game-zone-madness', title: 'Replay 03', caption: 'One of the good bits.', date: '2026-10-22' },
    { type: 'video', src: 'uploads/VID-20261022-WA0006.mp4', category: 'game-zone-madness', title: 'Replay 04', caption: 'A quick moment to keep.', date: '2026-10-22' },
    { type: 'video', src: 'uploads/VID-20261022-WA0007.mp4', category: 'game-zone-madness', title: 'Replay 05', caption: 'A favourite clip from the day.', date: '2026-10-22' },
    { type: 'video', src: 'uploads/VID-20261022-WA0008.mp4', category: 'game-zone-madness', title: 'Replay 06', caption: 'One last memory on film.', date: '2026-10-22' }
  ],
  chapters: [
    ['The Beginning', 'Around 4–5 years ago', 'The early pages of a friendship that would become a beautiful part of life.'],
    ['The Little Things', 'A collection of ordinary moments', 'The small conversations and shared experiences that quietly turn into memories.'],
    ['Getting Closer', 'The last 1.5 years', 'Somewhere along the way, our friendship grew closer and more special.'],
    ['Café Diaries', 'Our little outings', 'A place for coffee, photographs, and the kind of days worth keeping.'],
    ['Game Zone Madness', 'Play, laugh, replay', 'For the games, the energy, and everything worth replaying.'],
    ['Surat Under the Garba Lights', 'Navratri in Surat', 'A little color, a little music, and another memory to keep close.'],
    ['The Story Is Still Being Written', 'Still unfolding', 'For all the lovely little moments waiting ahead.']
  ],
  notes: [
    ['Open when you need a smile', 'I hope this tiny note finds a way to brighten your day. You bring a special kind of warmth to the people around you—never forget that.'],
    ['Open when your day isn’t going well', 'Bad days are only pages, not the whole story. Be gentle with yourself today; you deserve kindness, rest, and a fresh start.'],
    ['Open when you need a reminder of how amazing you are', 'You are thoughtful, capable, and wonderfully yourself. The world is better for having your particular spark in it.'],
    ['Open when you want to revisit our memories', 'There are already so many little moments worth keeping—and this universe is here whenever you want to revisit them.'],
    ['Open when you need a little encouragement', 'Keep going. You are more prepared and stronger than you sometimes give yourself credit for.'],
    ['Open on your birthday', 'Happy Birthday! I hope today makes space for joy, cake, kind people, and every little thing that makes you smile.']
  ],
  questions: [
    { prompt: 'Which type of place have we visited together?', options: ['A library', 'A café', 'A stadium', 'An aquarium'], correct: 1 },
    { prompt: 'Which city was our recent Garba outing in?', options: ['Vadodara', 'Surat', 'Rajkot', 'Ahmedabad'], correct: 1 },
    { prompt: 'Which section holds game-zone videos?', options: ['The Replay Room', 'The Letter Desk', 'The Star Map', 'The Café Table'], correct: 0 }
  ],
  quizSurprise: {
    title: 'You found every little piece of the story.',
    message: 'Shivani, you make ordinary days feel like memories worth keeping. Here is to more laughter, more music, more cafés, and more beautiful little moments ahead. — Akash'
  },
  memoryMap: [
    { kind: 'café', title: 'Café diaries', note: 'Coffee, colour, and the kind of conversations that make an afternoon disappear.', x: 24, y: 54 },
    { kind: 'garba', title: 'Garba under the lights', note: 'Surat, Navratri, music, and a night that deserved to be remembered.', x: 68, y: 26 },
    { kind: 'heart', title: 'The game-zone', note: 'A playful stop for laughs, replays, and a few very good selfies.', x: 48, y: 70 },
    { kind: 'star', title: 'The little moments', note: 'All the unplanned snapshots that became part of the story.', x: 80, y: 54 }
  ],
  playlist: [
    { title: 'Heeriye', artist: 'Jasleen Royal ft. Arijit Singh', mood: 'For warm, easy days' },
    { title: 'Iktara', artist: 'Kavita Seth', mood: 'For quiet, golden moments' },
    { title: 'Ilahi', artist: 'Arijit Singh', mood: 'For every next adventure' }
  ],
  ideas: [
    ['More café visits', 'A possibility for another lovely chapter.'],
    ['More game-zone adventures', 'A possibility for another lovely chapter.'],
    ['More random photographs', 'A possibility for another lovely chapter.'],
    ['More Garba nights', 'A possibility for another lovely chapter.'],
    ['More spontaneous outings', 'A possibility for another lovely chapter.'],
    ['More laughs over the smallest things', 'A possibility for another lovely chapter.']
  ],
  letter: `Hey Shivani,

Happy Birthday! 💗

I wanted to create something a little different for you this birthday. Something that isn't just a message on a screen, but a small collection of memories, moments, and feelings that mean a lot to me.

I'm really grateful that you're part of my life, Shivani. I hope this birthday brings you happiness, peace, confidence, new experiences, and countless reasons to smile.

Thank you for being my best friend. Thank you for being such a special part of my story.

With lots of love and care,

Akash 💗`,
  finalMessage: `Some moments become photographs.

Some photographs become stories.

And some people become a very special part of those stories.

Thank you for being part of mine.

Happy Birthday, Shivani.

With love and care,
Akash ✨`
};
