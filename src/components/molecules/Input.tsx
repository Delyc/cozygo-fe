import React from "react";
import Error from "../atoms/Error";

type InputProps = {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; 
    error?: string;
    type?: string;
  };
  

  const Input = ({ id, label, name, value, onChange, onBlur, error, type = "text" }: InputProps) => (
    <div className="flex flex-col text-gray-500">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}  
        className="border border-neutral-200 p-2 rounded"
      />
      {error && <Error error={error}/>}
    </div>
  );
  

export default Input;
