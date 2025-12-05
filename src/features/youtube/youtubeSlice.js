import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import { getRecommendedVideos } from "../../store/reducers/getRecommendedVideo";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";

const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideo: [],
};

const youtubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.searchResults = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideo = action.payload.parsedData;
    });

    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload; // FIXED
    });
  },
});

export const { clearVideos, clearSearchResults, changeSearchTerm, clearSearchTerm } =
  youtubeSlice.actions;

export default youtubeSlice.reducer;
