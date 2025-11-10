// assets/js/cidades.js
// Script separado para a página de cidades.
// Expõe initCidades(idPais) para inicializar comportamento da página.

// --- Util: escape simples para prevenir XSS
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Função principal: inicializa comportamentos da página de cidades
function initCidades(idPais) {
  const countryInfo = document.getElementById('countryInfo');
  const tableBody = document.querySelector('#tableCidades tbody');
  const btnAdd = document.getElementById('btnAddCidade');
  const modal = $('#modalCidade');
  const form = document.getElementById('formCidade');

  if (!idPais || idPais <= 0) {
    countryInfo.innerHTML = '<div class="alert alert-warning">Nenhum país selecionado. <a href="paises.php">Voltar</a></div>';
    btnAdd.disabled = true;
    return;
  }

  // Carregar nome do país
  function loadCountryInfo() {
    fetch(`../backend/paises/get_pais.php?id=${idPais}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          countryInfo.innerHTML = '<div class="alert alert-danger">Erro ao carregar país.</div>';
          return;
        }
        const title = `Cidades de ${escapeHtml(data.nome)}`;
        document.getElementById('pageTitle').textContent = title;
        countryInfo.innerHTML = `<div class="mb-2"><strong>País:</strong> ${escapeHtml(data.nome)} — <small>Continente ID: ${escapeHtml(String(data.id_cont || ''))}</small></div>`;
      })
      .catch(()=> countryInfo.innerHTML = '<div class="alert alert-danger">Erro de rede ao buscar país.</div>');
  }

  // Carregar cidades
  function loadCidades() {
    fetch(`../backend/cidades/listar_cidades.php?id_pais=${idPais}`)
      .then(r => r.json())
      .then(data => {
        tableBody.innerHTML = '';
        data.forEach(c => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${escapeHtml(c.nome)}</td>
            <td>${c.populacao || 0}</td>
            <td>
              <button class="btn btn-sm btn-info btn-edit" data-id="${c.id_cidade}">Editar</button>
              <button class="btn btn-sm btn-danger btn-delete" data-id="${c.id_cidade}">Excluir</button>
              <button class="btn btn-sm btn-secondary btn-clima" data-nome="${escapeHtml(c.nome)}">Clima</button>
            </td>
          `;
          tableBody.appendChild(tr);
        });
      })
      .catch(()=> tableBody.innerHTML = '<tr><td colspan="3">Erro ao carregar cidades.</td></tr>');
  }

  // Abrir modal para adicionar
  btnAdd.addEventListener('click', () => {
    form.reset();
    document.getElementById('id_cidade').value = '';
    document.getElementById('form_id_pais').value = idPais;
    modal.find('.modal-title').text('Adicionar Cidade');
    modal.modal('show');
  });

  // Submissão do formulário (inserir/editar)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(this);
    fd.set('id_pais', idPais);
    const idCidade = fd.get('id_cidade');
    const url = idCidade ? '../backend/cidades/editar_cidade.php' : '../backend/cidades/inserir_cidade.php';

    fetch(url, { method: 'POST', body: fd })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          modal.modal('hide');
          loadCidades();
        } else {
          alert(res.error || 'Erro ao salvar cidade');
        }
      })
      .catch(()=> alert('Erro de rede ao salvar'));
  });

  // Delegation para editar/excluir/clima
  tableBody.addEventListener('click', function (e) {
    if (e.target.matches('.btn-delete')) {
      const id = e.target.dataset.id;
      if (!confirm('Confirma exclusão da cidade?')) return;
      const body = new URLSearchParams({ id_cidade: id });
      fetch('../backend/cidades/excluir_cidade.php', { method: 'POST', body })
        .then(r => r.json())
        .then(res => {
          if (res.success) loadCidades();
          else alert(res.error || 'Erro ao excluir cidade');
        })
        .catch(()=> alert('Erro de rede ao excluir'));
    } else if (e.target.matches('.btn-edit')) {
      const id = e.target.dataset.id;
      fetch(`../backend/cidades/get_cidade.php?id=${id}`)
        .then(r => r.json())
        .then(c => {
          if (c.error) { alert('Cidade não encontrada'); return; }
          document.getElementById('id_cidade').value = c.id_cidade;
          document.getElementById('cidade_nome').value = c.nome;
          document.getElementById('cidade_pop').value = c.populacao;
          document.getElementById('form_id_pais').value = c.id_pais;
          modal.find('.modal-title').text('Editar Cidade');
          modal.modal('show');
        })
        .catch(()=> alert('Erro ao buscar cidade'));
    } else if (e.target.matches('.btn-clima')) {
      const nomeCidade = e.target.getAttribute('data-nome');
      window.open(`../api/clima.php?city=${encodeURIComponent(nomeCidade)}`, '_blank');
    }
  });

  // Inicialização
  loadCountryInfo();
  loadCidades();
}
