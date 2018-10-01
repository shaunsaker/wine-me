import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import styles from './styles';

import PlaceCard from './PlaceCard';

export default class PlaceList extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    handlePress: PropTypes.func,
  };

  static defaultProps = {};

  renderItem({ item }) {
    const { handlePress } = this.props;

    return (
      <View style={styles.itemContainer}>
        <PlaceCard place={item} handlePress={() => handlePress(item)} />
      </View>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <FlatList
        keyExtractor={({ id }) => id}
        data={data}
        renderItem={this.renderItem}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={3}
      />
    );
  }
}
