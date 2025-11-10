<?php
// backend/paises/inserir_pais.php
require_once '/../conexao.php';
header('Content-Type: application/json; charset=utf-8');

// permitir somente POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo não permitido']);
    exit;
}

// ler campos
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$id_cont = isset($_POST['id_cont']) ? (int)$_POST['id_cont'] : 0;
$populacao = isset($_POST['populacao']) ? (int)$_POST['populacao'] : 0;
$idioma = isset($_POST['idioma']) ? trim($_POST['idioma']) : '';

if ($nome === '' || $id_cont <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatórios faltando']);
    exit;
}

try {
    $stmt = $con->prepare("INSERT INTO paises (nome, id_cont, populacao, idioma) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('siis', $nome, $id_cont, $populacao, $idioma);
    $stmt->execute();
    echo json_encode(['success' => true, 'id_pais' => $stmt->insert_id]);
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao inserir país']);
}
