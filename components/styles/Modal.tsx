import styled from '@emotion/styled'
import React from 'react'
import OutsideClickHandler from '../OutsideClickHandler';

interface ModalProps {
  open: boolean;
}
const Overlay = styled.div<ModalProps>`
  visibility: ${({open}) => open ? '' : 'hidden'};

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 340px;
  max-height: 80vh;
  background: #fff;
`;

const ModalTitle = styled.h3`
  background: #494f59;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  button {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 0.75rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const Modal = ({ title, children, open, close }: any) => {
  
  const handleDismiss = () => {
    document.body.removeAttribute('style');
    close();
  };

  return (
    <Overlay open={open}>
      <OutsideClickHandler onOutsideClick={handleDismiss}>
        <ModalTitle>{title} <button onClick={handleDismiss}>X</button></ModalTitle>
        <ModalBody>
          {children}
        </ModalBody>
      </OutsideClickHandler>
    </Overlay>
  )
}