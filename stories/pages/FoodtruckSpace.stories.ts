import type { Meta, StoryObj } from '@storybook/react';

import FoodtruckSpace from '../../src/app/(Foodtruck)/foodtruck-space/page';

const meta: Meta<typeof FoodtruckSpace> = {
  title: 'Pages/FoodtruckSpace',
  component: FoodtruckSpace,
  parameters: { docs: { page: null } },
};

export default meta;
type Story = StoryObj<typeof FoodtruckSpace>;

export const Default: Story = {
  args: {},
};
