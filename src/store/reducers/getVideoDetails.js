import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawToString } from "../../utils/convertRawToString";
import { timeSince } from "../../utils/timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "youtubeApp/getVideoDetails",
  async (id) => {
    const {
      data: { items },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    return await parseVideoDetails(items[0]);
  }
);

const parseVideoDetails = async (item) => {
  const channelResponse = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  const snippet = item.snippet;
  const statistics = item.statistics;

  return {
    videoId: item.id,
    videoTitle: snippet.title,
    videoDescription: snippet.description,
    videoViews: convertRawToString(statistics.viewCount),
    videoLikes: convertRawToString(statistics.likeCount),
    videoAge: timeSince(new Date(snippet.publishedAt)),
    channelInfo: {
      id: snippet.channelId,
      image:
        channelResponse.data.items[0].snippet.thumbnails.default.url,
      name: snippet.channelTitle,
      subscribers: convertRawToString(
        channelResponse.data.items[0].statistics.subscriberCount,
        true
      ),
    },
  };
};
