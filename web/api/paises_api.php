<?php
// api/paises_api.php
// Proxy simples para REST Countries (v3.1) — NÃO coloca chaves aqui (esta API é pública).
header('Content-Type: application/json; charset=utf-8');

if (!isset($_GET['name'])) {
    http_response_code(400);
    echo json_encode(['error'=>'name param required']);
    exit;
}

$name = urlencode($_GET['name']);
$url = "https://restcountries.com/v3.1/name/{$name}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
