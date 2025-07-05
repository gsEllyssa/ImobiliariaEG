import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StepProgress from '../components/StepProgress';
import Topbar from '../components/Topbar';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import { listarInquilinos } from '../services/inquilinoService';
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
    // ⚠️ Modo de teste com mock local
    const mock = [
      {
        _id: '1',
        nome: 'João Teste',
        contrato: {
          _id: 'abc123',
          valor: 1200,
          imovel: {
            _id: 'xyz789',
            endereco: 'Rua das Flores, 123'
          }
        }
      },
      {
        _id: '2',
        nome: 'Maria Oliveira',
        contrato: {
          _id: 'def456',
          valor: 1500,
          imovel: {
            _id: 'uvw456',
            endereco: 'Av. Central, 456'
          }
        }
      }
    ];
    setTenants(mock);

    // 🔁 Quando quiser usar dados reais:
    // async function load() {
    //   const data = await listarInquilinos();
    //   setTenants(data);
    // }
    // load();
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
      <Topbar icon={faDollarSign} title="Receber Pagamento" subtitle="Etapas de confirmação" />
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
          <div className="box-resumo">
            <h3>Resumo do Pagamento</h3>
            <p><strong>Inquilino:</strong> {selected.nome}</p>
            <p><strong>Valor:</strong> R$ {Number(selected.contrato.valor).toFixed(2)}</p>
            <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

            <div className="box-grid">
              <div className="box-info">
                <span className="label">Método de Pagamento</span>
                <strong>Dinheiro</strong>
              </div>
              <div className="box-info">
                <span className="label">Valor Total</span>
                <strong>R$ {Number(selected.contrato.valor).toFixed(2)}</strong>
              </div>
            </div>

            <div className="btn-container">
              <button className="btn-cancelar" onClick={() => setStep(1)}>Voltar</button>
              <button className="btn-receber" onClick={handleReceive}>Receber</button>
            </div>
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
            <h3>Recibo de Aluguel</h3>
            <p>Aluguel comercial.</p>
            <p>
              Recebi (emos) de <strong>{selected.nome}</strong>, a importância de <strong>R$ {Number(receipt.amount).toFixed(2)}</strong>. Valor pactuado entre as partes.
            </p>
            <p>
              Proveniente do aluguel de <br />
              {selected.contrato.imovel?.endereco || '---'}<br />
              Referente ao período de 10/Out a 10/Nov/24 <strong>Vencido em 10/Nov/2024</strong>.
            </p>
            <p>Assinatura Cleia Maria Oliveira</p>
          </div>
        </section>
      )}
    </Layout>
  );
}
