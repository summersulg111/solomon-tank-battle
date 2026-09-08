<?php
require __DIR__.'/../bootstrap.php';
if($_SERVER['REQUEST_METHOD']!=='POST') json_out(['success'=>false],405);
$in=json_decode(file_get_contents('php://input'),true) ?: $_POST;
$username=trim((string)($in['username']??'')); $email=trim((string)($in['email']??'')); $password=(string)($in['password']??'');
if(!preg_match('/^[A-Za-z0-9_]{3,32}$/',$username)||!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($password)<8) json_out(['success'=>false,'message'=>'Use a valid username, email and password of at least 8 characters.'],422);
$stmt=$pdo->prepare('SELECT id FROM users WHERE username=? OR email=?'); $stmt->execute([$username,$email]); if($stmt->fetch()) json_out(['success'=>false,'message'=>'Username or email already exists.'],409);
$stmt=$pdo->prepare('INSERT INTO users(username,email,password_hash) VALUES(?,?,?)'); $stmt->execute([$username,$email,password_hash($password,PASSWORD_DEFAULT)]); $uid=(int)$pdo->lastInsertId();
$pdo->prepare('INSERT INTO player_progress(user_id,level_id,unlocked) VALUES(?,?,1)')->execute([$uid,1]); session_regenerate_id(true); $_SESSION['user_id']=$uid; json_out(['success'=>true,'user'=>['id'=>$uid,'username'=>$username]]);
