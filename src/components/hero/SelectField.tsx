// SelectField.tsx
import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  placeholder: string; 
  options: Option[];
  className?: string

}

const SelectField: React.FC<SelectFieldProps> = ({ placeholder, options, className }) => {

  return (
    <div className="flex flex-col">
      <select className={`${className} text-primary_gray text-xs`} defaultValue="">
       
        <option value="" disabled selected>{placeholder}</option>
       
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
