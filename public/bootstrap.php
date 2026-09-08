<?php
session_start();
require __DIR__.'/../config/database.php';
header('Content-Type: application/json');
function json_out(array $data,int $code=200): never { http_response_code($code); echo json_encode($data); exit; }
