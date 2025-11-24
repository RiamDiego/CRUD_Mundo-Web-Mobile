<?php
// backend/paises/inserir_pais.php
header('Content-Type: application/json; charset=utf-8');
require_once '../conexao.php';

// Pegar dados do POST
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$id_cont = isset($_POST['id_cont']) ? intval($_POST['id_cont']) : 0;
$populacao = (isset($_POST['populacao']) && $_POST['populacao'] !== '') ? intval($_POST['populacao']) : null;
$idioma = isset($_POST['idioma']) ? trim($_POST['idioma']) : null;
$sigla = isset($_POST['sigla']) ? strtoupper(trim($_POST['sigla'])) : null; // ISO-3

// Validações
$errors = [];
if ($nome === '') $errors[] = 'Nome é obrigatório';
if ($id_cont <= 0) $errors[] = 'Continente inválido';
if (!empty($sigla) && !preg_match('/^[A-Z]{3}$/', $sigla)) $errors[] = 'Sigla deve ter 3 letras maiúsculas (ex.: BRA)';

if (!empty($errors)) {
    echo json_encode(['success'=>false,'error'=>implode('; ',$errors)]);
    exit;
}

// Inserção com prepared statement (evita SQL injection)
$stmt = $con->prepare("INSERT INTO paises (nome, id_cont, populacao, idioma, sigla) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('siiss', $nome, $id_cont, $populacao, $idioma, $sigla);

if ($stmt->execute()) {
    echo json_encode(['success'=>true,'id_pais'=>$stmt->insert_id]);
} else {
    echo json_encode(['success'=>false,'error'=>$con->error]);
}
$stmt->close();
$con->close();

