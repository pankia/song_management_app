import React from 'react';
import { ModalOverlay, ModalContainer } from '../../assets/style/ModalStyle';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, component }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {component}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;