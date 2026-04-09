# Wall Calendar — Interactive React Component

A polished, fully responsive wall calendar component built with **Next.js 14** (App Router) , inspired by the physical wall calendar aesthetic.

---

## Features

### Core
- **Wall calendar aesthetic** — hero photo panel paired with month grid, blue diagonal wave separator (matching reference image style)
- **Day range selector** — click to set start date (accent color), click again for end date (second accent), range fills visually between them
- **Notes panel** — per-month notes persist via `localStorage`, with a live range badge showing selected span + day count
- **Fully responsive** — desktop shows side-by-side panels; mobile stacks vertically with touch-friendly tap targets

### Extras (stand-out features)
- **Page-flip animation** — month transitions use a subtle 3D perspective flip via Framer Motion
- **4 colour themes** — Terra, Ocean, Forest, Dusk; persisted to `localStorage`
- **Holiday markers** — small dots on public holidays (India-focused: Republic Day, Independence Day, Christmas, etc.)
- **Seasonal hero photos** — each month pulls a different Unsplash photo; image has a subtle Ken Burns hover zoom
- **SAT/SUN column colouring** — Saturday and Sunday headers/dates tinted differently for quick visual scanning
- **Today indicator** — underline dot on the current date

---

## Architecture decisions

| Decision | Rationale |
|---|---|
| Next.js App Router | Modern file-based routing, RSC-ready, easy Vercel deploy |
| CSS custom properties for theming | Theme switching with zero JS re-renders — just update `--accent` on the root |
| Single `WallCalendar` parent with lifted state | Calendar grid, notes, and hero all need access to `selStart/selEnd`; colocating in one parent keeps data flow simple |
| `localStorage` for persistence | Assessment spec says no backend; `localStorage` is the right client-side solution for notes + theme |
| Framer Motion `AnimatePresence` | Clean page-flip on month change with direction awareness (forward vs back) |
| Monday-first grid | Standard calendar convention outside the US; configurable by changing the `DOW` offset in `CalendarGrid` |

---

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

Requires **Node.js 18+**.

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to Vercel — it auto-detects Next.js and deploys on every push.

---

## File structure

```
app/
  layout.jsx      — Root layout, imports globals.css
  page.jsx        — Entry point, renders <WallCalendar>
  globals.css     — All component styles (CSS custom properties + responsive rules)

components/
  WallCalendar.jsx  — Root component, state management
  HeroPanel.jsx     — Photo + wave SVG + month label + nav buttons
  CalendarGrid.jsx  — DOW headers + day cells + range/holiday logic
  NotesPanel.jsx    — Textarea + range badge + clear button
  ThemeSwitcher.jsx — Colour theme dots
```
