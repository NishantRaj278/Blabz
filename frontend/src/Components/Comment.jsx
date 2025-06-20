import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js';

function Comment({comment}) {

  return (
    <div className='flex flex-col mb-8 gap-4 bg-white px-2 py-4 text-black rounded-xl'>
        <div className='flex flex-row px-2 items-center gap-4'>
            <img className="w-10 h-10 rounded-full" src={comment.user.img} alt="" />
            <Link className='text-gray-500 font-medium'>
              {comment.user.username}
            </Link>
            <span className='text-sm'>
              {format(comment.createdAt)}
            </span>
        </div>
        <p className='px-2 text-md'>
          {comment.content}
        </p>
    </div>
  )
}

export default Comment