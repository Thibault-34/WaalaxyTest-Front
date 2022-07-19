import { ChangeEvent } from 'react';

interface ITextInputProps {
  value: any;
  onChange: (value: any) => void;
}

const TextInput = ({ value, onChange }: ITextInputProps) => {
  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <input type="text" value={value} onChange={_onChange} />;
};

export default TextInput;
