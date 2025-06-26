import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { criarModelo } from "../services/modeloService";
import Menu from "../components/Menu";
import Topbar from "../components/Topbar";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";

export default function FormModeloContrato() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const handleSalvar = async () => {
    if (!titulo || !conteudo) return alert("Preencha todos os campos");
    await criarModelo({ titulo, conteudo });
    navigate("/modelos");
  };

  return (
    <div className="layout-container">
      <Menu />
      <div className="page-content-area">
        <Topbar icon={faFileContract} title="Modelos" subtitle="Novo Modelo de Contrato" />
        <main className="content">
          <div className="form-group">
            <label>Título do Modelo</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Conteúdo do Contrato</label>
            <ReactQuill value={conteudo} onChange={setConteudo} />
          </div>

          <div className="btn-container">
            <button className="btn-salvar" onClick={handleSalvar}>
              Salvar Modelo
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
