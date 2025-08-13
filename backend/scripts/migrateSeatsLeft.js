const mongoose = require('mongoose');
const Trip = require('../models/Trip');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travelbuddy';

async function migrate() {
  await mongoose.connect(MONGO_URI);
  const trips = await Trip.find({ seatsLeft: { $exists: false }, totalSeats: { $exists: true } });
  for (const trip of trips) {
    trip.seatsLeft = trip.totalSeats;
    await trip.save();
    console.log(`Updated trip ${trip._id}: seatsLeft set to ${trip.totalSeats}`);
  }
  console.log('Migration complete');
  process.exit();
}

migrate().catch(err => { console.error(err); process.exit(1); }); 