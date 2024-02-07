'use client'
import React, { useState } from 'react';
import { z, ZodType } from 'zod';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  validateOnChange?: boolean;
  schema?: ZodType<any>;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  className,
  schema,
  validateOnChange = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [error, setError] = useState<string | null>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(inputValue.length > 0);
    validateInput(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (validateOnChange) {
      validateInput(newValue);
    }
    if (onChange) onChange(e);
  };


  const validateInput = (value: string) => {
    if (schema) {
      try {
        schema.parse(value);
        setError(null);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.errors[0].message);
        }
      }
    }
  };
  return (
    <>
      <div className={`relative border-2 bg-red-500 rounded-md shadow-sm focus-within:border-indigo-600 ${className}`}>
        <input
          id={id}
          type={type}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="block w-full pt-3  pb-3 px-3 focus:outline-none text-sm text-gray-700 bg-transparent"
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-3 px-1 text-gray-500 text-sm transition-all ${isFocused || inputValue ? 'transform -translate-y-6 scale-75 bg-white' : 'pointer-events-none'
            }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
};

export default FloatingLabelInput;
