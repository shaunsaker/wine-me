import { Platform } from 'react-native';

const createMapsLinkFromCoordinates = (coordinates) => {
  let link;

  if (Platform.OS === 'android') {
    link = `geo:${coordinates.lat},${coordinates.lng}`;
  } else {
    link = `http://maps.apple.com/?ll=${coordinates.lat},${coordinates.lng}`;
  }

  return link;
};

export default createMapsLinkFromCoordinates;
