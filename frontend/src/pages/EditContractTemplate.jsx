import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { getTemplateById, updateTemplate } from "../services/contractTemplateService";
import "react-quill/dist/quill.snow.css";
import "../styles/modules/EditContractTemplate.scss";

export default function EditContractTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState({ title: "", content: "" });

  useEffect(() => {
    async function load() {
      const data = await getTemplateById(id);
      setTemplate(data);
    }
    load();
  }, [id]);

  const handleSave = async () => {
    await updateTemplate(id, template);
    navigate("/templates");
  };

  return (
    <div className="editor-container">
      <input
        className="editor-title"
        value={template.title}
        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
        placeholder="Título do Modelo"
      />
      <ReactQuill
        value={template.content}
        onChange={(value) => setTemplate({ ...template, content: value })}
      />
      <button className="btn-salvar" onClick={handleSave}>
        Salvar Modelo
      </button>
    </div>
  );
}
