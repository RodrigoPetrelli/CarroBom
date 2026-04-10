import { useEffect } from 'react';
import './Toast.css';

export default function Toast({ mensagem, tipo = 'erro', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [mensagem]);

  if (!mensagem) return null;

  return (
    <div className={`toast toast-${tipo}`}>
      <span>{mensagem}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
}
