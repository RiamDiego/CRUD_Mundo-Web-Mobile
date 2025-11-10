// assets/js/paises.js
// Script responsável por listar, inserir, editar e excluir países.
// Usa fetch() para falar com os endpoints do backend (backend/paises/*).

// --- Util: escape simples para prevenir XSS quando injetar texto no DOM
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Carrega a lista de países e popula a tabela
function loadPaises() {
  fetch('../backend/paises/listar_paises.php')
    .then(r => r.json())
    .then(data => {
      const tbody = document.querySelector('#tablePaises tbody');
      tbody.innerHTML = '';
      data.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${escapeHtml(p.nome)}</td>
          <td>${escapeHtml(p.continente || '')}</td>
          <td>${p.populacao || 0}</td>
          <td>${escapeHtml(p.idioma || '')}</td>
          <td>
            <button class="btn btn-sm btn-info btn-edit" data-id="${p.id_pais}">Editar</button>
            <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id_pais}">Excluir</button>
            <a class="btn btn-sm btn-secondary" href="cidades.php?id_pais=${p.id_pais}">Cidades</a>
          </td>`;
        tbody.appendChild(tr);
      });
    })
    .catch(()=> {
      const tbody = document.querySelector('#tablePaises tbody');
      tbody.innerHTML = '<tr><td colspan="5">Erro ao carregar países.</td></tr>';
    });
}

// Abrir modal para adicionar país
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'btnAddPais') {
    document.getElementById('formPais').reset();
    document.getElementById('id_pais').value = '';
    $('#modalPais').modal('show');
  }
});

// Submissão do formulário (inserir/editar)
document.addEventListener('submit', function(e) {
  if (e.target && e.target.id === 'formPais') {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const id = fd.get('id_pais');
    const url = id ? '../backend/paises/editar_pais.php' : '../backend/paises/inserir_pais.php';

    fetch(url, { method: 'POST', body: fd })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          $('#modalPais').modal('hide');
          loadPaises();
        } else {
          alert(res.error || 'Erro ao salvar país');
        }
      })
      .catch(()=> alert('Erro de rede ao salvar país'));
  }
});

// Delegation para editar/excluir na tabela de países
document.addEventListener('click', function(e) {
  // Excluir
  if (e.target && e.target.matches('.btn-delete')) {
    const id = e.target.dataset.id;
    if (!confirm('Confirma exclusão do país?')) return;
    const body = new URLSearchParams({ id_pais: id });
    fetch('../backend/paises/excluir_pais.php', { method: 'POST', body })
      .then(r => r.json())
      .then(res => {
        if (res.success) loadPaises();
        else alert(res.error || 'Erro ao excluir país');
      })
      .catch(()=> alert('Erro de rede ao excluir país'));
  }

  // Editar
  if (e.target && e.target.matches('.btn-edit')) {
    const id = e.target.dataset.id;
    fetch(`../backend/paises/get_pais.php?id=${id}`)
      .then(r => r.json())
      .then(p => {
        if (p.error) { alert('País não encontrado'); return; }
        document.getElementById('id_pais').value = p.id_pais;
        document.getElementById('nome').value = p.nome;
        document.getElementById('id_cont').value = p.id_cont;
        document.getElementById('populacao').value = p.populacao;
        document.getElementById('idioma').value = p.idioma;
        $('#modalPais').modal('show');
      })
      .catch(()=> alert('Erro ao buscar país'));
  }
});
