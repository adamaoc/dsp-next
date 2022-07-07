import styled from '@emotion/styled';

interface ButtonProps {
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: #494f59;
  border: 1px solid transparent;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem 2rem;
  width: ${({ fullWidth }) => fullWidth ? '268px' : 'auto'};
  min-width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  cursor: pointer;
  &:hover {
    background: #1f1f1f;
    color: white;
  }
  &:disabled {
    background: #eee;
    color: #777;
    cursor: default
  }
`;