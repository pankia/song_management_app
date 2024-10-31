import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song,NewSong,SongStats,SongState } from "../../types/types";

const initialState: SongState = {
  songs: [],
  isLoading: false,
  error: null,
  songStats: null,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // list song
    fetchSongs: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // create song
    createSong: (state, action: PayloadAction<NewSong>) => {
      state.isLoading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.isLoading = false;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update song
    updateSong: (state,action: PayloadAction<Song>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.isLoading = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete song
    deleteSong: (state,action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        const id = action.payload;
        state.songs = state.songs.filter((song) => song._id !== id);
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // song statistics
    fetchSongsStats: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    FetchSongsStatsSuccess: (state, action: PayloadAction<SongStats>) => {
      state.songStats = action.payload;
      state.isLoading = false;
    },
    FetchSongsStatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    reset(state) {
        Object.assign(state, initialState)
    }
  },
});

// fetch,create,update,delete,songsStats
export const { 
    fetchSongs, 
    fetchSongsSuccess, 
    fetchSongsFailure,
    createSong,
    createSongSuccess,
    createSongFailure,
    updateSong,
    updateSongSuccess,
    updateSongFailure,
    deleteSong,
    deleteSongSuccess,
    deleteSongFailure,
    fetchSongsStats,
    FetchSongsStatsSuccess,
    FetchSongsStatsFailure
} = songsSlice.actions;
export default songsSlice.reducer;