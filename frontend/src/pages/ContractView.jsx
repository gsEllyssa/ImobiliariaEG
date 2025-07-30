import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import Topbar from '../components/Topbar';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { getContractById } from '../services/contractService';

export default function ContractView() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getContractById(id);
      setContract(data);
    }
    load();
  }, [id]);

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar icon={faFileContract} title="Contrato" subtitle="Visualização de Contrato" />
        <main className="content">
          {contract ? (
            <div className="contract-preview">
              <h2>{contract.template?.title || 'Contrato'}</h2>
              <div
                className="contract-content"
                dangerouslySetInnerHTML={{ __html: contract.finalText }}
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
