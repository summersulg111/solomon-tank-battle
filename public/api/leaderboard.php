<?php declare(strict_types=1); require_once __DIR__.'/../../config/database.php';
$level=max(1,(int)($_GET['level_id']??1));$limit=min(100,max(1,(int)($_GET['limit']??20)));
$stmt=db()->prepare('SELECT u.username,s.score,s.completion_time,s.deaths FROM scores s JOIN users u ON u.id=s.user_id WHERE s.level_id=? AND s.verified=1 ORDER BY s.score DESC,s.completion_time ASC LIMIT '.$limit);$stmt->execute([$level]);$rows=$stmt->fetchAll();
foreach($rows as $i=>&$r)$r['rank']=$i+1; json_response(['success'=>true,'leaderboard'=>$rows]);
