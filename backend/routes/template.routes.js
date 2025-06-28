import express from 'express';
import Template from '../models/Template.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const templates = await Template.find().sort({ updatedAt: -1 });
  res.json(templates);
});

router.get('/:id', async (req, res) => {
  const template = await Template.findById(req.params.id);
  res.json(template);
});

router.post('/', async (req, res) => {
  const novo = new Template(req.body);
  await novo.save();
  res.status(201).json(novo);
});

router.put('/:id', async (req, res) => {
  const atualizado = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

export default router;
