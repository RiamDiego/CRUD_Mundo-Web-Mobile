<?php
// backend/cidades/editar_cidade.php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Metodo não permitido']); exit; }

$id = isset($_POST['id_cidade']) ? (int)$_POST['id_cidade'] : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$pop = isset($_POST['populacao']) ? (int)$_POST['populacao'] : 0;
$id_pais = isset($_POST['id_pais']) ? (int)$_POST['id_pais'] : 0;

if ($id <= 0 || $nome === '' || $id_pais <= 0) { http_response_code(400); echo json_encode(['error'=>'Dados inválidos']); exit; }

try {
    $stmt = $con->prepare("UPDATE cidades SET nome = ?, populacao = ?, id_pais = ? WHERE id_cidades = ?");
    $stmt->bind_param('siii', $nome, $pop, $id_pais, $id);
    $stmt->execute();
    echo json_encode(['success' => true, 'affected' => $stmt->affected_rows]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500); echo json_encode(['error'=>'Erro ao atualizar cidade']);
}
