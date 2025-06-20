import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function WritePostPage() {

  const navigate = useNavigate();
  const {getToken} = useAuth();
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();

      return axios.post(`${import.meta.env.VITE_API_URL}/post`, newPost, {
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess : (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    }
  })

  const [value, setValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set('content', value);
    mutation.mutate(formData);
  };

  return (
    <div className='w-full md:h-[calc(100vh-80px)] h-[calc(100vh-64px)] flex flex-col'>
      <h1 className='mt-2 mb-8 text-gray-600 text-md font-medium'>Create a new post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 flex-1 mb-8'>
        <input type="file" className='bg-white text-black py-2 px-2 rounded-3xl w-max text-sm font-medium cursor-pointer' name="img"/>
        <input type="text" placeholder='My Awesome Story' className='text-5xl outline-none font-medium' name='title'/>
        <div className='flex flex-row gap-2 items-center'>
            <label className='font-medium'>Choose a category: </label>
            <select className='bg-white text-black rounded-lg' name="category">
              <option value="general">General</option>
              <option value="webdesign">Web Design</option>
              <option value="development">Development</option>
              <option value="databases">Databases</option>
              <option value="marketing">Marketing</option>
              <option value="searchengines">Search Engines</option>
            </select>
        </div>
        <textarea className='bg-white outline-none rounded-lg text-black px-2 py-4 placeholder-gray-500 font-medium' placeholder='A short description...' name='desc'></textarea>
        <ReactQuill className='flex-1 bg-white text-black outline-none rounded-lg font-medium' value={value} onChange={setValue} />
        <button className='text-white bg-gray-500 w-[136px] px-4 py-2 mt-4 rounded-xl font-medium cursor-pointer hover:bg-gray-400 disabled:bg-gray-800 disabled:cursor-not-allowed' disabled={mutation.isPending}>
          {mutation.isPending ? "Please Wait.." : "Send"}
          </button>
          {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default WritePostPage