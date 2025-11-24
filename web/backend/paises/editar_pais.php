<?php
// backend/paises/editar_pais.php
header('Content-Type: application/json; charset=utf-8');
require_once '../conexao.php';

$id_pais = isset($_POST['id_pais']) ? intval($_POST['id_pais']) : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$id_cont = isset($_POST['id_cont']) ? intval($_POST['id_cont']) : 0;
$populacao = (isset($_POST['populacao']) && $_POST['populacao'] !== '') ? intval($_POST['populacao']) : null;
$idioma = isset($_POST['idioma']) ? trim($_POST['idioma']) : null;
$sigla = isset($_POST['sigla']) ? strtoupper(trim($_POST['sigla'])) : null;

$errors = [];
if ($id_pais <= 0) $errors[] = 'ID do país inválido';
if ($nome === '') $errors[] = 'Nome é obrigatório';
if ($id_cont <= 0) $errors[] = 'Continente inválido';
if (!empty($sigla) && !preg_match('/^[A-Z]{3}$/', $sigla)) $errors[] = 'Sigla deve ter 3 letras maiúsculas (ex.: BRA)';

if (!empty($errors)) {
    echo json_encode(['success'=>false,'error'=>implode('; ',$errors)]);
    exit;
}

// Update
$stmt = $con->prepare("UPDATE paises SET nome = ?, id_cont = ?, populacao = ?, idioma = ?, sigla = ? WHERE id_pais = ?");
$stmt->bind_param('siissi', $nome, $id_cont, $populacao, $idioma, $sigla, $id_pais);

if ($stmt->execute()) {
    echo json_encode(['success'=>true]);
} else {
    echo json_encode(['success'=>false,'error'=>$con->error]);
}
$stmt->close();
$con->close();
