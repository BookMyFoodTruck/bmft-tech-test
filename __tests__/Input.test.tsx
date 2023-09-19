import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../src/components/Input';

describe('RegisterFoodTruckerForm', () => {
  test('Renders Input correctly', () => {
    render(<Input type={'text'} />);
    const input = screen.getByTestId('input-testing');
    expect(input).toBeInTheDocument();
  });

  test('Display Input value correctly', () => {
    const value = 'testing';
    render(<Input type={'text'} value={value} />);
    const input = screen.getByTestId('input-testing');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });
});
