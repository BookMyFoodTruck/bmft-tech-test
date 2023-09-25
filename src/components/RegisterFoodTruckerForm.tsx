'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Label from './Label';
import Input from './Input';
import { useTranslation } from '../i18n/client';
import ValidationMsg from './ValidationMsg';
import Button from './Button';
import FoodtruckerSchema from '../validations/foodtrucker.schema';
import {
  completeProfileFF,
  registerFoodtruckerFF,
} from '../services/foodtrucker.service';
import Spinner from './Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import theme from '../styles/theme';
import PasswordBlock from './PasswordBlock';
import {
  getUserByGoogleIdFF,
  queryStringToObject,
} from '../services/auth.service';
import { setAuthTokenCookie } from '../lib/cookies';
import useUserStore from '../stores/user.store';

interface IFormInputs {
  firstname: string;
  lastname: string;
  foodtruck_name?: string;
  email: string;
  siret_number?: string;
  address?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

interface IProfileFormInputs {
  firstname: string;
  lastname: string;
  foodtruck_name?: string;
  email: string;
  siret_number?: string;
  address?: string;
  phone?: string;
}

function RegisterFoodTruckerForm({ ...props }) {
  const searchParams = useSearchParams();
  const profile = queryStringToObject(searchParams.toString());
  const { t } = useTranslation();
  const router = useRouter();

  const signupShema = FoodtruckerSchema({ t }, props.isCompleteProfile);
  const getDefaultValue = async () => {
    return {
      firstname: profile?.given_name,
      lastname: profile?.family_name,
      email: profile?.email,
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: async () => getDefaultValue(),
    //@ts-ignore
    resolver: yupResolver(signupShema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IFormInputs) => {
    if (props.isCompleteProfile) {
      await submitCompleteProfile(data);
    } else {
      await submitRegister(data);
    }
  };

  const submitRegister = async (data: IFormInputs) => {
    setSubmitLoading(true);
    const response = await registerFoodtruckerFF(data);
    if (response.success) {
      router.push('/login');
    }
    setSubmitLoading(false);
  };

  const submitCompleteProfile = async (data: IFormInputs) => {
    const payload = {
      ...data,
      sub: profile.sub,
      role: profile.role,
      provider: profile.provider.toUpperCase(),
    };

    setSubmitLoading(true);
    const response = await completeProfileFF(payload);
    if (response.success) {
      const existingUser = await getUserByGoogleIdFF(payload.sub);
      await setAuthTokenCookie(
        existingUser.data.getUserByGoogleId?.accessToken,
      );
      useUserStore.setState({
        user: existingUser.data.getUserByGoogleId?.currentUser,
      });
      router.push('/foodtruck-space');
    }
    setSubmitLoading(false);
  };

  const [checkedCGU, setCheckedCGU] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleCGU = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCGU(event.target.checked);
  };

  const errorClassname =
    'text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='py-3'>
        <Label value={t('authentication.firstname')} isRequired={true} />
        <Input
          className={errors.firstname && errorClassname}
          register={register}
          name='firstname'
          type='text'
          placeholder={t('authentication.firstname')}
        />
        {errors.firstname && (
          <ValidationMsg>{errors.firstname.message}</ValidationMsg>
        )}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.lastname')} isRequired={true} />
        <Input
          className={errors.lastname && errorClassname}
          register={register}
          name='lastname'
          type='text'
          placeholder={t('authentication.lastname')}
        />
        {errors.lastname && (
          <ValidationMsg>{errors.lastname.message}</ValidationMsg>
        )}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.email')} isRequired={true} />
        <Input
          className={errors.email && errorClassname}
          register={register}
          name='email'
          placeholder={t('authentication.email')}
          type={'text'}
        />
        {errors.email && <ValidationMsg>{errors.email.message}</ValidationMsg>}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.foodtruck_name')} isRequired={true} />
        <Input
          className={errors.foodtruck_name && errorClassname}
          register={register}
          name='foodtruck_name'
          type='text'
          placeholder={t('authentication.foodtruck_name')}
        />
        {errors.foodtruck_name && (
          <ValidationMsg>{errors.foodtruck_name.message}</ValidationMsg>
        )}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.siret_number')} isRequired={true} />
        <Input
          className={errors.siret_number && errorClassname}
          register={register}
          name='siret_number'
          type='text'
          placeholder={t('authentication.siret_number')}
        />
        {errors.siret_number && (
          <ValidationMsg>{errors.siret_number.message}</ValidationMsg>
        )}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.address')} isRequired={true} />
        <Input
          className={errors.address && errorClassname}
          register={register}
          name='address'
          type='text'
          placeholder={t('authentication.address')}
        />
        {errors.address && (
          <ValidationMsg>{errors.address.message}</ValidationMsg>
        )}
      </div>

      <div className='py-3'>
        <Label value={t('authentication.phone')} isRequired={true} />
        <Input
          className={errors.phone && errorClassname}
          register={register}
          name='phone'
          type='text'
          placeholder={t('authentication.phone')}
        />
        {errors.phone && <ValidationMsg>{errors.phone.message}</ValidationMsg>}
      </div>

      {!props.isCompleteProfile && (
        <PasswordBlock register={register} errors={errors} />
      )}
      <div className='flex items-center py-6'>
        <input
          id='link-checkbox'
          type='checkbox'
          checked={checkedCGU}
          className='w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-gray-500 accent-transparent	 '
          onChange={e => handleCGU(e)}
        />
        <label className='ml-2 text-sm font-sm text-gray-900'>
          {t('authentication.accept_condition')}
          <a href='#' className='underline ml-1'>
            {t('authentication.accept_condition_link')}
          </a>
          .
        </label>
      </div>

      <div className='pt-3'>
        <Button
          width={'100%'}
          height={40}
          color={theme.colors.white}
          backgroundColor={theme.colors.primary}
          type={'submit'}
          rounded={'lg'}
          combinedClassName={!checkedCGU && 'opacity-50'}
          disabled={!checkedCGU}
        >
          <span>{t('authentication.register_link_2')}</span>
          {submitLoading && <Spinner />}
        </Button>
      </div>
    </form>
  );
}

export default RegisterFoodTruckerForm;