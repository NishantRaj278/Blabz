import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

function Categories() {
  return (
    <div className='hidden md:flex flex-row items-center p-2 justify-center text-black bg-white gap-8 rounded-lg md:rounded-full'>
        <div className='flex-1 flex flex-row flex-wrap items-center justify-between'>
            <Link to="/posts" className='px-4 text-sm font-semibold py-2 bg-gray-500 text-white md:rounded-full rounded-lg'>All Posts</Link>
            <Link to="/posts?cat=webdesign" className='px-4 text-sm font-semibold py-2 hover:text-black text-gray-700'>Web Design</Link>
            <Link to="/posts?cat=development" className='px-4 text-sm font-semibold py-2 hover:text-black text-gray-700'>Development</Link>
            <Link to="/posts?cat=databases" className='px-4 text-sm font-semibold py-2 hover:text-black text-gray-700'>Databases</Link>
            <Link to="/posts?cat=searchengines" className='px-4 text-sm font-semibold py-2 hover:text-black text-gray-700'>Search Engines</Link>
            <Link to="/posts?cat=marketing" className='px-4 text-sm font-semibold py-2 hover:text-black text-gray-700' >Marketing</Link>
        </div>
        <span className="text-xl font-medium">|</span>
        <Search />
    </div>
  )
}

export default Categories