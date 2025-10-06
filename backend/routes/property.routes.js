// backend/routes/property.routes.js
import { Router } from "express";
import {
  listProperties,
  createProperty,
  getPropertyById,
  updateProperty,
} from "../controllers/property.controller.js";
import { validateCreate, validateUpdate } from "../middlewares/validateProperty.js";
// 1. Importar os middlewares de segurança
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

// --- Rotas Públicas ---
// Qualquer um pode listar todos os imóveis ou ver um específico.
router.get("/", listProperties);
router.get("/:id", getPropertyById);

// --- Rotas Protegidas ---
// Apenas usuários logados e com o cargo 'admin' podem criar ou atualizar imóveis.
router.post("/", verifyToken, checkRole(['admin']), validateCreate, createProperty);
router.patch("/:id", verifyToken, checkRole(['admin']), validateUpdate, updateProperty);

export default router;