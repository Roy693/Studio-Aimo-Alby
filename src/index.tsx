import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/favicon.svg', (c) => {
  return c.body(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#131210"/><polygon points="16,6 26,11 26,21 16,26 6,21 6,11" fill="none" stroke="#c8a96e" stroke-width="1.2"/><line x1="16" y1="6" x2="16" y2="26" stroke="#ede9df" stroke-width="0.8" opacity="0.5"/><line x1="6" y1="11" x2="26" y2="21" stroke="#ede9df" stroke-width="0.8" opacity="0.3"/><line x1="6" y1="21" x2="26" y2="11" stroke="#ede9df" stroke-width="0.8" opacity="0.3"/></svg>`, 200, { 'Content-Type': 'image/svg+xml' })
})

/* ─────────────────────────────────────────────────────────────
   INTRO PAGE
───────────────────────────────────────────────────────────── */
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>STUDIO AIMO</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="stylesheet" href="/static/intro.css"/>
</head>
<body>
<div id="intro-screen">
  <canvas id="particle-canvas"></canvas>

  <div class="scene-wrapper">
  <svg id="main-scene" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="chalk" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" seed="3" stitchTiles="stitch" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.0" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
      <filter id="chalk-fine" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="3" seed="7" stitchTiles="stitch" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.0" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="chalk-heavy" x="-12%" y="-12%" width="124%" height="124%">
        <feTurbulence type="fractalNoise" baseFrequency="0.58" numOctaves="5" seed="11" stitchTiles="stitch" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow-micro" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.0" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="glow-warm" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4.0" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1.2 0.1 0 0 0  0.1 1.0 0 0 0  0 0 0.8 0 0  0 0 0 0.8 0" result="warm"/>
        <feMerge><feMergeNode in="warm"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    <!-- Blueprint grid patterns -->
    <pattern id="bp-fine" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(238,235,220,0.016)" stroke-width="0.3"/>
    </pattern>
    <pattern id="bp-major" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M100 0L0 0 0 100" fill="none" stroke="rgba(238,235,220,0.030)" stroke-width="0.5"/>
    </pattern>
    <!-- Vignette -->
    <radialGradient id="depth-haze" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="rgba(19,18,16,0.0)"/>
      <stop offset="68%" stop-color="rgba(10,10,9,0.35)"/>
      <stop offset="100%" stop-color="rgba(5,5,4,0.82)"/>
    </radialGradient>
    <!-- Centre spotlight — illuminates hero illustration -->
    <radialGradient id="centre-glow" cx="50%" cy="50%" r="28%">
      <stop offset="0%" stop-color="rgba(52,48,40,0.42)"/>
      <stop offset="100%" stop-color="rgba(19,18,16,0.0)"/>
    </radialGradient>
    <!-- Chalk filters -->
    <filter id="chalk-fine" x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="chalk-heavy" x="-14%" y="-14%" width="128%" height="128%">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="5" seed="11" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="glow-micro" x="-22%" y="-22%" width="144%" height="144%">
      <feGaussianBlur stdDeviation="2.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-soft" x="-32%" y="-32%" width="164%" height="164%">
      <feGaussianBlur stdDeviation="4.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

    <!-- Grid + atmospheric glow -->
    <rect width="1440" height="900" fill="url(#bp-fine)"/>
    <rect width="1440" height="900" fill="url(#bp-major)"/>
    <rect width="1440" height="900" fill="url(#centre-glow)" pointer-events="none"/>

    <!-- ══════════════════════════════════════════════════════════════
         STUDIO AIMO — FULL CANVAS HAND-DRAWN 3D INTERIOR SCENE
         1440 × 900  |  chalk · isometric · commercial & residential
         9 ZONES: TL / TC / TR / ML / MC / MR / BL / BC / BR
    ══════════════════════════════════════════════════════════════ -->

    <!-- ─────────────────────────────────────────────────────
         ZONE TL  (x 0-480, y 0-300)
         Grand L-shaped sectional sofa + coffee table + pendant lights
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="sofa-tl" filter="url(#chalk)">
      <!-- seat top face -->
      <polygon points="60,220 380,130 440,162 120,252" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="2.0"/>
      <!-- seat front face -->
      <polygon points="60,220 60,295 120,320 120,252" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.5"/>
      <!-- seat right side -->
      <polygon points="120,252 120,320 440,230 440,162" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
      <!-- backrest top -->
      <polygon points="60,220 70,165 370,80 380,130" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <!-- backrest depth -->
      <polygon points="370,80 382,90 440,118 440,162" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <!-- cushion dividers vertical -->
      <line x1="160" y1="145" x2="162" y2="268" stroke="rgba(238,235,220,0.36)" stroke-width="0.9"/>
      <line x1="260" y1="118" x2="262" y2="240" stroke="rgba(238,235,220,0.32)" stroke-width="0.8"/>
      <line x1="358" y1="94" x2="360" y2="214" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <!-- cushion seam horizontal -->
      <line x1="70" y1="196" x2="375" y2="108" stroke="rgba(238,235,220,0.20)" stroke-width="0.6"/>
      <!-- armrest left -->
      <polygon points="60,220 38,207 38,282 60,295" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <ellipse cx="48" cy="208" rx="13" ry="5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9" transform="skewX(-8)"/>
      <!-- armrest right -->
      <polygon points="380,130 402,120 402,188 440,162" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.3"/>
      <!-- L-chaise extension -->
      <polygon points="60,295 -50,260 -50,350 60,380" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.7"/>
      <polygon points="-50,260 -50,350 2,372 2,282" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <polygon points="60,295 -50,260 2,238 60,268" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <line x1="2" y1="248" x2="2" y2="360" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <!-- scatter cushions -->
      <polygon points="-28,270 8,258 14,278 -22,290" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <polygon points="200,170 228,162 233,180 205,188" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <!-- legs -->
      <line x1="72" y1="312" x2="72" y2="342" stroke="rgba(238,235,220,0.65)" stroke-width="1.4"/>
      <line x1="118" y1="318" x2="118" y2="348" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <line x1="420" y1="212" x2="420" y2="240" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
    </g>

    <!-- Coffee table hairpin — zone TL -->
    <g class="fi" id="ct-tl" filter="url(#chalk)">
      <polygon points="130,340 380,278 422,302 172,362" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <polygon points="130,340 130,356 172,376 172,362" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <polygon points="172,362 172,376 422,318 422,302" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- veining -->
      <path d="M180,302 Q260,292 322,300" fill="none" stroke="rgba(238,235,220,0.11)" stroke-width="0.5"/>
      <!-- hairpin legs -->
      <line x1="148" y1="352" x2="140" y2="400" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="148" y1="352" x2="160" y2="400" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="400" y1="308" x2="392" y2="356" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="400" y1="308" x2="412" y2="356" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- tray + vase on table -->
      <ellipse cx="270" cy="302" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="270" y1="293" x2="268" y2="272" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <circle cx="268" cy="269" r="6" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- books stack -->
      <rect x="330" y="290" width="42" height="11" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" transform="skewX(-14)"/>
      <rect x="332" y="282" width="36" height="10" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" transform="skewX(-14)"/>
    </g>

    <!-- Pendant lights trio — zone TL ceiling -->
    <g class="fi" id="pendants-tl" filter="url(#chalk)">
      <!-- pendant 1 — flared dome -->
      <line x1="160" y1="0" x2="160" y2="42" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <polygon points="134,42 186,42 174,84 146,84" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <ellipse cx="160" cy="84" rx="14" ry="4.5" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.2"/>
      <ellipse cx="160" cy="86" rx="6" ry="2" fill="none" stroke="rgba(200,170,110,0.80)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <!-- pendant 2 — cone industrial -->
      <line x1="250" y1="0" x2="250" y2="55" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <polygon points="228,55 272,55 266,88 234,88" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <ellipse cx="250" cy="88" rx="16" ry="5" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <ellipse cx="250" cy="90" rx="7" ry="2.5" fill="none" stroke="rgba(200,170,110,0.75)" stroke-width="0.9" filter="url(#glow-warm)"/>
      <!-- pendant 3 — globe -->
      <line x1="340" y1="0" x2="340" y2="48" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <circle cx="340" cy="70" r="22" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.5"/>
      <ellipse cx="340" cy="70" rx="22" ry="8" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="340" cy="70" r="8" fill="none" stroke="rgba(200,170,110,0.70)" stroke-width="0.9" filter="url(#glow-warm)"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE TC  (x 480-960, y 0-300)
         Luxury kitchen island + bar stools + overhead rack
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="kitchen-tc" filter="url(#chalk)">
      <!-- island top -->
      <polygon points="520,200 760,120 840,158 600,238" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="2.0"/>
      <!-- island front face -->
      <polygon points="520,200 520,268 600,300 600,238" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- island right face -->
      <polygon points="600,238 600,300 840,220 840,158" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.2"/>
      <!-- panel groove lines front -->
      <line x1="540" y1="210" x2="540" y2="274" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="560" y1="204" x2="560" y2="268" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <!-- waterfall edge -->
      <line x1="520" y1="200" x2="520" y2="268" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <!-- cooktop rings -->
      <ellipse cx="680" cy="168" rx="22" ry="8" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <ellipse cx="680" cy="168" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <ellipse cx="740" cy="152" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <ellipse cx="740" cy="152" rx="11" ry="4" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.6"/>
      <!-- tap -->
      <line x1="636" y1="188" x2="636" y2="162" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="636" y1="162" x2="650" y2="158" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <ellipse cx="650" cy="157" rx="4" ry="2" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <!-- sink -->
      <rect x="610" y="178" width="44" height="20" rx="2" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.0" transform="skewX(-20) skewY(-8)"/>
      <!-- bar stools -->
      <ellipse cx="560" cy="268" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.3"/>
      <line x1="550" y1="268" x2="548" y2="330" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <line x1="570" y1="268" x2="568" y2="330" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <line x1="548" y1="330" x2="568" y2="330" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- stool 2 -->
      <ellipse cx="630" cy="252" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <line x1="620" y1="252" x2="618" y2="314" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <line x1="640" y1="252" x2="638" y2="314" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="618" y1="314" x2="638" y2="314" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- stool 3 -->
      <ellipse cx="700" cy="236" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.3"/>
      <line x1="690" y1="236" x2="688" y2="298" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="710" y1="236" x2="708" y2="298" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="688" y1="298" x2="708" y2="298" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- overhead pot rack -->
      <rect x="570" y="22" width="220" height="12" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <line x1="570" y1="34" x2="570" y2="160" stroke="rgba(238,235,220,0.25)" stroke-width="0.5" stroke-dasharray="3,8"/>
      <line x1="790" y1="34" x2="790" y2="140" stroke="rgba(238,235,220,0.22)" stroke-width="0.5" stroke-dasharray="3,8"/>
      <!-- hanging pots -->
      <ellipse cx="610" cy="72" rx="14" ry="10" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <ellipse cx="610" cy="62" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <line x1="610" y1="34" x2="610" y2="62" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <ellipse cx="660" cy="68" rx="12" ry="9" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <line x1="660" y1="34" x2="660" y2="59" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <ellipse cx="710" cy="74" rx="16" ry="11" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.2"/>
      <line x1="710" y1="34" x2="710" y2="63" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <ellipse cx="758" cy="66" rx="11" ry="8" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <line x1="758" y1="34" x2="758" y2="58" stroke="rgba(238,235,220,0.48)" stroke-width="0.8"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE TR  (x 960-1440, y 0-300)
         Floor-to-ceiling bookcase wall + reading chair + floor lamp
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="bookcase-tr" filter="url(#chalk)">
      <!-- unit left column -->
      <rect x="980" y="20" width="18" height="280" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <!-- unit right column -->
      <rect x="1260" y="20" width="18" height="280" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <!-- shelves horizontal (6 shelves) -->
      <line x1="980" y1="20" x2="1278" y2="20" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <line x1="980" y1="66" x2="1278" y2="66" stroke="rgba(238,235,220,0.68)" stroke-width="1.1"/>
      <line x1="980" y1="112" x2="1278" y2="112" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <line x1="980" y1="158" x2="1278" y2="158" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <line x1="980" y1="204" x2="1278" y2="204" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <line x1="980" y1="250" x2="1278" y2="250" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <line x1="980" y1="300" x2="1278" y2="300" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <!-- shelf depth side panels -->
      <polygon points="980,20 960,30 960,308 980,300" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="1.0"/>
      <polygon points="1278,20 1278,300 1298,308 1298,30" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="1.0"/>
      <!-- row 1 books (y 20-66) -->
      <rect x="990" y="24" width="8" height="38" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="0.9"/>
      <rect x="1000" y="26" width="10" height="36" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="0.9"/>
      <rect x="1012" y="24" width="7" height="38" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="0.8"/>
      <rect x="1022" y="28" width="9" height="34" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <rect x="1034" y="24" width="11" height="38" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.8"/>
      <!-- row 1 decorative object -->
      <ellipse cx="1120" cy="44" rx="18" ry="12" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <line x1="1120" y1="32" x2="1120" y2="20" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <!-- row 2 books (y 66-112) -->
      <rect x="1060" y="70" width="9" height="38" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="0.9"/>
      <rect x="1071" y="72" width="11" height="36" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="0.8"/>
      <rect x="1084" y="70" width="8" height="38" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="0.8"/>
      <rect x="1094" y="74" width="10" height="34" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <rect x="1106" y="70" width="7" height="38" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.7"/>
      <!-- row 3 plant -->
      <ellipse cx="1040" cy="128" rx="20" ry="8" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <line x1="1040" y1="120" x2="1030" y2="100" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <line x1="1040" y1="120" x2="1048" y2="96" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <circle cx="1028" cy="98" r="7" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <circle cx="1050" cy="94" r="8" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- row 4–6: more books at varied positions -->
      <rect x="990" y="162" width="8" height="38" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="0.9"/>
      <rect x="1000" y="164" width="10" height="36" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="0.8"/>
      <rect x="1200" y="208" width="9" height="38" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="0.9"/>
      <rect x="1211" y="210" width="11" height="36" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <rect x="1224" y="208" width="8" height="38" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.7"/>
      <!-- small framed art on shelf 5 -->
      <rect x="1080" y="208" width="48" height="36" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <rect x="1084" y="212" width="40" height="28" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.6"/>
      <line x1="1100" y1="220" x2="1116" y2="234" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
      <line x1="1116" y1="220" x2="1100" y2="234" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
    </g>

    <!-- Reading armchair + floor lamp — zone TR -->
    <g class="fi" id="armchair-tr" filter="url(#chalk)">
      <!-- seat top -->
      <polygon points="1300,220 1390,190 1420,204 1330,234" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.7"/>
      <!-- seat front -->
      <polygon points="1300,220 1300,265 1330,278 1330,234" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- seat right -->
      <polygon points="1330,234 1330,278 1420,246 1420,204" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- backrest -->
      <polygon points="1300,220 1308,170 1396,142 1390,190" fill="none" stroke="rgba(238,235,220,0.85)" stroke-width="1.6"/>
      <polygon points="1390,190 1396,142 1422,154 1420,204" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- armrests -->
      <polygon points="1300,220 1286,213 1286,258 1300,265" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <polygon points="1390,190 1404,184 1404,228 1420,204" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <!-- legs -->
      <line x1="1308" y1="272" x2="1308" y2="295" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="1326" y1="276" x2="1326" y2="299" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="1408" y1="244" x2="1408" y2="268" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
    </g>

    <!-- Floor lamp arc — zone TR -->
    <g class="fi" id="lamp-tr" filter="url(#chalk)">
      <line x1="1432" y1="300" x2="1432" y2="20" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <path d="M1432,20 Q1380,10 1340,48" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <!-- shade -->
      <polygon points="1318,48 1362,48 1354,84 1326,84" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.5"/>
      <ellipse cx="1340" cy="84" rx="14" ry="4" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.1"/>
      <ellipse cx="1340" cy="86" rx="7" ry="2.5" fill="none" stroke="rgba(200,170,110,0.78)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <!-- base -->
      <ellipse cx="1432" cy="298" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE ML  (x 0-480, y 300-600)
         Dining table + 4 chairs + chandelier
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="dining-ml" filter="url(#chalk)">
      <!-- table top ellipse isometric -->
      <polygon points="60,420 280,360 420,428 200,488" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="2.0"/>
      <!-- table depth front -->
      <polygon points="60,420 60,440 200,506 200,488" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- table depth right -->
      <polygon points="200,488 200,506 420,446 420,428" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- single pedestal leg -->
      <line x1="240" y1="488" x2="240" y2="540" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <ellipse cx="240" cy="540" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- chairs: north, south, east, west -->
      <!-- chair N -->
      <polygon points="200,360 280,336 300,346 220,370" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.5"/>
      <polygon points="200,360 200,380 220,388 220,370" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <polygon points="200,360 208,328 286,306 280,336" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.4"/>
      <!-- chair S -->
      <polygon points="100,488 220,450 240,460 120,498" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.5"/>
      <polygon points="100,488 100,508 120,516 120,498" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <polygon points="100,488 108,526 228,490 220,450" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <!-- chair E -->
      <polygon points="380,408 420,388 440,400 400,420" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.4"/>
      <polygon points="380,408 380,430 400,440 400,420" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <polygon points="380,408 390,374 430,356 420,388" fill="none" stroke="rgba(238,235,220,0.74)" stroke-width="1.3"/>
      <!-- chair W -->
      <polygon points="20,440 60,420 80,430 40,452" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.4"/>
      <polygon points="20,440 20,462 40,472 40,452" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <polygon points="20,440 30,476 70,458 60,420" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <!-- table setting: plates & glasses -->
      <ellipse cx="240" cy="424" rx="16" ry="6" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <circle cx="264" cy="418" r="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="216" cy="430" r="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
    </g>

    <!-- Chandelier above dining — zone ML -->
    <g class="fi" id="chandelier-ml" filter="url(#chalk)">
      <line x1="240" y1="300" x2="240" y2="340" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- disc body -->
      <ellipse cx="240" cy="352" rx="48" ry="14" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.7"/>
      <ellipse cx="240" cy="345" rx="36" ry="10" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- arms -->
      <line x1="192" y1="352" x2="168" y2="370" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <line x1="288" y1="352" x2="312" y2="370" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <line x1="240" y1="366" x2="240" y2="388" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <!-- bulbs -->
      <ellipse cx="168" cy="374" rx="6" ry="3" fill="none" stroke="rgba(200,170,110,0.82)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <ellipse cx="312" cy="374" rx="6" ry="3" fill="none" stroke="rgba(200,170,110,0.80)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <ellipse cx="240" cy="391" rx="6" ry="3" fill="none" stroke="rgba(200,170,110,0.78)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <!-- gold band detail -->
      <line x1="200" y1="344" x2="280" y2="344" stroke="rgba(200,170,110,0.55)" stroke-width="0.8"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE MC — CENTRE (x 480-960, y 300-600)
         Hero: reception desk + lounge pod chairs + arc pendant
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="reception-mc" filter="url(#chalk-heavy)">
      <!-- curved desk top -->
      <path d="M500,490 Q720,420 940,490" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="2.2"/>
      <path d="M500,490 Q720,436 940,490" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <!-- desk front panel curved -->
      <path d="M500,490 Q720,456 940,490 L940,530 Q720,496 500,530 Z" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.5"/>
      <!-- desk side left -->
      <polygon points="500,490 500,530 468,542 468,502" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- desk side right -->
      <polygon points="940,490 940,530 972,542 972,502" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <!-- desk top thickness line -->
      <path d="M500,494 Q720,440 940,494" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- marble top veining -->
      <path d="M580,470 Q660,460 740,468" fill="none" stroke="rgba(238,235,220,0.10)" stroke-width="0.4"/>
      <path d="M620,478 Q700,468 780,476" fill="none" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
      <!-- panel vertical grooves -->
      <line x1="580" y1="494" x2="580" y2="530" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <line x1="640" y1="492" x2="640" y2="528" stroke="rgba(238,235,220,0.26)" stroke-width="0.7"/>
      <line x1="700" y1="492" x2="700" y2="528" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <line x1="760" y1="492" x2="760" y2="528" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <line x1="820" y1="492" x2="820" y2="528" stroke="rgba(238,235,220,0.26)" stroke-width="0.7"/>
      <line x1="880" y1="494" x2="880" y2="530" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <!-- monitor on desk -->
      <rect x="695" y="452" width="50" height="34" rx="2" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <rect x="698" y="455" width="44" height="28" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.6"/>
      <line x1="720" y1="486" x2="720" y2="494" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <line x1="712" y1="494" x2="728" y2="494" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <!-- logo badge on front -->
      <rect x="700" y="506" width="40" height="16" rx="1" fill="none" stroke="rgba(200,170,110,0.65)" stroke-width="0.9"/>
      <line x1="708" y1="514" x2="740" y2="514" stroke="rgba(200,170,110,0.40)" stroke-width="0.5"/>
      <!-- flower/vase -->
      <line x1="770" y1="490" x2="770" y2="466" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <circle cx="770" cy="462" r="10" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <ellipse cx="770" cy="490" rx="10" ry="4" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
    </g>

    <!-- Lounge pod chair left — zone MC -->
    <g class="fi" id="pod-l" filter="url(#chalk)">
      <!-- shell outer -->
      <path d="M510,420 Q494,380 510,340 Q540,308 572,340 Q590,380 572,420 Z" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <!-- shell inner -->
      <path d="M518,412 Q504,378 518,348 Q542,320 566,348 Q580,378 566,412 Z" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- pedestal disc -->
      <ellipse cx="541" cy="432" rx="26" ry="9" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <!-- seat cushion -->
      <polygon points="518,400 566,400 572,420 510,420" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <!-- side table beside pod -->
      <ellipse cx="585" cy="418" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.2"/>
      <line x1="580" y1="418" x2="578" y2="448" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <line x1="590" y1="418" x2="592" y2="448" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <line x1="578" y1="448" x2="592" y2="448" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <circle cx="585" cy="414" r="3" fill="none" stroke="rgba(200,170,110,0.70)" stroke-width="0.7" filter="url(#glow-micro)"/>
    </g>

    <!-- Lounge pod chair right — zone MC -->
    <g class="fi" id="pod-r" filter="url(#chalk)">
      <path d="M868,420 Q852,380 868,340 Q898,308 930,340 Q948,380 930,420 Z" fill="none" stroke="rgba(238,235,220,0.85)" stroke-width="1.8"/>
      <path d="M876,412 Q862,378 876,348 Q900,320 924,348 Q938,378 924,412 Z" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.9"/>
      <ellipse cx="899" cy="432" rx="26" ry="9" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <polygon points="876,400 924,400 930,420 868,420" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <!-- small table right -->
      <ellipse cx="846" cy="418" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.2"/>
      <line x1="840" y1="418" x2="838" y2="448" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <line x1="852" y1="418" x2="854" y2="448" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="838" y1="448" x2="854" y2="448" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
    </g>

    <!-- Large pendant cluster above reception — zone MC ceiling -->
    <g class="fi" id="pendant-mc" filter="url(#chalk)">
      <!-- central large dome -->
      <line x1="720" y1="300" x2="720" y2="348" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <polygon points="686,348 754,348 744,398 696,398" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <ellipse cx="720" cy="398" rx="24" ry="7" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <ellipse cx="720" cy="401" rx="12" ry="4" fill="none" stroke="rgba(200,170,110,0.88)" stroke-width="1.2" filter="url(#glow-warm)"/>
      <!-- smaller left dome -->
      <line x1="640" y1="300" x2="640" y2="356" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <polygon points="616,356 664,356 657,392 623,392" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <ellipse cx="640" cy="392" rx="17" ry="5.5" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <ellipse cx="640" cy="395" rx="8" ry="3" fill="none" stroke="rgba(200,170,110,0.78)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <!-- smaller right dome -->
      <line x1="800" y1="300" x2="800" y2="356" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <polygon points="776,356 824,356 817,392 783,392" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <ellipse cx="800" cy="392" rx="17" ry="5.5" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <ellipse cx="800" cy="395" rx="8" ry="3" fill="none" stroke="rgba(200,170,110,0.75)" stroke-width="1.0" filter="url(#glow-warm)"/>
      <!-- gold ring trim -->
      <ellipse cx="720" cy="348" rx="35" ry="10" fill="none" stroke="rgba(200,170,110,0.45)" stroke-width="0.8"/>
    </g>

    <!-- Material sample board — zone MC back wall -->
    <g class="fi" id="sample-board" filter="url(#chalk-fine)">
      <!-- frame -->
      <rect x="608" y="308" width="224" height="128" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <!-- shadow depth -->
      <polygon points="832,308 840,314 840,442 832,436" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- 4x2 sample grid -->
      <!-- row 1 -->
      <rect x="616" y="316" width="50" height="50" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.0"/>
      <!-- marble lines in sample 1 -->
      <path d="M622,326 Q636,334 648,328" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <path d="M618,340 Q634,346 650,338" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <rect x="670" y="316" width="50" height="50" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <!-- wood grain in sample 2 -->
      <line x1="676" y1="324" x2="714" y2="324" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <line x1="676" y1="330" x2="714" y2="330" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <line x1="676" y1="336" x2="714" y2="336" stroke="rgba(238,235,220,0.16)" stroke-width="0.3"/>
      <line x1="676" y1="342" x2="714" y2="342" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <rect x="724" y="316" width="50" height="50" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <!-- fabric texture in sample 3 -->
      <line x1="730" y1="322" x2="768" y2="322" stroke="rgba(238,235,220,0.16)" stroke-width="0.4"/>
      <line x1="730" y1="328" x2="768" y2="328" stroke="rgba(238,235,220,0.14)" stroke-width="0.3"/>
      <line x1="730" y1="334" x2="768" y2="334" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <line x1="740" y1="318" x2="740" y2="360" stroke="rgba(238,235,220,0.14)" stroke-width="0.3"/>
      <line x1="750" y1="318" x2="750" y2="360" stroke="rgba(238,235,220,0.12)" stroke-width="0.3"/>
      <line x1="760" y1="318" x2="760" y2="360" stroke="rgba(238,235,220,0.14)" stroke-width="0.3"/>
      <rect x="778" y="316" width="50" height="50" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <!-- terrazzo dots in sample 4 -->
      <circle cx="795" cy="330" r="2" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.6"/>
      <circle cx="810" cy="338" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.5"/>
      <circle cx="800" cy="348" r="1.5" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.5"/>
      <circle cx="820" cy="328" r="2" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
      <!-- row 2 -->
      <rect x="616" y="370" width="50" height="58" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <rect x="670" y="370" width="50" height="58" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <rect x="724" y="370" width="50" height="58" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <rect x="778" y="370" width="50" height="58" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- gold label tags on row 2 -->
      <line x1="624" y1="420" x2="658" y2="420" stroke="rgba(200,170,110,0.50)" stroke-width="0.7"/>
      <line x1="678" y1="420" x2="712" y2="420" stroke="rgba(200,170,110,0.48)" stroke-width="0.7"/>
      <line x1="732" y1="420" x2="766" y2="420" stroke="rgba(200,170,110,0.46)" stroke-width="0.7"/>
      <line x1="786" y1="420" x2="820" y2="420" stroke="rgba(200,170,110,0.44)" stroke-width="0.7"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE MR  (x 960-1440, y 300-600)
         Walk-in wardrobe / retail shelving + chaise lounge
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="wardrobe-mr" filter="url(#chalk)">
      <!-- unit back panel -->
      <rect x="980" y="310" width="340" height="260" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <!-- unit top perspective -->
      <polygon points="980,310 1320,310 1348,326 1008,326" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- unit depth right -->
      <polygon points="1320,310 1348,326 1348,580 1320,570" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="1.0"/>
      <!-- divider vertical centre -->
      <line x1="1150" y1="310" x2="1150" y2="570" stroke="rgba(238,235,220,0.40)" stroke-width="0.9"/>
      <!-- left section: hanging rail -->
      <line x1="990" y1="360" x2="1140" y2="360" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <!-- hanging garments left (8 items) -->
      <line x1="1010" y1="360" x2="1010" y2="450" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <polygon points="1002,450 1018,450 1016,490 1004,490" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <line x1="1028" y1="360" x2="1028" y2="448" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <polygon points="1020,448 1036,448 1034,488 1022,488" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <line x1="1046" y1="360" x2="1046" y2="452" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <polygon points="1038,452 1054,452 1052,492 1040,492" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.8"/>
      <line x1="1064" y1="360" x2="1064" y2="450" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <polygon points="1056,450 1072,450 1070,490 1058,490" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <line x1="1082" y1="360" x2="1082" y2="448" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <polygon points="1074,448 1090,448 1088,488 1076,488" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.8"/>
      <line x1="1100" y1="360" x2="1100" y2="452" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <polygon points="1092,452 1108,452 1106,492 1094,492" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8"/>
      <!-- shoe shelf at bottom left -->
      <line x1="990" y1="510" x2="1140" y2="510" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <ellipse cx="1020" cy="530" rx="18" ry="8" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <ellipse cx="1060" cy="530" rx="18" ry="8" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <ellipse cx="1100" cy="530" rx="18" ry="8" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- right section: shelves with items -->
      <line x1="1160" y1="370" x2="1310" y2="370" stroke="rgba(238,235,220,0.60)" stroke-width="1.0"/>
      <line x1="1160" y1="420" x2="1310" y2="420" stroke="rgba(238,235,220,0.58)" stroke-width="0.9"/>
      <line x1="1160" y1="470" x2="1310" y2="470" stroke="rgba(238,235,220,0.56)" stroke-width="0.9"/>
      <line x1="1160" y1="520" x2="1310" y2="520" stroke="rgba(238,235,220,0.54)" stroke-width="0.9"/>
      <!-- folded items on shelves -->
      <rect x="1170" y="375" width="44" height="40" rx="1" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="0.9"/>
      <line x1="1170" y1="390" x2="1214" y2="390" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
      <rect x="1225" y="375" width="44" height="40" rx="1" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <line x1="1225" y1="390" x2="1269" y2="390" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <!-- perfume bottles on top shelf -->
      <rect x="1172" y="332" width="8" height="34" rx="1" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.0"/>
      <ellipse cx="1176" cy="332" rx="5" ry="3" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <rect x="1190" y="336" width="10" height="30" rx="1" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="0.9"/>
      <ellipse cx="1195" cy="336" rx="6" ry="3" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <rect x="1212" y="330" width="7" height="36" rx="1" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="0.9"/>
    </g>

    <!-- Chaise longue — zone MR -->
    <g class="fi" id="chaise-mr" filter="url(#chalk)">
      <!-- seat top -->
      <polygon points="1340,410 1430,380 1440,392 1350,422" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.7"/>
      <!-- seat front -->
      <polygon points="1340,410 1340,452 1350,458 1350,422" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- seat right -->
      <polygon points="1350,422 1350,458 1440,424 1440,392" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- backrest -->
      <polygon points="1340,410 1348,368 1436,340 1430,380" fill="none" stroke="rgba(238,235,220,0.85)" stroke-width="1.6"/>
      <!-- curved headboard -->
      <path d="M1348,368 Q1344,350 1352,336" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <path d="M1352,336 Q1380,318 1412,328" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <!-- cushion -->
      <polygon points="1348,392 1424,364 1428,372 1352,400" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- legs -->
      <line x1="1348" y1="450" x2="1348" y2="476" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <line x1="1436" y1="420" x2="1436" y2="446" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE BL  (x 0-480, y 600-900)
         Bathroom: freestanding tub + side table + wall sconce
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="bathtub-bl" filter="url(#chalk-heavy)">
      <!-- tub outer ellipse isometric -->
      <ellipse cx="220" cy="740" rx="160" ry="56" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="2.0"/>
      <!-- tub inner rim -->
      <ellipse cx="220" cy="732" rx="148" ry="50" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <!-- tub basin -->
      <ellipse cx="220" cy="730" rx="130" ry="42" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <!-- tub depth sides -->
      <line x1="60" y1="740" x2="60" y2="790" stroke="rgba(238,235,220,0.65)" stroke-width="1.3"/>
      <line x1="380" y1="740" x2="380" y2="790" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="220" cy="790" rx="160" ry="56" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <!-- feet (claw feet) -->
      <path d="M68,788 Q60,800 52,810 Q58,812 68,808" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <path d="M372,788 Q380,800 388,810 Q382,812 372,808" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <path d="M82,792 Q76,804 70,814 Q76,816 84,812" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <path d="M358,792 Q364,804 370,814 Q364,816 356,812" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- faucet -->
      <line x1="220" y1="732" x2="220" y2="708" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <path d="M220,708 Q240,700 252,708" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <ellipse cx="252" cy="708" rx="5" ry="3" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="0.9"/>
      <!-- handles -->
      <line x1="200" y1="712" x2="188" y2="716" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <line x1="240" y1="712" x2="252" y2="716" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
    </g>

    <!-- Marble side table bathroom — zone BL -->
    <g class="fi" id="sidetable-bl" filter="url(#chalk)">
      <ellipse cx="60" cy="660" rx="30" ry="10" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.5"/>
      <line x1="30" y1="660" x2="30" y2="710" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <line x1="90" y1="660" x2="90" y2="710" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <ellipse cx="60" cy="710" rx="30" ry="10" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- items: candle + towel roll -->
      <rect x="50" y="636" width="8" height="22" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.0"/>
      <ellipse cx="54" cy="636" rx="4" ry="2" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <line x1="54" y1="634" x2="54" y2="628" stroke="rgba(200,170,110,0.65)" stroke-width="1.0"/>
      <circle cx="54" cy="627" r="2" fill="none" stroke="rgba(200,170,110,0.80)" stroke-width="0.8" filter="url(#glow-warm)"/>
      <!-- towel rolled -->
      <ellipse cx="76" cy="650" rx="10" ry="7" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="0.9"/>
      <ellipse cx="76" cy="650" rx="5" ry="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.6"/>
    </g>

    <!-- Wall sconces — zone BL -->
    <g class="fi" id="sconces-bl" filter="url(#chalk)">
      <!-- left sconce -->
      <line x1="30" y1="620" x2="30" y2="600" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <polygon points="18,600 42,600 38,620 22,620" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.4"/>
      <ellipse cx="30" cy="620" rx="8" ry="3" fill="none" stroke="rgba(200,170,110,0.75)" stroke-width="0.9" filter="url(#glow-warm)"/>
      <!-- right sconce -->
      <line x1="420" y1="620" x2="420" y2="600" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <polygon points="408,600 432,600 428,620 412,620" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <ellipse cx="420" cy="620" rx="8" ry="3" fill="none" stroke="rgba(200,170,110,0.72)" stroke-width="0.9" filter="url(#glow-warm)"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE BC  (x 480-960, y 600-900)
         Architect drafting table + stool + blueprint spread
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="draft-table" filter="url(#chalk)">
      <!-- table surface tilted -->
      <polygon points="520,800 760,730 820,760 580,830" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="2.0"/>
      <!-- table legs front left -->
      <line x1="520" y1="800" x2="520" y2="870" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="580" y1="828" x2="580" y2="898" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- table legs back right -->
      <line x1="760" y1="730" x2="760" y2="800" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="820" y1="760" x2="820" y2="830" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- cross brace -->
      <line x1="520" y1="850" x2="760" y2="780" stroke="rgba(238,235,220,0.35)" stroke-width="0.7"/>
      <!-- blueprint on table -->
      <polygon points="536,792 740,736 796,760 592,816" fill="none" stroke="rgba(200,170,110,0.65)" stroke-width="1.2"/>
      <!-- floor plan lines on blueprint -->
      <line x1="560" y1="780" x2="660" y2="752" stroke="rgba(200,170,110,0.38)" stroke-width="0.6"/>
      <line x1="560" y1="795" x2="660" y2="767" stroke="rgba(200,170,110,0.32)" stroke-width="0.5"/>
      <line x1="580" y1="778" x2="580" y2="806" stroke="rgba(200,170,110,0.35)" stroke-width="0.6"/>
      <line x1="620" y1="765" x2="620" y2="793" stroke="rgba(200,170,110,0.32)" stroke-width="0.5"/>
      <line x1="660" y1="752" x2="660" y2="780" stroke="rgba(200,170,110,0.30)" stroke-width="0.5"/>
      <!-- ruler along edge -->
      <line x1="540" y1="818" x2="794" y2="762" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- ruler tick marks -->
      <line x1="580" y1="808" x2="580" y2="814" stroke="rgba(238,235,220,0.45)" stroke-width="0.6"/>
      <line x1="620" y1="796" x2="620" y2="802" stroke="rgba(238,235,220,0.42)" stroke-width="0.6"/>
      <line x1="660" y1="784" x2="660" y2="790" stroke="rgba(238,235,220,0.40)" stroke-width="0.6"/>
      <line x1="700" y1="772" x2="700" y2="778" stroke="rgba(238,235,220,0.38)" stroke-width="0.5"/>
      <line x1="740" y1="760" x2="740" y2="766" stroke="rgba(238,235,220,0.36)" stroke-width="0.5"/>
      <!-- T-square -->
      <line x1="760" y1="730" x2="760" y2="830" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <line x1="740" y1="740" x2="780" y2="740" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <!-- pencil -->
      <line x1="700" y1="748" x2="680" y2="780" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <polygon points="680,776 676,784 686,780" fill="none" stroke="rgba(200,170,110,0.62)" stroke-width="0.9"/>
      <!-- coffee cup on corner -->
      <ellipse cx="800" cy="766" rx="12" ry="5" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.2"/>
      <line x1="788" y1="766" x2="788" y2="788" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <line x1="812" y1="766" x2="812" y2="788" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <ellipse cx="800" cy="788" rx="12" ry="5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <!-- steam -->
      <path d="M798,766 Q794,756 798,748" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <path d="M804,764 Q808,754 804,746" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
    </g>

    <!-- Architect stool — zone BC -->
    <g class="fi" id="stool-bc" filter="url(#chalk)">
      <ellipse cx="860" cy="820" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <line x1="836" y1="820" x2="834" y2="876" stroke="rgba(238,235,220,0.65)" stroke-width="1.3"/>
      <line x1="884" y1="820" x2="882" y2="876" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <line x1="840" y1="848" x2="878" y2="848" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- footrest ring -->
      <ellipse cx="858" cy="856" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         ZONE BR  (x 960-1440, y 600-900)
         Luxury bedroom: bed + nightstands + pendant drops
    ───────────────────────────────────────────────────────── -->
    <g class="fi" id="bed-br" filter="url(#chalk)">
      <!-- mattress top -->
      <polygon points="980,740 1280,640 1380,694 1080,794" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="2.0"/>
      <!-- mattress front face -->
      <polygon points="980,740 980,800 1080,848 1080,794" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- mattress right side -->
      <polygon points="1080,794 1080,848 1380,748 1380,694" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- headboard isometric -->
      <polygon points="980,740 988,682 1288,582 1280,640" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.9"/>
      <polygon points="1280,640 1288,582 1316,594 1308,652" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- headboard panel detail (diamond tufting lines) -->
      <line x1="1060" y1="608" x2="1070" y2="630" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="1080" y1="602" x2="1090" y2="624" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="1100" y1="596" x2="1110" y2="618" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="1120" y1="590" x2="1130" y2="612" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="1140" y1="584" x2="1150" y2="606" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="1060" y1="618" x2="1140" y2="594" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <line x1="1060" y1="628" x2="1140" y2="604" stroke="rgba(238,235,220,0.16)" stroke-width="0.4"/>
      <!-- pillows on bed -->
      <polygon points="1020,700 1090,676 1100,688 1030,712" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <polygon points="1100,672 1168,648 1178,660 1110,684" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <!-- duvet fold -->
      <polygon points="980,740 1280,640 1280,680 980,780" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- nightstand left -->
      <polygon points="940,750 980,736 988,742 948,756" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.4"/>
      <polygon points="940,750 940,800 948,806 948,756" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <polygon points="948,756 948,806 988,792 988,742" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <!-- lamp on nightstand left -->
      <line x1="960" y1="750" x2="960" y2="728" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <polygon points="950,728 970,728 967,744 953,744" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.3"/>
      <ellipse cx="960" cy="745" rx="7" ry="2.5" fill="none" stroke="rgba(200,170,110,0.72)" stroke-width="0.9" filter="url(#glow-warm)"/>
      <!-- nightstand right -->
      <polygon points="1340,700 1380,686 1388,692 1348,706" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.4"/>
      <polygon points="1340,700 1340,750 1348,756 1348,706" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <polygon points="1348,706 1348,756 1388,742 1388,692" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- lamp on nightstand right -->
      <line x1="1362" y1="700" x2="1362" y2="678" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <polygon points="1352,678 1372,678 1369,694 1355,694" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <ellipse cx="1362" cy="695" rx="7" ry="2.5" fill="none" stroke="rgba(200,170,110,0.68)" stroke-width="0.9" filter="url(#glow-warm)"/>
      <!-- bed frame legs -->
      <line x1="986" y1="798" x2="986" y2="840" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="1076" y1="846" x2="1076" y2="888" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="1376" y1="748" x2="1376" y2="790" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
    </g>

    <!-- Pendant drops above bed — zone BR -->
    <g class="fi" id="pendants-br" filter="url(#chalk)">
      <!-- left pendant -->
      <line x1="1060" y1="600" x2="1060" y2="660" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <polygon points="1046,660 1074,660 1070,690 1050,690" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.4"/>
      <ellipse cx="1060" cy="690" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <ellipse cx="1060" cy="692" rx="6" ry="2" fill="none" stroke="rgba(200,170,110,0.75)" stroke-width="0.9" filter="url(#glow-warm)"/>
      <!-- right pendant -->
      <line x1="1220" y1="600" x2="1220" y2="650" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <polygon points="1206,650 1234,650 1230,680 1210,680" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <ellipse cx="1220" cy="680" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <ellipse cx="1220" cy="682" rx="6" ry="2" fill="none" stroke="rgba(200,170,110,0.70)" stroke-width="0.9" filter="url(#glow-warm)"/>
    </g>

    <!-- ─────────────────────────────────────────────────────
         AMBIENT ANNOTATION LINES — distributed across canvas
    ───────────────────────────────────────────────────────── -->
    <g class="conn" opacity="0">
      <!-- horizontal guide lines -->
      <line x1="0" y1="300" x2="1440" y2="300" stroke="rgba(238,235,220,0.04)" stroke-width="0.4" stroke-dasharray="4,20"/>
      <line x1="0" y1="600" x2="1440" y2="600" stroke="rgba(238,235,220,0.04)" stroke-width="0.4" stroke-dasharray="4,20"/>
      <!-- vertical guides -->
      <line x1="480" y1="0" x2="480" y2="900" stroke="rgba(238,235,220,0.03)" stroke-width="0.3" stroke-dasharray="4,20"/>
      <line x1="960" y1="0" x2="960" y2="900" stroke="rgba(238,235,220,0.03)" stroke-width="0.3" stroke-dasharray="4,20"/>
      <!-- diagonal connectors -->
      <line x1="440" y1="360" x2="540" y2="390" stroke="rgba(238,235,220,0.05)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="960" y1="420" x2="1000" y2="410" stroke="rgba(238,235,220,0.05)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="440" y1="660" x2="530" y2="770" stroke="rgba(238,235,220,0.04)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <line x1="960" y1="720" x2="990" y2="700" stroke="rgba(238,235,220,0.04)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <!-- node dots at intersections -->
      <circle cx="480" cy="300" r="2" fill="none" stroke="rgba(238,235,220,0.12)" stroke-width="0.6"/>
      <circle cx="960" cy="300" r="2" fill="none" stroke="rgba(238,235,220,0.10)" stroke-width="0.6"/>
      <circle cx="480" cy="600" r="2" fill="none" stroke="rgba(238,235,220,0.10)" stroke-width="0.6"/>
      <circle cx="960" cy="600" r="2" fill="none" stroke="rgba(238,235,220,0.08)" stroke-width="0.6"/>
    </g>

    <!-- Depth haze vignette -->
    <rect width="1440" height="900" fill="url(#depth-haze)" pointer-events="none"/>
  </svg>
  </div>

  <!-- HOME PREVIEW — visible before clicking the arrow -->
  <div id="home-preview" aria-hidden="true">
    <div class="hp-inner">
      <!-- mini SVG room sketch -->
      <svg class="hp-svg" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="hpChalk" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <radialGradient id="hpGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(200,169,110,0.12)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
        </defs>
        <!-- Background glow -->
        <rect width="260" height="160" fill="url(#hpGlow)"/>
        <!-- Floor plane -->
        <polygon points="30,120 130,90 230,120 130,150" fill="none" stroke="rgba(238,235,220,0.10)" stroke-width="0.6"/>
        <!-- Back wall left -->
        <polygon points="30,40 130,10 130,90 30,120" fill="none" stroke="rgba(238,235,220,0.08)" stroke-width="0.5"/>
        <!-- Back wall right -->
        <polygon points="130,10 230,40 230,120 130,90" fill="none" stroke="rgba(238,235,220,0.08)" stroke-width="0.5"/>

        <!-- Grand sofa (centre) -->
        <g filter="url(#hpChalk)" stroke-linecap="round" stroke-linejoin="round">
          <!-- sofa base -->
          <polygon points="85,105 175,88 175,100 85,117" fill="none" stroke="rgba(200,169,110,0.70)" stroke-width="1.1"/>
          <!-- sofa back -->
          <polygon points="85,105 85,93 175,76 175,88" fill="none" stroke="rgba(200,169,110,0.60)" stroke-width="0.9"/>
          <!-- arm left -->
          <polygon points="85,117 85,93 78,96 78,120" fill="none" stroke="rgba(200,169,110,0.55)" stroke-width="0.8"/>
          <!-- arm right -->
          <polygon points="175,100 175,76 182,73 182,97" fill="none" stroke="rgba(200,169,110,0.55)" stroke-width="0.8"/>
          <!-- cushion dividers -->
          <line x1="108" y1="88" x2="108" y2="100" stroke="rgba(200,169,110,0.38)" stroke-width="0.6"/>
          <line x1="130" y1="83" x2="130" y2="95" stroke="rgba(200,169,110,0.38)" stroke-width="0.6"/>
          <line x1="152" y1="78" x2="152" y2="90" stroke="rgba(200,169,110,0.38)" stroke-width="0.6"/>

          <!-- coffee table -->
          <polygon points="100,118 160,105 160,112 100,125" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
          <ellipse cx="130" cy="113" rx="18" ry="5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>

          <!-- floor lamp -->
          <line x1="195" y1="120" x2="195" y2="68" stroke="rgba(238,235,220,0.55)" stroke-width="0.7"/>
          <ellipse cx="195" cy="120" rx="5" ry="2" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.6"/>
          <line x1="195" y1="68" x2="208" y2="58" stroke="rgba(238,235,220,0.55)" stroke-width="0.7"/>
          <ellipse cx="210" cy="56" rx="8" ry="3" fill="none" stroke="rgba(200,169,110,0.65)" stroke-width="0.8"/>

          <!-- chandelier hanging -->
          <line x1="130" y1="10" x2="130" y2="38" stroke="rgba(200,169,110,0.45)" stroke-width="0.6" stroke-dasharray="2,3"/>
          <ellipse cx="130" cy="40" rx="14" ry="5" fill="none" stroke="rgba(200,169,110,0.60)" stroke-width="0.9"/>
          <line x1="116" y1="40" x2="116" y2="50" stroke="rgba(200,169,110,0.40)" stroke-width="0.5"/>
          <line x1="123" y1="38" x2="123" y2="50" stroke="rgba(200,169,110,0.40)" stroke-width="0.5"/>
          <line x1="130" y1="36" x2="130" y2="48" stroke="rgba(200,169,110,0.40)" stroke-width="0.5"/>
          <line x1="137" y1="38" x2="137" y2="50" stroke="rgba(200,169,110,0.40)" stroke-width="0.5"/>
          <line x1="144" y1="40" x2="144" y2="50" stroke="rgba(200,169,110,0.40)" stroke-width="0.5"/>

          <!-- shelving unit left wall -->
          <rect x="32" y="55" width="22" height="52" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.7"/>
          <line x1="32" y1="68" x2="54" y2="68" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
          <line x1="32" y1="80" x2="54" y2="80" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
          <line x1="32" y1="92" x2="54" y2="92" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
          <!-- books on shelves -->
          <rect x="34" y="58" width="3" height="9" fill="none" stroke="rgba(200,169,110,0.50)" stroke-width="0.6"/>
          <rect x="38" y="60" width="3" height="7" fill="none" stroke="rgba(200,169,110,0.38)" stroke-width="0.5"/>
          <rect x="34" y="70" width="3" height="9" fill="none" stroke="rgba(200,169,110,0.45)" stroke-width="0.5"/>

          <!-- rug outline -->
          <ellipse cx="130" cy="118" rx="42" ry="14" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.6" stroke-dasharray="3,4"/>
          <!-- inner rug pattern -->
          <ellipse cx="130" cy="118" rx="30" ry="10" fill="none" stroke="rgba(238,235,220,0.10)" stroke-width="0.4" stroke-dasharray="2,5"/>

          <!-- dimension annotation lines -->
          <line x1="30" y1="135" x2="230" y2="135" stroke="rgba(200,169,110,0.20)" stroke-width="0.4" stroke-dasharray="1,6"/>
          <line x1="30" y1="132" x2="30" y2="138" stroke="rgba(200,169,110,0.20)" stroke-width="0.4"/>
          <line x1="230" y1="132" x2="230" y2="138" stroke="rgba(200,169,110,0.20)" stroke-width="0.4"/>
        </g>
      </svg>

      <!-- text block -->
      <div class="hp-text">
        <span class="hp-eyebrow">Interior Sorcery</span>
        <h2 class="hp-title">STUDIO<br/>AIMO</h2>
        <p class="hp-sub">Bespoke spaces<br/>crafted with intention</p>
        <span class="hp-cta">Enter Studio →</span>
      </div>
    </div>
    <div class="hp-hint">click arrow to enter</div>
  </div>

  <!-- Enter arrow — sole interactive element -->
  <a href="/home" id="enter-arrow" aria-label="Enter Studio Aimo">
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="arrow-svg">
      <!-- Outer ring -->
      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <!-- Inner ring -->
      <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(238,235,220,0.14)" stroke-width="0.5"/>
      <!-- Arrow shaft -->
      <line x1="22" y1="40" x2="54" y2="40" stroke="rgba(238,235,220,0.90)" stroke-width="1.4" stroke-linecap="round"/>
      <!-- Arrowhead -->
      <polyline points="44,30 54,40 44,50" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Decorative tick bottom -->
      <line x1="40" y1="70" x2="40" y2="77" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <!-- Cross marker at centre -->
      <line x1="38" y1="40" x2="42" y2="40" stroke="rgba(238,235,220,0.22)" stroke-width="0.4"/>
      <line x1="40" y1="38" x2="40" y2="42" stroke="rgba(238,235,220,0.22)" stroke-width="0.4"/>
    </svg>
  </a>
