// assets/js/main.js

// Função para carregar países e preencher tabela
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
    });
}

// escape simples para prevenir XSS ao inserir texto no DOM
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// abrir modal para adicionar país
document.getElementById('btnAddPais').addEventListener('click', () => {
  document.getElementById('formPais').reset();
  document.getElementById('id_pais').value = '';
  $('#modalPais').modal('show');
});

// submissão do formulário (inserir/editar)
document.getElementById('formPais').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = new FormData(this);
  const id = form.get('id_pais');
  const url = id ? '../backend/paises/editar_pais.php' : '../backend/paises/inserir_pais.php';
  fetch(url, { method: 'POST', body: form })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        $('#modalPais').modal('hide');
        loadPaises();
      } else {
        alert(res.error || 'Erro ao salvar');
      }
    }).catch(()=> alert('Erro de rede'));
});

// delegation para editar/excluir na tabela
document.querySelector('#tablePaises tbody').addEventListener('click', function(e) {
  if (e.target.matches('.btn-delete')) {
    const id = e.target.dataset.id;
    if (!confirm('Confirma exclusão?')) return;
    const body = new URLSearchParams({ id_pais: id });
    fetch('../backend/paises/excluir_pais.php', { method: 'POST', body })
      .then(r => r.json())
      .then(res => {
        if (res.success) loadPaises();
        else alert(res.error || 'Erro ao excluir');
      }).catch(()=> alert('Erro de rede'));
  } else if (e.target.matches('.btn-edit')) {
    const id = e.target.dataset.id;
    // buscar país e preencher modal
    fetch(`../backend/paises/get_pais.php?id=${id}`)
      .then(r => r.json())
      .then(p => {
        document.getElementById('id_pais').value = p.id_pais;
        document.getElementById('nome').value = p.nome;
        document.getElementById('id_cont').value = p.id_cont;
        document.getElementById('populacao').value = p.populacao;
        document.getElementById('idioma').value = p.idioma;
        $('#modalPais').modal('show');
      });
  }
});
