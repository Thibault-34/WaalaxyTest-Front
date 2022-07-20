import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface ITextInputProps {
  value: any;
  onChange: (value: any) => void;
}

const Input = styled.input`
  background-color: #ffffff;
  color: #212121;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
`;

const TextInput = ({ value, onChange }: ITextInputProps) => {
  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <Input type="text" value={value} onChange={_onChange} />;
};

export default TextInput;
