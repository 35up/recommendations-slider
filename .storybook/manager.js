import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';


const theme = create({
  base: 'light',
  brandTitle: '35up Recommendations Slider Examples',
  brandImage: 'https://uploads-ssl.webflow.com/5f1b010e9e536aefe91f7609/5f8714742ee9cf3e2c84ad15_35up-colored.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme
});
