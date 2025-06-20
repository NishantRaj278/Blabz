import React, { useState } from 'react'
import PostsList from '../Components/PostsList'
import SideMenu from '../Components/SideMenu';

function PostListPage() {
  const[open, setopen]  = useState(false);

  return (
    <div>
      <h1 className='text-2xl font-medium text-gray-500'>Development Blog</h1>
      <div className='flex flex-col gap-8'>
        <button className="mt-8 bg-gray-500 px-4 py-2 rounded-2xl font-medium md:hidden w-max" onClick={() => (setopen(!open))}>
          {!open ? "Filter and Search" : "Close"}
        </button>

        <div className='flex md:flex-row gap-8 flex-col-reverse p-2'>
          <div>
            <PostsList />
          </div>
          <div className={`${open ? "block" : "hidden"} md:block`}>
            <SideMenu />
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default PostListPage