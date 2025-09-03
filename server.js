const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/testimonials', (req, res) => {
  res.send('get testimonials');
});

app.get('/testimonials/:id', (req, res) => {
  res.send('get testimonials/id');
});

app.get('/testimonials/random', (req, res) => {
  res.send('get testimonials/random');
});

app.post('/testimonials', (req, res) => {
  res.send('post testimonials');
});

app.put('/testimonials/:id', (req, res) => {
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
