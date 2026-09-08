<?php
declare(strict_types=1);
$level = max(1, min(5, (int)($_GET['level'] ?? 1)));
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<title>SOLOMON: DEVIL LEVEL</title>
<link rel="stylesheet" href="assets/css/main.css">
</head>
<body class="game-page">
<header class="gamebar">
  <a href="index.php" class="brand">SOLOMON</a>
  <strong>DEVIL LEVEL</strong>
  <span id="status">LEVEL <?php echo $level; ?></span>
</header>
<main class="game-wrap">
  <div class="hud" aria-live="polite">
    <span>SCORE <b id="score">0</b></span>
    <span>COINS <b id="coins">0</b></span>
    <span>DEATHS <b id="deaths">0</b></span>
    <span>TIME <b id="timer">0.0</b></span>
    <button id="pause" type="button" aria-label="Pause game">Ⅱ</button>
  </div>
  <canvas id="game" width="1280" height="720" aria-label="Solomon Devil Level game"></canvas>
  <div class="touch" aria-label="Mobile controls">
    <button type="button" data-key="left" aria-label="Move left">◀</button>
    <button type="button" data-key="right" aria-label="Move right">▶</button>
    <button type="button" data-key="jump" aria-label="Jump">▲</button>
  </div>
  <div id="overlay" class="overlay hidden" role="dialog" aria-live="assertive">
    <h2 id="overlayTitle">PAUSED</h2>
    <p id="overlayText"></p>
    <button id="restart" type="button" class="btn primary">RESTART</button>
    <a class="btn" href="index.php">EXIT</a>
  </div>
</main>
<script type="module">
import { startSolomonGame } from './assets/js/game/GameRuntime.js';
import { UIManager } from './assets/js/game/UIManager.js';

const $ = id => document.getElementById(id);
const ui = new UIManager({
  score: $('score'), coins: $('coins'), deaths: $('deaths'), timer: $('timer'),
  overlay: $('overlay'), title: $('overlayTitle'), text: $('overlayText'),
  restart: $('restart'), pause: $('pause')
});

let runtime;
const levelId = <?php echo $level; ?>;

function showPause() {
  if (!runtime?.game) return;
  if (runtime.game.state === 'PAUSED') {
    runtime.game.resume();
    $('overlay').classList.add('hidden');
  } else {
    runtime.game.pause();
    $('overlayTitle').textContent = 'PAUSED';
    $('overlayText').textContent = 'Take a breath. The level will still be here.';
    $('overlay').classList.remove('hidden');
  }
}

$('pause').addEventListener('click', showPause);
$('restart').addEventListener('click', () => location.reload());
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') showPause();
});

try {
  runtime = await startSolomonGame({ canvas: $('game'), levelId, ui });
} catch (error) {
  $('overlayTitle').textContent = 'LOAD ERROR';
  $('overlayText').textContent = error.message || 'Unable to load this level.';
  $('overlay').classList.remove('hidden');
}
</script>
</body>
</html>
