const express = require('express');
const router = express.Router();

const contactRoutes = require('./contactForm');
router.use('/contact', contactRoutes);

module.exports = router;