import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarCarros, deletarCarro, imagemUrl } from '../services/api';
import Toast from '../components/Toast';
import './ListPage.css';

const LIMITE = 6;

export default function ListPage() {
  const [carros,     setCarros]     = useState([]);
  const [total,      setTotal]      = useState(0);
  const [pagina,     setPagina]     = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [toast,      setToast]      = useState(null);

  useEffect(() => { carregar(); }, [pagina]);

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await listarCarros(pagina, LIMITE);
      setCarros(dados.carros);
      setTotal(dados.total);
    } catch {
      setToast({ mensagem: 'Erro ao carregar os carros. Verifique a conexão com o servidor.', tipo: 'erro' });
    } finally {
      setCarregando(false);
    }
  }

  async function handleDeletar(id) {
    if (!window.confirm('Deseja remover este carro?')) return;
    try {
      await deletarCarro(id);
      setToast({ mensagem: 'Carro removido com sucesso!', tipo: 'sucesso' });
      carregar();
    } catch {
      setToast({ mensagem: 'Erro ao remover o carro. Tente novamente.', tipo: 'erro' });
    }
  }

  const totalPaginas = Math.ceil(total / LIMITE);

  return (
    <div className="list-page">
      {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />}

      <h1>Carros Disponíveis <span className="total-badge">{total}</span></h1>

      {carregando ? (
        <p className="status">Carregando...</p>
      ) : carros.length === 0 ? (
        <p className="status">Nenhum carro cadastrado. <Link to="/novo">Cadastre o primeiro!</Link></p>
      ) : (
        <div className="grid">
          {carros.map(carro => (
            <div key={carro.id} className="card">
              <div className="card-img">
                {carro.imagem
                  ? <img src={imagemUrl(carro.imagem)} alt={`${carro.marca} ${carro.modelo}`} />
                  : <div className="card-img-placeholder">Sem foto</div>
                }
              </div>
              <div className="card-body">
                <div className="card-marca">{carro.marca}</div>
                <h2 className="card-modelo">{carro.modelo}</h2>
                <div className="card-info">
                  <span>{carro.ano}</span>
                  <span>{Number(carro.quilometragem).toLocaleString('pt-BR')} km</span>
                </div>
                <div className="card-preco">
                  R$ {Number(carro.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="card-actions">
                  <Link to={`/carros/${carro.id}`} className="btn btn-ver">Detalhes</Link>
                  <Link to={`/editar/${carro.id}`} className="btn btn-editar">Editar</Link>
                  <button onClick={() => handleDeletar(carro.id)} className="btn btn-deletar">Remover</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>&#8592; Anterior</button>
          <span>{pagina} de {totalPaginas}</span>
          <button disabled={pagina >= totalPaginas} onClick={() => setPagina(p => p + 1)}>Próximo &#8594;</button>
        </div>
      )}
    </div>
  );
}
