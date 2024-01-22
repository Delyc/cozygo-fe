'use client'
import React, { useState } from 'react';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(inputValue.length > 0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative border-2 rounded-md shadow-sm focus-within:border-indigo-500 ${className}`}>
      <input
        id={id}
        type={type}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="block w-full pt-7 pb-1 px-3 focus:outline-none text-sm text-gray-700 bg-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-3 px-1 text-gray-500 text-sm transition-all ${
          isFocused || inputValue ? 'transform -translate-y-6 scale-75 bg-white' : 'pointer-events-none'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
