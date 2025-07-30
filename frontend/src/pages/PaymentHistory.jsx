import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Topbar from '../components/Topbar';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import '../styles/modules/PaymentHistory.scss';

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadPayments() {
      try {
        const response = await axios.get('/api/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    }
    loadPayments();
  }, []);

  const filtered = payments.filter((p) =>
    p.tenant?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Topbar
        icon={faFileInvoiceDollar}
        title="Payment History"
        subtitle="All payments received"
      />

      <div className="payment-history">
        <input
          className="search-input"
          type="text"
          placeholder="Search by tenant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="payment-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p._id}>
                  <td>{p.tenant?.name || '---'}</td>
                  <td>R$ {Number(p.amount).toFixed(2)}</td>
                  <td>{p.method}</td>
                  <td>{new Date(p.paymentDate).toLocaleDateString('pt-BR')}</td>
                  <td>{p.status || 'Paid'}</td>
                  <td>
                    <a href={`/receipt/${p._id}`} className="receipt-link">
                      View Receipt
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
