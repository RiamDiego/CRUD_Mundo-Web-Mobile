<?php
// backend/logout.php
session_start();
$_SESSION = [];
session_unset();
session_destroy();

// redireciona para login
header('Location: ../frontend/index.php');
exit;
