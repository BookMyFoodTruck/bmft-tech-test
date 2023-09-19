'use client';
import React, { useState } from 'react';
import HorizontalStepper from '../components/Stepper';
import { useTranslation } from '../i18n/client';
import FoodTruckStepOne from '../components/FoodTruckStepOne';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FoodtruckSchema from '../validations/foodtruck.schema';

const FoodtruckSpace = () => {
  const { t } = useTranslation();

  const truckSchema = FoodtruckSchema({ t });
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(truckSchema),
    mode: 'onChange',
  });
  const [activeStep, setActiveStep] = useState(0);
  const {
    handleSubmit,
    trigger,
    control,
    register,
    formState: { errors },
  } = methods;

  const steps = [t('stepper.file_foodtruck')];

  return (
    <div className='w-full min-h-fullscreen items-center justify-center flex flex-col px-6 sm:px-16 md:px-10 lg:px-24 xl:px-28 p-4'>
      <HorizontalStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleSubmit={handleSubmit}
        trigger={trigger}
        methods={methods}
      >
        <FoodTruckStepOne
          errors={errors}
          step={activeStep}
          register={register}
          control={control}
        />
      </HorizontalStepper>
    </div>
  );
};

export default FoodtruckSpace;
