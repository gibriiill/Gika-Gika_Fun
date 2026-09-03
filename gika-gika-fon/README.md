# Gika Gika Fon

A static site: the logo sits centered up top, and 9 rowboats drift across the
harbor below. Each boat carries a stickman rower (head = one of the two
uploaded photos) rowing in a random direction and speed, generated fresh on
every page load. Click a boat to open its own page.

## Structure

```
index.html      – homepage: logo + the 9-boat harbor
style.css       – all styling (ocean theme, animations)
script.js       – builds the 9 boats with random direction/speed/head
boat1.html … boat9.html – the static page each boat links to
logo.jpeg       – site title image
head1.png       – rower head (from 1mandan.jpeg)
head2.png       – rower head (from 2mandan.jpeg)
```

Everything is plain HTML/CSS/JS — no build step, no dependencies.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
cd this-folder
vercel        # follow the prompts
vercel --prod
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: "Other" (static site) — no build command needed,
   output directory is the repo root.
4. Deploy.

Because every boat page (`boat1.html` … `boat9.html`) lives in the same
repo/folder, the links between them work automatically both locally and on
Vercel, with no extra routing config.
