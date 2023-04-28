# 35up Recommendations Slider

Web-component for 35up Recommendations Slider.

Usage:
1. Install the package:
```
  npm i -S @35up/recommendations-slider
```
2. Put in your page
```
import '@35up/recommendations-slider';

function handleAddToCartClick(e: CustomEvent): void {
  const product = e.detail;
  // Add product to your shopping cart
}

const baseProduct = {
  title: 'Apple iPhone 12 Pro - Pacific blue',
};

// in render method

<tfup-recommendations-slider
  base-product=${baseProduct}
  seller="your-seller-id"
  @add-to-cart=${handleAddToCartClick}
></tfup-recommendations-slider>
```

Note: the syntax might be different depending on the framework used, the above 
one is written in [lit](https://lit.dev/) template syntax.

