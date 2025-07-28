import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/index.js"; // ou o caminho correto

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Agora o prefixo está certo
app.use("/auth", authRoutes);

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
