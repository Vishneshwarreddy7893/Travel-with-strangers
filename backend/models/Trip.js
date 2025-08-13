const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  morning: String,
  afternoon: String,
  evening: String,
  accommodation: String,
}, { _id: false });

const expensesSchema = new mongoose.Schema({
  transport: String,
  accommodation: String,
  food: String,
  activities: String,
  service: String,
  profit: String,
}, { _id: false });

const tripSchema = new mongoose.Schema({
  imageUrl: { type: String },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  groupType: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  itinerary: [itineraryDaySchema],
  expenses: expensesSchema,
  vehicleType: String,
  totalSeats: { type: Number },
  seatsLeft: { type: Number },
  vehicleFeatures: String,
  vehicleNumber: String,
  busDepartureTime: String,
  busDepartureStop: String,
  driver: String,
  route: String,
  busDriverName: String,
  busDriverExperience: String,
  busDriverContact: String,
  hotelName: String,
  hotelCategory: String,
  roomType: String,
  hotelAddress: String,
  placesVisiting: String,
}, { timestamps: true });

tripSchema.pre('save', function(next) {
  if (typeof this.totalSeats === 'number' && (typeof this.seatsLeft !== 'number' || this.seatsLeft > this.totalSeats)) {
    this.seatsLeft = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Trip', tripSchema); 