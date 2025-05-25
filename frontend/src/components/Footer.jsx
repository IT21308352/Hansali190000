import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-darkblack text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Column 1: Logo and Social Icons */}
          <div className="w-full mb-6 sm:mb-0 ms-10">
            <img src="/logo.png" alt="Logo" className="w-16 mb-4" />
            <h4 className="text-2xl font-bold">Rice Variety Prediction</h4>
            <p className="mt-2 text-gray-400">
              Our vision is to provide accurate predictions for rice varieties
              to help farmers and researchers.
            </p>
            <div className="flex mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-darkgreen">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkgreen">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkgreen">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkgreen">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkgreen">
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="w-full mb-6 sm:mb-0 ms-20">
            <h4 className="text-xl font-semibold">Solutions</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Prediction Tool
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Data Analysis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="w-full mb-6 sm:mb-0 ms-16">
            <h4 className="text-xl font-semibold">Support</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="w-auto mb-6 sm:mb-0 ms-16">
            <h4 className="text-xl font-semibold">Company</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-darkgreen transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Rice Variety Prediction. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
