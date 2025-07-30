import React, { useEffect, useState } from 'react';
import { createContract } from '../services/contractService';
import { listTenants } from '../services/tenantService';
import { listProperties } from '../services/propertyService';
import '../styles/modules/NewContract.scss';

export default function NewContract() {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    landlord: '',
    landlordCpf: '',
    tenant: '',
    tenantCpf: '',
    property: '',
    propertyAddress: '',
    rentAmount: '',
    startDate: '',
    endDate: '',
    dueDate: '',
    duration: '',
    guarantees: {
      guarantor: false,
      deposit: false,
      insurance: false,
    },
    notes: ''
  });

  useEffect(() => {
    async function loadData() {
      const tenantList = await listTenants();
      const propertyList = await listProperties();
      setTenants(tenantList);
      setProperties(propertyList);
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('guarantees.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        guarantees: {
          ...prev.guarantees,
          [field]: checked
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedProperty = properties.find(p => p._id === form.property);
      const fullData = {
        ...form,
        rentAmount: Number(form.rentAmount),
        propertyAddress: selectedProperty?.address || ''
      };
      await createContract(fullData);
      alert('Contract created successfully!');
      window.location.href = '/contracts';
    } catch (err) {
      console.error('Error creating contract:', err);
      alert('Error creating contract');
    }
  };

  return (
    <div className="new-contract-page">
      <h2>New Contract</h2>
      <form className="contract-form" onSubmit={handleSubmit}>
        <label>Landlord</label>
        <input name="landlord" value={form.landlord} onChange={handleChange} required />

        <label>CPF (Landlord)</label>
        <input name="landlordCpf" value={form.landlordCpf} onChange={handleChange} required />

        <label>Tenant</label>
        <select name="tenant" value={form.tenant} onChange={handleChange} required>
          <option value="">Select a tenant</option>
          {tenants.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        <label>CPF (Tenant)</label>
        <input name="tenantCpf" value={form.tenantCpf} onChange={handleChange} required />

        <label>Property</label>
        <select name="property" value={form.property} onChange={handleChange} required>
          <option value="">Select a property</option>
          {properties.map((p) => (
            <option key={p._id} value={p._id}>{p.description}</option>
          ))}
        </select>

        <label>Rent Amount</label>
        <input type="number" name="rentAmount" value={form.rentAmount} onChange={handleChange} required />

        <label>Duration (e.g. 12 months)</label>
        <input name="duration" value={form.duration} onChange={handleChange} required />

        <label>Start Date</label>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />

        <label>End Date</label>
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />

        <label>Due Date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />

        <fieldset>
          <legend>Guarantees</legend>
          <label>
            <input type="checkbox" name="guarantees.guarantor" checked={form.guarantees.guarantor} onChange={handleChange} />
            Guarantor
          </label>
          <label>
            <input type="checkbox" name="guarantees.deposit" checked={form.guarantees.deposit} onChange={handleChange} />
            Deposit
          </label>
          <label>
            <input type="checkbox" name="guarantees.insurance" checked={form.guarantees.insurance} onChange={handleChange} />
            Rent Insurance
          </label>
        </fieldset>

        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} />

        <button type="submit">Save Contract</button>
      </form>
    </div>
  );
}
