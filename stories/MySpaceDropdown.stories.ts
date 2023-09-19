import type { Meta, StoryObj } from '@storybook/react';
import MySpaceDropdown from '../src/components/MySpaceDropdown';
import theme from '../src/styles/theme';

const meta: Meta<typeof MySpaceDropdown> = {
  title: 'MySpaceDropdown',
  component: MySpaceDropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MySpaceDropdown>;

export const Default: Story = {
  args: {
    anchorEl: false,
    // Set the button background color to white
    backgroundColor: theme.colors.white,
  },
};
