const CarroModel = require('../models/carrosModel');
const fs         = require('fs');
const path       = require('path');

function deletarArquivo(filename) {
  if (!filename) return;
  const filePath = path.join(__dirname, '../uploads', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

const CarrosController = {
  async listar(req, res) {
    const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
    const limite = Math.min(50, Math.max(1, parseInt(req.query.limite) || 6));
    const dados  = await CarroModel.listar({ pagina, limite });
    res.json(dados);
  },

  async buscarPorId(req, res) {
    const carro = await CarroModel.buscarPorId(req.params.id);
    if (!carro) return res.status(404).json({ erro: 'Carro não encontrado' });
    res.json(carro);
  },

  async criar(req, res) {
    const { modelo, marca, ano, preco, quilometragem, descricao } = req.body;
    if (!modelo || !marca || !ano || !preco || quilometragem === undefined) {
      if (req.file) deletarArquivo(req.file.filename);
      return res.status(400).json({ erro: 'Campos obrigatórios: modelo, marca, ano, preco, quilometragem' });
    }
    const imagem = req.file ? req.file.filename : null;
    const id     = await CarroModel.criar({ modelo, marca, ano, preco, quilometragem, descricao, imagem });
    const carro  = await CarroModel.buscarPorId(id);
    res.status(201).json(carro);
  },

  async atualizar(req, res) {
    const { modelo, marca, ano, preco, quilometragem, descricao } = req.body;
    if (!modelo || !marca || !ano || !preco || quilometragem === undefined) {
      if (req.file) deletarArquivo(req.file.filename);
      return res.status(400).json({ erro: 'Campos obrigatórios: modelo, marca, ano, preco, quilometragem' });
    }

    const carroAtual = await CarroModel.buscarPorId(req.params.id);
    if (!carroAtual) {
      if (req.file) deletarArquivo(req.file.filename);
      return res.status(404).json({ erro: 'Carro não encontrado' });
    }

    // Se enviou nova imagem, apaga a antiga
    let imagem = carroAtual.imagem;
    if (req.file) {
      deletarArquivo(carroAtual.imagem);
      imagem = req.file.filename;
    }

    await CarroModel.atualizar(req.params.id, { modelo, marca, ano, preco, quilometragem, descricao, imagem });
    const carro = await CarroModel.buscarPorId(req.params.id);
    res.json(carro);
  },

  async deletar(req, res) {
    const carro = await CarroModel.buscarPorId(req.params.id);
    if (!carro) return res.status(404).json({ erro: 'Carro não encontrado' });
    deletarArquivo(carro.imagem);
    await CarroModel.deletar(req.params.id);
    res.json({ mensagem: 'Carro removido com sucesso' });
  }
};

module.exports = CarrosController;
