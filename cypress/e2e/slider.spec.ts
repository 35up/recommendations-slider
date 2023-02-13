import { expect } from 'chai';


function slideToElement(index: number): void {
  let n = index;
  while (n > 0) {
    cy.get('up-slider').shadow().find('button.right').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    n -= 1;
  }
}

describe('slider', () => {
  it('can slide right', () => {
    cy.visit('http://localhost:6006/iframe.html?id=components-slider--default&viewMode=story');

    cy.get('up-slider').shadow().find('button.right').click();
    cy.get('up-slider').shadow().find('slot').should((slot) => {
      expect(slot[0]!.scrollLeft).to.equal(
        cy.$$('.slide').eq(1)[0]!.offsetLeft,
      );
    });
  });

  it('can slide left', () => {
    cy.visit('http://localhost:6006/iframe.html?id=components-slider--default&viewMode=story');

    slideToElement(4);
    cy.get('up-slider').shadow().find('button.left').click();
    cy.get('up-slider').shadow().find('slot').should((slot) => {
      expect(slot[0]!.scrollLeft).to.equal(
        cy.$$('.slide').eq(3)[0]!.offsetLeft,
      );
    });
  });
});
