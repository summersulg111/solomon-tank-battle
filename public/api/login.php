<?php
declare(strict_types=1); require_once __DIR__.'/../../config/database.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['success'=>false,'message'=>'Method not allowed'],405);
$body=json_decode(file_get_contents('php://input'),true) ?: $_POST; $login=trim((string)($body['username']??$body['email']??'')); $password=(string)($body['password']??'');
$stmt=db()->prepare('SELECT id,username,password_hash,role FROM users WHERE username=? OR email=? LIMIT 1'); $stmt->execute([$login,$login]); $user=$stmt->fetch();
if(!$user || !password_verify($password,$user['password_hash'])) json_response(['success'=>false,'message'=>'Invalid credentials'],401);
session_regenerate_id(true); $_SESSION['user_id']=(int)$user['id']; $_SESSION['role']=$user['role'];
json_response(['success'=>true,'user'=>['id'=>(int)$user['id'],'username'=>$user['username'],'role'=>$user['role']]]);
