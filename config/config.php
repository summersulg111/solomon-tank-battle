<?php
declare(strict_types=1);

session_set_cookie_params([
    'httponly' => true,
    'secure' => isset($_SERVER['HTTPS']),
    'samesite' => 'Lax',
]);
session_start();

const APP_NAME = 'SOLOMON: DEVIL LEVEL';
const LEVEL_DIR = __DIR__ . '/../game/levels/';

function json_response(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function require_auth(): int {
    if (empty($_SESSION['user_id'])) json_response(['success'=>false,'message'=>'Authentication required'], 401);
    return (int) $_SESSION['user_id'];
}
