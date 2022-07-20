import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from 'react';
import styled from 'styled-components';

export interface ISelectOption {
  value: string;
  children: string;
}

export interface ISelectProps {
  options: ISelectOption[];
  onSelect?: (value: string) => void;
}

const StyledSelect = styled.select`
  background-color: #ffffff;
  color: #212121;
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
`;

const Select: ForwardRefRenderFunction<HTMLSelectElement, ISelectProps> = (
  { options, onSelect }: ISelectProps,
  ref,
) => {
  const _onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect?.(event.target.value);
  };

  return (
    <StyledSelect ref={ref} onChange={_onSelect}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.children}
        </option>
      ))}
    </StyledSelect>
  );
};

export default forwardRef(Select);
