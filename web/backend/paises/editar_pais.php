<?php
// backend/paises/editar_pais.php
require_once '/../conexao.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error'=>'Metodo não permitido']); exit;
}

$id_pais = isset($_POST['id_pais']) ? (int)$_POST['id_pais'] : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$id_cont = isset($_POST['id_cont']) ? (int)$_POST['id_cont'] : 0;
$populacao = isset($_POST['populacao']) ? (int)$_POST['populacao'] : 0;
$idioma = isset($_POST['idioma']) ? trim($_POST['idioma']) : '';

if ($id_pais <= 0 || $nome === '' || $id_cont <= 0) {
    http_response_code(400); echo json_encode(['error'=>'Dados inválidos']); exit;
}

try {
    $stmt = $con->prepare("UPDATE paises SET nome = ?, id_cont = ?, populacao = ?, idioma = ? WHERE id_pais = ?");
    $stmt->bind_param('siisi', $nome, $id_cont, $populacao, $idioma, $id_pais);
    $stmt->execute();
    echo json_encode(['success' => true, 'affected' => $stmt->affected_rows]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500); echo json_encode(['error'=>'Erro ao atualizar país']);
}
