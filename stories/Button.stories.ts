import type { Meta, StoryObj } from '@storybook/react';

import Button from '../src/components/Button';
import theme from '../src/styles/theme';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    width: 400,
    height: 40,
    color: '#fff',
    backgroundColor: '#000',
    rounded: 'lg',
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const Secondary: Story = {
  args: {
    width: 400,
    height: 40,
    color: '#fff',
    backgroundColor: theme.colors.primary,
    rounded: 'lg',
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const Outline: Story = {
  args: {
    width: 170,
    height: 40,
    color: '#000',
    backgroundColor: '#fff',
    rounded: 'full',
    border: 'border-2',
    borderColor: 'border-black',
    children: 'Lorem ipsum',
  },
};

export const Small: Story = {
  args: {
    width: 170,
    height: 40,
    color: '#fff',
    backgroundColor: '#000',
    rounded: 'full',
    border: 'border-2',
    borderColor: 'border-black',
    children: 'Lorem ipsum',
  },
};
