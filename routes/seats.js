const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
let db = require('../db');

router.get('/', (req, res) => {
  res.json({ data: db.seats });
});

module.exports = router;
