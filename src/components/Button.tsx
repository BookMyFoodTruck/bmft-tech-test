import React, { ButtonHTMLAttributes } from 'react';

import theme from '../styles/theme';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: string | number;
  height?: string | number;
  color: string;
  backgroundColor: string;
  rounded?: string;
  border?: string;
  borderColor?: string;
  combinedClassName?: any;
};

const Button: React.FC<ButtonProps> = ({
  width = 100,
  height = 15,
  color = theme.colors.white,
  backgroundColor = theme.colors.dark,
  rounded = 'md',
  children,
  border,
  borderColor = 'border-black',
  combinedClassName,
  ...props
}) => {
  return (
    <button
      data-testid={'button-testing'}
      className={`hover:brightness-110 text-white  inline-flex items-center text-center justify-center py-2 px-4 rounded-${rounded} ${border} ${borderColor} ${combinedClassName} `}
      {...props}
      style={{
        width: width,
        height: height,
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
