import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import TravellerHome from './Pages/Traveller/TravellerHome';
import AllTrips from './Pages/Traveller/AllTrips';
import BookedTrips from './Pages/Traveller/BookedTrips';
import TravellerAccount from './Pages/Traveller/TravellerAccount';
import TravellerGroupChat from './Pages/Traveller/TravellerGroupChat';
import TravellerRegister from './Pages/TravellerRegister';
import AdminRegister from './Pages/AdminRegister';
import AdminHome from './Pages/Admin/AdminHome';
import TripDetails from './Pages/TripDetails';
import Payment from './Pages/Traveller/Payment';


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50" style={{ padding: '1rem', background: 'linear-gradient(90deg, #ff9800, #ff5e62)', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem' }}>
      <span role="img" aria-label="globe">🌍</span> Travel with Strangers
    </nav>
  );
}



function App() {
  return (
    <Router>
            <Navbar />
      <main className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/traveler-register" element={<TravellerRegister />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/traveller-home/*" element={<TravellerHome />} />
          <Route path="/admin-home/*" element={<AdminHome />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/payment/:tripId" element={<Payment />} />
          {/* Other routes will be added here */}
        </Routes>
      </main>

    </Router>
  );
}

export default App;
