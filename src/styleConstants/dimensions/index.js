import { Dimensions } from 'react-native';

const dimensions = {};
const { width, height } = Dimensions.get('window');

dimensions.window = {
  width,
  height,
};

dimensions.spacing = {
  vertical: 10,
  horizontal: 15,
};

dimensions.borderRadius = 5;

dimensions.placeCard = {
  height: 200,
};

dimensions.thumbnail = {
  height: 120,
};

export default dimensions;
