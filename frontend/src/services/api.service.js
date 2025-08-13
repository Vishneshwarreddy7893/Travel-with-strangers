/**
 * API Service
 * Centralized service for making API calls using axios
 */

import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api.config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  // Auth services
  auth: {
    login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
    googleAuth: (data) => apiClient.post(API_ENDPOINTS.AUTH.GOOGLE, data),
    getAllUsers: () => apiClient.get(API_ENDPOINTS.AUTH.BASE),
    getUser: (userId) => apiClient.get(API_ENDPOINTS.AUTH.USER(userId)),
    updateUser: (userId, userData) => apiClient.put(API_ENDPOINTS.AUTH.USER(userId), userData),
  },
  
  // Trip services
  trips: {
    getAllTrips: () => apiClient.get(API_ENDPOINTS.TRIPS.BASE),
    getTrip: (tripId) => apiClient.get(API_ENDPOINTS.TRIPS.GET_TRIP(tripId)),
    createTrip: (tripData) => apiClient.post(API_ENDPOINTS.TRIPS.BASE, tripData),
    updateTrip: (tripId, tripData) => apiClient.put(API_ENDPOINTS.TRIPS.GET_TRIP(tripId), tripData),
    deleteTrip: (tripId) => apiClient.delete(API_ENDPOINTS.TRIPS.GET_TRIP(tripId)),
  },
  
  // Booking services
  bookings: {
    getAllBookings: () => apiClient.get(API_ENDPOINTS.BOOKINGS.BASE),
    getUserBookings: (userId) => apiClient.get(API_ENDPOINTS.BOOKINGS.USER_BOOKINGS(userId)),
    createBooking: (bookingData) => apiClient.post(API_ENDPOINTS.BOOKINGS.BASE, bookingData),
    deleteBooking: (bookingId) => apiClient.delete(API_ENDPOINTS.BOOKINGS.BOOKING(bookingId)),
  },
  
  // Home services
  home: {
    getHomeData: () => apiClient.get(API_ENDPOINTS.HOME.BASE),
  },
};

export default apiService;