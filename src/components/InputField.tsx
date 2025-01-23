import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  readOnly = false, // Default to false
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={placeholder}
        value={value} // Controlled input
        onChange={onChange} // Handle changes
        readOnly={readOnly} // Optional read-only state
      />
    </div>
  );
};

export default InputField;
