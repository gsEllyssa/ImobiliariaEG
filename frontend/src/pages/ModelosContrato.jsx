import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarModelos } from "../services/modeloService";
import Menu from "../components/Menu";
import Topbar from "../components/Topbar";

export default function ModelosContrato() {
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const dados = await listarModelos();
      setModelos(dados);
    }
    carregar();
  }, []);

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar title="Modelos de Contrato" subtitle="Gerencie seus modelos" icon="fa-file-contract" />

        <main className="content">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/novo-modelo" className="btn btn-primary">
              Criar Novo Modelo
            </Link>
          </div>

          <div className="list-group">
            {modelos.map((modelo) => (
              <Link
                key={modelo._id}
                to={`/editar-modelo/${modelo._id}`}
                className="list-group-item list-group-item-action"
              >
                {modelo.titulo || "(Sem título)"}
              </Link>
            ))}
            {modelos.length === 0 && (
              <p className="text-muted">Nenhum modelo encontrado.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
