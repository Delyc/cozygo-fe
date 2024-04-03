import React from 'react';

interface InputFieldProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, onChange }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      className="outline-none py-3 text-sm"  
    />
  );
};

export default InputField;
