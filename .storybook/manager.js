import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';


const theme = create({
  base: 'light',
  brandTitle: '35up Recommendations Slider Examples',
  brandImage: '/logo-colorful.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme
});
