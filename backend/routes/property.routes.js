// backend/routes/property.routes.js
import { Router } from "express";
import {
  listProperties,
  createProperty,
  getPropertyById,
  updateProperty,
} from "../controllers/property.controller.js";
import { validateCreate, validateUpdate } from "../middlewares/validateProperty.js";

const router = Router();

router.get("/", listProperties);
router.post("/", validateCreate, createProperty);
router.get("/:id", getPropertyById);
router.patch("/:id", validateUpdate, updateProperty);

export default router;
