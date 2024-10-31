import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListSongs from "./components/ListSongs";
import ShowSongStats from "./components/SongStats/ShowSongStats";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListSongs />} />
      <Route path="/song-stats" element={<ShowSongStats />} />
    </Routes>
    <ToastContainer theme="dark"/>
  </BrowserRouter>
);

export default App;