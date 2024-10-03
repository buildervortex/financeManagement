import React from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaDiscord
} from 'react-icons/fa';

const items = [
    { name: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/" },
    { name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/" },
    { name: "Dicord", icon: <FaDiscord />, link: "https://discord.com/" },
  ];
   
const Footer: React.FC = () => {
  return (
    <footer className="w-full max-h-screen py-10 overflow-hidden text-black bg-[#f7f7f7fe]">
      <div className="container px-6 mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-4">
             {/* Company Information */}
          <div>
            <h4 className="mb-4 text-medium  text-gray-700 font-semibold">About Us</h4>
            <p className="text-sm  text-gray-500">
              We are a financial management system that offers a suite of tools and features to help you track expenses, create budgets, manage investments, and make informed financial decisions.             </p>
          </div>
          {/* Navigation Links */}
          <div>
            <h4 className="mb-4 text-medium  text-gray-700 font-semibold">Quick Links</h4>
            <ul>
              <li><a href="/dashboard" className="text-sm  text-gray-500 hover:text-orange-400">Dashboard</a></li>
              <li><a href="/" className="text-sm text-gray-500 hover:text-orange-400">Notifications</a></li>
              <li><a href="/contact" className="text-sm text-gray-500 hover:text-orange-400">FAQ</a></li>
              <li><a href="/contact" className="text-sm text-gray-500 hover:text-orange-400">Contact Us</a></li>

            </ul>
          </div>

          
          <div>
            <ul>
            <h4 className="mb-4 text-medium  text-gray-700 font-semibold">Explore</h4>
            <li><a href="/contact" className="text-sm  text-gray-500 hover:text-orange-400">Analysis</a></li>
            <li><a href="/addIncome" className="text-sm  text-gray-500 hover:text-orange-400">Income Management</a></li>
              <li><a href="/addExpense" className="text-sm   text-gray-500 hover:text-orange-400">Expenses Managment</a></li>
              <li><a href="/addGoal" className="text-sm  text-gray-500 hover:text-orange-400">Goals Managment</a></li>
              
           </ul>
          </div>   
        
          {/* Social Media Links */}
          <div>
            <h4 className="mb-4 text-medium  text-gray-700 font-semibold">Follow Us on</h4>
            <div className="flex space-x-4">
        {items.map((item, index) => (
    <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
      {item.icon}
    </a>
 
    
  ))}
  
  
</div>
</div>
   </div>

        {/* Bottom section */}
        <div className="pt-5 text-center border-t border-gray-300">
          
          <p className="text-sm text-gray-600">© 2024 Finance Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;