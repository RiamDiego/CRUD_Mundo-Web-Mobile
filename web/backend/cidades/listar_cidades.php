<?php
// backend/cidades/listar_cidades.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

$id_pais = isset($_GET['id_pais']) ? (int)$_GET['id_pais'] : 0;

if ($id_pais > 0) {
    $stmt = $con->prepare("SELECT id_cidades AS id_cidade, nome, populacao, id_pais FROM cidades WHERE id_pais = ? ORDER BY nome");
    $stmt->bind_param('i', $id_pais);
    $stmt->execute();
    $res = $stmt->get_result();
} else {
    $res = $con->query("SELECT id_cidades AS id_cidade, nome, populacao, id_pais FROM cidades ORDER BY nome");
}

$rows = [];
while ($row = $res->fetch_assoc()) $rows[] = $row;
echo json_encode($rows, JSON_UNESCAPED_UNICODE);
