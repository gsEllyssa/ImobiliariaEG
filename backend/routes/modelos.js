const express = require('express');
const router = express.Router();
const Modelo = require('../models/Modelo');

router.get('/', async (req, res) => {
  const modelos = await Modelo.find().sort({ updatedAt: -1 });
  res.json(modelos);
});

router.get('/:id', async (req, res) => {
  const modelo = await Modelo.findById(req.params.id);
  res.json(modelo);
});

router.post('/', async (req, res) => {
  const novo = new Modelo(req.body);
  await novo.save();
  res.status(201).json(novo);
});

router.put('/:id', async (req, res) => {
  const atualizado = await Modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

module.exports = router;
