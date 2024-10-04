import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation } from 'react-router-dom'; // Import useLocation

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Get the current location

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const Links = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Notifications", link: "/notification" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black bg-red'>
      <h1 className='text-3xl font-bold text-[#FF8343]'>Finance Management</h1>

      {isAuthenticated ? (
        <>
          <ul className='hidden text-gray-600 cursor-pointer md:flex'>
            {Links.map((link) => (
              <li key={link.name} className='mx-4'>
                <a
                  href={link.link}
                  className={`p-4 hover:text-[#FF8343] ${location.pathname === link.link ? 'text-[#FF8343]' : ''}`} // Highlight active link
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div onClick={handleNav} className='block cursor-pointer md:hidden'>
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
          <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-200 bg-white ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#FF8343] m-4'>Finance Management</h1>
            {Links.map((link) => (
              <li key={link.name} className='p-4 border-b border-gray-200 hover:text-[#FF8343]'>
                <a
                  href={link.link}
                  className={location.pathname === link.link ? 'text-[#FF8343]' : ''} // Highlight active link
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='flex ml-auto space-x-2 md:space-x-4'>
          <a href="/login" className="border border-[#FF8343] text-[#FF8343] py-1.5 md:py-2 px-2 md:px-4 rounded-3xl text-xs md:text-base font-sans">
            LOG IN
          </a>
          <a href="/register" className="border border-[#FF8343] bg-[#FF8343] text-white py-3 md:py-2 px-2 md:px-4 rounded-3xl text-xs md:text-base font-sans">
            SIGN UP
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
