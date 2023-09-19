'use client';
import { useState } from 'react';
import { NextPage } from 'next';
import Input from './Input';
import RadioButtonGroup from './RadioButtonGroup';
import { useTranslation } from '../i18n/client';
import Label from './Label';
import RangeSlider from './RangeSlider';
import TextField from './TextField';
import Tags from './Tags';
import ValidationMsg from './ValidationMsg';
import { Controller } from 'react-hook-form';
import Dropzone from './Dropzone';
import theme from '../styles/theme';

interface Props {
  step?: number;
  errors: any;
  register: any;
  control: any;
}

const FoodTruckStepOne: NextPage<Props> = ({
  step,
  errors,
  register,
  control,
}) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({});
  const [imageFiles, setImageFiles] = useState({});

  const DIESEL = 'stepper.diesel';
  const GPL = 'stepper.gpl';
  const ELECTRIC = 'stepper.electric';
  const BIKE_FOOD = 'stepper.bike-food';

  const fuelOptions = [
    { id: 1, title: t(DIESEL) },
    { id: 2, title: t(GPL) },
    { id: 3, title: t(ELECTRIC) },
    { id: 4, title: t(BIKE_FOOD) },
  ];
  const INPUT_CLASS =
    'text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1';
  const [characterCount, setCharacterCount] = useState(0);
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // Update character count
    setCharacterCount(value.length);
  };

  const [TagsValue, setTagsValue] = useState([]);

  const handleTruckImageChange = (selectedFiles: File[]) => {
    setImageFiles({
      ...imageFiles,
      truckimage: selectedFiles,
    });
  };

  return (
    <>
      <div
        className='min-h-screen w-full grid grid-cols-6 md:gap-x-10 lg:gap-x-16 xl:gap-x-20 gap-y-4 py-10 px-4'
        style={{ display: step === 0 ? '' : 'none' }}
      >
        <>
          <div className='grid grid-cols-6 col-start-1 col-end-7 xl:col-end-4 lg:col-end-4 md:col-end-4 gap-x-4 gap-y-6 bg-white'>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.truck-name')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Input
                className={errors.truckname && INPUT_CLASS}
                type='text'
                register={register}
                placeholder={t('stepper.truck-name')}
                name='truckname'
              />
            </div>
            <div className='flex flex-col gap-y-2 col-start-1 col-end-4'>
              <Label
                value={t('stepper.truck-width')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Input
                className={errors.truckwidth && INPUT_CLASS}
                name='truckwidth'
                type='number'
                register={register}
                placeholder={t('stepper.truck-width')}
              />
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-span-3'>
              <Label
                value={t('stepper.truck-height')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Input
                className={errors.truckheight && INPUT_CLASS}
                type='number'
                register={register}
                placeholder={t('stepper.truck-height')}
                name='truckheight'
              />
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.truck-length')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Input
                className={errors.trucklength && INPUT_CLASS}
                type='number'
                register={register}
                placeholder={t('stepper.truck-length')}
                name='trucklength'
              />
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.truck-fuel')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Controller
                render={({ field }) => (
                  <RadioButtonGroup
                  // Complete me
                  />
                )}
                name='truckfuel'
                control={control}
              />
              {errors.truckfuel && (
                <ValidationMsg>{errors.truckfuel.message}</ValidationMsg>
              )}
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.truck-prise')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Controller
                name='truckprises'
                control={control}
                defaultValue={2}
                render={({ field }) => (
                  <RangeSlider
                  // Complete me
                  />
                )}
              />
              {errors.truckprises && (
                <ValidationMsg>{errors.truckprises.message}</ValidationMsg>
              )}
            </div>
          </div>
          <div className='grid grid-cols-6 col-end-7 col-start-1 md:col-span-3 lg:col-span-3 xl:col-span-3'>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <div className='flex items-center text-sm font-medium text-gray-900 gap-1'>
                <Label
                  value={t('stepper.truck-photo')}
                  isRequired
                  hasHint={true}
                  textSize='sm'
                  textWeight='bold'
                  textColor={theme.colors.dark}
                />
              </div>
              <Controller
                control={control}
                name='truckimage'
                render={({ field }) => (
                  <Dropzone
                    errors={errors}
                    onChange={files => {
                      // This will update react-hook-form's internal state
                      field.onChange(files);
                      // This will update your formValues state
                      handleTruckImageChange(files);
                    }}
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.truck-specialty')}
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Tags
                placeholder='Entrez vos spécialités'
                TagsValue={TagsValue}
                setTagsValue={setTagsValue}
              />
              {errors.tags && TagsValue.length < 2 && (
                <ValidationMsg>{errors.tags.message}</ValidationMsg>
              )}
            </div>
            <div className='flex flex-col gap-y-2 col-end-7 col-start-1'>
              <Label
                value={t('stepper.chalandise')}
                isRequired
                textSize='sm'
                textWeight='bold'
                textColor={theme.colors.dark}
              />
              <Controller
                name='chalandise'
                control={control}
                defaultValue={10}
                render={({ field }) => (
                  <RangeSlider
                  // Complete me
                  />
                )}
              />
              {errors.chalandise && (
                <ValidationMsg>{errors.chalandise.message}</ValidationMsg>
              )}
            </div>
          </div>
        </>

        <div className='flex flex-col gap-y-2 col-start-1 col-end-7'>
          <Label
            value={t('stepper.presentation')}
            isRequired
            hasHint={true}
            textSize='sm'
            textWeight='bold'
            textColor={theme.colors.dark}
          />
          <TextField register={register} onChange={handleFieldChange} />
          <div
            className={
              characterCount
                ? 'flex items-center justify-between text-gray-500 text-right text-sm'
                : 'text-gray-500 text-right text-sm'
            }
          >
            <p className='text-gray-500 text-sm text-left'>
              {' '}
              {characterCount}/350 caractères
            </p>
            {characterCount > 350 ? (
              <p className='text-red-500 text-sm text-right'>
                {t('stepper.validation_error.maxdescription')}
              </p>
            ) : null}{' '}
            {characterCount < 50 && characterCount > 0 ? (
              <p className='text-red-500 text-sm text-right'>
                {t('stepper.validation_error.mindescription')}
              </p>
            ) : null}
          </div>
          {errors.presentation && characterCount === 0 && (
            <ValidationMsg>{errors.presentation.message}</ValidationMsg>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodTruckStepOne;
