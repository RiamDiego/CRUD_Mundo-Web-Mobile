<?php
// frontend/cidades.php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$id_pais = isset($_GET['id_pais']) ? (int)$_GET['id_pais'] : 0;
?>
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Cidades - CRUD Mundo</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">CRUD Mundo - Cidades</span>
      <div>
        <span class="mr-3">Olá, <?php echo htmlspecialchars($_SESSION['user_name']); ?></span>
        <a href="../frontend/paises.php" class="btn btn-sm btn-outline-secondary mr-2">Voltar aos Países</a>
        <a href="../backend/logout.php" class="btn btn-sm btn-outline-danger">Sair</a>
      </div>
    </div>
  </nav>

  <main class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 id="pageTitle">Cidades</h3>
      <div>
        <button id="btnAddCidade" class="btn btn-primary">Adicionar Cidade</button>
      </div>
    </div>

    <div id="countryInfo" class="mb-3"></div>

    <div class="table-responsive">
      <table class="table table-striped" id="tableCidades">
        <thead>
          <tr><th>Nome</th><th>População</th><th>Ações</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </main>

  <!-- Modal adicionar/editar cidade -->
  <div class="modal fade" id="modalCidade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form id="formCidade" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cidade</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <input type="hidden" name="id_cidade" id="id_cidade">
          <input type="hidden" name="id_pais" id="form_id_pais" value="<?php echo $id_pais; ?>">
          <div class="form-group">
            <label for="cidade_nome">Nome da cidade</label>
            <input id="cidade_nome" name="nome" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="cidade_pop">População</label>
            <input id="cidade_pop" name="populacao" type="number" min="0" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="submit">Salvar</button>
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Fechar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal Clima -->
  <div class="modal fade" id="modalClima" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Clima</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body" id="modalClimaBody">
          Carregando...
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>


  <!-- scripts -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- JS separado -->
  <script src="../assets/js/cidades.js"></script>
  <script>
    // Inicializa as funções do JS externo após o carregamento do DOM
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof initCidades === 'function') initCidades(<?php echo json_encode($id_pais, JSON_NUMERIC_CHECK); ?>);
    });
  </script>
</body>
</html>
