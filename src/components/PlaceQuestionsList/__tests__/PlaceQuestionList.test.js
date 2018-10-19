import React from 'react';
import renderer from 'react-test-renderer';

import PlaceQuestionList from '..';

jest.mock('../PlaceQuestion', () => 'PlaceQuestion');

describe('PlaceQuestionList', () => {
  const spies = [];
  const dispatch = jest.fn();
  const data = [{ id: 'foo' }, { id: 'bar' }];

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<PlaceQuestionList />);

      expect(component).toMatchSnapshot();
    });

    it('renders the default state', () => {
      const component = renderer.create(<PlaceQuestionList data={data} slideIndex={0} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle scrollToIndex', () => {
      const component = renderer.create(<PlaceQuestionList data={data} slideIndex={0} />);
      const instance = component.getInstance();

      instance.scrollToIndex(1);
    });
  });

  describe('lifecycle methods', () => {
    it('should call scrollToIndex in componentDidUpdate if slideIndex changed', () => {
      spies[0] = jest.spyOn(PlaceQuestionList.prototype, 'scrollToIndex');
      const component = renderer.create(<PlaceQuestionList data={data} slideIndex={0} />);
      const nextSlideIndex = 1;

      component.update(<PlaceQuestionList data={data} slideIndex={nextSlideIndex} />);

      expect(spies[0]).toHaveBeenCalledWith(nextSlideIndex);
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
    dispatch.mockClear();
  });
});
