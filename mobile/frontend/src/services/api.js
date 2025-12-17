// src/services/api.js
// Aqui ficará a configuração do axios/fetch
// quando o backend estiver pronto
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:3000'
  // ex: http://192.168.0.10:3000
});

export default api;
