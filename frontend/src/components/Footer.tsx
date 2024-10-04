import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaDiscord } from 'react-icons/fa';

const socialItems = [
  { name: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/" },
  { name: "Discord", icon: <FaDiscord />, link: "https://discord.com/" },
];

const Footer = () => {
  return (
    <footer className="w-full py-10 text-black bg-[#f7f7f7fe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">About Us</h4>
            <p className="text-sm text-gray-500">
              We are a financial management system that offers a suite of tools and features to help you track expenses, create budgets, manage investments, and make informed financial decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Quick Links</h4>
            <ul className="space-y-2">
              {["Dashboard", "Notifications", "FAQ", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 hover:text-orange-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Explore</h4>
            <ul className="space-y-2">
              {["Analysis", "Income Management", "Expenses Management", "Goals Management"].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 hover:text-orange-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Follow Us on</h4>
            <div className="flex space-x-4">
              {socialItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-400 transition-colors duration-300"
                >
                  {React.cloneElement(item.icon, { size: 24 })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Finance Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;