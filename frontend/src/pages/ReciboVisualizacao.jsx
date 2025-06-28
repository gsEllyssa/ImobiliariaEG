import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReciboVisualizacao() {
  const { id } = useParams();
  const [recibo, setRecibo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarRecibo() {
      try {
        const resposta = await axios.get(`/api/receipts/${id}`);
        setRecibo(resposta.data);
      } catch (err) {
        setErro('Erro ao buscar o recibo.');
      } finally {
        setCarregando(false);
      }
    }

    buscarRecibo();
  }, [id]);

  if (carregando) return <p style={{ padding: '2rem' }}>Carregando recibo...</p>;
  if (erro) return <p style={{ padding: '2rem', color: 'red' }}>{erro}</p>;
  if (!recibo) return <p style={{ padding: '2rem' }}>Recibo não encontrado.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1rem' }}>📄 Recibo de Pagamento</h2>

      <p><strong>Recibo ID:</strong> {recibo._id}</p>
      <p><strong>Inquilino:</strong> {recibo.tenant?.nome}</p>
      <p><strong>Contrato:</strong> {recibo.contract?.titulo || recibo.contract}</p>
      <p><strong>Data do Pagamento:</strong> {new Date(recibo.dataPagamento).toLocaleDateString()}</p>
      <p><strong>Valor:</strong> R$ {Number(recibo.valor).toFixed(2)}</p>
      <p><strong>Forma de Pagamento:</strong> {recibo.formaPagamento || 'Não informado'}</p>

      <hr style={{ margin: '2rem 0' }} />

      <p style={{ fontStyle: 'italic', color: '#666' }}>
        Este recibo confirma o pagamento referente ao contrato informado. Guarde-o como comprovação.
      </p>

      <button
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
        onClick={() => alert('🔧 Em breve: funcionalidade de download em PDF!')}
      >
        📥 Baixar PDF
      </button>
    </div>
  );
}
