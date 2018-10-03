import React from 'react';
import renderer from 'react-test-renderer';

import { Search } from '..';
import SEARCH_AREAS from '../../../../mockData/SEARCH_AREAS';
import SEARCH_AREA from '../../../../mockData/SEARCH_AREA';
import PLACES from '../../../../mockData/PLACES';

jest.mock('../../../../components/PlaceList', () => 'PlaceList');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('Search', () => {
  const spies = [];
  const dispatch = jest.fn();
  const searchTerm = 'Water';
  const searchArea = SEARCH_AREA;

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);

      expect(component).toMatchSnapshot();
    });

    it('renders with a selected searchArea', () => {});

    it('renders with a searchTerm', () => {});
  });

  describe('methods', () => {
    it('should handle onBack', () => {
      spies[0] = jest.spyOn(Search.prototype, 'navigate');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.onBack();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle onChangeText', () => {
      spies[0] = jest.spyOn(Search.prototype, 'setSearchTerm');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.onChangeText(searchTerm);

      expect(spies[0]).toHaveBeenCalledWith(searchTerm);
    });

    it('should handle onSubmit', () => {
      spies[0] = jest.spyOn(Search.prototype, 'dismissKeyboard');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.onSubmit();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle onSearchAreaLabelPress', () => {
      spies[0] = jest.spyOn(Search.prototype, 'setSearchArea');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.onSearchAreaLabelPress(searchArea);

      expect(spies[0]).toHaveBeenCalledWith(searchArea);
    });

    it('should handle onSelectedSearchAreaLabelPress', () => {
      spies[0] = jest.spyOn(Search.prototype, 'setSearchArea');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.onSelectedSearchAreaLabelPress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle setSearchTerm', () => {
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.setSearchTerm(searchTerm);

      expect(instance.state.searchTerm).toEqual(searchTerm);
    });

    it('should handle dismissKeyboard', () => {
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.dismissKeyboard();
    });

    it('should handle setSearchArea', () => {
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.setSearchArea(searchArea);

      expect(instance.state.searchArea).toEqual(searchArea);
    });

    it('should handle navigate', () => {
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    it('should call onBack on back button press', () => {
      spies[0] = jest.spyOn(Search.prototype, 'navigate');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'search.button.back' });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onSelectedSearchAreaLabelPress on selected label press', () => {
      spies[0] = jest.spyOn(Search.prototype, 'onSelectedSearchAreaLabelPress');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const { root } = component;

      // Setup
      const instance = component.getInstance();
      instance.setSearchArea(searchArea);

      const targetComponent = root.findByProps({
        testID: `search.label.selected.${searchArea.name}`,
      });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onChangeText on input change text', () => {
      spies[0] = jest.spyOn(Search.prototype, 'onChangeText');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'search.input' });

      targetComponent.props.onChangeText(searchTerm);

      expect(spies[0]).toHaveBeenCalledWith(searchTerm);
    });

    it('should call onSubmit on input submit', () => {
      spies[0] = jest.spyOn(Search.prototype, 'onSubmit');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'search.input' });

      targetComponent.props.onSubmitEditing();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onSearchAreaLabelPress on unselected label press', () => {
      spies[0] = jest.spyOn(Search.prototype, 'onSearchAreaLabelPress');
      const component = renderer.create(<Search searchAreas={SEARCH_AREAS} places={PLACES} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: `search.label.${searchArea.name}` });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalledWith(searchArea);
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
