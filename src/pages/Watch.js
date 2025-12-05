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
                        <div className='flex gap-5 p-5 w-full'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                        width={800}
                                        height={502}
                                        allowFullScreen
                                        title='Youtube Player'
                                        className='rounded-xl'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-xl font-semibold'>{currentPlaying.videoTitle}</h1>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={currentPlaying.channelInfo.image}
                                                alt='channel'
                                                className='h-10 w-10 rounded-full'
                                            />
                                            <div>
                                                <h3 className='font-semibold'>{currentPlaying.channelInfo.name}</h3>
                                                <p className='text-sm text-gray-400'>{currentPlaying.channelInfo.subscribers} subscribers</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-zinc-800 rounded-lg p-3'>
                                        <div className='flex gap-3 text-sm'>
                                            <span>{currentPlaying.videoViews} views</span>
                                            <span>{currentPlaying.videoAge}</span>
                                            <span>{currentPlaying.videoLikes} likes</span>
                                        </div>
                                        <p className='text-sm mt-2'>{currentPlaying.videoDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h2 className='text-xl font-semibold'>Recommended Videos</h2>
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
