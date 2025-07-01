import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StepProgress from '../components/StepProgress';
import Topbar from '../components/Topbar';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { listarInquilinos } from '../services/inquilinoService';
import { criarPagamento } from '../services/pagamentoService';
import { criarRecibo } from '../services/reciboService';
import SearchBarWithHistory from '../components/SearchBarWithHistory';

import '../styles/modules/Payment.scss';

export default function Payment() {
  const [step, setStep] = useState(1);
  const [tenants, setTenants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [payment, setPayment] = useState(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await listarInquilinos();
      setTenants(data);
    }
    load();
  }, []);

  const handleReceive = async () => {
    if (!selected?.contrato?._id) return alert('Contract not found');

    const paymentData = {
      tenantId: selected._id,
      contractId: selected.contrato._id,
      amount: selected.contrato.valor,
      method: 'Cash',
      paymentDate: new Date().toISOString()
    };

    const newPayment = await criarPagamento(paymentData);
    setPayment(newPayment);

    const receiptData = {
      tenantId: selected._id,
      contractId: selected.contrato._id,
      propertyId: selected.contrato.imovel?._id,
      paymentId: newPayment._id,
      amount: newPayment.amount,
      paymentDate: newPayment.createdAt,
      method: newPayment.method,
      status: 'Paid'
    };

    const newReceipt = await criarRecibo(receiptData);
    setReceipt(newReceipt);
    setStep(3);
  };

  return (
    <Layout>
      <Topbar icon={faDollarSign} title="Payments" subtitle="New Payment" />
      <StepProgress etapaAtual={step} />

      {step === 1 && (
        <SearchBarWithHistory
          tenants={tenants}
          onSelect={(tenant) => {
            setSelected(tenant);
            setStep(2);
          }}
        />
      )}

      {step === 2 && selected?.contrato && (
        <section className="payment-summary">
          <h3>Summary</h3>
          <p>{selected.contrato.imovel?.descricao || 'Property'}</p>
          <p>
            Received from <strong>{selected.nome}</strong> the amount of{' '}
            <strong>R$ {Number(selected.contrato.valor).toFixed(2)}</strong>.
          </p>
          <p>
            From the rental of <br />
            {selected.contrato.imovel?.endereco || 'No address available'} <br />
            Related to the current contract.{' '}
            <strong>
              Due on{' '}
              {new Date(selected.contrato.vencimento).toLocaleDateString('pt-BR')}
            </strong>.
          </p>

          <div className="payment-boxes">
            <div className="box">
              <span className="label">Payment Method</span>
              <strong>Cash</strong>
            </div>
            <div className="box">
              <span className="label">Total Amount</span>
              <strong>R$ {Number(selected.contrato.valor).toFixed(2)}</strong>
            </div>
          </div>

          <div className="btn-container">
            <button className="btn-cancelar" onClick={() => setStep(1)}>
              Cancel
            </button>
            <button className="btn-receber" onClick={handleReceive}>
              Receive
            </button>
          </div>
        </section>
      )}

      {step === 3 && receipt && (
        <section className="receipt-container">
          <div className="receipt-actions">
            <i className="fas fa-download" title="Download"></i>
            <i className="fas fa-print" title="Print"></i>
          </div>
          <div className="receipt-content">
            <h3>Rental Receipt</h3>
            <p>{selected.contrato.imovel?.descricao || 'Rental property'}</p>
            <p>
              Received from <strong>{selected.nome}</strong> the amount of{' '}
              <strong>R$ {Number(receipt.amount).toFixed(2)}</strong>.
            </p>
            <p>
              Related to the property: <br />
              {selected.contrato.imovel?.endereco || 'No address available'} <br />
              Due on{' '}
              <strong>
                {new Date(selected.contrato.vencimento).toLocaleDateString('pt-BR')}
              </strong>.
            </p>
            <p>Signature: Cleia Maria Oliveira</p>
          </div>
        </section>
      )}
    </Layout>
  );
}
