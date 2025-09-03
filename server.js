const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// fake database
const db = [
  {
    id: '43aaa7b2-6f32-416b-bef3-1d44fa6f781f',
    author: 'John Doe',
    text: 'This company is worth every coin!',
  },
  {
    id: '38d7f8da-8fcb-484a-86c8-a0bc6847fd8b',
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  {
    id: '331b4ce8-c998-492d-8c70-04a70ad2e629',
    author: 'Johnny Bravo',
    text: 'Hello Johnny Bravo',
  },
];

// Routes
app.get('/testimonials', (req, res) => {
  res.json({ data: db });
});

app.get('/testimonials/random', (req, res) => {
  const dbLength = db.length;

  if (dbLength === 0) {
    return res.json({ data: 'no elements in database' });
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
    return res.json({ data: 'not found' });
  }
});

app.post('/testimonials', (req, res) => {
  if (!req.body) {
    return res.json({ message: 'missing all data' });
  }

  if (!req.body.author || !req.body.text) {
    return res.json({ message: 'missing data' });
  }

  const { author, text } = req.body;

  db.push({ id: uuidv4(), author, text });

  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.json({ message: 'missing data to update' });
  }

  const { id } = req.params;
  // finished on PUT Request
  // https://kodilla.com/pl/bootcamp-module/1582/276/9102#submodule-1120

  console.log(id);
  console.log(req.query);

  res.send('put testimonials/id');
});

app.delete('/testimonials/:id', (req, res) => {
  res.send('delete testimonials/id');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
