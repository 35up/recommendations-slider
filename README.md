# 35up Recommendations Slider

A slider component with products recommendations.
Just put it in your web shop and connect.

- [Plain web-component variant](packages/slider/README.md). 
- [React wrapper](packages/react-slider/README.md)

How to:
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

// in render method

<tfup-recommendations-slider
  base-product={title: 'Apple iPhone 12 Pro - Pacific blue'}
  seller="your-seller-id"
  @add-to-cart=${handleAddToCartClick}
></tfup-recommendations-slider>
```
Note: the syntax might be different depending on the framework used, the above 
one is written in [lit](https://lit.dev/) template syntax.


Result:
![example.png](example.png)

There component is implemented as a custom element, so you can use 
[the plain version](packages/slider/README.md) (works well in Vanilla js, 
Vue.js, Svelte, Lit and others) or you can use a 
[react wrapper](packages/react-slider/README.md) if your web-shop written in 
react.
