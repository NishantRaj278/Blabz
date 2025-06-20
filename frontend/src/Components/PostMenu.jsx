import { useAuth, useUser } from '@clerk/clerk-react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PostMenu({post}) {
  const {user} = useUser();
  const {getToken} = useAuth();
  const navigate = useNavigate();

  const {isPending, error, data: savedPosts} = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
        const token = await getToken();
        return await axios.get(`${import.meta.env.VITE_API_URL}/user/saved`, {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        })
    }
  })

  const isSaved = savedPosts?.data?.some((p) => (p===post._id)) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
        const token = await getToken();
        return axios.delete(`${import.meta.env.VITE_API_URL}/post/${post._id}`, {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        })
    },
    onSuccess: () => {
        toast.success("Post deleted successfully");
        navigate('/');
    },
    onError: (error) => {
        toast.error(error.response.data);
    }
  })

  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async () => {
        const token = await getToken();
        return axios.patch(`${import.meta.env.VITE_API_URL}/user/save`, 
            {
                postId : post._id
            },{
            headers: {
                Authorization : `Bearer ${token}`,
            }
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["savedPosts"]});
    },
    onError: (error) => {
        toast.error(error.response.data);
    }
  })

  const featureMutation = useMutation({
    mutationFn: async () => {
        const token = await getToken();
        return axios.patch(`${import.meta.env.VITE_API_URL}/post/feature`, 
            {
                postId : post._id
            },{
                headers: {
                Authorization : `Bearer ${token}`,
            }
            })
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["post", post.slug]});
    },
    onError: (error) => {
        toast.error(error.response.data);
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate();
  }
  
  const handleSave = () => {
    if(!user){
        return navigate('/login');
    }
    saveMutation.mutate();
  }

  const handleFeature = () => {
    featureMutation.mutate();
  }

  return (
    <div className='flex flex-col gap-2' >
        {isPending ? "loading..." : error ? "Something went wrong" : (<Link className='text-blue-500 font-medium' onClick={handleSave}>
            {isSaved ? "Unsave this post" : "Save this post"}
        </Link>)}

        { user && 
        (post.user.username === user.emailAddresses[0].emailAddress) 
        && (<Link className='text-red-600 font-medium' onClick={handleDelete}>Delete this post</Link>)}

        {
            (user.emailAddresses[0]?.emailAddress === "rnishant721@gmail.com") && 
            (<Link className='text-green-400 font-medium' onClick={handleFeature}>
                {post.isFeatured ? "UnFeature this post" : "Feature this post"}
            </Link>)
        }
    </div>
  )
}

export default PostMenu