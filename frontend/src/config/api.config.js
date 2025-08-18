/**
 * API Configuration File
 * This file centralizes all API URLs for easier deployment and maintenance
 */

// Base URL for all API calls
// Change this to your production URL when deploying
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://travel-with-strangers.onrender.com/api' // Replace with your actual production URL
  : 'http://localhost:5000/api';

// API endpoints
const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    BASE: `${API_BASE_URL}/auth`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    GOOGLE: `${API_BASE_URL}/auth/google`,
    USER: (userId) => `${API_BASE_URL}/auth/${userId}`,
  },
  
  // Trip endpoints
  TRIPS: {
    BASE: `${API_BASE_URL}/trips`,
    GET_TRIP: (tripId) => `${API_BASE_URL}/trips/${tripId}`,
  },
  
  // Booking endpoints
  BOOKINGS: {
    BASE: `${API_BASE_URL}/bookings`,
    USER_BOOKINGS: (userId) => `${API_BASE_URL}/bookings/user/${userId}`,
    BOOKING: (bookingId) => `${API_BASE_URL}/bookings/${bookingId}`,
  },
  
  // Home endpoints
  HOME: {
    BASE: `${API_BASE_URL}/home`,
  },
};

export { API_BASE_URL, API_ENDPOINTS };