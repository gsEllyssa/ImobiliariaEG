import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTenants } from "../services/tenantService";
import "../styles/modules/Tenants.scss";

export default function Tenants() {
  const [tenantList, setTenantList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTenants() {
      try {
        const data = await listTenants();
        setTenantList(data);
      } catch (error) {
        console.error("Erro ao carregar inquilinos:", error);
      }
    }
    fetchTenants();
  }, []);

  const filteredTenants = tenantList.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tenants-page">
      <header className="tenants-header">
        <div className="breadcrumbs">
          <span>Inquilinos</span> / <strong>Inquilinos Cadastrados</strong>
        </div>
        <div className="top-actions">
          <input
            type="text"
            placeholder="Nome, CPF, RG, E-mail"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => navigate("/new-tenant")}>
            Adicionar Novo Inquilino
          </button>
        </div>
      </header>

      <table className="tenants-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código do Imóvel</th>
            <th>Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {filteredTenants.length === 0 ? (
            <tr>
              <td colSpan="3">Nenhum inquilino encontrado.</td>
            </tr>
          ) : (
            filteredTenants.map((tenant) => (
              <tr key={tenant._id}>
                <td>{tenant.name}</td>
                <td>{tenant.propertyCode || "—"}</td>
                <td>
                  {new Date(tenant.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
