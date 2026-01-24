import React from 'react'
import { Link } from 'react-router-dom';

export default function Card({data}) {
  return (
    <div className='w-full flex gap-3 flex-col'>
        <div className='relative w-full'>
            <span className='absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10'>
                {data.videoDuration}
            </span>
            <Link to={`/watch/${data.videoId}`} className='block w-full'>
                <img src={data.videoThumbnail} 
                    alt='Thumbnail' className='w-full h-auto aspect-video object-cover rounded-lg'
                />
            </Link>
        </div>
        <div className='flex gap-2'>
            <div className='min-w-fit'>
                <a href='/#'><img src={data.channelInfo.image} 
                    alt='channel img' className='h-9 w-9 rounded-full'/>
                </a>
            </div>
            <div className='flex-1 min-w-0'>
                <h3>
                    <a href='/#' className='line-clamp-2 text-sm sm:text-base'>
                        {data.videoTitle}
                    </a>
                </h3>
                <div className='text-xs sm:text-sm text-gray-400'>
                    <div>
                        <a href='/#' className='hover:text-white line-clamp-1'>
                            {data.channelInfo.name}
                        </a>
                    </div>
                    <div>
                        <span>
                            {data.videoViews} views
                        </span>
                        <span>
                            {data.videoAge}
                        </span>                            
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
