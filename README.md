# Bharat FIH — SPI & AOI Team Portfolio

An onboarding site for the SPI & AOI team inside Bharat FIH's SMT (Surface Mount
Technology) process. Built so a new team member can open one link and understand
the team, the process, and their station — no shift handover required.

## What's inside

```
bharatfih-portfolio/
├── index.html          → login page (select your name, sign in)
├── portfolio.html       → the main portfolio (team, process, training)
├── css/style.css        → all styling
├── js/members.js         → the team list + usernames/passwords (edit this to update anyone)
├── js/auth.js            → login logic
├── js/main.js             → portfolio page logic
├── ppt/                  → put your training PPT exports here (see below)
└── README.md
```

## Login credentials (edit anytime in `js/members.js`)

| Name          | Username      | Password     |
|---------------|---------------|--------------|
| Saravanan V   | saravanan.v   | SMTaoi@01    |
| Sarathkumar   | sarathkumar   | SMTaoi@02    |
| Kavimani      | kavimani      | SMTaoi@03    |
| Boopathy      | boopathy      | SMTaoi@04    |
| Saravanan S   | saravanan.s   | SMTaoi@05    |
| Prasanth      | prasanth      | SMTaoi@06    |
| Periya Sami   | periyasami    | SMTaoi@07    |

### ⚠️ Important — what this login actually does

This is a **simple, client-side login**, as requested. It's great for:
- giving each person their own "welcome back" personalization,
- a light gate that keeps casual visitors out.

It is **not real security**. Because this site is a static page (and will be hosted
on GitHub Pages), anyone who looks at `js/members.js` in the browser or the GitHub
repo can see every username and password in plain text. Don't put anything
genuinely confidential behind this login. If you ever need real access control
(e.g. this becomes customer-facing or holds sensitive data), that needs a backend
login service — happy to help set that up separately if it comes to that.

## Adding your team roles / bios

Open `js/members.js` — each person has a `role` and `blurb` field. I drafted
starter roles (Team Lead, SPI Operator, AOI Stage 1/2 Inspector) based on the
stations you described — edit these to match reality exactly.

## Adding your PPTs

The **Training material** section on `portfolio.html` is ready with placeholder
cards. Once you send me the PPT files, I'll:
1. Convert each deck to either a downloadable PDF or per-slide images,
2. Drop the files into the `/ppt` folder,
3. Wire up direct links/embeds from the "Training material" cards so anyone can open them straight from the site.

If you'd rather do this yourself before I enhance it further: export the PPT as
PDF (File → Export → PDF in PowerPoint), place it in `/ppt`, and link it with:
```html
<a href="ppt/spi-training.pdf" target="_blank">Open SPI training deck</a>
```

## Hosting on GitHub Pages

1. **Create a repo** — on GitHub, click **New repository**, name it something like
   `bharatfih-aoi-team`, keep it **Public** (GitHub Pages on a free plan needs a
   public repo unless you're on GitHub Team/Enterprise).
2. **Upload the files** — either:
   - drag-and-drop all files/folders in this project into the repo via the GitHub
     web UI ("Add file" → "Upload files"), or
   - use git from your machine:
     ```bash
     cd bharatfih-portfolio
     git init
     git add .
     git commit -m "Initial team portfolio"
     git branch -M main
     git remote add origin https://github.com/<your-username>/bharatfih-aoi-team.git
     git push -u origin main
     ```
3. **Turn on Pages** — in the repo, go to **Settings → Pages**. Under
   "Build and deployment", set **Source** to `Deploy from a branch`, branch
   `main`, folder `/ (root)`. Save.
4. **Get your link** — after a minute or two, GitHub shows your live URL, usually:
   `https://<your-username>.github.io/bharatfih-aoi-team/`
   That's the link the whole team can bookmark.
5. **Updating later** — any time you edit a file and push to `main`, the live
   site updates automatically within a minute or two.

## What's next

This is the first-level version per your brief. Once you're ready, send over:
- the PPT files,
- any corrections to member roles/bios,
- your actual logo/colors if you have brand guidelines beyond what I designed,
- anything else you want added (photos, shift schedules, defect galleries, etc.)

and I'll enhance it from here.
