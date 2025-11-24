<?php
// backend/cidades/excluir_cidade.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Metodo não permitido']); exit; }

$id = isset($_POST['id_cidade']) ? (int)$_POST['id_cidade'] : 0;
if ($id <= 0) { http_response_code(400); echo json_encode(['error'=>'ID inválido']); exit; }

$del = $con->prepare("DELETE FROM cidades WHERE id_cidades = ?");
$del->bind_param('i', $id);
try {
    $del->execute();
    echo json_encode(['success' => true]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500); echo json_encode(['error'=>'Erro ao excluir cidade']);
}
