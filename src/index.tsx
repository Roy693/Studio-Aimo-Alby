import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Intro — Interior Design Studio</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/static/intro.css" />
</head>
<body>
  <div id="intro-screen">
    <canvas id="particle-canvas"></canvas>
    <div class="scene-wrapper">
      <svg id="main-scene" viewBox="0 0 1400 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
            <feBlend in="SourceGraphic" in2="displaced" mode="multiply" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <!-- Grid pattern for background -->
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
          </pattern>
          <pattern id="fine-grid" width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255,255,255,0.015)" stroke-width="0.3"/>
          </pattern>
        </defs>

        <!-- Background grid -->
        <rect width="1400" height="900" fill="url(#fine-grid)"/>
        <rect width="1400" height="900" fill="url(#grid)"/>

        <!-- =================== FURNITURE ILLUSTRATIONS =================== -->

        <!-- GROUP 1: LOUNGE CHAIR (top-left, large, angled) -->
        <g class="furniture-item" id="lounge-chair" transform="translate(80, 60) rotate(-8)" filter="url(#chalk)">
          <!-- seat base isometric -->
          <polygon points="0,60 120,30 120,80 0,110" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.5"/>
          <polygon points="120,30 180,60 180,110 120,80" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.4"/>
          <polygon points="0,60 120,30 180,60 60,90" fill="none" stroke="rgba(240,240,230,0.88)" stroke-width="1.6"/>
          <!-- cushion lines -->
          <line x1="30" y1="72" x2="90" y2="52" stroke="rgba(240,240,230,0.45)" stroke-width="0.8"/>
          <line x1="60" y1="83" x2="120" y2="63" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- backrest -->
          <polygon points="0,60 20,20 140,0 120,30" fill="none" stroke="rgba(240,240,230,0.80)" stroke-width="1.5"/>
          <line x1="20" y1="20" x2="20" y2="60" stroke="rgba(240,240,230,0.50)" stroke-width="1"/>
          <line x1="50" y1="10" x2="50" y2="50" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="80" y1="5" x2="80" y2="45" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="110" y1="3" x2="110" y2="38" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- armrest left -->
          <polygon points="0,60 -10,50 -10,70 0,80" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.2"/>
          <polygon points="-10,50 20,35 20,20 -10,35" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
          <!-- legs -->
          <line x1="10" y1="108" x2="10" y2="128" stroke="rgba(240,240,230,0.60)" stroke-width="1.5"/>
          <line x1="100" y1="88" x2="100" y2="108" stroke="rgba(240,240,230,0.55)" stroke-width="1.4"/>
          <line x1="165" y1="108" x2="165" y2="128" stroke="rgba(240,240,230,0.55)" stroke-width="1.4"/>
          <!-- construction lines -->
          <line x1="0" y1="60" x2="-30" y2="80" stroke="rgba(240,240,230,0.12)" stroke-width="0.5" stroke-dasharray="4,4"/>
          <line x1="180" y1="60" x2="200" y2="50" stroke="rgba(240,240,230,0.12)" stroke-width="0.5" stroke-dasharray="4,4"/>
        </g>

        <!-- GROUP 2: PENDANT LAMP (top-center, large) -->
        <g class="furniture-item" id="pendant-lamp" transform="translate(560, 10)" filter="url(#chalk)">
          <!-- wire -->
          <line x1="60" y1="0" x2="60" y2="55" stroke="rgba(240,240,230,0.70)" stroke-width="1.2"/>
          <!-- shade outer isometric -->
          <ellipse cx="60" cy="90" rx="55" ry="18" fill="none" stroke="rgba(240,240,230,0.85)" stroke-width="1.7"/>
          <line x1="5" y1="90" x2="25" y2="130" stroke="rgba(240,240,230,0.80)" stroke-width="1.6"/>
          <line x1="115" y1="90" x2="95" y2="130" stroke="rgba(240,240,230,0.80)" stroke-width="1.6"/>
          <ellipse cx="60" cy="130" rx="35" ry="11" fill="none" stroke="rgba(240,240,230,0.75)" stroke-width="1.5"/>
          <!-- shade ribs -->
          <line x1="60" y1="72" x2="60" y2="142" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <line x1="35" y1="76" x2="40" y2="136" stroke="rgba(240,240,230,0.25)" stroke-width="0.6"/>
          <line x1="85" y1="76" x2="80" y2="136" stroke="rgba(240,240,230,0.25)" stroke-width="0.6"/>
          <!-- inner ring detail -->
          <ellipse cx="60" cy="108" rx="44" ry="14" fill="none" stroke="rgba(240,240,230,0.38)" stroke-width="0.8" stroke-dasharray="3,3"/>
          <!-- bulb suggestion -->
          <circle cx="60" cy="133" r="5" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1"/>
          <!-- light cone dashed -->
          <line x1="25" y1="141" x2="0" y2="195" stroke="rgba(240,240,230,0.10)" stroke-width="0.8" stroke-dasharray="5,5"/>
          <line x1="95" y1="141" x2="120" y2="195" stroke="rgba(240,240,230,0.10)" stroke-width="0.8" stroke-dasharray="5,5"/>
        </g>

        <!-- GROUP 3: MODULAR SOFA (bottom-left area) -->
        <g class="furniture-item" id="modular-sofa" transform="translate(50, 550) rotate(5)" filter="url(#chalk)">
          <!-- main body isometric -->
          <polygon points="0,80 200,30 260,60 60,110" fill="none" stroke="rgba(240,240,230,0.85)" stroke-width="1.8"/>
          <polygon points="200,30 260,60 260,120 200,90" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.5"/>
          <polygon points="0,80 0,150 60,180 60,110" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.5"/>
          <!-- seat cushion divisions -->
          <line x1="70" y1="63" x2="70" y2="138" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <line x1="140" y1="46" x2="140" y2="118" stroke="rgba(240,240,230,0.50)" stroke-width="1.1"/>
          <line x1="200" y1="30" x2="200" y2="90" stroke="rgba(240,240,230,0.50)" stroke-width="1.1"/>
          <!-- cushion texture lines on top -->
          <line x1="15" y1="89" x2="65" y2="73" stroke="rgba(240,240,230,0.28)" stroke-width="0.6"/>
          <line x1="25" y1="97" x2="68" y2="83" stroke="rgba(240,240,230,0.22)" stroke-width="0.5"/>
          <line x1="85" y1="72" x2="135" y2="56" stroke="rgba(240,240,230,0.28)" stroke-width="0.6"/>
          <line x1="90" y1="80" x2="138" y2="64" stroke="rgba(240,240,230,0.22)" stroke-width="0.5"/>
          <line x1="155" y1="56" x2="200" y2="43" stroke="rgba(240,240,230,0.28)" stroke-width="0.6"/>
          <!-- backrest -->
          <polygon points="0,80 10,40 210,0 200,30" fill="none" stroke="rgba(240,240,230,0.80)" stroke-width="1.6"/>
          <line x1="10" y1="40" x2="10" y2="80" stroke="rgba(240,240,230,0.45)" stroke-width="0.9"/>
          <line x1="70" y1="22" x2="70" y2="63" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="140" y1="11" x2="140" y2="46" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- armrest -->
          <polygon points="0,80 -12,70 -12,138 0,150" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <polygon points="-12,70 0,30 10,40 0,80" fill="none" stroke="rgba(240,240,230,0.58)" stroke-width="1.1"/>
          <polygon points="200,30 212,20 212,88 200,90" fill="none" stroke="rgba(240,240,230,0.60)" stroke-width="1.1"/>
          <!-- legs -->
          <line x1="5" y1="148" x2="5" y2="170" stroke="rgba(240,240,230,0.55)" stroke-width="1.4"/>
          <line x1="50" y1="178" x2="50" y2="200" stroke="rgba(240,240,230,0.50)" stroke-width="1.3"/>
          <line x1="240" y1="118" x2="240" y2="138" stroke="rgba(240,240,230,0.50)" stroke-width="1.3"/>
          <!-- construction annotations -->
          <line x1="130" y1="150" x2="130" y2="170" stroke="rgba(240,240,230,0.15)" stroke-width="0.5" stroke-dasharray="3,4"/>
          <line x1="0" y1="115" x2="-25" y2="125" stroke="rgba(240,240,230,0.12)" stroke-width="0.4" stroke-dasharray="3,4"/>
        </g>

        <!-- GROUP 4: DINING TABLE (center) -->
        <g class="furniture-item" id="dining-table" transform="translate(440, 360) rotate(-3)" filter="url(#chalk)">
          <!-- tabletop isometric -->
          <polygon points="0,50 220,0 300,40 80,90" fill="none" stroke="rgba(240,240,230,0.90)" stroke-width="2.0"/>
          <!-- tabletop thickness -->
          <polygon points="0,50 0,62 80,102 80,90" fill="none" stroke="rgba(240,240,230,0.72)" stroke-width="1.5"/>
          <polygon points="80,90 80,102 300,52 300,40" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.4"/>
          <!-- table surface lines (grain suggestion) -->
          <line x1="55" y1="16" x2="75" y2="86" stroke="rgba(240,240,230,0.18)" stroke-width="0.6"/>
          <line x1="110" y1="6" x2="130" y2="76" stroke="rgba(240,240,230,0.15)" stroke-width="0.5"/>
          <line x1="165" y1="2" x2="185" y2="72" stroke="rgba(240,240,230,0.15)" stroke-width="0.5"/>
          <line x1="220" y1="4" x2="240" y2="72" stroke="rgba(240,240,230,0.15)" stroke-width="0.5"/>
          <!-- legs -->
          <line x1="20" y1="55" x2="20" y2="135" stroke="rgba(240,240,230,0.68)" stroke-width="1.6"/>
          <line x1="75" y1="92" x2="75" y2="172" stroke="rgba(240,240,230,0.62)" stroke-width="1.5"/>
          <line x1="280" y1="44" x2="280" y2="124" stroke="rgba(240,240,230,0.62)" stroke-width="1.5"/>
          <line x1="225" y1="8" x2="225" y2="88" stroke="rgba(240,240,230,0.62)" stroke-width="1.5"/>
          <!-- cross-brace -->
          <line x1="20" y1="100" x2="75" y2="138" stroke="rgba(240,240,230,0.30)" stroke-width="0.8" stroke-dasharray="5,3"/>
          <line x1="225" y1="55" x2="280" y2="90" stroke="rgba(240,240,230,0.30)" stroke-width="0.8" stroke-dasharray="5,3"/>
        </g>

        <!-- GROUP 5: DINING CHAIR x2 (around dining table) -->
        <g class="furniture-item" id="chair-a" transform="translate(390, 450) rotate(-3)" filter="url(#chalk)">
          <polygon points="0,30 60,10 80,30 20,50" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.5"/>
          <polygon points="60,10 80,30 80,55 60,35" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <polygon points="0,30 0,55 20,75 20,50" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <!-- backrest -->
          <line x1="0" y1="30" x2="0" y2="-25" stroke="rgba(240,240,230,0.75)" stroke-width="1.4"/>
          <line x1="20" y1="22" x2="20" y2="-33" stroke="rgba(240,240,230,0.65)" stroke-width="1.2"/>
          <line x1="0" y1="-25" x2="20" y2="-33" stroke="rgba(240,240,230,0.72)" stroke-width="1.4"/>
          <!-- backrest detail bars -->
          <line x1="0" y1="-5" x2="20" y2="-12" stroke="rgba(240,240,230,0.48)" stroke-width="0.9"/>
          <line x1="0" y1="8" x2="20" y2="1" stroke="rgba(240,240,230,0.40)" stroke-width="0.8"/>
          <!-- legs -->
          <line x1="2" y1="52" x2="2" y2="72" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <line x1="18" y1="72" x2="18" y2="92" stroke="rgba(240,240,230,0.58)" stroke-width="1.2"/>
          <line x1="62" y1="33" x2="62" y2="53" stroke="rgba(240,240,230,0.58)" stroke-width="1.2"/>
          <line x1="77" y1="52" x2="77" y2="72" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
        </g>

        <g class="furniture-item" id="chair-b" transform="translate(680, 400) rotate(5)" filter="url(#chalk)">
          <polygon points="0,30 60,10 80,30 20,50" fill="none" stroke="rgba(240,240,230,0.80)" stroke-width="1.5"/>
          <polygon points="60,10 80,30 80,55 60,35" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <polygon points="0,30 0,55 20,75 20,50" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <line x1="0" y1="30" x2="0" y2="-25" stroke="rgba(240,240,230,0.73)" stroke-width="1.4"/>
          <line x1="20" y1="22" x2="20" y2="-33" stroke="rgba(240,240,230,0.62)" stroke-width="1.2"/>
          <line x1="0" y1="-25" x2="20" y2="-33" stroke="rgba(240,240,230,0.70)" stroke-width="1.4"/>
          <line x1="0" y1="-5" x2="20" y2="-12" stroke="rgba(240,240,230,0.45)" stroke-width="0.9"/>
          <line x1="0" y1="8" x2="20" y2="1" stroke="rgba(240,240,230,0.38)" stroke-width="0.8"/>
          <line x1="2" y1="52" x2="2" y2="72" stroke="rgba(240,240,230,0.60)" stroke-width="1.3"/>
          <line x1="18" y1="72" x2="18" y2="92" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <line x1="62" y1="33" x2="62" y2="53" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <line x1="77" y1="52" x2="77" y2="72" stroke="rgba(240,240,230,0.52)" stroke-width="1.1"/>
        </g>

        <!-- GROUP 6: KITCHEN MODULE (right side) -->
        <g class="furniture-item" id="kitchen-module" transform="translate(920, 220) rotate(4)" filter="url(#chalk)">
          <!-- counter top -->
          <polygon points="0,40 280,0 300,20 20,60" fill="none" stroke="rgba(240,240,230,0.88)" stroke-width="1.8"/>
          <polygon points="280,0 300,20 300,80 280,60" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.5"/>
          <polygon points="0,40 0,120 20,140 20,60" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.5"/>
          <!-- cabinet doors -->
          <line x1="60" y1="26" x2="60" y2="126" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
          <line x1="120" y1="17" x2="120" y2="117" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
          <line x1="180" y1="8" x2="180" y2="108" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
          <line x1="240" y1="2" x2="240" y2="80" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
          <!-- door panel lines -->
          <rect x="15" y="52" width="38" height="55" fill="none" stroke="rgba(240,240,230,0.35)" stroke-width="0.7" transform="skewX(-10) translate(0,10)"/>
          <rect x="75" y="44" width="38" height="55" fill="none" stroke="rgba(240,240,230,0.30)" stroke-width="0.6" transform="skewX(-10) translate(0,7)"/>
          <!-- sink suggestion -->
          <ellipse cx="218" cy="28" rx="25" ry="8" fill="none" stroke="rgba(240,240,230,0.60)" stroke-width="1.2" transform="skewX(-12)"/>
          <ellipse cx="218" cy="28" rx="18" ry="6" fill="none" stroke="rgba(240,240,230,0.40)" stroke-width="0.8" transform="skewX(-12)"/>
          <!-- faucet -->
          <line x1="240" y1="28" x2="240" y2="8" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <line x1="240" y1="8" x2="255" y2="8" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <line x1="255" y1="8" x2="255" y2="18" stroke="rgba(240,240,230,0.50)" stroke-width="1.1"/>
          <!-- upper cabinets -->
          <polygon points="20,-60 280,-100 300,-80 40,-40" fill="none" stroke="rgba(240,240,230,0.72)" stroke-width="1.4"/>
          <polygon points="280,-100 300,-80 300,-30 280,-50" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <polygon points="20,-60 20,-12 40,-2 40,-40" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
          <line x1="100" y1="-78" x2="100" y2="-28" stroke="rgba(240,240,230,0.38)" stroke-width="0.8"/>
          <line x1="180" y1="-90" x2="180" y2="-40" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="240" y1="-98" x2="240" y2="-48" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- handle dots -->
          <circle cx="90" cy="-48" r="2" fill="rgba(240,240,230,0.55)"/>
          <circle cx="170" cy="-58" r="2" fill="rgba(240,240,230,0.50)"/>
          <!-- construction line -->
          <line x1="300" y1="80" x2="340" y2="90" stroke="rgba(240,240,230,0.10)" stroke-width="0.4" stroke-dasharray="4,5"/>
        </g>

        <!-- GROUP 7: FLOOR LAMP (top right) -->
        <g class="furniture-item" id="floor-lamp" transform="translate(1200, 60) rotate(-5)" filter="url(#chalk)">
          <!-- base -->
          <ellipse cx="40" cy="240" rx="30" ry="9" fill="none" stroke="rgba(240,240,230,0.75)" stroke-width="1.5"/>
          <ellipse cx="40" cy="248" rx="25" ry="7" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.0"/>
          <!-- pole -->
          <line x1="40" y1="238" x2="40" y2="80" stroke="rgba(240,240,230,0.80)" stroke-width="1.8"/>
          <!-- arm -->
          <line x1="40" y1="80" x2="70" y2="60" stroke="rgba(240,240,230,0.72)" stroke-width="1.5"/>
          <!-- shade -->
          <ellipse cx="80" cy="40" rx="28" ry="10" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.6"/>
          <line x1="52" y1="40" x2="55" y2="70" stroke="rgba(240,240,230,0.75)" stroke-width="1.4"/>
          <line x1="108" y1="40" x2="105" y2="70" stroke="rgba(240,240,230,0.72)" stroke-width="1.4"/>
          <ellipse cx="80" cy="70" rx="22" ry="7" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <!-- pole detail ring -->
          <ellipse cx="40" cy="160" rx="5" ry="2" fill="none" stroke="rgba(240,240,230,0.45)" stroke-width="1.0"/>
          <!-- light rays dashed -->
          <line x1="58" y1="70" x2="40" y2="105" stroke="rgba(240,240,230,0.12)" stroke-width="0.6" stroke-dasharray="4,5"/>
          <line x1="102" y1="70" x2="118" y2="105" stroke="rgba(240,240,230,0.12)" stroke-width="0.6" stroke-dasharray="4,5"/>
        </g>

        <!-- GROUP 8: ARMCHAIR (bottom right) -->
        <g class="furniture-item" id="armchair" transform="translate(1030, 610) rotate(6)" filter="url(#chalk)">
          <!-- seat -->
          <polygon points="0,50 130,20 160,45 30,75" fill="none" stroke="rgba(240,240,230,0.85)" stroke-width="1.7"/>
          <polygon points="130,20 160,45 160,90 130,65" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.4"/>
          <polygon points="0,50 0,95 30,120 30,75" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.4"/>
          <!-- seat cushion line -->
          <line x1="15" y1="58" x2="145" y2="28" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <line x1="8" y1="64" x2="138" y2="34" stroke="rgba(240,240,230,0.22)" stroke-width="0.5"/>
          <!-- backrest -->
          <polygon points="0,50 5,5 135,-15 130,20" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.6"/>
          <line x1="45" y1="0" x2="45" y2="40" stroke="rgba(240,240,230,0.32)" stroke-width="0.7"/>
          <line x1="85" y1="-8" x2="85" y2="30" stroke="rgba(240,240,230,0.30)" stroke-width="0.6"/>
          <!-- armrests -->
          <polygon points="0,50 -10,40 -10,80 0,90" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.2"/>
          <polygon points="-10,40 5,8 5,5 -10,38" fill="none" stroke="rgba(240,240,230,0.52)" stroke-width="1.0"/>
          <polygon points="130,20 140,10 140,60 130,65" fill="none" stroke="rgba(240,240,230,0.58)" stroke-width="1.1"/>
          <!-- legs -->
          <line x1="5" y1="93" x2="5" y2="113" stroke="rgba(240,240,230,0.60)" stroke-width="1.4"/>
          <line x1="28" y1="118" x2="28" y2="138" stroke="rgba(240,240,230,0.55)" stroke-width="1.3"/>
          <line x1="140" y1="88" x2="140" y2="108" stroke="rgba(240,240,230,0.55)" stroke-width="1.3"/>
          <line x1="155" y1="62" x2="155" y2="82" stroke="rgba(240,240,230,0.52)" stroke-width="1.2"/>
        </g>

        <!-- GROUP 9: BOOKSHELF (right, vertical) -->
        <g class="furniture-item" id="bookshelf" transform="translate(1220, 350) rotate(-3)" filter="url(#chalk)">
          <!-- frame front -->
          <rect x="0" y="0" width="80" height="280" fill="none" stroke="rgba(240,240,230,0.78)" stroke-width="1.6"/>
          <!-- side panel (isometric right) -->
          <polygon points="80,0 110,20 110,300 80,280" fill="none" stroke="rgba(240,240,230,0.60)" stroke-width="1.3"/>
          <!-- top panel -->
          <polygon points="0,0 80,0 110,20 30,20" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.4"/>
          <!-- shelves -->
          <line x1="0" y1="70" x2="80" y2="70" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <polygon points="80,70 80,70 110,90 110,90" fill="none" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
          <line x1="0" y1="140" x2="80" y2="140" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <polygon points="80,140 80,140 110,160 110,160" fill="none" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
          <line x1="0" y1="210" x2="80" y2="210" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <!-- book spines (top shelf) -->
          <line x1="8" y1="10" x2="8" y2="68" stroke="rgba(240,240,230,0.45)" stroke-width="2"/>
          <line x1="18" y1="10" x2="18" y2="68" stroke="rgba(240,240,230,0.38)" stroke-width="3"/>
          <line x1="30" y1="10" x2="30" y2="68" stroke="rgba(240,240,230,0.40)" stroke-width="2.5"/>
          <line x1="42" y1="10" x2="42" y2="68" stroke="rgba(240,240,230,0.35)" stroke-width="2"/>
          <line x1="52" y1="20" x2="52" y2="68" stroke="rgba(240,240,230,0.42)" stroke-width="2"/>
          <line x1="61" y1="15" x2="61" y2="68" stroke="rgba(240,240,230,0.38)" stroke-width="3.5"/>
          <!-- book spines (mid shelf) -->
          <line x1="8" y1="80" x2="8" y2="138" stroke="rgba(240,240,230,0.38)" stroke-width="2.5"/>
          <line x1="20" y1="80" x2="20" y2="138" stroke="rgba(240,240,230,0.35)" stroke-width="2"/>
          <line x1="32" y1="80" x2="32" y2="138" stroke="rgba(240,240,230,0.40)" stroke-width="3"/>
          <line x1="44" y1="80" x2="44" y2="138" stroke="rgba(240,240,230,0.35)" stroke-width="2"/>
          <line x1="55" y1="85" x2="55" y2="138" stroke="rgba(240,240,230,0.38)" stroke-width="2.5"/>
          <line x1="66" y1="80" x2="66" y2="138" stroke="rgba(240,240,230,0.32)" stroke-width="2"/>
        </g>

        <!-- GROUP 10: COFFEE TABLE (center-left) -->
        <g class="furniture-item" id="coffee-table" transform="translate(250, 430) rotate(-6)" filter="url(#chalk)">
          <!-- tabletop -->
          <polygon points="0,30 140,0 180,25 40,55" fill="none" stroke="rgba(240,240,230,0.85)" stroke-width="1.7"/>
          <polygon points="0,30 0,44 40,69 40,55" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.4"/>
          <polygon points="40,55 40,69 180,39 180,25" fill="none" stroke="rgba(240,240,230,0.60)" stroke-width="1.3"/>
          <!-- surface detail (circular decorative) -->
          <ellipse cx="90" cy="27" rx="35" ry="11" fill="none" stroke="rgba(240,240,230,0.30)" stroke-width="0.7" transform="skewX(-10)"/>
          <!-- legs hairpin style -->
          <line x1="10" y1="42" x2="5" y2="90" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <line x1="10" y1="42" x2="18" y2="90" stroke="rgba(240,240,230,0.58)" stroke-width="1.2"/>
          <line x1="35" y1="65" x2="30" y2="113" stroke="rgba(240,240,230,0.60)" stroke-width="1.2"/>
          <line x1="35" y1="65" x2="43" y2="113" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
          <line x1="158" y1="28" x2="153" y2="76" stroke="rgba(240,240,230,0.60)" stroke-width="1.2"/>
          <line x1="158" y1="28" x2="166" y2="76" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
          <!-- item on table: vase suggestion -->
          <ellipse cx="110" cy="20" rx="8" ry="3" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.0" transform="skewX(-8)"/>
          <line x1="106" y1="20" x2="103" y2="0" stroke="rgba(240,240,230,0.48)" stroke-width="1.0" transform="skewX(-8)"/>
          <line x1="114" y1="20" x2="117" y2="0" stroke="rgba(240,240,230,0.45)" stroke-width="0.9" transform="skewX(-8)"/>
          <ellipse cx="110" cy="0" rx="5" ry="2" fill="none" stroke="rgba(240,240,230,0.45)" stroke-width="0.9" transform="skewX(-8)"/>
        </g>

        <!-- GROUP 11: WALL SCONCE (upper center-right) -->
        <g class="furniture-item" id="wall-sconce" transform="translate(820, 100)" filter="url(#chalk)">
          <!-- wall bracket -->
          <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(240,240,230,0.72)" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <line x1="0" y1="40" x2="20" y2="40" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <!-- arm curve (arc approx) -->
          <path d="M 30,0 Q 50,0 50,20 Q 50,40 30,40" fill="none" stroke="rgba(240,240,230,0.70)" stroke-width="1.4"/>
          <!-- shade cone -->
          <polygon points="30,40 50,40 62,80 18,80" fill="none" stroke="rgba(240,240,230,0.80)" stroke-width="1.5"/>
          <ellipse cx="40" cy="80" rx="22" ry="7" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <!-- bulb -->
          <circle cx="40" cy="50" r="6" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.0"/>
          <!-- light rays -->
          <line x1="18" y1="80" x2="5" y2="115" stroke="rgba(240,240,230,0.10)" stroke-width="0.5" stroke-dasharray="3,5"/>
          <line x1="62" y1="80" x2="75" y2="115" stroke="rgba(240,240,230,0.10)" stroke-width="0.5" stroke-dasharray="3,5"/>
          <line x1="40" y1="80" x2="40" y2="115" stroke="rgba(240,240,230,0.08)" stroke-width="0.5" stroke-dasharray="3,5"/>
        </g>

        <!-- GROUP 12: SIDE TABLE with lamp (top-right area, below floor lamp) -->
        <g class="furniture-item" id="side-table" transform="translate(1100, 500) rotate(-4)" filter="url(#chalk)">
          <!-- tabletop round (isometric ellipse) -->
          <ellipse cx="50" cy="30" rx="50" ry="17" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.6"/>
          <ellipse cx="50" cy="36" rx="50" ry="17" fill="none" stroke="rgba(240,240,230,0.62)" stroke-width="1.2"/>
          <!-- table cylinder body -->
          <line x1="0" y1="30" x2="0" y2="110" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <line x1="100" y1="30" x2="100" y2="110" stroke="rgba(240,240,230,0.62)" stroke-width="1.2"/>
          <ellipse cx="50" cy="110" rx="50" ry="17" fill="none" stroke="rgba(240,240,230,0.58)" stroke-width="1.2"/>
          <!-- table lamp on top -->
          <line x1="50" y1="10" x2="50" y2="-35" stroke="rgba(240,240,230,0.70)" stroke-width="1.3"/>
          <polygon points="25,-35 75,-35 65,-5 35,-5" fill="none" stroke="rgba(240,240,230,0.78)" stroke-width="1.4"/>
          <ellipse cx="50" cy="-5" rx="15" ry="5" fill="none" stroke="rgba(240,240,230,0.62)" stroke-width="1.1"/>
          <!-- lamp base ring -->
          <ellipse cx="50" cy="12" rx="12" ry="4" fill="none" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
        </g>

        <!-- GROUP 13: RUG (center floor, under coffee table / sofa) -->
        <g class="furniture-item" id="rug" transform="translate(180, 500) rotate(-4)" filter="url(#chalk)">
          <!-- rug outline isometric -->
          <polygon points="0,50 280,0 340,35 60,85" fill="none" stroke="rgba(240,240,230,0.42)" stroke-width="1.2" stroke-dasharray="6,3"/>
          <!-- inner border -->
          <polygon points="20,50 265,5 320,37 75,82" fill="none" stroke="rgba(240,240,230,0.25)" stroke-width="0.7" stroke-dasharray="4,3"/>
          <!-- rug pattern lines (geometric) -->
          <line x1="70" y1="28" x2="85" y2="73" stroke="rgba(240,240,230,0.18)" stroke-width="0.5"/>
          <line x1="140" y1="14" x2="155" y2="59" stroke="rgba(240,240,230,0.16)" stroke-width="0.5"/>
          <line x1="210" y1="5" x2="225" y2="50" stroke="rgba(240,240,230,0.16)" stroke-width="0.5"/>
          <line x1="40" y1="34" x2="290" y2="10" stroke="rgba(240,240,230,0.12)" stroke-width="0.4"/>
          <line x1="45" y1="50" x2="295" y2="26" stroke="rgba(240,240,230,0.10)" stroke-width="0.4"/>
        </g>

        <!-- GROUP 14: DOOR FRAME (far right edge) -->
        <g class="furniture-item" id="door-frame" transform="translate(1310, 250)" filter="url(#chalk)">
          <!-- frame -->
          <line x1="0" y1="0" x2="0" y2="320" stroke="rgba(240,240,230,0.60)" stroke-width="1.5"/>
          <line x1="60" y1="0" x2="60" y2="320" stroke="rgba(240,240,230,0.55)" stroke-width="1.4"/>
          <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(240,240,230,0.58)" stroke-width="1.5"/>
          <!-- isometric side reveal -->
          <polygon points="60,0 80,15 80,335 60,320" fill="none" stroke="rgba(240,240,230,0.45)" stroke-width="1.2"/>
          <!-- door panel -->
          <rect x="5" y="10" width="50" height="300" fill="none" stroke="rgba(240,240,230,0.35)" stroke-width="0.8"/>
          <!-- panel detail -->
          <rect x="10" y="20" width="40" height="120" fill="none" stroke="rgba(240,240,230,0.28)" stroke-width="0.7"/>
          <rect x="10" y="155" width="40" height="145" fill="none" stroke="rgba(240,240,230,0.28)" stroke-width="0.7"/>
          <!-- handle -->
          <line x1="18" y1="160" x2="18" y2="180" stroke="rgba(240,240,230,0.55)" stroke-width="1.3"/>
          <circle cx="18" cy="180" r="4" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
        </g>

        <!-- GROUP 15: ABSTRACT DECORATIVE PANEL / ARTWORK (left wall) -->
        <g class="furniture-item" id="wall-art" transform="translate(30, 250)" filter="url(#chalk)">
          <!-- frame -->
          <rect x="0" y="0" width="100" height="130" fill="none" stroke="rgba(240,240,230,0.60)" stroke-width="1.5"/>
          <!-- isometric depth -->
          <polygon points="100,0 115,12 115,142 100,130" fill="none" stroke="rgba(240,240,230,0.45)" stroke-width="1.1"/>
          <polygon points="0,0 100,0 115,12 15,12" fill="none" stroke="rgba(240,240,230,0.50)" stroke-width="1.2"/>
          <!-- abstract artwork lines -->
          <line x1="10" y1="20" x2="90" y2="110" stroke="rgba(240,240,230,0.35)" stroke-width="0.8"/>
          <line x1="90" y1="20" x2="10" y2="110" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <circle cx="50" cy="65" r="28" fill="none" stroke="rgba(240,240,230,0.32)" stroke-width="0.8"/>
          <circle cx="50" cy="65" r="15" fill="none" stroke="rgba(240,240,230,0.25)" stroke-width="0.6"/>
        </g>

        <!-- GROUP 16: SMALL STOOL (scattered, lower center) -->
        <g class="furniture-item" id="stool" transform="translate(760, 620) rotate(8)" filter="url(#chalk)">
          <!-- top -->
          <ellipse cx="40" cy="20" rx="38" ry="13" fill="none" stroke="rgba(240,240,230,0.80)" stroke-width="1.5"/>
          <!-- legs x3 isometric -->
          <line x1="15" y1="28" x2="8" y2="85" stroke="rgba(240,240,230,0.70)" stroke-width="1.4"/>
          <line x1="65" y1="28" x2="72" y2="85" stroke="rgba(240,240,230,0.68)" stroke-width="1.3"/>
          <line x1="40" y1="32" x2="40" y2="89" stroke="rgba(240,240,230,0.65)" stroke-width="1.3"/>
          <!-- cross bar -->
          <line x1="12" y1="60" x2="68" y2="60" stroke="rgba(240,240,230,0.45)" stroke-width="0.9"/>
          <line x1="20" y1="72" x2="60" y2="58" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- cushion texture -->
          <ellipse cx="40" cy="20" rx="25" ry="8" fill="none" stroke="rgba(240,240,230,0.30)" stroke-width="0.6" stroke-dasharray="3,3"/>
        </g>

        <!-- GROUP 17: FLOATING DIMENSION LINES / ANNOTATIONS -->
        <g class="annotation-lines" opacity="0.25">
          <!-- dim line 1 -->
          <line x1="200" y1="350" x2="440" y2="350" stroke="rgba(240,240,230,0.60)" stroke-width="0.6" stroke-dasharray="5,4"/>
          <line x1="200" y1="344" x2="200" y2="356" stroke="rgba(240,240,230,0.60)" stroke-width="0.8"/>
          <line x1="440" y1="344" x2="440" y2="356" stroke="rgba(240,240,230,0.60)" stroke-width="0.8"/>
          <!-- dim line 2 -->
          <line x1="700" y1="180" x2="920" y2="180" stroke="rgba(240,240,230,0.50)" stroke-width="0.5" stroke-dasharray="4,5"/>
          <line x1="700" y1="175" x2="700" y2="185" stroke="rgba(240,240,230,0.50)" stroke-width="0.7"/>
          <line x1="920" y1="175" x2="920" y2="185" stroke="rgba(240,240,230,0.50)" stroke-width="0.7"/>
          <!-- vertical dim -->
          <line x1="1180" y1="100" x2="1180" y2="340" stroke="rgba(240,240,230,0.45)" stroke-width="0.5" stroke-dasharray="4,5"/>
          <line x1="1175" y1="100" x2="1185" y2="100" stroke="rgba(240,240,230,0.45)" stroke-width="0.7"/>
          <line x1="1175" y1="340" x2="1185" y2="340" stroke="rgba(240,240,230,0.45)" stroke-width="0.7"/>
          <!-- cross reference lines -->
          <line x1="340" y1="0" x2="340" y2="900" stroke="rgba(240,240,230,0.06)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="700" y1="0" x2="700" y2="900" stroke="rgba(240,240,230,0.05)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="1050" y1="0" x2="1050" y2="900" stroke="rgba(240,240,230,0.06)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="0" y1="300" x2="1400" y2="300" stroke="rgba(240,240,230,0.05)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="0" y1="600" x2="1400" y2="600" stroke="rgba(240,240,230,0.05)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <!-- small cross markers -->
          <line x1="698" y1="448" x2="702" y2="452" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="702" y1="448" x2="698" y2="452" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <line x1="348" y1="598" x2="352" y2="602" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <line x1="352" y1="598" x2="348" y2="602" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <line x1="1048" y1="298" x2="1052" y2="302" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
          <line x1="1052" y1="298" x2="1048" y2="302" stroke="rgba(240,240,230,0.30)" stroke-width="0.7"/>
        </g>

        <!-- GROUP 18: SMALL DECORATIVE FLOATING ELEMENTS -->
        <g class="furniture-item" id="vase-standalone" transform="translate(840, 560)" filter="url(#chalk)">
          <!-- vase isometric -->
          <ellipse cx="20" cy="8" rx="18" ry="6" fill="none" stroke="rgba(240,240,230,0.65)" stroke-width="1.2"/>
          <line x1="2" y1="8" x2="5" y2="55" stroke="rgba(240,240,230,0.60)" stroke-width="1.1"/>
          <line x1="38" y1="8" x2="35" y2="55" stroke="rgba(240,240,230,0.58)" stroke-width="1.1"/>
          <ellipse cx="20" cy="55" rx="14" ry="5" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.0"/>
          <!-- vase belly curve -->
          <path d="M 5 22 Q -2 38 5 52" fill="none" stroke="rgba(240,240,230,0.40)" stroke-width="0.9"/>
          <path d="M 35 22 Q 42 38 35 52" fill="none" stroke="rgba(240,240,230,0.38)" stroke-width="0.9"/>
          <!-- branch/twig -->
          <line x1="20" y1="8" x2="15" y2="-30" stroke="rgba(240,240,230,0.50)" stroke-width="0.9"/>
          <line x1="15" y1="-15" x2="5" y2="-35" stroke="rgba(240,240,230,0.38)" stroke-width="0.7"/>
          <line x1="15" y1="-20" x2="28" y2="-38" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <circle cx="5" cy="-36" r="2" fill="none" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <circle cx="28" cy="-39" r="2" fill="none" stroke="rgba(240,240,230,0.32)" stroke-width="0.7"/>
          <circle cx="14" cy="-31" r="2" fill="none" stroke="rgba(240,240,230,0.32)" stroke-width="0.7"/>
        </g>

        <!-- GROUP 19: KITCHEN ISLAND (lower center) -->
        <g class="furniture-item" id="kitchen-island" transform="translate(500, 680) rotate(-2)" filter="url(#chalk)">
          <!-- island top -->
          <polygon points="0,30 180,0 220,25 40,55" fill="none" stroke="rgba(240,240,230,0.82)" stroke-width="1.7"/>
          <!-- thickness -->
          <polygon points="0,30 0,50 40,75 40,55" fill="none" stroke="rgba(240,240,230,0.62)" stroke-width="1.3"/>
          <polygon points="40,55 40,75 220,45 220,25" fill="none" stroke="rgba(240,240,230,0.58)" stroke-width="1.2"/>
          <!-- vertical panels front face -->
          <polygon points="0,50 0,140 40,165 40,75" fill="none" stroke="rgba(240,240,230,0.68)" stroke-width="1.4"/>
          <line x1="0" y1="50" x2="40" y2="75" stroke="rgba(240,240,230,0.55)" stroke-width="1.1"/>
          <!-- drawers on side -->
          <line x1="8" y1="88" x2="35" y2="105" stroke="rgba(240,240,230,0.42)" stroke-width="0.8"/>
          <line x1="8" y1="108" x2="35" y2="125" stroke="rgba(240,240,230,0.38)" stroke-width="0.7"/>
          <line x1="8" y1="128" x2="35" y2="145" stroke="rgba(240,240,230,0.35)" stroke-width="0.7"/>
          <!-- handle dots -->
          <circle cx="20" cy="97" r="1.5" fill="rgba(240,240,230,0.50)"/>
          <circle cx="20" cy="117" r="1.5" fill="rgba(240,240,230,0.45)"/>
          <!-- counter stools suggestion -->
          <line x1="60" y1="75" x2="55" y2="130" stroke="rgba(240,240,230,0.45)" stroke-width="1.0"/>
          <line x1="55" y1="130" x2="50" y2="130" stroke="rgba(240,240,230,0.40)" stroke-width="0.9"/>
          <line x1="55" y1="130" x2="60" y2="130" stroke="rgba(240,240,230,0.40)" stroke-width="0.9"/>
          <ellipse cx="60" cy="72" rx="12" ry="4" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.0"/>
          <line x1="120" y1="57" x2="115" y2="112" stroke="rgba(240,240,230,0.40)" stroke-width="1.0"/>
          <ellipse cx="120" cy="54" rx="12" ry="4" fill="none" stroke="rgba(240,240,230,0.50)" stroke-width="1.0"/>
        </g>

        <!-- Subtle floating dots / nodes connecting elements -->
        <g class="connection-dots" opacity="0.35">
          <circle cx="200" cy="155" r="2" fill="rgba(240,240,230,0.55)"/>
          <circle cx="450" cy="350" r="1.5" fill="rgba(240,240,230,0.45)"/>
          <circle cx="700" cy="450" r="2" fill="rgba(240,240,230,0.50)"/>
          <circle cx="1000" cy="580" r="1.5" fill="rgba(240,240,230,0.45)"/>
          <circle cx="820" cy="220" r="2" fill="rgba(240,240,230,0.50)"/>
          <circle cx="350" cy="650" r="1.5" fill="rgba(240,240,230,0.40)"/>
          <circle cx="1150" cy="300" r="2" fill="rgba(240,240,230,0.45)"/>
          <!-- connection lines between furniture -->
          <line x1="200" y1="155" x2="450" y2="350" stroke="rgba(240,240,230,0.10)" stroke-width="0.5" stroke-dasharray="2,8"/>
          <line x1="450" y1="350" x2="700" y2="450" stroke="rgba(240,240,230,0.08)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="820" y1="220" x2="1000" y2="580" stroke="rgba(240,240,230,0.08)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="350" y1="650" x2="700" y2="450" stroke="rgba(240,240,230,0.07)" stroke-width="0.4" stroke-dasharray="2,8"/>
          <line x1="1000" y1="580" x2="1150" y2="300" stroke="rgba(240,240,230,0.08)" stroke-width="0.4" stroke-dasharray="2,8"/>
        </g>

      </svg>
    </div>

    <!-- Enter arrow -->
    <a href="/home" id="enter-arrow" aria-label="Entra nel sito">
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" class="arrow-svg">
        <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(240,240,230,0.55)" stroke-width="1.2"/>
        <circle cx="30" cy="30" r="23" fill="none" stroke="rgba(240,240,230,0.22)" stroke-width="0.6"/>
        <line x1="18" y1="30" x2="42" y2="30" stroke="rgba(240,240,230,0.85)" stroke-width="1.4"/>
        <polyline points="34,22 42,30 34,38" fill="none" stroke="rgba(240,240,230,0.85)" stroke-width="1.4" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>

  <script src="/static/intro.js"></script>
