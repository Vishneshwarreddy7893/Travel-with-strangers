// Migration script to update all existing trips with new fields
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

const MONGO_URI = 'mongodb://localhost:27017/travelbuddy'; // Update if needed

async function migrateTrips() {
  await mongoose.connect(MONGO_URI);
  const trips = await Trip.find();
  for (const trip of trips) {
    let updated = false;
    if (trip.busDriverName === undefined) {
      trip.busDriverName = '';
      updated = true;
    }
    if (trip.busDriverContact === undefined) {
      trip.busDriverContact = '';
      updated = true;
    }
    if (trip.busDriverExperience === undefined) {
      trip.busDriverExperience = '';
      updated = true;
    }
    if (trip.totalSeats === undefined) {
      trip.totalSeats = 0;
      updated = true;
    }
    if (trip.placesVisiting === undefined) {
      trip.placesVisiting = '';
      updated = true;
    }
    if (updated) {
      await trip.save();
      console.log(`Updated trip: ${trip._id}`);
    }
  }
  await mongoose.disconnect();
  console.log('Migration complete.');
}

migrateTrips().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 