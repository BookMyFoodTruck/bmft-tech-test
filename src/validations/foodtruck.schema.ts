import * as yup from 'yup';

const FoodtruckSchema = ({ t }: any) =>
  yup
    .object({
      truckname: yup.string().matches(/^\D+$/).required(),
      truckwidth: yup
        .number()
        .min(1)
        .max(4)
        .default(null)
        .positive()
        .required(),
      truckheight: yup
        .number()
        .min(1)
        .max(4)
        .default(null)
        .positive()
        .required(),
      trucklength: yup
        .number()
        .min(1)
        .max(10)
        .default(null)
        .positive()
        .required(),
      truckfuel: yup.string().required(t('stepper.validation_error.truckfuel')),
      truckimage: yup
        .array()
        .min(2, t('stepper.validation_error.truckimage'))
        .required(t('stepper.validation_error.truckimage')),
      truckprises: yup
        .number()
        .nullable()
        .required(t('stepper.validation_error.truckprises')),
      tags: yup
        .array()
        .min(2, t('stepper.validation_error.tags'))
        .required(t('stepper.validation_error.tags')),
      chalandise: yup
        .number()
        .min(0)
        .max(100)
        .required(t('stepper.validation_error.chalandise')),
      presentation: yup
        .string()
        .required(t('stepper.validation_error.presentation')),
    })
    .required();

export default FoodtruckSchema;
