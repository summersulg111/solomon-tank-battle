<?php
declare(strict_types=1); require_once __DIR__.'/../../config/database.php';
$rows=db()->query('SELECT id,name,description,difficulty,order_number FROM levels WHERE is_active=1 ORDER BY order_number')->fetchAll();
json_response(['success'=>true,'levels'=>$rows]);
