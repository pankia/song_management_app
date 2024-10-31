import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #070F2B;
  width: 30vw;
  padding: 20px;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 70vw;
  }`;