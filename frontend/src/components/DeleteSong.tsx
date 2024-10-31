import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong } from "../features/Song/SongSlice";
import { RootState } from "../app/store";
import { IoClose } from "react-icons/io5";
import {
  CloseButton,
  StyledForm,
  StyledH1,
  StyledButton,
  StyledActiveButton,
  ButtonContainer,
} from "../assets/style/FormStyle";
import {  toast } from 'react-toastify';

interface DeleteSongProps {
  onClose: () => void;
  id: string;
}
const DeleteSong: React.FC<DeleteSongProps> = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const { songs, isLoading } = useSelector((state: RootState) => state.songs);

  const selectedSong = songs.find((song) => song._id === id);

  const handleDelete = async () => {
    try {
      if (id) {
        dispatch(deleteSong(id));
        toast.warning('Song deleted!')
        onClose();
      }
    } catch (error) {
      toast.error(`Error deleting song:, ${error}`);
    }
  };
  return (
    <>
      <CloseButton onClick={() => onClose()}>
        <IoClose size={30} style={{ textAlign: "right" }} />
      </CloseButton>
      <StyledForm>
        <StyledH1>Delete Song</StyledH1>
        <p>
          Are you sure you want to delete{" "}
          <b>{selectedSong && selectedSong.title}</b> by{" "}
          <b>{selectedSong && selectedSong.artist}</b>?
        </p>
        <ButtonContainer>
          <StyledActiveButton onClick={() => onClose()} disabled={isLoading}>
            {isLoading ? "Loading" : "Cancel "}
          </StyledActiveButton>
          <StyledButton onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Loading" : "Delete "}
          </StyledButton>
        </ButtonContainer>
      </StyledForm>
    </>
  );
};

export default DeleteSong;