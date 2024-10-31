import React, { useState } from "react";
import { NavLink,NavbarContainer, Nav, StyledButton } from "../../../assets/style/NavbarStyle";
import LogoItem from "./LogoItem";

import { IoMenu, IoCloseSharp } from "react-icons/io5";
import MobileMenu from "./MobileMenu";
import CreateSongButton from "../Navbar/CreateSongBotton";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContainer>
      <LogoItem />
      <StyledButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoCloseSharp /> : <IoMenu />}
      </StyledButton>
      <Nav>
        <CreateSongButton />
        <NavLink to="/">
          Songs
        </NavLink>
        <NavLink to="/song-stats">
          Song Statistics
        </NavLink>
      </Nav>
      <MobileMenu isOpen={isOpen} />
    </NavbarContainer>
  );
};

export default Navbar;