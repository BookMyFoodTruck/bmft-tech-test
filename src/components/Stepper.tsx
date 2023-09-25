'use client';
import React, { useState } from 'react';
import { useTranslation } from '../i18n/client';
import { NextPage } from 'next';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from './Button';
import Image from 'next/image';
import GobackIcon from '../../public/icon-back.svg';
import { FormProvider } from 'react-hook-form';
import theme from '../styles/theme';
import CustomModal from './CustomModal';

const stepStyle = {
  width: '100%',
  ' .MuiStepIcon-text': { fill: theme.colors.dark, fontWeight: 'bold' },
  padding: 2,
  '& .MuiSvgIcon-root': {
    width: '2.5rem',
    height: '2.5rem',
    color: '#FEEBC1',
    fontSize: '1rem',
  },
  '& .MuiStepConnector-root': {
    top: '20px',
    left: 'calc(-50% + 30px)',
    right: 'calc(50% + 30px)',
  },
  '.css-1hv8oq8-MuiStepLabel-label.Mui-active': { color: theme.colors.primary },
  '.css-1hv8oq8-MuiStepLabel-label.Mui-completed': {
    color: theme.colors.success,
  },
  '& .Mui-active': {
    '&.MuiStepIcon-root': {
      color: theme.colors.primary,
      fontSize: '1rem',
    },
    '& .MuiSvgIcon-root': {
      width: '2.5rem',
      height: '2.5rem',
      color: theme.colors.primary,
      fontSize: '1rem',
    },
    '& .MuiStepIcon-text': { fill: theme.colors.white, fontWeight: 'bold' },
    '& .MuiStepConnector-line': {
      borderColor: theme.colors.gray,
    },
  },
  '& .Mui-completed': {
    '&.MuiStepIcon-root': {
      color: theme.colors.success,
      fontSize: '2rem',
    },
    '& .MuiStepConnector-line': {
      borderColor: theme.colors.primary,
    },
  },
};
interface Props {
  steps?: any;
  children: React.ReactNode;
  activeStep: number;
  setActiveStep: any;
  methods: any;
  trigger: any;
  handleSubmit: any;
}

const HorizontalStepper: NextPage<Props> = ({
  steps,
  children,
  activeStep,
  setActiveStep,
  methods,
  trigger,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const totalSteps = () => {
    return steps.length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const onSubmit = async (data: any) => {
    try {
      setOpen(true);
      await handleNext();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setActiveStep(1);
    } else {
      alert(t('alert.alert_truckform'));
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const [open, setOpen] = useState(false);
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    setOpen(true);
  };

  return (
    <>
      <div className='min-h-screen w-full grid grid-cols-6 overflow-x-hidden shadow-md rounded-2xl border-2 mx-12 gap-8 py-8 px-4'>
        <div className='flex items-center w-full stepper col-span-6'>
          <Stack sx={{ width: '100%' }}>
            <Stepper sx={stepStyle} activeStep={activeStep} alternativeLabel>
              {steps?.map((label: string) => {
                const stepProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {allStepsCompleted() ? (
              <CustomModal variant={'Default'} open={open} setOpen={setOpen} />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {children}
                  <Stack
                    direction='row'
                    sx={{ margin: '0 15px 0 15px', gap: 4 }}
                  >
                    {activeStep === totalSteps() - 1 && (
                      <Button
                        onClick={handleBack}
                        width={50}
                        height={50}
                        color={theme.colors.dark}
                        border='border-2'
                        borderColor='border-black'
                        rounded='full'
                        backgroundColor={theme.colors.white}
                        type={'button'}
                      >
                        <Image
                          src={GobackIcon}
                          alt='back icon'
                          className='back'
                          width={35}
                          height={35}
                        />
                      </Button>
                    )}
                    <Stack sx={{ flex: '1 1 auto' }} />
                    <Button
                      width={150}
                      height={45}
                      color={theme.colors.white}
                      rounded={'lg'}
                      backgroundColor={theme.colors.primary}
                      onClick={handleComplete}
                    >
                      {activeStep === 1
                        ? t('stepper.finish')
                        : t('stepper.continu')}
                    </Button>
                  </Stack>
                </form>
              </FormProvider>
            )}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default HorizontalStepper;
