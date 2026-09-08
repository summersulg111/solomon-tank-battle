<?php
declare(strict_types=1); require_once __DIR__.'/../../config/database.php';
$userId=require_auth(); if($_SERVER['REQUEST_METHOD']!=='POST') json_response(['success'=>false,'message'=>'Method not allowed'],405);
$b=json_decode(file_get_contents('php://input'),true) ?: [];$level=(int)($b['level_id']??0);$time=(float)($b['completion_time']??0);$deaths=(int)($b['deaths']??0);$coins=(int)($b['coins']??0);
if($level<1||$level>5||$time<=0||$time>3600||$deaths<0||$deaths>10000||$coins<0||$coins>1000) json_response(['success'=>false,'message'=>'Invalid score data'],422);
$base=10000;$timeBonus=max(0,(120-$time)*20);$score=max(100,(int)round($base+$timeBonus+$coins*100-$deaths*150));
$stmt=db()->prepare('INSERT INTO scores(user_id,level_id,score,completion_time,deaths,coins,verified) VALUES(?,?,?,?,?,?,1)');$stmt->execute([$userId,$level,$score,$time,$deaths,$coins]);
json_response(['success'=>true,'score'=>$score]);
