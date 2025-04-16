import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GroupBookingSplitPay = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const [groupMembers, setGroupMembers] = useState(['']);
  const [paymentLinks, setPaymentLinks] = useState([]);

  const handleAddMember = () => {
    setGroupMembers([...groupMembers, '']);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = groupMembers.map((member, i) => 
      i === index ? e.target.value : member
    );
    setGroupMembers(updatedMembers);
  };

  const handleGeneratePaymentLinks = () => {
    const shareableLinks = groupMembers.map((member, index) => {
      return `https://paymentgateway.com/pay/${index + 1}?amount=${(totalAmount / groupMembers.length).toFixed(2)}`;
    });
    setPaymentLinks(shareableLinks);
  };

  return (
    <div className="min-h-screen bg-[rgb(168,213,226)] p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-800">
            Group Booking Split-Pay
          </h1>
          <p className="text-lg text-gray-700">
            Split the bill with your friends and generate shareable payment links.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full space-y-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="block text-gray-700 font-semibold">Total Amount</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg"
                placeholder="Enter total amount"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Group Members</h3>
              {groupMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(e, index)}
                    className="w-full p-3 border rounded-lg"
                    placeholder={`Member ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Add Member
              </button>
            </div>

            <button
              onClick={handleGeneratePaymentLinks}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
            >
              Generate Payment Links
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Payment Links</h2>
            {paymentLinks.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul>
                  {paymentLinks.map((link, index) => (
                    <li key={index} className="text-blue-600">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        Payment Link for Member {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GroupBookingSplitPay;
