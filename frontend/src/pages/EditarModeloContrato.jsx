import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { obterModeloPorId, atualizarModelo } from "../services/modeloService";
import "react-quill/dist/quill.snow.css";
import "../styles/modules/EditorModelo.scss";

export default function EditarModeloContrato() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelo, setModelo] = useState({ titulo: "", conteudo: "" });

  useEffect(() => {
    async function carregar() {
      const dados = await obterModeloPorId(id);
      setModelo(dados);
    }
    carregar();
  }, [id]);

  const salvar = async () => {
    await atualizarModelo(id, modelo);
    navigate("/modelos");
  };

  return (
    <div className="editor-container">
      <input
        className="editor-title"
        value={modelo.titulo}
        onChange={(e) => setModelo({ ...modelo, titulo: e.target.value })}
        placeholder="Título do Modelo"
      />
      <ReactQuill
        value={modelo.conteudo}
        onChange={(value) => setModelo({ ...modelo, conteudo: value })}
      />
      <button className="btn-salvar" onClick={salvar}>Salvar Modelo</button>
    </div>
  );
}
