import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { buscarCarro, deletarCarro, imagemUrl } from '../services/api';
import './DetailPage.css';

export default function DetailPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [carro,  setCarro] = useState(null);

  useEffect(() => { buscarCarro(id).then(setCarro); }, [id]);

  async function handleDeletar() {
    if (!window.confirm('Deseja remover este carro?')) return;
    await deletarCarro(id);
    navigate('/');
  }

  if (!carro) return <p className="status">Carregando...</p>;

  return (
    <div className="detail-page">
      <Link to="/" className="voltar">&#8592; Voltar à listagem</Link>

      <div className="detail-card">
        {carro.imagem ? (
          <img
            src={imagemUrl(carro.imagem)}
            alt={`${carro.marca} ${carro.modelo}`}
            className="detail-img"
          />
        ) : (
          <div className="detail-img-placeholder">Sem foto</div>
        )}

        <div className="detail-content">
          <div className="detail-header">
            <span className="detail-marca">{carro.marca}</span>
            <h1 className="detail-modelo">{carro.modelo}</h1>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span>Ano</span>
              <strong>{carro.ano}</strong>
            </div>
            <div className="detail-item">
              <span>Preço</span>
              <strong>R$ {Number(carro.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="detail-item">
              <span>Quilometragem</span>
              <strong>{Number(carro.quilometragem).toLocaleString('pt-BR')} km</strong>
            </div>
          </div>

          {carro.descricao && (
            <div className="detail-descricao">
              <h3>Descrição</h3>
              <p>{carro.descricao}</p>
            </div>
          )}

          <div className="detail-actions">
            <Link to={`/editar/${carro.id}`} className="btn btn-editar">Editar</Link>
            <button onClick={handleDeletar}  className="btn btn-deletar">Remover</button>
          </div>
        </div>
      </div>
    </div>
  );
}
