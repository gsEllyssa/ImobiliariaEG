import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  authRoutes,
  tenantRoutes,
  contractRoutes,
  propertyRoutes,
  paymentRoutes,
  receiptRoutes,
  userRoutes,
  templateRoutes,
  debugRoutes,
} from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/imobiliaria";

// 🧠 Middleware global
app.use(cors());
app.use(express.json());

// 🔌 Conexão com MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 Conectado ao MongoDB com sucesso"))
  .catch((err) => {
    console.error("🔴 Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// 🔁 Rotas da aplicação
app.use("/auth", authRoutes);
app.use("/tenants", tenantRoutes);
app.use("/contracts", contractRoutes);
app.use("/properties", propertyRoutes);
app.use("/payments", paymentRoutes);
app.use("/receipts", receiptRoutes);
app.use("/users", userRoutes);
app.use("/templates", templateRoutes);
app.use("/debug", debugRoutes); // opcional

// 🌐 Rota padrão (status)
app.get("/", (req, res) => {
  res.send("API da Imobiliária rodando com sucesso ✅");
});

// 🚀 Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
