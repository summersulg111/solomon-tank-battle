<?php
declare(strict_types=1);
return [
 'env'=>getenv('APP_ENV') ?: 'development',
 'db'=>['host'=>getenv('DB_HOST') ?: '127.0.0.1','name'=>getenv('DB_NAME') ?: 'solomon_devil_level','user'=>getenv('DB_USER') ?: 'root','pass'=>getenv('DB_PASS') ?: '']
];
