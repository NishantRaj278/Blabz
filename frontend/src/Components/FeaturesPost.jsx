import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post?featured=true&limit=4&sort=newest`);
    return res.data;
}

function FeaturesPost() {

  const {isPending, error, data} = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => (fetchPost())
  })

  if(isPending) return "loading...";
  if(error) return "Something went wrong" + error.message;
  
  const posts = data.posts;
  if(!posts || posts.length === 0){
    return;
  }

  return (
    <div className='flex lg:flex-row flex-col items-center justify-center gap-8 mt-8'>
        <div className='w-full lg:w-1/2 flex flex-col gap-4 justify-center'>
            <img className="rounded-lg object-cover lg:w-[895px] md:w-[800px] w-[500px]" src='https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg' ></img>
            <div className="flex items-center gap-4">
                <h1 className="font-semibold lg:text-lg" >1.</h1>
                <Link className="text-gray-500 lg:text-lg font-semibold">Web Design</Link>
                <span>2 days ago</span>
            </div>
            <p className="text-xl lg:text-3xl font-semibold lg:font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, praesentium. Eum delectus, adipisci dicta ipsa eaque ratione alias laboriosam consequuntur.</p>
        </div>
        <div className='flex flex-col items-center lg:w-1/2 justify-center gap-4'>
            
            <div className='flex md:flex-row flex-col gap-4 items-center justify-center lg:h-1/3'>
                <img className='w-[298px] rounded-lg' src='https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg'></img>
                <div>
                    <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                        <h1 className="font-semibold" >2.</h1>
                        <Link className="text-gray-500">Web Design</Link>
                        <span className="text-sm">2 days ago</span>
                        
                    </div>
                    <p className="text-sm md:text-lg font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, praesentium. Eum delectus, adipisci dicta ipsa eaque ratione alias laboriosam consequuntur.</p>
                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-4 items-center justify-center lg:h-1/3'>
                <img className='w-[298px] rounded-lg' src='https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg'></img>
                <div>
                    <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                        <h1 className="font-semibold" >3.</h1>
                        <Link className="text-gray-500">Web Design</Link>
                        <span className="text-sm">2 days ago</span>
                        
                    </div>
                    <p className="text-sm md:text-lg font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, praesentium. Eum delectus, adipisci dicta ipsa eaque ratione alias laboriosam consequuntur.</p>
                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-4 items-center justify-center lg:h-1/3'>
                <img className='w-[298px] rounded-lg' src='https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg'></img>
                <div>
                    <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                        <h1 className="font-semibold" >4.</h1>
                        <Link className="text-gray-500">Web Design</Link>
                        <span className="text-sm">2 days ago</span>
                        
                    </div>
                    <p className=" text-sm md:text-lg font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, praesentium. Eum delectus, adipisci dicta ipsa eaque ratione alias laboriosam consequuntur.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturesPost