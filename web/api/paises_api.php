<?php
// api/paises_api.php
header('Content-Type: application/json; charset=utf-8');

// 1) Se veio sigla, usa ela
if (isset($_GET['sigla']) && $_GET['sigla'] !== '') {
    $sigla = strtoupper(trim($_GET['sigla']));
    // REST Countries aceita ISO3 em /alpha/{code}
    $url = "https://restcountries.com/v3.1/alpha/{$sigla}";
}
// 2) Caso contrário, tenta por name
elseif (isset($_GET['name']) && $_GET['name'] !== '') {
    $name = urlencode($_GET['name']);
    $url = "https://restcountries.com/v3.1/name/{$name}";
}
// 3) Nem sigla nem nome → erro
else {
    http_response_code(400);
    echo json_encode(['error' => 'sigla or name param required']);
    exit;
}

// chamada cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
