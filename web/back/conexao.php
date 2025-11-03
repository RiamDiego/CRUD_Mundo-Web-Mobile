<?php
// Conexão com o banco de dados
$host = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db   = "crud_mundo";

$con = new mysqli($host, $user, $pass, $db);

if ($con->connect_error) {
    die("Erro na conexão: " . $con->connect_error);
}
?>