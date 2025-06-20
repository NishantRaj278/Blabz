import React from 'react'
import Post from './Post'
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
    params: {page : pageParam, ...searchParamsObj},
  });
  return res.data;
}

function PostsList() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['post', searchParams.toString()],
    queryFn: ({pageParam = 1}) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length+1 : undefined,
  })
  
  if(status === "loading") return "loading...";
  if(status === "error") return "something went wrong";

  const allposts = data?.pages?.flatMap((page) => page.posts) || [];
  
  return (
    <InfiniteScroll
      dataLength={allposts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p className='mt-4 text-xl'>
          <b>All posts loaded.</b>
        </p>
      }
      
    >
      {allposts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
    </InfiniteScroll>
        

  )
}

export default PostsList