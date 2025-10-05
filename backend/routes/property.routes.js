// backend/routes/property.routes.js
import { Router } from "express";
import { listProperties, createProperty } from "../controllers/property.controller.js";

const router = Router();

router.get("/", listProperties);   // GET /api/properties
router.post("/", createProperty);  // POST /api/properties

export default router;
