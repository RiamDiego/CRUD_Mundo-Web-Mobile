<?php
// backend/continentes/listar_continentes.php
header('Content-Type: application/json; charset=utf-8');
require_once '../conexao.php';

$sql = "SELECT id_cont, nome FROM continentes ORDER BY nome";
$res = $con->query($sql);
$out = [];
while ($row = $res->fetch_assoc()) {
    $out[] = $row;
}
echo json_encode($out, JSON_UNESCAPED_UNICODE);
$con->close();
