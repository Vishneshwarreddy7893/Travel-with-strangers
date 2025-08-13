const express = require('express');
const router = express.Router();
const { travelerHome, adminHome } = require('../controllers/homeController');

router.get('/traveler-home', travelerHome);
router.get('/admin-home', adminHome);

module.exports = router; 