# 35up React Recommendations Slider

React wrapper for 35up recommendations slider component.

Usage:
1. Install the package:
```
  npm i -S @35up/react-recommendations-slider
```
2. Put in your page
```
import { 
  RecommendationsSlider as TfupRecosSlider,
  type BaseProduct,
} from '@35up/react-recommendations-slider';


function handleAddToCartClick(e: CustomEvent): void {
  const product = e.detail;
  // Add product to your shopping cart
}

const baseProduct: BaseProduct = {
  title: 'Apple iPhone 12 Pro - Pacific blue',
};

// in render method

<TfupRecosSlider
  baseProduct={baseProduct}
  seller="your-seller-id"
  onAddToCart={handleAddToCartClick}
/>
```

## Customize styles
