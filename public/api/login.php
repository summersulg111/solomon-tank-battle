<?php
require __DIR__.'/../bootstrap.php';
if($_SERVER['REQUEST_METHOD']!=='POST') json_out(['success'=>false],405); $in=json_decode(file_get_contents('php://input'),true) ?: $_POST; $login=trim((string)($in['username']??$in['email']??'')); $password=(string)($in['password']??'');
$stmt=$pdo->prepare('SELECT * FROM users WHERE username=? OR email=? LIMIT 1'); $stmt->execute([$login,$login]); $u=$stmt->fetch(); if(!$u||!password_verify($password,$u['password_hash'])) json_out(['success'=>false,'message'=>'Invalid credentials.'],401); session_regenerate_id(true); $_SESSION['user_id']=(int)$u['id']; json_out(['success'=>true,'user'=>['id'=>(int)$u['id'],'username'=>$u['username'],'role'=>$u['role']]]);
