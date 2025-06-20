import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => (setOpen(!open));

  return (
    <div className='flex items-center justify-between w-full h-16 md:h-20'>
        <div >
            <Link to='/' className='text-2xl md:text-4xl font-extrabold'>Blabz.</Link>
        </div>
        <div className='md:hidden'>
            <div className='cursor-pointer' onClick={handleClick}>
                {!open ? <IoMenu size={22}/> : <IoClose size={22}/>}
            </div>
            <div className={`w-full h-screen absolute top-16 flex flex-col items-center bg-black/90 justify-center ${open ? "-right-0" : "-right-[100%]"} ease-in-out duration-300 `}>
                <div className='flex flex-col gap-12 text-md font-semibold justify-center items-center'>
                    <Link to='/'>Home</Link>
                    <Link to='/'>Trending</Link>
                    <Link to='/'>Most Popular</Link>
                    <Link to='/'>About</Link>
                    <SignedOut>
                        <Link to='/login'><button className='text-black bg-white px-4 py-2 rounded-md font-semibold cursor-pointer'>Login 👌</button></Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div> 
            </div>
        </div>
        <div className='hidden md:flex gap-4 text-md font-semibold justify-center items-center'>
            <Link to='/'>Home</Link>
            <Link to='/'>Trending</Link>
            <Link to='/'>Most Popular</Link>
            <Link to='/'>About</Link>
            <SignedOut>
                <Link to='/login'><button className='text-black bg-white px-4 py-2 rounded-md font-semibold cursor-pointer'>Login 👌</button></Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar