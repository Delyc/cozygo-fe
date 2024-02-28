// SelectField.tsx
import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  placeholder: string; // Placeholder text to be shown by default
  options: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({ placeholder, options }) => {
  console.log(options, "options");

  return (
    <div className="flex flex-col">
      <select className="text-primary_gray text-xs" defaultValue="">
        {/* Placeholder option */}
        <option value="" disabled selected>{placeholder}</option>
        {/* Other options */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
