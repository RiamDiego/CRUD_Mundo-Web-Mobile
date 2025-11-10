<?php
// frontend/paises.php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Países - CRUD Mundo</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">CRUD Mundo - Países</span>
      <div>
        <span class="mr-3">Olá, <?php echo htmlspecialchars($_SESSION['user_name']); ?></span>
        <a href="../backend/logout.php" class="btn btn-sm btn-outline-danger">Sair</a>
      </div>
    </div>
  </nav>

  <main class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h3>Países</h3>
      <button id="btnAddPais" class="btn btn-primary">Adicionar País</button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped" id="tablePaises">
        <thead><tr><th>Nome</th><th>Continente</th><th>População</th><th>Idioma</th><th>Ações</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  </main>

  <!-- Modal adicionar/editar -->
  <div class="modal fade" id="modalPais" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form id="formPais" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">País</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          <input type="hidden" name="id_pais" id="id_pais">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input id="nome" name="nome" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="id_cont">ID do Continente</label>
            <input id="id_cont" name="id_cont" type="number" min="1" class="form-control" required>
            <small class="form-text text-muted">Use o ID do continente (ex.: 1)</small>
          </div>
          <div class="form-group">
            <label for="populacao">População</label>
            <input id="populacao" name="populacao" type="number" min="0" class="form-control">
          </div>
          <div class="form-group">
            <label for="idioma">Idioma</label>
            <input id="idioma" name="idioma" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="submit">Salvar</button>
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Fechar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- scripts -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- JS separado -->
  <script src="../assets/js/paises.js"></script>
  <script>
    // inicializa (garante que a função loadPaises seja chamada)
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof loadPaises === 'function') loadPaises();
    });
  </script>
</body>
</html>
