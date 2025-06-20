import React from 'react'
import { Link } from 'react-router-dom'

function Introduction() {
  return (
    <div>
        <div className='flex gap-4'>
            <Link to='/' className='font-semibold'>Home</Link>
            <span>~</span>
            <span className='text-gray-400 font-semibold'>Blogs and Articles</span>
        </div>
        <div className='mt-4 flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-4'>
                <h2 className='font-bold text-2xl md:text-5xl lg:text-6xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                <p className='font-semibold text-gray-400 text-md md:text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus nesciunt.</p>
            </div>
            <div>
                <Link to="/write" className="hidden md:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
            // className="text-lg tracking-widest"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text fill='white'>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
            </div>
        </div>
    </div>
  )
}

export default Introduction