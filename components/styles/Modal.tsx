import styled from '@emotion/styled'
import React from 'react'

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
  padding: 1rem;
`;

export const Modal = ({ children, open, close }: any) => {
  return (
    <Overlay open={open} onClick={close}>
      <ModalBody>
        {children}
      </ModalBody>
    </Overlay>
  )
}