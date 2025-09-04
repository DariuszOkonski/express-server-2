const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
let db = require('../db');

router.get('/', (req, res) => {
  res.json({ data: db });
});

router.get('/random', (req, res) => {
  const dbLength = db.length;

  if (dbLength === 0) {
    return res.status(404).json({ data: 'no elements in database' });
  }

  const testimonial = db[Math.floor(Math.random() * dbLength)];

  res.json({ data: testimonial });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const testimonial = db.find((item) => item.id == id);

  if (testimonial) {
    return res.json({ data: testimonial });
  } else {
    return res.status(404).json({ message: 'not found' });
  }
});

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing all data' });
  }

  if (!req.body.author || !req.body.text) {
    return res.status(400).json({ message: 'missing data' });
  }

  const { author, text } = req.body;

  db.push({ id: uuidv4(), author, text });

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json({ message: 'missing data to update' });
  }

  const { id } = req.params;

  const testimonial = db.find((item) => item.id === id);

  if (!testimonial) {
    return res
      .status(404)
      .json({ message: 'this element does not exists in database' });
  }

  if (req.query.author) {
    testimonial.author = req.query.author;
  }

  if (req.query.text) {
    testimonial.text = req.query.text;
  }

  db = db.map((item) => {
    if (item.id === id) {
      return testimonial;
    }
    return item;
  });

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const testimonial = db.find((item) => item.id === id);

  if (!testimonial) {
    return res
      .status(404)
      .json({ message: 'this element does not exists in database' });
  }

  db = db.filter((item) => item.id !== id);

  res.json({ message: 'OK' });
});

module.exports = router;
