import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseData from '../../utils/parseData';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async (isNext, { getState }) => {

        const {
            youtubeApp: { nextPageToken, videos }
        } = getState();

        const response = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=bhajan marg&key=${API_KEY}&part=snippet&type=video&pageToken=${isNext ? nextPageToken : ""}`
        );

        const items = response.data.items;
        const parsedData = await parseData(items);

        return {
            parsedData: isNext ? [...videos, ...parsedData] : parsedData,
            nextPageToken: response.data.nextPageToken
        };
    }
);
