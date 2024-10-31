import React from "react";
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  position: relative;
  bottom:0;
  width: 100%;
  background-color: #DCD210FF;
  color: #070f2b;
  text-align: center;
  padding: 1rem 0;
`;
export const NavLink = styled.a`
  color: #070f2b;
  text-decoration: none;
  &:hover {
    color: #535c91;
  }
`;
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      &copy; Copyright {new Date().getFullYear()}.Song app. Built by{" "}
      <NavLink href="https://github.com/pankia">Yonas Getaneh</NavLink>
    </FooterContainer>
  );
};

export default Footer;