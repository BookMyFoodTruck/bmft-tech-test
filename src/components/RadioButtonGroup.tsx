import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import { useTranslation } from '../i18n/client';
import theme from '../styles/theme';

interface Props {}

const RadioButtonGroup: React.FC<Props> = ({}) => {
  const { t } = useTranslation();

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

  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
  };

  return (
    <RadioGroup row className='flex justify-between'>
      {fuelOptions.map((fuelOption: any) => (
        <FormControlLabel
          className='capitalize'
          required
          value='fuel'
          key={fuelOption.id}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: theme.colors.primary,
                },
              }}
              checked={selectedValue === fuelOption.id}
              onChange={handleChange}
              value={fuelOption.id}
            />
          }
          label={fuelOption.title}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
