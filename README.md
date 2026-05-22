# Come Back — Survey site

Premium quiz site for validating Come Back, the porn recovery app.

## Step 1 status: ✅ UI complete

This is **Step 1 of 3**. Backend (Supabase) and admin analytics dashboard come in Steps 2 and 3.

Right now, responses are logged to the browser console (open DevTools to see them). In Step 2, we'll wire these to Supabase so they persist.

## Run it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy to Vercel (free, takes 5 minutes)

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/comeback-survey.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **"Add New → Project"** → select your `comeback-survey` repo.
4. Click **Deploy**. That's it.
5. Vercel gives you a URL like `comeback-survey-xyz.vercel.app`.

## Tracking subreddit source (UTM links)

For each subreddit, share a different URL with a `?utm_source=` parameter:

| Subreddit       | URL to share                                                  |
|-----------------|--------------------------------------------------------------|
| r/NoFap         | `https://your-site.vercel.app/?utm_source=NoFap`             |
| r/IndiaNoFap    | `https://your-site.vercel.app/?utm_source=IndiaNoFap`        |
| r/pornfree      | `https://your-site.vercel.app/?utm_source=pornfree`          |
| r/developersIndia | `https://your-site.vercel.app/?utm_source=developersIndia` |
| r/selfimprovement | `https://your-site.vercel.app/?utm_source=selfimprovement` |

You can shorten these with bit.ly so they look clean in Reddit posts.

## What's tracked (will save to Supabase in Step 2)

- Session ID (anonymous UUID)
- UTM source / medium / campaign
- Referrer URL
- Device type, OS, browser
- Screen resolution
- Timezone, language
- Time on each screen
- All 4 answers
- Whether they joined the waitlist
- Email (only if they joined the waitlist)
- Completion status / drop-off screen

## File structure

```
comeback-survey/
├── app/
│   ├── globals.css           ← Tailwind + custom gradient classes
│   ├── layout.tsx            ← Root layout, SEO metadata
│   └── page.tsx              ← Main orchestrator (all 7 screens)
├── components/
│   ├── ProgressBar.tsx
│   ├── QuestionScreen.tsx    ← Reusable for screens 1, 2, 3
│   ├── RevealScreen.tsx      ← Screen 4 (dark, "Come Back")
│   ├── PayScreen.tsx         ← Screen 5 (₹99 question)
│   ├── WaitlistScreen.tsx    ← Screen 6 (30% lifetime offer)
│   └── ThankYouScreen.tsx    ← Screen 7 (closing)
├── lib/
│   └── analytics.ts          ← UTM + device + session helpers
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Color system

- Primary gradient: `#4F46E5 → #7C3AED → #9333EA` (indigo → violet → magenta)
- Cream background: `#FAFAF8`
- Ink (dark): `#0A0A0F`
- Text on cream: `#0A0A0F`
- Text on ink: `#FFFFFF` with `#C4B5FD` for gradient text

## Next steps

**Step 2** — Wire up Supabase to save responses.
**Step 3** — Build the `/admin` analytics dashboard.

Once Step 3 is done, you can start posting on Reddit and watch the data come in live.
