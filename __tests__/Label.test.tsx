import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../src/components/Label';

describe('RegisterFoodTruckerForm', () => {
  test('Renders label correctly', () => {
    render(<Label value={'tesing'} />);
    const label = screen.getByTestId('label-testing');
    expect(label).toBeInTheDocument();
  });

  test('Display label value correctly', () => {
    const value = 'testing label';
    render(<Label value={value} />);
    const label = screen.getByTestId('label-testing');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(value);
  });
});
