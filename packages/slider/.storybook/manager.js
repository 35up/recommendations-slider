import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import logo from './logo-colorful.svg';


const theme = create({
  base: 'light',
  brandTitle: '35up Recommendations Slider Examples',
  brandImage: logo,
  brandTarget: '_self',
});

addons.setConfig({
  theme
});
