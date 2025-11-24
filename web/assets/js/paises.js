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
          <td>${escapeHtml(p.nome || '')}</td>
          <td>${escapeHtml(p.sigla || '')}</td>
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

// --- popula select de continentes (chamar no carregamento da página)
function loadContinentes() {
  const sel = document.getElementById('id_cont');
  if (!sel) return Promise.resolve();

  // evita repopular se já tiver opções além da placeholder
  if (sel.options.length > 1) return Promise.resolve();

  return fetch('../backend/continentes/listar_continentes.php')
    .then(r => r.json())
    .then(data => {
      // limpa exceto a primeira option (placeholder)
      sel.innerHTML = '<option value="">-- Selecionar continente --</option>';
      data.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id_cont;
        opt.textContent = c.nome;
        sel.appendChild(opt);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar continentes:', err);
      // mantém apenas placeholder - o usuário pode digitar manualmente se quiser (mas select é required)
    });
}

// Abrir modal para adicionar país
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'btnAddPais') {
    document.getElementById('formPais').reset();
    document.getElementById('id_pais').value = '';
    // carregar continentes antes de mostrar o modal
    loadContinentes().then(() => {
      // opcional: garantir que placeholder esteja selecionado
      const sel = document.getElementById('id_cont');
      if (sel) sel.value = '';
      $('#modalPais').modal('show');
    });
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
        // depois de obter 'p' do get_pais.php:
        document.getElementById('id_pais').value = p.id_pais;
        document.getElementById('nome').value = p.nome;
        document.getElementById('sigla').value = p.sigla;
        // após popular continentes, selecionar:
        loadContinentes().then(() => {
          const sel = document.getElementById('id_cont');
          if (sel) sel.value = (p.id_cont !== undefined && p.id_cont !== null) ? String(p.id_cont) : '';
        });
        document.getElementById('populacao').value = p.populacao;
        document.getElementById('idioma').value = p.idioma;
        // abrir modal
        $('#modalPais').modal('show');
      })
      .catch(()=> alert('Erro ao buscar país'));
  }
});

// Handler para buscar dados oficiais via proxy api/paises_api.php (prioriza sigla ISO-3)
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'btnOfficialData') {
    const nome = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
    const sigla = document.getElementById('sigla') ? document.getElementById('sigla').value.trim().toUpperCase() : '';
    const target = document.getElementById('officialData');

    if (!nome && !sigla) {
      target.innerHTML = '<small class="text-danger">Preencha o nome ou a sigla (ISO-3) do país antes.</small>';
      return;
    }

    target.innerHTML = 'Buscando dados oficiais...';

    const url = sigla ? `../api/paises_api.php?iso=${encodeURIComponent(sigla)}` : `../api/paises_api.php?name=${encodeURIComponent(nome)}`;

    fetch(url)
      .then(r => r.text())
      .then(txt => {
        try {
          const data = JSON.parse(txt);
          const c = Array.isArray(data) ? data[0] : data;
          if (!c) {
            target.innerHTML = '<small>Não encontrado.</small>';
            return;
          }

          const flagUrl = (c.flags && (c.flags.svg || c.flags.png)) ? (c.flags.svg || c.flags.png) : null;
          const flag = flagUrl ? `<img src="${flagUrl}" alt="bandeira" style="height:36px; margin-right:8px;">` : '';
          const capital = (c.capital && c.capital[0]) ? c.capital[0] : '—';
          let currencies = '—';
          if (c.currencies && typeof c.currencies === 'object') {
            currencies = Object.keys(c.currencies).map(code => {
              const cur = c.currencies[code];
              return code + (cur && cur.name ? ` (${cur.name})` : '');
            }).join(', ');
          }
          const region = c.region || '';
          const subregion = c.subregion || '';

          target.innerHTML = `
            <div class="d-flex align-items-center">
              ${flag}
              <div>
                <div><strong>Capital:</strong> ${escapeHtml(capital)}</div>
                <div><strong>Moeda(s):</strong> ${escapeHtml(currencies)}</div>
                <div><strong>Região:</strong> ${escapeHtml(region)} ${subregion ? '/ ' + escapeHtml(subregion) : ''}</div>
              </div>
            </div>
          `;
        } catch (err) {
          console.error('Erro ao parsear resposta REST Countries:', txt, err);
          target.innerHTML = '<small class="text-danger">Erro ao consultar API externa.</small>';
        }
      })
      .catch(err => {
        console.error('Erro fetch api/paises_api.php:', err);
        target.innerHTML = '<small class="text-danger">Erro ao consultar API externa.</small>';
      });
  }
});

// Garantir que o handler do botão Dados oficiais esteja ligado diretamente
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btnOfficialData');
  const target = document.getElementById('officialData');
  if (!btn) {
    console.warn('btnOfficialData não encontrado no DOM');
    return;
  }

  btn.addEventListener('click', function (ev) {
    ev.preventDefault();
    console.log('btnOfficialData clicado (direct listener)');

    const nomeInput = document.getElementById('nome');
    const nome = nomeInput ? nomeInput.value.trim() : '';
    if (!nome) {
      target.innerHTML = '<small class="text-danger">Preencha o nome do país antes.</small>';
      return;
    }
    target.innerHTML = 'Buscando dados oficiais...';

    const sigla = document.getElementById('sigla').value.trim();
    let url = '../api/paises_api.php?';

    if (sigla) {
        url += 'sigla=' + encodeURIComponent(sigla);
    } else {
        url += 'name=' + encodeURIComponent(nome);
    }

    fetch(url)
      .then(r => r.text())
      .then(txt => {
        try {
          const arr = JSON.parse(txt);
          if (!Array.isArray(arr) || arr.length === 0) {
            target.innerHTML = '<small>Não encontrado.</small>';
            return;
          }
          const c = arr[0];
          const flagUrl = (c.flags && (c.flags.svg || c.flags.png)) ? (c.flags.svg || c.flags.png) : null;
          const flag = flagUrl ? `<img src="${flagUrl}" alt="bandeira" style="height:36px; margin-right:8px;">` : '';
          const capital = (c.capital && c.capital[0]) ? c.capital[0] : '—';
          let currencies = '—';
          if (c.currencies && typeof c.currencies === 'object') {
            currencies = Object.keys(c.currencies).map(code => {
              const cur = c.currencies[code];
              return code + (cur && cur.name ? ` (${cur.name})` : '');
            }).join(', ');
          }
          const region = c.region || '';
          const subregion = c.subregion || '';

          target.innerHTML = `
            <div class="d-flex align-items-center">
              ${flag}
              <div>
                <div><strong>Capital:</strong> ${escapeHtml(capital)}</div>
                <div><strong>Moeda(s):</strong> ${escapeHtml(currencies)}</div>
                <div><strong>Região:</strong> ${escapeHtml(region)} ${subregion ? '/ ' + escapeHtml(subregion) : ''}</div>
              </div>
            </div>
          `;
        } catch (err) {
          console.error('Erro ao parsear resposta REST Countries:', txt, err);
          target.innerHTML = '<small class="text-danger">Erro ao consultar API externa.</small>';
        }
      })
      .catch(err => {
        console.error('Erro fetch api/paises_api.php:', err);
        target.innerHTML = '<small class="text-danger">Erro ao consultar API externa.</small>';
      });
  });
});



