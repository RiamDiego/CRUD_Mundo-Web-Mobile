<?php
// backend/paises/get_pais.php
header('Content-Type: application/json; charset=utf-8');
require_once '../conexao.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error'=>'id inválido']);
    exit;
}

$stmt = $con->prepare("SELECT id_pais, nome, id_cont, populacao, idioma, sigla FROM paises WHERE id_pais = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
if ($row) {
    echo json_encode($row, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404);
    echo json_encode(['error'=>'País não encontrado']);
}
$stmt->close();
$con->close();
