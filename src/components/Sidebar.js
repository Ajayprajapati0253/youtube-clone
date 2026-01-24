import React from 'react'
import { MdHome} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuThumbsUp } from "react-icons/lu";


const Sidebar = () => {
    const mainLinks = [
        {
            icon:<MdHome className='text-xl'/>,
            name:'Home',
        },
        {
            icon:<SiYoutubeshorts className='text-xl'/>,
            name:'Shorts'
        },
        {
            icon:<MdSubscriptions className='text-xl'/>,
            name:"Subscription"
        }
    ];

    const otherLinks = [
        {
            icon:<MdOutlineVideoLibrary  className='text-xl'/>,
            name:"Library"
        },
        {
            icon:<MdHistory className='text-xl'/>,
            name:"History"
        },
        {
            icon:<MdOutlineWatchLater className='text-xl'/>,
            name:"WatchLater"
        },
        {
            icon:<LuThumbsUp className='text-xl'/>,
            name:"LikedVideo"
        }
    ];


  return (
    <div className='hidden md:block md:w-56 bg-[#212121] p-2 pr-5 overflow-auto pb-8 h-[calc(100vh-3.5rem)] fixed left-0 top-14 z-40'>
        <ul className='flex flex-col border-b-2 border-gray-700'>
            {
                mainLinks.map(({icon,name})=>{
                    return(
                        <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 ${name==="Home"?"bg-slate-600":" "} rounded-xl`}>
                            <a href='/#' className='flex items-center gap-5'>
                                {icon}
                                <span className='text-sm tracking-wider'>{name}</span>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
        <ul className='flex flex-col border-b-1 border-gray-800'>
            {
                otherLinks.map(({icon,name})=>{
                    return(
                        <li key={name} className={`pl-6 py-3 hover:bg-zinc-600`}>
                            <a href='/#' className='flex items-center gap-5'>
                                {icon}
                                <span className='text-sm tracking-wider'>{name}</span>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default Sidebar