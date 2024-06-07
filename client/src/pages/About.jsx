import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">About Our Crowdfunding Platform</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              We are committed to empowering individuals and communities to bring their innovative ideas to life through crowdfunding.
            </p>
          </div>
          <div className="w-full sm:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where anyone with a great idea can easily access the resources and support they need to make it a reality.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Contact Us</h3>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <li className="flex items-center">
              <FaEnvelope className="w-6 h-6 mr-2 text-gray-600" />
              <span className="text-gray-700">support@crowdfundingplatform.com</span>
            </li>
            <li className="flex items-center">
              <FaPhone className="w-6 h-6 mr-2 text-gray-600" />
              <span className="text-gray-700">+91 6304792049</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="w-6 h-6 mr-2 text-gray-600" />
              <span className="text-gray-700">SRMAP University, Amaravati</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
