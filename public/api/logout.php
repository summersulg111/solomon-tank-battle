<?php
require __DIR__.'/../bootstrap.php'; session_unset(); session_destroy(); json_out(['success'=>true]);
