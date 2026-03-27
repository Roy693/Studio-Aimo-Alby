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
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="3" stitchTiles="stitch" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G"/>
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
      <!-- Blueprint grid -->
      <pattern id="bp-fine" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M22 0L0 0 0 22" fill="none" stroke="rgba(240,238,225,0.018)" stroke-width="0.35"/>
      </pattern>
      <pattern id="bp-major" width="110" height="110" patternUnits="userSpaceOnUse">
        <path d="M110 0L0 0 0 110" fill="none" stroke="rgba(240,238,225,0.032)" stroke-width="0.55"/>
      </pattern>
      <!-- Depth haze -->
      <radialGradient id="depth-haze" cx="50%" cy="50%" r="72%">
        <stop offset="0%" stop-color="rgba(19,18,16,0.0)"/>
        <stop offset="75%" stop-color="rgba(10,10,9,0.40)"/>
        <stop offset="100%" stop-color="rgba(6,6,5,0.75)"/>
      </radialGradient>
      <!-- Centre glow -->
      <radialGradient id="centre-glow" cx="50%" cy="52%" r="38%">
        <stop offset="0%" stop-color="rgba(48,45,38,0.30)"/>
        <stop offset="100%" stop-color="rgba(19,18,16,0.0)"/>
      </radialGradient>
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
         BLUEPRINT ANNOTATIONS — dimension lines, axes
    ══════════════════════════════════════════════ -->
    <g class="annot">
      <!-- Vertical axis lines -->
      <line x1="380" y1="0" x2="380" y2="900" stroke="rgba(238,235,220,0.042)" stroke-width="0.4" stroke-dasharray="2,12"/>
      <line x1="720" y1="0" x2="720" y2="900" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="1060" y1="0" x2="1060" y2="900" stroke="rgba(238,235,220,0.042)" stroke-width="0.4" stroke-dasharray="2,12"/>
      <!-- Horizontal axis lines -->
      <line x1="0" y1="260" x2="1440" y2="260" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <line x1="0" y1="580" x2="1440" y2="580" stroke="rgba(238,235,220,0.035)" stroke-width="0.35" stroke-dasharray="2,12"/>
      <!-- Dimension lines with tick marks -->
      <line x1="148" y1="305" x2="418" y2="305" stroke="rgba(238,235,220,0.48)" stroke-width="0.55" stroke-dasharray="5,5"/>
      <line x1="148" y1="300" x2="148" y2="310" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <line x1="418" y1="300" x2="418" y2="310" stroke="rgba(238,235,220,0.52)" stroke-width="0.8"/>
      <line x1="720" y1="148" x2="874" y2="148" stroke="rgba(238,235,220,0.42)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <line x1="720" y1="143" x2="720" y2="153" stroke="rgba(238,235,220,0.46)" stroke-width="0.7"/>
      <line x1="874" y1="143" x2="874" y2="153" stroke="rgba(238,235,220,0.46)" stroke-width="0.7"/>
      <line x1="1196" y1="138" x2="1196" y2="395" stroke="rgba(238,235,220,0.40)" stroke-width="0.5" stroke-dasharray="4,5"/>
      <line x1="1191" y1="138" x2="1201" y2="138" stroke="rgba(238,235,220,0.44)" stroke-width="0.7"/>
      <line x1="1191" y1="395" x2="1201" y2="395" stroke="rgba(238,235,220,0.44)" stroke-width="0.7"/>
      <!-- Arrow dimension heads -->
      <polyline points="154,302 148,305 154,308" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.6"/>
      <polyline points="412,302 418,305 412,308" fill="none" stroke="rgba(238,235,220,0.48)" stroke-width="0.6"/>
      <!-- Cross markers at grid intersections -->
      <line x1="377" y1="257" x2="383" y2="263" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="383" y1="257" x2="377" y2="263" stroke="rgba(238,235,220,0.35)" stroke-width="0.8"/>
      <line x1="717" y1="577" x2="723" y2="583" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="723" y1="577" x2="717" y2="583" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="1057" y1="257" x2="1063" y2="263" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <line x1="1063" y1="257" x2="1057" y2="263" stroke="rgba(238,235,220,0.30)" stroke-width="0.7"/>
      <!-- Radial construction lines from vanishing point -->
      <line x1="720" y1="450" x2="180" y2="140" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="450" x2="1260" y2="140" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="450" x2="140" y2="760" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="450" x2="1300" y2="760" stroke="rgba(238,235,220,0.032)" stroke-width="0.35" stroke-dasharray="2,14"/>
      <line x1="720" y1="450" x2="720" y2="0" stroke="rgba(238,235,220,0.022)" stroke-width="0.3" stroke-dasharray="2,14"/>
      <line x1="720" y1="450" x2="720" y2="900" stroke="rgba(238,235,220,0.022)" stroke-width="0.3" stroke-dasharray="2,14"/>
    </g>

    <!-- Connection node web — links the pieces together -->
    <g class="conn">
      <circle cx="162" cy="138" r="2.4" fill="rgba(238,235,220,0.55)"/>
      <circle cx="428" cy="362" r="2.0" fill="rgba(238,235,220,0.48)"/>
      <circle cx="620" cy="110" r="2.2" fill="rgba(238,235,220,0.52)"/>
      <circle cx="720" cy="460" r="2.4" fill="rgba(238,235,220,0.55)"/>
      <circle cx="1018" cy="585" r="2.0" fill="rgba(238,235,220,0.46)"/>
      <circle cx="856" cy="195" r="2.4" fill="rgba(238,235,220,0.54)"/>
      <circle cx="352" cy="668" r="1.8" fill="rgba(238,235,220,0.42)"/>
      <circle cx="1170" cy="305" r="2.2" fill="rgba(238,235,220,0.50)"/>
      <circle cx="578" cy="754" r="1.8" fill="rgba(238,235,220,0.40)"/>
      <circle cx="488" cy="480" r="1.8" fill="rgba(238,235,220,0.44)"/>
      <!-- Connection lines -->
      <line x1="162" y1="138" x2="428" y2="362" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="428" y1="362" x2="720" y2="460" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="620" y1="110" x2="856" y2="195" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="856" y1="195" x2="1018" y2="585" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="352" y1="668" x2="720" y2="460" stroke="rgba(238,235,220,0.06)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="1018" y1="585" x2="1170" y2="305" stroke="rgba(238,235,220,0.07)" stroke-width="0.45" stroke-dasharray="2,10"/>
      <line x1="578" y1="754" x2="720" y2="460" stroke="rgba(238,235,220,0.05)" stroke-width="0.4" stroke-dasharray="2,10"/>
      <line x1="488" y1="480" x2="620" y2="110" stroke="rgba(238,235,220,0.05)" stroke-width="0.35" stroke-dasharray="2,10"/>
      <line x1="162" y1="138" x2="720" y2="460" stroke="rgba(238,235,220,0.04)" stroke-width="0.3" stroke-dasharray="2,14"/>
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
      <button class="menu-toggle" aria-label="Menu" id="menu-toggle">
        <span></span><span></span>
      </button>
    </div>
  </header>

  <!-- ── HERO ── -->
  <section class="hero" id="hero">
    <!-- Animated blueprint background -->
    <div class="hero-bg-lines" aria-hidden="true">
      <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="hchalk">
            <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" seed="8" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <pattern id="hgrid-fine" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0L0 0 0 24" fill="none" stroke="rgba(200,169,110,0.04)" stroke-width="0.3"/>
          </pattern>
          <pattern id="hgrid-major" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M120 0L0 0 0 120" fill="none" stroke="rgba(200,169,110,0.06)" stroke-width="0.5"/>
          </pattern>
        </defs>
        <!-- Atmospheric grid -->
        <rect width="1440" height="900" fill="url(#hgrid-fine)"/>
        <rect width="1440" height="900" fill="url(#hgrid-major)"/>
        <!-- Blueprint furniture illustration — right side, low opacity -->
        <g filter="url(#hchalk)" opacity="0.22" class="hero-illustration">
          <!-- Room box isometric -->
          <polygon points="780,580 1100,460 1360,600 1040,720" fill="none" stroke="#c8a96e" stroke-width="0.9"/>
          <polygon points="1100,460 1360,600 1360,820 1100,680" fill="none" stroke="#c8a96e" stroke-width="0.7"/>
          <polygon points="780,580 780,800 1040,940 1040,720" fill="none" stroke="#c8a96e" stroke-width="0.7"/>
          <!-- Tall shelving unit -->
          <rect x="1270" y="462" width="72" height="296" fill="none" stroke="#c8a96e" stroke-width="0.8"/>
          <polygon points="1342,462 1372,482 1372,778 1342,758" fill="none" stroke="#c8a96e" stroke-width="0.6"/>
          <line x1="1270" y1="522" x2="1342" y2="522" stroke="#c8a96e" stroke-width="0.7"/>
          <line x1="1270" y1="582" x2="1342" y2="582" stroke="#c8a96e" stroke-width="0.7"/>
          <line x1="1270" y1="642" x2="1342" y2="642" stroke="#c8a96e" stroke-width="0.7"/>
          <line x1="1270" y1="702" x2="1342" y2="702" stroke="#c8a96e" stroke-width="0.7"/>
          <!-- Sofa -->
          <polygon points="820,686 1040,638 1085,666 865,714" fill="none" stroke="#c8a96e" stroke-width="1.0"/>
          <polygon points="820,686 820,740 865,768 865,714" fill="none" stroke="#c8a96e" stroke-width="0.8"/>
          <polygon points="1040,638 1085,666 1085,720 1040,692" fill="none" stroke="#c8a96e" stroke-width="0.8"/>
          <polygon points="820,686 828,642 1048,596 1040,638" fill="none" stroke="#c8a96e" stroke-width="0.9"/>
          <!-- Coffee table -->
          <polygon points="868,722 1020,688 1048,706 896,740" fill="none" stroke="#c8a96e" stroke-width="0.9"/>
          <line x1="878" y1="728" x2="878" y2="788" stroke="#c8a96e" stroke-width="0.7"/>
          <line x1="1030" y1="706" x2="1030" y2="766" stroke="#c8a96e" stroke-width="0.7"/>
          <!-- Floor lamp -->
          <line x1="1150" y1="740" x2="1150" y2="510" stroke="#c8a96e" stroke-width="0.9"/>
          <path d="M1150,510 Q1150,476 1178,460" fill="none" stroke="#c8a96e" stroke-width="0.8"/>
          <ellipse cx="1188" cy="454" rx="28" ry="9" fill="none" stroke="#c8a96e" stroke-width="0.9"/>
          <line x1="1160" y1="454" x2="1162" y2="488" stroke="#c8a96e" stroke-width="0.8"/>
          <line x1="1216" y1="454" x2="1214" y2="488" stroke="#c8a96e" stroke-width="0.8"/>
          <ellipse cx="1188" cy="488" rx="22" ry="7" fill="none" stroke="#c8a96e" stroke-width="0.7"/>
          <!-- Pendant chandelier -->
          <line x1="960" y1="460" x2="960" y2="520" stroke="#c8a96e" stroke-width="0.8"/>
          <ellipse cx="960" cy="540" rx="48" ry="16" fill="none" stroke="#c8a96e" stroke-width="1.0"/>
          <line x1="912" y1="540" x2="924" y2="580" stroke="#c8a96e" stroke-width="0.8"/>
          <line x1="1008" y1="540" x2="996" y2="580" stroke="#c8a96e" stroke-width="0.8"/>
          <ellipse cx="960" cy="580" rx="32" ry="10" fill="none" stroke="#c8a96e" stroke-width="0.9"/>
          <!-- Annotation dimensions -->
          <line x1="820" y1="830" x2="1100" y2="830" stroke="#c8a96e" stroke-width="0.5" stroke-dasharray="4,5"/>
          <line x1="820" y1="825" x2="820" y2="835" stroke="#c8a96e" stroke-width="0.6"/>
          <line x1="1100" y1="825" x2="1100" y2="835" stroke="#c8a96e" stroke-width="0.6"/>
          <line x1="1380" y1="462" x2="1380" y2="758" stroke="#c8a96e" stroke-width="0.5" stroke-dasharray="4,5"/>
        </g>
      </svg>
    </div>

    <div class="hero-content">
      <div class="hero-eyebrow reveal-up" data-delay="0">
        <span class="eyebrow-line"></span>
        Interior Sorcery &amp; Spatial Tailoring
      </div>
      <h1 class="hero-title reveal-up" data-delay="1">
        <span class="ht-line">STUDIO</span>
        <span class="ht-line ht-accent">AIMO</span>
      </h1>
      <p class="hero-sub reveal-up" data-delay="2">
        Where imagination shapes reality.<br/>
        Bespoke interior design for<br/>commercial and private spaces.
      </p>
      <div class="hero-ctas reveal-up" data-delay="3">
        <a href="#work" class="btn-primary">
          <span>Explore Work</span>
          <svg viewBox="0 0 20 20" width="14" height="14"><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.3"/><polyline points="12,5 17,10 12,15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </a>
        <a href="#contact" class="btn-ghost">Begin a Project</a>
      </div>
      <!-- Stats row -->
      <div class="hero-stats reveal-up" data-delay="4">
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
      <span>Commercial &amp; Private</span><span class="marquee-dot">✦</span>
      <span>Where imagination shapes reality</span><span class="marquee-dot">✦</span>
      <span>Interior Sorcery</span><span class="marquee-dot">✦</span>
      <span>Spatial Tailoring</span><span class="marquee-dot">✦</span>
      <span>STUDIO AIMO</span><span class="marquee-dot">✦</span>
      <span>Bespoke Design</span><span class="marquee-dot">✦</span>
      <span>Commercial &amp; Private</span><span class="marquee-dot">✦</span>
      <span>Where imagination shapes reality</span><span class="marquee-dot">✦</span>
    </div>
  </div>

  <!-- ── MANIFESTO BAND ── -->
  <section class="manifesto-band" id="manifesto">
    <div class="manifesto-inner">
      <p class="manifesto-text reveal-up" data-delay="0">
        We don't decorate spaces.<br/>
        <em>We conjure them.</em>
      </p>
      <div class="manifesto-rule reveal-scale" data-delay="1"></div>
      <p class="manifesto-sub reveal-up" data-delay="2">
        Every project is an act of transformation — raw space alchemised into lived experience,<br class="br-lg"/>
        through precision craft, daring vision, and an uncompromising commitment to the extraordinary.
      </p>
    </div>
    <!-- Large decorative letter -->
    <div class="manifesto-bg-letter" aria-hidden="true">A</div>
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
            <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
              <defs><filter id="wchalk1"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
              <rect width="640" height="480" fill="#161412"/>
              <g filter="url(#wchalk1)" opacity="0.52">
                <!-- Isometric room perspective -->
                <polygon points="80,320 340,220 460,300 200,400" fill="none" stroke="#c8b898" stroke-width="1.3"/>
                <polygon points="340,220 460,300 460,420 340,340" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <polygon points="80,320 80,440 200,520 200,400" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <!-- Large sofa -->
                <polygon points="110,370 310,316 352,342 152,396" fill="none" stroke="#c8b898" stroke-width="1.2"/>
                <polygon points="310,316 352,342 352,392 310,366" fill="none" stroke="#c8b898" stroke-width="1.0"/>
                <polygon points="110,370 110,420 152,446 152,396" fill="none" stroke="#c8b898" stroke-width="1.0"/>
                <polygon points="110,370 120,328 320,276 310,316" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <!-- Pendant light -->
                <line x1="270" y1="220" x2="270" y2="278" stroke="#c8b898" stroke-width="1.0"/>
                <ellipse cx="270" cy="300" rx="42" ry="14" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <line x1="228" y1="300" x2="240" y2="344" stroke="#c8b898" stroke-width="1.0"/>
                <line x1="312" y1="300" x2="300" y2="344" stroke="#c8b898" stroke-width="1.0"/>
                <ellipse cx="270" cy="344" rx="28" ry="9" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <!-- Side table + lamp -->
                <ellipse cx="404" cy="310" rx="32" ry="10" fill="none" stroke="#c8b898" stroke-width="1.0"/>
                <line x1="372" y1="310" x2="372" y2="380" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="436" y1="310" x2="436" y2="380" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="404" y1="298" x2="404" y2="252" stroke="#c8b898" stroke-width="1.0"/>
                <polygon points="380,252 428,252 420,276 388,276" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <!-- Shelving right -->
                <rect x="434" y="222" width="56" height="196" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="434" y1="272" x2="490" y2="272" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="434" y1="322" x2="490" y2="322" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="434" y1="372" x2="490" y2="372" stroke="#c8b898" stroke-width="0.7"/>
                <!-- Rug -->
                <polygon points="120,390 340,340 380,362 160,412" fill="none" stroke="#c8b898" stroke-width="0.7" stroke-dasharray="6,3"/>
                <!-- Annotation -->
                <line x1="120" y1="450" x2="380" y2="450" stroke="#c8b898" stroke-width="0.5" stroke-dasharray="4,5"/>
                <line x1="120" y1="445" x2="120" y2="455" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="380" y1="445" x2="380" y2="455" stroke="#c8b898" stroke-width="0.7"/>
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
          <p>Private residence — Milan, IT</p>
          <a href="#contact" class="wc-cta">View Project →</a>
        </div>
      </article>

      <!-- Project 02 -->
      <article class="work-card reveal-up" data-delay="2">
        <div class="wc-image">
          <div class="wc-svg-placeholder">
            <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="340" fill="#181614"/>
              <g opacity="0.48">
                <polygon points="40,200 260,128 304,164 84,236" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <polygon points="260,128 304,164 304,228 260,192" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <polygon points="40,200 40,264 84,300 84,236" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <polygon points="40,200 52,156 272,88 260,128" fill="none" stroke="#c8b898" stroke-width="1.0"/>
                <!-- Chairs -->
                <polygon points="80,216 148,196 164,212 96,232" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="82" y1="214" x2="82" y2="168" stroke="#c8b898" stroke-width="0.8"/>
                <line x1="96" y1="208" x2="96" y2="164" stroke="#c8b898" stroke-width="0.7"/>
                <!-- Floor lamp -->
                <line x1="348" y1="280" x2="348" y2="120" stroke="#c8b898" stroke-width="0.9"/>
                <path d="M348,120 Q348,98 366,88" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="374" cy="84" rx="24" ry="8" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="350" y1="84" x2="352" y2="112" stroke="#c8b898" stroke-width="0.8"/>
                <line x1="398" y1="84" x2="396" y2="112" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="374" cy="112" rx="18" ry="6" fill="none" stroke="#c8b898" stroke-width="0.7"/>
                <!-- Shelving -->
                <rect x="316" y="108" width="50" height="172" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <polygon points="366,108 390,124 390,296 366,280" fill="none" stroke="#c8b898" stroke-width="0.6"/>
                <line x1="316" y1="152" x2="366" y2="152" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="316" y1="196" x2="366" y2="196" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="316" y1="240" x2="366" y2="240" stroke="#c8b898" stroke-width="0.7"/>
                <!-- Pendant -->
                <line x1="170" y1="128" x2="170" y2="160" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="170" cy="174" rx="28" ry="9" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <line x1="142" y1="174" x2="150" y2="204" stroke="#c8b898" stroke-width="0.8"/>
                <line x1="198" y1="174" x2="190" y2="204" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="170" cy="204" rx="18" ry="6" fill="none" stroke="#c8b898" stroke-width="0.7"/>
              </g>
            </svg>
          </div>
          <div class="wc-overlay"><span class="wc-num">02</span></div>
        </div>
        <div class="wc-info">
          <span class="wc-tag">Commercial</span>
          <h3>Atelier Brut</h3>
          <p>Creative studio — Paris, FR</p>
          <a href="#contact" class="wc-cta">View Project →</a>
        </div>
      </article>

      <!-- Project 03 -->
      <article class="work-card reveal-up" data-delay="3">
        <div class="wc-image">
          <div class="wc-svg-placeholder">
            <svg viewBox="0 0 420 340" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="340" fill="#1a1714"/>
              <g opacity="0.46">
                <!-- Circular room / rotunda-ish space -->
                <ellipse cx="210" cy="180" rx="140" ry="50" fill="none" stroke="#c8b898" stroke-width="1.0"/>
                <ellipse cx="210" cy="240" rx="120" ry="42" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <line x1="70" y1="180" x2="90" y2="240" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="350" y1="180" x2="330" y2="240" stroke="#c8b898" stroke-width="0.9"/>
                <!-- Central chandelier drop -->
                <line x1="210" y1="60" x2="210" y2="120" stroke="#c8b898" stroke-width="1.0"/>
                <ellipse cx="210" cy="140" rx="44" ry="14" fill="none" stroke="#c8b898" stroke-width="1.1"/>
                <!-- Chandelier arms -->
                <line x1="166" y1="140" x2="152" y2="176" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="188" y1="128" x2="180" y2="164" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="210" y1="126" x2="210" y2="162" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="232" y1="128" x2="240" y2="164" stroke="#c8b898" stroke-width="0.9"/>
                <line x1="254" y1="140" x2="268" y2="176" stroke="#c8b898" stroke-width="0.9"/>
                <!-- Candles/bulbs -->
                <circle cx="152" cy="178" r="3" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <circle cx="180" cy="166" r="3" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <circle cx="210" cy="164" r="3" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <circle cx="240" cy="166" r="3" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <circle cx="268" cy="178" r="3" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <!-- Seating around the room -->
                <polygon points="80,200 140,182 158,196 98,214" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <polygon points="260,182 320,200 300,216 240,198" fill="none" stroke="#c8b898" stroke-width="0.9"/>
                <!-- Armchairs side -->
                <polygon points="90,230 130,220 142,232 102,242" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <polygon points="270,220 310,230 298,242 258,232" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <!-- Tall vases flanking -->
                <line x1="50" y1="260" x2="50" y2="190" stroke="#c8b898" stroke-width="0.9"/>
                <ellipse cx="50" cy="265" rx="12" ry="4" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="50" cy="190" rx="9" ry="3" fill="none" stroke="#c8b898" stroke-width="0.7"/>
                <line x1="370" y1="260" x2="370" y2="190" stroke="#c8b898" stroke-width="0.9"/>
                <ellipse cx="370" cy="265" rx="12" ry="4" fill="none" stroke="#c8b898" stroke-width="0.8"/>
                <ellipse cx="370" cy="190" rx="9" ry="3" fill="none" stroke="#c8b898" stroke-width="0.7"/>
                <!-- Floor rug -->
                <ellipse cx="210" cy="240" rx="88" ry="32" fill="none" stroke="#c8b898" stroke-width="0.6" stroke-dasharray="5,4"/>
              </g>
            </svg>
          </div>
          <div class="wc-overlay"><span class="wc-num">03</span></div>
        </div>
        <div class="wc-info">
          <span class="wc-tag">Hospitality</span>
          <h3>Villa Chimera</h3>
          <p>Boutique suite — Ibiza, ES</p>
          <a href="#contact" class="wc-cta">View Project →</a>
        </div>
      </article>
    </div>

    <div class="work-cta reveal-up" data-delay="4">
      <a href="#contact" class="btn-ghost">View All Projects</a>
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
        <a href="#contact" class="btn-primary reveal-up" data-delay="4">Work with Alby</a>
      </div>
      <div class="studio-visual reveal-up" data-delay="1" aria-hidden="true">
        <svg viewBox="0 0 500 540" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="achalk">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="9" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <g filter="url(#achalk)" opacity="0.72">
            <!-- Armchair isometric -->
            <polygon points="82,292 268,240 308,272 122,324" fill="none" stroke="#d4c8b0" stroke-width="1.7"/>
            <polygon points="268,240 308,272 308,334 268,302" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <polygon points="82,292 82,354 122,386 122,324" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <polygon points="82,292 92,242 278,198 268,240" fill="none" stroke="#d4c8b0" stroke-width="1.6"/>
            <polygon points="268,240 278,198 318,226 308,272" fill="none" stroke="#d4c8b0" stroke-width="1.3"/>
            <!-- Armrests -->
            <polygon points="82,292 66,280 66,342 82,354" fill="none" stroke="#d4c8b0" stroke-width="1.3"/>
            <polygon points="268,240 282,232 282,294 268,302" fill="none" stroke="#d4c8b0" stroke-width="1.2"/>
            <ellipse cx="74" cy="280" rx="10" ry="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <ellipse cx="275" cy="232" rx="10" ry="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <!-- Cushion seam -->
            <line x1="98" y1="300" x2="296" y2="248" stroke="#d4c8b0" stroke-width="0.6" opacity="0.5"/>
            <!-- Legs -->
            <line x1="82" y1="352" x2="82" y2="394" stroke="#d4c8b0" stroke-width="1.5"/>
            <line x1="120" y1="384" x2="120" y2="426" stroke="#d4c8b0" stroke-width="1.4"/>
            <line x1="282" y1="292" x2="282" y2="334" stroke="#d4c8b0" stroke-width="1.4"/>
            <line x1="306" y1="332" x2="306" y2="374" stroke="#d4c8b0" stroke-width="1.3"/>
            <!-- Floor lamp -->
            <ellipse cx="388" cy="446" rx="24" ry="8" fill="none" stroke="#d4c8b0" stroke-width="1.4"/>
            <ellipse cx="388" cy="453" rx="18" ry="6" fill="none" stroke="#d4c8b0" stroke-width="0.8"/>
            <line x1="388" y1="438" x2="388" y2="196" stroke="#d4c8b0" stroke-width="1.7"/>
            <path d="M388,196 Q388,166 414,152" fill="none" stroke="#d4c8b0" stroke-width="1.5"/>
            <ellipse cx="426" cy="144" rx="30" ry="10" fill="none" stroke="#d4c8b0" stroke-width="1.5"/>
            <line x1="396" y1="144" x2="398" y2="178" stroke="#d4c8b0" stroke-width="1.4"/>
            <line x1="456" y1="144" x2="454" y2="178" stroke="#d4c8b0" stroke-width="1.4"/>
            <ellipse cx="426" cy="178" rx="24" ry="8" fill="none" stroke="#d4c8b0" stroke-width="1.3"/>
            <!-- Side table -->
            <ellipse cx="64" cy="388" rx="40" ry="13" fill="none" stroke="#d4c8b0" stroke-width="1.3"/>
            <line x1="24" y1="388" x2="24" y2="452" stroke="#d4c8b0" stroke-width="1.2"/>
            <line x1="104" y1="388" x2="104" y2="452" stroke="#d4c8b0" stroke-width="1.1"/>
            <ellipse cx="64" cy="452" rx="40" ry="13" fill="none" stroke="#d4c8b0" stroke-width="1.1"/>
            <!-- Book on table -->
            <rect x="36" y="382" width="30" height="8" fill="none" stroke="#d4c8b0" stroke-width="0.7" transform="skewX(-12)"/>
            <!-- Tall plant beside -->
            <line x1="28" y1="382" x2="24" y2="290" stroke="#d4c8b0" stroke-width="1.3"/>
            <ellipse cx="26" cy="288" rx="10" ry="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.9"/>
            <line x1="26" y1="322" x2="6" y2="294" stroke="#d4c8b0" stroke-width="0.9"/>
            <line x1="26" y1="310" x2="42" y2="286" stroke="#d4c8b0" stroke-width="0.8"/>
            <circle cx="6" cy="292" r="4" fill="none" stroke="#d4c8b0" stroke-width="0.8"/>
            <circle cx="42" cy="284" r="3.5" fill="none" stroke="#d4c8b0" stroke-width="0.8"/>
            <!-- Construction annotation -->
            <line x1="82" y1="488" x2="306" y2="488" stroke="#d4c8b0" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.55"/>
            <line x1="82" y1="483" x2="82" y2="493" stroke="#d4c8b0" stroke-width="0.7" opacity="0.55"/>
            <line x1="306" y1="483" x2="306" y2="493" stroke="#d4c8b0" stroke-width="0.7" opacity="0.55"/>
            <line x1="322" y1="144" x2="322" y2="272" stroke="#d4c8b0" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.45"/>
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
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="6,34 24,24 42,34 24,44" fill="none" stroke="currentColor" stroke-width="1.2"/><polygon points="6,24 24,14 42,24 24,34" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.6"/><polygon points="6,14 24,4 42,14 24,24" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.35"/></svg>
          </div>
          <h3>Residential Design</h3>
          <p>Private homes, apartments, and villas — entirely bespoke, entirely yours.</p>
        </div>
        <div class="service-card reveal-up" data-delay="2">
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" fill="none" stroke="currentColor" stroke-width="1.2"/><polygon points="36,10 44,16 44,38 36,38" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.6"/><polygon points="6,10 36,10 44,16 14,16" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.6"/><line x1="14" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="0.7" opacity="0.5"/><line x1="14" y1="26" x2="28" y2="26" stroke="currentColor" stroke-width="0.7" opacity="0.4"/><line x1="14" y1="32" x2="22" y2="32" stroke="currentColor" stroke-width="0.7" opacity="0.4"/></svg>
          </div>
          <h3>Commercial Spaces</h3>
          <p>Offices, showrooms, and retail environments that amplify brand identity.</p>
        </div>
        <div class="service-card reveal-up" data-delay="3">
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.6"/><line x1="24" y1="7" x2="24" y2="41" stroke="currentColor" stroke-width="0.6" opacity="0.4"/><line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" stroke-width="0.6" opacity="0.4"/></svg>
          </div>
          <h3>Hospitality &amp; Hotels</h3>
          <p>Immersive environments that become the destination rather than the container.</p>
        </div>
        <div class="service-card reveal-up" data-delay="4">
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="1.2"/><line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="1.2"/><line x1="24" y1="6" x2="42" y2="24" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><line x1="6" y1="24" x2="24" y2="42" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><circle cx="24" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="1.0"/></svg>
          </div>
          <h3>Concept &amp; Art Direction</h3>
          <p>Mood, narrative, and spatial concept from blank canvas to living vision.</p>
        </div>
        <div class="service-card reveal-up" data-delay="5">
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="8,40 24,8 40,40" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="14" y1="32" x2="34" y2="32" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" stroke-width="0.7" opacity="0.4"/><circle cx="24" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.0"/></svg>
          </div>
          <h3>Furniture &amp; Procurement</h3>
          <p>Custom pieces and curated sourcing — from artisan workshops to global makers.</p>
        </div>
        <div class="service-card reveal-up" data-delay="6">
          <div class="sc-icon">
            <svg viewBox="0 0 48 48"><polygon points="6,38 24,10 42,38" fill="none" stroke="currentColor" stroke-width="1.2"/><polygon points="14,38 24,22 34,38" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.6"/><polygon points="18,38 24,30 30,38" fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.35"/></svg>
          </div>
          <h3>Project Management</h3>
          <p>End-to-end oversight — contractor coordination, timeline, and flawless delivery.</p>
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
          <p>Understanding your vision, lifestyle, and the spatial story waiting to be told.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="2">→</div>
        <div class="proc-step reveal-up" data-delay="2">
          <span class="proc-num">02</span>
          <h4>Conceive</h4>
          <p>From concept boards to detailed spatial drawings and material palettes.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="3">→</div>
        <div class="proc-step reveal-up" data-delay="3">
          <span class="proc-num">03</span>
          <h4>Craft</h4>
          <p>Precision execution with trusted artisans and contractors worldwide.</p>
        </div>
        <div class="proc-arrow reveal-up" data-delay="4">→</div>
        <div class="proc-step reveal-up" data-delay="4">
          <span class="proc-num">04</span>
          <h4>Reveal</h4>
          <p>The transformation complete — your space, as it was always meant to be.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CONTACT ── -->
  <section class="contact-section" id="contact">
    <div class="contact-inner">
      <div class="contact-text reveal-up" data-delay="0">
        <span class="section-label">Begin</span>
        <h2>Ready to transform<br/><em>your space?</em></h2>
        <p>Every project begins with a conversation. Tell Alby about your vision and we'll shape it into reality together.</p>
        <div class="contact-details">
          <div class="cd-item">
            <span class="cd-label">Studio</span>
            <span class="cd-value">Milan · London · New York</span>
          </div>
          <div class="cd-item">
            <span class="cd-label">Email</span>
            <span class="cd-value">studio@aimo.design</span>
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
            <option>Other</option>
          </select>
        </div>
        <div class="cf-field">
          <label>Tell us about your space</label>
          <textarea rows="5" placeholder="Describe your project, timeline, and aspirations..."></textarea>
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
        <a href="#" aria-label="Instagram">IG</a>
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
