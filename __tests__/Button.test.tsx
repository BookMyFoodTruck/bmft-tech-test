import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../src/components/Button';

describe('RegisterFoodTruckerForm', () => {
  test('Renders label correctly', () => {
    render(<Button color={'#fff'} backgroundColor={'#000'} />);
    const button = screen.getByTestId('button-testing');
    expect(button).toBeInTheDocument();
  });

  test('Display label value correctly', () => {
    const backgroundColor = '#000';
    const color = '#fff';
    render(<Button color={color} backgroundColor={backgroundColor} />);
    const button = screen.getByTestId('button-testing');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`background-color : ${backgroundColor}`);
    expect(button).toHaveStyle(`color : ${color}`);
  });
});
