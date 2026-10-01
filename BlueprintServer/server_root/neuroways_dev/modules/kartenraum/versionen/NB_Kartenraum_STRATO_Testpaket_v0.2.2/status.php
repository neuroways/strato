<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');

$base = __DIR__;
$cardsDir = dirname($base) . '/cards';

$required = [
  'SheetA-2.png','SheetB.png','SheetC.png','SheetD.png',
  'SheetE.png','SheetF.png','SheetG.png',
  'SheetH.png','SheetI.png','SheetJ.png',
  'SheetK.png','SheetL.png','sheetM.png',
  'SheetN.png','SheetO.png','SheetP.png','SheetR.png'
];
$optional = ['SheetA-1.png'];

function esc(string $value): string {
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function imageInfo(string $path): array {
  if (!is_file($path)) {
    return ['exists'=>false, 'width'=>null, 'height'=>null, 'square'=>false];
  }
  $size = @getimagesize($path);
  if (!$size) {
    return ['exists'=>true, 'width'=>null, 'height'=>null, 'square'=>false];
  }
  return [
    'exists'=>true,
    'width'=>$size[0],
    'height'=>$size[1],
    'square'=>$size[0] === $size[1],
  ];
}

$rows = [];
$ok = 0;
foreach ($required as $file) {
  $info = imageInfo($cardsDir . '/' . $file);
  if ($info['exists'] && $info['square']) $ok++;
  $rows[] = [$file, true, $info];
}
foreach ($optional as $file) {
  $rows[] = [$file, false, imageInfo($cardsDir . '/' . $file)];
}

$allOk = $ok === count($required);
?>
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>NeuroBalance Kartenraum · Assetstatus</title>
<style>
body{font-family:system-ui,sans-serif;background:#07111f;color:#f7f0df;margin:0}
main{max-width:980px;margin:auto;padding:32px 18px 70px}
h1{font-family:Georgia,serif;font-weight:500}
a{color:#f0dca5}
.summary{border:1px solid rgba(216,184,106,.3);border-radius:18px;padding:18px;background:#0f1a2d;margin:20px 0}
.ok{color:#93d6ae}.bad{color:#ef9d91}.muted{color:#aaa7b5}
table{width:100%;border-collapse:collapse;background:#0f1a2d;border-radius:16px;overflow:hidden}
th,td{text-align:left;padding:11px;border-bottom:1px solid rgba(216,184,106,.16);font-size:.9rem}
code{color:#f0dca5}
</style>
</head>
<body>
<main>
<p><a href="./">← Kartenraum Preview</a></p>
<h1>STRATO Assetstatus</h1>
<div class="summary">
  <strong class="<?= $allOk ? 'ok' : 'bad' ?>">
    <?= $allOk ? 'Alle benötigten Sheets sind vorhanden.' : esc((string)$ok) . ' von ' . esc((string)count($required)) . ' benötigten Sheets sind technisch bereit.' ?>
  </strong>
  <p class="muted">Erwarteter Ordner: <code>../cards/</code>. Für den Produktionsbestand sollten die Sheets quadratisch sein; Referenz: 1254 × 1254 px.</p>
</div>
<table>
<thead><tr><th>Datei</th><th>Pflicht</th><th>Status</th><th>Größe</th></tr></thead>
<tbody>
<?php foreach ($rows as [$file,$requiredFlag,$info]): ?>
<tr>
<td><?= esc($file) ?></td>
<td><?= $requiredFlag ? 'Ja' : 'Nein' ?></td>
<td class="<?= ($info['exists'] && $info['square']) ? 'ok' : 'bad' ?>">
<?php
if (!$info['exists']) echo 'fehlt';
elseif (!$info['width']) echo 'kein lesbares Bild';
elseif (!$info['square']) echo 'vorhanden, aber nicht quadratisch';
else echo 'bereit';
?>
</td>
<td><?= $info['width'] ? esc($info['width'].' × '.$info['height'].' px') : '—' ?></td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
</main>
</body>
</html>
