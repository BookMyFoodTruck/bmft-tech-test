import React from 'react';

type ValidationMsgProps = {
  children?: string;
};

const ValidationMsg: React.FC<ValidationMsgProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <small {...props} className='text-red-500 text-sm'>
        {children}
      </small>
    </>
  );
};

export default ValidationMsg;
