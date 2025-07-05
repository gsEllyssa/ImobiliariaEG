import React, { useState } from 'react';
import Menu from '../components/Menu';
import Topbar from '../components/Topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faUser,
  faDownload,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/modules/Payment.scss';

export default function Payment() {
  const [step, setStep] = useState(1);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const tenants = [
    { id: 1, name: 'João Silva' },
    { id: 2, name: 'Maria Oliveira' },
    { id: 3, name: 'Pedro Souza' },
  ];

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar
          icon={faCreditCard}
          title="Receive Payment"
          subtitle="Step by step confirmation"
        />

        <main className="content">
          <div className="step-progress">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`step-wrapper ${step === n ? 'current' : step > n ? 'completed' : ''}`}
              >
                <div className="circle">{step > n ? '✓' : ''}</div>
                {n < 3 && <div className={`line ${step > n ? 'completed' : ''}`}></div>}
                <div className="label">
                  {n === 1 ? 'Select Tenant' : n === 2 ? 'Confirm Payment' : 'Receipt'}
                </div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <section className="search-tenant-section">
              <input
                type="text"
                className="tenant-search"
                placeholder="Search tenant..."
              />
              <ul className="tenant-list">
                {tenants.map((i) => (
                  <li
                    key={i.id}
                    className={`tenant-item ${selectedTenant?.id === i.id ? 'active' : ''}`}
                    onClick={() => setSelectedTenant(i)}
                  >
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    {i.name}
                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button
                  className="btn-receive"
                  onClick={next}
                  disabled={!selectedTenant}
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="payment-summary">
              <h3>Payment Summary</h3>
              <p><strong>Tenant:</strong> {selectedTenant?.name}</p>
              <p><strong>Amount:</strong> R$ 1,200.00</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

              <div className="btn-container">
                <button className="btn-cancel" onClick={back}>Back</button>
                <button className="btn-receive" onClick={next}>Receive</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="receipt-container">
              <div className="receipt-actions">
                <FontAwesomeIcon icon={faDownload} title="Download PDF" className="icon-action" />
                <FontAwesomeIcon icon={faEnvelope} title="Send by email" className="icon-action" />
              </div>
              <div className="receipt-content">
                <h3>Payment Receipt</h3>
                <p><strong>Tenant:</strong> {selectedTenant?.name}</p>
                <p><strong>Amount:</strong> R$ 1,200.00</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                <p><strong>Method:</strong> Credit Card</p>
              </div>
              <div className="btn-container">
                <button className="btn-receive" onClick={() => setStep(1)}>New Payment</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
