import type { ProductRecommendation } from '@35up/recommendations-slider';
import { createRemove } from './utils';
import { openAddedToCartModal } from './added-to-cart-modal';


function renderCategories(
  [firstCategory, ...otherCategories]: string[],
  dom: DocumentFragment,
): void {
  const categoryTag = dom.querySelector('.tag');

  if (!firstCategory) {
    categoryTag.remove();
  } else {
    categoryTag.textContent = firstCategory;

    for (const category of otherCategories) {
      const otherTag = categoryTag.cloneNode(true);
      otherTag.textContent = category;
      categoryTag.parentNode.appendChild(otherTag);
    }
  }
}

function createProductDetailsModal(
  product: ProductRecommendation,
): DocumentFragment {
  const template = document.querySelector<HTMLTemplateElement>(
    '#product-details-modal',
  );
  const dom = template.content.cloneNode(true) as DocumentFragment;
  const $ = dom.querySelector.bind(dom);
  $('.product-name').textContent = product.name;
  $('.image img')
    .setAttribute('src', product.images.thumbnail);
  $('.delivery-from').textContent = String(product.delivery.timeMin);
  $('.delivery-to').textContent = String(product.delivery.timeMax);
  $('.price').textContent = product.price.formatted;
  $('.description').textContent = (
    product.descriptions.long || product.descriptions.short
  );
  renderCategories(product.categories, dom);

  const remove = createRemove(dom);
  $('.delete').addEventListener('click', remove);
  $('.close-button').addEventListener('click', remove);
  $('.add-to-cart').addEventListener('click', () => {
    remove();
    openAddedToCartModal(product);
  });

  return dom;
}

export function openProductDetailsModal(product) {
  window.document.body.appendChild(createProductDetailsModal(product));
}
