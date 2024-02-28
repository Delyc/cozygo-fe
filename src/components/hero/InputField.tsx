// InputField.tsx
import React from 'react';

interface InputFieldProps {
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="outline-none py-3 text-xs"  
    />
  );
};

export default InputField;
