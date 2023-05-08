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

function handleProductClick(e: CustomEvent): void {
  const product = e.detail;
  // For example, show a dialog with details
}

const baseProduct = {
  title: 'Apple iPhone 12 Pro - Pacific blue',
};

const slider = document.createElement('tfup-recommendations-slider');

// Set properties
slider.seller = "your-seller-id";
slider.baseProduct = baseProduct;

// Subscribe to events from slider
slider.addEventListener('recommendation-click', handleProductClick);
slider.addEventListener('add-to-cart', handleAddToCartClick);

// Insert the slider in your page
document.getElementById('place-for-slider').appendChild(slider);
```
