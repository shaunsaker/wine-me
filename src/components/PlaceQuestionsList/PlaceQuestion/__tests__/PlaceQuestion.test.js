import React from 'react';
import renderer from 'react-test-renderer';

import PlaceQuestion from '..';
import CATEGORIES from '../../../../mockData/CATEGORIES';

describe('PlaceQuestion', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const category = CATEGORIES.wine;
      const component = renderer.create(<PlaceQuestion category={category} />);

      expect(component).toMatchSnapshot();
    });

    describe('renders the rating state', () => {
      const category = CATEGORIES.wine;

      it('with a value', () => {
        const value = 4;
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });

      it('without a value', () => {
        const value = null;
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('renders the options state', () => {
      const category = CATEGORIES.child_friendly;

      it('with a value', () => {
        const value = 'Yes';
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });

      it('without a value', () => {
        const value = null;
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('renders the text input state', () => {
      const category = CATEGORIES.price;

      it('with a value', () => {
        const value = 100;
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });

      it('without a value', () => {
        const value = null;
        const component = renderer.create(<PlaceQuestion category={category} value={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
