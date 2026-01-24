import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { changeSearchTerm, clearVideos } from "../features/youtube/youtubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between px-2 sm:px-4 md:px-14 h-14 items-center bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-2 sm:gap-4 md:gap-8 items-center text-xl sm:text-2xl">
        <div className="md:hidden">
          <GiHamburgerMenu />
        </div>
        <div className="flex gap-1 sm:gap-2 items-center justify-center">
          <BsYoutube className="text-2xl sm:text-3xl text-red-700" />
          <span className="text-lg sm:text-xl md:text-2xl hidden sm:inline">Youtube</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 flex-1 max-w-2xl mx-2 md:mx-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full"
        >
          <div className="flex bg-zinc-900 items-center h-8 sm:h-10 px-2 sm:px-4 pr-1 sm:pr-2 rounded-3xl">
            <div className="flex gap-2 sm:gap-5 items-center pr-2 sm:pr-5 flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-zinc-900 focus:outline-none border-none text-sm sm:text-base"
                value={searchTerm}
                onChange={e=>dispatch(changeSearchTerm(e.target.value))}
              />
            </div>
            <button className="h-8 sm:h-10 w-10 sm:w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl">
              <AiOutlineSearch className="text-lg sm:text-xl" />
            </button>
          </div>
        </form>
        <div className="hidden md:block text-xl p-3 bg-zinc-900 rounded-full">
          <FaMicrophone />
        </div>
      </div>
      <div className="hidden md:flex gap-8 items-center text-xl">
        <RiVideoAddLine />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        <img
          src="https://rukminim2.flixcart.com/image/480/640/xif0q/religious-frame/i/l/f/13-ram-lalla-ram-lala-ayodhya-ram-lalla-ayodhya-ram-ji-ram-lalla-original-imagxhkrkdpjjbgh.jpeg?q=90"
          alt="profile logo"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
