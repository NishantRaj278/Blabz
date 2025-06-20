import React, { useState } from 'react'
import Comment from './Comment'
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchPost = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comment/${postId}`);
    return res.data;
}

function Comments({ postId }) {

  const {isPending, error, data} = useQuery({
    queryKey: ["comment", postId],
    queryFn: () => (fetchPost(postId))
  })

  const queryClient = useQueryClient()
  const {getToken} = useAuth();
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();

      return axios.post(`${import.meta.env.VITE_API_URL}/comment/${ postId }`, newComment, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
    },
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ["comment", postId]});
    },
    onError : (error) => {
      toast.error(error.response.data);
    }
  })

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      content: formData.get('content')
    }

    mutation.mutate(data);
  }
  
  if(isPending) return "loading...";
  if(error) return "Something went wrong" + error.message;
  if(!data) return "Comment not found.";

  return (
    <div className='flex flex-col gap-8 mt-8 lg:w-3/5 mb-10'>
        <h1 className='text-gray-500 underline font-medium'>Comments</h1>
        <form onSubmit={handleSubmit} className='flex flex-row justify-between items-center gap-8'>
            <textarea className='bg-white w-full rounded-md outline-none placeholder-gray-400 py-2 px-2 text-black font-medium' placeholder='write a comment... ' name="content"></textarea>
            <button className='bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 cursor-pointer'>Send</button>
        </form>
        {data.map((comment) => (

          <Comment key={comment._id} comment={comment}/>
        ))}
    </div>
  )
}

export default Comments