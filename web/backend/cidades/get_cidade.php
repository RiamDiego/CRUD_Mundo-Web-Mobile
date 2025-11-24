<?php
// backend/cidades/get_cidade.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) { http_response_code(400); echo json_encode(['error'=>'ID inválido']); exit; }

$stmt = $con->prepare("SELECT id_cidades AS id_cidade, nome, populacao, id_pais FROM cidades WHERE id_cidades = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();
if ($res && $res->num_rows === 1) echo json_encode($res->fetch_assoc(), JSON_UNESCAPED_UNICODE);
else { http_response_code(404); echo json_encode(['error'=>'Cidade não encontrada']); }
