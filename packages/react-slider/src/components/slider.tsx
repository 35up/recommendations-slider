import type { Ref, SyntheticEvent, EventHandler } from 'react';
import '@35up/recommendations-slider';
import type {
  RecommendationsSlider as Slider,
} from '@35up/recommendations-slider';
import type {
  BaseProduct,
  Customer,
  ProductRecommendation,
} from '@35up/recommendations-slider';
import { reactify } from '../reactify';

export type RecommendationsSliderProps = {
  seller: string,
  baseProduct: BaseProduct,
  language?: string,
  country?: string,
  session?: string,
  customer?: Customer,
  limit?: number,
  disableTracking?: boolean,
  className?: string,
  ref?: Ref<Slider>,
  onRecommendationClick?: EventHandler<
    SyntheticEvent<Slider> & {detail: ProductRecommendation}
  >,
  onAddToCart?: EventHandler<
    SyntheticEvent<Slider> & {detail: ProductRecommendation}
  >,
}

export const RecommendationsSlider = reactify<RecommendationsSliderProps>(
  'tfup-recommendations-slider',
);
