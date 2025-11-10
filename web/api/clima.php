<?php
// api/clima.php
// Proxy para OpenWeatherMap (retorna JSON direto ao cliente).
// -----------------------------------------------------------
// ATENÇÃO: esta versão inclui a chave da API diretamente no arquivo
// conforme solicitado. Em produção, prefira usar variáveis de ambiente
// ou um arquivo de configuração que não seja versionado (.gitignore).
// -----------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// -------- CONFIGURAÇÃO --------
// Chave da API (fornecida por você)
$OPENWEATHER_KEY = '029052dcc870e03ac050ef90dde27528';

// Tempo de cache em segundos (ajuste conforme necessário)
$CACHE_TTL = 300; // 5 minutos

// Pasta de cache relativa a este script
$cacheDir = __DIR__ . '/cache';

// Criar pasta de cache se não existir (garanta permissões de escrita)
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}

// -------- PARSING DOS PARÂMETROS --------
// Aceita ?city=Nome ou ?lat=...&lon=...
$city = isset($_GET['city']) ? trim($_GET['city']) : '';
$lat  = isset($_GET['lat'])  ? trim($_GET['lat'])  : '';
$lon  = isset($_GET['lon'])  ? trim($_GET['lon'])  : '';

if ($lat !== '' && $lon !== '') {
    // Usar coordendas (preferência)
    $queryType = 'coord';
    $queryKey = "lat={$lat}&lon={$lon}";
} elseif ($city !== '') {
    // Usar nome da cidade
    $queryType = 'city';
    $queryKey = 'q=' . urlencode($city);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetro requerido: city ou lat+lon']);
    exit;
}

// Montar URL da OpenWeather (units=metric, idioma pt_br)
$baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
$url = "{$baseUrl}?{$queryKey}&appid={$OPENWEATHER_KEY}&units=metric&lang=pt_br";

// -------- CACHE SIMPLES EM ARQUIVOS --------
// Nome do arquivo de cache (hash para evitar caracteres estranhos)
$cacheFile = $cacheDir . '/ow_' . md5($url) . '.json';
if (file_exists($cacheFile)) {
    $age = time() - filemtime($cacheFile);
    if ($age <= $CACHE_TTL) {
        // Retorna cache diretamente e encerra
        http_response_code(200);
        // Servir conteúdo em cache (assume JSON válido)
        readfile($cacheFile);
        exit;
    }
}

// -------- CHAMADA C/O cURL --------
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);        // Timeout total
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); // Timeout de conexão
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Seguir redirecionamentos (se houver)

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($response === false || $curlErr) {
    // Erro de rede/cURL
    http_response_code(502);
    echo json_encode(['error' => 'Erro ao conectar OpenWeather', 'detail' => $curlErr]);
    exit;
}

// Tenta decodificar para garantir que é JSON válido
$json = json_decode($response, true);
if ($json === null && json_last_error() !== JSON_ERROR_NONE) {
    // resposta inválida
    http_response_code(502);
    echo json_encode(['error' => 'Resposta inválida da OpenWeather', 'raw' => substr($response, 0, 500)]);
    exit;
}

// Se chegou aqui: sucesso (ou erro retornado pela OpenWeather com JSON)
// Armazenar em cache apenas se for sucesso (codigo 200)
if ($httpCode === 200) {
    // grava cache (silencioso se falhar)
    @file_put_contents($cacheFile, $response);
}

// Repassar o código HTTP e o corpo retornado pela OpenWeather
http_response_code($httpCode);
echo $response;
exit;
