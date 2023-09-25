import Slider from '@mui/material/Slider';
import * as React from 'react';

import theme from '../styles/theme';

interface Props {
  max: number;
  marks: Array<{ value: number; label: string }>;
}

const RangeSlider: React.FC<Props> = ({ max, marks }) => {
  return (
    <Slider
      defaultValue={0}
      max={max}
      sx={{
        '& .MuiSlider-thumb': {
          backgroundColor: theme.colors.default,
        },
        color: theme.colors.primary,
        height: 8,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-markLabel': {
          fontWeight: 600,
        },
      }}
      step={1}
      marks={marks}
      min={0}
    />
  );
};

export default RangeSlider;
