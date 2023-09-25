import type { Meta, StoryObj } from '@storybook/react';

import RadioButtonGroup from '../src/components/RadioButtonGroup';
import theme from '../src/styles/theme';

const meta: Meta<typeof RadioButtonGroup> = {
    title: 'RadioButtonGroup',
    component: RadioButtonGroup,
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
    args: {
        options: [
            { id: 1, title: 'Diesel' },
            { id: 2, title: 'GPL' },
            { id: 3, title: 'Electrique' },
            { id: 4, title: 'Bike Food' },
          ],
    },
};
