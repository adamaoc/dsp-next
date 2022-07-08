import styled from '@emotion/styled';

interface ButtonProps {
  fullWidth?: boolean;
  secondary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${({secondary}) => secondary ? 'none' : '#494f59'};
  border:  ${({secondary}) => secondary ? '1px solid #494f59' : '1px solid transparent'};
  color: ${({secondary}) => secondary ? '#333' : '#fff'};
  border-radius: 5px;
  padding: 0.5rem 2rem;
  width: ${({ fullWidth }) => fullWidth ? '268px' : 'auto'};
  min-width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  cursor: pointer;
  &:hover {
    background: ${({secondary}) => secondary ? '#edd7d7' : '#1f1f1f'};
    color: ${({secondary}) => secondary ? '#333' : '#fff'};
  }
  &:disabled {
    background: #eee;
    color: #777;
    cursor: default
  }
`;