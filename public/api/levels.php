<?php
require __DIR__.'/../bootstrap.php'; $rows=$pdo->query('SELECT id,name,description,difficulty,order_number FROM levels WHERE is_active=1 ORDER BY order_number')->fetchAll(); json_out(['success'=>true,'levels'=>$rows]);
