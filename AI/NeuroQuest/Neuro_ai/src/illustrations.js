// Einfache, warme SVG-Illustrationen für NeuroQuest
// Diese werden direkt im Code eingebettet statt externe Dateien zu laden

export const forestIllustration = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Hintergrund -->
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e8dcc8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d4a574;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#skyGrad)"/>
  
  <!-- Bäume -->
  <g opacity="0.8">
    <ellipse cx="80" cy="120" rx="35" ry="50" fill="#3d6b54"/>
    <rect x="70" y="160" width="20" height="40" fill="#8b7355"/>
  </g>
  
  <g opacity="0.7">
    <ellipse cx="320" cy="140" rx="40" ry="55" fill="#3d6b54"/>
    <rect x="310" y="180" width="20" height="40" fill="#8b7355"/>
  </g>
  
  <!-- Mittlerer Baum -->
  <g>
    <ellipse cx="200" cy="100" rx="50" ry="65" fill="#3d6b54"/>
    <rect x="185" y="155" width="30" height="50" fill="#8b7355"/>
  </g>
  
  <!-- Licht-Effekt (Lumi) -->
  <circle cx="200" cy="80" r="20" fill="#d4a574" opacity="0.8"/>
  <circle cx="200" cy="80" r="15" fill="#fde8c8" opacity="0.6"/>
  
  <!-- Sterne/Lichter -->
  <circle cx="150" cy="50" r="3" fill="#d4a574" opacity="0.7"/>
  <circle cx="280" cy="45" r="3" fill="#d4a574" opacity="0.7"/>
  <circle cx="120" cy="70" r="2" fill="#d4a574" opacity="0.5"/>
  <circle cx="300" cy="90" r="2" fill="#d4a574" opacity="0.5"/>
</svg>
`;

export const casparlumi = `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Hintergrund -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e8dcc8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c9a876;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bgGrad)"/>
  
  <!-- Caspar sitzt -->
  <g>
    <!-- Hose -->
    <rect x="140" y="180" width="60" height="80" fill="#6b8e6b" rx="5"/>
    <!-- Jacke -->
    <ellipse cx="170" cy="160" rx="40" ry="35" fill="#4a7a5e"/>
    <!-- Hals -->
    <rect x="155" y="135" width="30" height="25" fill="#d4a574"/>
    <!-- Kopf -->
    <circle cx="170" cy="110" r="25" fill="#d4a574"/>
    <!-- Haare -->
    <ellipse cx="170" cy="95" rx="28" ry="15" fill="#8b6f47"/>
    <!-- Augen -->
    <circle cx="160" cy="105" r="3" fill="#2d2420"/>
    <circle cx="180" cy="105" r="3" fill="#2d2420"/>
    <!-- Brille -->
    <circle cx="160" cy="105" r="5" fill="none" stroke="#7d9b8d" stroke-width="1.5"/>
    <circle cx="180" cy="105" r="5" fill="none" stroke="#7d9b8d" stroke-width="1.5"/>
    <!-- Mund -->
    <path d="M 165 120 Q 170 125 175 120" stroke="#2d2420" fill="none" stroke-width="1.5"/>
  </g>
  
  <!-- Lumi schwebt rechts -->
  <g>
    <!-- Körper -->
    <ellipse cx="280" cy="140" rx="22" ry="28" fill="#d4a574" opacity="0.9"/>
    <!-- Kopf -->
    <circle cx="280" cy="105" r="15" fill="#fde8c8"/>
    <!-- Augen -->
    <circle cx="274" cy="100" r="2" fill="#2d2420"/>
    <circle cx="286" cy="100" r="2" fill="#2d2420"/>
    <!-- Mund -->
    <path d="M 278 110 Q 280 113 282 110" stroke="#2d2420" fill="none" stroke-width="1"/>
    <!-- Glühen -->
    <circle cx="280" cy="140" r="25" fill="#d4a574" opacity="0.3"/>
  </g>
  
  <!-- Text unten -->
  <text x="200" y="280" font-size="16" font-family="serif" fill="#3d6b54" text-anchor="middle" font-weight="bold">
    Caspar und Lumi
  </text>
</svg>
`;

export const dayBackground = `
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Sanfter Wald-Hintergrund -->
  <defs>
    <linearGradient id="dayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f4e8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d9d0bf;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="250" fill="url(#dayGrad)"/>
  
  <!-- Ferne Bäume (hell) -->
  <g opacity="0.4">
    <ellipse cx="60" cy="80" rx="30" ry="45" fill="#7d9b8d"/>
    <ellipse cx="350" cy="90" rx="35" ry="50" fill="#7d9b8d"/>
  </g>
  
  <!-- Mittlere Bäume -->
  <g opacity="0.6">
    <ellipse cx="120" cy="100" rx="35" ry="50" fill="#3d6b54"/>
    <ellipse cx="280" cy="110" rx="38" ry="55" fill="#3d6b54"/>
  </g>
  
  <!-- Vordere Bäume (dunkel) -->
  <g>
    <ellipse cx="200" cy="80" rx="45" ry="60" fill="#3d6b54"/>
    <rect x="180" y="130" width="40" height="60" fill="#8b7355"/>
  </g>
  
  <!-- Pfad -->
  <ellipse cx="200" cy="180" rx="80" ry="20" fill="#c9a876" opacity="0.7"/>
  
  <!-- Lichter -->
  <circle cx="150" cy="50" r="4" fill="#d4a574" opacity="0.6"/>
  <circle cx="250" cy="45" r="4" fill="#d4a574" opacity="0.6"/>
  <circle cx="100" cy="70" r="3" fill="#d4a574" opacity="0.4"/>
</svg>
`;
