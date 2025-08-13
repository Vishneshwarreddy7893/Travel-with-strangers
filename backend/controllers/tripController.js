const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const tripData = { ...req.body };
    if (typeof tripData.totalSeats === 'number' && (typeof tripData.seatsLeft !== 'number' || tripData.seatsLeft > tripData.totalSeats)) {
      tripData.seatsLeft = tripData.totalSeats;
    }
    const trip = new Trip(tripData);
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (typeof updateData.totalSeats === 'number' && (typeof updateData.seatsLeft !== 'number' || updateData.seatsLeft > updateData.totalSeats)) {
      updateData.seatsLeft = updateData.totalSeats;
    }
    const trip = await Trip.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}; 