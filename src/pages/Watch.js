import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getVideoDetails } from '../store/reducers/getVideoDetails';
import { getRecommendedVideos } from '../store/reducers/getRecommendedVideo';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Spinner } from '../components/Spinner';

export default function Watch() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentPlaying = useAppSelector(
        (state) => state.youtubeApp.currentPlaying
    );

    const recommendedVideo = useAppSelector(
        (state) => state.youtubeApp.recommendedVideo
    );

    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id));
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch]);

    useEffect(() => {
        if (currentPlaying && id) dispatch(getRecommendedVideos(id));
    }, [currentPlaying, dispatch, id]);

    return (
        <>
            {currentPlaying && currentPlaying?.videoId === id ? (
                <div className='max-h-screen overflow-auto'>
                    <div style={{ height: "7.5vh" }}>
                        <Navbar />
                    </div>
                    <div className='flex' style={{ height: "92.5vh" }}>
                        <Sidebar />
                        <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 p-3 sm:p-4 md:p-5 w-full md:ml-56'>
                            <div className='flex flex-col gap-3 flex-1 min-w-0'>
                                <div className='w-full'>
                                    <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                            allowFullScreen
                                            title='Youtube Player'
                                            className='absolute top-0 left-0 w-full h-full rounded-xl'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-base sm:text-lg md:text-xl font-semibold line-clamp-2'>{currentPlaying.videoTitle}</h1>
                                    <div className='flex justify-between items-center flex-wrap gap-2'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={currentPlaying.channelInfo.image}
                                                alt='channel'
                                                className='h-8 w-8 sm:h-10 sm:w-10 rounded-full'
                                            />
                                            <div>
                                                <h3 className='font-semibold text-sm sm:text-base'>{currentPlaying.channelInfo.name}</h3>
                                                <p className='text-xs sm:text-sm text-gray-400'>{currentPlaying.channelInfo.subscribers} subscribers</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-zinc-800 rounded-lg p-3'>
                                        <div className='flex gap-3 text-xs sm:text-sm flex-wrap'>
                                            <span>{currentPlaying.videoViews} views</span>
                                            <span>{currentPlaying.videoAge}</span>
                                            <span>{currentPlaying.videoLikes} likes</span>
                                        </div>
                                        <p className='text-xs sm:text-sm mt-2 line-clamp-3'>{currentPlaying.videoDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 lg:w-96 lg:flex-shrink-0'>
                                <h2 className='text-lg sm:text-xl font-semibold'>Recommended Videos</h2>
                                {recommendedVideo.length ? (
                                    recommendedVideo.map((item) => (
                                        <Card data={item} key={item.videoId} />
                                    ))
                                ) : (
                                    <Spinner />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
}
