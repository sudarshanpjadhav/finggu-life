# finggu-life — Supabase Setup Guide

## Step 1 — Create Supabase Project (Free)

1. Go to **https://supabase.com** → Sign up (free)
2. Click **New Project**
3. Name it: `finggu-life`
4. Choose region: **South Asia (Mumbai)** — closest to your users
5. Set a strong database password → Save it somewhere
6. Wait ~2 minutes for project to spin up

---

## Step 2 — Run the Database Schema

1. In Supabase Dashboard → click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open `supabase/schema.sql` from this repo
4. Paste the entire contents → click **Run**
5. You should see: `Success. No rows returned`

---

## Step 3 — Configure Authentication

1. Go to **Authentication → Providers**
2. **Email** provider is ON by default ✅
3. Under **Email** settings:
   - ✅ Enable "Confirm email" — OFF (magic link only, no confirmation)
   - ✅ Enable "Magic Link" — ON
4. Go to **Authentication → Email Templates**
5. Customize the magic link email (optional — use the default for now)

---

## Step 4 — Get Your Project Keys

1. Go to **Settings → API** (left sidebar)
2. Copy these two values:

```
Project URL:    https://xxxxxxxxxxxx.supabase.co
Anon Key:       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 5 — Add Keys to finggu-life

Open `standalone/index.html` and find this section near the top of the `<script>`:

```javascript
// ── Supabase Config ───────────────────────────────────────────
const FINGGU_SUPABASE_URL  = 'YOUR_PROJECT_URL';
const FINGGU_SUPABASE_KEY  = 'YOUR_ANON_KEY';
```

Replace with your actual values:

```javascript
const FINGGU_SUPABASE_URL  = 'https://xxxxxxxxxxxx.supabase.co';
const FINGGU_SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## Step 6 — Configure Auth Redirect URL

1. In Supabase → **Authentication → URL Configuration**
2. Add your site URL:
   - `https://sudarshanpjadhav.github.io/finggu-life`
   - `http://localhost:8080` (for local testing)
3. Add redirect URLs (same list)

---

## Step 7 — Deploy

```bash
# Copy updated index.html to docs/
cp standalone/index.html docs/index.html

# Push to GitHub
git add .
git commit -m "feat: add Supabase cloud sync"
git push

# GitHub Pages auto-deploys in ~2 minutes
```

---

## Free Tier Limits (more than enough)

| Resource | Free Limit |
|----------|-----------|
| Monthly Active Users | 50,000 |
| Database size | 500 MB |
| Auth emails | 3,000/month |
| API requests | Unlimited |
| Realtime connections | 200 concurrent |

finggu-life with 10,000 active users will comfortably fit in the free tier.

---

## Troubleshooting

**Magic link not received:**
- Check spam folder
- Verify email auth is enabled in Supabase
- Check Authentication → Logs for errors

**Data not syncing:**
- Open browser console → look for `[finggu-sync]` logs
- Verify SUPABASE_URL and SUPABASE_KEY are correct
- Check Network tab for failed API calls

**RLS errors:**
- Make sure you ran the full schema.sql (includes all policies)
- User must be logged in for any data operations
