import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch,useAppSelector } from '../hooks/useApp'
// import {getHomePageVideos} from '../store/reducers/getHomePageVideos'
import { Spinner } from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
// import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { clearSearchResults } from '../features/youtube/youtubeSlice'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'
import SearchCard from '../components/SearchCard'


export default function Search() {

  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state)=> state.youtubeApp.searchResults);
  const searchTerm = useAppSelector((state)=>state.youtubeApp.searchTerm);

  useEffect(()=>{
    dispatch(clearSearchResults());
    if(searchTerm==="")navigate("/");
    else(
        dispatch(getSearchPageVideos(false))
  )
  },[dispatch,navigate,searchTerm]);

  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height:"7.5vh"}}>
        <Navbar/>
      </div>
      <div className='flex' style={{height:"92.5vh"}}>
        <Sidebar/>
        {
          searchResults.length ? (
            <div className='py-8 pl-8 flex flex-col gap-5 w-full'>
                <InfiniteScroll 
                dataLength={searchResults.length} 
                next={()=>dispatch(getSearchPageVideos(true))}
                hasMore={searchResults.length<500}
                loader={<Spinner/>}
                height={650}
                >
                    {
                    searchResults.map((item)=>{
                        return (
                            <div className='my-5' key={item.videoId}>
                                <SearchCard data={item}/>
                            </div>
                        )
                    })
                    }
                </InfiniteScroll>
            </div>
          ):(
            <Spinner/>
          )
        } 
      </div>
    </div>
  )
}

