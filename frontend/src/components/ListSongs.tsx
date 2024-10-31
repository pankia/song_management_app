import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../features/Song/SongSlice";
import { Song } from "../types/types";
import { RootState } from "../app/store";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa6";
import Modal from "./Modal/Modal";
import UpdateSong from "./UpdateSong";
import DeleteSong from "./DeleteSong";
import {  toast } from 'react-toastify';

import { Flex, Text, Box } from "rebass";
import Layout from "./common/Layout";
import {
  ResponsiveFlex,
  SongImage,
  ButtonContainer,
  Button,
  Pagination,
  StyledActiveButton
} from "../assets/style/ListSongsStyle";

const ListSongs: React.FC = () => {
  const dispatch = useDispatch();

  const { songs, isLoading, error } = useSelector(
    (state: RootState) => state.songs
  );

  //define states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 5;

  // handle song crud forms modal
  const handleOpenModal = (component: React.ReactNode) => {
    setModalContent(component);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (error) {
    toast.error(error)
  }

  // handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  return (
    <Layout>
      <ResponsiveFlex>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text width={"25%"} fontWeight={"bold"}>
            Song
          </Text>
          <Text width={"25%"} fontWeight={"bold"}>
            Album
          </Text>
          <Text fontWeight={"bold"}>Genre</Text>
          <Text fontWeight={"bold"}>Actions</Text>
        </Flex>
        <hr
          style={{
            width: "100%",
            borderColor: "#9290C3",
            borderWidth: "2px",
            marginBottom: "1rem",
          }}
        />
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
          currentSongs.map((song: Song, index: number) => {
            return (
              <>
                <Flex
                  key={song._id}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Flex alignItems={"center"} width={"25%"}>
                    <SongImage src="../../assets/sound-icon.png" />
                    <Box>
                      <h3>{song.title}</h3>
                      <p>By:{song.artist}</p>
                    </Box>
                  </Flex>
                  <Text width={"25%"}>{song.album}</Text>
                  <Text textAlign={"center"}>{song.genre}</Text>
                  <ButtonContainer>
                    <Button
                      onClick={() =>
                        handleOpenModal(
                          <UpdateSong
                            onClose={handleCloseModal}
                            id={song._id}
                          />
                        )
                      }
                    >
                      <CiEdit />
                    </Button>
                    <Button
                      onClick={() =>
                        handleOpenModal(
                          <DeleteSong
                            onClose={handleCloseModal}
                            id={song._id}
                          />
                        )
                      }
                    >
                      <MdOutlineDeleteOutline />
                    </Button>
                  </ButtonContainer>
                </Flex>
                {index !== songs.length && (
                  <hr
                    style={{
                      width: "100%",
                      borderColor: "#9290C3",
                      marginBottom: "1rem",
                    }}
                  />
                )}
              </>
            );
          })
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          component={modalContent}
        />
      </ResponsiveFlex>
      <Pagination>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return pageNumber === currentPage ? (
          <StyledActiveButton key={index} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </StyledActiveButton>
        ) : (
          <Button key={index} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </Button>
        );
      })}
    </Pagination>
    </Layout>
  );
};

export default ListSongs;