<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');

$apiUrl = 'story.php?grade=2';
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NeuroQuest Story-Test</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;background:#faf8f3;color:#2d3436}
    pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#fff;padding:20px;border-radius:12px;border:1px solid #ddd}
    .ok{color:#2f6b46}.warn{color:#8a5b17}
  </style>
</head>
<body>
  <h1>NeuroQuest Story-Test</h1>
  <p id="status">Story wird geladen …</p>
  <pre id="output"></pre>
  <script>
    fetch(<?= json_encode($apiUrl, JSON_UNESCAPED_SLASHES) ?>, {cache:'no-store'})
      .then(async response => {
        const data = await response.json();
        document.getElementById('status').textContent =
          data.source === 'database'
            ? '✓ Geschichte wurde aus MariaDB geladen.'
            : '⚠ Standardgeschichte aktiv. Grund: ' + (data.reason || 'unbekannt');
        document.getElementById('status').className =
          data.source === 'database' ? 'ok' : 'warn';
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        document.getElementById('status').textContent = '✗ API konnte nicht gelesen werden.';
        document.getElementById('output').textContent = String(error);
      });
  </script>
</body>
</html>
