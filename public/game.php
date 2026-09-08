<?php
declare(strict_types=1);
$level = max(1, min(5, (int)($_GET['level'] ?? 1)));
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>SOLOMON: DEVIL LEVEL</title><link rel="stylesheet" href="assets/css/main.css"></head>
<body class="game-page">
<header class="gamebar"><a href="index.php" class="brand">SOLOMON</a><strong>DEVIL LEVEL</strong><span id="status">LEVEL <?php echo $level; ?></span></header>
<main class="game-wrap"><div class="hud"><span>SCORE <b id="score">0</b></span><span>COINS <b id="coins">0</b></span><span>DEATHS <b id="deaths">0</b></span><span>TIME <b id="timer">0.0</b></span><button id="pause">Ⅱ</button></div><canvas id="game" width="1280" height="720" aria-label="Solomon Devil Level game"></canvas>
<div class="touch"><button data-key="left">◀</button><button data-key="right">▶</button><button data-key="jump">▲</button></div>
<div id="overlay" class="overlay hidden"><h2 id="overlayTitle">PAUSED</h2><p id="overlayText"></p><button id="restart" class="btn primary">RESTART</button><a class="btn" href="index.php">EXIT</a></div></main>
<script>window.SOLOMON_LEVEL=<?php echo $level; ?>;</script><script src="assets/js/game.js"></script></body></html>
