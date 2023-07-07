describe('@35up/recommendations-slider', () => {
  it('is properly bundled', () => {
    cy.visit('http://localhost:3000');

    // check that the component was initialized
    cy.get('tfup-recommendations-slider').within(([ slider ]) => {
      expect(slider).to.have.property('sliderTrack');
    });
  });
});

describe('@35up/react-recommendations-slider', () => {
  it('is properly bundled', () => {
    cy.visit('http://localhost:3000?react');

    // check that the component was initialized
    cy.get('tfup-recommendations-slider').within(([ slider ]) => {
      expect(slider).to.have.property('sliderTrack');
    });
  });
});
