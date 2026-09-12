# Dynamic Bias-Breaker (Vanilla HTML/CSS/JS)

This is a plain HTML/CSS/JavaScript rewrite of the original React + TypeScript
+ Vite project. No build step, no npm install, no framework — just three files:

- `index.html` — page structure/markup
- `style.css` — all styling (recreates the original dark "cognitive middleware" look)
- `engine.js` — the analysis engine (topic packs, bias heuristics, presets) ported from `engine.ts`
- `app.js` — application state + DOM rendering, ported from `App.tsx` and all the React components

## What it does 

Paste (or load a preset) argumentative text into the sandbox, click **Analyze Stance**,
and the app heuristically scores how one-sided/"echo-chambered" the text is, then
surfaces a devil's-advocate counter-perspective, blind spots, and counter-data.
Everything runs client-side with simple string/keyword heuristics — no external API calls.
