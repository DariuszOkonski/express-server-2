const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
let db = require('./db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// fake database

// Routes
app.get('/testimonials', (req, res) => {
  res.json({ data: db });
});

app.get('/testimonials/random', (req, res) => {
  const dbLength = db.length;

  if (dbLength === 0) {
    return res.status(404).json({ data: 'no elements in database' });
  }

  const testimonial = db[Math.floor(Math.random() * dbLength)];

  res.json({ data: testimonial });
});

app.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const testimonial = db.find((item) => item.id == id);

  if (testimonial) {
    return res.json({ data: testimonial });
  } else {
    return res.status(404).json({ message: 'not found' });
  }
});

app.post('/testimonials', (req, res) => {
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

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
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

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
