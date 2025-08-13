const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/home', require('./routes/home'));
app.use('/api/trips', require('./routes/trip'));
app.use('/api/bookings', require('./routes/booking'));

// Connect to MongoDB Atlas with SSL fix
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'TravelBuddy',
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: true, // Try this for SSL issues
      tlsAllowInvalidHostnames: true,    // Try this for SSL issues
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('📊 Database: TravelBuddy');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('🔧 Trying alternative connection method...');
    
    // Alternative connection method
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'TravelBuddy',
        retryWrites: true,
        w: 'majority',
        ssl: false, // Try without SSL
        tls: false, // Try without TLS
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB Atlas connected with alternative method!');
    } catch (altError) {
      console.error('❌ Alternative connection also failed:', altError.message);
      console.log('🔧 Please check your connection string and network settings');
    }
  }
};

connectDB();

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));