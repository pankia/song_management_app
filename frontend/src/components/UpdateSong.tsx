import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSong } from "../features/Song/SongSlice";
import { RootState } from "../app/store";
import { IoClose } from "react-icons/io5";
import {
  CloseButton,
  StyledForm,
  StyledH1,
  StyledLabel,
  StyledButton,
  StyledInput
} from "../assets/style/FormStyle";
import {  toast } from 'react-toastify';

interface UpdateSongProps {
  onClose: () => void;
  id: string;
}

const UpdateSong: React.FC<UpdateSongProps> = ({ onClose, id }) => {
  const dispatch = useDispatch();
  const { songs, isLoading, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const selectedSong = songs.find((song) => song._id === id);

    if (selectedSong) {
      setTitle(selectedSong.title);
      setArtist(selectedSong.artist);
      setAlbum(selectedSong.album);
      setGenre(selectedSong.genre);
    }
  }, [id, songs]);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSong = {
      _id: id || "",
      title,
      artist,
      album,
      genre,
    };
    await dispatch(updateSong(updatedSong));
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    if(!isLoading && !error){
      toast.success('Successfully Updated Song!')
      onClose();
    }else if(error){
      toast.error(`Error updating song:${error}`)
    }
  };
  return (
    <>
      <CloseButton onClick={() => onClose()}>
        <IoClose size={30} style={{ textAlign: "right" }} />
      </CloseButton>
      <StyledForm onSubmit={handleUpdate}>
        <StyledH1>Update Song</StyledH1>
        <StyledLabel>
          Title:
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </StyledLabel>

        <StyledLabel>
          Artist:
          <StyledInput
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </StyledLabel>

        <StyledLabel>
          Album:
          <StyledInput
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            required
          />
        </StyledLabel>
        <StyledLabel>
          Genre:
          <StyledInput
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </StyledLabel>
        <StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Update "}
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default UpdateSong;