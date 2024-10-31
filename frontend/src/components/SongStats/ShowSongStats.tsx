import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStats } from "../../features/Song/SongSlice";
import { RootState } from "../../app/store";
import Layout from "../common/Layout";
import { FaSpinner } from "react-icons/fa6";
import { Text } from "rebass";
import {
  StyledList,
  StyledSpan,
  StyledSelect,
  StyledOption,
  ListContainer,
  StyledH2,
  StyledSongsList,
} from "../../assets/style/ShowSongStatsStyle";

const ShowSongStats: React.FC = () => {
  const dispatch = useDispatch();
  const { songStats, isLoading, error } = useSelector(
    (state: RootState) => state.songs
  );
  const [selectedOption, setSelectedOption] = useState("songsByGenre");
  const [openList, setOpenList] = useState<number | null>(null);
  useEffect(() => {
    dispatch(fetchSongsStats());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      {isLoading ? (
        <Text
          fontWeight="bold"
          textAlign={"center"}
          fontSize={"1.5rem"}
          marginY={"10%"}
        >
          <FaSpinner />
          Loading...
        </Text>
      ) : (
        songStats && (
          <div>
            <StyledList>
              <li>
                Total Songs<StyledSpan>{songStats.totalSongs}</StyledSpan>
              </li>
              <li>
                Total Artists <StyledSpan>{songStats.totalArtists}</StyledSpan>
              </li>
              <li>
                Total Albums <StyledSpan>{songStats.totalAlbums}</StyledSpan>
              </li>
              <li>
                Total Genres <StyledSpan>{songStats.totalGenres}</StyledSpan>
              </li>
              <li>
                <StyledSelect
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <StyledOption value="songsByGenre">
                    Songs By Genre
                  </StyledOption>
                  <StyledOption value="songsByArtist">
                    Songs By Artist
                  </StyledOption>
                  <StyledOption value="songsByAlbum">
                    Songs By Album
                  </StyledOption>
                  <StyledOption value="albumsByArtist">
                    Albums By Artist
                  </StyledOption>
                </StyledSelect>
              </li>
            </StyledList>
            {selectedOption === "songsByGenre" && (
              <>
                <StyledH2>Songs By Genre</StyledH2>
                <ListContainer>
                  {songStats.songsByGenre.map((genreInfo, index) => (
                    <StyledSongsList
                      key={genreInfo._id}
                      open={openList === index}
                    >
                      <h3
                        onClick={() =>
                          setOpenList(openList === index ? null : index)
                        }
                      >
                        {genreInfo._id}{" "}
                        <StyledSpan>{genreInfo.TotalSongsByGenre}</StyledSpan>
                        {openList === index ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </h3>
                      {genreInfo.Songs.map((song: string) => (
                        <li key={song}>
                          {song},{""}
                        </li>
                      ))}
                    </StyledSongsList>
                  ))}
                </ListContainer>
              </>
            )}
            {selectedOption === "songsByArtist" && (
              <>
                <StyledH2>Songs By Artist</StyledH2>
                <ListContainer>
                  {songStats.songsByArtist.map((artistInfo, index) => (
                    <StyledSongsList
                      key={artistInfo._id}
                      open={openList === index}
                    >
                      <h3
                        onClick={() =>
                          setOpenList(openList === index ? null : index)
                        }
                      >
                        {artistInfo._id}
                        <StyledSpan>{artistInfo.TotalSongsByArtist}</StyledSpan>
                        {openList === index ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </h3>
                      {artistInfo.Songs.map((song: string) => (
                        <li key={song}>
                          {song},{""}
                        </li>
                      ))}
                    </StyledSongsList>
                  ))}
                </ListContainer>
              </>
            )}
            {selectedOption === "songsByAlbum" && (
              <>
                <StyledH2>Songs By Album</StyledH2>
                <ListContainer>
                  {songStats.songsByAlbum.map((albumInfo, index) => (
                    <StyledSongsList
                      key={albumInfo._id}
                      open={openList === index}
                    >
                      <h3
                        onClick={() =>
                          setOpenList(openList === index ? null : index)
                        }
                      >
                        {albumInfo._id}{" "}
                        <StyledSpan>{albumInfo.TotalSongsByAlbum}</StyledSpan>
                        {openList === index ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </h3>
                      {albumInfo.Songs.map((song: string) => (
                        <li key={song}>
                          {song},{""}
                        </li>
                      ))}
                    </StyledSongsList>
                  ))}
                </ListContainer>
              </>
            )}
            {selectedOption === "albumsByArtist" && (
              <>
                <StyledH2>Albums By Artist</StyledH2>
                <ListContainer>
                  {songStats.albumsByArtist.map((albumInfo, index) => (
                    <StyledSongsList
                      key={albumInfo._id}
                      open={openList === index}
                    >
                      <h3
                        onClick={() =>
                          setOpenList(openList === index ? null : index)
                        }
                      >
                        {albumInfo._id}{" "}
                        <StyledSpan>{albumInfo.TotalAlbums}</StyledSpan>
                        {openList === index ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </h3>
                      {albumInfo.Albums.map((album: string) => (
                        <li key={album}>
                          {album},{""}
                        </li>
                      ))}
                    </StyledSongsList>
                  ))}
                </ListContainer>
              </>
            )}
          </div>
        )
      )}
    </Layout>
  );
};

export default ShowSongStats;