</body>
</html>`)
})

app.get('/home', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Studio — Interior Design</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/static/home.css"/>
</head>
<body>
  <header class="site-header">
    <div class="logo">STUDIO</div>
    <nav>
      <a href="#">Progetti</a>
      <a href="#">Servizi</a>
      <a href="#">About</a>
      <a href="#">Contatti</a>
    </nav>
  </header>
  <main class="home-main">
    <div class="hero-text">
      <h1>Spazio.<br/>Forma.<br/>Identità.</h1>
      <p>Design d'interni su misura per chi non si accontenta dell'ordinario.</p>
      <a href="#" class="cta-btn">Scopri i nostri progetti</a>
    </div>
  </main>
  <div class="home-line-art">
    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="chalk2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G"/></filter>
      </defs>
      <g filter="url(#chalk2)" opacity="0.5">
        <polygon points="50,200 250,130 330,180 130,250" fill="none" stroke="#c8c4b8" stroke-width="1.2"/>
        <polygon points="250,130 330,180 330,250 250,200" fill="none" stroke="#c8c4b8" stroke-width="1.0"/>
        <line x1="50" y1="200" x2="50" y2="280" stroke="#c8c4b8" stroke-width="1.0"/>
        <line x1="130" y1="250" x2="130" y2="330" stroke="#c8c4b8" stroke-width="0.9"/>
        <polygon points="100,185 190,160 210,175 120,200" fill="none" stroke="#c8c4b8" stroke-width="0.9"/>
        <line x1="155" y1="165" x2="155" y2="140" stroke="#c8c4b8" stroke-width="1.0"/>
        <polygon points="140,140 170,130 180,140 150,150" fill="none" stroke="#c8c4b8" stroke-width="0.9"/>
        <ellipse cx="400" cy="200" rx="80" ry="27" fill="none" stroke="#c8c4b8" stroke-width="1.1"/>
        <line x1="320" y1="200" x2="320" y2="300" stroke="#c8c4b8" stroke-width="1.0"/>
        <line x1="480" y1="200" x2="480" y2="300" stroke="#c8c4b8" stroke-width="0.9"/>
        <ellipse cx="400" cy="300" rx="80" ry="27" fill="none" stroke="#c8c4b8" stroke-width="0.9"/>
        <line x1="500" y1="80" x2="500" y2="320" stroke="#c8c4b8" stroke-width="1.1"/>
        <line x1="540" y1="80" x2="540" y2="320" stroke="#c8c4b8" stroke-width="1.0"/>
        <line x1="500" y1="80" x2="540" y2="80" stroke="#c8c4b8" stroke-width="1.0"/>
      </g>
    </svg>
  </div>
</body>
</html>`)
})

export default app
