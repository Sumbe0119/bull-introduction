# The Bull Restaurant

React + Vite project — hotpot restaurant landing page with GSAP ScrollTrigger
pinned scroll chapters and a Three.js (official `three` npm package) rotating
stainless-steel hotpot in the hero.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx              entry point
  App.jsx                assembles all sections
  index.css              global styles / design tokens
  hooks/
    useReveal.js          IntersectionObserver hook for scroll-reveal sections
  three/
    potScene.js           Three.js hotpot scene, driven by scroll progress
  components/
    Header.jsx
    HeroPin.jsx           Chapter A — pinned hero with rotating 3D pot
    GalleryPin.jsx        Chapter B — pinned photo panel
    ZoomPin.jsx           Chapter C — pinned wordmark zoom transition
    Story.jsx
    Broth.jsx
    Menu.jsx
    GalleryGrid.jsx
    Testimonials.jsx
    Reserve.jsx
    Footer.jsx
```

## Notes

- The three pinned "chapters" (Hero, Gallery, Zoom) use `position: sticky` +
  `gsap.timeline({ scrollTrigger: { scrub: true } })` to tie animation
  progress directly to scroll position.
- The hero's 3D pot rotates a full 360° across the hero chapter's scroll
  range (0 → 1 progress maps to 0° → 360°), matching front / 90° / 180° /
  270° / 360° reference views.
- Photo placeholders (`.split-media`, `.gallery div`, `.gp-main`, `.gp-thumb`)
  are gradient blocks — swap in real photography via `background-image` or
  an `<img>` inside them.
