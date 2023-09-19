import type { Meta, StoryObj } from '@storybook/react';

import Input from '../src/components/Input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Lorem ipsum',
    label: 'Lorem ipsum',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'number field',
    label: 'Number field',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
    placeholder: 'Date field',
    label: 'Date field',
  },
};
