import express from "express";
import Tenant from "../models/Tenant.js";
import Property from "../models/Property.js";
import Contract from "../models/Contract.js";
import Payment from "../models/Payment.js";
import Receipt from "../models/Receipt.js";

const router = express.Router();

// Debug route: List all tenants
router.get("/tenants", async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tenants." });
  }
});

// Debug route: List all properties
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Error fetching properties." });
  }
});

// Debug route: List all contracts
router.get("/contracts", async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contracts." });
  }
});

// Debug route: List all payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching payments." });
  }
});

// Debug route: List all receipts
router.get("/receipts", async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching receipts." });
  }
});

export default router;
