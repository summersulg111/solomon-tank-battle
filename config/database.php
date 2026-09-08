<?php
declare(strict_types=1);
$config=require __DIR__.'/config.php';
try { $pdo=new PDO('mysql:host='.$config['db']['host'].';dbname='.$config['db']['name'].';charset=utf8mb4',$config['db']['user'],$config['db']['pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]); } catch(Throwable $e) { http_response_code(500); exit('Database unavailable.'); }
