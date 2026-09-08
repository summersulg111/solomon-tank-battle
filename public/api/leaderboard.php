<?php
require __DIR__.'/../bootstrap.php'; $limit=min(100,max(1,(int)($_GET['limit']??20))); $s=$pdo->prepare('SELECT u.username,s.score,s.completion_time,s.deaths,s.coins,l.name FROM scores s JOIN users u ON u.id=s.user_id JOIN levels l ON l.id=s.level_id WHERE s.verified=1 ORDER BY s.score DESC LIMIT '.$limit); $s->execute(); json_out(['success'=>true,'leaderboard'=>$s->fetchAll()]);
