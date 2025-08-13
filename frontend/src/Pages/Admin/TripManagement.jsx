import React, { useState } from "react";
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
  // Trip Details
  imageUrl: "",
  destination: "",
  duration: "",
  groupType: "",
  price: "",
  city: "",
  date: "",
  description: "",
  placesVisiting: "",
  // Itinerary
  itinerary: [
    { ...initialItineraryDay }, // Only one day initially
  ],
  // Expenses
  expenses: {
    transport: "",
    accommodation: "",
    food: "",
    activities: "",
    service: "",
    profit: "",
  },
  // Transportation
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
  // Hotels
  hotels: [{ ...initialHotel }],
};

const TripManagement = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle expenses
  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, expenses: { ...prev.expenses, [name]: value } }));
  };

  // Handle itinerary day changes
  const handleItineraryChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newItinerary = prev.itinerary.map((day, i) =>
        i === idx ? { ...day, [name]: value } : day
      );
      return { ...prev, itinerary: newItinerary };
    });
  };

  // Add more itinerary days
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      // Ensure price is a number and all required fields are present
      const payload = {
        ...form,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats),
        busDriverName: form.busDriverName,
        busDriverExperience: form.busDriverExperience,
        busDriverContact: form.busDriverContact,
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
        placesVisiting: form.placesVisiting,
        hotels: form.hotels.map(hotel => ({
          hotelName: hotel.hotelName || "",
          hotelCategory: hotel.hotelCategory || "",
          roomType: hotel.roomType || "",
          hotelAddress: hotel.hotelAddress || "",
        })),
      };
      const res = await apiService.trips.createTrip(payload);
      setSuccess("Trip Package Created Successfully!");
      setForm(initialForm);
    } catch (err) {
      console.log("Trip creation error:", err, err.response?.data);
      setError(err.response?.data?.message || "Failed to create trip package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 min-h-screen h-screen bg-gray-50 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Trip Management</h1>
      <div className="bg-white rounded-xl shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {success && <div className="text-green-600 font-semibold mb-2">{success}</div>}
          {error && <div className="text-red-500 font-semibold mb-2">{error}</div>}
          {/* Trip Details */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-blue-800">Create New Trip Package</h2>
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
            <h2 className="text-xl font-bold mb-4 text-blue-800">Day-wise Itinerary Planning</h2>
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
            <h2 className="text-xl font-bold mb-4 text-blue-800">Expense Breakdown</h2>
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
            <h2 className="text-xl font-bold mb-4 text-blue-800">Transportation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-semibold">Vehicle Type</label>
                <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300">
                  <option value="">Select Vehicle</option>
                  <option>Bus</option>
                  <option>Mini Bus</option>
                  <option>Van</option>
                  <option>Car</option>
                </select>
              </div>
              <div>
                <label className="font-semibold">Total Seats</label>
                <input name="totalSeats" value={form.totalSeats} onChange={handleChange} placeholder="e.g., 28" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" type="number" min="1" />
              </div>
              <div>
                <label className="font-semibold">Vehicle Features</label>
                <textarea name="vehicleFeatures" value={form.vehicleFeatures} onChange={handleChange} placeholder="e.g., AC, reclining seats, charging points" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Vehicle Number</label>
                <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="e.g., MH12AB1234" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Bus Departure Time</label>
                <input name="busDepartureTime" value={form.busDepartureTime} onChange={handleChange} placeholder="e.g., 7:00 AM" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Bus Departure Stop/City</label>
                <input name="busDepartureStop" value={form.busDepartureStop} onChange={handleChange} placeholder="e.g., Dadar Bus Stand, Mumbai" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Route Information</label>
                <input name="route" value={form.route} onChange={handleChange} placeholder="e.g., Mumbai to Goa via NH66" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Bus Driver Name</label>
                <input name="busDriverName" value={form.busDriverName} onChange={handleChange} placeholder="e.g., John Doe" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Bus Driver Experience</label>
                <input name="busDriverExperience" value={form.busDriverExperience} onChange={handleChange} placeholder="e.g., 10 years" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold">Bus Driver Contact</label>
                <input name="busDriverContact" value={form.busDriverContact} onChange={handleChange} placeholder="e.g., 9876543210" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300" />
              </div>
            </div>
          </section>

          {/* Hotel & Accommodation */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-blue-800">Hotel & Accommodation</h2>
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

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-4 rounded-full text-lg shadow-lg transition" disabled={loading}>
              {loading ? "Creating..." : "Create Trip Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripManagement;