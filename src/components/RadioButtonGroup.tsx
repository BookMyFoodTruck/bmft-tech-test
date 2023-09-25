import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';

import theme from '../styles/theme';

interface Props {
  options: Array<{ id: number; title: string }>;
  selectedValue: number;
  handleChange: (args: any) => void;
}

const RadioButtonGroup: React.FC<Props> = ({
  options,
  selectedValue,
  handleChange,
}) => {
  return (
    <RadioGroup row className='flex justify-between'>
      {options.map((fuelOption: any) => (
        <FormControlLabel
          className='capitalize'
          required
          name=''
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
