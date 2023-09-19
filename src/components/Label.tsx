import Image from 'next/image';
import React from 'react';
import infoIcon from '../../public/info-icon.svg';
import theme from '../styles/theme';

type InputProps = {
  value: string;
  hasHint?: boolean;
  hintText?: string;
  labelClass?: string;
  isRequired?: boolean;
  starColor?: string;
  textWeight?: string;
  textSize?: string;
  textColor?: string;
};

const Label: React.FC<InputProps> = ({
  hasHint = false,
  hintText = '',
  value = '',
  labelClass,
  isRequired,
  starColor = theme.colors.primary,
  textSize,
  textWeight,
  textColor,
  ...props
}) => {
  return (
    <>
      <div className={`flex ${hasHint ? 'items-start' : 'items-center'}`}>
        <label
          data-testid={'label-testing'}
          className={`block text-${textSize} font-${textWeight} text-${textColor} ${labelClass}`}
          {...props}
        >
          <span>
            {value}
            {isRequired && <span style={{ color: starColor }}>*</span>}
          </span>
        </label>
        {hasHint && (
          <div className='relative group ml-2'>
            <Image src={infoIcon} alt='infoIcon' width={18} height={18} />
            <div className='absolute z-10 -top-8 left-4 min-w-[200px] bg-gray-800 p-2 text-xs text-white rounded opacity-0 group-hover:opacity-100'>
              {hintText}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Label;
