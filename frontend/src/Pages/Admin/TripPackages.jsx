import React, { useState, useEffect } from "react";
import apiService from "../../services/api.service";

const initialItineraryDay = {
  morning: "",
  afternoon: "",
  evening: "",
  accommodation: "",
};

const initialHotel = {
  hotelName: "",
  hotelCategory: "",
  roomType: "",
  hotelAddress: "",
};

const initialForm = {
  imageUrl: "",
  destination: "",
  duration: "",
  groupType: "",
  price: "",
  city: "",
  date: "",
  description: "",
  placesVisiting: "",
  itinerary: [
    { ...initialItineraryDay },
  ],
  expenses: {
    transport: "",
    accommodation: "",
    food: "",
    activities: "",
    service: "",
    profit: "",
  },
  vehicleType: "",
  totalSeats: "",
  vehicleFeatures: "",
  vehicleNumber: "",
  busDepartureTime: "",
  busDepartureStop: "",
  route: "",
  busDriverName: "",
  busDriverExperience: "",
  busDriverContact: "",
  hotels: [{ ...initialHotel }],
};

const TripPackages = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [groupType, setGroupType] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiService.trips.getAllTrips();
      setTrips(res.data);
    } catch (err) {
      setError("Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (trip) => {
    setEditTrip(trip);
    setForm({
      ...trip,
      price: trip.price?.toString() || "",
      totalSeats: trip.totalSeats?.toString() || "",
      busDriverName: trip.busDriverName || "",
      busDriverExperience: trip.busDriverExperience || "",
      busDriverContact: trip.busDriverContact || "",
      vehicleNumber: trip.vehicleNumber || "",
      busDepartureTime: trip.busDepartureTime || "",
      busDepartureStop: trip.busDepartureStop || "",
      placesVisiting: trip.placesVisiting || "",
      itinerary: trip.itinerary && trip.itinerary.length > 0 ? trip.itinerary : [{ ...initialItineraryDay }],
      expenses: trip.expenses || { ...initialForm.expenses },
      hotels: trip.hotels || [{ ...initialHotel }],
    });
    setFormError("");
    setFormSuccess("");
    setShowModal(true);
  };

  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip package? This action cannot be undone.")) return;
    try {
      await apiService.trips.deleteTrip(tripId);
      setTrips(trips.filter((t) => t._id !== tripId));
    } catch (err) {
      alert("Failed to delete trip.");
    }
  };

  // Form handlers for modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, expenses: { ...prev.expenses, [name]: value } }));
  };
  const handleItineraryChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newItinerary = prev.itinerary.map((day, i) =>
        i === idx ? { ...day, [name]: value } : day
      );
      return { ...prev, itinerary: newItinerary };
    });
  };
  const addItineraryDay = () => {
    setForm((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { ...initialItineraryDay }],
    }));
  };

  const handleHotelChange = (idx, e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newHotels = prev.hotels.map((hotel, i) =>
        i === idx ? { ...hotel, [name]: value } : hotel
      );
      return { ...prev, hotels: newHotels };
    });
  };

  const addHotel = () => {
    setForm(prev => ({
      ...prev,
      hotels: [...prev.hotels, { ...initialHotel }],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats),
        placesVisiting: form.placesVisiting,
        itinerary: form.itinerary.map(day => ({
          morning: day.morning || "",
          afternoon: day.afternoon || "",
          evening: day.evening || "",
          accommodation: day.accommodation || "",
        })),
        expenses: {
          transport: form.expenses.transport || "",
          accommodation: form.expenses.accommodation || "",
          food: form.expenses.food || "",
          activities: form.expenses.activities || "",
          service: form.expenses.service || "",
          profit: form.expenses.profit || "",
        },
        hotels: form.hotels.map(hotel => ({
          hotelName: hotel.hotelName || "",
          hotelCategory: hotel.hotelCategory || "",
          roomType: hotel.roomType || "",
          hotelAddress: hotel.hotelAddress || "",
        })),
      };
      await apiService.trips.updateTrip(editTrip._id, payload);
      setFormSuccess("Trip updated successfully!");
      setShowModal(false);
      fetchTrips();
    } catch (err) {
      setFormError("Failed to update trip.");
    } finally {
      setFormLoading(false);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    return (
      trip.destination.toLowerCase().includes(search.toLowerCase()) &&
      (groupType ? trip.groupType === groupType : true) &&
      (status ? (trip.status === status) : true)
    );
  });

  return (
    <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-blue-900">Trip Packages</h1>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          >
            <option value="">All Groups</option>
            <option value="Small Group (4-8)">Small Group</option>
            <option value="Large Group (9-20)">Large Group</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-lg text-gray-600">Loading trips...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src={trip.imageUrl} alt={trip.destination} className="h-40 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-blue-800">{trip.destination}</h2>
                <div className="mb-2 text-gray-700">Group: <span className="font-semibold">{trip.groupType}</span></div>
                <div className="mb-2 text-gray-700">Price: <span className="font-semibold">₹{trip.price}</span></div>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700`}>
                    Active
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg flex-1" onClick={() => handleEdit(trip)}>Manage</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg flex-1" onClick={() => handleDelete(trip._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Trip Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.7)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh] relative">
            <button className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>&times;</button>
            <form onSubmit={handleUpdate} className="space-y-10">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Update Trip Package</h2>
              {formSuccess && <div className="text-green-600 font-semibold mb-2">{formSuccess}</div>}
              {formError && <div className="text-red-500 font-semibold mb-2">{formError}</div>}
              {/* Trip Details */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold">Image URL</label>
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="e.g., https://..." className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label className="font-semibold">Destination Name</label>
                    <input name="destination" value={form.destination} onChange={handleChange} required placeholder="e.g., Goa Beach Paradise" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label className="font-semibold">Trip Duration</label>
                    <select name="duration" value={form.duration} onChange={handleChange} required className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Select Duration</option>
                      <option>2 Days / 1 Night</option>
                      <option>3 Days / 2 Nights</option>
                      <option>5 Days / 4 Nights</option>
                      <option>7 Days / 6 Nights</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold">Group Type</label>
                    <select name="groupType" value={form.groupType} onChange={handleChange} required className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Select Group Size</option>
                      <option>Small Group (4-8)</option>
                      <option>Large Group (9-20)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold">Total Package Price</label>
                    <input name="price" value={form.price} onChange={handleChange} required placeholder="e.g., 8999" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  </div>
                  <div>
                    <label className="font-semibold">Departure City</label>
                    <select name="city" value={form.city} onChange={handleChange} required className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Select City</option>
                          <option>Mumbai</option>
                          <option>Delhi</option>
                          <option>Bangalore</option>
                          <option>Hyderabad</option>
                          <option>Vijayawada</option>
                          <option>Guntur</option>
                          <option>Chennai</option>
                          <option>Tirupathi</option>
                          <option>Kurnool</option>
                          <option>Kadapa</option>
                          <option>Vizag</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold">Departure Date</label>
                    <input name="date" value={form.date} onChange={handleChange} required placeholder="dd-mm-yyyy" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="date" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-semibold">Trip Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Brief description of the trip..." className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" rows={2} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-semibold">Places Visiting</label>
                    <input name="placesVisiting" value={form.placesVisiting} onChange={handleChange} placeholder="e.g., Baga Beach, Fort Aguada, Calangute" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                </div>
              </section>
              {/* Day-wise Itinerary */}
              <section>
                <h2 className="text-lg font-bold mb-2 text-blue-800">Day-wise Itinerary Planning</h2>
                {form.itinerary.map((day, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-blue-700 mb-2">Day {idx + 1} Planning</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label>Morning Activity</label>
                        <input name="morning" value={day.morning} onChange={(e) => handleItineraryChange(idx, e)} placeholder="e.g., Departure from Mumbai" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label>Afternoon Activity</label>
                        <input name="afternoon" value={day.afternoon} onChange={(e) => handleItineraryChange(idx, e)} placeholder="e.g., Arrival and check-in" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label>Evening Activity</label>
                        <input name="evening" value={day.evening} onChange={(e) => handleItineraryChange(idx, e)} placeholder="e.g., Welcome dinner" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                      </div>
                      <div>
                        <label>Accommodation</label>
                        <input name="accommodation" value={day.accommodation} onChange={(e) => handleItineraryChange(idx, e)} placeholder="e.g., Beach Resort Goa" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addItineraryDay} className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-full mt-2">Add More Days</button>
              </section>
              {/* Expense Breakdown */}
              <section>
                <h2 className="text-lg font-bold mb-2 text-blue-800">Expense Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-6">
                  <input name="transport" value={form.expenses.transport} onChange={handleExpenseChange} placeholder="Transportation Cost (e.g., 2500)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  <input name="accommodation" value={form.expenses.accommodation} onChange={handleExpenseChange} placeholder="Accommodation Cost (e.g., 3000)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  <input name="food" value={form.expenses.food} onChange={handleExpenseChange} placeholder="Food & Meals Cost (e.g., 1800)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  <input name="activities" value={form.expenses.activities} onChange={handleExpenseChange} placeholder="Activities & Sightseeing (e.g., 1200)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  <input name="service" value={form.expenses.service} onChange={handleExpenseChange} placeholder="Service & Coordination Fee (e.g., 499)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                  <input name="profit" value={form.expenses.profit} onChange={handleExpenseChange} placeholder="Profit Margin (%) (e.g., 15)" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="0" />
                </div>
              </section>
              {/* Transportation Details */}
              <section>
                <h2 className="text-lg font-bold mb-2 text-blue-800">Transportation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label>Vehicle Type</label>
                    <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Select Vehicle</option>
                      <option>Bus</option>
                      <option>Mini Bus</option>
                      <option>Van</option>
                      <option>Car</option>
                    </select>
                  </div>
                  <div>
                    <label>Total Seats</label>
                    <input name="totalSeats" value={form.totalSeats} onChange={handleChange} placeholder="e.g., 28" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="1" />
                  </div>
                  <div>
                    <label>Vehicle Features</label>
                    <textarea name="vehicleFeatures" value={form.vehicleFeatures} onChange={handleChange} placeholder="e.g., AC, reclining seats, charging points" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Vehicle Number</label>
                    <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="e.g., MH12AB1234" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Bus Departure Time</label>
                    <input name="busDepartureTime" value={form.busDepartureTime} onChange={handleChange} placeholder="e.g., 7:00 AM" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Bus Departure Stop/City</label>
                    <input name="busDepartureStop" value={form.busDepartureStop} onChange={handleChange} placeholder="e.g., Dadar Bus Stand, Mumbai" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Route Information</label>
                    <input name="route" value={form.route} onChange={handleChange} placeholder="e.g., Mumbai to Goa via NH66" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Bus Driver Name</label>
                    <input name="busDriverName" value={form.busDriverName} onChange={handleChange} placeholder="e.g., John Doe" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Bus Driver Experience</label>
                    <input name="busDriverExperience" value={form.busDriverExperience} onChange={handleChange} placeholder="e.g., 10 years" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                  <div>
                    <label>Bus Driver Contact</label>
                    <input name="busDriverContact" value={form.busDriverContact} onChange={handleChange} placeholder="e.g., 9876543210" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                  </div>
                </div>
              </section>
              {/* Hotel & Accommodation */}
              <section>
                <h2 className="text-lg font-bold mb-2 text-blue-800">Hotel & Accommodation</h2>
                {form.hotels.map((hotel, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label>Hotel Name</label>
                      <input name="hotelName" value={hotel.hotelName} onChange={e => handleHotelChange(idx, e)} placeholder="e.g., Beach Resort Goa" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
                    </div>
                    <div>
                      <label>Hotel Category</label>
                      <select name="hotelCategory" value={hotel.hotelCategory} onChange={e => handleHotelChange(idx, e)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                        <option value="">Select Category</option>
                        <option>3 Star</option>
                        <option>4 Star</option>
                        <option>5 Star</option>
                        <option>Resort</option>
                      </select>
                    </div>
                    <div>
                      <label>Room Type</label>
                      <select name="roomType" value={hotel.roomType} onChange={e => handleHotelChange(idx, e)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                        <option value="">Select Room Type</option>
                        <option>Standard</option>
                        <option>Deluxe</option>
                        <option>Suite</option>
                        <option>Dormitory</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label>Hotel Address</label>
                      <textarea name="hotelAddress" value={hotel.hotelAddress} onChange={e => handleHotelChange(idx, e)} placeholder="Complete hotel address" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" rows={2} />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addHotel} className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-full mt-2">Add More Hotels</button>
              </section>
              {/* Update Button */}
              <div className="pt-4">
                <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-bold py-4 rounded-full text-lg shadow-lg transition" disabled={formLoading}>
                  {formLoading ? "Updating..." : "Update Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPackages;