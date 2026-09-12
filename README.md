# Dynamic Bias-Breaker (Vanilla HTML/CSS/JS)

This is a plain HTML/CSS/JavaScript rewrite of the original React + TypeScript
+ Vite project. No build step, no npm install, no framework — just three files:

- `index.html` — page structure/markup
- `style.css` — all styling (recreates the original dark "cognitive middleware" look)
- `engine.js` — the analysis engine (topic packs, bias heuristics, presets) ported from `engine.ts`
- `app.js` — application state + DOM rendering, ported from `App.tsx` and all the React components

## How to run in VS Code

1. Open this folder in VS Code.
2. Install the **Live Server** extension (if you don't have it) — or any static file server.
3. Right-click `index.html` → **Open with Live Server** (or just double-click `index.html` to open it directly in your browser — it works fine with no server since everything is local/vanilla JS with no `fetch`/module imports).

That's it — no `npm install`, no build step.

## What it does

Paste (or load a preset) argumentative text into the sandbox, click **Analyze Stance**,
and the app heuristically scores how one-sided/"echo-chambered" the text is, then
surfaces a devil's-advocate counter-perspective, blind spots, and counter-data.
Everything runs client-side with simple string/keyword heuristics — no external API calls.
