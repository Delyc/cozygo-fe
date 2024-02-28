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
      className="input-field" // Define styles in your Tailwind CSS
    />
  );
};

export default InputField;
