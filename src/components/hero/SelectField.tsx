// SelectField.tsx
import React from 'react';

interface SelectFieldProps {
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ options }) => {
  return (
    <select className="select-field">
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default SelectField;
