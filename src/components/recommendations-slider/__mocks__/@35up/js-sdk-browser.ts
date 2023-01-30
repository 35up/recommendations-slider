import sinon from 'sinon';
import { recommendations } from '../../../../mock-data';

export const sdkInstance = {
  getProductRecommendations: sinon.stub().resolves(recommendations),
};
export const initialise = sinon.spy(() => sdkInstance);
