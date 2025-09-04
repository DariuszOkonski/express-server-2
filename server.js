const express = require('express');
const app = express();
const testimonialsRoutes = require('./routes/testimonials');
const concertsRoutes = require('./routes/concerts');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// Routes
app.use('/testimonials', testimonialsRoutes);
app.use('/concerts', concertsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
