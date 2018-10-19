import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../utils';
import styles from './styles';
import Touchable from '../Touchable';

export default class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);

    this.state = {};
  }

  static propTypes = {
    rating: PropTypes.number,
    handlePress: PropTypes.func,
  };

  static defaultProps = {};

  onPress(index) {
    const { handlePress } = this.props;

    handlePress(index + 1);
  }

  render() {
    const { rating, handlePress } = this.props;

    const maxStars = 5;
    const starsArray = [];
    for (let i = 0; i < maxStars; i += 1) {
      if (i < rating) {
        starsArray.push({
          iconName: 'star',
          id: utils.strings.createUID(), // id is needed for map function below
        });
      } else {
        starsArray.push({
          iconName: 'star-border',
          id: utils.strings.createUID(),
        });
      }
    }

    return (
      <View style={styles.container}>
        {starsArray.map((item, index) => {
          return (
            <Touchable
              key={item.id}
              onPress={() => this.onPress(index)}
              disabled={!handlePress}
              testID={`starRating.button.${index}`}
            >
              <Icon name={item.iconName} style={styles.icon} />
            </Touchable>
          );
        })}
      </View>
    );
  }
}
