import styled from 'styled-components';

const Button = styled.input.attrs(props => ({
  ...props,
  type: 'submit',
}))`
  background: #424242;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
`;

export default Button;
