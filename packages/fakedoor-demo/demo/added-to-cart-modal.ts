import type { ProductRecommendation } from '@35up/recommendations-slider';
import { createRemoveContentFunction } from './utils';


function createAddedToCartModal(
  product: ProductRecommendation,
): DocumentFragment {
  const template = document.querySelector<HTMLTemplateElement>(
    '#add-to-cart-success-modal',
  );
  const dom = template.content.cloneNode(true) as DocumentFragment;
  const $ = dom.querySelector.bind(dom);
  $('.image img').setAttribute('src', product.images.thumbnail);

  const remove = createRemoveContentFunction(dom);
  for (const button of dom.querySelectorAll('button')) {
    button.addEventListener('click', remove);
  }

  return dom;
}

export function openAddedToCartModal(product) {
  window.document.body.appendChild(createAddedToCartModal(product));
}
