import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const Links = [
    { name: "Dashboard", link: "/" },
    { name: "Profile", link: "/" },
    { name: "Contact & FAQ", link: "/" },
  ];

  return (
    <div className='flex  justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black bg-red'>
      <h1 className='text-3xl font-bold text-[#FF8343]'>Finance Management</h1>
      <ul className='hidden text-gray-600 cursor-pointer md:flex'>
        {Links.map((link) => (
          <li key={link.name} className='mx-4'>
            <a href={link.link} className='p-4 hover:text-[#FF8343]'>{link.name}</a>
          </li>
        ))}
      </ul>
      <div onClick={handleNav} className='block cursor-pointer md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-200 bg-white ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#FF8343] m-4'>Finance Management</h1>
        <li className='p-4 border-b border-gray-200 hover:text-[#FF8343]'><a href='/'>Dashboard</a></li>
        <li className='p-4 border-b border-gray-200 hover:text-[#FF8343]'><a href='/'>Profile</a></li>
        <li className='p-4 hover:text-[#FF8343]'><a href='/'>Contact & FAQ</a></li>
      </ul>
      {/* <button className='mx-4 border border-[#FF8343] text-[#FF8343] py-2 px-4 rounded-3xl text-sm'>LOG IN</button>
      <button className='mx-4 border border-[#FF8343] bg-[#FF8343] text-white py-2 px-4 rounded-3xl text-sm'>SIGN UP</button> */}
    </div>
  );
};

export default NavBar;