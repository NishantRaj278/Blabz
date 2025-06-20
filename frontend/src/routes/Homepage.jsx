import React from 'react'
import Introduction from '../Components/Introduction'
import Categories from '../Components/Categories'
import FeaturesPost from '../Components/FeaturesPost'
import PostsList from '../Components/PostsList'

function Homepage() {
  return (
    <div className='mt-4 flex flex-col gap-4'>
        <Introduction />
        <Categories />
        <FeaturesPost />
        <div className='mt-8 mb-8'>
          <h1 className='text-xl text-gray-500'>Recent Posts</h1>
          <PostsList />
        </div>
        
    </div>
  )
}

export default Homepage