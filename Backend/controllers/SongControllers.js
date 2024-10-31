import { Song } from "../models/SongModel.js";

// create
export const createSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    if (!title || !artist || !album || !genre) {
      return response.status(400).json({
        success: false,
        message: "send all required fields:title,artist,album,genre ",
      });
    }
    const newSong = {
      title,
      artist,
      album,
      genre,
    };
    const song = await Song.create(newSong);
    return res
      .status(201)
      .json({
        success: true,
        message: "Song Successfully Added",
        result: song,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List songs
export const listSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    return res.status(200).json({ success: true, result: songs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
export const updateSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    const { id } = req.params;
    if (!title || !artist || !album || !genre) {
      return res
        .status(400)
        .json({ success: false, message: "send all required fields" });
    }
    const song = await Song.findByIdAndUpdate(id, req.body);
    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Song Updated successfully",
        result: song,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove
export const removeSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Song Deleted Successfully",
        result: song,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//overall statistics
export const returnStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = (await Song.distinct("artist")).length;
    const totalAlbums = (await Song.distinct("album")).length;
    const totalGenres = (await Song.distinct("genre")).length;
    const songsByGenre = await Song.aggregate([
      { $group: { _id: "$genre", TotalSongsByGenre: { $sum: 1 }, Songs: { $addToSet: "$title" } } },
    ]);
    const songsByArtist = await Song.aggregate([
      { $group: { _id: "$artist", TotalSongsByArtist: { $sum: 1 },Songs: { $addToSet: "$title" } } },
    ]);
    const songsByAlbum = await Song.aggregate([
      { $group: { _id: "$album", TotalSongsByAlbum: { $sum: 1 }, Songs: { $addToSet: "$title" } } },
    ]);
    const albumsByArtist = await Song.aggregate([
      { $group: { _id: { artist: "$artist", album: "$album" } } }, 
      { $group: { _id: "$_id.artist", TotalAlbums: { $sum: 1 }, Albums: { $addToSet: "$_id.album" } } }, 
    ]);
    return res.status(200).json({
      success : true,
      message: 'Successfully fetched over all statistics',
      result: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsByGenre,
        songsByArtist,
        songsByAlbum,
        albumsByArtist,
      },
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};