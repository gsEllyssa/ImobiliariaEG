import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTenants } from "../services/tenantService";
import Topbar from "../components/Topbar";
import Layout from "../components/Layout";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

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
    <Layout>
      <Topbar
        title="Inquilinos"
        subtitle="Visualize todos os inquilinos cadastrados"
        icon={faUsers}
      />

      <div className="px-6 py-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <input
            type="text"
            placeholder="Nome, CPF, RG, E-mail"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[280px] px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={() => navigate("/new-tenant")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition"
          >
            + Adicionar Novo Inquilino
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm p-4">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold border-b">Nome</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold border-b">Código do Imóvel</th>
                <th className="text-left py-3 px-4 text-gray-700 font-semibold border-b">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                    Nenhum inquilino encontrado.
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr
                    key={tenant._id}
                    className="hover:bg-gray-50 transition border-b last:border-b-0"
                  >
                    <td className="py-3 px-4 text-gray-800">{tenant.name}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {tenant.propertyCode || "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
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
      </div>
    </Layout>
  );
}
