import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FindABuddyMode = () => {
  const [location, setLocation] = useState('');
  const [buddyList, setBuddyList] = useState([]);
  const [matching, setMatching] = useState(false);

  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleFindBuddy = () => {
    // Simulated travel buddy data (within Nagpur)
    const potentialTravelers = [
      { name: 'Joel Jorge', destination: 'Sitabuldi', phone: '9876543210' },
      { name: 'Aisha Khan', destination: 'MIHAN', phone: '9988776655' },
      { name: 'Ravi Mehta', destination: 'Dharampeth', phone: '9123456789' },
    ];

    const matched = potentialTravelers.filter(
      (traveler) => traveler.destination.toLowerCase() === location.toLowerCase()
    );

    setBuddyList(matched);
    setMatching(true);
  };

  return (
    <div className="min-h-screen bg-[rgb(168,213,226)] p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-800">Find-a-Buddy Mode</h1>
          <p className="text-lg text-gray-700">
            Traveling within Nagpur? Choose your area and find others headed there too!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="block text-gray-700 font-semibold">Choose Area in Nagpur</label>
              <select
                value={location}
                onChange={handleLocationChange}
                className="w-full mt-2 p-3 border rounded-lg"
              >
                <option value="">-- Select Destination --</option>
                <option value="Sitabuldi">Sitabuldi</option>
                <option value="MIHAN">MIHAN</option>
                <option value="Dharampeth">Dharampeth</option>
                <option value="Trimurti Nagar">Trimurti Nagar</option>
                <option value="Sadar">Sadar</option>
              </select>
            </div>

            <button
              onClick={handleFindBuddy}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
            >
              Find Travel Buddy
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Travel Buddies</h2>

            {matching && buddyList.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
                <ul className="list-disc list-inside text-gray-700">
                  {buddyList.map((buddy, index) => (
                    <li key={index}>
                      <span className="font-semibold text-blue-700">{buddy.name}</span> is also heading to{' '}
                      <span className="italic">{buddy.destination}</span>. <br />
                      📞 <span className="text-gray-800">{buddy.phone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : matching ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
                No travelers found for that destination. Try another area!
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FindABuddyMode;
