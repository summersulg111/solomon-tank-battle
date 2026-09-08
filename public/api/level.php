<?php
require __DIR__.'/../config/database.php';
$level=max(1,min(5,(int)($_GET['level']??1))); $path=__DIR__.'/../../game/levels/level-'.str_pad((string)$level,2,'0',STR_PAD_LEFT).'.json'; if(!is_file($path)){http_response_code(404);exit('Level not found');} header('Content-Type: application/json'); echo file_get_contents($path);
