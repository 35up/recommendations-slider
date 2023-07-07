import { render } from 'react-dom';
import React from 'react';
import { RecommendationsSlider } from '@35up/react-recommendations-slider';

render(
  <RecommendationsSlider
    seller="35up-test"
    baseProduct={{title: 'Apple iPhone 12 Pro - Pacific blue'}}
  />,
  document.body.appendChild(document.createElement('div'))
);
