import type { Meta, StoryObj } from '@storybook/react';

import Label from '../src/components/Label';

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    value: 'Lorem ipsum',
  },
};

export const Hint: Story = {
  args: {
    value: 'Lorem ipsum',
    hasHint: true,
    hintText: 'This is a hint belong to the label',
  },
};
