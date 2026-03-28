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

    <!-- Grid layers -->
    <rect width="1440" height="900" fill="url(#bp-fine)"/>
    <rect width="1440" height="900" fill="url(#bp-major)"/>
    <!-- Centre atmospheric glow -->
    <rect width="1440" height="900" fill="url(#centre-glow)" pointer-events="none"/>

    <!-- ══════════════════════════════════════════════
         ZONE A — FAR LEFT CORNER: Sectional sofa composition
    ══════════════════════════════════════════════ -->

    <!-- Grand L-shaped sectional sofa -->
    <g class="fi" id="sectional" transform="translate(-18,452) rotate(-5)" filter="url(#chalk)">
      <!-- Main body top -->
      <polygon points="0,65 260,12 322,52 62,105" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="2.0"/>
      <!-- Front face -->
      <polygon points="0,65 0,132 62,169 62,105" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.6"/>
      <!-- Right face -->
      <polygon points="62,105 62,169 322,112 322,52" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <!-- Cushion dividers vertical -->
      <line x1="86" y1="38" x2="86" y2="130" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
      <line x1="162" y1="24" x2="162" y2="116" stroke="rgba(238,235,220,0.48)" stroke-width="1.1"/>
      <line x1="240" y1="12" x2="240" y2="104" stroke="rgba(238,235,220,0.44)" stroke-width="1.0"/>
      <!-- Cushion seams -->
      <line x1="12" y1="78" x2="76" y2="60" stroke="rgba(238,235,220,0.26)" stroke-width="0.7"/>
      <line x1="20" y1="90" x2="80" y2="72" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <line x1="98" y1="60" x2="158" y2="44" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <line x1="106" y1="72" x2="162" y2="56" stroke="rgba(238,235,220,0.16)" stroke-width="0.5"/>
      <line x1="178" y1="47" x2="236" y2="31" stroke="rgba(238,235,220,0.22)" stroke-width="0.6"/>
      <line x1="185" y1="59" x2="242" y2="43" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <!-- Back cushions top -->
      <polygon points="0,65 8,18 250,-24 242,14" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.8"/>
      <!-- Back cushion dividers -->
      <line x1="82" y1="-4" x2="82" y2="38" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <line x1="164" y1="-16" x2="164" y2="26" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <line x1="210" y1="-22" x2="210" y2="16" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <!-- Backrest side -->
      <polygon points="8,18 8,66 0,65 0,18" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Armrest left -->
      <polygon points="0,65 -16,52 -16,118 0,132" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <polygon points="-16,52 8,20 8,18 -16,50" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <ellipse cx="-8" cy="52" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8" transform="skewX(-15)"/>
      <!-- Armrest right -->
      <polygon points="242,14 258,6 258,66 242,72" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.3"/>
      <ellipse cx="250" cy="6" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8" transform="skewX(-15)"/>
      <!-- Legs -->
      <line x1="10" y1="126" x2="10" y2="152" stroke="rgba(238,235,220,0.65)" stroke-width="1.6"/>
      <line x1="60" y1="167" x2="60" y2="193" stroke="rgba(238,235,220,0.58)" stroke-width="1.5"/>
      <line x1="300" y1="112" x2="300" y2="138" stroke="rgba(238,235,220,0.55)" stroke-width="1.4"/>
      <!-- L-extension chaise -->
      <polygon points="0,132 -90,104 -90,186 0,214" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.6"/>
      <polygon points="-90,104 -90,186 -14,200 -14,118" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <polygon points="0,132 -90,104 -14,82 0,110" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Chaise cushion divider -->
      <line x1="-45" y1="110" x2="-45" y2="193" stroke="rgba(238,235,220,0.38)" stroke-width="0.9"/>
      <line x1="-14" y1="90" x2="-14" y2="120" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <!-- Chaise seams -->
      <line x1="-80" y1="120" x2="-16" y2="96" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="-76" y1="134" x2="-12" y2="110" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <!-- Pillow on chaise -->
      <polygon points="-65,115 -30,104 -22,118 -57,129" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <line x1="-43" y1="108" x2="-43" y2="126" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Extension ref lines -->
      <line x1="-110" y1="145" x2="-148" y2="162" stroke="rgba(238,235,220,0.07)" stroke-width="0.4" stroke-dasharray="4,7"/>
    </g>

    <!-- Coffee table — marble top with hairpin legs -->
    <g class="fi" id="ct-main" transform="translate(88,636) rotate(-4)" filter="url(#chalk)">
      <polygon points="0,30 210,0 252,24 42,54" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="1.9"/>
      <polygon points="0,30 0,46 42,70 42,54" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <polygon points="42,54 42,70 252,40 252,24" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <!-- Marble top detail circles -->
      <ellipse cx="126" cy="26" rx="50" ry="15" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7" transform="skewX(-8)"/>
      <ellipse cx="126" cy="26" rx="32" ry="10" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.5" transform="skewX(-8)"/>
      <!-- Marble veining -->
      <path d="M80,18 Q110,12 126,22 Q142,32 160,16" fill="none" stroke="rgba(238,235,220,0.12)" stroke-width="0.5"/>
      <path d="M60,28 Q90,22 115,30" fill="none" stroke="rgba(238,235,220,0.09)" stroke-width="0.4"/>
      <!-- Hairpin legs (2 per corner) -->
      <line x1="14" y1="44" x2="8" y2="102" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="14" y1="44" x2="24" y2="102" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="40" y1="66" x2="34" y2="124" stroke="rgba(238,235,220,0.65)" stroke-width="1.4"/>
      <line x1="40" y1="66" x2="50" y2="124" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="228" y1="28" x2="222" y2="86" stroke="rgba(238,235,220,0.65)" stroke-width="1.4"/>
      <line x1="228" y1="28" x2="238" y2="86" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Books & decor on table -->
      <rect x="62" y="10" width="30" height="9" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9" transform="skewX(-10) translate(0,5)"/>
      <rect x="64" y="6" width="26" height="9" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.7" transform="skewX(-10) translate(0,2)"/>
      <rect x="100" y="12" width="20" height="7" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" transform="skewX(-10) translate(0,4)"/>
      <!-- Candle on table -->
      <rect x="170" y="10" width="8" height="14" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" transform="skewX(-10)"/>
      <line x1="174" y1="8" x2="174" y2="4" stroke="rgba(238,235,220,0.42)" stroke-width="0.8" transform="skewX(-10)"/>
      <circle cx="174" cy="3" r="1.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
    </g>

    <!-- Organic rug with border pattern -->
    <g class="fi" id="rug-a" transform="translate(-40,598) rotate(-4)" filter="url(#chalk-fine)">
      <polygon points="0,58 350,0 422,40 72,98" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="1.2" stroke-dasharray="8,3"/>
      <polygon points="16,57 336,5 408,43 88,95" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.7" stroke-dasharray="6,4"/>
      <polygon points="32,56 322,10 394,46 104,92" fill="none" stroke="rgba(238,235,220,0.14)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <!-- Interior pattern -->
      <line x1="88" y1="34" x2="210" y2="18" stroke="rgba(238,235,220,0.10)" stroke-width="0.5"/>
      <line x1="98" y1="48" x2="220" y2="32" stroke="rgba(238,235,220,0.09)" stroke-width="0.4"/>
      <line x1="135" y1="16" x2="150" y2="72" stroke="rgba(238,235,220,0.09)" stroke-width="0.4"/>
      <line x1="210" y1="6" x2="225" y2="62" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
      <line x1="170" y1="12" x2="185" y2="68" stroke="rgba(238,235,220,0.07)" stroke-width="0.3"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE B — TOP / TOP-LEFT: Pendants + art wall + pot
    ══════════════════════════════════════════════ -->

    <!-- Triple pendant cluster -->
    <g class="fi" id="pendants" transform="translate(185,-8)" filter="url(#chalk)">
      <!-- Pendant 1 — large flared dome -->
      <line x1="62" y1="0" x2="62" y2="56" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <!-- Ceiling canopy -->
      <ellipse cx="62" cy="50" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Dome top ellipse -->
      <ellipse cx="62" cy="90" rx="54" ry="18" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="1.9"/>
      <!-- Dome sides -->
      <line x1="8" y1="90" x2="20" y2="138" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <line x1="116" y1="90" x2="104" y2="138" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <!-- Bottom ellipse -->
      <ellipse cx="62" cy="138" rx="36" ry="12" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <!-- Interior dome curve -->
      <ellipse cx="62" cy="112" rx="44" ry="14" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <!-- Dome ribs -->
      <line x1="36" y1="76" x2="38" y2="142" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <line x1="62" y1="72" x2="62" y2="150" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="88" y1="76" x2="86" y2="142" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <!-- Bulb glow -->
      <circle cx="62" cy="132" r="7" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1" filter="url(#glow-micro)"/>
      <circle cx="62" cy="132" r="3" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <!-- Light cone dashed -->
      <line x1="20" y1="144" x2="-8" y2="212" stroke="rgba(238,235,220,0.08)" stroke-width="0.6" stroke-dasharray="4,6"/>
      <line x1="104" y1="144" x2="132" y2="212" stroke="rgba(238,235,220,0.08)" stroke-width="0.6" stroke-dasharray="4,6"/>
      <line x1="62" y1="150" x2="62" y2="218" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,7"/>

      <!-- Pendant 2 — conical industrial -->
      <line x1="210" y1="0" x2="210" y2="38" stroke="rgba(238,235,220,0.66)" stroke-width="1.2"/>
      <ellipse cx="210" cy="32" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <polygon points="176,38 244,38 230,96 190,96" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <ellipse cx="210" cy="96" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <ellipse cx="210" cy="68" rx="34" ry="11" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="3,4"/>
      <!-- Shade ribs -->
      <line x1="194" y1="40" x2="192" y2="94" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="226" y1="40" x2="228" y2="94" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <circle cx="210" cy="93" r="5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>

      <!-- Pendant 3 — sphere globe -->
      <line x1="328" y1="0" x2="328" y2="50" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <ellipse cx="328" cy="44" rx="10" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <circle cx="328" cy="78" r="28" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <!-- Globe latitude/longitude lines -->
      <ellipse cx="328" cy="78" rx="28" ry="10" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <ellipse cx="328" cy="67" rx="22" ry="8" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5" stroke-dasharray="2,5"/>
      <line x1="300" y1="78" x2="356" y2="78" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="328" y1="50" x2="328" y2="106" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <circle cx="328" cy="76" r="5" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
    </g>

    <!-- Tall potted plant / sculptural tree -->
    <g class="fi" id="plant-tall" transform="translate(22,130)" filter="url(#chalk)">
      <!-- Pot base -->
      <polygon points="8,158 52,148 58,172 14,182" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <polygon points="8,158 14,182 14,210 8,186" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <polygon points="14,182 14,210 58,200 58,172" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <polygon points="2,138 60,126 64,150 6,162" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <polygon points="2,138 6,162 6,180 2,156" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <polygon points="6,162 6,180 64,168 64,150" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Soil ring -->
      <ellipse cx="33" cy="128" rx="30" ry="10" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <!-- Main trunk -->
      <line x1="32" y1="126" x2="28" y2="40" stroke="rgba(238,235,220,0.75)" stroke-width="2.2"/>
      <!-- Branches -->
      <line x1="28" y1="80" x2="-12" y2="42" stroke="rgba(238,235,220,0.62)" stroke-width="1.5"/>
      <line x1="28" y1="60" x2="64" y2="20" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <line x1="28" y1="50" x2="-4" y2="8" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <line x1="28" y1="42" x2="52" y2="0" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- Sub-branches -->
      <line x1="-2" y1="60" x2="-24" y2="48" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="-2" y1="60" x2="-18" y2="38" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="50" y1="38" x2="72" y2="26" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="50" y1="38" x2="66" y2="12" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <!-- Leaf tufts (small circles) -->
      <circle cx="-22" cy="44" r="4" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.7"/>
      <circle cx="-14" cy="34" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="70" cy="22" r="4" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <circle cx="56" cy="4" r="3.5" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="-2" cy="4" r="4" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
    </g>

    <!-- Art panel A — large abstract -->
    <g class="fi" id="wall-art-a" transform="translate(120,195)" filter="url(#chalk)">
      <rect x="0" y="0" width="118" height="155" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.7"/>
      <!-- ISO depth right side -->
      <polygon points="118,0 136,14 136,169 118,155" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.2"/>
      <polygon points="0,0 118,0 136,14 18,14" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.3"/>
      <!-- Inner mat -->
      <rect x="10" y="10" width="98" height="135" fill="none" stroke="rgba(238,235,220,0.25)" stroke-width="0.6"/>
      <!-- Abstract art content -->
      <circle cx="59" cy="77" r="36" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.9"/>
      <circle cx="59" cy="77" r="20" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.6"/>
      <circle cx="59" cy="77" r="9" fill="none" stroke="rgba(238,235,220,0.16)" stroke-width="0.5"/>
      <line x1="14" y1="18" x2="104" y2="136" stroke="rgba(238,235,220,0.26)" stroke-width="0.7"/>
      <line x1="104" y1="18" x2="14" y2="136" stroke="rgba(238,235,220,0.20)" stroke-width="0.6"/>
      <line x1="59" y1="14" x2="59" y2="140" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <line x1="14" y1="77" x2="104" y2="77" stroke="rgba(238,235,220,0.16)" stroke-width="0.5"/>
      <!-- Hanging wire -->
      <line x1="40" y1="0" x2="38" y2="-24" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <line x1="78" y1="0" x2="76" y2="-24" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="38" y1="-24" x2="59" y2="-32" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="76" y1="-24" x2="59" y2="-32" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <circle cx="59" cy="-32" r="3" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
    </g>

    <!-- Art panel B — smaller portrait -->
    <g class="fi" id="wall-art-b" transform="translate(268,230)" filter="url(#chalk)">
      <rect x="0" y="0" width="80" height="102" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.5"/>
      <polygon points="80,0 96,12 96,114 80,102" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="1.1"/>
      <polygon points="0,0 80,0 96,12 16,12" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.2"/>
      <rect x="8" y="8" width="64" height="86" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Abstract lines -->
      <line x1="10" y1="14" x2="72" y2="88" stroke="rgba(238,235,220,0.24)" stroke-width="0.7"/>
      <line x1="40" y1="12" x2="40" y2="88" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <ellipse cx="40" cy="50" rx="24" ry="30" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.6"/>
      <!-- Wire -->
      <line x1="28" y1="0" x2="28" y2="-18" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="52" y1="0" x2="52" y2="-18" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="28" y1="-18" x2="40" y2="-24" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <line x1="52" y1="-18" x2="40" y2="-24" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE C — CENTER: Dining composition + chandelier
    ══════════════════════════════════════════════ -->

    <!-- Chandelier above dining table -->
    <g class="fi" id="chandelier" transform="translate(500,0)" filter="url(#chalk)">
      <!-- Drop chain -->
      <line x1="120" y1="0" x2="120" y2="48" stroke="rgba(238,235,220,0.65)" stroke-width="1.2" stroke-dasharray="4,3"/>
      <!-- Ceiling cup -->
      <ellipse cx="120" cy="48" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.1"/>
      <!-- Main ring -->
      <ellipse cx="120" cy="80" rx="72" ry="24" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <ellipse cx="120" cy="88" rx="66" ry="22" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <!-- Arms/stems radiating from ring -->
      <line x1="48" y1="80" x2="38" y2="120" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <line x1="82" y1="66" x2="76" y2="106" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <line x1="120" y1="56" x2="120" y2="96" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <line x1="158" y1="66" x2="164" y2="106" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <line x1="192" y1="80" x2="202" y2="120" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <!-- Candle cups + candles -->
      <ellipse cx="38" cy="122" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <rect x="34" y="108" width="8" height="14" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9" transform="skewX(-5)"/>
      <circle cx="38" cy="107" r="2" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="76" cy="108" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <rect x="73" y="95" width="7" height="13" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <circle cx="76" cy="94" r="2" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="120" cy="98" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <rect x="116" y="84" width="8" height="14" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <circle cx="120" cy="83" r="2.2" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="164" cy="108" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.0"/>
      <rect x="161" y="95" width="7" height="13" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <circle cx="164" cy="94" r="2" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="202" cy="122" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <rect x="198" y="108" width="8" height="14" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <circle cx="202" cy="107" r="2" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Light cones -->
      <line x1="34" y1="122" x2="14" y2="180" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="42" y1="122" x2="62" y2="180" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="116" y1="98" x2="96" y2="156" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="124" y1="98" x2="144" y2="156" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
    </g>

    <!-- Grand dining table — isometric perspective -->
    <g class="fi" id="dining-tbl" transform="translate(412,310) rotate(-2)" filter="url(#chalk)">
      <!-- Tabletop -->
      <polygon points="0,52 280,0 362,44 82,96" fill="none" stroke="rgba(238,235,220,0.94)" stroke-width="2.1"/>
      <!-- Front thickness -->
      <polygon points="0,52 0,68 82,112 82,96" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.6"/>
      <!-- Right thickness -->
      <polygon points="82,96 82,112 362,60 362,44" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.5"/>
      <!-- Wood grain -->
      <line x1="70" y1="14" x2="84" y2="86" stroke="rgba(238,235,220,0.12)" stroke-width="0.5"/>
      <line x1="140" y1="5" x2="154" y2="77" stroke="rgba(238,235,220,0.11)" stroke-width="0.4"/>
      <line x1="210" y1="2" x2="224" y2="74" stroke="rgba(238,235,220,0.10)" stroke-width="0.4"/>
      <line x1="280" y1="0" x2="294" y2="72" stroke="rgba(238,235,220,0.09)" stroke-width="0.4"/>
      <!-- Table legs — tapered square section -->
      <line x1="24" y1="60" x2="24" y2="152" stroke="rgba(238,235,220,0.72)" stroke-width="1.8"/>
      <line x1="22" y1="60" x2="20" y2="152" stroke="rgba(238,235,220,0.42)" stroke-width="0.6"/>
      <line x1="78" y1="100" x2="78" y2="192" stroke="rgba(238,235,220,0.68)" stroke-width="1.7"/>
      <line x1="338" y1="46" x2="338" y2="138" stroke="rgba(238,235,220,0.68)" stroke-width="1.7"/>
      <line x1="280" y1="6" x2="280" y2="98" stroke="rgba(238,235,220,0.68)" stroke-width="1.7"/>
      <!-- Foot detail -->
      <line x1="20" y1="148" x2="28" y2="148" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <line x1="74" y1="188" x2="82" y2="188" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Cross stretcher -->
      <line x1="24" y1="122" x2="78" y2="158" stroke="rgba(238,235,220,0.26)" stroke-width="0.8" stroke-dasharray="6,4"/>
      <line x1="280" y1="62" x2="338" y2="98" stroke="rgba(238,235,220,0.26)" stroke-width="0.8" stroke-dasharray="6,4"/>
      <!-- Table runner cloth -->
      <polygon points="55,22 245,0 268,16 78,38" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7" stroke-dasharray="5,3"/>
      <!-- Centre vase on table -->
      <ellipse cx="185" cy="46" rx="14" ry="4.5" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="171" y1="46" x2="168" y2="18" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <line x1="199" y1="46" x2="202" y2="18" stroke="rgba(238,235,220,0.53)" stroke-width="1.0"/>
      <ellipse cx="185" cy="18" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Twigs in vase -->
      <line x1="185" y1="14" x2="178" y2="-12" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <line x1="178" y1="-2" x2="168" y2="-20" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <line x1="178" y1="-2" x2="190" y2="-26" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="168" cy="-22" r="2.5" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <circle cx="190" cy="-28" r="2.5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
    </g>

    <!-- Dining chair 1 — left side -->
    <g class="fi" id="dc-1" transform="translate(374,416) rotate(-5)" filter="url(#chalk)">
      <polygon points="0,30 76,8 98,30 22,52" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.7"/>
      <polygon points="76,8 98,30 98,58 76,36" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="0,30 0,58 22,78 22,52" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Cushion button -->
      <circle cx="48" cy="34" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <!-- Backrest uprights -->
      <line x1="2" y1="28" x2="2" y2="-42" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <line x1="22" y1="22" x2="22" y2="-46" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <!-- Top rail with carved detail -->
      <line x1="2" y1="-42" x2="22" y2="-46" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <line x1="2" y1="-48" x2="22" y2="-52" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <!-- Mid splats -->
      <line x1="2" y1="-16" x2="22" y2="-20" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="2" y1="4" x2="22" y2="0" stroke="rgba(238,235,220,0.40)" stroke-width="0.9"/>
      <!-- Legs -->
      <line x1="2" y1="56" x2="2" y2="82" stroke="rgba(238,235,220,0.68)" stroke-width="1.5"/>
      <line x1="20" y1="74" x2="20" y2="100" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <line x1="76" y1="34" x2="76" y2="60" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <line x1="94" y1="56" x2="94" y2="82" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <!-- Stretcher bar -->
      <line x1="2" y1="70" x2="94" y2="70" stroke="rgba(238,235,220,0.24)" stroke-width="0.6" stroke-dasharray="3,5"/>
    </g>

    <!-- Dining chair 2 — right side -->
    <g class="fi" id="dc-2" transform="translate(692,374) rotate(4)" filter="url(#chalk)">
      <polygon points="0,30 76,8 98,30 22,52" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <polygon points="76,8 98,30 98,58 76,36" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <polygon points="0,30 0,58 22,78 22,52" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <circle cx="48" cy="34" r="3" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <line x1="2" y1="28" x2="2" y2="-42" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <line x1="22" y1="22" x2="22" y2="-46" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="2" y1="-42" x2="22" y2="-46" stroke="rgba(238,235,220,0.76)" stroke-width="1.6"/>
      <line x1="2" y1="-48" x2="22" y2="-52" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <line x1="2" y1="-16" x2="22" y2="-20" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="2" y1="4" x2="22" y2="0" stroke="rgba(238,235,220,0.38)" stroke-width="0.9"/>
      <line x1="2" y1="56" x2="2" y2="82" stroke="rgba(238,235,220,0.66)" stroke-width="1.5"/>
      <line x1="20" y1="74" x2="20" y2="100" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <line x1="76" y1="34" x2="76" y2="60" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <line x1="94" y1="56" x2="94" y2="82" stroke="rgba(238,235,220,0.56)" stroke-width="1.3"/>
    </g>

    <!-- Dining chair 3 — front/bottom side (host seat) -->
    <g class="fi" id="dc-3" transform="translate(488,476) rotate(0)" filter="url(#chalk)">
      <polygon points="0,22 86,0 108,20 22,42" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="86,0 108,20 108,48 86,28" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <polygon points="0,22 0,50 22,70 22,42" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="2" y1="20" x2="2" y2="-38" stroke="rgba(238,235,220,0.74)" stroke-width="1.5"/>
      <line x1="22" y1="12" x2="22" y2="-44" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="2" y1="-38" x2="22" y2="-44" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <line x1="2" y1="-14" x2="22" y2="-18" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="2" y1="4" x2="22" y2="0" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <line x1="2" y1="48" x2="2" y2="70" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <line x1="20" y1="66" x2="20" y2="88" stroke="rgba(238,235,220,0.56)" stroke-width="1.3"/>
      <line x1="86" y1="26" x2="86" y2="48" stroke="rgba(238,235,220,0.56)" stroke-width="1.3"/>
      <line x1="104" y1="46" x2="104" y2="68" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
    </g>

    <!-- Dining chair 4 — back side -->
    <g class="fi" id="dc-4" transform="translate(540,264) rotate(-2)" filter="url(#chalk)">
      <polygon points="0,22 86,0 108,20 22,42" fill="none" stroke="rgba(238,235,220,0.74)" stroke-width="1.4"/>
      <polygon points="86,0 108,20 108,48 86,28" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <polygon points="0,22 0,50 22,70 22,42" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="2" y1="20" x2="2" y2="-32" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <line x1="22" y1="12" x2="22" y2="-38" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="2" y1="-32" x2="22" y2="-38" stroke="rgba(238,235,220,0.66)" stroke-width="1.3"/>
      <line x1="2" y1="-10" x2="22" y2="-14" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="2" y1="46" x2="2" y2="66" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <line x1="20" y1="62" x2="20" y2="82" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="86" y1="24" x2="86" y2="44" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="104" y1="44" x2="104" y2="64" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE D — RIGHT: Kitchen wall + bar stools + details
    ══════════════════════════════════════════════ -->

    <!-- Full kitchen run -->
    <g class="fi" id="kitchen-run" transform="translate(858,148) rotate(3)" filter="url(#chalk)">
      <!-- Worktop top face -->
      <polygon points="0,38 318,0 340,24 22,62" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="2.0"/>
      <!-- Worktop front thickness -->
      <polygon points="0,38 0,54 22,70 22,62" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <polygon points="22,62 22,70 340,40 340,24" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Base unit body front -->
      <polygon points="0,54 0,155 22,172 22,70" fill="none" stroke="rgba(238,235,220,0.74)" stroke-width="1.5"/>
      <!-- Base unit body right -->
      <polygon points="22,70 22,172 340,140 340,40" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <!-- Cabinet door lines front -->
      <line x1="0" y1="54" x2="22" y2="70" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Door dividers vertical on side face -->
      <line x1="96" y1="48" x2="96" y2="148" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="172" y1="35" x2="172" y2="132" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="248" y1="24" x2="248" y2="120" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Door panel recessed insets -->
      <rect x="26" y="77" width="62" height="58" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7" transform="skewX(-8) translate(0,8)"/>
      <rect x="104" y="64" width="62" height="58" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6" transform="skewX(-8) translate(0,5)"/>
      <rect x="182" y="52" width="62" height="58" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.6" transform="skewX(-8) translate(0,3)"/>
      <!-- Handles -->
      <line x1="56" y1="102" x2="56" y2="116" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <line x1="134" y1="90" x2="134" y2="104" stroke="rgba(238,235,220,0.52)" stroke-width="1.3"/>
      <line x1="212" y1="78" x2="212" y2="92" stroke="rgba(238,235,220,0.50)" stroke-width="1.2"/>
      <line x1="290" y1="68" x2="290" y2="82" stroke="rgba(238,235,220,0.46)" stroke-width="1.1"/>
      <!-- Induction hob — 4 burners -->
      <rect x="38" y="18" width="72" height="18" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" transform="skewX(-12)"/>
      <circle cx="58" cy="24" r="5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8" transform="skewX(-10)"/>
      <circle cx="78" cy="20" r="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" transform="skewX(-10)"/>
      <circle cx="98" cy="24" r="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" transform="skewX(-10)"/>
      <circle cx="118" cy="20" r="4" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.7" transform="skewX(-10)"/>
      <!-- Sink basin -->
      <ellipse cx="228" cy="19" rx="32" ry="11" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.3" transform="skewX(-10)"/>
      <ellipse cx="228" cy="19" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9" transform="skewX(-10)"/>
      <!-- Tap -->
      <line x1="258" y1="20" x2="258" y2="0" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <path d="M258,0 Q274,0 274,14" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="274" y1="14" x2="274" y2="22" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <ellipse cx="274" cy="22" rx="4" ry="2" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- Upper wall cabinet run -->
      <polygon points="10,-68 318,-108 340,-86 32,-46" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <polygon points="318,-108 340,-86 340,-32 318,-54" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <polygon points="10,-68 10,-14 32,-2 32,-46" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="116" y1="-88" x2="116" y2="-34" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="218" y1="-100" x2="218" y2="-46" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="284" y1="-106" x2="284" y2="-52" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <!-- Upper cabinet handles -->
      <line x1="62" y1="-46" x2="62" y2="-38" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="165" y1="-60" x2="165" y2="-52" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="248" y1="-72" x2="248" y2="-64" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Oven in base unit - glass door hint -->
      <rect x="258" y="68" width="68" height="58" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.8" transform="skewX(-8) translate(0,5)"/>
      <rect x="264" y="74" width="56" height="46" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.5" transform="skewX(-8) translate(0,5)"/>
      <circle cx="280" cy="97" r="4" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7" transform="skewX(-8)"/>
    </g>

    <!-- Bar stool 1 — swivel with backrest -->
    <g class="fi" id="bst-1" transform="translate(996,380) rotate(-3)" filter="url(#chalk)">
      <!-- Seat -->
      <ellipse cx="32" cy="16" rx="32" ry="11" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <ellipse cx="32" cy="22" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9"/>
      <!-- Seat cushion tufts -->
      <circle cx="32" cy="16" r="4" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <!-- Pole -->
      <line x1="8" y1="24" x2="4" y2="112" stroke="rgba(238,235,220,0.74)" stroke-width="1.6"/>
      <line x1="56" y1="24" x2="60" y2="112" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Foot ring -->
      <ellipse cx="32" cy="88" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="8" y1="88" x2="4" y2="112" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="56" y1="88" x2="60" y2="112" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- Floor base star -->
      <ellipse cx="32" cy="112" rx="16" ry="5.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="16" y1="112" x2="8" y2="122" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="48" y1="112" x2="56" y2="122" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="32" y1="117" x2="32" y2="128" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- Backrest curved arc -->
      <path d="M8,24 Q-8,0 8,-20 Q22,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <path d="M56,24 Q72,0 56,-20 Q42,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="8" y1="-20" x2="56" y2="-20" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="8" y1="-8" x2="56" y2="-8" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
    </g>

    <!-- Bar stool 2 -->
    <g class="fi" id="bst-2" transform="translate(1078,352) rotate(2)" filter="url(#chalk)">
      <ellipse cx="32" cy="16" rx="32" ry="11" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <ellipse cx="32" cy="22" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <circle cx="32" cy="16" r="4" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <line x1="8" y1="24" x2="4" y2="112" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="56" y1="24" x2="60" y2="112" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <ellipse cx="32" cy="88" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <ellipse cx="32" cy="112" rx="16" ry="5.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.9"/>
      <line x1="16" y1="112" x2="8" y2="122" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="48" y1="112" x2="56" y2="122" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <path d="M8,24 Q-8,0 8,-20 Q22,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <path d="M56,24 Q72,0 56,-20 Q42,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="8" y1="-20" x2="56" y2="-20" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
    </g>

    <!-- Bar stool 3 -->
    <g class="fi" id="bst-3" transform="translate(1158,368) rotate(-1)" filter="url(#chalk)">
      <ellipse cx="32" cy="16" rx="32" ry="11" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <ellipse cx="32" cy="22" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.8"/>
      <line x1="8" y1="24" x2="4" y2="112" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <line x1="56" y1="24" x2="60" y2="112" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <ellipse cx="32" cy="88" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <ellipse cx="32" cy="112" rx="16" ry="5.5" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <path d="M8,24 Q-8,0 8,-20 Q22,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <path d="M56,24 Q72,0 56,-20 Q42,-34 32,-32" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <line x1="8" y1="-20" x2="56" y2="-20" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE E — FAR RIGHT: Shelving + reading corner
    ══════════════════════════════════════════════ -->

    <!-- Tall open shelving system — industrial metal frame -->
    <g class="fi" id="shelving" transform="translate(1236,162) rotate(-2)" filter="url(#chalk)">
      <!-- Outer frame -->
      <rect x="0" y="0" width="92" height="360" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.8"/>
      <!-- ISO right panel -->
      <polygon points="92,0 124,24 124,384 92,360" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Top panel -->
      <polygon points="0,0 92,0 124,24 32,24" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.6"/>
      <!-- Industrial cross-brace back panel -->
      <line x1="0" y1="0" x2="92" y2="360" stroke="rgba(238,235,220,0.12)" stroke-width="0.5" stroke-dasharray="4,8"/>
      <line x1="92" y1="0" x2="0" y2="360" stroke="rgba(238,235,220,0.10)" stroke-width="0.4" stroke-dasharray="4,8"/>
      <!-- Shelf boards — 5 shelves -->
      <line x1="0" y1="72" x2="92" y2="72" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="92,72 124,96 124,96 92,72" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="0" y1="144" x2="92" y2="144" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="92,144 124,168 124,168 92,144" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="0" y1="216" x2="92" y2="216" stroke="rgba(238,235,220,0.66)" stroke-width="1.3"/>
      <polygon points="92,216 124,240 124,240 92,216" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="0" y1="288" x2="92" y2="288" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <!-- Books shelf 1 — varied widths -->
      <line x1="6" y1="8" x2="6" y2="70" stroke="rgba(238,235,220,0.55)" stroke-width="2.4"/>
      <line x1="18" y1="8" x2="18" y2="70" stroke="rgba(238,235,220,0.46)" stroke-width="3.2"/>
      <line x1="30" y1="8" x2="30" y2="70" stroke="rgba(238,235,220,0.52)" stroke-width="2.6"/>
      <line x1="42" y1="8" x2="42" y2="70" stroke="rgba(238,235,220,0.42)" stroke-width="2.1"/>
      <line x1="52" y1="14" x2="52" y2="70" stroke="rgba(238,235,220,0.50)" stroke-width="2.4"/>
      <line x1="64" y1="8" x2="64" y2="70" stroke="rgba(238,235,220,0.44)" stroke-width="3.6"/>
      <line x1="76" y1="10" x2="76" y2="70" stroke="rgba(238,235,220,0.40)" stroke-width="2.2"/>
      <!-- Leaning book -->
      <line x1="84" y1="10" x2="82" y2="70" stroke="rgba(238,235,220,0.38)" stroke-width="2.0" transform="rotate(8,84,70)"/>
      <!-- Books shelf 2 -->
      <line x1="6" y1="80" x2="6" y2="142" stroke="rgba(238,235,220,0.46)" stroke-width="2.6"/>
      <line x1="16" y1="80" x2="16" y2="142" stroke="rgba(238,235,220,0.40)" stroke-width="2.1"/>
      <line x1="28" y1="80" x2="28" y2="142" stroke="rgba(238,235,220,0.48)" stroke-width="3.2"/>
      <line x1="40" y1="80" x2="40" y2="142" stroke="rgba(238,235,220,0.38)" stroke-width="2.1"/>
      <line x1="52" y1="84" x2="52" y2="142" stroke="rgba(238,235,220,0.44)" stroke-width="2.6"/>
      <line x1="66" y1="80" x2="66" y2="142" stroke="rgba(238,235,220,0.38)" stroke-width="2.1"/>
      <line x1="78" y1="80" x2="78" y2="142" stroke="rgba(238,235,220,0.42)" stroke-width="3.2"/>
      <!-- Decorative shelf 3 — vase, books, plant -->
      <ellipse cx="20" cy="186" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="6" y1="186" x2="10" y2="214" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="34" y1="186" x2="30" y2="214" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <ellipse cx="20" cy="214" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- Cactus on shelf 3 -->
      <line x1="56" y1="214" x2="56" y2="168" stroke="rgba(238,235,220,0.48)" stroke-width="1.5"/>
      <ellipse cx="56" cy="214" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <line x1="42" y1="190" x2="56" y2="184" stroke="rgba(238,235,220,0.35)" stroke-width="0.9"/>
      <line x1="70" y1="194" x2="56" y2="186" stroke="rgba(238,235,220,0.33)" stroke-width="0.8"/>
      <!-- Small art frame on shelf 3 -->
      <rect x="62" y="154" width="24" height="32" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <line x1="66" y1="158" x2="82" y2="182" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="82" y1="158" x2="66" y2="182" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <!-- Books shelf 4 -->
      <line x1="6" y1="224" x2="6" y2="286" stroke="rgba(238,235,220,0.40)" stroke-width="2.2"/>
      <line x1="18" y1="224" x2="18" y2="286" stroke="rgba(238,235,220,0.36)" stroke-width="1.9"/>
      <line x1="28" y1="224" x2="28" y2="286" stroke="rgba(238,235,220,0.42)" stroke-width="2.8"/>
      <line x1="40" y1="224" x2="40" y2="286" stroke="rgba(238,235,220,0.34)" stroke-width="1.8"/>
      <line x1="50" y1="228" x2="50" y2="286" stroke="rgba(238,235,220,0.40)" stroke-width="2.2"/>
    </g>

    <!-- Reading armchair — deep cushioned -->
    <g class="fi" id="armchair-r" transform="translate(1030,578) rotate(5)" filter="url(#chalk)">
      <!-- Seat surface -->
      <polygon points="0,52 152,20 184,48 32,80" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.9"/>
      <!-- Seat front face -->
      <polygon points="0,52 0,104 32,130 32,80" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <!-- Seat right face -->
      <polygon points="32,80 32,130 184,98 184,48" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Seat cushion seams -->
      <line x1="14" y1="60" x2="168" y2="28" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <line x1="8" y1="68" x2="162" y2="36" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <!-- Button tufts -->
      <circle cx="60" cy="52" r="3" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <circle cx="106" cy="42" r="3" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <!-- Backrest -->
      <polygon points="0,52 6,4 158,-20 152,20" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <polygon points="152,20 158,-20 184,6 184,48" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Back cushion lines -->
      <line x1="52" y1="2" x2="52" y2="46" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <line x1="100" y1="-10" x2="100" y2="34" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <line x1="132" y1="-16" x2="132" y2="26" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <!-- Armrests -->
      <polygon points="0,52 -14,40 -14,92 0,104" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <polygon points="-14,40 6,6 6,4 -14,38" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <!-- Armrest cap curve -->
      <ellipse cx="-7" cy="40" rx="9" ry="3.5" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8"/>
      <polygon points="152,20 166,10 166,60 152,68" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="159" cy="10" rx="9" ry="3.5" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- Legs -->
      <line x1="4" y1="102" x2="4" y2="128" stroke="rgba(238,235,220,0.68)" stroke-width="1.6"/>
      <line x1="30" y1="128" x2="30" y2="154" stroke="rgba(238,235,220,0.60)" stroke-width="1.5"/>
      <line x1="166" y1="96" x2="166" y2="122" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <line x1="182" y1="70" x2="182" y2="96" stroke="rgba(238,235,220,0.56)" stroke-width="1.4"/>
      <!-- Throw blanket suggestion -->
      <path d="M4,50 Q18,42 32,52 Q46,62 58,46" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7" stroke-dasharray="4,3"/>
    </g>

    <!-- Arched floor lamp beside armchair -->
    <g class="fi" id="floor-lamp-r" transform="translate(1198,440) rotate(-4)" filter="url(#chalk)">
      <!-- Weighted round base -->
      <ellipse cx="34" cy="275" rx="30" ry="10" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <ellipse cx="34" cy="282" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="34" cy="272" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Main pole -->
      <line x1="34" y1="270" x2="34" y2="72" stroke="rgba(238,235,220,0.84)" stroke-width="2.0"/>
      <!-- Detail ring on pole -->
      <ellipse cx="34" cy="180" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <!-- Arched arm -->
      <path d="M34,72 Q34,30 72,16" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.6"/>
      <!-- Drum shade -->
      <ellipse cx="84" cy="12" rx="36" ry="11" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.9"/>
      <line x1="48" y1="12" x2="50" y2="52" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <line x1="120" y1="12" x2="118" y2="52" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <ellipse cx="84" cy="52" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Shade internal ribs -->
      <line x1="66" y1="6" x2="66" y2="54" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="84" y1="3" x2="84" y2="55" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="102" y1="6" x2="102" y2="54" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <!-- Bulb visible at bottom -->
      <circle cx="84" cy="50" r="6" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0" filter="url(#glow-micro)"/>
      <!-- Light cone dashed -->
      <line x1="50" y1="52" x2="28" y2="108" stroke="rgba(238,235,220,0.09)" stroke-width="0.6" stroke-dasharray="4,5"/>
      <line x1="118" y1="52" x2="140" y2="108" stroke="rgba(238,235,220,0.09)" stroke-width="0.6" stroke-dasharray="4,5"/>
      <line x1="84" y1="55" x2="84" y2="111" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
    </g>

    <!-- Round side table with table lamp -->
    <g class="fi" id="side-tbl-r" transform="translate(912,636) rotate(-3)" filter="url(#chalk)">
      <!-- Table top ellipse -->
      <ellipse cx="46" cy="26" rx="46" ry="15" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <ellipse cx="46" cy="32" rx="46" ry="15" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- Turned leg column -->
      <line x1="0" y1="26" x2="0" y2="106" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="92" y1="26" x2="92" y2="106" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <!-- Detail bulge on legs -->
      <ellipse cx="0" cy="66" rx="3" ry="2" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <ellipse cx="92" cy="66" rx="3" ry="2" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Bottom shelf ring -->
      <ellipse cx="46" cy="106" rx="46" ry="15" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Book on lower shelf -->
      <rect x="18" y="100" width="30" height="8" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" transform="skewX(-10)"/>
      <!-- Table lamp on top surface -->
      <ellipse cx="46" cy="22" rx="11" ry="4" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <line x1="46" y1="18" x2="46" y2="-34" stroke="rgba(238,235,220,0.74)" stroke-width="1.4"/>
      <!-- Mid body lamp detail -->
      <ellipse cx="46" cy="-8" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <!-- Shade -->
      <polygon points="20,-34 72,-34 62,-6 30,-6" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <ellipse cx="46" cy="-6" rx="18" ry="5.5" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <ellipse cx="46" cy="-34" rx="26" ry="8" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0"/>
      <!-- Shade ribs -->
      <line x1="32" y1="-32" x2="30" y2="-8" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="46" y1="-42" x2="46" y2="-6" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="60" y1="-32" x2="62" y2="-8" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Bulb glow -->
      <circle cx="46" cy="-8" r="4" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8" filter="url(#glow-micro)"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE F — BOTTOM CENTER / RIGHT: Console, plinth, accessories
    ══════════════════════════════════════════════ -->

    <!-- Console / hallway table with mirror above -->
    <g class="fi" id="console" transform="translate(580,718) rotate(1)" filter="url(#chalk)">
      <!-- Tabletop -->
      <polygon points="0,24 210,0 242,20 32,44" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <polygon points="0,24 0,36 32,56 32,44" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <polygon points="32,44 32,56 242,32 242,20" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <!-- Drawer front hint -->
      <line x1="62" y1="46" x2="62" y2="54" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="3,4"/>
      <line x1="120" y1="38" x2="120" y2="46" stroke="rgba(238,235,220,0.26)" stroke-width="0.6" stroke-dasharray="3,4"/>
      <!-- Hairpin/trestle legs -->
      <line x1="10" y1="34" x2="10" y2="118" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="30" y1="52" x2="30" y2="136" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <line x1="218" y1="22" x2="218" y2="106" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <line x1="236" y1="32" x2="236" y2="116" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Cross braces -->
      <line x1="10" y1="74" x2="30" y2="92" stroke="rgba(238,235,220,0.28)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <line x1="218" y1="62" x2="236" y2="80" stroke="rgba(238,235,220,0.26)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <!-- Objects on console: slim vase -->
      <ellipse cx="62" cy="16" rx="10" ry="3" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0" transform="skewX(-8)"/>
      <line x1="53" y1="16" x2="56" y2="-22" stroke="rgba(238,235,220,0.54)" stroke-width="1.1" transform="skewX(-8)"/>
      <line x1="71" y1="16" x2="68" y2="-22" stroke="rgba(238,235,220,0.52)" stroke-width="1.0" transform="skewX(-8)"/>
      <ellipse cx="62" cy="-22" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9" transform="skewX(-8)"/>
      <!-- Twigs -->
      <line x1="62" y1="-22" x2="58" y2="-50" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="58" y1="-36" x2="46" y2="-56" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="46" cy="-58" r="2.2" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="58" y1="-42" x2="68" y2="-62" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <circle cx="68" cy="-64" r="2.2" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <!-- Round mirror above -->
      <ellipse cx="118" cy="-52" rx="38" ry="52" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <ellipse cx="118" cy="-52" rx="30" ry="42" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <!-- Mirror reflections - subtle diagonal -->
      <line x1="88" y1="-52" x2="148" y2="-52" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <line x1="118" y1="-104" x2="118" y2="0" stroke="rgba(238,235,220,0.12)" stroke-width="0.4"/>
      <line x1="90" y1="-80" x2="146" y2="-24" stroke="rgba(238,235,220,0.09)" stroke-width="0.3"/>
      <!-- Mirror wire hang -->
      <line x1="100" y1="-104" x2="100" y2="-120" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <line x1="136" y1="-104" x2="136" y2="-120" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <line x1="100" y1="-120" x2="118" y2="-128" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="136" y1="-120" x2="118" y2="-128" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <!-- Small candle on console right -->
      <rect x="170" y="12" width="10" height="10" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.9" transform="skewX(-8)"/>
      <line x1="175" y1="10" x2="175" y2="5" stroke="rgba(238,235,220,0.40)" stroke-width="0.8" transform="skewX(-8)"/>
      <circle cx="175" cy="4" r="1.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
    </g>

    <!-- Sculptural pedestal with abstract sculpture -->
    <g class="fi" id="plinth" transform="translate(798,690) rotate(-2)" filter="url(#chalk)">
      <!-- Top face -->
      <polygon points="0,20 64,4 82,18 18,34" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <!-- Front face -->
      <polygon points="0,20 0,128 18,142 18,34" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <!-- Right face -->
      <polygon points="18,34 18,142 82,124 82,18" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Panel inset front -->
      <rect x="2" y="26" width="14" height="96" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <!-- Panel inset right -->
      <rect x="20" y="40" width="58" height="78" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Abstract sculpture — figural torso shape -->
      <line x1="32" y1="4" x2="30" y2="-58" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Torso-like oval -->
      <ellipse cx="30" cy="-72" rx="12" ry="16" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- Head -->
      <circle cx="30" cy="-92" r="9" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <!-- Arms suggestion -->
      <line x1="18" y1="-72" x2="6" y2="-58" stroke="rgba(238,235,220,0.45)" stroke-width="0.9"/>
      <line x1="42" y1="-72" x2="54" y2="-60" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- Base/foot -->
      <ellipse cx="30" cy="-56" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
    </g>

    <!-- Wall sconce pair — statement fixtures -->
    <g class="fi" id="sconce-pair" transform="translate(828,72)" filter="url(#chalk)">
      <!-- Sconce 1 -->
      <line x1="0" y1="0" x2="0" y2="46" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <path d="M30,0 Q48,0 48,22 Q48,44 30,44" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <line x1="0" y1="44" x2="20" y2="44" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Upward shade -->
      <polygon points="30,44 52,44 64,90 16,90" fill="none" stroke="rgba(238,235,220,0.85)" stroke-width="1.7"/>
      <ellipse cx="40" cy="90" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <ellipse cx="40" cy="67" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="3,4"/>
      <!-- Bulb -->
      <circle cx="40" cy="56" r="7" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1" filter="url(#glow-micro)"/>
      <circle cx="40" cy="56" r="3" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- Light upward cone -->
      <line x1="16" y1="90" x2="2" y2="126" stroke="rgba(238,235,220,0.08)" stroke-width="0.5" stroke-dasharray="3,5"/>
      <line x1="64" y1="90" x2="78" y2="126" stroke="rgba(238,235,220,0.08)" stroke-width="0.5" stroke-dasharray="3,5"/>

      <!-- Sconce 2 — mirrored -->
      <g transform="translate(170,0) scale(-1,1)">
        <line x1="0" y1="0" x2="0" y2="46" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
        <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
        <path d="M30,0 Q48,0 48,22 Q48,44 30,44" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
        <line x1="0" y1="44" x2="20" y2="44" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
        <polygon points="30,44 52,44 64,90 16,90" fill="none" stroke="rgba(238,235,220,0.79)" stroke-width="1.6"/>
        <ellipse cx="40" cy="90" rx="24" ry="8" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
        <circle cx="40" cy="56" r="7" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0" filter="url(#glow-micro)"/>
      </g>
    </g>

    <!-- Lounge chair mid-left (standalone reading spot) -->
    <g class="fi" id="lounge-ch" transform="translate(290,546) rotate(-8)" filter="url(#chalk)">
      <polygon points="0,58 116,30 146,54 30,82" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <polygon points="116,30 146,54 146,102 116,78" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <polygon points="0,58 0,106 30,130 30,82" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Cushion seam -->
      <line x1="14" y1="66" x2="132" y2="36" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <!-- Back cushion -->
      <polygon points="0,58 8,14 124,-8 116,30" fill="none" stroke="rgba(238,235,220,0.85)" stroke-width="1.7"/>
      <polygon points="116,30 124,-8 154,16 146,54" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="40" y1="4" x2="40" y2="46" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="80" y1="-4" x2="80" y2="38" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <!-- Armrests -->
      <polygon points="0,58 -14,46 -14,94 0,106" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <polygon points="-14,46 8,16 8,14 -14,44" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <ellipse cx="-7" cy="46" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <polygon points="116,30 128,20 128,72 116,78" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="122" cy="20" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- Legs -->
      <line x1="4" y1="104" x2="4" y2="130" stroke="rgba(238,235,220,0.65)" stroke-width="1.5"/>
      <line x1="28" y1="128" x2="28" y2="154" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <line x1="128" y1="96" x2="128" y2="122" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="144" y1="70" x2="144" y2="96" stroke="rgba(238,235,220,0.54)" stroke-width="1.3"/>
      <!-- Throw pillow on armchair -->
      <polygon points="8,24 46,12 54,28 16,40" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="28" y1="16" x2="32" y2="36" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
    </g>

    <!-- Decorative vase cluster — bottom left zone -->
    <g class="fi" id="vase-cluster" transform="translate(330,780) rotate(2)" filter="url(#chalk)">
      <!-- Tall thin vase -->
      <ellipse cx="20" cy="0" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.4"/>
      <line x1="10" y1="0" x2="8" y2="-62" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="30" y1="0" x2="32" y2="-62" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <ellipse cx="20" cy="-62" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <!-- Mid belly detail -->
      <ellipse cx="20" cy="-28" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Stems/foliage from vase -->
      <line x1="20" y1="-62" x2="12" y2="-98" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="20" y1="-70" x2="30" y2="-106" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="20" y1="-78" x2="2" y2="-112" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <circle cx="12" cy="-100" r="3.5" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <circle cx="30" cy="-108" r="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="2" cy="-114" r="4" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Squat round vase beside -->
      <ellipse cx="68" cy="0" rx="16" ry="5.5" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <line x1="52" y1="0" x2="50" y2="-40" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="84" y1="0" x2="86" y2="-40" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="68" cy="-40" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <ellipse cx="68" cy="-22" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Dried branches -->
      <line x1="68" y1="-40" x2="60" y2="-72" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="68" y1="-52" x2="80" y2="-82" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <circle cx="60" cy="-74" r="2.5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="80" cy="-84" r="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE G — CENTRE: GRAND LIVING ROOM COMPOSITION
         (large central dominant illustration)
    ══════════════════════════════════════════════ -->

    <!-- Large central room box — isometric perspective -->
    <g class="fi" id="central-room" transform="translate(460,180)" filter="url(#chalk-fine)">
      <!-- Floor plane -->
      <polygon points="0,260 260,160 520,260 260,360" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.8" stroke-dasharray="8,4"/>
      <!-- Left wall -->
      <polygon points="0,260 0,480 260,580 260,360" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.7" stroke-dasharray="8,4"/>
      <!-- Right wall -->
      <polygon points="260,360 260,580 520,480 520,260" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.7" stroke-dasharray="8,4"/>
      <!-- Wall panel lines left -->
      <line x1="0" y1="310" x2="260" y2="210" stroke="rgba(238,235,220,0.09)" stroke-width="0.5" stroke-dasharray="5,6"/>
      <line x1="0" y1="360" x2="260" y2="260" stroke="rgba(238,235,220,0.09)" stroke-width="0.5" stroke-dasharray="5,6"/>
      <!-- Floor tiles -->
      <line x1="66" y1="296" x2="326" y2="396" stroke="rgba(238,235,220,0.07)" stroke-width="0.4" stroke-dasharray="3,8"/>
      <line x1="130" y1="270" x2="390" y2="370" stroke="rgba(238,235,220,0.07)" stroke-width="0.4" stroke-dasharray="3,8"/>
      <line x1="195" y1="248" x2="455" y2="348" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="3,8"/>
    </g>

    <!-- Central grand sofa — three-seater -->
    <g class="fi" id="central-sofa" transform="translate(510,358)" filter="url(#chalk)">
      <!-- Seat top -->
      <polygon points="0,60 320,0 380,36 60,96" fill="none" stroke="rgba(238,235,220,0.96)" stroke-width="2.2"/>
      <!-- Front face -->
      <polygon points="0,60 0,120 60,150 60,96" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.7"/>
      <!-- Right face -->
      <polygon points="60,96 60,150 380,86 380,36" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.5"/>
      <!-- Cushion dividers -->
      <line x1="108" y1="16" x2="108" y2="116" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <line x1="218" y1="4" x2="218" y2="104" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- Cushion seams -->
      <line x1="14" y1="72" x2="104" y2="50" stroke="rgba(238,235,220,0.25)" stroke-width="0.6"/>
      <line x1="124" y1="56" x2="212" y2="34" stroke="rgba(238,235,220,0.22)" stroke-width="0.6"/>
      <line x1="234" y1="44" x2="366" y2="14" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <!-- Button tufts row -->
      <circle cx="58" cy="56" r="3.5" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <circle cx="162" cy="38" r="3.5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <circle cx="296" cy="22" r="3.5" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.7"/>
      <!-- Back cushions -->
      <polygon points="0,60 10,6 320,-44 314,0" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="2.0"/>
      <polygon points="314,0 320,-44 380,-10 380,36" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.5"/>
      <!-- Back cushion dividers -->
      <line x1="108" y1="-20" x2="108" y2="22" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="218" y1="-38" x2="218" y2="4" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <!-- Armrest left -->
      <polygon points="0,60 -18,46 -18,106 0,120" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.6"/>
      <polygon points="-18,46 10,8 10,6 -18,44" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <ellipse cx="-9" cy="46" rx="11" ry="4" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- Armrest right -->
      <polygon points="314,0 332,-10 332,46 314,58" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <ellipse cx="323" cy="-10" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- Legs — 4 turned legs -->
      <line x1="8" y1="116" x2="8" y2="148" stroke="rgba(238,235,220,0.70)" stroke-width="1.7"/>
      <line x1="58" y1="148" x2="58" y2="180" stroke="rgba(238,235,220,0.64)" stroke-width="1.6"/>
      <line x1="340" y1="82" x2="340" y2="114" stroke="rgba(238,235,220,0.62)" stroke-width="1.5"/>
      <line x1="374" y1="52" x2="374" y2="84" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <!-- Decorative leg ring detail -->
      <ellipse cx="8" cy="128" rx="4" ry="1.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <!-- Throw pillow left -->
      <polygon points="-8,24 44,10 54,28 2,42" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="22" y1="14" x2="26" y2="38" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Throw pillow right -->
      <polygon points="274,-16 326,-30 334,-12 282,2" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Light cones from chandelier above (connecting up) -->
      <line x1="190" y1="0" x2="190" y2="-60" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,7"/>
    </g>

    <!-- Central accent armchair — facing sofa -->
    <g class="fi" id="central-armchair" transform="translate(620,518)" filter="url(#chalk)">
      <!-- Seat -->
      <polygon points="0,38 160,10 196,34 36,62" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="1.9"/>
      <polygon points="0,38 0,86 36,108 36,62" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <polygon points="36,62 36,108 196,80 196,34" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Back -->
      <polygon points="0,38 8,-14 168,-36 160,10" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <polygon points="160,10 168,-36 196,-14 196,34" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Armrests -->
      <polygon points="0,38 -14,28 -14,76 0,86" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="-14,28 8,-12 8,-14 -14,26" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <ellipse cx="-7" cy="28" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <polygon points="160,10 174,2 174,48 160,58" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="167" cy="2" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <!-- Cushion tufts -->
      <circle cx="76" cy="28" r="3" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <circle cx="130" cy="20" r="3" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <!-- Legs -->
      <line x1="4" y1="84" x2="4" y2="106" stroke="rgba(238,235,220,0.68)" stroke-width="1.5"/>
      <line x1="34" y1="106" x2="34" y2="128" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <line x1="174" y1="46" x2="174" y2="68" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="192" y1="58" x2="192" y2="80" stroke="rgba(238,235,220,0.54)" stroke-width="1.2"/>
    </g>

    <!-- Central coffee table — low rectangular with glass top -->
    <g class="fi" id="central-ct" transform="translate(565,460)" filter="url(#chalk)">
      <!-- Glass top — outer -->
      <polygon points="0,34 240,0 290,28 50,62" fill="none" stroke="rgba(238,235,220,0.94)" stroke-width="2.0"/>
      <!-- Glass inner reflection line -->
      <polygon points="10,33 228,2 278,28 60,59" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.5" stroke-dasharray="4,3"/>
      <!-- Front thickness -->
      <polygon points="0,34 0,50 50,76 50,62" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Right thickness -->
      <polygon points="50,62 50,76 290,44 290,28" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Lower shelf -->
      <polygon points="18,82 228,50 274,74 64,106" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <polygon points="18,82 18,96 64,118 64,106" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.9"/>
      <polygon points="64,106 64,118 274,88 274,74" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <!-- Cross-frame legs (X-frame) -->
      <line x1="18" y1="44" x2="64" y2="106" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <line x1="64" y1="44" x2="18" y2="106" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="224" y1="8" x2="270" y2="70" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="270" y1="8" x2="224" y2="70" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Objects on table: books stack -->
      <rect x="60" y="14" width="44" height="12" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.0" transform="skewX(-10) translate(0,4)"/>
      <rect x="62" y="9" width="40" height="12" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8" transform="skewX(-10) translate(0,2)"/>
      <rect x="66" y="5" width="34" height="12" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" transform="skewX(-10)"/>
      <!-- Candle trio -->
      <rect x="146" y="6" width="7" height="18" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9" transform="skewX(-10)"/>
      <rect x="158" y="4" width="7" height="22" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9" transform="skewX(-10)"/>
      <rect x="170" y="8" width="7" height="14" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" transform="skewX(-10)"/>
      <circle cx="150" cy="4" r="2" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <circle cx="162" cy="1" r="2" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <circle cx="174" cy="5" r="2" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Decorative tray -->
      <polygon points="56,24 200,2 218,16 74,38" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
    </g>

    <!-- Central large pendant chandelier — above sofa -->
    <g class="fi" id="central-chandelier" transform="translate(582,68)" filter="url(#chalk)">
      <!-- Long drop chain -->
      <line x1="178" y1="0" x2="178" y2="82" stroke="rgba(238,235,220,0.60)" stroke-width="1.1" stroke-dasharray="5,3"/>
      <!-- Ceiling canopy disc -->
      <ellipse cx="178" cy="82" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.2"/>
      <!-- Large ring — outer -->
      <ellipse cx="178" cy="130" rx="96" ry="32" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="2.0"/>
      <!-- Inner ring decorative -->
      <ellipse cx="178" cy="140" rx="84" ry="28" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Six candle arms -->
      <line x1="82" y1="130" x2="66" y2="180" stroke="rgba(238,235,220,0.75)" stroke-width="1.5"/>
      <line x1="116" y1="112" x2="108" y2="162" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="152" y1="102" x2="148" y2="152" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <line x1="204" y1="102" x2="208" y2="152" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <line x1="240" y1="112" x2="248" y2="162" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="274" y1="130" x2="290" y2="180" stroke="rgba(238,235,220,0.75)" stroke-width="1.5"/>
      <!-- Candle cups -->
      <ellipse cx="66" cy="182" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <rect x="62" y="164" width="8" height="18" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="0.9" transform="skewX(-4)"/>
      <circle cx="66" cy="163" r="2.2" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="108" cy="164" rx="8" ry="2.8" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <rect x="104" y="148" width="8" height="16" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="0.9"/>
      <circle cx="108" cy="147" r="2" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="148" cy="154" rx="8" ry="2.8" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <rect x="144" y="138" width="8" height="16" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="0.9"/>
      <circle cx="148" cy="137" r="2.2" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="0.9" filter="url(#glow-micro)"/>
      <ellipse cx="208" cy="154" rx="8" ry="2.8" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <rect x="204" y="138" width="8" height="16" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="0.9"/>
      <circle cx="208" cy="137" r="2.2" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="0.9" filter="url(#glow-micro)"/>
      <ellipse cx="248" cy="164" rx="8" ry="2.8" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.1"/>
      <rect x="244" y="148" width="8" height="16" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="0.9"/>
      <circle cx="248" cy="147" r="2" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <ellipse cx="290" cy="182" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <rect x="286" y="164" width="8" height="18" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="0.9"/>
      <circle cx="290" cy="163" r="2.2" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Downward light cones -->
      <line x1="62" y1="182" x2="40" y2="250" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="70" y1="182" x2="90" y2="250" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="144" y1="154" x2="120" y2="222" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="156" y1="154" x2="180" y2="222" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="204" y1="154" x2="180" y2="222" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="216" y1="154" x2="240" y2="222" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,6"/>
    </g>

    <!-- Central large rug — below coffee table -->
    <g class="fi" id="central-rug" transform="translate(488,430)" filter="url(#chalk-fine)">
      <polygon points="0,78 380,0 468,48 88,126" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="1.3" stroke-dasharray="9,4"/>
      <polygon points="16,77 362,4 450,50 104,123" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.8" stroke-dasharray="6,5"/>
      <polygon points="32,76 344,8 432,52 120,120" fill="none" stroke="rgba(238,235,220,0.16)" stroke-width="0.5" stroke-dasharray="4,6"/>
      <!-- Interior medallion -->
      <ellipse cx="234" cy="60" rx="80" ry="26" fill="none" stroke="rgba(238,235,220,0.12)" stroke-width="0.5" transform="skewX(-10)"/>
      <ellipse cx="234" cy="60" rx="50" ry="16" fill="none" stroke="rgba(238,235,220,0.09)" stroke-width="0.4" transform="skewX(-10)"/>
      <line x1="110" y1="40" x2="234" y2="24" stroke="rgba(238,235,220,0.09)" stroke-width="0.4"/>
      <line x1="234" y1="24" x2="358" y2="40" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE H — ADDITIONAL FURNITURE VARIETY
    ══════════════════════════════════════════════ -->

    <!-- Fireplace with mantel — top-right zone -->
    <g class="fi" id="fireplace" transform="translate(920,180)" filter="url(#chalk)">
      <!-- Mantel top surface -->
      <polygon points="0,24 180,0 210,18 30,42" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <!-- Mantel front face -->
      <polygon points="0,24 0,40 30,58 30,42" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <!-- Mantel right face -->
      <polygon points="30,42 30,58 210,36 210,18" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.3"/>
      <!-- Surround frame -->
      <polygon points="12,40 170,18 198,34 40,56" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Firebox opening -->
      <polygon points="26,56 150,36 172,50 48,70" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.7"/>
      <polygon points="26,56 26,132 48,144 48,70" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <polygon points="48,70 48,144 172,122 172,50" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Fire glow — flame lines -->
      <path d="M72,130 Q82,100 92,86 Q98,76 102,90 Q110,68 118,78 Q128,60 132,76 Q140,55 148,72" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <path d="M80,132 Q88,108 96,96 Q102,86 106,100" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <circle cx="110" cy="68" r="3" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <circle cx="136" cy="58" r="2.5" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.7" filter="url(#glow-micro)"/>
      <!-- Fire log -->
      <ellipse cx="110" cy="132" rx="36" ry="10" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <ellipse cx="110" cy="128" rx="28" ry="8" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <!-- Mantel objects: clock + candlesticks -->
      <polygon points="72,0 108,-26 144,0 136,0 100,-20 64,0" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <circle cx="104" cy="-8" r="10" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="104" y1="-14" x2="104" y2="-8" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="104" y1="-8" x2="110" y2="-6" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Left candlestick -->
      <line x1="30" y1="40" x2="30" y2="4" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="30" cy="40" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <circle cx="30" cy="2" r="2" fill="none" stroke="rgba(238,235,220,0.45)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Right candlestick -->
      <line x1="172" y1="24" x2="172" y2="-8" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <ellipse cx="172" cy="24" rx="5" ry="1.8" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.8"/>
      <circle cx="172" cy="-10" r="2" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8" filter="url(#glow-micro)"/>
    </g>

    <!-- Accent 2-seat love seat — bottom left mid -->
    <g class="fi" id="loveseat" transform="translate(136,614)" filter="url(#chalk)">
      <!-- Seat -->
      <polygon points="0,44 180,12 216,36 36,68" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <polygon points="0,44 0,96 36,116 36,68" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="36,68 36,116 216,84 216,36" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <!-- Cushion seam -->
      <line x1="108" y1="18" x2="108" y2="88" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="14" y1="56" x2="100" y2="36" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="118" y1="44" x2="202" y2="24" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <!-- Backrest -->
      <polygon points="0,44 8,2 186,-24 180,12" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <polygon points="180,12 186,-24 216,0 216,36" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <line x1="108" y1="-8" x2="108" y2="28" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <!-- Armrests -->
      <polygon points="0,44 -14,32 -14,84 0,96" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <polygon points="-14,32 8,4 8,2 -14,30" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <ellipse cx="-7" cy="32" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <polygon points="180,12 194,4 194,52 180,60" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <ellipse cx="187" cy="4" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.8"/>
      <!-- Legs -->
      <line x1="4" y1="94" x2="4" y2="118" stroke="rgba(238,235,220,0.66)" stroke-width="1.5"/>
      <line x1="34" y1="114" x2="34" y2="138" stroke="rgba(238,235,220,0.58)" stroke-width="1.4"/>
      <line x1="194" y1="50" x2="194" y2="74" stroke="rgba(238,235,220,0.56)" stroke-width="1.3"/>
      <line x1="212" y1="68" x2="212" y2="92" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
    </g>

    <!-- Staircase — top left zone -->
    <g class="fi" id="staircase" transform="translate(50,230)" filter="url(#chalk)">
      <!-- Stair steps — 6 visible isometric treads -->
      <polygon points="0,120 80,90 100,100 20,130" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <polygon points="0,120 0,138 20,148 20,130" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <polygon points="20,130 20,148 100,118 100,100" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <polygon points="20,90 100,60 120,70 40,100" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="20,90 20,108 40,118 40,100" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <polygon points="40,100 40,118 120,88 120,70" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <polygon points="40,60 120,30 140,40 60,70" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <polygon points="40,60 40,78 60,88 60,70" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <polygon points="60,70 60,88 140,58 140,40" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <polygon points="60,30 140,0 160,10 80,40" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <polygon points="60,30 60,48 80,58 80,40" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <polygon points="80,40 80,58 160,28 160,10" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- Railing posts -->
      <line x1="0" y1="120" x2="0" y2="60" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="80" y1="90" x2="80" y2="30" stroke="rgba(238,235,220,0.65)" stroke-width="1.4"/>
      <line x1="160" y1="10" x2="160" y2="-50" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Handrail top -->
      <line x1="0" y1="60" x2="80" y2="30" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <line x1="80" y1="30" x2="160" y2="-50" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Railing balusters -->
      <line x1="20" y1="56" x2="26" y2="92" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="40" y1="48" x2="46" y2="84" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <line x1="60" y1="40" x2="66" y2="76" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <line x1="100" y1="18" x2="106" y2="54" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <line x1="120" y1="4" x2="126" y2="40" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <line x1="140" y1="-8" x2="146" y2="28" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
    </g>

    <!-- Window frame with view — top-centre-left -->
    <g class="fi" id="window-frame" transform="translate(310,120)" filter="url(#chalk)">
      <!-- Frame outer box 3D -->
      <rect x="0" y="0" width="120" height="160" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.8"/>
      <!-- Frame depth right -->
      <polygon points="120,0 136,12 136,172 120,160" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Frame depth top -->
      <polygon points="0,0 120,0 136,12 16,12" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Window sill -->
      <polygon points="-4,160 124,160 138,172 10,172" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Window panes — 4 panes -->
      <line x1="60" y1="0" x2="60" y2="160" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="0" y1="80" x2="120" y2="80" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Glass sheen diagonal -->
      <line x1="4" y1="4" x2="58" y2="78" stroke="rgba(238,235,220,0.10)" stroke-width="0.5"/>
      <line x1="64" y1="4" x2="118" y2="78" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
      <line x1="4" y1="84" x2="58" y2="156" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
      <!-- Curtain left side -->
      <path d="M0,0 Q-12,40 -6,80 Q-12,120 0,160" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.4"/>
      <path d="M0,0 Q-18,44 -10,80 Q-18,116 0,160" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.7" stroke-dasharray="4,4"/>
      <!-- Curtain rod -->
      <line x1="-22" y1="-8" x2="142" y2="-8" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <circle cx="-22" cy="-8" r="4" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <circle cx="142" cy="-8" r="4" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <!-- Curtain rings -->
      <circle cx="-10" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <circle cx="10" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="30" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <circle cx="50" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <circle cx="90" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <circle cx="110" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <circle cx="130" cy="-8" r="3" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
    </g>

    <!-- Radiator panel — left wall -->
    <g class="fi" id="radiator" transform="translate(62,410)" filter="url(#chalk)">
      <!-- Outer casing top -->
      <polygon points="0,18 100,0 118,12 18,30" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <!-- Front face -->
      <polygon points="0,18 0,100 18,112 18,30" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="18,30 18,112 118,88 118,12" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.2"/>
      <!-- Radiator fins — 7 fins -->
      <line x1="2" y1="20" x2="2" y2="96" stroke="rgba(238,235,220,0.44)" stroke-width="1.8"/>
      <line x1="16" y1="18" x2="16" y2="94" stroke="rgba(238,235,220,0.44)" stroke-width="1.8"/>
      <line x1="30" y1="30" x2="30" y2="106" stroke="rgba(238,235,220,0.40)" stroke-width="1.5"/>
      <line x1="44" y1="26" x2="44" y2="102" stroke="rgba(238,235,220,0.38)" stroke-width="1.5"/>
      <line x1="58" y1="22" x2="58" y2="98" stroke="rgba(238,235,220,0.36)" stroke-width="1.4"/>
      <line x1="72" y1="18" x2="72" y2="94" stroke="rgba(238,235,220,0.34)" stroke-width="1.4"/>
      <line x1="86" y1="14" x2="86" y2="90" stroke="rgba(238,235,220,0.32)" stroke-width="1.3"/>
      <line x1="100" y1="10" x2="100" y2="86" stroke="rgba(238,235,220,0.30)" stroke-width="1.2"/>
      <!-- Horizontal pipes top and bottom -->
      <line x1="0" y1="18" x2="118" y2="12" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="0" y1="98" x2="118" y2="86" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- Valve knob -->
      <circle cx="8" cy="96" r="5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="4" y1="96" x2="12" y2="96" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
    </g>

    <!-- Bedside table with lamp — top right corner -->
    <g class="fi" id="bedside-tbl" transform="translate(1268,480)" filter="url(#chalk)">
      <!-- Table top -->
      <polygon points="0,24 90,8 108,20 18,36" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <!-- Front face -->
      <polygon points="0,24 0,98 18,108 18,36" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="18,36 18,108 108,90 108,20" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.2"/>
      <!-- Drawer front on face -->
      <rect x="2" y="40" width="14" height="46" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="2" y1="63" x2="16" y2="63" stroke="rgba(238,235,220,0.24)" stroke-width="0.5" stroke-dasharray="3,4"/>
      <!-- Handle -->
      <line x1="7" y1="52" x2="11" y2="52" stroke="rgba(238,235,220,0.44)" stroke-width="1.0"/>
      <!-- Lamp on bedside -->
      <ellipse cx="54" cy="16" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <line x1="54" y1="12" x2="54" y2="-38" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <polygon points="30,-38 78,-38 68,-10 40,-10" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.7"/>
      <ellipse cx="54" cy="-10" rx="18" ry="5.5" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <ellipse cx="54" cy="-38" rx="26" ry="8" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <circle cx="54" cy="-12" r="4.5" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9" filter="url(#glow-micro)"/>
      <!-- Shade ribs -->
      <line x1="42" y1="-34" x2="40" y2="-10" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <line x1="54" y1="-46" x2="54" y2="-10" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="66" y1="-34" x2="68" y2="-10" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <!-- Light cone -->
      <line x1="30" y1="-10" x2="14" y2="44" stroke="rgba(238,235,220,0.07)" stroke-width="0.5" stroke-dasharray="3,5"/>
      <line x1="78" y1="-10" x2="94" y2="44" stroke="rgba(238,235,220,0.07)" stroke-width="0.5" stroke-dasharray="3,5"/>
      <!-- Small plant on surface -->
      <ellipse cx="88" cy="14" rx="8" ry="2.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <line x1="88" y1="10" x2="86" y2="-12" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="86" y1="-4" x2="76" y2="-16" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <line x1="86" y1="-8" x2="96" y2="-20" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="76" cy="-18" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="96" cy="-22" r="2.5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
    </g>

    <!-- Ottoman / pouf — near central sofa -->
    <g class="fi" id="ottoman" transform="translate(840,528)" filter="url(#chalk)">
      <!-- Top face -->
      <ellipse cx="60" cy="24" rx="60" ry="20" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <!-- Side cylinder -->
      <line x1="0" y1="24" x2="0" y2="66" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <line x1="120" y1="24" x2="120" y2="66" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <!-- Bottom edge ellipse -->
      <ellipse cx="60" cy="66" rx="60" ry="20" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Tufted top pattern — button tufts at cardinal points -->
      <circle cx="60" cy="18" r="4" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <circle cx="32" cy="22" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="88" cy="22" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="60" cy="30" r="3" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <!-- Stitch lines radiating from centre tuft -->
      <line x1="60" y1="18" x2="32" y2="22" stroke="rgba(238,235,220,0.18)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <line x1="60" y1="18" x2="88" y2="22" stroke="rgba(238,235,220,0.16)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <line x1="60" y1="18" x2="60" y2="30" stroke="rgba(238,235,220,0.16)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <!-- Short legs -->
      <line x1="14" y1="64" x2="12" y2="80" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
      <line x1="106" y1="64" x2="108" y2="80" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="60" y1="86" x2="60" y2="102" stroke="rgba(238,235,220,0.48)" stroke-width="1.1"/>
    </g>

    <!-- Tall narrow bookcase / cabinet — far right -->
    <g class="fi" id="narrow-cabinet" transform="translate(1368,290)" filter="url(#chalk)">
      <!-- Front face -->
      <rect x="0" y="0" width="60" height="280" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <!-- ISO top -->
      <polygon points="0,0 60,0 74,16 14,16" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <!-- ISO right -->
      <polygon points="60,0 74,16 74,296 60,280" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.2"/>
      <!-- Door split middle -->
      <line x1="0" y1="140" x2="60" y2="140" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Upper glass door panel -->
      <rect x="4" y="4" width="52" height="130" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="4" y1="4" x2="56" y2="134" stroke="rgba(238,235,220,0.10)" stroke-width="0.4"/>
      <!-- Lower panel doors -->
      <line x1="30" y1="140" x2="30" y2="276" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <rect x="4" y="144" width="24" height="128" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <rect x="32" y="144" width="24" height="128" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <!-- Knobs -->
      <circle cx="28" cy="208" r="3" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <circle cx="34" cy="208" r="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Objects inside upper glass: vase + book -->
      <line x1="14" y1="48" x2="14" y2="128" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <ellipse cx="14" cy="128" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="28" y1="44" x2="28" y2="124" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
    </g>

    <!-- Accent chair — Scandinavian style — upper right of dining area -->
    <g class="fi" id="accent-chair-r" transform="translate(726,254)" filter="url(#chalk)">
      <!-- Seat shell -->
      <polygon points="0,30 100,10 122,26 22,46" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <polygon points="100,10 122,26 122,56 100,40" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <polygon points="0,30 0,60 22,74 22,46" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <!-- A-frame legs -->
      <line x1="6" y1="56" x2="-6" y2="108" stroke="rgba(238,235,220,0.74)" stroke-width="1.5"/>
      <line x1="6" y1="56" x2="18" y2="108" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="110" y1="40" x2="100" y2="92" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="110" y1="40" x2="120" y2="92" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <!-- Cross stretcher -->
      <line x1="-2" y1="88" x2="120" y2="82" stroke="rgba(238,235,220,0.30)" stroke-width="0.7" stroke-dasharray="4,4"/>
      <!-- Slim backrest wooden -->
      <line x1="2" y1="28" x2="2" y2="-42" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <line x1="22" y1="22" x2="22" y2="-46" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <line x1="2" y1="-42" x2="22" y2="-46" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <!-- Back splats 3 -->
      <line x1="8" y1="-10" x2="8" y2="22" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <line x1="14" y1="-12" x2="14" y2="20" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <line x1="20" y1="-14" x2="20" y2="18" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE I — NEW RICH FURNITURE ADDITIONS
    ══════════════════════════════════════════════ -->

    <!-- Chesterfield 3-seat sofa — top right area -->
    <g class="fi" id="chesterfield" transform="translate(1040,160) rotate(3)" filter="url(#chalk)">
      <!-- Seat top -->
      <polygon points="0,68 320,20 378,54 58,102" fill="none" stroke="rgba(238,235,220,0.90)" stroke-width="1.9"/>
      <!-- Front face -->
      <polygon points="0,68 0,132 58,164 58,102" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <!-- Right face -->
      <polygon points="58,102 58,164 378,112 378,54" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Button tufted top rows -->
      <circle cx="72" cy="60" r="3.5" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <circle cx="152" cy="46" r="3.5" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <circle cx="232" cy="34" r="3.5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <circle cx="312" cy="24" r="3" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <!-- Cushion seam row -->
      <line x1="118" y1="28" x2="118" y2="120" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="238" y1="14" x2="238" y2="106" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <!-- Back cushion — quilted -->
      <polygon points="0,68 10,14 322,-32 314,20" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <polygon points="314,20 322,-32 378,2 378,54" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Backrest tufts -->
      <circle cx="80" cy="-2" r="3" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <circle cx="180" cy="-16" r="3" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <circle cx="278" cy="-28" r="3" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Rolled armrests left -->
      <polygon points="0,68 -18,54 -18,118 0,132" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <ellipse cx="-9" cy="54" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <ellipse cx="-9" cy="50" rx="10" ry="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6" stroke-dasharray="3,4"/>
      <!-- Rolled armrests right -->
      <polygon points="314,20 332,10 332,66 314,78" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <ellipse cx="323" cy="10" rx="11" ry="3.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Bun feet -->
      <ellipse cx="10" cy="134" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="56" cy="162" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <ellipse cx="348" cy="110" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <line x1="10" y1="137" x2="10" y2="156" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="56" y1="165" x2="56" y2="184" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <line x1="348" y1="113" x2="348" y2="132" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
    </g>

    <!-- Egg chair / pod chair — mid right -->
    <g class="fi" id="egg-chair" transform="translate(1140,448)" filter="url(#chalk)">
      <!-- Outer shell — wide oval -->
      <ellipse cx="70" cy="60" rx="70" ry="90" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.8"/>
      <!-- Inner shell cutaway -->
      <path d="M20,80 Q10,60 12,40 Q14,10 70,0 Q126,10 128,40 Q130,60 120,80" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- Seat cushion base -->
      <ellipse cx="70" cy="100" rx="50" ry="16" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Swivel base stem -->
      <line x1="70" y1="148" x2="70" y2="176" stroke="rgba(238,235,220,0.72)" stroke-width="2.2"/>
      <!-- Base disc -->
      <ellipse cx="70" cy="180" rx="46" ry="14" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <ellipse cx="70" cy="188" rx="36" ry="11" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- 4-star base spokes -->
      <line x1="70" y1="180" x2="24" y2="194" stroke="rgba(238,235,220,0.55)" stroke-width="1.2"/>
      <line x1="70" y1="180" x2="116" y2="194" stroke="rgba(238,235,220,0.53)" stroke-width="1.2"/>
      <line x1="70" y1="180" x2="56" y2="200" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="70" y1="180" x2="84" y2="200" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <!-- Interior contour lines -->
      <ellipse cx="70" cy="50" rx="48" ry="50" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <ellipse cx="70" cy="50" rx="30" ry="35" fill="none" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="3,6"/>
      <!-- Throw cushion inside -->
      <polygon points="50,78 90,70 96,88 56,96" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
    </g>

    <!-- Kitchen island with stools — bottom right zone -->
    <g class="fi" id="kitchen-island" transform="translate(1020,620) rotate(-2)" filter="url(#chalk)">
      <!-- Island worktop -->
      <polygon points="0,36 300,0 348,28 48,64" fill="none" stroke="rgba(238,235,220,0.92)" stroke-width="1.9"/>
      <!-- Front face -->
      <polygon points="0,36 0,130 48,152 48,64" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <!-- Right face -->
      <polygon points="48,64 48,152 348,120 348,28" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Overhang detail line -->
      <line x1="14" y1="32" x2="330" y2="2" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="5,4"/>
      <!-- Drawer pulls on front -->
      <line x1="12" y1="82" x2="28" y2="82" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <line x1="12" y1="104" x2="28" y2="104" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <!-- Panel lines on front -->
      <line x1="4" y1="68" x2="4" y2="146" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="30" y1="64" x2="30" y2="148" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <!-- Items on worktop: sink -->
      <ellipse cx="230" cy="24" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <ellipse cx="230" cy="20" rx="20" ry="6" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.6"/>
      <!-- Tap -->
      <line x1="230" y1="14" x2="230" y2="-8" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <path d="M230,-8 Q242,-8 242,2" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Chopping board + items -->
      <rect x="80" y="10" width="50" height="18" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" transform="skewX(-12)"/>
      <line x1="100" y1="8" x2="108" y2="-14" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Pendant above island -->
      <line x1="174" y1="-80" x2="174" y2="-18" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <ellipse cx="174" cy="-18" rx="28" ry="9" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <line x1="146" y1="-18" x2="140" y2="12" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="202" y1="-18" x2="208" y2="12" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <ellipse cx="174" cy="12" rx="20" ry="6" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <circle cx="174" cy="10" r="4" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" filter="url(#glow-micro)"/>
      <!-- Bar stool 1 -->
      <ellipse cx="50" cy="-14" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <line x1="50" y1="-7" x2="50" y2="34" stroke="rgba(238,235,220,0.68)" stroke-width="1.9"/>
      <ellipse cx="50" cy="38" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Bar stool 2 -->
      <ellipse cx="120" cy="-24" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.74)" stroke-width="1.4"/>
      <line x1="120" y1="-17" x2="120" y2="24" stroke="rgba(238,235,220,0.64)" stroke-width="1.8"/>
      <ellipse cx="120" cy="28" rx="14" ry="5" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
    </g>

    <!-- Bookcase full wall — far left top -->
    <g class="fi" id="bookcase-wall" transform="translate(-22,0)" filter="url(#chalk)">
      <!-- Main frame -->
      <rect x="0" y="0" width="130" height="400" fill="none" stroke="rgba(238,235,220,0.75)" stroke-width="1.6"/>
      <!-- ISO top -->
      <polygon points="0,0 130,0 148,16 18,16" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- ISO right side -->
      <polygon points="130,0 148,16 148,416 130,400" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- Shelves — 6 shelves -->
      <line x1="0" y1="64" x2="130" y2="64" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <line x1="0" y1="128" x2="130" y2="128" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="0" y1="192" x2="130" y2="192" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="0" y1="256" x2="130" y2="256" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="0" y1="320" x2="130" y2="320" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <!-- Books shelf 1 — varied widths standing -->
      <line x1="8" y1="4" x2="8" y2="60" stroke="rgba(238,235,220,0.42)" stroke-width="1.4"/>
      <line x1="20" y1="4" x2="20" y2="60" stroke="rgba(238,235,220,0.40)" stroke-width="1.2"/>
      <line x1="30" y1="8" x2="30" y2="62" stroke="rgba(238,235,220,0.38)" stroke-width="1.5"/>
      <line x1="44" y1="4" x2="44" y2="60" stroke="rgba(238,235,220,0.36)" stroke-width="1.1"/>
      <line x1="54" y1="6" x2="54" y2="62" stroke="rgba(238,235,220,0.34)" stroke-width="1.3"/>
      <line x1="66" y1="4" x2="66" y2="60" stroke="rgba(238,235,220,0.32)" stroke-width="1.0"/>
      <line x1="78" y1="8" x2="78" y2="62" stroke="rgba(238,235,220,0.30)" stroke-width="1.2"/>
      <!-- Books shelf 2 -->
      <line x1="8" y1="68" x2="8" y2="124" stroke="rgba(238,235,220,0.40)" stroke-width="1.3"/>
      <line x1="18" y1="70" x2="18" y2="126" stroke="rgba(238,235,220,0.38)" stroke-width="1.1"/>
      <line x1="30" y1="68" x2="30" y2="124" stroke="rgba(238,235,220,0.36)" stroke-width="1.4"/>
      <line x1="42" y1="70" x2="42" y2="126" stroke="rgba(238,235,220,0.34)" stroke-width="1.0"/>
      <line x1="54" y1="68" x2="54" y2="124" stroke="rgba(238,235,220,0.32)" stroke-width="1.2"/>
      <line x1="64" y1="70" x2="64" y2="126" stroke="rgba(238,235,220,0.30)" stroke-width="0.9"/>
      <!-- Decorative item shelf 3 — small vase + books lying flat -->
      <rect x="8" y="196" width="28" height="8" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" transform="skewX(-8)"/>
      <rect x="8" y="205" width="22" height="8" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6" transform="skewX(-8)"/>
      <line x1="54" y1="196" x2="54" y2="250" stroke="rgba(238,235,220,0.35)" stroke-width="1.2"/>
      <ellipse cx="66" cy="250" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="58" y1="250" x2="56" y2="220" stroke="rgba(238,235,220,0.38)" stroke-width="0.9"/>
      <line x1="74" y1="250" x2="76" y2="220" stroke="rgba(238,235,220,0.36)" stroke-width="0.9"/>
      <ellipse cx="66" cy="220" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <!-- Books shelf 4 -->
      <line x1="8" y1="260" x2="8" y2="316" stroke="rgba(238,235,220,0.38)" stroke-width="1.2"/>
      <line x1="20" y1="262" x2="20" y2="318" stroke="rgba(238,235,220,0.34)" stroke-width="1.0"/>
      <line x1="32" y1="260" x2="32" y2="316" stroke="rgba(238,235,220,0.32)" stroke-width="1.3"/>
      <line x1="46" y1="262" x2="46" y2="318" stroke="rgba(238,235,220,0.30)" stroke-width="0.9"/>
      <!-- Plant on top of bookcase -->
      <ellipse cx="100" cy="0" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="100" y1="-6" x2="96" y2="-40" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="96" y1="-22" x2="80" y2="-38" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="96" y1="-30" x2="112" y2="-46" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <circle cx="80" cy="-40" r="4" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <circle cx="112" cy="-48" r="4" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
    </g>

    <!-- Wicker/rattan chair — top centre area -->
    <g class="fi" id="rattan-chair" transform="translate(480,52)" filter="url(#chalk)">
      <!-- Wide rounded seat shell -->
      <ellipse cx="60" cy="80" rx="60" ry="24" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <!-- Seat bowl depth -->
      <ellipse cx="60" cy="90" rx="50" ry="18" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Wicker weave pattern on seat (diagonal hatching) -->
      <line x1="20" y1="72" x2="44" y2="96" stroke="rgba(238,235,220,0.18)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <line x1="36" y1="66" x2="66" y2="96" stroke="rgba(238,235,220,0.16)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <line x1="52" y1="62" x2="84" y2="94" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <line x1="72" y1="62" x2="96" y2="86" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="2,3"/>
      <!-- High peacock backrest -->
      <ellipse cx="60" cy="20" rx="70" ry="72" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <ellipse cx="60" cy="22" rx="55" ry="55" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" stroke-dasharray="3,5"/>
      <ellipse cx="60" cy="24" rx="40" ry="40" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <!-- Fan spokes from centre -->
      <line x1="60" y1="24" x2="0" y2="-44" stroke="rgba(238,235,220,0.16)" stroke-width="0.4" stroke-dasharray="2,4"/>
      <line x1="60" y1="24" x2="30" y2="-52" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="2,4"/>
      <line x1="60" y1="24" x2="60" y2="-52" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="2,4"/>
      <line x1="60" y1="24" x2="90" y2="-52" stroke="rgba(238,235,220,0.14)" stroke-width="0.4" stroke-dasharray="2,4"/>
      <line x1="60" y1="24" x2="120" y2="-44" stroke="rgba(238,235,220,0.16)" stroke-width="0.4" stroke-dasharray="2,4"/>
      <!-- Hanging chains / stand -->
      <line x1="24" y1="96" x2="14" y2="138" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="96" y1="96" x2="106" y2="138" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- Base ring -->
      <ellipse cx="60" cy="138" rx="48" ry="15" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Stand legs -->
      <line x1="12" y1="138" x2="4" y2="172" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <line x1="108" y1="138" x2="116" y2="172" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <line x1="60" y1="153" x2="60" y2="178" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Cushion -->
      <ellipse cx="60" cy="82" rx="44" ry="14" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0" stroke-dasharray="4,3"/>
    </g>

    <!-- Drafting / architect's desk with stool — top right far -->
    <g class="fi" id="arch-desk" transform="translate(1236,60)" filter="url(#chalk)">
      <!-- Angled tabletop -->
      <polygon points="0,60 190,24 220,44 30,80" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <!-- Front face — slanted forward -->
      <polygon points="0,60 0,82 30,98 30,80" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="30,80 30,98 220,60 220,44" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Drawing on table — ruled layout lines -->
      <line x1="20" y1="34" x2="190" y2="12" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <line x1="20" y1="44" x2="190" y2="22" stroke="rgba(238,235,220,0.16)" stroke-width="0.4"/>
      <line x1="20" y1="54" x2="190" y2="32" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <!-- T-square hint -->
      <line x1="16" y1="30" x2="16" y2="74" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="8" y1="36" x2="30" y2="32" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Straight ruler -->
      <line x1="50" y1="28" x2="170" y2="14" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <!-- Desk legs — angled trestle -->
      <line x1="4" y1="78" x2="-2" y2="154" stroke="rgba(238,235,220,0.70)" stroke-width="1.5"/>
      <line x1="26" y1="96" x2="32" y2="172" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <line x1="202" y1="56" x2="196" y2="132" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <line x1="220" y1="60" x2="226" y2="136" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Cross brace -->
      <line x1="0" y1="118" x2="220" y2="96" stroke="rgba(238,235,220,0.26)" stroke-width="0.7" stroke-dasharray="5,4"/>
      <!-- Architect stool beside -->
      <ellipse cx="-38" cy="144" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="-38" y1="151" x2="-38" y2="194" stroke="rgba(238,235,220,0.70)" stroke-width="2.0"/>
      <ellipse cx="-38" cy="198" rx="16" ry="5" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Stool ring footrest -->
      <ellipse cx="-38" cy="172" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
    </g>

    <!-- Modular sofa L-shape 2 — bottom mid area -->
    <g class="fi" id="modular-sofa" transform="translate(760,680) rotate(-1)" filter="url(#chalk)">
      <!-- Main body top -->
      <polygon points="0,44 240,8 284,32 44,68" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <!-- Front face -->
      <polygon points="0,44 0,104 44,122 44,68" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="44,68 44,122 284,92 284,32" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Module divider -->
      <line x1="132" y1="18" x2="132" y2="104" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- Back cushions -->
      <polygon points="0,44 8,4 246,-28 240,8" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.7"/>
      <!-- Cushion tufts -->
      <circle cx="66" cy="30" r="3" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <circle cx="192" cy="14" r="3" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <!-- Armrest left -->
      <polygon points="0,44 -14,32 -14,92 0,104" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <ellipse cx="-7" cy="32" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Armrest right -->
      <polygon points="240,8 256,2 256,56 240,62" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- L-corner module -->
      <polygon points="0,104 -80,80 -80,152 0,180" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="-80,80 -80,152 -14,168 -14,96" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <polygon points="0,104 -80,80 -14,58 0,82" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <!-- Legs -->
      <line x1="6" y1="120" x2="6" y2="144" stroke="rgba(238,235,220,0.65)" stroke-width="1.4"/>
      <line x1="42" y1="120" x2="42" y2="144" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <line x1="260" y1="88" x2="260" y2="112" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
    </g>

    <!-- Circular dining table + 2 chairs — top centre right -->
    <g class="fi" id="round-dining" transform="translate(826,56)" filter="url(#chalk)">
      <!-- Round table top -->
      <ellipse cx="80" cy="50" rx="80" ry="26" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.9"/>
      <!-- Table thickness -->
      <ellipse cx="80" cy="60" rx="80" ry="26" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="0" y1="50" x2="0" y2="60" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="160" y1="50" x2="160" y2="60" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- Pedestal base stem -->
      <line x1="80" y1="60" x2="80" y2="120" stroke="rgba(238,235,220,0.76)" stroke-width="2.2"/>
      <!-- Base cross feet -->
      <line x1="42" y1="118" x2="118" y2="118" stroke="rgba(238,235,220,0.70)" stroke-width="1.6"/>
      <line x1="80" y1="104" x2="80" y2="132" stroke="rgba(238,235,220,0.65)" stroke-width="1.5"/>
      <!-- Table items: centre piece -->
      <ellipse cx="80" cy="44" rx="18" ry="6" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="80" y1="38" x2="78" y2="14" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <line x1="78" y1="24" x2="68" y2="10" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <circle cx="68" cy="8" r="3" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <!-- Chair 1 left -->
      <polygon points="-28,42 44,28 56,38 -16,52" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="-28,42 -28,70 -16,78 -16,52" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <polygon points="-16,52 -16,78 56,62 56,38" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <!-- Chair 1 backrest -->
      <line x1="-26" y1="40" x2="-26" y2="-14" stroke="rgba(238,235,220,0.74)" stroke-width="1.5"/>
      <line x1="-16" y1="36" x2="-16" y2="-18" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="-26" y1="-14" x2="-16" y2="-18" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Chair 2 right -->
      <polygon points="110,40 180,28 192,38 122,50" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <polygon points="180,28 192,38 192,66 180,56" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="182" y1="26" x2="182" y2="-30" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <line x1="192" y1="22" x2="192" y2="-34" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="182" y1="-30" x2="192" y2="-34" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
    </g>

    <!-- Floor lamp arc — mid right zone -->
    <g class="fi" id="arc-lamp-r" transform="translate(1200,260)" filter="url(#chalk)">
      <!-- Marble base -->
      <polygon points="0,26 60,14 72,22 12,34" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="0,26 0,38 12,44 12,34" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <polygon points="12,34 12,44 72,32 72,22" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Vertical pole -->
      <line x1="36" y1="20" x2="30" y2="-200" stroke="rgba(238,235,220,0.82)" stroke-width="2.0"/>
      <!-- Detail rings -->
      <ellipse cx="34" cy="-80" rx="5" ry="1.5" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <!-- Curved arm to shade -->
      <path d="M30,-200 Q30,-236 90,-246" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Shade — wide cone downward facing -->
      <ellipse cx="106" cy="-246" rx="40" ry="13" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <line x1="66" y1="-246" x2="72" y2="-210" stroke="rgba(238,235,220,0.78)" stroke-width="1.6"/>
      <line x1="146" y1="-246" x2="140" y2="-210" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <ellipse cx="106" cy="-210" rx="30" ry="9" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Shade ribs -->
      <line x1="86" y1="-242" x2="86" y2="-212" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <line x1="106" y1="-259" x2="106" y2="-210" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <line x1="126" y1="-242" x2="126" y2="-212" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <!-- Bulb -->
      <circle cx="106" cy="-212" r="5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0" filter="url(#glow-micro)"/>
      <!-- Light cone -->
      <line x1="72" y1="-210" x2="42" y2="-154" stroke="rgba(238,235,220,0.08)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="140" y1="-210" x2="170" y2="-154" stroke="rgba(238,235,220,0.08)" stroke-width="0.5" stroke-dasharray="3,6"/>
    </g>

    <!-- Decorative screen / room divider — mid left -->
    <g class="fi" id="room-divider" transform="translate(452,598)" filter="url(#chalk)">
      <!-- 3 panel screen -->
      <!-- Panel 1 -->
      <polygon points="0,18 48,6 60,14 12,26" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <polygon points="0,18 0,210 12,218 12,26" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <polygon points="12,26 12,218 60,206 60,14" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Panel 1 decorative lattice -->
      <line x1="2" y1="50" x2="58" y2="36" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="2" y1="90" x2="58" y2="76" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="2" y1="130" x2="58" y2="116" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="2" y1="170" x2="58" y2="156" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="30" y1="18" x2="30" y2="210" stroke="rgba(238,235,220,0.22)" stroke-width="0.5" stroke-dasharray="3,5"/>
      <!-- Panel 2 — offset hinge -->
      <polygon points="64,20 112,8 124,16 76,28" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="64,20 64,212 76,220 76,28" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.3"/>
      <polygon points="76,28 76,220 124,208 124,16" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <line x1="66" y1="52" x2="122" y2="38" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="66" y1="92" x2="122" y2="78" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="66" y1="132" x2="122" y2="118" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="66" y1="172" x2="122" y2="158" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Panel 3 -->
      <polygon points="128,22 176,10 188,18 140,30" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <polygon points="128,22 128,214 140,222 140,30" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <polygon points="140,30 140,222 188,210 188,18" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="130" y1="54" x2="186" y2="40" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="130" y1="94" x2="186" y2="80" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="130" y1="134" x2="186" y2="120" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Hinge connectors -->
      <line x1="62" y1="50" x2="64" y2="180" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
      <line x1="126" y1="52" x2="128" y2="182" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
    </g>

    <!-- Credenza / sideboard — bottom right zone -->
    <g class="fi" id="credenza" transform="translate(1080,730)" filter="url(#chalk)">
      <!-- Worktop -->
      <polygon points="0,24 280,0 310,18 30,42" fill="none" stroke="rgba(238,235,220,0.88)" stroke-width="1.8"/>
      <!-- Front face -->
      <polygon points="0,24 0,90 30,104 30,42" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="30,42 30,104 310,80 310,18" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <!-- Door panels front — 3 panels -->
      <line x1="2" y1="28" x2="2" y2="88" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="14" y1="26" x2="14" y2="86" stroke="rgba(238,235,220,0.42)" stroke-width="0.9"/>
      <!-- Door outlines on right face -->
      <line x1="106" y1="40" x2="106" y2="100" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="196" y1="28" x2="196" y2="90" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <!-- Brass pull handles on face -->
      <ellipse cx="8" cy="58" rx="3" ry="1" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Handle rows on right face -->
      <line x1="52" y1="70" x2="60" y2="70" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="148" y1="60" x2="156" y2="60" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <line x1="240" y1="50" x2="248" y2="50" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Items on top -->
      <!-- Vase left -->
      <ellipse cx="50" cy="18" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="38" y1="18" x2="36" y2="-18" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="62" y1="18" x2="64" y2="-18" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="50" cy="-18" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <!-- Abstract sculpture right -->
      <line x1="220" y1="12" x2="222" y2="-42" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <ellipse cx="222" cy="-48" rx="10" ry="10" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="222" cy="-60" rx="7" ry="7" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <!-- Picture frame leaning on top -->
      <rect x="130" y="-34" width="56" height="46" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <polygon points="130,-34 186,-34 192,-28 136,-28" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="130" y1="-4" x2="186" y2="-4" stroke="rgba(238,235,220,0.20)" stroke-width="0.4" stroke-dasharray="3,4"/>
    </g>

    <!-- Bathtub freestanding — far right bottom -->
    <g class="fi" id="bathtub" transform="translate(1330,570)" filter="url(#chalk)">
      <!-- Outer tub shell top -->
      <ellipse cx="56" cy="32" rx="56" ry="20" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.8"/>
      <!-- Tub body side -->
      <line x1="0" y1="32" x2="0" y2="90" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="112" y1="32" x2="112" y2="90" stroke="rgba(238,235,220,0.66)" stroke-width="1.3"/>
      <!-- Bottom edge -->
      <ellipse cx="56" cy="90" rx="56" ry="20" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <!-- Inner basin rim -->
      <ellipse cx="56" cy="26" rx="46" ry="16" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Rolled rim detail -->
      <ellipse cx="56" cy="36" rx="46" ry="16" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5" stroke-dasharray="4,4"/>
      <!-- Claw feet -->
      <ellipse cx="14" cy="90" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="14" y1="93" x2="10" y2="112" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <line x1="14" y1="93" x2="18" y2="112" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <ellipse cx="98" cy="90" rx="8" ry="3" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <line x1="98" y1="93" x2="94" y2="112" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <line x1="98" y1="93" x2="102" y2="112" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Tap + filler -->
      <line x1="56" y1="24" x2="56" y2="-10" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <ellipse cx="56" cy="-10" rx="8" ry="2.5" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.0"/>
      <path d="M56,-10 Q68,-10 68,4" fill="none" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <path d="M56,-10 Q44,-10 44,4" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
    </g>

    <!-- ══════════════════════════════════════════════
         ZONE CENTRAL — GRAND INTERIOR COMPOSITION
         Wardrobe · Kitchen · Grand Armoire · Walk-in
    ══════════════════════════════════════════════ -->

    <!-- ─── MONUMENTAL WALK-IN WARDROBE / ARMADIO ─── -->
    <!-- Positioned centre-left, dominant vertical element -->
    <g class="fi" id="wardrobe-main" transform="translate(390,160) rotate(-2)" filter="url(#chalk)">
      <!-- Outer frame — tall 3D box -->
      <polygon points="0,18 260,0 302,22 42,40" fill="none" stroke="rgba(238,235,220,0.94)" stroke-width="2.2"/>
      <!-- Front face left panel -->
      <polygon points="0,18 0,380 42,400 42,40" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.9"/>
      <!-- Right face receding -->
      <polygon points="42,40 42,400 302,380 302,22" fill="none" stroke="rgba(238,235,220,0.65)" stroke-width="1.5"/>
      <!-- ─ DOOR PANELING — 4 doors, 2 on front, 2 on right face ─ -->
      <!-- Front left door -->
      <rect x="4" y="26" width="34" height="356" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Door inset moulding left -->
      <rect x="7" y="32" width="28" height="160" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <rect x="7" y="200" width="28" height="166" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <!-- Horizontal rail split front door -->
      <line x1="4" y1="196" x2="38" y2="196" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Handle front left door -->
      <ellipse cx="36" cy="202" rx="2.5" ry="6" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <!-- RIGHT FACE — 3 doors -->
      <!-- Door dividers on right face -->
      <line x1="122" y1="40" x2="122" y2="398" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="202" y1="32" x2="202" y2="390" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Door insets right face -->
      <rect x="48" y="46" width="68" height="166" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <rect x="48" y="220" width="68" height="156" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <rect x="128" y="38" width="68" height="164" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <rect x="128" y="210" width="68" height="154" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <rect x="208" y="30" width="88" height="160" fill="none" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <rect x="208" y="198" width="88" height="152" fill="none" stroke="rgba(238,235,220,0.16)" stroke-width="0.4"/>
      <!-- Handles right face doors -->
      <ellipse cx="118" cy="220" rx="2" ry="5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="198" cy="212" rx="2" ry="5" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <ellipse cx="288" cy="204" rx="2" ry="5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <!-- ─ INSIDE GLIMPSE — open left door reveals interior ─ -->
      <!-- Hanging clothes bar at top -->
      <line x1="46" y1="56" x2="116" y2="50" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <!-- Hanging clothes silhouettes (triangular coat hangers) -->
      <line x1="55" y1="56" x2="55" y2="90" stroke="rgba(238,235,220,0.28)" stroke-width="0.6"/>
      <line x1="55" y1="56" x2="48" y2="76" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="55" y1="56" x2="62" y2="76" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="70" y1="53" x2="70" y2="92" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <line x1="70" y1="53" x2="63" y2="72" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="70" y1="53" x2="77" y2="72" stroke="rgba(238,235,220,0.20)" stroke-width="0.5"/>
      <line x1="85" y1="51" x2="85" y2="94" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <!-- Shelf inside bottom half -->
      <line x1="46" y1="220" x2="116" y2="214" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <line x1="46" y1="280" x2="116" y2="274" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <!-- Shoe shelf hint -->
      <rect x="48" y="342" width="66" height="10" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.4" transform="skewX(-6)"/>
      <!-- ─ TOP MOULDING ─ -->
      <!-- Cornice detail line -->
      <polygon points="0,10 260,-6 302,16 42,32" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.2"/>
      <!-- Base skirting -->
      <polygon points="0,378 42,398 302,378 260,358" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <!-- Base step/plinth -->
      <polygon points="0,380 0,396 42,416 42,400" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <polygon points="42,400 42,416 302,396 302,380" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
    </g>

    <!-- ─── LUXURY OPEN-PLAN KITCHEN — CENTRAL ZONE ─── -->
    <!-- Positioned centre-right, elaborate professional kitchen -->
    <g class="fi" id="kitchen-pro" transform="translate(680,550) rotate(1)" filter="url(#chalk)">
      <!-- ── ISLAND COUNTERTOP — statement piece ── -->
      <polygon points="0,32 340,0 384,24 44,56" fill="none" stroke="rgba(238,235,220,0.96)" stroke-width="2.3"/>
      <!-- Island front face -->
      <polygon points="0,32 0,122 44,140 44,56" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.7"/>
      <!-- Island right face -->
      <polygon points="44,56 44,140 384,116 384,24" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Waterfall edge detail -->
      <line x1="2" y1="32" x2="2" y2="118" stroke="rgba(238,235,220,0.72)" stroke-width="1.6"/>
      <!-- Overhang seating side -->
      <line x1="14" y1="28" x2="356" y2="2" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="6,4"/>
      <!-- ── PANEL DETAILING ── -->
      <!-- Fluted panel lines on island front -->
      <line x1="2" y1="34" x2="2" y2="118" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <line x1="8" y1="33" x2="8" y2="117" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="14" y1="33" x2="14" y2="117" stroke="rgba(238,235,220,0.26)" stroke-width="0.5"/>
      <line x1="20" y1="32" x2="20" y2="116" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="26" y1="32" x2="26" y2="116" stroke="rgba(238,235,220,0.22)" stroke-width="0.4"/>
      <line x1="32" y1="32" x2="32" y2="116" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <!-- Fluted panels right face (deeper perspective) -->
      <line x1="100" y1="57" x2="100" y2="138" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <line x1="170" y1="48" x2="170" y2="130" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
      <line x1="240" y1="40" x2="240" y2="122" stroke="rgba(238,235,220,0.20)" stroke-width="0.4"/>
      <line x1="310" y1="33" x2="310" y2="115" stroke="rgba(238,235,220,0.18)" stroke-width="0.4"/>
      <!-- ── COUNTERTOP ITEMS ── -->
      <!-- Professional induction range / hob -->
      <rect x="60" y="6" width="100" height="22" fill="none" stroke="rgba(238,235,220,0.58)" stroke-width="1.1" transform="skewX(-14)"/>
      <!-- Burner rings -->
      <ellipse cx="80" cy="14" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9" transform="skewX(-12)"/>
      <ellipse cx="100" cy="11" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8" transform="skewX(-12)"/>
      <ellipse cx="120" cy="8" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8" transform="skewX(-12)"/>
      <ellipse cx="140" cy="5" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7" transform="skewX(-12)"/>
      <!-- Sink basin -->
      <ellipse cx="248" cy="18" rx="36" ry="12" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.3" transform="skewX(-12)"/>
      <ellipse cx="248" cy="14" rx="26" ry="8" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8" transform="skewX(-12)"/>
      <!-- Tap — gooseneck style -->
      <line x1="280" y1="18" x2="280" y2="-8" stroke="rgba(238,235,220,0.74)" stroke-width="1.6"/>
      <path d="M280,-8 Q292,-8 298,4 Q302,10 298,18" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <ellipse cx="298" cy="18" rx="4" ry="1.5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <!-- Cutting board + food prep items -->
      <rect x="180" y="6" width="48" height="18" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0" transform="skewX(-14)"/>
      <!-- Vase with herbs/plant -->
      <ellipse cx="356" cy="14" rx="12" ry="4" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.1" transform="skewX(-12)"/>
      <line x1="348" y1="14" x2="346" y2="-14" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <line x1="364" y1="14" x2="366" y2="-14" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <ellipse cx="356" cy="-14" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9"/>
      <!-- Herb stems -->
      <line x1="356" y1="-14" x2="348" y2="-38" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="356" y1="-20" x2="366" y2="-44" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <circle cx="348" cy="-40" r="3" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.6"/>
      <circle cx="366" cy="-46" r="3" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.6"/>
      <!-- ── BAR STOOLS beneath overhang — 3 stools ── -->
      <!-- Stool 1 -->
      <ellipse cx="52" cy="-8" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <line x1="52" y1="-1" x2="52" y2="38" stroke="rgba(238,235,220,0.72)" stroke-width="2.0"/>
      <ellipse cx="52" cy="42" rx="14" ry="4.5" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <!-- Back of stool 1 -->
      <line x1="36" y1="-6" x2="32" y2="-30" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <line x1="68" y1="-6" x2="72" y2="-30" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="32" y1="-30" x2="72" y2="-30" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Stool 2 -->
      <ellipse cx="150" cy="-18" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.5"/>
      <line x1="150" y1="-11" x2="150" y2="28" stroke="rgba(238,235,220,0.68)" stroke-width="1.9"/>
      <ellipse cx="150" cy="32" rx="14" ry="4.5" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <line x1="134" y1="-16" x2="130" y2="-40" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="166" y1="-16" x2="170" y2="-40" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="130" y1="-40" x2="170" y2="-40" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Stool 3 -->
      <ellipse cx="248" cy="-28" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <line x1="248" y1="-21" x2="248" y2="18" stroke="rgba(238,235,220,0.64)" stroke-width="1.8"/>
      <ellipse cx="248" cy="22" rx="14" ry="4.5" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <line x1="232" y1="-26" x2="228" y2="-50" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="264" y1="-26" x2="268" y2="-50" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <line x1="228" y1="-50" x2="268" y2="-50" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <!-- ── UPPER CABINETS — floating wall units above ── -->
      <polygon points="30,-100 352,-148 386,-128 64,-80" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.7"/>
      <!-- Upper cabinet right face -->
      <polygon points="352,-148 386,-128 386,-68 352,-88" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <!-- Upper cabinet front face -->
      <polygon points="30,-100 30,-40 64,-20 64,-80" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <!-- Upper cabinet door dividers -->
      <line x1="114" y1="-132" x2="114" y2="-68" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="200" y1="-140" x2="200" y2="-76" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="284" y1="-146" x2="284" y2="-82" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- Upper cabinet handles -->
      <line x1="68" y1="-94" x2="76" y2="-94" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <line x1="154" y1="-100" x2="162" y2="-100" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="240" y1="-106" x2="248" y2="-106" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="318" y1="-112" x2="326" y2="-112" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- ── PENDANT LIGHTS above island — 3 drop lights ── -->
      <!-- Pendant 1 -->
      <line x1="120" y1="-200" x2="120" y2="-156" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <ellipse cx="120" cy="-150" rx="26" ry="8" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.7"/>
      <line x1="94" y1="-150" x2="98" y2="-120" stroke="rgba(238,235,220,0.76)" stroke-width="1.4"/>
      <line x1="146" y1="-150" x2="142" y2="-120" stroke="rgba(238,235,220,0.74)" stroke-width="1.4"/>
      <ellipse cx="120" cy="-120" rx="20" ry="6" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.3"/>
      <circle cx="120" cy="-122" r="4" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9" filter="url(#glow-micro)"/>
      <!-- Pendant 2 -->
      <line x1="200" y1="-200" x2="200" y2="-158" stroke="rgba(238,235,220,0.58)" stroke-width="1.1"/>
      <ellipse cx="200" cy="-152" rx="24" ry="7.5" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.6"/>
      <line x1="176" y1="-152" x2="180" y2="-124" stroke="rgba(238,235,220,0.72)" stroke-width="1.3"/>
      <line x1="224" y1="-152" x2="220" y2="-124" stroke="rgba(238,235,220,0.70)" stroke-width="1.3"/>
      <ellipse cx="200" cy="-124" rx="18" ry="5.5" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.2"/>
      <circle cx="200" cy="-126" r="3.5" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Pendant 3 -->
      <line x1="280" y1="-200" x2="280" y2="-162" stroke="rgba(238,235,220,0.54)" stroke-width="1.0"/>
      <ellipse cx="280" cy="-156" rx="22" ry="7" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <line x1="258" y1="-156" x2="262" y2="-130" stroke="rgba(238,235,220,0.68)" stroke-width="1.2"/>
      <line x1="302" y1="-156" x2="298" y2="-130" stroke="rgba(238,235,220,0.66)" stroke-width="1.2"/>
      <ellipse cx="280" cy="-130" rx="16" ry="5" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.1"/>
      <circle cx="280" cy="-132" r="3" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.8" filter="url(#glow-micro)"/>
      <!-- Light cones from pendants -->
      <line x1="98" y1="-120" x2="72" y2="-72" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="142" y1="-120" x2="168" y2="-72" stroke="rgba(238,235,220,0.06)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="178" y1="-124" x2="152" y2="-76" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,6"/>
      <line x1="222" y1="-124" x2="248" y2="-76" stroke="rgba(238,235,220,0.05)" stroke-width="0.5" stroke-dasharray="3,6"/>
    </g>

    <!-- ─── GRAND CENTRAL BOOKCASE WALL ─── -->
    <!-- Full-height library wall — dramatic central backdrop -->
    <g class="fi" id="library-wall" transform="translate(656,100) rotate(-1)" filter="url(#chalk-fine)">
      <!-- Outer architectural frame -->
      <rect x="0" y="0" width="200" height="440" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="2.0"/>
      <!-- ISO right depth panel -->
      <polygon points="200,0 232,18 232,458 200,440" fill="none" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <!-- ISO top panel -->
      <polygon points="0,0 200,0 232,18 32,18" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.6"/>
      <!-- ── ARCHITECTURAL PILASTERS ── -->
      <!-- Left pilaster -->
      <rect x="0" y="0" width="16" height="440" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.0"/>
      <rect x="0" y="18" width="16" height="14" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <rect x="0" y="408" width="16" height="14" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <!-- Right pilaster -->
      <rect x="184" y="0" width="16" height="440" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <!-- ── SHELF DIVISIONS — 6 bays, 5 shelves ── -->
      <line x1="16" y1="72" x2="184" y2="72" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <line x1="16" y1="146" x2="184" y2="146" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <line x1="16" y1="220" x2="184" y2="220" stroke="rgba(238,235,220,0.66)" stroke-width="1.3"/>
      <line x1="16" y1="294" x2="184" y2="294" stroke="rgba(238,235,220,0.64)" stroke-width="1.3"/>
      <line x1="16" y1="368" x2="184" y2="368" stroke="rgba(238,235,220,0.62)" stroke-width="1.2"/>
      <!-- Vertical divider column centre -->
      <line x1="100" y1="0" x2="100" y2="440" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <!-- ── BOOKS — rich varied heights and widths ── -->
      <!-- Shelf 1 left bay -->
      <line x1="20" y1="6" x2="20" y2="70" stroke="rgba(238,235,220,0.52)" stroke-width="2.8"/>
      <line x1="28" y1="6" x2="28" y2="70" stroke="rgba(238,235,220,0.46)" stroke-width="2.2"/>
      <line x1="34" y1="8" x2="34" y2="70" stroke="rgba(238,235,220,0.54)" stroke-width="3.2"/>
      <line x1="42" y1="6" x2="42" y2="70" stroke="rgba(238,235,220,0.42)" stroke-width="2.0"/>
      <line x1="48" y1="4" x2="48" y2="70" stroke="rgba(238,235,220,0.50)" stroke-width="2.6"/>
      <line x1="56" y1="8" x2="56" y2="70" stroke="rgba(238,235,220,0.44)" stroke-width="1.8"/>
      <line x1="62" y1="6" x2="62" y2="70" stroke="rgba(238,235,220,0.48)" stroke-width="3.0"/>
      <line x1="70" y1="6" x2="68" y2="70" stroke="rgba(238,235,220,0.40)" stroke-width="2.4" transform="rotate(5,70,70)"/>
      <line x1="80" y1="8" x2="80" y2="70" stroke="rgba(238,235,220,0.46)" stroke-width="2.2"/>
      <line x1="88" y1="6" x2="88" y2="70" stroke="rgba(238,235,220,0.42)" stroke-width="1.9"/>
      <!-- Shelf 1 right bay -->
      <line x1="104" y1="6" x2="104" y2="70" stroke="rgba(238,235,220,0.50)" stroke-width="2.6"/>
      <line x1="112" y1="8" x2="112" y2="70" stroke="rgba(238,235,220,0.44)" stroke-width="2.0"/>
      <line x1="118" y1="6" x2="118" y2="70" stroke="rgba(238,235,220,0.52)" stroke-width="3.2"/>
      <line x1="126" y1="6" x2="126" y2="70" stroke="rgba(238,235,220,0.40)" stroke-width="1.8"/>
      <line x1="132" y1="8" x2="132" y2="70" stroke="rgba(238,235,220,0.48)" stroke-width="2.8"/>
      <line x1="140" y1="6" x2="140" y2="70" stroke="rgba(238,235,220,0.44)" stroke-width="2.2"/>
      <line x1="148" y1="8" x2="148" y2="70" stroke="rgba(238,235,220,0.46)" stroke-width="2.0"/>
      <line x1="156" y1="6" x2="156" y2="70" stroke="rgba(238,235,220,0.42)" stroke-width="3.0"/>
      <line x1="164" y1="4" x2="164" y2="70" stroke="rgba(238,235,220,0.40)" stroke-width="1.8"/>
      <line x1="172" y1="6" x2="172" y2="70" stroke="rgba(238,235,220,0.44)" stroke-width="2.4"/>
      <line x1="180" y1="8" x2="180" y2="70" stroke="rgba(238,235,220,0.38)" stroke-width="2.0"/>
      <!-- Shelf 2 — left bay books -->
      <line x1="20" y1="78" x2="20" y2="144" stroke="rgba(238,235,220,0.48)" stroke-width="2.6"/>
      <line x1="28" y1="80" x2="28" y2="144" stroke="rgba(238,235,220,0.42)" stroke-width="2.0"/>
      <line x1="36" y1="78" x2="36" y2="144" stroke="rgba(238,235,220,0.50)" stroke-width="3.0"/>
      <line x1="44" y1="82" x2="44" y2="144" stroke="rgba(238,235,220,0.38)" stroke-width="1.8"/>
      <line x1="52" y1="78" x2="52" y2="144" stroke="rgba(238,235,220,0.46)" stroke-width="2.4"/>
      <line x1="60" y1="80" x2="60" y2="144" stroke="rgba(238,235,220,0.42)" stroke-width="2.0"/>
      <line x1="68" y1="78" x2="68" y2="144" stroke="rgba(238,235,220,0.44)" stroke-width="2.8"/>
      <line x1="76" y1="80" x2="76" y2="144" stroke="rgba(238,235,220,0.38)" stroke-width="1.8"/>
      <line x1="84" y1="78" x2="84" y2="144" stroke="rgba(238,235,220,0.42)" stroke-width="2.2"/>
      <!-- Shelf 2 right bay — decorative items + books -->
      <line x1="104" y1="78" x2="104" y2="144" stroke="rgba(238,235,220,0.44)" stroke-width="2.4"/>
      <line x1="112" y1="80" x2="112" y2="144" stroke="rgba(238,235,220,0.40)" stroke-width="1.9"/>
      <line x1="120" y1="78" x2="120" y2="144" stroke="rgba(238,235,220,0.48)" stroke-width="2.8"/>
      <!-- Small vase on shelf 2 right -->
      <ellipse cx="142" cy="144" rx="9" ry="3" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="0.9"/>
      <line x1="133" y1="144" x2="131" y2="116" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <line x1="151" y1="144" x2="153" y2="116" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <ellipse cx="142" cy="116" rx="7" ry="2.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <line x1="142" y1="113" x2="138" y2="92" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <circle cx="137" cy="90" r="3" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.6"/>
      <line x1="142" y1="102" x2="152" y2="86" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <circle cx="153" cy="84" r="2.5" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6"/>
      <line x1="158" y1="78" x2="158" y2="144" stroke="rgba(238,235,220,0.36)" stroke-width="2.0"/>
      <line x1="166" y1="80" x2="166" y2="144" stroke="rgba(238,235,220,0.40)" stroke-width="2.6"/>
      <line x1="174" y1="78" x2="174" y2="144" stroke="rgba(238,235,220,0.38)" stroke-width="1.8"/>
      <!-- Shelf 3 — left bay: decorative arrangement -->
      <!-- Bust/sculpture -->
      <line x1="28" y1="152" x2="26" y2="200" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <ellipse cx="26" cy="208" rx="8" ry="12" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
      <circle cx="26" cy="196" r="7" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <ellipse cx="26" cy="218" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <!-- Books beside bust -->
      <line x1="38" y1="150" x2="38" y2="218" stroke="rgba(238,235,220,0.44)" stroke-width="2.6"/>
      <line x1="46" y1="152" x2="46" y2="218" stroke="rgba(238,235,220,0.40)" stroke-width="2.0"/>
      <line x1="54" y1="150" x2="54" y2="218" stroke="rgba(238,235,220,0.46)" stroke-width="2.8"/>
      <line x1="62" y1="152" x2="62" y2="218" stroke="rgba(238,235,220,0.38)" stroke-width="1.8"/>
      <line x1="70" y1="150" x2="70" y2="218" stroke="rgba(238,235,220,0.42)" stroke-width="2.2"/>
      <line x1="78" y1="150" x2="78" y2="218" stroke="rgba(238,235,220,0.40)" stroke-width="2.0"/>
      <!-- Shelf 3 right bay: candles + art object -->
      <line x1="104" y1="150" x2="104" y2="218" stroke="rgba(238,235,220,0.42)" stroke-width="2.4"/>
      <line x1="112" y1="152" x2="112" y2="218" stroke="rgba(238,235,220,0.38)" stroke-width="1.9"/>
      <!-- Tall art candle -->
      <rect x="124" y="150" width="8" height="54" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8" transform="skewX(-6)"/>
      <circle cx="128" cy="149" r="2" fill="none" stroke="rgba(238,235,220,0.42)" stroke-width="0.7" filter="url(#glow-micro)"/>
      <rect x="136" y="156" width="7" height="46" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.8" transform="skewX(-6)"/>
      <circle cx="139" cy="155" r="2" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7" filter="url(#glow-micro)"/>
      <!-- More books right -->
      <line x1="148" y1="150" x2="148" y2="218" stroke="rgba(238,235,220,0.40)" stroke-width="2.6"/>
      <line x1="156" y1="152" x2="156" y2="218" stroke="rgba(238,235,220,0.36)" stroke-width="2.0"/>
      <line x1="164" y1="150" x2="164" y2="218" stroke="rgba(238,235,220,0.42)" stroke-width="2.8"/>
      <line x1="172" y1="152" x2="172" y2="218" stroke="rgba(238,235,220,0.36)" stroke-width="1.8"/>
      <!-- Shelf 4 — mixed books -->
      <line x1="20" y1="226" x2="20" y2="292" stroke="rgba(238,235,220,0.44)" stroke-width="2.4"/>
      <line x1="28" y1="228" x2="28" y2="292" stroke="rgba(238,235,220,0.40)" stroke-width="1.9"/>
      <line x1="36" y1="226" x2="36" y2="292" stroke="rgba(238,235,220,0.46)" stroke-width="2.8"/>
      <line x1="44" y1="228" x2="44" y2="292" stroke="rgba(238,235,220,0.36)" stroke-width="1.7"/>
      <line x1="52" y1="226" x2="52" y2="292" stroke="rgba(238,235,220,0.42)" stroke-width="2.4"/>
      <line x1="60" y1="228" x2="60" y2="292" stroke="rgba(238,235,220,0.38)" stroke-width="2.0"/>
      <line x1="68" y1="226" x2="68" y2="292" stroke="rgba(238,235,220,0.44)" stroke-width="2.6"/>
      <line x1="76" y1="230" x2="76" y2="292" stroke="rgba(238,235,220,0.36)" stroke-width="1.8"/>
      <line x1="84" y1="226" x2="84" y2="292" stroke="rgba(238,235,220,0.40)" stroke-width="2.2"/>
      <line x1="104" y1="226" x2="104" y2="292" stroke="rgba(238,235,220,0.42)" stroke-width="2.4"/>
      <line x1="112" y1="228" x2="112" y2="292" stroke="rgba(238,235,220,0.36)" stroke-width="1.8"/>
      <line x1="120" y1="226" x2="120" y2="292" stroke="rgba(238,235,220,0.44)" stroke-width="2.8"/>
      <line x1="128" y1="230" x2="128" y2="292" stroke="rgba(238,235,220,0.36)" stroke-width="1.6"/>
      <line x1="136" y1="226" x2="136" y2="292" stroke="rgba(238,235,220,0.40)" stroke-width="2.0"/>
      <!-- Shelf 5 — art + books -->
      <line x1="20" y1="300" x2="20" y2="366" stroke="rgba(238,235,220,0.40)" stroke-width="2.2"/>
      <line x1="28" y1="302" x2="28" y2="366" stroke="rgba(238,235,220,0.36)" stroke-width="1.8"/>
      <line x1="36" y1="300" x2="36" y2="366" stroke="rgba(238,235,220,0.42)" stroke-width="2.6"/>
      <line x1="44" y1="302" x2="44" y2="366" stroke="rgba(238,235,220,0.34)" stroke-width="1.6"/>
      <line x1="52" y1="300" x2="52" y2="366" stroke="rgba(238,235,220,0.38)" stroke-width="2.0"/>
      <line x1="60" y1="302" x2="60" y2="366" stroke="rgba(238,235,220,0.36)" stroke-width="2.4"/>
      <!-- Small framed print on shelf 5 -->
      <rect x="70" y="300" width="24" height="36" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <rect x="73" y="303" width="18" height="30" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.4"/>
      <line x1="73" y1="303" x2="91" y2="333" stroke="rgba(238,235,220,0.14)" stroke-width="0.4"/>
      <line x1="91" y1="303" x2="73" y2="333" stroke="rgba(238,235,220,0.12)" stroke-width="0.4"/>
      <line x1="104" y1="300" x2="104" y2="366" stroke="rgba(238,235,220,0.38)" stroke-width="2.2"/>
      <line x1="112" y1="302" x2="112" y2="366" stroke="rgba(238,235,220,0.34)" stroke-width="1.8"/>
      <line x1="120" y1="300" x2="120" y2="366" stroke="rgba(238,235,220,0.40)" stroke-width="2.6"/>
      <line x1="128" y1="302" x2="128" y2="366" stroke="rgba(238,235,220,0.34)" stroke-width="1.6"/>
      <line x1="136" y1="300" x2="136" y2="366" stroke="rgba(238,235,220,0.36)" stroke-width="2.0"/>
      <line x1="144" y1="302" x2="144" y2="366" stroke="rgba(238,235,220,0.32)" stroke-width="2.4"/>
      <line x1="152" y1="300" x2="152" y2="366" stroke="rgba(238,235,220,0.34)" stroke-width="1.8"/>
      <line x1="160" y1="302" x2="160" y2="366" stroke="rgba(238,235,220,0.30)" stroke-width="2.2"/>
      <line x1="168" y1="300" x2="168" y2="366" stroke="rgba(238,235,220,0.32)" stroke-width="1.6"/>
      <line x1="176" y1="302" x2="176" y2="366" stroke="rgba(238,235,220,0.30)" stroke-width="2.0"/>
      <!-- Shelf 6 — bottom curated shelf -->
      <!-- Sculptural book ends + oversize volumes -->
      <line x1="20" y1="374" x2="20" y2="440" stroke="rgba(238,235,220,0.38)" stroke-width="3.2"/>
      <line x1="32" y1="374" x2="32" y2="440" stroke="rgba(238,235,220,0.34)" stroke-width="2.4"/>
      <line x1="42" y1="374" x2="42" y2="440" stroke="rgba(238,235,220,0.38)" stroke-width="3.6"/>
      <line x1="54" y1="376" x2="54" y2="440" stroke="rgba(238,235,220,0.30)" stroke-width="2.0"/>
      <!-- Horizontal stacked books -->
      <rect x="64" y="408" width="28" height="10" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.7" transform="skewX(-8)"/>
      <rect x="64" y="418" width="24" height="10" fill="none" stroke="rgba(238,235,220,0.30)" stroke-width="0.6" transform="skewX(-8)"/>
      <rect x="64" y="428" width="32" height="10" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" transform="skewX(-8)"/>
      <!-- Right bottom bay books -->
      <line x1="104" y1="374" x2="104" y2="440" stroke="rgba(238,235,220,0.36)" stroke-width="2.8"/>
      <line x1="114" y1="376" x2="114" y2="440" stroke="rgba(238,235,220,0.30)" stroke-width="2.0"/>
      <line x1="122" y1="374" x2="122" y2="440" stroke="rgba(238,235,220,0.34)" stroke-width="3.2"/>
      <line x1="132" y1="376" x2="132" y2="440" stroke="rgba(238,235,220,0.28)" stroke-width="1.8"/>
      <line x1="140" y1="374" x2="140" y2="440" stroke="rgba(238,235,220,0.32)" stroke-width="2.4"/>
      <line x1="150" y1="374" x2="150" y2="440" stroke="rgba(238,235,220,0.28)" stroke-width="2.0"/>
      <line x1="158" y1="376" x2="158" y2="440" stroke="rgba(238,235,220,0.30)" stroke-width="3.0"/>
      <line x1="168" y1="374" x2="168" y2="440" stroke="rgba(238,235,220,0.26)" stroke-width="1.8"/>
      <line x1="176" y1="376" x2="176" y2="440" stroke="rgba(238,235,220,0.28)" stroke-width="2.2"/>
      <!-- ── LADDER — rolling library ladder ── -->
      <!-- Ladder rails -->
      <line x1="186" y1="60" x2="196" y2="420" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="198" y1="56" x2="208" y2="416" stroke="rgba(238,235,220,0.52)" stroke-width="1.2"/>
      <!-- Ladder rungs -->
      <line x1="188" y1="100" x2="200" y2="98" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <line x1="189" y1="140" x2="201" y2="138" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <line x1="190" y1="180" x2="202" y2="178" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="191" y1="220" x2="203" y2="218" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <line x1="192" y1="260" x2="204" y2="258" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <line x1="193" y1="300" x2="205" y2="298" stroke="rgba(238,235,220,0.34)" stroke-width="0.7"/>
      <line x1="194" y1="340" x2="206" y2="338" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <!-- Ladder floor track -->
      <line x1="186" y1="440" x2="214" y2="440" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- Ladder top hook -->
      <path d="M192,60 Q192,44 200,40" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
    </g>

    <!-- ─── VELVET CHAISE LONGUE — elegant horizontal statement ─── -->
    <!-- Centre-bottom composition piece -->
    <g class="fi" id="chaise-longue" transform="translate(480,740) rotate(-3)" filter="url(#chalk)">
      <!-- Reclined back + main body top -->
      <polygon points="0,48 400,0 444,28 44,76" fill="none" stroke="rgba(238,235,220,0.94)" stroke-width="2.1"/>
      <!-- Front face -->
      <polygon points="0,48 0,108 44,130 44,76" fill="none" stroke="rgba(238,235,220,0.74)" stroke-width="1.6"/>
      <!-- Right face -->
      <polygon points="44,76 44,130 444,102 444,28" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.4"/>
      <!-- Reclined headrest end — raised left side -->
      <polygon points="0,48 -8,2 4,-14 12,28" fill="none" stroke="rgba(238,235,220,0.82)" stroke-width="1.7"/>
      <ellipse cx="-4" cy="2" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <!-- Rolled open end right -->
      <polygon points="400,0 420,-10 420,46 400,56" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <ellipse cx="410" cy="-10" rx="10" ry="3.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.9"/>
      <!-- Cushion seams lengthwise -->
      <line x1="16" y1="56" x2="416" y2="8" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <line x1="8" y1="64" x2="408" y2="16" stroke="rgba(238,235,220,0.18)" stroke-width="0.5"/>
      <!-- Button tufts -->
      <circle cx="72" cy="42" r="3.5" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.7"/>
      <circle cx="164" cy="28" r="3.5" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.7"/>
      <circle cx="256" cy="20" r="3.5" fill="none" stroke="rgba(238,235,220,0.26)" stroke-width="0.6"/>
      <circle cx="348" cy="12" r="3" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.6"/>
      <!-- Fringe/tassel detail along base -->
      <line x1="4" y1="106" x2="4" y2="118" stroke="rgba(238,235,220,0.38)" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="16" y1="108" x2="16" y2="120" stroke="rgba(238,235,220,0.36)" stroke-width="0.6" stroke-dasharray="2,2"/>
      <line x1="28" y1="110" x2="28" y2="122" stroke="rgba(238,235,220,0.36)" stroke-width="0.6" stroke-dasharray="2,2"/>
      <!-- Cabriole legs — decorative curved -->
      <path d="M6,106 Q2,120 6,134" fill="none" stroke="rgba(238,235,220,0.68)" stroke-width="1.4"/>
      <path d="M42,128 Q38,142 42,156" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <path d="M400,56 Q404,70 400,84" fill="none" stroke="rgba(238,235,220,0.60)" stroke-width="1.3"/>
      <path d="M440,30 Q444,44 440,58" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Foot pads -->
      <ellipse cx="6" cy="134" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.8"/>
      <ellipse cx="42" cy="156" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <!-- Throw cushion / pillow on headrest end -->
      <polygon points="-4,8 36,-4 42,10 2,22" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="18" y1="0" x2="22" y2="18" stroke="rgba(238,235,220,0.22)" stroke-width="0.5"/>
    </g>

    <!-- ─── DRESSING TABLE / VANITY ─── -->
    <!-- Elegant makeup/dressing station — upper right zone -->
    <g class="fi" id="dressing-table" transform="translate(1046,230) rotate(2)" filter="url(#chalk)">
      <!-- Table top -->
      <polygon points="0,22 180,4 204,18 24,36" fill="none" stroke="rgba(238,235,220,0.86)" stroke-width="1.8"/>
      <!-- Front face -->
      <polygon points="0,22 0,82 24,94 24,36" fill="none" stroke="rgba(238,235,220,0.66)" stroke-width="1.4"/>
      <!-- Right face -->
      <polygon points="24,36 24,94 204,76 204,18" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Drawer row — 3 drawers on right face -->
      <line x1="80" y1="38" x2="80" y2="92" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <line x1="140" y1="30" x2="140" y2="84" stroke="rgba(238,235,220,0.38)" stroke-width="0.8"/>
      <!-- Drawer handles -->
      <line x1="48" y1="64" x2="56" y2="64" stroke="rgba(238,235,220,0.52)" stroke-width="1.1"/>
      <line x1="106" y1="58" x2="114" y2="58" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="164" y1="52" x2="172" y2="52" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Front drawer panel -->
      <rect x="2" y="26" width="20" height="64" fill="none" stroke="rgba(238,235,220,0.32)" stroke-width="0.6"/>
      <line x1="8" y1="58" x2="16" y2="58" stroke="rgba(238,235,220,0.46)" stroke-width="1.0"/>
      <!-- Tapered legs — 4 elegant ones -->
      <line x1="2" y1="80" x2="0" y2="124" stroke="rgba(238,235,220,0.64)" stroke-width="1.4"/>
      <line x1="22" y1="92" x2="22" y2="136" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="188" y1="74" x2="188" y2="118" stroke="rgba(238,235,220,0.58)" stroke-width="1.3"/>
      <line x1="202" y1="76" x2="204" y2="120" stroke="rgba(238,235,220,0.54)" stroke-width="1.2"/>
      <!-- ── OVAL MIRROR above ── -->
      <ellipse cx="102" cy="-52" rx="52" ry="68" fill="none" stroke="rgba(238,235,220,0.76)" stroke-width="1.8"/>
      <!-- Mirror frame inner -->
      <ellipse cx="102" cy="-52" rx="44" ry="58" fill="none" stroke="rgba(238,235,220,0.35)" stroke-width="0.7"/>
      <!-- Mirror highlights / reflections -->
      <line x1="64" y1="-52" x2="140" y2="-52" stroke="rgba(238,235,220,0.10)" stroke-width="0.4"/>
      <line x1="102" y1="-120" x2="102" y2="16" stroke="rgba(238,235,220,0.08)" stroke-width="0.4"/>
      <line x1="68" y1="-90" x2="136" y2="-14" stroke="rgba(238,235,220,0.07)" stroke-width="0.3"/>
      <!-- Mirror stand posts to table -->
      <line x1="64" y1="16" x2="60" y2="24" stroke="rgba(238,235,220,0.55)" stroke-width="1.1"/>
      <line x1="140" y1="16" x2="144" y2="24" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- ── ITEMS ON VANITY TOP ── -->
      <!-- Perfume bottles -->
      <rect x="30" y="10" width="10" height="14" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.0" transform="skewX(-8)"/>
      <rect x="42" y="8" width="8" height="16" fill="none" stroke="rgba(238,235,220,0.52)" stroke-width="0.9" transform="skewX(-8)"/>
      <!-- Bottle tops -->
      <rect x="32" y="6" width="6" height="4" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.7" transform="skewX(-8)"/>
      <rect x="43" y="4" width="6" height="4" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7" transform="skewX(-8)"/>
      <!-- Small decorative tray -->
      <polygon points="24,18 80,8 86,14 30,24" fill="none" stroke="rgba(238,235,220,0.34)" stroke-width="0.6"/>
      <!-- Brush / makeup item -->
      <line x1="70" y1="14" x2="68" y2="-6" stroke="rgba(238,235,220,0.42)" stroke-width="0.8"/>
      <ellipse cx="69" cy="-6" rx="3" ry="5" fill="none" stroke="rgba(238,235,220,0.38)" stroke-width="0.7"/>
      <!-- Small candle right side -->
      <rect x="148" y="10" width="8" height="12" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9" transform="skewX(-8)"/>
      <circle cx="152" cy="9" r="1.8" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.7" filter="url(#glow-micro)"/>
      <!-- Stool in front of dressing table -->
      <ellipse cx="102" cy="108" rx="38" ry="12" fill="none" stroke="rgba(238,235,220,0.78)" stroke-width="1.5"/>
      <!-- Stool seat cushion upholstery hint -->
      <ellipse cx="102" cy="112" rx="32" ry="10" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7" stroke-dasharray="3,4"/>
      <!-- Stool legs -->
      <line x1="70" y1="112" x2="64" y2="150" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <line x1="134" y1="112" x2="140" y2="150" stroke="rgba(238,235,220,0.60)" stroke-width="1.2"/>
      <line x1="102" y1="120" x2="102" y2="158" stroke="rgba(238,235,220,0.56)" stroke-width="1.1"/>
      <!-- Cross stretcher stool -->
      <line x1="68" y1="136" x2="136" y2="132" stroke="rgba(238,235,220,0.28)" stroke-width="0.6" stroke-dasharray="3,4"/>
    </g>

    <!-- ─── MODULAR KITCHEN WALL UNITS — upper right wall ─── -->
    <g class="fi" id="kitchen-wall-units" transform="translate(1040,100) rotate(2)" filter="url(#chalk)">
      <!-- Wall cabinets — tall pantry unit left -->
      <polygon points="0,12 90,0 108,10 18,22" fill="none" stroke="rgba(238,235,220,0.84)" stroke-width="1.7"/>
      <!-- Front face tall pantry -->
      <polygon points="0,12 0,280 18,290 18,22" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.5"/>
      <!-- Right face tall pantry -->
      <polygon points="18,22 18,290 108,280 108,10" fill="none" stroke="rgba(238,235,220,0.56)" stroke-width="1.2"/>
      <!-- Pantry door split upper/lower half -->
      <line x1="0" y1="150" x2="18" y2="150" stroke="rgba(238,235,220,0.48)" stroke-width="0.9"/>
      <line x1="18" y1="150" x2="108" y2="144" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <!-- Pantry door panels -->
      <rect x="2" y="18" width="14" height="126" fill="none" stroke="rgba(238,235,220,0.28)" stroke-width="0.5"/>
      <rect x="2" y="156" width="14" height="120" fill="none" stroke="rgba(238,235,220,0.24)" stroke-width="0.5"/>
      <!-- Pantry handles -->
      <line x1="14" y1="82" x2="14" y2="94" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <line x1="14" y1="212" x2="14" y2="224" stroke="rgba(238,235,220,0.52)" stroke-width="1.0"/>
      <!-- Wide base unit next to pantry -->
      <polygon points="108,10 262,0 278,8 124,18" fill="none" stroke="rgba(238,235,220,0.80)" stroke-width="1.6"/>
      <polygon points="108,10 108,90 124,98 124,18" fill="none" stroke="rgba(238,235,220,0.62)" stroke-width="1.3"/>
      <polygon points="124,18 124,98 278,88 278,8" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.1"/>
      <!-- Worktop on base unit -->
      <polygon points="104,6 266,-4 282,4 120,14" fill="none" stroke="rgba(238,235,220,0.72)" stroke-width="1.4"/>
      <!-- Worktop front -->
      <polygon points="104,6 104,14 120,22 120,14" fill="none" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <!-- Base unit door dividers -->
      <line x1="188" y1="8" x2="188" y2="86" stroke="rgba(238,235,220,0.40)" stroke-width="0.8"/>
      <!-- Base door panel insets -->
      <rect x="128" y="20" width="54" height="64" fill="none" stroke="rgba(238,235,220,0.22)" stroke-width="0.4" transform="skewX(-5)"/>
      <rect x="194" y="14" width="54" height="64" fill="none" stroke="rgba(238,235,220,0.20)" stroke-width="0.4" transform="skewX(-5)"/>
      <!-- Handles base unit -->
      <line x1="152" y1="50" x2="152" y2="60" stroke="rgba(238,235,220,0.50)" stroke-width="1.0"/>
      <line x1="220" y1="44" x2="220" y2="54" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <!-- Worktop items — coffee machine, bowl -->
      <rect x="128" y="6" width="36" height="8" fill="none" stroke="rgba(238,235,220,0.46)" stroke-width="0.9" transform="skewX(-6)"/>
      <ellipse cx="130" cy="3" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.40)" stroke-width="0.7"/>
      <!-- Coffee mug -->
      <ellipse cx="174" cy="2" rx="8" ry="2.5" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="0.8"/>
      <ellipse cx="174" cy="6" rx="6" ry="2" fill="none" stroke="rgba(238,235,220,0.36)" stroke-width="0.6"/>
      <!-- Upper wall cabinet run above base -->
      <polygon points="108,-84 262,-92 278,-84 124,-76" fill="none" stroke="rgba(238,235,220,0.70)" stroke-width="1.4"/>
      <polygon points="108,-84 108,-26 124,-18 124,-76" fill="none" stroke="rgba(238,235,220,0.54)" stroke-width="1.1"/>
      <polygon points="124,-76 124,-18 278,-28 278,-84" fill="none" stroke="rgba(238,235,220,0.44)" stroke-width="1.0"/>
      <!-- Upper cabinet door split -->
      <line x1="194" y1="-88" x2="194" y2="-28" stroke="rgba(238,235,220,0.36)" stroke-width="0.7"/>
      <line x1="124" y1="-48" x2="194" y2="-56" stroke="rgba(238,235,220,0.28)" stroke-width="0.5" stroke-dasharray="3,4"/>
      <line x1="194" y1="-52" x2="278" y2="-56" stroke="rgba(238,235,220,0.26)" stroke-width="0.5" stroke-dasharray="3,4"/>
      <!-- Handles upper cabinet -->
      <line x1="155" y1="-56" x2="163" y2="-56" stroke="rgba(238,235,220,0.48)" stroke-width="1.0"/>
      <line x1="226" y1="-60" x2="234" y2="-60" stroke="rgba(238,235,220,0.46)" stroke-width="0.9"/>
    </g>

    <!-- ──────────────────────────────────────────────────────────────
         BLUEPRINT ANNOTATIONS — dimension lines, axes
    ─────────────────────────────────────────────────────────────── -->
    <g class="annot">
      <!-- Vertical axis lines -->
      <line x1="380" y1="0" x2="380" y2="900" stroke="rgba(238,235,220,0.042)" stroke-width="0.4" stroke-dasharray="2,12"/>
      <line x1="720" y1="0" x2="720" y2="900" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="1060" y1="0" x2="1060" y2="900" stroke="rgba(238,235,220,0.042)" stroke-width="0.4" stroke-dasharray="2,12"/>
      <!-- Horizontal axis lines -->
      <line x1="0" y1="260" x2="1440" y2="260" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="0" y1="580" x2="1440" y2="580" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <!-- Dimension lines with tick marks — updated with new central elements -->
      <line x1="510" y1="385" x2="888" y2="385" stroke="rgba(238,235,220,0.50)" stroke-width="0.6" stroke-dasharray="5,5"/>
      <line x1="510" y1="380" x2="510" y2="390" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <line x1="888" y1="380" x2="888" y2="390" stroke="rgba(238,235,220,0.55)" stroke-width="0.8"/>
      <line x1="720" y1="68" x2="874" y2="68" stroke="rgba(238,235,220,0.42)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <line x1="720" y1="63" x2="720" y2="73" stroke="rgba(238,235,220,0.46)" stroke-width="0.7"/>
      <line x1="874" y1="63" x2="874" y2="73" stroke="rgba(238,235,220,0.46)" stroke-width="0.7"/>
      <line x1="1196" y1="138" x2="1196" y2="395" stroke="rgba(238,235,220,0.40)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <line x1="1191" y1="138" x2="1201" y2="138" stroke="rgba(238,235,220,0.44)" stroke-width="0.7"/>
      <line x1="1191" y1="395" x2="1201" y2="395" stroke="rgba(238,235,220,0.44)" stroke-width="0.7"/>
      <!-- Arrow dimension heads -->
      <polyline points="516,382 510,385 516,388" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.6"/>
      <polyline points="882,382 888,385 882,388" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.6"/>
      <!-- Cross markers at grid intersections -->
      <line x1="377" y1="257" x2="383" y2="263" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="383" y1="257" x2="377" y2="263" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="717" y1="577" x2="723" y2="583" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="723" y1="577" x2="717" y2="583" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="1057" y1="257" x2="1063" y2="263" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="1063" y1="257" x2="1057" y2="263" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <!-- Radial construction lines from central vanishing point -->
      <line x1="720" y1="420" x2="180" y2="140" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="420" x2="1260" y2="140" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="420" x2="140" y2="760" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="420" x2="1300" y2="760" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="420" x2="720" y2="0" stroke="rgba(238,235,220,0.022)" stroke-width="0.3" stroke-dasharray="2,14"/>
      <line x1="720" y1="420" x2="720" y2="900" stroke="rgba(238,235,220,0.022)" stroke-width="0.3" stroke-dasharray="2,14"/>
      <!-- Additional radials from off-centre VP -->
      <line x1="560" y1="380" x2="90" y2="200" stroke="rgba(238,235,220,0.018)" stroke-width="0.3" stroke-dasharray="2,16"/>
      <line x1="560" y1="380" x2="1380" y2="600" stroke="rgba(238,235,220,0.018)" stroke-width="0.3" stroke-dasharray="2,16"/>
    </g>

    <!-- Connection node web — expanded with new elements -->
    <g class="conn">
      <!-- Primary nodes -->
      <circle cx="162" cy="138" r="2.4" fill="rgba(238,235,220,0.55)"/>
      <circle cx="428" cy="362" r="2.0" fill="rgba(238,235,220,0.48)"/>
      <circle cx="620" cy="110" r="2.2" fill="rgba(238,235,220,0.52)"/>
      <circle cx="720" cy="420" r="2.8" fill="rgba(238,235,220,0.62)"/>
      <circle cx="1018" cy="585" r="2.0" fill="rgba(238,235,220,0.46)"/>
      <circle cx="856" cy="195" r="2.4" fill="rgba(238,235,220,0.54)"/>
      <circle cx="352" cy="668" r="1.8" fill="rgba(238,235,220,0.42)"/>
      <circle cx="1170" cy="305" r="2.2" fill="rgba(238,235,220,0.50)"/>
      <circle cx="578" cy="754" r="1.8" fill="rgba(238,235,220,0.40)"/>
      <circle cx="488" cy="480" r="1.8" fill="rgba(238,235,220,0.44)"/>
      <!-- New nodes for new furniture -->
      <circle cx="700" cy="390" r="2.4" fill="rgba(238,235,220,0.58)"/>
      <circle cx="960" cy="220" r="2.0" fill="rgba(238,235,220,0.48)"/>
      <circle cx="178" cy="386" r="1.8" fill="rgba(238,235,220,0.44)"/>
      <circle cx="1298" cy="310" r="2.0" fill="rgba(238,235,220,0.46)"/>
      <circle cx="760" cy="548" r="1.8" fill="rgba(238,235,220,0.42)"/>
      <circle cx="238" cy="524" r="1.8" fill="rgba(238,235,220,0.40)"/>
      <!-- Connection lines — original -->
      <line x1="162" y1="138" x2="428" y2="362" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="428" y1="362" x2="720" y2="420" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="620" y1="110" x2="856" y2="195" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="856" y1="195" x2="1018" y2="585" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="352" y1="668" x2="720" y2="420" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="1018" y1="585" x2="1170" y2="305" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="578" y1="754" x2="720" y2="420" stroke="rgba(238,235,220,0.05)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="488" y1="480" x2="620" y2="110" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <line x1="162" y1="138" x2="720" y2="420" stroke="rgba(238,235,220,0.04)" stroke-width="0.3" stroke-dasharray="2,14"/>
      <!-- Connection lines — new -->
      <line x1="700" y1="390" x2="960" y2="220" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="700" y1="390" x2="488" y2="480" stroke="rgba(238,235,220,0.05)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="178" y1="386" x2="238" y2="524" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="1298" y1="310" x2="1170" y2="305" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="760" y1="548" x2="700" y2="390" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <line x1="960" y1="220" x2="1170" y2="305" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <!-- Nodes for new elements -->
      <circle cx="1220" cy="240" r="2.2" fill="rgba(238,235,220,0.52)"/>
      <circle cx="1185" cy="496" r="2.0" fill="rgba(238,235,220,0.48)"/>
      <circle cx="1165" cy="700" r="1.9" fill="rgba(238,235,220,0.44)"/>
      <circle cx="64" cy="200" r="1.8" fill="rgba(238,235,220,0.42)"/>
      <circle cx="540" cy="98" r="2.0" fill="rgba(238,235,220,0.46)"/>
      <circle cx="906" cy="98" r="2.0" fill="rgba(238,235,220,0.46)"/>
      <circle cx="1320" cy="118" r="1.9" fill="rgba(238,235,220,0.44)"/>
      <circle cx="900" cy="748" r="1.8" fill="rgba(238,235,220,0.42)"/>
      <circle cx="548" cy="700" r="1.8" fill="rgba(238,235,220,0.40)"/>
      <circle cx="1382" cy="620" r="1.7" fill="rgba(238,235,220,0.38)"/>
      <!-- New connection lines -->
      <line x1="1220" cy="240" x2="1170" y2="305" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="1185" y1="496" x2="1170" y2="305" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="1165" y1="700" x2="1018" y2="585" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="64" y1="200" x2="162" y2="138" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="540" y1="98" x2="620" y2="110" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="906" y1="98" x2="856" y2="195" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="900" y1="748" x2="1018" y2="585" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="548" y1="700" x2="578" y2="754" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,12"/>
    </g>

    <!-- Depth haze vignette -->
    <rect width="1440" height="900" fill="url(#depth-haze)" pointer-events="none"/>
  </svg>
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
