import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from 'react';

export interface ISelectOption {
  value: string;
  children: string;
}

export interface ISelectProps {
  options: ISelectOption[];
  onSelect?: (value: string) => void;
}

const Select: ForwardRefRenderFunction<HTMLSelectElement, ISelectProps> = (
  { options, onSelect }: ISelectProps,
  ref,
) => {
  const _onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect?.(event.target.value);
  };

  return (
    <select ref={ref} onChange={_onSelect}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.children}
        </option>
      ))}
    </select>
  );
};

export default forwardRef(Select);
