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
              <button type="button" class="btn btn-sm btn-info btn-edit" data-id="${c.id_cidade}">Editar</button>
              <button type="button" class="btn btn-sm btn-danger btn-delete" data-id="${c.id_cidade}">Excluir</button>
              <button type="button" class="btn btn-sm btn-secondary btn-clima" data-nome="${escapeHtml(c.nome)}">Clima</button>
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
    // Handler do clima — versão robusta (usa closest para capturar cliques em ícone interno)
    } else {
      // procura botão clima a partir do elemento clicado
      const klimBtn = e.target.closest && e.target.closest('.btn-clima');
      if (klimBtn) {
        e.preventDefault();

        // pega nome da cidade
        const nomeCidadeRaw = klimBtn.getAttribute('data-nome') || '';
        const nomeCidade = nomeCidadeRaw.trim();
        if (!nomeCidade) {
          alert('Nome da cidade desconhecido.');
          return;
        }

        const modalBody = document.getElementById('modalClimaBody');

        // abrir modal com feedback
        $('#modalClima').modal('show');
        modalBody.innerHTML = '<div class="text-center py-3">Buscando clima... <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div></div>';

        const url = `../api/clima.php?city=${encodeURIComponent(nomeCidade)}`;

        fetch(url)
          .then(response => {
            // guardamos info do http status para mensagens
            return response.text().then(txt => ({ ok: response.ok, status: response.status, txt }));
          })
          .then(({ ok, status, txt }) => {
            let json;
            try {
              json = JSON.parse(txt);
            } catch (err) {
              console.error('Resposta inválida da API de clima:', txt);
              modalBody.innerHTML = '<div class="alert alert-danger">Resposta inválida da API de clima.</div>';
              return;
            }

            // normaliza cod/erro
            const cod = json.cod !== undefined ? Number(json.cod) : (ok ? 200 : status);
            if (cod !== 200) {
              const msg = json.message || 'Erro ao obter clima';
              modalBody.innerHTML = `<div class="alert alert-warning">${escapeHtml(String(msg))}</div>`;
              return;
            }

            // extrair campos com fallback seguro
            const temp = json.main && json.main.temp !== undefined ? json.main.temp : '—';
            const feels = json.main && json.main.feels_like !== undefined ? json.main.feels_like : '—';
            const humidity = json.main && json.main.humidity !== undefined ? json.main.humidity : '—';
            const desc = json.weather && json.weather[0] && json.weather[0].description ? json.weather[0].description : '';
            const icon = json.weather && json.weather[0] && json.weather[0].icon
              ? `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
              : '';

            modalBody.innerHTML = `
              <div class="d-flex align-items-center">
                ${icon ? `<img src="${icon}" alt="ícone" style="width:64px; height:64px; margin-right:12px;">` : ''}
                <div>
                  <h5 class="mb-1">${escapeHtml(nomeCidade)}</h5>
                  <p class="mb-1"><strong>${escapeHtml(String(temp))}°C</strong> (sensação ${escapeHtml(String(feels))}°C)</p>
                  <p class="mb-1 text-capitalize">${escapeHtml(desc)}</p>
                  <small>Umidade: ${escapeHtml(String(humidity))}%</small>
                </div>
              </div>
            `;
          })
          .catch(err => {
            console.error('Erro ao buscar clima:', err);
            modalBody.innerHTML = '<div class="alert alert-danger">Erro ao obter clima. Tente novamente.</div>';
          });
      }
    }

  });

  // Inicialização
  loadCountryInfo();
  loadCidades();
}
