# Top 10 Ranker

A small multi-file browser game inspired by Wordle-style feedback with ranked quiz answers.

## File structure

- `index.html` — page shell and UI layout
- `styles/main.css` — all styling
- `data/answer-pools.js` — central answer pool definitions
- `data/question-templates.js` — reusable question patterns
- `data/questions.js` — generated 10×10 question catalogue
- `js/scoring.js` — score rules and breakdown helpers
- `js/app.js` — game state, rendering and interaction logic

## Current data model

This version includes:
- 10 answer pools
- 10 generated questions per pool
- 100 total questions

Questions are generated from pool names using deterministic metrics such as:
- longest names
- shortest names
- most vowels
- most consonants
- highest Scrabble score
- alphabetical order
- and others

That means the architecture is solid and centralised, but the seeded question content is intentionally lightweight. If you want more traditional quiz content (population, GDP, box office, etc.), keep the same structure and replace or supplement the generated question definitions with hand-authored or data-driven rankings.

## Running locally

Open `index.html` directly in a browser.

No build step is required.