<?php
// backend/cidades/inserir_cidade.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Metodo não permitido']); exit; }

$id_pais = isset($_POST['id_pais']) ? (int)$_POST['id_pais'] : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$pop = isset($_POST['populacao']) ? (int)$_POST['populacao'] : 0;

if ($id_pais <= 0 || $nome === '') { http_response_code(400); echo json_encode(['error'=>'Dados inválidos']); exit; }

// opcional: checar se id_pais existe
$stmtCheck = $con->prepare("SELECT id_pais FROM paises WHERE id_pais = ?");
$stmtCheck->bind_param('i', $id_pais);
$stmtCheck->execute();
if ($stmtCheck->get_result()->num_rows === 0) { http_response_code(400); echo json_encode(['error'=>'País inválido']); exit; }

try {
    $stmt = $con->prepare("INSERT INTO cidades (id_pais, nome, populacao) VALUES (?, ?, ?)");
    $stmt->bind_param('isi', $id_pais, $nome, $pop);
    $stmt->execute();
    echo json_encode(['success' => true, 'id_cidade' => $stmt->insert_id]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500); echo json_encode(['error'=>'Erro ao inserir cidade']);
}
