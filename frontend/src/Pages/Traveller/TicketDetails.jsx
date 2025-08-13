import React from "react";

const TicketDetails = ({ booking, onClose }) => {
  const trip = booking.trip || {};
  
  const handleDownloadTicket = () => {
    // Create a properly formatted HTML document that can be converted to PDF
    const ticketHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Travel Buddy Ticket</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #333;
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0 0 15px 0;
            font-size: 28px;
            font-weight: bold;
          }
          .header p {
            margin: 5px 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .section {
            margin-bottom: 25px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .section-title {
            background: #f8fafc;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
          }
          .section-content {
            padding: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #374151;
            min-width: 120px;
          }
          .value {
            color: #111827;
            text-align: right;
          }
          .status {
            color: #059669;
            font-weight: bold;
          }
          .passenger-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .passenger-table th,
          .passenger-table td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
          }
          .passenger-table th {
            background: #f3f4f6;
            font-weight: bold;
            color: #374151;
          }
          .important-info {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
          }
          .important-info h4 {
            margin: 0 0 10px 0;
            color: #92400e;
            font-size: 16px;
          }
          .important-info ul {
            margin: 0;
            padding-left: 20px;
          }
          .important-info li {
            margin: 5px 0;
            color: #78350f;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
            color: #6b7280;
            font-size: 12px;
          }
          @media print {
            body { margin: 0; }
            .header { break-inside: avoid; }
            .section { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Travel Buddy Ticket</h1>
          <p>Present this E-ticket with valid ID at boarding point</p>
          <p>Reporting time: 30 minutes before departure</p>
        </div>

        <div class="section">
          <div class="section-title">Trip Details</div>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-row">
                <span class="label">Destination:</span>
                <span class="value">${trip.destination}</span>
              </div>
              <div class="info-row">
                <span class="label">Duration:</span>
                <span class="value">${trip.duration}</span>
              </div>
              <div class="info-row">
                <span class="label">Group Type:</span>
                <span class="value">${trip.groupType}</span>
              </div>
              <div class="info-row">
                <span class="label">Departure Date:</span>
                <span class="value">${trip.date}</span>
              </div>
              <div class="info-row">
                <span class="label">Departure City:</span>
                <span class="value">${trip.city || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Booking Details</div>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-row">
                <span class="label">Service By:</span>
                <span class="value">Travel Buddy</span>
              </div>
              <div class="info-row">
                <span class="label">From:</span>
                <span class="value">${trip.city || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">To:</span>
                <span class="value">${trip.destination}</span>
              </div>
              <div class="info-row">
                <span class="label">Date of Journey:</span>
                <span class="value">${trip.date}</span>
              </div>
              <div class="info-row">
                <span class="label">Booking ID:</span>
                <span class="value">${booking._id}</span>
              </div>
              <div class="info-row">
                <span class="label">Coach Name:</span>
                <span class="value">Travel Buddy Bus</span>
              </div>
              <div class="info-row">
                <span class="label">Seat No.:</span>
                <span class="value">${booking.seatNumber || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Ticket No:</span>
                <span class="value">${booking._id?.slice(-8) || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Coach Type:</span>
                <span class="value">${trip.groupType}</span>
              </div>
              <div class="info-row">
                <span class="label">Status:</span>
                <span class="value status">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Passenger Details</div>
          <div class="section-content">
            <table class="passenger-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Passenger Name</th>
                  <th>Seat Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>${booking.paymentInfo?.cardholder || 'N/A'}</td>
                  <td>${booking.seatNumber || 'N/A'}</td>
                  <td class="status">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Payment Details</div>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-row">
                <span class="label">Operator Fare:</span>
                <span class="value">₹${booking.paymentInfo?.amount}</span>
              </div>
              <div class="info-row">
                <span class="label">Payment Status:</span>
                <span class="value status">${booking.paymentInfo?.status || 'Paid'}</span>
              </div>
              <div class="info-row">
                <span class="label">Vehicle Number:</span>
                <span class="value">${trip.vehicleNumber || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Places to Visit:</span>
                <span class="value">${trip.placesVisiting || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Pickup Location</div>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${trip.busDepartureStop || 'Main Bus Stand'}</span>
              </div>
              <div class="info-row">
                <span class="label">Address:</span>
                <span class="value">${trip.city || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Pickup Time:</span>
                <span class="value">${trip.busDepartureTime || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Helpline No.:</span>
                <span class="value">9876543210</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Driver Information</div>
          <div class="section-content">
            <div class="info-grid">
              <div class="info-row">
                <span class="label">Driver Name:</span>
                <span class="value">${trip.busDriverName || 'N/A'}</span>
              </div>
              <div class="info-row">
                <span class="label">Driver Contact:</span>
                <span class="value">${trip.busDriverContact || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="important-info">
          <h4>Important Information</h4>
          <ul>
            <li>Please carry a valid ID proof during your journey</li>
            <li>Arrive at the departure point 30 minutes before departure time</li>
            <li>For any queries, contact support at support@travelbuddy.com</li>
            <li>Keep this ticket handy for verification during the trip</li>
          </ul>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} Travel Buddy. All rights reserved.</p>
          <p>www.travelbuddy.com</p>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([ticketHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TravelBuddy_Ticket_${trip.destination}_${booking._id?.slice(-8)}.html`;
    
    // Add click event to trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert('Ticket downloaded successfully! You can open the HTML file in any browser and print it as PDF.');
  };

  const handleEmailTicket = () => {
    const subject = `Travel Buddy Ticket - ${trip.destination}`;
    const body = `
Dear ${booking.paymentInfo?.cardholder || 'Traveler'},

Your Travel Buddy ticket details are as follows:

TRIP DETAILS:
Destination: ${trip.destination}
Duration: ${trip.duration}
Group Type: ${trip.groupType}
Departure Date: ${trip.date}
Departure City: ${trip.city || 'N/A'}

PASSENGER DETAILS:
Passenger Name: ${booking.paymentInfo?.cardholder || 'N/A'}
Seat Number: ${booking.seatNumber || 'N/A'}
Booking ID: ${booking._id}
Status: Confirmed

PAYMENT DETAILS:
Amount Paid: ₹${booking.paymentInfo?.amount}
Payment Status: ${booking.paymentInfo?.status || 'Paid'}

PICKUP DETAILS:
Pickup Location: ${trip.busDepartureStop || 'Main Bus Stand'}
Pickup Time: ${trip.busDepartureTime || 'N/A'}
Helpline: 9876543210

DRIVER DETAILS:
Driver Name: ${trip.busDriverName || 'N/A'}
Driver Contact: ${trip.busDriverContact || 'N/A'}

IMPORTANT INFORMATION:
- Please carry a valid ID proof during your journey
- Arrive at the departure point 30 minutes before departure time
- For any queries, contact support at support@travelbuddy.com

Thank you for choosing Travel Buddy!

Best regards,
Travel Buddy Team
    `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center mb-4">
            <button 
              className="text-white hover:text-gray-200 text-2xl font-bold" 
              onClick={onClose}
            >
              ×
            </button>
            <div className="text-right">
              <button 
                className="bg-white text-blue-600 px-4 py-2 rounded mr-2 font-semibold hover:bg-gray-100 transition-colors"
                onClick={handleDownloadTicket}
              >
                Download Ticket
              </button>
              <button 
                className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
                onClick={handleEmailTicket}
              >
                Email Ticket
              </button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Travel Buddy Ticket</h1>
            <p className="text-blue-100">
              To initiate your travel, please present this E-ticket with a valid photo identification card at the Boarding Point. 
              Failing to do so, you may not be allowed to board the bus. Reporting time is 30 minutes before departure.
            </p>
          </div>
        </div>

        {/* Trip Image and Basic Info */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={trip.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'} 
              alt={trip.destination} 
              className="w-48 h-32 object-cover rounded-lg border" 
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{trip.destination}</h2>
              <p className="text-gray-600 mb-1">{trip.duration} | {trip.groupType}</p>
              <p className="text-gray-600">Departure Date: <span className="font-semibold">{trip.date}</span></p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Service By:</span>
                <span className="text-gray-900">Travel Buddy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">From:</span>
                <span className="text-gray-900">{trip.city || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">To:</span>
                <span className="text-gray-900">{trip.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Date of Journey:</span>
                <span className="text-gray-900">{trip.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Booking ID:</span>
                <span className="text-gray-900 font-mono text-sm">{booking._id}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Coach Name:</span>
                <span className="text-gray-900">Travel Buddy Bus</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Seat No.:</span>
                <span className="text-gray-900 font-bold">{booking.seatNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Ticket No:</span>
                <span className="text-gray-900">{booking._id?.slice(-8) || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Coach Type:</span>
                <span className="text-gray-900">{trip.groupType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-green-600 font-bold">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Pickup Location</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-900">{trip.busDepartureStop || 'Main Bus Stand'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-900">{trip.city || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Pickup Time:</span>
              <span className="text-gray-900">{trip.busDepartureTime || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Helpline No.:</span>
              <span className="text-gray-900">9876543210</span>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Passenger Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Passenger Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Seat Number</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.paymentInfo?.cardholder || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">{booking.seatNumber || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Operator Fare:</span>
                <span className="text-gray-900">₹{booking.paymentInfo?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Payment Status:</span>
                <span className="text-green-600 font-bold">{booking.paymentInfo?.status || 'Paid'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Vehicle Number:</span>
                <span className="text-gray-900">{trip.vehicleNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Places to Visit:</span>
                <span className="text-gray-900">{trip.placesVisiting || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Driver Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Driver Name:</span>
                <span className="text-gray-900">{trip.busDriverName || 'N/A'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Experience:</span>
                <span className="text-gray-900">{trip.busDriverExperience || 'N/A'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Contact:</span>
                <span className="text-gray-900">{trip.busDriverContact || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Cancellation Policy</h3>
          <div className="space-y-2 text-sm">
            <p>• Ticket cancelled between 0 hrs to 8 hrs - 100% deduction</p>
            <p>• Ticket cancelled between 8 hrs to 24 hrs - 50% deduction</p>
            <p>• Ticket cancelled between 24 hrs to 72 hrs - 20% deduction</p>
            <p>• Ticket cancelled between 72 hrs to 720 hrs - 10% deduction</p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• The arrival and departure times mentioned on the ticket are only tentative timings.</p>
            <p>• Passengers are requested to arrive at the Boarding point at least 30 minutes before the scheduled time.</p>
            <p>• Single seat cancellation is not allowed. The entire booking can only be cancelled.</p>
            <p>• In case the bus gets cancelled, the responsibility of service lies with the operator.</p>
            <p>• The management is not responsible for any Loss or Damage for your Valuable items left behind in the bus.</p>
            <p>• For any queries, contact support at support@travelbuddy.com</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Travel Buddy. All rights reserved.</p>
          <p>www.travelbuddy.com</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails; 