# A Little Universe — Vercel-ready static site

This version is a static HTML/CSS/JavaScript site. It deploys directly to Vercel with no PHP server, database, environment variables, or build command.

## Personalise the site

1. Edit `assets/site-data.js` to change names, text, chapters, notes, quiz questions, and future ideas.
   The same file contains `memoryMap`, `playlist`, and `quizSurprise` for the new interactive keepsakes.
2. Place your photos and videos inside `uploads/`.
3. Add each media item to the `media` list in `assets/site-data.js`. Example:

   ```js
   {
     type: 'image',
     src: 'uploads/cafe-day.jpg',
     category: 'cafe-diaries',
     title: 'Coffee date',
     caption: 'One of my favourite afternoons.',
     date: '2026-10-28',
     featured: true,
     hero: true
   }
   ```

   For video, set `type: 'video'`. Supported browser-friendly formats are MP4 and WebM.
4. Open `index.html` in a browser to preview.

## Deploy to Vercel

1. Push this folder to a GitHub repository. Your `uploads/` files are now included by Git.
2. In Vercel, select **Add New → Project**, import that repository, and click **Deploy**.
3. Leave the framework preset as **Other**. No build command or environment variable is required.

Every change to `assets/site-data.js` or `uploads/` requires a new deployment (pushing to GitHub triggers this automatically).

## Private keepsakes

Shivani's guestbook reply and recorded voice note never leave her browser: the reply uses local storage and the voice note uses browser IndexedDB. The microphone button records up to 30 seconds (20–30 seconds is suggested). Microphone access works on HTTPS deployments such as Vercel, and on `localhost` during development; it will not work when opening the file directly from disk in most browsers.

The playlist is intentionally a display card rather than embedded song playback, so the site does not load third-party trackers or copyrighted audio.

## Important change from the PHP version

The PHP files, admin dashboard, SQLite database integration, login, and browser upload manager have been removed from the deployable app. A static Vercel deployment cannot persist uploads or SQLite writes. To edit the live site, update `assets/site-data.js` and deploy again.

If you want a browser dashboard that can upload/change content after deployment, the next step is a separate backend with Vercel Blob for media and Postgres for data.
