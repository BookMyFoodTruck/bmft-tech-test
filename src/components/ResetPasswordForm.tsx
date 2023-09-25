'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import * as yup from 'yup';
import ValidationMsg from './ValidationMsg';
import Spinner from './Spinner';
import { useTranslation } from '../i18n/client';
import { resetPasswordPost } from '../services/reset-password.service';

type ResetPasswordFormProps = {};

interface IFormInputs {
  email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [email, setEmail] = useState('');

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t('authentication.validation_error.email_format'))
        .required(t('authentication.validation_error.email_required')),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IFormInputs) => {
    setSubmitLoading(true);
    setEmail(data.email);
    await resetPasswordPost({ email: data.email });
    setSubmitLoading(false);
    setShowSubmitMessage(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='py-3'>
          <Label value={t('authentication.email')} isRequired={true} />
          <Input
            className={
              errors.email &&
              'text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1'
            }
            register={register}
            name='email'
            placeholder={t('authentication.email')}
            type={'text'}
          />
          {errors.email && (
            <ValidationMsg>{errors.email.message}</ValidationMsg>
          )}
        </div>
        <div className='pt-3'>
          <Button
            width={'100%'}
            height={40}
            color={'#fff'}
            backgroundColor={'#F08012'}
          >
            <span>
              {t('authentication.password_reset.password_forget_button')}
            </span>
            {submitLoading && <Spinner />}
          </Button>
        </div>
      </form>
      {showSubmitMessage && (
        <div className='w-full mt-10 py-3 px-6 text-xs text-center border border-gray-300 rounded-lg bg-gray-100 '>
          <p>
            {t(
              'authentication.password_reset.password_forget_submit_message_1',
            )}
          </p>
          <p>
            {t(
              'authentication.password_reset.password_forget_submit_message_2',
            )}
            <span className='font-bold'> {email}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default ResetPasswordForm;