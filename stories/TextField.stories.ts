import type { Meta, StoryObj } from '@storybook/react';
import TextField from '../src/components/TextField';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextField>;
