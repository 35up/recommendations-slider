import { html } from 'lit';
import { Meta, Story } from '@storybook/web-components';
import { arrayRange } from '@35up/tslib-utils';
import './slider';


export default {
  title: 'Components/Slider',
} as Meta;

export const Default: Story = () => html`
  <up-slider>${(arrayRange(0, 20)
    .map(n => html`
    <div
      class="slide"
      style="
        width: 200px;
        height: 350px;
        background-color: hsl(${n / 20}turn, 70%, 50%);
      "
    ></div>
  `))}
  </up-slider>
`;

