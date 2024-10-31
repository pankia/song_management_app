// define the api calls and end points
// create - POST /songs
// List - GET /songs

import { Song } from "../types/types";
import { NewSong } from "../types/types";
const API_BASE_URL = "https://song-api-pncl.onrender.com/songs";

export const fetchSongsApi = async (): Promise<Song[]> => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch songs,Status: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};

export const createSongApi = async (newSong: NewSong) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSong),
  });
  if (!response.ok) {
    throw new Error(`Failed to create song. Status: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};

// Update - PUT /songs/:id
export const updateSongApi = async (updatedSong: Song, id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSong),
  });
  if (!response.ok) {
    throw new Error(`Failed to update song. Status: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};

// Delete - DELETE /songs/:id
export const deleteSongApi = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete song. Status: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};
// Stats - GET /songs/stats
export const fetchSongsStatsApi = async (): Promise<Song[]> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error(`Failed to fetch song statistics. Status: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
}