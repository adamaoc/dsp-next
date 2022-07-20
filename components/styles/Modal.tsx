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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-height: 100vh;
  background: #fff;
  @media (min-width: 600px) {
    position: relative;
    max-height: 80vh;
    width: 340px;
  }
`;

const ModalTitle = styled.h3`
  background: #2e2f2f;
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
        <ModalBody>
          <ModalTitle>{title} <button onClick={handleDismiss}>X</button></ModalTitle>
          {children}
        </ModalBody>
      </OutsideClickHandler>
    </Overlay>
  )
}