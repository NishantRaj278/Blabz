import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Search from '../Components/Search'
import Comments from '../Components/Comments'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'
import PostMenu from '../Components/PostMenu'


const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${slug}`);
    return res.data;
}

function SinglePostPage() {

  const {slug} = useParams();

  const {isPending, error, data} = useQuery({
    queryKey: ["post", slug],
    queryFn: () => (fetchPost(slug))
  })

  if(isPending) return "loading...";
  if(error) return "Something went wrong" + error.message;
  if(!data) return "Post not found.";

  return (

    <div>
        <div className='w-full flex flex-row gap-8 justify-center mt-8'>
            <div className='flex flex-col gap-8 pt-4'>
                <h1 className='md:text-5xl text-2xl font-bold'>
                     {data.title}
                </h1>
                <div className='flex flex-row gap-2 items-center'>
                    <span>Written by</span>
                    <Link className='text-gray-500 font-semibold'>{data.user.username}</Link>
                    <span>on</span>
                    <Link className='text-gray-500 font-semibold'>{data.category}</Link>
                    <span className='text-sm'>{format(data.createdAt)}</span>
                </div>
                <p className='text-md md:text-xl'>
                    {data.desc}
                </p>
            </div>
            {data.imageBase64 && (<img className="w-[500px] hidden md:block rounded-2xl object-cover" src={data.imageBase64}></img>)}
        </div>
        <div className='flex flex-col md:flex-row mt-8 justify-between'>
            <div className='flex flex-col text-justify gap-4' dangerouslySetInnerHTML={{ __html: data.content }}>

            </div>
            <div className='sticky h-max px-8 top-8 flex flex-col gap-4 w-1/2 mb-8'>
                <h1 className='text-lg font-semibold mt-4' >Autor</h1>
                <div className='flex flex-row gap-2 items-center'>
                    <img className='w-10 h-10 rounded-full' src={data.user.img}></img>
                    <Link>{data.user.username}</Link>
                </div>
                <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet.</p>
                <h2 className='text-lg font-semibold mt-4' >Actions</h2>
                
                <PostMenu post={data}/>
                
                <h2 className='text-lg font-semibold mt-4'>Categories</h2>
                <div className="flex flex-col gap-2 text-sm">
                    <Link className="underline">All</Link>
                    <Link className="underline" to="/">
                    Web Design
                    </Link>
                    <Link className="underline" to="/">
                    Development
                    </Link>
                    <Link className="underline" to="/">
                    Databases
                    </Link>
                    <Link className="underline" to="/">
                    Search Engines
                    </Link>
                    <Link className="underline" to="/">
                    Marketing
                    </Link>
                </div>
                <h1 className="mt-8 text-lg font-semibold">Search</h1>
                <Search  />
            </div>
        </div>
        <Comments postId={data._id}/>
    </div>
    
  )
}

export default SinglePostPage