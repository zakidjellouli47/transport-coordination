import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Car, Plus, Search, Bell, User, LogOut, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [tripForm, setTripForm] = useState({
    origin: '',
    destination: '',
    datetime: '',
    seats: '',
    price: '',
    notes: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser({
        id: 1,
        name: 'Abdessamed Zakaria',
        phone: '0794608293',
        email: 'zakidjellouli1997@gmail.com',
        user_type: 'driver'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleTripFormChange = (e) => {
    setTripForm({ ...tripForm, [e.target.name]: e.target.value });
  };

  const handleCreateTrip = () => {
    console.log('Creating trip:', tripForm);
    alert('Trip created successfully!');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isDriver = user.user_type === 'driver';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <Car className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Transport DZ</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.user_type}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>

              {isDriver ? (
                <>
                  <button
                    onClick={() => setActiveTab('my-trips')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'my-trips' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Car className="w-5 h-5" />
                    <span className="font-medium">My Trips</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('create-trip')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'create-trip' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Create Trip</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('search-trips')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'search-trips' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Search Trips</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('my-bookings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'my-bookings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">My Bookings</span>
                  </button>
                </>
              )}

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'home' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-blue-100">
                    {isDriver 
                      ? 'Ready to create a new trip or manage your existing ones?' 
                      : 'Find your next ride and travel comfortably!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Trips</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Car className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">This Month</p>
                        <p className="text-2xl font-bold text-gray-800">8</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Passengers</p>
                        <p className="text-2xl font-bold text-gray-800">142</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                      {isDriver ? 'Your Recent Trips' : 'Available Trips'}
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { from: 'Blida', to: 'Algiers', time: 'Today, 7:00 AM', seats: 3, price: 400 },
                      { from: 'Oran', to: 'Algiers', time: 'Tomorrow, 9:00 AM', seats: 2, price: 800 },
                      { from: 'Constantine', to: 'Setif', time: 'Feb 21, 2:00 PM', seats: 4, price: 300 }
                    ].map((trip, i) => (
                      <div key={i} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-gray-800">{trip.from} → {trip.to}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{trip.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{trip.seats} seats left</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">{trip.price} DA</p>
                            <p className="text-xs text-gray-500">per seat</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            {isDriver ? 'View Details' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={user.phone}
                      readOnly
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full capitalize font-medium">
                      {user.user_type}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'create-trip' && isDriver && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Trip</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From (Origin)</label>
                      <input
                        type="text"
                        name="origin"
                        value={tripForm.origin}
                        onChange={handleTripFormChange}
                        placeholder="e.g., Blida"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To (Destination)</label>
                      <input
                        type="text"
                        name="destination"
                        value={tripForm.destination}
                        onChange={handleTripFormChange}
                        placeholder="e.g., Algiers"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                      <input
                        type="datetime-local"
                        name="datetime"
                        value={tripForm.datetime}
                        onChange={handleTripFormChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
                      <input
                        type="number"
                        name="seats"
                        value={tripForm.seats}
                        onChange={handleTripFormChange}
                        min="1"
                        max="10"
                        placeholder="4"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per Seat (DA)</label>
                    <input
                      type="number"
                      name="price"
                      value={tripForm.price}
                      onChange={handleTripFormChange}
                      placeholder="400"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={tripForm.notes}
                      onChange={handleTripFormChange}
                      rows="3"
                      placeholder="Any special instructions or pickup points..."
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleCreateTrip}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Create Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}