import type { Meta, StoryObj } from '@storybook/react';
import RangeSlider from '../src/components/RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const SocketsRequired: Story = {
  args: {
    max: 8,
    marks: [
      {
        value: 0,
        label: '0',
      },
      {
        value: 8,
        label: '8',
      },
    ],
  },
};

export const CatchmentArea: Story = {
  args: {
    max: 100,
    marks: [
      {
        value: 0,
        label: '0 KM',
      },
      {
        value: 24,
        label: '24 KM',
      },
      {
        value: 100,
        label: '+100 KM ',
      },
    ],
  },
};
