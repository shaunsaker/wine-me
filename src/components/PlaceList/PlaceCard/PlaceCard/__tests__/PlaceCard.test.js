import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from '..';
import PLACE from '../../../../../mockData/PLACE';
import utils from '../../../../../utils';

describe('PlaceCard', () => {
  const imageSource = { uri: utils.app.getGooglePlacesPhotoURI(PLACE.photoReferences[0]) };
  const label = 'Test';

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<PlaceCard />);

      expect(component).toMatchSnapshot();
    });

    it('renders the remote image state', () => {
      const component = renderer.create(<PlaceCard imageSource={imageSource} />);

      expect(component).toMatchSnapshot();
    });

    it('renders the label state', () => {
      const component = renderer.create(<PlaceCard label={label} />);

      expect(component).toMatchSnapshot();
    });
  });
});
