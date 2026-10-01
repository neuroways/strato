<?php
declare(strict_types=1);
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#0a1f44">
  <title>NeuroWays Core Experience · STRATO Pilot</title>
  <link rel="stylesheet" href="assets/css/core.css">
  <link rel="stylesheet" href="assets/css/experience.css">
</head>
<body>
  <main id="app" class="app mode-standard">
    <aside class="sidebar" aria-label="Hauptnavigation">
      <div class="brand"><span class="brand-wave">≋</span><span><b>NeuroWays</b><small>Erkennt Wege. Stärkt Menschen.</small></span></div>
      <nav id="desktop-nav"></nav><div class="spacer"></div>
      <button class="privacy" data-view="path"><span>♧</span><span><b>Dein Weg gehört dir.</b><small>Privat in diesem Piloten</small></span></button>
      <button class="profile" type="button"><span class="avatar">S</span><span><b>Svenja</b><small>Dein Raum</small></span></button>
    </aside>
    <section class="shell">
      <header class="topbar">
        <div class="brand compact"><span class="brand-wave">≋</span></div>
        <div class="welcome"><b>Willkommen zurück, Svenja. <span id="day-icon">☀</span></b><small>Wohin darf dein Weg heute führen?</small></div>
        <div class="controls">
          <button id="motion-toggle" class="motion-toggle" aria-pressed="false">Bewegung reduzieren</button>
          <div class="mode-wrap"><button id="mode-button" class="mode-button" aria-expanded="false"><i></i><span id="mode-label">Standard</span><span>⌄</span></button><div id="mode-menu" class="mode-menu" hidden></div></div>
        </div>
      </header>
      <div class="experience">
        <div class="world" aria-hidden="true"><div class="sun"></div><div class="ridge back-ridge"></div><div class="ridge mid-ridge"></div><div class="river"></div><div class="ridge front-ridge"></div><div class="wayline"><span class="point"></span></div></div>
        <section id="content-card" class="content-card" aria-live="polite"></section>
        <aside id="moment-card" class="moment-card"><span>∿</span><div><small>Dein Moment</small><b id="moment-label">Ankommen</b></div><button id="moment-change">ändern</button></aside>
      </div>
      <footer><span>Dein Weg ist privat.</span><span>Du bestimmst, was etwas für dich bedeutet.</span><span>Lokaler Pilot-Zustand · nichts wird gespeichert</span></footer>
    </section>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile Navigation"></nav>
  </main>
  <script type="module" src="assets/js/app.js"></script>
</body>
</html>
