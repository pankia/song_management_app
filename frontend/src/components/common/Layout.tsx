import React from "react";
import Navbar from "./Navbar/Navbar";
import styled from "@emotion/styled";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction:column;
  min-height: 100vh;
`;
const MainContent = styled.main`
  flex: 1;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
        <Navbar />
        <MainContent>
            {children}
        </MainContent>
        <Footer />
    </LayoutContainer>
  );
};

export default Layout