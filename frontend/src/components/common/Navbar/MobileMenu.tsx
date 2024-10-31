import React from "react";
import { NavLink, MobileMenuContainer } from "../../../assets/style/NavbarStyle";
import CreateSongButton from "../Navbar/CreateSongBotton";

interface SidebarProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <MobileMenuContainer isOpen={isOpen}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CreateSongButton /> Add New
      </div>
      <NavLink to="/">Songs</NavLink>
      <NavLink to="/song-stats">Song Statistics</NavLink>
    </MobileMenuContainer>
  );
};

export default MobileMenu;