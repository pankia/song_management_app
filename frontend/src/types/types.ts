// to create new song
export interface NewSong {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// For updating a song
export interface Song extends NewSong {
  _id: string;
}

export interface SongStats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: Array<{
    _id: string;
    TotalSongsByGenre: number;
    Songs: string[];
  }>;
  songsByArtist: Array<{
    _id: string;
    TotalSongsByArtist: number;
    Songs: string[];
  }>;
  songsByAlbum: Array<{
    _id: string;
    TotalSongsByAlbum: number;
    Songs: string[];
  }>;
  albumsByArtist: Array<{
    _id: string;
    TotalAlbums: number;
    Albums: string[];
  }>;
}

export interface SongState {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  songStats: SongStats | null;
}
