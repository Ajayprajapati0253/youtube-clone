import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseRecommendedData from "../../utils/parseRecommendedData";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtubeApp/getRecommendedVideos",
  async (videoId, { getState }) => {
    const {
      youtubeApp: { currentPlaying },
    } = getState();

    if (!currentPlaying || !currentPlaying.channelInfo) {
      throw new Error("Current playing video not found");
    }

    const channelId = currentPlaying.channelInfo.id;

    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelId}&type=video&part=snippet&maxResults=20&key=${API_KEY}`
    );

    const items = response.data.items.filter(item => item.id.videoId !== videoId);
    const parsedData = await parseRecommendedData(items);

    return { parsedData };
  }
);
