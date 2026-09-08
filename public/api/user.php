<?php
require __DIR__.'/../bootstrap.php'; if(empty($_SESSION['user_id'])) json_out(['success'=>false,'message'=>'Login required.'],401); $s=$pdo->prepare('SELECT id,username,email,role,created_at FROM users WHERE id=?'); $s->execute([$_SESSION['user_id']]); $u=$s->fetch(); json_out(['success'=>true,'user'=>$u]);
