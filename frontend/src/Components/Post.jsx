import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';

function Post({post}) {


  return (

    <div className='mt-8 flex flex-col md:flex-row items-center justify-center gap-8'>
        
        {post.imageBase64 && (<img className="w-[400px] h-[250px] rounded-lg" src={post.imageBase64 ||""} alt={post.title} />)}
      
        <div className='flex flex-col gap-4 w-2/3'>
            <Link to={`/${post.slug}`} className='text-4xl font-bold'>
              {post.title}
            </Link>
            <div className='flex gap-2 items-center'>
                <span>Written by </span>
                <Link to={`/posts?author=${post.user.username}`} className='text-gray-500 font-medium'>{post.user.username}</Link>
                <span>on</span>
                <Link to={`/posts?cat=${post.category}`} className='text-gray-500 font-medium'>{post.category}</Link>
                <span className='text-sm'>{format(post.createdAt)}</span>
            </div>
            <p className='text-md'>
              {post.desc}
            </p>
            <Link to={`/${post.slug}`} className='underline text-blue-800 font-semibold'>Read More</Link>
        </div>
    </div>
  )
}

export default Post