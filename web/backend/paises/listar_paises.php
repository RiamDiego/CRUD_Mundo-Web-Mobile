<?php
// backend/paises/listar_paises.php
require_once '/../conexao.php';
header('Content-Type: application/json; charset=utf-8');

// query para listar países com o nome do continente
$sql = "SELECT p.id_pais, p.nome, p.id_cont, c.nome AS continente, p.populacao, p.idioma
        FROM paises p
        LEFT JOIN continentes c ON p.id_cont = c.id_cont
        ORDER BY p.nome";

try {
    $res = $con->query($sql);
    $rows = [];
    while ($row = $res->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_UNESCAPED_UNICODE);
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao listar países']);
}