</div>
<script src="/static/intro.js"></script>
</body>
</html>`)
})

/* ─────────────────────────────────────────────────────────────
   HOME PAGE — STUDIO AIMO
───────────────────────────────────────────────────────────── */
app.get('/home', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>STUDIO AIMO — Interior Sorcery &amp; Spatial Tailoring</title>
  <meta name="description" content="Where imagination shapes reality. Bespoke interior design for commercial and private spaces."/>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@100;200;300;400&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/static/home.css"/>
</head>
<body>

  <!-- ── CUSTOM CURSOR ── -->
  <div id="cursor-dot"></div>
  <div id="cursor-ring"></div>

  <!-- ── NOISE OVERLAY ── -->
  <div class="noise-overlay" aria-hidden="true"></div>

  <!-- ── HEADER ── -->
  <header id="site-header">
    <div class="header-inner">
      <a href="/" class="wordmark" aria-label="Back to intro">
        <span class="wordmark-studio">STUDIO</span>
        <span class="wordmark-aimo">AIMO</span>
      </a>
      <nav class="main-nav">
        <a href="#work">Work</a>
        <a href="#studio">Studio</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <a href="#contact" class="header-cta-link">Begin a Project</a>
      <button class="menu-toggle" aria-label="Menu" id="menu-toggle">
        <span></span><span></span>
      </button>
    </div>
  </header>

  <!-- ── HERO ── -->
  <section class="hero" id="hero">
    <!-- Animated blueprint background — chalk gold illustration -->
    <div class="hero-bg-lines" aria-hidden="true">
      <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="hchalk">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="8" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="hglow">
            <feGaussianBlur stdDeviation="3.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="hgrid-fine" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0L0 0 0 28" fill="none" stroke="rgba(201,170,111,0.035)" stroke-width="0.3"/>
          </pattern>
          <pattern id="hgrid-major" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M140 0L0 0 0 140" fill="none" stroke="rgba(201,170,111,0.055)" stroke-width="0.5"/>
          </pattern>
          <radialGradient id="heroFade" cx="72%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(13,12,10,0)"/>
            <stop offset="100%" stop-color="rgba(13,12,10,0.96)"/>
          </radialGradient>
        </defs>
        <!-- Gold-tinted atmospheric grid -->
        <rect width="1440" height="900" fill="url(#hgrid-fine)"/>
        <rect width="1440" height="900" fill="url(#hgrid-major)"/>

        <!-- Chalk-gold interior illustration — right-side atmospheric -->
        <g filter="url(#hchalk)" class="hero-illustration">
          <!-- Grand room isometric frame -->
          <polygon points="740,560 1060,430 1340,580 1020,710" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="1.1"/>
          <polygon points="1060,430 1340,580 1340,810 1060,660" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.9"/>
          <polygon points="740,560 740,790 1020,940 1020,710" fill="none" stroke="rgba(201,170,111,0.32)" stroke-width="0.9"/>

          <!-- Grand sofa — statement piece -->
          <polygon points="778,668 1010,608 1062,640 830,700" fill="none" stroke="rgba(201,170,111,0.80)" stroke-width="1.4"/>
          <polygon points="778,668 778,734 830,766 830,700" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.1"/>
          <polygon points="1010,608 1062,640 1062,706 1010,674" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.0"/>
          <polygon points="778,668 790,616 1022,558 1010,608" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
          <!-- Sofa cushion dividers -->
          <line x1="862" y1="626" x2="862" y2="712" stroke="rgba(201,170,111,0.38)" stroke-width="0.7"/>
          <line x1="936" y1="598" x2="936" y2="684" stroke="rgba(201,170,111,0.34)" stroke-width="0.6"/>
          <!-- Sofa cushion seams -->
          <line x1="794" y1="640" x2="860" y2="620" stroke="rgba(201,170,111,0.22)" stroke-width="0.4"/>
          <line x1="870" y1="612" x2="934" y2="592" stroke="rgba(201,170,111,0.20)" stroke-width="0.4"/>

          <!-- Coffee table — marble hairpin -->
          <polygon points="836,710 1008,666 1040,686 868,730" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
          <polygon points="836,710 836,728 868,748 868,730" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9"/>
          <polygon points="868,730 868,748 1040,704 1040,686" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.8"/>
          <!-- Hairpin legs -->
          <line x1="848" y1="726" x2="844" y2="780" stroke="rgba(201,170,111,0.52)" stroke-width="0.9"/>
          <line x1="848" y1="726" x2="856" y2="780" stroke="rgba(201,170,111,0.48)" stroke-width="0.8"/>
          <line x1="1028" y1="690" x2="1024" y2="744" stroke="rgba(201,170,111,0.48)" stroke-width="0.8"/>
          <line x1="1028" y1="690" x2="1036" y2="744" stroke="rgba(201,170,111,0.44)" stroke-width="0.7"/>
          <!-- Table decor: candle and book -->
          <rect x="918" y="669" width="18" height="6" fill="none" stroke="rgba(201,170,111,0.42)" stroke-width="0.6" transform="skewX(-8)"/>
          <line x1="927" y1="667" x2="927" y2="663" stroke="rgba(201,170,111,0.38)" stroke-width="0.6"/>

          <!-- Floor lamp — arc style -->
          <ellipse cx="1118" cy="714" rx="20" ry="7" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.1"/>
          <line x1="1118" y1="707" x2="1114" y2="482" stroke="rgba(201,170,111,0.75)" stroke-width="1.5"/>
          <path d="M1114,482 Q1114,454 1148,440" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
          <ellipse cx="1162" cy="434" rx="32" ry="10" fill="none" stroke="rgba(201,170,111,0.82)" stroke-width="1.4"/>
          <line x1="1130" y1="434" x2="1132" y2="468" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
          <line x1="1194" y1="434" x2="1192" y2="468" stroke="rgba(201,170,111,0.68)" stroke-width="1.1"/>
          <ellipse cx="1162" cy="468" rx="26" ry="8" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.1"/>
          <!-- Bulb glow -->
          <circle cx="1162" cy="466" r="5" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="0.9" filter="url(#hglow)"/>

          <!-- Pendant chandelier — statement piece -->
          <line x1="922" y1="430" x2="922" y2="498" stroke="rgba(201,170,111,0.72)" stroke-width="1.1"/>
          <ellipse cx="922" cy="518" rx="56" ry="18" fill="none" stroke="rgba(201,170,111,0.82)" stroke-width="1.4"/>
          <ellipse cx="922" cy="518" rx="42" ry="13" fill="none" stroke="rgba(201,170,111,0.40)" stroke-width="0.6" stroke-dasharray="3,4"/>
          <line x1="866" y1="518" x2="880" y2="562" stroke="rgba(201,170,111,0.78)" stroke-width="1.2"/>
          <line x1="978" y1="518" x2="964" y2="562" stroke="rgba(201,170,111,0.74)" stroke-width="1.1"/>
          <ellipse cx="922" cy="562" rx="38" ry="12" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
          <!-- Chandelier arms + candles -->
          <line x1="894" y1="508" x2="886" y2="548" stroke="rgba(201,170,111,0.55)" stroke-width="0.9"/>
          <line x1="950" y1="508" x2="958" y2="548" stroke="rgba(201,170,111,0.52)" stroke-width="0.9"/>
          <circle cx="886" cy="550" r="3" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="0.8"/>
          <circle cx="958" cy="550" r="3" fill="none" stroke="rgba(201,170,111,0.52)" stroke-width="0.8"/>

          <!-- Tall shelving unit — right wall -->
          <rect x="1248" y="436" width="76" height="318" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.1"/>
          <polygon points="1324,436 1356,458 1356,778 1324,754" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="0.9"/>
          <polygon points="1248,436 1324,436 1356,458 1280,458" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="0.9"/>
          <line x1="1248" y1="498" x2="1324" y2="498" stroke="rgba(201,170,111,0.48)" stroke-width="0.7"/>
          <line x1="1248" y1="562" x2="1324" y2="562" stroke="rgba(201,170,111,0.44)" stroke-width="0.7"/>
          <line x1="1248" y1="626" x2="1324" y2="626" stroke="rgba(201,170,111,0.42)" stroke-width="0.7"/>
          <line x1="1248" y1="690" x2="1324" y2="690" stroke="rgba(201,170,111,0.40)" stroke-width="0.6"/>
          <!-- Books on shelf -->
          <line x1="1258" y1="452" x2="1258" y2="494" stroke="rgba(201,170,111,0.36)" stroke-width="1.2"/>
          <line x1="1264" y1="452" x2="1264" y2="494" stroke="rgba(201,170,111,0.32)" stroke-width="0.9"/>
          <line x1="1270" y1="454" x2="1270" y2="494" stroke="rgba(201,170,111,0.28)" stroke-width="0.8"/>

          <!-- Rug outline -->
          <polygon points="796,704 1038,644 1072,664 830,724" fill="none" stroke="rgba(201,170,111,0.38)" stroke-width="0.8" stroke-dasharray="8,4"/>
          <polygon points="808,700 1026,648 1060,666 842,718" fill="none" stroke="rgba(201,170,111,0.22)" stroke-width="0.5" stroke-dasharray="5,5"/>

          <!-- Architectural dimension annotations -->
          <line x1="758" y1="830" x2="1060" y2="830" stroke="rgba(201,170,111,0.28)" stroke-width="0.5" stroke-dasharray="4,5"/>
          <line x1="758" y1="824" x2="758" y2="836" stroke="rgba(201,170,111,0.32)" stroke-width="0.7"/>
          <line x1="1060" y1="824" x2="1060" y2="836" stroke="rgba(201,170,111,0.32)" stroke-width="0.7"/>
          <polyline points="764,827 758,830 764,833" fill="none" stroke="rgba(201,170,111,0.28)" stroke-width="0.6"/>
          <polyline points="1054,827 1060,830 1054,833" fill="none" stroke="rgba(201,170,111,0.28)" stroke-width="0.6"/>
          <line x1="1360" y1="436" x2="1360" y2="756" stroke="rgba(201,170,111,0.24)" stroke-width="0.5" stroke-dasharray="4,5"/>
          <line x1="1354" y1="436" x2="1366" y2="436" stroke="rgba(201,170,111,0.28)" stroke-width="0.7"/>
          <line x1="1354" y1="756" x2="1366" y2="756" stroke="rgba(201,170,111,0.28)" stroke-width="0.7"/>

          <!-- Construction axis lines from vanishing point -->
          <line x1="900" y1="580" x2="758" y2="440" stroke="rgba(201,170,111,0.04)" stroke-width="0.4" stroke-dasharray="2,12"/>
          <line x1="900" y1="580" x2="1360" y2="440" stroke="rgba(201,170,111,0.04)" stroke-width="0.4" stroke-dasharray="2,12"/>
          <line x1="900" y1="580" x2="740" y2="800" stroke="rgba(201,170,111,0.035)" stroke-width="0.3" stroke-dasharray="2,12"/>
          <line x1="900" y1="580" x2="1340" y2="800" stroke="rgba(201,170,111,0.035)" stroke-width="0.3" stroke-dasharray="2,12"/>

          <!-- Fade vignette right edge -->
          <rect width="1440" height="900" fill="url(#heroFade)"/>
        </g>
      </svg>
    </div>

    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="eyebrow-line"></span>
        Interior Sorcery &amp; Spatial Tailoring
      </div>
      <h1 class="hero-title">
        <span class="ht-line">STUDIO</span>
        <span class="ht-line ht-accent">AIMO</span>
      </h1>
      <p class="hero-tagline">
        Where imagination shapes reality.
      </p>
      <p class="hero-sub">
        Bespoke interior design for commercial<br/>and private spaces — conjured, not decorated.
      </p>
      <div class="hero-ctas">
        <a href="#work" class="btn-primary">
          <span>Explore Work</span>
          <svg viewBox="0 0 20 20" width="14" height="14"><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.3"/><polyline points="12,5 17,10 12,15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </a>
        <a href="#contact" class="btn-ghost">Begin a Project</a>
      </div>
      <!-- Stats row -->
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="stat-num">12+</span>
          <span class="stat-label">Years of Practice</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="stat-num">140+</span>
          <span class="stat-label">Projects Completed</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="stat-num">18</span>
          <span class="stat-label">Countries</span>
        </div>
      </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="scroll-label">Scroll</span>
      <span class="scroll-line"></span>
    </div>
  </section>

  <!-- ── MARQUEE BAND ── -->
  <div class="marquee-band" aria-hidden="true">
    <div class="marquee-track">
      <span>Interior Sorcery</span><span class="marquee-dot">✦</span>
      <span>Spatial Tailoring</span><span class="marquee-dot">✦</span>
      <span>STUDIO AIMO</span><span class="marquee-dot">✦</span>
      <span>Bespoke Design</span><span class="marquee-dot">✦</span>
      <span>Before &amp; After Transformation</span><span class="marquee-dot">✦</span>
      <span>Where imagination shapes reality</span><span class="marquee-dot">✦</span>
      <span>Commercial &amp; Private Spaces</span><span class="marquee-dot">✦</span>
      <span>Interior Sorcery</span><span class="marquee-dot">✦</span>
      <span>Spatial Tailoring</span><span class="marquee-dot">✦</span>
      <span>STUDIO AIMO</span><span class="marquee-dot">✦</span>
      <span>Bespoke Design</span><span class="marquee-dot">✦</span>
      <span>Before &amp; After Transformation</span><span class="marquee-dot">✦</span>
      <span>Where imagination shapes reality</span><span class="marquee-dot">✦</span>
      <span>Commercial &amp; Private Spaces</span><span class="marquee-dot">✦</span>
    </div>
  </div>

  <!-- ── MANIFESTO BAND ── -->
  <section class="manifesto-band" id="manifesto">
    <div class="manifesto-inner">
      <span class="manifesto-label reveal-up" data-delay="0">The Manifesto</span>
      <p class="manifesto-text reveal-up" data-delay="1">
        We don't decorate spaces.<br/>
        <em>We conjure them.</em>
      </p>
      <div class="manifesto-rule reveal-scale" data-delay="2"></div>
      <p class="manifesto-sub reveal-up" data-delay="3">
        Every project is an act of transformation — raw space alchemised into lived experience,<br class="br-lg"/>
        through precision craft, daring vision, and an uncompromising commitment to the extraordinary.<br class="br-lg"/>
        Aesthetics, functionality, and durability in harmony. This is where your story begins.
      </p>
    </div>
  </section>

  <!-- ── SELECTED WORK ── -->
  <section class="work-section" id="work">
    <div class="section-header reveal-up" data-delay="0">
      <span class="section-label">Selected Work</span>
      <h2>Projects that <em>transformed</em> space</h2>
    </div>

    <div class="work-grid">
      <!-- Project 01 — large featured -->
      <article class="work-card wc-large reveal-up" data-delay="1">
        <div class="wc-image">
          <div class="wc-svg-placeholder">
            <svg viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="wchalk1">
                  <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="5" result="n"/>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <radialGradient id="wc1bg" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stop-color="#1e1a14"/>
                  <stop offset="100%" stop-color="#0e0c09"/>
                </radialGradient>
              </defs>
              <rect width="640" height="520" fill="url(#wc1bg)"/>
              <g filter="url(#wchalk1)" opacity="0.60">
                <!-- Isometric living room -->
                <polygon points="60,310 330,200 470,290 200,400" fill="none" stroke="#c9aa6f" stroke-width="1.5"/>
                <polygon points="330,200 470,290 470,420 330,330" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <polygon points="60,310 60,440 200,530 200,400" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <!-- Grand sofa -->
                <polygon points="90,356 306,294 354,322 138,384" fill="none" stroke="#c9aa6f" stroke-width="1.4"/>
                <polygon points="306,294 354,322 354,380 306,352" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <polygon points="90,356 90,414 138,442 138,384" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <polygon points="90,356 100,308 316,248 306,294" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <!-- Cushions seams -->
                <line x1="180" y1="316" x2="180" y2="402" stroke="#c9aa6f" stroke-width="0.5" opacity="0.55"/>
                <line x1="252" y1="294" x2="252" y2="380" stroke="#c9aa6f" stroke-width="0.5" opacity="0.48"/>
                <!-- Coffee table glass hairpin -->
                <polygon points="128,384 318,334 350,354 160,404" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <line x1="142" y1="398" x2="138" y2="450" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="142" y1="398" x2="150" y2="450" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="336" y1="352" x2="332" y2="404" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="336" y1="352" x2="344" y2="404" stroke="#c9aa6f" stroke-width="0.8"/>
                <!-- Pendant dome light -->
                <line x1="260" y1="200" x2="260" y2="262" stroke="#c9aa6f" stroke-width="1.1"/>
                <ellipse cx="260" cy="286" rx="46" ry="15" fill="none" stroke="#c9aa6f" stroke-width="1.3"/>
                <line x1="214" y1="286" x2="226" y2="332" stroke="#c9aa6f" stroke-width="1.1"/>
                <line x1="306" y1="286" x2="294" y2="332" stroke="#c9aa6f" stroke-width="1.0"/>
                <ellipse cx="260" cy="332" rx="30" ry="10" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <!-- Dome ribs -->
                <line x1="240" y1="276" x2="242" y2="334" stroke="#c9aa6f" stroke-width="0.4" opacity="0.45"/>
                <line x1="280" y1="276" x2="278" y2="334" stroke="#c9aa6f" stroke-width="0.4" opacity="0.45"/>
                <!-- Floor lamp arc -->
                <ellipse cx="412" cy="388" rx="18" ry="6" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="412" y1="382" x2="410" y2="218" stroke="#c9aa6f" stroke-width="1.4"/>
                <path d="M410,218 Q410,196 432,186" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <ellipse cx="444" cy="180" rx="28" ry="9" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <line x1="416" y1="180" x2="418" y2="210" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="472" y1="180" x2="470" y2="210" stroke="#c9aa6f" stroke-width="1.0"/>
                <ellipse cx="444" cy="210" rx="22" ry="7" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Shelving -->
                <rect x="434" y="196" width="60" height="218" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <polygon points="494,196 524,214 524,430 494,414" fill="none" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="434" y1="248" x2="494" y2="248" stroke="#c9aa6f" stroke-width="0.7"/>
                <line x1="434" y1="302" x2="494" y2="302" stroke="#c9aa6f" stroke-width="0.7"/>
                <line x1="434" y1="356" x2="494" y2="356" stroke="#c9aa6f" stroke-width="0.7"/>
                <!-- Rug -->
                <polygon points="100,374 320,314 362,338 142,398" fill="none" stroke="#c9aa6f" stroke-width="0.7" stroke-dasharray="7,4"/>
                <!-- Dimension annotations -->
                <line x1="98" y1="472" x2="362" y2="472" stroke="#c9aa6f" stroke-width="0.5" stroke-dasharray="4,5" opacity="0.60"/>
                <line x1="98" y1="466" x2="98" y2="478" stroke="#c9aa6f" stroke-width="0.7" opacity="0.60"/>
                <line x1="362" y1="466" x2="362" y2="478" stroke="#c9aa6f" stroke-width="0.7" opacity="0.60"/>
                <line x1="528" y1="196" x2="528" y2="414" stroke="#c9aa6f" stroke-width="0.5" stroke-dasharray="4,5" opacity="0.52"/>
              </g>
            </svg>
          </div>
          <div class="wc-overlay">
            <span class="wc-num">01</span>
          </div>
        </div>
        <div class="wc-info">
          <span class="wc-tag">Residential</span>
          <h3>Maison Nero</h3>
          <p>Private penthouse — Milan, IT</p>
          <a href="#contact" class="wc-cta">View Project</a>
        </div>
      </article>

      <!-- Project 02 -->
      <article class="work-card reveal-up" data-delay="2">
        <div class="wc-image">
          <div class="wc-svg-placeholder">
            <svg viewBox="0 0 460 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="wchalk2">
                  <feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="3" seed="12" result="n"/>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
              </defs>
              <rect width="460" height="360" fill="#161310"/>
              <g filter="url(#wchalk2)" opacity="0.58">
                <!-- Open-plan studio / atelier -->
                <polygon points="30,220 270,130 326,176 86,266" fill="none" stroke="#c9aa6f" stroke-width="1.3"/>
                <polygon points="270,130 326,176 326,254 270,208" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <polygon points="30,220 30,298 86,344 86,266" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <!-- Table and chairs -->
                <polygon points="64,234 216,192 242,212 90,254" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <polygon points="216,192 242,212 242,262 216,242" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <polygon points="64,234 64,282 90,302 90,254" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Chair backs -->
                <line x1="76" y1="236" x2="76" y2="188" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="90" y1="228" x2="90" y2="182" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="76" y1="188" x2="90" y2="182" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="218" y1="192" x2="218" y2="146" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="236" y1="210" x2="236" y2="164" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="218" y1="146" x2="236" y2="164" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Pendant industrial trio -->
                <line x1="140" y1="130" x2="140" y2="164" stroke="#c9aa6f" stroke-width="0.9"/>
                <polygon points="118,164 162,164 154,194 128,194" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <ellipse cx="140" cy="194" rx="18" ry="6" fill="none" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="176" y1="130" x2="176" y2="158" stroke="#c9aa6f" stroke-width="0.8"/>
                <polygon points="158,158 194,158 188,184 164,184" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Arc floor lamp -->
                <ellipse cx="366" cy="302" rx="20" ry="7" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="366" y1="295" x2="364" y2="142" stroke="#c9aa6f" stroke-width="1.3"/>
                <path d="M364,142 Q364,122 382,112" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <ellipse cx="392" cy="108" rx="26" ry="8" fill="none" stroke="#c9aa6f" stroke-width="1.1"/>
                <line x1="366" y1="108" x2="368" y2="136" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="418" y1="108" x2="416" y2="136" stroke="#c9aa6f" stroke-width="0.9"/>
                <ellipse cx="392" cy="136" rx="20" ry="6" fill="none" stroke="#c9aa6f" stroke-width="0.8"/>
                <!-- Shelving unit wall -->
                <rect x="294" y="120" width="56" height="188" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <polygon points="350,120 378,136 378,320 350,308" fill="none" stroke="#c9aa6f" stroke-width="0.7"/>
                <line x1="294" y1="162" x2="350" y2="162" stroke="#c9aa6f" stroke-width="0.6"/>
                <line x1="294" y1="206" x2="350" y2="206" stroke="#c9aa6f" stroke-width="0.6"/>
                <line x1="294" y1="252" x2="350" y2="252" stroke="#c9aa6f" stroke-width="0.6"/>
                <line x1="294" y1="296" x2="350" y2="296" stroke="#c9aa6f" stroke-width="0.6"/>
              </g>
            </svg>
          </div>
          <div class="wc-overlay"><span class="wc-num">02</span></div>
        </div>
        <div class="wc-info">
          <span class="wc-tag">Commercial</span>
          <h3>Atelier Brut</h3>
          <p>Creative studio — Paris, FR</p>
          <a href="#contact" class="wc-cta">View Project</a>
        </div>
      </article>

      <!-- Project 03 -->
      <article class="work-card reveal-up" data-delay="3">
        <div class="wc-image">
          <div class="wc-svg-placeholder">
            <svg viewBox="0 0 460 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="wchalk3">
                  <feTurbulence type="fractalNoise" baseFrequency="0.90" numOctaves="3" seed="17" result="n"/>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
              </defs>
              <rect width="460" height="360" fill="#191511"/>
              <g filter="url(#wchalk3)" opacity="0.56">
                <!-- Boutique suite — circular rotunda feel -->
                <ellipse cx="230" cy="196" rx="152" ry="52" fill="none" stroke="#c9aa6f" stroke-width="1.2"/>
                <ellipse cx="230" cy="264" rx="130" ry="44" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <line x1="78" y1="196" x2="100" y2="264" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="382" y1="196" x2="360" y2="264" stroke="#c9aa6f" stroke-width="1.0"/>
                <!-- Chandelier drop -->
                <line x1="230" y1="60" x2="230" y2="128" stroke="#c9aa6f" stroke-width="1.2"/>
                <ellipse cx="230" cy="150" rx="50" ry="16" fill="none" stroke="#c9aa6f" stroke-width="1.4"/>
                <ellipse cx="230" cy="150" rx="36" ry="11" fill="none" stroke="#c9aa6f" stroke-width="0.6" stroke-dasharray="3,4" opacity="0.55"/>
                <!-- Chandelier arms -->
                <line x1="180" y1="150" x2="164" y2="192" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="204" y1="136" x2="194" y2="178" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="230" y1="134" x2="230" y2="176" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="256" y1="136" x2="266" y2="178" stroke="#c9aa6f" stroke-width="1.0"/>
                <line x1="280" y1="150" x2="296" y2="192" stroke="#c9aa6f" stroke-width="1.0"/>
                <!-- Candle bulbs -->
                <circle cx="164" cy="194" r="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <circle cx="194" cy="180" r="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <circle cx="230" cy="178" r="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <circle cx="266" cy="180" r="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <circle cx="296" cy="194" r="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Seating arrangement -->
                <polygon points="72,218 148,196 166,212 90,234" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <polygon points="288,196 364,218 342,234 266,212" fill="none" stroke="#c9aa6f" stroke-width="1.0"/>
                <!-- Armchairs -->
                <polygon points="88,248 136,236 150,250 102,262" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <polygon points="280,236 328,248 314,262 266,250" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <!-- Tall statement vases flanking -->
                <line x1="44" y1="284" x2="44" y2="196" stroke="#c9aa6f" stroke-width="1.0"/>
                <ellipse cx="44" cy="290" rx="14" ry="5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <ellipse cx="44" cy="194" rx="10" ry="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.8"/>
                <line x1="416" y1="284" x2="416" y2="196" stroke="#c9aa6f" stroke-width="1.0"/>
                <ellipse cx="416" cy="290" rx="14" ry="5" fill="none" stroke="#c9aa6f" stroke-width="0.9"/>
                <ellipse cx="416" cy="194" rx="10" ry="3.5" fill="none" stroke="#c9aa6f" stroke-width="0.8"/>
                <!-- Stem &amp; leaves on vases -->
                <line x1="44" y1="236" x2="28" y2="208" stroke="#c9aa6f" stroke-width="0.7"/>
                <line x1="44" y1="220" x2="58" y2="196" stroke="#c9aa6f" stroke-width="0.7"/>
                <circle cx="27" cy="206" r="3" fill="none" stroke="#c9aa6f" stroke-width="0.7"/>
                <circle cx="59" cy="194" r="3" fill="none" stroke="#c9aa6f" stroke-width="0.7"/>
                <!-- Floor rug centre -->
                <ellipse cx="230" cy="262" rx="96" ry="34" fill="none" stroke="#c9aa6f" stroke-width="0.8" stroke-dasharray="6,4"/>
                <ellipse cx="230" cy="262" rx="76" ry="26" fill="none" stroke="#c9aa6f" stroke-width="0.5" stroke-dasharray="4,5" opacity="0.55"/>
              </g>
            </svg>
          </div>
          <div class="wc-overlay"><span class="wc-num">03</span></div>
        </div>
        <div class="wc-info">
          <span class="wc-tag">Hospitality</span>
          <h3>Villa Chimera</h3>
          <p>Boutique suite — Ibiza, ES</p>
          <a href="#contact" class="wc-cta">View Project</a>
        </div>
      </article>
    </div>

    <div class="work-cta reveal-up" data-delay="4">
      <a href="#contact" class="btn-ghost">View All Projects</a>
    </div>
  </section>

  <!-- ── INSTAGRAM GALLERY ── -->
  <section class="ig-section" id="instagram">
    <div class="ig-header reveal-up" data-delay="0">
      <div class="ig-header-text">
        <span class="ig-label">Follow the Studio</span>
        <h2 class="ig-title">As seen on <em>Instagram</em></h2>
      </div>
      <a href="https://www.instagram.com/studio_aimo/" target="_blank" rel="noopener" class="ig-follow-link reveal-up" data-delay="1">
        <span class="ig-at">@studio_aimo</span>
        <span>Follow on Instagram</span>
      </a>
    </div>

    <div class="ig-grid">

      <!-- Tile 01 — wide — Living room composition -->
      <div class="ig-tile ig-tile--wide reveal-up" data-delay="1">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig1chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed="3" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="ig1glow">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ig1bg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stop-color="#1c1812"/>
                <stop offset="100%" stop-color="#0a0907"/>
              </radialGradient>
            </defs>
            <rect width="800" height="400" fill="url(#ig1bg)"/>
            <g filter="url(#ig1chalk)">
              <!-- Floor plane -->
              <polygon points="60,260 400,140 720,260 380,380" fill="none" stroke="rgba(201,170,111,0.25)" stroke-width="0.8" stroke-dasharray="6,5"/>
              <!-- Walls suggestion -->
              <line x1="60" y1="260" x2="60" y2="380" stroke="rgba(201,170,111,0.14)" stroke-width="0.6" stroke-dasharray="4,6"/>
              <line x1="720" y1="260" x2="720" y2="380" stroke="rgba(201,170,111,0.12)" stroke-width="0.5" stroke-dasharray="4,6"/>
              <!-- Monumental sofa -->
              <polygon points="80,298 440,208 504,244 144,334" fill="none" stroke="rgba(201,170,111,0.86)" stroke-width="1.6"/>
              <polygon points="80,298 80,364 144,396 144,334" fill="none" stroke="rgba(201,170,111,0.64)" stroke-width="1.3"/>
              <polygon points="144,334 144,396 504,308 504,244" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="1.2"/>
              <!-- Back cushions -->
              <polygon points="80,298 92,244 448,158 440,208" fill="none" stroke="rgba(201,170,111,0.80)" stroke-width="1.4"/>
              <!-- Cushion dividers -->
              <line x1="196" y1="222" x2="196" y2="320" stroke="rgba(201,170,111,0.38)" stroke-width="0.7"/>
              <line x1="320" y1="198" x2="320" y2="296" stroke="rgba(201,170,111,0.34)" stroke-width="0.6"/>
              <!-- Armrests -->
              <polygon points="80,298 62,284 62,350 80,364" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.3"/>
              <polygon points="440,208 458,198 458,258 440,268" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.1"/>
              <!-- Throw pillows -->
              <polygon points="90,252 148,238 158,254 100,268" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="1.0"/>
              <polygon points="350,188 408,174 418,190 360,204" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9"/>
              <!-- Legs -->
              <line x1="88" y1="360" x2="88" y2="390" stroke="rgba(201,170,111,0.65)" stroke-width="1.5"/>
              <line x1="142" y1="392" x2="142" y2="422" stroke="rgba(201,170,111,0.58)" stroke-width="1.4"/>
              <line x1="474" y1="304" x2="474" y2="334" stroke="rgba(201,170,111,0.55)" stroke-width="1.3"/>
              <!-- Coffee table -->
              <polygon points="148,346 420,282 454,304 182,368" fill="none" stroke="rgba(201,170,111,0.75)" stroke-width="1.3"/>
              <polygon points="148,346 148,360 182,378 182,368" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <!-- Hairpin legs -->
              <line x1="162" y1="360" x2="158" y2="398" stroke="rgba(201,170,111,0.55)" stroke-width="1.1"/>
              <line x1="162" y1="360" x2="170" y2="398" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <line x1="438" y1="304" x2="434" y2="342" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <!-- Table items: books + candle -->
              <rect x="232" y="287" width="40" height="11" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.8" transform="skewX(-10) translate(0,4)"/>
              <rect x="234" y="282" width="36" height="11" fill="none" stroke="rgba(201,170,111,0.40)" stroke-width="0.7" transform="skewX(-10) translate(0,2)"/>
              <line x1="360" y1="290" x2="360" y2="276" stroke="rgba(201,170,111,0.52)" stroke-width="1.0" transform="skewX(-10)"/>
              <circle cx="360" cy="275" r="2" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.8" filter="url(#ig1glow)"/>
              <!-- Central chandelier -->
              <line x1="310" y1="0" x2="310" y2="80" stroke="rgba(201,170,111,0.65)" stroke-width="1.0" stroke-dasharray="4,3"/>
              <ellipse cx="310" cy="104" rx="70" ry="23" fill="none" stroke="rgba(201,170,111,0.88)" stroke-width="1.6"/>
              <ellipse cx="310" cy="112" rx="58" ry="18" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.6"/>
              <line x1="240" y1="104" x2="226" y2="150" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <line x1="274" y1="90" x2="268" y2="136" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <line x1="310" y1="82" x2="310" y2="128" stroke="rgba(201,170,111,0.75)" stroke-width="1.3"/>
              <line x1="346" y1="90" x2="352" y2="136" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <line x1="380" y1="104" x2="394" y2="150" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <!-- Candle lights -->
              <circle cx="226" cy="152" r="3.5" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.0" filter="url(#ig1glow)"/>
              <circle cx="268" cy="138" r="3" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="0.9" filter="url(#ig1glow)"/>
              <circle cx="310" cy="130" r="3.5" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.0" filter="url(#ig1glow)"/>
              <circle cx="352" cy="138" r="3" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="0.9" filter="url(#ig1glow)"/>
              <circle cx="394" cy="152" r="3.5" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.0" filter="url(#ig1glow)"/>
              <!-- Right floor lamp -->
              <ellipse cx="640" cy="356" rx="26" ry="8" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.2"/>
              <line x1="640" y1="348" x2="637" y2="130" stroke="rgba(201,170,111,0.72)" stroke-width="1.6"/>
              <path d="M637,130 Q637,105 662,94" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.3"/>
              <ellipse cx="676" cy="88" rx="34" ry="11" fill="none" stroke="rgba(201,170,111,0.85)" stroke-width="1.5"/>
              <line x1="642" y1="88" x2="644" y2="122" stroke="rgba(201,170,111,0.75)" stroke-width="1.3"/>
              <line x1="710" y1="88" x2="708" y2="122" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
              <ellipse cx="676" cy="122" rx="28" ry="9" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.2"/>
              <circle cx="676" cy="120" r="5" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="0.9" filter="url(#ig1glow)"/>
              <!-- Rug -->
              <polygon points="100,324 436,248 478,274 142,350" fill="none" stroke="rgba(201,170,111,0.30)" stroke-width="0.7" stroke-dasharray="8,4"/>
              <!-- Architectural annotation -->
              <line x1="82" y1="410" x2="506" y2="410" stroke="rgba(201,170,111,0.20)" stroke-width="0.5" stroke-dasharray="4,5"/>
              <line x1="82" y1="404" x2="82" y2="416" stroke="rgba(201,170,111,0.24)" stroke-width="0.7"/>
              <line x1="506" y1="404" x2="506" y2="416" stroke="rgba(201,170,111,0.24)" stroke-width="0.7"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/>
            <circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/>
            <circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/>
          </svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              487
            </span>
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h10v8H8l-2 2V10H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              31
            </span>
          </div>
          <p class="ig-caption">Maison Nero — Milan penthouse living room. Every object conjured, not placed. ✦</p>
        </div>
      </div>

      <!-- Tile 02 — square — Dressing room / wardrobe -->
      <div class="ig-tile reveal-up" data-delay="2">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig2chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="8" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <radialGradient id="ig2bg" cx="40%" cy="60%" r="65%">
                <stop offset="0%" stop-color="#1a1612"/>
                <stop offset="100%" stop-color="#090806"/>
              </radialGradient>
            </defs>
            <rect width="400" height="400" fill="url(#ig2bg)"/>
            <g filter="url(#ig2chalk)">
              <!-- Walk-in wardrobe -->
              <polygon points="20,10 260,0 294,20 54,30" fill="none" stroke="rgba(201,170,111,0.90)" stroke-width="1.8"/>
              <polygon points="20,10 20,380 54,396 54,30" fill="none" stroke="rgba(201,170,111,0.76)" stroke-width="1.6"/>
              <polygon points="54,30 54,396 294,376 294,20" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="1.3"/>
              <!-- Door panels — 4 doors -->
              <line x1="114" y1="28" x2="114" y2="390" stroke="rgba(201,170,111,0.48)" stroke-width="1.0"/>
              <line x1="174" y1="24" x2="174" y2="384" stroke="rgba(201,170,111,0.44)" stroke-width="0.9"/>
              <line x1="234" y1="20" x2="234" y2="378" stroke="rgba(201,170,111,0.40)" stroke-width="0.8"/>
              <!-- Door inset panels -->
              <rect x="24" y="18" width="84" height="174" fill="none" stroke="rgba(201,170,111,0.26)" stroke-width="0.5"/>
              <rect x="24" y="200" width="84" height="172" fill="none" stroke="rgba(201,170,111,0.22)" stroke-width="0.4"/>
              <!-- Handles gold -->
              <ellipse cx="108" cy="200" rx="2" ry="6" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.4"/>
              <ellipse cx="168" cy="196" rx="2" ry="6" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.3"/>
              <ellipse cx="228" cy="192" rx="2" ry="5" fill="none" stroke="rgba(201,170,111,0.64)" stroke-width="1.2"/>
              <!-- Top cornice -->
              <polygon points="20,4 260,-8 294,12 54,24" fill="none" stroke="rgba(201,170,111,0.56)" stroke-width="1.1"/>
              <!-- Hanging clothes glimpse inside -->
              <line x1="58" y1="44" x2="108" y2="40" stroke="rgba(201,170,111,0.30)" stroke-width="0.6" stroke-dasharray="3,4"/>
              <line x1="66" y1="44" x2="66" y2="84" stroke="rgba(201,170,111,0.22)" stroke-width="0.5"/>
              <line x1="66" y1="44" x2="58" y2="66" stroke="rgba(201,170,111,0.18)" stroke-width="0.4"/>
              <line x1="66" y1="44" x2="74" y2="66" stroke="rgba(201,170,111,0.18)" stroke-width="0.4"/>
              <line x1="80" y1="42" x2="80" y2="86" stroke="rgba(201,170,111,0.20)" stroke-width="0.5"/>
              <line x1="94" y1="40" x2="94" y2="88" stroke="rgba(201,170,111,0.18)" stroke-width="0.4"/>
              <!-- Base plinth -->
              <polygon points="20,378 20,396 54,412 54,396" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.9"/>
              <polygon points="54,396 54,412 294,392 294,376" fill="none" stroke="rgba(201,170,111,0.38)" stroke-width="0.8"/>
              <!-- Shoe shelf at bottom right face -->
              <line x1="58" y1="320" x2="286" y2="306" stroke="rgba(201,170,111,0.26)" stroke-width="0.5"/>
              <!-- Blueprint annotation left -->
              <line x1="6" y1="10" x2="6" y2="380" stroke="rgba(201,170,111,0.18)" stroke-width="0.4" stroke-dasharray="4,5"/>
              <line x1="2" y1="10" x2="10" y2="10" stroke="rgba(201,170,111,0.22)" stroke-width="0.6"/>
              <line x1="2" y1="380" x2="10" y2="380" stroke="rgba(201,170,111,0.22)" stroke-width="0.6"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none"><rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/></svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              312
            </span>
          </div>
          <p class="ig-caption">Bespoke wardrobe — floor to ceiling. Every door a decision. ✦</p>
        </div>
      </div>

      <!-- Tile 03 — square — Kitchen luxury -->
      <div class="ig-tile reveal-up" data-delay="2">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig3chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" seed="14" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="ig3glow">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ig3bg" cx="60%" cy="40%" r="70%">
                <stop offset="0%" stop-color="#181411"/>
                <stop offset="100%" stop-color="#080706"/>
              </radialGradient>
            </defs>
            <rect width="400" height="400" fill="url(#ig3bg)"/>
            <g filter="url(#ig3chalk)">
              <!-- Kitchen island top -->
              <polygon points="20,180 340,120 374,144 54,204" fill="none" stroke="rgba(201,170,111,0.92)" stroke-width="1.9"/>
              <!-- Island front face -->
              <polygon points="20,180 20,280 54,298 54,204" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.5"/>
              <!-- Island right face -->
              <polygon points="54,204 54,298 374,244 374,144" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.3"/>
              <!-- Waterfall edge -->
              <line x1="22" y1="180" x2="22" y2="278" stroke="rgba(201,170,111,0.68)" stroke-width="1.4"/>
              <!-- Fluted panel lines front -->
              <line x1="24" y1="185" x2="24" y2="277" stroke="rgba(201,170,111,0.36)" stroke-width="0.7"/>
              <line x1="30" y1="184" x2="30" y2="276" stroke="rgba(201,170,111,0.28)" stroke-width="0.5"/>
              <line x1="36" y1="183" x2="36" y2="275" stroke="rgba(201,170,111,0.24)" stroke-width="0.5"/>
              <line x1="42" y1="182" x2="42" y2="274" stroke="rgba(201,170,111,0.20)" stroke-width="0.4"/>
              <!-- Sink on island -->
              <ellipse cx="240" cy="162" rx="40" ry="13" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.2" transform="skewX(-12)"/>
              <ellipse cx="240" cy="156" rx="30" ry="9" fill="none" stroke="rgba(201,170,111,0.42)" stroke-width="0.8" transform="skewX(-12)"/>
              <!-- Gooseneck tap -->
              <line x1="286" y1="158" x2="286" y2="128" stroke="rgba(201,170,111,0.72)" stroke-width="1.5"/>
              <path d="M286,128 Q300,128 306,140 Q310,148 306,158" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.3"/>
              <ellipse cx="306" cy="158" rx="4" ry="1.5" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9"/>
              <!-- Hob induction -->
              <rect x="60" y="136" width="100" height="26" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="1.0" transform="skewX(-14)"/>
              <ellipse cx="80" cy="146" rx="8" ry="3" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.8" transform="skewX(-12)"/>
              <ellipse cx="100" cy="142" rx="8" ry="3" fill="none" stroke="rgba(201,170,111,0.42)" stroke-width="0.7" transform="skewX(-12)"/>
              <ellipse cx="120" cy="138" rx="7" ry="2.5" fill="none" stroke="rgba(201,170,111,0.40)" stroke-width="0.7" transform="skewX(-12)"/>
              <ellipse cx="140" cy="134" rx="7" ry="2.5" fill="none" stroke="rgba(201,170,111,0.38)" stroke-width="0.7" transform="skewX(-12)"/>
              <!-- 3 pendants above -->
              <line x1="120" y1="0" x2="120" y2="84" stroke="rgba(201,170,111,0.58)" stroke-width="1.0"/>
              <ellipse cx="120" cy="96" rx="28" ry="9" fill="none" stroke="rgba(201,170,111,0.85)" stroke-width="1.6"/>
              <line x1="92" y1="96" x2="96" y2="120" stroke="rgba(201,170,111,0.74)" stroke-width="1.3"/>
              <line x1="148" y1="96" x2="144" y2="120" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <ellipse cx="120" cy="120" rx="20" ry="6" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.2"/>
              <circle cx="120" cy="118" r="4" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9" filter="url(#ig3glow)"/>
              <line x1="210" y1="0" x2="210" y2="88" stroke="rgba(201,170,111,0.54)" stroke-width="0.9"/>
              <ellipse cx="210" cy="100" rx="26" ry="8" fill="none" stroke="rgba(201,170,111,0.80)" stroke-width="1.5"/>
              <line x1="184" y1="100" x2="188" y2="122" stroke="rgba(201,170,111,0.70)" stroke-width="1.2"/>
              <line x1="236" y1="100" x2="232" y2="122" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <ellipse cx="210" cy="122" rx="18" ry="5.5" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="1.1"/>
              <circle cx="210" cy="120" r="3.5" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.8" filter="url(#ig3glow)"/>
              <line x1="300" y1="0" x2="300" y2="92" stroke="rgba(201,170,111,0.50)" stroke-width="0.8"/>
              <ellipse cx="300" cy="104" rx="24" ry="7.5" fill="none" stroke="rgba(201,170,111,0.75)" stroke-width="1.4"/>
              <line x1="276" y1="104" x2="280" y2="124" stroke="rgba(201,170,111,0.65)" stroke-width="1.1"/>
              <line x1="324" y1="104" x2="320" y2="124" stroke="rgba(201,170,111,0.63)" stroke-width="1.1"/>
              <ellipse cx="300" cy="124" rx="16" ry="5" fill="none" stroke="rgba(201,170,111,0.56)" stroke-width="1.0"/>
              <!-- Bar stools -->
              <ellipse cx="56" cy="166" rx="24" ry="8" fill="none" stroke="rgba(201,170,111,0.78)" stroke-width="1.5"/>
              <line x1="56" y1="174" x2="56" y2="224" stroke="rgba(201,170,111,0.70)" stroke-width="2.0"/>
              <ellipse cx="56" cy="228" rx="16" ry="5" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.2"/>
              <ellipse cx="144" cy="152" rx="24" ry="8" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.4"/>
              <line x1="144" y1="160" x2="144" y2="210" stroke="rgba(201,170,111,0.64)" stroke-width="1.9"/>
              <ellipse cx="144" cy="214" rx="16" ry="5" fill="none" stroke="rgba(201,170,111,0.54)" stroke-width="1.1"/>
              <!-- Upper cabinets wall -->
              <polygon points="20,60 340,20 374,36 54,76" fill="none" stroke="rgba(201,170,111,0.78)" stroke-width="1.5"/>
              <polygon points="20,60 20,118 54,130 54,76" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.2"/>
              <polygon points="54,76 54,130 374,100 374,36" fill="none" stroke="rgba(201,170,111,0.46)" stroke-width="1.0"/>
              <line x1="138" y1="28" x2="138" y2="86" stroke="rgba(201,170,111,0.38)" stroke-width="0.8"/>
              <line x1="238" y1="22" x2="238" y2="76" stroke="rgba(201,170,111,0.34)" stroke-width="0.7"/>
              <line x1="68" y1="103" x2="76" y2="103" stroke="rgba(201,170,111,0.54)" stroke-width="1.1"/>
              <line x1="184" y1="95" x2="192" y2="95" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <line x1="285" y1="88" x2="293" y2="88" stroke="rgba(201,170,111,0.48)" stroke-width="1.0"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none"><rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/></svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              408
            </span>
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h10v8H8l-2 2V10H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              24
            </span>
          </div>
          <p class="ig-caption">Professional kitchen island — fluted marble, gooseneck tap. ✦</p>
        </div>
      </div>

      <!-- Tile 04 — tall — Library wall -->
      <div class="ig-tile ig-tile--tall reveal-up" data-delay="3">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig4chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="6" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="ig4glow">
                <feGaussianBlur stdDeviation="3.8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ig4bg" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stop-color="#1c1812"/>
                <stop offset="100%" stop-color="#080707"/>
              </radialGradient>
            </defs>
            <rect width="400" height="800" fill="url(#ig4bg)"/>
            <g filter="url(#ig4chalk)">
              <!-- Library wall frame -->
              <rect x="20" y="10" width="330" height="760" fill="none" stroke="rgba(201,170,111,0.84)" stroke-width="1.9"/>
              <!-- ISO depth right -->
              <polygon points="350,10 386,30 386,790 350,770" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.4"/>
              <!-- ISO top -->
              <polygon points="20,10 350,10 386,30 56,30" fill="none" stroke="rgba(201,170,111,0.70)" stroke-width="1.5"/>
              <!-- Left pilaster -->
              <rect x="20" y="10" width="18" height="760" fill="none" stroke="rgba(201,170,111,0.52)" stroke-width="1.0"/>
              <rect x="20" y="28" width="18" height="16" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.7"/>
              <rect x="20" y="736" width="18" height="16" fill="none" stroke="rgba(201,170,111,0.34)" stroke-width="0.6"/>
              <!-- Right pilaster -->
              <rect x="332" y="10" width="18" height="760" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.9"/>
              <!-- 6 shelves -->
              <line x1="38" y1="138" x2="332" y2="138" stroke="rgba(201,170,111,0.68)" stroke-width="1.4"/>
              <line x1="38" y1="266" x2="332" y2="266" stroke="rgba(201,170,111,0.66)" stroke-width="1.3"/>
              <line x1="38" y1="394" x2="332" y2="394" stroke="rgba(201,170,111,0.64)" stroke-width="1.3"/>
              <line x1="38" y1="522" x2="332" y2="522" stroke="rgba(201,170,111,0.62)" stroke-width="1.2"/>
              <line x1="38" y1="650" x2="332" y2="650" stroke="rgba(201,170,111,0.60)" stroke-width="1.2"/>
              <!-- Centre vertical divider -->
              <line x1="185" y1="10" x2="185" y2="760" stroke="rgba(201,170,111,0.44)" stroke-width="0.9"/>
              <!-- BOOKS — varied widths/heights, all 6 shelves -->
              <!-- Shelf 1 left -->
              <line x1="44" y1="18" x2="44" y2="136" stroke="rgba(201,170,111,0.52)" stroke-width="3.0"/>
              <line x1="54" y1="18" x2="54" y2="136" stroke="rgba(201,170,111,0.44)" stroke-width="2.2"/>
              <line x1="62" y1="22" x2="62" y2="136" stroke="rgba(201,170,111,0.52)" stroke-width="3.4"/>
              <line x1="72" y1="18" x2="72" y2="136" stroke="rgba(201,170,111,0.40)" stroke-width="2.0"/>
              <line x1="80" y1="20" x2="80" y2="136" stroke="rgba(201,170,111,0.48)" stroke-width="2.8"/>
              <line x1="90" y1="18" x2="90" y2="136" stroke="rgba(201,170,111,0.42)" stroke-width="2.2"/>
              <line x1="98" y1="22" x2="98" y2="136" stroke="rgba(201,170,111,0.50)" stroke-width="3.2"/>
              <line x1="108" y1="18" x2="108" y2="136" stroke="rgba(201,170,111,0.38)" stroke-width="1.9"/>
              <line x1="116" y1="20" x2="116" y2="136" stroke="rgba(201,170,111,0.46)" stroke-width="2.6"/>
              <line x1="126" y1="22" x2="126" y2="136" stroke="rgba(201,170,111,0.40)" stroke-width="2.0"/>
              <line x1="134" y1="18" x2="130" y2="136" stroke="rgba(201,170,111,0.44)" stroke-width="2.4" transform="rotate(4,134,136)"/>
              <line x1="148" y1="22" x2="148" y2="136" stroke="rgba(201,170,111,0.48)" stroke-width="2.8"/>
              <line x1="158" y1="20" x2="158" y2="136" stroke="rgba(201,170,111,0.38)" stroke-width="1.9"/>
              <!-- Shelf 1 right -->
              <line x1="192" y1="20" x2="192" y2="136" stroke="rgba(201,170,111,0.50)" stroke-width="2.8"/>
              <line x1="202" y1="18" x2="202" y2="136" stroke="rgba(201,170,111,0.44)" stroke-width="2.2"/>
              <line x1="210" y1="22" x2="210" y2="136" stroke="rgba(201,170,111,0.52)" stroke-width="3.2"/>
              <line x1="220" y1="18" x2="220" y2="136" stroke="rgba(201,170,111,0.40)" stroke-width="1.8"/>
              <line x1="228" y1="20" x2="228" y2="136" stroke="rgba(201,170,111,0.48)" stroke-width="2.8"/>
              <line x1="238" y1="18" x2="238" y2="136" stroke="rgba(201,170,111,0.42)" stroke-width="2.2"/>
              <line x1="246" y1="22" x2="246" y2="136" stroke="rgba(201,170,111,0.46)" stroke-width="2.0"/>
              <line x1="256" y1="18" x2="256" y2="136" stroke="rgba(201,170,111,0.44)" stroke-width="3.0"/>
              <line x1="266" y1="22" x2="266" y2="136" stroke="rgba(201,170,111,0.38)" stroke-width="1.8"/>
              <line x1="276" y1="20" x2="276" y2="136" stroke="rgba(201,170,111,0.46)" stroke-width="2.4"/>
              <!-- Shelf 2 — left bay — decorative arrangement -->
              <!-- Small bust/sculpture -->
              <line x1="48" y1="148" x2="46" y2="226" stroke="rgba(201,170,111,0.46)" stroke-width="1.0"/>
              <ellipse cx="46" cy="234" rx="10" ry="14" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.9"/>
              <circle cx="46" cy="222" r="8" fill="none" stroke="rgba(201,170,111,0.46)" stroke-width="0.9"/>
              <ellipse cx="46" cy="246" rx="12" ry="4" fill="none" stroke="rgba(201,170,111,0.38)" stroke-width="0.7"/>
              <!-- Books beside bust -->
              <line x1="62" y1="146" x2="62" y2="264" stroke="rgba(201,170,111,0.44)" stroke-width="2.6"/>
              <line x1="72" y1="148" x2="72" y2="264" stroke="rgba(201,170,111,0.40)" stroke-width="2.0"/>
              <line x1="80" y1="146" x2="80" y2="264" stroke="rgba(201,170,111,0.46)" stroke-width="2.8"/>
              <line x1="90" y1="148" x2="90" y2="264" stroke="rgba(201,170,111,0.38)" stroke-width="1.8"/>
              <line x1="100" y1="146" x2="100" y2="264" stroke="rgba(201,170,111,0.44)" stroke-width="2.4"/>
              <!-- Shelf 2 right — vase + books -->
              <ellipse cx="210" cy="264" rx="10" ry="3.5" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9"/>
              <line x1="200" y1="264" x2="198" y2="228" stroke="rgba(201,170,111,0.46)" stroke-width="1.0"/>
              <line x1="220" y1="264" x2="222" y2="228" stroke="rgba(201,170,111,0.44)" stroke-width="1.0"/>
              <ellipse cx="210" cy="228" rx="8" ry="2.8" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.8"/>
              <line x1="210" y1="224" x2="204" y2="196" stroke="rgba(201,170,111,0.36)" stroke-width="0.7"/>
              <circle cx="204" cy="193" r="3.5" fill="none" stroke="rgba(201,170,111,0.34)" stroke-width="0.6"/>
              <line x1="228" y1="148" x2="228" y2="264" stroke="rgba(201,170,111,0.40)" stroke-width="2.2"/>
              <line x1="238" y1="150" x2="238" y2="264" stroke="rgba(201,170,111,0.38)" stroke-width="2.0"/>
              <line x1="248" y1="148" x2="248" y2="264" stroke="rgba(201,170,111,0.42)" stroke-width="2.6"/>
              <!-- Shelf 3, 4, 5 left + right — books -->
              <line x1="44" y1="274" x2="44" y2="392" stroke="rgba(201,170,111,0.44)" stroke-width="2.4"/>
              <line x1="54" y1="276" x2="54" y2="392" stroke="rgba(201,170,111,0.38)" stroke-width="1.8"/>
              <line x1="62" y1="274" x2="62" y2="392" stroke="rgba(201,170,111,0.46)" stroke-width="2.8"/>
              <line x1="72" y1="278" x2="72" y2="392" stroke="rgba(201,170,111,0.36)" stroke-width="1.6"/>
              <line x1="80" y1="274" x2="80" y2="392" stroke="rgba(201,170,111,0.42)" stroke-width="2.2"/>
              <line x1="192" y1="274" x2="192" y2="392" stroke="rgba(201,170,111,0.42)" stroke-width="2.4"/>
              <line x1="202" y1="276" x2="202" y2="392" stroke="rgba(201,170,111,0.36)" stroke-width="1.8"/>
              <!-- Candle on shelf 3 -->
              <rect x="100" y="278" width="9" height="56" fill="none" stroke="rgba(201,170,111,0.42)" stroke-width="0.8" transform="skewX(-5)"/>
              <circle cx="104" cy="276" r="2.2" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.7" filter="url(#ig4glow)"/>
              <!-- Shelf 4 -->
              <line x1="44" y1="402" x2="44" y2="520" stroke="rgba(201,170,111,0.42)" stroke-width="2.2"/>
              <line x1="54" y1="404" x2="54" y2="520" stroke="rgba(201,170,111,0.36)" stroke-width="1.7"/>
              <line x1="62" y1="402" x2="62" y2="520" stroke="rgba(201,170,111,0.44)" stroke-width="2.6"/>
              <line x1="72" y1="406" x2="72" y2="520" stroke="rgba(201,170,111,0.34)" stroke-width="1.5"/>
              <line x1="192" y1="402" x2="192" y2="520" stroke="rgba(201,170,111,0.40)" stroke-width="2.2"/>
              <!-- Framed print on shelf 4 -->
              <rect x="100" y="404" width="70" height="100" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.8"/>
              <rect x="104" y="408" width="62" height="92" fill="none" stroke="rgba(201,170,111,0.24)" stroke-width="0.4"/>
              <line x1="104" y1="408" x2="166" y2="500" stroke="rgba(201,170,111,0.14)" stroke-width="0.4"/>
              <!-- Shelf 5 -->
              <line x1="44" y1="530" x2="44" y2="648" stroke="rgba(201,170,111,0.40)" stroke-width="2.0"/>
              <line x1="54" y1="532" x2="54" y2="648" stroke="rgba(201,170,111,0.34)" stroke-width="1.6"/>
              <line x1="62" y1="530" x2="62" y2="648" stroke="rgba(201,170,111,0.42)" stroke-width="2.4"/>
              <line x1="192" y1="530" x2="192" y2="648" stroke="rgba(201,170,111,0.38)" stroke-width="2.0"/>
              <!-- Shelf 6 bottom -->
              <line x1="44" y1="660" x2="44" y2="758" stroke="rgba(201,170,111,0.38)" stroke-width="2.8"/>
              <line x1="56" y1="660" x2="56" y2="758" stroke="rgba(201,170,111,0.32)" stroke-width="2.0"/>
              <!-- Horizontal stacked books bottom -->
              <rect x="72" y="716" width="46" height="12" fill="none" stroke="rgba(201,170,111,0.34)" stroke-width="0.7" transform="skewX(-6)"/>
              <rect x="72" y="728" width="38" height="12" fill="none" stroke="rgba(201,170,111,0.28)" stroke-width="0.6" transform="skewX(-6)"/>
              <!-- Rolling library ladder -->
              <line x1="336" y1="80" x2="348" y2="740" stroke="rgba(201,170,111,0.56)" stroke-width="1.3"/>
              <line x1="350" y1="76" x2="362" y2="736" stroke="rgba(201,170,111,0.50)" stroke-width="1.2"/>
              <line x1="337" y1="160" x2="351" y2="158" stroke="rgba(201,170,111,0.42)" stroke-width="0.9"/>
              <line x1="338" y1="240" x2="352" y2="238" stroke="rgba(201,170,111,0.40)" stroke-width="0.8"/>
              <line x1="340" y1="320" x2="354" y2="318" stroke="rgba(201,170,111,0.38)" stroke-width="0.8"/>
              <line x1="341" y1="400" x2="355" y2="398" stroke="rgba(201,170,111,0.36)" stroke-width="0.7"/>
              <line x1="342" y1="480" x2="356" y2="478" stroke="rgba(201,170,111,0.34)" stroke-width="0.7"/>
              <line x1="343" y1="560" x2="357" y2="558" stroke="rgba(201,170,111,0.32)" stroke-width="0.6"/>
              <line x1="344" y1="640" x2="358" y2="638" stroke="rgba(201,170,111,0.30)" stroke-width="0.6"/>
              <!-- Floor track -->
              <line x1="336" y1="760" x2="370" y2="760" stroke="rgba(201,170,111,0.48)" stroke-width="1.0"/>
              <!-- Ladder hook top -->
              <path d="M342,80 Q342,60 352,56" fill="none" stroke="rgba(201,170,111,0.46)" stroke-width="0.9"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none"><rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/></svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              621
            </span>
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h10v8H8l-2 2V10H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              48
            </span>
          </div>
          <p class="ig-caption">Full-height library wall with rolling ladder. A room within a room. ✦</p>
        </div>
      </div>

      <!-- Tile 05 — square — Dining room -->
      <div class="ig-tile reveal-up" data-delay="3">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig5chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" seed="20" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="ig5glow">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ig5bg" cx="50%" cy="55%" r="68%">
                <stop offset="0%" stop-color="#1a1510"/>
                <stop offset="100%" stop-color="#090806"/>
              </radialGradient>
            </defs>
            <rect width="400" height="400" fill="url(#ig5bg)"/>
            <g filter="url(#ig5chalk)">
              <!-- Room frame suggestion -->
              <polygon points="40,200 200,120 360,200 200,280" fill="none" stroke="rgba(201,170,111,0.18)" stroke-width="0.7" stroke-dasharray="6,5"/>
              <!-- Grand dining table -->
              <polygon points="60,220 296,152 332,172 96,240" fill="none" stroke="rgba(201,170,111,0.90)" stroke-width="1.8"/>
              <polygon points="60,220 60,238 96,258 96,240" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.4"/>
              <polygon points="96,240 96,258 332,188 332,172" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.3"/>
              <!-- Table legs -->
              <line x1="80" y1="228" x2="80" y2="290" stroke="rgba(201,170,111,0.70)" stroke-width="1.6"/>
              <line x1="94" y1="252" x2="94" y2="314" stroke="rgba(201,170,111,0.64)" stroke-width="1.5"/>
              <line x1="314" y1="174" x2="314" y2="236" stroke="rgba(201,170,111,0.62)" stroke-width="1.5"/>
              <!-- Wood grain on table -->
              <line x1="102" y1="166" x2="116" y2="234" stroke="rgba(201,170,111,0.11)" stroke-width="0.5"/>
              <line x1="176" y1="154" x2="190" y2="222" stroke="rgba(201,170,111,0.10)" stroke-width="0.4"/>
              <line x1="250" y1="152" x2="264" y2="220" stroke="rgba(201,170,111,0.09)" stroke-width="0.4"/>
              <!-- Table runner -->
              <polygon points="90,176 278,132 304,148 116,192" fill="none" stroke="rgba(201,170,111,0.25)" stroke-width="0.6" stroke-dasharray="5,3"/>
              <!-- Centre vase/flowers -->
              <ellipse cx="200" cy="196" rx="16" ry="5.5" fill="none" stroke="rgba(201,170,111,0.56)" stroke-width="1.1"/>
              <line x1="184" y1="196" x2="182" y2="166" stroke="rgba(201,170,111,0.52)" stroke-width="1.0"/>
              <line x1="216" y1="196" x2="218" y2="166" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <ellipse cx="200" cy="166" rx="13" ry="4.5" fill="none" stroke="rgba(201,170,111,0.50)" stroke-width="0.9"/>
              <line x1="200" y1="162" x2="192" y2="134" stroke="rgba(201,170,111,0.40)" stroke-width="0.8"/>
              <line x1="200" y1="148" x2="214" y2="124" stroke="rgba(201,170,111,0.38)" stroke-width="0.7"/>
              <circle cx="192" cy="132" r="3.5" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.6"/>
              <circle cx="214" cy="122" r="3" fill="none" stroke="rgba(201,170,111,0.34)" stroke-width="0.6"/>
              <!-- Dining chairs — 4 visible -->
              <!-- Chair front left -->
              <polygon points="66,248 140,228 158,240 84,260" fill="none" stroke="rgba(201,170,111,0.82)" stroke-width="1.5"/>
              <line x1="68" y1="246" x2="68" y2="196" stroke="rgba(201,170,111,0.76)" stroke-width="1.4"/>
              <line x1="84" y1="240" x2="84" y2="192" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <line x1="68" y1="196" x2="84" y2="192" stroke="rgba(201,170,111,0.74)" stroke-width="1.4"/>
              <line x1="68" y1="218" x2="84" y2="214" stroke="rgba(201,170,111,0.38)" stroke-width="0.7"/>
              <!-- Chair front right -->
              <polygon points="210,230 284,210 302,222 228,242" fill="none" stroke="rgba(201,170,111,0.80)" stroke-width="1.5"/>
              <line x1="212" y1="228" x2="212" y2="178" stroke="rgba(201,170,111,0.74)" stroke-width="1.4"/>
              <line x1="228" y1="222" x2="228" y2="174" stroke="rgba(201,170,111,0.66)" stroke-width="1.2"/>
              <line x1="212" y1="178" x2="228" y2="174" stroke="rgba(201,170,111,0.72)" stroke-width="1.4"/>
              <!-- Chair back left -->
              <polygon points="66,164 140,144 158,156 84,176" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <line x1="68" y1="162" x2="68" y2="116" stroke="rgba(201,170,111,0.66)" stroke-width="1.2"/>
              <line x1="84" y1="158" x2="84" y2="110" stroke="rgba(201,170,111,0.58)" stroke-width="1.1"/>
              <line x1="68" y1="116" x2="84" y2="110" stroke="rgba(201,170,111,0.64)" stroke-width="1.2"/>
              <!-- Chair back right -->
              <polygon points="210,144 284,124 302,136 228,156" fill="none" stroke="rgba(201,170,111,0.70)" stroke-width="1.3"/>
              <line x1="212" y1="142" x2="212" y2="96" stroke="rgba(201,170,111,0.64)" stroke-width="1.2"/>
              <line x1="228" y1="136" x2="228" y2="90" stroke="rgba(201,170,111,0.56)" stroke-width="1.1"/>
              <line x1="212" y1="96" x2="228" y2="90" stroke="rgba(201,170,111,0.62)" stroke-width="1.2"/>
              <!-- Chandelier above -->
              <line x1="200" y1="0" x2="200" y2="54" stroke="rgba(201,170,111,0.62)" stroke-width="1.0" stroke-dasharray="4,3"/>
              <ellipse cx="200" cy="68" rx="66" ry="22" fill="none" stroke="rgba(201,170,111,0.86)" stroke-width="1.7"/>
              <ellipse cx="200" cy="76" rx="54" ry="17" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.6"/>
              <line x1="134" y1="68" x2="120" y2="106" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <line x1="162" y1="54" x2="156" y2="92" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <line x1="200" y1="46" x2="200" y2="84" stroke="rgba(201,170,111,0.76)" stroke-width="1.4"/>
              <line x1="238" y1="54" x2="244" y2="92" stroke="rgba(201,170,111,0.68)" stroke-width="1.2"/>
              <line x1="266" y1="68" x2="280" y2="106" stroke="rgba(201,170,111,0.72)" stroke-width="1.3"/>
              <!-- Candle lights on chandelier -->
              <circle cx="120" cy="108" r="3" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="0.9" filter="url(#ig5glow)"/>
              <circle cx="156" cy="94" r="2.8" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="0.9" filter="url(#ig5glow)"/>
              <circle cx="200" cy="86" r="3.2" fill="none" stroke="rgba(201,170,111,0.65)" stroke-width="1.0" filter="url(#ig5glow)"/>
              <circle cx="244" cy="94" r="2.8" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="0.9" filter="url(#ig5glow)"/>
              <circle cx="280" cy="108" r="3" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="0.9" filter="url(#ig5glow)"/>
              <!-- Rug below -->
              <polygon points="80,234 312,172 344,190 112,252" fill="none" stroke="rgba(201,170,111,0.27)" stroke-width="0.6" stroke-dasharray="7,4"/>
              <!-- Dimension line -->
              <line x1="64" y1="380" x2="334" y2="380" stroke="rgba(201,170,111,0.18)" stroke-width="0.5" stroke-dasharray="4,5"/>
              <line x1="64" y1="374" x2="64" y2="386" stroke="rgba(201,170,111,0.22)" stroke-width="0.6"/>
              <line x1="334" y1="374" x2="334" y2="386" stroke="rgba(201,170,111,0.22)" stroke-width="0.6"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none"><rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/></svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              539
            </span>
          </div>
          <p class="ig-caption">Dining room — hand-drawn in perspective. The space breathes. ✦</p>
        </div>
      </div>

      <!-- Tile 06 — square — Chaise longue / bedroom vibe -->
      <div class="ig-tile reveal-up" data-delay="4">
        <div class="ig-tile-inner">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="ig6chalk">
                <feTurbulence type="fractalNoise" baseFrequency="0.74" numOctaves="4" seed="11" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="ig6glow">
                <feGaussianBlur stdDeviation="4.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="ig6bg" cx="55%" cy="50%" r="65%">
                <stop offset="0%" stop-color="#1c1712"/>
                <stop offset="100%" stop-color="#080706"/>
              </radialGradient>
            </defs>
            <rect width="400" height="400" fill="url(#ig6bg)"/>
            <g filter="url(#ig6chalk)">
              <!-- Velvet chaise longue -->
              <polygon points="14,224 340,174 374,196 48,246" fill="none" stroke="rgba(201,170,111,0.92)" stroke-width="1.9"/>
              <!-- Front face -->
              <polygon points="14,224 14,270 48,290 48,246" fill="none" stroke="rgba(201,170,111,0.72)" stroke-width="1.5"/>
              <!-- Right face -->
              <polygon points="48,246 48,290 374,242 374,196" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="1.3"/>
              <!-- Raised headrest end -->
              <polygon points="14,224 6,182 18,164 26,200" fill="none" stroke="rgba(201,170,111,0.80)" stroke-width="1.6"/>
              <ellipse cx="10" cy="182" rx="11" ry="3.5" fill="none" stroke="rgba(201,170,111,0.55)" stroke-width="1.1"/>
              <!-- Rolled open end right -->
              <polygon points="340,174 360,166 360,210 340,218" fill="none" stroke="rgba(201,170,111,0.64)" stroke-width="1.3"/>
              <ellipse cx="350" cy="166" rx="11" ry="3.5" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.9"/>
              <!-- Button tufts row -->
              <circle cx="72" cy="208" r="3.5" fill="none" stroke="rgba(201,170,111,0.34)" stroke-width="0.7"/>
              <circle cx="148" cy="196" r="3.5" fill="none" stroke="rgba(201,170,111,0.30)" stroke-width="0.7"/>
              <circle cx="232" cy="188" r="3.5" fill="none" stroke="rgba(201,170,111,0.28)" stroke-width="0.6"/>
              <circle cx="312" cy="180" r="3" fill="none" stroke="rgba(201,170,111,0.26)" stroke-width="0.6"/>
              <!-- Cushion seams -->
              <line x1="22" y1="232" x2="358" y2="182" stroke="rgba(201,170,111,0.26)" stroke-width="0.6"/>
              <line x1="16" y1="240" x2="352" y2="190" stroke="rgba(201,170,111,0.18)" stroke-width="0.5"/>
              <!-- Fringe at base -->
              <line x1="16" y1="268" x2="16" y2="282" stroke="rgba(201,170,111,0.38)" stroke-width="0.6" stroke-dasharray="2,2"/>
              <line x1="28" y1="270" x2="28" y2="284" stroke="rgba(201,170,111,0.36)" stroke-width="0.6" stroke-dasharray="2,2"/>
              <line x1="40" y1="272" x2="40" y2="286" stroke="rgba(201,170,111,0.36)" stroke-width="0.6" stroke-dasharray="2,2"/>
              <!-- Cabriole legs -->
              <path d="M18,268 Q14,282 18,296" fill="none" stroke="rgba(201,170,111,0.66)" stroke-width="1.3"/>
              <path d="M46,288 Q42,302 46,316" fill="none" stroke="rgba(201,170,111,0.60)" stroke-width="1.2"/>
              <path d="M350,210 Q354,224 350,238" fill="none" stroke="rgba(201,170,111,0.58)" stroke-width="1.2"/>
              <path d="M370,188 Q374,202 370,216" fill="none" stroke="rgba(201,170,111,0.54)" stroke-width="1.1"/>
              <!-- Foot pads -->
              <ellipse cx="18" cy="296" rx="7" ry="2" fill="none" stroke="rgba(201,170,111,0.46)" stroke-width="0.8"/>
              <ellipse cx="46" cy="316" rx="7" ry="2" fill="none" stroke="rgba(201,170,111,0.44)" stroke-width="0.8"/>
              <!-- Throw cushion/pillow on headrest -->
              <polygon points="6,188 44,178 50,192 12,202" fill="none" stroke="rgba(201,170,111,0.54)" stroke-width="1.1"/>
              <line x1="28" y1="182" x2="30" y2="198" stroke="rgba(201,170,111,0.24)" stroke-width="0.5"/>
              <!-- Arc floor lamp beside -->
              <ellipse cx="370" cy="354" rx="22" ry="7" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.2"/>
              <line x1="370" y1="347" x2="368" y2="148" stroke="rgba(201,170,111,0.68)" stroke-width="1.5"/>
              <path d="M368,148 Q368,124 390,112" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.3"/>
              <ellipse cx="376" cy="108" rx="30" ry="9.5" fill="none" stroke="rgba(201,170,111,0.82)" stroke-width="1.5"/>
              <line x1="346" y1="108" x2="348" y2="136" stroke="rgba(201,170,111,0.72)" stroke-width="1.2"/>
              <line x1="406" y1="108" x2="404" y2="136" stroke="rgba(201,170,111,0.68)" stroke-width="1.1"/>
              <ellipse cx="376" cy="136" rx="24" ry="7.5" fill="none" stroke="rgba(201,170,111,0.62)" stroke-width="1.1"/>
              <circle cx="376" cy="134" r="5" fill="none" stroke="rgba(201,170,111,0.52)" stroke-width="0.9" filter="url(#ig6glow)"/>
              <!-- Decorative side table -->
              <ellipse cx="68" cy="286" rx="38" ry="12" fill="none" stroke="rgba(201,170,111,0.68)" stroke-width="1.3"/>
              <line x1="30" y1="286" x2="30" y2="342" stroke="rgba(201,170,111,0.56)" stroke-width="1.2"/>
              <line x1="106" y1="286" x2="106" y2="342" stroke="rgba(201,170,111,0.54)" stroke-width="1.1"/>
              <ellipse cx="68" cy="342" rx="38" ry="12" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="1.0"/>
              <!-- Items on table: candle tray -->
              <polygon points="38,278 98,268 104,274 44,284" fill="none" stroke="rgba(201,170,111,0.36)" stroke-width="0.6"/>
              <line x1="60" y1="278" x2="60" y2="264" stroke="rgba(201,170,111,0.50)" stroke-width="1.0"/>
              <circle cx="60" cy="263" r="2" fill="none" stroke="rgba(201,170,111,0.48)" stroke-width="0.7" filter="url(#ig6glow)"/>
              <line x1="76" y1="276" x2="76" y2="258" stroke="rgba(201,170,111,0.48)" stroke-width="1.0"/>
              <circle cx="76" cy="257" r="2" fill="none" stroke="rgba(201,170,111,0.46)" stroke-width="0.7" filter="url(#ig6glow)"/>
              <!-- Rug -->
              <polygon points="16,252 354,202 384,218 46,268" fill="none" stroke="rgba(201,170,111,0.24)" stroke-width="0.6" stroke-dasharray="8,4"/>
              <!-- Blueprint annotation -->
              <line x1="14" y1="370" x2="374" y2="370" stroke="rgba(201,170,111,0.16)" stroke-width="0.4" stroke-dasharray="4,5"/>
              <line x1="14" y1="364" x2="14" y2="376" stroke="rgba(201,170,111,0.20)" stroke-width="0.6"/>
              <line x1="374" y1="364" x2="374" y2="376" stroke="rgba(201,170,111,0.20)" stroke-width="0.6"/>
            </g>
          </svg>
        </div>
        <div class="ig-badge">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none"><rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="11" cy="11" r="4.5" stroke="rgba(201,170,111,0.9)" stroke-width="1.2"/><circle cx="16.5" cy="5.5" r="1" fill="rgba(201,170,111,0.9)"/></svg>
        </div>
        <div class="ig-overlay">
          <div class="ig-meta">
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.5S1 8.5 1 4.5C1 2.57 2.57 1 4.5 1c1.05 0 2 .5 2.5 1.3C7.5 1.5 8.45 1 9.5 1 11.43 1 13 2.57 13 4.5c0 4-6 8-6 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              456
            </span>
            <span class="ig-stat">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h10v8H8l-2 2V10H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              38
            </span>
          </div>
          <p class="ig-caption">Velvet chaise longue — button tufted, fringe detail. Designed to be lived in. ✦</p>
        </div>
      </div>

    </div>

    <!-- Bottom CTA row -->
    <div class="ig-cta-row reveal-up" data-delay="5">
      <span class="ig-cta-handle">@studio_aimo</span>
      <a href="https://www.instagram.com/studio_aimo/" target="_blank" rel="noopener" class="btn-ghost">
        Follow on Instagram
      </a>
    </div>
  </section>

  <!-- ── ABOUT / STUDIO ── -->
  <section class="studio-section" id="studio">
    <div class="studio-inner">
      <div class="studio-text">
        <span class="section-label reveal-up" data-delay="0">The Studio</span>
        <h2 class="reveal-up" data-delay="1">Alby's world is<br/><em>your space reimagined</em></h2>
        <p class="reveal-up" data-delay="2">
          STUDIO AIMO was born from a singular obsession: the belief that interior design is not merely a service — it is an art of possibility. Led by Alby, a designer whose practice bridges industrial rawness with aristocratic refinement, the studio crafts environments that feel both inevitable and astonishing.
        </p>
        <p class="reveal-up" data-delay="3">
          From Milanese penthouse apartments to London boutique hotels and New York creative studios, every project begins with listening — to the space, to the client, and to the invisible life a room is waiting to live.
        </p>
        <div class="studio-creds reveal-up" data-delay="4">
          <div class="cred-item">
            <span class="cred-num">12+</span>
            <span class="cred-label">Years of Practice</span>
          </div>
          <div class="cred-item">
            <span class="cred-num">140+</span>
            <span class="cred-label">Completed Projects</span>
          </div>
          <div class="cred-item">
            <span class="cred-num">18</span>
            <span class="cred-label">Countries</span>
          </div>
        </div>
        <a href="#contact" class="btn-primary reveal-up" data-delay="5">Work with Alby</a>
      </div>
      <div class="studio-visual reveal-up" data-delay="1" aria-hidden="true">
        <svg viewBox="0 0 520 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="achalk">
              <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="4" seed="9" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <filter id="aglow">
              <feGaussianBlur stdDeviation="4.0" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#achalk)" opacity="0.82">
            <!-- Armchair — bold statement centre piece -->
            <polygon points="94,304 292,248 334,282 136,338" fill="none" stroke="#d4c8b0" stroke-width="1.9"/>
            <polygon points="292,248 334,282 334,350 292,316" fill="none" stroke="#d4c8b0" stroke-width="1.6"/>
            <polygon points="94,304 94,372 136,406 136,338" fill="none" stroke="#d4c8b0" stroke-width="1.6"/>
            <!-- Backrest -->
            <polygon points="94,304 106,252 298,204 292,248" fill="none" stroke="#d4c8b0" stroke-width="1.8"/>
            <polygon points="292,248 298,204 340,232 334,282" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <!-- Armrests -->
            <polygon points="94,304 76,290 76,358 94,372" fill="none" stroke="#d4c8b0" stroke-width="1.5"/>
            <polygon points="292,248 308,238 308,306 292,316" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <ellipse cx="85" cy="290" rx="11" ry="4" fill="none" stroke="#d4c8b0" stroke-width="1.0"/>
            <ellipse cx="300" cy="238" rx="11" ry="4" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <!-- Cushion tufts & seam -->
            <line x1="112" y1="312" x2="308" y2="256" stroke="#d4c8b0" stroke-width="0.7" opacity="0.55"/>
            <circle cx="158" cy="288" r="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.7" opacity="0.45"/>
            <circle cx="234" cy="268" r="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.7" opacity="0.40"/>
            <!-- Legs -->
            <line x1="96" y1="370" x2="96" y2="416" stroke="#d4c8b0" stroke-width="1.8"/>
            <line x1="134" y1="404" x2="134" y2="450" stroke="#d4c8b0" stroke-width="1.6"/>
            <line x1="306" y1="304" x2="306" y2="350" stroke="#d4c8b0" stroke-width="1.6"/>
            <line x1="332" y1="348" x2="332" y2="394" stroke="#d4c8b0" stroke-width="1.5"/>
            <!-- Floor lamp -->
            <ellipse cx="420" cy="458" rx="26" ry="9" fill="none" stroke="#d4c8b0" stroke-width="1.6"/>
            <ellipse cx="420" cy="466" rx="20" ry="7" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <line x1="420" y1="450" x2="418" y2="194" stroke="#d4c8b0" stroke-width="2.0"/>
            <path d="M418,194 Q418,162 446,148" fill="none" stroke="#d4c8b0" stroke-width="1.7"/>
            <ellipse cx="460" cy="140" rx="34" ry="11" fill="none" stroke="#d4c8b0" stroke-width="1.7"/>
            <line x1="426" y1="140" x2="428" y2="176" stroke="#d4c8b0" stroke-width="1.5"/>
            <line x1="494" y1="140" x2="492" y2="176" stroke="#d4c8b0" stroke-width="1.5"/>
            <ellipse cx="460" cy="176" rx="26" ry="8" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <!-- Lamp bulb glow -->
            <circle cx="460" cy="174" r="6" fill="none" stroke="#d4c8b0" stroke-width="1.0" filter="url(#aglow)"/>
            <!-- Side table -->
            <ellipse cx="70" cy="402" rx="44" ry="15" fill="none" stroke="#d4c8b0" stroke-width="1.5"/>
            <line x1="26" y1="402" x2="26" y2="470" stroke="#d4c8b0" stroke-width="1.4"/>
            <line x1="114" y1="402" x2="114" y2="470" stroke="#d4c8b0" stroke-width="1.3"/>
            <ellipse cx="70" cy="470" rx="44" ry="15" fill="none" stroke="#d4c8b0" stroke-width="1.3"/>
            <!-- Decor on table: book + small vase -->
            <rect x="40" y="394" width="34" height="9" fill="none" stroke="#d4c8b0" stroke-width="0.8" transform="skewX(-12)"/>
            <line x1="60" y1="394" x2="60" y2="372" stroke="#d4c8b0" stroke-width="1.4"/>
            <ellipse cx="60" cy="370" rx="8" ry="3" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <!-- Tall plant beside -->
            <line x1="36" y1="398" x2="30" y2="294" stroke="#d4c8b0" stroke-width="1.5"/>
            <ellipse cx="32" cy="292" rx="11" ry="4" fill="none" stroke="#d4c8b0" stroke-width="1.0"/>
            <line x1="32" y1="338" x2="8" y2="308" stroke="#d4c8b0" stroke-width="1.1"/>
            <line x1="32" y1="322" x2="52" y2="294" stroke="#d4c8b0" stroke-width="1.0"/>
            <line x1="32" y1="310" x2="10" y2="284" stroke="#d4c8b0" stroke-width="0.9"/>
            <circle cx="7" cy="282" r="5" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <circle cx="53" cy="292" r="4.5" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <circle cx="10" cy="306" r="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.8"/>
            <!-- Throw pillow -->
            <polygon points="152,272 196,258 210,272 166,286" fill="none" stroke="#d4c8b0" stroke-width="1.0"/>
            <line x1="181" y1="263" x2="181" y2="280" stroke="#d4c8b0" stroke-width="0.5" opacity="0.5"/>
            <!-- Construction annotations -->
            <line x1="96" y1="498" x2="332" y2="498" stroke="#d4c8b0" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.50"/>
            <line x1="96" y1="492" x2="96" y2="504" stroke="#d4c8b0" stroke-width="0.7" opacity="0.50"/>
            <line x1="332" y1="492" x2="332" y2="504" stroke="#d4c8b0" stroke-width="0.7" opacity="0.50"/>
            <line x1="352" y1="140" x2="352" y2="282" stroke="#d4c8b0" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.42"/>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <!-- ── SERVICES ── -->
  <section class="services-section" id="services">
    <div class="services-inner">
      <div class="section-header reveal-up" data-delay="0">
        <span class="section-label">Services</span>
        <h2>The full spectrum of<br/><em>spatial alchemy</em></h2>
      </div>
      <div class="services-grid">
        <div class="service-card reveal-up" data-delay="1">
          <span class="sc-num">01</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="6,34 24,24 42,34 24,44" fill="none" stroke="currentColor" stroke-width="1.3"/><polygon points="6,24 24,14 42,24 24,34" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><polygon points="6,14 24,4 42,14 24,24" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.35"/></svg>
          </div>
          <h3>Residential Design</h3>
          <p>Private homes, apartments, and villas — entirely bespoke, entirely yours. From minimal cozy elegance to bold transformations.</p>
        </div>
        <div class="service-card reveal-up" data-delay="2">
          <span class="sc-num">02</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" fill="none" stroke="currentColor" stroke-width="1.3"/><polygon points="36,10 44,16 44,38 36,38" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><polygon points="6,10 36,10 44,16 14,16" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><line x1="14" y1="20" x2="30" y2="20" stroke="currentColor" stroke-width="0.7" opacity="0.5"/><line x1="14" y1="26" x2="30" y2="26" stroke="currentColor" stroke-width="0.7" opacity="0.4"/><line x1="14" y1="32" x2="22" y2="32" stroke="currentColor" stroke-width="0.7" opacity="0.4"/></svg>
          </div>
          <h3>Commercial Spaces</h3>
          <p>Offices, showrooms, and retail environments that amplify brand identity and feel grand yet welcoming.</p>
        </div>
        <div class="service-card reveal-up" data-delay="3">
          <span class="sc-num">03</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><line x1="24" y1="7" x2="24" y2="41" stroke="currentColor" stroke-width="0.6" opacity="0.4"/><line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" stroke-width="0.6" opacity="0.4"/></svg>
          </div>
          <h3>Hospitality &amp; Hotels</h3>
          <p>Immersive environments that become the destination rather than the container — a symphony of style and personality.</p>
        </div>
        <div class="service-card reveal-up" data-delay="4">
          <span class="sc-num">04</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1.3"/><line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="1.3"/><line x1="24" y1="6" x2="42" y2="24" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><line x1="6" y1="24" x2="24" y2="42" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><circle cx="24" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="1.0"/></svg>
          </div>
          <h3>Concept &amp; Art Direction</h3>
          <p>Mood, narrative, and spatial concept from blank canvas to living vision. Designing to feel grand yet welcoming.</p>
        </div>
        <div class="service-card reveal-up" data-delay="5">
          <span class="sc-num">05</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="8,40 24,8 40,40" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="14" y1="32" x2="34" y2="32" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" stroke-width="0.7" opacity="0.4"/><circle cx="24" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.0"/></svg>
          </div>
          <h3>Furniture &amp; Procurement</h3>
          <p>Custom pieces and curated sourcing — from artisan workshops to global makers. Layout, texture, material.</p>
        </div>
        <div class="service-card reveal-up" data-delay="6">
          <span class="sc-num">06</span>
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="6,38 24,10 42,38" fill="none" stroke="currentColor" stroke-width="1.3"/><polygon points="14,38 24,22 34,38" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><polygon points="18,38 24,30 30,38" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.35"/></svg>
          </div>
          <h3>Project Management</h3>
          <p>End-to-end oversight — contractor coordination, timeline mastery, and flawless delivery worldwide.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── PROCESS STRIP ── -->
  <section class="process-section">
    <div class="process-inner">
      <span class="section-label reveal-up" data-delay="0">The Process</span>
      <div class="process-steps">
        <div class="proc-step reveal-up" data-delay="1">
          <span class="proc-num">01</span>
          <h4>Listen</h4>
          <p>Understanding your vision, lifestyle, and the spatial story waiting to be told. Every detail matters.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="2">→</div>
        <div class="proc-step reveal-up" data-delay="2">
          <span class="proc-num">02</span>
          <h4>Conceive</h4>
          <p>From concept boards to detailed spatial drawings and material palettes — the alchemy begins.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="3">→</div>
        <div class="proc-step reveal-up" data-delay="3">
          <span class="proc-num">03</span>
          <h4>Craft</h4>
          <p>Precision execution with trusted artisans and contractors. Durability meets aesthetics.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="4">→</div>
        <div class="proc-step reveal-up" data-delay="4">
          <span class="proc-num">04</span>
          <h4>Reveal</h4>
          <p>The transformation complete — your space, as it was always meant to be. Before becomes after.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CONTACT ── -->
  <section class="contact-section" id="contact">
    <div class="contact-inner">
      <div class="contact-text reveal-up" data-delay="0">
        <span class="section-label">Begin the Conversation</span>
        <h2>Ready to <em>transform</em><br/>your space?</h2>
        <p>Every project begins with a conversation. Tell Alby about your vision and we'll shape it into reality — together.</p>
        <div class="contact-details">
          <div class="cd-item">
            <span class="cd-label">Studio</span>
            <span class="cd-value">Milan · London · New York</span>
          </div>
          <div class="cd-item">
            <span class="cd-label">Email</span>
            <span class="cd-value">studio@aimo.design</span>
          </div>
          <div class="cd-item">
            <span class="cd-label">Instagram</span>
            <span class="cd-value">@studio_aimo</span>
          </div>
        </div>
      </div>
      <form class="contact-form reveal-up" data-delay="1" onsubmit="return false;">
        <div class="cf-row">
          <div class="cf-field">
            <label>Name</label>
            <input type="text" placeholder="Your name"/>
          </div>
          <div class="cf-field">
            <label>Email</label>
            <input type="email" placeholder="your@email.com"/>
          </div>
        </div>
        <div class="cf-field">
          <label>Project type</label>
          <select>
            <option value="">Select...</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>Concept Direction</option>
            <option>Furniture Procurement</option>
            <option>Other</option>
          </select>
        </div>
        <div class="cf-row">
          <div class="cf-field">
            <label>Location</label>
            <input type="text" placeholder="City, Country"/>
          </div>
          <div class="cf-field">
            <label>Budget Range</label>
            <select>
              <option value="">Select...</option>
              <option>Under €50K</option>
              <option>€50K – €150K</option>
              <option>€150K – €500K</option>
              <option>€500K+</option>
            </select>
          </div>
        </div>
        <div class="cf-field">
          <label>Tell us about your space</label>
          <textarea rows="5" placeholder="Describe your project, timeline, and aspirations — the more you share, the better we can conjure..."></textarea>
        </div>
        <button type="submit" class="btn-primary cf-submit">
          <span>Send Enquiry</span>
          <svg viewBox="0 0 20 20" width="14" height="14"><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.3"/><polyline points="12,5 17,10 12,15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </button>
      </form>
    </div>
  </section>

  <!-- ── FOOTER ── -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">STUDIO AIMO</div>
        <p>Interior Sorcery &amp; Spatial Tailoring</p>
      </div>
      <div class="footer-links">
        <a href="#work">Work</a>
        <a href="#studio">Studio</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="footer-social">
        <a href="https://www.instagram.com/studio_aimo/" target="_blank" rel="noopener" aria-label="Instagram">@studio_aimo</a>
        <a href="#" aria-label="Pinterest">PT</a>
        <a href="#" aria-label="LinkedIn">LI</a>
      </div>
    </div>
    <div class="footer-base">
      <span>&copy; 2025 Studio Aimo. All rights reserved.</span>
      <span class="footer-tagline">Where imagination shapes reality.</span>
    </div>
  </footer>

  <script src="/static/home.js"></script>
</body>
</html>`)
})

export default app
