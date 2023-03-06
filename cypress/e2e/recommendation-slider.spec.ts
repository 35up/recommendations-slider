import { expect } from 'chai';


function slideToElement(index: number): void {
  let n = index;
  while (n > 0) {
    cy.get('tfup-recommendations-slider').shadow()
      .find('.slider > button').eq(1)
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    n -= 1;
  }
}

describe('recommendation-slider', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/iframe.html?id=recommendations-slider--default&viewMode=story', {timeout: 20000});
  });

  it('can slide right', () => {
    cy.get('tfup-recommendations-slider').shadow()
      .find('.slider > button').eq(1)
      .click();
    cy.get('tfup-recommendations-slider').shadow().find('.slider .slider-track')
      .should(([ track ]) => {
        expect(track.scrollLeft).to.be.closeTo(
          track.querySelectorAll('tfup-recommendation')[1].offsetLeft,
          0.5,
        );
      });
  });

  it('can slide left', () => {
    cy.get('tfup-recommendations-slider');
    slideToElement(4);
    cy.get('tfup-recommendations-slider').shadow()
      .find('.slider > button').eq(0)
      .click();
    cy.get('tfup-recommendations-slider').shadow()
      .find('.slider .slider-track')
      .should(([ track ]) => {
        expect(track.scrollLeft).to.be.closeTo(
          track.querySelectorAll('tfup-recommendation')[3].offsetLeft,
          0.5,
        );
      });
  });
});
