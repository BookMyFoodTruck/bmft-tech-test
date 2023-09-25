import type { Meta, StoryObj } from '@storybook/react';

// TODO: The import had an error. This fixes the import for now but I do not have the full context.
import FoodtruckSpace from '../../src/components/FoodTruckStepOne';

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
