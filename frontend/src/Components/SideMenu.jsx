import React from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'

function SideMenu() {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if(searchParams.get("sort") !== e.target.value){
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            sort: e.target.value
        })
    }
  }

  return (
    <div className='h-max sticky top-16 flex flex-col justify-center gap-4'>
        <h1 className='font-medium text-gray-400'>Search</h1>
        <Search />

        <h1 className='font-medium text-gray-400'>Filters</h1>
        <div className='flex flex-col gap-2 cursor-pointer text-sm'>
            <label className='flex gap-2 items-center'>
                <input type="radio" name="sort" value="newest" id="" className='appearance-none w-4 h-4 bg-white checked:bg-blue-700 border-1 border-gray-500' onChange={handleFilterChange}/>
                Newest
            </label>
            <label className='flex gap-2 items-center'>
                <input type="radio" name="sort" value="popular" id="" className='appearance-none w-4 h-4 bg-white checked:bg-blue-700 border-1 border-gray-500' onChange={handleFilterChange}/>
                Most Popular
            </label>
            <label className='flex gap-2 items-center'>
                <input type="radio" name="sort" value="trending" id="" className='appearance-none w-4 h-4 bg-white checked:bg-blue-700 border-1 border-gray-500' onChange={handleFilterChange}/>
                Trending
            </label>
            <label className='flex gap-2 items-center'>
                <input type="radio" name="sort" value="oldest" id="" className='appearance-none w-4 h-4 bg-white checked:bg-blue-700 border-1 border-gray-500' onChange={handleFilterChange}/>
                Oldest
            </label>
        </div>

        <h1 className='font-medium text-gray-400'>Categories</h1>
        <div className='flex flex-col gap-2'>
            <Link to={`/posts?cat=general`} className='text-sm underline'>All</Link>
            <Link to={`/posts?cat=webdesign`} className='text-sm underline'>Web Design</Link>
            <Link to={`/posts?cat=development`} className='text-sm underline'>Development</Link>
            <Link to={`/posts?cat=databases`} className='text-sm underline'>Databases</Link>
            <Link to={`/posts?cat=searchengines`} className='text-sm underline'>Search Engine</Link>
            <Link to={`/posts?cat=marketing`} className='text-sm underline'>Marketing</Link>
        </div>

    </div>
  )
}

export default SideMenu