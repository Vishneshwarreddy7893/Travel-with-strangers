# Travel with Strangers 🌍

**A MERN Stack platform where solo travelers can join group trips with strangers, ensuring no one travels alone while making new friends and connections.**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## 🎯 About The Project

**Travel with Strangers** solves the common problem: *"I want to travel, but my friends can't come."* 

Instead of canceling your travel plans, our platform connects solo travelers with like-minded strangers for group trips. Choose between intimate small groups (6-10 people in Sumo/Van) or social large groups (25-30 people in Travel Bus) for unforgettable experiences.

### The Problem We Solve
- You want to travel and explore new places
- Your friends say "We can't come" or "We don't have time"
- You're left with: travel alone or don't travel at all
- Many people cancel travel plans because they don't want to go solo

### Our Solution
A platform where solo travelers can join all-inclusive group trips with complete strangers, ensuring:
- ✅ No one travels alone
- ✅ Make new friends and connections
- ✅ Hassle-free experience (transport + stay + food included)
- ✅ Choose your group size preference

## ✨ Features

### 🧑‍🤝‍🧑 For Users
- **Destination Selection** - Browse popular travel destinations
- **Group Size Preference** - Choose small (6-10) or large (25-30) groups
- **All-Inclusive Packages** - One payment covers transport, stay, and meals
- **Real-Time Availability** - See live seat availability
- **Profile System** - Share interests and travel preferences
- **Trip History** - Track past and upcoming adventures
- **Review System** - Rate experiences and fellow travelers

### 🔧 For Administrators
- **Package Management** - Create and manage trip packages
- **Booking Dashboard** - Track bookings, payments, and analytics
- **Trip Coordination** - Manage departures and logistics
- **User Management** - Handle accounts and profiles

## 🛠️ Tech Stack

**Frontend:**
- React.js (UI Library)
- Material-UI (Component Library)
- React Router (Navigation)
- Axios (HTTP Client)
- Socket.io-client (Real-time communication)

**Backend:**
- Node.js (Runtime)
- Express.js (Framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Socket.io (Real-time features)

**Tools & Services:**
- Cloudinary (Image hosting)
- Nodemailer (Email service)
- Postman (API testing)
- Git (Version control)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travel-with-strangers.git
cd travel-with-strangers
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Environment Setup

1. **Backend Environment Variables**
Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/travel-with-strangers

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Payment Gateway
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Cloud Storage
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

2. **Frontend Environment Variables**
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

3. **Database Setup**
```bash
# Start MongoDB service
sudo service mongod start

# Or if using MongoDB Atlas, update MONGODB_URI with your connection string
```

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
Server will start at `http://localhost:5000`

2. **Start the Frontend Application**
```bash
cd frontend
npm start
```
Application will open at `http://localhost:3000`

3. **Access the Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Database:** MongoDB running on localhost:27017


## 🎮 Usage

### For Regular Users

1. **Registration & Login**
   - Create account with email and password
   - Verify email and complete profile

2. **Browse Packages**
   - Choose between Small Groups (6-10 people) or Large Groups (25-30 people)
   - Filter by destination, dates, and price range

3. **Book a Trip**
   - Select preferred package
   - Make payment (covers everything - transport, stay, meals)
   - Join group chat with fellow travelers

4. **Travel Experience**
   - Meet group on departure day
   - Enjoy hassle-free travel experience
   - Make new friends and connections

### For Administrators

1. **Package Management**
   - Create new travel packages
   - Set pricing, itineraries, and inclusions
   - Upload destination images

2. **Booking Management**
   - Monitor bookings and payments
   - Coordinate trip logistics
   - Handle customer support

## 📱 Screenshots

### Homepage
<img width="1896" height="818" alt="image" src="https://github.com/user-attachments/assets/978d3995-95de-41a5-95f2-92fc13dfc450" />

<img width="1882" height="777" alt="image" src="https://github.com/user-attachments/assets/084e0811-3973-419e-a4f0-093e5dddd28f" />


### Packages Visible
<img width="1710" height="815" alt="image" src="https://github.com/user-attachments/assets/f430871f-929e-4f05-a0c5-61d26464932e" />
<img width="1858" height="697" alt="image" src="https://github.com/user-attachments/assets/d106bb0e-a782-400a-a065-c577faed10e4" />

### Bookings Process

<img width="1850" height="808" alt="image" src="https://github.com/user-attachments/assets/dbc2dba9-a80e-4413-a9f4-1bafad8eb15f" />
<img width="552" height="851" alt="image" src="https://github.com/user-attachments/assets/6062bff8-8ebe-4575-a238-e1dfdca5cb19" />


## 🏗️ Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Build frontend
cd frontend
npm run build

# The build folder will contain optimized production files
```

### Database Seeding
```bash
# Seed database with sample data
cd backend
npm run seed
```

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run seed` - Seed database with sample data

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to Branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Test thoroughly before submitting PR



## 🔮 Future Enhancements

- [ ] International destinations
- [ ] Corporate team building packages
- [ ] AI-based traveler matching
- [ ] VR destination previews
- [ ] Loyalty program and rewards
- [ ] Multi-language support
- [ ] Advanced trip customization
- [ ] Integration with social media platforms


## 📞 Contact

**Project Maintainer:** Vishneshwar Reddy Nandyala
**Email:** vishneshwarreddynandyala@gmail.com   

## 🙏 Acknowledgments

- [React.js Documentation](https://reactjs.org/docs)
- [Node.js Community](https://nodejs.org/en/community/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material-UI Components](https://mui.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- Travel industry inspiration from platforms like Contiki Tours and G Adventures
