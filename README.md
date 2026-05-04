# Shilpa Thakur — Portfolio

Personal portfolio built with React. Dark editorial aesthetic with gold accents.

## Sections
- **Hero** — Name, tagline, key stats
- **Experience** — Tabbed work history
- **Skills** — Categorised skill cards
- **Projects** — Project showcase grid
- **Case Studies** — Expandable deep-dives
- **Testimonials** — Peer quotes
- **Contact** — Links + email CTA

## Getting Started

```bash
npm install
npm start
```

Runs at [http://localhost:3000](http://localhost:3000)

## Customise

All content lives in one place: `src/data/content.js`

Update your:
- Name, bio, location, links → `profile`
- Jobs + bullet points → `experience`
- Skill categories → `skills`
- Projects → `projects`
- Case study details → `caseStudies`
- Testimonials → `testimonials`

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/shilpa-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

## Build for Production

```bash
npm run build
```

Outputs to `/build` — ready to deploy anywhere (Vercel, Netlify, GitHub Pages).
