<?php
declare(strict_types=1); require_once __DIR__.'/../../config/database.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['success'=>false,'message'=>'Method not allowed'],405);
$body=json_decode(file_get_contents('php://input'),true) ?: $_POST;
$username=trim((string)($body['username']??'')); $email=trim((string)($body['email']??'')); $password=(string)($body['password']??'');
if(!preg_match('/^[A-Za-z0-9_]{3,32}$/',$username)) json_response(['success'=>false,'message'=>'Invalid username'],422);
if(!filter_var($email,FILTER_VALIDATE_EMAIL)) json_response(['success'=>false,'message'=>'Invalid email'],422);
if(strlen($password)<8) json_response(['success'=>false,'message'=>'Password must be at least 8 characters'],422);
$stmt=db()->prepare('SELECT id FROM users WHERE username=? OR email=? LIMIT 1'); $stmt->execute([$username,$email]);
if($stmt->fetch()) json_response(['success'=>false,'message'=>'Username or email already exists'],409);
$stmt=db()->prepare('INSERT INTO users(username,email,password_hash) VALUES(?,?,?)'); $stmt->execute([$username,$email,password_hash($password,PASSWORD_DEFAULT)]);
json_response(['success'=>true,'message'=>'Account created']);
