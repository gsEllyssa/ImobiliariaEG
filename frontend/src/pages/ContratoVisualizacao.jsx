import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import Topbar from '../components/Topbar';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { obterContratoPorId } from '../services/contratoService';

export default function ContratoVisualizacao() {
  const { id } = useParams();
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    async function carregar() {
      const dados = await obterContratoPorId(id);
      setContrato(dados);
    }
    carregar();
  }, [id]);

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar icon={faFileContract} title="Contrato" subtitle="Visualização de Contrato" />
        <main className="content">
          {contrato ? (
            <div className="contract-preview">
              <h2>{contrato.modelo?.titulo || 'Contrato'}</h2>
              <div
                className="contract-content"
                dangerouslySetInnerHTML={{ __html: contrato.textoFinal }}
              />
            </div>
          ) : (
            <p>Carregando contrato...</p>
          )}
        </main>
      </div>
    </div>
  );
}
