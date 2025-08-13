const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// Create a new booking and decrement seats
exports.createBooking = async (req, res) => {
  try {
    const { user, trip, paymentInfo, seatNumber } = req.body;
    // Prevent duplicate booking for the same user and trip
    const existing = await Booking.findOne({ user, trip });
    if (existing) return res.status(400).json({ message: 'You have already booked this trip.' });
    // Check seatsLeft
    const tripDoc = await Trip.findById(trip);
    if (!tripDoc) return res.status(404).json({ message: 'Trip not found' });
    if (typeof tripDoc.seatsLeft !== 'number' || tripDoc.seatsLeft <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }
    // Check if seat is already booked
    const seatTaken = await Booking.findOne({ trip, seatNumber });
    if (seatTaken) return res.status(400).json({ message: 'Selected seat is already booked.' });
    // Create booking with selected seat
    const booking = new Booking({ user, trip, paymentInfo, seatNumber });
    await booking.save();
    // Only decrement seatsLeft after booking is successful
    tripDoc.seatsLeft -= 1;
    await tripDoc.save();
    res.status(201).json({ ...booking.toObject(), seatNumber });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cancel a booking and increment seatsLeft
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    const tripDoc = await Trip.findById(booking.trip);
    if (tripDoc && typeof tripDoc.seatsLeft === 'number') {
      tripDoc.seatsLeft += 1;
      await tripDoc.save();
    }
    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all bookings for a user
exports.getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId }).populate('trip');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('trip');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 