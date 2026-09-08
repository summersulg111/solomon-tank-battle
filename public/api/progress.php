<?php
require __DIR__.'/../bootstrap.php'; if(empty($_SESSION['user_id'])) json_out(['success'=>false],401); $s=$pdo->prepare('SELECT p.*,l.name FROM player_progress p JOIN levels l ON l.id=p.level_id WHERE p.user_id=? ORDER BY l.order_number'); $s->execute([$_SESSION['user_id']]); json_out(['success'=>true,'progress'=>$s->fetchAll()]);
