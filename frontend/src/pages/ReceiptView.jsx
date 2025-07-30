import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReceiptView() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReceipt() {
      try {
        const response = await axios.get(`/api/receipts/${id}`);
        setReceipt(response.data);
      } catch (err) {
        setError('Error loading receipt.');
      } finally {
        setLoading(false);
      }
    }

    fetchReceipt();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading receipt...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;
  if (!receipt) return <p style={{ padding: '2rem' }}>Receipt not found.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1rem' }}>📄 Payment Receipt</h2>

      <p><strong>Receipt ID:</strong> {receipt._id}</p>
      <p><strong>Tenant:</strong> {receipt.tenant?.name}</p>
      <p><strong>Contract:</strong> {receipt.contract?.title || receipt.contract}</p>
      <p><strong>Payment Date:</strong> {new Date(receipt.paymentDate).toLocaleDateString('en-GB')}</p>
      <p><strong>Amount:</strong> R$ {Number(receipt.amount).toFixed(2)}</p>
      <p><strong>Method:</strong> {receipt.method || 'Not specified'}</p>

      <hr style={{ margin: '2rem 0' }} />

      <p style={{ fontStyle: 'italic', color: '#666' }}>
        This receipt confirms the payment related to the specified contract. Please keep it as proof of payment.
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
        onClick={() => alert('🔧 Coming soon: PDF download feature!')}
      >
        📥 Download PDF
      </button>
    </div>
  );
}
