const express = require('express');
const cors = require('cors');
const app = express();
const testimonialsRoutes = require('./routes/testimonials');
const concertsRoutes = require('./routes/concerts');
const seatsRoutes = require('./routes/seats');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
