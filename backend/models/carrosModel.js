const pool = require('../config/db');

const CarroModel = {
  async listar({ pagina = 1, limite = 6 }) {
    const offset = (pagina - 1) * limite;
    const [carros] = await pool.execute(
      'SELECT * FROM carros ORDER BY criado_em DESC LIMIT ? OFFSET ?',
      [limite, offset]
    );
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM carros');
    return { carros, total: Number(total), pagina, limite };
  },

  async buscarPorId(id) {
    const [rows] = await pool.execute('SELECT * FROM carros WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async criar({ modelo, marca, ano, preco, quilometragem, descricao, imagem }) {
    const [result] = await pool.execute(
      'INSERT INTO carros (modelo, marca, ano, preco, quilometragem, descricao, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [modelo, marca, Number(ano), Number(preco), Number(quilometragem), descricao || null, imagem || null]
    );
    return result.insertId;
  },

  async atualizar(id, { modelo, marca, ano, preco, quilometragem, descricao, imagem }) {
    const [result] = await pool.execute(
      'UPDATE carros SET modelo=?, marca=?, ano=?, preco=?, quilometragem=?, descricao=?, imagem=? WHERE id=?',
      [modelo, marca, Number(ano), Number(preco), Number(quilometragem), descricao || null, imagem, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await pool.execute('DELETE FROM carros WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = CarroModel;
