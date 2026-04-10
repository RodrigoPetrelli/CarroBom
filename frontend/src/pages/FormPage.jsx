import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { buscarCarro, criarCarro, atualizarCarro, imagemUrl } from '../services/api';
import Toast from '../components/Toast';
import './FormPage.css';

const VAZIO = { modelo: '', marca: '', ano: '', preco: '', quilometragem: '', descricao: '' };

export default function FormPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [form,        setForm]        = useState(VAZIO);
  const [erros,       setErros]       = useState({});
  const [salvando,    setSalvando]    = useState(false);
  const [imagemAtual, setImagemAtual] = useState(null);
  const [preview,     setPreview]     = useState(null);
  const [toast,       setToast]       = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (!editando) return;
    buscarCarro(id)
      .then(c => {
        setForm({ modelo: c.modelo, marca: c.marca, ano: c.ano, preco: c.preco, quilometragem: c.quilometragem, descricao: c.descricao || '' });
        setImagemAtual(c.imagem || null);
      })
      .catch(() => setToast({ mensagem: 'Erro ao carregar dados do carro.', tipo: 'erro' }));
  }, [id]);

  function validar() {
    const e = {};
    if (!form.modelo.trim())   e.modelo = 'Modelo é obrigatório';
    if (!form.marca.trim())    e.marca  = 'Marca é obrigatória';
    const anoNum = Number(form.ano);
    if (!form.ano || anoNum < 1900 || anoNum > new Date().getFullYear() + 1)
      e.ano = `Ano deve estar entre 1900 e ${new Date().getFullYear() + 1}`;
    if (!form.preco || Number(form.preco) <= 0)
      e.preco = 'Preço deve ser maior que zero';
    if (form.quilometragem === '' || Number(form.quilometragem) < 0)
      e.quilometragem = 'Quilometragem não pode ser negativa';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const val = validar();
    if (Object.keys(val).length > 0) { setErros(val); return; }
    setSalvando(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (fileRef.current?.files[0]) fd.append('imagem', fileRef.current.files[0]);

    try {
      if (editando) {
        await atualizarCarro(id, fd);
        setToast({ mensagem: 'Carro atualizado com sucesso!', tipo: 'sucesso' });
      } else {
        await criarCarro(fd);
        setToast({ mensagem: 'Carro cadastrado com sucesso!', tipo: 'sucesso' });
      }
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const msg = err?.response?.data?.erro || 'Erro ao salvar. Tente novamente.';
      setToast({ mensagem: msg, tipo: 'erro' });
    } finally {
      setSalvando(false);
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target;
    setForm(f => ({ ...f, [name]: value }));
    setErros(e => ({ ...e, [name]: undefined }));
  }

  function handleFile(ev) {
    const file = ev.target.files[0];
    if (!file) { setPreview(null); return; }
    setPreview(URL.createObjectURL(file));
  }

  const imgSrc = preview || (imagemAtual ? imagemUrl(imagemAtual) : null);

  return (
    <div className="form-page">
      {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />}

      <Link to="/" className="voltar">&#8592; Voltar</Link>
      <h1>{editando ? 'Editar Carro' : 'Cadastrar Carro'}</h1>

      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-row">
          <div className="campo">
            <label htmlFor="marca">Marca *</label>
            <input id="marca" name="marca" value={form.marca} onChange={handleChange} placeholder="Ex: Toyota" />
            {erros.marca && <span className="erro">{erros.marca}</span>}
          </div>
          <div className="campo">
            <label htmlFor="modelo">Modelo *</label>
            <input id="modelo" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ex: Corolla" />
            {erros.modelo && <span className="erro">{erros.modelo}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="campo">
            <label htmlFor="ano">Ano *</label>
            <input id="ano" name="ano" type="number" value={form.ano} onChange={handleChange} placeholder="Ex: 2021" />
            {erros.ano && <span className="erro">{erros.ano}</span>}
          </div>
          <div className="campo">
            <label htmlFor="preco">Preço (R$) *</label>
            <input id="preco" name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} placeholder="Ex: 85000.00" />
            {erros.preco && <span className="erro">{erros.preco}</span>}
          </div>
          <div className="campo">
            <label htmlFor="quilometragem">Quilometragem *</label>
            <input id="quilometragem" name="quilometragem" type="number" value={form.quilometragem} onChange={handleChange} placeholder="Ex: 45000" />
            {erros.quilometragem && <span className="erro">{erros.quilometragem}</span>}
          </div>
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" value={form.descricao} onChange={handleChange} rows={3} placeholder="Informações adicionais..." />
        </div>

        <div className="campo">
          <label htmlFor="imagem">Foto do carro</label>
          <input id="imagem" type="file" accept="image/jpeg,image/png,image/webp" ref={fileRef} onChange={handleFile} />
          {imgSrc && <img src={imgSrc} alt="Preview" className="img-preview" />}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn btn-cancelar">Cancelar</button>
          <button type="submit" disabled={salvando} className="btn btn-salvar">
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
