const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings for a user
router.get('/user/:userId', bookingController.getBookingsByUser);

// Get all bookings (admin only)
router.get('/', bookingController.getAllBookings);

// Cancel a booking
router.delete('/:bookingId', bookingController.cancelBooking);

module.exports = router; 