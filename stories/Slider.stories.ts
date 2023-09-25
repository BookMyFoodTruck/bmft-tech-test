import type { Meta, StoryObj } from '@storybook/react';

import RangeSlider from '../src/components/RangeSlider';
import theme from '../src/styles/theme';

const meta: Meta<typeof RangeSlider> = {
    title: 'RangeSlider',
    component: RangeSlider,
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Carburant: Story = {
    args: {
        min: 0,
        max: 8,
        defaultValue: 0,
        onHoverText: false,
    },
};

export const Zone: Story = {
    args: {
        min: 0,
        max: 100,
        defaultValue: 0,
        onHoverText: false,
    },
};


