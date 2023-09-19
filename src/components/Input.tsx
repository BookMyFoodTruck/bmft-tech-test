import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  height?: number;
  type: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  register?: any;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  width = 100,
  height = 15,
  type = 'text',
  label = '',
  placeholder = '',
  value,
  required = false,
  register,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      {...(register ? register(props.name) : {})}
      type={type}
      defaultValue={value}
      className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
      placeholder={placeholder}
      required={required}
      data-testid='input-testing'
    />
  );
};

export default Input;
