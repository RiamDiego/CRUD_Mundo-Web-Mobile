<?php
// backend/paises/excluir_pais.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Metodo não permitido']); exit;
}

$id = isset($_POST['id_pais']) ? (int)$_POST['id_pais'] : 0;
if ($id <= 0) { http_response_code(400); echo json_encode(['error'=>'ID inválido']); exit; }

// checar se tem cidades vinculadas
$stmt = $con->prepare("SELECT COUNT(*) AS cnt FROM cidades WHERE id_pais = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();
if ($res['cnt'] > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Não é possível excluir: existem cidades vinculadas.']);
    exit;
}

// realizar exclusão
$del = $con->prepare("DELETE FROM paises WHERE id_pais = ?");
$del->bind_param('i', $id);
try {
    $del->execute();
    echo json_encode(['success' => true]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500); echo json_encode(['error'=>'Erro ao excluir país']);
}
