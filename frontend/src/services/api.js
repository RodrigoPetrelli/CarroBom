import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const listarCarros = (pagina = 1, limite = 6) =>
  api.get(`/carros?pagina=${pagina}&limite=${limite}`).then(r => r.data);

export const buscarCarro = (id) =>
  api.get(`/carros/${id}`).then(r => r.data);

export const criarCarro = (dados) =>
  api.post('/carros', dados, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);

export const atualizarCarro = (id, dados) =>
  api.put(`/carros/${id}`, dados, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);

export const deletarCarro = (id) =>
  api.delete(`/carros/${id}`).then(r => r.data);

export const imagemUrl = (filename) =>
  filename ? `/uploads/${filename}` : null;
