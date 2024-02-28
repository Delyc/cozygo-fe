import React, { ForwardedRef, forwardRef, useState } from "react";
import { ZodType, z } from "zod";

interface Option {
  id: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  className?: string;
  validateOnChange?: boolean;
  schema?: ZodType<any>;
  options?: any; // New prop for dropdown options
}

interface FloatingLabelInputProps {
  id: string;
  label?: string;
  type?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  className?: string;
  validateOnChange?: boolean;
  defaultValue?: any;
  schema?: ZodType<any>;
  options?: any; // New prop for dropdown options
}

const FloatingLabelInput = forwardRef<
  HTMLSelectElement | HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      id,
      label,
      type = "text",
      value,
      onChange,
      className,
      schema,
      defaultValue,
      validateOnChange = false,
      options,
      ...props // Receive options prop
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue || "");
    const [error, setError] = useState<string | null>(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      setIsFocused(inputValue.length > 0);
      validateInput(inputValue);
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (validateOnChange) {
        validateInput(newValue);
      }
      if (onChange) onChange(e);
      if (props.onValueChange) props.onValueChange(newValue);
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

    console.log("here is the defaultValue", defaultValue);

    return (
      <>
        <div className="flex flex-col gap-2.5">
          <div
            className={`relative border-2 rounded-md shadow-sm focus-within:border-indigo-600 ${className}`}
          >
            {options ? (
              <>
                <select
                  id={id}
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="block w-full px-3 pt-3 pb-3 text-sm text-gray-700 bg-transparent focus:outline-none"
                  ref={ref as ForwardedRef<HTMLSelectElement>}
                >
                  {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor={id}
                  className={`absolute left-3 top-3 px-1 text-gray-500 text-sm transition-all ${
                    isFocused || inputValue
                      ? "transform -translate-y-6 scale-75 bg-white"
                      : "pointer-events-none"
                  }`}
                >
                  {label}
                </label>
              </>
            ) : (
              <>
                <input
                  id={id}
                  type={type}
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="block w-full px-3 pt-3 pb-3 text-sm text-gray-700 bg-transparent focus:outline-none"
                  {...props}
                  defaultValue={defaultValue}
                  ref={ref as ForwardedRef<HTMLInputElement>}
                />
                <label
                  htmlFor={id}
                  className={`absolute left-3 top-3 px-1 text-gray-500 text-sm transition-all ${
                    isFocused || inputValue
                      ? "transform -translate-y-6 scale-75 bg-white"
                      : "pointer-events-none"
                  }`}
                >
                  {label}
                </label>
              </>
            )}
          </div>
          {/* {error && <p className="text-xs italic text-red-500 text-start">{error}</p>} */}
        </div>
      </>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
