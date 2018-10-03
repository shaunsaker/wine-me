import createError from './createError';
import createMapsLinkFromCoordinates from './createMapsLinkFromCoordinates';
import getDistanceBetweenCoordinates from './getDistanceBetweenCoordinates';
import getGooglePlacesPhotoURI from './getGooglePlacesPhotoURI';
import log from './log';
import navigate from './navigate';
import prepareNextAction from './prepareNextAction';

// All app-specific utils go here
const app = {
  createError,
  createMapsLinkFromCoordinates,
  getDistanceBetweenCoordinates,
  getGooglePlacesPhotoURI,
  log,
  navigate,
  prepareNextAction,
};

export default app;
