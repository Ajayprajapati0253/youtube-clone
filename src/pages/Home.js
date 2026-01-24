import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch,useAppSelector } from '../hooks/useApp'
import {getHomePageVideos} from '../store/reducers/getHomePageVideos'
import { Spinner } from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'


const Home = () => {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);

  useEffect(()=>{
    dispatch(getHomePageVideos(false));
  },[dispatch]);

  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height:"7.5vh"}}>
        <Navbar/>
      </div>
      <div className='flex' style={{height:"92.5vh"}}>
        <Sidebar/>
        {
          videos.length ? (
            <InfiniteScroll 
              dataLength={videos.length} 
              next={()=>dispatch(getHomePageVideos(true))}
              hasMore={videos.length<500}
              loader={<Spinner/>}
              height={650}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 w-full md:ml-56'>
                {
                  videos.map((item)=>{
                    return <Card data={item} key={item.videoId}/>
                  })
                }
              </div>
            </InfiniteScroll>
          ):(
            <div className='w-full md:ml-56 flex items-center justify-center'>
              <Spinner/>
            </div>
          )
        } 
      </div>
    </div>
  )
}

export default Home