import express from 'express';
import Template from '../models/Template.js';
import { proteger } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET all templates (recent first)
router.get('/', proteger, async (req, res) => {
  try {
    const templates = await Template.find().sort({ updatedAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching templates' });
  }
});

// GET single template by ID
router.get('/:id', proteger, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching template' });
  }
});

// POST create a new template
router.post('/', proteger, async (req, res) => {
  try {
    const novo = new Template(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: 'Error creating template' });
  }
});

// PUT update an existing template
router.put('/:id', proteger, async (req, res) => {
  try {
    const atualizado = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Template not found' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error updating template' });
  }
});

export default router;
