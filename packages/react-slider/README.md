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

function handleProductClick(e: CustomEvent): void {
  const product = e.detail;
  // For example, show a dialog with details
}

const baseProduct: BaseProduct = {
  title: 'Apple iPhone 12 Pro - Pacific blue',
};

// in render method

<TfupRecosSlider
  baseProduct={baseProduct}
  seller="your-seller-id"
  onRecommendationClick={handleProductClick}
  onAddToCart={handleAddToCartClick}
/>
```

## Customize styles
